import { HorizontalScrollLayout } from "@/components/horizontal-scroll-layout"
import { StudioSection } from "@/components/sections/studio-section"
import { AgencySection } from "@/components/sections/agency-section"
import { BookSection } from "@/components/sections/book-section"
import { MoodSection } from "@/components/sections/mood-section"

export default function Home() {
  const sectionNames = ["Studio", "Agency", "Book", "Mood"]
  const sectionSlugs = ["studio", "agency", "book", "mood"]

  return (
    <main className="overflow-hidden">
      <HorizontalScrollLayout sectionNames={sectionNames} sectionSlugs={sectionSlugs}>
        <StudioSection />
        <AgencySection />
        <BookSection />
        <MoodSection />
      </HorizontalScrollLayout>
    </main>
  )
}
