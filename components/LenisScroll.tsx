"use strict";

"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScroll() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential out
      infinite: false,
      gestureOrientation: "vertical",
      orientation: "vertical",
      syncTouch: false, // smooth touch scroll
      touchMultiplier: 1.8,
      wheelMultiplier: 1.0,
    });

    // RAF Loop
    let animationFrameId: number;
    
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Global scroll listeners or adjustments can be placed here if needed

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
