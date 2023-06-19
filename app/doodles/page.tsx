import Link from "next/link";

const kebabToCamel = (kebab: string): string =>
  kebab
    .split('-')
    .reduce((acc, curr) => `${acc} ${curr.charAt(0).toUpperCase() + curr.slice(1)}`, '');

export default async function Page() {
  const doodles = ['ball', 'filter', 'keyboard', 'position', 'rps', 'tip-calculator', 'weather'];

  return (
    <div className="flex flex-col">
      {doodles.map((name, i) => (
        <Link key={i} href={`/doodles/${name}`}>{kebabToCamel(name)}</Link>
      ))}
    </div>
  );
}