"use client"

import { ArrowUpRight } from "lucide-react"
import { useLang } from "@/lib/i18n"

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

export function MoodSection() {
  const { t } = useLang()

  return (
    <div
      className="section-lifestyle"
      style={{ backgroundColor: "var(--section-bg)", color: "var(--section-fg)" }}
    >
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-hidden">
        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between max-sm:pt-15 max-sm:flex-col max-sm:gap-4">
           <span className="text-[10px] font-mono uppercase tracking-widest opacity-20">
            Need a vibe?
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-20">
            Scroll for more           
          </span>
        </nav>

        {/* Center */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-4 capitalize">
            {t("mood.hero.1")}<br />
            <span className="mood-gradient-text">{t("mood.hero.2")}</span>
          </h1>

          <p className="text-sm md:text-base opacity-50 max-w-md mt-6 leading-relaxed">
            {t("mood.hero.desc")}
          </p>

          {/* CTA */}
          <a
            href="https://moodmovie-by-aladinakkari.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 mt-8 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(129,140,248,0.25)] bg-gradient-to-r from-blue-500 to-purple-600 text-white"
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
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-20">Scroll</span>
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
            <span className="text-xs font-mono tracking-widest uppercase opacity-30 block mb-4">
              {t("mood.feat.label")}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.9]">
              {t("mood.feat.title.1")}<br />
              <span className="mood-gradient-text">{t("mood.feat.title.2")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="group p-8 md:p-10 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20"
              >
                <span className="text-3xl mb-4 block">{feat.icon}</span>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-500">
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
            <span className="text-xs font-mono tracking-widest uppercase opacity-30 block mb-4">
              {t("mood.how.label")}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-16">
              {t("mood.how.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-sm font-bold mb-4 mood-gradient-text">
                    0{i + 1}
                  </div>
                  <h3 className="font-bold mb-2">{t(`mood.step.${i}.title`)}</h3>
                  <p className="text-sm opacity-40 max-w-xs">{t(`mood.step.${i}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <a
              href="https://moodmovie-by-aladinakkari.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(129,140,248,0.25)] bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              {t("mood.try")}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Dots */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/15" />
              <div className="w-2 h-2 rounded-full bg-white/15" />
              <div className="w-2 h-2 rounded-full bg-white/15" />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--section-accent)" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
