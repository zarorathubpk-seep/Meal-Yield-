import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Clock, Users, Sparkles } from 'lucide-react';
import { ActivePage } from '../types/content';

interface HeroCarouselProps {
  onNavigate: (page: ActivePage) => void;
}

interface HeroItem {
  id: string;
  slug: string;
  title: string;
  cuisine: string;
  country: string;
  description: string;
  cookTime: string;
  servings: string;
  image: string;
  type: 'recipe' | 'article';
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
  const showcaseItems: HeroItem[] = [
    {
      id: 'karahi',
      slug: 'pakistani-chicken-karahi',
      title: 'Pakistani Chicken Karahi',
      cuisine: 'Pakistani Heritage',
      country: 'Pakistan',
      description: 'Wok-seared bone-in chicken in fragrant tomato masala with fresh ginger matchsticks and sliced chilies.',
      cookTime: '30 mins',
      servings: '4 servings',
      image: '/src/assets/images/chicken_karahi_1792407742450.jpg',
      type: 'recipe',
    },
    {
      id: 'pizza',
      slug: 'authentic-italian-margherita-pizza',
      title: 'Italian Margherita Pizza',
      cuisine: 'Neapolitan Tradition',
      country: 'Italy',
      description: 'Wood-fired blistered crust with sweet San Marzano tomatoes, fresh buffalo mozzarella & garden basil.',
      cookTime: '8 mins bake',
      servings: '2 servings',
      image: '/src/assets/images/margherita_pizza_1792407744383.jpg',
      type: 'recipe',
    },
    {
      id: 'burger',
      slug: 'classic-american-cheeseburger',
      title: 'American Cheeseburger',
      cuisine: 'Diner Craft',
      country: 'United States',
      description: 'Double smashed 80/20 beef chuck patties with lace-crisp crust, draped in melting aged sharp cheddar.',
      cookTime: '8 mins',
      servings: '2 servings',
      image: '/src/assets/images/american_cheeseburger_1792407744496.jpg',
      type: 'recipe',
    },
    {
      id: 'biryani',
      slug: 'traditional-chicken-biryani',
      title: 'Royal Chicken Biryani',
      cuisine: 'Mughlai Heritage',
      country: 'Pakistan & India',
      description: 'Fragrant saffron-tinted long-grain basmati steamed with spice-infused chicken and caramelized onions.',
      cookTime: '45 mins',
      servings: '6 servings',
      image: '/src/assets/images/chicken_biryani_1792407744625.jpg',
      type: 'recipe',
    },
    {
      id: 'fish-chips',
      slug: 'traditional-british-fish-and-chips',
      title: 'British Fish and Chips',
      cuisine: 'Coastal Pub Classic',
      country: 'United Kingdom',
      description: 'Crisp amber ale battered Atlantic cod fillet paired with hand-cut triple-cooked chips and minted mushy peas.',
      cookTime: '25 mins',
      servings: '4 servings',
      image: '/src/assets/images/fish_and_chips_1792407746022.jpg',
      type: 'recipe',
    },
    {
      id: 'pasta',
      slug: 'traditional-spaghetti-carbonara',
      title: 'Italian Spaghetti Carbonara',
      cuisine: 'Roman Tradition',
      country: 'Italy',
      description: 'Silky emulsion of farm-fresh egg yolks, Pecorino Romano DOP, crisp cured guanciale & black pepper.',
      cookTime: '15 mins',
      servings: '2 servings',
      image: '/src/assets/images/italian_pasta_1792407766508.jpg',
      type: 'recipe',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance carousel smoothly, pausing on user hover or reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, showcaseItems.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const currentItem = showcaseItems[currentIndex];

  return (
    <section 
      className="relative bg-[#FDFBF7] border-b border-[#EBE6DF] overflow-hidden py-12 lg:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle background ambient grain and tone */}
      <div className="absolute inset-0 bg-[radial-gradient(#EBE6DF_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Static Editorial Headline & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#C85A32] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>International Food & Lifestyle</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#143D2B] leading-[1.08] text-balance">
              Discover Incredible Food From Around the World
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl font-sans">
              Explore delicious recipes, inspiring food photography, authentic cooking traditions, and practical tips for making every meal special.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate({ name: 'recipes-directory' })}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#143D2B] hover:bg-[#1E5E43] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <span>Explore Recipes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate({ name: 'blog' })}
                className="px-6 py-3.5 text-sm font-semibold text-[#143D2B] bg-[#F4EFE6] hover:bg-[#EBE6DF] border border-[#D6CEBE] rounded-xl transition-colors duration-200"
              >
                Read Our Blog
              </button>
            </div>

            {/* Quick Cuisine Anchor Links */}
            <div className="mt-10 pt-6 border-t border-[#EBE6DF]">
              <span className="text-xs uppercase tracking-wider text-[#8A8F95] font-semibold block mb-2">
                Featured World Traditions
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#52575C]">
                <button onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Pakistani' })} className="hover:text-[#143D2B] font-medium transition-colors">Pakistani</button>
                <span>·</span>
                <button onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Italian' })} className="hover:text-[#143D2B] font-medium transition-colors">Italian</button>
                <span>·</span>
                <button onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Indian' })} className="hover:text-[#143D2B] font-medium transition-colors">Indian</button>
                <span>·</span>
                <button onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'American' })} className="hover:text-[#143D2B] font-medium transition-colors">American</button>
                <span>·</span>
                <button onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'British' })} className="hover:text-[#143D2B] font-medium transition-colors">British</button>
                <span>·</span>
                <button onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Bangladeshi' })} className="hover:text-[#143D2B] font-medium transition-colors">Bangladeshi</button>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Rotating Layered Food Showcase */}
          <div 
            className="lg:col-span-7 relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 3D Stage Container */}
            <div className="relative mx-auto max-w-xl perspective-1000">
              
              {/* Background Depth Card 2 (Layer 3) */}
              <div 
                className="hidden sm:block absolute inset-0 bg-[#E8E1D5] rounded-3xl transform scale-90 translate-y-6 opacity-40 shadow-sm transition-transform duration-500"
                aria-hidden="true"
              />

              {/* Background Depth Card 1 (Layer 2) */}
              <div 
                className="hidden sm:block absolute inset-0 bg-[#F2EDE3] border border-[#DDD5C7] rounded-3xl transform scale-95 translate-y-3 opacity-70 shadow transition-transform duration-500"
                aria-hidden="true"
              />

              {/* Foreground Active 3D Food Card (Layer 1) */}
              <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-[#EBE6DF] transition-all duration-500 preserve-3d">
                {/* Main Photograph Frame */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4EFE6] shadow-inner group">
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-[#143D2B] shadow-sm tracking-wide">
                      {currentItem.country}
                    </span>
                    <span className="px-3 py-1 bg-[#143D2B]/85 backdrop-blur-md rounded-full text-xs font-medium text-white shadow-sm">
                      {currentItem.cuisine}
                    </span>
                  </div>

                  {/* Bottom Text Over Photo */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-md">
                      {currentItem.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-2 drop-shadow">
                      {currentItem.description}
                    </p>
                  </div>
                </div>

                {/* Card Info Footer Strip */}
                <div className="mt-4 px-2 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-medium text-[#52575C]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#C85A32]" />
                      <span>{currentItem.cookTime}</span>
                    </div>
                    <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#C85A32]" />
                      <span>{currentItem.servings}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate({ name: 'recipe', slug: currentItem.slug })}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#143D2B] bg-[#F8F5EE] hover:bg-[#143D2B] hover:text-white rounded-lg transition-colors duration-200"
                  >
                    <span>View Recipe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Prev / Next Tactile Controls */}
              <div className="flex items-center justify-between mt-6 px-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous showcase recipe"
                    className="w-10 h-10 rounded-full bg-white border border-[#EBE6DF] hover:border-[#143D2B] hover:text-[#143D2B] text-[#52575C] shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next showcase recipe"
                    className="w-10 h-10 rounded-full bg-white border border-[#EBE6DF] hover:border-[#143D2B] hover:text-[#143D2B] text-[#52575C] shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Indicator Dots */}
                <div className="flex items-center gap-1.5">
                  {showcaseItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Jump to ${item.title}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-7 bg-[#143D2B]'
                          : 'w-2 bg-[#D6CEBE] hover:bg-[#8A8F95]'
                      }`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <div className="text-xs font-mono font-medium text-[#8A8F95] tabular-nums">
                  0{currentIndex + 1} / 0{showcaseItems.length}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
