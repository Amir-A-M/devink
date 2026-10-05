import NavigationProgress from '@/components/NavigationProgress'
import { siteConfig } from '@/lib/site'
import '@/styles/tailwind.css'
import { type Metadata, type Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Suspense } from 'react'
import ThemeProvider from './theme-provider'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  // Every relative URL below — canonicals, social images, the sitemap — is
  // resolved against this. Set NEXT_PUBLIC_SITE_URL to your own domain.
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: '/',
    locale: siteConfig.locale,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
}

// Runs before the first paint so a dark-mode visitor never sees a white flash.
// ThemeProvider reads the same key after hydration; this only front-runs it.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark-mode'){document.documentElement.classList.add('dark')}}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={beVietnamPro.className} suppressHydrationWarning>
      <head>
        {/* Almost every image on the site comes from these two CDNs, and the
            first request to each would otherwise wait on DNS + TLS. */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${siteConfig.url}#organization`,
                  name: siteConfig.name,
                  url: siteConfig.url,
                },
                {
                  '@type': 'WebSite',
                  '@id': `${siteConfig.url}#website`,
                  name: siteConfig.name,
                  url: siteConfig.url,
                  description: siteConfig.description,
                  publisher: { '@id': `${siteConfig.url}#organization` },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: `${siteConfig.url}/search?s={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
        {/* Reads searchParams, so it needs its own boundary or the whole page
            opts out of static rendering. */}
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <ThemeProvider>
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
