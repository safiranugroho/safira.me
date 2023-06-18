import fs from "fs";
import Link from "next/link";
import { mdx } from "./_lib/dir-path";
import { dMMMMyyyy } from "./_lib/format-date";
import { getCompiledMDX } from "./_lib/get-compiled-mdx";
import { Frontmatter } from "./_lib/types";

type Post = {
  slug: string;
  frontmatter: Frontmatter
};

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="md:max-w-prose">
      <h1>Blog</h1>
      {posts
        .sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime())
        .map(({ slug, frontmatter }: Post, i: number) => (
          <div key={i} className="mb-8">
            <Link href={`/blog/${slug}`} className="text-2xl">{frontmatter.title}</Link>
            <p className="mt-0">{frontmatter.description}</p>
          </div>
      ))}
    </div>
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