"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/3d/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => null }
);

function StaticFallback() {
  return (
    <div className="relative flex size-full items-center justify-center">
      <div className="absolute size-56 animate-float rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-40 blur-3xl md:size-72" />
      <div className="absolute size-40 rounded-full border border-accent/30 md:size-56" />
      <div className="absolute size-28 rotate-12 rounded-2xl border border-accent/20 md:size-40" />
    </div>
  );
}

// Client-only wrapper around the React Three Fiber scene. Skips the WebGL
// canvas entirely for users who prefer reduced motion, or when the browser
// has no WebGL support, and instead shows a lightweight CSS fallback.
export function HeroCanvas() {
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [webglSupported, setWebglSupported] = React.useState(true);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    // These setState calls run once on mount to read browser-only APIs
    // (matchMedia, WebGL support) that aren't available during SSR. Gating
    // the canvas behind `ready` keeps the server and first client render
    // identical, avoiding a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(media.matches);

    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener("change", onChange);

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      setWebglSupported(Boolean(gl));
    } catch {
      setWebglSupported(false);
    }

    setReady(true);
    return () => media.removeEventListener("change", onChange);
  }, []);

  if (!ready) {
    return <StaticFallback />;
  }

  if (!webglSupported) {
    return <StaticFallback />;
  }

  return (
    <div className="size-full" aria-hidden="true">
      <React.Suspense fallback={<StaticFallback />}>
        <HeroScene reducedMotion={reducedMotion} />
      </React.Suspense>
    </div>
  );
}
