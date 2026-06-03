"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  r: number;
  g: number;
  b: number;
  waveFreq: number;
  waveOffset: number;
  pulseSpeed: number;
  pulseOffset: number;
}

// Warm champagne/gold palette — all very low luminance
const PALETTE = [
  { r: 182, g: 148, b: 104 }, // warm gold
  { r: 204, g: 174, b: 132 }, // light champagne
  { r: 152, g: 118, b: 78 },  // deep bronze
  { r: 214, g: 186, b: 148 }, // pale champagne
  { r: 168, g: 136, b: 94 },  // muted gold
];

function createParticle(w: number, h: number): Particle {
  const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  const tier = Math.random();
  // Weighted toward tiny — creates gold-dust feel
  const size =
    tier < 0.5
      ? 0.5 + Math.random() * 0.8    // 0.5–1.3px  (fine dust)
      : tier < 0.82
      ? 1.3 + Math.random() * 1.0    // 1.3–2.3px  (visible dust)
      : 2.3 + Math.random() * 1.2;   // 2.3–3.5px  (accent glints)

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    // Extremely slow drift; slight upward bias for floating feel
    vx: (Math.random() - 0.5) * 0.022,
    vy: (Math.random() - 0.5) * 0.014 - 0.006,
    size,
    baseOpacity: 0.12 + Math.random() * 0.28, // 0.12–0.40 — clearly visible but not loud
    ...color,
    waveFreq: 0.00018 + Math.random() * 0.00032,
    waveOffset: Math.random() * Math.PI * 2,
    pulseSpeed: 0.00025 + Math.random() * 0.00045,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    // Honour prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      particlesRef.current = Array.from({ length: 80 }, () =>
        createParticle(w, h)
      );
    }

    resize();
    window.addEventListener("resize", resize);

    const startTime = performance.now();

    function draw(now: number) {
      if (!ctx) return;
      const t = now - startTime;

      ctx.clearRect(0, 0, w, h);

      // ── Central breathing glow ────────────────────────────────────────────
      // One full cycle ≈ 20 s — almost imperceptible
      const breathe = (Math.sin(t * 0.00007) + 1) * 0.5;
      const glowAlpha = 0.022 + breathe * 0.030; // 0.022 → 0.052
      const glow = ctx.createRadialGradient(
        w * 0.5, h * 0.5, 0,
        w * 0.5, h * 0.5, Math.min(w, h) * 0.42
      );
      glow.addColorStop(0, `rgba(170, 136, 90, ${glowAlpha})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // ── Particles ─────────────────────────────────────────────────────────
      for (const p of particlesRef.current) {
        // Slow shimmer: one pulse every 8–20 s per particle
        const shimmer = (Math.sin(t * p.pulseSpeed + p.pulseOffset) + 1) * 0.5;
        const alpha = p.baseOpacity * (0.52 + shimmer * 0.48);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
        ctx.fill();

        // Organic wave drift layered on top of linear velocity
        p.x += p.vx + Math.sin(t * p.waveFreq + p.waveOffset) * 0.022;
        p.y += p.vy + Math.cos(t * p.waveFreq * 0.72 + p.waveOffset) * 0.016;

        // Wrap seamlessly
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -8) p.y = h + 8;
        if (p.y > h + 8) p.y = -8;
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
