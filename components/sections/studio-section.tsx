"use client"

import { ArrowUpRight, ExternalLink, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLang } from "@/lib/i18n"

const EXPERIENCE_META = [
  { company: "Gameaddik", location: "Montréal, QC", period: "2020 — présent", stack: ["Vue", "Nuxt", "Tailwind", "Node.js", "WordPress", "SEO"] },
  { company: "Freelance", location: "Montréal, QC", period: "2020 — présent", stack: ["Figma", "Photoshop", "Illustrator"] },
  { company: "XpertSource.com", location: "Montréal, QC", period: "Fév. — Mai 2019", stack: ["SEO", "Service client"] },
  { company: "Imagine Concept", location: "Tunis, Tunisie", period: "Déc. 2017 — Jan. 2018", stack: ["Illustrator", "Photoshop"] },
  { company: "Flashprint", location: "Tunis, Tunisie", period: "Juin — Août 2017", stack: ["Illustrator", "Photoshop", "Print"] },
]

const PROJECTS = [
  { title: "GameRebellion", type: "Analytics Platform", role: "Senior Frontend Developer", year: "2023", href: "https://gamerebellion.com/", stack: ["React", "Node.js", "Next", "Tailwind", "TypeScript"] },
  { title: "PwnGames", type: "Website Redesign", role: "Designer & Frontend Developer", year: "2023", href: "https://pwngames.com", stack: ["React", "Tailwind", "TypeScript", "Figma"] },
  { title: "GameAddik", type: "Landing Pages & Redesign", role: "Frontend Developer & Designer", year: "2018 — 2023", href: "https://gameaddik.com/", stack: ["HTML/CSS", "Vue", "JavaScript", "WordPress", "SEO"] },
]

const LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/aladin-akkari", icon: "Li" },
  { label: "GitHub", href: "https://github.com/aladinAK", icon: "Gh" },
  { label: "Behance", href: "https://www.behance.net/aladinakkari1", icon: "Be" },
  { label: "Portfolio", href: "https://aladinakkari.ca", icon: "Ww" },
]

const TOOLS = [
  "React / Next.js", "Vue / Nuxt", "TypeScript", "Tailwind CSS",
  "Figma", "Photoshop", "Illustrator", "Node.js",
  "WordPress", "Webflow", "Git", "Analytics",
]

