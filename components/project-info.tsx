"use client"

import { Info, X, ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { useLang } from "@/lib/i18n"

const PROJECT_LINKS: Record<string, string> = {
  agency: "https://ak-agency.vercel.app/",
  book: "https://aladin-akkari-book-store.vercel.app/",
  mood: "https://moodmovie-by-aladinakkari.vercel.app/",
}

interface ProjectInfoProps {
  section: "agency" | "book" | "mood"
}

export function ProjectInfo({ section }: ProjectInfoProps) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<"overview" | "stack">("overview")

  const stackItems = t(`${section}.info.stack`).split(" · ")
  const projectLink = PROJECT_LINKS[section]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Panel */}
      <div
        className="absolute bottom-14 right-0 w-80 max-sm:w-70 max-h-[70vh] rounded-2xl border overflow-hidden transition-all duration-300 origin-bottom-right"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          borderColor: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) translateY(0)" : "scale(0.9) translateY(8px)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Toggle tabs */}
        <div className="flex border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
          {(["overview", "stack"] as const).map((t2) => (
            <button
              key={t2}
              onClick={() => setTab(t2)}
              className="flex-1 py-3 text-xs font-medium uppercase tracking-widest transition-all duration-200"
              style={{
                color: tab === t2 ? "#fff" : "rgba(255, 255, 255, 0.35)",
                borderBottom: tab === t2 ? "2px solid rgba(255, 255, 255, 0.5)" : "2px solid transparent",
              }}
            >
              {t(`info.${t2}`)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[55vh]">
          {tab === "overview" ? (
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              {t(`${section}.info.overview`)}
            </p>
          ) : (
            <div>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                {t(`${section}.info.stack.desc`)}
              </p>
              <div className="flex flex-wrap gap-2">
                {stackItems.map((item, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-3 py-1.5 rounded-full font-medium"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: "rgba(255, 255, 255, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              {/* Project link */}
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-opacity hover:opacity-100"
                style={{ color: "rgba(255, 255, 255, 0.5)" }}
              >
                {t("info.visit")}
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Info button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 project-info-pulse"
        style={{
          backgroundColor: open ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: "rgba(255, 255, 255, 0.6)",
        }}
        aria-label="Project info"
      >
        {open ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
      </button>
    </div>
  )
}
