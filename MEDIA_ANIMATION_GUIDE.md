# 🎨 Media, Animation & Spline Integration Guide

## ✅ Installed Packages

### Animation
- **framer-motion** - Smooth animations and transitions
- **tailwindcss** (already installed) - Utility-first CSS with animation support

### Media Optimization
- **sharp** - High-performance image processing (used by Next.js)
- **@squoosh/lib** - Advanced image/GIF compression
- **react-player** - Optimized video player with lazy loading

### 3D Integration
- **@splinetool/react-spline** - Spline 3D scene integration
- **@splinetool/runtime** - Spline runtime engine

### Build Tools
- **file-loader** - Webpack loader for media files
- **@svgr/webpack** - Import SVGs as React components

---

## 🚀 Quick Start Examples

### 1. Optimized Images (with lazy load & blur)

```tsx
import OptimizedImage from "@/components/media/OptimizedImage";

export default function Portfolio() {
  return (
    <OptimizedImage
      src="/images/project-thumbnail.jpg"
      alt="Project thumbnail"
      width={800}
      height={600}
      animate={true}
      priority={false}
    />
  );
}
```

**Features:**
- Automatic WebP/AVIF conversion
- Lazy loading with blur placeholder
- Smooth fade-in animation
- Responsive image sizes

---

### 2. Optimized GIFs (heavy files)

```tsx
import OptimizedGif from "@/components/media/OptimizedGif";

export default function ProjectDemo() {
  return (
    <OptimizedGif
      src="/gifs/interaction-demo.gif"
      alt="App interaction demo"
      width={1200}
      height={800}
      className="rounded-lg shadow-lg"
    />
  );
}
```

**Best practices for GIFs:**
- Compress before uploading (use ezgif.com or gifsicle)
- Consider converting to video (MP4) for better compression
- Use lazy loading for below-the-fold GIFs

---

### 3. Optimized Videos (autoplay, loop, hover-to-play)

```tsx
import OptimizedVideo from "@/components/media/OptimizedVideo";

// Autoplay & Loop
export default function BackgroundVideo() {
  return (
    <OptimizedVideo
      src="/videos/background-animation.mp4"
      autoPlay={true}
      loop={true}
      muted={true}
      className="w-full h-auto"
    />
  );
}

// Play on Hover
export default function ProjectPreview() {
  return (
    <OptimizedVideo
      src="/videos/project-demo.mp4"
      playOnHover={true}
      poster="/images/video-poster.jpg"
      className="rounded-lg"
    />
  );
}
```

**Video optimization tips:**
- Use MP4 format (H.264 codec) for best compatibility
- Compress videos before upload (HandBrake, FFmpeg)
- Add poster images for better UX
- Keep videos under 10MB for web

**Convert GIF to MP4 (90% size reduction):**
```bash
ffmpeg -i input.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" output.mp4
```

---

### 4. Spline 3D Game/Scene

```tsx
import SplineScene from "@/components/media/SplineScene";

export default function InteractiveGame() {
  return (
    <SplineScene
      scene="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode"
      className="w-full h-[600px] rounded-lg"
      onLoad={() => console.log("Spline loaded!")}
    />
  );
}
```

**How to get your Spline scene URL:**
1. Open your project in Spline
2. Click **Export** → **Code Export**
3. Select **React (Next.js)**
4. Copy the scene URL

**Performance tips:**
- Spline scenes can be heavy - use lazy loading (already implemented)
- Show loading state (automatically included)
- Consider mobile performance

---

### 5. Animated Sections (scroll animations)

```tsx
import AnimatedSection from "@/components/media/AnimatedSection";

export default function Projects() {
  return (
    <>
      <AnimatedSection direction="up" delay={0}>
        <h2>Project 1</h2>
        <p>Description...</p>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.2}>
        <h2>Project 2</h2>
        <p>Description...</p>
      </AnimatedSection>

      <AnimatedSection direction="left" delay={0.4}>
        <h2>Project 3</h2>
        <p>Description...</p>
      </AnimatedSection>
    </>
  );
}
```

---

## 🎭 Framer Motion Examples

### Fade In on Load
```tsx
"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1>Welcome to my portfolio</h1>
    </motion.div>
  );
}
```

### Stagger Children Animation
```tsx
"use client";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProjectGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 gap-6"
    >
      <motion.div variants={item}>Project 1</motion.div>
      <motion.div variants={item}>Project 2</motion.div>
      <motion.div variants={item}>Project 3</motion.div>
    </motion.div>
  );
}
```

### Hover Scale Effect
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
>
  Click me
