import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Special_Elite, IM_Fell_English, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/lib/i18n'
import { CustomCursor } from '@/components/custom-cursor'
import { DsLauncher } from '@/components/design-system/ds-launcher'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700", "900"] });
const specialElite = Special_Elite({ subsets: ["latin"], variable: "--font-typewriter", weight: "400" });
const fell = IM_Fell_English({ subsets: ["latin"], variable: "--font-fantasy", weight: "400", style: ["normal", "italic"] });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aladinakkari.ca'),
  title: {
    default: 'Aladin Akkari — Développeur Frontend & Designer | Montréal',
    template: '%s | Aladin Akkari',
  },
  description: 'Développeur frontend senior et designer UI/UX à Montréal. 5+ ans en React, Next.js, Vue et Tailwind. Sites vitrines, e-commerce et design systems.',
  keywords: ['développeur frontend', 'designer web', 'portfolio', 'React', 'Vue', 'Next.js', 'Tailwind', 'Montréal', 'freelance', 'Aladin Akkari', 'frontend developer', 'web designer', 'Gameaddik'],
  authors: [{ name: 'Aladin Akkari', url: 'https://aladinakkari.ca' }],
  creator: 'Aladin Akkari',
  alternates: {
    canonical: 'https://aladinakkari.ca',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    alternateLocale: 'en_CA',
    url: 'https://aladinakkari.ca',
    siteName: 'Aladin Akkari',
    title: 'Aladin Akkari — Développeur Frontend & Designer',
    description: 'Portfolio créatif avec scroll horizontal — expérience, projets, roman fantasy, app MoodMovie.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Aladin Akkari — Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aladin Akkari — Développeur Frontend & Designer',
    description: 'Portfolio créatif avec scroll horizontal — expérience, projets, roman fantasy, app MoodMovie.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

const person = {
  '@type': 'Person',
  '@id': 'https://aladinakkari.ca/#aladin',
  name: 'Aladin Akkari',
  url: 'https://aladinakkari.ca',
  image: 'https://aladinakkari.ca/perso.png',
  jobTitle: 'Senior Frontend Developer & UI/UX Designer',
  description:
    "Développeur frontend et designer UI/UX basé à Montréal. Sites vitrines, e-commerce, design systems et interfaces sur mesure.",
  email: 'mailto:aladinakdesign@gmail.com',
  worksFor: { '@type': 'Organization', name: 'Gameaddik' },
  address: { '@type': 'PostalAddress', addressLocality: 'Montréal', addressRegion: 'QC', addressCountry: 'CA' },
  knowsLanguage: ['fr-CA', 'en-CA'],
  sameAs: [
    'https://linkedin.com/in/aladin-akkari',
    'https://github.com/aladinAK',
    'https://www.behance.net/aladinakkari1',
  ],
  knowsAbout: [
    'React', 'Next.js', 'Vue', 'Nuxt', 'TypeScript', 'Tailwind CSS',
    'UI/UX Design', 'Design System', 'Figma', 'E-commerce', 'Shopify',
    'WordPress', 'Webflow', 'SEO', 'Accessibilité web',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Développeur frontend et designer UI/UX',
    occupationLocation: { '@type': 'City', name: 'Montréal' },
    skills: 'React, Next.js, Vue, TypeScript, Tailwind CSS, Figma, design system, e-commerce, Shopify, SEO',
  },
}

const website = {
  '@type': 'WebSite',
  '@id': 'https://aladinakkari.ca/#site',
  url: 'https://aladinakkari.ca',
  name: 'Aladin Akkari — Portfolio',
  inLanguage: ['fr-CA', 'en-CA'],
  publisher: { '@id': 'https://aladinakkari.ca/#aladin' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [person, website],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`font-sans antialiased ${geist.variable} ${geistMono.variable} ${playfair.variable} ${specialElite.variable} ${fell.variable} ${syne.variable}`}>
        <I18nProvider>
          <CustomCursor />
          <DsLauncher />
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
