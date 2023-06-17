import fs from "fs";
import path from "path";
import { NextResponse } from 'next/server';
import getPost, { Frontmatter } from "./getPost";

type Post = Frontmatter & {
  slug: string;
};

export async function GET() {
  const dirPath = path.join(process.cwd(), "app", "api", "mdx");
  const posts = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((file) => file.name.endsWith('.mdx'))
    .map((file) => file.name.replace(/.mdx$/, ""))
    .map((name) => ({ ...getPost(name).data, slug: name }))
    .sort((a: Post, b) => b!.date.getTime() - a!.date.getTime());

  return NextResponse.json({ posts });
}