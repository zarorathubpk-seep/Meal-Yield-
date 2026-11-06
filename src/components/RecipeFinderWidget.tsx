import React, { useState, useMemo } from 'react';
import { Sparkles, Dices, Clock, Flame, Utensils, Compass, ArrowRight } from 'lucide-react';
import { RECIPES_DATA } from '../data/recipes';
import { Recipe } from '../types/content';

interface RecipeFinderWidgetProps {
  onSelectRecipe: (slug: string) => void;
}

export const RecipeFinderWidget: React.FC<RecipeFinderWidgetProps> = ({ onSelectRecipe }) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [selectedTime, setSelectedTime] = useState<string>('All');
  const [selectedDiet, setSelectedDiet] = useState<string>('All');
  const [selectedSpice, setSelectedSpice] = useState<string>('All');
  const [surpriseRecipe, setSurpriseRecipe] = useState<Recipe | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const filteredRecipes = useMemo(() => {
    return RECIPES_DATA.filter(recipe => {
      // Cuisine filter
      if (selectedCuisine !== 'All' && recipe.cuisine !== selectedCuisine) return false;

      // Time filter
      if (selectedTime === 'Under 30 mins' && recipe.cookTimeMinutes > 30) return false;
      if (selectedTime === '30-45 mins' && (recipe.cookTimeMinutes < 30 || recipe.cookTimeMinutes > 45)) return false;
      if (selectedTime === '45+ mins (Slow Braise)' && recipe.cookTimeMinutes < 45) return false;

      // Diet filter
      if (selectedDiet === 'Vegetarian' && !recipe.isVegetarian) return false;
      if (selectedDiet === 'Meat / Poultry' && recipe.isVegetarian) return false;

      // Spice filter
      if (selectedSpice !== 'All' && recipe.spiceLevel !== selectedSpice) return false;

      return true;
    });
  }, [selectedCuisine, selectedTime, selectedDiet, selectedSpice]);

  const handleSurpriseMe = () => {
    setIsSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * RECIPES_DATA.length);
      setSurpriseRecipe(RECIPES_DATA[randomIdx]);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 90);
  };

  return (
    <section id="recipe-finder" className="bg-gradient-to-br from-amber-950/40 via-stone-900 to-amber-950/20 rounded-3xl p-6 sm:p-10 border border-amber-500/20 shadow-xl relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              Meal Decision Assistant
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              What Should I Cook Today?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-1.5 max-w-xl">
              Can’t decide what to make? Filter by cravings, spice, or cooking time — or let our little chef roll the culinary dice for you!
            </p>
          </div>

          <button
            onClick={handleSurpriseMe}
            disabled={isSpinning}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all self-start md:self-auto"
          >
            <Dices className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Rolling the Spices...' : 'Surprise Me! 🎲'}
          </button>
        </div>

        {/* Surprise Highlight Box if active */}
        {surpriseRecipe && (
          <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-2xl p-4 sm:p-6 border border-amber-400/40 mb-8 flex flex-col sm:flex-row items-center gap-6 animate-fadeIn">
            <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 shadow-lg">
              <img
                src={surpriseRecipe.image}
                alt={surpriseRecipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Chef’s Lucky Pick of the Day
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                {surpriseRecipe.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 mb-3">
                {surpriseRecipe.subtitle}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-amber-200">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {surpriseRecipe.cookTimeMinutes} mins
                </span>
                <span>•</span>
                <span>{surpriseRecipe.cuisine}</span>
                <span>•</span>
                <span>{surpriseRecipe.difficulty}</span>
              </div>
            </div>
            <button
              onClick={() => onSelectRecipe(surpriseRecipe.slug)}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              Start Cooking
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="bg-stone-900/90 rounded-2xl p-4 sm:p-6 border border-stone-800 space-y-4 mb-8">
          {/* Cuisine Tabs */}
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
              Select Cuisine:
            </span>
            <div className="flex flex-wrap gap-2">
              {['All', 'Pakistani', 'Indian', 'Bangladeshi', 'Sri Lankan', 'Italian', 'British', 'American'].map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCuisine(c)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                    selectedCuisine === c
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Time & Diet & Spice Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-800">
            {/* Time */}
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Time Available:
              </span>
              <select
                value={selectedTime}
                onChange={e => setSelectedTime(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 text-stone-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                <option>All</option>
                <option>Under 30 mins</option>
                <option>30-45 mins</option>
                <option>45+ mins (Slow Braise)</option>
              </select>
            </div>

            {/* Diet */}
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                Diet Preference:
              </span>
              <select
                value={selectedDiet}
                onChange={e => setSelectedDiet(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 text-stone-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                <option>All</option>
                <option>Vegetarian</option>
                <option>Meat / Poultry</option>
              </select>
            </div>

            {/* Spice */}
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                Spice Level:
              </span>
              <select
                value={selectedSpice}
                onChange={e => setSelectedSpice(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 text-stone-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                <option>All</option>
                <option>Mild</option>
                <option>Medium</option>
                <option>Hot</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filtered Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredRecipes.slice(0, 8).map(recipe => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe.slug)}
              className="group cursor-pointer bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 backdrop-blur-sm border border-amber-400/20">
                      {recipe.cuisine}
                    </span>
                  </div>
                  {recipe.isVegetarian && (
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 backdrop-blur-sm border border-emerald-400/20">
                        Veg
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-serif font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {recipe.title}
                  </h4>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                    {recipe.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-3 pt-0 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/60 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {recipe.cookTimeMinutes}m
                </span>
                <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-0.5">
                  View <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-10 bg-stone-900/50 rounded-2xl border border-stone-800">
            <p className="text-stone-400 text-sm">
              No dishes match these exact criteria. Try setting Spice or Time to "All" to reveal more options!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
