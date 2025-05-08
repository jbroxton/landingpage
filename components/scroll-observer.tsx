'use client';

import { useEffect } from 'react';
import { setupScrollAnimation } from '@/lib/scroll-animation';

export default function ScrollObserver() {
  useEffect(() => {
    const cleanup = setupScrollAnimation();
    return cleanup;
  }, []);

  return null; // This component doesn't render anything
}