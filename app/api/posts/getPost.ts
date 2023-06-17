import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Frontmatter = {
  title: string;
  date: Date;
  description: string;
  image: string;
};

type Post = {
  content: string;
  data: Frontmatter;
}

export default function getPost(name: string): Post {
  const dirPath = path.join(process.cwd(), "app", "api", "mdx");
  const fileContent = fs.readFileSync(`${dirPath}/${name}.mdx`, "utf-8");
  const { content, data } = matter(fileContent);
  return { content, data } as Post;
}