"use client"

import dynamic from "next/dynamic"

// L'étude de cas ne pèse sur le bundle qu'à l'ouverture.
export const LazyOpticOverlay = dynamic(
  () => import("@/components/case-study/optic-overlay").then((m) => m.OpticOverlay),
  { ssr: false },
)
