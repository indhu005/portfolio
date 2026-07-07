'use client';

import { useEffect, useRef } from 'react';
import HeroSection from './sections/HeroSection';
import OverviewSection from './sections/OverviewSection';
import ProblemSection from './sections/ProblemSection';
import SolutionSection from './sections/SolutionSection';
import MetricsSection from './sections/MetricsSection';
import VisualsSection from './sections/VisualsSection';
import ReflectionSection from './sections/ReflectionSection';
import { Project } from '@/lib/data';

interface ProjectContentProps {
  project: Project;
  onSectionChange: (sectionId: string) => void;
}

export default function ProjectContent({ project, onSectionChange }: ProjectContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onSectionChange(entry.target.id);
        }
      });
    }, options);

    const sections = contentRef.current?.querySelectorAll('section[id]');
    sections?.forEach((section) => observer.observe(section));

    return () => {
      sections?.forEach((section) => observer.unobserve(section));
    };
  }, [project.id, onSectionChange]);

  return (
    <div ref={contentRef}>
      <HeroSection id="hero" title={project.name} />
      <OverviewSection id="overview" />
      <ProblemSection id="problem" />
      <SolutionSection id="solution" />
      <MetricsSection id="metrics" />
      <VisualsSection id="visuals" />
      <ReflectionSection id="reflection" />
    </div>
  );
}
