import { MetadataRoute } from 'next';

/**
* Generates the sitemap routes with metadata including last modified, change frequency, and priority.
* @example
* sitemap()
* [
*   { url: 'https://roots2global.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
*   { url: 'https://roots2global.com/products', ... }
* ]
* @returns {MetadataRoute.Sitemap} Sitemap metadata array for valid routes.
**/
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roots2global.com';

  const routes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}

