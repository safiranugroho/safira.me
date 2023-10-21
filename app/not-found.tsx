import Link from 'next/link'
import Image from 'next/image'
 
export default function NotFound() {
  return (
    <>
      <h1>Oops, nothing to see here!</h1>
      <p><Link href="https://www.twitter.com/hisafira/">Let me know</Link> what you were looking for.</p>
      <Image src="/female-detective.png" alt='Point left icon' width={60} height={60} className="p-0 m-0" />
    </>
  )
}