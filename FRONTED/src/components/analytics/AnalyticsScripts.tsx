import Script from 'next/script'

export function AnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim()
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim()

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId.replace(/[^a-zA-Z0-9_-]/g, '')}');
            `}
          </Script>
        </>
      )}

      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId.replace(/[^a-zA-Z0-9_-]/g, '')}");
          `}
        </Script>
      )}
    </>
  )
}

