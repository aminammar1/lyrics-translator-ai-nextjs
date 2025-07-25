import { Lexend, Italiana } from 'next/font/google'
import Background from '@/components/Background'
import Header from '@/components/Header'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/lib/toast'
import './globals.css'
import { Suspense } from 'react'

const lexend = Lexend({
  weight: ['400', '800'],
  subsets: ['latin'],
})

export const italiana = Italiana({
  weight: '400',
  subsets: ['latin'],
})

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
            <link rel="icon" href="/logo.png" type="image/png" />
            </head>
          <body className={lexend.className}>
            <Background />
            <Header />
            {children}
            <ToastProvider />
          </body>
        </html>
      </Suspense>
    </AuthProvider>
  )
}
