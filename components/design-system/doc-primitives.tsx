"use client"

/**
 * Primitives des panneaux de documentation (design system, études de cas).
 * Elles ne lisent que les jetons --ds-* : chaque panneau les habille en
 * surchargeant ces jetons sur sa racine.
 */

export const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties

export function SectionHead({
  index,
  kicker,
  title,
  accent,
  lead,
}: {
  index: string
  kicker: string
  title: string
  accent: string
  lead: string
}) {
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

export function Panel({
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
