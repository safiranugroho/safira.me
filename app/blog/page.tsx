import fs from "fs";
import path from "path";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";

type Frontmatter = {
  title: string;
  date: Date;
  description: string;
  image: string;
};

type Post = {
  slug: string;
  frontmatter: Frontmatter
};

export default async function Page() {
  const posts = await getPosts();

  return (
    <>
      <h1>Blog</h1>
      {posts
        .sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime())
        .map(({ slug, frontmatter }: Post, i: number) => (
          <div key={i}>
            <h2>{frontmatter.title}</h2>
            <p>{frontmatter.date.toISOString()}</p>
            <p>{frontmatter.description}</p>
            <Link href={`/blog/${slug}`}>Keep reading &gt;</Link>
          </div>
      ))}
    </>
  );
}

const dirPath = path.join(process.cwd(), "mdx");
const getPosts = async () => {
  return Promise.all(fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((file) => file.name.endsWith('.mdx'))
    .map((file) => file.name.replace(/.mdx$/, ""))
    .map(async (slug) => ({ slug, frontmatter: await getFrontmatter(slug) }))
  );
}

const getFrontmatter = async (slug: string) => {
  const source = fs.readFileSync(`${dirPath}/${slug}.mdx`, "utf-8");
  const { frontmatter } = await compileMDX<Frontmatter>({ source, options: { parseFrontmatter: true }});
  return frontmatter;
}