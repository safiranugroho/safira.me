import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from 'next/server';

type Post = {
  slug: string;
  title: string;
  date: Date;
  description: string;
  image: string;
};

export async function GET() {
  const posts = getPosts();
  return NextResponse.json({ posts });
}

const dirPath = path.join(process.cwd(), "app", "api", "mdx");
const getPost = (file: fs.Dirent) => {
  if (!file.name.endsWith(".mdx")) return;

  const fileContent = fs.readFileSync(`${dirPath}/${file.name}`, "utf-8");
  const { data } = matter(fileContent);
  const { title, date, description, image } = data;
  const slug = file.name.replace(/.mdx$/, "");
  return { slug, title, date, description, image } as Post;
};

const getPosts = (): Post[] => {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .map(getPost)
    .filter((post) => post)
    .sort((a, b) => b!.date.getTime() - a!.date.getTime()) as Post[];
};
