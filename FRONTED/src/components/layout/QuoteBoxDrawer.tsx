'use client'

import Link from 'next/link'
import { X, Trash2, ArrowRight } from 'lucide-react'
import { useQuoteBox } from '@/lib/quote-context'

export function QuoteBoxDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, toastMessage } = useQuoteBox()

  return (
    <>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="B2B Quote Box">
          <div
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-brand-cream border-l border-brand-border shadow-2xl flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <h2 className="font-extrabold text-lg text-brand-ink">
                  Your Quote Shortlist ({items.length})
                </h2>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="w-8 h-8 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-ink cursor-pointer"
                  aria-label="Close Quote Box"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="my-4 bg-brand-creamDeep p-3.5 rounded-xl border border-brand-border text-xs font-semibold text-brand-ink">
                Collect turnkey private label categories or dosage forms here — they will automatically
                pre-fill your B2B Inquiry Form.
              </div>

              <div className="space-y-3 max-h-[56vh] overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <div className="text-center py-12 text-xs text-brand-muted font-semibold">
                    Your quote box is empty. Browse our 65 turnkey private label categories to add formulas.
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3.5 rounded-2xl border border-brand-border flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-extrabold text-xs sm:text-sm text-brand-ink">
                          {item.label}
                        </div>
                        <div className="text-[11px] font-bold text-amber-800 mt-0.5">
                          {item.form} · {item.moqTier}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-full hover:bg-brand-cream text-brand-muted hover:text-red-600 transition-colors cursor-pointer"
                        aria-label={`Remove ${item.label}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border space-y-3">
              <Link
                href="/contact-us"
                onClick={closeDrawer}
                className="w-full py-3.5 rounded-full pill-gold-btn text-sm font-extrabold flex items-center justify-center gap-2"
              >
                <span>Attach Shortlist to Inquiry Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-center text-brand-muted">
                Protected by Mutual NDA · 24-hour formulation desk response
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-brand-ink text-white px-5 py-3 rounded-full shadow-xl text-xs font-bold flex items-center gap-2"
        >
          <span className="text-brand-goldText">●</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  )
}

