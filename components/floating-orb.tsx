"use client"

import { useRef, useEffect, useCallback } from "react"

const SECTION_COLORS = [
  { main: "#c8ff00", glow: "rgba(200, 255, 0, 0.15)", highlight: "rgba(200, 255, 0, 0.4)" },
  { main: "#ff4d00", glow: "rgba(255, 77, 0, 0.15)", highlight: "rgba(255, 77, 0, 0.4)" },
  { main: "#c41e3a", glow: "rgba(196, 30, 58, 0.35)", highlight: "rgba(196, 30, 58, 0.7)" },
  { main: "#818cf8", glow: "rgba(129, 140, 248, 0.15)", highlight: "rgba(129, 140, 248, 0.4)" },
]

function OrbLayer({ color, visible }: { color: typeof SECTION_COLORS[0]; visible: boolean }) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-[-20px] rounded-full floating-orb-glow"
        style={{ background: `radial-gradient(circle, ${color.glow}, transparent 70%)` }}
      />
      {/* Main orb */}
      <div
        className="relative w-full h-full rounded-full floating-orb-sphere"
        style={{
          background: `
            radial-gradient(circle at 35% 30%, ${color.highlight}, transparent 50%),
            radial-gradient(circle at 50% 50%, ${color.main}22, transparent 80%),
            radial-gradient(circle at 65% 70%, ${color.main}11, transparent 60%)
          `,
          boxShadow: `
            inset 0 -4px 12px ${color.main}15,
            inset 0 4px 8px rgba(255, 255, 255, 0.08),
            0 0 20px ${color.glow},
            0 0 40px ${color.glow}
          `,
          border: `1px solid ${color.main}20`,
          backdropFilter: "blur(1px)",
        }}
      >
        {/* Specular highlight */}
        <div
          className="absolute top-[6px] left-[8px] w-3 h-2 rounded-full floating-orb-specular"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.25), transparent)" }}
        />
      </div>
    </div>
  )
}

interface FloatingOrbProps {
  currentSection: number
}

export function FloatingOrb({ currentSection }: FloatingOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  const animate = useCallback(() => {
    current.current.x += (mouse.current.x - current.current.x) * 0.08
    current.current.y += (mouse.current.y - current.current.y) * 0.08

    if (containerRef.current) {
      containerRef.current.style.transform = `translate(-50%, 0) translate(${current.current.x}px, ${current.current.y}px)`
    }

    raf.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      const maxOffset = 12
      mouse.current.x = nx * maxOffset
      mouse.current.y = ny * maxOffset
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(raf.current)
    }
  }, [animate])

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none floating-orb-float">
      <div
        ref={containerRef}
        className="w-10 h-10"
        style={{ willChange: "transform" }}
      >
        {SECTION_COLORS.map((color, i) => (
          <OrbLayer key={i} color={color} visible={currentSection === i} />
        ))}
      </div>
    </div>
  )
}
