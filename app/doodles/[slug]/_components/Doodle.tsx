"use client"

import '@safiranugroho/doodles/components';
import '@safiranugroho/doodles/fonts';
import { doodles } from '@safiranugroho/doodles/metadata';
import { Doodle } from '../../types';

type DoodleProps = {
  name: string;
}

export function Doodle({ name }: DoodleProps) {
  const doodle = doodles.find((d: Doodle) => d.slug === name)!;
  const isAvailableOnMobile = doodle.screen.includes('mobile') || doodle.screen.includes('all');
  const isAvailableOnTablet = doodle.screen.includes('tablet') || doodle.screen.includes('all');

  if (window.screen.width < 600 && !isAvailableOnMobile) {
    return <p>This doodle is only available on tablet and desktop, sorry!</p>;
  }

  if (window.screen.width >= 600 && window.screen.width < 960 && !isAvailableOnTablet) {
    return <p>This doodle is only available on desktop, sorry!</p>;
  }

  const Component = `doodle-${name}`;
  return <Component></Component>;
}