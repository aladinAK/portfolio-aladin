"use client"

import { useEffect } from "react"

/**
 * Révèle les éléments portant `.s-reveal` quand ils entrent dans le champ.
 * Les variantes de trajectoire (`.s-up`, `.s-blur`, `.s-scale`…) et le
 * `--delay` sont définis dans globals.css.
 *
 * @param ref     conteneur dont on observe les descendants `.s-reveal`
 * @param rootRef conteneur défilant servant de zone de détection ; par défaut
 *                la `.vertical-section` ancêtre, qui est le scroller du portfolio.
 */
export function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  rootRef?: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const root = rootRef?.current ?? ref.current?.closest(".vertical-section")
    if (!root) return
    const els = ref.current?.querySelectorAll(".s-reveal")
    if (!els?.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("s-visible")
            io.unobserve(e.target)
          }
        })
      },
      { root, threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ref, rootRef])
}
