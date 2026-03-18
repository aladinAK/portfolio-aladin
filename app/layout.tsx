import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Special_Elite, UnifrakturMaguntia } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/lib/i18n'
import { CustomCursor } from '@/components/custom-cursor'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700", "900"] });
const specialElite = Special_Elite({ subsets: ["latin"], variable: "--font-typewriter", weight: "400" });
const fraktur = UnifrakturMaguntia({ subsets: ["latin"], variable: "--font-fantasy", weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL('https://aladinakkari.ca'),
  title: {
    default: 'Aladin Akkari — Développeur Frontend & Designer | Montréal',
    template: '%s | Aladin Akkari',
  },
  description: 'Portfolio de Aladin Akkari — Développeur Frontend Senior & Designer basé à Montréal. 5+ ans d\'expérience en React, Vue, Next.js, Tailwind. Projets gaming, agence web, roman fantasy.',
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
    description: 'Portfolio créatif avec scroll horizontal — expérience, projets, agence web, roman fantasy.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Aladin Akkari — Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aladin Akkari — Développeur Frontend & Designer',
    description: 'Portfolio créatif avec scroll horizontal — expérience, projets, agence web, roman fantasy.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aladin Akkari',
  url: 'https://aladinakkari.ca',
  jobTitle: 'Senior Frontend Developer & Designer',
  worksFor: { '@type': 'Organization', name: 'Gameaddik' },
  address: { '@type': 'PostalAddress', addressLocality: 'Montréal', addressRegion: 'QC', addressCountry: 'CA' },
  sameAs: [
    'https://linkedin.com/in/aladin-akkari',
    'https://github.com/aladinAK',
    'https://www.behance.net/aladinakkari1',
  ],
  knowsAbout: ['React', 'Vue', 'Next.js', 'Nuxt', 'TypeScript', 'Tailwind CSS', 'UI/UX Design', 'Figma', 'SEO'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preload" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,700,900&display=swap" as="style" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,700,900&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`font-sans antialiased ${geist.variable} ${geistMono.variable} ${playfair.variable} ${specialElite.variable} ${fraktur.variable}`}>
        <I18nProvider>
          <CustomCursor />
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
