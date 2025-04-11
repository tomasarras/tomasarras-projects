export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/en', '/es'],
      disallow: '/api/',
    },
    sitemap: 'https://tomasarras.com.ar/sitemap.xml',
  }
}