import { PageProps } from "./page";
import { getCompiledMDX } from "../_lib/get-compiled-mdx";
import { Metadata } from "next";
import { dMMMMyyyy } from "../_lib/format-date";

type MetadataProps = {
  label: string;
  value: string;
}

const Metadata = ({ label, value }: MetadataProps) => (
  <p className="text-sm flex gap-2 m-0 lg:flex-col lg:gap-0 xl:flex-row xl:gap-2">
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </p>
)

type LayoutProps = PageProps & {
  children?: React.ReactNode;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { slug } = params;
  const { frontmatter } = await getCompiledMDX(slug);
  return <div className="flex flex-col lg:flex-row">
    <article className="md:max-w-prose">
      <h1 className="mb-0">{frontmatter.title}</h1>
      {children}
    </article>
    <aside className="w-full lg:pl-8 lg:flex lg:flex-col lg:gap-4 xl:gap-0">
      <Metadata label="Last published" value={dMMMMyyyy(frontmatter.date)} />
      <Metadata label="Tags" value={frontmatter.tags.join(', ')} />
    </aside>
  </div>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const { frontmatter } = await getCompiledMDX(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image,
      type: 'article'
    },
    twitter: {
      title: frontmatter.title,
      description: frontmatter.description,
      card: 'summary_large_image',
      site: '@hisafira',
      images: frontmatter.image ,
      creator: '@hisafira',
    }
  }
}
