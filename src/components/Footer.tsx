export const Footer = () => {
  return (
    <footer className="bg-gray-100 w-full">
      <div className="flex justify-center items-center w-full pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] py-6">
        <a href="https://vercel.com?utm_source=promer94-labs&utm_campaign=oss">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/powered-by-vercel.svg" alt='powered-by-vercel' />
        </a>
      </div>
    </footer>
  )
}