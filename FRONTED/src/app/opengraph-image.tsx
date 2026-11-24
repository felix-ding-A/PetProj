import { ImageResponse } from 'next/og'

export const alt = 'NovaPet Nutra — Private Label Pet Nutrition & Custom OEM/ODM Manufacturing'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(125deg, #2D2315 0%, #6B5733 45%, #B48936 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 800,
              color: '#1E1B16',
            }}
          >
            N
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '30px', fontWeight: 800, display: 'flex' }}>
              <span>Nova</span>
              <span style={{ color: '#F5C443', marginLeft: '6px' }}>Pet</span>
              <span style={{ color: '#F59E0B', marginLeft: '6px' }}>Nutra</span>
            </div>
            <div style={{ fontSize: '13px', letterSpacing: '3px', color: '#E5E0D5', fontWeight: 700 }}>
              PRIVATE LABEL PET NUTRITION
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '900px' }}>
          <div style={{ fontSize: '56px', fontWeight: 800, lineHeight: 1.1 }}>
            Custom Pet Supplement OEM &amp; Private Label Manufacturing
          </div>
          <div style={{ fontSize: '24px', color: '#F5EED8', lineHeight: 1.4 }}>
            Chewable Tablets · Capsules · Meal Topper Powders · Liquid Drops · Pastes
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '24px',
            fontSize: '18px',
            color: '#FCD34D',
            fontWeight: 700,
          }}
        >
          <span>FDA-Registered Facility · cGMP · ISO 22000 · 500-Unit Pilot MOQ</span>
          <span>novapetnutra.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}

