import React, { useState, useMemo } from 'react';
import { ChefHat, Plus, X, Search, Sparkles, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { matchRecipesByPantry, PantryMatchResult } from '../data/recipes';

interface KitchenPantryMatcherProps {
  onSelectRecipe: (slug: string) => void;
}

const COMMON_PANTRY_STAPLES = [
  'Chicken',
  'Onion',
  'Tomatoes',
  'Ginger',
  'Garlic',
  'Basmati Rice',
  'Potatoes',
  'Chickpeas',
  'Yogurt',
  'Paneer',
  'Ghee',
  'Cumin',
  'Coriander',
  'Mustard Oil',
  'Turmeric',
  'Black Pepper',
];

export const KitchenPantryMatcher: React.FC<KitchenPantryMatcherProps> = ({ onSelectRecipe }) => {
  const [pantryItems, setPantryItems] = useState<string[]>([
    'Chicken',
    'Tomatoes',
    'Ginger',
    'Garlic',
    'Ghee',
  ]);
  const [customInput, setCustomInput] = useState('');

  const handleAddCustom = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;
    if (!pantryItems.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      setPantryItems(prev => [...prev, trimmed]);
    }
    setCustomInput('');
  };

  const handleToggleStaple = (staple: string) => {
    if (pantryItems.some(i => i.toLowerCase() === staple.toLowerCase())) {
      setPantryItems(prev => prev.filter(i => i.toLowerCase() !== staple.toLowerCase()));
    } else {
      setPantryItems(prev => [...prev, staple]);
    }
  };

  const handleRemove = (item: string) => {
    setPantryItems(prev => prev.filter(i => i !== item));
  };

  const handleClear = () => {
    setPantryItems([]);
  };

  const matchResults: PantryMatchResult[] = useMemo(() => {
    return matchRecipesByPantry(pantryItems);
  }, [pantryItems]);

  return (
    <section id="kitchen-matcher" className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-emerald-500/20">
      {/* Background decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <ChefHat className="w-3.5 h-3.5" />
              Smart Pantry Engine
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              What’s In My Kitchen?
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base mt-1.5 max-w-xl">
              Tap the ingredients you have at home. We’ll calculate instant recipe matches, highlighting exact dishes you can cook right now.
            </p>
          </div>

          {pantryItems.length > 0 && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-300/80 hover:text-white transition-colors self-start md:self-auto px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Ingredients
            </button>
          )}
        </div>

        {/* Input & Tag Selection */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 mb-8">
          {/* Quick Staple Chips */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block mb-2.5">
              Quick Select Pantry Staples:
            </span>
            <div className="flex flex-wrap gap-2">
              {COMMON_PANTRY_STAPLES.map(staple => {
                const isSelected = pantryItems.some(i => i.toLowerCase() === staple.toLowerCase());
                return (
                  <button
                    key={staple}
                    onClick={() => handleToggleStaple(staple)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      isSelected
                        ? 'bg-emerald-400 text-slate-950 shadow-md font-semibold scale-105'
                        : 'bg-white/5 text-emerald-100 hover:bg-white/15 border border-white/10'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {staple}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Ingredient Entry Form */}
          <form onSubmit={handleAddCustom} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-emerald-300/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                placeholder="Type an ingredient (e.g. Mutton, Spinach, Green Chili, Cardamom)..."
                className="w-full bg-slate-900/60 border border-emerald-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </form>

          {/* Active Selected Tags */}
          {pantryItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs text-emerald-200/70 font-medium mr-1">Your Kitchen:</span>
              {pantryItems.map(item => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-200 text-xs font-medium border border-emerald-400/30"
                >
                  {item}
                  <button
                    onClick={() => handleRemove(item)}
                    className="hover:text-white transition-colors"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <h3 className="text-base sm:text-lg font-semibold text-white">
              {matchResults.length > 0
                ? `Dishes You Can Cook (${matchResults.length} matches)`
                : 'Select ingredients above to find matches'}
            </h3>
          </div>
          {matchResults.length > 0 && (
            <span className="text-xs text-emerald-200/70">
              Sorted by highest ingredient match
            </span>
          )}
        </div>

        {/* Match Cards Grid */}
        {matchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchResults.slice(0, 6).map(({ recipe, matchPercentage, matchedIngredients, missingIngredients }) => {
              const isHighMatch = matchPercentage >= 50;

              return (
                <div
                  key={recipe.id}
                  className="bg-slate-900/80 rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex flex-col justify-between group shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1"
                >
                  <div>
                    {/* Image & Match Badge */}
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute top-2.5 right-2.5">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-lg ${
                            isHighMatch
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-amber-500 text-slate-950'
                          }`}
                        >
                          {matchPercentage}% Match
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3">
                        <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                          {recipe.cuisine} • {recipe.cookTimeMinutes} mins
                        </span>
                        <h4 className="text-sm font-serif font-bold text-white truncate drop-shadow-sm">
                          {recipe.title}
                        </h4>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="p-3.5 space-y-2">
                      <div className="flex items-start gap-1.5 text-xs text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                        <span className="line-clamp-1">
                          <strong className="text-white font-medium">You have: </strong>
                          {matchedIngredients.slice(0, 3).join(', ')}
                          {matchedIngredients.length > 3 && ` +${matchedIngredients.length - 3} more`}
                        </span>
                      </div>

                      {missingIngredients.length > 0 && (
                        <div className="flex items-start gap-1.5 text-xs text-amber-200/90">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                          <span className="line-clamp-1">
                            <strong className="text-white/80 font-medium">Missing: </strong>
                            {missingIngredients.slice(0, 2).join(', ')}
                            {missingIngredients.length > 2 && ` +${missingIngredients.length - 2} more`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="p-3.5 pt-0">
                    <button
                      onClick={() => onSelectRecipe(recipe.slug)}
                      className="w-full py-2 px-3 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-200 hover:text-slate-950 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 border border-emerald-400/30"
                    >
                      Cook This Recipe
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900/60 rounded-2xl p-8 text-center border border-white/10">
            <p className="text-emerald-200/70 text-sm">
              No matching recipes found yet. Tap staples like Chicken, Tomatoes, Rice, or Onion above to see instant results!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
