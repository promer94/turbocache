'use client'
import { useSession } from 'next-auth/react'

const Page = () => {
  const { data, status } = useSession({
    required: true,
  })
  return <div>onboard</div>
}

export default Page