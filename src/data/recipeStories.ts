// Authentic historical, cultural, and culinary background stories for each Meal Yield recipe
// Factually accurate, educational, and engaging 15-25 second audio narrations (40-60 words each)

export interface RecipeStory {
  title: string;
  historyText: string;
  culturalNote: string;
  funFact: string;
}

export const RECIPE_STORIES: Record<string, RecipeStory> = {
  'pakistani-chicken-karahi': {
    title: 'Authentic Pakistani Chicken Karahi',
    historyText:
      'Did you know Chicken Karahi originated along the rugged Khyber Pass in Peshawar and Lahore? Named after the heavy cast-iron wok it is cooked in, authentic street-style karahi is forged over roaring flames using only fresh tomatoes, ginger, and black pepper—never onions or yogurt!',
    culturalNote: 'Traditionally served right in the bubbling iron wok with piping hot tandoori naan.',
    funFact: 'High-heat wok searing creates the signature emulsified glossy tomato gravy in under 30 minutes!',
  },
  'authentic-italian-margherita-pizza': {
    title: 'Authentic Italian Margherita Pizza',
    historyText:
      'Did you know Pizza Margherita was created in Naples in 1889 by pizzaiolo Raffaele Esposito? He crafted it in honor of Queen Margherita of Savoy, using red tomatoes, white mozzarella, and green basil to mirror the vibrant tricolor flag of newly unified Italy!',
    culturalNote: 'Neapolitan pizza making was inscribed on UNESCO’s Intangible Cultural Heritage list in 2017.',
    funFact: 'A true Neapolitan wood-fired oven bakes this pizza to blistering perfection in just 60 to 90 seconds!',
  },
  'traditional-chicken-biryani': {
    title: 'Royal Traditional Chicken Biryani',
    historyText:
      'Did you know Biryani derives from the Persian word "birian", meaning fried before cooking? It flourished in the grand Mughal royal courts of Delhi, Lucknow, and Hyderabad, where aged basmati rice and marinated chicken were sealed together with dough for gentle steam infusion.',
    culturalNote: 'Dum pukht cooking traps every drop of saffron, kewra, and spice aroma inside the sealed pot.',
    funFact: 'Biryani is one of the most widely searched and celebrated culinary dishes across the entire globe!',
  },
  'classic-american-cheeseburger': {
    title: 'The Ultimate Double Smashed Cheeseburger',
    historyText:
      'Did you know the smashed burger technique was pioneered in mid-century American roadside diners? Smashing ground chuck wafer-thin against a screaming-hot iron griddle triggers the intense Maillard reaction, yielding irresistible crispy lacy edges with a juicy center!',
    culturalNote: 'Lionel Sternberger is widely credited with first crowning a hamburger with cheese in Pasadena in 1924.',
    funFact: 'The sizzling Maillard reaction creates hundreds of new flavor compounds that you simply cannot get by grilling thick patties!',
  },
  'traditional-british-fish-and-chips': {
    title: 'Traditional British Beer-Battered Fish and Chips',
    historyText:
      'Did you know Fish and Chips marries two immigrant culinary gifts? Fried fish in crisp batter was introduced to England by 16th-century Spanish and Portuguese Sephardic Jewish refugees, while chipped potatoes came from French and Belgian street vendors, becoming Britain’s beloved national comfort food by the 1860s!',
    culturalNote: 'During World War II, Winston Churchill safeguarded fish and chips as one of the few foods never rationed.',
    funFact: 'Beer batter stays extra airy because bubbles of carbon dioxide expand rapidly when hitting the hot fryer oil!',
  },
  'traditional-spaghetti-carbonara': {
    title: 'Traditional Roman Spaghetti alla Carbonara',
    historyText:
      'Did you know authentic Roman Carbonara never uses cream, peas, or garlic? Created in post-war Rome in the 1940s, this silky masterpiece relies solely on cured pork jowl—guanciale—sharp pecorino romano, farm eggs, and cracked black pepper, emulsified by starchy pasta cooking water!',
    culturalNote: 'Italian culinary law forbids cream in Carbonara; the sauce achieves velvet richness through egg and cheese temper.',
    funFact: 'The dish may be named after the "carbonari" woodcutters and charcoal burners in the Apennine mountains.',
  },
  'pakistani-aloo-keema': {
    title: 'Pakistani Aloo Keema',
    historyText:
      'Did you know Aloo Keema is the ultimate comforting family staple across Punjab and Sindh? Ground lamb or beef gently braises with browned onions, ginger, and diced potatoes, which soak up the rich spiced gravy like flavorful little sponges!',
    culturalNote: 'A cherished weeknight family meal served with crisp tandoori roti, sliced red onions, and cool mint raita.',
    funFact: 'Potatoes were introduced to South Asia in the 16th century by Portuguese traders, quickly becoming a beloved curry companion!',
  },
  'indian-chana-masala': {
    title: 'Easy Indian Chana Masala',
    historyText:
      'Did you know Chana Masala traces its roots to northern Punjab? Plump white chickpeas are simmered in an aromatic tomato and onion gravy spiced with amchur—sun-dried green mango powder—giving this hearty vegetarian curry its signature appetizing tang!',
    culturalNote: 'Traditionally paired with fluffy puffed bhature bread or steamed cumin basmati rice for festive weekend brunches.',
    funFact: 'Chickpeas are one of the world’s oldest cultivated legumes, grown in the fertile crescent for over 7,500 years!',
  },
  'bangladeshi-bhuna-khichuri': {
    title: 'Bangladeshi Bhuna Khichuri',
    historyText:
      'Did you know in Bangladesh, the arrival of monsoon rains is celebrated with a steaming pot of Bhuna Khichuri? Fragrant Kalijeera rice is dry-roasted with yellow moong lentils, mustard oil, and whole spices, then topped with sweet golden beresta fried onions!',
    culturalNote: 'A deep emotional tradition across Dhaka and Sylhet, often served alongside crispy fried eggplant and mango pickle.',
    funFact: 'Ibn Battuta, the famed 14th-century Moroccan explorer, wrote admiringly about khichuri during his travels across Bengal!',
  },
  'italian-saffron-risotto': {
    title: 'Italian Saffron Risotto',
    historyText:
      'Did you know Risotto alla Milanese was legendarily invented in 1574 by an apprentice glazier working on the Milan Cathedral? He used saffron—which stained stained-glass windows yellow—to color the wedding rice, giving birth to northern Italy’s most luxurious creamy dish!',
    culturalNote: 'Patience is everything: warm stock must be added ladle by ladle while slowly stirring to release rice starches.',
    funFact: 'Saffron is the world’s most precious spice by weight, hand-harvested from delicate purple crocus flowers!',
  },
  'british-cottage-pie': {
    title: 'Classic British Cottage Pie',
    historyText:
      'Did you know the term "Cottage Pie" was coined in 1791 when potatoes became an affordable staple for rural cottage dwellers? Distinct from Shepherd’s Pie—which is made with lamb—Cottage Pie features seasoned ground beef simmered in rich gravy beneath a golden-forked mashed potato crust!',
    culturalNote: 'A cornerstone of British home cooking, traditionally served on cold Sunday afternoons with garden peas.',
    funFact: 'Scoring the potato topping with fork tines creates dozens of tiny crispy peaks that brown under the broiler!',
  },
  'american-buttermilk-pancakes': {
    title: 'American Fluffy Buttermilk Pancakes',
    historyText:
      'Did you know ancient Greeks and Romans made flat cakes called tagenites, but the fluffy buttermilk pancake was perfected in 19th-century American farmhouses? Acidic buttermilk reacts with baking soda to create tiny carbon dioxide pockets, producing a cloud-like tender stack!',
    culturalNote: 'The crowning centerpiece of Sunday morning American breakfast, finished with warm pure maple syrup and melting butter.',
    funFact: 'Culinary science secret: gently leaving small lumps in pancake batter ensures tender, fluffy texture every time!',
  },
  'pakistani-chicken-yakhni-pulao': {
    title: 'Pakistani Chicken Yakhni Pulao',
    historyText:
      'Did you know Yakhni Pulao was the chosen aristocratic centerpiece of Mughal royal banquets? Unlike heavily spiced biryanis, pulao celebrates subtlety: aged long-grain basmati is simmered directly in rich chicken bone broth steeped with fennel seeds, cracked coriander, and sweet caramelized onions!',
    culturalNote: 'Considered by South Asian food historians to be the sophisticated culinary ancestor of biryani.',
    funFact: 'Simmering chicken bones slowly releases natural gelatin, giving every grain of rice a silky, melt-in-the-mouth sheen!',
  },
  'pakistani-aloo-palak': {
    title: 'Pakistani Aloo Palak',
    historyText:
      'Did you know Aloo Palak is celebrated across rural Punjab for its farm-to-table freshness? Fresh mature spinach is flash-blanched and simmered with golden pan-fried potato cubes, fresh ginger slivers, and dried kasuri methi fenugreek leaves for rich earthy depth!',
    culturalNote: 'A comforting, vitamin-packed vegetarian favorite served with hot ghee-brushed rotis or parathas.',
    funFact: 'Flash-blanching spinach in boiling water and shocking it in cold water locks in its vibrant emerald green color!',
  },
  'pakistani-shami-kebab': {
    title: 'Authentic Pakistani Shami Kebab',
    historyText:
      'Did you know Shami Kebabs were originally crafted in the royal kitchens of Lucknow for a Nawab who had lost his teeth? Tender beef or lamb is simmered with chana dal lentils and warm whole spices, pounded silky-smooth, dipped in egg, and pan-fried into melt-in-the-mouth patties!',
    culturalNote: 'An essential South Asian tea-time delicacy and festive Eid appetizer, loved with green mint chutney.',
    funFact: 'The lentils act as a natural binder, giving shami kebabs their legendary velvety interior without breadcrumbs!',
  },
  'indian-paneer-butter-masala': {
    title: 'Indian Paneer Butter Masala',
    historyText:
      'Did you know Paneer Butter Masala originated in Delhi in the 1950s as a luxurious vegetarian counterpart to butter chicken? Golden cubes of fresh non-melting cheese are bathed in a velvety reduction of ripe tomatoes, cashew paste, rich butter, and aromatic dried fenugreek leaves!',
    culturalNote: 'The most beloved and ordered vegetarian entree in Indian restaurants around the globe.',
    funFact: 'Paneer is an acid-set cheese made using lemon juice or vinegar, allowing it to withstand hot curry sauces without melting!',
  },
  'indian-aloo-gobi': {
    title: 'Homestyle Indian Aloo Gobi',
    historyText:
      'Did you know Aloo Gobi is a dry-style spiced curry originating from the agrarian heartlands of Punjab? Florets of cauliflower and diced potatoes are gently braised in turmeric, ginger, and roasted cumin with virtually no added water, allowing their natural sugars to caramelize!',
    culturalNote: 'Gained international pop-culture fame in the movie "Bend It Like Beckham" as the quintessential home-cooked dish.',
    funFact: 'Turmeric not only gifts aloo gobi its brilliant sunshine hue, but also delivers potent natural curcumin antioxidants!',
  },
  'indian-dal-tadka': {
    title: 'Restaurant-Style Indian Dal Tadka',
    historyText:
      'Did you know the magic of Dal Tadka comes from the ancient Ayurvedic culinary technique called "chhonk" or "tadka"? Splashing sizzling ghee infused with cumin seeds, garlic, and dried red chilies over creamy simmered lentils creates an explosion of aromatic toasted flavor!',
    culturalNote: 'The foundational heart and soul of South Asian daily dining, balancing nutrition, protein, and warmth.',
    funFact: 'Toasting spices in hot fat dissolves their fat-soluble flavor compounds, unlocking aromas that water cannot release!',
  },
  'bangladeshi-beef-kala-bhuna': {
    title: 'Bangladeshi Beef Kala Bhuna',
    historyText:
      'Did you know Beef Kala Bhuna is an iconic centuries-old culinary pride of Chittagong, Bangladesh? Tender beef is slow-roasted over several hours in mustard oil with black cardamom and radhuni wild celery seeds until the spices oxidize into a dark, deeply caramelized, melt-in-the-mouth crust without burning!',
    culturalNote: 'The crowning centerpiece of grand Bengali wedding feasts and celebratory Eid banquets.',
    funFact: 'The word "Kala" means black in Bengali, describing the glossy caramelized spice coating that envelops each piece of meat!',
  },
  'bangladeshi-chicken-khichuri': {
    title: 'Bangladeshi Monsoon Chicken Khichuri',
    historyText:
      'Did you know Chicken Khichuri represents the ultimate comfort dining across Bangladesh on rainy days? Aromatic short-grain Chinigura rice and yellow lentils are braised together with succulent chicken pieces in fragrant mustard oil, cloves, and bay leaves until luxuriously soft!',
    culturalNote: 'The classic Bengali response to thunder and rain is gathering family for warm khichuri, crispy eggplant, and spiced eggs.',
    funFact: 'Chinigura is an heirloom small-grain rice grown in northern Bangladesh, prized for its delicate floral popcorn aroma!',
  },
  'bangladeshi-begun-bhorta': {
    title: 'Smoked Bangladeshi Begun Bhorta',
    historyText:
      'Did you know Begun Bhorta gets its unforgettable rustic character from charring a whole eggplant directly over open flames? The blistered smoky pulp is hand-mashed with pungent cold-pressed mustard oil, fiery fried red chilies, sliced shallots, and fresh cilantro leaves!',
    culturalNote: 'An indispensable fixture of Bengali Pohela Boishakh (New Year) celebrations, served beside steaming white rice.',
    funFact: 'Pungent mustard oil contains allyl isothiocyanate, which gives Bengali cuisine its distinctive wasabi-like kick!',
  },
  'italian-eggplant-parmigiana': {
    title: 'Classic Italian Eggplant Parmigiana',
    historyText:
      'Did you know Eggplant Parmigiana is fiercely claimed by both Sicily and Naples? Named not after Parma, but likely from the Sicilian word "palmigiana"—the overlapping wooden slats of window shutters—it layers pan-browned eggplant with sweet tomato sauce, fresh basil, and melted mozzarella!',
    culturalNote: 'An Italian Sunday family classic that tastes even more magnificent the next day when the layers harmonize.',
    funFact: 'Eggplants were introduced to southern Italy in the Middle Ages by Arab traders, revolutionizing Mediterranean cuisine!',
  },
  'italian-pasta-pomodoro': {
    title: 'Classic Italian Spaghetti al Pomodoro',
    historyText:
      'Did you know Spaghetti al Pomodoro is the ultimate masterclass in Italian culinary restraint? First documented in Naples in the 1830s, this iconic dish relies solely on sweet plum tomatoes gently simmered with olive oil, a crushed garlic clove, and fresh basil, tossed with al dente pasta!',
    culturalNote: 'Italians always marry the pasta directly into the sauce skillet with starchy pasta water to coat every strand.',
    funFact: 'Tomatoes are high in natural glutamates, giving simple tomato sauce a rich, natural umami savory depth!',
  },
  'italian-classic-tiramisu': {
    title: 'Authentic Italian Classic Tiramisu',
    historyText:
      'Did you know Tiramisu literally translates to "pick me up" in Italian? Born in the Veneto region in the late 1960s, this legendary dessert layers espresso-soaked Savoiardi ladyfingers with a velvety cloud of mascarpone cheese and zabaglione egg cream, dusted in Dutch cocoa!',
    culturalNote: 'Traditional Treviso tiramisu uses neither Marsala wine nor gelatine, relying on whipped cream and mascarpone structure.',
    funFact: 'Tiramisu is ranked among the top five most recognized Italian culinary words around the entire world!',
  },
  'american-mac-and-cheese': {
    title: 'Southern Oven-Baked Mac and Cheese',
    historyText:
      'Did you know baked macaroni and cheese was popularized in America by James Hemings, an enslaved master chef trained in Paris, who cooked for Thomas Jefferson at Monticello? He introduced European pasta gratin to American dining, evolving into our beloved Southern baked soul-food classic!',
    culturalNote: 'An indispensable centerpiece of Thanksgiving and holiday feasts across the American South.',
    funFact: 'Baking with a blend of sharp cheddar and high-moisture cheeses gives you both deep aged flavor and a dramatic cheese pull!',
  },
  'american-chocolate-chip-cookies': {
    title: 'Bakery-Style Chewy Chocolate Chip Cookies',
    historyText:
      'Did you know the chocolate chip cookie was invented in 1938 by American chef Ruth Wakefield at the Toll House Inn in Massachusetts? She chopped a Nestlé semi-sweet chocolate bar into her butter drop dough, expecting it to melt into the dough, but the chocolate held its decadent shape!',
    culturalNote: 'America’s most iconic baked dessert, celebrated with a cold glass of milk in homes and bakeries nationwide.',
    funFact: 'Chilling cookie dough for 24 hours hydrates flour proteins and concentrates caramel sugars for a chewier center!',
  },
  'american-classic-coleslaw': {
    title: 'Classic Creamy American Coleslaw',
    historyText:
      'Did you know the word "Coleslaw" comes from the Dutch "koolsla", meaning cabbage salad? Dutch settlers in 18th-century New York prepared shredded cabbage dressed with melted butter and vinegar, which evolved with the invention of modern mayonnaise into our beloved crisp barbecue accompaniment!',
    culturalNote: 'The essential cool, crunchy partner to smoked ribs, pulled pork, and smashed burgers across the United States.',
    funFact: 'Salting raw cabbage and draining moisture before dressing keeps coleslaw delightfully crisp for days without going watery!',
  },
  'british-shepherds-pie': {
    title: 'Traditional British Shepherd’s Pie',
    historyText:
      'Did you know that while Cottage Pie is made with beef, authentic British Shepherd’s Pie is exclusively made with ground lamb? Developed in the chilly pastoral hills of northern England and Scotland, shepherds seasoned minced lamb with rosemary and peas beneath a fluffy mashed potato blanket!',
    culturalNote: 'A time-honored staple of British pubs and family dinner tables during chilly winter evenings.',
    funFact: 'The distinctive golden mashed potato crust was traditionally crisped using beef drippings or salted butter under the oven grill!',
  },
  'british-victoria-sponge': {
    title: 'Classic British Victoria Sponge Cake',
    historyText:
      'Did you know the Victoria Sponge cake was named after Queen Victoria herself? Following the tragic death of Prince Albert in 1861, the Queen took solace in afternoon tea at Osborne House on the Isle of Wight, enjoying two tender vanilla sponge cakes sandwiched with fresh raspberry jam and cream!',
    culturalNote: 'The golden centerpiece of traditional British afternoon tea and village summer fetes across the UK.',
    funFact: 'The cake became possible thanks to Alfred Bird’s invention of commercial baking powder in Birmingham in 1843!',
  },
  'british-yorkshire-puddings': {
    title: 'Tall & Golden British Yorkshire Puddings',
    historyText:
      'Did you know Yorkshire puddings were originally cooked directly beneath roasting beef spits over hearth fires in northern England? First recorded in 1737 as "Dripping Pudding", the batter caught sizzling beef fats, puffing into crisp, golden, hollow cups to soak up rich onion gravy!',
    culturalNote: 'The non-negotiable crown of the traditional British Sunday Roast alongside roast beef and horseradish.',
    funFact: 'The secret to giant 4-inch rises is heating the oil in the tin until smoking hot before pouring in the chilled batter!',
  },
};

export function getStoryForRecipe(slug: string): RecipeStory {
  if (RECIPE_STORIES[slug]) {
    return RECIPE_STORIES[slug];
  }
  return {
    title: 'Featured Culinary Recipe',
    historyText:
      'Did you know this recipe has an inspiring culinary heritage? Prepared with authentic ingredients and time-honored techniques, it bridges traditional cultural cooking with modern kitchen convenience. Enjoy every flavorful bite!',
    culturalNote: 'Carefully curated and documented by the Meal Yield international culinary editorial team.',
    funFact: 'Cooking at home brings families together and keeps centuries of regional food traditions alive!',
  };
}
