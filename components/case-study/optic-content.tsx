"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { Panel, SectionHead, delay } from "@/components/design-system/doc-primitives"

export const OPTIC_SECTIONS = [
  { id: "cs-contexte", key: "cs.nav.context" },
  { id: "cs-architecture", key: "cs.nav.architecture" },
  { id: "cs-parcours", key: "cs.nav.journey" },
  { id: "cs-wireframes", key: "cs.nav.wireframes" },
  { id: "cs-accessibilite", key: "cs.nav.a11y" },
  { id: "cs-prototype", key: "cs.nav.prototype" },
  { id: "cs-iterations", key: "cs.nav.iterations" },
  { id: "cs-avant-apres", key: "cs.nav.beforeafter" },
  { id: "cs-bilan", key: "cs.nav.outcome" },
] as const

/*
 * Source : l'étude de cas Optic.ca (PDF et visuels du projet). Les visuels sont
 * recadrés sur leur partie image ; tout le texte est ici, en FR et EN.
 * Contrastes recalculés (WCAG 2.1) sur les couleurs du thème Shopify exporté :
 * marine #040D16, cyan #04D1FF ; dégradé du bouton relevé sur la maquette.
 */

/** Valeurs formatées selon la langue : « 2 200 » en français, « 2,200 » en anglais. */
const FIGURES = [
  { value: 2200, key: "cs.ctx.fig.products" },
  { value: 3, key: "cs.ctx.fig.langs" },
  { value: 1, key: "cs.ctx.fig.team" },
] as const

/** Arborescence : `items` sont des clés i18n ; `isNew` marque la 2e porte d'entrée. */
const TREE = [
  { key: "cs.arch.col.solutions", items: ["cs.arch.sol.1", "cs.arch.sol.2", "cs.arch.sol.3"] },
  {
    key: "cs.arch.col.env",
    isNew: true,
    items: ["cs.arch.env.1", "cs.arch.env.2", "cs.arch.env.3", "cs.arch.env.4", "cs.arch.env.5", "cs.arch.env.6"],
  },
  { key: "cs.arch.col.resources", items: ["cs.arch.res.1", "cs.arch.res.2"] },
  { key: "cs.arch.col.about", items: ["cs.arch.about.1", "cs.arch.about.2", "cs.arch.about.3"] },
] as const

/** Couleurs du site Optic, pas du portfolio : chaque ligne montre la paire mesurée. */
const CONTRASTS = [
  { key: "1", bg: "#040D16", fg: "#FFFFFF", ratio: "19,6", pass: true },
  { key: "2", bg: "#040D16", fg: "#04D1FF", ratio: "10,8", pass: true },
  { key: "3", bg: "#04D1FF", fg: "#040D16", ratio: "10,8", pass: true },
  { key: "4", bg: "#FFFFFF", fg: "#04D1FF", ratio: "1,8", pass: false },
  { key: "5", bg: "linear-gradient(to right, #5BBEE1, #BFEDFD)", fg: "#FFFFFF", ratio: "1,2–2,1", pass: false },
] as const

/**
 * Écrans du prototype et leur zone cliquable, en % de l'image (900 × 564), relevée
 * sur les captures. Sur l'écran Produit, « Add to Quote » est sous le cadre de la
 * capture : la zone est posée en bas de la colonne produit, avec son étiquette,
 * comme une annotation.
 */
const PROTOTYPE = [
  { key: "1", hot: { left: 12.5, top: 0.5, width: 8, height: 6 } },
  { key: "2", hot: { left: 26, top: 7.5, width: 9.5, height: 5.5 } },
  { key: "3", hot: { left: 31, top: 19.5, width: 19, height: 35 } },
  { key: "4", hot: { left: 54, top: 92, width: 19, height: 6.5 }, label: "Add to Quote" },
  { key: "5", hot: { left: 19.5, top: 90, width: 8.5, height: 6 } },
  { key: "6", hot: { left: 43, top: 58, width: 14, height: 6 } },
] as const

const QA = ["sku", "maker", "stock", "blog"] as const

