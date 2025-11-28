import { MetadataRoute } from 'next';

/**
* Returns the robots metadata configuration with crawl rules and sitemap.
* @example
* robots()
* {
*   rules: [
*     {
*       userAgent: '*',
*       allow: '/',
*       disallow: ['/api/', '/seller/', '/account/', '/orders/'],
*     },
*   ],
*   sitemap: 'https://roots2global.com/sitemap.xml',
* }
* @returns {{MetadataRoute.Robots}} Robots metadata configuration.
**/
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roots2global.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/seller/', '/account/', '/orders/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

