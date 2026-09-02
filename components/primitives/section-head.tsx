"use client"

/**
 * Section heading shared by the four sections: a kicker, a title, and an
 * optional accented half.
 *
 * The four sections used to compose this by hand — seventeen `<h2>` blocks,
 * fourteen kicker variants, five different opacities. What differs between
 * them is personality (family, size, leading, how the accent is treated), and
 * that now lives in the section theme, not here. Which is the point: one
 * component has to survive all four identities.
 */

interface SectionKickerProps {
  children: React.ReactNode
  /** Bottom margin varies legitimately with the surrounding rhythm. */
  className?: string
}

export function SectionKicker({ children, className = "" }: SectionKickerProps) {
  return <span className={`section-kicker ${className}`}>{children}</span>
}

interface SectionHeadProps {
  kicker: string
  title: string
  /** Second half of the title, painted with the section accent. */
  accent?: string
  /** Extra classes on the wrapper — reveal hooks, spacing, alignment. */
  className?: string
  kickerClassName?: string
  titleClassName?: string
}

export function SectionHead({
  kicker,
  title,
  accent,
  className = "",
  kickerClassName = "mb-8",
  titleClassName = "",
}: SectionHeadProps) {
  return (
    <div className={className}>
      <SectionKicker className={kickerClassName}>{kicker}</SectionKicker>
      <h2 className={`section-title ${titleClassName}`}>
        {title}
        {accent && (
          <>
            <br />
            <span className="section-title-accent">{accent}</span>
          </>
        )}
      </h2>
    </div>
  )
}
