"use client"

import { Star, Heart, ShoppingBag, ArrowUpRight } from "lucide-react"

export function LifestyleSection() {
  return (
    <div className="section-lifestyle min-h-[300vh]" style={{ backgroundColor: "var(--section-bg)", color: "var(--section-fg)" }}>
      {/* Hero */}
      <section className="h-screen flex flex-col justify-between p-6 md:p-12">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-serif italic tracking-wide">Maison</div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="hover:opacity-70 transition-opacity">Collection</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Atelier</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Journal</a>
            <a href="#" className="hover:opacity-70 transition-opacity">About</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center" style={{ backgroundColor: "var(--section-accent)", color: "var(--section-bg)" }}>2</span>
            </button>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center text-center">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.3em] uppercase mb-8 opacity-60">New Collection 2024</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-tight">
              Timeless
              <br />
              <span style={{ color: "var(--section-accent)" }}>Elegance</span>
            </h1>
            <p className="mt-8 text-lg font-light max-w-lg mx-auto opacity-70">
              Curated pieces for the modern connoisseur. Where craftsmanship meets contemporary design.
            </p>
            <button className="mt-10 px-8 py-4 text-sm tracking-wide uppercase border rounded-none transition-colors hover:bg-[var(--section-fg)] hover:text-[var(--section-bg)]" style={{ borderColor: "var(--section-fg)" }}>
              Explore Collection
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 text-sm opacity-60">
          <span>Free Worldwide Shipping</span>
          <span>•</span>
          <span>Handcrafted with Care</span>
          <span>•</span>
          <span>Lifetime Warranty</span>
        </div>
      </section>

      {/* Featured Products */}
      <section className="min-h-screen p-6 md:p-12">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-serif italic">Featured Pieces</h2>
          <a href="#" className="flex items-center gap-2 text-sm hover:gap-4 transition-all" style={{ color: "var(--section-accent)" }}>
            View all <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "The Milano Chair", category: "Furniture", price: "$2,450" },
            { name: "Ceramic Vase Set", category: "Décor", price: "$380" },
            { name: "Silk Throw", category: "Textiles", price: "$520" },
            { name: "Bronze Table Lamp", category: "Lighting", price: "$890" },
            { name: "Marble Tray", category: "Accessories", price: "$240" },
            { name: "Linen Cushion", category: "Textiles", price: "$180" },
          ].map((product, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-lg mb-4 relative overflow-hidden" style={{ backgroundColor: "var(--section-muted)" }}>
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Heart className="w-5 h-5" />
                </button>
                <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-full py-3 text-sm rounded-lg font-medium transition-colors" style={{ backgroundColor: "var(--section-accent)", color: "var(--section-bg)" }}>
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm opacity-60">{product.category}</p>
                </div>
                <span className="font-medium" style={{ color: "var(--section-accent)" }}>{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="min-h-screen p-6 md:p-12 flex flex-col justify-center">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase opacity-50 mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-serif italic">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "The attention to detail is extraordinary. Each piece feels like it was made just for me.", author: "Sarah M.", location: "Paris" },
            { quote: "Finally, a brand that understands modern luxury. Quality that speaks for itself.", author: "James L.", location: "New York" },
            { quote: "Their customer service is as exceptional as their products. A true luxury experience.", author: "Emma C.", location: "London" },
          ].map((testimonial, i) => (
            <div key={i} className="p-8 rounded-lg" style={{ backgroundColor: "var(--section-muted)" }}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" style={{ color: "var(--section-accent)" }} />
                ))}
              </div>
              <p className="text-lg font-light italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm opacity-60">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-20 text-center max-w-xl mx-auto">
          <h3 className="text-2xl font-serif italic mb-4">Join Our World</h3>
          <p className="text-sm opacity-70 mb-6">Subscribe for exclusive access to new collections, events, and members-only offers.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-lg text-sm bg-transparent border focus:outline-none focus:border-[var(--section-accent)]"
              style={{ borderColor: "var(--section-muted)" }}
            />
            <button className="px-6 py-3 text-sm font-medium rounded-lg transition-colors" style={{ backgroundColor: "var(--section-accent)", color: "var(--section-bg)" }}>
              Subscribe
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm opacity-50 mb-4">SWIPE LEFT TO GO BACK</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
            <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
            <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--section-accent)" }}></div>
          </div>
        </div>
      </section>
    </div>
  )
}
