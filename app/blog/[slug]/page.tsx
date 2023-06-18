import fs from "fs";
import path from "path";
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Layout from "./layout";

type Frontmatter = {
  title: string;
  date: Date;
  description: string;
  image: string;
};

type PageParams = {
  slug: string;
};

type PageProps = {
  params: PageParams;
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const dirPath = path.join(process.cwd(), "mdx");
  const source = fs.readFileSync(`${dirPath}/${slug}.mdx`, "utf-8");
  const { content, frontmatter } = await compileMDX<Frontmatter>({ source, options: { mdxOptions: {
    remarkPlugins: [remarkGfm]
  }, parseFrontmatter: true }})

  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <h5>{frontmatter.date.toISOString()}</h5>
      {content}
    </Layout>
  );
}