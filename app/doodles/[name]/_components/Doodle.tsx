"use client"

import Head from "next/head";
import Script from "next/script";

type DoodleProps = {
  name: string;
}

export function Doodle({ name }: DoodleProps) {
  const Component = `doodle-${name}`;
  return <>
    <Script src="http://localhost:5173/web-components.js" />
    <Component></Component>
  </>
}