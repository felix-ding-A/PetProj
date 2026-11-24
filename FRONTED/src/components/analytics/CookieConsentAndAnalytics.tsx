'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

type ConsentChoice = 'all' | 'essential' | null

const CONSENT_KEY = 'novapet-cookie-consent'
const OPEN_EVENT = 'novapet:open-cookie-settings'

const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || '').replace(/[^a-zA-Z0-9_-]/g, '')
const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_ID || '').replace(/[^a-zA-Z0-9_-]/g, '')

export function CookieSettingsTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="hover:text-white transition-colors cursor-pointer"
    >
      Cookie Preferences
    </button>
  )
}

export function CookieConsentAndAnalytics() {
  const [consent, setConsent] = useState<ConsentChoice>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY)
      if (saved === 'all' || saved === 'essential') {
        setConsent(saved)
        setVisible(false)
      } else {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }

    const handleReopen = () => setVisible(true)
    window.addEventListener(OPEN_EVENT, handleReopen)
    return () => window.removeEventListener(OPEN_EVENT, handleReopen)
  }, [])

  const choose = (choice: 'all' | 'essential') => {
    setConsent(choice)
    setVisible(false)
    try {
      window.localStorage.setItem(CONSENT_KEY, choice)
    } catch {
      // Ignore storage quota errors
    }
  }

  return (
    <>
      {/* Strictly gated third-party analytics: only loaded after explicit 'all' consent */}
      {consent === 'all' && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {consent === 'all' && CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}

      {/* Unobtrusive bottom-left GDPR Cookie Banner (clear of bottom-right WhatsApp button) */}
      {visible && (
        <aside
          role="dialog"
          aria-label="Cookie Preferences"
          className="fixed bottom-5 left-5 right-20 sm:right-auto z-50 max-w-md bg-brand-ink text-white border border-white/15 rounded-2xl p-5 shadow-2xl space-y-3"
        >
          <div className="text-xs font-extrabold uppercase tracking-wider text-brand-goldText">
            Cookie &amp; Privacy Preferences
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            We use essential browser storage for your Quote Box and Cloudflare Turnstile security. Optional
            analytics cookies (GA4 / Clarity) are only enabled if you click <strong>Accept All</strong>.{' '}
            <Link href="/privacy-policy" className="underline text-brand-goldText hover:text-white">
              Privacy &amp; Cookie Policy
            </Link>
          </p>
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => choose('all')}
              className="pill-gold-btn px-4 py-2 rounded-full text-xs font-extrabold cursor-pointer"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => choose('essential')}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </aside>
      )}
    </>
  )
}

