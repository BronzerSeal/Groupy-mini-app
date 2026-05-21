"use server"

import prisma from "@/utils/prisma"

type SendMoneySuccess = {
  status: "success"
  code: 200
  transactionId: string
  senderBalance: number
  recipientBalance: number
}

type SendMoneyError = {
  status: "error"
  message: string
}

export type SendMoneyResponse = SendMoneySuccess | SendMoneyError

const getUserDisplayName = ({
  firstName,
  lastName,
  username,
}: {
  firstName: string | null
  lastName: string | null
  username: string | null
}) => {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim()

  if (fullName) return fullName
  if (username) return `@${username}`

  return "Unknown user"
}

const buildTransactionId = () =>
  `TRX-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

export const SendMoney = async (
  senderId: string,
  senderCardId: string,
  amount: number,
  category = "send",
  merchantLogo: string | null,
  merchantId: string,
  merchantCardId: string,
  notes: string | null,
  cardLast4?: string
): Promise<SendMoneyResponse> => {
  try {
    if (!senderId || !merchantId || !senderCardId) {
      return {
        status: "error",
        message: "No data provided",
      }
    }

    const normalizedAmount = Math.floor(amount)

    if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
      return {
        status: "error",
        message: "Amount must be greater than 0",
      }
    }

    const senderUser = await (prisma.user.findUnique as any)({
      where: {
        tgId: senderId,
      },
    })

    if (!senderUser) {
      return {
        status: "error",
        message: "Sender not found",
      }
    }

    const recipientUser = await (prisma.user.findFirst as any)({
      where: {
        OR: [{ id: merchantId }, { tgId: merchantId }],
      },
    })

    if (!recipientUser) {
      return {
        status: "error",
        message: "Recipient not found",
      }
    }

    if (senderUser.tgId === recipientUser.tgId) {
      return {
        status: "error",
        message: "You cannot send money to yourself",
      }
    }

    const senderCard = await (prisma.card.findFirst as any)({
      where: {
        id: senderCardId,
        userId: senderUser.tgId,
      },
    })

    if (!senderCard) {
      return {
        status: "error",
        message: "Sender card not found",
      }
    }

    if (senderCard.balance < normalizedAmount) {
      return {
        status: "error",
        message: "Insufficient balance",
      }
    }

    const recipientCard = await (prisma.card.findFirst as any)({
      where: {
        id: merchantCardId,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    if (!recipientCard) {
      return {
        status: "error",
        message: "Recipient has no card to receive money",
      }
    }

    const transactionId = buildTransactionId()
    const senderDisplayName = getUserDisplayName(senderUser)
    const recipientDisplayName = getUserDisplayName(recipientUser)
    const transactionDate = new Date().toISOString()

    const result = await prisma.$transaction(async (tx: any) => {
      const updatedSenderCard = await tx.card.update({
        where: {
          id: senderCard.id,
        },
        data: {
          balance: {
            decrement: normalizedAmount,
          },
        },
      })

      const updatedRecipientCard = await tx.card.update({
        where: {
          id: recipientCard.id,
        },
        data: {
          balance: {
            increment: normalizedAmount,
          },
        },
      })

      await tx.transaction.create({
        data: {
          transactionId,
          userId: senderUser.tgId,
          amount: normalizedAmount,
          category,
          logo: merchantLogo ?? recipientUser.photoUrl ?? "",
          merchant: recipientDisplayName,
          date: transactionDate,
          status: "completed",
          type: "expense",
          notes,
          cardLast4: cardLast4 || senderCard.last4,
          merchantInfo: recipientUser.username
            ? `@${recipientUser.username}`
            : recipientUser.tgId,
        },
      })

      await tx.transaction.create({
        data: {
          transactionId,
          userId: recipientUser.tgId,
          amount: normalizedAmount,
          category: "received",
          logo: senderUser.photoUrl ?? "",
          merchant: senderDisplayName,
          date: transactionDate,
          status: "completed",
          type: "income",
          notes,
          cardLast4: recipientCard.last4,
          merchantInfo: senderUser.username
            ? `@${senderUser.username}`
            : senderUser.tgId,
        },
      })

      return {
        senderBalance: updatedSenderCard.balance,
        recipientBalance: updatedRecipientCard.balance,
      }
    })

    return {
      code: 200,
      status: "success",
      transactionId,
      senderBalance: result.senderBalance,
      recipientBalance: result.recipientBalance,
    }
  } catch (error) {
    console.error("Error sending money:", error)
    return {
      status: "error",
      message: `Error sending money: ${error instanceof Error ? error.message : error}`,
    }
  }
}
