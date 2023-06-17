import { headers } from "next/headers";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
};

export default async function Page() {
  const host = headers().get('host');
  const res = await fetch(`http://${host}/api/posts`, { method: 'GET' });
  const data = await res.json();

  return (
    <div>
      {data.posts.map((post: Post, i: number) => (
        <div key={i}>
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <p>{post.description}</p>
          <Link href={`/blog/${post.slug}`}>Keep reading &gt;</Link>
        </div>
      ))}
    </div>
  );
}
