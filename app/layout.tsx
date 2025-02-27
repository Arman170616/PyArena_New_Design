import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PYARENA - An E-Learning Platform',
  description: 'PYARENA is an e-learning platform that offers a wide range of tech courses for all skill levels.',
  generator: 'PYARENA 1.0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
