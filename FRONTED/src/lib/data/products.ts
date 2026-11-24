import type { DosageShortSlug, ProductCategoryData } from './types'

interface RawProductSeed {
  name: string
  slug: string
  form: DosageShortSlug
  skuCount: number
  species?: ('dogs' | 'cats' | 'small-pets')[]
  effects: string[]
  keyIngredients: string[]
  shortDescription: string
}

const DEFAULT_PACKAGING: Record<DosageShortSlug, string[]> = {
  'chewable-tablet': ['60ct / 90ct / 120ct PET or PCR Jars', 'Stand-up Resealable Barrier Pouches', 'Induction Seal + Lot/Expiry Coding'],
  capsule: ['30ct / 60ct / 90ct Amber PET or HDPE Bottles', 'Twist-Open Sprinkle Capsules', 'Desiccant + Tamper-Evident Induction Seal'],
  powder: ['100g / 250g / 500g Wide-Mouth Tubs + Scoop', 'Stand-Up Foil Barrier Pouches', '2g–5g Single-Serve Stick Packs'],
  drops: ['30mL / 60mL / 120mL Calibrated Dropper Bottles', '250mL / 500mL Metered Pump Bottles', 'UV-Amber Glass or Shatterproof PET'],
  paste: ['50g / 100g / 120g ABL/PBL Flip-Top Tubes', 'Narrow-Nozzle Dental Applicator Tubes', '30mL / 60mL Dial-a-Dose Oral Syringes'],
}

const DEFAULT_MOQ: Record<DosageShortSlug, { moq: string; leadTime: string }> = {
  'chewable-tablet': { moq: '500 jars (Pilot) / 2,000 jars (Custom)', leadTime: '21–28 days' },
  capsule: { moq: '500 bottles (Pilot) / 1,500 bottles (Custom)', leadTime: '18–25 days' },
  powder: { moq: '500 units (Pilot) / 1,500 units (Custom)', leadTime: '18–25 days' },
  drops: { moq: '500 bottles (Pilot) / 1,500 bottles (Custom)', leadTime: '21–28 days' },
  paste: { moq: '1,000 tubes (Pilot) / 3,000 tubes (Custom)', leadTime: '25–30 days' },
}

