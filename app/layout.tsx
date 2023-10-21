import './globals.css'
import { Metadata } from 'next'
import { Navigation } from './_components/Navigation'
import Script from 'next/script'

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const prose = `prose dark:prose-invert hover:prose-a:no-underline before:prose-code:hidden after:prose-code:hidden`;

  return (
    <html lang="en">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PYH8MSDG00"></Script>
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-PYH8MSDG00');

          let colorScheme = sessionStorage.getItem('color-scheme');
          let theme = localStorage.getItem('theme');

          gtag('event', 'screen_view', {
            'color_scheme': colorScheme,
            'theme': theme
          });
        `}
      </Script>
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