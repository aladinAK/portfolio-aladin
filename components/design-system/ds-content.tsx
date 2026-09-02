"use client"

import { useCallback, useRef, useState } from "react"
import { useLang } from "@/lib/i18n"
import { DsLiveCanvas } from "@/components/design-system/ds-live-canvas"
import { SectionKicker } from "@/components/primitives/section-head"
import { SectionButton } from "@/components/primitives/section-button"

export const DS_SECTIONS = [
  { id: "ds-fondations", key: "ds.nav.foundations" },
  { id: "ds-composants", key: "ds.nav.components" },
  { id: "ds-etats", key: "ds.nav.states" },
  { id: "ds-motion", key: "ds.nav.motion" },
  { id: "ds-responsive", key: "ds.nav.responsive" },
  { id: "ds-process", key: "ds.nav.process" },
  { id: "ds-gouvernance", key: "ds.nav.governance" },
] as const

/** Thèmes réellement définis dans globals.css — aucune couleur inventée ici. */
const THEME_TOKEN_PREFIX = "--section-"

const THEMES = [
  {
    name: "studio",
    swatches: [
      ["--section-bg", "#0a0a0a"],
      ["--section-fg", "#fafafa"],
      ["--section-accent", "#c8ff00"],
      ["--section-muted", "#262626"],
    ],
  },
  {
    name: "nature",
    swatches: [
      ["--section-bg", "#0a0a0a"],
      ["--section-fg", "#f5f0e8"],
      ["--section-accent", "#ff4d00"],
      ["--section-muted", "#2d2d2d"],
    ],
  },
  {
    name: "tech",
    swatches: [
      ["--section-bg", "#e3dacb"],
      ["--section-fg", "#1a1a1a"],
      ["--section-accent", "#1a1a1a"],
      ["--section-muted", "#d4cec4"],
    ],
  },
  {
    name: "lifestyle",
    swatches: [
      ["--section-bg", "#03094A"],
      ["--section-fg", "#f5f5f5"],
      ["--section-accent", "#818cf8"],
      ["--section-muted", "#1e1e3a"],
    ],
  },
] as const

const NEUTRAL_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const

/** Sections du portfolio, avec la classe de thème qui porte leurs jetons. */
const PREVIEW_THEMES = [
  { label: "Studio", cls: "section-studio" },
  { label: "Agency", cls: "section-nature" },
  { label: "Book", cls: "section-tech" },
  { label: "Mood", cls: "section-lifestyle" },
] as const

/** Ratios calculés (WCAG 2.1 relative luminance), pas estimés. */
const CONTRASTS = [
  { pair: "#fafafa / #0a0a0a", ratio: "18.97:1", grade: "AAA" },
  { pair: "#c8ff00 / #0a0a0a", ratio: "16.74:1", grade: "AAA" },
  { pair: "#ff4d00 / #0a0a0a", ratio: "5.95:1", grade: "AA" },
  { pair: "#818cf8 / #03094A", ratio: "6.17:1", grade: "AA" },
  { pair: "#1a1a1a / #e3dacb", ratio: "12.56:1", grade: "AAA" },
  { pair: "#c41e3a / #e3dacb", ratio: "4.22:1", grade: "AA large" },
  { pair: "#ffffff / #155dfc", ratio: "5.25:1", grade: "AA" },
] as const

const INVENTORY = [
  { name: "CustomCursor", variants: "1", usage: "ds.inv.usage.global", status: "stable" },
  { name: "HorizontalScrollLayout", variants: "1", usage: "ds.inv.usage.shell", status: "stable" },
  { name: "FloatingOrb", variants: "4", usage: "ds.inv.usage.nav", status: "stable" },
  { name: "ProjectInfo", variants: "3", usage: "ds.inv.usage.projects", status: "stable" },
  { name: "AgencyContactForm", variants: "1", usage: "ds.inv.usage.contact", status: "review" },
  { name: "ManuscriptCanvas", variants: "1", usage: "ds.inv.usage.book", status: "stable" },
  { name: "DsOverlay", variants: "1", usage: "ds.inv.usage.docs", status: "beta" },
  { name: "DsLiveCanvas", variants: "1", usage: "ds.inv.usage.docs", status: "beta" },
  { name: "DsGhostCursor", variants: "1", usage: "ds.inv.usage.docs", status: "beta" },
] as const

