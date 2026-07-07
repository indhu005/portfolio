# Case Study Guide

This guide explains how to add and customize case studies with visual content (images, videos, Figma prototypes).

## Layout Concept

The design follows a "living room" metaphor:
- **Sidebar & Header** = Fixed walls (always visible)
- **Content Area** = The "TV" that scrolls (where all visual content lives)
- **48px spacing** between sidebar and content area for breathing room

## Adding a New Case Study

### 1. Add to the case studies object

Edit `app/work/[slug]/page.tsx`:

```typescript
const caseStudies = {
  'your-project': {
    title: 'Your Project Name',
    subtitle: 'One-line description',
    description: 'Brief overview of the project',
    sections: [
      {
        id: 'snapshot',
        title: 'Snapshot',
        content: 'Brief text about this section...',
        media: [
          { type: 'image', src: '/images/project/hero.jpg', alt: 'Hero image' },
          { type: 'figma', src: 'https://www.figma.com/embed?embed_host=share&url=...', aspectRatio: '4/3' }
        ]
      },
      // ... more sections
    ]
  }
}
```

### 2. Add to generateStaticParams

```typescript
export async function generateStaticParams() {
  return [
    { slug: 'keye' },
    { slug: 'lat' },
    { slug: 'true-media' },
    { slug: 'your-project' }, // Add your new slug here
  ]
}
```

### 3. Update the Sidebar

Edit `components/Sidebar.tsx` to add your project:

```typescript
const projects = [
  { name: 'Keye', slug: 'keye' },
  { name: 'LAT', slug: 'lat' },
  { name: 'True Media', slug: 'true-media' },
  { name: 'Your Project', slug: 'your-project' }, // Add here
]
```

## Media Types

### Images

```typescript
{
  type: 'image',
  src: '/images/project-name/screenshot.jpg',
  alt: 'Description of image',
  caption: 'Optional caption text'
}
```

**Best practices:**
- Use high-quality images (2x resolution for retina displays)
- Optimize file sizes (use WebP or AVIF when possible)
- Keep images under 500KB for fast loading

### Videos

```typescript
{
  type: 'video',
  src: '/videos/project-name/demo.mp4',
  caption: 'Demo of the feature'
}
```

**Best practices:**
- Keep videos under 10MB
- Use MP4 format (H.264 codec)
- Include fallback poster image

### Figma Prototypes

```typescript
{
  type: 'figma',
  src: 'https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_URL',
  aspectRatio: '16/9', // or '4/3', '1/1', etc.
  caption: 'Interactive prototype'
}
```

**How to get Figma embed URL:**
1. Open your Figma file
2. Click Share → Copy link
3. Add to the embed format: `https://www.figma.com/embed?embed_host=share&url=YOUR_COPIED_LINK`

## Section Structure

Each section should be **visual-heavy**:
- Short text (2-3 sentences max)
- Large media showcasing the work
- Multiple media items per section if needed

## Spacing & Layout

- **48px** left padding (space from sidebar)
- **60px** right padding
- **160px** between sections (gives breathing room)
- **32px** between text and media
- Text max-width: **700px** (readable line length)

## Example Complete Section

```typescript
{
  id: 'solution',
  title: 'Solution',
  content: 'We designed an intuitive mobile-first experience that balances security with convenience.',
  media: [
    {
      type: 'image',
      src: '/images/keye/solution-overview.jpg',
      alt: 'Solution overview',
      caption: 'Final interface design'
    },
    {
      type: 'figma',
      src: 'https://www.figma.com/embed?embed_host=share&url=...',
      aspectRatio: '16/9',
      caption: 'Interactive prototype - try it out!'
    },
    {
      type: 'video',
      src: '/videos/keye/demo.mp4',
      caption: 'User flow demonstration'
    }
  ]
}
```

## File Organization

```
public/
├── images/
│   ├── keye/
│   │   ├── hero.jpg
│   │   ├── solution.jpg
│   │   └── impact.jpg
│   ├── lat/
│   └── true-media/
└── videos/
    ├── keye/
    └── lat/
```

## Tips

1. **Lead with visuals** - Show, don't just tell
2. **Use real screenshots** - Avoid lorem ipsum or placeholder images
3. **Add interactivity** - Figma prototypes let viewers experience your work
4. **Keep text minimal** - Let the visuals do the talking
5. **Optimize everything** - Fast loading = better experience
