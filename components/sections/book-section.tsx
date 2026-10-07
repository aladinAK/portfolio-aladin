"use client"

import { ArrowUpRight, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useLang } from "@/lib/i18n"
import { ManuscriptCanvas } from "@/components/manuscript-canvas"
import { SectionHead, SectionKicker } from "@/components/primitives/section-head"

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
            borderColor: "var(--section-fg)",
            backgroundColor: "rgba(26, 26, 26, 0.05)",
            opacity: visible ? 0.6 : 0,
            transform: visible ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {t(THOUGHT_KEYS[index])}
        </div>
        {/* Bubble tail — small circles */}
        <div className="flex flex-col items-center gap-1 mt-1">
          <div className="w-2 h-2 rounded-full border opacity-30" style={{ borderColor: "var(--section-fg)" }} />
          <div className="w-1.5 h-1.5 rounded-full border opacity-20" style={{ borderColor: "var(--section-fg)" }} />
        </div>
      </div>
      {/* Character */}
      <img
        src="/perso.png"
        alt=""
        loading="lazy"
        decoding="async"
        width={241}
        height={274}
        className="w-50 h-auto"
      />
    </div>
  )
}

function BrushStrokes() {
  return (
    <>
      {/* form1 — brush stroke, multiple placements */}
      <img src="/book/form1.webp" alt="" loading="lazy" decoding="async" className="absolute top-[8%] right-[-5%] w-[400px] md:w-[550px] rotate-[-8deg] book-brush" style={{ "--brush-d": "0.3s", "--brush-o": 0.169 } as React.CSSProperties} />
      <img src="/book/form1.webp" alt="" loading="lazy" decoding="async" className="absolute bottom-[12%] left-[-8%] w-[350px] md:w-[450px] rotate-[175deg] book-brush" style={{ "--brush-d": "1s", "--brush-o": 0.131 } as React.CSSProperties} />
      <img src="/book/form1.webp" alt="" loading="lazy" decoding="async" className="absolute top-[110vh] right-[2%] w-[300px] md:w-[400px] rotate-[-20deg] book-brush" style={{ "--brush-d": "1.8s", "--brush-o": 0.151 } as React.CSSProperties} />
      <img src="/book/form1.webp" alt="" loading="lazy" decoding="async" className="absolute top-[220vh] left-[-3%] w-[350px] rotate-[10deg] book-brush" style={{ "--brush-d": "2.5s", "--brush-o": 0.131 } as React.CSSProperties} />

      {/* form2 — ink splatter, multiple placements */}
      <img src="/book/form2.webp" alt="" loading="lazy" decoding="async" className="absolute top-[25%] left-[5%] w-[180px] md:w-[250px] book-brush" style={{ "--brush-d": "0.6s", "--brush-o": 0.151 } as React.CSSProperties} />
      <img src="/book/form2.webp" alt="" loading="lazy" decoding="async" className="absolute top-[65%] right-[8%] w-[150px] md:w-[200px] rotate-[90deg] book-brush" style={{ "--brush-d": "1.3s", "--brush-o": 0.131 } as React.CSSProperties} />
      <img src="/book/form2.webp" alt="" loading="lazy" decoding="async" className="absolute top-[150vh] left-[50%] w-[200px] rotate-[45deg] book-brush" style={{ "--brush-d": "2.2s", "--brush-o": 0.122 } as React.CSSProperties} />
    </>
  )
}

const TOMES = [
  { num: "I", key: "book.t1", href: "https://www.amazon.ca/Aladin-Akkari-ebook/dp/B0G3XJ9QHV/" },
  { num: "II", key: "book.t2", href: "https://www.amazon.ca/-/fr/Aladin-Akkari-ebook/dp/B0GCK5T59R" },
  { num: "III", key: "book.t3", href: "https://www.amazon.ca/-/fr/Aladin-Akkari-ebook/dp/B0GRC8PPGC" },
  { num: "IV", key: "book.t4", href: "https://www.amazon.ca/-/fr/Aladin-Akkari-ebook/dp/B0HC7TWSB5" },
]

interface InkSplat {
  w: number; h: number; top: string; o: number; d: string; blur: number
  left?: string; right?: string
}

