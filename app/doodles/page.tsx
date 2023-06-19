import Link from "next/link";

export default async function Page() {
  return <div>
    <Link href="/doodles/ball">Ball</Link>
    <Link href="/doodles/keyboard">Keyboard</Link>
  </div>
}