import { doodles } from "../_doodles";

type LayoutParams = {
  slug: string;
}

type LayoutProps = {
  params: LayoutParams;
  children?: React.ReactNode;
}

export default function Layout({ params, children }: LayoutProps) {
  const { slug } = params;
  const data = doodles.find(d => d.slug === slug)!;
  
  return <>
    <div className="mb-12">
      <h1 className="mb-0">{data.title}</h1>
      <p className="m-0">{data.description}</p>
    </div>
    <div className="flex flex-col justify-center m-auto h-full">{children}</div>
  </>;
}