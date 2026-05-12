'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useStore } from '@/stores/useStore';
import { useMobile } from '@/hooks/useMobile';

/* Layout */
import Navbar from '@/components/layout/Navbar';
import Loader from '@/components/layout/Loader';
import ScrollProgress from '@/components/ui/ScrollProgress';

/* Sections */
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import ExperienceSection from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import AIWork from '@/components/sections/AIWork';
import Timeline from '@/components/sections/Timeline';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

/* 3D Scene — dynamic import (no SSR) */
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const isLoaded = useStore((s) => s.isLoaded);
  const setActiveSection = useStore((s) => s.setActiveSection);
  useMobile();

  /* Intersection Observer for active section tracking */
  useEffect(() => {
    const ids = [
      'hero', 'about', 'skills', 'experience',
      'projects', 'certifications', 'ai-work', 'timeline', 'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <>
      {/* Loading screen */}
      <Loader />

      {/* 3D background */}
      {isLoaded && <Scene />}

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Content sections overlay */}
      <main className="content-overlay">
        <Hero />
        <About />
        <Skills />
        <ExperienceSection />
        <Projects />
        <Certifications />
        <AIWork />
        <Timeline />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
