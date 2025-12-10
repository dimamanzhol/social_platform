'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-primary">Loading...</div>
    </div>
  );
}