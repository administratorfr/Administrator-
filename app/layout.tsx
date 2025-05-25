import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FranchiseHub',
  description: 'Platform franchise Indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
