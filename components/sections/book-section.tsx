"use client"

import { ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useLang } from "@/lib/i18n"

const THOUGHT_KEYS = [
  "book.thought.0", "book.thought.1", "book.thought.2", "book.thought.3",
  "book.thought.4", "book.thought.5", "book.thought.6", "book.thought.7",
]

function ReadingPerso() {
  const { t } = useLang()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % THOUGHT_KEYS.length)
        setVisible(true)
      }, 400)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center">
      {/* Thought bubble */}
      <div className="relative mb-2">
        <div
          className="book-font text-sm md:text-base px-5 py-3 rounded-full border transition-all duration-400"
          style={{
            borderColor: "#000",
            backgroundColor: "rgba(26, 26, 26, 0.05)",
            opacity: visible ? 0.6 : 0,
            transform: visible ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {t(THOUGHT_KEYS[index])}
        </div>
        {/* Bubble tail — small circles */}
        <div className="flex flex-col items-center gap-1 mt-1">
          <div className="w-2 h-2 rounded-full border opacity-30" style={{ borderColor: "#000" }} />
          <div className="w-1.5 h-1.5 rounded-full border opacity-20" style={{ borderColor: "#000" }} />
        </div>
      </div>
      {/* Character */}
      <img
        src="/perso.png"
        alt=""
        loading="lazy"
        decoding="async"
        className="w-50"
      />
    </div>
  )
}

function BrushStrokes() {
  return (
    <>
      {/* form1 — brush stroke, multiple placements */}
      <img src="/book/form1.webp" alt="" loading="lazy" decoding="async" className="absolute top-[8%] right-[-5%] w-[400px] md:w-[550px] opacity-[0.06] rotate-[-8deg] book-brush" style={{ "--brush-d": "0.3s" } as React.CSSProperties} />
      <img src="/book/form1.webp" alt="" loading="lazy" decoding="async" className="absolute bottom-[12%] left-[-8%] w-[350px] md:w-[450px] opacity-[0.04] rotate-[175deg] book-brush" style={{ "--brush-d": "1s" } as React.CSSProperties} />
      <img src="/book/form1.webp" alt="" loading="lazy" decoding="async" className="absolute top-[110vh] right-[2%] w-[300px] md:w-[400px] opacity-[0.05] rotate-[-20deg] book-brush" style={{ "--brush-d": "1.8s" } as React.CSSProperties} />
      <img src="/book/form1.webp" alt="" loading="lazy" decoding="async" className="absolute top-[220vh] left-[-3%] w-[350px] opacity-[0.04] rotate-[10deg] book-brush" style={{ "--brush-d": "2.5s" } as React.CSSProperties} />

      {/* form2 — ink splatter, multiple placements */}
      <img src="/book/form2.webp" alt="" loading="lazy" decoding="async" className="absolute top-[25%] left-[5%] w-[180px] md:w-[250px] opacity-[0.05] book-brush" style={{ "--brush-d": "0.6s" } as React.CSSProperties} />
      <img src="/book/form2.webp" alt="" loading="lazy" decoding="async" className="absolute top-[65%] right-[8%] w-[150px] md:w-[200px] opacity-[0.04] rotate-[90deg] book-brush" style={{ "--brush-d": "1.3s" } as React.CSSProperties} />
      <img src="/book/form2.webp" alt="" loading="lazy" decoding="async" className="absolute top-[150vh] left-[50%] w-[200px] opacity-[0.035] rotate-[45deg] book-brush" style={{ "--brush-d": "2.2s" } as React.CSSProperties} />
    </>
  )
}

const TOMES = [
  { num: "I", key: "book.t1", href: "https://www.amazon.ca/Aladin-Akkari-ebook/dp/B0G3XJ9QHV/" },
  { num: "II", key: "book.t2", href: "https://www.amazon.ca/-/fr/Aladin-Akkari-ebook/dp/B0GCK5T59R" },
  { num: "III", key: "book.t3", href: "https://www.amazon.ca/-/fr/Aladin-Akkari-ebook/dp/B0GRC8PPGC" },
  { num: "IV", key: "book.t4", href: null },
]

interface InkSplat {
  w: number; h: number; top: string; o: number; d: string; blur: number
  left?: string; right?: string
}

