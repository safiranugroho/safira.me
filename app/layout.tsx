import './globals.css'
import { Metadata } from 'next'
import { Navigation } from './_components/Navigation'

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const prose = `prose dark:prose-invert hover:prose-a:no-underline before:prose-code:hidden after:prose-code:hidden`;

  return (
    <html lang="en">
      <body className={`relative bg-none max-w-full flex flex-col md:flex-row ${prose}`}>
        <Navigation />
        <main className="flex w-full flex-col p-8 md:py-12">
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