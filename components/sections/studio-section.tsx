"use client"

import { ArrowRight, ArrowUpRight, ExternalLink, ChevronDown, FileDown, FlaskConical, Mail } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLang } from "@/lib/i18n"
import { useScrollReveal } from "@/lib/use-scroll-reveal"
import { SectionHead, SectionKicker } from "@/components/primitives/section-head"
import { SectionButton, SectionLink } from "@/components/primitives/section-button"
import { openDesignSystem } from "@/components/design-system/ds-launcher"

const EXPERIENCE_META = [
  { company: "Gameaddik", location: "Montréal, QC", period: "2020 — présent", stack: ["Vue", "Nuxt", "Tailwind", "NestJS", "MongoDB", "AWS Athena", "Docker", "WordPress", "SEO"] },
  { company: "Freelance", location: "Montréal, QC", period: "2020 — présent", stack: ["Figma", "Photoshop", "Illustrator"] },
  { company: "XpertSource.com", location: "Montréal, QC", period: "Fév. — Mai 2019", stack: ["SEO", "Service client"] },
  { company: "Imagine Concept", location: "Tunis, Tunisie", period: "Déc. 2017 — Jan. 2018", stack: ["Illustrator", "Photoshop"] },
  { company: "Flashprint", location: "Tunis, Tunisie", period: "Juin — Août 2017", stack: ["Illustrator", "Photoshop", "Print"] },
]

/**
 * `key` is the i18n prefix of the project's details, decoupled from its
 * position so the list can be reordered. `lines` is how many detail lines that
 * key carries.
 *
 * The Freelance entry holds the concept sites instead of detail lines: they
 * are self-initiated, so they sit together under one heading and are flagged
 * as concepts — a recruiter who went looking for a client behind them would
 * stop trusting the rest of the page.
 */
interface Concept {
  name: string
  key: string
  href: string
}

interface Project {
  key: string
  title: string
  type: string
  role: string
  year: string
  href?: string
  stack: string[]
  lines: number
  concepts?: Concept[]
}

const PROJECTS: Project[] = [
  { key: "proj.0", title: "GameRebellion", type: "Market Intelligence Platform", role: "Senior Frontend Developer", year: "2023", href: "https://gamerebellion.com/", stack: ["React", "Node.js", "Next", "Tailwind", "TypeScript"], lines: 3 },
  { key: "proj.1", title: "PwnGames", type: "Website Redesign", role: "Designer & Frontend Developer", year: "2023", href: "https://pwngames.com", stack: ["React", "Tailwind", "TypeScript", "Figma"], lines: 3 },
  { key: "proj.2", title: "GameAddik", type: "Landing Pages & Redesign", role: "Frontend Developer & Designer", year: "2020 — 2023", href: "https://gameaddik.com/", stack: ["HTML/CSS", "Vue", "JavaScript", "WordPress", "SEO"], lines: 3 },
  {
    key: "proj.freelance",
    title: "Freelance",
    type: "Concept Sites",
    role: "Designer & Frontend Developer",
    year: "2020 — présent",
    stack: [],
    lines: 0,
    concepts: [
      { name: "Maison Délice", key: "proj.concept.0", href: "https://v0-patisserie-website-mtl.vercel.app/" },
      { name: "Clinique Lumea", key: "proj.concept.1", href: "https://esthetic-service-website.vercel.app/" },
      { name: "FORMA", key: "proj.concept.2", href: "https://forma-studio-tau.vercel.app/" },
    ],
  },
]

/** General method, from brief to launch. */
const METHOD_STEPS = ["0", "1", "2", "3", "4"] as const

const LAB_URL = "https://design-lab-aladin-akkari.netlify.app/"

const LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/aladin-akkari", icon: "Li" },
  { label: "GitHub", href: "https://github.com/aladinAK", icon: "Gh" },
  { label: "Behance", href: "https://www.behance.net/aladinakkari1", icon: "Be" },
  { label: "design-lab", href: LAB_URL, icon: "DL" },
]

const TOOLS = [
  "React / Next.js", "Vue / Nuxt", "TypeScript", "Tailwind CSS",
  "Figma", "Photoshop", "Illustrator", "GSAP",
  "Node.js / NestJS", "MongoDB", "Docker", "AWS Athena",
  "Shopify", "WordPress", "Webflow", "Git",
]

/** Quick facts a recruiter looks for first; they live nowhere else on the site. */
const FACTS = ["location", "langs", "exp", "availability"] as const

