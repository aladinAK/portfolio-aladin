"use client"

/**
 * The portfolio had nine button styles for three actual roles. Radius and
 * kicker family come from the section theme, so the same three roles read as
 * native in every section.
 */

type Role = "primary" | "outline" | "pill"

interface SectionButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  role?: Role
}

export function SectionButton({ role = "primary", className = "", ...rest }: SectionButtonProps) {
  return <button className={`section-btn section-btn--${role} ${className}`} {...rest} />
}

interface SectionLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  role?: Role
}

/** Same three roles, for an anchor rather than a button. */
export function SectionLink({ role = "primary", className = "", ...rest }: SectionLinkProps) {
  return <a className={`section-btn section-btn--${role} ${className}`} {...rest} />
}
