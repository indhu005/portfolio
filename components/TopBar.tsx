'use client';

import { projects } from '@/lib/data';

interface TopBarProps {
  activeProject: string | null;
}

export default function TopBar({ activeProject }: TopBarProps) {
  const project = projects.find((p) => p.id === activeProject);

  const displayLeft = project ? project.name : 'Home';
  const displayCenter = project ? project.type : 'Game Field';
  const displayRight = project ? project.tools : 'Spline X Illustrator';

  return (
    <header
      className="fixed top-0 bg-white border-b border-[rgba(0,0,0,0.08)] z-10 flex items-baseline justify-between"
      style={{ left: '380px', right: '0', height: '72px', paddingLeft: '60px', paddingRight: '60px', paddingTop: '24px' }}
    >
      <div className="font-body text-[16px] font-bold text-[#1C1917] leading-normal">
        {displayLeft}
      </div>
      <div className="font-body text-[14px] font-normal text-[#6B7280] leading-normal">
        {displayCenter}
      </div>
      <div className="font-body text-[14px] font-normal text-[#9CA3AF] leading-normal">
        {displayRight}
      </div>
    </header>
  );
}
