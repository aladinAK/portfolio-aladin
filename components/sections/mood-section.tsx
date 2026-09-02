"use client"

import { ArrowUpRight } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { SectionHead, SectionKicker } from "@/components/primitives/section-head"

const MOODS = [
  { emoji: "😄", key: "mood.joy", float: "mood-float-1" },
  { emoji: "😢", key: "mood.sad", float: "mood-float-2" },
  { emoji: "🤢", key: "mood.shock", float: "mood-float-3" },
  { emoji: "😱", key: "mood.scare", float: "mood-float-1" },
  { emoji: "😤", key: "mood.energy", float: "mood-float-2" },
  { emoji: "😲", key: "mood.surprise", float: "mood-float-3" },
]

const FEATURES = [
  { icon: "🎬", key: "mood.feat.0" },
  { icon: "📺", key: "mood.feat.1" },
  { icon: "📚", key: "mood.feat.2" },
  { icon: "🎵", key: "mood.feat.3" },
]

// Subtle drifting particles — the lifestyle section had no ambient layer.
// Kept low-contrast so they read as atmosphere, never as content.
const PARTICLES = [
  { size: 4, top: "12%", left: "18%", o: 0.30, d: "0.2s", drift: "26s", dx: "18px", dy: "-22px" },
  { size: 2, top: "24%", left: "72%", o: 0.22, d: "1.1s", drift: "31s", dx: "-14px", dy: "16px" },
  { size: 6, top: "38%", left: "8%", o: 0.16, d: "0.6s", drift: "34s", dx: "12px", dy: "20px" },
  { size: 3, top: "9%", left: "55%", o: 0.26, d: "1.6s", drift: "24s", dx: "-16px", dy: "-12px" },
  { size: 5, top: "61%", left: "88%", o: 0.18, d: "0.9s", drift: "29s", dx: "-20px", dy: "-18px" },
  { size: 2, top: "73%", left: "31%", o: 0.28, d: "2.1s", drift: "27s", dx: "15px", dy: "-14px" },
  { size: 4, top: "47%", left: "64%", o: 0.14, d: "1.4s", drift: "36s", dx: "-11px", dy: "22px" },
  { size: 3, top: "85%", left: "76%", o: 0.24, d: "0.4s", drift: "22s", dx: "17px", dy: "13px" },
  { size: 2, top: "31%", left: "42%", o: 0.20, d: "2.4s", drift: "33s", dx: "-13px", dy: "-19px" },
  { size: 5, top: "68%", left: "14%", o: 0.15, d: "1.8s", drift: "28s", dx: "19px", dy: "-16px" },
  { size: 3, top: "54%", left: "95%", o: 0.21, d: "0.7s", drift: "30s", dx: "-18px", dy: "11px" },
  { size: 2, top: "91%", left: "48%", o: 0.25, d: "1.3s", drift: "25s", dx: "14px", dy: "-21px" },
  { size: 4, top: "17%", left: "86%", o: 0.17, d: "2.7s", drift: "35s", dx: "-15px", dy: "17px" },
  { size: 3, top: "79%", left: "58%", o: 0.23, d: "0.3s", drift: "23s", dx: "16px", dy: "-13px" },
]

export function MoodSection() {
  const { t } = useLang()

  return (
    <div
      className="section-lifestyle relative"
      style={{ color: "var(--section-fg)" }}
    >
      {/* Ambient particles — spans the whole section */}
      <div className="mood-bg" aria-hidden>
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="mood-particle"
            style={{
              width: p.size, height: p.size, top: p.top, left: p.left,
              "--o": p.o, "--d": p.d, "--drift-dur": p.drift,
              "--dx": p.dx, "--dy": p.dy,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-hidden">
        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between max-sm:pt-15 max-sm:flex-col max-sm:gap-4">
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-20">
            {t("mood.vibe")}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-20">
            {t("scroll.more")}
          </span>
        </nav>

        {/* Center */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
          <h2 className="section-title text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tight mb-4 capitalize">
            {t("mood.hero.1")}<br />
            <span className="section-title-accent">{t("mood.hero.2")}</span>
          </h2>

          <p className="text-sm md:text-base opacity-50 max-w-md mt-6 leading-relaxed">
            {t("mood.hero.desc")}
          </p>

          {/* CTA */}
          <a
            href="https://moodmovie-by-aladinakkari.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="section-btn section-btn--primary mt-8 text-sm font-medium"
          >
            {t("mood.try")}
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Mood bubbles */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {MOODS.map((mood, i) => (
              <div
                key={i}
                className={`mood-bubble ${mood.float} w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-1`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-[9px] font-medium uppercase tracking-wider opacity-60">{t(mood.key)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-end justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-20">
            {t("mood.bottom.left")}
          </span>
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-10 bg-white/10" />
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-20">{t("scroll")}</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-20">
            {t("mood.bottom.right")}
          </span>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="relative min-h-screen p-6 md:p-12 lg:p-16 py-24 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16 md:mb-24">
            <SectionHead
              kicker={t("mood.feat.label")}
              title={t("mood.feat.title.1")}
              accent={t("mood.feat.title.2")}
              kickerClassName="mb-4"
              titleClassName="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[0.9] tracking-tight"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="group p-8 md:p-10 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20"
              >
                <span className="text-3xl mb-4 block">{feat.icon}</span>
                <h3 className="mood-font text-xl md:text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-500">
                  {t(`${feat.key}.title`)}
                </h3>
                <p className="text-sm opacity-40 leading-relaxed">
                  {t(`${feat.key}.desc`)}
                </p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mt-24 text-center">
            <SectionKicker className="mb-4">
              {t("mood.how.label")}
            </SectionKicker>
            <h2 className="section-title text-2xl md:text-4xl font-extrabold tracking-tight mb-16">
              {t("mood.how.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-sm font-bold mb-4 mood-gradient-text">
                    0{i + 1}
                  </div>
                  <h3 className="mood-font font-bold mb-2">{t(`mood.step.${i}.title`)}</h3>
                  <p className="text-sm opacity-40 max-w-xs">{t(`mood.step.${i}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="my-15 text-center">
            <a
              href="https://moodmovie-by-aladinakkari.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="section-btn section-btn--primary text-sm font-medium"
            >
              {t("mood.try")}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
