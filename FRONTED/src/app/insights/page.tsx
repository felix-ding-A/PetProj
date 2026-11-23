import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getInsights } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CTABanner } from '@/components/sections/CommonSections'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Pet Supplement Formulation Insights & Guides | NovaPet Nutra',
  description:
    'Technical guides on pet soft chew cold extrusion, feline toxicology safety, fish oil oxidation control, and private label launch MOQs.',
  alternates: { canonical: '/insights' },
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default async function InsightsPage() {
  const articles = await getInsights()

  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Insights & Guides', href: '/insights' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Formulation <span className="text-pawzo-goldText">Insights &amp; B2B Guides</span>
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl">
            Deep dives from our veterinary nutritionists, process engineers, and supply chain team.
          </p>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((post) => (
          <article key={post.slug} className="soft-card rounded-3xl overflow-hidden flex flex-col justify-between">
            {post.coverImageUrl && (
              <Link href={`/insights/${post.slug}`} className="relative block w-full aspect-[16/9] bg-pawzo-cream">
                <Image
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
              </Link>
            )}
            <div className="p-7 flex flex-col justify-between flex-1 gap-4">
              <div className="space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                  {post.category} · {formatDate(post.publishedAt)} · {post.readTime}
                </div>
                <h2 className="text-xl font-extrabold text-pawzo-ink leading-snug">
                  <Link href={`/insights/${post.slug}`} className="hover:text-amber-800">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-pawzo-muted leading-relaxed">{post.excerpt}</p>
              </div>
              <Link
                href={`/insights/${post.slug}`}
                className="text-xs font-extrabold text-pawzo-ink hover:text-amber-800 inline-flex items-center gap-1"
              >
                <span>Read full guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <CTABanner />
    </>
  )
}
