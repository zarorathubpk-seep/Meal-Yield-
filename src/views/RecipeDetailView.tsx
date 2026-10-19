import React, { useState } from 'react';
import {
  Clock,
  Users,
  Printer,
  Share2,
  Bookmark,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Flame,
  ChefHat,
  Info,
} from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { PinterestModal } from '../components/PinterestModal';
import { Tilt3D } from '../components/Tilt3D';
import { RECIPES_DATA } from '../data/recipes';
import { scaleIngredient, formatIngredientAmount, convertUnit } from '../utils/recipeCalculator';
import { resolveImageUrl } from '../utils/imageHelper';
import { ActivePage, Recipe } from '../types/content';

interface RecipeDetailViewProps {
  recipe: Recipe;
  onNavigate: (page: ActivePage) => void;
}

export const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({ recipe, onNavigate }) => {
  const [servings, setServings] = useState(recipe.servings);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [pinterestOpen, setPinterestOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedRecipes = RECIPES_DATA.filter((r) => r.id !== recipe.id).slice(0, 3);

  return (
    <div className="pb-24">
      
      {/* Editorial Breadcrumbs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 no-print">
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]" aria-label="Breadcrumb">
          <button onClick={() => onNavigate({ name: 'home' })} className="hover:text-[#143D2B]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D6CEBE]" />
          <button onClick={() => onNavigate({ name: 'recipes-directory' })} className="hover:text-[#143D2B]">
            Recipes
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D6CEBE]" />
          <button
            onClick={() => onNavigate({ name: 'recipes-directory', cuisine: recipe.cuisine })}
            className="hover:text-[#143D2B] text-[#C85A32] font-medium"
          >
            {recipe.cuisine}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D6CEBE]" />
          <span className="text-[#1C1E21] font-medium truncate max-w-xs">{recipe.title}</span>
        </nav>
      </div>

      {/* Main Recipe Container */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 recipe-container">
        
        {/* Header Title & Excerpt */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-medium text-[#6B7280]">
            <span className="text-[#C85A32] font-semibold uppercase tracking-wider">{recipe.cuisine} Heritage</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span>{recipe.category}</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span>Published {recipe.publishedDate}</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143D2B] leading-[1.15]">
            {recipe.title}
          </h1>

          <p className="font-prose text-lg sm:text-xl text-[#4B5563] leading-relaxed italic">
            {recipe.subtitle}
          </p>

          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Action Toolbar (Print, Pinterest, Share) */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#EBE6DF] no-print">
          <div className="flex items-center gap-3 text-xs text-[#52575C]">
            <ChefHat className="w-4 h-4 text-[#C85A32]" />
            <span>Recipe developed by <strong>{recipe.author.name}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPinterestOpen(true)}
              className="px-3 py-1.5 bg-[#BD081C] hover:bg-[#A30718] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save Pin</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white border border-[#EBE6DF] hover:bg-[#F4EFE6] text-[#143D2B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Recipe</span>
            </button>

            <button
              onClick={handleShareLink}
              className="px-3 py-1.5 bg-white border border-[#EBE6DF] hover:bg-[#F4EFE6] text-[#143D2B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Hero Food Photography Banner with 3D Depth */}
        <Tilt3D maxTilt={5} scale={1.01} glare={true} className="rounded-3xl overflow-hidden shadow-xl">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-stone-100" style={{ transformStyle: 'preserve-3d' }}>
            <img
              src={resolveImageUrl(recipe.image)}
              alt={recipe.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Floating recipe metadata watermark */}
            <div
              className="absolute bottom-4 left-4 z-10 px-4 py-2 bg-black/60 backdrop-blur-md rounded-2xl text-white text-xs font-medium border border-white/20"
              style={{ transform: 'translateZ(25px)' }}
            >
              <span>{recipe.cuisine} Culinary Tradition · {recipe.author.name}</span>
            </div>
          </div>
        </Tilt3D>

        {/* Key Metrics Quick Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-[#EBE6DF] text-center">
          <div className="p-2">
            <span className="text-[11px] uppercase tracking-wider text-[#8A8F95] font-semibold block mb-1">Prep Time</span>
            <span className="font-editorial text-xl font-bold text-[#143D2B] tabular-nums">{recipe.prepTimeMinutes} mins</span>
          </div>
          <div className="p-2 border-l border-[#F0EBE1]">
            <span className="text-[11px] uppercase tracking-wider text-[#8A8F95] font-semibold block mb-1">Cook Time</span>
            <span className="font-editorial text-xl font-bold text-[#143D2B] tabular-nums">{recipe.cookTimeMinutes} mins</span>
          </div>
          <div className="p-2 border-l border-[#F0EBE1]">
            <span className="text-[11px] uppercase tracking-wider text-[#8A8F95] font-semibold block mb-1">Total Time</span>
            <span className="font-editorial text-xl font-bold text-[#143D2B] tabular-nums">
              {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
            </span>
          </div>
          <div className="p-2 border-l border-[#F0EBE1]">
            <span className="text-[11px] uppercase tracking-wider text-[#8A8F95] font-semibold block mb-1">Skill Level</span>
            <span className="font-editorial text-xl font-bold text-[#C85A32]">{recipe.difficulty}</span>
          </div>
        </div>

        {/* RevBid in-content ad: one placement per visible recipe page */}
        <aside className="no-print flex flex-col items-center gap-2" aria-label="Advertisement">
          <span className="text-[11px] uppercase tracking-wider text-[#8A8F95]">Advertisement</span>
          <div className="w-full overflow-x-auto text-center">
            <div
              key={recipe.id}
              data-placement-id="revbid-square"
              id="revbid-square-16249"
              style={{ minWidth: '300px', minHeight: '250px', textAlign: 'center' }}
            />
          </div>
        </aside>

        {/* 2-Column Split: Ingredients & Nutrition on Left, Steps & Tips on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Ingredients (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-white rounded-3xl border border-[#EBE6DF] p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
                <h3 className="font-editorial text-2xl font-bold text-[#143D2B]">
                  Ingredients
                </h3>

                {/* Units Toggle */}
                <div className="flex items-center bg-[#F4EFE6] p-1 rounded-lg text-xs font-medium no-print">
                  <button
                    onClick={() => setUnitSystem('metric')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      unitSystem === 'metric' ? 'bg-white text-[#143D2B] shadow-sm font-semibold' : 'text-[#6B7280]'
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnitSystem('imperial')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      unitSystem === 'imperial' ? 'bg-white text-[#143D2B] shadow-sm font-semibold' : 'text-[#6B7280]'
                    }`}
                  >
                    US Customary
                  </button>
                </div>
              </div>

              {/* Servings Scaler */}
              <div className="py-4 border-b border-[#F0EBE1] flex items-center justify-between no-print">
                <span className="text-xs text-[#52575C] font-medium">Servings yield:</span>
                <div className="flex items-center gap-2">
                  {[2, 4, 6, 8].map((s) => (
                    <button
                      key={s}
                      onClick={() => setServings(s)}
                      className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                        servings === s
                          ? 'bg-[#143D2B] text-white shadow-sm'
                          : 'bg-[#F4EFE6] text-[#52575C] hover:bg-[#EBE6DF]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Ingredients List */}
              <ul className="divide-y divide-[#F4EFE6] mt-4">
                {recipe.ingredients.map((ing, idx) => {
                  const scaledAmount = scaleIngredient(ing.amount, recipe.servings, servings);
                  const converted = convertUnit(scaledAmount, ing.unit, unitSystem);
                  const formattedAmt = formatIngredientAmount(converted.amount);
                  const isChecked = !!checkedIngredients[idx];

                  return (
                    <li
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className="py-3 flex items-start gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded text-[#143D2B] focus:ring-[#143D2B] border-[#D6CEBE] cursor-pointer"
                      />
                      <div className={`text-sm ${isChecked ? 'line-through text-[#8A8F95]' : 'text-[#1C1E21]'}`}>
                        <span className="font-semibold text-[#143D2B] mr-1.5 tabular-nums">
                          {formattedAmt} {converted.unit}
                        </span>
                        <span>{ing.name}</span>
                        {ing.notes && (
                          <span className="text-xs text-[#6B7280] italic ml-1">({ing.notes})</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-4 text-[11px] text-[#8A8F95] italic text-center no-print">
                Tip: Click any ingredient to cross it off as you prep.
              </p>
            </div>

            {/* Nutrition Information Box */}
            <div className="bg-[#FDFBF7] rounded-3xl border border-[#EBE6DF] p-6 shadow-sm">
              <h4 className="font-editorial text-lg font-bold text-[#143D2B] mb-1">
                Estimated Nutrition Facts
              </h4>
              <p className="text-[11px] text-[#8A8F95] mb-4">Per single serving portion</p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#EBE6DF]">
                  <span className="text-[#8A8F95] block mb-0.5">Calories</span>
                  <span className="font-editorial text-lg font-bold text-[#143D2B] tabular-nums">
                    {recipe.nutrition.calories} kcal
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#EBE6DF]">
                  <span className="text-[#8A8F95] block mb-0.5">Protein</span>
                  <span className="font-editorial text-lg font-bold text-[#143D2B] tabular-nums">
                    {recipe.nutrition.proteinG}g
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#EBE6DF]">
                  <span className="text-[#8A8F95] block mb-0.5">Carbohydrates</span>
                  <span className="font-editorial text-lg font-bold text-[#143D2B] tabular-nums">
                    {recipe.nutrition.carbsG}g
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#EBE6DF]">
                  <span className="text-[#8A8F95] block mb-0.5">Total Fat</span>
                  <span className="font-editorial text-lg font-bold text-[#143D2B] tabular-nums">
                    {recipe.nutrition.fatG}g
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Step-by-Step Instructions & Chef Secrets (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Steps */}
            <div className="bg-white rounded-3xl border border-[#EBE6DF] p-6 sm:p-8 shadow-sm">
              <h3 className="font-editorial text-2xl font-bold text-[#143D2B] mb-6">
                Step-by-Step Method
              </h3>

              <div className="space-y-6">
                {recipe.instructions.map((step, idx) => {
                  const isDone = !!checkedSteps[idx];

                  return (
                    <div
                      key={step.stepNumber}
                      onClick={() => toggleStep(idx)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isDone
                          ? 'bg-[#F8F5EE] border-[#EBE6DF] opacity-75'
                          : 'bg-white border-[#EBE6DF] hover:border-[#143D2B]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isDone ? 'bg-[#143D2B] text-white' : 'bg-[#F4EFE6] text-[#143D2B]'
                          }`}>
                            {step.stepNumber}
                          </span>
                          <h4 className="font-editorial text-lg font-bold text-[#143D2B]">
                            {step.title}
                          </h4>
                        </div>
                        {isDone && <CheckCircle className="w-5 h-5 text-[#143D2B]" />}
                      </div>

                      <p className="font-prose text-sm text-[#4B5563] leading-relaxed mt-2 pl-9">
                        {step.instruction}
                      </p>

                      {step.tip && (
                        <div className="mt-3 ml-9 p-3 bg-[#FDFBF7] rounded-xl border border-[#EBE6DF] text-xs text-[#52575C] flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                          <span><strong>Chef Insight:</strong> {step.tip}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chef's Secrets & Heritage Tips */}
            <div className="bg-[#F8F5EE] rounded-3xl border border-[#EBE6DF] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C85A32] mb-2">
                <ChefHat className="w-4 h-4" />
                <span>Culinary Discipline</span>
              </div>
              <h4 className="font-editorial text-2xl font-bold text-[#143D2B] mb-4">
                Chef’s Essential Rules
              </h4>
              <ul className="space-y-3 text-sm text-[#4B5563]">
                {recipe.chefTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#C85A32] font-bold">·</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Storage & Reheating */}
            <div className="p-6 bg-white rounded-3xl border border-[#EBE6DF] flex items-start gap-3">
              <Info className="w-5 h-5 text-[#143D2B] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-editorial text-base font-bold text-[#143D2B]">
                  Storage & Leftover Reheating
                </h5>
                <p className="mt-1 text-xs text-[#52575C] leading-relaxed">
                  {recipe.storageNotes}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Related Recipes Carousel/Grid */}
        <div className="pt-12 border-t border-[#EBE6DF] no-print">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-editorial text-2xl font-bold text-[#143D2B]">
              More Handcrafted Recipes
            </h3>
            <button
              onClick={() => onNavigate({ name: 'recipes-directory' })}
              className="text-xs font-semibold text-[#143D2B] hover:text-[#C85A32]"
            >
              View All Recipes →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedRecipes.map((rel) => (
              <RecipeCard
                key={rel.id}
                recipe={rel}
                onClick={() => onNavigate({ name: 'recipe', slug: rel.slug })}
              />
            ))}
          </div>
        </div>

      </article>

      {/* Pinterest Share Preview Modal */}
      <PinterestModal
        isOpen={pinterestOpen}
        onClose={() => setPinterestOpen(false)}
        metadata={recipe.pinterest}
        title={recipe.title}
        url={`/recipe/${recipe.slug}`}
      />

    </div>
  );
};
