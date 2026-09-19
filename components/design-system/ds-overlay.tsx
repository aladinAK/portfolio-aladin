"use client"

import { useMemo } from "react"
import { useLang } from "@/lib/i18n"
import { DocOverlay, readSectionAccent } from "@/components/design-system/doc-overlay"
import { DsContent, DS_SECTIONS } from "@/components/design-system/ds-content"

/**
 * Panneau plein écran (et non popup) : le système compte sept sections,
 * un marquee et un simulateur responsive — ça ne tient pas dans une modale.
 */
interface DsOverlayProps {
  onClose: () => void
}

export function DsOverlay({ onClose }: DsOverlayProps) {
  const { t } = useLang()
  const theme = useMemo(readSectionAccent, [])

  return (
    <DocOverlay
      sections={DS_SECTIONS}
      label={t("ds.title")}
      closeLabel={t("ds.close")}
      accent={theme.accent}
      accentFg={theme.fg}
      onClose={onClose}
    >
      {({ goTo, notify }) => <DsContent onNavigate={goTo} onCopy={notify} theme={theme.theme} />}
    </DocOverlay>
  )
}
