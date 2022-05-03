import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image'
import GitHubIcon from '@geist-ui/icons/github';

const Nav = () => {
  const { data } = useSession<true>();
  return (
    <div className="nav backdrop-blur w-full bg-whit z-20 sticky top-0 bg-transparent">
      <div className="text-sm h-10 top-0 pl-10 flex items-center text-slate-50 bg-neutral-900 z-20">
        <div className="max-w-[90rem] mx-auto w-full py-1 text-center font-medium pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] truncate whitespace-nowrap">
          Warning: This website is only used for DEMONSTRATION !
        </div>
      </div>
      <nav className="flex max-w-[90rem] mx-auto items-center left-0 right-0 h-16 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <div className="flex-auto flex gap-4">
          <Link href="/">
            <a className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600  text-center text-xl font-extrabold tracking-tighter'>
              Turbocache
            </a>
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex-1 flex items-center justify-end gap-4">
          {data ? (
            <Image src={data!.user!.image ?? ''} alt="avatar" width={32} height={32} className="rounded-[16px]" ></Image>
          ) : <Image onClick={() => signIn()} src="https://avatars.githubusercontent.com/t/2824157" alt="avatar" width={32} height={32} className="rounded-[16px]" />}
          <Link href="https://github.com/promer94/turbocache">
            <a title='Turbocache GitHub Repository' target="_blank">
              <GitHubIcon size={32} />
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export { Nav };