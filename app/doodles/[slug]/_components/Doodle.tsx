"use client"

import '@safiranugroho/doodles/fonts';
import { doodles } from '@safiranugroho/doodles/metadata';
import type { Doodle as DoodleMetadata } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

type DoodleProps = {
  name: string;
}

function DoodleContent({ name }: DoodleProps) {
  const doodle = doodles.find((d: DoodleMetadata) => d.slug === name)!;
  const isAvailableOnMobile = doodle.screen.includes('mobile') || doodle.screen.includes('all');
  const isAvailableOnTablet = doodle.screen.includes('tablet') || doodle.screen.includes('all');

  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const handleWindowResize = useCallback(() => setScreenWidth(window.innerWidth), []);

  useEffect(() => {
    // The web components register themselves with `customElements`, which only exists in the browser.
    import('@safiranugroho/doodles/components');
  }, []);

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

export const Doodle = dynamic(() => Promise.resolve(DoodleContent), { ssr: false });
