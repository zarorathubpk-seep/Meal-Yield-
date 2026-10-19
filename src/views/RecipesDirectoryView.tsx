import React, { useState } from 'react';
import { Search, Utensils, Compass, Filter } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { RECIPES_DATA } from '../data/recipes';
import { filterContent } from '../utils/recipeCalculator';
import { ActivePage } from '../types/content';

interface RecipesDirectoryViewProps {
  initialCuisine?: string;
  onNavigate: (page: ActivePage) => void;
}

export const RecipesDirectoryView: React.FC<RecipesDirectoryViewProps> = ({
  initialCuisine,
  onNavigate,
}) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string>(initialCuisine || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  const cuisines = [
    'All',
    'Pakistani',
    'Italian',
    'Indian',
    'American',
    'British',
    'Bangladeshi',
  ];

  const filtered = RECIPES_DATA.filter((recipe) => {
    if (selectedCuisine !== 'All' && recipe.cuisine !== selectedCuisine) {
      return false;
    }
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(q) ||
      recipe.description.toLowerCase().includes(q) ||
      recipe.cuisine.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#EBE6DF] pb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#C85A32] mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Complete Tested Recipe Library</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#143D2B] tracking-tight">
          Explore World Recipes
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
          Tested, measured, and repeatable international dishes with interactive ingredient scaling, cooking times, and step-by-step methods.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Cuisine Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {cuisines.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCuisine(c)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                selectedCuisine === c
                  ? 'bg-[#143D2B] text-white shadow-sm'
                  : 'bg-white text-[#52575C] hover:bg-[#F2ECE1] border border-[#EBE6DF]'
              }`}
            >
              {c === 'All' ? 'All Cuisines' : `${c} Recipes`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-[#8A8F95] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ingredient or title..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#EBE6DF] rounded-xl focus:outline-none focus:border-[#143D2B]"
          />
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => onNavigate({ name: 'recipe', slug: recipe.slug })}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EBE6DF]">
          <Utensils className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="font-editorial text-xl font-bold text-[#143D2B]">No recipes found</h3>
          <p className="text-xs text-[#6B7280] mt-1">Try switching cuisine filters or checking your search query.</p>
          <button
            onClick={() => {
              setSelectedCuisine('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-[#143D2B] text-white rounded-lg"
          >
            Show All Recipes
          </button>
        </div>
      )}

    </div>
  );
};