const MARQUEE_WORDS = [
  "Tokens", "OKLCH", "Geist", "Playfair", "Clash Display", "Spacing",
  "Components", "States", "A11y", "Motion", "Responsive", "Governance",
]

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties

// ─────────────────────────── Primitives locales ───────────────────────────

function SectionHead({ index, kicker, title, accent, lead }: { index: string; kicker: string; title: string; accent: string; lead: string }) {
  return (
    <div className="s-reveal s-blur mb-6">
      <div className="flex items-center gap-2.5">
        <span className="h-0.5 w-5 rounded-full" style={{ background: "var(--ds-accent)" }} />
        <span className="ds-kicker">
          {index} / {kicker}
        </span>
      </div>
      <h2 className="mt-2.5 text-2xl font-bold leading-[1.05] tracking-tight md:text-4xl">
        {title}{" "}
        <span className="font-[family-name:var(--font-playfair)] italic" style={{ color: "var(--ds-accent)" }}>
          {accent}
        </span>
      </h2>
      <p className="mt-3 max-w-[64ch] text-sm leading-relaxed text-[var(--ds-fg-muted)]">{lead}</p>
    </div>
  )
}

function Panel({
  title,
  children,
  className = "",
  step = 0,
}: {
  title?: string
  children: React.ReactNode
  className?: string
  /** Décale la révélation pour créer une cascade dans une grille. */
  step?: number
}) {
  return (
    <div className={`ds-card s-reveal s-up p-5 ${className}`} style={delay(step * 70)}>
      {title && <div className="ds-kicker mb-4">{title}</div>}
      {children}
    </div>
  )
}

// ─────────────────────────────── Contenu ───────────────────────────────

interface DsContentProps {
  onNavigate: (id: string) => void
  onCopy: (message: string) => void
  /** Thème de la section depuis laquelle le panneau a été ouvert. */
  theme: string
}

