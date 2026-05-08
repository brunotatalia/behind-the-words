'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Legacy redirect — /play2 was the temporary True/False prototype.
// The True/False mode is now the main /play.
export default function Play2Redirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/play');
  }, [router]);
  return null;
}
