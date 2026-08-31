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

    const peers = PEERS.map((_, i) => ({
      x: 40,
      y: 40,
      step: i * 3,
      hold: 0,
    }))

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

        const name = VISITED[p.step % VISITED.length]
        const layer = zone.querySelector<HTMLElement>(`[data-layer="${name}"]`)
        if (!layer) return

        const box = layer.getBoundingClientRect()
        const tx = box.left - zoneBox.left + box.width * 0.5
        const ty = box.top - zoneBox.top + box.height * 0.5

        const vx = tx - p.x
        const vy = ty - p.y
        const dist = Math.hypot(vx, vy)

        if (dist < 6) {
          p.hold += dt
          claimed.set(name, PEERS[i].color)
          if (p.hold > 1700) {
            p.hold = 0
            let next = (p.step + 1) % VISITED.length
            // Ne pas viser le calque que l'autre occupe déjà.
            if (peers.some((o, j) => j !== i && o.step % VISITED.length === next)) {
              next = (next + 1) % VISITED.length
            }
            p.step = next
          }
        } else {
          const speed = Math.min(dist, dist * 0.04 + 0.5)
          p.x += (vx / dist) * speed
          p.y += (vy / dist) * speed
        }

        el.style.transform = `translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px)`
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
