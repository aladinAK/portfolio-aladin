import type { MetadataRoute } from 'next'

const BASE_URL = 'https://aladinakkari.ca'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Le portfolio est une page unique à défilement horizontal : chaque section
  // est une ancre, pas une route. On les déclare pour que les liens partagés
  // vers #book ou #mood soient compris comme des points d'entrée.
  return [
    { url: BASE_URL, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/#book`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/#mood`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
