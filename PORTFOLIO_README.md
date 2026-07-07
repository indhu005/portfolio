# Portfolio Site

A Next.js 14 portfolio site with fixed sidebar navigation and scrollable project content.

## Layout Structure

- **Fixed Left Sidebar (380px)**: Navigation, profile info, and project list
- **Fixed Top Bar (72px)**: Project metadata (name, type, tools)
- **Scrollable Content Area**: Long-form project case studies with section tracking

## Features

- ✅ Intersection Observer for active section highlighting
- ✅ Expandable project TOC in sidebar
- ✅ Smooth scroll navigation
- ✅ Mobile responsive (hamburger menu)
- ✅ Design system with custom tokens

## Typography

- **Fraunces**: Hero headings only
- **Geist**: Section headings, labels, UI elements
- **DM Sans**: Body text and metadata
- **Gilroy**: Metric numbers (currently using Geist as fallback)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customization

### Update Profile Data

Edit `lib/data.ts`:

```typescript
export const profileData = {
  name: 'Your Name',
  title: 'Product Designer',
  location: 'San Francisco, CA',
  email: 'hello@example.com',
  resume: '/resume.pdf',
  linkedin: 'https://linkedin.com/in/yourname',
};
```

### Add Projects

Add projects to the `projects` array in `lib/data.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Project Name',
  type: 'Project Type',
  tools: ['Tool 1', 'Tool 2'],
  sections: [
    { id: 'hero', title: 'Hero', type: 'hero' },
    // ... other sections
  ],
}
```

### Customize Section Content

Each section component is in `components/sections/`:
- `HeroSection.tsx`
- `OverviewSection.tsx`
- `ProblemSection.tsx`
- `SolutionSection.tsx`
- `MetricsSection.tsx`
- `VisualsSection.tsx`
- `ReflectionSection.tsx`

Pass custom props to override default content.

## Design Tokens

All design tokens are defined in `app/globals.css`:

- Colors: `--color-background`, `--color-text-primary`, etc.
- Typography: `--font-display`, `--font-ui`, `--font-body`, `--font-numbers`
- Spacing: `--sidebar-width`, `--topbar-height`, `--section-gap`, etc.

## File Structure

```
app/
  ├── layout.tsx          # Root layout with fonts
  ├── page.tsx            # Main page with state management
  └── globals.css         # Design tokens & global styles

components/
  ├── Sidebar.tsx         # Desktop sidebar navigation
  ├── TopBar.tsx          # Desktop top metadata bar
  ├── MobileNav.tsx       # Mobile hamburger menu
  ├── ProjectContent.tsx  # Project wrapper with Intersection Observer
  └── sections/           # Individual section components
      ├── HeroSection.tsx
      ├── OverviewSection.tsx
      ├── ProblemSection.tsx
      ├── SolutionSection.tsx
      ├── MetricsSection.tsx
      ├── VisualsSection.tsx
      └── ReflectionSection.tsx

lib/
  └── data.ts             # Portfolio data & types
```

## Optional: Add Gilroy Font

1. Download Gilroy font
2. Add to `public/fonts/Gilroy-Bold.woff2`
3. Update `app/layout.tsx` to use localFont for Gilroy

## Mobile Responsiveness

- **Desktop (lg+)**: Sidebar + Topbar + Content layout
- **Mobile**: Hamburger menu at top, full-width content below

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v4
- React Hooks (Intersection Observer)
