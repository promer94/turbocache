import { Footer } from './Footer'
import { Nav } from './Nav'

export const Layout = (children: React.ReactNode) => {
  return (
    <div className='flex flex-col min-h-full min-w-full'>
      <Nav></Nav>
      <div className='flex flex-col mx-auto py-16 min-w-'>
        {children}
      </div>
      <Footer></Footer>
    </div>
  )
}