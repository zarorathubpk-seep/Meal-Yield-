import React from 'react';
import { ArrowRight, Compass, Flame, HeartPulse, Sparkles, Youtube, CheckCircle2, MessageSquare } from 'lucide-react';
import { HeroCarousel } from '../components/HeroCarousel';
import { RecipeCard } from '../components/RecipeCard';
import { ArticleCard } from '../components/ArticleCard';
import { RECIPES_DATA } from '../data/recipes';
import { ARTICLES_DATA } from '../data/articles';
import { COOKING_VIDEOS_DATA } from '../data/videos';
import { ActivePage, CookingVideo } from '../types/content';

interface HomeViewProps {
  onNavigate: (page: ActivePage) => void;
  onSelectVideo: (video: CookingVideo) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectVideo }) => {
  // Recipes
  const featuredRecipes = RECIPES_DATA.slice(0, 4); // Karahi, Pizza, Biryani, Burger
  const desiRecipes = RECIPES_DATA.filter((r) => r.category === 'Desi Food');
  const westernRecipes = RECIPES_DATA.filter((r) => r.cuisine === 'American' || r.cuisine === 'British');
  const italianRecipes = RECIPES_DATA.filter((r) => r.cuisine === 'Italian');

  // Articles
  const cookingTips = ARTICLES_DATA.filter((a) => a.category === 'Cooking Tips');
  const healthArticles = ARTICLES_DATA.filter((a) => a.category === 'Healthy Eating & Nutrition');
  const latestBlog = ARTICLES_DATA.slice(0, 4);

  // Global Cuisines Cards
  const cuisineCards = [
    { name: 'Pakistani', count: '12 Recipes & Guides', flag: '🇵🇰', image: '/src/assets/images/chicken_karahi_1792407742450.jpg', desc: 'Iron wok karahis, slow-simmered nihari & aromatic biryani' },
    { name: 'Italian', count: '14 Recipes & Guides', flag: '🇮🇹', image: '/src/assets/images/margherita_pizza_1792407744383.jpg', desc: 'Wood-fired pizza, handmade pasta & silky carbonara' },
    { name: 'Indian', count: '16 Recipes & Guides', flag: '🇮🇳', image: '/src/assets/images/chicken_biryani_1792407744625.jpg', desc: 'Velvety butter chicken, slow daal tadka & fragrant pulao' },
    { name: 'American', count: '10 Recipes & Guides', flag: '🇺🇸', image: '/src/assets/images/american_cheeseburger_1792407744496.jpg', desc: 'Smashed diner burgers, buttermilk chicken & fluffy pancakes' },
    { name: 'British', count: '9 Recipes & Guides', flag: '🇬🇧', image: '/src/assets/images/fish_and_chips_1792407746022.jpg', desc: 'Crisp ale-battered cod, shepherd’s pie & traditional roasts' },
    { name: 'Bangladeshi', count: '8 Recipes & Guides', flag: '🇧🇩', image: '/src/assets/images/chicken_biryani_1792407744625.jpg', desc: 'Old Dhaka kacchi biryani, chicken bhuna & spiced khichuri' },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      
      {/* Impressive Hero Showcase */}
      <HeroCarousel onNavigate={onNavigate} />

      {/* SECTION A: Featured Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C85A32] mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Section A · Curated Editor Selection</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Featured World Recipes
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'recipes-directory' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>Browse Full Recipe Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
            />
          ))}
        </div>
      </section>

      {/* SECTION B: Explore Global Food (Cuisine Categories) */}
      <section className="bg-[#F8F5EE] py-16 border-y border-[#EBE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block mb-2">
              Section B · Culinary Geography
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Explore by Global Cuisine
            </h2>
            <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">
              Every country possesses unique cooking vessels, temperature philosophies, and spice pairings. Dive into regional traditions with authentic ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuisineCards.map((c) => (
              <div
                key={c.name}
                onClick={() => onNavigate({ name: 'recipes-directory', cuisine: c.name })}
                className="group cursor-pointer bg-white rounded-2xl border border-[#EBE6DF] overflow-hidden card-hover-subtle p-5 flex flex-col justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 relative">
                    <img
                      src={c.image}
                      alt={c.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg" aria-hidden="true">{c.flag}</span>
                      <h3 className="font-editorial text-xl font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors">
                        {c.name} Food
                      </h3>
                    </div>
                    <span className="text-xs text-[#8A8F95] font-mono mt-0.5 block">{c.count}</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-[#4B5563] leading-relaxed">
                  {c.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-[#F4EFE6] flex items-center justify-between text-xs font-semibold text-[#143D2B] group-hover:text-[#C85A32]">
                  <span>Explore Cuisine</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C: Traditional Desi Favorites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block mb-1">
              Section C · South Asian Heritage
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Traditional Desi Favorites
            </h2>
            <p className="mt-1 text-xs text-[#6B7280]">
              Pakistani, Indian, and Bangladeshi masterpieces cooked in English with authentic technique.
            </p>
          </div>
          <button
            onClick={() => onNavigate({ name: 'blog', category: 'Desi Food' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>View All Desi Recipes & Stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {desiRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
            />
          ))}
        </div>
      </section>

      {/* SECTION D: American & British Food */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block mb-1">
              Section D · Transatlantic Comfort
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              American Classics & British Favorites
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'blog', category: 'Western Food' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>View All Western Classics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {westernRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
              variant="featured"
            />
          ))}
        </div>
      </section>

      {/* SECTION E: Italian & International Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block mb-1">
              Section E · Mediterranean & Beyond
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Italian & International Recipes
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Italian' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>Explore Italian Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {italianRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
              variant="featured"
            />
          ))}
        </div>
      </section>

      {/* SECTION F: Popular Cooking Tips */}
      <section className="bg-[#F8F5EE] py-16 border-y border-[#EBE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block mb-1">
                Section F · Kitchen Science & Techniques
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
                Popular Cooking Tips & Kitchen Guides
              </h2>
            </div>
            <button
              onClick={() => onNavigate({ name: 'blog', category: 'Cooking Tips' })}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
            >
              <span>Explore All Kitchen Guides</span>
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
        </div>
      </section>

      {/* SECTION G: Latest From Our Blog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C85A32] block mb-1">
              Section G · Fresh Editorial Stories
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Latest From Our Blog
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'blog' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>Visit Full Publication Blog</span>
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

      {/* SECTION H: Featured Cooking Videos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-red-600 mb-1">
              <Youtube className="w-4 h-4" />
              <span>Section H · Video Masterclasses</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
              Featured Cooking Videos
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'videos' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32] transition-colors"
          >
            <span>View All Video Masterclasses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COOKING_VIDEOS_DATA.slice(0, 3).map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="group cursor-pointer bg-white rounded-2xl border border-[#EBE6DF] overflow-hidden card-hover-subtle flex flex-col"
            >
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current ml-0.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-[10px] font-mono text-white">
                  {video.duration}
                </span>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[11px] font-semibold text-[#C85A32] uppercase tracking-wider block mb-1">
                    {video.cuisine}
                  </span>
                  <h4 className="font-editorial text-base font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                </div>
                <div className="mt-3 pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-[#6B7280]">
                  <span>{video.creator}</span>
                  <span className="font-semibold text-[#143D2B] group-hover:text-[#C85A32]">Watch Video →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION I: Healthy Eating & Nutrition */}
      <section className="bg-[#F8F5EE] py-16 border-y border-[#EBE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBE6DF]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#143D2B] mb-1">
                <HeartPulse className="w-4 h-4 text-[#C85A32]" />
                <span>Section I · Evidence-Based Wellness</span>
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

      {/* SECTION J: About Meal Yield */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#143D2B] rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#E27344] block mb-2">
              Section J · Our Editorial Mission
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              About Meal Yield
            </h2>
            <p className="mt-4 text-stone-200 text-sm sm:text-base leading-relaxed">
              Meal Yield was created with a clear belief: cooking at home should neither be intimidating nor generic. We bridge ancient culinary traditions from Pakistan, India, Bangladesh, Italy, Britain, and the Americas with contemporary culinary science and nutritional transparency.
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

      {/* SECTION K: Contact & Community */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EBE6DF] p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C85A32] mb-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Section K · Community Conversation</span>
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

    </div>
  );
};