const INK_SPLATS: InkSplat[] = [
  { w: 180, h: 160, top: "5%", left: "8%", o: 0.035, d: "0.3s", blur: 20 },
  { w: 120, h: 130, top: "70%", right: "5%", o: 0.04, d: "0.8s", blur: 15 },
  { w: 90, h: 80, top: "40%", left: "85%", o: 0.03, d: "1.2s", blur: 12 },
  { w: 200, h: 180, top: "80%", left: "20%", o: 0.025, d: "0.6s", blur: 25 },
  { w: 60, h: 55, top: "15%", left: "60%", o: 0.05, d: "1.5s", blur: 8 },
  { w: 140, h: 120, top: "50%", left: "3%", o: 0.03, d: "1s", blur: 18 },
]

const INK_DRIPS = [
  { left: "12%", top: "12%", h: "100px", d: "1s" },
  { left: "88%", top: "72%", h: "60px", d: "1.8s" },
  { left: "62%", top: "16%", h: "45px", d: "2.2s" },
  { left: "25%", top: "82%", h: "80px", d: "1.4s" },
]

function Typewriter({ text, delay, steps }: { text: string; delay: string; steps: number }) {
  return (
    <span className="inline-block">
      <span
        className="typewriter book-font"
        style={{ "--tw-dur": `${steps * 0.08}s`, "--tw-d": delay, "--tw-steps": steps } as React.CSSProperties}
      >
        {text}
      </span>
    </span>
  )
}

