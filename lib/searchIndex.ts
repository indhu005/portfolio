export interface SearchItem {
  label: string
  description: string
  group: string
  keywords: string[]
  url: string
  external?: boolean
}

export const SEARCH_INDEX: SearchItem[] = [
  // Pages
  {
    label: 'Home',
    description: 'Intro + the planting game',
    group: 'Pages',
    keywords: ['home', 'landing', 'intro', 'start', 'game', 'play', 'plant', 'trees'],
    url: '/',
  },
  {
    label: 'About',
    description: 'More on Indhu’s background',
    group: 'Pages',
    keywords: ['about', 'bio', 'background', 'experience'],
    url: '/about',
  },
  {
    label: 'Resume',
    description: 'Download the PDF',
    group: 'Pages',
    keywords: ['resume', 'cv', 'pdf', 'experience'],
    url: '/Indhu-Venkatachalam-Senior-Product-Designer.pdf',
    external: true,
  },
  {
    label: 'LinkedIn',
    description: 'linkedin.com/in/indhu05',
    group: 'Pages',
    keywords: ['linkedin', 'connect', 'profile'],
    url: 'https://www.linkedin.com/in/indhu05/',
    external: true,
  },

  // LAT
  {
    label: 'LAT — Overview',
    description: 'Lifecycle Assessment Tracker case study',
    group: 'LAT',
    keywords: ['lat', 'lifecycle', 'assessment', 'tracker', 'prototype', 'demo', 'try', 'click'],
    url: '/work/lat',
  },
  {
    label: 'LAT — Snapshot',
    description: 'Role, team, timeline, impact',
    group: 'LAT',
    keywords: ['lat', 'snapshot', 'overview', 'role', 'impact'],
    url: '/work/lat#snapshot',
  },
  {
    label: 'LAT — Context & Problem',
    description: 'University campus maintenance, the problem space',
    group: 'LAT',
    keywords: ['lat', 'context', 'problem', 'campus', 'maintenance'],
    url: '/work/lat#context-problem',
  },
  {
    label: 'LAT — Solution',
    description: 'Technician queue, the design response',
    group: 'LAT',
    keywords: ['lat', 'solution', 'design', 'technician', 'queue'],
    url: '/work/lat#solution',
  },
  {
    label: 'LAT — The Turning Point',
    description: 'What changed the direction of the project',
    group: 'LAT',
    keywords: ['lat', 'turning point', 'pivot'],
    url: '/work/lat#turning-point',
  },
  {
    label: 'LAT — Constraints & Design Responses',
    description: 'Working within enterprise/political constraints',
    group: 'LAT',
    keywords: ['lat', 'constraints', 'enterprise', 'trust'],
    url: '/work/lat#constraints',
  },
  {
    label: 'LAT — Tradeoffs',
    description: 'Hard calls made along the way',
    group: 'LAT',
    keywords: ['lat', 'tradeoffs', 'decisions'],
    url: '/work/lat#tradeoffs',
  },
  {
    label: 'LAT — Reflection',
    description: 'What I learned about AI in enterprise',
    group: 'LAT',
    keywords: ['lat', 'reflection', 'learnings'],
    url: '/work/lat#reflection',
  },

  // Keye
  {
    label: 'Keye — Overview',
    description: 'Founding product designer, subscription marketplace',
    group: 'Keye',
    keywords: ['keye', 'yc', 'startup', 'founding designer', 'marketplace'],
    url: '/work/keye',
  },
  {
    label: 'Keye — Snapshot',
    description: 'Role, team, timeline, impact',
    group: 'Keye',
    keywords: ['keye', 'snapshot', 'overview', 'role', 'impact'],
    url: '/work/keye#snapshot',
  },
  {
    label: 'Keye — The Problem',
    description: 'Why Keye needed a marketplace model',
    group: 'Keye',
    keywords: ['keye', 'problem', 'context'],
    url: '/work/keye#context-problem',
  },
  {
    label: 'Keye — Features',
    description: 'Credit marketplace, Chrome extension, design system',
    group: 'Keye',
    keywords: ['keye', 'features', 'credit', 'chrome extension', 'design system', 'sharing subscription'],
    url: '/work/keye#feature-index',
  },
  {
    label: 'Keye — Evidence Over Instinct',
    description: 'How decisions got validated',
    group: 'Keye',
    keywords: ['keye', 'evidence', 'validation', 'research'],
    url: '/work/keye#started',
  },
  {
    label: 'Keye — Tradeoffs & Hard Calls',
    description: 'Decisions made under startup constraints',
    group: 'Keye',
    keywords: ['keye', 'tradeoffs', 'hard calls'],
    url: '/work/keye#tradeoffs',
  },
  {
    label: 'Keye — Impact & Reflection',
    description: '0→20K MAUs, $1.5M raised, YC F24',
    group: 'Keye',
    keywords: ['keye', 'impact', 'reflection', 'results', 'yc f24', 'mau'],
    url: '/work/keye#impact',
  },

  // Misinformation Center
  {
    label: 'Misinformation Center — Overview',
    description: 'Media literacy tools for the AI age (UW capstone, TrueMedia.org)',
    group: 'Misinformation Center',
    keywords: ['misinformation', 'media literacy', 'truemedia', 'uw', 'capstone', 'deepfake'],
    url: '/work/misinformation-center',
  },
  {
    label: 'Misinformation Center — Snapshot',
    description: 'Role, team, timeline, impact',
    group: 'Misinformation Center',
    keywords: ['misinformation', 'snapshot', 'overview'],
    url: '/work/misinformation-center#snapshot',
  },
  {
    label: 'Misinformation Center — The Problem',
    description: 'Why media literacy tools matter now',
    group: 'Misinformation Center',
    keywords: ['misinformation', 'problem', 'context'],
    url: '/work/misinformation-center#problem',
  },
  {
    label: 'Misinformation Center — Features',
    description: 'The tools built for detecting and teaching',
    group: 'Misinformation Center',
    keywords: ['misinformation', 'features', 'tools'],
    url: '/work/misinformation-center#features',
  },
  {
    label: 'Misinformation Center — Testing & Validation',
    description: 'Tested with ~1,800 people at Misinfo Day',
    group: 'Misinformation Center',
    keywords: ['misinformation', 'testing', 'validation', 'misinfo day'],
    url: '/work/misinformation-center#testing',
  },
  {
    label: 'Misinformation Center — Market Research',
    description: 'Competitive and market landscape',
    group: 'Misinformation Center',
    keywords: ['misinformation', 'market', 'research', 'competitive'],
    url: '/work/misinformation-center#market',
  },
  {
    label: 'Misinformation Center — User Research',
    description: 'What people actually needed',
    group: 'Misinformation Center',
    keywords: ['misinformation', 'user research'],
    url: '/work/misinformation-center#research',
  },
  {
    label: 'Misinformation Center — Impact & Results',
    description: 'Outcomes from the capstone',
    group: 'Misinformation Center',
    keywords: ['misinformation', 'impact', 'results'],
    url: '/work/misinformation-center#impact',
  },
  {
    label: 'Misinformation Center — TrueMedia',
    description: 'The research collaboration partner',
    group: 'Misinformation Center',
    keywords: ['misinformation', 'truemedia', 'collaboration', 'partner'],
    url: '/work/misinformation-center#truemedia',
  },
  {
    label: 'Misinformation Center — Reflection',
    description: 'What I’d do differently',
    group: 'Misinformation Center',
    keywords: ['misinformation', 'reflection', 'learnings'],
    url: '/work/misinformation-center#reflection',
  },
]

export function searchPortfolio(query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return SEARCH_INDEX.filter((item) => item.group === 'Pages')

  const terms = q.split(/\s+/)
  const matches = SEARCH_INDEX.filter((item) => {
    const haystack = `${item.label} ${item.description} ${item.keywords.join(' ')}`.toLowerCase()
    return terms.every((term) => haystack.includes(term))
  })

  return matches.slice(0, limit)
}
