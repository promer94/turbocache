import { Footer } from './Footer'
import { Nav } from './Nav'

export const Layout = (children: React.ReactNode) => {
  return (
    <div className="flex min-h-full min-w-full flex-col">
      <Nav></Nav>
      <div className="mx-auto flex flex-col py-16">{children}</div>
      <Footer></Footer>
    </div>
  )
}
