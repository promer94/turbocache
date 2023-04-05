import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
  const { data } = useSession<true>()
  return (
    <div className="nav bg-whit sticky top-0 z-20 w-full bg-transparent backdrop-blur">
      <div className="top-0 z-20 flex h-10 items-center bg-neutral-900 pl-10 text-sm text-slate-50">
        <div className="mx-auto w-full max-w-[90rem] truncate whitespace-nowrap py-1 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] text-center font-medium">
          Warning: This website is only used for DEMONSTRATION !
        </div>
      </div>
      <nav className="inset-x-0 mx-auto flex h-16 max-w-[90rem] items-center pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <div className="flex flex-auto gap-4">
          <Link
            className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center  text-3xl font-extrabold tracking-tighter text-transparent"
            href="/"
          >
            Turbocache
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex flex-1 items-center justify-end gap-4">
          {data ? (
            <Image
              src={data!.user!.image ?? ''}
              alt="avatar"
              width={32}
              height={32}
              className="rounded-[16px]"
            ></Image>
          ) : (
            <Image
              onClick={() => signIn()}
              src="https://avatars.githubusercontent.com/t/2824157"
              alt="avatar"
              width={32}
              height={32}
              className="rounded-[16px]"
            />
          )}
        </div>
      </nav>
    </div>
  )
}

export { Nav }
