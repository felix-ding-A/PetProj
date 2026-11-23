import { revalidatePath, revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import type { NextRequest } from 'next/server'

interface SanityWebhookPayload {
  _type?: string
  slug?: { current?: string }
  form?: string
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return Response.json({ error: 'SANITY_REVALIDATE_SECRET is not configured' }, { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(req, secret, true)
    if (!isValidSignature) {
      return Response.json({ error: 'Invalid webhook signature' }, { status: 401 })
    }

    if (!body?._type) {
      return Response.json({ error: 'Missing document _type' }, { status: 400 })
    }

    switch (body._type) {
      case 'dosageForm':
        revalidateTag('dosageForms', 'max')
        if (body.slug?.current) revalidatePath(`/${body.slug.current}`)
        revalidatePath('/')
        revalidatePath('/sitemap.xml')
        break
      case 'product':
        revalidateTag('products', 'max')
        revalidatePath('/private-label')
        if (body.form) revalidatePath(`/private-label/${body.form}`)
        if (body.form && body.slug?.current) {
          revalidatePath(`/private-label/${body.form}/${body.slug.current}`)
        }
        revalidatePath('/sitemap.xml')
        break
      case 'companyDocument':
        revalidateTag('documents', 'max')
        revalidatePath('/')
        revalidatePath('/quality-compliance')
        revalidatePath('/our-facility')
        break
      case 'article':
        revalidateTag('articles', 'max')
        revalidatePath('/')
        revalidatePath('/insights')
        if (body.slug?.current) revalidatePath(`/insights/${body.slug.current}`)
        revalidatePath('/sitemap.xml')
        break
      case 'page':
        revalidatePath('/')
        if (body.slug?.current) revalidatePath(`/${body.slug.current}`)
        revalidatePath('/sitemap.xml')
        break
      default:
        revalidatePath('/')
    }

    return Response.json({ revalidated: true, type: body._type, now: Date.now() })
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : 'Webhook processing error' },
      { status: 500 }
    )
  }
}
