import { Metadata } from "next";

type LayoutProps = {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Doodles | Safira Nugroho`,
    description: 'A collection of non-responsive, non-accessible, completely messy doodles.',
    openGraph: {
      title: `Doodles | Safira Nugroho`,
      description: 'A collection of non-responsive, non-accessible, completely messy doodles.',
      type: 'website'
    },
    twitter: {
      title: `Doodles | Safira Nugroho`,
      description: 'A collection of non-responsive, non-accessible, completely messy doodles.',
      card: 'summary',
      site: '@hisafira',
      creator: '@hisafira',
    }
  }
}
