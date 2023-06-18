import Layout from "./layout";
import { Metadata } from "next";
import { dMMMMyyyy } from "../_lib/format-date";
import { getCompiledMDX } from "../_lib/get-compiled-mdx";

type PageParams = {
  slug: string;
};

type PageProps = {
  params: PageParams;
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const { content, frontmatter } = await getCompiledMDX(slug);

  return (
    <Layout>
      <h1 className="mb-2">{frontmatter.title}</h1>
      <p className="text-sm mb-8">{dMMMMyyyy(frontmatter.date)}</p>
      {content}
    </Layout>
  );
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
