import { serialize } from 'next-mdx-remote/serialize';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');

  const dirPath = path.join(process.cwd(), "app", "blog", "posts");
  const fileContent = fs.readFileSync(`${dirPath}/${slug}.mdx`, "utf-8");

  const { content, data } = matter(fileContent);
  const mdxSource = await serialize(content, { scope: data });
  return NextResponse.json({ source: mdxSource, frontMatter: data })
}