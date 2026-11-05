import { Article } from '../types/content';

export const ARTICLES_GUIDES: Article[] = [
  // 1. Appendix Draft A: How to Double a Recipe Without Doubling the Problems
  {
    id: 'art-how-to-double-a-recipe',
    slug: 'how-to-double-a-recipe',
    title: 'How to Double a Recipe Without Doubling the Problems',
    subtitle: 'Why scaling a meal is more than multiplying numbers, and how to adjust pan size, seasoning, and heat',
    excerpt: 'Doubling a recipe is simple on paper: take a four-serving meal and multiply every ingredient by two. In real kitchen practice, crowded pans trap steam, larger pots require longer heat conduction, and pungent seasonings can easily overpower the dish.',
    category: 'Cooking Tips',
    subcategory: 'Kitchen Scaling & Technique',
    cuisine: 'Global',
    image: '/images/guide-doubling-recipe.jpg',
    featured: true,
    publishedDate: 'October 22, 2026',
    readTimeMinutes: 7,
    author: {
      name: 'Meal Yield Editorial Team',
      role: 'Culinary Technique Desk',
    },
    tags: ['recipe scaling', 'cooking tips', 'batch cooking', 'kitchen equipment', 'meal prep'],
    linkedRecipeSlug: 'pakistani-aloo-keema',
    pinterest: {
      pinTitle: 'How to Double a Recipe: Pan Size, Seasoning & Timing | Meal Yield',
      pinDescription: 'Essential guide to scaling recipes for bigger crowds without ruined textures or overly salty food. Adjust pan surface area, liquid evaporation and spices.',
      pinImage: '/images/guide-doubling-recipe.jpg',
      aspectRatio: '2:3',
      keywords: ['recipe scaling', 'doubling recipes', 'cooking tips', 'batch cooking', 'kitchen skills'],
    },
    sections: [
      {
        heading: 'The Paper Math vs. The Cookware Reality',
        paragraphs: [
          'Multiplying every ingredient by two is mathematically straightforward, but culinary physics does not scale linearly. In cooking, surface area, thermal mass, and evaporation rates dictate the outcome of every dish.',
          'When you double the ground meat in a standard 26 cm skillet, you double the volume without increasing the heated cooking surface. Instead of frying and caramelizing via the Maillard reaction, the crowded meat steams in its own released moisture, resulting in a grey, boiled texture rather than deep roasted flavor.',
        ],
        callout: {
          type: 'science',
          source: 'Culinary Physics & Food Science',
          text: 'Crowding a pan drops the surface temperature rapidly below 140°C (284°F), arresting the Maillard reaction and causing proteins to exude intracellular moisture into an unintended simmer.',
        },
      },
      {
        heading: 'The 1.5x Rule for Salt, Acid, and Fiery Spices',
        paragraphs: [
          'While neutral bulk ingredients like rice, lentils, and potatoes scale at a direct 1:1 ratio, volatile aromatics and pungent seasonings behave differently. Alcohol, vinegar, citrus juice, chili powder, and sodium become concentrated when liquid reduction does not scale at the same pace.',
          'Begin by multiplying salt, hot chilies, and strong ground spices by 1.5 rather than 2.0. Once the batch is simmering and proteins have cooked, taste the broth and adjust upward with measured increments. You can always add a pinch more salt at the table, but you cannot extract it once dissolved.',
        ],
      },
      {
        heading: 'Cookware Capacity and Pan Selection',
        paragraphs: [
          'When doubling curries, stews, or soups, ensure your pot is no more than two-thirds full when raw ingredients are loaded. A crowded Dutch oven prevents proper steam release and can easily boil over when brought to a rapid simmer.',
          'For pan-searing meats or caramelizing onions, brown the food in two distinct batches rather than dumping everything into the pot at once. Combine both batches only after each portion has developed a deep golden crust.',
        ],
      },
      {
        heading: 'Why Cooking Time Does Not Double',
        paragraphs: [
          'One of the most common beginner errors is assuming a doubled recipe requires twice as long to cook. While a 10-liter stockpot takes longer to reach a rolling boil due to increased thermal mass, the internal cooking temperature needed to tenderize a piece of chicken or potato remains identical.',
          'Rely on sensory doneness cues and a reliable digital kitchen thermometer rather than a strict timer: simmer until potatoes are fork-tender and meat reaches safe internal temperature (74°C / 165°F for poultry), regardless of whether you prepared 4 servings or 12.',
        ],
        callout: {
          type: 'tip',
          text: 'Use Meal Yield’s interactive recipe serving scaler on any recipe page to calculate exact baseline weights before adjusting pan size and aromatics.',
        },
      },
    ],
  },

  // 2. Appendix Draft B: Build Balanced Meals Without Giving Up Your Favourite Recipes
  {
    id: 'art-balanced-meals-with-favourite-recipes',
    slug: 'balanced-meals-with-favourite-recipes',
    title: 'How to Build Balanced Meals Around Rice, Curry and Pasta',
    subtitle: 'Evidence-based culinary strategies to balance everyday comfort foods with fibre, lean proteins, and colourful produce',
    excerpt: 'Nutritious eating never requires giving up beloved cultural staples like biryani, rich curries, or creamy pasta. The secret lies in plate architecture, thoughtful vegetable additions, and portion mindfulness.',
    category: 'Healthy Eating & Nutrition',
    subcategory: 'Evidence-Based Nutrition',
    cuisine: 'Global',
    image: '/images/guide-balanced-meals.jpg',
    featured: true,
    publishedDate: 'October 22, 2026',
    readTimeMinutes: 8,
    author: {
      name: 'Meal Yield Editorial Team',
      role: 'Nutrition & Health Desk',
    },
    tags: ['balanced eating', 'nutrition', 'eatwell guide', 'curry and rice', 'healthy habits'],
    linkedRecipeSlug: 'indian-chana-masala',
    medicalDisclaimer: true,
    citations: [
      {
        organization: 'NHS (National Health Service)',
        guideline: 'The Eatwell Guide: Helping you eat a healthy, balanced diet',
      },
      {
        organization: 'World Health Organization (WHO)',
        guideline: 'Healthy Diet Fact Sheet: Promoting dietary diversity and adequate dietary fibre',
      },
    ],
    pinterest: {
      pinTitle: 'How to Build Balanced Meals Around Rice, Curry & Pasta | Meal Yield',
      pinDescription: 'Evidence-based guide to building balanced dinners without eliminating family comfort foods. Add high-fiber sides, plant protein, and portion mindfulness.',
      pinImage: '/images/guide-balanced-meals.jpg',
      aspectRatio: '2:3',
      keywords: ['balanced meal', 'healthy dinner', 'eatwell guide', 'nutrition tips', 'healthy curry'],
    },
    sections: [
      {
        heading: 'Dietary Balance is a Pattern, Not a Single Strict Plate',
        paragraphs: [
          'A healthy relationship with food does not depend on demonizing traditional staple ingredients like aged basmati rice, warm naan, or hearty pasta. Rather than eliminating the dishes that bring cultural comfort, public health guidelines focus on the overall dietary pattern across the week.',
          'According to the NHS Eatwell Guide, a balanced eating pattern allocates just over a third of daily intake to fruits and vegetables, and another third to starchy carbohydrates (preferably whole-grain or higher-fiber varieties). When viewed through this lens, a serving of flavorful chicken curry or pasta bolognese is simply one component of an enjoyable, nourishing table.',
        ],
        callout: {
          type: 'guideline',
          source: 'NHS Eatwell Guide',
          text: 'Aim for at least 5 portions of a variety of fruit and vegetables every day, and choose higher-fibre whole-grain or minimally processed starchy foods to support digestive health and sustained satiety.',
        },
      },
      {
        heading: 'Plate Architecture: The Companion Strategy',
        paragraphs: [
          'Rather than shrinking your main curry or pasta until dinner feels punitive, change what accompanies the dish. If dinner is rich Chicken Karahi with fragrant basmati, pair it with a crisp cucumber and tomato salad, steamed broccoli, and a bowl of yellow dal or cool yogurt raita.',
          'The addition of cruciferous vegetables and pulses slows gastric emptying, providing sustained energy release and preventing the sudden glucose spikes and crashes often associated with unbuffered refined starches.',
        ],
      },
      {
        heading: 'Three Practical Kitchen Habits for Home Cooks',
        paragraphs: [
          '1. Plan the vegetable side at the same time as the main protein: When shopping and prepping, treat the salad or vegetable sabzi with the same priority as the meat curry.',
          '2. Serve sauces with visual portion awareness: In rich, butter- or oil-dense curries, ladle the spiced sauce generously over the vegetables rather than solely soaking large mounds of rice.',
          '3. Repurpose leftovers into lunch bowls: Yesterday’s chilled basmati rice or leftover roasted cauliflower easily converts into a nutrient-dense lunch bowl topped with edamame, sliced avocado, and a boiled egg.',
        ],
      },
    ],
  },

  // 3. How to Make Basmati Rice Fluffy, Not Sticky
  {
    id: 'art-fluffy-basmati-rice-guide',
    slug: 'fluffy-basmati-rice-guide',
    title: 'How to Make Basmati Rice Fluffy, Not Sticky: The Science of Separate Grains',
    subtitle: 'From starch rinsing and soaking to the exact water absorption ratio and resting window',
    excerpt: 'Mastering long-grain aged basmati rice requires understanding surface amylose starch, gelatinization temperatures, and the crucial post-cook steaming rest that turns clumpy rice into fragrant, separate grains.',
    category: 'Cooking Tips',
    subcategory: 'Rice & Grains Mastery',
    cuisine: 'Pakistani',
    image: '/images/basmati-rice-washing-science.jpg',
    featured: false,
    publishedDate: 'October 22, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Meal Yield Editorial Team',
      role: 'South Asian Heritage Desk',
    },
    tags: ['basmati rice', 'cooking technique', 'rice tips', 'food science', 'side dishes'],
    linkedRecipeSlug: 'pakistani-chicken-yakhni-pulao',
    pinterest: {
      pinTitle: 'How to Cook Perfect Fluffy Basmati Rice | Meal Yield',
      pinDescription: 'The step-by-step culinary science to separate, extra-long basmati rice grains. Rinsing, soaking, and the exact water ratio.',
      pinImage: '/images/basmati-rice-washing-science.jpg',
      aspectRatio: '2:3',
      keywords: ['basmati rice', 'fluffy rice', 'how to cook rice', 'rice recipe', 'cooking tips'],
    },
    sections: [
      {
        heading: 'Why Rice Turns Sticky: Surface Amylopectin',
        paragraphs: [
          'Basmati rice naturally has high amylose starch content, which allows the grains to elongate during cooking without bursting. However, milling and packaging creates powdery surface starch (amylopectin) on the exterior of the grains.',
          'If this powdery starch is not washed away before heating, it gelatinizes into an adhesive paste in the boiling water, causing grains to stick together in gummy clumps.',
        ],
        callout: {
          type: 'science',
          text: 'Rinsing basmati under cool water 3 to 4 times until the runoff turns from milky to crystal-clear removes up to 85% of loose surface starch without damaging the grain structure.',
        },
      },
      {
        heading: 'The Indispensable 30-Minute Cold Water Soak',
        paragraphs: [
          'Aged basmati grains are dried to low moisture content. Soaking the rice in cold water for 25 to 30 minutes allows water to penetrate into the core of each grain evenly before heat is applied.',
          'Unsoaked rice placed directly into boiling water cooks unevenly: the exterior gelatinizes and breaks down before the interior core has softened, resulting in mushy, cracked rice.',
        ],
      },
      {
        heading: 'The Exact Water Ratio and The Resting Rule',
        paragraphs: [
          'For soaked aged basmati cooked by the absorption method in a heavy lidded pot, use an exact ratio of 1 cup soaked rice to 1.5 cups boiling water. Add 1/2 teaspoon salt and 1 teaspoon of ghee or oil.',
          'Bring to a rapid rolling boil, lower heat to the absolute lowest setting, cover tightly, and cook for 11 minutes. Then turn off heat and do not lift the lid for 10 minutes. This resting phase allows steam to redistribute evenly throughout the pot, producing separate, elegant grains that fluff effortlessly with a fork.',
        ],
      },
    ],
  },

  // 4. Why Your Curry Tastes Flat: Acid, Salt and Spices
  {
    id: 'art-why-curry-tastes-flat-acid-salt-spices',
    slug: 'why-curry-tastes-flat-acid-salt-spices',
    title: 'Why Your Curry Tastes Flat: Balancing Acid, Salt, and Fat',
    subtitle: 'When adding more garam masala fails, here is the culinary chemistry to rescue dull stews and sauces',
    excerpt: 'When a homemade curry lacks punch, home cooks often dump in more curry powder or garam masala, only to make it bitter. Learn why the true culprits are insufficient sodium, lack of acid, and undertempered spices.',
    category: 'Cooking Tips',
    subcategory: 'Flavor Science & Troubleshooting',
    cuisine: 'Global',
    image: '/images/guide-curry-flavor-balance.jpg',
    featured: false,
    publishedDate: 'October 22, 2026',
    readTimeMinutes: 7,
    author: {
      name: 'Meal Yield Editorial Team',
      role: 'Culinary Technique Desk',
    },
    tags: ['flavor science', 'curry tips', 'seasoning guide', 'salt and acid', 'cooking troubleshooting'],
    linkedRecipeSlug: 'indian-dal-tadka',
    pinterest: {
      pinTitle: 'Why Your Curry Tastes Flat: The Acid & Salt Fix | Meal Yield',
      pinDescription: 'Rescue dull, flat curries with culinary science. Learn why acidity, proper oil bloom, and measured sodium make all the difference.',
      pinImage: '/images/guide-curry-flavor-balance.jpg',
      aspectRatio: '2:3',
      keywords: ['curry troubleshooting', 'flavor balance', 'cooking tips', 'seasoning food', 'curry hacks'],
    },
    sections: [
      {
        heading: 'The Garam Masala Trap',
        paragraphs: [
          'The most common reflex when tasting a dull, lackluster curry is to sprinkle in another spoonful of ground spice blend. But raw ground spices added at the end of cooking lack oil-bloomed aroma and leave behind a chalky, astringent mouthfeel.',
          'Spices require fat to dissolve their fat-soluble flavor compounds (such as piperine in black pepper, eugenol in cloves, and cuminaldehyde in cumin). Without adequate oil blooming (bhunai), ground spices remain dormant on the palate.',
        ],
      },
      {
        heading: 'The Missing Dimension: Bright Acidity',
        paragraphs: [
          'Curries are rich in heavy fats, caramelized sugars, and earthy spices. Without a counterbalancing acid, the palate quickly experiences palate fatigue, interpreting the dish as heavy and monotonous.',
          'A splash of freshly squeezed lemon juice, a teaspoon of tamarind paste, Greek yogurt whisked off the heat, or a pinch of amchur (dried mango powder) acts as a high-frequency contrast, brightening the spices and cutting through the savory fat.',
        ],
        callout: {
          type: 'tip',
          text: 'If your curry tastes rich but one-dimensional, add half a teaspoon of fresh lemon juice or cider vinegar before reaching for extra salt or chili.',
        },
      },
      {
        heading: 'The Sodium Multiplier',
        paragraphs: [
          'Salt is not merely a salty flavor; it is an organic ion suppressor that diminishes bitterness and amplifies the perception of natural sweetness and savory umami.',
          'Under-salted curries taste bland, regardless of how many exotic whole spices are simmering in the pot. Add salt in quarter-teaspoon increments until the natural sweetness of the browned onions and tomatoes suddenly leaps forward on your tongue.',
        ],
      },
    ],
  },

  // 5. Cooking Times vs Food Thermometer: What Matters More?
  {
    id: 'art-cooking-times-vs-food-thermometer',
    slug: 'cooking-times-vs-food-thermometer',
    title: 'Cooking Times vs. Food Thermometer: What Matters More for Food Safety and Texture?',
    subtitle: 'Why recipe clock estimates are guidelines, and instant-read digital probes are the ultimate tool for succulent, safe meat',
    excerpt: 'Recipe times are approximations based on test kitchen equipment. Pan thickness, initial refrigerator temperature, and meat thickness dictate true doneness. Learn how to use a digital probe for juicy, safe meals every time.',
    category: 'Cooking Tips',
    subcategory: 'Kitchen Science & Food Safety',
    cuisine: 'Global',
    image: '/images/guide-food-thermometer-temp.jpg',
    featured: false,
    publishedDate: 'October 22, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Meal Yield Editorial Team',
      role: 'Food Safety & Standards Desk',
    },
    tags: ['food thermometer', 'food safety', 'cooking temperatures', 'chicken doneness', 'kitchen gear'],
    linkedRecipeSlug: 'pakistani-chicken-karahi',
    citations: [
      {
        organization: 'UK Food Standards Agency (FSA)',
        guideline: 'Cooking your food safely: core temperatures and time guidelines',
      },
      {
        organization: 'USDA FSIS',
        guideline: 'Safe Minimum Internal Temperature Chart for meat and poultry',
      },
    ],
    pinterest: {
      pinTitle: 'Cooking Times vs Food Thermometer: The Truth | Meal Yield',
      pinDescription: 'Never eat dry chicken breast or undercooked meat again. Learn why digital thermometers beat kitchen clocks for food safety and flavor.',
      pinImage: '/images/guide-food-thermometer-temp.jpg',
      aspectRatio: '2:3',
      keywords: ['food thermometer', 'meat temperature', 'chicken cooking tips', 'food safety', 'cooking guide'],
    },
    sections: [
      {
        heading: 'The Fallacy of the 20-Minute Chicken Breast',
        paragraphs: [
          'Recipes frequently state: "Cook chicken breasts for 6 to 8 minutes per side." But an organic chicken breast can range from 150 grams to 350 grams in weight, and thickness can vary by more than 200%. A pan on an electric induction hob transfers heat differently than a cast iron skillet over a high-BTU gas burner.',
          'Relying strictly on a timer leads to one of two undesirable outcomes: undercooked meat that poses microbial food safety risks, or overcooked, stringy poultry that has lost all its natural moisture.',
        ],
      },
      {
        heading: 'Target Core Temperatures for Succulent Results',
        paragraphs: [
          'According to the UK Food Standards Agency and USDA FSIS, poultry is food-safe when the core temperature reaches 74°C (165°F) instantly, or 70°C (158°F) held for 2 minutes.',
          'For pan-seared chicken breasts or steaks, remove the meat from the heat when the probe reads 3°C (5°F) below the target. Carryover cooking during a 5-minute rest will gently bring the meat to perfect, food-safe temperature while the muscle fibers relax and retain their juices.',
        ],
        callout: {
          type: 'science',
          source: 'Thermal Food Dynamics',
          text: 'Resting meat on a warm cutting board allows denatured proteins to reabsorb expelled juices; slicing immediately causes up to 40% of meat juices to pool uselessly on the board.',
        },
      },
    ],
  },

  // 6. How to Store Cooked Rice Safely
  {
    id: 'art-how-to-store-cooked-rice-safely',
    slug: 'how-to-store-cooked-rice-safely',
    title: 'How to Store Cooked Rice Safely: Preventing Bacillus Cereus Food Poisoning',
    subtitle: 'The essential cooling window, refrigeration rules, and safe reheating temperatures for leftover rice dishes',
    excerpt: 'Cooked rice is one of the most common vectors for foodborne illness if left sitting on the counter. Understand the biology of heat-resistant Bacillus cereus spores and the simple kitchen protocol to keep leftovers completely safe.',
    category: 'Healthy Eating & Nutrition',
    subcategory: 'Food Safety Education',
    cuisine: 'Global',
    image: '/images/guide-storing-cooked-rice.jpg',
    featured: false,
    publishedDate: 'October 22, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Meal Yield Editorial Team',
      role: 'Food Safety & Standards Desk',
    },
    tags: ['rice safety', 'food storage', 'bacillus cereus', 'kitchen hygiene', 'food safety'],
    linkedRecipeSlug: 'bangladeshi-bhuna-khichuri',
    citations: [
      {
        organization: 'UK Food Standards Agency (FSA)',
        guideline: 'Safe handling and reheating of cooked rice',
      },
    ],
    pinterest: {
      pinTitle: 'How to Store Cooked Rice Safely | Meal Yield Guide',
      pinDescription: 'Prevent food poisoning with the 1-hour cooling rule for cooked rice. Essential food safety temperatures, storage times, and reheating protocols.',
      pinImage: '/images/guide-storing-cooked-rice.jpg',
      aspectRatio: '2:3',
      keywords: ['rice safety', 'storing rice', 'food poisoning prevention', 'kitchen hygiene', 'meal prep tips'],
    },
    sections: [
      {
        heading: 'The Biology of Bacillus Cereus in Grains',
        paragraphs: [
          'Uncooked rice frequently carries dormant spores of Bacillus cereus, a bacterium capable of causing gastrointestinal illness. Crucially, these spores are thermoduric: they survive normal boiling and steaming temperatures.',
          'If cooked rice is left resting at warm room temperature (between 15°C and 45°C), the surviving spores germinate into vegetative bacteria and produce heat-stable enterotoxins that cannot be deactivated by subsequent reheating.',
        ],
        callout: {
          type: 'guideline',
          source: 'UK Food Standards Agency',
          text: 'Cool leftover rice as quickly as possible—ideally within 1 hour—and place it immediately into a refrigerator running below 5°C (41°F).',
        },
      },
      {
        heading: 'The 1-Hour Rapid Cooling Protocol',
        paragraphs: [
          'Never put a deep, steaming pot of hot rice directly into the fridge; the dense center will remain warm for hours in the temperature danger zone. Instead, spread the leftover rice onto a wide, shallow baking tray to release steam in minutes.',
          'Once cooled, transfer into airtight glass or BPA-free containers, label with the date, and consume within 24 to 48 hours.',
        ],
      },
      {
        heading: 'Safe Reheating Rules',
        paragraphs: [
          'When reheating cooked rice, ensure it is steaming hot all the way through, reaching an internal temperature of at least 74°C (165°F). Add a splash of water and cover tightly to allow steam to rejuvenate the grains.',
          'Never reheat leftover rice more than once; discard any uneaten portion after the first reheat.',
        ],
      },
    ],
  },

  // 7. 5 Budget-Friendly Ways to Add Vegetables to Dinner
  {
    id: 'art-5-budget-friendly-vegetable-ideas',
    slug: '5-budget-friendly-vegetable-ideas',
    title: '5 Budget-Friendly Ways to Add More Vegetables to Everyday Dinners',
    subtitle: 'Practical culinary strategies to stretch family meals, boost fibre, and reduce grocery bills with versatile produce',
    excerpt: 'Eating more vegetables does not require buying expensive specialty greens. Discover 5 practical, affordable culinary techniques that integrate hearty root vegetables, frozen produce, and pulses seamlessly into curries, bakes, and pasta.',
    category: 'Healthy Eating & Nutrition',
    subcategory: 'Smart Cooking on a Budget',
    cuisine: 'Global',
    image: '/images/guide-budget-vegetables.jpg',
    featured: false,
    publishedDate: 'October 22, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Meal Yield Editorial Team',
      role: 'Nutrition & Health Desk',
    },
    tags: ['budget cooking', 'vegetables', 'healthy dinner', 'grocery savings', 'high fiber'],
    linkedRecipeSlug: 'indian-aloo-gobi',
    pinterest: {
      pinTitle: '5 Budget-Friendly Ways to Add Veggies to Dinner | Meal Yield',
      pinDescription: 'Stretch your grocery budget with clever vegetable strategies. Use frozen peas, grated root vegetables, and pulses in everyday family dinners.',
      pinImage: '/images/guide-budget-vegetables.jpg',
      aspectRatio: '2:3',
      keywords: ['budget cooking', 'more vegetables', 'family dinners', 'healthy on a budget', 'grocery hacks'],
    },
    sections: [
      {
        heading: '1. The Power of Flash-Frozen Peas and Spinach',
        paragraphs: [
          'Flash-frozen vegetables are frozen within hours of harvest at peak ripeness, preserving nutrients while eliminating kitchen prep waste. A cup of sweet frozen peas tossed into a simmering curry or pasta bake adds natural sweetness, vibrant colour, and 7 grams of dietary fibre with zero peeling or chopping.',
        ],
      },
      {
        heading: '2. Fine-Grated Carrots and Zucchini in Ground Meat',
        paragraphs: [
          'Adding finely grated carrots or zucchini to minced beef or lamb when preparing meatballs, cottage pie, or burger patties stretches expensive meat by up to 30% while retaining succulent moisture.',
        ],
      },
      {
        heading: '3. Red Lentils as an Invisible Sauce Thickener',
        paragraphs: [
          'Adding half a cup of rinsed split red lentils to any simmering tomato sauce or vegetable soup dissolves completely into the sauce, providing natural velvet body and plant protein without changing the flavor profile.',
        ],
      },
      {
        heading: '4. Roasted Cabbage Wedges as a Savory Main Side',
        paragraphs: [
          'Whole green cabbage is one of the most economical vegetables in the supermarket. Cut into thick wedges, brush with olive oil and spices, and roast at 200°C until the edges are crispy and caramelized.',
        ],
      },
      {
        heading: '5. The Stems and Greens Strategy',
        paragraphs: [
          'Do not discard tender broccoli stems or cauliflower leaves. Peel the woody skin off broccoli stalks and slice into coins for stir-fries; chop tender cauliflower leaves into curries for extra brassica crunch.',
        ],
      },
    ],
  },

  // 8. Meal Prep for Small Households Without Food Waste
  {
    id: 'art-meal-prep-small-households-zero-waste',
    slug: 'meal-prep-small-households-zero-waste',
    title: 'Meal Prep for Small Households: How to Cook Ahead Without Food Waste',
    subtitle: 'The modular component method that prevents recipe fatigue and eliminates wasted leftovers for 1-to-2 person kitchens',
    excerpt: 'Traditional meal prep formulas designed for big families often leave 1-to-2 person households eating the same monotonous casserole for five days straight. Learn the modular prep strategy that provides daily variety with zero waste.',
    category: 'Cooking Tips',
    subcategory: 'Kitchen Organization & Efficiency',
    cuisine: 'Global',
    image: '/images/guide-meal-prep-small-household.jpg',
    featured: false,
    publishedDate: 'October 22, 2026',
    readTimeMinutes: 7,
    author: {
      name: 'Meal Yield Editorial Team',
      role: 'Culinary Technique Desk',
    },
    tags: ['meal prep', 'small households', 'zero waste', 'kitchen organization', 'cooking for two'],
    linkedRecipeSlug: 'american-mac-and-cheese',
    pinterest: {
      pinTitle: 'Smart Meal Prep for 1-2 Person Households | Meal Yield',
      pinDescription: 'Stop throwing away spoiled leftovers. The modular component prep system that creates fresh, exciting weeknight dinners in 10 minutes.',
      pinImage: '/images/guide-meal-prep-small-household.jpg',
      aspectRatio: '2:3',
      keywords: ['meal prep for two', 'small household cooking', 'zero food waste', 'smart meal prep', 'cooking efficiency'],
    },
    sections: [
      {
        heading: 'Component Prep vs. Identical Tupperware Meals',
        paragraphs: [
          'Cooking four identical containers of chicken, rice, and broccoli leads to recipe fatigue by Wednesday, often resulting in discarded food and takeout orders. Component prep solves this problem by preparing versatile building blocks instead of finished dishes.',
          'Prepare three multi-purpose components: a versatile seasoned protein (e.g., roasted spiced chicken thighs), a neutral cooked grain (e.g., brown basmati or quinoa), and a double batch of roasted root vegetables.',
        ],
        callout: {
          type: 'tip',
          text: 'Varying sauces changes the entire identity of prepped components: use chimichurri on Monday, tahini yogurt on Tuesday, and warm curry sauce on Wednesday.',
        },
      },
      {
        heading: 'Two-Serving Batching & Freezer Banking',
        paragraphs: [
          'When preparing hearty dishes like British Cottage Pie or Bangladeshi Khichuri, cook a 4-serving batch, eat two portions fresh, and immediately portion the remaining two into freezer-safe glass containers.',
          'Within three weeks, your freezer becomes a private boutique takeaway of home-cooked, preservative-free dinners ready to reheat on hectic evenings.',
        ],
      },
    ],
  },

  // 9. Fresh vs Dried Herbs: When to Add Each
  {
    id: 'art-fresh-vs-dried-herbs-cooking-guide',
    slug: 'fresh-vs-dried-herbs-cooking-guide',
    title: 'Fresh vs. Dried Herbs: When to Add Each for Maximum Flavor',
    subtitle: 'The 1:3 conversion rule, oil-soluble vs water-soluble herbs, and heat timing secrets for home cooks',
    excerpt: 'Dried herbs are not an inferior substitute for fresh herbs; they are an entirely different culinary tool. Learn which herbs thrive in long braises, which herbs must be added fresh at the finish, and the golden 1:3 ratio.',
    category: 'Cooking Tips',
    subcategory: 'Culinary Technique',
    cuisine: 'Global',
    image: '/images/guide-fresh-vs-dried-herbs.jpg',
    featured: false,
    publishedDate: 'October 22, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Meal Yield Editorial Team',
      role: 'Culinary Technique Desk',
    },
    tags: ['herbs guide', 'fresh vs dried', 'cooking tips', 'flavor chemistry', 'kitchen basics'],
    linkedRecipeSlug: 'italian-pasta-pomodoro',
    pinterest: {
      pinTitle: 'Fresh vs Dried Herbs: When to Add Each | Meal Yield',
      pinDescription: 'Master herb timing and conversion ratios. Learn why woody herbs need early simmering while tender green herbs belong at the very finish.',
      pinImage: '/images/guide-fresh-vs-dried-herbs.jpg',
      aspectRatio: '2:3',
      keywords: ['fresh vs dried herbs', 'cooking herbs', 'flavor tips', 'kitchen guide', 'how to use herbs'],
    },
    sections: [
      {
        heading: 'The Woody vs. Tender Classification',
        paragraphs: [
          'To understand herbs, divide them into two botanical families: woody herbs (rosemary, thyme, oregano, bay, sage) and tender leafy herbs (basil, cilantro, parsley, dill, mint).',
          'Woody herbs originate in arid Mediterranean and subtropical climates. Their flavor compounds reside in sturdy, oil-dense resin glands that require sustained heat and warm fat to extract. They belong in the pot early during simmering and braising.',
        ],
      },
      {
        heading: 'Tender Herbs: Destroyed by Prolonged Heat',
        paragraphs: [
          'Tender herbs contain volatile aromatic esters that vaporize or oxidize rapidly when heated above 60°C. Cooking fresh basil or cilantro for 30 minutes in a boiling stew destroys their bright herbal top notes, leaving behind a muddy taste.',
          'Always stir tender herbs into curries, pasta sauces, and soups during the final 60 seconds of cooking, or scatter them fresh over the plated dish.',
        ],
        callout: {
          type: 'science',
          text: 'The Golden Conversion Ratio: Dried herbs are concentrated in volume and flavor. Use 1 teaspoon of dried herbs for every 1 tablespoon (3 teaspoons) of fresh herbs called for in a recipe.',
        },
      },
    ],
  },

  // 10. Understanding Portions, Servings and Recipe Yield
  {
    id: 'art-understanding-portions-servings-recipe-yield',
    slug: 'understanding-portions-servings-recipe-yield',
    title: 'Understanding Portions, Servings and Recipe Yield: Cook with Confidence',
    subtitle: 'The difference between raw ingredient weights, cooked yield, and dietary portion sizing',
    excerpt: 'Ever wonder why 500 grams of raw ground beef shrinks down in the pan, while 200 grams of dry rice triples in volume? Master raw-to-cooked yield calculations to plan dinner quantities with precision.',
    category: 'Healthy Eating & Nutrition',
    subcategory: 'Kitchen Math & Portion Literacy',
    cuisine: 'Global',
    image: '/images/guide-portions-servings-yield.jpg',
    featured: false,
    publishedDate: 'October 22, 2026',
    readTimeMinutes: 7,
    author: {
      name: 'Meal Yield Editorial Team',
      role: 'Nutrition & Health Desk',
    },
    tags: ['recipe yield', 'portion sizes', 'kitchen math', 'raw vs cooked', 'meal planning'],
    linkedRecipeSlug: 'british-cottage-pie',
    medicalDisclaimer: true,
    citations: [
      {
        organization: 'British Dietetic Association (BDA)',
        guideline: 'Portion sizes and dietary guidelines for healthy adults',
      },
    ],
    pinterest: {
      pinTitle: 'Recipe Yield and Portion Sizes Explained | Meal Yield',
      pinDescription: 'Demystifying kitchen math: raw vs cooked meat weights, grain hydration multipliers, and realistic dinner portion planning.',
      pinImage: '/images/guide-portions-servings-yield.jpg',
      aspectRatio: '2:3',
      keywords: ['recipe yield', 'portion sizes', 'cooking math', 'meal planning', 'servings calculator'],
    },
    sections: [
      {
        heading: 'Raw Weight vs. Cooked Yield: The Evaporation Factor',
        paragraphs: [
          'When reading an ingredients list, all meat and poultry quantities refer to raw, trimmed weight. During cooking, muscle fibers contract and expel water, resulting in an average shrinkage of 20% to 25%. A 500g package of raw minced beef yields approximately 375g to 400g of cooked meat.',
          'Conversely, dry starches like rice, pasta, and lentils absorb hot cooking liquid during starch gelatinization. One cup (200g) of dry basmati rice absorbs water and expands into roughly 3 cups (600g) of fluffy cooked rice—a 3x expansion.',
        ],
        callout: {
          type: 'tip',
          text: 'Rule of Thumb: Proteins contract by ~25% during cooking, while dried grains and pulses expand by 250% to 300%.',
        },
      },
      {
        heading: 'Portion Size vs. Culinary Serving',
        paragraphs: [
          'A "culinary serving" in a recipe describes how many balanced plates the finished dish yields when paired with customary accompaniments. A recipe labeled "Serves 4" assumes the curry will be accompanied by a portion of rice, bread, or vegetables.',
          'When scaling recipes with Meal Yield’s interactive servings scaler, consider the dining context: a table of teenagers after sports practice will consume significantly larger portions than a light weekday family supper.',
        ],
      },
    ],
  },
];