const INK_SPLATS: InkSplat[] = [
  { w: 180, h: 160, top: "5%", left: "8%", o: 0.122, d: "0.3s", blur: 20 },
  { w: 120, h: 130, top: "70%", right: "5%", o: 0.131, d: "0.8s", blur: 15 },
  { w: 90, h: 80, top: "40%", left: "85%", o: 0.113, d: "1.2s", blur: 12 },
  { w: 200, h: 180, top: "80%", left: "20%", o: 0.104, d: "0.6s", blur: 25 },
  { w: 60, h: 55, top: "15%", left: "60%", o: 0.151, d: "1.5s", blur: 8 },
  { w: 140, h: 120, top: "50%", left: "3%", o: 0.113, d: "1s", blur: 18 },
]

const INK_DRIPS = [
  { left: "12%", top: "12%", h: "100px", d: "1s" },
  { left: "88%", top: "72%", h: "60px", d: "1.8s" },
  { left: "62%", top: "16%", h: "45px", d: "2.2s" },
  { left: "25%", top: "82%", h: "80px", d: "1.4s" },
]

/**
 * Genuine Amazon reviews, copied verbatim. Review bodies are intentionally not
 * translated: these are the readers' own words, only the surrounding chrome
 * goes through i18n. `verified` mirrors the real badge on the product page —
 * the "Do" review does not carry it.
 */
const REVIEWS = [
  {
    author: "Ahmed",
    title: "j\u2019ai adoré !",
    date: "2025-11-26",
    verified: true,
    body: [
      "Une histoire courte mais super prenante, qui se lit vraiment toute seule. On s\u2019attache vite à Jez et Marv, leur duo est intrigant et plein d\u2019émotion.",
      "L\u2019action ne s\u2019arrête jamais et on a envie d\u2019en savoir plus à chaque page. j\u2019ai hâte de lire la suite !",
    ],
  },
  {
    author: "Aïmane EL HAJRI",
    title: "Intriguant, captivant !",
    date: "2025-11-27",
    verified: true,
    body: [
      "Un récit intriguant, un début de livre qui se lit bien et qui donne envie de connaître la suite. Chapeau à l\u2019auteur pour ce premier essai, c\u2019est le début d\u2019une belle aventure.",
    ],
  },
  {
    author: "Elisabeth",
    title: "Lecture intrigante",
    date: "2025-11-26",
    verified: true,
    body: [
      "Une lecture rapide, mais intense et riche en action. Aladin écrit de façon imagée et percutante. Aucun temps mort, des personnages auxquels on s\u2019attache vite\u2026 J\u2019ai vraiment hâte de découvrir la suite !",
    ],
  },
  {
    author: "Do",
    title: "J\u2019ai vraiment aimé",
    date: "2025-11-26",
    verified: false,
    body: [
      "J\u2019ai vraiment aimé. L\u2019histoire est facile à suivre, les personnages sont attachants et on se laisse prendre au jeu très rapidement. Jez est un perso mystérieux qui donne envie de savoir ce qui va lui arriver.",
      "C\u2019est un livre qui se lit tout seul, parfait pour se détendre en fin de journée. Je recommande !",
    ],
  },
] as const

const AMAZON_REVIEWS_URL = "https://www.amazon.ca/-/fr/dp/B0G4KNMJ42"

function Stars({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="w-3.5 h-3.5" style={{ color: "var(--section-accent-alt)" }} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  )
}

function ReviewCard({
  review,
  dateFmt,
  t,
}: {
  review: (typeof REVIEWS)[number]
  dateFmt: Intl.DateTimeFormat
  t: (key: string) => string
}) {
  return (
    <article
      className="book-review-card shrink-0 w-[300px] md:w-[340px] border p-6 flex flex-col"
      style={{ borderColor: "var(--section-muted)" }}
    >
      <Stars label={t("book.reviews.stars")} />
      <cite className="book-title-font text-xl md:text-2xl not-italic mt-3 mb-3">{review.title}</cite>

      {review.body.map((paragraph, i) => (
        <p key={i} className="book-font text-sm leading-loose opacity-60 mb-3">
          {paragraph}
        </p>
      ))}

      <footer className="book-font text-[10px] tracking-[0.12em] uppercase opacity-35 mt-auto pt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="opacity-100">{review.author}</span>
        <span aria-hidden>·</span>
        <span>{dateFmt.format(new Date(`${review.date}T12:00:00`))}</span>
        <span aria-hidden>·</span>
        <span>{t("book.reviews.format")}</span>
        {review.verified && (
          <>
            <span aria-hidden>·</span>
            <span style={{ color: "var(--section-accent-alt)" }}>{t("book.reviews.verified")}</span>
          </>
        )}
      </footer>
    </article>
  )
}

