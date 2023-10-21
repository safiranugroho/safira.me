import Link from "next/link";
import { IndexPage } from "./_components/IndexPage";

export default function Home() {
  return (
    <IndexPage>
      <h1>Hi, I&apos;m Safira 👋🏽</h1>
      <p>
        I&apos;m a software engineer,<br />
        based in Melbourne/Naarm 🇦🇺 <br />
        and I go by she/her/dia. 🇲🇨
      </p>
      <p>
        I <Link href="/blog">write</Link> and <Link href="/doodles">doodle</Link> sometimes.
      </p>
      <p>
        I&apos;m on <Link href="https://www.twitter.com/hisafira/">Twitter</Link>,{' '}
        <Link href="https://www.linkedin.com/in/safiranugroho/">LinkedIn</Link>,
        and <Link href="https://github.com/safiranugroho">GitHub</Link>,<br/> 
        or reach me at <Link href="mailto:safiranugroho+site@gmail.com">safiranugroho@gmail.com</Link>.
      </p>
    </IndexPage>
  )
}
