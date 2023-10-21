import fs from "fs";
import Link from "next/link";
import { mdx } from "./_lib/dir-path";
import { getCompiledMDX } from "./_lib/get-compiled-mdx";
import { Frontmatter } from "./_lib/types";
import { IndexListPage } from "../_components/IndexListPage";

type Post = {
  slug: string;
  frontmatter: Frontmatter
};

export default async function Page() {
  const posts = await getPosts();

  return (
    <IndexListPage title="Blog" description="A stream of consciousness.">
      {posts
        .sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime())
        .map(({ slug, frontmatter }: Post, i: number) => (
          <div key={i}>
            <Link href={`/blog/${slug}`} className="text-2xl">{frontmatter.title}</Link>
            <p className="mt-0">{frontmatter.description}</p>
          </div>
      ))}
    </IndexListPage>
  );
}

const getPosts = async () => {
  return Promise.all(fs
    .readdirSync(mdx, { withFileTypes: true })
    .filter((file) => file.name.endsWith('.mdx'))
    .map((file) => file.name.replace(/.mdx$/, ""))
    .map(async (slug) => ({ slug, ...(await getCompiledMDX(slug)) }))
  );
}