/** Schools are proper nouns; the programme and city go through i18n. */
const EDUCATION = [
  { key: "about.edu.0", school: "Collège de Maisonneuve" },
  { key: "about.edu.1", school: "CDI College" },
  { key: "about.edu.2", school: "LaSalle College" },
  { key: "about.edu.3", school: "" },
]

function ProjectAccordion() {
  const { t } = useLang()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggle = (i: number, isOpen: boolean) => {
    setOpenIndex(isOpen ? null : i)
    if (isOpen) return
    // The panel takes 700ms to open; wait for its real height before scrolling
    // it into view, otherwise we scroll towards a box that is still flat.
    window.setTimeout(() => {
      panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }, 380)
  }

  return (
    <div className="space-y-0">
      {PROJECTS.map((project, i) => {
        const isOpen = openIndex === i
        const details = Array.from({ length: project.lines }, (_, n) => t(`${project.key}.d${n}`))
        return (
          <div key={i} className="border-t" style={{ borderColor: "var(--section-muted)" }}>
            <button
              onClick={() => toggle(i, isOpen)}
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
              ref={(el) => { panelRefs.current[i] = el }}
              className="overflow-hidden scroll-mb-28 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ maxHeight: isOpen ? "620px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <div className="px-2 pt-2.5 pb-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                <div className="md:col-span-1" />
                <div className="md:col-span-5">
                  {project.concepts && (
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider block mb-2"
                      style={{ color: "var(--section-accent)" }}
                    >
                      {t("proj.concept.tag")}
                    </span>
                  )}
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
                  {project.concepts ? (
                    <ul className="space-y-6">
                      {project.concepts.map((concept) => (
                        <li key={concept.name}>
                          <a
                            href={concept.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/concept block"
                          >
                            <span className="flex items-center gap-2 text-base font-semibold transition-colors duration-300 group-hover/concept:text-[var(--section-accent)]">
                              {concept.name}
                              <ArrowUpRight className="h-4 w-4 opacity-50 transition-opacity duration-300 group-hover/concept:opacity-100" />
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed opacity-50">{t(`${concept.key}.d0`)}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
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
                        className="tap-44 inline-flex items-center gap-2 mt-6 text-sm font-medium transition-opacity hover:opacity-100 opacity-60"
                        style={{ color: "var(--section-accent)" }}
                      >
                        {t("proj.cta")} <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </>
                  )}
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

function LangToggle() {
  const { lang, toggle, t } = useLang()
  return (
    <SectionButton role="pill" onClick={toggle} className="tap-44" aria-label={t("nav.lang")}>
      <span className={`transition-opacity duration-300 ${lang === "fr" ? "opacity-100" : "opacity-30"}`}>FR</span>
      <span className="opacity-20">/</span>
      <span className={`transition-opacity duration-300 ${lang === "en" ? "opacity-100" : "opacity-30"}`}>EN</span>
    </SectionButton>
  )
}

function LocalClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("fr-CA", {
          timeZone: "America/Montreal",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="text-xs font-mono tabular-nums opacity-50">{time}</span>
}

export function StudioSection() {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  useScrollReveal(sectionRef)

  useEffect(() => {
    const container = sectionRef.current?.closest(".vertical-section")
    if (!container) return
    let rafId = 0
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        setScrollY((container as HTMLElement).scrollTop)
      })
    }
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      container.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafId)
    }
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
          <div className="ml-auto flex flex-col items-end gap-2 md:ml-0 md:flex-row md:items-center md:gap-3">
            <LangToggle />

            {/* The lab lives on its own domain, so the pill says where it goes
                and the tooltip says what it is before anyone leaves the page. */}
            <span className="lab-wrap group relative">
              <SectionLink
                role="pill"
                href={LAB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-44 hover:text-[var(--section-accent)]"
                aria-describedby="lab-tip"
              >
                <FlaskConical className="w-3 h-3" />
                <span>{t("nav.lab")}</span>
              </SectionLink>

              <span id="lab-tip" role="tooltip" className="lab-tip">
                {t("nav.lab.tip")}
              </span>
            </span>

            <SectionLink
              role="pill"
              href="/cv-aladin-akkari.pdf"
              download
              className="tap-44 hover:text-[var(--section-accent)]"
              aria-label={t("nav.cv.download")}
            >
              <FileDown className="w-3 h-3" />
              <span>CV</span>
            </SectionLink>
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
          <div className="flex flex-col gap-4">
            <p className="max-w-sm text-sm opacity-70 leading-relaxed">{t("hero.desc")}</p>
            <a
              href="mailto:aladinakdesign@gmail.com"
              className="tap-44 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3 opacity-60 hover:opacity-100"
              style={{ color: "var(--section-accent)" }}
            >
              <Mail className="w-4 h-4" />
              {t("hero.cta")}
            </a>
          </div>
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
              HTML/CSS — JavaScript — TypeScript — React — Vue — Next.js — Nuxt — Tailwind — Figma — Shopify — NestJS —&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════ EXPERIENCE ═══════════════ */}
      <section className="relative p-6 md:p-12 lg:p-20 py-24">
        <div className="hidden md:block absolute top-12 left-6 lg:left-10 w-px h-[calc(100%-6rem)] bg-current opacity-[0.06]" />
        <div className="hidden md:block absolute top-12 left-4 lg:left-8 w-5 h-px bg-current opacity-[0.06]" />

        <div className="s-reveal s-blur flex items-baseline justify-between mb-20 md:pl-8 lg:pl-14">
          <div>
            <SectionHead
              kicker={t("exp.label")}
              title={t("exp.title.1")}
              accent={t("exp.title.2")}
              titleClassName="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.50]"
            />
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
      <section className="p-6 md:p-12 lg:p-20 py-24 relative">
        <div className="hidden md:block absolute top-12 right-6 lg:right-10 w-px h-[calc(100%-6rem)] bg-current opacity-[0.06]" />
        <div className="hidden md:block absolute top-12 right-4 lg:right-8 w-5 h-px bg-current opacity-[0.06]" />

        <div className="s-reveal s-blur mb-20">
          <SectionHead
              kicker={t("svc.label")}
              title={t("svc.title.1")}
              accent={t("svc.title.2")}
              titleClassName="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.50]"
            />
        </div>

        <div className="stack-cards grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-px" style={{ backgroundColor: "var(--section-muted)" }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="studio-svc-card s-reveal s-scale group p-8 md:p-12"
              style={{ "--delay": `${i * 120}ms`, "--stack-i": i } as React.CSSProperties}
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
      <section className="relative p-6 md:p-12 lg:p-20 py-24">
        <div className="hidden md:block absolute top-0 left-1/2 w-px h-full bg-current opacity-[0.04]" />

        <div className="s-reveal s-blur flex items-baseline justify-between mb-20">
          <div>
            <SectionHead
              kicker={t("proj.label")}
              title={t("proj.title.1")}
              accent={t("proj.title.2")}
              titleClassName="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.50]"
            />
          </div>
        </div>

        <div className="s-reveal s-up" style={{ "--delay": "150ms" } as React.CSSProperties}>
          <ProjectAccordion />
        </div>
      </section>

      {/* ═══════════════ METHOD ═══════════════ */}
      <section className="relative p-6 md:p-12 lg:p-20 py-24">
        <div className="hidden md:block absolute top-12 right-6 lg:right-10 w-px h-[calc(100%-6rem)] bg-current opacity-[0.06]" />
        <div className="hidden md:block absolute top-12 right-4 lg:right-8 w-5 h-px bg-current opacity-[0.06]" />

        <div className="s-reveal s-blur mb-10">
          <SectionHead
            kicker={t("method.label")}
            title={t("method.title.1")}
            accent={t("method.title.2")}
            titleClassName="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.50]"
          />
        </div>
        <p className="s-reveal s-up text-sm opacity-50 leading-relaxed max-w-xl mb-16">{t("method.lead")}</p>

        <ol className="stack-cards grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5">
          {METHOD_STEPS.map((step, i) => (
            <li
              key={step}
              className="studio-method-card s-reveal s-scale group flex flex-col p-6"
              style={{ "--delay": `${i * 120}ms`, "--stack-i": i } as React.CSSProperties}
            >
              <span className="text-xs font-mono opacity-20 block mb-6">0{i + 1}</span>
              <h3 className="text-xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-500">
                {t(`method.${step}.title`)}
              </h3>
              <p className="text-sm opacity-50 leading-relaxed">{t(`method.${step}.desc`)}</p>
              <div className="mt-auto pt-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] block mb-1" style={{ color: "var(--section-accent)" }}>
                  {t("method.output")}
                </span>
                <span className="text-xs opacity-60">{t(`method.${step}.output`)}</span>
              </div>
            </li>
          ))}
        </ol>

        <div className="s-reveal s-up flex flex-wrap items-center gap-4 mt-12">
          <SectionButton type="button" role="outline" onClick={openDesignSystem} aria-haspopup="dialog">
            {t("method.cta.ds")} <ArrowRight className="w-4 h-4" />
          </SectionButton>
          <SectionLink role="outline" href={LAB_URL} target="_blank" rel="noopener noreferrer">
            {t("method.cta.lab")} <ArrowUpRight className="w-4 h-4" />
          </SectionLink>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      {/* overflow-hidden: `.s-reveal.s-left` offsets its children 40px to the
          right until they are revealed, which widened the section. */}
      <section className="relative p-6 md:p-12 lg:p-20 py-24 overflow-hidden">
        <div className="hidden md:block absolute top-12 left-1/2 w-px h-[calc(100%-6rem)] bg-current opacity-[0.06]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="s-reveal s-blur">
            <SectionHead
              kicker={t("about.label")}
              title={t("about.title.1")}
              accent={t("about.title.2")}
              titleClassName="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.50]"
            />
            <div className="space-y-4 mt-15 text-sm opacity-50 leading-relaxed max-w-md">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>

            <SectionKicker className="mt-14 mb-6 block">{t("about.edu")}</SectionKicker>
            <ul className="max-w-md">
              {EDUCATION.map((edu) => (
                <li key={edu.key} className="flex items-baseline justify-between gap-4 py-3 border-b text-sm" style={{ borderColor: "var(--section-muted)" }}>
                  <span className="font-medium">{t(`${edu.key}.title`)}</span>
                  <span className="text-xs font-mono opacity-40 text-right">
                    {edu.school && `${edu.school} · `}
                    {t(`${edu.key}.place`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="s-reveal s-up flex flex-col justify-end" style={{ "--delay": "200ms" } as React.CSSProperties}>
            <SectionKicker className="mb-6 block">{t("about.facts")}</SectionKicker>
            <ul className="mb-14">
              {FACTS.map((fact) => (
                <li key={fact} className="flex items-baseline justify-between gap-4 py-3 border-b text-sm" style={{ borderColor: "var(--section-muted)" }}>
                  <span className="font-mono text-xs opacity-40">{t(`about.facts.${fact}`)}</span>
                  <span className="font-medium text-right">{t(`about.facts.${fact}.value`)}</span>
                </li>
              ))}
            </ul>

            <SectionKicker className="mb-8">{t("about.tools")}</SectionKicker>
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
        {/* Corner marks */}
        <div className="hidden md:block absolute top-8 left-8 w-8 h-px bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute top-8 left-8 w-px h-8 bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute top-8 right-8 w-8 h-px bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute top-8 right-8 w-px h-8 bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute bottom-8 left-8 w-8 h-px bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute bottom-8 left-8 w-px h-8 bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute bottom-8 right-8 w-8 h-px bg-current opacity-[0.08]" />
        <div className="hidden md:block absolute bottom-8 right-8 w-px h-8 bg-current opacity-[0.08]" />

        <div className="flex flex-col flex-1 justify-center">
          {/* Available badge */}
          <div className="s-reveal s-down flex items-center gap-6 mb-12">
            <SectionKicker>{t("contact.label")}</SectionKicker>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: "var(--section-muted)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--state-success)" }} />
              <span className="text-xs font-mono opacity-60">{t("contact.available")}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="section-title s-reveal s-blur text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.50] mb-16">
            {t("contact.title.1")}<br />
            <span className="section-title-accent">{t("contact.title.2")}</span>
          </h2>

          {/* Social links */}
          <div className="flex flex-wrap gap-4 md:gap-6 mb-16">
            {LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="section-btn section-btn--outline s-reveal s-up group"
                style={{ "--delay": `${250 + i * 100}ms` } as React.CSSProperties}
              >
                <span className="text-xs font-mono font-bold opacity-50 group-hover:opacity-100">{link.icon}</span>
                <span className="text-sm font-medium">{link.label}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* Footer: copyright + local time */}
          <div className="mt-auto flex items-end justify-between">
            <div className="text-xs font-mono opacity-20">&copy; {new Date().getFullYear()} Aladin Akkari</div>
            <LocalClock />
          </div>
        </div>
      </section>
    </div>
  )
}
