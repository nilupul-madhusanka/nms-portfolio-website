import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NMS Portfolio | Nilupul Madhusanka - Web & Mobile Developer',
  description: 'Portfolio of Nilupul Madhusanka — a Web and Mobile Developer specializing in React, Next.js, and Flutter.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}
