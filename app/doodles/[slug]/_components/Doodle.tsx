"use client"

import '@safiranugroho/doodles/components';
import '@safiranugroho/doodles/fonts';
import { doodles } from '@safiranugroho/doodles/metadata';
import { Doodle } from '../../types';
import { useCallback, useEffect, useState } from 'react';

type DoodleProps = {
  name: string;
}

export function Doodle({ name }: DoodleProps) {
  const doodle = doodles.find((d: Doodle) => d.slug === name)!;
  const isAvailableOnMobile = doodle.screen.includes('mobile') || doodle.screen.includes('all');
  const isAvailableOnTablet = doodle.screen.includes('tablet') || doodle.screen.includes('all');

  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const handleWindowResize = useCallback(() => setScreenWidth(window.innerWidth), []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  if (screenWidth >= 600 && screenWidth < 960 && !isAvailableOnTablet) {
    return <p>This doodle is only available on desktop, sorry!</p>;
  }

  if (screenWidth < 600 && !isAvailableOnMobile && !isAvailableOnTablet) {
    return <p>This doodle is only available on desktop, sorry!</p>;
  }

  if (screenWidth < 600 && !isAvailableOnMobile) {
    return <p>This doodle is only available on tablet and desktop, sorry!</p>;
  }

  const Component = `doodle-${name}`;
  return <Component></Component>;
}