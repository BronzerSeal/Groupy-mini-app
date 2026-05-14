import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("ACCESS_TOKEN")?.value

    const refreshToken = req.cookies.get("REFRESH_TOKEN")?.value

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })
    }

    // access token еще жив
    try {
      jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)

      return NextResponse.json({
        success: true,
      })
    } catch {
      // access expired
    }

    // проверяем refresh
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as {
      id: number
      tg_id: number
      roles: string[]
    }

    // создаем новые токены
    const newAccessToken = jwt.sign(
      {
        id: payload.id,
        tg_id: payload.tg_id,
        roles: payload.roles,
      },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: "5m",
      }
    )

    const newRefreshToken = jwt.sign(
      {
        id: payload.id,
        tg_id: payload.tg_id,
        roles: payload.roles,
      },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "7d",
      }
    )

    const response = NextResponse.json({
      success: true,
      refreshed: true,
    })

    response.cookies.set("ACCESS_TOKEN", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 5,
    })

    response.cookies.set("REFRESH_TOKEN", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: "UNAUTHORIZED",
      },
      {
        status: 401,
      }
    )
  }
}
