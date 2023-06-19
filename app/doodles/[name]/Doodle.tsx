"use client"

import '@safira.me/doodles';

type DoodleProps = {
  name: string;
}

export function Doodle({ name }: DoodleProps) {
  const Component = `doodles-${name}`;
  return <Component></Component>
}