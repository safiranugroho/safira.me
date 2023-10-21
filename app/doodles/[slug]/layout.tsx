import { doodles } from "@safiranugroho/doodles/metadata";
import { Doodle } from "../types";
import { PageProps } from "./page";
import { Metadata } from "next";

type LayoutParams = {
  slug: string;
}

type LayoutProps = {
  params: LayoutParams;
  children?: React.ReactNode;
}

export default function Layout({ params, children }: LayoutProps) {
  const { slug } = params;
  const data = doodles.find((d: Doodle) => d.slug === slug)!;
  
  return <>
    <div className="mb-12">
      <h1 className="mb-0">{data.title}</h1>
      <p className="m-0">{data.description}</p>
    </div>
    <div className="flex flex-col justify-center m-auto h-full">{children}</div>
  </>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const data = doodles.find((d: Doodle) => d.slug === slug)!;

  return {
    title: `${data.title} | Safira Nugroho`,
    description: data.description,
    openGraph: {
      title: `${data.title} | Safira Nugroho`,
      description: data.description,
      type: 'website'
    },
    twitter: {
      title: `${data.title} | Safira Nugroho`,
      description: data.description,
      card: 'summary',
      site: '@hisafira',
      creator: '@hisafira',
    }
  }
}
