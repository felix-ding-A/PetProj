export const COMPANY = {
  brandName: 'NovaPet Nutra',
  legalName: 'Shaanxi Ginkvora Biotechnology Co., Ltd.',
  duns: '975262249',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@novapetnutra.com',
  whatsappDisplay: '+86 18074156844',
  whatsappDigits: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8618074156844').replace(/[^\d]/g, ''),
  address: {
    full: "Room 502, Unit 1, Bldg 16, CR Land Future City Chenxi, Gangfeng Rd, International Trade & Logistics Park, Xi'an, Shaanxi, China",
    street: 'Room 502, Unit 1, Bldg 16, CR Land Future City Chenxi, Gangfeng Rd, International Trade & Logistics Park',
    city: "Xi'an",
    region: 'Shaanxi',
    country: 'CN',
  },
} as const

