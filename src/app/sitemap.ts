import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Replace this with your actual Vercel URL once you have it
  const baseUrl = 'https://proximaditya-portfolio.vercel.app' 
 
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1, // Homepage is the most important
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'daily', // Dashboard updates daily
      priority: 0.8,
    },
  ]
}