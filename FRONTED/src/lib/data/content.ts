import type { CompanyDocumentData, FAQItem, InsightArticleData } from './types'

export const COMPANY_DOCUMENTS_SEED: CompanyDocumentData[] = [
  {
    id: 'doc-catalog-2026',
    title: '2026 Turnkey Private Label Pet Supplement Catalog',
    category: 'catalog',
    summary: 'Complete overview of our 65 active private label categories across chewable tablets, capsules, powders, drops, and pastes with pilot MOQs.',
    updatedAt: '2026-10-15',
    pdfUrl: null,
    fileSizeLabel: 'PDF · 4.2 MB (Upload in Sanity Studio)',
  },
  {
    id: 'doc-facility-profile',
    title: 'cGMP Manufacturing Facility & Equipment Capability Profile',
    category: 'facility',
    summary: 'Detailed breakdown of our cold-extrusion lines, encapsulation suites, liquid nitrogen-flush bottling, and vacuum paste emulsifiers.',
    updatedAt: '2026-09-20',
    pdfUrl: null,
    fileSizeLabel: 'PDF · 3.1 MB (Upload in Sanity Studio)',
  },
  {
    id: 'doc-sample-coa',
    title: 'Sample ISO-17025 Certificate of Analysis (COA) Pack',
    category: 'coa',
    summary: 'Example third-party lab report showing active potency, heavy metals (Pb/As/Cd/Hg), microbiology, and water activity verification.',
    updatedAt: '2026-10-01',
    pdfUrl: null,
    fileSizeLabel: 'PDF · 1.4 MB (Upload in Sanity Studio)',
  },
  {
    id: 'doc-compliance-checklist',
    title: 'US & EU Pet Supplement Label Compliance Checklist',
    category: 'spec-sheet',
    summary: 'Quick-reference guide covering guaranteed analysis formatting, AAFCO nutrient profile references, and EU feed additive labeling basics.',
    updatedAt: '2026-11-01',
    pdfUrl: null,
    fileSizeLabel: 'PDF · 1.8 MB (Upload in Sanity Studio)',
  },
]

export const GLOBAL_FAQS_SEED: FAQItem[] = [
  {
    question: 'What is your minimum order quantity (MOQ) for private label vs. custom OEM formulas?',
    answer: 'Stock private label formulas start at 500 jars or bottles per SKU (1,000 units for paste tubes) so you can validate market demand with low inventory risk. Bespoke custom OEM formulations typically start at 1,500–2,000 units depending on the dosage form.',
  },
  {
    question: 'How long does it take from initial inquiry to finished goods delivery?',
    answer: 'Bench samples for custom formulas ship in 7–10 business days. Once formula and label artwork are approved, turnkey private label production completes in 18–25 days, and custom OEM runs complete in 25–35 days.',
  },
  {
    question: 'Do you sign a Mutual NDA before reviewing our proprietary formula?',
    answer: 'Yes. Every custom R&D project is protected by a Mutual NDA, and you retain 100% intellectual property ownership of your custom-developed formula once R&D milestones are met.',
  },
  {
    question: 'What quality certifications and lab testing do you provide?',
    answer: 'Our manufacturing facility is FDA-registered and operates under strict cGMP, ISO 22000, and HACCP quality management systems. Every production batch is released with a third-party ISO-17025 Certificate of Analysis (COA) covering potency, heavy metals, and microbiology.',
  },
  {
    question: 'Can you ship directly to Amazon FBA or 3PL fulfillment centers in the US, EU, and UK?',
    answer: 'Yes. We provide full FBA prep including FNSKU labeling, lot/expiry coding, induction sealing, master carton labeling, and DDP palletized delivery to US, EU, and UK warehouses.',
  },
  {
    question: 'Can you help optimize an existing formula that pets refuse to eat?',
    answer: 'Absolutely. Palatability optimization is one of our core specialties. Send us your current ingredient panel or reference product via our Contact form, and our chemists will reformulate the flavor system and bitter-masking matrix.',
  },
]

