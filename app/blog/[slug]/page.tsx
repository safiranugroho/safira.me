import fs from "fs";
import path from "path";
import { compileMDX } from 'next-mdx-remote/rsc';
import Layout from "./layout";

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
  const { content } = await compileMDX({ source, options: { parseFrontmatter: true }})

  return (
    <Layout>
      {content}
    </Layout>
  );
}