"use client"

import { useState } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { useLang } from "@/lib/i18n"
import { SectionHead } from "@/components/primitives/section-head"

export function AgencyContactForm() {
  const { t } = useLang()
  const [state, handleSubmit] = useForm("mpqyogeq")
  const [showExistingSiteUrl, setShowExistingSiteUrl] = useState(false)

  if (state.succeeded) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-5">
          <div
            className="flex items-center justify-center w-20 h-20 rounded-full"
            style={{
              background: "color-mix(in srgb, var(--state-success) 20%, transparent)",
              border: "2px solid var(--state-success)",
            }}
          >
            <span className="text-4xl" style={{ color: "var(--state-success)" }}>✓</span>
          </div>
          <h2 className="agency-font text-3xl md:text-4xl font-bold uppercase" style={{ color: "var(--section-fg)" }}>
            {t("agency.form.success")}
          </h2>
          <p className="text-sm opacity-60 max-w-sm" style={{ color: "var(--section-fg)" }}>
            {t("agency.form.success.desc")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-16 py-24">
      <div className="relative z-10 flex flex-col gap-6 md:gap-8 w-full max-w-5xl">

        {/* Header */}
        <div>
          <SectionHead
              kicker={t("agency.form.label")}
              title={t("agency.form.title.1")}
              accent={t("agency.form.title.2")}
              kickerClassName="mb-4"
              titleClassName="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85]"
            />
          <p className="agency-font text-sm font-medium uppercase tracking-[0.15em] opacity-40 mt-4 max-w-2xl">
            {t("agency.form.desc")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">

          {/* Name & Email */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-5">
            <div className="flex-1">
              <label htmlFor="name" className="agency-form-label">
                {t("agency.form.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t("agency.form.name.ph")}
                required
                className="agency-form-input"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="form-error" />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="agency-form-label">
                {t("agency.form.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("agency.form.email.ph")}
                required
                className="agency-form-input"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="form-error" />
            </div>
          </div>

          {/* Project Type & Budget */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-5">
            <div className="flex-1">
              <label htmlFor="projectType" className="agency-form-label">
                {t("agency.form.type")}
              </label>
              <select id="projectType" name="projectType" required className="agency-form-select" defaultValue="">
                <option value="" disabled>{t("agency.form.type.ph")}</option>
                <option value="Création de site web">{t("agency.form.type.1")}</option>
                <option value="Refonte / améliorations">{t("agency.form.type.2")}</option>
                <option value="E-commerce">{t("agency.form.type.3")}</option>
                <option value="Autre">{t("agency.form.type.4")}</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="budget" className="agency-form-label">
                {t("agency.form.budget")} <span className="opacity-40 font-normal text-[0.65rem]">({t("agency.form.optional")})</span>
              </label>
              <select id="budget" name="budget" className="agency-form-select" defaultValue="">
                <option value="">{t("agency.form.budget.ph")}</option>
                <option value="Moins de 1 000 $">{t("agency.form.budget.1")}</option>
                <option value="1 000 $ – 2 000 $">{t("agency.form.budget.2")}</option>
                <option value="2 000 $ – 4 000 $">{t("agency.form.budget.3")}</option>
                <option value="Plus de 4 000 $">{t("agency.form.budget.4")}</option>
                <option value="À discuter">{t("agency.form.budget.5")}</option>
              </select>
            </div>
          </div>

          {/* Delay & Existing Site */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-5">
            <div className="flex-1">
              <label htmlFor="delay" className="agency-form-label">
                {t("agency.form.delay")} <span className="opacity-40 font-normal text-[0.65rem]">({t("agency.form.optional")})</span>
              </label>
              <select id="delay" name="delay" className="agency-form-select" defaultValue="">
                <option value="">{t("agency.form.delay.ph")}</option>
                <option value="Dès que possible">{t("agency.form.delay.1")}</option>
                <option value="Dans les prochaines semaines">{t("agency.form.delay.2")}</option>
                <option value="Pas pressé">{t("agency.form.delay.3")}</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="existingSite" className="agency-form-label">
                {t("agency.form.existing")} <span className="opacity-40 font-normal text-[0.65rem]">({t("agency.form.optional")})</span>
              </label>
              <select
                id="existingSite"
                name="existingSite"
                className="agency-form-select"
                defaultValue=""
                onChange={(e) => setShowExistingSiteUrl(e.target.value === "oui")}
              >
                <option value="">{t("agency.form.existing.ph")}</option>
                <option value="oui">{t("agency.form.yes")}</option>
                <option value="non">{t("agency.form.no")}</option>
              </select>
            </div>
          </div>

          {/* Existing Site URL */}
          {showExistingSiteUrl && (
            <div>
              <label htmlFor="existingSiteUrl" className="agency-form-label">
                {t("agency.form.existing.url")}
              </label>
              <input
                type="url"
                id="existingSiteUrl"
                name="existingSiteUrl"
                placeholder={t("agency.form.existing.url.ph")}
                className="agency-form-input"
              />
            </div>
          )}

          {/* Message */}
          <div>
            <label htmlFor="message" className="agency-form-label">
              {t("agency.form.message")}
            </label>
            <textarea
              id="message"
              name="message"
              placeholder={t("agency.form.message.ph")}
              required
              rows={4}
              className="agency-form-input resize-y"
              style={{ minHeight: "120px" }}
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="form-error" />
          </div>

          {/* Submit */}
          <div className="flex flex-col items-start gap-3 mt-2">
            <button
              type="submit"
              disabled={state.submitting}
              className="section-btn section-btn--primary agency-font font-bold text-sm uppercase tracking-[0.15em] hover:shadow-[0_0_30px_rgba(255,77,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? t("agency.form.sending") : t("agency.form.submit")}
            </button>
            <p className="text-xs opacity-40 tracking-wide" style={{ color: "var(--section-fg)" }}>
              {t("agency.form.note")}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
