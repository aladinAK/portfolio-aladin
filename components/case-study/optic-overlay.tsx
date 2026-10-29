"use client"

import { useMemo } from "react"
import { useLang } from "@/lib/i18n"
import { DocOverlay, readSectionAccent } from "@/components/design-system/doc-overlay"
import { OpticContent, OPTIC_SECTIONS } from "@/components/case-study/optic-content"

/**
 * Étude de cas Optic.ca — même coque et même identité que le design system :
 * l'accent suit la section d'ouverture. Les couleurs d'Optic n'apparaissent que
 * dans ses visuels et ses échantillons de contraste.
 */
interface OpticOverlayProps {
  onClose: () => void
}

export function OpticOverlay({ onClose }: OpticOverlayProps) {
  const { t } = useLang()
  const theme = useMemo(readSectionAccent, [])

  return (
    <DocOverlay
      sections={OPTIC_SECTIONS}
      label={t("cs.title")}
      closeLabel={t("ds.close")}
      accent={theme.accent}
      accentFg={theme.fg}
      onClose={onClose}
    >
      {({ goTo }) => <OpticContent onNavigate={goTo} />}
    </DocOverlay>
  )
}
