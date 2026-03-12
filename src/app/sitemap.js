export default function sitemap() {
  const baseUrl = 'https://tomasarras.com.ar';
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/es`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          'x-default': `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          'x-default': `${baseUrl}/en`,
        },
      },
    },
  ];
}