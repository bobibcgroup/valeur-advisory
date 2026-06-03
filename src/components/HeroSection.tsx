"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FollowButton from "./FollowButton";

// Shared entry animation — staggered fade-up
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const item = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.9, ease: EASE, delay },
});

export default function HeroSection() {
  return (
    <section
      aria-label="Valeur Advisory — Coming Soon"
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        width: "100%",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 0,
        }}
      >
        {/* ── Logo ────────────────────────────────────────────────── */}
        <motion.div
          {...item(0.15)}
          style={{ position: "relative", marginBottom: "44px" }}
        >
          {/* Extended champagne aura — outer diffuse glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-50px",
              background:
                "radial-gradient(ellipse at center, rgba(178,144,88,0.18) 0%, rgba(178,144,88,0.07) 35%, transparent 68%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          {/* Logo tile — intentionally presented as a luxury brand mark */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              borderRadius: "10px",
              overflow: "hidden",
              // Thin champagne border — barely visible, adds intentionality
              border: "1px solid rgba(178, 144, 88, 0.22)",
              // Inset highlight at top edge: suggests glass/premium surface
              boxShadow:
                "0 0 0 1px rgba(0,0,0,0.5), inset 0 1px 0 rgba(210,175,120,0.12), 0 8px 32px rgba(0,0,0,0.6)",
            }}
          >
            <Image
              src="/logo.jpg"
              alt="Valeur Advisory"
              width={120}
              height={120}
              priority
              style={{ display: "block" }}
            />
          </div>
        </motion.div>

        {/* ── Headline ─────────────────────────────────────────────── */}
        <motion.h1
          {...item(0.45)}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 300,
            fontStyle: "normal",
            letterSpacing: "0.13em",
            lineHeight: 1.15,
            color: "#EDE4D4",
            marginBottom: "28px",
          }}
        >
          Coming Soon.
        </motion.h1>

        {/* ── Thin rule ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.72 }}
          style={{
            width: "36px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(178,144,88,0.55), transparent)",
            marginBottom: "28px",
            transformOrigin: "center",
          }}
          aria-hidden="true"
        />

        {/* ── Supporting text ───────────────────────────────────────── */}
        <motion.p
          {...item(0.68)}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(12.5px, 1.3vw, 14.5px)",
            fontWeight: 300,
            letterSpacing: "0.045em",
            lineHeight: 1.92,
            color: "#847464",
            maxWidth: "410px",
            marginBottom: "52px",
          }}
        >
          Helping leaders, brands, and organizations build influence,
          credibility, and lasting market presence.
        </motion.p>

        {/* ── CTA Button ───────────────────────────────────────────── */}
        <FollowButton />
      </div>
    </section>
  );
}
