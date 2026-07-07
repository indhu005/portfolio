"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface OptimizedGifProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  unoptimized?: boolean;
  priority?: boolean;
}

export default function OptimizedGif({
  src,
  alt,
  width,
  height,
  className = "",
  unoptimized = true, // GIFs often need unoptimized to preserve animation
  priority = false,
}: OptimizedGifProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        unoptimized={unoptimized}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  );
}
