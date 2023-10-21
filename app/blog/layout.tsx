import { Metadata } from "next";

type LayoutProps = {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Blog | Safira Nugroho`,
    description: 'A stream of consciousness.',
    openGraph: {
      title: `Blog | Safira Nugroho`,
      description: 'A stream of consciousness.',
      type: 'website'
    },
    twitter: {
      title: `Blog | Safira Nugroho`,
      description: 'A stream of consciousness.',
      card: 'summary',
      site: '@hisafira',
      creator: '@hisafira',
    }
  }
}
