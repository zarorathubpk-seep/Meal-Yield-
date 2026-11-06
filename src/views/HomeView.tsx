import React, { useState } from 'react';
import { ArrowRight, Flame, HeartPulse, Sparkles, Youtube, CheckCircle2, MessageSquare, Clock, Calendar, ChefHat, Compass } from 'lucide-react';
import { HeroCarousel } from '../components/HeroCarousel';
import { RecipeCard } from '../components/RecipeCard';
import { ArticleCard } from '../components/ArticleCard';
import { Tilt3D } from '../components/Tilt3D';
import { KitchenPantryMatcher } from '../components/KitchenPantryMatcher';
import { RecipeFinderWidget } from '../components/RecipeFinderWidget';
import { MealPlannerModal } from '../components/MealPlannerModal';
import { RECIPES_DATA, getRecipeBySlug } from '../data/recipes';
import { ARTICLES_DATA } from '../data/articles';
import { COOKING_VIDEOS_DATA } from '../data/videos';
import { ActivePage, CookingVideo } from '../types/content';
import { resolveImageUrl } from '../utils/imageHelper';

interface HomeViewProps {
  onNavigate: (page: ActivePage) => void;
  onSelectVideo: (video: CookingVideo) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectVideo }) => {
  const [mealPlannerOpen, setMealPlannerOpen] = useState(false);

  // 3 Primary Featured Recipes (Chicken Karahi, Biryani, Pizza)
  const karahiRecipe = getRecipeBySlug('pakistani-chicken-karahi') || RECIPES_DATA[0];
  const biryaniRecipe = getRecipeBySlug('traditional-chicken-biryani') || RECIPES_DATA[1];
  const pizzaRecipe = getRecipeBySlug('authentic-italian-margherita-pizza') || RECIPES_DATA[2];
  const primaryFeatured = [karahiRecipe, biryaniRecipe, pizzaRecipe];

  // Regional collections
  const pakistaniRecipes = RECIPES_DATA.filter((r) => r.cuisine === 'Pakistani').slice(0, 6);
  const indianRecipes = RECIPES_DATA.filter((r) => r.cuisine === 'Indian').slice(0, 6);
  const bengalSriLankanRecipes = RECIPES_DATA.filter((r) => r.cuisine === 'Bangladeshi' || r.cuisine === 'Sri Lankan').slice(0, 4);

  // Curated theme collections
  const quickAndEasy = RECIPES_DATA.filter((r) => r.cookTimeMinutes <= 30).slice(0, 4);
  const desiBreakfast = RECIPES_DATA.filter((r) => r.mealType === 'Breakfast' || r.slug.includes('halwa-puri') || r.slug.includes('khichuri') || r.slug.includes('pancake')).slice(0, 4);
  const streetFood = RECIPES_DATA.filter((r) => r.subcategory?.toLowerCase().includes('street') || r.slug.includes('samosa') || r.slug.includes('kottu') || r.slug.includes('pav-bhaji') || r.slug.includes('chapli')).slice(0, 4);

  // Articles & Media
  const cookingTips = ARTICLES_DATA.filter((a) => a.category === 'Cooking Tips').slice(0, 4);
  const healthArticles = ARTICLES_DATA.filter((a) => a.category === 'Healthy Eating & Nutrition').slice(0, 2);
  const latestBlog = ARTICLES_DATA.slice(0, 4);

  // Cuisine Navigator Cards
  const cuisineCards = [
    { name: 'Pakistani', count: '14 Authenticated Recipes', flag: '🇵🇰', image: '/images/pakistani-chicken-karahi.jpg', desc: 'Iron wok karahis, slow-simmered nihari, chapli kababs & rich dum biryanis' },
    { name: 'Indian', count: '12 Authenticated Recipes', flag: '🇮🇳', image: '/images/butter-chicken.jpg', desc: 'Old Delhi butter chicken, creamy dal makhani, rogan josh & tandoori skewers' },
    { name: 'Bangladeshi', count: '6 Heritage Recipes', flag: '🇧🇩', image: '/images/bangladeshi-kacchi-biryani.jpg', desc: 'Old Dhaka kacchi biryani, Chittagong kala bhuna & smoked begun bhorta' },
    { name: 'Sri Lankan', count: '4 Island Specialties', flag: '🇱🇰', image: '/images/pakistani-shami-kebab.jpg', desc: 'Dark roasted pepper chicken curry, godamba kottu roti & aromatic spices' },
    { name: 'Italian', count: '6 Classic Recipes', flag: '🇮🇹', image: '/images/italian-margherita-pizza.jpg', desc: 'Wood-fired sourdough pizza, silky carbonara, eggplant parmigiana & tiramisu' },
    { name: 'British & American', count: '8 Comfort Staples', flag: '🇬🇧', image: '/images/british-fish-and-chips.jpg', desc: 'Crispy fish & chips, shepherd’s pie, smashed burgers & mac and cheese' },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      
      {/* Impressive Hero Showcase with Quick Search */}
      <HeroCarousel onNavigate={onNavigate} />

      {/* SECTION 1: 3 Featured Masterpieces (Chicken Karahi, Biryani, Pizza) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C85A32] mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Signature Collection · Editor's Top 3</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Featured Masterpiece Recipes
            </h2>
            <p className="mt-1 text-xs text-[#6B7280]">
              Our most celebrated dishes: authentic high-heat Chicken Karahi, royal dum Biryani, and wood-fired Pizza.
            </p>
          </div>
          <button
            onClick={() => onNavigate({ name: 'recipes-directory' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>Browse Full Library ({RECIPES_DATA.length} recipes)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Featured Cards Grid with large presentation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {primaryFeatured.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
              variant="featured"
            />
          ))}
        </div>
      </section>

      {/* INTERACTIVE TOOL CALLOUT BANNER: Weekly Meal Planner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#143D2B] via-emerald-950 to-stone-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/20">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                Interactive Kitchen Suite
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Family Weekly Meal Planner & Grocery List
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                Plan lunches and dinners for Monday through Sunday. Automatically generates a consolidated, categorized shopping checklist with exact ingredient quantities.
              </p>
            </div>
          </div>

          <button
            onClick={() => setMealPlannerOpen(true)}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Open Meal Planner
          </button>
        </div>
      </section>

      {/* SECTION 2: What’s in My Kitchen? (Interactive Pantry Matcher) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <KitchenPantryMatcher
          onSelectRecipe={(slug) => onNavigate({ name: 'recipe', slug })}
        />
      </div>

      {/* SECTION 3: Popular Pakistani Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C85A32] mb-1">
              <span className="text-base">🇵🇰</span>
              <span>Authentic Pakistani Traditions</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Popular Pakistani Recipes
            </h2>
            <p className="mt-1 text-xs text-[#6B7280]">
              From roaring Lahori cast-iron karahis to slow-simmered beef nihari and Peshawari chapli kababs.
            </p>
          </div>
          <button
            onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Pakistani' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>View All Pakistani Recipes ({pakistaniRecipes.length}+)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pakistaniRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4: Popular Indian Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C85A32] mb-1">
              <span className="text-base">🇮🇳</span>
              <span>North & South Indian Heritage</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Popular Indian Recipes
            </h2>
            <p className="mt-1 text-xs text-[#6B7280]">
              Satin-smooth Old Delhi butter chicken, fragrant Hyderabadi dum biryani, and slow-simmered dhaba dal makhani.
            </p>
          </div>
          <button
            onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Indian' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>View All Indian Recipes ({indianRecipes.length}+)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indianRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
            />
          ))}
        </div>
      </section>

      {/* SECTION 5: What Should I Cook Today? (Interactive Randomizer & Filter Widget) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecipeFinderWidget
          onSelectRecipe={(slug) => onNavigate({ name: 'recipe', slug })}
        />
      </div>

      {/* SECTION 6: Explore Bangladesh & Sri Lanka */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C85A32] mb-1">
              <span className="text-base">🇧🇩 🇱🇰</span>
              <span>Bengal Delta & Emerald Isle</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Bangladesh & Sri Lanka Specialties
            </h2>
            <p className="mt-1 text-xs text-[#6B7280]">
              Old Dhaka nawabi kacchi biryani, rainy-day bhuna khichuri, black pepper chicken curry & Colombo kottu roti.
            </p>
          </div>
          <button
            onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Bangladeshi' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>Explore Regional Traditions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bengalSriLankanRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
            />
          ))}
        </div>
      </section>

      {/* SECTION 7: Quick & Easy Weeknight Meals (<30 mins) */}
      <section className="bg-[#F8F5EE] py-16 border-y border-[#EBE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C85A32] mb-1">
                <Clock className="w-4 h-4" />
                <span>30 Minutes or Less</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
                Quick & Easy Weeknight Meals
              </h2>
              <p className="mt-1 text-xs text-[#6B7280]">
                Zero compromise on flavor: high-speed, authentic dinners ready before the table is set.
              </p>
            </div>
            <button
              onClick={() => onNavigate({ name: 'recipes-directory' })}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
            >
              <span>Explore Fast Dinners</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAndEasy.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Desi Breakfast & Street Food Favorites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Desi Breakfast */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#EBE6DF] mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block">Morning Feasts</span>
                <h3 className="font-editorial text-2xl font-bold text-[#143D2B]">Desi Breakfast Ideas</h3>
              </div>
              <button
                onClick={() => onNavigate({ name: 'recipes-directory' })}
                className="text-xs font-semibold text-[#143D2B] hover:text-[#C85A32]"
              >
                View More →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {desiBreakfast.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
                />
              ))}
            </div>
          </div>

          {/* Street Food */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#EBE6DF] mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block">Bazaar Flavors</span>
                <h3 className="font-editorial text-2xl font-bold text-[#143D2B]">Street Food Favorites</h3>
              </div>
              <button
                onClick={() => onNavigate({ name: 'recipes-directory' })}
                className="text-xs font-semibold text-[#143D2B] hover:text-[#C85A32]"
              >
                View More →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {streetFood.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Culinary Geography Grid (Cuisines) */}
      <section className="bg-[#F8F5EE] py-16 border-y border-[#EBE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block mb-2">
              Regional Terroirs
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Explore by Culinary Tradition
            </h2>
            <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">
              Every country possesses unique cooking vessels, temperature philosophies, and spice pairings. Dive into regional traditions with authentic ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuisineCards.map((c) => (
              <Tilt3D key={c.name} maxTilt={8} scale={1.03} glare={true} className="h-full">
                <div
                  onClick={() => onNavigate({ name: 'recipes-directory', cuisine: c.name })}
                  className="group cursor-pointer bg-white rounded-3xl border border-[#EBE6DF] overflow-hidden shadow-sm hover:shadow-xl p-5 flex flex-col justify-between h-full transition-shadow duration-300"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-center gap-4" style={{ transform: 'translateZ(15px)' }}>
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 shrink-0 relative shadow-inner">
                      <img
                        src={resolveImageUrl(c.image)}
                        alt={c.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl" aria-hidden="true">{c.flag}</span>
                        <h3 className="font-editorial text-xl font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors">
                          {c.name} Food
                        </h3>
                      </div>
                      <span className="text-xs text-[#8A8F95] font-mono mt-0.5 block">{c.count}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-[#4B5563] leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
                    {c.desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#F4EFE6] flex items-center justify-between text-xs font-semibold text-[#143D2B] group-hover:text-[#C85A32]" style={{ transform: 'translateZ(18px)' }}>
                    <span>Explore Recipes</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: Popular Cooking Tips & Kitchen Science */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block mb-1">
              Culinary Science & Techniques
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Popular Cooking Tips & Food Science
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'blog', category: 'Cooking Tips' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>Explore All Cooking Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cookingTips.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => onNavigate({ name: 'article', slug: article.slug })}
              variant="horizontal"
            />
          ))}
        </div>
      </section>

      {/* SECTION 11: Latest Editorial Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block mb-1">
              Fresh Editorial Stories
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Latest From Our Culinary Journal
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'blog' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>Visit Full Journal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestBlog.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => onNavigate({ name: 'article', slug: article.slug })}
            />
          ))}
        </div>
      </section>

      {/* SECTION 12: Featured Video Masterclasses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-red-600 mb-1">
              <Youtube className="w-4 h-4" />
              <span>Video Masterclasses</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Step-by-Step Cooking Videos
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'videos' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>View All Masterclasses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COOKING_VIDEOS_DATA.slice(0, 3).map((video) => (
            <Tilt3D key={video.id} maxTilt={8} scale={1.03} glare={true} className="h-full">
              <div
                onClick={() => onSelectVideo(video)}
                className="group cursor-pointer bg-white rounded-3xl border border-[#EBE6DF] overflow-hidden shadow-sm hover:shadow-xl flex flex-col h-full transition-shadow duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="relative aspect-video bg-black overflow-hidden"
                  style={{ transform: 'translateZ(12px)', transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-115 transition-transform"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current ml-0.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                  <span
                    className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-[10px] font-mono text-white"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {video.duration}
                  </span>
                </div>
                <div className="p-5 flex flex-col justify-between flex-1" style={{ transform: 'translateZ(18px)' }}>
                  <div>
                    <span className="text-[11px] font-semibold text-[#C85A32] uppercase tracking-wider block mb-1">
                      {video.cuisine}
                    </span>
                    <h4 className="font-editorial text-base font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors line-clamp-2">
                      {video.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-[#6B7280]">
                    <span>{video.creator}</span>
                    <span className="font-semibold text-red-600 group-hover:underline">Watch Video →</span>
                  </div>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* SECTION 13: Healthy Eating & Evidence-Based Nutrition */}
      <section className="bg-[#F8F5EE] py-16 border-y border-[#EBE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#143D2B] mb-1">
                <HeartPulse className="w-4 h-4 text-[#C85A32]" />
                <span>Evidence-Based Wellness</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
                Healthy Eating & Nutrition
              </h2>
              <p className="mt-1 text-xs text-[#6B7280]">
                Balanced nutrition guidance citing the American Diabetes Association, American Heart Association, CDC, and WHO.
              </p>
            </div>
            <button
              onClick={() => onNavigate({ name: 'blog', category: 'Healthy Eating & Nutrition' })}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
            >
              <span>Explore All Health Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => onNavigate({ name: 'article', slug: article.slug })}
                variant="horizontal"
              />
            ))}
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="mt-8 p-4 bg-white rounded-xl border border-[#EBE6DF] text-xs text-[#52575C] flex items-start gap-3">
            <span className="font-semibold text-[#143D2B] shrink-0">Medical Disclaimer:</span>
            <p>
              Information on Meal Yield is published for general educational and informational purposes only. It does not constitute medical advice or claim to diagnose, treat, or cure any condition. Always consult your personal physician or qualified healthcare provider regarding dietary changes.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 14: Mission & Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#143D2B] rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#E27344] block mb-2">
              Our Editorial Mission
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              About Meal Yield
            </h2>
            <p className="mt-4 text-stone-200 text-sm sm:text-base leading-relaxed">
              Meal Yield was created with a clear belief: cooking at home should neither be intimidating nor generic. We bridge ancient culinary traditions from Pakistan, India, Bangladesh, Sri Lanka, Italy, Britain, and the Americas with contemporary culinary science and nutritional transparency.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-stone-300 font-sans">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E27344]" />
                100% Tested Authentic Recipes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E27344]" />
                Zero Machine-Generated Fluff
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E27344]" />
                Evidence-Based Health Insights
              </span>
            </div>
            <div className="mt-8">
              <button
                onClick={() => onNavigate({ name: 'about' })}
                className="px-6 py-3 bg-[#FDFBF7] text-[#143D2B] hover:bg-stone-100 rounded-xl font-semibold text-xs transition-colors shadow"
              >
                Learn More About Us →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15: Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EBE6DF] p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C85A32] mb-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Community Conversation</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#143D2B]">
              Have a Recipe Tradition or Feedback to Share?
            </h2>
            <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
              We welcome genuine reader questions, cultural culinary stories, and suggestions. Our editorial team reviews every note sent by our community.
            </p>
          </div>
          <button
            onClick={() => onNavigate({ name: 'contact' })}
            className="px-6 py-3.5 bg-[#C85A32] hover:bg-[#A9431E] text-white rounded-xl font-semibold text-xs tracking-wide uppercase transition-colors shadow whitespace-nowrap shrink-0"
          >
            Contact Our Editors
          </button>
        </div>
      </section>

      {/* Meal Planner Modal */}
      {mealPlannerOpen && (
        <MealPlannerModal
          onClose={() => setMealPlannerOpen(false)}
          onSelectRecipe={(slug) => onNavigate({ name: 'recipe', slug })}
        />
      )}

    </div>
  );
};
