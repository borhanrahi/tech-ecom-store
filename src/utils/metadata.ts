import siteConfig from '@/app/metadata.config'
import { Metadata } from 'next'

interface GenerateMetadataProps {
  title?: string
  description?: string
  path?: string
  image?: string
}

export function generateMetadata({
  title,
  description,
  path = '',
  image,
}: GenerateMetadataProps): Metadata {
  const metadata: Metadata = {
    title: title 
      ? `${title} | ${siteConfig.name}`
      : siteConfig.name,
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      images: [{
        url: image || siteConfig.ogImage,
        width: 1200,
        height: 630,
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Add your verification code
    },
  }
  
  return metadata
} 