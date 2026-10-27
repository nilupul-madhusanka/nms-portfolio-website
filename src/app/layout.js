import './globals.css'

export const metadata = {
  title: 'NMS Portfolio | Nilupul Madhusanka - Web & Mobile Developer',
  description: 'Portfolio of Nilupul Madhusanka — a Web and Mobile Developer specializing in React, Next.js, and Flutter.',
  openGraph: {
    title: 'Nilupul Madhusanka | Developer Portfolio',
    description: 'Explore my web, mobile, desktop, and AI automation projects.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Nilupul Madhusanka | Developer Portfolio',
    description: 'Web, mobile, desktop, and AI automation projects.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
