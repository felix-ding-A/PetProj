import Image from 'next/image'
import Link from 'next/link'
import { Building2, FlaskConical, PackageCheck, ShieldCheck, Video } from 'lucide-react'
import type { GalleryItemData } from '@/lib/data/types'

const CATEGORY_LABELS: Record<GalleryItemData['category'], string> = {
  facility: 'Production Line',
  packaging: 'Packaging & Samples',
  certification: 'Certification & Audit',
  lab: 'QC Laboratory',
}

const DEFAULT_HIGHLIGHTS = [
  {
    icon: Building2,
    tag: 'PRODUCTION LINE',
    title: 'Below-38°C Cold Extrusion & Tablet Suites',
    desc: 'Temperature-controlled stainless-steel extrusion lines preserving heat-sensitive probiotics, enzymes, and marine omega-3s.',
  },
  {
    icon: PackageCheck,
    tag: 'PACKAGING & FBA PREP',
    title: 'Jars, Barrier Pouches, Droppers & ABL Tubes',
    desc: 'Automated induction sealing, desiccant insertion, lot/expiry laser coding, and direct FNSKU carton prep.',
  },
  {
    icon: FlaskConical,
    tag: 'QC LABORATORY',
    title: 'In-House Aw, Hardness & Potency Screening',
    desc: 'Every production lot is verified in-process and released alongside independent ISO/IEC 17025 third-party COAs.',
  },
  {
    icon: ShieldCheck,
    tag: 'AUDIT READINESS',
    title: 'FDA-Registered cGMP, ISO 22000 & HACCP',
    desc: 'Full batch genealogy, allergen line-clearance SOPs, and retention samples stored for full shelf-life traceability.',
  },
]

export function FacilityGallery({
  items,
  title = 'Inside Our cGMP Pet Supplement Factory & Packaging Suites',
  subtitle = 'Real production suites, packaging formats, and quality lab stations supporting 500-unit pilot launches through global wholesale volume.',
}: {
  items: GalleryItemData[]
  title?: string
  subtitle?: string
}) {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
        <div className="max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
            FACILITY, PACKAGING &amp; QC VISUALS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mt-1">
            {title}
          </h2>
          <p className="text-sm text-brand-muted mt-1.5 leading-relaxed">{subtitle}</p>
        </div>
        <Link
          href="/contact-us"
          className="px-5 py-2.5 rounded-full bg-white border border-brand-border hover:border-brand-gold text-xs font-extrabold text-brand-ink inline-flex items-center gap-2 self-start md:self-auto transition-colors"
        >
          <Video className="w-4 h-4 text-amber-800" />
          <span>Book Virtual Factory Tour</span>
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <figure
              key={item.id}
              className="soft-card rounded-3xl overflow-hidden flex flex-col bg-white"
            >
              <div className="relative w-full aspect-[4/3] bg-brand-cream">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-ink/85 text-brand-goldText text-[10px] font-extrabold uppercase tracking-wider">
                  {CATEGORY_LABELS[item.category]}
                </span>
              </div>
              <figcaption className="p-5 space-y-1">
                <div className="font-extrabold text-sm text-brand-ink">{item.title}</div>
                {item.caption && (
                  <p className="text-xs text-brand-muted leading-relaxed">{item.caption}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DEFAULT_HIGHLIGHTS.map((h) => {
            const Icon = h.icon
            return (
              <div key={h.title} className="soft-card rounded-3xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-creamDeep border border-brand-border flex items-center justify-center text-amber-800 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                    {h.tag}
                  </div>
                  <h3 className="font-extrabold text-base text-brand-ink">{h.title}</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">{h.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

