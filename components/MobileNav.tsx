'use client';

import { profileData, projects } from '@/lib/data';
import { useState } from 'react';

interface MobileNavProps {
  activeProject: string | null;
  activeSection: string | null;
  onProjectClick: (projectId: string) => void;
  onSectionClick: (projectId: string, sectionId: string) => void;
}

export default function MobileNav({
  activeProject,
  activeSection,
  onProjectClick,
  onSectionClick,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const handleProjectClick = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
      onProjectClick(projectId);
    }
  };

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--color-background)] border-b border-[var(--color-border)] z-20 px-6 flex items-center justify-between">
        <h1 className="font-ui font-bold text-[var(--text-nav)]">
          {profileData.name}
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-body text-[var(--text-nav)] text-[var(--color-text-secondary)]"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[var(--color-background)] z-10 overflow-y-auto">
          <nav className="px-6 py-8">
            <h2 className="font-ui font-medium text-[var(--text-label)] uppercase tracking-[0.06em] text-[var(--color-text-tertiary)] mb-4">
              Work
            </h2>
            <ul className="space-y-2 mb-12">
              {projects.map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => {
                      handleProjectClick(project.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left font-body text-[var(--text-nav)] transition-colors hover:text-[var(--color-nav-hover)] ${
                      activeProject === project.id
                        ? 'font-medium text-[var(--color-text-primary)]'
                        : 'font-normal text-[var(--color-text-secondary)]'
                    }`}
                  >
                    {project.name}
                  </button>

                  {expandedProject === project.id && (
                    <ul className="mt-2 ml-4 space-y-1 border-l border-[var(--color-border)] pl-3">
                      {project.sections.map((section) => (
                        <li key={section.id}>
                          <button
                            onClick={() => {
                              onSectionClick(project.id, section.id);
                              setIsOpen(false);
                            }}
                            className={`w-full text-left font-body text-[var(--text-body-sm)] transition-colors hover:text-[var(--color-nav-hover)] ${
                              activeSection === section.id
                                ? 'font-medium text-[var(--color-text-primary)]'
                                : 'font-normal text-[var(--color-text-secondary)]'
                            }`}
                          >
                            — {section.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <h2 className="font-ui font-medium text-[var(--text-label)] uppercase tracking-[0.06em] text-[var(--color-text-tertiary)] mb-4">
              About
            </h2>
            <div className="space-y-2">
              <a
                href={`mailto:${profileData.email}`}
                className="block font-body text-[var(--text-nav)] text-[var(--color-text-secondary)] hover:text-[var(--color-nav-hover)] transition-colors"
              >
                Email
              </a>
              <a
                href={profileData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-body text-[var(--text-nav)] text-[var(--color-text-secondary)] hover:text-[var(--color-nav-hover)] transition-colors"
              >
                Resume
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-body text-[var(--text-nav)] text-[var(--color-text-secondary)] hover:text-[var(--color-nav-hover)] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
