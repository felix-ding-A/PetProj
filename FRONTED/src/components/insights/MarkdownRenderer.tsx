import React from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // SEO guardrail: never render a second <h1> inside article body
          h1: ({ children }) => (
            <h2 className="text-2xl font-extrabold text-brand-ink tracking-tight pt-6 pb-2">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-extrabold text-brand-ink tracking-tight pt-6 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-extrabold text-brand-ink pt-4 pb-1.5">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-extrabold text-brand-ink pt-3 pb-1">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed pb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 pb-4 text-sm sm:text-base text-brand-muted">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 pb-4 text-sm sm:text-base text-brand-muted">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-5 pl-5 border-l-4 border-brand-gold bg-brand-creamDeep/60 py-3 pr-4 rounded-r-xl text-sm sm:text-base italic font-medium text-brand-ink">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-extrabold text-brand-ink">{children}</strong>
          ),
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-brand-creamDeep text-brand-ink text-xs font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="my-4 p-4 rounded-2xl bg-brand-ink text-white text-xs overflow-x-auto">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-2xl border border-brand-border bg-white">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-brand-creamDeep text-brand-ink font-extrabold">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 border-b border-brand-border">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-b border-brand-border/60 text-brand-muted">
              {children}
            </td>
          ),
          a: ({ href, children }) => {
            const targetHref = href || '#'
            if (targetHref.startsWith('/')) {
              return (
                <Link
                  href={targetHref}
                  className="font-bold text-amber-800 underline hover:text-brand-ink"
                >
                  {children}
                </Link>
              )
            }
            return (
              <a
                href={targetHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-800 underline hover:text-brand-ink"
              >
                {children}
              </a>
            )
          },
          img: ({ src, alt }) => {
            if (!src || typeof src !== 'string') return null
            return (
              <figure className="my-6 space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt || 'NovaPet Nutra article illustration'}
                  loading="lazy"
                  className="w-full h-auto rounded-2xl border border-brand-border bg-brand-cream"
                />
                {alt && (
                  <figcaption className="text-xs text-center text-brand-muted">{alt}</figcaption>
                )}
              </figure>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

