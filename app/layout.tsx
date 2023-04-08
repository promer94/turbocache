import { cn } from '~/lib/utils';
import '~/styles/tailwind.css';

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
    <html>
      <body className={cn("container")}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