export function DsContent({ onNavigate, onCopy, theme }: DsContentProps) {
  const { t } = useLang()
  const [vw, setVw] = useState(1180)
  const [preview, setPreview] = useState(theme)
  const riseRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)
  const spinRef = useRef<HTMLDivElement>(null)

  const copy = useCallback(
    (token: string, value: string) => {
      const text = `var(${token})`
      // Retour immédiat : writeText peut rester indéfiniment en attente
      // (Chrome la suspend sans activation utilisateur récente), et un toast
      // suspendu à cette promesse ne s'afficherait jamais. On ne confirme la
      // copie que si elle aboutit vraiment.
      onCopy(`${text} · ${value}`)
      navigator.clipboard
        ?.writeText(text)
        .then(() => onCopy(`${t("ds.copied")} ${text} · ${value}`))
        .catch(() => {})
    },
    [onCopy, t],
  )

  const replay = useCallback(() => {
    const play = (el: HTMLDivElement | null, anim: string) => {
      if (!el) return
      el.style.animation = "none"
      void el.offsetWidth
      el.style.animation = anim
    }
    play(riseRef.current, "dsRise 900ms cubic-bezier(0.16, 1, 0.3, 1) both")
    play(pulseRef.current, "dsPulse 300ms cubic-bezier(0.34, 1.56, 0.64, 1) 2")
    play(spinRef.current, "dsSpin 1200ms linear 2")
  }, [])

  const breakpoint =
    vw < 640 ? t("ds.r.xs") : vw < 768 ? t("ds.r.compact") : vw < 1024 ? t("ds.r.medium") : t("ds.r.large")
  const gridCols = vw < 768 ? "1fr" : vw < 1024 ? "repeat(2, 1fr)" : "repeat(4, 1fr)"

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 pb-20 md:px-7">
      {/* ───────── Hero ───────── */}
      <header className="grid items-end gap-8 pb-10 pt-20 md:grid-cols-[1.35fr_1fr] md:pb-12">
        <div className="s-reveal s-blur">
          <div className="flex items-center gap-2.5">
            <span className="h-0.5 w-5 rounded-full" style={{ background: "var(--ds-accent)" }} />
            <span className="ds-kicker">{t("ds.hero.kicker")}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-[0.98] tracking-tight md:text-5xl">
            {t("ds.hero.title.1")}
            <br />
            <span className="font-[family-name:var(--font-playfair)] italic" style={{ color: "var(--ds-accent)" }}>
              {t("ds.hero.title.2")}
            </span>
          </h1>
          <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.hero.desc")}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <button type="button" className="ds-btn ds-btn--primary" onClick={() => onNavigate("ds-fondations")}>
              {t("ds.hero.cta.1")}
            </button>
            <button type="button" className="ds-btn ds-btn--secondary" onClick={() => onNavigate("ds-process")}>
              {t("ds.hero.cta.2")}
            </button>
          </div>
        </div>

        <div className="s-reveal s-scale" style={delay(120)}>
          <DsLiveCanvas onCopy={onCopy} />
          <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ds-fg-muted)]">
            {t("ds.hero.stat")}
          </p>
        </div>
      </header>

      {/* ───────── Marquee ───────── */}
      <div className="overflow-hidden border-y border-[var(--ds-divider)] py-3">
        <div className="ds-marquee flex w-max text-[13px] text-[var(--ds-fg-faint)]">
          {[0, 1].map((copyIndex) => (
            <span key={copyIndex} className="flex gap-5 pr-5" aria-hidden={copyIndex === 1}>
              {MARQUEE_WORDS.map((word) => (
                <span key={word} className="flex gap-5">
                  <span>{word}</span>
                  <span>—</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ───────── 01 Fondations ───────── */}
      <section id="ds-fondations" className="scroll-mt-20 pt-14">
        <SectionHead
          index="01"
          kicker={t("ds.f.kicker")}
          title={t("ds.f.title.1")}
          accent={t("ds.f.title.2")}
          lead={t("ds.f.lead")}
        />

        <div className="grid gap-3 md:grid-cols-2">
          {THEMES.map((theme, i) => (
            <div key={theme.name} className="ds-card s-reveal s-up p-4" style={delay(i * 70)}>
              <div className="mb-3 flex items-baseline justify-between">
                <strong className="text-[13px]">.section-{theme.name}</strong>
                <code className="text-[11px] text-[var(--ds-fg-faint)]">{THEME_TOKEN_PREFIX}*</code>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {theme.swatches.map(([token, value]) => (
                  <button
                    key={token}
                    type="button"
                    className="ds-swatch"
                    style={{ background: value }}
                    onClick={() => copy(token, value)}
                    aria-label={`${token} — ${value}`}
                    title={`${token} · ${value}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="ds-card s-reveal s-up mt-3 p-4" style={delay(280)}>
          <div className="mb-3 flex items-baseline justify-between">
            <strong className="text-[13px]">{t("ds.f.neutral")}</strong>
            <code className="text-[11px] text-[var(--ds-fg-faint)]">--ds-n-100 → 900</code>
          </div>
          <div className="grid grid-cols-9 gap-2">
            {NEUTRAL_STEPS.map((step) => (
              <button
                key={step}
                type="button"
                className="ds-swatch"
                style={{ background: `var(--ds-n-${step})` }}
                onClick={() => copy(`--ds-n-${step}`, `oklch neutral ${step}`)}
                aria-label={`--ds-n-${step}`}
                title={`--ds-n-${step}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_1fr]">
          <Panel title={t("ds.f.type")}>
            <div className="grid gap-3">
              {[
                { label: "--font-geist", cls: "font-sans text-xl", sample: t("ds.f.type.body") },
                { label: "--font-geist-mono", cls: "font-mono text-base", sample: t("ds.f.type.mono") },
                { label: "--font-playfair", cls: "font-[family-name:var(--font-playfair)] italic text-xl", sample: t("ds.f.type.editorial") },
                { label: "Clash Display", cls: "agency-font text-xl", sample: t("ds.f.type.agency") },
                { label: "--font-typewriter", cls: "book-font text-base", sample: t("ds.f.type.book") },
                { label: "--font-fantasy", cls: "book-title-font text-xl", sample: t("ds.f.type.novel") },
                { label: "--font-syne", cls: "mood-font text-xl", sample: t("ds.f.type.mood") },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline gap-3 border-b border-[var(--ds-divider)] pb-2.5 last:border-0 last:pb-0">
                  <code className="w-[118px] shrink-0 text-[11px] text-[var(--ds-fg-faint)]">{row.label}</code>
                  <span className={`${row.cls} leading-tight`}>{row.sample}</span>
                </div>
              ))}
            </div>
          </Panel>

          <div className="grid h-full grid-rows-2 gap-3">
            <Panel title={t("ds.f.space")} step={1}>
              <div className="flex items-end gap-2">
                {[1, 2, 3, 4, 6, 8].map((step) => (
                  <div
                    key={step}
                    className="rounded-[3px]"
                    style={{
                      width: `var(--ds-space-${step})`,
                      height: `var(--ds-space-${step})`,
                      background: "var(--ds-accent)",
                    }}
                  />
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.f.space.desc")}</p>
            </Panel>

            <Panel title={t("ds.f.radius")} step={2}>
              <div className="flex flex-wrap gap-2.5">
                {[
                  ["sm 8", "var(--ds-radius-sm)", "var(--ds-shadow-sm)"],
                  ["md 16", "var(--ds-radius-md)", "var(--ds-shadow-md)"],
                  ["lg 28", "var(--ds-radius-lg)", "var(--ds-shadow-lg)"],
                  ["pill", "999px", "none"],
                ].map(([label, radius, shadow]) => (
                  <div
                    key={label}
                    className="grid h-12 w-16 place-items-center bg-[var(--ds-surface-hi)] text-[11px] font-bold"
                    style={{ borderRadius: radius, boxShadow: shadow }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        <Panel title={t("ds.f.extra")} className="mt-3" step={3}>
          <div className="grid gap-4 text-[13px] sm:grid-cols-3 sm:gap-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="ds-swatch !h-5 !w-5" style={{ background: "var(--section-accent-alt, #c41e3a)" }} />
                <code className="text-[11px] text-[var(--ds-fg-faint)]">--section-accent-alt</code>
              </div>
              <p className="mt-1.5 leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.f.extra.alt.desc")}</p>
            </div>

            <div className="border-t border-[var(--ds-divider)] pt-3.5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="ds-swatch !h-5 !w-5" style={{ background: "var(--state-success)" }} />
                <code className="text-[11px] text-[var(--ds-fg-faint)]">--state-success</code>
                <span className="ds-swatch !h-5 !w-5" style={{ background: "var(--state-error)" }} />
                <code className="text-[11px] text-[var(--ds-fg-faint)]">--state-error</code>
              </div>
              <p className="mt-1.5 leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.f.extra.state.desc")}</p>
            </div>

            <div className="border-t border-[var(--ds-divider)] pt-3.5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
              <div className="flex gap-2">
                <span className="section-lifestyle h-5 flex-1 rounded-[3px]" style={{ background: "var(--section-gradient)" }} />
                <span className="section-lifestyle h-5 flex-1 rounded-[3px]" style={{ background: "var(--section-gradient-text)" }} />
              </div>
              <p className="mt-1.5 leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.f.extra.grad.desc")}</p>
            </div>
          </div>
        </Panel>

      </section>

      {/* ───────── 02 Composants ───────── */}
      <section id="ds-composants" className="scroll-mt-20 pt-14">
        <SectionHead
          index="02"
          kicker={t("ds.c.kicker")}
          title={t("ds.c.title.1")}
          accent={t("ds.c.title.2")}
          lead={t("ds.c.lead")}
        />

        <div className="grid gap-3 md:grid-cols-2">
          <Panel title={t("ds.c.actions")}>
            <div className="flex flex-wrap gap-2.5">
              <button type="button" className="ds-btn ds-btn--primary">{t("ds.c.primary")}</button>
              <button type="button" className="ds-btn ds-btn--secondary">{t("ds.c.secondary")}</button>
              <button type="button" className="ds-btn ds-btn--ghost">Ghost</button>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.c.actions.desc")}</p>
          </Panel>

          <Panel title={t("ds.c.tags")} step={1}>
            <div className="flex flex-wrap gap-2">
              <span className="ds-tag ds-tag--accent">UI Design</span>
              <span className="ds-tag ds-tag--soft">Next.js</span>
              <span className="ds-tag ds-tag--soft">Tailwind</span>
              <span className="ds-tag ds-tag--outline">2026</span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.c.tags.desc")}</p>
          </Panel>

          <Panel title={t("ds.c.form")} step={2}>
            <label htmlFor="ds-demo-email" className="mb-2 block text-[13px] font-semibold">
              {t("ds.c.form.email")}
            </label>
            <input id="ds-demo-email" type="email" className="ds-input" placeholder="prenom@studio.ca" />
            <div className="mt-3 flex flex-wrap gap-4 text-[13px]">
              <label className="flex items-center gap-2">
                <input type="radio" name="ds-demo" defaultChecked className="accent-[var(--ds-accent)]" />
                {t("ds.c.form.mission")}
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="ds-demo" className="accent-[var(--ds-accent)]" />
                {t("ds.c.form.collab")}
              </label>
            </div>
          </Panel>

          <Panel title={t("ds.c.card")} step={3}>
            <div className="grid h-20 place-items-center rounded-[var(--ds-radius-sm)] bg-[var(--ds-surface-hi)] text-[11px] text-[var(--ds-fg-faint)]">
              16:9
            </div>
            <h3 className="mt-3 text-base font-semibold">{t("ds.c.card.title")}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.c.card.body")}</p>
            <div className="mt-2.5 text-[11px] uppercase tracking-[0.1em] text-[var(--ds-fg-faint)]">{t("ds.c.card.meta")}</div>
          </Panel>

          <Panel title={t("ds.c.live")} className="md:col-span-2" step={4}>
            <p className="mb-4 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.c.live.desc")}</p>

            <div role="group" aria-label={t("ds.c.live.picker")} className="mb-4 flex flex-wrap gap-1.5">
              {PREVIEW_THEMES.map(({ label, cls }) => {
                const on = preview === cls
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setPreview(cls)}
                    aria-pressed={on}
                    className="rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors duration-300"
                    style={{
                      borderColor: on ? "var(--ds-accent)" : "var(--ds-divider)",
                      background: on ? "var(--ds-accent)" : "transparent",
                      color: on ? "var(--ds-accent-fg)" : "var(--ds-fg-muted)",
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <div className={`ds-theme-demo ${preview} rounded-[var(--ds-radius-sm)] p-5`}>
              <SectionKicker className="mb-3">{t("ds.c.live.kicker")}</SectionKicker>
              <h3 className="section-title mb-5 text-2xl leading-tight md:text-3xl">
                {t("ds.c.live.title")}{" "}
                <span className="section-title-accent">{t("ds.c.live.accent")}</span>
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <SectionButton role="primary" className="text-sm">{t("ds.c.primary")}</SectionButton>
                <SectionButton role="outline" className="text-sm">{t("ds.c.secondary")}</SectionButton>
                <SectionButton role="pill" className="tap-44">FR / EN</SectionButton>
              </div>
              <code className="mt-4 block text-[11px] opacity-45">.{preview}</code>
            </div>
          </Panel>

          <Panel title={t("ds.c.inventory")} className="md:col-span-2" step={5}>
            <div className="overflow-x-auto">
              <table className="ds-table min-w-[560px]">
                <thead>
                  <tr>
                    <th>{t("ds.c.th.component")}</th>
                    <th>{t("ds.c.th.variants")}</th>
                    <th>{t("ds.c.th.usage")}</th>
                    <th>{t("ds.c.th.status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {INVENTORY.map((row) => (
                    <tr key={row.name}>
                      <td className="font-medium">{row.name}</td>
                      <td className="text-[var(--ds-fg-muted)]">{row.variants}</td>
                      <td className="text-[var(--ds-fg-muted)]">{t(row.usage)}</td>
                      <td>
                        <span className={`ds-tag ${row.status === "stable" ? "ds-tag--accent" : row.status === "review" ? "ds-tag--soft" : "ds-tag--outline"}`}>
                          {t(`ds.status.${row.status}`)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </section>

      {/* ───────── 03 États & a11y ───────── */}
      <section id="ds-etats" className="scroll-mt-20 pt-14">
        <SectionHead
          index="03"
          kicker={t("ds.s.kicker")}
          title={t("ds.s.title.1")}
          accent={t("ds.s.title.2")}
          lead={t("ds.s.lead")}
        />

        <div className="grid gap-3 lg:grid-cols-3">
          <Panel title={t("ds.s.five")}>
            <div className="grid gap-2.5">
              {[
                ["default", ""],
                ["hover", "brightness(1.12)"],
                ["pressed", ""],
                ["focus", ""],
                ["disabled", ""],
              ].map(([state, filter]) => (
                <div key={state} className="flex items-center gap-3">
                  <code className="w-[64px] shrink-0 text-[11px] text-[var(--ds-fg-faint)]">{state}</code>
                  <span
                    className="ds-btn ds-btn--primary pointer-events-none !min-h-8 !px-4 !text-xs"
                    style={{
                      filter: filter || undefined,
                      transform: state === "pressed" ? "translateY(1px)" : undefined,
                      outline: state === "focus" ? "2px solid var(--ds-accent)" : undefined,
                      outlineOffset: state === "focus" ? "3px" : undefined,
                      opacity: state === "disabled" ? 0.45 : undefined,
                    }}
                  >
                    {t("ds.s.send")}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={t("ds.s.contrast")} step={1}>
            <div className="grid gap-2 text-[13px]">
              {CONTRASTS.map((row) => (
                <div
                  key={row.pair}
                  className="flex items-center justify-between gap-3 rounded-[var(--ds-radius-sm)] border border-[var(--ds-divider)] px-3 py-2"
                >
                  <code className="text-[11px] text-[var(--ds-fg-muted)]">{row.pair}</code>
                  <strong className="whitespace-nowrap text-xs">
                    {row.ratio} · {row.grade}
                  </strong>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.s.contrast.desc")}</p>
          </Panel>

          <Panel title={t("ds.s.checklist")} step={2}>
            <ul className="grid gap-2.5 text-[13px] leading-snug">
              {["a11y.1", "a11y.2", "a11y.3", "a11y.4", "a11y.5"].map((key) => (
                <li key={key} className="flex gap-2.5">
                  <span className="font-bold" style={{ color: "var(--ds-accent)" }} aria-hidden>
                    ✓
                  </span>
                  <span>{t(`ds.s.${key}`)}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>

      {/* ───────── 04 Motion ───────── */}
      <section id="ds-motion" className="scroll-mt-20 pt-14">
        <SectionHead
          index="04"
          kicker={t("ds.m.kicker")}
          title={t("ds.m.title.1")}
          accent={t("ds.m.title.2")}
          lead={t("ds.m.lead")}
        />

        <div className="grid gap-3 lg:grid-cols-2">
          <Panel title={t("ds.m.tokens")}>
            <div className="grid gap-2 text-[13px]">
              {[
                ["--ds-dur-fast", "300 ms", t("ds.m.fast")],
                ["--ds-dur-base", "900 ms", t("ds.m.base")],
                ["--ds-dur-slow", "1200 ms", t("ds.m.slow")],
                ["--ds-ease-out", "cubic-bezier(0.16, 1, 0.3, 1)", ""],
                ["--ds-ease-spring", "cubic-bezier(0.34, 1.56, 0.64, 1)", ""],
              ].map(([token, value, note]) => (
                <div key={token} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--ds-divider)] pb-2 last:border-0">
                  <code className="text-[var(--ds-fg-muted)]">{token}</code>
                  <span className="text-right text-xs">
                    {value}
                    {note && <span className="text-[var(--ds-fg-faint)]"> — {note}</span>}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.m.note")}</p>
          </Panel>

          <Panel title={t("ds.m.demo")} step={1}>
            <div className="grid grid-cols-3 gap-2.5">
              <div ref={riseRef} className="grid min-h-[88px] place-items-center rounded-[var(--ds-radius-md)] bg-[var(--ds-surface-hi)] p-2 text-center text-[11px] font-semibold">
                {t("ds.m.demo.enter")}
              </div>
              <div ref={pulseRef} className="grid min-h-[88px] place-items-center rounded-full bg-[var(--ds-surface-hi)] p-2 text-center text-[11px] font-semibold">
                {t("ds.m.demo.feedback")}
              </div>
              <div ref={spinRef} className="grid min-h-[88px] place-items-center rounded-[var(--ds-radius-md)] bg-[var(--ds-surface-hi)] p-2 text-center text-[11px] font-semibold">
                {t("ds.m.demo.loading")}
              </div>
            </div>
            <button type="button" className="ds-btn ds-btn--primary mt-4" onClick={replay}>
              {t("ds.m.replay")}
            </button>
          </Panel>
        </div>
      </section>

      {/* ───────── 05 Responsive ───────── */}
      <section id="ds-responsive" className="scroll-mt-20 pt-14">
        <SectionHead
          index="05"
          kicker={t("ds.r.kicker")}
          title={t("ds.r.title.1")}
          accent={t("ds.r.title.2")}
          lead={t("ds.r.lead")}
        />

        <Panel>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="ds-vw" className="sr-only">
              {t("ds.r.slider")}
            </label>
            <input
              id="ds-vw"
              type="range"
              min={320}
              max={1180}
              step={10}
              value={vw}
              onChange={(e) => setVw(Number(e.target.value))}
              className="min-w-[200px] flex-1 accent-[var(--ds-accent)]"
            />
            <span className="min-w-[78px] text-base font-semibold tabular-nums">{vw} px</span>
            <span className="ds-tag ds-tag--soft">{breakpoint}</span>
          </div>

          <div className="mt-4 overflow-hidden rounded-[var(--ds-radius-md)] bg-[var(--ds-surface-hi)] p-3">
            <div
              className="mx-auto max-w-full rounded-[var(--ds-radius-sm)] bg-[var(--ds-bg)] p-3 transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: `${vw}px` }}
            >
              <div className="flex items-center justify-between border-b border-[var(--ds-divider)] pb-2.5">
                <span className="text-[13px] font-semibold">Portfolio</span>
                <span className="flex gap-1.5">
                  <span className="h-[3px] w-4 rounded-full bg-[var(--ds-fg-faint)]" />
                  <span className="h-[3px] w-4 rounded-full bg-[var(--ds-fg-faint)]" />
                </span>
              </div>
              <div className="mt-3 grid gap-2.5" style={{ gridTemplateColumns: gridCols }}>
                {["#c8ff00", "#ff4d00", "#818cf8", "#e3dacb"].map((color) => (
                  <div key={color} className="h-14 rounded-[var(--ds-radius-sm)]" style={{ background: color, opacity: 0.85 }} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 text-[13px] leading-relaxed sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["≤ 639 · max-sm", "ds.r.xs.desc"],
              ["640 – 767 · compact", "ds.r.compact.desc"],
              ["768 – 1023 · md", "ds.r.medium.desc"],
              ["≥ 1024 · lg", "ds.r.large.desc"],
            ].map(([label, key]) => (
              <div key={label}>
                <strong>{label}</strong>
                <br />
                <span className="text-[var(--ds-fg-muted)]">{t(key)}</span>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* ───────── 06 Méthode ───────── */}
      <section id="ds-process" className="scroll-mt-20 pt-14">
        <SectionHead
          index="06"
          kicker={t("ds.p.kicker")}
          title={t("ds.p.title.1")}
          accent={t("ds.p.title.2")}
          lead={t("ds.p.lead")}
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["1", "2", "3", "4"].map((step, i) => (
            <div key={step} className="ds-card s-reveal s-up p-4" style={delay(i * 70)}>
              <div
                className="grid h-8 w-8 place-items-center rounded-full text-[13px] font-bold"
                style={{ background: "var(--ds-accent)", color: "var(--ds-accent-fg)" }}
              >
                {step}
              </div>
              <h3 className="mt-3 text-base font-semibold">{t(`ds.p.${step}.title`)}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t(`ds.p.${step}.desc`)}</p>
            </div>
          ))}
        </div>

        <Panel title={t("ds.p.flow")} className="mt-3" step={4}>
          <div className="grid gap-2">
            {["flow.1", "flow.2", "flow.3", "flow.4"].map((key, i) => (
              <div key={key} className="flex items-center gap-2.5">
                <span
                  className="flex-1 rounded-full px-3.5 py-2.5 text-[13px] font-semibold"
                  style={
                    i === 3
                      ? { background: "var(--ds-accent)", color: "var(--ds-accent-fg)" }
                      : { background: "var(--ds-surface-hi)" }
                  }
                >
                  {t(`ds.p.${key}`)}
                </span>
                {i < 3 && (
                  <span className="text-[var(--ds-fg-faint)]" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t("ds.p.flow.desc")}</p>
        </Panel>
      </section>

      {/* ───────── 07 Gouvernance ───────── */}
      <section id="ds-gouvernance" className="scroll-mt-20 pt-14">
        <SectionHead
          index="07"
          kicker={t("ds.g.kicker")}
          title={t("ds.g.title.1")}
          accent={t("ds.g.title.2")}
          lead={t("ds.g.lead")}
        />

        <div className="grid gap-3 lg:grid-cols-3">
          <Panel title={t("ds.g.do")}>
            <ul className="grid gap-2.5 text-[13px] leading-relaxed">
              {["do.1", "do.2", "do.3", "do.4"].map((key) => (
                <li key={key}>{t(`ds.g.${key}`)}</li>
              ))}
            </ul>
          </Panel>

          <Panel title={t("ds.g.dont")} step={1}>
            <ul className="grid gap-2.5 text-[13px] leading-relaxed">
              {["dont.1", "dont.2", "dont.3", "dont.4"].map((key) => (
                <li key={key}>{t(`ds.g.${key}`)}</li>
              ))}
            </ul>
          </Panel>

          <Panel title={t("ds.g.versions")} step={2}>
            <div className="grid gap-3 text-[13px] leading-relaxed">
              {["1.3", "1.2", "1.1", "1.0"].map((version) => (
                <div key={version} className="flex gap-2.5">
                  <span className="ds-tag ds-tag--outline shrink-0">v{version}</span>
                  <span className="text-[var(--ds-fg-muted)]">{t(`ds.g.v${version.replace(".", "")}`)}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <footer className="s-reveal s-up mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--ds-divider)] pt-6 text-[13px] text-[var(--ds-fg-muted)]">
        <span>{t("ds.footer")}</span>
        <span className="flex flex-wrap gap-2">
          <span className="ds-tag ds-tag--outline">{t("ds.nav.foundations")}</span>
          <span className="ds-tag ds-tag--outline">{t("ds.nav.components")}</span>
          <span className="ds-tag ds-tag--outline">{t("ds.nav.motion")}</span>
        </span>
      </footer>
    </div>
  )
}
