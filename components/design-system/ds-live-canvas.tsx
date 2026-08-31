"use client"

import { useCallback, useEffect, useRef } from "react"
import { useLang } from "@/lib/i18n"

/**
 * Canevas collaboratif du hero — une maquette en cours de construction plutôt
 * que six formes muettes. L'artboard reprend les vrais jetons du portfolio :
 * le hero démontre le système au lieu de le décorer.
 *
 * Comportements, tous pilotés par un seul rAF :
 *  - survol d'un calque → contour et nom, comme dans Figma ;
 *  - clic sur un calque porteur d'un jeton → copie du jeton ;
 *  - deux curseurs « collègues » circulent et sélectionnent des calques.
 *
 * Aucune dépendance 3D : une bibliothèque de rendu pèserait plus lourd que
 * tout le panneau pour un seul bloc décoratif.
 */

/** Rôles, pas des prénoms : personne de réel n'est mis en scène. */
const PEERS = [
  { key: "ds.canvas.peer.design", color: "#6E56F8" },
  { key: "ds.canvas.peer.dev", color: "#00B8A9" },
]

/** Calques que les collègues visitent, dans l'ordre. */
const VISITED = ["cta", "card-1", "title", "hero", "card-3", "nav", "card-2"] as const

/** Profil de vitesse minimum-jerk : départ et arrivée doux, pic au milieu. */
const minJerk = (u: number) => u * u * u * (10 - 15 * u + 6 * u * u)

const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** Un collègue en mouvement : un segment de geste à la fois. */
interface Peer {
  x: number
  y: number
  step: number
  phase: "move" | "pause"
  /** Segment courant : départ (a), point de contrôle (c), arrivée (b). */
  ax: number; ay: number; cx: number; cy: number; bx: number; by: number
  t: number
  dur: number
  pause: number
  pauseDur: number
  /** Posé sur le calque : conditionne la sélection affichée. */
  onTarget: boolean
  seed: number
}

interface DsLiveCanvasProps {
  onCopy: (message: string) => void
}

