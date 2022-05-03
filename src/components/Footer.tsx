import Link from 'next/link'
import GitHubIcon from '@geist-ui/icons/github';
export const Footer = () => {
  return (
    <footer className="bg-gray-100 w-full absolute bottom-0">
      <div className="flex items-center justify-between w-full pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] py-6">
        <a href="https://vercel.com?utm_source=promer94&utm_campaign=oss">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/powered-by-vercel.svg" alt='powered-by-vercel' />
        </a>
        <Link href="https://github.com/promer94/turbocache">
          <a title='Turbocache GitHub Repository' target="_blank">
            <GitHubIcon size={32} />
          </a>
        </Link>
      </div>
    </footer>
  )
}