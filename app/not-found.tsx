import Link from 'next/link'
import Image from 'next/image'

import detective from './_assets/female-detective.png';
 
export default function NotFound() {
  return (
    <>
      <h1>Oops, nothing to see here!</h1>
      <p><Link href="https://www.twitter.com/hisafira/">Let me know</Link> what you were looking for.</p>
      <Image src={detective} alt='Point left icon' width={60} height={60} className="p-0 m-0" />
    </>
  )
}