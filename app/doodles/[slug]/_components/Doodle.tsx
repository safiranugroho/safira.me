"use client"

import '@safiranugroho/doodles/components';
import '@safiranugroho/doodles/fonts';

type DoodleProps = {
  name: string;
}

export function Doodle({ name }: DoodleProps) {
  const Component = `doodle-${name}`;
  return <>
    <Component></Component>
  </>
}