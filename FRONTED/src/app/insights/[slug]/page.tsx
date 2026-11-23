import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInsightBySlug, getInsights } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd, SITE_URL } from '@/components/seo/JsonLd'
import { CTABanner } from '@/components/sections/CommonSections'

export const revalidate = 60

export async function generateStaticParams() {
  const articles = await getInsights()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getInsightBySlug(slug)
  if (!post) return {}
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/insights/${post.slug}` },
  }
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getInsightBySlug(slug)
  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Pawsome Labs', url: SITE_URL },
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />

      <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Insights', href: '/insights' },
            { name: post.title, href: `/insights/${post.slug}` },
          ]}
        />

        <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
          {post.category} · {post.publishedAt} · {post.readTime}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-pawzo-ink tracking-tight mt-2 leading-tight">
          {post.title}
        </h1>
        <p className="text-xs font-semibold text-pawzo-muted mt-3">By {post.author}</p>

        <div className="mt-8 space-y-8">
          {post.sections.map((sec) => (
            <section key={sec.heading} className="space-y-3">
              <h2 className="text-xl font-extrabold text-pawzo-ink">{sec.heading}</h2>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base text-pawzo-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {post.relatedForms.length > 0 && (
          <div className="mt-10 p-6 rounded-2xl bg-pawzo-creamDeep border border-pawzo-border">
            <div className="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-3">
              Related Manufacturing Capabilities
            </div>
            <div className="flex flex-wrap gap-2.5">
              {post.relatedForms.map((f) => (
                <Link
                  key={f}
                  href={`/${f}-manufacturing`}
                  className="px-4 py-2 rounded-full bg-white border border-pawzo-border hover:border-pawzo-gold text-xs font-extrabold text-pawzo-ink capitalize"
                >
                  {f.replace('-', ' ')} Manufacturing →
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <CTABanner />
    </>
  )
}

