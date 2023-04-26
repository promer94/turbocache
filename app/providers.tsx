'use client'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-wrap-balancer'

export default function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider>{children}</Provider>
    </ThemeProvider>
  )
}

