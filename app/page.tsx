import { HorizontalScrollLayout } from "@/components/horizontal-scroll-layout"
import { StudioSection } from "@/components/sections/studio-section"
import { NatureSection } from "@/components/sections/nature-section"
import { TechSection } from "@/components/sections/tech-section"
import { LifestyleSection } from "@/components/sections/lifestyle-section"

export default function Home() {
  const sectionNames = ["Studio", "Agency", "Book", "Mood"]
  const sectionSlugs = ["studio", "agency", "book", "mood"]

  return (
    <main className="overflow-hidden">
      <HorizontalScrollLayout sectionNames={sectionNames} sectionSlugs={sectionSlugs}>
        <StudioSection />
        <NatureSection />
        <TechSection />
        <LifestyleSection />
      </HorizontalScrollLayout>
    </main>
  )
}