/** Bilan : colonnes et nombre de points de chacune (clés cs.out.<col>.1…n). */
const OUTCOME = [
  { col: "delivered", count: 4 },
  { col: "learned", count: 3 },
  { col: "measure", count: 4 },
] as const

const n = (i: number) => String(i + 1).padStart(2, "0")

/** Visuel du projet : bordure et rayon du panneau, chargement différé. */
function Shot({ src, alt, width, height, className = "" }: { src: string; alt: string; width: number; height: number; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`block h-auto w-full rounded-[var(--ds-radius-sm)] border border-[var(--ds-divider)] ${className}`}
    />
  )
}

/**
 * Prototype cliquable : un écran à la fois, une zone en surbrillance qui mène au
 * suivant, comme dans Figma. Précédent / suivant, flèches du clavier et liste des
 * étapes pour qui ne veut pas chercher la zone ; chaque changement est annoncé.
 */
function PrototypePlayer() {
  const { t } = useLang()
  const [step, setStep] = useState(0)

  const last = PROTOTYPE.length - 1
  const screen = PROTOTYPE[step]
  const nextStep = step === last ? 0 : step + 1
  const go = (i: number) => setStep(Math.min(Math.max(i, 0), last))
  const name = (i: number) => t(`cs.proto.${PROTOTYPE[i].key}.name`)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
      <div
        role="group"
        aria-roledescription={t("cs.proto.player")}
        aria-label={t("cs.proto.title.1") + " " + t("cs.proto.title.2")}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(step + 1)
          if (e.key === "ArrowLeft") go(step - 1)
        }}
      >
        <div className="relative aspect-[900/564] overflow-hidden rounded-[var(--ds-radius-sm)] border border-[var(--ds-divider)] bg-[var(--ds-surface)]">
          {PROTOTYPE.map((s, i) => (
            <img
              key={s.key}
              src={`/work/optic/prototype-0${s.key}.jpg`}
              alt={i === step ? t(`cs.proto.${s.key}.alt`) : ""}
              aria-hidden={i !== step}
              width={900}
              height={564}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full transition-opacity duration-300"
              style={{ opacity: i === step ? 1 : 0 }}
            />
          ))}
          {/* La clé relance le halo à chaque écran. */}
          <button
            key={screen.key}
            type="button"
            className="cs-hotspot"
            style={{
              left: `${screen.hot.left}%`,
              top: `${screen.hot.top}%`,
              width: `${screen.hot.width}%`,
              height: `${screen.hot.height}%`,
            }}
            onClick={() => setStep(nextStep)}
            aria-label={`${t(`cs.proto.${screen.key}`)} — ${t("cs.proto.go")} ${name(nextStep)}`}
          >
            {"label" in screen && <span className="cs-hotspot-label">{screen.label}</span>}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="ds-btn ds-btn--secondary !min-h-10 !px-3"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            aria-label={t("cs.proto.prev")}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            className="ds-btn ds-btn--secondary !min-h-10 !px-3"
            onClick={() => go(step + 1)}
            disabled={step === last}
            aria-label={t("cs.proto.next")}
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
          <p className="text-[13px]">
            <span className="font-mono text-[11px]" style={{ color: "var(--ds-accent)" }}>{n(step)} / {n(last)}</span>{" "}
            <strong className="font-semibold">{name(step)}</strong>
            <span className="text-[var(--ds-fg-muted)]"> · {t(`cs.proto.${screen.key}`)}</span>
          </p>
        </div>
        <p className="mt-2 text-[12px] text-[var(--ds-fg-muted)]">{t("cs.proto.hint")}</p>
        <p className="sr-only" aria-live="polite">{`${t("cs.proto.screen")} ${step + 1} / ${PROTOTYPE.length} — ${name(step)}`}</p>
      </div>

      <ol aria-label={t("cs.proto.steps")} className="grid content-start gap-1.5">
        {PROTOTYPE.map((s, i) => {
          const on = i === step
          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={on ? "step" : undefined}
                className="flex w-full items-start gap-3 rounded-[var(--ds-radius-sm)] border px-3 py-2.5 text-left transition-colors duration-300"
                style={{
                  borderColor: on ? "var(--ds-accent)" : "var(--ds-divider)",
                  background: on ? "var(--ds-surface-hi)" : "transparent",
                }}
              >
                <span className="font-mono text-[11px] leading-[1.6]" style={{ color: "var(--ds-accent)" }}>{n(i)}</span>
                <span>
                  <span className="block text-[13px] font-semibold">{name(i)}</span>
                  <span className="block text-[12px] text-[var(--ds-fg-muted)]">{t(`cs.proto.${s.key}`)}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

// ─────────────────────────────── Contenu ───────────────────────────────

interface OpticContentProps {
  onNavigate: (id: string) => void
}

export function OpticContent({ onNavigate }: OpticContentProps) {
  const { t, lang } = useLang()
  const number = new Intl.NumberFormat(lang === "en" ? "en-CA" : "fr-CA")

  const head = (index: string, prefix: string) => (
    <SectionHead
      index={index}
      kicker={t(`${prefix}.kicker`)}
      title={t(`${prefix}.title.1`)}
      accent={t(`${prefix}.title.2`)}
      lead={t(`${prefix}.lead`)}
    />
  )

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 pb-20 md:px-7">
      {/* ───────── En-tête ───────── */}
      <header className="grid grid-cols-1 items-center gap-8 pb-10 pt-20 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:pb-12">
        <div className="s-reveal s-blur">
          <div className="flex items-center gap-2.5">
            <span className="h-0.5 w-5 rounded-full" style={{ background: "var(--ds-accent)" }} />
            <span className="ds-kicker">{t("cs.hero.kicker")}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-[0.98] tracking-tight md:text-5xl">
            {t("cs.hero.title.1")}
            <br />
            <span className="font-[family-name:var(--font-playfair)] italic" style={{ color: "var(--ds-accent)" }}>
              {t("cs.hero.title.2")}
            </span>
          </h1>
          <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-[var(--ds-fg-muted)]">{t("cs.hero.desc")}</p>
          <dl className="mt-5 grid gap-2 text-[13px]">
            {(["role", "tools", "status"] as const).map((row) => (
              <div key={row} className="flex gap-3">
                <dt className="w-[72px] shrink-0 text-[var(--ds-fg-muted)]">{t(`cs.meta.${row}`)}</dt>
                <dd>{row === "tools" ? "Miro · Figma · Shopify" : t(`cs.meta.${row}.value`)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <button type="button" className="ds-btn ds-btn--primary" onClick={() => onNavigate("cs-contexte")}>
              {t("cs.hero.cta.1")}
            </button>
            <button type="button" className="ds-btn ds-btn--secondary" onClick={() => onNavigate("cs-parcours")}>
              {t("cs.hero.cta.2")}
            </button>
          </div>
        </div>
        <div className="s-reveal s-scale" style={delay(120)}>
          <Shot src="/work/optic/miniature.jpg" alt={t("cs.hero.img")} width={1400} height={1095} />
        </div>
      </header>

      {/* ───────── 01 Contexte et défi ───────── */}
      <section id="cs-contexte" className="scroll-mt-20 pt-14">
        {head("01", "cs.ctx")}

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="grid content-start gap-3">
            <Panel title={t("cs.ctx.mandate.title")}>
              <p className="text-[13px] leading-relaxed">{t("cs.ctx.mandate")}</p>
            </Panel>
            <Panel title={t("cs.ctx.role.title")} step={1}>
              <p className="text-[13px] leading-relaxed">{t("cs.ctx.role")}</p>
            </Panel>
            <Panel title={t("cs.ctx.problems")} step={2}>
              <ol className="grid gap-2.5 text-[13px] leading-relaxed">
                {["1", "2", "3"].map((key, i) => (
                  <li key={key} className="flex gap-3">
                    <span className="font-mono text-[11px] leading-[1.7]" style={{ color: "var(--ds-accent)" }}>{n(i)}</span>
                    {t(`cs.ctx.problem.${key}`)}
                  </li>
                ))}
              </ol>
            </Panel>
          </div>

          <div className="grid content-start gap-3">
            <figure className="s-reveal s-up" style={delay(140)}>
              <Shot src="/work/optic/contexte-nouveau-site.jpg" alt={t("cs.ctx.img")} width={1400} height={605} />
              <figcaption className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[var(--ds-fg-muted)]">{t("cs.ctx.img.caption")}</figcaption>
            </figure>
            <div className="grid grid-cols-3 gap-3">
              {FIGURES.map((fig, i) => (
                <div key={fig.key} className="ds-card s-reveal s-up p-4" style={delay(200 + i * 70)}>
                  <div className="text-2xl font-bold tracking-tight md:text-3xl" style={{ color: "var(--ds-accent)" }}>{number.format(fig.value)}</div>
                  <div className="mt-1 text-[11px] leading-snug text-[var(--ds-fg-muted)]">{t(fig.key)}</div>
                </div>
              ))}
            </div>
            <Panel title={t("cs.ctx.steps")} step={3}>
              <ol className="flex flex-wrap items-center gap-2 text-[13px]">
                {["1", "2", "3", "4"].map((key, i) => (
                  <li key={key} className="flex items-center gap-2">
                    <span className="rounded-full border border-[var(--ds-divider)] px-3 py-1.5">
                      <span className="mr-1.5 font-mono text-[11px]" style={{ color: "var(--ds-accent)" }}>{n(i)}</span>
                      {t(`cs.ctx.step.${key}`)}
                    </span>
                    {i < 3 && <ArrowRight className="h-3.5 w-3.5 text-[var(--ds-fg-muted)]" aria-hidden />}
                  </li>
                ))}
              </ol>
            </Panel>
          </div>
        </div>
      </section>

      {/* ───────── 02 Architecture de l'information ───────── */}
      <section id="cs-architecture" className="scroll-mt-20 pt-14">
        {head("02", "cs.arch")}

        <Panel title={t("cs.arch.tree")}>
          <div className="mb-4 flex justify-center">
            <span className="ds-tag ds-tag--accent">{t("cs.arch.home")}</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TREE.map((col) => (
              <div
                key={col.key}
                className="rounded-[var(--ds-radius-sm)] border p-3"
                style={{ borderColor: "isNew" in col ? "var(--ds-accent)" : "var(--ds-divider)" }}
              >
                <div className="mb-2.5 flex flex-wrap items-center gap-2 text-[13px] font-semibold">
                  {t(col.key)}
                  {"isNew" in col && <span className="ds-tag ds-tag--outline">{t("cs.arch.new")}</span>}
                </div>
                <ul className="grid gap-1.5 text-[13px] text-[var(--ds-fg-muted)]">
                  {col.items.map((item) => (
                    <li key={item} className="border-l border-[var(--ds-divider)] pl-2.5">{t(item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Panel>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          {["1", "2", "3"].map((key, i) => (
            <Panel key={key} title={`${t("cs.arch.decision")} ${n(i)}`} step={i + 1}>
              <h3 className="text-base font-semibold">{t(`cs.arch.dec.${key}.title`)}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t(`cs.arch.dec.${key}`)}</p>
            </Panel>
          ))}
        </div>
      </section>

      {/* ───────── 03 Parcours utilisateur ───────── */}
      <section id="cs-parcours" className="scroll-mt-20 pt-14">
        {head("03", "cs.jour")}

        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["1", "2", "3", "4", "5", "6"].map((key, i) => (
            <li key={key} className="ds-card s-reveal s-up flex flex-col p-4" style={delay((i % 3) * 70)}>
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-bold"
                  style={{ background: "var(--ds-accent)", color: "var(--ds-accent-fg)" }}
                >
                  {n(i)}
                </span>
                <h3 className="text-base font-semibold">{t(`cs.jour.${key}.name`)}</h3>
              </div>
              <div className="ds-kicker mt-3">{t(`cs.jour.${key}.verb`)}</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ds-fg-muted)]">{t(`cs.jour.${key}.text`)}</p>
              <p className="mt-auto pt-3 text-[13px] italic">« {t(`cs.jour.${key}.q`)} »</p>
            </li>
          ))}
        </ol>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          {["target", "goal", "responsive"].map((key, i) => (
            <Panel key={key} title={t(`cs.jour.${key}.title`)} step={i}>
              <p className="text-[13px] leading-relaxed">{t(`cs.jour.${key}`)}</p>
            </Panel>
          ))}
        </div>
      </section>

      {/* ───────── 04 Wireframes annotés ───────── */}
      <section id="cs-wireframes" className="scroll-mt-20 pt-14">
        {head("04", "cs.wf")}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
          <figure className="s-reveal s-up">
            <Shot src="/work/optic/wireframes.jpg" alt={t("cs.wf.img")} width={876} height={1400} />
            <figcaption className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[var(--ds-fg-muted)]">{t("cs.wf.img.caption")}</figcaption>
          </figure>

          <div className="grid content-start gap-3">
            <Panel title={t("cs.wf.blocks")}>
              <ol className="grid gap-3 text-[13px] leading-relaxed">
                {["1", "2", "3", "4", "5", "6", "7"].map((key, i) => (
                  <li key={key} className="flex gap-3">
                    <span
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold"
                      style={{ background: "var(--ds-accent)", color: "var(--ds-accent-fg)" }}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <strong className="font-semibold">{t(`cs.wf.${key}.title`)}</strong>
                      <span className="text-[var(--ds-fg-muted)]"> — {t(`cs.wf.${key}`)}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Panel>
            <Panel title={t("cs.wf.mobile.title")} step={1}>
              <p className="text-[13px] leading-relaxed">{t("cs.wf.mobile")}</p>
            </Panel>
          </div>
        </div>
      </section>

      {/* ───────── 05 Accessibilité ───────── */}
      <section id="cs-accessibilite" className="scroll-mt-20 pt-14">
        {head("05", "cs.a11y")}

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Panel title={t("cs.a11y.contrast")}>
            <ul className="grid gap-2">
              {CONTRASTS.map((row) => (
                <li key={row.key} className="flex flex-wrap items-center gap-3">
                  {/* Échantillon aux couleurs du site Optic : la paire réellement mesurée. */}
                  <span
                    className="grid min-h-10 w-[132px] shrink-0 place-items-center rounded-[var(--ds-radius-sm)] border border-[var(--ds-divider)] px-2 text-[12px] font-semibold"
                    style={{ background: row.bg, color: row.fg }}
                  >
                    {t(`cs.a11y.row.${row.key}.sample`)}
                  </span>
                  <strong className="w-[72px] text-lg tabular-nums">{row.ratio}</strong>
                  <span className="flex items-center gap-1.5 text-[13px] text-[var(--ds-fg-muted)]">
                    {row.pass ? <Check className="h-3.5 w-3.5" aria-hidden /> : <X className="h-3.5 w-3.5" aria-hidden />}
                    {t(`cs.a11y.row.${row.key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="grid content-start gap-3">
            <Panel title={t("cs.a11y.done")} step={1}>
              <ul className="grid gap-2 text-[13px] leading-relaxed">
                {["1", "2", "3", "4"].map((key) => (
                  <li key={key} className="flex gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--ds-accent)" }} aria-hidden />
                    {t(`cs.a11y.done.${key}`)}
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title={t("cs.a11y.fix.title")} step={2}>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 h-8 w-8 shrink-0 rounded-[var(--ds-radius-sm)]" style={{ background: "#007A99" }} aria-hidden />
                <p className="text-[13px] leading-relaxed">{t("cs.a11y.fix")}</p>
              </div>
            </Panel>
          </div>
        </div>
      </section>

      {/* ───────── 06 Prototype ───────── */}
      <section id="cs-prototype" className="scroll-mt-20 pt-14">
        {head("06", "cs.proto")}

        <div className="s-reveal s-up">
          <PrototypePlayer />
        </div>
        <p className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-[var(--ds-fg-muted)]">
          <span><strong className="text-[var(--ds-fg)]">6</strong> {t("cs.proto.screens")}</span>
          <span><strong className="text-[var(--ds-fg)]">14</strong> {t("cs.proto.zones")}</span>
          <span>{t("cs.proto.transitions")}</span>
        </p>
      </section>

      {/* ───────── 07 Itérations et QA ───────── */}
      <section id="cs-iterations" className="scroll-mt-20 pt-14">
        {head("07", "cs.qa")}

        <ol className="mb-3 flex flex-wrap items-center gap-2 text-[13px]">
          {["1", "2", "3", "4", "5"].map((key, i) => (
            <li key={key} className="flex items-center gap-2">
              <span className="rounded-full border border-[var(--ds-divider)] px-3 py-1.5">{t(`cs.qa.flow.${key}`)}</span>
              {i < 4 && <ArrowRight className="h-3.5 w-3.5 text-[var(--ds-fg-muted)]" aria-hidden />}
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {QA.map((key, i) => (
            <Panel key={key} title={t(`cs.qa.${key}.where`)} step={i % 2}>
              <h3 className="text-base font-semibold">{t(`cs.qa.${key}.title`)}</h3>
              {/* Retour du client tel quel, en anglais : c'est sa formulation. */}
              <blockquote lang="en" className="mt-2 border-l-2 pl-3 text-[13px] italic leading-relaxed text-[var(--ds-fg-muted)]" style={{ borderColor: "var(--ds-accent)" }}>
                {t(`cs.qa.${key}.quote`)}
              </blockquote>
              <dl className="mt-3 grid gap-2 text-[13px] leading-relaxed">
                <div>
                  <dt className="ds-kicker">{t("cs.qa.learned")}</dt>
                  <dd className="mt-0.5">{t(`cs.qa.${key}.learned`)}</dd>
                </div>
                <div>
                  <dt className="ds-kicker">{t("cs.qa.action")}</dt>
                  <dd className="mt-0.5">{t(`cs.qa.${key}.action`)}</dd>
                </div>
              </dl>
              <span className="ds-tag ds-tag--accent mt-3">
                <Check className="mr-1 h-3 w-3" aria-hidden />
                {t("cs.qa.applied")}
              </span>
            </Panel>
          ))}
        </div>
      </section>

      {/* ───────── 08 Avant / Après ───────── */}
      <section id="cs-avant-apres" className="scroll-mt-20 pt-14">
        {head("08", "cs.ba")}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {(["before", "after"] as const).map((side, i) => (
            <figure key={side} className="s-reveal s-up" style={delay(i * 100)}>
              <span className={`ds-tag mb-2 ${side === "after" ? "ds-tag--accent" : "ds-tag--outline"}`}>{t(`cs.ba.${side}`)}</span>
              <Shot src={`/work/optic/${side === "before" ? "avant" : "apres"}.jpg`} alt={t(`cs.ba.${side}.img`)} width={1400} height={1003} />
              <ul className="mt-3 grid gap-2 text-[13px] leading-relaxed">
                {["1", "2", "3"].map((key) => (
                  <li key={key} className="flex gap-2.5">
                    {side === "after" ? (
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--ds-accent)" }} aria-hidden />
                    ) : (
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ds-fg-muted)]" aria-hidden />
                    )}
                    {t(`cs.ba.${side}.${key}`)}
                  </li>
                ))}
              </ul>
            </figure>
          ))}
        </div>
      </section>

      {/* ───────── 09 Bilan et suite ───────── */}
      <section id="cs-bilan" className="scroll-mt-20 pt-14">
        {head("09", "cs.out")}

        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--ds-divider)] px-3 py-1.5 text-[13px]">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--ds-accent)" }} aria-hidden />
          {t("cs.out.status")}
        </p>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {OUTCOME.map(({ col, count }, i) => (
            <Panel key={col} title={t(`cs.out.${col}`)} step={i}>
              <ul className="grid gap-2.5 text-[13px] leading-relaxed">
                {Array.from({ length: count }, (_, j) => (
                  <li key={j} className="flex gap-2.5">
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: "var(--ds-accent)" }} aria-hidden />
                    {t(`cs.out.${col}.${j + 1}`)}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>

        <blockquote className="mt-6 border-l-2 pl-4 text-base leading-relaxed" style={{ borderColor: "var(--ds-accent)" }}>
          {t("cs.out.quote")}
        </blockquote>
      </section>
    </div>
  )
}
