"use client"

import Script from "next/script";

type DoodleProps = {
  name: string;
}

export function Doodle({ name }: DoodleProps) {
  const Component = `doodle-${name}`;
  return <>
    <Script src="https://doodles.safira.me/web-components.js" />
    <Component></Component>
  </>
}