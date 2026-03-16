"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HorizontalScrollLayoutProps {
  children: React.ReactNode[]
  sectionNames: string[]
}

export function HorizontalScrollLayout({ children, sectionNames }: HorizontalScrollLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    if (!containerRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    const sectionWidth = clientWidth
    const newSection = Math.round(scrollLeft / sectionWidth)
    
    setCurrentSection(newSection)
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', updateScrollState)
    updateScrollState()

    return () => container.removeEventListener('scroll', updateScrollState)
  }, [])

  const scrollToSection = (index: number) => {
    if (!containerRef.current) return
    const sectionWidth = containerRef.current.clientWidth
    containerRef.current.scrollTo({
      left: index * sectionWidth,
      behavior: 'smooth'
    })
  }

  const scrollLeft = () => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1)
    }
  }

  const scrollRight = () => {
    if (currentSection < children.length - 1) {
      scrollToSection(currentSection + 1)
    }
  }

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
  }, [currentSection])

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
            className="vertical-section"
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

      {/* Section Name Indicator */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md">
        <span className="text-sm text-white font-medium tracking-wide">
          {sectionNames[currentSection]}
        </span>
      </div>

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
