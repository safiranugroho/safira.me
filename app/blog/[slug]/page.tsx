import { getCompiledMDX } from "../_lib/get-compiled-mdx";

type PageParams = {
  slug: string;
};

export type PageProps = {
  params: PageParams;
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const { content } = await getCompiledMDX(slug);
  return content;
}
