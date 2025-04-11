export default function sitemap() {
  return [
    {
      url: 'https://tomasarras.com.ar/es',
      lastModified: new Date(),
      alternates: {
        languages: {
          'en': 'https://tomasarras.com.ar/en',
        },
      },
    },
    {
      url: 'https://tomasarras.com.ar/en',
      lastModified: new Date(),
      alternates: {
        languages: {
          'es': 'https://tomasarras.com.ar/es',
        },
      },
    },
  ]
}