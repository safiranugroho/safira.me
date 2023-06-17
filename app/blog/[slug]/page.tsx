import { headers } from "next/headers";
import { MDXRemote } from 'next-mdx-remote';
import Layout from "./layout";

type PageParams = {
  slug: string;
};

type PageProps = {
  params: PageParams;
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const host = headers().get('host');
  const res = await fetch(`http://${host}/api/posts?slug=${slug}`, { method: 'GET' });
  const json = await res.json();

  return (
    <Layout>
      <MDXRemote {...json.data.source} />
    </Layout>
  );
}