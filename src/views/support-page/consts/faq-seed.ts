export type FaqItem = {
  id: string
  question: string
  answer: string
  category: "account" | "payments" | "security" | "billing" | "general"
}

export const faqItems: FaqItem[] = [
  {
    id: "faq1",
    category: "account",
    question: "How do I start using Groupy?",
    answer:
      "Open the app inside Telegram and wait for your profile to load. Groupy creates your workspace automatically, so after sign in you can view your balance, manage cards, and send money right away.",
  },
  {
    id: "faq2",
    category: "payments",
    question: "How do I send money to another user?",
    answer:
      "Open a recipient profile from search, recent contacts, or the friends list, choose one of your cards, enter the amount, and confirm the transfer. The payment is then recorded in both users' transaction history.",
  },
  {
    id: "faq3",
    category: "security",
    question: "Can I send money to myself?",
    answer:
      "No. Groupy blocks transfers to your own Telegram account to prevent accidental self-payments and incorrect transaction records.",
  },
  {
    id: "faq4",
    category: "billing",
    question: "How do I top up my balance?",
    answer:
      "Use the balance top-up action on the home screen, choose the card you want to credit, and enter the amount. The selected card balance will update after the operation is confirmed.",
  },
  {
    id: "faq5",
    category: "account",
    question: "Can I have more than one card?",
    answer:
      "Yes. Groupy supports multiple cards per user, and each card appears in your wallet section. You can switch between them when viewing balances or choosing a card for transfers.",
  },
  {
    id: "faq6",
    category: "security",
    question: "What should I do if I notice suspicious activity?",
    answer:
      "Review your recent transactions first and verify which card was used. If something looks wrong, stop making new transfers from that account and contact support with the transaction ID so the issue can be investigated faster.",
  },
  {
    id: "faq7",
    category: "payments",
    question: "Why did my transfer fail?",
    answer:
      "The most common reasons are insufficient balance, a missing sender card, or the recipient not having a card available to receive funds. Check the amount, selected card, and recipient account, then try again.",
  },
  {
    id: "faq8",
    category: "general",
    question: "Where can I see my transaction history?",
    answer:
      "Open the transactions section from the main app screen. There you can browse transfers, incoming payments, amounts, statuses, categories, and card details used in each operation.",
  },
  {
    id: "faq9",
    category: "billing",
    question: "Does Groupy charge a subscription fee?",
    answer:
      "No subscription billing is shown in the app right now. If pricing or paid features are introduced later, they will appear in the product interface and support section.",
  },
  {
    id: "faq10",
    category: "general",
    question: "How do recent recipients work?",
    answer:
      "After you send money to someone, Groupy can add that person to your recent recipients list. This helps you reopen frequent contacts quickly without searching for the same user every time.",
  },
]
