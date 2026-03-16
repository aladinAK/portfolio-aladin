"use client"

import { Leaf, Sun, Droplets, Wind } from "lucide-react"

export function NatureSection() {
  return (
    <div className="section-nature min-h-[300vh]" style={{ backgroundColor: "var(--section-bg)", color: "var(--section-fg)" }}>
      {/* Hero */}
      <section className="h-screen flex flex-col justify-between p-6 md:p-12">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6" style={{ color: "var(--section-accent)" }} />
            <span className="text-xl font-light tracking-wide">terra</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-light">
            <a href="#" className="hover:opacity-70 transition-opacity">Philosophy</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Retreats</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Wellness</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Contact</a>
          </div>
          <button className="px-6 py-3 text-sm rounded-full transition-colors" style={{ backgroundColor: "var(--section-accent)", color: "var(--section-bg)" }}>
            Book Now
          </button>
        </nav>

        <div className="flex-1 flex items-center justify-center text-center">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.3em] uppercase mb-6 opacity-70">Reconnect with Nature</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
              Find Your
              <br />
              <span className="italic" style={{ color: "var(--section-accent)" }}>Inner Peace</span>
            </h1>
            <p className="mt-8 text-lg font-light max-w-xl mx-auto opacity-80">
              Escape the noise. Embrace the stillness. Our wellness retreats offer a sanctuary for mind, body, and soul.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest uppercase opacity-50">Discover</span>
            <div className="w-px h-16 bg-current opacity-30 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="min-h-screen p-6 md:p-12 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase opacity-50 mb-4 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8">
              Dedicated to <span className="italic" style={{ color: "var(--section-accent)" }}>Creativity</span>, Culture & Growth
            </h2>
            <p className="text-lg font-light leading-relaxed opacity-80 mb-6">
              Terra is a sanctuary where brands and people come to define who they are, sharpen their vision, and carve out what's next.
            </p>
            <p className="text-lg font-light leading-relaxed opacity-80">
              We believe that when life and work move in sync, the best ideas don't just happen — they flow. That's why we created a new way to pause, reset, and spark the thinking that fuels not just careers, but whole ways of being.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Sun, label: "Mindfulness" },
              { icon: Droplets, label: "Hydration" },
              { icon: Wind, label: "Breathwork" },
              { icon: Leaf, label: "Nature" },
            ].map((item, i) => (
              <div key={i} className="aspect-square rounded-2xl p-6 flex flex-col items-center justify-center text-center" style={{ backgroundColor: "var(--section-muted)" }}>
                <item.icon className="w-8 h-8 mb-4" style={{ color: "var(--section-accent)" }} />
                <span className="text-sm font-light">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retreats */}
      <section className="min-h-screen p-6 md:p-12">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase opacity-50 mb-4 block">Experiences</span>
          <h2 className="text-3xl md:text-5xl font-light">Our Retreats</h2>
        </div>

        <div className="space-y-4">
          {[
            { title: "Mountain Sanctuary", location: "Swiss Alps", duration: "7 Days" },
            { title: "Ocean Renewal", location: "Bali, Indonesia", duration: "5 Days" },
            { title: "Forest Immersion", location: "Oregon, USA", duration: "4 Days" },
            { title: "Desert Awakening", location: "Morocco", duration: "6 Days" },
          ].map((retreat, i) => (
            <div key={i} className="group flex items-center justify-between py-6 px-6 rounded-xl cursor-pointer transition-colors hover:bg-[var(--section-muted)]" style={{ borderBottom: "1px solid var(--section-muted)" }}>
              <div>
                <h3 className="text-xl md:text-2xl font-light group-hover:translate-x-2 transition-transform">{retreat.title}</h3>
                <span className="text-sm opacity-60">{retreat.location}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm opacity-60">{retreat.duration}</span>
                <button className="px-4 py-2 text-sm rounded-full border opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: "var(--section-accent)", color: "var(--section-accent)" }}>
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm opacity-50 mb-4">SWIPE RIGHT FOR NEXT SECTION</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--section-accent)" }}></div>
            <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
            <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
