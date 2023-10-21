import Link from "next/link";
import { IndexPage } from "./_components/IndexPage";
import { InlineImage } from "./_components/InlineImage";

export default function Home() {
  return (
    <IndexPage>
      <h1>Hi, I&apos;m Safira 👋🏼</h1>
      <p>
        I&apos;m a software engineer,<br />
        based in Melbourne/Naarm <InlineImage src="/flag-au.png" alt="Australian flag"/><br />
        and I go by she/her/dia. <InlineImage src="/flag-id.png" alt="Indonesian flag"/>
      </p>
      <p>
        I <Link href="/blog">write</Link> and <Link href="/doodles">doodle</Link> sometimes.
      </p>
      <p className="md:hidden">
        I&apos;m on <Link href="https://www.twitter.com/hisafira/">Twitter</Link>,{' '}
        <Link href="https://www.linkedin.com/in/safiranugroho/">LinkedIn</Link>,
        and <Link href="https://github.com/safiranugroho">GitHub</Link>,<br/> 
        or reach me at <Link href="mailto:safiranugroho+site@gmail.com">safiranugroho@gmail.com</Link>.
      </p>
    </IndexPage>
  )
}