function ProjectAccordion() {
  const { t } = useLang()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-0">
      {PROJECTS.map((project, i) => {
        const isOpen = openIndex === i
        const details = [t(`proj.${i}.d0`), t(`proj.${i}.d1`), t(`proj.${i}.d2`)]
        return (
          <div key={i} className="border-t" style={{ borderColor: "var(--section-muted)" }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="group w-full flex items-center justify-between py-8 md:py-10 px-2 text-left transition-colors duration-500 hover:bg-white/[0.02]"
            >
              <div className="flex items-baseline gap-4 md:gap-8">
                <span className="text-xs font-mono opacity-20">0{i + 1}</span>
                <h3 className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-4 md:gap-8">
                <span className="hidden md:block text-sm opacity-30">{project.type}</span>
                <span className="text-xs font-mono opacity-20">{project.year}</span>
                <ChevronDown
                  className="w-5 h-5 opacity-40 transition-transform duration-500"
                  style={{ color: isOpen ? "var(--section-accent)" : "currentColor", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </div>
            </button>
            <div
              className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ maxHeight: isOpen ? "500px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <div className="px-2 pt-2.5 pb-10 md:pb-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                <div className="md:col-span-1" />
                <div className="md:col-span-5">
                  <span className="text-xs font-mono opacity-30 block mb-1">{project.role}</span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.stack.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded-full border opacity-50" style={{ borderColor: "var(--section-muted)" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-5">
                  <ul className="space-y-3">
                    {details.map((detail, j) => (
                      <li key={j} className="text-sm opacity-50 leading-relaxed flex gap-3">
                        <span className="shrink-0 w-1 h-1 rounded-full mt-2 bg-current opacity-30" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 text-sm font-medium transition-opacity hover:opacity-100 opacity-60"
                    style={{ color: "var(--section-accent)" }}
                  >
                    {t("proj.cta")} <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="md:col-span-1" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function useScrollReveal(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = ref.current?.closest(".vertical-section")
    if (!root) return
    const els = ref.current?.querySelectorAll(".s-reveal")
    if (!els?.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("s-visible"); io.unobserve(e.target) }
        })
      },
      { root, threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ref])
}

function LangToggle() {
  const { lang, toggle } = useLang()
  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-1 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-wider transition-all duration-300 hover:border-[var(--section-accent)]"
      style={{ borderColor: "var(--section-muted)" }}
    >
      <span className={`transition-opacity duration-300 ${lang === "fr" ? "opacity-100" : "opacity-30"}`}>FR</span>
      <span className="opacity-20">/</span>
      <span className={`transition-opacity duration-300 ${lang === "en" ? "opacity-100" : "opacity-30"}`}>EN</span>
    </button>
  )
}

export function StudioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const { t } = useLang()

  useScrollReveal(sectionRef)

  useEffect(() => {
    const container = sectionRef.current?.closest(".vertical-section")
    if (!container) return
    const handleScroll = () => { setScrollY(container.scrollTop) }
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const parallax = (speed: number) => ({ transform: `translateY(${scrollY * speed}px)` })

  return (
    <div
      ref={sectionRef}
      className="section-studio relative"
      style={{ backgroundColor: "var(--section-bg)", color: "var(--section-fg)" }}
    >
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden">
        <nav className="relative z-10 flex items-center justify-between studio-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="hidden md:flex items-center gap-8 text-sm opacity-50">
            <span>{t("nav.role.1")}</span>
            <span>&</span>
            <span>{t("nav.role.3")}</span>
          </div>
          <div className="flex items-center gap-4">
            <LangToggle />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono opacity-50">{t("nav.available")}</span>
            </div>
          </div>
        </nav>

        <div className="relative z-10 flex-1 flex items-center" style={parallax(-0.15)}>
          <div className="w-full">
            <h1 className="studio-title-reveal text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold tracking-tighter leading-[0.85] uppercase">
              <span className="block studio-line-reveal text-[6vw] md:text-[5vw]" style={{ animationDelay: "0.3s" }}>{t("hero.line1")}</span>
              <span className="block studio-line-reveal studio-glow" data-text={t("hero.line2")} style={{ animationDelay: "0.5s", color: "var(--section-accent)" }}>{t("hero.line2")}</span>
              <span className="block studio-line-reveal text-[6vw] md:text-[5vw] opacity-30 font-(family-name:--font-playfair) italic" style={{ animationDelay: "0.7s" }}>{t("hero.line3")}</span>
            </h1>
          </div>
        </div>

        <div className="relative z-10 flex items-end justify-between studio-fade-in" style={{ animationDelay: "0.9s" }}>
          <p className="max-w-xs text-sm opacity-50 leading-relaxed">{t("hero.desc")}</p>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-mono opacity-30">GMT-5</span>
            <div className="flex items-center gap-2 text-sm opacity-50">
              <span>{t("hero.scroll")}</span>
              <div className="w-px h-8 bg-current opacity-30 studio-scroll-line" />
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-1/2 w-px h-full bg-current opacity-[0.04]" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-current opacity-[0.04]" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-current opacity-[0.04]" />
      </section>

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <section className="relative py-2 overflow-hidden border-y" style={{ borderColor: "var(--section-muted)" }}>
        <div className="studio-marquee flex whitespace-nowrap" style={parallax(-0.05)}>
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-[8vw] font-bold tracking-tighter opacity-[0.06] uppercase mx-8">
              HTML/CSS — JavaScript — TypeScript — React — Vue — Next.js — Nuxt — Tailwind — Figma — Node.js —&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════ EXPERIENCE ═══════════════ */}
      <section className="relative min-h-screen p-6 md:p-12 lg:p-20 py-24">
        <div className="hidden md:block absolute top-12 left-6 lg:left-10 w-px h-[calc(100%-6rem)] bg-current opacity-[0.06]" />
        <div className="hidden md:block absolute top-12 left-4 lg:left-8 w-5 h-px bg-current opacity-[0.06]" />

        <div className="s-reveal s-blur flex items-baseline justify-between mb-20 md:pl-8 lg:pl-14">
          <div>
            <span className="text-xs font-mono tracking-widest opacity-30 block mb-4">{t("exp.label")}</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.50]">
              {t("exp.title.1")}<br />
              <span className="font-(family-name:--font-playfair) italic" style={{ color: "var(--section-accent)" }}>{t("exp.title.2")}</span>
            </h2>
          </div>
          <span className="hidden md:block text-sm opacity-30 font-mono">{t("exp.date")}</span>
        </div>

        <div className="space-y-0 md:pl-8 lg:pl-14">
          {EXPERIENCE_META.map((exp, i) => (
            <div
              key={i}
              className="s-reveal s-up group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-t transition-colors duration-500 hover:bg-white/[0.02] px-3"
              style={{ borderColor: "var(--section-muted)", "--delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <div className="md:col-span-2 flex flex-col items-start gap-1">
                <span className="text-xs font-mono opacity-30">{exp.period}</span>
                <span className="text-[10px] font-mono opacity-20">{t(`exp.${i}.type`)}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl md:text-2xl font-bold group-hover:translate-x-2 transition-transform duration-500">
                  {t(`exp.${i}.role`)}
                </h3>
                <span className="text-sm mt-1 block" style={{ color: "var(--section-accent)" }}>{exp.company}</span>
                <span className="text-xs mt-1 block opacity-25">{exp.location}</span>
              </div>
              <div className="md:col-span-4">
                <p className="text-sm opacity-50 leading-relaxed">{t(`exp.${i}.desc`)}</p>
              </div>
              <div className="md:col-span-2 flex flex-wrap gap-2 items-start">
                {exp.stack.map((tech) => (
                  <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded-full border opacity-40 group-hover:opacity-70 transition-opacity" style={{ borderColor: "var(--section-muted)" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ WHAT I DO ═══════════════ */}
      <section className="min-h-screen p-6 md:p-12 lg:p-20 py-24 relative">
        <div className="hidden md:block absolute top-12 right-6 lg:right-10 w-px h-[calc(100%-6rem)] bg-current opacity-[0.06]" />
        <div className="hidden md:block absolute top-12 right-4 lg:right-8 w-5 h-px bg-current opacity-[0.06]" />

        <div className="s-reveal s-blur mb-20">
          <span className="text-xs font-mono tracking-widest opacity-30 block mb-4">{t("svc.label")}</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.50]">
            {t("svc.title.1")}<br />
            <span className="font-(family-name:--font-playfair) italic" style={{ color: "var(--section-accent)" }}>{t("svc.title.2")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--section-muted)" }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="s-reveal s-scale group p-8 md:p-12 transition-colors duration-500 hover:bg-white/[0.03]"
              style={{ backgroundColor: "var(--section-bg)", "--delay": `${i * 120}ms` } as React.CSSProperties}
            >
              <span className="text-xs font-mono opacity-20 block mb-6">0{i + 1}</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-500">
                {t(`svc.${i}.title`)}
              </h3>
              <p className="text-sm opacity-40 leading-relaxed max-w-sm">{t(`svc.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SELECTED PROJECTS ═══════════════ */}
      <section className="relative min-h-screen p-6 md:p-12 lg:p-20 py-24">
        <div className="hidden md:block absolute top-0 left-1/2 w-px h-full bg-current opacity-[0.04]" />

        <div className="s-reveal s-blur flex items-baseline justify-between mb-20">
          <div>
            <span className="text-xs font-mono tracking-widest opacity-30 block mb-4">{t("proj.label")}</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.50]">
              {t("proj.title.1")}<br />
              <span className="font-(family-name:--font-playfair) italic" style={{ color: "var(--section-accent)" }}>{t("proj.title.2")}</span>
            </h2>
          </div>
        </div>

        <div className="s-reveal s-up" style={{ "--delay": "150ms" } as React.CSSProperties}>
          <ProjectAccordion />
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section className="relative p-6 md:p-12 lg:p-20 py-24">
        <div className="hidden md:block absolute top-12 left-1/2 w-px h-[calc(100%-6rem)] bg-current opacity-[0.06]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="s-reveal s-blur">
            <span className="text-xs font-mono tracking-widest opacity-30 block mb-4">{t("about.label")}</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.50] mb-8">
              {t("about.title.1")}<br />
              <span className="font-(family-name:--font-playfair) italic" style={{ color: "var(--section-accent)" }}>{t("about.title.2")}</span>
            </h2>
            <div className="space-y-4 text-sm opacity-50 leading-relaxed max-w-md">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>
          </div>

          <div className="s-reveal s-up flex flex-col justify-end" style={{ "--delay": "200ms" } as React.CSSProperties}>
            <span className="text-xs font-mono tracking-widest opacity-30 block mb-8">{t("about.tools")}</span>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm opacity-40">
              {TOOLS.map((tool, i) => (
                <span
                  key={tool}
                  className="s-reveal s-left font-mono text-xs py-2 border-b"
                  style={{ borderColor: "var(--section-muted)", "--delay": `${300 + i * 50}ms` } as React.CSSProperties}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section className="min-h-screen p-6 md:p-12 lg:p-20 flex flex-col justify-center relative">
        <div className="hidden md:block absolute top-8 left-8 w-8 h-px bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute top-8 left-8 w-px h-8 bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute top-8 right-8 w-8 h-px bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute top-8 right-8 w-px h-8 bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute bottom-8 left-8 w-8 h-px bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute bottom-8 left-8 w-px h-8 bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute bottom-8 right-8 w-8 h-px bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute bottom-8 right-8 w-px h-8 bg-current opacity-[0.08]" />

        <div className="s-reveal s-down mb-12">
          <span className="text-xs font-mono tracking-widest opacity-30 block mb-4">{t("contact.label")}</span>
        </div>

        <h2 className="s-reveal s-blur text-[12vw] md:text-[9vw] font-bold tracking-tighter leading-[0.50] mb-16" style={{ "--delay": "100ms" } as React.CSSProperties}>
          {t("contact.title.1")}<br />
          <span className="font-(family-name:--font-playfair) italic" style={{ color: "var(--section-accent)" }}>{t("contact.title.2")}</span>
        </h2>

        <div className="flex flex-wrap gap-4 md:gap-6 mb-20">
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="s-reveal s-up group flex items-center gap-3 px-6 py-4 border rounded-full transition-all duration-500 hover:bg-[var(--section-accent)] hover:text-[var(--section-bg)] hover:border-[var(--section-accent)]"
              style={{ borderColor: "var(--section-muted)", "--delay": `${250 + i * 100}ms` } as React.CSSProperties}
            >
              <span className="text-xs font-mono font-bold opacity-50 group-hover:opacity-100">{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="text-xs font-mono opacity-20">&copy; {new Date().getFullYear()} Aladin Akkari</div>
          <div className="text-xs font-mono opacity-20">GMT-5</div>
        </div>
      </section>
    </div>
  )
}
