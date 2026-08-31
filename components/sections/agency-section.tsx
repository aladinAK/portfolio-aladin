"use client"

import { ArrowUpRight, Globe, Headphones, RefreshCw, ShoppingBag } from "lucide-react"
import { useRef } from "react"
import { useLang } from "@/lib/i18n"
import { AgencyContactForm } from "@/components/agency-contact-form"

const SHAPES = [
  { type: "circle", w: 120, h: 120, top: "8%", left: "15%", o: 0.3, d: "0.2s", drift: "22s", dx: "20px", dy: "-15px", rot: "0deg" },
  { type: "square", w: 60, h: 60, top: "20%", left: "80%", o: 0.2, d: "0.5s", drift: "18s", dx: "-12px", dy: "18px", rot: "15deg" },
  { type: "ring", w: 200, h: 200, top: "60%", left: "10%", o: 0.15, d: "0.3s", drift: "25s", dx: "10px", dy: "-20px", rot: "0deg" },
  { type: "diamond", w: 50, h: 50, top: "75%", left: "85%", o: 0.25, d: "0.6s", drift: "20s", dx: "-15px", dy: "10px", rot: "45deg" },
  { type: "circle", w: 80, h: 80, top: "40%", left: "90%", o: 0.2, d: "0.4s", drift: "23s", dx: "18px", dy: "12px", rot: "0deg" },
  { type: "ring", w: 140, h: 140, top: "15%", left: "50%", o: 0.12, d: "0.7s", drift: "28s", dx: "-8px", dy: "-14px", rot: "0deg" },
  { type: "square", w: 40, h: 40, top: "85%", left: "40%", o: 0.22, d: "0.8s", drift: "19s", dx: "14px", dy: "-8px", rot: "30deg" },
  { type: "diamond", w: 70, h: 70, top: "50%", left: "25%", o: 0.18, d: "1s", drift: "24s", dx: "-20px", dy: "16px", rot: "45deg" },
]

const SERVICES = [
  { icon: Globe, key: "agency.svc.0" },
  { icon: RefreshCw, key: "agency.svc.1" },
  { icon: ShoppingBag, key: "agency.svc.2" },
  { icon: Headphones, key: "agency.svc.3" },
]

/**
 * Concept sites — self-initiated, not client commissions. Labelled as such on
 * purpose: a recruiter who contacts "the bakery" and finds no client behind it
 * loses trust in everything else on the page.
 */
const WORK = [
  {
    name: "Maison Délice",
    key: "agency.work.0",
    href: "https://v0-patisserie-website-mtl.vercel.app/",
    image: "/work/maison-delice.jpg",
  },
  {
    name: "Clinique Lumea",
    key: "agency.work.1",
    href: "https://esthetic-service-website.vercel.app/",
    image: "/work/clinique-lumea.jpg",
  },
  {
    name: "FORMA",
    key: "agency.work.2",
    href: "https://forma-studio-tau.vercel.app/",
    image: "/work/forma-studio.jpg",
  },
]

