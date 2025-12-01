import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Ivanov Portfolio',
    short_name: 'AI Ivanov',
    description: 'Creative Software Engineer Portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