export function DsLiveCanvas({ onCopy }: DsLiveCanvasProps) {
  const { t } = useLang()
  const zoneRef = useRef<HTMLDivElement>(null)
  const peerRefs = useRef<(HTMLDivElement | null)[]>([])
  const raf = useRef(0)

  const copy = useCallback(
    (token: string, value: string) => {
      const text = `var(${token})`
      // Retour immédiat : writeText peut rester en attente sans activation
      // utilisateur récente, un toast qui en dépend ne s'afficherait jamais.
      onCopy(`${text} · ${value}`)
      navigator.clipboard
        ?.writeText(text)
        .then(() => onCopy(`${t("ds.copied")} ${text} · ${value}`))
        .catch(() => {})
    },
    [onCopy, t],
  )

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const peers: Peer[] = PEERS.map((_, i) => ({
      x: 34 + i * 96,
      y: 26 + i * 44,
      step: i * 3,
      phase: "pause",
      ax: 0, ay: 0, cx: 0, cy: 0, bx: 0, by: 0,
      t: 0,
      dur: 0,
      pause: 0,
      pauseDur: 420 + i * 760,
      onTarget: false,
      seed: Math.random() * 100,
    }))

    // Prépare le geste vers le calque courant. Deux écarts à la ligne droite
    // suffisent à le faire lire comme une main : une cible décentrée dans le
    // calque, et une trajectoire courbe.
    const aim = (p: Peer, zoneBox: DOMRect) => {
      const name = VISITED[p.step % VISITED.length]
      const layer = zone.querySelector<HTMLElement>(`[data-layer="${name}"]`)
      if (!layer) return false

      const box = layer.getBoundingClientRect()
      p.bx = box.left - zoneBox.left + box.width * rand(0.32, 0.68)
      p.by = box.top - zoneBox.top + box.height * rand(0.32, 0.68)

      const dx = p.bx - p.x
      const dy = p.by - p.y
      const dist = Math.hypot(dx, dy) || 1

      p.ax = p.x
      p.ay = p.y

      // Courbure perpendiculaire, d'un côté ou de l'autre au hasard.
      const bend = dist * rand(0.08, 0.2) * (Math.random() < 0.5 ? -1 : 1)
      p.cx = (p.ax + p.bx) / 2 - (dy / dist) * bend
      p.cy = (p.ay + p.by) / 2 + (dx / dist) * bend

      // Loi de Fitts : la durée croît avec le log de la distance, pas avec elle.
      p.dur = (170 + 230 * Math.log2(1 + dist / 45)) * rand(0.85, 1.25)
      p.t = 0
      p.phase = "move"
      return true
    }

    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(64, now - last)
      last = now
      const zoneBox = zone.getBoundingClientRect()
      if (zoneBox.width === 0) {
        raf.current = requestAnimationFrame(tick)
        return
      }

      // Un calque n'est mis en avant que si un collègue s'y est arrêté.
      const claimed = new Map<string, string>()

      peers.forEach((p, i) => {
        const el = peerRefs.current[i]
        if (!el) return

        if (p.phase === "move") {
          p.t += dt
          const u = Math.min(1, p.t / p.dur)
          const e = minJerk(u)
          const v = 1 - e
          p.x = v * v * p.ax + 2 * v * e * p.cx + e * e * p.bx
          p.y = v * v * p.ay + 2 * v * e * p.cy + e * e * p.by
          if (u >= 1) {
            p.phase = "pause"
            p.pause = 0
            p.pauseDur = rand(1100, 2500)
            p.onTarget = true
          }
        } else {
          p.pause += dt
          if (p.onTarget) claimed.set(VISITED[p.step % VISITED.length], PEERS[i].color)
          if (p.pause > p.pauseDur) {
            if (p.onTarget) {
              let next = (p.step + 1) % VISITED.length
              // Ne pas viser le calque que l'autre occupe déjà.
              if (peers.some((o, j) => j !== i && o.step % VISITED.length === next)) {
                next = (next + 1) % VISITED.length
              }
              p.step = next
            }
            p.onTarget = false
            if (!aim(p, zoneBox)) p.pause = 0
          }
        }

        // Micro-tremblement permanent : une main ne tient jamais parfaitement
        // immobile, et c'est ce détail qui sépare un pointeur d'un script.
        const amp = p.phase === "pause" ? 1 : 0.45
        const jx = (Math.sin(now * 0.0021 + p.seed) * 0.6 + Math.sin(now * 0.0057 + p.seed * 2.3) * 0.3) * amp
        const jy = (Math.cos(now * 0.0019 + p.seed * 1.7) * 0.6 + Math.sin(now * 0.0043 + p.seed) * 0.3) * amp
        // Dérive lente à l'arrêt : le curseur respire au lieu de se figer.
        const drift = p.phase === "pause" ? Math.sin(now * 0.0006 + p.seed) * 1.4 : 0

        el.style.transform = `translate(${(p.x + jx + drift).toFixed(2)}px, ${(p.y + jy).toFixed(2)}px)`
      })

      // Applique (ou retire) la sélection sur tous les calques d'un coup.
      zone.querySelectorAll<HTMLElement>("[data-layer]").forEach((layer) => {
        const color = claimed.get(layer.dataset.layer ?? "")
        layer.style.setProperty("--peer", color ?? "transparent")
      })

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  return (
    <div ref={zoneRef} className="ds-canvas">
      <span className="ds-canvas-label">{t("ds.canvas.hint")}</span>

      {/* ── Artboard ── */}
      <div className="ds-art">
        <span className="ds-art-name">Landing / Hero</span>

        {/* Nav */}
        <div className="ds-layer ds-art-nav" data-layer="nav" data-name="Nav / Header">
          <span className="ds-art-logo" />
          <span className="ds-art-links">
            <i /><i /><i />
          </span>
          <span className="ds-art-navbtn" />
        </div>

        {/* Titre */}
        <button
          type="button"
          className="ds-layer ds-art-title"
          data-layer="title"
          data-name="Text / Display"
          onClick={() => copy("--section-fg", "#fafafa")}
          aria-label="Text / Display — --section-fg"
        >
          <i style={{ width: "76%" }} />
          <i style={{ width: "52%" }} />
        </button>

        {/* Paragraphe */}
        <div className="ds-layer ds-art-body" data-layer="body" data-name="Text / Body">
          <i style={{ width: "88%" }} />
          <i style={{ width: "80%" }} />
          <i style={{ width: "45%" }} />
        </div>

        {/* Bouton */}
        <button
          type="button"
          className="ds-layer ds-art-cta"
          data-layer="cta"
          data-name="Button / Primary"
          onClick={() => copy("--section-accent", "#c8ff00")}
          aria-label="Button / Primary — --section-accent"
        >
          <i />
        </button>

        {/* Visuel principal */}
        <button
          type="button"
          className="ds-layer ds-art-hero"
          data-layer="hero"
          data-name="Image / Cover"
          onClick={() => copy("--section-muted", "#262626")}
          aria-label="Image / Cover — --section-muted"
        >
          <i />
        </button>

        {/* Cartes */}
        <div className="ds-art-cards">
          {[
            { id: "card-1", color: "#ff4d00", token: "--section-accent" },
            { id: "card-2", color: "#818cf8", token: "--section-accent" },
            { id: "card-3", color: "#e3dacb", token: "--section-bg" },
          ].map((card, i) => (
            <button
              key={card.id}
              type="button"
              className="ds-layer ds-art-card"
              data-layer={card.id}
              data-name={`Card / Project ${i + 1}`}
              onClick={() => copy(card.token, card.color)}
              aria-label={`Card / Project ${i + 1} — ${card.token}`}
            >
              <span style={{ background: card.color }} />
              <i style={{ width: "70%" }} />
              <i style={{ width: "45%" }} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Curseurs des collègues ── */}
      {PEERS.map((peer, i) => (
        <div
          key={peer.key}
          ref={(el) => {
            peerRefs.current[i] = el
          }}
          aria-hidden
          className="ds-canvas-peer"
        >
          <svg width="15" height="17" viewBox="0 0 22 24" fill="none">
            <path
              d="M2 1.5L2 18.2L6.6 14.2L9.6 21L13.2 19.4L10.2 12.8L16.4 12.4L2 1.5Z"
              fill={peer.color}
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ background: peer.color }}>{t(peer.key)}</span>
        </div>
      ))}
    </div>
  )
}
