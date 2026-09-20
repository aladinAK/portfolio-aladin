"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState } from "react"
import { Layers } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { DsGhostCursor } from "@/components/design-system/ds-ghost-cursor"

// L'overlay ne pèse sur le bundle qu'à l'ouverture.
const DsOverlay = dynamic(() => import("@/components/design-system/ds-overlay").then((m) => m.DsOverlay), {
  ssr: false,
})

const GHOST_DELAY_MS = 1100
const SEEN_KEY = "ds-intro-seen"
const OPEN_EVENT = "ds:open"

/** Ouvre le panneau depuis n'importe quelle section, sans remonter d'état. */
export const openDesignSystem = () => window.dispatchEvent(new Event(OPEN_EVENT))

/** sessionStorage lève dans certains contextes (navigation privée stricte). */
const readSeen = () => {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1"
  } catch {
    return false
  }
}

const writeSeen = () => {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1")
  } catch {
    /* rien à faire — l'intro rejouera, sans conséquence */
  }
}

export function DsLauncher() {
  const { t } = useLang()
  const badgeRef = useRef<HTMLButtonElement>(null)
  const [badgeShown, setBadgeShown] = useState(false)
  const [ghostMounted, setGhostMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [animateBadge, setAnimateBadge] = useState(false)

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Pas de pointeur, pas de mouvement voulu, ou intro déjà vue :
    // on saute la mise en scène et on montre directement la cible.
    if (coarse || reduced || readSeen()) {
      setBadgeShown(true)
      return
    }

    const id = window.setTimeout(() => setGhostMounted(true), GHOST_DELAY_MS)

    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  const handleArrive = useCallback(() => {
    setBadgeShown(true)
    setAnimateBadge(true)
    writeSeen()
  }, [])

  const handleGhostDone = useCallback(() => setGhostMounted(false), [])

  return (
    <>
      {/* Trois niveaux, un transform chacun : le socle positionne, le
          flotteur oscille, le bouton réagit. Les composer sur un seul élément
          les ferait s'écraser mutuellement. */}
      <div className="ds-badge-dock">
        <div className={badgeShown ? "ds-badge-float" : ""}>
          <button
            ref={badgeRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className={[
              "ds-badge tap-44 group flex items-center gap-2 rounded-full border border-white/15",
              "bg-black/60 px-4 max-md:px-3 py-2 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              badgeShown ? "" : "pointer-events-none opacity-0",
              animateBadge ? "ds-badge-in ds-badge-halo" : "",
            ].join(" ")}
            // Retiré du parcours clavier tant qu'il n'est pas révélé.
            tabIndex={badgeShown ? 0 : -1}
            aria-hidden={!badgeShown}
          >
            <Layers className="ds-badge-icon h-3.5 w-3.5" />
            {/* Phone: icon only, otherwise the badge runs into the section nav.
                sr-only keeps the label as the button's accessible name. */}
            <span className="max-md:sr-only">{t("ds.badge")}</span>
            <span className="ds-badge-dot h-1.5 w-1.5 rounded-full bg-[#6E56F8]" />
          </button>
        </div>
      </div>

      {ghostMounted && !open && (
        <DsGhostCursor
          label={t("ds.ghost.label")}
          targetRef={badgeRef}
          onArrive={handleArrive}
          onDone={handleGhostDone}
        />
      )}

      {open && <DsOverlay onClose={() => setOpen(false)} />}
    </>
  )
}
