import { Resend } from 'resend'
import { z } from 'zod'

const InquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().email('Valid work email is required').max(160),
  whatsapp: z.string().max(60).optional().default(''),
  company: z.string().min(1, 'Company name is required').max(140),
  country: z.string().min(1, 'Country is required').max(100),
  formulaStatus: z.enum(['own-formula', 'need-optimization', 'reference-product', 'idea-only']),
  optimizationFocus: z.string().max(500).optional().default(''),
  referenceUrl: z.string().max(500).optional().default(''),
  dosageForms: z.string().max(600).optional().default('[]'),
  orderVolume: z.string().max(120).optional().default(''),
  species: z.string().max(300).optional().default('[]'),
  healthFunctions: z.string().max(500).optional().default(''),
  keyIngredients: z.string().max(3000).optional().default(''),
  targetMarkets: z.string().max(500).optional().default('[]'),
  needsComplianceDocs: z.string().max(500).optional().default('[]'),
  shortlist: z.string().max(2000).optional().default('[]'),
  // Client-captured visitor metadata
  clientPageUrl: z.string().max(1000).optional().default(''),
  clientReferrer: z.string().max(1000).optional().default(''),
  clientTimezone: z.string().max(100).optional().default(''),
  clientLanguage: z.string().max(50).optional().default(''),
  clientScreen: z.string().max(40).optional().default(''),
  // Anti-bot fields
  websiteUrl: z.string().max(200).optional().default(''),
  formLoadedAt: z.string().max(30).optional().default(''),
  turnstileToken: z.string().max(2048).optional().default(''),
})

const MAX_JSON_BYTES = 32 * 1024 // 32 KB hard payload limit (text-only JSON, zero file uploads)
const MIN_HUMAN_FILL_MS = 2500 // 2.5 seconds minimum fill time

// Sliding-window IP rate limiter (5 requests / 15 minutes per IP)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 5
const ipHits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (ipHits.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, recent)
    return true
  }
  recent.push(now)
  ipHits.set(ip, recent)
  if (ipHits.size > 1000) {
    const oldestKey = ipHits.keys().next().value
    if (oldestKey) ipHits.delete(oldestKey)
  }
  return false
}