const RAW_PRODUCTS: RawProductSeed[] = [
  // 1. Chewable Tablets (20 clean wellness categories: 19 active + 1 planned)
  { name: 'Hip & Joint Support Chews', slug: 'joint-support', form: 'chewable-tablet', skuCount: 39, effects: ['joint-health'], keyIngredients: ['Glucosamine HCl', 'OptiMSM', 'Chondroitin Sulfate', 'Green-Lipped Mussel'], shortDescription: 'High-strength mobility soft chews formulated to support cartilage cushioning and active joints in dogs and cats.' },
  { name: 'Daily Multivitamin Chews', slug: 'multivitamin', form: 'chewable-tablet', skuCount: 19, effects: ['immune-support', 'longevity-anti-aging'], keyIngredients: ['Vitamins A/C/D3/E', 'B-Complex', 'Chelated Zinc', 'Omega-3 & CoQ10'], shortDescription: 'Daily nutritional soft chews formulated for broad vitamin, coat, digestive, and senior wellness.' },
  { name: 'Probiotic & Digestive Chews', slug: 'probiotic', form: 'chewable-tablet', skuCount: 19, effects: ['gut-health'], keyIngredients: ['Bacillus coagulans (5B CFU)', 'Pumpkin Powder', 'Inulin Prebiotic', 'Digestive Enzymes'], shortDescription: 'Cold-extruded digestive soft chews formed below 38°C to maintain probiotic CFU viability.' },
  { name: 'Calming & Relaxation Chews', slug: 'calming', form: 'chewable-tablet', skuCount: 17, effects: ['calming-stress'], keyIngredients: ['L-Theanine', 'Chamomile', 'Valerian Root', 'Organic Hemp Seed Oil'], shortDescription: 'Botanical relaxation chews formulated to support calm behavior during travel, noise, and routine changes.' },
  { name: 'Skin & Coat Omega-3 Chews', slug: 'skin-and-coat', form: 'chewable-tablet', skuCount: 6, effects: ['skin-coat'], keyIngredients: ['Wild Alaskan Salmon Oil', 'Biotin', 'Vitamin E', 'Flaxseed & Zinc'], shortDescription: 'EPA/DHA-rich coat chews formulated to nourish skin hydration and glossy coat appearance.' },
  { name: 'Cat Hairball Control Chews', slug: 'hairball-control', form: 'chewable-tablet', skuCount: 3, species: ['cats'], effects: ['hairball-control', 'gut-health'], keyIngredients: ['Psyllium Husk', 'Slippery Elm', 'Pumpkin Fiber', 'Sunflower Lecithin'], shortDescription: 'Petroleum-free feline soft chews using natural plant fibers to support normal hairball passage.' },
  { name: 'Fiber & Gland Wellness Chews', slug: 'bladder-liver-kidney', form: 'chewable-tablet', skuCount: 3, effects: ['urinary-kidney', 'gut-health'], keyIngredients: ['Pumpkin & Beet Pulp', 'Cranberry Extract', 'Milk Thistle', 'Dandelion Root'], shortDescription: 'High-fiber botanical chews supporting normal digestive regularity and healthy gland function.' },
  { name: 'Urinary & Bladder Care Chews', slug: 'urinary-care', form: 'chewable-tablet', skuCount: 3, effects: ['urinary-kidney'], keyIngredients: ['Cranberry PACs', 'D-Mannose', 'Marshmallow Root', 'N-Acetyl Glucosamine'], shortDescription: 'Targeted urinary wellness chews supporting balanced bladder pH and normal urinary tract function.' },
  { name: 'Muscle & Weight Gain Chews', slug: 'muscle-and-weight-gain', form: 'chewable-tablet', skuCount: 1, species: ['dogs'], effects: ['conditioning'], keyIngredients: ['Whey Protein Isolate', 'BCAAs', 'MCT Oil', 'L-Carnitine'], shortDescription: 'Calorie- and amino-acid-dense conditioning chews for active and working dogs.' },
  { name: 'Senior Longevity Chews', slug: 'longevity', form: 'chewable-tablet', skuCount: 7, effects: ['longevity-anti-aging', 'cognitive-health'], keyIngredients: ['CoQ10', 'Resveratrol', 'Astaxanthin', 'Functional Mushrooms'], shortDescription: 'Antioxidant soft chews formulated to support cellular vitality in aging dogs and cats.' },
  { name: 'Feline L-Lysine Chews', slug: 'lysine', form: 'chewable-tablet', skuCount: 3, species: ['cats'], effects: ['immune-support'], keyIngredients: ['L-Lysine HCl (500mg)', 'Taurine', 'Vitamin C', 'Hydrolyzed Chicken Liver'], shortDescription: 'Bite-sized feline L-lysine soft chews formulated to support daily immune and eye wellness.' },
  { name: 'Coprophagia (No-Poo) Chews', slug: 'no-poo', form: 'chewable-tablet', skuCount: 0, species: ['dogs'], effects: ['gut-health'], keyIngredients: ['Yucca Schidigera', 'Digestive Enzymes', 'Parsley Leaf', 'B-Complex'], shortDescription: 'Planned behavioral chew category (in R&D).' },
  { name: 'Tear Stain & Eye Support Chews', slug: 'tear-stain-eye-support', form: 'chewable-tablet', skuCount: 2, effects: ['eye-health'], keyIngredients: ['Lutein', 'Zeaxanthin', 'Bilberry Extract', 'Cranberry & Eyebright'], shortDescription: 'Antioxidant vision and eye-contour chews formulated for light-coated breeds.' },
  { name: 'Dental & Oral Care Chews', slug: 'dental-oral-care', form: 'chewable-tablet', skuCount: 6, effects: ['dental-oral-care'], keyIngredients: ['Ascophyllum Kelp', 'Peppermint & Parsley', 'Oral Probiotics', 'Zinc'], shortDescription: 'Daily breath-freshening and oral hygiene chews with xylitol-free natural botanicals.' },
  { name: 'Collagen & Tendon Chews', slug: 'collagen', form: 'chewable-tablet', skuCount: 2, effects: ['joint-health', 'skin-coat'], keyIngredients: ['Hydrolyzed Bovine Collagen', 'UC-II Collagen', 'Hyaluronic Acid', 'Vitamin C'], shortDescription: 'Type I, II & III collagen soft chews supporting connective tissue, nails, and coat elasticity.' },
  { name: 'Turmeric Curcumin Chews', slug: 'turmeric', form: 'chewable-tablet', skuCount: 1, effects: ['joint-health', 'immune-support'], keyIngredients: ['Organic Turmeric (95% Curcuminoids)', 'Black Pepper BioPerine', 'Coconut Oil'], shortDescription: 'High-bioavailability turmeric chews formulated to support normal joint comfort and antioxidant defense.' },
  { name: 'Green-Lipped Mussel Chews', slug: 'green-lipped-mussel', form: 'chewable-tablet', skuCount: 2, effects: ['joint-health'], keyIngredients: ['New Zealand Green-Lipped Mussel', 'ETA Omega-3s', 'Glucosamine'], shortDescription: 'Cold-processed marine mobility chews preserving delicate ETA fatty acids.' },
  { name: 'Cognitive & Brain Support Chews', slug: 'cognitive-support', form: 'chewable-tablet', skuCount: 1, effects: ['cognitive-health', 'longevity-anti-aging'], keyIngredients: ['Phosphatidylserine', 'Lion’s Mane Mushroom', 'Algae DHA', 'MCT Oil'], shortDescription: 'Senior brain and alertness chews formulated to support calm day-night routines.' },
  { name: 'L-Lysine Immune Defense Chews', slug: 'lysine-immune', form: 'chewable-tablet', skuCount: 1, species: ['cats'], effects: ['immune-support'], keyIngredients: ['L-Lysine', 'Echinacea', 'Beta-Glucans', 'Zinc'], shortDescription: 'Dual-action feline immune nutrition chews for multi-cat households.' },
  { name: 'Reproductive & Maternal Chews', slug: 'reproductive-support', form: 'chewable-tablet', skuCount: 2, effects: ['reproductive-support'], keyIngredients: ['Folic Acid', 'DHA/EPA', 'Chelated Zinc', 'Red Raspberry Leaf'], shortDescription: 'Targeted breeding vitality and maternal nutrition chews for dogs and cats.' },

  // 2. Capsules (5 categories: all active)
  { name: 'Probiotic Pet Capsules', slug: 'probiotic-capsules', form: 'capsule', skuCount: 5, effects: ['gut-health'], keyIngredients: ['Multi-Strain 10B CFU Probiotics', 'Inulin FOS', 'Enteric HPMC Shell'], shortDescription: 'Twist-open sprinkle or enteric-coated capsules delivering high-potency live probiotics.' },
  { name: 'Daily Vitamin Pet Capsules', slug: 'vitamin-capsules', form: 'capsule', skuCount: 4, effects: ['immune-support'], keyIngredients: ['Chelated Minerals', 'B-Complex', 'Vitamins A/D3/E', 'Taurine'], shortDescription: 'Clean-label daily multivitamin capsules free from artificial binders or fillers.' },
  { name: 'Joint Care Pet Capsules', slug: 'joint-care-capsules', form: 'capsule', skuCount: 4, effects: ['joint-health'], keyIngredients: ['UC-II Collagen', 'Glucosamine HCl', 'Hyaluronic Acid', 'Boswellia'], shortDescription: 'Concentrated mobility capsules suited for senior dogs and picky cats.' },
  { name: 'Anti-Aging & Longevity Capsules', slug: 'anti-aging-capsules', form: 'capsule', skuCount: 3, effects: ['longevity-anti-aging', 'cognitive-health'], keyIngredients: ['CoQ10', 'Resveratrol', 'NMN / NR', 'Astaxanthin'], shortDescription: 'Light-shielded cellular longevity capsules for senior pet wellness lines.' },
  { name: 'Immune Support Pet Capsules', slug: 'immune-support-capsules', form: 'capsule', skuCount: 3, effects: ['immune-support'], keyIngredients: ['Beta-Glucans', 'Bovine Colostrum', 'Turkey Tail Extract', 'Vitamin C'], shortDescription: 'Concentrated immune nutrition capsules in #3 feline or #0 canine shell sizes.' },

  // 3. Powders (15 clean wellness categories: 14 active + 1 planned)
  { name: 'Probiotic Meal Topper Powder', slug: 'probiotic-powder', form: 'powder', skuCount: 6, effects: ['gut-health'], keyIngredients: ['6-Strain Probiotics', 'Organic Pumpkin', 'Digestive Enzymes', 'Inulin'], shortDescription: 'Easy-scoop gut wellness powder that adheres evenly to dry kibble or wet food.' },
  { name: 'Multivitamin Meal Topper Powder', slug: 'vitamin-powder', form: 'powder', skuCount: 11, effects: ['immune-support', 'skin-coat'], keyIngredients: ['Complete Vitamin Premix', 'Chelated Minerals', 'Kelp', 'Brewer’s Yeast'], shortDescription: 'Broad-spectrum daily vitamin topper engineered for homemade, raw, and kibble diets.' },
  { name: 'Joint & Mobility Powder', slug: 'joint-powder', form: 'powder', skuCount: 2, effects: ['joint-health'], keyIngredients: ['Glucosamine HCl', 'OptiMSM', 'Chondroitin', 'Green-Lipped Mussel'], shortDescription: 'High-dose mobility powder suited for large and giant breed dogs.' },
  { name: 'Functional Mushroom Blend Powder', slug: 'mushroom-powder', form: 'powder', skuCount: 4, effects: ['immune-support', 'longevity-anti-aging'], keyIngredients: ['Turkey Tail', 'Reishi', 'Lion’s Mane', 'Chaga', 'Cordyceps'], shortDescription: '100% organic fruiting-body mushroom topper standardized for beta-glucans.' },
  { name: 'Feline Taurine Supplement Powder', slug: 'taurine-powder', form: 'powder', skuCount: 2, species: ['cats'], effects: ['longevity-anti-aging', 'eye-health'], keyIngredients: ['Pure USP Taurine', 'Hydrolyzed Bonito/Liver Base'], shortDescription: 'Essential feline cardiac and retinal taurine powder for raw and home-cooked cat diets.' },
  { name: 'L-Lysine Immune Powder', slug: 'lysine-powder', form: 'powder', skuCount: 2, species: ['cats'], effects: ['immune-support'], keyIngredients: ['L-Lysine HCl', 'Taurine', 'Feline Savory Carrier'], shortDescription: 'Palatable feline L-lysine powder designed to mix cleanly into wet cat food.' },
  { name: 'Muscle & Weight Gainer Powder', slug: 'weight-gainer-powder', form: 'powder', skuCount: 4, species: ['dogs'], effects: ['conditioning'], keyIngredients: ['Whole Egg & Whey Protein', 'MCT Powder', 'BCAAs', 'Probiotics'], shortDescription: 'High-calorie protein topper supporting lean mass in active and working dogs.' },
  { name: 'Senior Aging Support Powder', slug: 'aging-support-powder', form: 'powder', skuCount: 1, effects: ['longevity-anti-aging', 'cognitive-health'], keyIngredients: ['CoQ10', 'MCT Powder', 'Collagen Peptides', 'Lion’s Mane'], shortDescription: 'Multi-benefit senior kibble topper supporting joint, brain, and heart vitality.' },
  { name: 'Calming Meal Topper Powder', slug: 'calming-powder', form: 'powder', skuCount: 2, effects: ['calming-stress'], keyIngredients: ['L-Theanine', 'Chamomile', 'L-Tryptophan', 'Colostrum Calming Complex'], shortDescription: 'Daily relaxation powder available in tubs or single-serve travel stick packs.' },
  { name: 'Beef & Chicken Bone Broth Powder', slug: 'bone-broth-powder', form: 'powder', skuCount: 1, effects: ['joint-health', 'gut-health'], keyIngredients: ['Grass-Fed Bone Broth Protein', 'Natural Collagen', 'Turmeric', 'Pumpkin'], shortDescription: 'Instant hydrating bone broth topper rich in natural collagen and amino acids.' },
  { name: 'Tear Stain Control Powder', slug: 'tear-stain-powder', form: 'powder', skuCount: 0, effects: ['eye-health'], keyIngredients: ['Cranberry', 'Eyebright', 'Lutein', 'Marshmallow Root'], shortDescription: 'Planned tear-stain powder category (in R&D).' },
  { name: 'Colostrum Immune Powder', slug: 'colostrum-immune-powder', form: 'powder', skuCount: 2, effects: ['immune-support'], keyIngredients: ['First-Milking Bovine Colostrum (30% IgG)', 'Probiotics', 'Quercetin'], shortDescription: 'IgG-standardized colostrum topper supporting daily immune and gut-barrier wellness.' },
  { name: 'Hydration & Electrolyte Powder', slug: 'hydration-electrolyte-powder', form: 'powder', skuCount: 2, effects: ['conditioning', 'gut-health'], keyIngredients: ['Sodium & Potassium Citrate', 'Coconut Water Powder', 'Glycine', 'Bone Broth'], shortDescription: 'Rapid-dissolve hydration stick packs for hot weather, travel, and active recovery.' },
  { name: 'Backyard Poultry Supplement Powder', slug: 'poultry-supplement-powder', form: 'powder', skuCount: 4, species: ['small-pets'], effects: ['immune-support', 'conditioning'], keyIngredients: ['Water-Soluble Electrolytes', 'Probiotics', 'Vitamins A/D3/E', 'Oregano Oil'], shortDescription: 'Water-dispersible flock wellness powders for chickens, ducks, and backyard poultry.' },
  { name: 'Activated Charcoal Digestive Powder', slug: 'activated-charcoal-powder', form: 'powder', skuCount: 1, effects: ['gut-health'], keyIngredients: ['USP Coconut-Shell Activated Charcoal', 'Bentonite Clay', 'Ginger'], shortDescription: 'Fine-mesh activated charcoal topper supporting normal digestive comfort.' },

  // 4. Drops (10 clean wellness categories: all active)
  { name: 'Multivitamin Liquid Drops', slug: 'multivitamin-drops', form: 'drops', skuCount: 5, effects: ['immune-support'], keyIngredients: ['Bioavailable B-Complex', 'Vitamins A/D3/E', 'Taurine', 'Alcohol-Free Glycerin'], shortDescription: 'Fast-absorbing daily liquid multivitamin drops for puppies, kittens, and senior pets.' },
  { name: 'Calming & Relaxation Liquid Drops', slug: 'calming-sleep-drops', form: 'drops', skuCount: 5, effects: ['calming-stress'], keyIngredients: ['Organic Hemp Seed Oil', 'Chamomile', 'Valerian', 'L-Theanine'], shortDescription: 'Alcohol-free botanical relaxation drops for travel, noise, and evening calm.' },
  { name: 'Joint Care Liquid Drops', slug: 'joint-care-drops', form: 'drops', skuCount: 3, effects: ['joint-health'], keyIngredients: ['Liquid Glucosamine HCl', 'MSM', 'Hyaluronic Acid', 'Turmeric'], shortDescription: 'Easy-pour liquid mobility formula suited for senior pets with dental sensitivity.' },
  { name: 'Probiotic & Gut Health Drops', slug: 'probiotic-gut-drops', form: 'drops', skuCount: 4, effects: ['gut-health'], keyIngredients: ['Oil-Suspended Probiotics', 'Fennel Seed', 'Ginger Root', 'MCT Oil'], shortDescription: 'Anhydrous oil-suspended probiotic and botanical digestive drops.' },
  { name: 'Bladder & Urinary Support Drops', slug: 'bladder-urinary-drops', form: 'drops', skuCount: 4, effects: ['urinary-kidney'], keyIngredients: ['Cranberry Extract', 'D-Mannose', 'Couch Grass', 'Marshmallow Root'], shortDescription: 'Gentle liquid urinary tract and normal bowel-regularity drops for cats and dogs.' },
  { name: 'Weight Gain & Appetite Drops', slug: 'weight-gain-drops', form: 'drops', skuCount: 1, effects: ['conditioning'], keyIngredients: ['MCT Oil', 'B12 & B-Complex', 'Omega-3/6 Oils', 'Alfalfa'], shortDescription: 'High-energy liquid nutrition drops supporting appetite and healthy weight maintenance.' },
  { name: 'Liquid Collagen Drops', slug: 'collagen-drops', form: 'drops', skuCount: 5, effects: ['joint-health', 'skin-coat'], keyIngredients: ['Hydrolyzed Marine & Bovine Collagen', 'Biotin', 'Hyaluronic Acid'], shortDescription: 'Ready-to-pour collagen liquid supporting joint lubrication, coat shine, and nails.' },
  { name: 'Botanical Herbal Wellness Drops', slug: 'herbal-drops', form: 'drops', skuCount: 3, effects: ['immune-support', 'gut-health'], keyIngredients: ['Astragalus', 'Burdock Root', 'Milk Thistle', 'Chamomile'], shortDescription: 'Custom-blended single- and multi-herb tinctures in organic vegetable glycerin.' },
  { name: 'Eye & Vision Support Drops', slug: 'eye-health-drops', form: 'drops', skuCount: 2, effects: ['eye-health'], keyIngredients: ['Bilberry Extract', 'Lutein', 'Astaxanthin', 'Algae DHA'], shortDescription: 'Oral antioxidant drops formulated to nourish retinal wellness in aging pets.' },
  { name: 'Iron & Vitality Liquid Drops', slug: 'iron-blood-drops', form: 'drops', skuCount: 2, effects: ['conditioning', 'immune-support'], keyIngredients: ['Chelated Iron Bisglycinate', 'Vitamin B12', 'Folic Acid', 'Copper'], shortDescription: 'Gentle liquid iron and B-vitamin drops formulated for daily energy and vitality.' },

  // 5. Pastes (4 categories: all active)
  { name: 'Equine Nutritional Paste', slug: 'horse-nutritional-paste', form: 'paste', skuCount: 3, species: ['small-pets'], effects: ['conditioning', 'gut-health'], keyIngredients: ['Chelated Electrolytes', 'B-Complex', 'Live Yeast Probiotics', 'Vitamin E'], shortDescription: 'Calibrated 60mL dial-a-dose oral syringe paste for performance and travel horses.' },
  { name: 'Pet Digestive & Hairball Paste', slug: 'pet-digestive-paste', form: 'paste', skuCount: 4, species: ['cats', 'dogs'], effects: ['hairball-control', 'gut-health'], keyIngredients: ['Malt Extract', 'Psyllium Fiber', 'Prebiotic MOS', 'Natural Plant Oils'], shortDescription: 'Petroleum-free, vacuum-emulsified lickable paste supporting hairball passage and digestive comfort.' },
  { name: 'Pet Enzymatic Toothpaste', slug: 'pet-enzymatic-toothpaste', form: 'paste', skuCount: 3, effects: ['dental-oral-care'], keyIngredients: ['Glucose Oxidase', 'Lactoperoxidase', 'Mild Hydrated Silica', 'Poultry/Mint Flavor'], shortDescription: 'Swallow-safe, xylitol-free enzymatic toothpaste formulated for daily oral hygiene.' },
  { name: 'Pet No-Brush Dental Gel', slug: 'pet-dental-gel', form: 'paste', skuCount: 2, effects: ['dental-oral-care'], keyIngredients: ['Ascophyllum Kelp', 'Zinc Gluconate', 'Peppermint Oil (Pet-Safe)', 'Aloe Vera'], shortDescription: 'Cling-on no-brush oral care gel in narrow-nozzle tubes for direct gum application.' },
]

