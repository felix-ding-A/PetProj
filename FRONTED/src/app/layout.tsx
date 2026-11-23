import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { QuoteBoxProvider } from '@/lib/quote-context'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { QuoteBoxDrawer } from '@/components/layout/QuoteBoxDrawer'
import { JsonLd, SITE_URL, buildOrganizationJsonLd } from '@/components/seo/JsonLd'
import { isUsingDevSeed } from '@/lib/data'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Pawsome Labs | Custom Pet Supplement OEM & Private Label',
    template: '%s',
  },
  description:
    'FDA-registered, cGMP contract manufacturer of custom pet supplements: chewable tablets, capsules, meal topper powders, liquid drops, and nutritional pastes.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Pawsome Labs',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const showDevSeedBanner = isUsingDevSeed()

  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="antialiased selection:bg-pawzo-gold selection:text-pawzo-ink min-h-screen flex flex-col">
        <JsonLd data={buildOrganizationJsonLd()} />
        {showDevSeedBanner && (
          <div className="bg-amber-950 text-pawzo-goldText text-[11px] font-extrabold text-center py-1.5 px-4 tracking-wide">
            DEV SEED DATA ACTIVE — Set NEXT_PUBLIC_SANITY_PROJECT_ID to connect live Sanity CMS content
          </div>
        )}
        <QuoteBoxProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <QuoteBoxDrawer />
        </QuoteBoxProvider>
      </body>
    </html>
  )
}

