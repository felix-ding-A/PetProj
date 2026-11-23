import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JsonLd, buildBreadcrumbJsonLd } from './JsonLd'

export interface BreadcrumbItem {
  name: string
  href: string
}

export function Breadcrumbs({
  items,
  light = false,
}: {
  items: BreadcrumbItem[]
  light?: boolean
}) {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol
          className={`flex flex-wrap items-center gap-1.5 text-xs font-semibold ${
            light ? 'text-white/80' : 'text-pawzo-muted'
          }`}
        >
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                {isLast ? (
                  <span className={light ? 'text-pawzo-goldText font-bold' : 'text-pawzo-ink font-bold'}>
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={
                      light
                        ? 'hover:text-pawzo-goldText transition-colors'
                        : 'hover:text-pawzo-ink transition-colors'
                    }
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

