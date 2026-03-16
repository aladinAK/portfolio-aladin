import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Special_Elite, UnifrakturMaguntia } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/lib/i18n'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700", "900"] });
const specialElite = Special_Elite({ subsets: ["latin"], variable: "--font-typewriter", weight: "400" });
const fraktur = UnifrakturMaguntia({ subsets: ["latin"], variable: "--font-fantasy", weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL('https://aladinakkari.ca'),
  title: {
    default: 'Aladin Akkari — Développeur Frontend & Designer',
    template: '%s | Aladin Akkari',
  },
  description: 'Portfolio de Aladin Akkari — Développeur Frontend & Designer basé à Montréal. 5+ ans d\'expérience en React, Vue, Next.js, Tailwind. Disponible pour des projets freelance.',
  keywords: ['développeur frontend', 'designer web', 'portfolio', 'React', 'Vue', 'Next.js', 'Tailwind', 'Montréal', 'freelance', 'Aladin Akkari'],
  authors: [{ name: 'Aladin Akkari', url: 'https://aladinakkari.ca' }],
  creator: 'Aladin Akkari',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://aladinakkari.ca',
    siteName: 'Aladin Akkari',
    title: 'Aladin Akkari — Développeur Frontend & Designer',
    description: 'Portfolio créatif avec scroll horizontal — expérience, projets, agence web, roman fantasy.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aladin Akkari — Développeur Frontend & Designer',
    description: 'Portfolio créatif avec scroll horizontal — expérience, projets, agence web, roman fantasy.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700,900&display=swap" />
      </head>
      <body className={`font-sans antialiased ${geist.variable} ${geistMono.variable} ${playfair.variable} ${specialElite.variable} ${fraktur.variable}`}>
        <I18nProvider>
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
