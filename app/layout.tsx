import './globals.css';

export const metadata = {
  title: 'Turbocache',
  description: 'turbocache',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