export const INSIGHTS_SEED: InsightArticleData[] = [
  {
    title: 'Cold Extrusion vs. Baking: Why Temperature Makes or Breaks Pet Soft Chews',
    slug: 'cold-extrusion-vs-baking-pet-soft-chews',
    category: 'Formulation Science',
    excerpt: 'Discover how forming pet soft chews below 38°C preserves live probiotics, omega-3 fatty acids, and enzymes while improving shelf-life texture.',
    publishedAt: '2026-10-28',
    author: 'Dr. Hannah Lin, Lead Formulation Chemist',
    readTime: '6 min read',
    relatedForms: ['chewable-tablet'],
    sections: [
      {
        heading: 'The Hidden Cost of High-Heat Extrusion',
        paragraphs: [
          'Traditional baked pet treats routinely reach 120°C–160°C. While that works for simple biscuits, high heat rapidly degrades heat-sensitive nutraceuticals like Lactobacillus probiotics, digestive enzymes, and polyunsaturated EPA/DHA omega-3s.',
          'Brands that rely on baked processes often face steep overage costs—adding 2x to 3x extra active ingredients just to survive processing—or risk failing third-party potency assays halfway through shelf life.',
        ],
      },
      {
        heading: 'How No-Heat Cold Extrusion Protects Potency & Palatability',
        paragraphs: [
          'Cold extrusion forms soft chews under controlled pressure below 38°C (100°F). Because no baking oven is involved, volatile natural meat and marine palatants stay aromatic, improving dog and cat acceptance rates above 96%.',
          'Paired with strict water-activity (Aw) monitoring during conditioning, cold-extruded chews stay soft and pliable for 18–24 months without artificial humectants or harsh chemical preservatives.',
        ],
      },
    ],
    metaTitle: 'Cold Extrusion vs. Baking for Pet Soft Chews | NovaPet Nutra',
    metaDescription: 'Learn why below-38°C cold extrusion protects probiotics, omega-3s, and palatability in private label dog & cat soft chews.',
  },
  {
    title: 'Formulating for Cats: 5 Critical Safety & Palatability Rules for Pet Brands',
    slug: 'formulating-cat-supplements-safety-palatability-rules',
    category: 'Feline Nutrition',
    excerpt: 'Cats are not small dogs. Learn how to avoid feline-toxic excipients and choose the right dosage formats—from sprinkle capsules to lickable pastes.',
    publishedAt: '2026-10-14',
    author: 'NovaPet Nutra Veterinary R&D Team',
    readTime: '5 min read',
    relatedForms: ['capsule', 'paste', 'drops'],
    sections: [
      {
        heading: 'Feline-Specific Ingredient Screening',
        paragraphs: [
          'Because cats lack certain hepatic glucuronidation pathways, ingredients tolerated by dogs—such as specific essential oils, propylene glycol, and high-dose alpha-lipoic acid—must be strictly excluded from feline formulas.',
          'Every feline SKU at NovaPet Nutra undergoes an obligate-carnivore safety audit before bench sampling begins.',
        ],
      },
      {
        heading: 'Choosing the Right Dosage Form for Picky Cats',
        paragraphs: [
          'While dogs happily eat 3g–4g soft chews, many cats reject large chews. High-performing cat brands typically launch with twist-open sprinkle capsules, smooth malt or salmon-based pastes, or alcohol-free liquid drops that blend seamlessly into wet food.',
        ],
      },
    ],
    metaTitle: 'Cat Supplement Formulation: 5 Safety & Palatability Rules',
    metaDescription: 'Essential OEM guide to cat supplement safety, feline-safe excipients, and high-acceptance formats like sprinkle capsules and pastes.',
  },
  {
    title: 'How to Launch Your First Private Label Pet Supplement SKU with a 500-Unit Pilot MOQ',
    slug: 'launch-private-label-pet-supplement-500-moq',
    category: 'Brand Growth',
    excerpt: 'A practical 21-day roadmap from selecting a high-margin turnkey formula to label compliance, FBA prep, and scaling to custom OEM.',
    publishedAt: '2026-09-29',
    author: 'Marcus Chen, B2B Supply Chain Director',
    readTime: '7 min read',
    relatedForms: ['chewable-tablet', 'powder', 'drops'],
    sections: [
      {
        heading: 'Validate Demand Before Committing to 10,000 Units',
        paragraphs: [
          'Emerging DTC and Amazon pet brands often burn their launch budget on oversized inventory runs before validating product-market fit. Starting with a 500-unit turnkey private label pilot lets you test messaging, reviews, and repeat purchase rates with minimal capital risk.',
        ],
      },
      {
        heading: 'Scaling Seamlessly into Proprietary Custom OEM',
        paragraphs: [
          'Once a hero SKU hits consistent monthly velocity, transitioning from stock private label to a proprietary OEM blend unlocks higher gross margins, custom chew shapes, and defensible brand differentiation under Mutual NDA.',
        ],
      },
    ],
    metaTitle: 'Launch a Private Label Pet Supplement (500 MOQ Guide)',
    metaDescription: 'Step-by-step B2B guide to launching a private label pet supplement with a 500-unit pilot MOQ, cGMP COA compliance, and FBA prep.',
  },
  {
    title: 'Preventing Fish Oil Rancidity: Nitrogen Flushing & Antioxidant Best Practices',
    slug: 'preventing-fish-oil-rancidity-pet-liquid-supplements',
    category: 'Quality & Stability',
    excerpt: 'How peroxide testing, UV-blocking bottles, and nitrogen headspace blanketing keep wild Alaskan salmon oil fresh for 24 months.',
    publishedAt: '2026-09-12',
    author: 'Dr. Hannah Lin, Lead Formulation Chemist',
    readTime: '5 min read',
    relatedForms: ['drops'],
    sections: [
      {
        heading: 'Why Oxidized Omega-3 Oils Hurt Brand Reviews',
        paragraphs: [
          'Oxygen, light, and heat quickly oxidize delicate EPA and DHA fatty acids, creating harsh fishy odors that pets reject and triggering negative customer reviews.',
        ],
      },
      {
        heading: 'Three-Layer Oxidation Defense on the Bottling Line',
        paragraphs: [
          'We combine natural mixed tocopherols and rosemary extract in the oil tank, opaque or UV-amber packaging, and automated nitrogen headspace flushing immediately prior to induction sealing—verified by peroxide value (PV) testing on every lot COA.',
        ],
      },
    ],
    metaTitle: 'Preventing Fish Oil Rancidity in Pet Supplements | NovaPet Nutra',
    metaDescription: 'Learn how nitrogen flushing, natural antioxidants, and peroxide COA testing protect wild salmon oil pet supplements.',
  },
]

