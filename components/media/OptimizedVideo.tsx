"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

interface OptimizedVideoProps {
  src: string;
  width?: string | number;
  height?: string | number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  poster?: string;
  playOnHover?: boolean;
}

export default function OptimizedVideo({
  src,
  width = "100%",
  height = "auto",
  autoPlay = false,
  loop = true,
  muted = true,
  controls = false,
  className = "",
  poster,
  playOnHover = false,
}: OptimizedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playOnHover) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => setIsPlaying(true);
    const handleMouseLeave = () => setIsPlaying(false);

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [playOnHover]);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <ReactPlayer
        url={src}
        playing={isPlaying}
        loop={loop}
        muted={muted}
        controls={controls}
        width={width}
        height={height}
        light={poster}
        onReady={() => setIsLoaded(true)}
        config={{
          file: {
            attributes: {
              preload: "metadata",
            },
          },
        } as any}
      />
    </motion.div>
  );
}
