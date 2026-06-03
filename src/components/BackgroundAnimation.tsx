"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;       // full rgba string — avoids per-frame string allocation
  opacity: number;
}

type Point = { x: number; y: number };

// ─── Valeur Advisory wave palette ─────────────────────────────────────────────
// Five waves built from the VA logo's warm champagne/gold tones.
// Opacities are intentionally low so the waves feel atmospheric, not graphic.
const WAVES: WaveConfig[] = [
  {
    offset: 0,
    amplitude: 68,
    frequency: 0.003,
    color: "rgba(178, 144, 88, 1)",   // warm gold — primary brand accent
    opacity: 0.32,
  },
  {
    offset: Math.PI / 2,
    amplitude: 88,
    frequency: 0.0026,
    color: "rgba(210, 175, 120, 1)",  // pale champagne — lighter highlight
    opacity: 0.22,
  },
  {
    offset: Math.PI,
    amplitude: 58,
    frequency: 0.0034,
    color: "rgba(144, 110, 62, 1)",   // deep bronze — depth layer
    opacity: 0.26,
  },
  {
    offset: Math.PI * 1.5,
    amplitude: 78,
    frequency: 0.0022,
    color: "rgba(224, 194, 148, 1)",  // ivory-champagne — ethereal veil
    opacity: 0.14,
  },
  {
    offset: Math.PI * 2,
    amplitude: 52,
    frequency: 0.004,
    color: "rgba(158, 126, 76, 1)",   // muted gold — grounding layer
    opacity: 0.18,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Luxury pacing: gentler than a typical interactive demo
    const MOUSE_INFLUENCE = 42;    // subtle cursor pull
    const INFLUENCE_RADIUS = 280;  // how far the cursor ripples
    const SMOOTHING = 0.07;        // how lazily the wave follows the cursor

    // ── Helpers ─────────────────────────────────────────────────────────────
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const recenterMouse = () => {
      const c: Point = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = { ...c };
      targetMouseRef.current = { ...c };
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => recenterMouse();

    resizeCanvas();
    recenterMouse();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // ── Draw a single wave ───────────────────────────────────────────────────
    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
        const mouseEffect =
          influence *
          MOUSE_INFLUENCE *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          // Primary wave
          Math.sin(x * wave.frequency + time * 0.0014 + wave.offset) *
            wave.amplitude +
          // Harmonic layer — creates organic complexity
          Math.sin(x * wave.frequency * 0.4 + time * 0.0020) *
            (wave.amplitude * 0.42) +
          mouseEffect;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 28;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    // ── Animation loop ───────────────────────────────────────────────────────
    const animate = () => {
      // 0.55 = ~half the original speed → serene, slow-burn luxury feel
      time += 0.55;

      // Lazy cursor follow — wave trails behind the mouse gracefully
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * SMOOTHING;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * SMOOTHING;

      // Background: deep warm black gradient — repaint every frame to clear
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, "#08070A");
      bg.addColorStop(1, "#0D0B0E");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Reset composite state before drawing waves
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      WAVES.forEach(drawWave);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
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
