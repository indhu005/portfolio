"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: () => void;
  fallback?: React.ReactNode;
}

export default function SplineScene({
  scene,
  className = "",
  onLoad,
  fallback = <SplineLoader />,
}: SplineSceneProps) {
  return (
    <Suspense fallback={fallback}>
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Spline scene={scene} onLoad={onLoad} />
      </motion.div>
    </Suspense>
  );
}

function SplineLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[400px] bg-gray-100 rounded-lg">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-sm text-gray-600">Loading 3D scene...</p>
      </motion.div>
    </div>
  );
}
