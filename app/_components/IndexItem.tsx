import Link from "next/link"

type IndexItemProps = {
  key: number;
  href: string;
  title: string;
  description: string;
}

export const IndexItem = ({ key, href, title, description}: IndexItemProps) => (
  <div key={key}>
    <Link href={href} className="text-2xl">{title}</Link>
    <p className="mt-0">{description}</p>
  </div>
)