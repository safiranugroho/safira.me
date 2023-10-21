"use client";

import Image, { ImageProps } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const InlineImage = ({ src, alt }: ImageProps) => (
  <Image src={src} alt={alt} width={30} height={30} className='inline pr-2 m-0 align-text-top'/>
)

export const Navigation = () => {
  const pathname = usePathname();
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
    }
  ];

  return (
    <nav className={`sticky top-0 md:w-1/4 lg:w-1/6 md:h-screen bg-inherit`}>
      <div className="w-full h-full bg-slate-200 dark:bg-slate-900 bg-opacity-10 dark:bg-opacity-10 border-slate-800 dark:border-slate-200 border-opacity-10 dark:border-opacity-10 border-solid border-b-2 md:border-b-0 md:border-r-2">
        <ul className='sticky top-0 m-0 py-4 md:py-10 px-8 list-none w-full flex flex-row justify-between md:flex-col md:gap-0'>
          {nav.map(({ href, children }, i) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return <li key={i} className="my-1"><Link href={href} className={isActive ? 'font-bold no-underline' : undefined}>{children}</Link></li>
          })}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  )
}