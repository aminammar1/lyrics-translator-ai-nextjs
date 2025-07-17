import type { Metadata } from 'next'
import { Lexend, Italiana } from 'next/font/google'
import Background from '@/components/Background'
import Header from '@/components/Header'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'
import { Suspense } from 'react'

const lexend = Lexend({
  weight: ['400', '800'],
  subsets: ['latin'],
})

export const italiana  = Italiana({
  weight: '400',
  subsets: ['latin'],
})

// export const metadata: Metadata = {
//   title: "Sing Lang",
//   description: "Next.js app for translte songs lyrics",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <Suspense>
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
      </Suspense>
    </AuthProvider>
  )
}
