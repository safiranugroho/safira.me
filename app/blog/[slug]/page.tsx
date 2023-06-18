import { getCompiledMDX } from "../_lib/get-compiled-mdx";

type PageParams = {
  slug: string;
};

export type PageProps = {
  params: PageParams;
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const { content, frontmatter } = await getCompiledMDX(slug);

  return (
    <>
      <h1 className="mb-0">{frontmatter.title}</h1>
      {content}
    </>
  );
}
