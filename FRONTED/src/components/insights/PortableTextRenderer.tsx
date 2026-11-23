import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity/media'
import type { PortableTextBlock } from '@/lib/data/types'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-extrabold text-pawzo-ink tracking-tight pt-6 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-extrabold text-pawzo-ink pt-4 pb-1.5">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-extrabold text-pawzo-ink pt-3 pb-1">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-sm sm:text-base text-pawzo-muted leading-relaxed pb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-5 pl-5 border-l-4 border-pawzo-gold bg-pawzo-creamDeep/60 py-3 pr-4 rounded-r-xl text-sm sm:text-base italic font-medium text-pawzo-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 pb-4 text-sm sm:text-base text-pawzo-muted">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 pb-4 text-sm sm:text-base text-pawzo-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-extrabold text-pawzo-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-pawzo-creamDeep text-pawzo-ink text-xs font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = String(value?.href || '#')
      const isInternal = href.startsWith('/')
      if (isInternal) {
        return (
          <Link href={href} className="font-bold text-amber-800 underline hover:text-pawzo-ink">
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          target={value?.openInNewTab ? '_blank' : undefined}
          rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}
          className="font-bold text-amber-800 underline hover:text-pawzo-ink"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const src = urlForImage(value)
      if (!src) return null
      return (
        <figure className="my-6 space-y-2">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-pawzo-border bg-pawzo-cream">
            <Image
              src={src}
              alt={value?.alt || 'NovaPet Nutra technical illustration'}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {value?.caption && (
            <figcaption className="text-xs text-center text-pawzo-muted">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
}

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="max-w-none">
      <PortableText
        value={value as Parameters<typeof PortableText>[0]['value']}
        components={components}
      />
    </div>
  )
}