export function BookSection() {
  const { t } = useLang()

  return (
    <div
      className="section-tech"
      style={{ backgroundColor: "var(--section-bg)", color: "var(--section-fg)" }}
    >
      {/* Vintage overlay — grain + vignette */}
      <div className="absolute inset-0 pointer-events-none z-1" aria-hidden>
        <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "150px" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)" }} />
      </div>

      {/* Ink & brush layer — covers entire section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
        {INK_SPLATS.map((s, i) => (
          <div
            key={`splat-${i}`}
            className="ink-splat"
            style={{
              width: s.w, height: s.h, top: s.top, left: s.left, right: s.right,
              "--ink-o": s.o, animationDelay: s.d, filter: `blur(${s.blur}px)`,
            } as React.CSSProperties}
          />
        ))}
        {INK_DRIPS.map((d, i) => (
          <div
            key={`drip-${i}`}
            className="ink-drip"
            style={{ left: d.left, top: d.top, "--drip-h": d.h, "--drip-d": d.d } as React.CSSProperties}
          />
        ))}
        <BrushStrokes />
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-hidden">
        {/* Thin decorative border — like a page */}
        <div className="absolute inset-8 md:inset-14 lg:inset-20 border border-current opacity-[0.06] pointer-events-none" />

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 md:top-14 md:left-14 lg:top-20 lg:left-20 w-4 h-4 border-t border-l border-current opacity-[0.15]" />
        <div className="absolute top-8 right-8 md:top-14 md:right-14 lg:top-20 lg:right-20 w-4 h-4 border-t border-r border-current opacity-[0.15]" />
        <div className="absolute bottom-8 left-8 md:bottom-14 md:left-14 lg:bottom-20 lg:left-20 w-4 h-4 border-b border-l border-current opacity-[0.15]" />
        <div className="absolute bottom-8 right-8 md:bottom-14 md:right-14 lg:bottom-20 lg:right-20 w-4 h-4 border-b border-r border-current opacity-[0.15]" />

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between">
          <span className="book-font text-sm tracking-[0.3em] uppercase opacity-50">
            {t("book.label")}
          </span>
          <a
            href="https://aladin-akkari-book-store.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="book-font text-sm tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-current/30 hover:decoration-current/70"
          >
            {t("book.store")}
          </a>
        </nav>

        {/* Center */}
        <div className="relative z-10 flex-1 flex items-center justify-center text-center">
          <div className="max-w-3xl">
            {/* Main title — like the book store */}
            <h1 className="book-title-font text-center font-black leading-[0.85] mb-6" style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}>
              {t("book.main.1")}<br />
              <span className="italic book-ruby-glow">{t("book.main.2")}</span><br />
              {t("book.main.3")}
            </h1>

            {/* Subtitle — italic serif */}
            <p className="book-title-font italic opacity-55 text-xl md:text-2xl my-5 leading-relaxed">
              {t("book.subtitle")}
            </p>

            {/* Typewriter author */}
            <div className="h-5 flex justify-center mb-10">
              <Typewriter text={`Aladin Akkari`} delay="1.5s" steps={25} />
            </div>

            {/* CTA */}
            <a
              href="https://www.amazon.ca/-/fr/dp/B0G4KNMJ42"
              target="_blank"
              rel="noopener noreferrer"
              className="book-font inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(194,58,34,0.25)]"
              style={{ backgroundColor: "#C41E3A", color: "#f5f2eb" }}
            >
              {t("book.cta")}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-end justify-between">
          <span className="book-font text-xs tracking-[0.2em] uppercase opacity-35">
            {t("book.genre")}
          </span>
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-10 bg-current opacity-15" />
            <span className="book-font text-xs tracking-[0.2em] uppercase opacity-35">{t("book.scroll")}</span>
          </div>
          <span className="book-font text-xs tracking-[0.2em] uppercase opacity-35">
            {t("book.tomes.count")}
          </span>
        </div>
      </section>

      {/* ═══════════════ SYNOPSIS ═══════════════ */}
      <section className="relative min-h-screen p-6 md:p-12 lg:p-16 py-24 flex items-center">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <span className="book-font text-xs tracking-[0.3em] uppercase opacity-40 block mb-6">
              {t("book.synopsis.label")}
            </span>
            <h2 className="book-font text-2xl md:text-3xl lg:text-4xl leading-[1.3] mb-8 opacity-85">
              {t("book.synopsis.title")}
            </h2>
            <div className="w-10 h-px bg-current opacity-15 mb-8" />
            <p className="book-font text-base leading-loose opacity-60 mb-6">
              {t("book.synopsis.p1")}
            </p>
            <p className="book-font text-base leading-loose opacity-60">
              {t("book.synopsis.p2")}
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="book-font text-xs tracking-[0.3em] uppercase opacity-40 block mb-8">
              {t("book.characters.label")}
            </span>
            {[
              { name: "Jez", key: "book.char.jez" },
              { name: "Marv", key: "book.char.marv" },
              { name: "Oslo", key: "book.char.oslo" },
              { name: "Ava", key: "book.char.ava" },
            ].map((char, i) => (
              <div
                key={i}
                className="group flex items-baseline justify-between py-5 border-b"
                style={{ borderColor: "var(--section-muted)" }}
              >
                <span className="book-title-font text-2xl md:text-3xl group-hover:translate-x-2 transition-transform duration-500">{char.name}</span>
                <span className="book-font text-sm opacity-50">{t(char.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TOMES ═══════════════ */}
      <section className="relative min-h-screen p-6 md:p-12 lg:p-16 py-24 overflow-hidden">
        {/* Reading character — absolute bottom right */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
          <ReadingPerso />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <span className="book-font text-xs tracking-[0.3em] uppercase opacity-40 block mb-4">
              {t("book.tomes.label")}
            </span>
            <h2 className="book-font text-2xl md:text-4xl opacity-80">
              {t("book.tomes.title")}
            </h2>
          </div>

          <div className="space-y-0">
            {TOMES.map((tome, i) => (
              <div
                key={i}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-t"
                style={{ borderColor: "var(--section-muted)" }}
              >
                <div className="flex items-baseline gap-4 md:gap-8 mb-2 md:mb-0">
                  <span className="book-font text-sm opacity-35">{t("book.tome")} {tome.num}</span>
                  <h3 className="book-title-font text-2xl md:text-3xl lg:text-4xl group-hover:translate-x-2 transition-transform duration-500">
                    {t(`${tome.key}.title`)}
                  </h3>
                </div>
                <div className="flex items-center gap-4 md:pl-4">
                  <span className="book-font text-xs uppercase tracking-wider opacity-40">{t(`${tome.key}.status`)}</span>
                  {tome.href ? (
                    <a
                      href={tome.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="book-font flex items-center gap-2 px-4 py-2 border text-sm tracking-wide opacity-50 group-hover:opacity-100 transition-all duration-500 hover:bg-[var(--section-fg)] hover:text-[var(--section-bg)]"
                      style={{ borderColor: "var(--section-muted)" }}
                    >
                      Amazon <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="book-font text-sm opacity-35 italic px-4 py-2">{t("book.coming")}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Author quote */}
          <div className="mt-24 text-center max-w-lg mx-auto">
            <div className="w-6 h-px bg-current opacity-10 mx-auto mb-8" />
            <p className="book-font text-lg opacity-50 leading-relaxed mb-4">
              &ldquo;{t("book.author.quote")}&rdquo;
            </p>
            <span className="book-font text-xs tracking-[0.2em] uppercase opacity-35">— Aladin Akkari</span>
          </div>

          {/* Bookstore link */}
          <div className="mt-15 mb-80 max-sm:mb-50 text-center">
            <a
              href="https://aladin-akkari-book-store.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="book-font inline-flex items-center gap-2 text-base tracking-widest opacity-50 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-current/30 hover:decoration-current/70"
            >
              {t("book.store.cta")}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
