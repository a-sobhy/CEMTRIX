"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

// Versioned file names: these are served with a 1-year immutable cache (see next.config.ts),
// so a changed video or poster must get a new file name, never overwrite these.
const POSTER = "/media/hero-poster-v1.webp";
const VIDEO_WEBM = "/media/hero-loop-v1.webm";
const VIDEO_MP4 = "/media/hero-loop-v1.mp4";

/** Skip the video on small screens and for users who asked for less motion or less data. */
function shouldLoadVideo() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return !(
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(prefers-reduced-data: reduce)").matches ||
    nav.connection?.saveData
  );
}

/**
 * Hero background. The poster renders immediately (it is the likely LCP element, so it is
 * preloaded); the video is attached only after the page's load event, so it never competes
 * with the headline, fonts or scripts for bandwidth.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo()) return;

    const onPlaying = () => {
      video.dataset.playing = "";
    };
    const start = () => {
      video.src = video.canPlayType('video/webm; codecs="vp9"') ? VIDEO_WEBM : VIDEO_MP4;
      video.addEventListener("playing", onPlaying, { once: true });
      video.play().catch(() => {
        // Autoplay blocked: the poster stays visible, which is fine.
      });
    };

    if (document.readyState === "complete") {
      start();
      return () => video.removeEventListener("playing", onPlaying);
    }
    window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  return (
    <>
      <Image
        src={POSTER}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 data-playing:opacity-30"
      />
    </>
  );
}
