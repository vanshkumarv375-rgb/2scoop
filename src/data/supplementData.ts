import { Product, FAQ } from '../types';

export const CATEGORIES = [
  'Whey Protein',
  'Isolate Protein',
  'Mass Gainers',
  'Creatine',
  'Pre Workout',
  'BCAA / EAA',
  'Multivitamins',
  'Fat Burners',
  'Protein Bars'
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '2ScoopNutritoon Premium Whey Gold',
    category: 'Whey Protein',
    description: 'Our flagship 100% Whey blend delivers 25g of high-quality whey isolate, concentrate, and hydrolysate per serving. Engineered for professional athletes, bodybuilders, and fitness enthusiasts to optimize lean muscle growth, accelerate post-workout tissue recovery, and elevate protein synthesis.',
    ingredients: 'Whey Protein Blend (Whey Protein Isolate, Whey Protein Concentrate, Whey Protein Hydrolysate), Natural and Artificial Flavours, Soy Lecithin (Emulsifier), Xanthan Gum (Stabilizer), Sucralose, Acesulfame Potassium, Enzyme Blend (Amylase, Protease, Lactase).',
    benefits: [
      'Accelerates muscle recovery and repairs micro-tears post-workout.',
      'Promotes muscle hypertrophy and clean, lean mass gains.',
      'Rich in BCAAs (5.5g per serve) and Glutamic Acid for muscle preservation.',
      'Sourced from 100% grass-fed premium hormone-free dairy.'
    ],
    usageInstructions: 'Mix 1 rounded scoop (approx. 33g) with 200-250ml of cold water, milk, or your favourite beverage in a shaker. Consume within 30 minutes after training or as a morning protein boost.',
    flavours: ['Double Rich Chocolate', 'Gourmet Vanilla Creame', 'Almond Kulfi', 'Cafe Mocha'],
    sizes: ['1 kg / 2.2 lbs', '2 kg / 4.4 lbs', '4 kg / 8.8 lbs'],
    mrp: 6499,
    discountPrice: 4899,
    stockStatus: 'In Stock',
    stockCount: 142,
    rating: 4.8,
    images: [
      'linear-gradient(135deg, #111 0%, #e11d48 100%)', // Primary visual palette
      'linear-gradient(135deg, #222 0%, #f43f5e 100%)'
    ],
    servingSize: '1 scoop (33g)',
    servingsPerContainer: 30,
    nutritionFacts: [
      { name: 'Calories', amount: '120 kcal' },
      { name: 'Total Fat', amount: '1.5 g', dailyValue: '2%' },
      { name: 'Saturated Fat', amount: '1 g', dailyValue: '5%' },
      { name: 'Cholesterol', amount: '35 mg', dailyValue: '12%' },
      { name: 'Sodium', amount: '130 mg', dailyValue: '6%' },
      { name: 'Total Carbohydrate', amount: '3 g', dailyValue: '1%' },
      { name: 'Dietary Fiber', amount: '0 g', dailyValue: '0%' },
      { name: 'Sugars', amount: '1 g' },
      { name: 'Protein', amount: '25 g', dailyValue: '50%' },
      { name: 'Calcium', amount: '140 mg', dailyValue: '10%' },
      { name: 'Iron', amount: '0.4 mg', dailyValue: '2%' },
      { name: 'Potassium', amount: '220 mg', dailyValue: '5%' }
    ],
    reviews: [
      { id: 'r1', userName: 'Arjun Sharma', rating: 5, comment: 'Phenomenal mixability and the Double Rich Chocolate flavour is rich yet not overly sweet. My muscle recovery has noticeably improved.', date: '2026-05-12', verified: true },
      { id: 'r2', userName: 'Nisha Pillai', rating: 4, comment: 'Great formulation. No bloating at all which happens with other cheap proteins. Will definitely reorder the Gourmet Vanilla.', date: '2026-06-02', verified: true }
    ]
  },
  {
    id: 'p2',
    name: '2ScoopNutritoon Iso-Zero Pure Isolate',
    category: 'Isolate Protein',
    description: 'The ultra-pure cross-flow microfiltered Whey Protein Isolate. Zero carbs, zero fat, zero lactose, and zero sugar. Purpose-built for elite fat loss phases, pre-contest prep, or individuals with high lactose sensitivity searching for rapid digest absorption.',
    ingredients: 'Provon® Whey Protein Isolate, Natural Flavours, Sunflower Lecithin, Cocoa Powder (Alkalised), Xanthan Gum, Guar Gum, Stevia Extract, DigeZyme® Multi-Enzyme Complex.',
    benefits: [
      '90% protein yield per scoop (27g ultra-pure protein).',
      'Absolute Zero Carbohydrates, Zero Lactose & Gluten Free.',
      'Instantized absorption ideal for immediate post-workout cellular replenishment.',
      'Enriched with premium digestive enzymes for perfect digestion and zero stomach heaviness.'
    ],
    usageInstructions: 'Stir or shake 1 scoop (30g) in 150-200ml cold water until completely dissolved. For best results, take first thing in the morning and immediately after physical activity.',
    flavours: ['Fudge Chocolate Brownie', 'Mango Slush', 'Strawberry Milkshake'],
    sizes: ['1 kg / 2.2 lbs', '2 kg / 4.4 lbs'],
    mrp: 8499,
    discountPrice: 6299,
    stockStatus: 'In Stock',
    stockCount: 88,
    rating: 4.9,
    images: [
      'linear-gradient(135deg, #090909 0%, #6e0d0d 100%)',
      'linear-gradient(135deg, #1f1f1f 0%, #aa1a1a 100%)'
    ],
    servingSize: '1 scoop (30g)',
    servingsPerContainer: 33,
    nutritionFacts: [
      { name: 'Calories', amount: '110 kcal' },
      { name: 'Total Fat', amount: '0 g', dailyValue: '0%' },
      { name: 'Saturated Fat', amount: '0 g', dailyValue: '0%' },
      { name: 'Cholesterol', amount: '0 mg', dailyValue: '0%' },
      { name: 'Sodium', amount: '45 mg', dailyValue: '2%' },
      { name: 'Total Carbohydrate', amount: '0 g', dailyValue: '0%' },
      { name: 'Sugars', amount: '0 g' },
      { name: 'Protein', amount: '27 g', dailyValue: '54%' },
      { name: 'Calcium', amount: '120 mg', dailyValue: '8%' }
    ],
    reviews: [
      { id: 'r3', userName: 'Vikram Malhotra', rating: 5, comment: 'Hands down the cleanest premium isolate on the market. It dissolves almost like water, no clumping, and very refreshing!', date: '2026-05-24', verified: true }
    ]
  },
  {
    id: 'p3',
    name: '2ScoopNutritoon Extreme Mega Mass Gainer',
    category: 'Mass Gainers',
    description: 'Massive calorie delivery formula loaded with 1,200 complex-carbohydrate calories, 60g premium multi-phase protein matrix, and an added clinical dose of 5g Creatine Monohydrate. Specifically designed for hardgainers looking to shatter size plateaus.',
    ingredients: 'Multi-Stage Carbohydrate Blend (Maltodextrin, Sweet Potato Flour, Organic Oat Flour), Multi-Phase Protein Matrix (Whey Concentrate, Calcium Caseinate, Egg Albumin), Cocoa, Medium Chain Triglycerides (MCTs), Creatine Monohydrate, L-Glutamine, Vitamin-Mineral Premix, Sucralose.',
    benefits: [
      'Over 1,200 high-octane calories to support rapid weight gain requirements.',
      'Sustained-release carbohydrates for stable glycogen replenishing without standard blood-sugar spikes.',
      '60g protein blend ensures sustained nitrogen fuel flow to muscles over several hours.',
      'Enhanced with multi-strain digestive enzymes to ensure complete macro-nutrient breakdown.'
    ],
    usageInstructions: 'Blend 2 scoops with 450-500ml of whole milk. Drink 1 serving between meals and another right before bedtime to support positive caloric balance.',
    flavours: ['Chocolate Fudge Sundae', 'Cookies & Cream', 'Creamy Banana'],
    sizes: ['3 kg / 6.6 lbs', '5 kg / 11 lbs'],
    mrp: 4999,
    discountPrice: 3899,
    stockStatus: 'In Stock',
    stockCount: 65,
    rating: 4.7,
    images: [
      'linear-gradient(135deg, #111111 0%, #b80000 100%)',
      'linear-gradient(135deg, #2c2c2c 0%, #ff1111 100%)'
    ],
    servingSize: '2 scoops (160g)',
    servingsPerContainer: 31,
    nutritionFacts: [
      { name: 'Calories', amount: '1250 kcal' },
      { name: 'Total Fat', amount: '7 g', dailyValue: '9%' },
      { name: 'Saturated Fat', amount: '3.5 g', dailyValue: '17%' },
      { name: 'Sodium', amount: '380 mg', dailyValue: '16%' },
      { name: 'Total Carbohydrate', amount: '252 g', dailyValue: '92%' },
      { name: 'Sugars', amount: '18 g' },
      { name: 'Protein', amount: '60 g', dailyValue: '120%' },
      { name: 'Creatine Monohydrate', amount: '5000 mg' },
      { name: 'L-Glutamine', amount: '2000 mg' }
    ],
    reviews: [
      { id: 'r4', userName: 'Rohan Mehra', rating: 5, comment: 'Gained nearly 4.5kg over two months with hard workouts and 1 serving a day. Tastes like a real milkshake!', date: '2026-04-18', verified: true }
    ]
  },
  {
    id: 'p4',
    name: '2ScoopNutritoon Micronized Creatine Monohydrate',
    category: 'Creatine',
    description: '100% pure pharmaceutical-grade micronized creatine monohydrate. Micronization to 200 mesh ensures instantaneous mixing and rapid cellular hydration. Promotes unmatched burst strength, ATP regeneration, and cellular volumization.',
    ingredients: '100% Pure Micronized Creatine Monohydrate (No fillers, no colors, no artificial sweeteners).',
    benefits: [
      'Accelerates ATP energy production for extreme power output and strength gains.',
      'Draws water directly inside the muscle cell, inducing extreme muscle fullness.',
      'Saves lean tissue from catabolism during intense conditioning phases.',
      'Lab tested 99.9% premium purity guaranteed.'
    ],
    usageInstructions: 'Add 1 scoop (3g) of micronized creatine to 200ml of cold water or your favorite juice. Take once daily. Drink at least 3-4 liters of water daily while using creatine.',
    flavours: ['Unflavoured', 'Tangy Orange', 'Refreshing Green Apple'],
    sizes: ['100 g', '250 g', '500 g'],
    mrp: 1499,
    discountPrice: 899,
    stockStatus: 'In Stock',
    stockCount: 310,
    rating: 4.9,
    images: [
      'linear-gradient(135deg, #090909 0%, #1a1a1a 100%)',
      'linear-gradient(135deg, #333 0%, #d41414 100%)'
    ],
    servingSize: '1 scoop (3g)',
    servingsPerContainer: 83,
    nutritionFacts: [
      { name: 'Pure Creatine Monohydrate', amount: '3000 mg', dailyValue: '100%' }
    ],
    reviews: [
      { id: 'r5', userName: 'Kabir Dev', rating: 5, comment: 'Purest creatine available in the market. Tastes neutral, mixes immediately with warm/cold beverages. Strength is up on my bench press!', date: '2026-06-10', verified: true }
    ]
  },
  {
    id: 'p5',
    name: '2ScoopNutritoon High-Voltage Pre-Workout',
    category: 'Pre Workout',
    description: 'An explosive pre-workout matrix engineered to supercharge energy, laser focus, and skin-splitting pumps. Features critical doses of L-Citrulline Malate, Beta-Alanine, and Caffeine Anhydrous to maximize training intensity.',
    ingredients: 'L-Citrulline Malate 2:1, Beta-Alanine, Betaine Anhydrous, L-Tyrosine, Caffeine Anhydrous, Alpha-GPC, Huperzine A, Pink Himalayan Salt, Silicon Dioxide, Natural and Artificial Sour Flavours, Citric Acid, Beetroot Red (Colour), Sucralose.',
    benefits: [
      'Massive muscle pumps through hyper-dilated blood vessels via Citrulline (6000mg).',
      'Delays fatigue and eliminates lactic acid accumulation with Beta-Alanine (3200mg).',
      'Explosive cognitive and physical energy containing clean Caffeine (350mg).',
      'Elevated mental connection with Alpha-GPC and Huperzine A.'
    ],
    usageInstructions: 'Mix 1 scoop (approx 14.5g) in 250-300ml of cold water. Consume 15-20 minutes prior to intense weight training or performance sessions. Start with half scoop first to test tolerance.',
    flavours: ['Watermelon Rush', 'Blue Raz Blast', 'Pineapple Inferno'],
    sizes: ['30 Servings'],
    mrp: 3499,
    discountPrice: 2499,
    stockStatus: 'In Stock',
    stockCount: 124,
    rating: 4.8,
    images: [
      'linear-gradient(135deg, #1a0000 0%, #f40d0d 100%)',
      'linear-gradient(135deg, #2b0000 0%, #901111 100%)'
    ],
    servingSize: '1 scoop (14.5g)',
    servingsPerContainer: 30,
    nutritionFacts: [
      { name: 'L-Citrulline Malate (2:1)', amount: '6000 mg' },
      { name: 'Beta-Alanine', amount: '3200 mg' },
      { name: 'Betaine Anhydrous', amount: '2500 mg' },
      { name: 'L-Tyrosine', amount: '1000 mg' },
      { name: 'Caffeine Anhydrous', amount: '350 mg' },
      { name: 'Alpha-GPC (50%)', amount: '400 mg' },
      { name: 'Sodium (Himalayan Salt)', amount: '150 mg' }
    ],
    reviews: [
      { id: 'r6', userName: 'Sunny Yadav', rating: 5, comment: 'Crazy energy! The beta-alanine tingles are real, and the pump is incredible. Best pre-workout I have tried in years.', date: '2026-05-30', verified: true }
    ]
  },
  {
    id: 'p6',
    name: '2ScoopNutritoon BCAA 2:1:1 Energy Recovery',
    category: 'BCAA / EAA',
    description: 'Unleash continuous recovery during your workouts. Containing 7g of fermented vegan BCAAs in the clinically validated 2:1:1 ratio. Powered with critical hydration electrolytes and coconut water powder to avoid cramping.',
    ingredients: 'L-Leucine, L-Isoleucine, L-Valine, Coconut Water Powder, Sodium Citrate, Potassium Chloride, Magnesium Oxide, Citric Acid, Malic Acid, Stevia Extract, Sunflower Lecithin.',
    benefits: [
      'Saves lean skeletal muscle from breakdown during intensive exercises.',
      'Promotes immediate intra-workout hydration with vital trace elements.',
      'Reduces Delayed Onset Muscle Soreness (DOMS) for quicker turnarounds.',
      'Zero sugars, zero stimulants, completely vegan and fermented ingredients.'
    ],
    usageInstructions: 'Mix 1 scoop (11.5g) in 400-500ml cold water in your shaker bottle. Sip slowly throughout your training session.',
    flavours: ['Tangy Orange Twist', 'Lemon Lime Ice', 'Fruit Punch'],
    sizes: ['30 Servings', '60 Servings'],
    mrp: 2799,
    discountPrice: 1999,
    stockStatus: 'In Stock',
    stockCount: 154,
    rating: 4.6,
    images: [
      'linear-gradient(135deg, #050505 0%, #bf1b1b 100%)',
      'linear-gradient(135deg, #1c1c1c 0%, #ee1b1b 100%)'
    ],
    servingSize: '1 scoop (11.5g)',
    servingsPerContainer: 30,
    nutritionFacts: [
      { name: 'L-Leucine', amount: '3500 mg' },
      { name: 'L-Isoleucine', amount: '1750 mg' },
      { name: 'L-Valine', amount: '1750 mg' },
      { name: 'Coconut Water Powder', amount: '500 mg' },
      { name: 'Sodium', amount: '230 mg', dailyValue: '10%' },
      { name: 'Potassium', amount: '180 mg', dailyValue: '4%' },
      { name: 'Magnesium', amount: '80 mg', dailyValue: '20%' }
    ],
    reviews: [
      { id: 'r7', userName: 'Rohit J.', rating: 4, comment: 'Lemon Lime is super refreshing inside the AC gym. Keeps my cramps away even on heavy squat days.', date: '2026-06-05', verified: true }
    ]
  },
  {
    id: 'p7',
    name: '2ScoopNutritoon Vit-Active Daily Multivitamin',
    category: 'Multivitamins',
    description: 'An advanced multi-nutrient formulation engineered specifically to support active lifestyles. Packed with 25+ essential bioavailable vitamins and minerals, powerful antioxidants, and key joint recovery supports.',
    ingredients: 'Vitamin A, Vitamin C, Vitamin D3, Vitamin E, Vitamin B-Complex, Calcium Carbonate, Zinc Sulphate, Magnesium Oxide, Ashwagandhã Extract, Ginseng Root, Alpha Lipoic Acid, Grape Seed Extract, Piperine, Gelatin, Glycerin.',
    benefits: [
      'Fills key micronutrient gaps created by repetitive high-athletic diets.',
      'Boosts everyday immune function and high metabolic cellular energy.',
      'Joint recovery optimization via vital trace elements and essential antioxidants.',
      'Supports healthy stress management with organic Ashwagandhã.'
    ],
    usageInstructions: 'Take 1 tablet daily with breakfast or your first large meal of the day, accompanied by plenty of water.',
    flavours: ['Unflavoured (Tablets)'],
    sizes: ['60 Tablets', '120 Tablets'],
    mrp: 1199,
    discountPrice: 699,
    stockStatus: 'In Stock',
    stockCount: 198,
    rating: 4.7,
    images: [
      'linear-gradient(135deg, #0d0d0d 0%, #aa2222 100%)',
      'linear-gradient(135deg, #333 0%, #bb1c1c 100%)'
    ],
    servingSize: '1 Tablet',
    servingsPerContainer: 60,
    nutritionFacts: [
      { name: 'Vitamin A (as beta-caratene)', amount: '5000 IU', dailyValue: '100%' },
      { name: 'Vitamin C', amount: '120 mg', dailyValue: '133%' },
      { name: 'Vitamin D3', amount: '1000 IU', dailyValue: '125%' },
      { name: 'Vitamin B12', amount: '12 mcg', dailyValue: '500%' },
      { name: 'Zinc (picolinate)', amount: '15 mg', dailyValue: '136%' },
      { name: 'Ashwagandhã Extract', amount: '250 mg' },
      { name: 'Panax Ginseng', amount: '100 mg' }
    ],
    reviews: [
      { id: 'r8', userName: 'Dr. Vivek S.', rating: 5, comment: 'Excellent multivitamin profiles. Love the addition of adaptogens like Ashwagandhã and Ginseng for natural stress dampening.', date: '2026-06-01', verified: true }
    ]
  },
  {
    id: 'p8',
    name: '2ScoopNutritoon Thermo-Cut Master Fat Burner',
    category: 'Fat Burners',
    description: 'A scientifically validated thermogenic fat burner formulated to maximize lipids oxidation, suppress cravings, and deliver long-lasting, crash-free sensory focus throughout calorie-deficit phases.',
    ingredients: 'Green Tea Extract (ECGC), L-Carnitine Tartrate, Caffeine Anhydrous, Cayenne Pepper Extract (Capsimax®), Yohimbine Hcl, Black Pepper Extract (BioPerine®), Gelatin Capsule.',
    benefits: [
      'Elevates core metabolic rate (releasing clean heat) to burn higher baseline calories.',
      'Directly mobilizes subcutaneous abdominal fatty cells to be burned as active fuel.',
      'Suppresses intense late-afternoon carb cravings and helps regulate insulin safety.',
      'Includes BioPerine® for maximum bioavailability of all core fat-burning extract items.'
    ],
    usageInstructions: 'Take 1 capsule with 250ml water before your main morning meal. Once tolerance is assessed, you may add another capsule after 6 hours before evening cardio.',
    flavours: ['Pre-packaged Capsules'],
    sizes: ['60 Capsules', '120 Capsules'],
    mrp: 2999,
    discountPrice: 1899,
    stockStatus: 'In Stock',
    stockCount: 110,
    rating: 4.5,
    images: [
      'linear-gradient(135deg, #090909 0%, #b81b1b 100%)',
      'linear-gradient(135deg, #ff0000 0%, #111111 100%)'
    ],
    servingSize: '1 Capsule',
    servingsPerContainer: 60,
    nutritionFacts: [
      { name: 'Green Tea Extract (98% Polyphenols)', amount: '350 mg' },
      { name: 'L-Carnitine Tartrate', amount: '250 mg' },
      { name: 'Caffeine Anhydrous', amount: '200 mg' },
      { name: 'Capsimax® Cayenne Pepper Extract', amount: '50 mg' },
      { name: 'Yohimbine HCl (98% purity)', amount: '3 mg' },
      { name: 'BioPerine® Black Pepper', amount: '5 mg' }
    ],
    reviews: [
      { id: 'r9', userName: 'Meera Sen', rating: 5, comment: 'Shed 3% body fat over 6 weeks. It really kicks in sweating during warmups and gives solid focused energy without crashing.', date: '2026-05-18', verified: true }
    ]
  },
  {
    id: 'p9',
    name: '2ScoopNutritoon Whey Crisp Protein Bars',
    category: 'Protein Bars',
    description: 'Stunningly delicious, high-tech triple-layered protein crisp bars. Providing 20g of high biological-value dairy isolates, less than 2g sugar, and rich pre-biotic fibers. Perfect on-the-go fuel.',
    ingredients: 'Protein Blend (Whey Isolate, Milk Isolate, Whey Crisps), Prebiotic Vegetable Fiber, Almond Butter, Dark Chocolate Coating (Unsweetened Chocolate, Erythritol, Cocoa Butter), Soy Lecithin, Stevia.',
    benefits: [
      'Providing 20g of premium isolate proteins to fuel recovery whenever you need it.',
      'Guilt-free snack containing <2g sugar and low net impact carbohydrates.',
      'Stunning crunchy textures and exquisite natural chocolate coatings.',
      'Rich fiber content to promote satiety and support gut microbiome wellness.'
    ],
    usageInstructions: 'Unwrap and enjoy anytime as a high-protein snack, meal replacement, or post-workout reward.',
    flavours: ['Dark Chocolate Crunch', 'Peanut Butter Blast', 'Salted Caramel Crunch'],
    sizes: ['Box of 6 Bars', 'Box of 12 Bars'],
    mrp: 1800,
    discountPrice: 1290,
    stockStatus: 'In Stock',
    stockCount: 220,
    rating: 4.8,
    images: [
      'linear-gradient(135deg, #111 0%, #cc2b2b 100%)',
      'linear-gradient(135deg, #333 0%, #ef2d2d 100%)'
    ],
    servingSize: '1 Bar (60g)',
    servingsPerContainer: 12,
    nutritionFacts: [
      { name: 'Calories', amount: '210 kcal' },
      { name: 'Total Fat', amount: '6 g', dailyValue: '8%' },
      { name: 'Saturated Fat', amount: '2.5 g', dailyValue: '13%' },
      { name: 'Total Carbohydrate', amount: '18 g', dailyValue: '7%' },
      { name: 'Dietary Fiber', amount: '12 g', dailyValue: '43%' },
      { name: 'Sugars', amount: '1.5 g' },
      { name: 'Protein', amount: '20 g', dailyValue: '40%' }
    ],
    reviews: [
      { id: 'r10', userName: 'Rahul K.', rating: 5, comment: 'The Peanut Butter Blast tastes like a real candy bar but checks all my macronutrient macros perfectly. Must buy!', date: '2026-05-14', verified: true }
    ]
  },
  {
    id: 'p10',
    name: '2ScoopNutritoon Raw Whey Concentrate',
    category: 'Whey Protein',
    description: 'An unflavoured, pure 80% raw whey protein concentrate. Ideal for consumers searching for maximum value, raw flexibility, and zero artificial sweeteners. Ready to blend into home recipes.',
    ingredients: '100% Raw Whey Protein Concentrate, Soy Lecithin (0.5% for instantised mixing).',
    benefits: [
      '24g pure, unadulterated protein in every single single serving scoop.',
      'No Artificial Additives, Sweeteners, Preservatives or Gums.',
      'Extremely versatile - blend into fruit shakes or oats perfectly.',
      'Highly economical source of grass-fed import bio-available protein.'
    ],
    usageInstructions: 'Mix 1 scoop (30g) into 200ml cold liquid or blend with bananas and oats for a muscle-boosting morning breakfast.',
    flavours: ['Natural Unflavoured'],
    sizes: ['1 kg / 2.2 lbs', '2 kg / 4.4 lbs'],
    mrp: 4999,
    discountPrice: 3599,
    stockStatus: 'In Stock',
    stockCount: 165,
    rating: 4.7,
    images: [
      'linear-gradient(135deg, #111 0%, #680505 100%)',
      'linear-gradient(135deg, #222 0%, #901c1c 100%)'
    ],
    servingSize: '1 scoop (30g)',
    servingsPerContainer: 33,
    nutritionFacts: [
      { name: 'Calories', amount: '118 kcal' },
      { name: 'Total Fat', amount: '2 g', dailyValue: '3%' },
      { name: 'Saturated Fat', amount: '1.2 g', dailyValue: '6%' },
      { name: 'Total Carbohydrate', amount: '2.5 g', dailyValue: '1%' },
      { name: 'Sugars', amount: '1.5 g' },
      { name: 'Protein', amount: '24 g', dailyValue: '48%' },
      { name: 'Sodium', amount: '60 mg', dailyValue: '3%' }
    ],
    reviews: [
      { id: 'r11', userName: 'Dev Singh', rating: 4, comment: 'Tastes exactly like standard powdered milk, no weird synthetic chemical aftertaste. Added real raw honey and berries. Incredible value!', date: '2026-06-03', verified: true }
    ]
  },
  {
    id: 'p11',
    name: '2ScoopNutritoon Hydro-Whey Ultra Isolate',
    category: 'Isolate Protein',
    description: 'Hydrolyzed whey protein isolate is digested whey split into smaller peptides. This creates an immediate spike in leucine and cellular amino absorption, bypassing conventional digestion barriers.',
    ingredients: 'Hydrolyzed Whey Protein Isolate, Natural Flavours, Enzyme-Modified Sunflower Lecithin, Xanthan Gum, Stevia Extract, Pink Salt.',
    benefits: [
      'Instant peptide form guarantees faster assimilation than regular isolate.',
      'Practically pre-digested - perfect for bodybuilders with weak digestive histories.',
      'Combats post-training muscle catabolism immediately. 6.2g BCAAs.',
      'Filtered down to negligible fat, cholesterol, or simple sugars.'
    ],
    usageInstructions: 'Shake 1 scoop (32g) with 200ml of cold water. Take immediately following intense training sessions.',
    flavours: ['Dutch Triple Chocolate', 'Chai Latte Essence'],
    sizes: ['1 kg / 2.2 lbs'],
    mrp: 8999,
    discountPrice: 6999,
    stockStatus: 'Low Stock',
    stockCount: 8,
    rating: 4.9,
    images: [
      'linear-gradient(135deg, #2a0000 0%, #0d0d0d 100%)',
      'linear-gradient(135deg, #420808 0%, #202020 100%)'
    ],
    servingSize: '1 scoop (32g)',
    servingsPerContainer: 31,
    nutritionFacts: [
      { name: 'Calories', amount: '120 kcal' },
      { name: 'Total Fat', amount: '0.5 g' },
      { name: 'Total Carbohydrate', amount: '1 g' },
      { name: 'Protein', amount: '28 g', dailyValue: '56%' },
      { name: 'BCAAs', amount: '6.2 g' }
    ],
    reviews: [
      { id: 'r12', userName: 'Nikhil R.', rating: 5, comment: 'Absolutely next level. Tastes delicious and absorbs so quickly. Feeling ready for another session much faster.', date: '2026-05-19', verified: true }
    ]
  },
  {
    id: 'p12',
    name: '2ScoopNutritoon Clean Lean Gainer',
    category: 'Mass Gainers',
    description: 'A clean lean mass gainer with a balanced 1.5:1 carbs-to-protein ratio. Formulated without cheap high GI maltodextrin. Uses sweet potato, quinoa, and oat starch to support clean quality muscle growth.',
    ingredients: 'Clean Carbohydrate Matrix (Organic Sweet Potato Powder, Whole Oat Flour, Organic Quinoa Seed Powder), Protein Blend (Cold-Processed Whey Isolate, Whey Concentrate, Micellar Casein), Raw Honey Crystals, MCTs, Cocoa Powder.',
    benefits: [
      'Balanced profile supports lean athletic growth without unwanted fat gains.',
      'Sourced entirely from premium complex carbohydrates.',
      'Added high quality fat sources (MCTs) for cognitive and cellular energy support.',
      'Rich in slow, medium, and rapid multi-phase proteins.'
    ],
    usageInstructions: 'Mix 2 scoops (110g) with 350ml cold water or low-fat dairy milk twice daily.',
    flavours: ['Belgian Chocolate Mint', 'Vanilla Almond Milkshake'],
    sizes: ['2 kg / 4.4 lbs', '4 kg / 8.8 lbs'],
    mrp: 5499,
    discountPrice: 4299,
    stockStatus: 'In Stock',
    stockCount: 42,
    rating: 4.6,
    images: [
      'linear-gradient(135deg, #090909 0%, #e11d48 100%)',
      'linear-gradient(135deg, #2f0f0f 0%, #be123c 100%)'
    ],
    servingSize: '2 scoops (110g)',
    servingsPerContainer: 18,
    nutritionFacts: [
      { name: 'Calories', amount: '440 kcal' },
      { name: 'Total Fat', amount: '6 g', dailyValue: '8%' },
      { name: 'Total Carbohydrate', amount: '56 g', dailyValue: '20%' },
      { name: 'Protein', amount: '40 g', dailyValue: '80%' },
      { name: 'Dietary Fiber', amount: '4 g', dailyValue: '16%' }
    ],
    reviews: [
      { id: 'r13', userName: 'Tanya Roy', rating: 4, comment: 'Clean ingredients. Tastes rich and delicious, and I do not get the heavy insulin crash typical of mass gainers.', date: '2026-05-02', verified: true }
    ]
  },
  {
    id: 'p13',
    name: '2ScoopNutritoon Creapure® Max Creatine',
    category: 'Creatine',
    description: 'Made with 100% Creapure® - the gold standard of German creatine, recognized globally for superior purity, safety, and performance. Zero impurities guaranteed.',
    ingredients: '100% Pure German Creapure® Creatine Monohydrate.',
    benefits: [
      'Purest German Creatine Monohydrate with 99.99% HPLC verified safety profiles.',
      'Sourced from Alzchem Group Germany, entirely free of DCD or DHT byproducts.',
      'Shatters baseline lifting plateaus and boosts dynamic vertical power.',
      'Highly bio-adapted for daily ongoing cellular safety.'
    ],
    usageInstructions: 'Mix 1 scoop (3g) in water or any high-glycemic juice (helps transport). Consume once daily, consistently.',
    flavours: ['Unflavoured (German Quality)'],
    sizes: ['250 g'],
    mrp: 1999,
    discountPrice: 1399,
    stockStatus: 'In Stock',
    stockCount: 145,
    rating: 5,
    images: [
      'linear-gradient(135deg, #111 0%, #ef2c1b 100%)',
      'linear-gradient(135deg, #2c2c2c 0%, #3e3e3e 100%)'
    ],
    servingSize: '1 scoop (3g)',
    servingsPerContainer: 83,
    nutritionFacts: [
      { name: 'Creapure® Creatine', amount: '3000 mg', dailyValue: '100%' }
    ],
    reviews: [
      { id: 'r14', userName: 'Aditya Sen', rating: 5, comment: 'Hands down worth every rupee. Creapure is on another level, no water retention bloat in stomach and pure strength gains.', date: '2026-06-08', verified: true }
    ]
  },
  {
    id: 'p14',
    name: '2ScoopNutritoon Pump-Igniter Stim-Free',
    category: 'Pre Workout',
    description: 'Looking to train at night or highly sensitive to stimulants? This caffeine-free pre-workout delivers skin-tearing nitric oxide pumps, mental clarity, and zero impact on sleep schedules.',
    ingredients: 'L-Citrulline Malate 2:1, Nitrosigine®, Glycersize®, Agmatine Sulfate, L-Tyrosine, Pink Salt, Pine Bark Extract, Organic Stevia, Natural Fruit Extract.',
    benefits: [
      '100% caffeine and stimulant-free. Focus-driven vascular expansion.',
      'Featuring Nitrosigine® and Glycersize® for extreme muscle hardness.',
      'Allows intensive late-night workouts without destroying Circadian rhythms.',
      'Maintains hydration with organic trace elements and coconut cells.'
    ],
    usageInstructions: 'Mix 1 scoop (12g) in 250ml cold water 20 minutes before training.',
    flavours: ['Peach Mango Fusion', 'Sour Strawberry Candy'],
    sizes: ['30 Servings'],
    mrp: 3299,
    discountPrice: 2299,
    stockStatus: 'In Stock',
    stockCount: 55,
    rating: 4.8,
    images: [
      'linear-gradient(135deg, #090909 0%, #444 100%)',
      'linear-gradient(135deg, #333 0%, #cc0000 100%)'
    ],
    servingSize: '1 scoop (12g)',
    servingsPerContainer: 30,
    nutritionFacts: [
      { name: 'L-Citrulline Malate (2:1)', amount: '6000 mg' },
      { name: 'Nitrosigine® (Inositol-Silicate)', amount: '1500 mg' },
      { name: 'GlycerSize™ Glycerol Powder', amount: '2000 mg' },
      { name: 'Agmatine Sulfate', amount: '1000 mg' },
      { name: 'L-Tyrosine', amount: '1500 mg' }
    ],
    reviews: [
      { id: 'r15', userName: 'Gaurav K.', rating: 5, comment: 'Insane pumps! I train at 8 PM and sleep like a baby by 11. Nitrosigine is real magic.', date: '2026-05-25', verified: true }
    ]
  },
  {
    id: 'p15',
    name: '2ScoopNutritoon Amino-Fuel 9 Essential Aminos',
    category: 'BCAA / EAA',
    description: 'Comprehensive essential amino-acid formula supplying all 9 EAAs that the body cannot manufacture on its own. Clinically mapped to maximize muscle protein synthesis and retain zero waste tissue.',
    ingredients: 'EAA Blend (L-Lysine, L-Threonine, L-Phenylalanine, L-Trish, L-Histidine, L-Methionine, L-Leucine, L-Isoleucine, L-Valine), Astragin® cellular absorber, Electrolyte Complex.',
    benefits: [
      'Contains all 9 essential aminos required for master tissue creation.',
      'Slightly faster muscle synthesis stimulation compared to BCAAs alone.',
      'AstraGin® enhanced for 30% increased intestinal amino-acid absorption.',
      'Perfect intra-workout shield for cut dieting phases.'
    ],
    usageInstructions: 'Stir 1 scoop (10g) inside 300ml cold water. Sip throughout dynamic muscle workouts or between meals.',
    flavours: ['Pineapple Coconut', 'Tropical Guava Splash'],
    sizes: ['30 Servings'],
    mrp: 2999,
    discountPrice: 2199,
    stockStatus: 'In Stock',
    stockCount: 78,
    rating: 4.7,
    images: [
      'linear-gradient(135deg, #111 0%, #bb2b11 100%)',
      'linear-gradient(135deg, #aa1a1a 0%, #444 100%)'
    ],
    servingSize: '1 scoop (10g)',
    servingsPerContainer: 30,
    nutritionFacts: [
      { name: 'Total Essential Amino Acids', amount: '8500 mg' },
      { name: 'L-Leucine (BCAA)', amount: '3000 mg' },
      { name: 'L-Lysine Hcl', amount: '1200 mg' },
      { name: 'L-Threonine', amount: '1000 mg' },
      { name: 'AstraGin® Absorption Booster', amount: '50 mg' }
    ],
    reviews: [
      { id: 'r16', userName: 'Karan Malhotra', rating: 5, comment: 'Tropical Guava flavor is outstanding. EAAs have totally replaced standard sugary BCAAs in my stack and recovery feels much sharper.', date: '2026-05-11', verified: true }
    ]
  },
  {
    id: 'p16',
    name: '2ScoopNutritoon Joint Shield Defense Support',
    category: 'Multivitamins',
    description: 'Heavy lifting tears microscopic fibers in joints, cartilage, and ligaments. Focus-built with therapeutic doses of Glucosamine, Chondroitin, MSM, and organic Turmeric Extract to keep you pain-free.',
    ingredients: 'Glucosamine Sulfate, Chondroitin Sulfate, Methylsulfonylmethane (MSM), Boswellia Serrata, Turmeric Root Extract (95% curcuminoids), Hyaluronic Acid, Cissus Quadrangularis.',
    benefits: [
      'Repairs heavy cartilage cells damaged from dense load squat lifts.',
      'Soothes joint inflammation through natural Boswellia and Turmeric.',
      'Lubricates synovial joints with clinical Hyaluronic Acid fluid.',
      'Enhances bone density under repetitive structural pressure loads.'
    ],
    usageInstructions: 'Take 2 tablets daily with water, preferably alongside lunch.',
    flavours: ['Unflavoured Tablets'],
    sizes: ['90 Tablets'],
    mrp: 1899,
    discountPrice: 1199,
    stockStatus: 'In Stock',
    stockCount: 88,
    rating: 4.8,
    images: [
      'linear-gradient(135deg, #090909 0%, #b81b1b 100%)',
      'linear-gradient(135deg, #444 0%, #cc1c1c 100%)'
    ],
    servingSize: '2 Tablets',
    servingsPerContainer: 45,
    nutritionFacts: [
      { name: 'Glucosamine Sulfate', amount: '1500 mg' },
      { name: 'Chondroitin Sulfate', amount: '800 mg' },
      { name: 'MSM (Methylsulfonylmethane)', amount: '1000 mg' },
      { name: 'Turmeric Root Extract', amount: '200 mg' },
      { name: 'Hyaluronic Acid', amount: '50 mg' }
    ],
    reviews: [
      { id: 'r17', userName: 'Rajesh Nair', rating: 5, comment: 'My knee click and paint while squatting went from agonizing to completely unnoticeable over 4 weeks of consistent use. Amazing stuff!', date: '2026-04-30', verified: true }
    ]
  },
  {
    id: 'p17',
    name: '2ScoopNutritoon Carnitine-3000 Pure Liquid',
    category: 'Fat Burners',
    description: 'Unleash ultra-performance body composition. Premium high-speed liquid Carnitine supplying 3000mg of L-Carnitine per dose. Transports free fat acids into the cellular mitochondria to be burned immediately for energy.',
    ingredients: 'Water, Purified L-Carnitine, Vegetable Glycerol, Phosphoric Acid, Malic Acid, Natural Mango Flavour, Sucralose, Potassium Sorbate.',
    benefits: [
      'Extreme high dosage of 3,000mg pure, liquid carnitine.',
      'Forces fat burning and utilizes stored lipids for dynamic workout fuel.',
      'Zero carbs, zero artificial dyes, and zero stimulant jitters.',
      'Faster systemic delivery mechanism than tablet/capsule carnitines.'
    ],
    usageInstructions: 'Take 1 tablespoon (15ml) directly or mixed with water 15 minutes before high-intensity cardio exercises or conditioning days.',
    flavours: ['Mango Blast Liquid', 'Tangy Green Apple'],
    sizes: ['450 ml'],
    mrp: 2499,
    discountPrice: 1499,
    stockStatus: 'In Stock',
    stockCount: 130,
    rating: 4.6,
    images: [
      'linear-gradient(135deg, #111 0%, #d51b1b 100%)',
      'linear-gradient(135deg, #1e1e1e 0%, #9a1a1a 100%)'
    ],
    servingSize: '1 Tablespoon (15ml)',
    servingsPerContainer: 30,
    nutritionFacts: [
      { name: 'L-Carnitine Pure', amount: '3000 mg' },
      { name: 'Pantothenic Acid (Vitamin B5)', amount: '10 mg', dailyValue: '200%' }
    ],
    reviews: [
      { id: 'r18', userName: 'Anjali Sharma', rating: 4, comment: 'Mango flavor tastes like syrup, love the sweat it generates during HIIT sprints. Very effective.', date: '2026-06-03', verified: true }
    ]
  },
  {
    id: 'p18',
    name: '2ScoopNutritoon High-Protein Fudge Bar',
    category: 'Protein Bars',
    description: 'A decadent, baked fudge bar with chewy chocolate chunks. Packing 22g protein, 8g pre-biotic fiber, and real cocoa fudge filling for an amazing dessert-like supplement experience.',
    ingredients: 'Milk Protein Isolate, Real Cocoa Fudge Filling, Soluble Corn Fiber, Whey Protein Isolate, Vegetable Glycerin, Cocoa Butter, Natural Chocolate Flavour, Sucralose.',
    benefits: [
      '22g premium slow & rapid digesting milk and whey proteins.',
      'Slo-baked texture replicates real chocolate fudge cake.',
      'Under 1g sugar and incredibly low on impact net carbs.',
      'Boosts glycogen repair and satisfies chocolate cravings instantly.'
    ],
    usageInstructions: 'Enjoy post-workout, on the road, or warm in the microwave for 10 seconds for a delicious warm dessert cake!',
    flavours: ['Double Chocolate Fudge', 'Caramel Fudge Brownie'],
    sizes: ['Box of 12 Bars'],
    mrp: 2100,
    discountPrice: 1590,
    stockStatus: 'In Stock',
    stockCount: 160,
    rating: 4.9,
    images: [
      'linear-gradient(135deg, #191919 0%, #a80a0a 100%)',
      'linear-gradient(135deg, #2b2b2b 0%, #ff2020 100%)'
    ],
    servingSize: '1 Bar (65g)',
    servingsPerContainer: 12,
    nutritionFacts: [
      { name: 'Calories', amount: '220 kcal' },
      { name: 'Total Fat', amount: '7 g', dailyValue: '9%' },
      { name: 'Saturated Fat', amount: '3 g', dailyValue: '15%' },
      { name: 'Total Carbohydrate', amount: '19 g', dailyValue: '7%' },
      { name: 'Dietary Fiber', amount: '9 g', dailyValue: '32%' },
      { name: 'Sugars', amount: '0.8 g' },
      { name: 'Protein', amount: '22 g', dailyValue: '44%' }
    ],
    reviews: [
      { id: 'r19', userName: 'Priya V.', rating: 5, comment: 'Pop it in the microwave for 10 seconds like the box says. Absolutely heavenly. Flavour is deep cacao.', date: '2026-05-20', verified: true }
    ]
  },
  {
    id: 'p19',
    name: '2ScoopNutritoon Casein Night Slow-Release',
    category: 'Whey Protein',
    description: 'Micellar Casein premium nighttime protein is designed to digest slowly over 7-8 hours. Supplying amino-acids into your blood continuously during sleep, preventing nighttime catabolism.',
    ingredients: '100% Premium Micellar Casein, Cocoa Powder, Sunflower Lecithin, Xanthan Gum, Stevia Extract, Probiotic Blend.',
    benefits: [
      'Slow, sustained amino-acid delivery prevents nighttime muscle wasting.',
      'Provides 25g micellar protein per scoop representing rich biological values.',
      'Incredibly creamy thick consistency - feels like custom pudding.',
      'Added probiotic cultures to support optimal gut synthesis.'
    ],
    usageInstructions: 'Mix 1 scoop in 250ml cold water or milk using a blender. Consume immediately before sleeping.',
    flavours: ['Fudge Chocolate Milkshake', 'Creamy French Vanilla'],
    sizes: ['1 kg / 2.2 lbs', '2 kg / 4.4 lbs'],
    mrp: 5999,
    discountPrice: 4499,
    stockStatus: 'In Stock',
    stockCount: 62,
    rating: 4.8,
    images: [
      'linear-gradient(135deg, #1a0000 0%, #000 100%)',
      'linear-gradient(135deg, #3a0000 0%, #1f1f1f 100%)'
    ],
    servingSize: '1 scoop (33g)',
    servingsPerContainer: 30,
    nutritionFacts: [
      { name: 'Calories', amount: '120 kcal' },
      { name: 'Total Fat', amount: '1 g', dailyValue: '1%' },
      { name: 'Total Carbohydrate', amount: '2 g', dailyValue: '1%' },
      { name: 'Sugars', amount: '0.5 g' },
      { name: 'Protein', amount: '25 g', dailyValue: '50%' },
      { name: 'Calcium', amount: '450 mg', dailyValue: '35%' }
    ],
    reviews: [
      { id: 'r20', userName: 'Harsh Vardhan', rating: 5, comment: 'Makes a really thick chocolate pudding if you use slightly less water. Keeps me full through the night and reduces next-day muscle soreness.', date: '2026-06-01', verified: true }
    ]
  },
  {
    id: 'p20',
    name: '2ScoopNutritoon ZMA Recovery Booster',
    category: 'Multivitamins',
    description: 'An advanced combination of highly bioavailable Zinc, Magnesium, and Vitamin B6. Formulated to optimize sleep, healthy hormone production, and accelerate neuro-skeletal repair.',
    ingredients: 'Zinc Monomethionine, Magnesium Aspartate, Pyridoxine Hydrochloride (Vitamin B6), Rice Flour, Gelatin Cap.',
    benefits: [
      'Supports healthy testosterone levels and hormonal production.',
      'Enables deep, restorative REM sleep cycles.',
      'Reduces muscle cramps, micro-spasms, and morning muscle stiffness.',
      'Excellent absorption synergy with standard clinical doses.'
    ],
    usageInstructions: 'Men take 3 capsules (Women take 2 capsules) daily, preferably on an empty stomach 30-60 minutes before bedtime.',
    flavours: ['Standard Capsules'],
    sizes: ['90 Veg Capsules'],
    mrp: 1499,
    discountPrice: 999,
    stockStatus: 'In Stock',
    stockCount: 180,
    rating: 4.7,
    images: [
      'linear-gradient(135deg, #090909 0%, #a80e0e 100%)',
      'linear-gradient(135deg, #2b2b2b 0%, #444 100%)'
    ],
    servingSize: '3 Capsules',
    servingsPerContainer: 30,
    nutritionFacts: [
      { name: 'Zinc (as monomethionine)', amount: '30 mg', dailyValue: '273%' },
      { name: 'Magnesium (as aspartate)', amount: '450 mg', dailyValue: '107%' },
      { name: 'Vitamin B6', amount: '10.5 mg', dailyValue: '618%' }
    ],
    reviews: [
      { id: 'r21', userName: 'Aman Deep', rating: 5, comment: 'Noticeable difference in sleep quality and vivid dreams. Morning recovery is exceptionally fresh since taking this.', date: '2026-05-15', verified: true }
    ]
  },
  {
    id: 'p21',
    name: '2ScoopNutritoon Vegan Pea & Brown Rice Protein',
    category: 'Isolate Protein',
    description: 'A premium, completely natural plant-based protein isolate. Synthesizing organic yellow peas and brown rice protein to deliver a full essential amino acid spectrum with zero grittiness.',
    ingredients: 'Organic Pea Protein Isolate, Organic Sprouted Brown Rice Protein, Natural Cocoa, Stevia Rebaudiana Extract, Pink salt, Organic Coconut Water Spray-Dried Powder, Digezyme.',
    benefits: [
      '22g 100% plant-based premium hypoallergenic protein.',
      'Complete essential amino-acids profile mapping similar to true whey.',
      'Zero dairy, soy, gluten, or artificial synthetic dyes.',
      'Sustainably sourced and completely gut-friendly.'
    ],
    usageInstructions: 'Blend 1 scoop (32g) with 250ml almond milk, cold water, or coconut water.',
    flavours: ['Velvety Belgian Chocolate', 'Vanilla Bean Spiced'],
    sizes: ['1 kg / 2.2 lbs'],
    mrp: 3999,
    discountPrice: 2899,
    stockStatus: 'In Stock',
    stockCount: 52,
    rating: 4.7,
    images: [
      'linear-gradient(135deg, #111 0%, #e02424 100%)',
      'linear-gradient(135deg, #2f2f2f 0%, #520c0c 100%)'
    ],
    servingSize: '1 scoop (32g)',
    servingsPerContainer: 31,
    nutritionFacts: [
      { name: 'Calories', amount: '125 kcal' },
      { name: 'Total Fat', amount: '2 g', dailyValue: '3%' },
      { name: 'Saturated Fat', amount: '0.5 g', dailyValue: '2%' },
      { name: 'Sodium', amount: '310 mg', dailyValue: '13%' },
      { name: 'Total Carbohydrate', amount: '3 g', dailyValue: '1%' },
      { name: 'Dietary Fiber', amount: '2 g', dailyValue: '8%' },
      { name: 'Protein', amount: '22 g', dailyValue: '44%' }
    ],
    reviews: [
      { id: 'r22', userName: 'Shruti V.', rating: 4, comment: 'Surprisingly smooth and tasty for a plant protein. Does not feel gritty or dry. Chocolate flavor is rich. Highly recommended!', date: '2026-06-02', verified: true }
    ]
  },
  {
    id: 'p22',
    name: '2ScoopNutritoon Pure Glutamine Micronized',
    category: 'BCAA / EAA',
    description: '100% pure premium micronized l-glutamine. Excellent support for intestinal mucosal health, immune defenses, and rapid muscular glycogen replenishment after heavy training.',
    ingredients: '100% Pure Micronized L-Glutamine.',
    benefits: [
      'Crucial amino acid representing nearly 60% of skeletal stores.',
      'Acts as cell volumizing and immunological defense fluid.',
      'Crucial support for leaky guts or dynamic digestive cellular repair.',
      'Mixes instantly, odorless, and pure premium quality.'
    ],
    usageInstructions: 'Mix 1 scoop (5g) in your favorite pre, intra, or post workout drink. Take daily.',
    flavours: ['Unflavoured Purity'],
    sizes: ['250 g', '500 g'],
    mrp: 1499,
    discountPrice: 999,
    stockStatus: 'In Stock',
    stockCount: 160,
    rating: 4.8,
    images: [
      'linear-gradient(135deg, #090909 0%, #e11d48 100%)',
      'linear-gradient(135deg, #333 0%, #111 100%)'
    ],
    servingSize: '1 scoop (5g)',
    servingsPerContainer: 50,
    nutritionFacts: [
      { name: 'L-Glutamine Micronized', amount: '5000 mg', dailyValue: '100%' }
    ],
    reviews: [
      { id: 'r23', userName: 'Devbrat C.', rating: 5, comment: 'Lifts up my stomach immunity immensely. If you lift heavy, Glutamine with water post-workout is mandatory.', date: '2026-05-21', verified: true }
    ]
  }
];

