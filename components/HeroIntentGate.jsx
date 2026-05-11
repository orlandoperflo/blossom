"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const HeroExperience = dynamic(() => import('./HeroExperience'), {
  loading: () => <div className="py-20 text-center text-slate-500">Loading interactive experience...</div>,
});

export default function HeroIntentGate() {
  const [mountHero, setMountHero] = useState(false);
  const gateRef = useRef(null);

  useEffect(() => {
    const node = gateRef.current;
    if (!node || mountHero) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setMountHero(true);
        observer.disconnect();
      }
    }, { rootMargin: '150px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [mountHero]);

  return (
    <section ref={gateRef} className="pt-20 md:pt-32">
      {mountHero ? (
        <HeroExperience />
      ) : (
        <div className="max-w-4xl mx-auto text-center py-20 px-4">
          <h1 className="text-4xl md:text-7xl font-black tracking-tight">Leads choose the first agent who responds.</h1>
          <button onClick={() => setMountHero(true)} className="mt-8 px-8 py-4 bg-slate-900 text-white rounded-full font-bold">Load Interactive Demo</button>
        </div>
      )}
    </section>
  );
}
