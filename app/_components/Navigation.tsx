"use client";

import Image, { ImageProps } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const InlineImage = ({ src, alt }: ImageProps) => (
  <Image src={src} alt={alt} width={24} height={24} className='inline pr-2 m-0'/>
)

export const Navigation = () => {
  const pathname = usePathname();
  const nav = [
    {
      href: '/',
      children: <><InlineImage src='/favicon.ico' alt="Home icon" />Home</>
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
    <nav className='sticky top-0 bg-inherit min-w-max md:w-1/4'>
      <ul className='sticky top-0 m-0 py-4 md:py-10 px-8 list-none w-full flex flex-row justify-between md:flex-col md:gap-0'>
        {nav.map(({ href, children }, i) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return <li key={i}><Link href={href} className={isActive ? 'font-bold no-underline' : undefined}>{children}</Link></li>
        })}
      </ul>
    </nav>
  )
}