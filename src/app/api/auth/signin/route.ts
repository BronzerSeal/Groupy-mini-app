import { NextRequest, NextResponse } from "next/server"
import { validate, parse } from "@tma.js/init-data-node"
import * as jwt from "jsonwebtoken"
import prisma from "@/utils/prisma"
import { accountCards } from "@/shared/constants/accountCardsSeed"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const initData: string = body.initData
    const isDevMock =
      process.env.NODE_ENV === "development" && initData.includes("mock")

    if (!initData) {
      return NextResponse.json(
        { error: "AUTH__INIT_DATA_REQUIRED" },
        { status: 400 }
      )
    }

    // validate бросает ошибку если данные невалидны
    try {
      if (!isDevMock) {
        validate(initData, process.env.BOT_TOKEN!)
      }
    } catch (e) {
      console.error("VALIDATE ERROR", e)

      return NextResponse.json(
        {
          error: `INVALID_INIT_DATA`,
        },
        {
          status: 401,
        }
      )
    }

    const parsed = parse(initData)

    const parsedUser = parsed.user
    console.log(parsedUser)

    if (!parsedUser?.id) {
      return NextResponse.json(
        { error: "AUTH__INVALID_INITDATA" },
        { status: 400 }
      )
    }

    let user = await (prisma.user.findUnique as any)({
      where: {
        tgId: String(parsedUser?.id),
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          tgId: String(parsedUser?.id),
          username: parsedUser.username,
          firstName: parsedUser.first_name,
          lastName: parsedUser.last_name,
          photoUrl: parsedUser.photo_url,
        },
      })

      await prisma.card.createMany({
        data: [
          { ...accountCards[0], userId: String(user.tgId) },
          { ...accountCards[1], userId: String(user.tgId) },
          { ...accountCards[2], userId: String(user.tgId) },
        ],
      })
    }

    const { id, tgId } = user // Достаем нужные данные

    // Создаем access и refresh токены, зашивая в них данные пользователя
    const accessToken = jwt.sign(
      { id, tgId },
      process.env.JWT_ACCESS_SECRET!, // Секрет для access-токена
      { expiresIn: "5m" } // Время жизни токена
    )

    const refreshToken = jwt.sign(
      { id, tgId },
      process.env.JWT_REFRESH_SECRET!, // Секрет для refresh-токена
      { expiresIn: "7d" } // Время жизни токена
    )

    // Устанавливаем токены в cookies
    const response = NextResponse.json({
      success: true,
    })

    response.cookies.set("ACCESS_TOKEN", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 5,
    })

    response.cookies.set("REFRESH_TOKEN", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
