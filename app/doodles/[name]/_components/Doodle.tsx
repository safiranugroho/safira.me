"use client"

import Script from "next/script";

type DoodleProps = {
  name: string;
}

export function Doodle({ name }: DoodleProps) {
  const Component = `doodle-${name}`;
  return <>
    <Script src={`${process.env.NEXT_PUBLIC_DOODLES_HOST}/web-components.js`} />
    <Component></Component>
  </>
}