function ReaderReviews() {
  const { t, lang } = useLang()
  const dateFmt = new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <section className="relative py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <SectionKicker className="mb-6">{t("book.reviews.label")}</SectionKicker>

        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-6">
          <h2 className="section-title text-2xl md:text-3xl lg:text-4xl leading-[1.3] opacity-85">
            {t("book.reviews.title")}
          </h2>
          <span className="flex items-center gap-2.5">
            <Stars label={t("book.reviews.stars")} />
            <span className="book-font text-sm opacity-50">{t("book.reviews.summary")}</span>
          </span>
        </div>
        <div className="w-10 h-px bg-current opacity-15" />
      </div>

      {/* Looping marquee — two identical copies, the second hidden from screen
          readers. Pauses on hover and focus so a review can actually be read. */}
      <div className="book-marquee-viewport mt-12">
        <div className="book-marquee flex w-max items-stretch gap-6 px-6">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-stretch gap-6" aria-hidden={copy === 1}>
              {REVIEWS.map((review) => (
                <ReviewCard key={review.author} review={review} dateFmt={dateFmt} t={t} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <a
          href={AMAZON_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-44 book-font inline-flex items-center gap-2 mt-12 text-sm tracking-[0.15em] uppercase opacity-50 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-current/30 hover:decoration-current/70"
        >
          {t("book.reviews.cta")}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

export function BookSection() {
  const { t } = useLang()

  return (
    <div
      className="section-tech relative"
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
        {/* Interactive dragon — follows the cursor, breathes fire on click */}
        <ManuscriptCanvas className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between">
          <span className="book-font text-sm tracking-[0.3em] uppercase opacity-50">
            {t("book.label")}
          </span>
          <a
            href="https://aladin-akkari-book-store.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="tap-44 book-font text-sm tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-current/30 hover:decoration-current/70"
          >
            {t("book.store")}
          </a>
        </nav>

        {/* Center */}
        <div className="relative z-10 flex-1 flex items-center justify-center text-center">
          <div className="max-w-3xl">
            {/* Two lines, like the mood hero. IM Fell English ships a single
                weight: no font-black, or the browser fakes a bold. */}
            <h2 className="book-title-font text-center leading-[0.9] mb-4" style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}>
              <span className="whitespace-nowrap">
                {t("book.main.1")} <span className="italic book-ruby-glow">{t("book.main.2")}</span>
              </span>
              <br />
              {t("book.main.3")}
            </h2>

            {/* Same rhythm as the other heroes: title, one short line, CTA. */}
            <p className="book-font mx-auto mt-6 max-w-md text-sm leading-relaxed opacity-60 md:text-base">
              {t("book.subtitle")}
            </p>

            {/* CTA */}
            <a
              href={AMAZON_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="section-btn section-btn--primary book-font mt-8 text-sm tracking-[0.15em] uppercase"
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

      {/* ═══════════════ AVIS LECTEURS ═══════════════ */}
      <ReaderReviews />

      {/* ═══════════════ SYNOPSIS ═══════════════ */}
      <section className="relative min-h-screen p-6 md:p-12 lg:p-16 py-24 flex items-center">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <SectionHead
          kicker={t("book.synopsis.label")}
          title={t("book.synopsis.title")}
          kickerClassName="mb-6"
          titleClassName="text-2xl md:text-3xl lg:text-4xl leading-[1.3] mb-8 opacity-85"
        />
            <div className="w-10 h-px bg-current opacity-15 mb-8" />
            <p className="book-font text-base leading-loose opacity-60 mb-6">
              {t("book.synopsis.p1")}
            </p>
            <p className="book-font text-base leading-loose opacity-60">
              {t("book.synopsis.p2")}
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <SectionKicker className="mb-8">
              {t("book.characters.label")}
            </SectionKicker>
            {[
              { name: "Jez", key: "book.char.jez" },
              { name: "Marv", key: "book.char.marv" },
              { name: "Oslo", key: "book.char.oslo" },
              { name: "Ava", key: "book.char.ava" },
            ].map((char) => (
              <div
                key={char.name}
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
            <SectionHead
          kicker={t("book.tomes.label")}
          title={t("book.tomes.title")}
          kickerClassName="mb-4"
          titleClassName="text-2xl md:text-4xl opacity-80"
        />
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
                  <a
                    href={tome.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-btn section-btn--outline book-font text-sm tracking-wide opacity-50 group-hover:opacity-100"
                  >
                    Amazon <ArrowUpRight className="w-3 h-3" />
                  </a>
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
              className="tap-44 book-font inline-flex items-center gap-2 text-base tracking-widest opacity-50 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-current/30 hover:decoration-current/70"
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