export const FAQS: FAQ[] = [
  {
    category: 'Products & Quality',
    question: 'How do I check if my 2ScoopNutritoon product is authentic?',
    answer: 'Every 2ScoopNutritoon tub features a unique scratched QR inside the wrap. Rub to reveal the 12-digit security pin and scan the code using our official verification tool to instantly receive confirmation. We manufacture in high-standard ISO & GMP certified labs only.'
  },
  {
    category: 'Products & Quality',
    question: 'Are 2ScoopNutritoon supplements lab-tested for heavy metals?',
    answer: 'Yes, 100%. Every single batch undergoes third-party blind testing for heavy metals, pathogens, banned substances, and protein accuracy. You can view third-party certificate analyses by sending us your batch number.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'How long does shipping take and is it free?',
    answer: 'We offer free standard shipping on all prepaid orders above ₹999. Orders are processed within 24 hours of booking and usually reach metro areas in 2-3 business days, and other areas in 4-6 business days.'
  },
  {
    category: 'Payments & Offers',
    question: 'What payment options do you support? Is Razorpay ready?',
    answer: 'We support all UPI applications, credit cards, debit cards, net banking, and Cash on Delivery (COD). Our backend is fully prepped to launch live Razorpay transactions with minimal code updates once production keys are enabled.'
  },
  {
    category: 'Refunds & Returns',
    question: 'What is your refund policy?',
    answer: 'We offer a 7-day hassle-free, seal-unbroken return or exchange policy if the original container is undamaged. If you receive a physically compromised tub, we will issue a replacement or full refund within 3 days.'
  },
  {
    category: 'Dosage & Safety',
    question: 'Should I do a loading phase with Creatine?',
    answer: 'You do not have to! You can load on 15g to 20g daily for 5 days to speed cellular saturation, or simply consume 3-5g daily. Consuming 3g on a continuous schedule gets you fully saturated within 3 weeks and reduces stomach irritation.'
  }
];

export const SAMPLE_COUPONS = [
  { code: 'GETSCOOP10', type: 'percentage', value: 10, minSpend: 1500, isActive: true, description: '10% OFF on purchases of ₹1,500 and above' },
  { code: 'DOUBLEPOWER', type: 'fixed', value: 500, minSpend: 3999, isActive: true, description: 'Flat ₹500 OFF on premium stacks above ₹3,999' },
  { code: 'FIT2SCOOP', type: 'percentage', value: 15, minSpend: 5000, isActive: true, description: 'Premium 15% OFF on elite collections above ₹5,000' }
];
