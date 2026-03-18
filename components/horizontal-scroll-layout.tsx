"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FloatingOrb } from "@/components/floating-orb"

interface HorizontalScrollLayoutProps {
  children: React.ReactNode[]
  sectionNames: string[]
  sectionSlugs: string[]
  sectionThemes: string[]
}

export function HorizontalScrollLayout({ children, sectionNames, sectionSlugs, sectionThemes }: HorizontalScrollLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const isInitialLoad = useRef(true)
  const scrollRaf = useRef<number>(0)

  const updateScrollState = useCallback(() => {
    if (scrollRaf.current) return
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = 0
      if (!containerRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      const sectionWidth = clientWidth
      const newSection = Math.round(scrollLeft / sectionWidth)

      setCurrentSection(newSection)
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    })
  }, [])

  // Sync URL hash with current section
  useEffect(() => {
    if (isInitialLoad.current) return
    const slug = sectionSlugs[currentSection]
    const newHash = currentSection === 0 ? "" : `#${slug}`
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash || window.location.pathname)
    }
  }, [currentSection, sectionSlugs])

  // On mount: read hash and scroll to section
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', updateScrollState)

    const hash = window.location.hash.replace("#", "")
    const index = hash ? sectionSlugs.indexOf(hash) : 0
    if (index > 0) {
      const sectionWidth = container.clientWidth
      container.scrollTo({ left: index * sectionWidth, behavior: "instant" })
    }

    isInitialLoad.current = false
    updateScrollState()

    return () => container.removeEventListener('scroll', updateScrollState)
  }, [sectionSlugs])

  const scrollToSection = (index: number) => {
    if (!containerRef.current) return
    const sectionWidth = containerRef.current.clientWidth
    containerRef.current.scrollTo({
      left: index * sectionWidth,
      behavior: 'smooth'
    })
  }

  const scrollLeft = useCallback(() => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1)
    }
  }, [currentSection])

  const scrollRight = useCallback(() => {
    if (currentSection < children.length - 1) {
      scrollToSection(currentSection + 1)
    }
  }, [currentSection, children.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollLeft()
      } else if (e.key === 'ArrowRight') {
        scrollRight()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollLeft, scrollRight])

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Main Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="horizontal-scroll-container"
      >
        {children.map((child, index) => (
          <section
            key={index}
            id={sectionSlugs[index]}
            className={`vertical-section ${sectionThemes[index] ?? ''}`}
          >
            {child}
          </section>
        ))}
      </div>

      {/* Navigation UI */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-3 rounded-full bg-black/50 backdrop-blur-md">
        {/* Previous Button */}
        <button 
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30 hover:bg-white/10"
          aria-label="Previous section"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Section Indicators */}
        <div className="flex items-center gap-2">
          {sectionNames.map((name, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className="group flex items-center gap-2"
              aria-label={`Go to ${name}`}
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSection === index 
                    ? 'w-8 bg-white' 
                    : 'bg-white/40 group-hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button 
          onClick={scrollRight}
          disabled={!canScrollRight}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30 hover:bg-white/10"
          aria-label="Next section"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Floating Orb (replaces Section Name Indicator) */}
      <FloatingOrb currentSection={currentSection} />

      {/* Scroll Hint - Left */}
      {canScrollLeft && (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 opacity-50 hover:opacity-100 transition-opacity">
          <button 
            onClick={scrollLeft}
            className="w-12 h-24 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      {/* Scroll Hint - Right */}
      {canScrollRight && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 opacity-50 hover:opacity-100 transition-opacity">
          <button 
            onClick={scrollRight}
            className="w-12 h-24 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  )
}
