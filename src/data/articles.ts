import { Article } from '../types/content';

export const ARTICLES_DATA: Article[] = [
  // --- Category 1: Desi Food & Traditional Recipes ---
  {
    id: 'art-pakistani-karahi',
    slug: 'authentic-pakistani-chicken-karahi',
    title: 'Authentic Pakistani Chicken Karahi: Technique & History',
    subtitle: 'Why the iron wok and tomato reduction remain the soul of Punjabi and Pashtun cooking',
    excerpt: 'Explore the culinary history of the traditional iron karahi, the secrets of tomato emulsification, and why real street-style karahi never needs onions or cream.',
    category: 'Desi Food',
    subcategory: 'Pakistani Food',
    cuisine: 'Pakistani',
    image: '/src/assets/images/chicken_karahi_1792407742450.jpg',
    featured: true,
    publishedDate: 'October 12, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Chef Tariq Mansoor',
      role: 'South Asian Culinary Historian',
    },
    tags: ['Pakistani Food', 'Chicken Karahi', 'Desi Cooking', 'Street Food', 'Punjab'],
    linkedRecipeSlug: 'pakistani-chicken-karahi',
    sections: [
      {
        heading: 'The Iron Crucible of Flavor',
        paragraphs: [
          'Across the grand roadside dhabas from Karachi’s Burns Road to Lahore’s Lakshmi Chowk and Peshawar’s Namak Mandi, the percussive sound of steel spoons against cast iron announces the creation of true Chicken Karahi.',
          'Unlike Western curries or Anglo-Indian restaurant sauces that lean on pureed onion gravies, true Pakistani karahi is defined by extreme heat, rapid bhunai (stir-fry braising), and a pure reduction of sweet plum tomatoes and chicken fond.',
        ],
      },
      {
        heading: 'Why You Must Skip Onions',
        paragraphs: [
          'Purists from the Shinwari and Khyber regions will passionately tell you: onions introduce excess water and sweet notes that dilute the sharp acidity of ripe tomatoes and the pungent bite of fresh ginger.',
          'When chicken is browned directly in ghee with garlic and simmered under halved tomatoes, the natural pectin in the tomato pulp breaks down into a luxurious, clingy glaze that coats every fiber of the meat.',
        ],
        callout: {
          type: 'tip',
          source: 'Chef Tariq Mansoor',
          text: 'The best karahis are finished with raw matchstick ginger and freshly cracked black peppercorns added in the final 60 seconds off the flame.',
        },
      },
      {
        heading: 'Regional Variations: Lahori vs Shinwari',
        paragraphs: [
          'Lahori Karahi embraces a spice bouquet with crushed coriander seeds, cumin, and Kashmiri chili, yielding a crimson, aromatic sauce.',
          'In contrast, Shinwari Karahi from the northwest frontier restricts itself strictly to meat, fat, salt, tomatoes, green chilies, and black pepper, honoring the pristine natural flavor of the poultry or pasture-fed lamb.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'Authentic Pakistani Chicken Karahi Guide',
      pinDescription: 'The real secrets behind Pakistani Chicken Karahi: iron wok cooking, no onions, ripe tomatoes, and fresh ginger julienne.',
      pinImage: '/src/assets/images/chicken_karahi_1792407742450.jpg',
      aspectRatio: '2:3',
      keywords: ['Pakistani Karahi', 'Desi Food', 'Curry Guide', 'Lahore Food'],
    },
  },
  {
    id: 'art-chicken-biryani',
    slug: 'how-to-make-traditional-chicken-biryani',
    title: 'The Art of Royal Dum Biryani: Grain Separation & Fragrance',
    subtitle: 'From the royal courts of Awadh and Hyderabad to Karachi street stalls',
    excerpt: 'Master the delicate thermodynamics of dum cooking: how parboiling basmati rice to exactly 70% and sealing steam preserves pristine grain length.',
    category: 'Desi Food',
    subcategory: 'Pakistani Food',
    cuisine: 'Pakistani',
    image: '/src/assets/images/chicken_biryani_1792407744625.jpg',
    featured: true,
    publishedDate: 'October 15, 2026',
    readTimeMinutes: 7,
    author: {
      name: 'Chef Tariq Mansoor',
      role: 'South Asian Culinary Historian',
    },
    tags: ['Biryani', 'Basmati Rice', 'Mughlai Cuisine', 'Dum Cooking', 'Pakistani Food'],
    linkedRecipeSlug: 'traditional-chicken-biryani',
    sections: [
      {
        heading: 'The Alchemy of Dum Pukht',
        paragraphs: [
          'Dum pukht — literally "air-tight steam cooking" — was refined in 18th-century royal Mughal kitchens. By sealing meat and rice inside a heavy vessel, aromatic volatile oils from green cardamom, star anise, and mace have no escape route except into the starch lattice of the rice.',
          'The triumph of a great biryani is that every grain of basmati stands proud, unbroken, and imbued with flavor without turning mushy or sticking to its neighbor.',
        ],
      },
      {
        heading: 'The 70% Parboil Rule',
        paragraphs: [
          'The single most common mistake home cooks make is overcooking the rice before layering. If boiled past 70% completion, the steam trapped during the 25-minute sealed dum stage will rupture the grains.',
          'When testing boiling rice, retrieve a grain and press it between your thumb and forefinger: it should yield slightly on the outside but retain a firm, chalky white core that breaks into three clean pieces.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'How to Cook Perfect Traditional Chicken Dum Biryani',
      pinDescription: 'Step-by-step masterclass on aromatic dum biryani, saffron basmati rice layering, and crispy fried onions.',
      pinImage: '/src/assets/images/chicken_biryani_1792407744625.jpg',
      aspectRatio: '2:3',
      keywords: ['Biryani Recipe', 'Dum Biryani', 'Basmati Rice', 'Pakistani Recipes'],
    },
  },
  {
    id: 'art-beef-nihari-secrets',
    slug: 'secrets-of-homemade-beef-nihari',
    title: 'The Secrets of Homemade Beef Nihari',
    subtitle: 'Slow-simmered beef shank stew with bone marrow and whole roasted spices',
    excerpt: 'Originating in Old Delhi and perfected in Karachi, Nihari was traditionally eaten at sunrise. Learn how slow braising creates melt-in-the-mouth shank and velvety gravy.',
    category: 'Desi Food',
    subcategory: 'Pakistani Food',
    cuisine: 'Pakistani',
    image: '/src/assets/images/chicken_karahi_1792407742450.jpg',
    featured: false,
    publishedDate: 'October 16, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Chef Tariq Mansoor',
      role: 'South Asian Culinary Historian',
    },
    tags: ['Nihari', 'Beef Stew', 'Karachi Food', 'Slow Cooking', 'Pakistani Breakfast'],
    sections: [
      {
        heading: 'The Sunrise Stew of Nawabs',
        paragraphs: [
          'Derived from the Arabic word "Nahar" (morning), Nihari was historically consumed by royalty and laborers alike before morning prayers for sustained stamina.',
          'The essence of Nihari lies in bone-in beef shank (bong) layered with gelatinous marrow that slowly renders over 6 to 8 hours into a rich, silky broth thickened with toasted whole-wheat atta flour.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'Secrets to Authentic Homemade Beef Nihari',
      pinDescription: 'Discover the heritage spices, slow braising times, and wheat flour roux for legendary Pakistani Beef Nihari.',
      pinImage: '/src/assets/images/chicken_karahi_1792407742450.jpg',
      aspectRatio: '2:3',
      keywords: ['Nihari', 'Pakistani Food', 'Beef Shank', 'Desi Stew'],
    },
  },
  {
    id: 'art-butter-chicken',
    slug: 'traditional-indian-butter-chicken',
    title: 'Traditional Indian Butter Chicken (Murgh Makhani)',
    subtitle: 'The Delhi origins, charred tandoori chicken, and silky fenugreek tomato makhani',
    excerpt: 'Invented at Moti Mahal in Delhi during the 1950s, real Butter Chicken balances charred clay-oven chicken with sweet cream, dried kasuri methi, and pure butter.',
    category: 'Desi Food',
    subcategory: 'Indian Food',
    cuisine: 'Indian',
    image: '/src/assets/images/chicken_biryani_1792407744625.jpg',
    featured: true,
    publishedDate: 'October 17, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Ananya Sharma',
      role: 'North Indian Regional Cuisine Specialist',
    },
    tags: ['Butter Chicken', 'Murgh Makhani', 'Indian Food', 'Curry', 'Delhi'],
    sections: [
      {
        heading: 'The Tandoor Meets Velvet Sauce',
        paragraphs: [
          'Kundan Lal Gujral revolutionized Punjabi cuisine when he sought a way to revive tandoori chicken skewers from drying out in the restaurant kitchen. By tossing charred chicken morsels into a rich gravy of tomatoes, butter, and cream, Murgh Makhani was born.',
          'The secret ingredient that distinguishes commercial curries from restaurant masterpieces is kasuri methi (sun-dried fenugreek leaves), crushed between warm palms right before plating to release warm maple-like aromas.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'Authentic Indian Butter Chicken (Murgh Makhani)',
      pinDescription: 'Make iconic Delhi-style butter chicken at home: tandoori char, silky tomato-cashew gravy, and kasuri methi.',
      pinImage: '/src/assets/images/chicken_biryani_1792407744625.jpg',
      aspectRatio: '2:3',
      keywords: ['Butter Chicken', 'Indian Cuisine', 'Murgh Makhani', 'Curry'],
    },
  },
  {
    id: 'art-bangladeshi-kacchi-biryani',
    slug: 'traditional-bangladeshi-kacchi-biryani',
    title: 'Traditional Bangladeshi Kacchi Biryani & Dhaka Foodways',
    subtitle: 'The magic of raw spiced mutton and small-grain chinigura rice cooked together',
    excerpt: 'Unlike cooked-meat biryanis, Dhaka’s famed Old Town Kacchi Biryani cooks raw marinated mutton directly with aromatic rice in sealed clay pots.',
    category: 'Desi Food',
    subcategory: 'Bangladeshi Food',
    cuisine: 'Bangladeshi',
    image: '/src/assets/images/chicken_biryani_1792407744625.jpg',
    featured: false,
    publishedDate: 'October 18, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Tanvir Hossain',
      role: 'Bengal Heritage Food Chronicler',
    },
    tags: ['Bangladeshi Food', 'Kacchi Biryani', 'Dhaka', 'Old Town', 'Chinigura Rice'],
    sections: [
      {
        heading: 'Raw Precision: The Kacchi Method',
        paragraphs: [
          'In Bengali, "Kacchi" translates directly to "raw". The culinary challenge is staggering: raw marinated chunks of goat or lamb sit at the bottom of a heavy handi while par-cooked rice is piled on top. The cooking time must align perfectly so the meat softens into butter just as the fragrant rice reaches toothsome perfection.',
          'Often prepared with indigenous aromatic Chinigura or Kalijira rice rather than elongated basmati, Bangladeshi Kacchi is distinguished by golden spiced potatoes, aloo bukhara (sour dried plums), and a generous dose of mace and nutmeg.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'Authentic Bangladeshi Kacchi Biryani Guide',
      pinDescription: 'Old Dhaka Kacchi Biryani secrets: raw mutton marinade, chinigura rice, and tender golden potatoes.',
      pinImage: '/src/assets/images/chicken_biryani_1792407744625.jpg',
      aspectRatio: '2:3',
      keywords: ['Bangladeshi Food', 'Kacchi Biryani', 'Dhaka Food', 'Desi Cooking'],
    },
  },

  // --- Category 2: Western & International Food ---
  {
    id: 'art-american-cheeseburger',
    slug: 'how-to-make-the-perfect-american-cheeseburger',
    title: 'The Science of the Perfect American Cheeseburger',
    subtitle: 'Maillard reaction, griddle thermodynamics, and the 80/20 beef chuck rule',
    excerpt: 'Why smashing beef balls onto a smoking hot dry griddle creates the crispiest lace edges and juiciest bites, plus bread-to-meat ratio geometry.',
    category: 'Western Food',
    subcategory: 'American Food',
    cuisine: 'American',
    image: '/src/assets/images/american_cheeseburger_1792407744496.jpg',
    featured: true,
    publishedDate: 'October 16, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Marcus Vance',
      role: 'American Diner & Grill Historian',
    },
    tags: ['Cheeseburger', 'Smash Burger', 'American Food', 'Cast Iron', 'Comfort Food'],
    linkedRecipeSlug: 'classic-american-cheeseburger',
    sections: [
      {
        heading: 'The Physics of the Crust',
        paragraphs: [
          'The quintessential American diner smash burger is not merely a recipe; it is an exercise in food physics. When loose ground beef chuck hits cast iron heated to over 400°F (204°C) and is pressed flat within seconds, amino acids and reducing sugars trigger the rapid Maillard reaction.',
          'This chemical transformation creates hundreds of new flavor compounds, forging the unmistakable savory umami crust that defines world-class burgers.',
        ],
      },
      {
        heading: 'Bun Architecture Matters',
        paragraphs: [
          'A burger must hold its structural integrity from the first bite to the last. Brioche or soft potato rolls offer the ideal yield: soft enough to compress comfortably without squeezing juices out of the rear, yet rich enough with butter to toast into a moisture barrier against sauce.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'The Secret to Perfect American Smash Burgers',
      pinDescription: 'Master cast-iron smash burger physics: 80/20 beef chuck, high-heat sear, and melted sharp cheddar cheese.',
      pinImage: '/src/assets/images/american_cheeseburger_1792407744496.jpg',
      aspectRatio: '2:3',
      keywords: ['Burger Recipe', 'Smash Burger', 'American Food', 'Cheeseburger Guide'],
    },
  },
  {
    id: 'art-british-fish-chips',
    slug: 'traditional-british-fish-and-chips-guide',
    title: 'Traditional British Fish and Chips: The Coastal Heritage',
    subtitle: 'From Victorian East London fryers to modern coastal seaside fish bars',
    excerpt: 'The story of how fried fish and chipped potatoes united Britain during wartime rationing, and the modern science of carbonated beer batter.',
    category: 'Western Food',
    subcategory: 'British Food',
    cuisine: 'British',
    image: '/src/assets/images/fish_and_chips_1792407746022.jpg',
    featured: true,
    publishedDate: 'October 17, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Oliver Sterling',
      role: 'British Heritage Food Correspondent',
    },
    tags: ['British Food', 'Fish and Chips', 'Pub Classics', 'Seaside Food', 'Beer Batter'],
    linkedRecipeSlug: 'traditional-british-fish-and-chips',
    sections: [
      {
        heading: 'A National Institution',
        paragraphs: [
          'First brought to England by Sephardic Jewish immigrants in the 17th century, fried fish in flour batter paired with chipped potatoes became Britain’s defining comfort food by the mid-19th century.',
          'It remained one of the few foods in the United Kingdom never subjected to rationing during World War II, protected by Winston Churchill as a vital safeguard of national morale.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'Guide to Authentic British Fish and Chips',
      pinDescription: 'The history, beer batter physics, and vinegar pairing rules behind traditional British pub fish and chips.',
      pinImage: '/src/assets/images/fish_and_chips_1792407746022.jpg',
      aspectRatio: '2:3',
      keywords: ['British Food', 'Fish and Chips', 'Pub Classic', 'Seaside Recipe'],
    },
  },
  {
    id: 'art-italian-pizza-dough',
    slug: 'authentic-italian-margherita-pizza-guide',
    title: 'Authentic Italian Margherita Pizza: Dough Hydration & Fermentation',
    subtitle: 'Why cold fermentation, high heat, and Italian Tipo 00 flour transform home pizza',
    excerpt: 'Learn the strict disciplinarian standards of the Associazione Verace Pizza Napoletana (AVPN) and how to replicate wood-fired magic in your domestic kitchen.',
    category: 'Western Food',
    subcategory: 'Italian Food',
    cuisine: 'Italian',
    image: '/src/assets/images/margherita_pizza_1792407744383.jpg',
    featured: true,
    publishedDate: 'October 14, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Elena Rossi',
      role: 'Italian Gastronomy Specialist',
    },
    tags: ['Italian Pizza', 'Neapolitan Pizza', 'Dough Fermentation', 'Margherita', 'Wood Fired'],
    linkedRecipeSlug: 'authentic-italian-margherita-pizza',
    sections: [
      {
        heading: 'The Neapolitan Creed',
        paragraphs: [
          'According to Neapolitan tradition, genuine pizza dough consists of precisely four elements: finely ground wheat flour, pure water, sea salt, and living yeast. No olive oil, no sugar, no additives.',
          'By allowing dough balls to undergo a 24 to 48-hour cold retard in the refrigerator, yeast enzymes break complex starches into simple sugars that caramelize instantly when exposed to intense heat.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'Neapolitan Margherita Pizza Secrets',
      pinDescription: 'Learn authentic Italian pizza dough fermentation, San Marzano sauce prep, and wood-fired leopard crust.',
      pinImage: '/src/assets/images/margherita_pizza_1792407744383.jpg',
      aspectRatio: '2:3',
      keywords: ['Pizza Dough', 'Margherita Pizza', 'Italian Food', 'Baking Guide'],
    },
  },

  // --- Category 3: Cooking Tips & Kitchen Guides ---
  {
    id: 'art-perfect-basmati-rice',
    slug: 'how-to-cook-perfect-basmati-rice',
    title: 'How to Cook Perfect Basmati Rice: Fluffy, Non-Sticky Grains',
    subtitle: 'The soaking ritual, starch wash chemistry, and exact water-to-rice ratios',
    excerpt: 'Stop ending up with broken, sticky or soggy rice. Understand the amylose content of aged basmati and the gentle absorption steaming technique.',
    category: 'Cooking Tips',
    subcategory: 'Kitchen Guides',
    cuisine: 'Global',
    image: '/src/assets/images/chicken_biryani_1792407744625.jpg',
    featured: true,
    publishedDate: 'October 13, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Chef Tariq Mansoor',
      role: 'South Asian Culinary Historian',
    },
    tags: ['Cooking Tips', 'Basmati Rice', 'Kitchen Science', 'Grains', 'Rice Cooking'],
    sections: [
      {
        heading: 'Why Aged Rice Matters',
        paragraphs: [
          'Basmati rice is one of the few foods in the world that improves markedly with age. Premium Himalayan basmati is aged for 12 to 24 months in temperature-controlled silos to reduce internal moisture.',
          'This aging process hardens the grain starch (amylose), allowing it to swell to more than double its uncooked length without splitting or discharging cloudy surface starch into your cooking water.',
        ],
      },
      {
        heading: 'The 3-Step Protocol',
        paragraphs: [
          '1. The Cold Rinse: Wash the grains gently under cold running water 4 to 5 times until the runoff is crystal clear.',
          '2. The 30-Minute Soak: Soaking rehydrates the core of the grain evenly, preventing thermal shock cracking when dropped into hot liquid.',
          '3. The 1:1.5 Ratio: For absorption cooking, use exactly 1.5 cups of boiling water to 1 cup of soaked, drained rice. Cover tightly, simmer on ultra-low for 10 minutes, and never lift the lid for 10 minutes after turning off the heat.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'How to Cook Fluffy Non-Sticky Basmati Rice',
      pinDescription: 'The definitive kitchen guide to restaurant-quality fluffy basmati rice: washing, soaking, and absorption timing.',
      pinImage: '/src/assets/images/chicken_biryani_1792407744625.jpg',
      aspectRatio: '2:3',
      keywords: ['Basmati Rice', 'Cooking Tips', 'Rice Guide', 'Fluffy Rice'],
    },
  },
  {
    id: 'art-juicy-chicken-secrets',
    slug: 'how-to-cook-juicy-chicken',
    title: 'How to Cook Juicy Chicken: Never Suffer Dry Breast Again',
    subtitle: 'Dry brining, pan-searing temperature thresholds, and resting equilibrium',
    excerpt: 'Master the scientific principles of chicken protein denaturation, carryover cooking, and why salt timing alters moisture retention at the cellular level.',
    category: 'Cooking Tips',
    subcategory: 'Kitchen Guides',
    cuisine: 'Global',
    image: '/src/assets/images/chicken_karahi_1792407742450.jpg',
    featured: false,
    publishedDate: 'October 14, 2026',
    readTimeMinutes: 4,
    author: {
      name: 'Marcus Vance',
      role: 'Culinary Technique Specialist',
    },
    tags: ['Chicken Cooking', 'Cooking Tips', 'Meat Science', 'Kitchen Guides'],
    sections: [
      {
        heading: 'Denaturation and Water Loss',
        paragraphs: [
          'Chicken breast muscle consists of approximately 75% water held inside a protein scaffold of actin and myosin. When chicken reaches 150°F (65°C), myosin contracts tightly, wringing moisture out like a sponge.',
          'If cooked past 165°F (74°C), the meat turns irrevocably stringy and dry. By pulling chicken from heat at 155°F (68°C) and letting carryover cooking carry it to 160°F during a 5-minute rest on a warm board, moisture remains trapped inside the muscle fibers.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'The Science of Cooking Juicy Chicken Every Time',
      pinDescription: 'Simple meat science tips to keep chicken breast succulent and moist: dry brining, temperature control, and resting.',
      pinImage: '/src/assets/images/chicken_karahi_1792407742450.jpg',
      aspectRatio: '2:3',
      keywords: ['Chicken Recipe', 'Cooking Tips', 'Meat Guide', 'Kitchen Skills'],
    },
  },

  // --- Category 4: Healthy Eating & Nutrition ---
  {
    id: 'art-rice-blood-sugar',
    slug: 'rice-and-blood-sugar-what-you-should-know',
    title: 'Rice and Blood Sugar: What You Should Know',
    subtitle: 'Glycemic index differences, cooling for resistant starch, and meal balancing strategies',
    excerpt: 'Learn how different rice varieties impact blood glucose levels, how cooling cooked rice generates gut-friendly resistant starch, and how protein pairing blunts post-meal spikes.',
    category: 'Healthy Eating & Nutrition',
    subcategory: 'Blood Sugar & Food',
    cuisine: 'Global',
    image: '/src/assets/images/chicken_biryani_1792407744625.jpg',
    featured: true,
    publishedDate: 'October 11, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Dr. Sarah Jenkins, RD',
      role: 'Clinical Dietitian & Metabolic Health Contributor',
    },
    tags: ['Blood Sugar', 'Nutrition', 'Basmati Rice', 'Glycemic Index', 'Resistant Starch'],
    medicalDisclaimer: true,
    citations: [
      { organization: 'American Diabetes Association (ADA)', guideline: 'Standards of Medical Care in Diabetes – Carbohydrate and Glycemic Index Management' },
      { organization: 'Centers for Disease Control and Prevention (CDC)', guideline: 'Managing Blood Sugar: Meal Planning and Portion Control' },
      { organization: 'World Health Organization (WHO)', guideline: 'Healthy Diet Guidelines on Complex Carbohydrates and Fiber' },
    ],
    sections: [
      {
        heading: 'Not All Rice Affects Blood Sugar the Same',
        paragraphs: [
          'For millions of families across South Asia, East Asia, and the Mediterranean, rice is the indispensable staple of daily life. However, concerns regarding glycemic surges have caused many to wonder whether rice must be eliminated.',
          'Clinical nutritional science shows that rice varieties differ significantly in their glycemic impact. Aged basmati rice has a noticeably higher ratio of amylose to amylopectin compared to short-grain sticky rices. Amylose consists of long, linear starch chains that digest much more slowly, resulting in a moderate glycemic index (GI ~52–58) compared to jasmine or sushi rice (GI ~70–89).',
        ],
      },
      {
        heading: 'The Magic of Resistant Starch via Cooling',
        paragraphs: [
          'Peer-reviewed dietary research demonstrates that when cooked rice is cooled in the refrigerator for 12 to 24 hours, its gelatinized starch molecules undergo retrogradation, converting digestible starch into Type-3 resistant starch.',
          'Resistant starch bypasses enzymatic digestion in the small intestine, acting instead as soluble prebiotic fiber in the colon. When reheated and consumed, retrograded rice produces a measurably lower postprandial glucose spike than freshly steamed hot rice.',
        ],
        callout: {
          type: 'science',
          source: 'American Diabetes Association & Nutrition Research',
          text: 'Pairing rice with fiber-rich legumes (daal, chana), non-starchy vegetables, and lean protein significantly slows gastric emptying and moderates glucose absorption.',
        },
      },
      {
        heading: 'Practical Guidelines for Balanced Enjoyment',
        paragraphs: [
          '1. Fill half your plate with fiber-dense vegetables (spinach, cucumbers, broccoli, salad greens).',
          '2. Allocate one-quarter of your plate to lean protein (chicken, lentils, paneer, fish, or tofu).',
          '3. Reserve the remaining one-quarter for cooked basmati rice (approximately 1/2 to 3/4 cup cooked portion).',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'Rice and Blood Sugar: What You Should Know',
      pinDescription: 'Evidence-based guide to eating rice without blood glucose spikes: aged basmati, resistant starch cooling, and protein pairing.',
      pinImage: '/src/assets/images/chicken_biryani_1792407744625.jpg',
      aspectRatio: '2:3',
      keywords: ['Blood Sugar', 'Healthy Eating', 'Basmati Rice', 'Glycemic Index', 'Nutrition Tips'],
    },
  },
  {
    id: 'art-sodium-blood-pressure',
    slug: 'how-sodium-affects-blood-pressure',
    title: 'How Sodium Affects Blood Pressure & Flavorful Salt Alternatives',
    subtitle: 'Understanding the DASH eating pattern, potassium balance, and seasoning with acid and aromatics',
    excerpt: 'Explore the physiological relationship between dietary sodium and arterial pressure, and learn professional chef strategies for reducing salt without flattening flavor.',
    category: 'Healthy Eating & Nutrition',
    subcategory: 'Blood Pressure & Diet',
    cuisine: 'Global',
    image: '/src/assets/images/italian_pasta_1792407766508.jpg',
    featured: true,
    publishedDate: 'October 13, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Dr. Sarah Jenkins, RD',
      role: 'Clinical Dietitian & Metabolic Health Contributor',
    },
    tags: ['Blood Pressure', 'Sodium', 'Heart Health', 'DASH Diet', 'Healthy Cooking'],
    medicalDisclaimer: true,
    citations: [
      { organization: 'American Heart Association (AHA)', guideline: 'Sodium Reduction Guidelines and Cardiovascular Health Recommendations' },
      { organization: 'World Health Organization (WHO)', guideline: 'Global Sodium Benchmarks for Dietary Intake' },
      { organization: 'Centers for Disease Control and Prevention (CDC)', guideline: 'High Blood Pressure Symptoms, Causes, and Dietary Mitigation' },
    ],
    sections: [
      {
        heading: 'The Sodium-Water Dynamic in the Bloodstream',
        paragraphs: [
          'Sodium is an essential mineral required for fluid homeostasis and neuromuscular signaling. However, excess sodium draws extra water into the bloodstream, increasing total fluid volume inside arterial walls.',
          'Over prolonged periods, this elevated fluid pressure taxes delicate endothelial linings and increases the workload on the heart muscle.',
        ],
      },
      {
        heading: 'The DASH Eating Approach & Potassium Balance',
        paragraphs: [
          'Endorsed by the American Heart Association and the National Institutes of Health, the DASH (Dietary Approaches to Stop Hypertension) pattern emphasizes whole grains, poultry, fish, nuts, and abundant fruits and vegetables rich in dietary potassium.',
          'Potassium works in opposition to sodium: it promotes vasodilation and assists the kidneys in excreting excess sodium through urine.',
        ],
      },
      {
        heading: 'Chef Secrets: Building Depth Without Salt Shakers',
        paragraphs: [
          'Professional chefs recognize that the palate often confuses a need for salt with a need for acid or umami. Before adding extra salt to soups, stews, or roasted dishes:',
          '• Squeeze fresh lemon or lime juice to brighten the flavor profile.',
          '• Add a splash of aged balsamic or sherry vinegar.',
          '• Incorporate aromatic roasted spices (cumin, crushed coriander, smoked paprika, fenugreek).',
          '• Build umami naturally using sun-ripened tomatoes, garlic, mushrooms, or nutritional yeast.',
        ],
      },
    ],
    pinterest: {
      pinTitle: 'How Sodium Affects Blood Pressure & Low-Salt Cooking Tips',
      pinDescription: 'Heart-healthy cooking without losing flavor: understand sodium mechanics, DASH diet principles, and chef acid-flavor tricks.',
      pinImage: '/src/assets/images/italian_pasta_1792407766508.jpg',
      aspectRatio: '2:3',
      keywords: ['Blood Pressure', 'Heart Healthy', 'Low Sodium', 'DASH Diet', 'Cooking Tips'],
    },
  },
];
