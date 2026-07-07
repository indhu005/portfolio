"use client";

import {
  OptimizedImage,
  OptimizedVideo,
  OptimizedGif,
  SplineScene,
  AnimatedSection,
} from "@/components/media";
import { motion } from "framer-motion";

export default function ExamplesPage() {
  return (
    <main className="min-h-screen p-8 bg-[#F7F4F0]">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <AnimatedSection>
          <motion.h1
            className="text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Media & Animation Examples 🎨
          </motion.h1>
          <p className="text-gray-600 text-lg">
            All your animation and media components ready to use!
          </p>
        </AnimatedSection>

        {/* Optimized Image Example */}
        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl font-bold mb-4">Optimized Image</h2>
          <p className="text-gray-600 mb-4">
            Auto-compressed, lazy-loaded with blur placeholder
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md">
            {/* Replace with your actual image */}
            <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
              <p className="text-gray-500">
                Add your image to /public/images/
              </p>
            </div>
            <pre className="mt-4 p-4 bg-gray-50 rounded text-sm overflow-x-auto">
              {`<OptimizedImage
  src="/images/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
  animate={true}
/>`}
            </pre>
          </div>
        </AnimatedSection>

        {/* Video Example */}
        <AnimatedSection delay={0.2}>
          <h2 className="text-3xl font-bold mb-4">Optimized Video</h2>
          <p className="text-gray-600 mb-4">
            Lazy-loaded, play on hover, with poster support
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
              <p className="text-gray-500">Add your video to /public/videos/</p>
            </div>
            <pre className="mt-4 p-4 bg-gray-50 rounded text-sm overflow-x-auto">
              {`<OptimizedVideo
  src="/videos/demo.mp4"
  playOnHover={true}
  poster="/images/poster.jpg"
  className="rounded-lg"
/>`}
            </pre>
          </div>
        </AnimatedSection>

        {/* GIF Example */}
        <AnimatedSection delay={0.3}>
          <h2 className="text-3xl font-bold mb-4">Optimized GIF</h2>
          <p className="text-gray-600 mb-4">
            Lazy-loaded with smooth fade-in animation
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
              <p className="text-gray-500">Add your GIF to /public/gifs/</p>
            </div>
            <pre className="mt-4 p-4 bg-gray-50 rounded text-sm overflow-x-auto">
              {`<OptimizedGif
  src="/gifs/animation.gif"
  alt="Animation demo"
  width={1200}
  height={800}
/>`}
            </pre>
            <p className="mt-4 text-sm text-amber-600">
              💡 Tip: Convert large GIFs to MP4 for 90% size reduction!
            </p>
          </div>
        </AnimatedSection>

        {/* Spline Example */}
        <AnimatedSection delay={0.4}>
          <h2 className="text-3xl font-bold mb-4">Spline 3D Scene</h2>
          <p className="text-gray-600 mb-4">
            Embed interactive Spline games and 3D scenes
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-700 font-semibold mb-2">
                  Your Spline Scene Here
                </p>
                <p className="text-gray-500 text-sm">
                  Export from Spline → Code Export → React
                </p>
              </div>
            </div>
            <pre className="mt-4 p-4 bg-gray-50 rounded text-sm overflow-x-auto">
              {`<SplineScene
  scene="https://prod.spline.design/YOUR-ID/scene.splinecode"
  className="w-full h-[600px]"
  onLoad={() => console.log("Loaded!")}
/>`}
            </pre>
          </div>
        </AnimatedSection>

        {/* Framer Motion Examples */}
        <AnimatedSection delay={0.5}>
          <h2 className="text-3xl font-bold mb-4">Framer Motion Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hover Scale */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Hover Scale</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg"
              >
                Hover me!
              </motion.button>
            </div>

            {/* Fade In */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Fade In</h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded"
              >
                Fading in and out...
              </motion.div>
            </div>

            {/* Slide In */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Slide In</h3>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="bg-green-500 text-white p-4 rounded"
              >
                Sliding from left...
              </motion.div>
            </div>

            {/* Rotate */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Rotate</h3>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-orange-500 rounded-lg mx-auto"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Stagger Animation */}
        <AnimatedSection delay={0.6}>
          <h2 className="text-3xl font-bold mb-4">Stagger Children</h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="grid grid-cols-4 gap-4"
          >
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="bg-purple-500 text-white p-8 rounded-lg text-center font-bold"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* Quick Start Guide */}
        <AnimatedSection delay={0.7}>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">🚀 Quick Start</h2>
            <div className="space-y-3">
              <p>✅ Framer Motion - Installed</p>
              <p>✅ Spline Runtime - Installed</p>
              <p>✅ React Player - Installed</p>
              <p>✅ Sharp (Image Optimization) - Installed</p>
              <p>✅ Tailwind CSS - Installed</p>
            </div>
            <p className="mt-6 text-blue-100">
              📖 See <strong>MEDIA_ANIMATION_GUIDE.md</strong> for full
              documentation
            </p>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
