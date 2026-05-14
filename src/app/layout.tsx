import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { AppProviders } from "@/shared/providers/app-providers"
import BottomNavigation from "@/widgets/bottom-navigation"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <div className="p-4 pt-2">
          <AppProviders>{children}</AppProviders>
          <BottomNavigation />
        </div>
      </body>
    </html>
  )
}
