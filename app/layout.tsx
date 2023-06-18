import './globals.css'
import { Metadata } from 'next'
import { ThemeToggle } from './_components/ThemeToggle'
import { Navigation } from './_components/Navigation'

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const lightMode = `prose bg-stone-100`;
  const darkMode = `dark:prose-invert dark:bg-teal-950`;

  return (
    <html lang="en">
      <body className={`relative bg-none max-w-full flex flex-col md:flex-row hover:prose-a:no-underline ${lightMode} ${darkMode}`}>
        <Navigation />
        <main className="flex min-h-screen w-full flex-col p-8 md:py-12">
          {children}
        </main>
        <ThemeToggle />
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