// Reject obvious XSS / script / code-injection payloads
const MALICIOUS_PATTERN =
  /(<\s*script\b|<\s*iframe\b|<\s*object\b|<\s*embed\b|javascript\s*:|vbscript\s*:|data\s*:\s*text\/html|on(?:error|load|click|mouseover|focus)\s*=|document\.cookie|\beval\s*\()/i

function containsMaliciousPayload(fields: Record<string, string>): boolean {
  for (const [key, val] of Object.entries(fields)) {
    if (key === 'turnstileToken') continue
    if (MALICIOUS_PATTERN.test(val)) return true
  }
  return false
}

function stripControlChars(str: string): string {
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim()
}

// Prevent SMTP / email header injection (CR/LF removal)
function sanitizeHeaderValue(str: string): string {
  return stripControlChars(str).replace(/[\r\n]+/g, ' ')
}

function escapeHtml(str: string): string {
  return stripControlChars(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function safeDecode(val: string | null): string {
  if (!val) return ''
  try {
    return decodeURIComponent(val)
  } catch {
    return val
  }
}

function parseUserAgent(ua: string): { browser: string; os: string; device: string } {
  let browser = 'Unknown Browser'
  if (/Edg\//i.test(ua)) browser = 'Microsoft Edge'
  else if (/OPR\/|Opera/i.test(ua)) browser = 'Opera'
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = 'Google Chrome'
  else if (/Firefox\//i.test(ua)) browser = 'Mozilla Firefox'
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Apple Safari'

  let os = 'Unknown OS'
  if (/Windows NT/i.test(ua)) os = 'Windows'
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS'
  else if (/Mac OS X/i.test(ua)) os = 'macOS'
  else if (/Android/i.test(ua)) os = 'Android'
  else if (/Linux/i.test(ua)) os = 'Linux'

  let device = 'Desktop'
  if (/iPad|Tablet/i.test(ua)) device = 'Tablet'
  else if (/Mobile|iPhone|Android/i.test(ua)) device = 'Mobile'

  return { browser, os, device }
}

function extractVisitorMetadata(
  req: Request,
  client: {
    pageUrl: string
    referrer: string
    timezone: string
    language: string
    screen: string
  }
) {
  const h = req.headers

  const forwarded = h.get('x-forwarded-for')?.split(',')[0]?.trim() || ''
  const ip = h.get('cf-connecting-ip') || h.get('x-real-ip') || forwarded || 'Unknown (Localhost)'

  const geoCountry = h.get('x-vercel-ip-country') || h.get('cf-ipcountry') || ''
  const geoRegion = safeDecode(h.get('x-vercel-ip-country-region') || h.get('cf-region'))
  const geoCity = safeDecode(h.get('x-vercel-ip-city') || h.get('cf-ipcity'))
  const geoLat = h.get('x-vercel-ip-latitude') || h.get('cf-iplatitude') || ''
  const geoLon = h.get('x-vercel-ip-longitude') || h.get('cf-iplongitude') || ''
  const geoTz = h.get('x-vercel-ip-timezone') || h.get('cf-timezone') || client.timezone || 'Unknown'

  const locationParts = [geoCity, geoRegion, geoCountry].filter(Boolean)
  const location = locationParts.length > 0 ? locationParts.join(', ') : 'Unavailable (Local Dev)'
  const coordinates = geoLat && geoLon ? `${geoLat}, ${geoLon}` : 'N/A'

  const userAgent = h.get('user-agent') || 'Unknown'
  const parsedUa = parseUserAgent(userAgent)
  const acceptLanguage = h.get('accept-language') || client.language || 'Unknown'
  const refererHeader = h.get('referer') || ''

  return {
    ip,
    location,
    coordinates,
    timezone: geoTz,
    browserSummary: `${parsedUa.browser} on ${parsedUa.os} (${parsedUa.device})`,
    userAgent,
    language: client.language || acceptLanguage,
    screen: client.screen || 'Unknown',
    pageUrl: client.pageUrl || refererHeader || 'N/A',
    referrer: client.referrer || 'Direct / None',
    submittedAtUtc: new Date().toISOString(),
  }
}

function isOriginAllowed(req: Request): boolean {
  if (process.env.NODE_ENV !== 'production') return true
  const origin = req.headers.get('origin')
  if (!origin) return true
  const host = req.headers.get('host')
  try {
    const originHost = new URL(origin).host
    if (host && originHost === host) return true
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (siteUrl) {
      const normalized = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`
      if (originHost === new URL(normalized).host) return true
    }
  } catch {
    return false
  }
  return false
}

export async function POST(req: Request) {
  try {
    // 1. CSRF / Origin check in production
    if (!isOriginAllowed(req)) {
      return Response.json({ error: 'Invalid request origin.' }, { status: 403 })
    }

    // 2. Strict JSON-only content type & 32 KB body size cap (no file uploads accepted)
    const contentType = req.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return Response.json({ error: 'Content-Type must be application/json.' }, { status: 415 })
    }

    const rawText = await req.text()
    if (Buffer.byteLength(rawText, 'utf8') > MAX_JSON_BYTES) {
      return Response.json({ error: 'Payload too large.' }, { status: 413 })
    }

    let jsonBody: Record<string, unknown>
    try {
      jsonBody = JSON.parse(rawText)
    } catch {
      return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 })
    }

    const rawFields: Record<string, string> = {}
    for (const [key, value] of Object.entries(jsonBody || {})) {
      if (typeof value === 'string') {
        rawFields[key] = stripControlChars(value)
      }
    }

    const parsed = InquirySchema.safeParse(rawFields)
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message || 'Invalid inquiry fields' },
        { status: 400 }
      )
    }

    const data = parsed.data

    // 3. Honeypot trap: silently succeed without sending email
    if (data.websiteUrl.trim().length > 0) {
      return Response.json({ ok: true })
    }

    // 4. Human fill-time check (reject sub-2.5s automated bot submissions)
    const loadedAt = Number(data.formLoadedAt)
    if (Number.isFinite(loadedAt) && loadedAt > 0 && Date.now() - loadedAt < MIN_HUMAN_FILL_MS) {
      return Response.json(
        { error: 'Submission too fast. Please review your inquiry details and try again.' },
        { status: 429 }
      )
    }

    // 5. Visitor metadata + IP rate limiting
    const visitor = extractVisitorMetadata(req, {
      pageUrl: data.clientPageUrl,
      referrer: data.clientReferrer,
      timezone: data.clientTimezone,
      language: data.clientLanguage,
      screen: data.clientScreen,
    })

    if (isRateLimited(visitor.ip)) {
      return Response.json(
        { error: 'Too many inquiries from your network. Please wait 15 minutes and try again.' },
        { status: 429, headers: { 'Retry-After': '900' } }
      )
    }

    // 6. Strict Cloudflare Turnstile verification whenever TURNSTILE_SECRET_KEY is configured
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim()
    if (turnstileSecret) {
      if (!data.turnstileToken) {
        return Response.json(
          { error: 'Please complete the human verification check before submitting.' },
          { status: 400 }
        )
      }
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: data.turnstileToken,
          remoteip: visitor.ip,
        }),
      })
      const verifyJson = (await verifyRes.json()) as { success?: boolean }
      if (!verifyJson.success) {
        return Response.json({ error: 'Human verification failed. Please retry.' }, { status: 400 })
      }
    }

    // 7. Malicious script / XSS injection filter
    if (containsMaliciousPayload(rawFields)) {
      return Response.json(
        { error: 'Potentially unsafe characters or script content detected in your submission.' },
        { status: 400 }
      )
    }

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E1B16; max-width: 680px;">
        <h2 style="margin-bottom: 12px; color: #1E1B16;">New B2B Pet Supplement OEM/ODM Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr><td style="padding: 6px 0; width: 180px;"><strong>Name:</strong></td><td>${escapeHtml(data.name)} (${escapeHtml(data.email)})</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Company:</strong></td><td>${escapeHtml(data.company)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Country (Form):</strong></td><td>${escapeHtml(data.country)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>WhatsApp / Phone:</strong></td><td>${escapeHtml(data.whatsapp || 'N/A')}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Formula Status:</strong></td><td>${escapeHtml(data.formulaStatus)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Optimization Notes:</strong></td><td>${escapeHtml(data.optimizationFocus || 'N/A')}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Reference Product:</strong></td><td>${escapeHtml(data.referenceUrl || 'N/A')}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Dosage Forms:</strong></td><td>${escapeHtml(data.dosageForms)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Order Volume:</strong></td><td>${escapeHtml(data.orderVolume)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Target Species:</strong></td><td>${escapeHtml(data.species)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Health Functions:</strong></td><td>${escapeHtml(data.healthFunctions || 'N/A')}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Key Ingredients:</strong></td><td>${escapeHtml(data.keyIngredients || 'N/A')}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Target Markets:</strong></td><td>${escapeHtml(data.targetMarkets)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Needs COA / Docs:</strong></td><td>${escapeHtml(data.needsComplianceDocs)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Quote Box Shortlist:</strong></td><td>${escapeHtml(data.shortlist)}</td></tr>
        </table>

        <div style="background: #FAF8F4; border: 1px solid #EAE3D2; border-radius: 12px; padding: 16px; font-size: 13px;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #92400E;">Visitor Metadata &amp; Lead Intelligence</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 4px 0; width: 160px;"><strong>IP Address:</strong></td><td>${escapeHtml(visitor.ip)}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Geo Location:</strong></td><td>${escapeHtml(visitor.location)} (Coords: ${escapeHtml(visitor.coordinates)})</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Timezone:</strong></td><td>${escapeHtml(visitor.timezone)}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Browser / Device:</strong></td><td>${escapeHtml(visitor.browserSummary)}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Screen / Language:</strong></td><td>${escapeHtml(visitor.screen)} · ${escapeHtml(visitor.language)}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Submitted Page:</strong></td><td>${escapeHtml(visitor.pageUrl)}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Referrer Source:</strong></td><td>${escapeHtml(visitor.referrer)}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Timestamp (UTC):</strong></td><td>${escapeHtml(visitor.submittedAtUtc)}</td></tr>
            <tr><td style="padding: 4px 0; vertical-align: top;"><strong>User-Agent:</strong></td><td style="color: #6E6659; word-break: break-all;">${escapeHtml(visitor.userAgent)}</td></tr>
          </table>
        </div>
      </div>
    `

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.INQUIRY_TO_EMAIL || 'sales@novapetnutra.com'
    const fromEmail = process.env.INQUIRY_FROM_EMAIL || 'onboarding@resend.dev'

    const safeSubject = sanitizeHeaderValue(
      `[OEM Inquiry] ${data.company} (${visitor.location}) — ${data.formulaStatus}`
    )
    const safeReplyTo = sanitizeHeaderValue(data.email)

    if (apiKey) {
      const resend = new Resend(apiKey)
      const result = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: safeReplyTo,
        subject: safeSubject,
        html: htmlBody,
      })

      if (result.error) {
        return Response.json({ error: result.error.message }, { status: 502 })
      }
      return Response.json({ ok: true, id: result.data?.id })
    }

    if (process.env.NODE_ENV !== 'production') {
      console.info('[DEV DRY-RUN] Inquiry received:', {
        company: data.company,
        email: safeReplyTo,
        visitor,
      })
      return Response.json({ ok: true, mode: 'dev-dry-run', visitor })
    }

    return Response.json({ error: 'RESEND_API_KEY is not configured' }, { status: 500 })
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}
