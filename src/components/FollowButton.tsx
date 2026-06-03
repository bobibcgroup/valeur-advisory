"use client";

import { motion } from "framer-motion";

export default function FollowButton() {
  return (
    <motion.a
      href="https://www.instagram.com/valeuradvisory/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow Valeur Advisory on Instagram"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 1.1 }}
      whileHover="hovered"
      whileTap={{ scale: 0.985, y: 0 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        textDecoration: "none",
        cursor: "pointer",
        minWidth: "158px",
        padding: "15px 44px",
        borderRadius: "2px",
        border: "1px solid rgba(178, 144, 88, 0.28)",
        background:
          "linear-gradient(135deg, rgba(178, 144, 88, 0.05) 0%, rgba(178, 144, 88, 0.02) 100%)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow:
          "0 2px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(210,175,120,0.07)",
        fontFamily: "var(--font-inter)",
        fontSize: "10.5px",
        fontWeight: 400,
        letterSpacing: "0.26em",
        textTransform: "uppercase" as const,
        color: "#C0A070",
        userSelect: "none" as const,
      }}
    >
      {/* Glass sheen — visible only on hover */}
      <motion.span
        aria-hidden="true"
        variants={{
          hovered: { opacity: 1 },
        }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, rgba(210,175,120,0.08) 0%, rgba(178,144,88,0.03) 60%, transparent 100%)",
          border: "1px solid rgba(196, 164, 104, 0.45)",
          boxShadow:
            "0 6px 32px rgba(0,0,0,0.45), 0 0 22px rgba(178,144,88,0.06), inset 0 1px 0 rgba(210,175,120,0.14)",
          pointerEvents: "none",
        }}
      />

      <motion.span
        style={{ position: "relative", zIndex: 1 }}
        variants={{
          hovered: { y: -1.5, color: "#D4B882" },
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      >
        Follow Us
      </motion.span>
    </motion.a>
  );
}
