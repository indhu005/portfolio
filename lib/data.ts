export interface Section {
  id: string;
  title: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  tools: string;
  sections: Section[];
}

export const projects: Project[] = [
  {
    id: 'keye',
    name: 'Keye',
    type: 'Product Design',
    tools: 'Figma X React',
    sections: [
      { id: 'overview', title: 'Overview' },
      { id: 'research', title: 'Research' },
      { id: 'design', title: 'Design' },
      { id: 'prototype', title: 'Prototype' },
      { id: 'testing', title: 'Testing' },
      { id: 'launch', title: 'Launch' },
      { id: 'reflection', title: 'Reflection' },
    ],
  },
  {
    id: 'lat',
    name: 'LAT',
    type: 'UX Design',
    tools: 'Sketch X InVision',
    sections: [
      { id: 'overview', title: 'Overview' },
      { id: 'research', title: 'Research' },
      { id: 'design', title: 'Design' },
      { id: 'prototype', title: 'Prototype' },
      { id: 'testing', title: 'Testing' },
      { id: 'launch', title: 'Launch' },
      { id: 'reflection', title: 'Reflection' },
    ],
  },
  {
    id: 'true-media',
    name: 'True Media',
    type: 'Development',
    tools: 'Next.js X TypeScript',
    sections: [
      { id: 'overview', title: 'Overview' },
      { id: 'research', title: 'Research' },
      { id: 'design', title: 'Design' },
      { id: 'prototype', title: 'Prototype' },
      { id: 'testing', title: 'Testing' },
      { id: 'launch', title: 'Launch' },
      { id: 'reflection', title: 'Reflection' },
    ],
  },
  {
    id: 'other',
    name: 'Other Projects',
    type: 'Various',
    tools: 'Multiple Tools',
    sections: [
      { id: 'overview', title: 'Overview' },
      { id: 'projects', title: 'Projects' },
    ],
  },
];

export const profileData = {
  name: 'Indhu',
  title: 'Product Designer',
  location: 'based in Seattle',
  email: 'hello@indhu.design',
  resume: '/resume.pdf',
  linkedin: 'https://linkedin.com/in/indhu',
};
