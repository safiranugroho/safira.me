import { MDXRemote } from 'next-mdx-remote/rsc';
import Layout from "./layout";
import { headers } from 'next/headers';

type PageParams = {
  slug: string;
};

type PageProps = {
  params: PageParams;
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const host = headers().get('host');
  const res = await fetch(`http://${host}/api/posts/${slug}`);
  const { content } = await res.json();

  return (
    <Layout>
      <MDXRemote source={content} />
    </Layout>
  );
}