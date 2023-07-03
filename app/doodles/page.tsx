import Link from "next/link";
import { doodles } from "./_doodles";

export default async function Page() {
  return (
    <div className="flex flex-col">
      {doodles.map((d, i) => (
        <Link key={i} href={`/doodles/${d.slug}`}>{d.title}</Link>
      ))}
    </div>
  );
}