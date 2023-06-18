import './globals.css'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { Metadata } from 'next'

const InlineImage = ({ src, alt }: ImageProps) => (
  <Image src={src} alt={alt} width={24} height={24} className='inline pr-2 m-0'/>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative bg-none bg-white dark:bg-slate-800 prose dark:prose-invert max-w-full flex flex-col md:flex-row'>
        <nav className='sticky top-0 bg-inherit min-w-max md:w-1/4'>
          <ul className='sticky top-0 m-0 py-4 md:py-10 px-8 list-none w-full flex flex-row justify-between md:flex-col md:gap-0'>
            <li><Link href="/"><InlineImage src='/favicon.ico' alt="Home icon" />Home</Link></li>
            <li><Link href="/blog"><InlineImage src='/blog.png' alt="Blog icon" />Blog</Link></li>
            <li><Link href="/doodles"><InlineImage src='/doodles.png' alt="Doodles icon" />Doodles</Link></li>
          </ul>
        </nav>
        <main className="flex min-h-screen w-full flex-col p-8 md:py-12">
          {children}
        </main>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1.0',
  title: 'Safira Nugroho',
  description: 'Personal site of Safira Nugroho',
  openGraph: {
    title: 'Safira Nugroho',
    description: 'Personal site of Safira Nugroho',
    images: '/favicon.ico',
    type: 'website',
  },
  twitter: {
    title: 'Safira Nugroho',
    description: 'Personal site of Safira Nugroho',
    card: 'summary_large_image',
    site: '@hisafira',
    images: '/favicon.ico',
    creator: '@hisafira',
  }
}