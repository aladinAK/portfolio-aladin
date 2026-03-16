"use client"

import { createContext, useContext, useState, useCallback } from "react"

export type Lang = "fr" | "en"

type I18nContextType = {
  lang: Lang
  toggle: () => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

const dict: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.role.1": { fr: "Développeur Frontend", en: "Frontend Developer" },
  "nav.role.2": { fr: "&", en: "&" },
  "nav.role.3": { fr: "Designer", en: "Designer" },
  "nav.available": { fr: "DISPONIBLE", en: "AVAILABLE" },

  // Hero
  "hero.line1": { fr: "Développeur", en: "Frontend" },
  "hero.line2": { fr: "Frontend", en: "Developer" },
  "hero.line3": { fr: "& Designer", en: "& Designer" },
  "hero.desc": {
    fr: "5+ ans à créer des expériences digitales visuellement engageantes et performantes.",
    en: "5+ years crafting visually engaging and high-performing digital experiences.",
  },
  "hero.scroll": { fr: "Défiler", en: "Scroll" },

  // Experience
  "exp.label": { fr: "01 / PARCOURS", en: "01 / CAREER" },
  "exp.title.1": { fr: "Mon", en: "My" },
  "exp.title.2": { fr: "Expérience", en: "Experience" },
  "exp.date": { fr: "2017 — présent", en: "2017 — present" },

  // Experience items
  "exp.0.role": { fr: "Senior Front End Developer", en: "Senior Front End Developer" },
  "exp.0.type": { fr: "Temps plein", en: "Full-time" },
  "exp.0.desc": {
    fr: "Développement frontend & design web, stratégies SEO, intégration WordPress. Construction de composants réutilisables et interfaces performantes pour des campagnes gaming.",
    en: "Frontend development & web design, SEO strategies, WordPress integration. Building reusable components and performant interfaces for gaming campaigns.",
  },
  "exp.1.role": { fr: "Designer Web", en: "Web Designer" },
  "exp.1.type": { fr: "Freelance", en: "Freelance" },
  "exp.1.desc": {
    fr: "Création de supports visuels pour différents clients — affiches, brochures, emballages, maquettes, conception et création de logos.",
    en: "Visual assets creation for various clients — posters, brochures, packaging, mockups, logo design and creation.",
  },
  "exp.2.role": { fr: "Spécialiste en référencement", en: "SEO Specialist" },
  "exp.2.type": { fr: "Temps partiel", en: "Part-time" },
  "exp.2.desc": {
    fr: "Service client et suivi dans une agence spécialisée en référencement. Appels sortants, gestion de mandats et support aux opérations.",
    en: "Customer service and follow-up at a specialized SEO agency. Outbound calls, mandate management and operations support.",
  },
  "exp.3.role": { fr: "Designer graphique", en: "Graphic Designer" },
  "exp.3.type": { fr: "Stage", en: "Internship" },
  "exp.3.desc": {
    fr: "Création de logos, affiches et supports de communication pour une agence de publicité.",
    en: "Logo, poster and communication material creation for an advertising agency.",
  },
  "exp.4.role": { fr: "Infographiste", en: "Graphic Designer" },
  "exp.4.type": { fr: "Stage", en: "Internship" },
  "exp.4.desc": {
    fr: "Création de supports selon les critères clients dans une société spécialisée en impression offset.",
    en: "Creating materials based on client requirements at an offset printing company.",
  },

  // Services
  "svc.label": { fr: "02 / SERVICES", en: "02 / SERVICES" },
  "svc.title.1": { fr: "Ce que", en: "What" },
  "svc.title.2": { fr: "je fais", en: "I do" },
  "svc.0.title": { fr: "Développement Frontend", en: "Frontend Development" },
  "svc.0.desc": {
    fr: "React, Vue, Next.js, Nuxt — des interfaces performantes et responsives avec une attention au détail pixel-perfect.",
    en: "React, Vue, Next.js, Nuxt — performant and responsive interfaces with pixel-perfect attention to detail.",
  },
  "svc.1.title": { fr: "UI / UX Design", en: "UI / UX Design" },
  "svc.1.desc": {
    fr: "De la recherche utilisateur au prototype Figma — des designs qui allient esthétique et fonctionnalité.",
    en: "From user research to Figma prototypes — designs that combine aesthetics and functionality.",
  },
  "svc.2.title": { fr: "Animation Web", en: "Web Animation" },
  "svc.2.desc": {
    fr: "Transitions fluides, micro-interactions, parallax — donner vie aux interfaces avec subtilité.",
    en: "Smooth transitions, micro-interactions, parallax — bringing interfaces to life with subtlety.",
  },
  "svc.3.title": { fr: "SEO & Performance", en: "SEO & Performance" },
  "svc.3.desc": {
    fr: "Optimisation Core Web Vitals, stratégies SEO, analytics — des sites rapides et bien référencés.",
    en: "Core Web Vitals optimization, SEO strategies, analytics — fast and well-ranked websites.",
  },

  // Projects
  "proj.label": { fr: "03 / PROJETS", en: "03 / PROJECTS" },
  "proj.title.1": { fr: "Mes", en: "Selected" },
  "proj.title.2": { fr: "Projets", en: "Work" },
  "proj.cta": { fr: "Voir le projet", en: "View project" },
  "proj.0.d0": {
    fr: "Plateforme marketing gaming — dashboard analytique complet pour améliorer la visibilité et prendre des décisions data-driven.",
    en: "Gaming marketing platform — complete analytics dashboard to improve visibility and make data-driven decisions.",
  },
  "proj.0.d1": {
    fr: "Visualisation de données en temps réel et système d'authentification sécurisé.",
    en: "Real-time data visualization and secure authentication system.",
  },
  "proj.0.d2": {
    fr: "Projet le plus ambitieux — implication frontend et backend.",
    en: "Most ambitious project — frontend and backend involvement.",
  },
  "proj.1.d0": {
    fr: "Refonte complète du site en collaboration avec l'équipe design — direction créative et implémentation technique.",
    en: "Complete website redesign in collaboration with the design team — creative direction and technical implementation.",
  },
  "proj.1.d1": {
    fr: "Conversion des maquettes en code responsive, optimisation performance et compatibilité cross-browser.",
    en: "Converting mockups into responsive code, performance optimization and cross-browser compatibility.",
  },
  "proj.1.d2": {
    fr: "Création de fonctionnalités custom et éléments interactifs pour l'engagement utilisateur.",
    en: "Custom features and interactive elements for user engagement.",
  },
  "proj.2.d0": {
    fr: "Développement de landing pages promotionnelles pour des titres majeurs — Genshin Impact, Game of Thrones, Raid: Shadow Legends.",
    en: "Promotional landing page development for major titles — Genshin Impact, Game of Thrones, Raid: Shadow Legends.",
  },
  "proj.2.d1": {
    fr: "Deux refontes complètes du site principal avec amélioration des métriques SEO.",
    en: "Two complete website redesigns with improved SEO metrics.",
  },
  "proj.2.d2": {
    fr: "Intégration Google Tag Manager et analytics, design graphique appliqué à la présentation visuelle.",
    en: "Google Tag Manager and analytics integration, graphic design applied to visual presentation.",
  },

  // About
  "about.label": { fr: "04 / À PROPOS", en: "04 / ABOUT" },
  "about.title.1": { fr: "Un peu", en: "A bit" },
  "about.title.2": { fr: "plus sur moi", en: "more about me" },
  "about.p1": {
    fr: "Créatif dans l'âme, je combine design et développement depuis plus de 5 ans. Mon approche : des expériences digitales où chaque pixel compte.",
    en: "Creative at heart, I've been combining design and development for over 5 years. My approach: digital experiences where every pixel matters.",
  },
  "about.p2": {
    fr: "En dehors du code, je dessine, je lis de la fantasy, et je créé des palettes de couleurs. J'ai aussi publié un roman fantasy — L'Épée de la Dernière Chance — disponible sur Amazon.",
    en: "Outside of code, I sketch, read fantasy novels, and create color palettes. I also published a fantasy novel — L'Épée de la Dernière Chance — available on Amazon.",
  },
  "about.tools": { fr: "OUTILS QUOTIDIENS", en: "DAILY TOOLS" },

  // Contact
  "contact.label": { fr: "05 / CONTACT", en: "05 / CONTACT" },
  "contact.title.1": { fr: "Restons", en: "Let's" },
  "contact.title.2": { fr: "en contact.", en: "connect." },

  // Agency (nature section)
  "agency.label": { fr: "besoin d un site web ?", en: "Need a website?" },
  "agency.tagline": {
    fr: "Simple à comprendre. Facile à utiliser.",
    en: "Easy to understand. Simple to use.",
  },
  "agency.title.1": { fr: "Des sites web", en: "Websites" },
  "agency.title.2": { fr: "Simples", en: "Simple" },
  "agency.title.3": { fr: "et", en: "&" },
  "agency.title.4": { fr: "Pro", en: "Pro" },
  "agency.desc": {
    fr: "Sites vitrines, e-commerce et améliorations de sites existants pour entrepreneurs et commerces locaux. Sans jargon technique, sans stress.",
    en: "Showcase websites, e-commerce and improvements for entrepreneurs and local businesses. No technical jargon, no stress.",
  },
  "agency.btn.1": { fr: "Discutons", en: "Let's Talk" },
  "agency.cta": { fr: "Voir le site", en: "Visit Site" },
  "agency.bottom": { fr: "Agence Web", en: "Web Agency" },

  // Agency services
  "agency.svc.label": { fr: "NOS SERVICES", en: "OUR SERVICES" },
  "agency.svc.title.1": { fr: "Ce qu'on", en: "What we" },
  "agency.svc.title.2": { fr: "fait.", en: "do." },
  "agency.svc.cta": { fr: "Découvrir tous nos services", en: "Discover all our services" },
  "agency.svc.0.title": { fr: "Création de site web", en: "Website Creation" },
  "agency.svc.0.desc": {
    fr: "Sites vitrines modernes et performants pour entrepreneurs et commerces locaux. Design sur mesure, responsive, optimisé SEO.",
    en: "Modern and performant showcase websites for entrepreneurs and local businesses. Custom design, responsive, SEO optimized.",
  },
  "agency.svc.1.title": { fr: "Refonte de site", en: "Website Redesign" },
  "agency.svc.1.desc": {
    fr: "Votre site a besoin d'un coup de neuf ? On modernise le design, améliore la performance et l'expérience utilisateur.",
    en: "Your website needs a refresh? We modernize the design, improve performance and user experience.",
  },
  "agency.svc.2.title": { fr: "E-commerce", en: "E-commerce" },
  "agency.svc.2.desc": {
    fr: "Boutiques en ligne clé en main — catalogue produit, paiement sécurisé, gestion des commandes. Prêt à vendre.",
    en: "Turnkey online stores — product catalog, secure payment, order management. Ready to sell.",
  },
  "agency.svc.3.title": { fr: "Support web", en: "Web Support" },
  "agency.svc.3.desc": {
    fr: "Maintenance, mises à jour, corrections de bugs et améliorations continues. On s'occupe de tout pour que vous vous concentrez sur votre business.",
    en: "Maintenance, updates, bug fixes and continuous improvements. We handle everything so you can focus on your business.",
  },
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr")

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "fr" ? "en" : "fr"))
  }, [])

  const t = useCallback(
    (key: string) => dict[key]?.[lang] ?? key,
    [lang]
  )

  return (
    <I18nContext.Provider value={{ lang, toggle, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useLang must be used within I18nProvider")
  return ctx
}
