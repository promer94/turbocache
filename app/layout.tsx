import '~/styles/tailwind.css'
import { Inter } from 'next/font/google'
import { cn } from '~/lib/utils'
import RootProviders from './providers'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})
export const metadata = {
  title: 'Turbocache',
  description: 'turbocache',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={cn(fontSans.variable, 'font-sans')}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
