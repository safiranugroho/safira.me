import { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'

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
      <body className='bg-none bg-white dark:bg-slate-800 prose dark:prose-invert flex flex-row'>
        <nav className='min-w-max w-2/5'>
          <ul className='list-none'>
            <li><Link href="/"><InlineImage src='/favicon.ico' alt="Home icon" className='inline pr-1 m-0'/>Home</Link></li>
            <li><Link href="/blog"><InlineImage src='/blog.png' alt="Blog icon" className='inline pr-1 m-0'/>Blog</Link></li>
            <li><Link href="/doodles"><InlineImage src='/doodles.png' alt="Doodles icon" className='inline pr-1 m-0'/>Doodles</Link></li>
          </ul>
        </nav>
        <main className="flex min-h-screen w-full flex-col py-12 pl-24">
          {children}
        </main>
      </body>
    </html>
  )
}