</motion.button>
```

### Scroll Progress Bar
```tsx
"use client";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
    />
  );
}
```

---

## 📁 File Organization

```
portfolio-next/
├── public/
│   ├── images/          # Optimized images (JPG, PNG, WebP)
│   ├── gifs/           # GIF files (or convert to MP4)
│   ├── videos/         # MP4, WebM video files
│   └── spline/         # Any Spline assets
├── components/
│   └── media/
│       ├── OptimizedImage.tsx
│       ├── OptimizedVideo.tsx
│       ├── OptimizedGif.tsx
│       ├── SplineScene.tsx
│       └── AnimatedSection.tsx
└── app/
    └── page.tsx        # Use components here
```

---

## ⚡ Performance Best Practices

### Image Optimization
1. **Use WebP/AVIF formats** (Next.js does this automatically)
2. **Set proper dimensions** to prevent layout shift
3. **Use priority={true}** for above-the-fold images
4. **Compress before upload** (TinyPNG, Squoosh)

### Video Optimization
1. **Convert GIFs to MP4** (90% smaller!)
2. **Use poster images** for lazy loading
3. **Keep videos under 10MB** for web
4. **Use autoplay sparingly** (impacts performance)

### GIF Optimization
1. **Reduce frame rate** (15-20 fps is often enough)
2. **Limit dimensions** (max 1200px wide)
3. **Reduce colors** (128-256 colors)
4. **Consider MP4 instead** for large GIFs

### Spline Optimization
1. **Reduce polygon count** in Spline editor
2. **Use lazy loading** (already implemented in SplineScene)
3. **Show loading state** (prevents janky loading)
4. **Test on mobile** (Spline can be heavy on phones)

---

## 🔧 Advanced: Compress Images/GIFs with Scripts

### Install compression tools globally:
```bash
npm install -g @squoosh/cli
```

### Compress all images in a folder:
```bash
# From portfolio-next directory
npx @squoosh/cli --webp auto public/images/*.jpg
```

### Compress GIFs:
```bash
# Reduce GIF size by 50-70%
npx gifsicle -O3 --colors 256 input.gif -o output.gif
```

---

## 🎨 Tailwind Animation Classes

Tailwind includes built-in animation utilities:

```tsx
// Spin
<div className="animate-spin">Loading...</div>

// Ping
<div className="animate-ping">Notification</div>

// Pulse
<div className="animate-pulse">Loading skeleton</div>

// Bounce
<div className="animate-bounce">Scroll down</div>

// Custom transitions
<div className="transition-all duration-500 hover:scale-110">
  Hover me
</div>
```

---

## 🌐 Next.js Image Config (Already Set Up)

Your `next.config.ts` is configured for:
- ✅ AVIF & WebP automatic conversion
- ✅ Multiple device sizes
- ✅ SVG support (as React components)
- ✅ Video file imports
- ✅ Remote image patterns
- ✅ Proper caching (60s minimum)

---

## 📚 Useful Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Spline for React](https://docs.spline.design/d6f6ebdb88a94e0ba29dd62c73eba1e2)
- [React Player Docs](https://github.com/cookpete/react-player)
- [FFmpeg Video Compression](https://trac.ffmpeg.org/wiki/Encode/H.264)
- [Image Compression Tools](https://squoosh.app/)

---

## 🚨 Common Issues & Fixes

### "Module not found: Can't resolve '@splinetool/react-spline'"
- Make sure you imported it in a client component (`"use client"`)
- Restart dev server: `npm run dev`

### Videos not playing on iOS
- Add `muted` and `playsInline` attributes
- Use MP4 with H.264 codec

### Spline scene not loading
- Check network tab for CORS errors
- Verify scene URL is public
- Test scene URL in browser first

### Images causing layout shift
- Always set width and height props
- Use `fill` prop for responsive containers

---

## ✨ Ready to Use!

All components are ready. Just import and use them in your pages:

```tsx
// app/page.tsx
import OptimizedImage from "@/components/media/OptimizedImage";
import OptimizedVideo from "@/components/media/OptimizedVideo";
import SplineScene from "@/components/media/SplineScene";
import AnimatedSection from "@/components/media/AnimatedSection";

export default function Home() {
  return (
    <main>
      <AnimatedSection>
        <h1>Welcome</h1>
      </AnimatedSection>

      <OptimizedImage src="/images/hero.jpg" alt="Hero" width={1920} height={1080} />
      
      <OptimizedVideo src="/videos/demo.mp4" playOnHover />
      
      <SplineScene scene="YOUR_SPLINE_URL" />
    </main>
  );
}
```

Happy building! 🚀
