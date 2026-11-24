import type { DosageFormData } from './types'

export const DOSAGE_FORMS_SEED: DosageFormData[] = [
  {
    name: 'Chewable Tablets & Soft Chews',
    slug: 'chewable-tablet-manufacturing',
    shortSlug: 'chewable-tablet',
    pastelBg: '#D8EEDB',
    tagline: 'Cold-extruded & compressed pet chews engineered for 96%+ palatability and heat-sensitive active stability.',
    heroDescription:
      'From bone-shaped compressed tablets to no-heat cold-extruded soft chews, our cGMP lines preserve live probiotics, omega-3s, and joint actives while masking bitter botanicals.',
    moq: '500 jars (Private Label) / 2,000 jars (Custom OEM)',
    leadTime: '21–28 days after artwork approval',
    skuSummary: '23 turnkey categories · 168+ base formulas',
    whyChoosePoints: [
      {
        title: 'Palatability & Bitter-Note Masking',
        description:
          'Natural duck, salmon, liver, and pumpkin flavor systems paired with micro-encapsulation mask bitter actives like MSM, turmeric, and herbal extracts.',
      },
      {
        title: 'No-Heat Cold Extrusion (<38°C)',
        description:
          'Low-shear cold extrusion protects heat-labile probiotics, digestive enzymes, and fish oils while delivering consistent soft-chew texture.',
      },
      {
        title: 'Controlled Hardness & Low Friability',
        description:
          'In-process hardness, moisture (Aw), and friability testing prevents crumbling during international shipping and Amazon FBA fulfillment.',
      },
    ],
    customizationOptions: [
      { label: 'Shapes & Molds', details: 'Bone, heart, paw, round, clover, and custom brand-embossed dies (1.5g – 5.0g)' },
      { label: 'Base Matrices', details: 'Grain-free chickpea/sweet potato, oat & flaxseed, hydrolyzed protein, or hypoallergenic vegan base' },
      { label: 'Flavor Systems', details: 'Natural duck, Alaskan salmon, peanut butter, bacon-free hickory, chicken liver, pumpkin & sweet potato' },
      { label: 'Packaging', details: '60/90/120ct PET or PCR jars with induction seal, stand-up barrier pouches with zipper, nitrogen-flushed tubs' },
    ],
    processSteps: [
      { step: '01', title: 'Formula & Palatability Screening', description: 'Verify active compatibility, moisture activity, and flavor-masking targets for dogs or cats.' },
      { step: '02', title: 'Precision V-Blending', description: 'Uniform dispersion of micro-dosed vitamins, probiotics, and functional botanicals.' },
      { step: '03', title: 'Cold Extrusion or Compression', description: 'Form chews below 38°C or compress scored chewable tablets with tight weight tolerance.' },
      { step: '04', title: 'Conditioning & Aw Control', description: 'Controlled curing tunnels lock in soft texture and prevent mold or hardening over shelf life.' },
      { step: '05', title: 'QC Testing & COA Release', description: 'ISO-17025 potency, heavy metals, microbiology, and seal-integrity testing before dispatch.' },
    ],
    specs: {
      materials: 'Natural meat/plant palatants, cold-pressed oils, grain-free binders, non-GMO starches',
      formats: 'Soft chews (2g–4g), scored chewable tablets (0.8g–2.5g), jars & pouches',
      moq: '500 jars (stock private label) · 2,000 jars (custom formulation)',
      shelfLife: '18–24 months (ambient, moisture-barrier sealed)',
    },
    faqs: [
      {
        question: 'What is the difference between cold-extruded soft chews and compressed chewable tablets?',
        answer: 'Cold-extruded soft chews have a moist, treat-like texture ideal for picky dogs and heat-sensitive actives. Compressed chewable tablets offer lower moisture activity, longer 24-month stability, and precise scored dosing.',
      },
      {
        question: 'Can you formulate grain-free and chicken-free chews for allergy-prone dogs?',
        answer: 'Yes. Over 60% of our canine chew projects use grain-free chickpea or sweet potato binders with duck, salmon, or plant-based flavor systems free of chicken, soy, and corn.',
      },
      {
        question: 'How do you keep probiotics alive inside soft chews?',
        answer: 'We use spore-forming strains (such as Bacillus coagulans) or micro-encapsulated Lactobacillus combined with below-38°C cold extrusion and water-activity (Aw) control.',
      },
      {
        question: 'What is the minimum order quantity for custom chew shapes?',
        answer: 'Stock shapes (heart, bone, paw, round) start at 500–2,000 jars. Custom logo-embossed molds require a one-time tooling fee and typically start at 3,000 jars.',
      },
      {
        question: 'Do you provide palatability samples before bulk production?',
        answer: 'Yes. We ship bench samples via DHL Express in 7–10 business days so your team can run acceptance testing before locking in the production run.',
      },
      {
        question: 'Are your chewable products tested for heavy metals and microbiology?',
        answer: 'Every production lot undergoes third-party ISO-17025 lab testing for active potency, heavy metals (Pb, As, Cd, Hg), Salmonella, E. coli, yeast, and mold, with a full COA supplied.',
      },
    ],
    metaTitle: 'Pet Soft Chew & Chewable Tablet Manufacturer | NovaPet Nutra',
    metaDescription: 'cGMP contract manufacturer of dog & cat soft chews and chewable tablets. Cold extrusion, high palatability, 500-jar pilot MOQ, and full COA.',
  },
  {
    name: 'Pet Capsules',
    slug: 'capsule-manufacturing',
    shortSlug: 'capsule',
    pastelBg: '#D9E2EC',
    tagline: 'Twist-open, sprinkle, and enteric-coated pet capsules built for high-potency clinical formulas.',
    heroDescription:
      'Ideal for concentrated veterinary actives, feline probiotics, and oxygen-sensitive antioxidants where zero binders and exact milligram dosing matter most.',
    moq: '500 bottles (Private Label) / 1,500 bottles (Custom OEM)',
    leadTime: '18–25 days after artwork approval',
    skuSummary: '5 core clinical categories · clean-label fills',
    whyChoosePoints: [
      {
        title: 'Versatile Shell Technologies',
        description:
          'Bovine gelatin, plant-based HPMC, pullulan, and easy-twist sprinkle capsules designed for clean mixing into wet cat or dog food.',
      },
      {
        title: 'Acid-Resistant Enteric Protection',
        description:
          'Delayed-release HPMC shells protect live probiotic CFU counts and delicate enzymes through harsh canine and feline gastric acid.',
      },
      {
        title: 'Light & Moisture Barrier Packaging',
        description:
          'Amber glass, opaque HDPE, or blister packs with desiccant canisters shield light-sensitive vitamins, SAMe, and omega powders.',
      },
    ],
    customizationOptions: [
      { label: 'Capsule Sizes', details: 'Size #4, #3, #2 (cats & small breeds), #1, #0, #00 (medium & large dogs)' },
      { label: 'Shell Materials', details: 'Pharmaceutical gelatin, vegetarian HPMC, delayed-release enteric HPMC, flavor-tinted shells' },
      { label: 'Fill Types', details: 'Clean-label powder blends, micro-pellets, beadlets, and sprinkle-friendly palatant blends' },
      { label: 'Packaging', details: '30/60/90/120ct amber PET/HDPE bottles, aluminum blister cards, induction-sealed tamper-evident caps' },
    ],
    processSteps: [
      { step: '01', title: 'Excipient & Flow Analysis', description: 'Optimize powder bulk density and flowability while keeping label ingredients minimal.' },
      { step: '02', title: 'Low-Humidity Blending', description: 'Climate-controlled blending prevents clumping of hygroscopic actives and probiotics.' },
      { step: '03', title: 'High-Speed Encapsulation', description: 'Automated weight-check encapsulation maintains ±3% fill accuracy across every lot.' },
      { step: '04', title: 'Dedusting & Metal Detection', description: 'Inline polishing, optical inspection, and ferrous/non-ferrous metal detection.' },
      { step: '05', title: 'Bottling, Sealing & COA', description: 'Desiccant insertion, induction sealing, lot coding, and ISO-17025 COA release.' },
    ],
    specs: {
      materials: 'USP-grade gelatin, vegetarian HPMC, enteric-release shells, minimal clean-label flow aids',
      formats: 'Sizes #4 to #00, sprinkle-open capsules, blister packs or HDPE/amber bottles',
      moq: '500 bottles (stock private label) · 1,500 bottles (custom formulation)',
      shelfLife: '24–36 months (desiccant-protected, light-shielded)',
    },
    faqs: [
      {
        question: 'Can pet owners open your capsules and sprinkle the powder onto cat food?',
        answer: 'Yes. Our two-piece twist-open capsules are specifically formulated with low-static, mildly flavored fills so cat and small-dog owners can easily sprinkle them over wet food.',
      },
      {
        question: 'Which capsule sizes work best for cats versus large dogs?',
        answer: 'Size #3 and #4 capsules are standard for cats and toy breeds, while Size #0 and #00 accommodate high-dose joint or multivitamin blends for medium and large dogs.',
      },
      {
        question: 'Do you offer enteric-coated capsules for sensitive pet probiotics?',
        answer: 'Yes. We stock acid-resistant HPMC shells that bypass stomach acid and release live probiotic strains in the intestinal tract.',
      },
      {
        question: 'Can you manufacture clean-label capsules without magnesium stearate?',
        answer: 'Absolutely. We offer rice hull extract (Nu-FLOW) and organic bamboo silica as clean-label flow alternatives.',
      },
      {
        question: 'How do you protect light- and moisture-sensitive actives in capsules?',
        answer: 'We pair opaque HDPE or UV-blocking amber bottles with food-grade silica desiccants and heat-induction inner seals, or foil-foil blister packs.',
      },
      {
        question: 'What is the typical turnaround time for private label pet capsules?',
        answer: 'Stock private label capsules ship in 18–21 days after label approval; custom OEM formulations typically require 25–30 days including raw material testing.',
      },
    ],
    metaTitle: 'Pet Capsule Contract Manufacturer (OEM/ODM) | NovaPet Nutra',
    metaDescription: 'cGMP pet capsule manufacturing for dogs & cats. Sprinkle-open, HPMC, enteric-release shells, UV-barrier bottling, and 500-unit pilot MOQ.',
  },
  {
    name: 'Meal Toppers & Powders',
    slug: 'powder-manufacturing',
    shortSlug: 'powder',
    pastelBg: '#F5ECD5',
    tagline: 'Free-flowing functional meal toppers, bone broths, and probiotic powders pets love on kibble.',
    heroDescription:
      'Zero-heat dry blending preserves maximum active density per scoop. Engineered for rapid dissolution, anti-caking stability, and instant kibble adhesion.',
    moq: '500 tubs/pouches (Private Label) / 1,500 units (Custom OEM)',
    leadTime: '18–25 days after artwork approval',
    skuSummary: '17 turnkey categories · 49+ base formulas',
    whyChoosePoints: [
      {
        title: 'Kibble-Adhesion & Palatability Engineering',
        description:
          'Balanced carrier particle size and natural bone broth, pumpkin, or goat milk bases coat dry kibble evenly so picky pets lick the bowl clean.',
      },
      {
        title: 'Precision Mesh & Anti-Caking Control',
        description:
          'Controlled granulometry and low-RH (<35%) packaging rooms keep hygroscopic powders (colostrum, electrolytes, lysine) free-flowing.',
      },
      {
        title: 'Flexible Scoops, Tubs & Stick Packs',
        description:
          'Fill into recyclable tubs with custom scoops, resealable gusset pouches, or single-serve nitrogen-flushed stick packs for travel convenience.',
      },
    ],
    customizationOptions: [
      { label: 'Carrier Bases', details: 'Pumpkin powder, beef/chicken bone broth, goat milk, brewer’s yeast, freeze-dried liver, organic kelp' },
      { label: 'Particle & Solubility', details: 'Instant water-soluble (hydration/electrolytes) or textured kibble topper blends (40–100 mesh)' },
      { label: 'Packaging Formats', details: '100g–500g wide-mouth tubs with scoop, stand-up Mylar barrier pouches, 2g–5g single-serve stick packs' },
      { label: 'Specialty Lines', details: 'Feline L-lysine & taurine toppers, canine colostrum/mushroom blends, and poultry/small-pet powders' },
    ],
    processSteps: [
      { step: '01', title: 'Carrier & Mesh Selection', description: 'Match active density with palatable carriers to prevent settling or stratification.' },
      { step: '02', title: 'Low-Humidity Ribbon Blending', description: 'Gentle multi-stage blending preserves live probiotic viability and ensures scoop-to-scoop uniformity.' },
      { step: '03', title: 'Sifting & Rare-Earth Magnet Pass', description: 'Ultrasonic sifting removes agglomerates and guarantees contaminant-free powder.' },
      { step: '04', title: 'Auger Filling & Nitrogen Flush', description: 'Precision auger dosing into tubs, pouches, or stick packs with moisture-barrier sealing.' },
      { step: '05', title: 'Microbiology & COA Verification', description: 'Full lot testing for potency, water activity, heavy metals, and pathogens.' },
    ],
    specs: {
      materials: 'Freeze-dried proteins, bone broth, organic pumpkin, probiotic strains, medicinal mushrooms',
      formats: '100g–1kg tubs with scoop, stand-up pouches, 2g–5g stick packs',
      moq: '500 units (tubs/pouches) · 10,000 sticks (single-serve stick packs)',
      shelfLife: '24 months (high-barrier foil pouch or induction-sealed tub)',
    },
    faqs: [
      {
        question: 'How do you prevent probiotic or bone broth powders from clumping in humid climates?',
        answer: 'We blend and fill in dehumidified rooms (<35% RH), pair high-barrier aluminum-lined pouches or induction-sealed tubs with food-grade desiccants, and balance carrier hygroscopicity.',
      },
      {
        question: 'Can you manufacture single-serve stick packs for travel or subscription boxes?',
        answer: 'Yes. We run multi-lane stick-pack lines for 2g to 5g daily doses, ideal for hydration electrolytes, probiotics, and calming toppers.',
      },
      {
        question: 'Do you include measuring scoops inside powder tubs?',
        answer: 'Yes. We match calibrated 1g, 2.5g, 5g, or 10g food-grade scoops to your powder’s exact bulk density so feeding directions stay accurate.',
      },
      {
        question: 'Can you formulate feline-specific powders with L-lysine and taurine?',
        answer: 'Yes. We maintain dedicated cat-safe palatant bases (such as tuna, bonito, or hydrolyzed chicken liver) free from onion, garlic, or essential oils unsafe for cats.',
      },
      {
        question: 'Do you also produce supplement powders for poultry or small pets?',
        answer: 'Yes. Our powder lines support backyard poultry electrolytes/vitamins as well as rabbit, guinea pig, and small-mammal vitamin C and digestive toppers.',
      },
      {
        question: 'What is the minimum order quantity for custom powder formulas?',
        answer: 'Stock private label tubs/pouches start at 500 units; custom OEM blends start at 1,500 units per SKU.',
      },
    ],
    metaTitle: 'Pet Supplement Powder & Topper Manufacturer | NovaPet Nutra',
    metaDescription: 'Custom pet powder & meal topper manufacturing. Probiotic toppers, bone broth, lysine, stick packs & tubs with anti-caking control and low MOQ.',
  },
  {
    name: 'Liquid Drops & Oils',
    slug: 'drops-manufacturing',
    shortSlug: 'drops',
    pastelBg: '#5BB5C9',
    tagline: 'Precision-dosed herbal tinctures, wild salmon oils, and liquid vitamins with nitrogen-flushed freshness.',
    heroDescription:
      'Engineered for fast absorption and accurate daily dosing for cats, puppies, and senior pets. Our liquid suites handle both water-based botanical glycerites and cold-pressed marine/hemp oils.',
    moq: '500 bottles (Private Label) / 1,500 bottles (Custom OEM)',
    leadTime: '21–28 days after artwork approval',
    skuSummary: '16 turnkey categories · 48+ liquid formulas',
    whyChoosePoints: [
      {
        title: 'Calibrated Dropper & Pump Accuracy',
        description:
          'Graduated glass pipettes, shatterproof pet-safe silicone droppers, and metered 2mL airless pumps ensure stress-free, exact daily dosing.',
      },
      {
        title: 'Oil-Phase Homogenization & Suspension',
        description:
          'High-shear emulsification keeps fat-soluble vitamins, herbal extracts, and omega oils uniform without harsh synthetic stabilizers.',
      },
      {
        title: 'Nitrogen Flushing & Oxidation Control',
        description:
          'Headspace nitrogen blanketing paired with natural mixed tocopherols and rosemary extract prevents fish oil rancidity over 24 months.',
      },
    ],
    customizationOptions: [
      { label: 'Base Vehicles', details: 'Wild Alaskan salmon oil, MCT coconut oil, organic vegetable glycerin (alcohol-free), hemp seed oil' },
      { label: 'Dispensing Closures', details: '1oz/2oz/4oz calibrated glass or plastic droppers, 8oz/16oz metered pump bottles, oral syringes' },
      { label: 'Flavor Profiles', details: 'Unflavored pure marine oil, natural bacon-free savory, salmon, chicken, or mild chamomile/catnip notes' },
      { label: 'Bottle Materials', details: 'UV-blocking amber glass, cobalt glass, opaque food-grade PET/HDPE with tamper-evident neck bands' },
    ],
    processSteps: [
      { step: '01', title: 'Solubility & Stability Design', description: 'Balance oil/water phases, natural antioxidants, and alcohol-free preservation for pet safety.' },
      { step: '02', title: 'High-Shear Homogenization', description: 'Closed-tank stainless steel mixing under controlled temperature prevents oxidation.' },
      { step: '03', title: 'Inline Micro-Filtration', description: 'Clarify tinctures and marine oils to remove sediment and protect pump/dropper mechanisms.' },
      { step: '04', title: 'Nitrogen-Blanketed Filling', description: 'Automated filling with headspace nitrogen flush and torque-controlled capping.' },
      { step: '05', title: 'Peroxide, Viscosity & COA QC', description: 'Test peroxide/anisidine values (for oils), active potency, heavy metals, and microbial safety.' },
    ],
    specs: {
      materials: 'Alcohol-free botanical glycerites, wild-caught fish oils, cold-pressed hemp/flax oils, natural tocopherols',
      formats: '30mL/60mL/120mL dropper bottles; 250mL/500mL pump bottles',
      moq: '500 bottles (stock private label) · 1,500 bottles (custom formulation)',
      shelfLife: '18–24 months (nitrogen-flushed, UV-protected)',
    },
    faqs: [
      {
        question: 'Are your herbal pet drops completely alcohol-free?',
        answer: 'Yes. All canine, feline, and small-pet botanical tinctures are formulated in USP-grade vegetable glycerin or MCT oil bases — strictly 0% ethanol.',
      },
      {
        question: 'How do you keep wild salmon and omega-3 oils from going rancid?',
        answer: 'We combine cold-chain oil storage, natural mixed tocopherols/rosemary antioxidants, UV-blocking bottles, and nitrogen headspace flushing at capping, verified by peroxide value testing.',
      },
      {
        question: 'Can you supply shatterproof droppers so pets cannot bite glass pipettes?',
        answer: 'Yes. We offer BPA-free calibrated plastic pipettes and soft silicone-tip droppers in addition to standard amber glass pipettes.',
      },
      {
        question: 'Do you formulate liquid drops suitable for both dogs and cats?',
        answer: 'Yes. Our R&D team screens every botanical and preservative against feline-specific toxicology lists (excluding tea tree, wintergreen, xylitol, and unsafe essential oils).',
      },
      {
        question: 'Can you prevent pump bottles from leaking during Amazon FBA shipping?',
        answer: 'We use locking-collar pumps with induction-sealed inner liners (or ship the pump clipped alongside a sealed flat cap) and pass ISTA drop/leakage testing.',
      },
      {
        question: 'What is the lead time for private label pet drops?',
        answer: 'Stock liquid formulas ship in 21 days after label approval; custom tinctures or oil blends take 25–30 days.',
      },
    ],
    metaTitle: 'Pet Liquid Drops & Salmon Oil Manufacturer | NovaPet Nutra',
    metaDescription: 'cGMP contract manufacturer of pet liquid drops, alcohol-free tinctures, and nitrogen-flushed omega-3 oils. Precision droppers, pumps & low MOQ.',
  },
  {
    name: 'Nutritional Pastes & Gels',
    slug: 'paste-manufacturing',
    shortSlug: 'paste',
    pastelBg: '#E7B596',
    tagline: 'Smooth, non-separating nutritional pastes, hairball gels, and enzymatic dental gels in easy-squeeze tubes.',
    heroDescription:
      'High-acceptance oral pastes and gels engineered for cats, dogs, and horses. Built with vacuum emulsification to prevent oil separation and support accurate tube or syringe dosing.',
    moq: '1,000 tubes/syringes (Private Label) / 3,000 units (Custom OEM)',
    leadTime: '25–30 days after artwork approval',
    skuSummary: '4 core specialties · equine, digestive & dental gels',
    whyChoosePoints: [
      {
        title: 'Vacuum Emulsion & Zero Oil Separation',
        description:
          'Vacuum planetary mixing eliminates air pockets and locks lipid and water phases together so pastes stay smooth from first squeeze to last.',
      },
      {
        title: 'Cat, Dog & Equine Palatability Systems',
        description:
          'Malt, salmon, poultry, and molasses-free botanical bases make oral dosing simple for hairball relief, recovery nutrition, and equine pastes.',
      },
      {
        title: 'Precision Tube & Dial-a-Dose Syringe Filling',
        description:
          'Automated filling into laminated barrier tubes (ABL/PBL), airless pumps, or calibrated 30mL–60mL oral dosing syringes.',
      },
    ],
    customizationOptions: [
      { label: 'Core Applications', details: 'Feline hairball & digestive paste, high-calorie recovery gel, enzymatic pet toothpaste, dental gel, equine nutritional paste' },
      { label: 'Tube & Applicator Types', details: '50g–120g ABL/PBL flip-top tubes, narrow-nozzle dental tubes, 30mL/60mL dial-a-dose oral syringes' },
      { label: 'Rheology & Texture', details: 'Lickable smooth paste, cling-on dental gel, or firm syringe-extrudable equine paste' },
      { label: 'Clean-Label Standards', details: 'Petroleum-free (no mineral oil/petrolatum), xylitol-free, paraben-free, and food-grade enzyme systems' },
    ],
    processSteps: [
      { step: '01', title: 'Rheology & Stability Formulation', description: 'Tune viscosity, yield stress, and natural emulsifiers for target temperature ranges.' },
      { step: '02', title: 'Vacuum Emulsification', description: 'De-aerated high-shear mixing prevents oxidation, bubbles, and oil bleed.' },
      { step: '03', title: 'Accelerated Thermal Cycling', description: '4°C–40°C freeze-thaw and heat-stability checks validate zero phase separation.' },
      { step: '04', title: 'Tube / Syringe Filling & Crimping', description: 'Precision hot-air or ultrasonic tube sealing with batch embossing and nozzle seals.' },
      { step: '05', title: 'Microbiology, Viscosity & COA QC', description: 'Release testing for viscosity, enzyme/active activity, heavy metals, and microbial limits.' },
    ],
    specs: {
      materials: 'Petroleum-free natural oils, malt extract, food-grade enzymes, plant hydrocolloids, xylitol-free humectants',
      formats: '50g–120g ABL/PBL tubes, nozzle dental tubes, 30mL–60mL oral syringes',
      moq: '1,000 units (stock private label) · 3,000 units (custom tube printing)',
      shelfLife: '24 months (foil-sealed barrier tube)',
    },
    faqs: [
      {
        question: 'Are your hairball and digestive pastes free of petroleum jelly (petrolatum)?',
        answer: 'Yes. We formulate clean-label hairball and digestive pastes using natural plant oils, malt extract, psyllium, and prebiotic fibers without mineral oil or petrolatum.',
      },
      {
        question: 'How do you prevent oil from separating inside the tube during summer shipping?',
        answer: 'We use vacuum emulsification paired with natural rheology modifiers and run 40°C accelerated stability and centrifuge tests before approving any paste formula.',
      },
      {
        question: 'Are your enzymatic pet toothpastes and dental gels safe if swallowed?',
        answer: 'Yes. All pet oral care gels are 100% swallow-safe, strictly xylitol-free, fluoride-free, and SLS-free, using gentle glucose oxidase/lactoperoxidase or botanical actives.',
      },
      {
        question: 'Do you manufacture dial-a-dose syringes for equine nutritional pastes?',
        answer: 'Yes. We fill 30mL and 60mL graduated oral syringes with locking dose rings for equine digestive, electrolyte, calming, and joint pastes.',
      },
      {
        question: 'Can you print custom artwork directly onto the squeeze tube?',
        answer: 'Yes. Direct offset/flexo tube printing starts at 3,000 tubes; for 1,000-unit pilot runs, we apply full-wrap waterproof pressure-sensitive labels on stock white/matte tubes.',
      },
      {
        question: 'What is the typical MOQ and lead time for pet pastes?',
        answer: 'Pilot private label runs start at 1,000 tubes (25 days); custom printed tubes and bespoke OEM gels start at 3,000 units (30–35 days).',
      },
    ],
    metaTitle: 'Pet Nutritional Paste & Gel Manufacturer | NovaPet Nutra',
    metaDescription: 'cGMP contract manufacturing of pet digestive pastes, enzymatic toothpastes, dental gels, and equine syringes. Vacuum emulsified, zero oil separation.',
  },
]