export function AgencySection() {
  const { t } = useLang()
  const formRef = useRef<HTMLElement>(null)

  // scrollIntoView rather than an href="#anchor": writing to location.hash
  // would interfere with HorizontalScrollLayout's own section navigation.
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div
      className="section-nature relative"
      style={{ backgroundColor: "var(--section-bg)", color: "var(--section-fg)" }}
    >
      {/* Global animated background — spans full section */}
      <div className="agency-bg" aria-hidden>
        {SHAPES.map((s, i) => (
          <div
            key={i}
            className={`agency-shape agency-shape--${s.type}`}
            style={{
              width: s.w, height: s.h, top: s.top, left: s.left,
              "--o": s.o, "--d": s.d, "--drift-dur": s.drift,
              "--dx": s.dx, "--dy": s.dy, "--rot": s.rot,
            } as React.CSSProperties}
          />
        ))}
        <div className="agency-orb agency-orb-1" />
        <div className="agency-orb agency-orb-2" />
        <div className="agency-orb agency-orb-3" />
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-hidden">

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between max-sm:pt-15 max-sm:flex-col max-sm:gap-4">
          <span className="agency-font text-xs font-medium uppercase tracking-[0.3em] opacity-50">
            {t("agency.label")}
          </span>
          <span className="agency-font text-xs font-medium uppercase tracking-[0.3em] opacity-50">
            {t("scroll.more")}
          </span>
        </nav>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex items-center justify-center text-center px-6">
          <div className="max-w-5xl">
            <span className="agency-font text-sm md:text-base font-medium uppercase tracking-[0.2em] opacity-50 italic block mb-6">
              {t("agency.tagline")}
            </span>

            <h2 className="flex flex-col items-center" style={{ gap: 0, lineHeight: 0.8 }}>
              <span className="agency-font uppercase font-black" style={{ fontSize: "clamp(2rem, 10vw, 7rem)" }}>
                {t("agency.title.1")}
              </span>
              <span className="flex items-baseline justify-center flex-wrap" style={{ gap: "0.3em" }}>
                <span
                  className="agency-font uppercase font-black"
                  style={{
                    fontSize: "clamp(2rem, 10vw, 7rem)",
                    WebkitTextStroke: "2px var(--section-fg)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("agency.title.2")}
                </span>
                <span className="agency-font uppercase font-bold" style={{ fontSize: "clamp(2rem, 10vw, 7rem)" }}>
                  {t("agency.title.3")}
                </span>
                <span
                  className="agency-font uppercase font-black"
                  style={{
                    fontSize: "clamp(2rem, 10vw, 7rem)",
                    WebkitTextStroke: "2px var(--section-fg)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("agency.title.4")}
                </span>
              </span>
            </h2>

            <p className="agency-font text-sm md:text-base font-medium uppercase tracking-[0.15em] opacity-40 max-w-2xl mx-auto mt-6">
              {t("agency.desc")}
            </p>

            <div className="flex items-center justify-center flex-wrap gap-4 mt-8">
              <button
                type="button"
                onClick={scrollToForm}
                className="agency-font font-bold text-sm uppercase tracking-[0.15em] transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                style={{ padding: "18px 44px", backgroundColor: "var(--section-accent)", color: "var(--section-bg)" }}
              >
                {t("agency.btn.1")}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 flex justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-5 h-8 rounded-full border-2 border-current opacity-20 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2.5 rounded-full bg-current animate-bounce" />
            </div>
            <span className="agency-font text-[10px] uppercase tracking-[0.3em] opacity-20">{t("scroll")}</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="relative min-h-screen p-6 md:p-12 lg:p-16 py-24 flex flex-col justify-center">

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="text-center mb-16 md:mb-24">
            <span className="agency-font text-xs font-medium uppercase tracking-[0.3em] opacity-30 block mb-4">
              {t("agency.svc.label")}
            </span>
            <h2 className="agency-font text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85]">
              {t("agency.svc.title.1")}<br />
              <span style={{ color: "var(--section-accent)" }}>{t("agency.svc.title.2")}</span>
            </h2>
          </div>

          <div className="agency-svc-grid grid grid-cols-1 md:grid-cols-2 gap-px">
            {SERVICES.map((svc, i) => (
              <div key={i} className="agency-svc-card group p-8 md:p-12 relative">
                <div className="flex items-start justify-between mb-6">
                  <svc.icon
                    className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color: "var(--section-accent)" }}
                  />
                  <span className="agency-font text-xs font-mono opacity-15">0{i + 1}</span>
                </div>
                <h3 className="agency-font text-xl md:text-2xl font-bold uppercase tracking-wide mb-3 group-hover:translate-x-2 transition-transform duration-500">
                  {t(`${svc.key}.title`)}
                </h3>
                <p className="text-sm opacity-40 leading-relaxed max-w-sm">
                  {t(`${svc.key}.desc`)}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════ RÉALISATIONS ═══════════════ */}
      <section className="relative p-6 md:p-12 lg:p-16 py-24">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="agency-font text-xs font-medium uppercase tracking-[0.3em] opacity-30 block mb-4">
              {t("agency.work.label")}
            </span>
            <h2 className="agency-font text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85]">
              {t("agency.work.title.1")}<br />
              <span style={{ color: "var(--section-accent)" }}>{t("agency.work.title.2")}</span>
            </h2>
            <p className="text-sm opacity-40 leading-relaxed max-w-xl mx-auto mt-6">
              {t("agency.work.note")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORK.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border transition-colors duration-500"
                style={{ borderColor: "var(--section-muted)" }}
              >
                <div className="relative overflow-hidden aspect-[16/9]">
                  <img
                    src={project.image}
                    alt={t(`${project.key}.alt`)}
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={506}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span
                    className="agency-font absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1"
                    style={{ backgroundColor: "var(--section-accent)", color: "var(--section-bg)" }}
                  >
                    {t("agency.work.concept")}
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="agency-font text-xl md:text-2xl font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform duration-500">
                      {project.name}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 shrink-0 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <p className="text-sm opacity-40 leading-relaxed mt-3">
                    {t(`${project.key}.desc`)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT FORM ═══════════════ */}
      <section ref={formRef} className="relative">
        <AgencyContactForm />
      </section>
    </div>
  )
}
