import type { Metadata } from "next"
import { Lexend, Bagel_Fat_One } from "next/font/google"
import Background from "@/components/Background"
import Header from "@/components/Header"
import "./globals.css"

const lexend = Lexend({
  weight: ["400", "800"],
  subsets: ["latin"],
})

export const bagelFatOne = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
})

// export const metadata: Metadata = {
//   title: "Sing Lang",
//   description: "Next.js app for translte songs lyrics",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Sing Lang</title>
      </head>
      <body className={lexend.className}>
        <Background />
        <Header />
        {children}
      </body>
    </html>
  )
}
