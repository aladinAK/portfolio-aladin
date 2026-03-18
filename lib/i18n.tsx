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
  fr: "Je conçois et développe des interfaces web performantes et réactives, en alliant design et expérience utilisateur. Je crée des composants réutilisables et optimise chaque projet pour la performance et le SEO, notamment dans le secteur du gaming.",
  en: "I design and develop responsive, high-performance web interfaces, blending design with user experience. I build reusable components and optimize every project for performance and SEO, especially in the gaming sector."
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
  fr: "De l'étude utilisateur à la réalisation de prototypes Figma, je conçois des interfaces qui allient esthétique, ergonomie et fonctionnalité.",
  en: "From user research to Figma prototypes, I design interfaces that blend aesthetics, usability, and functionality."
},
"svc.2.title": { fr: "Animation Web", en: "Web Animation" },
"svc.2.desc": {
  fr: "Je crée des animations subtiles et engageantes — transitions fluides, micro-interactions, parallax — pour rendre l’expérience web vivante et intuitive.",
  en: "I create subtle, engaging web animations — smooth transitions, micro-interactions, parallax — to make web experiences lively and intuitive."
},
"svc.3.title": { fr: "SEO & Performance", en: "SEO & Performance" },
"svc.3.desc": {
  fr: "Optimisation des Core Web Vitals, mise en place de stratégies SEO et suivi analytics pour garantir des sites rapides, visibles et performants.",
  en: "Optimizing Core Web Vitals, implementing SEO strategies, and monitoring analytics to ensure fast, visible, and high-performing websites."
},

// Projects
"proj.label": { fr: "03 / PROJETS", en: "03 / PROJECTS" },
"proj.title.1": { fr: "Mes", en: "My" },
"proj.title.2": { fr: "Travaux", en: "Work" },
"proj.cta": { fr: "Voir le projet", en: "View project" },
"proj.0.d0": {
  fr: "Plateforme marketing gaming — dashboard analytique complet pour améliorer la visibilité et orienter les décisions grâce aux données.",
  en: "Gaming marketing platform — comprehensive analytics dashboard to boost visibility and guide data-driven decisions."
},
"proj.0.d1": {
  fr: "Visualisation des données en temps réel et système d'authentification sécurisé.",
  en: "Real-time data visualization and secure authentication system."
},
"proj.0.d2": {
  fr: "Projet ambitieux combinant développement frontend et backend pour un impact maximal.",
  en: "Ambitious project combining frontend and backend development for maximum impact."
},
"proj.1.d0": {
  fr: "Refonte complète d’un site en collaboration avec l'équipe design — de la direction créative à l’implémentation technique.",
  en: "Complete website redesign in collaboration with the design team — from creative direction to technical implementation."
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
  en: "Promotional landing pages for major titles — Genshin Impact, Game of Thrones, Raid: Shadow Legends."
},
"proj.2.d1": {
  fr: "Deux refontes complètes du site principal avec amélioration des indicateurs SEO.",
  en: "Two full website redesigns with improved SEO metrics."
},
"proj.2.d2": {
  fr: "Intégration Google Tag Manager et analytics, avec un design graphique pensé pour la mise en valeur visuelle.",
  en: "Google Tag Manager and analytics integration, with graphic design focused on visual impact."
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

  // Book section
  "book.label": { fr: "Roman", en: "Novel" },
  "book.store": { fr: "Librairie", en: "Bookstore" },
  "book.series": { fr: "Les Chroniques de Jez", en: "The Chronicles of Jez" },
  "book.main.1": { fr: "Les", en: "The" },
  "book.main.2": { fr: "Chroniques", en: "Chronicles" },
  "book.main.3": { fr: "de Jez", en: "of Jez" },
  "book.subtitle": {
    fr: "Une épopée de guerre, de secrets et de destinée brisée.",
    en: "An epic of war, secrets and shattered destiny.",
  },
  "book.by": { fr: "par", en: "by" },
  "book.cta": { fr: "Découvrir la saga", en: "Discover the saga" },
  "book.quote": {
    fr: "Une épopée de guerre, de secrets et de destins brisés.",
    en: "An epic of war, secrets and shattered destiny.",
  },
  "book.scroll": { fr: "Défiler", en: "Scroll" },
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
  "book.t4.status": { fr: "En préparation", en: "In preparation" },
  "book.coming": { fr: "Bientôt", en: "Soon" },
  "book.store.cta": { fr: "Pour plus d'informations", en: "For more information" },
  "book.author.quote": {
    fr: "L'héroïsme, ce n'est pas l'absence de peur. C'est savoir ce qu'on perd avant de choisir.",
    en: "Heroism isn't absence of fear. It's knowing what you lose before choosing.",
  },

  // MoodMovie section
  "mood.cta": { fr: "Essayer l'app", en: "Try the app" },
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
