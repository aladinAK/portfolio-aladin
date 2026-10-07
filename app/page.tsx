import { HorizontalScrollLayout } from "@/components/horizontal-scroll-layout"
import { StudioSection } from "@/components/sections/studio-section"
import { BookSection } from "@/components/sections/book-section"
import { MoodSection } from "@/components/sections/mood-section"

export default function Home() {
  const sectionNames = ["Studio", "Book", "Mood"]
  const sectionSlugs = ["studio", "book", "mood"]
  const sectionThemes = ["section-studio", "section-tech", "section-lifestyle"]

  return (
    <main className="overflow-hidden">
      <HorizontalScrollLayout sectionNames={sectionNames} sectionSlugs={sectionSlugs} sectionThemes={sectionThemes}>
        <StudioSection />
        <BookSection />
        <MoodSection />
      </HorizontalScrollLayout>
    </main>
  )
}
