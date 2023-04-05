import Link from 'next/link'
import GitHubIcon from '@geist-ui/icons/github'
export const Footer = () => {
  return (
    <footer className="absolute bottom-0 flex w-full items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-[90rem] items-center justify-between py-6 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <Link
          href="https://github.com/promer94/turbocache"
          title="Turbocache GitHub Repository"
          target="_blank"
        >
          <GitHubIcon size={32} />
        </Link>
        <a href="https://vercel.com?utm_source=promer94&utm_campaign=oss">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/powered-by-vercel.svg" alt="powered-by-vercel" />
        </a>
      </div>
    </footer>
  )
}
