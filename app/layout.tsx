import '~/styles/tailwind.css'
import localFont from 'next/font/local'
import { cn } from '~/lib/utils'
import { Providers } from './providers'

const fontSans = localFont({
  src: '../styles/Inter-VariableFont_slnt,wght.ttf',
  variable: '--font-sans',
  display: 'swap',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
