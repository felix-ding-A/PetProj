import { Resend } from 'resend'
import { z } from 'zod'

const InquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().email('Valid work email is required'),
  whatsapp: z.string().max(60).optional().default(''),
  company: z.string().min(1, 'Company name is required').max(140),
  country: z.string().min(1, 'Country is required').max(100),
  formulaStatus: z.enum(['own-formula', 'need-optimization', 'reference-product', 'idea-only']),
  optimizationFocus: z.string().max(500).optional().default(''),
  referenceUrl: z.string().max(500).optional().default(''),
  dosageForms: z.string().optional().default('[]'),
  orderVolume: z.string().max(120).optional().default(''),
  species: z.string().optional().default('[]'),
  healthFunctions: z.string().max(500).optional().default(''),
  keyIngredients: z.string().max(3000).optional().default(''),
  targetMarkets: z.string().optional().default('[]'),
  needsComplianceDocs: z.string().optional().default('false'),
  shortlist: z.string().optional().default('[]'),
})

const ALLOWED_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'xlsx', 'csv'])
const MAX_FILES = 3
const MAX_TOTAL_BYTES = 4 * 1024 * 1024 // 4 MB total (within Vercel 4.5MB limit)

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const rawFields: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        rawFields[key] = value
      }
    }

    const parsed = InquirySchema.safeParse(rawFields)
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message || 'Invalid inquiry fields' },
        { status: 400 }
      )
    }

    const uploadedFiles = formData
      .getAll('attachments')
      .filter((v): v is File => v instanceof File && v.size > 0)

    if (uploadedFiles.length > MAX_FILES) {
      return Response.json({ error: `Maximum ${MAX_FILES} attachments allowed.` }, { status: 400 })
    }

    let totalBytes = 0
    const attachments: { filename: string; content: Buffer }[] = []

    for (const file of uploadedFiles) {
      const ext = file.name.split('.').pop()?.toLowerCase() || ''
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return Response.json(
          { error: `Unsupported file type ".${ext}". Allowed: pdf, doc, docx, xlsx, csv.` },
          { status: 400 }
        )
      }
      totalBytes += file.size
      if (totalBytes > MAX_TOTAL_BYTES) {
        return Response.json(
          { error: 'Total attachment size exceeds the 4 MB limit.' },
          { status: 400 }
        )
      }
      const arrayBuffer = await file.arrayBuffer()
      attachments.push({
        filename: file.name,
        content: Buffer.from(arrayBuffer),
      })
    }

    const data = parsed.data
    const htmlBody = `
      <h2>New B2B Pet Supplement OEM/ODM Inquiry</h2>
      <p><strong>Name:</strong> ${data.name} (${data.email})</p>
      <p><strong>Company:</strong> ${data.company} · <strong>Country:</strong> ${data.country} · <strong>WhatsApp:</strong> ${data.whatsapp || 'N/A'}</p>
      <hr />
      <p><strong>Formula Status:</strong> ${data.formulaStatus}</p>
      <p><strong>Optimization Notes:</strong> ${data.optimizationFocus || 'N/A'}</p>
      <p><strong>Reference Product:</strong> ${data.referenceUrl || 'N/A'}</p>
      <p><strong>Dosage Forms:</strong> ${data.dosageForms}</p>
      <p><strong>Order Volume:</strong> ${data.orderVolume}</p>
      <p><strong>Target Species:</strong> ${data.species}</p>
      <p><strong>Health Functions:</strong> ${data.healthFunctions || 'N/A'}</p>
      <p><strong>Key Ingredients / Packaging:</strong> ${data.keyIngredients || 'N/A'}</p>
      <p><strong>Target Markets:</strong> ${data.targetMarkets}</p>
      <p><strong>Needs Compliance Docs / COA:</strong> ${data.needsComplianceDocs}</p>
      <p><strong>Quote Box Shortlist:</strong> ${data.shortlist}</p>
      <p><strong>Attached NDA Files:</strong> ${attachments.length}</p>
    `

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.INQUIRY_TO_EMAIL || 'sales@novapetnutra.com'
    const fromEmail = process.env.INQUIRY_FROM_EMAIL || 'onboarding@resend.dev'

    if (apiKey) {
      const resend = new Resend(apiKey)
      const result = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: data.email,
        subject: `[OEM Inquiry] ${data.company} — ${data.formulaStatus}`,
        html: htmlBody,
        attachments,
      })

      if (result.error) {
        return Response.json({ error: result.error.message }, { status: 502 })
      }
      return Response.json({ ok: true, id: result.data?.id })
    }

    // Local dev dry-run when RESEND_API_KEY is not yet configured
    if (process.env.NODE_ENV !== 'production') {
      console.info('[DEV DRY-RUN] Inquiry received:', {
        company: data.company,
        email: data.email,
        attachments: attachments.map((a) => a.filename),
      })
      return Response.json({ ok: true, mode: 'dev-dry-run' })
    }

    return Response.json({ error: 'RESEND_API_KEY is not configured' }, { status: 500 })
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}

