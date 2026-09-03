"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { X } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { useScrollReveal } from "@/lib/use-scroll-reveal"
import { DsContent, DS_SECTIONS } from "@/components/design-system/ds-content"

/**
 * Panneau plein écran (et non popup) : le système compte sept sections,
 * un marquee et un simulateur responsive — ça ne tient pas dans une modale.
 *
 * L'accent suit la section du portfolio depuis laquelle on ouvre le panneau :
 * la doc démontre ainsi le theming qu'elle décrit. La table est explicite
 * parce que --section-accent de la section « tech » vaut #1a1a1a, illisible
 * sur le fond sombre du panneau.
 */
const ACCENT_BY_THEME: Record<string, { accent: string; fg: string }> = {
  "section-studio": { accent: "#c8ff00", fg: "#0a0a0a" },
  "section-nature": { accent: "#ff4d00", fg: "#0a0a0a" },
  "section-tech": { accent: "#c41e3a", fg: "#ffffff" },
  "section-lifestyle": { accent: "#818cf8", fg: "#0a0a0a" },
}

const FALLBACK_ACCENT = { ...ACCENT_BY_THEME["section-studio"], theme: "section-studio" }

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const readVisibleAccent = () => {
  const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
  const section = el?.closest(".vertical-section")
  if (!section) return FALLBACK_ACCENT
  for (const cls of Array.from(section.classList)) {
    if (ACCENT_BY_THEME[cls]) return { ...ACCENT_BY_THEME[cls], theme: cls }
  }
  return FALLBACK_ACCENT
}

interface DsOverlayProps {
  onClose: () => void
}

export function DsOverlay({ onClose }: DsOverlayProps) {
  const { t } = useLang()
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const scrollRaf = useRef(0)
  const toastTimer = useRef(0)
  const [toast, setToast] = useState("")
  const [active, setActive] = useState<string>(DS_SECTIONS[0].id)
  const theme = useMemo(readVisibleAccent, [])

  useScrollReveal(scrollRef, scrollRef)

  // Verrou de scroll + drapeau lu par HorizontalScrollLayout pour désarmer
  // sa navigation ← → tant que le panneau est ouvert.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.documentElement.setAttribute("data-overlay-open", "")
    document.body.style.overflow = "hidden"
    // CustomCursor lit --section-accent, absent hors des sections : sans ça son
    // anneau retombe sur le doré du repli au lieu de l'accent du panneau.
    document.documentElement.style.setProperty("--section-accent", theme.accent)
    closeRef.current?.focus()

    return () => {
      document.documentElement.removeAttribute("data-overlay-open")
      document.documentElement.style.removeProperty("--section-accent")
      document.body.style.overflow = prevOverflow
      opener?.focus?.()
    }
  }, [theme.accent])

  // Échap pour fermer + piège à focus
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== "Tab") return

      const root = rootRef.current
      if (!root) return
      // getClientRects plutôt qu'offsetParent : la nav et le bouton de
      // fermeture sont en position fixed, pour laquelle offsetParent vaut null.
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      )
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown, true)
    return () => document.removeEventListener("keydown", onKeyDown, true)
  }, [onClose])

  // Jauge de progression et section active, calculées au même rAF
  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const update = () => {
      scrollRaf.current = 0
      const max = root.scrollHeight - root.clientHeight
      const ratio = max > 0 ? root.scrollTop / max : 0
      // La jauge est écrite en direct : la faire passer par le state
      // provoquerait un rendu à chaque frame de défilement.
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`

      // Section active = la dernière dont le haut est passé sous la capsule.
      // Fiable partout, y compris entre deux sections et en fin de course.
      const line = root.scrollTop + root.clientHeight * 0.3
      let current: string = DS_SECTIONS[0].id
      for (const { id } of DS_SECTIONS) {
        const el = root.querySelector<HTMLElement>(`#${id}`)
        if (el && el.offsetTop <= line) current = id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (scrollRaf.current) return
      scrollRaf.current = requestAnimationFrame(update)
    }

    update()
    root.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      root.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(scrollRaf.current)
    }
  }, [])

  // La pastille active glisse derrière l'onglet courant
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const current = nav.querySelector<HTMLElement>(`[data-section="${active}"]`)
    const pill = nav.querySelector<HTMLElement>("[data-pill]")
    if (!current || !pill) return
    pill.style.width = `${current.offsetWidth}px`
    pill.style.transform = `translateX(${current.offsetLeft}px)`
    pill.style.opacity = "1"
  }, [active])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = window.setTimeout(() => setToast(""), 2200)
  }, [])

  // Ancres internes par scrollIntoView : un href="#id" écrirait dans
  // location.hash, que HorizontalScrollLayout utilise pour ses sections.
  const goTo = (id: string) => {
    scrollRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("ds.title")}
      className="ds-root ds-overlay-in fixed inset-0 z-100 font-sans"
      style={
        {
          "--ds-accent": theme.accent,
          "--ds-accent-fg": theme.fg,
        } as React.CSSProperties
      }
    >
      {/* Jauge de progression */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-104 h-0.5 bg-(--ds-divider)">
        <div
          ref={progressRef}
          className="h-full origin-left bg-(--ds-accent)"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Capsule de navigation — placée avant le contenu pour que l'ordre
          de tabulation suive l'ordre de lecture. */}
      <nav
        ref={navRef}
        aria-label={t("ds.title")}
        className="fixed left-1/2 top-3 z-103 flex max-w-[calc(100vw-7rem)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-full border border-(--ds-divider) bg-[color-mix(in_srgb,var(--ds-bg)_82%,transparent)] p-1 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <span
          data-pill
          aria-hidden
          className="absolute left-1 top-1 h-[calc(100%-0.5rem)] rounded-full bg-(--ds-surface-hi) opacity-0 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
        {DS_SECTIONS.map(({ id, key }) => (
          <button
            key={id}
            type="button"
            data-section={id}
            onClick={() => goTo(id)}
            aria-current={active === id ? "true" : undefined}
            className="relative z-10 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors duration-300"
            style={{ color: active === id ? "var(--ds-accent)" : "var(--ds-fg-muted)" }}
          >
            {t(key)}
          </button>
        ))}
      </nav>

      {/* Fermeture — pastille accentuée, toujours au même endroit */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t("ds.close")}
        className="ds-close fixed right-4 top-3.5 z-103 grid h-10 max-sm:h-8 max-sm:w-8 w-10 place-items-center rounded-full transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ds-accent)"
        style={{ background: "var(--ds-accent)", color: "var(--ds-accent-fg)" }}
      >
        <X className="h-5 w-5" strokeWidth={2.5} />
      </button>

      <div ref={scrollRef} className="h-full overflow-y-auto overscroll-contain scroll-smooth">
        <DsContent onNavigate={goTo} onCopy={notify} theme={theme.theme} />
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-6 left-1/2 z-110 -translate-x-1/2 rounded-full px-5 py-3 text-xs font-semibold shadow-(--ds-shadow-lg)"
          style={{ background: "var(--ds-n-100)", color: "var(--ds-n-900)" }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}