const ANIMAL_MODIFIER_RE = /\b(pet|dog|cat|feline|canine|equine|horse|poultry)\b/i

export const PRODUCTS_SEED: ProductCategoryData[] = RAW_PRODUCTS.map((item) => {
  const defaults = DEFAULT_MOQ[item.form]
  const petName = ANIMAL_MODIFIER_RE.test(item.name) ? item.name : `Pet ${item.name}`
  const rawTitle = `Private Label ${petName} | NovaPet Nutra`
  const metaTitle =
    rawTitle.length <= 62
      ? rawTitle
      : `${petName} Manufacturer | NovaPet Nutra`.length <= 62
        ? `${petName} Manufacturer | NovaPet Nutra`
        : `${petName} OEM | NovaPet Nutra`.slice(0, 62)
  const rawDesc = `cGMP private label & white label ${petName.toLowerCase()} manufacturer. ${item.shortDescription}`
  const metaDescription = rawDesc.length <= 159 ? rawDesc : `${rawDesc.slice(0, 156)}...`

  return {
    name: item.name,
    slug: item.slug,
    status: item.skuCount > 0 ? 'active' : 'planned',
    form: item.form,
    skuCount: item.skuCount,
    shortDescription: item.shortDescription,
    species: item.species ?? ['dogs', 'cats'],
    effects: item.effects,
    keyIngredients: item.keyIngredients,
    packagingOptions: DEFAULT_PACKAGING[item.form],
    moq: defaults.moq,
    leadTime: defaults.leadTime,
    metaTitle,
    metaDescription,
  }
})
