import Link from "next/link";
import { doodles } from "@safiranugroho/doodles/metadata";

type Doodle = { 
  slug: string; 
  title: string, 
  description: string 
};

export default async function Page() {
  return (
    <div className="flex flex-col md:max-w-prose">
      <h1>Doodles</h1>
      {doodles.map((d: Doodle, i: number) => (
        <div key={i} className="mb-8">
          <Link href={`/doodles/${d.slug}`} className="text-2xl">{d.title}</Link>
          <p className="m-0">{d.description}</p>
        </div>
      ))}
    </div>
  );
}