export default function sitemap() {
  const baseUrl = 'https://tomasarras.com.ar';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/es`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/en/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/es/projects`,
          'x-default': `${baseUrl}/en/projects`,
        },
      },
    },
    {
      url: `${baseUrl}/es/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/projects`,
          'x-default': `${baseUrl}/en/projects`,
        },
      },
    },
  ];
}