import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { Tilt3D } from '../components/Tilt3D';
import { ARTICLES_DATA } from '../data/articles';
import { filterContent } from '../utils/recipeCalculator';
import { resolveImageUrl } from '../utils/imageHelper';
import { ActivePage, Article } from '../types/content';

interface BlogViewProps {
  initialCategory?: string;
  initialSubcategory?: string;
  onNavigate: (page: ActivePage) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  initialCategory,
  initialSubcategory,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  const mainCategories = [
    'All',
    'Desi Food',
    'Western Food',
    'Cooking Tips',
    'Healthy Eating & Nutrition',
  ];

  // Subcategories mapping
  const subcategoryMap: Record<string, string[]> = {
    'Desi Food': ['All', 'Pakistani Food', 'Indian Food', 'Bangladeshi Food'],
    'Western Food': ['All', 'American Food', 'British Food', 'Italian Food'],
    'Cooking Tips': ['All', 'Kitchen Guides'],
    'Healthy Eating & Nutrition': ['All', 'Blood Sugar & Food', 'Blood Pressure & Diet'],
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubcategory('All');
  };

  const filteredArticles = filterContent(
    ARTICLES_DATA,
    searchQuery,
    selectedCategory === 'All' ? undefined : selectedCategory,
    selectedSubcategory === 'All' ? undefined : selectedSubcategory
  );

  const featuredStory = ARTICLES_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Blog Page Editorial Header */}
      <div className="border-b border-[#EBE6DF] pb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#C85A32] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Meal Yield Journal · Volume IV</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#143D2B] tracking-tight">
          Articles, Culinary Science & Nutrition
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
          Deep-dive culinary histories, evidence-backed metabolic food education, and practical kitchen techniques written in English for home cooks worldwide.
        </p>
      </div>

      {/* Featured Lead Article Marquee (if on 'All') */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="bg-white rounded-3xl border border-[#EBE6DF] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
          <div className="lg:col-span-7">
            <Tilt3D maxTilt={6} scale={1.02} glare={true} className="rounded-2xl overflow-hidden shadow-md">
              <div
                className="aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 relative group cursor-pointer"
                onClick={() => onNavigate({ name: 'article', slug: featuredStory.slug })}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={resolveImageUrl(featuredStory.image)}
                  alt={featuredStory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div
                  className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#143D2B] shadow-md"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  Featured Editorial Cover
                </div>
              </div>
            </Tilt3D>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280] mb-2">
                <span className="text-[#C85A32] font-semibold">{featuredStory.subcategory}</span>
                <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
                <span>{featuredStory.publishedDate}</span>
                <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
                <span className="font-mono">{featuredStory.readTimeMinutes} min read</span>
              </div>

              <h2
                onClick={() => onNavigate({ name: 'article', slug: featuredStory.slug })}
                className="font-editorial text-2xl sm:text-3xl font-bold text-[#143D2B] hover:text-[#C85A32] cursor-pointer transition-colors leading-tight"
              >
                {featuredStory.title}
              </h2>

              <p className="mt-3 text-sm text-[#4B5563] leading-relaxed line-clamp-3">
                {featuredStory.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
              <span className="text-xs text-[#6B7280]">
                By <strong className="font-medium text-[#1C1E21]">{featuredStory.author.name}</strong>
              </span>
              <button
                onClick={() => onNavigate({ name: 'article', slug: featuredStory.slug })}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#143D2B] hover:text-[#C85A32]"
              >
                <span>Read Feature</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Category Navigation Bar & Search */}
      <div className="space-y-4">
        {/* Main Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {mainCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#143D2B] text-white shadow-sm'
                    : 'bg-white text-[#52575C] hover:bg-[#F2ECE1] border border-[#EBE6DF]'
                }`}
              >
                {cat === 'All' ? 'All Journal Stories' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#8A8F95] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#EBE6DF] rounded-xl focus:outline-none focus:border-[#143D2B]"
            />
          </div>
        </div>

        {/* Subcategories if category selected */}
        {selectedCategory !== 'All' && subcategoryMap[selectedCategory] && (
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-xs text-[#8A8F95] font-medium mr-1">Subcategory:</span>
            {subcategoryMap[selectedCategory].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedSubcategory === sub
                    ? 'bg-[#C85A32] text-white'
                    : 'bg-[#F4EFE6] text-[#52575C] hover:bg-[#EBE6DF]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onClick={() => onNavigate({ name: 'article', slug: article.slug })}
          />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EBE6DF]">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="font-editorial text-xl font-bold text-[#143D2B]">No articles match your criteria</h3>
          <p className="text-xs text-[#6B7280] mt-1">Try resetting the subcategory filter or searching for another keyword.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSubcategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-[#143D2B] text-white rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
