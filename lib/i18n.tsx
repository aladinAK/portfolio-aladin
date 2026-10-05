"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"

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
  "nav.role.3": { fr: "Designer", en: "Designer" },
  "nav.cv.download": { fr: "Télécharger CV", en: "Download CV" },
  "nav.lab": { fr: "design-lab", en: "design-lab" },
  "nav.lab.tip": {
    fr: "Un labo pour tester des idées visuelles avant qu'elles deviennent propres. Chaque expérimentation est une page indépendante, sans framework : HTML, CSS et JavaScript, servis par Vite.",
    en: "A lab for testing visual ideas before they get polished. Each experiment is a standalone page, no framework: HTML, CSS and JavaScript, served by Vite.",
  },
  "nav.lang": { fr: "Changer de langue", en: "Switch language" },

  // Hero
  "hero.line1": { fr: "Développeur", en: "Frontend" },
  "hero.line2": { fr: "Frontend", en: "Developer" },
  "hero.line3": { fr: "& Designer", en: "& Designer" },
  "hero.desc": {
    fr: "La maquette et le code sortent de la même main. Cinq ans à Montréal, du site vitrine à la plateforme d'analytics.",
    en: "Mockup and code come from the same hand. Five years in Montréal, from brochure sites to analytics platforms.",
  },
  "hero.cta": { fr: "Me contacter", en: "Get in touch" },
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
    fr: "Je conçois et développe des interfaces web performantes et réactives, en alliant design et expérience utilisateur. Je crée des composants réutilisables et optimise chaque projet pour la performance et le SEO, notamment dans le secteur du gaming. Côté back-end, j'ai construit une API REST complète d'analytics SDK avec NestJS, MongoDB, AWS Athena et Docker.",
    en: "I design and develop responsive, high-performance web interfaces, blending design with user experience. I build reusable components and optimize every project for performance and SEO, especially in the gaming sector. On the back end, I built a complete REST API for SDK analytics with NestJS, MongoDB, AWS Athena and Docker."
  },
  "exp.1.role": { fr: "Designer Web", en: "Web Designer" },
  "exp.1.type": { fr: "Freelance", en: "Freelance" },
  "exp.1.desc": {
    fr: "J'accompagne mes clients dans la création d'identités visuelles impactantes — affiches, brochures, packaging, maquettes et sites web — en traduisant leurs idées en designs cohérents et esthétiques.",
    en: "I help clients craft impactful visual identities — posters, brochures, packaging, mockups, and websites — translating their ideas into cohesive and visually appealing designs."
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
    fr: "Création de logos, affiches et supports de communication variés, en respectant l'identité et le ton de chaque client au sein de l'agence.",
    en: "Creating logos, posters, and diverse communication materials, while respecting each client’s identity and tone within the agency."
  },
  "exp.4.role": { fr: "Infographiste", en: "Graphic Designer" },
  "exp.4.type": { fr: "Stage", en: "Internship" },
  "exp.4.desc": {
    fr: "Production de supports graphiques sur mesure selon les besoins des clients dans une société spécialisée en impression offset, avec attention aux détails et à la qualité finale.",
    en: "Producing tailored graphic materials based on client needs at an offset printing company, with careful attention to detail and final quality."
  },

  // Services
  "svc.label": { fr: "02 / SERVICES", en: "02 / SERVICES" },
  "svc.title.1": { fr: "Ce que", en: "What" },
  "svc.title.2": { fr: "je fais", en: "I do" },
  "svc.0.title": { fr: "Développement Frontend", en: "Frontend Development" },
  "svc.0.desc": {
    fr: "Création d'interfaces web réactives et performantes avec React, Vue, Next.js et Nuxt, toujours avec un souci du détail pixel-perfect.",
    en: "Building responsive, high-performance web interfaces with React, Vue, Next.js, and Nuxt, always with pixel-perfect attention to detail."
  },
  "svc.1.title": { fr: "UI / UX Design", en: "UI / UX Design" },
  "svc.1.desc": {
    fr: "De l'étude utilisateur au prototype Figma, je conçois des interfaces qui allient esthétique, ergonomie et fonctionnalité — avec des design systems faits de composants, de variantes et d'auto-layout.",
    en: "From user research to Figma prototypes, I design interfaces that blend aesthetics, usability and functionality — backed by design systems built from components, variants and auto-layout."
  },
  "svc.2.title": { fr: "Animation Web", en: "Web Animation" },
  "svc.2.desc": {
    fr: "Je crée des animations subtiles et engageantes — transitions fluides, micro-interactions, parallax — avec GSAP, ScrollTrigger et Framer Motion, pour rendre l'expérience web vivante et intuitive.",
    en: "I create subtle, engaging web animations — smooth transitions, micro-interactions, parallax — with GSAP, ScrollTrigger and Framer Motion, to make web experiences lively and intuitive."
  },
  "svc.3.title": { fr: "SEO & Performance", en: "SEO & Performance" },
  "svc.3.desc": {
    fr: "Audits techniques (balises, hiérarchie Hn, maillage interne), optimisation des Core Web Vitals et suivi avec GA4, SEMrush et Hotjar, pour des sites rapides, visibles et performants.",
    en: "Technical audits (tags, heading hierarchy, internal linking), Core Web Vitals optimization and tracking with GA4, SEMrush and Hotjar, for fast, visible, high-performing websites."
  },

  // Projects
  "proj.label": { fr: "03 / PROJETS", en: "03 / PROJECTS" },
  "proj.title.1": { fr: "Sur quoi", en: "What I've" },
  "proj.title.2": { fr: "j'ai travaillé", en: "worked on" },
  "proj.cta": { fr: "Voir le projet", en: "View project" },
  "proj.0.d0": {
    fr: "Plateforme d'intelligence de marché pour l'industrie du jeu — plus de 250 000 titres Steam et 60 000 jeux mobiles suivis : revenus, téléchargements, joueurs actifs, sentiment.",
    en: "Market intelligence platform for the games industry — over 250,000 Steam titles and 60,000 mobile games tracked: revenue, downloads, active players, sentiment.",
  },
  "proj.0.d1": {
    fr: "Interfaces des profils de jeu : métriques et chronologies historiques, score MPI détaillé en cinq piliers, outil d'analyse de sentiment (thèmes, tonalité émotionnelle, termes classés par impact).",
    en: "Game profile interfaces: metrics and historical timelines, MPI score broken down across five pillars, sentiment analysis tool (themes, emotional tone, terms ranked by impact).",
  },
  "proj.0.d2": {
    fr: "Tableaux de bord des analytics remontés par SDK — DAU/MAU, rétention D1/D7/D30, entonnoirs d'engagement et cohortes — présentés à côté des données de marché.",
    en: "Dashboards for SDK-reported analytics — DAU/MAU, D1/D7/D30 retention, engagement funnels and cohorts — shown alongside market data.",
  },
  "proj.1.d0": {
    fr: "Refonte complète du site d'un réseau CPA de performance pour le gaming PC, qui sert plus de 250 studios annonceurs.",
    en: "Full redesign of the site of a CPA performance network for PC gaming, serving over 250 advertiser studios.",
  },
  "proj.1.d1": {
    fr: "Transformation de maquettes en code responsive, optimisation de la performance et compatibilité multi-navigateurs.",
    en: "Converting mockups into responsive code, optimizing performance, and ensuring cross-browser compatibility."
  },
  "proj.1.d2": {
    fr: "Création de fonctionnalités sur mesure et d’éléments interactifs pour engager l’utilisateur.",
    en: "Developing custom features and interactive elements to enhance user engagement."
  },
  "proj.2.d0": {
    fr: "Landing pages promotionnelles pour de grands titres — Genshin Impact, Game of Thrones, Raid: Shadow Legends.",
    en: "Promotional landing pages for major titles — Genshin Impact, Game of Thrones, Raid: Shadow Legends.",
  },
  "proj.2.d1": {
    fr: "Deux refontes complètes du site d'une agence qui revendique 110+ partenaires — dont Tencent, Roblox, NetEase et Square Enix — et 200+ campagnes depuis 2015, avec amélioration des indicateurs SEO.",
    en: "Two full redesigns of the site of an agency claiming 110+ partners — including Tencent, Roblox, NetEase and Square Enix — and 200+ campaigns since 2015, with improved SEO metrics.",
  },
  "proj.2.d2": {
    fr: "Intégration Google Tag Manager et analytics, avec un design graphique pensé pour la mise en valeur visuelle.",
    en: "Google Tag Manager and analytics integration, with graphic design focused on visual impact."
  },

  // About
  // Method — general process from brief to launch
  "method.label": { fr: "04 / MÉTHODE", en: "04 / METHOD" },
  "method.title.1": { fr: "Ma façon", en: "How I" },
  "method.title.2": { fr: "de travailler", en: "work" },
  "method.lead": {
    fr: "Du brief au lancement, cinq étapes qui se suivent dans cet ordre. Aucune ne commence avant que la précédente soit validée.",
    en: "From brief to launch, five steps in this order. None starts before the previous one is signed off.",
  },
  "method.output": { fr: "Livrable", en: "Deliverable" },
  "method.0.title": { fr: "Comprendre", en: "Understand" },
  "method.0.desc": {
    fr: "Entretiens, analytics et audit de l'existant. Les objectifs sont écrits avant le premier écran.",
    en: "Interviews, analytics and an audit of what exists. Goals are written down before the first screen.",
  },
  "method.0.output": { fr: "Tâches prioritaires + plan par phases", en: "Priority tasks + phased plan" },
  "method.1.title": { fr: "Structurer", en: "Structure" },
  "method.1.desc": {
    fr: "Arborescence, parcours clés, wireframes en gris. La hiérarchie avant la couleur.",
    en: "Site map, key journeys, grey wireframes. Hierarchy before color.",
  },
  "method.1.output": { fr: "Sitemap + wireframes", en: "Sitemap + wireframes" },
  "method.2.title": { fr: "Concevoir et tester", en: "Design and test" },
  "method.2.desc": {
    fr: "Charte, jetons et prototype Figma testé. Ce qui casse au test ne part pas en développement.",
    en: "Guidelines, tokens and a tested Figma prototype. What breaks in testing doesn't reach development.",
  },
  "method.2.output": { fr: "Prototype testé et approuvé", en: "Tested, approved prototype" },
  "method.3.title": { fr: "Développer", en: "Build" },
  "method.3.desc": {
    fr: "Composants réutilisables, responsive et accessibles. L'équipe peut modifier sans moi.",
    en: "Reusable, responsive, accessible components. The team can edit without me.",
  },
  "method.3.output": { fr: "Site en préproduction", en: "Site on staging" },
  "method.4.title": { fr: "Lancer", en: "Launch" },
  "method.4.desc": {
    fr: "Tests, SEO, redirections et analytics, formation, puis suivi après la mise en ligne.",
    en: "Testing, SEO, redirects and analytics, training, then follow-up after go-live.",
  },
  "method.4.output": { fr: "Mise en ligne + mesures", en: "Go-live + metrics" },
  "method.cta.ds": { fr: "Voir mon design system", en: "See my design system" },
  "method.cta.lab": { fr: "Explorer le design-lab", en: "Explore the design-lab" },

  "about.label": { fr: "05 / À PROPOS", en: "05 / ABOUT" },
  "about.title.1": { fr: "Un peu", en: "A bit" },
  "about.title.2": { fr: "plus sur moi", en: "more about me" },
  "about.p1": {
    fr: "Je suis venu au web par le design graphique — identités, affiches, print — puis je me suis formé à l'UX/UI et au développement à Montréal. Depuis plus de cinq ans, je conçois des interfaces et je les code moi-même : ce que je dessine dans Figma, je sais ce que ça coûte à construire.",
    en: "I came to the web through graphic design — identities, posters, print — then trained in UX/UI and development in Montréal. For over five years I've designed interfaces and built them myself: whatever I draw in Figma, I know what it takes to build.",
  },
  "about.p2": {
    fr: "Ce double regard évite les allers-retours : une maquette qui tient compte du code, un code qui respecte la maquette. Hors écran, j'écris — Les Chroniques de Jez, une saga de dark fantasy en quatre tomes, aujourd'hui complète et disponible sur Amazon.",
    en: "Seeing both sides cuts out the back-and-forth: a mockup that accounts for the code, code that respects the mockup. Off screen, I write — Les Chroniques de Jez, a four-volume dark fantasy saga, now complete and out on Amazon.",
  },
  "about.tools": { fr: "OUTILS QUOTIDIENS", en: "DAILY TOOLS" },
  "about.facts": { fr: "REPÈRES", en: "AT A GLANCE" },
  "about.facts.location": { fr: "Basé à", en: "Based in" },
  "about.facts.location.value": { fr: "Montréal, QC", en: "Montréal, QC" },
  "about.facts.langs": { fr: "Langues", en: "Languages" },
  "about.facts.langs.value": { fr: "Français · Anglais", en: "French · English" },
  "about.facts.exp": { fr: "Expérience", en: "Experience" },
  "about.facts.exp.value": { fr: "5+ ans", en: "5+ years" },
  "about.facts.availability": { fr: "Disponibilité", en: "Availability" },
  "about.facts.availability.value": { fr: "Postes et mandats", en: "Roles and contracts" },
  "about.edu": { fr: "FORMATION", en: "EDUCATION" },
  "about.edu.0.title": { fr: "Design UX/UI", en: "UX/UI Design" },
  "about.edu.0.place": { fr: "Montréal", en: "Montréal" },
  "about.edu.1.title": { fr: "Design Web", en: "Web Design" },
  "about.edu.1.place": { fr: "Montréal", en: "Montréal" },
  "about.edu.2.title": { fr: "Design graphique", en: "Graphic Design" },
  "about.edu.2.place": { fr: "Tunis", en: "Tunis" },
  "about.edu.3.title": { fr: "Baccalauréat en économie et gestion", en: "Bachelor in Economics and Management" },
  "about.edu.3.place": { fr: "Tunisie", en: "Tunisia" },

  // Contact
  "contact.label": { fr: "06 / CONTACT", en: "06 / CONTACT" },
  "contact.title.1": { fr: "Restons", en: "Let's" },
  "contact.title.2": { fr: "en contact.", en: "connect." },
  "contact.available": { fr: "Ouvert aux postes et aux mandats", en: "Open to roles and contracts" },

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

  // Agency services
  // Agency — réalisations (concepts personnels, pas des commandes clients)
  "agency.work.label": { fr: "Réalisations", en: "Selected work" },
  "agency.work.title.1": { fr: "Des sites", en: "Sites that" },
  "agency.work.title.2": { fr: "qui convertissent", en: "convert" },
  "agency.work.note": {
    fr: "Concepts personnels — des sites complets conçus et développés de bout en bout pour explorer des univers de marque. Cliquez pour les parcourir.",
    en: "Self-initiated concepts — complete sites designed and built end to end to explore brand territories. Click through to browse them.",
  },
  "agency.work.concept": { fr: "Concept", en: "Concept" },
  "agency.work.0.desc": {
    fr: "Pâtisserie artisanale montréalaise. Direction artistique éditoriale, carte des créations et tunnel de commande.",
    en: "Montréal artisanal patisserie. Editorial art direction, creations menu and ordering flow.",
  },
  "agency.work.0.alt": {
    fr: "Page d'accueil du site Maison Délice, pâtisserie artisanale",
    en: "Maison Délice homepage, an artisanal patisserie site",
  },
  "agency.work.1.desc": {
    fr: "Clinique esthétique premium. Parcours de prise de rendez-vous, présentation des soins et témoignages.",
    en: "Premium aesthetic clinic. Appointment flow, treatment showcase and testimonials.",
  },
  "agency.work.1.alt": {
    fr: "Page d'accueil du site Clinique Lumea, centre esthétique",
    en: "Clinique Lumea homepage, an aesthetic clinic site",
  },
  "agency.work.2.desc": {
    fr: "Studio de coiffure montréalaise. Typographie affirmée, galerie de réalisations et prise de rendez-vous.",
    en: "Montréal hair studio. Bold typography, work gallery and appointment booking.",
  },
  "agency.work.2.alt": {
    fr: "Page d'accueil du site FORMA, studio de coiffure à Montréal",
    en: "FORMA homepage, a Montréal hair studio site",
  },
  "agency.svc.label": { fr: "NOS SERVICES", en: "OUR SERVICES" },
  "agency.svc.title.1": { fr: "Ce qu'on", en: "What we" },
  "agency.svc.title.2": { fr: "fait.", en: "do." },

  // Agency contact form
  "agency.form.label": { fr: "CONTACT", en: "CONTACT" },
  "agency.form.title.1": { fr: "Parlons de", en: "Let's talk" },
  "agency.form.title.2": { fr: "votre projet.", en: "about your project." },
  "agency.form.desc": { fr: "Expliquez-moi votre besoin et je vous répondrai rapidement.", en: "Tell me about your needs and I'll get back to you quickly." },
  "agency.form.name": { fr: "Nom", en: "Name" },
  "agency.form.name.ph": { fr: "Votre nom", en: "Your name" },
  "agency.form.email": { fr: "Email", en: "Email" },
  "agency.form.email.ph": { fr: "Votre adresse email", en: "Your email address" },
  "agency.form.type": { fr: "Type de projet", en: "Project type" },
  "agency.form.type.ph": { fr: "Sélectionnez un type", en: "Select a type" },
  "agency.form.type.1": { fr: "Création de site web", en: "Website creation" },
  "agency.form.type.2": { fr: "Refonte / améliorations", en: "Redesign / improvements" },
  "agency.form.type.3": { fr: "E-commerce", en: "E-commerce" },
  "agency.form.type.4": { fr: "Autre", en: "Other" },
  "agency.form.budget": { fr: "Budget estimé", en: "Estimated budget" },
  "agency.form.budget.ph": { fr: "Sélectionnez un budget", en: "Select a budget" },
  "agency.form.budget.1": { fr: "Moins de 1 000 $", en: "Under $1,000" },
  "agency.form.budget.2": { fr: "1 000 $ – 2 000 $", en: "$1,000 – $2,000" },
  "agency.form.budget.3": { fr: "2 000 $ – 4 000 $", en: "$2,000 – $4,000" },
  "agency.form.budget.4": { fr: "Plus de 4 000 $", en: "Over $4,000" },
  "agency.form.budget.5": { fr: "À discuter", en: "To discuss" },
  "agency.form.delay": { fr: "Délai souhaité", en: "Desired timeline" },
  "agency.form.delay.ph": { fr: "Sélectionnez un délai", en: "Select a timeline" },
  "agency.form.delay.1": { fr: "Dès que possible", en: "As soon as possible" },
  "agency.form.delay.2": { fr: "Dans les prochaines semaines", en: "In the coming weeks" },
  "agency.form.delay.3": { fr: "Pas pressé", en: "No rush" },
  "agency.form.existing": { fr: "Site existant ?", en: "Existing site?" },
  "agency.form.existing.ph": { fr: "Avez-vous déjà un site ?", en: "Do you already have a site?" },
  "agency.form.yes": { fr: "Oui", en: "Yes" },
  "agency.form.no": { fr: "Non", en: "No" },
  "agency.form.existing.url": { fr: "Lien du site actuel", en: "Current site URL" },
  "agency.form.existing.url.ph": { fr: "https://votresite.com", en: "https://yoursite.com" },
  "agency.form.message": { fr: "Message", en: "Message" },
  "agency.form.message.ph": { fr: "Décrivez votre projet, vos besoins ou vos questions.", en: "Describe your project, needs, or questions." },
  "agency.form.submit": { fr: "Envoyer ma demande", en: "Send my request" },
  "agency.form.sending": { fr: "Envoi en cours...", en: "Sending..." },
  "agency.form.note": { fr: "Réponse rapide. Aucun engagement.", en: "Quick response. No commitment." },
  "agency.form.optional": { fr: "optionnel", en: "optional" },
  "agency.form.success": { fr: "Message envoyé !", en: "Message sent!" },
  "agency.form.success.desc": { fr: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.", en: "Thank you for your message. I'll get back to you as soon as possible." },
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

  // Shared
  "scroll": { fr: "Défiler", en: "Scroll" },
  "scroll.more": { fr: "Défiler pour plus", en: "Scroll for more" },

  // Book section
  "book.label": { fr: "Roman", en: "Novel" },
  "book.store": { fr: "Librairie", en: "Bookstore" },
  "book.main.1": { fr: "Les", en: "The" },
  "book.main.2": { fr: "Chroniques", en: "Chronicles" },
  "book.main.3": { fr: "de Jez", en: "of Jez" },
  "book.subtitle": {
    fr: "Une épopée de guerre, de secrets et de destinée brisée.",
    en: "An epic of war, secrets and shattered destiny.",
  },
  "book.cta": { fr: "Découvrir la saga", en: "Discover the saga" },
  "book.scroll": { fr: "Défiler", en: "Scroll" },
  // Avis lecteurs — le corps des avis reste en VO dans le composant
  "book.reviews.label": { fr: "Avis des lecteurs", en: "Reader reviews" },
  "book.reviews.title": {
    fr: "Ce qu\u2019en disent les premiers lecteurs",
    en: "What the first readers are saying",
  },
  "book.reviews.stars": { fr: "5 étoiles sur 5", en: "5 out of 5 stars" },
  "book.reviews.summary": { fr: "5,0 sur 5 \u00b7 10+ avis Amazon", en: "5.0 out of 5 \u00b7 10+ Amazon reviews" },
  "book.reviews.format": { fr: "Format Kindle", en: "Kindle Edition" },
  "book.reviews.verified": { fr: "Achat vérifié", en: "Verified purchase" },
  "book.reviews.cta": { fr: "Lire les avis sur Amazon", en: "Read the reviews on Amazon" },
  "book.synopsis.label": { fr: "Synopsis", en: "Synopsis" },
  "book.synopsis.title": {
    fr: "Un voleur, une épée légendaire, un destin maudit",
    en: "A thief, a legendary sword, a cursed destiny",
  },
  "book.synopsis.p1": {
    fr: "Jez, un petit voleur, dérobe une épée légendaire et se retrouve mêlé à une conspiration qui le dépasse. Emprisonné avec Marv, un guerrier brutal, l'arme semble posséder sa propre volonté.",
    en: "Jez, a petty thief, steals a legendary sword and becomes entangled in a conspiracy beyond his comprehension. Imprisoned with Marv, a brutal warrior, the weapon appears to possess its own will.",
  },
  "book.synopsis.p2": {
    fr: "Dans un monde médiéval-fantasy où la magie opère à travers pactes, dettes et malédictions — les dieux de la Mort complotent contre les mortels, et les épées légendaires ne sont jamais de simples armes.",
    en: "In a medieval-fantasy world where magic operates through pacts, debts and curses — Death gods scheme against mortals, and legendary swords are never mere weapons.",
  },
  "book.characters.label": { fr: "Personnages", en: "Characters" },
  "book.char.jez": { fr: "L'héritier maudit", en: "The cursed heir" },
  "book.char.marv": { fr: "Le colosse silencieux", en: "The silent colossus" },
  "book.char.oslo": { fr: "Le capitaine déchu", en: "The fallen captain" },
  "book.char.ava": { fr: "La survivante", en: "The survivor" },
  "book.tomes.label": { fr: "La saga", en: "The saga" },
  "book.tomes.title": { fr: "Quatre tomes, un destin", en: "Four volumes, one destiny" },
  "book.t1.title": { fr: "L'Épée de la Dernière Chance", en: "The Sword of Last Chance" },
  "book.t1.status": { fr: "Disponible", en: "Available" },
  "book.t2.title": { fr: "L'Épée des Trois Serments", en: "The Sword of Three Oaths" },
  "book.t2.status": { fr: "Disponible", en: "Available" },
  "book.t3.title": { fr: "L'Épée des Mensonges Tissés", en: "The Sword of Woven Lies" },
  "book.t3.status": { fr: "Disponible", en: "Available" },
  "book.t4.title": { fr: "L'Épée des Héritages Brisés", en: "The Sword of Shattered Legacies" },
  "book.t4.status": { fr: "Disponible", en: "Available" },
  "book.genre": { fr: "Dark Fantasy", en: "Dark Fantasy" },
  "book.tomes.count": { fr: "IV Tomes", en: "IV Volumes" },
  "book.tome": { fr: "Tome", en: "Volume" },
  "book.store.cta": { fr: "Pour plus d'informations", en: "For more information" },
  "book.thought.0": { fr: "Wow...", en: "Wow..." },
  "book.thought.1": { fr: "Incroyable", en: "Incredible" },
  "book.thought.2": { fr: "Jez est fou", en: "Jez is insane" },
  "book.thought.3": { fr: "Non... Oslo ?!", en: "No... Oslo?!" },
  "book.thought.4": { fr: "Je peux pas lâcher", en: "Can't put it down" },
  "book.thought.5": { fr: "Plot twist !", en: "Plot twist!" },
  "book.thought.6": { fr: "C'est dark...", en: "So dark..." },
  "book.thought.7": { fr: "Encore un chapitre", en: "One more chapter" },
  "book.author.quote": {
    fr: "L'héroïsme, ce n'est pas l'absence de peur. C'est savoir ce qu'on perd avant de choisir.",
    en: "Heroism isn't absence of fear. It's knowing what you lose before choosing.",
  },

  // MoodMovie section
  "mood.vibe": { fr: "Besoin d'un vibe ?", en: "Need a vibe?" },
  "mood.hero.1": { fr: "Ton mood.", en: "Your mood." },
  "mood.hero.2": { fr: "Ton contenu.", en: "Your content." },
  "mood.hero.desc": {
    fr: "Choisis ton humeur, découvre des films, séries, livres et musique qui matchent ce que tu ressens.",
    en: "Choose your mood, discover movies, shows, books and music that match how you feel.",
  },
  "mood.joy": { fr: "Rire", en: "Laugh" },
  "mood.sad": { fr: "Pleurer", en: "Cry" },
  "mood.shock": { fr: "Choc", en: "Shock" },
  "mood.scare": { fr: "Peur", en: "Scare" },
  "mood.energy": { fr: "Énergie", en: "Energy" },
  "mood.surprise": { fr: "Surprise", en: "Surprise" },
  "mood.bottom.left": { fr: "Films · Séries · Livres · Musique", en: "Movies · Shows · Books · Music" },
  "mood.bottom.right": { fr: "Basé sur l'émotion", en: "Emotion-based" },
  "mood.feat.label": { fr: "Fonctionnalités", en: "Features" },
  "mood.feat.title.1": { fr: "Du contenu pour", en: "Content for" },
  "mood.feat.title.2": { fr: "chaque émotion.", en: "every emotion." },
  "mood.feat.0.title": { fr: "Films", en: "Movies" },
  "mood.feat.0.desc": {
    fr: "Découvre des films adaptés à ton humeur — comédie, drame, thriller, action, horreur ou mystère.",
    en: "Discover movies tailored to your mood — comedy, drama, thriller, action, horror or mystery.",
  },
  "mood.feat.1.title": { fr: "Séries", en: "Shows" },
  "mood.feat.1.desc": {
    fr: "Des séries TV triées par émotion — de la sitcom feel-good au crime noir.",
    en: "TV shows sorted by emotion — from feel-good sitcoms to dark crime.",
  },
  "mood.feat.2.title": { fr: "Livres", en: "Books" },
  "mood.feat.2.desc": {
    fr: "Des recommandations de lecture basées sur ton état émotionnel du moment.",
    en: "Reading recommendations based on your current emotional state.",
  },
  "mood.feat.3.title": { fr: "Musique", en: "Music" },
  "mood.feat.3.desc": {
    fr: "Pop dansant, soul, metal, ambient, rock — la bande-son parfaite pour ton mood.",
    en: "Pop dance, soul, metal, ambient, rock — the perfect soundtrack for your mood.",
  },
  "mood.how.label": { fr: "Comment ça marche", en: "How it works" },
  "mood.how.title": { fr: "Simple comme bonjour.", en: "Simple as that." },
  "mood.step.0.title": { fr: "Choisis ton mood", en: "Pick your mood" },
  "mood.step.0.desc": {
    fr: "Sélectionne l'émotion qui correspond à ce que tu ressens en ce moment.",
    en: "Select the emotion that matches how you feel right now.",
  },
  "mood.step.1.title": { fr: "Explore le contenu", en: "Explore content" },
  "mood.step.1.desc": {
    fr: "Browse des films, séries, livres et musique adaptés à ton humeur.",
    en: "Browse movies, shows, books and music tailored to your mood.",
  },
  "mood.step.2.title": { fr: "Sauvegarde tes favoris", en: "Save your favorites" },
  "mood.step.2.desc": {
    fr: "Ajoute en favoris et marque ce que tu as déjà vu ou lu.",
    en: "Add to favorites and mark what you've already watched or read.",
  },
  "mood.try": { fr: "Essayer MoodMovie", en: "Try MoodMovie" },

  // Project Info — Overview & Stack
  "info.overview": { fr: "Aperçu", en: "Overview" },
  "info.visit": { fr: "Voir le projet", en: "Visit project" },
  "info.stack": { fr: "Stack", en: "Stack" },

  // Agency info
  "agency.info.overview": {
    fr: "Oui, c'est une vraie agence. Vous pouvez faire votre demande de site web directement via le formulaire de contact. On crée des sites vitrines, e-commerce et des refontes pour entrepreneurs et commerces locaux — sans jargon, sans stress.",
    en: "Yes, it's a real agency. You can submit your website request directly through the contact form. We build showcase websites, e-commerce and redesigns for entrepreneurs and local businesses — no jargon, no stress.",
  },
  "agency.info.stack": {
    fr: "React 19 + TypeScript · Vite 7 · Tailwind CSS 4 · Three.js (@react-three/fiber + drei) · GSAP · Formspree · Vercel · pnpm · ESLint 9",
    en: "React 19 + TypeScript · Vite 7 · Tailwind CSS 4 · Three.js (@react-three/fiber + drei) · GSAP · Formspree · Vercel · pnpm · ESLint 9",
  },
  "agency.info.stack.desc": {
    fr: "Site vitrine one-page avec 3D, animations GSAP, curseur custom, snap scroll et formulaire de contact. Stack frontend moderne orientée rendu visuel.",
    en: "One-page showcase site with 3D, GSAP animations, custom cursor, snap scroll and contact form. Modern frontend stack focused on visual rendering.",
  },

  // Book info
  "book.info.overview": {
    fr: "Oui, c'est un vrai livre. Les Chroniques de Jez est une saga de dark fantasy en 4 tomes écrite par Moi :) — la saga est complète, les 4 tomes sont disponibles sur Amazon. Une épopée de guerre, de secrets et de destins brisés.",
    en: "Yes, it's a real book. The Chronicles of Jez is a 4-volume dark fantasy saga written by Me :) — the saga is complete, all 4 volumes are available on Amazon. An epic of war, secrets and shattered destiny.",
  },
  "book.info.stack": {
    fr: "Next.js 14 (App Router) · React 18 · TypeScript 5 · Tailwind CSS 3.4 · Framer Motion 11 · Lucide React · pnpm",
    en: "Next.js 14 (App Router) · React 18 · TypeScript 5 · Tailwind CSS 3.4 · Framer Motion 11 · Lucide React · pnpm",
  },
  "book.info.stack.desc": {
    fr: "Landing page de la saga avec particules canvas, parallax, protection spoiler, carte SVG de l'univers et fiches personnages. Design sombre/rubis avec animations au scroll.",
    en: "Saga landing page with canvas particles, parallax, spoiler protection, SVG universe map and character cards. Dark/ruby design with scroll animations.",
  },

  // Mood info
  "mood.info.overview": {
    fr: "MoodMovie est une Appli qui recommande des films, séries, livres et musique selon votre humeur. Choisissez une émotion et découvrez du contenu qui matche ce que vous ressentez — avec un système de favoris.",
    en: "MoodMovie recommends movies, shows, books and music based on your mood. Choose an emotion and discover content that matches how you feel — with a favorites system.",
  },
  "mood.info.stack": {
    fr: "Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5 · Tailwind CSS 3.4 · Radix UI + shadcn/ui · Lucide React · TMDB API · Vercel · pnpm",
    en: "Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5 · Tailwind CSS 3.4 · Radix UI + shadcn/ui · Lucide React · TMDB API · Vercel · pnpm",
  },
  "mood.info.stack.desc": {
    fr: "App de recommandation basée sur l'émotion avec APIs externes (TMDB, livres, musique), pages SEO statiques, système de favoris en localStorage et preview audio.",
    en: "Emotion-based recommendation app with external APIs (TMDB, books, music), static SEO pages, localStorage favorites system and audio preview.",
  },

  // ═══════ Design System overlay ═══════
  "ds.badge": { fr: "Mon design system", en: "My design system" },
  "ds.ghost.label": { fr: "Clique-moi 👋", en: "Click me 👋" },
  "ds.title": { fr: "Design System", en: "Design System" },
  "ds.close": { fr: "Fermer", en: "Close" },
  "ds.copied": { fr: "Copié —", en: "Copied —" },
  "ds.footer": { fr: "Documentation vivante de ce portfolio.", en: "Living documentation of this portfolio." },

  "ds.nav.foundations": { fr: "Fondations", en: "Foundations" },
  "ds.nav.components": { fr: "Composants", en: "Components" },
  "ds.nav.states": { fr: "États", en: "States" },
  "ds.nav.motion": { fr: "Motion", en: "Motion" },
  "ds.nav.responsive": { fr: "Responsive", en: "Responsive" },
  "ds.nav.process": { fr: "Méthode", en: "Method" },
  "ds.nav.governance": { fr: "Gouvernance", en: "Governance" },

  // Hero
  "ds.canvas.hint": { fr: "Survolez un calque · cliquez pour copier", en: "Hover a layer · click to copy" },
  "ds.canvas.peer.design": { fr: "Design", en: "Design" },
  "ds.canvas.peer.dev": { fr: "Front-end", en: "Front-end" },
  "ds.hero.kicker": { fr: "Design system · portfolio 2026", en: "Design system · portfolio 2026" },
  "ds.hero.title.1": { fr: "Un système,", en: "A system," },
  "ds.hero.title.2": { fr: "pas une collection d'écrans.", en: "not a pile of screens." },
  "ds.hero.desc": {
    fr: "Cette page documente les décisions derrière ce portfolio : jetons, composants, états, mouvement et méthode. Chaque bloc ci-dessous est le composant réel, pas une capture d'écran.",
    en: "This page documents the decisions behind this portfolio — tokens, components, states, motion and method. Every block below is the live component, not a screenshot.",
  },
  "ds.hero.cta.1": { fr: "Parcourir le système", en: "Browse the system" },
  "ds.hero.cta.2": { fr: "Voir la méthode", en: "See the method" },
  "ds.hero.stat": { fr: "4 thèmes · 7 familles · 6 pas d'espacement", en: "4 themes · 7 type families · 6 spacing steps" },

  // 01 Fondations
  "ds.f.kicker": { fr: "FONDATIONS", en: "FOUNDATIONS" },
  "ds.f.title.1": { fr: "Les", en: "The" },
  "ds.f.title.2": { fr: "Fondations", en: "Foundations" },
  "ds.f.lead": {
    fr: "Aucune couleur n'est écrite en dur dans un composant. Chaque section du portfolio expose quatre rôles — fond, texte, accent, atténué — et tout le reste s'y branche. Cliquez un échantillon pour copier son jeton.",
    en: "No color is hard-coded in a component. Every portfolio section exposes four roles — background, text, accent, muted — and everything else plugs into them. Click a swatch to copy its token.",
  },
  "ds.f.neutral": { fr: "Rampe neutre — OKLCH", en: "Neutral ramp — OKLCH" },
  "ds.f.type": { fr: "Typographie — 7 familles", en: "Type — 7 families" },
  "ds.f.extra": { fr: "Jetons complémentaires", en: "Additional tokens" },
  "ds.f.extra.alt": { fr: "Accent secondaire", en: "Secondary accent" },
  "ds.f.extra.alt.desc": {
    fr: "Le roman porte un rubis en plus de son accent principal — étoiles, mention « vérifié », bouton d'achat. Les trois autres thèmes déclarent le rôle mais le font retomber sur --section-accent : le système gagne un rôle, pas une couleur inventée.",
    en: "The novel carries a ruby alongside its main accent — stars, the “verified” note, the buy button. The other three themes declare the role but fall back to --section-accent: the system gains a role, not an invented colour.",
  },
  "ds.f.extra.state": { fr: "États de validation", en: "Validation states" },
  "ds.f.extra.state.desc": {
    fr: "Hors thème, volontairement : une erreur ne change pas de sens d'une section à l'autre. Le formulaire portait deux verts différents pour un même succès — il n'en reste qu'un.",
    en: "Deliberately outside the themes: an error does not change meaning from one section to the next. The form carried two different greens for one success state — only one remains.",
  },
  "ds.f.extra.grad": { fr: "Dégradés MoodMovie", en: "MoodMovie gradients" },
  "ds.f.extra.grad.desc": {
    fr: "Deux dégradés distincts : l'un pour les boutons, l'autre pour les titres. Propres à cette section, ils ne sont pas déclinés dans les autres thèmes — aucun composant partagé ne les consomme.",
    en: "Two distinct gradients: one for buttons, one for headings. Specific to this section, they are not declined across the other themes — no shared component consumes them.",
  },

  "ds.f.type.body": { fr: "Corps & interface", en: "Body & interface" },
  "ds.f.type.mono": { fr: "Données & numéros", en: "Data & numerals" },
  "ds.f.type.editorial": { fr: "Accent éditorial", en: "Editorial accent" },
  "ds.f.type.agency": { fr: "Titres agence", en: "Agency headings" },
  "ds.f.type.book": { fr: "Machine à écrire", en: "Typewriter" },
  "ds.f.type.novel": { fr: "Le roman", en: "The novel" },
  "ds.f.type.mood": { fr: "Titres MoodMovie", en: "MoodMovie headings" },
  "ds.f.space": { fr: "Espacement — 6 pas", en: "Spacing — 6 steps" },
  "ds.f.space.desc": {
    fr: "4 · 8 · 12 · 16 · 24 · 32. Six pas suffisent. Au-delà, c'est une nouvelle mise en page, pas un nouvel espacement.",
    en: "4 · 8 · 12 · 16 · 24 · 32. Six steps are enough. Beyond that it's a new layout, not a new spacing value.",
  },
  "ds.f.radius": { fr: "Rayon & élévation", en: "Radius & elevation" },

  // 02 Composants
  "ds.c.kicker": { fr: "BIBLIOTHÈQUE", en: "LIBRARY" },
  "ds.c.title.1": { fr: "Ma", en: "My" },
  "ds.c.title.2": { fr: "Bibliothèque", en: "Library" },
  "ds.c.lead": {
    fr: "Treize composants portent le portfolio et cette documentation. Quatre primitives partagées — libellé, titre, et trois rôles de bouton — habillent les quatre sections ; celles présentées ci-dessous (bouton, étiquette, champ, carte) sont propres au panneau. Unifier les deux familles reste le chantier ouvert.",
    en: "Thirteen components carry the portfolio and this documentation. Four shared primitives — label, heading, and three button roles — dress all four sections; the ones shown below (button, tag, field, card) belong to the panel. Unifying both families is the open piece of work.",
  },
  "ds.c.actions": { fr: "Actions", en: "Actions" },
  "ds.c.actions.desc": {
    fr: "Une seule action primaire par vue. Le ghost ne porte jamais une action destructive.",
    en: "One primary action per view. Ghost never carries a destructive action.",
  },
  "ds.c.primary": { fr: "Primaire", en: "Primary" },
  "ds.c.secondary": { fr: "Secondaire", en: "Secondary" },
  "ds.c.tags": { fr: "Étiquettes", en: "Tags" },
  "ds.c.tags.desc": {
    fr: "Les étiquettes décrivent, elles ne cliquent pas. Un filtre cliquable est un bouton.",
    en: "Tags describe, they don't click. A clickable filter is a button.",
  },
  "ds.c.form": { fr: "Formulaire", en: "Form" },
  "ds.c.form.email": { fr: "Adresse e-mail", en: "Email address" },
  "ds.c.form.mission": { fr: "Mission", en: "Project" },
  "ds.c.form.collab": { fr: "Collaboration", en: "Collaboration" },
  "ds.c.card": { fr: "Carte projet", en: "Project card" },
  "ds.c.card.title": { fr: "MoodMovie", en: "MoodMovie" },
  "ds.c.card.body": {
    fr: "Recommandation de films et musique selon l'humeur. Next.js 16, API TMDB, favoris en localStorage.",
    en: "Mood-based movie and music recommendations. Next.js 16, TMDB API, localStorage favorites.",
  },
  "ds.c.card.meta": { fr: "Application · 2025", en: "Application · 2025" },
  "ds.c.live": { fr: "Les primitives du portfolio, en direct", en: "The portfolio's primitives, live" },
  "ds.c.live.desc": {
    fr: "Ce bloc n'est pas une maquette : ce sont les composants que les quatre sections utilisent vraiment. Le sélecteur part du thème depuis lequel vous avez ouvert ce panneau — changez-en et regardez la police, le rayon et le traitement de l'accent basculer. Chaque section garde son identité ; c'est le rôle qui ne bouge pas.",
    en: "This block is not a mock-up: these are the components the four sections actually use. The picker starts on the theme you opened this panel from — switch it and watch the family, the radius and the accent treatment change. Each section keeps its identity; it is the role that stays put.",
  },
  "ds.c.live.kicker": { fr: "Libellé de section", en: "Section label" },
  "ds.c.live.picker": { fr: "Prévisualiser dans le thème", en: "Preview in theme" },
  "ds.c.live.title": { fr: "Un rôle,", en: "One role," },
  "ds.c.live.accent": { fr: "quatre identités.", en: "four identities." },
  "ds.c.inventory": { fr: "Inventaire des composants", en: "Component inventory" },
  "ds.c.th.component": { fr: "Composant", en: "Component" },
  "ds.c.th.variants": { fr: "Variantes", en: "Variants" },
  "ds.c.th.usage": { fr: "Usage", en: "Usage" },
  "ds.c.th.status": { fr: "Statut", en: "Status" },
  "ds.status.stable": { fr: "Stable", en: "Stable" },
  "ds.status.review": { fr: "Révision", en: "Review" },
  "ds.status.beta": { fr: "Beta", en: "Beta" },
  "ds.inv.usage.global": { fr: "Toutes les pages", en: "Every page" },
  "ds.inv.usage.shell": { fr: "Coquille du site", en: "Site shell" },
  "ds.inv.usage.nav": { fr: "Navigation", en: "Navigation" },
  "ds.inv.usage.projects": { fr: "Sections projets", en: "Project sections" },
  "ds.inv.usage.contact": { fr: "Contact", en: "Contact" },
  "ds.inv.usage.docs": { fr: "Documentation", en: "Documentation" },
  "ds.inv.usage.book": { fr: "Section livre", en: "Book section" },
  "ds.inv.usage.sections": { fr: "Les quatre sections", en: "All four sections" },

  // 03 États & accessibilité
  "ds.s.kicker": { fr: "ÉTATS & A11Y", en: "STATES & A11Y" },
  "ds.s.title.1": { fr: "Les", en: "The" },
  "ds.s.title.2": { fr: "États", en: "States" },
  "ds.s.lead": {
    fr: "Un composant sans ses états n'est pas terminé. Les cinq états sont définis avant la première maquette, et le focus clavier est un choix de design, jamais un anneau bleu par défaut.",
    en: "A component without its states isn't finished. All five are defined before the first mockup, and keyboard focus is a design decision — never a default blue ring.",
  },
  "ds.s.five": { fr: "Les cinq états", en: "The five states" },
  "ds.s.send": { fr: "Envoyer", en: "Send" },
  "ds.s.contrast": { fr: "Contraste mesuré", en: "Measured contrast" },
  "ds.s.contrast.desc": {
    fr: "Ratios calculés sur la luminance relative WCAG 2.1, pas estimés à l'œil. Chaque paire texte / fond du portfolio passe au minimum AA.",
    en: "Ratios computed from WCAG 2.1 relative luminance, not eyeballed. Every text / background pair in the portfolio clears AA at minimum.",
  },
  "ds.s.checklist": { fr: "Checklist livraison", en: "Shipping checklist" },
  "ds.s.a11y.1": { fr: "Cible tactile ≥ 44 px", en: "Touch target ≥ 44 px" },
  "ds.s.a11y.2": { fr: "Ordre de tabulation suivant la lecture", en: "Tab order follows reading order" },
  "ds.s.a11y.3": { fr: "Libellé associé à chaque champ", en: "Every field has a bound label" },
  "ds.s.a11y.4": { fr: "Erreur annoncée par texte, pas par couleur seule", en: "Errors announced by text, never color alone" },
  "ds.s.a11y.5": { fr: "prefers-reduced-motion respecté partout", en: "prefers-reduced-motion honored everywhere" },

  // 04 Motion
  "ds.m.kicker": { fr: "MOTION", en: "MOTION" },
  "ds.m.title.1": { fr: "Le", en: "The" },
  "ds.m.title.2": { fr: "Mouvement", en: "Motion" },
  "ds.m.lead": {
    fr: "Trois durées, deux courbes — les valeurs réellement utilisées dans ce portfolio. Le mouvement explique une relation entre deux états ; il ne décore pas.",
    en: "Three durations, two curves — the values actually used across this portfolio. Motion explains a relationship between two states; it doesn't decorate.",
  },
  "ds.m.tokens": { fr: "Jetons de mouvement", en: "Motion tokens" },
  "ds.m.note": {
    fr: "Ces trois jetons cadencent le panneau. Les quatre sections du portfolio s'appuient encore sur les durées utilitaires de Tailwind — de 200 à 700 ms, le plus souvent 500 — avec la même courbe de sortie. Unifier les deux échelles est le prochain chantier.",
    en: "These three tokens pace this panel. The four portfolio sections still rely on Tailwind's utility durations — 200 to 700 ms, most often 500 — with the same easing curve. Unifying both scales is the next piece of work.",
  },
  "ds.m.fast": { fr: "retour d'état", en: "state feedback" },
  "ds.m.base": { fr: "entrée au scroll", en: "scroll reveal" },
  "ds.m.slow": { fr: "entrée de titre", en: "title reveal" },
  "ds.m.demo": { fr: "Démonstration", en: "Demo" },
  "ds.m.demo.enter": { fr: "entrée", en: "enter" },
  "ds.m.demo.feedback": { fr: "retour", en: "feedback" },
  "ds.m.demo.loading": { fr: "chargement", en: "loading" },
  "ds.m.replay": { fr: "Rejouer", en: "Replay" },

  // 05 Responsive
  "ds.r.kicker": { fr: "RESPONSIVE", en: "RESPONSIVE" },
  "ds.r.title.1": { fr: "Le", en: "The" },
  "ds.r.title.2": { fr: "Responsive", en: "Responsive" },
  "ds.r.lead": {
    fr: "Deux points de rupture, une seule grille — ceux de Tailwind, aucun breakpoint maison. Faites glisser pour voir la grille projets se réorganiser.",
    en: "Two breakpoints, one grid — Tailwind's own, no custom ones. Drag the handle to watch the project grid reflow.",
  },
  "ds.r.slider": { fr: "Largeur de la fenêtre simulée", en: "Simulated viewport width" },
  "ds.r.compact": { fr: "compact", en: "compact" },
  "ds.r.xs": { fr: "Très compact", en: "Extra compact" },
  "ds.r.medium": { fr: "médium", en: "medium" },
  "ds.r.large": { fr: "large", en: "large" },
  "ds.r.xs.desc": {
    fr: "Nav empilée, panneau d'infos rétréci, bouton de fermeture réduit. Sous 640 px, les cartes de services et de méthode s'empilent en paquet collant ; sous 768 px, les flèches latérales disparaissent et le badge du système passe en bas à gauche.",
    en: "Stacked nav, narrower info panel, smaller close button. Under 640 px the service and method cards turn into a sticky deck; under 768 px the side arrows disappear and the system badge moves to the bottom left.",
  },
  "ds.r.compact.desc": { fr: "1 colonne, marges 20 px, titres réduits.", en: "1 column, 20 px gutters, smaller headings." },
  "ds.r.medium.desc": { fr: "2 colonnes, navigation repliée.", en: "2 columns, collapsed navigation." },
  "ds.r.large.desc": { fr: "4 colonnes, marges 32 px.", en: "4 columns, 32 px gutters." },

  // 06 Méthode
  "ds.p.kicker": { fr: "MÉTHODE", en: "METHOD" },
  "ds.p.title.1": { fr: "Ma", en: "My" },
  "ds.p.title.2": { fr: "Méthode", en: "Method" },
  "ds.p.lead": {
    fr: "Le système ne commence pas par une couleur. Il commence par ce que les gens essaient de faire.",
    en: "The system doesn't start with a color. It starts with what people are trying to do.",
  },
  "ds.p.1.title": { fr: "Recherche", en: "Research" },
  "ds.p.1.desc": {
    fr: "Entretiens, tri de cartes, analytics existante. Sortie : trois tâches prioritaires et deux irritants récurrents.",
    en: "Interviews, card sorting, existing analytics. Output: three priority tasks and two recurring pain points.",
  },
  "ds.p.2.title": { fr: "Wireframes", en: "Wireframes" },
  "ds.p.2.desc": {
    fr: "Gris, rapides, jetables. On valide la hiérarchie avant d'ouvrir la palette.",
    en: "Grey, fast, disposable. Hierarchy gets validated before the palette opens.",
  },
  "ds.p.3.title": { fr: "Prototype", en: "Prototype" },
  "ds.p.3.desc": {
    fr: "Cliquable, testé sur cinq personnes. Ce qui casse ici ne part pas en développement.",
    en: "Clickable, tested on five people. What breaks here doesn't reach development.",
  },
  "ds.p.4.title": { fr: "Système", en: "System" },
  "ds.p.4.desc": {
    fr: "Les motifs qui se répètent trois fois deviennent des composants documentés.",
    en: "Patterns that repeat three times become documented components.",
  },
  "ds.p.flow": { fr: "Flow — prise de contact", en: "Flow — getting in touch" },
  "ds.p.flow.1": { fr: "Grille projets", en: "Project grid" },
  "ds.p.flow.2": { fr: "Étude de cas", en: "Case study" },
  "ds.p.flow.3": { fr: "Formulaire (3 champs)", en: "Form (3 fields)" },
  "ds.p.flow.4": { fr: "Confirmation + délai de réponse", en: "Confirmation + response time" },
  "ds.p.flow.desc": {
    fr: "Quatre écrans, aucune impasse : chaque état d'erreur renvoie à l'étape précédente sans perdre la saisie.",
    en: "Four screens, no dead ends: every error state returns to the previous step without losing input.",
  },

  // 07 Gouvernance
  "ds.g.kicker": { fr: "GOUVERNANCE", en: "GOVERNANCE" },
  "ds.g.title.1": { fr: "La", en: "The" },
  "ds.g.title.2": { fr: "Gouvernance", en: "Governance" },
  "ds.g.lead": {
    fr: "Un système vit ou meurt selon la facilité qu'on a à y contribuer. Voici les règles que je m'impose.",
    en: "A system lives or dies by how easy it is to contribute to. These are the rules I hold myself to.",
  },
  "ds.g.do": { fr: "À faire", en: "Do" },
  "ds.g.do.1": { fr: "Passer par les jetons de section — jamais un hex dans un composant.", en: "Go through section tokens — never a hex inside a component." },
  "ds.g.do.2": { fr: "Une police par rôle : Geist porte l'interface, les autres portent un contexte.", en: "One family per role: Geist carries the UI, the others carry a context." },
  "ds.g.do.3": { fr: "Documenter une variante au moment où elle est créée, pas après.", en: "Document a variant the moment it's created, not later." },
  "ds.g.do.4": { fr: "Vérifier le contraste au calcul, pas à l'œil.", en: "Verify contrast by computation, not by eye." },
  "ds.g.dont": { fr: "À éviter", en: "Avoid" },
  "ds.g.dont.1": { fr: "Une cinquième identité typographique de section.", en: "A fifth per-section type identity." },
  "ds.g.dont.2": { fr: "Une animation sans garde prefers-reduced-motion.", en: "An animation with no prefers-reduced-motion guard." },
  "ds.g.dont.3": { fr: "Un accent hors des quatre thèmes de section.", en: "An accent outside the four section themes." },
  "ds.g.dont.4": { fr: "Une couleur porteuse de sens sans doublon textuel.", en: "Meaning carried by color with no text equivalent." },
  "ds.g.versions": { fr: "Cycle de version", en: "Release cycle" },
  "ds.g.v14": {
    fr: "Coque de panneau plein écran extraite en composant réutilisable, accent qui suit la section d'ouverture, section Méthode dans le studio.",
    en: "Full-screen panel shell extracted into a reusable component, accent that follows the opening section, Method section in the studio.",
  },
  "ds.g.v13": {
    fr: "Primitives partagées par les quatre sections (libellé, titre, trois rôles de bouton), accent secondaire et états de validation extraits en jetons, cibles tactiles à 44 px, garde de mouvement sur 100 % des animations.",
    en: "Primitives shared by all four sections (label, heading, three button roles), secondary accent and validation states extracted into tokens, 44 px touch targets, motion guard on 100% of animations.",
  },
  "ds.g.v12": { fr: "Panneau de documentation, rampe neutre OKLCH, contrastes recalculés.", en: "Documentation panel, OKLCH neutral ramp, contrasts recomputed." },
  "ds.g.v11": { fr: "Jetons de mouvement extraits, focus visible normalisé.", en: "Motion tokens extracted, visible focus normalized." },
  "ds.g.v10": { fr: "Quatre thèmes de section et composants de base.", en: "Four section themes and base components." },

}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr")

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "fr" ? "en" : "fr"))
  }, [])

  // Tient <html lang> aligné sur la langue affichée.
  useEffect(() => {
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA"
  }, [lang])

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
