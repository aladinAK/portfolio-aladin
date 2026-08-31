"use client"

import { useEffect, useRef } from "react"

/**
 * Curseur fantôme façon multi-joueur (Miro / Figma).
 * Il entre en scène, glisse jusqu'au badge puis "clique" — après quoi il
 * s'efface et laisse une cible fixe. Une cible qui bouge est impossible à
 * viser : c'est le badge qui reste cliquable, pas ce fantôme.
 *
 * Couleur volontairement distincte du curseur réel (blanc / --section-fg)
 * pour qu'on ne confonde jamais les deux pointeurs à l'écran.
 */

const GHOST_COLOR = "#6E56F8"

const ENTER_MS = 420
const TRAVEL_MS = 1700
const CLICK_MS = 280
const EXIT_MS = 420

interface DsGhostCursorProps {
  label: string
  targetRef: React.RefObject<HTMLElement | null>
  /** Appelé au moment du "clic" — c'est là que le badge apparaît. */
  onArrive: () => void
  /** Appelé quand le fantôme a fini de s'effacer. */
  onDone: () => void
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function DsGhostCursor({ label, targetRef, onArrive, onDone }: DsGhostCursorProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const raf = useRef(0)
  const arrived = useRef(false)
  // Refs de callback : évite de relancer l'animation si le parent re-rend.
  const onArriveRef = useRef(onArrive)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onArriveRef.current = onArrive
    onDoneRef.current = onDone
  })

  useEffect(() => {
    const root = rootRef.current
    const target = targetRef.current
    if (!root || !target) return

    const rect = target.getBoundingClientRect()
    const end = { x: rect.left + rect.width / 2 - 6, y: rect.top + rect.height / 2 + 2 }

    // Départ hors du champ de lecture, arrivée sur le badge, via un point de
    // contrôle qui donne une trajectoire courbe plutôt qu'une ligne droite.
    const start = {
      x: Math.min(end.x + 280, window.innerWidth - 60),
      y: Math.min(end.y + 300, window.innerHeight - 80),
    }
    const control = { x: Math.max(end.x - 220, 60), y: end.y + 120 }

    const at = (t: number) => {
      const u = 1 - t
      return {
        x: u * u * start.x + 2 * u * t * control.x + t * t * end.x,
        y: u * u * start.y + 2 * u * t * control.y + t * t * end.y,
      }
    }

    const place = (x: number, y: number) => {
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    place(start.x, start.y)

    const t0 = performance.now()
    let finished = false
    let exitTimer = 0

    const finish = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(raf.current)
      place(end.x, end.y)
      root.style.opacity = "0"
      if (!arrived.current) {
        arrived.current = true
        onArriveRef.current()
      }
      exitTimer = window.setTimeout(() => onDoneRef.current(), EXIT_MS)
    }

    const tick = (now: number) => {
      const elapsed = now - t0

      if (elapsed < ENTER_MS) {
        root.style.opacity = String(elapsed / ENTER_MS)
        place(start.x, start.y)
      } else if (elapsed < ENTER_MS + TRAVEL_MS) {
        root.style.opacity = "1"
        const p = at(easeInOut((elapsed - ENTER_MS) / TRAVEL_MS))
        place(p.x, p.y)
      } else if (elapsed < ENTER_MS + TRAVEL_MS + CLICK_MS) {
        place(end.x, end.y)
        if (!arrived.current) {
          arrived.current = true
          onArriveRef.current()
        }
        const k = (elapsed - ENTER_MS - TRAVEL_MS) / CLICK_MS
        const scale = 1 - Math.sin(k * Math.PI) * 0.22
        if (arrowRef.current) arrowRef.current.style.transform = `scale(${scale})`
      } else {
        const k = (elapsed - ENTER_MS - TRAVEL_MS - CLICK_MS) / EXIT_MS
        root.style.opacity = String(Math.max(0, 1 - k))
        if (k >= 1) {
          finished = true
          cancelAnimationFrame(raf.current)
          onDoneRef.current()
          return
        }
      }

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)

    // La moindre intention de l'utilisateur coupe court à la démo.
    window.addEventListener("pointerdown", finish)
    window.addEventListener("wheel", finish, { passive: true })
    window.addEventListener("keydown", finish)

    return () => {
      cancelAnimationFrame(raf.current)
      window.clearTimeout(exitTimer)
      window.removeEventListener("pointerdown", finish)
      window.removeEventListener("wheel", finish)
      window.removeEventListener("keydown", finish)
    }
  }, [targetRef])

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed top-0 left-0 z-[70] pointer-events-none will-change-transform"
      style={{ opacity: 0, transition: "opacity 200ms linear" }}
    >
      <div ref={arrowRef} className="origin-top-left" style={{ transition: "transform 80ms linear" }}>
        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
          <path
            d="M2 1.5L2 18.2L6.6 14.2L9.6 21L13.2 19.4L10.2 12.8L16.4 12.4L2 1.5Z"
            fill={GHOST_COLOR}
            stroke="#fff"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="ml-4 -mt-1 inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg"
          style={{ backgroundColor: GHOST_COLOR }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
