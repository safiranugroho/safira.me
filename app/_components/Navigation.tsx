"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { InlineImage } from "./InlineImage";

export const Navigation = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const nav = [
    {
      href: '/',
      children: <><InlineImage src='/home.png' alt="Home icon" />Home</>
    },
    {
      href: '/blog',
      children: <><InlineImage src='/blog.png' alt="Blog icon" />Blog</>
    },
    {
      href: '/doodles',
      children: <><InlineImage src='/doodles.png' alt="Doodles icon" />Doodles</>
    },
  ];

  const socialMedia = [
    {
      href: 'https://www.twitter.com/hisafira',
      children: <><InlineImage src='/hatching-chick.png' alt="Bird icon" />Twitter</>
    },
    {
      href: 'https://www.linkedin.com/in/safiranugroho',
      children: <><InlineImage src='/necktie.png' alt="Neck tie icon" />LinkedIn</>
    },
    {
      href: 'https://www.github.com/safiranugroho',
      children: <><InlineImage src='/desktop-computer.png' alt="Computer icon" />GitHub</>
    },
    {
      href: 'mailto:safiranugroho+site@gmail.com',
      children: <><InlineImage src='/love-letter.png' alt="Letter icon" />Email</>
    },
  ]

  return (
    <nav className={`sticky top-0 min-w-max md:w-1/3 lg:w-1/6 md:h-screen bg-inherit z-20`}>
      <div className="w-full h-full bg-slate-200 dark:bg-slate-900 bg-opacity-10 dark:bg-opacity-10 border-slate-800 dark:border-slate-200 border-opacity-10 dark:border-opacity-10 border-solid border-b-2 md:border-b-0 md:border-r-2">
        <ul className='sticky top-0 m-0 py-4 md:py-10 px-8 list-none w-full flex flex-row justify-between md:flex-col md:gap-0'>
          {nav.map(({ href, children }, i) => {
            const isActive = href === '/' ? isHome : pathname.startsWith(href);
            return <li key={i} className="my-1"><Link href={href} className={isActive ? 'font-bold no-underline' : undefined}>{children}</Link></li>
          })}
        </ul>
        <ul className='hidden sticky top-0 m-0 px-8 list-none w-full md:flex flex-row justify-between md:flex-col md:gap-0'>
          {socialMedia.map(({ href, children }, i) => (
            <li key={i} className="my-1"><Link href={href}>{children}</Link></li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  )
}