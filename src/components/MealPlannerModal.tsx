import React, { useState, useEffect, useMemo } from 'react';
import { X, Calendar, ShoppingCart, Plus, Trash2, Check, Copy, CheckCheck, Sparkles, ChefHat } from 'lucide-react';
import { RECIPES_DATA, getRecipeBySlug } from '../data/recipes';
import { Recipe } from '../types/content';

interface MealPlannerModalProps {
  onClose: () => void;
  onSelectRecipe: (slug: string) => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

interface DayPlan {
  lunchSlug?: string;
  dinnerSlug?: string;
}

const STORAGE_KEY_PLAN = 'mealyield_meal_planner_v1';
const STORAGE_KEY_CHECKED = 'mealyield_shopping_checked_v1';

export const MealPlannerModal: React.FC<MealPlannerModalProps> = ({ onClose, onSelectRecipe }) => {
  const [activeTab, setActiveTab] = useState<'planner' | 'shopping'>('planner');
  const [weekPlan, setWeekPlan] = useState<Record<string, DayPlan>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLAN);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    // Default starter plan
    return {
      Monday: { dinnerSlug: 'pakistani-chicken-karahi' },
      Tuesday: { dinnerSlug: 'indian-dal-makhani' },
      Wednesday: { dinnerSlug: 'bangladeshi-bhuna-khichuri' },
      Thursday: { dinnerSlug: 'indian-paneer-butter-masala' },
      Friday: { dinnerSlug: 'traditional-chicken-biryani' },
      Saturday: { dinnerSlug: 'pakistani-beef-nihari' },
      Sunday: { dinnerSlug: 'indian-butter-chicken' },
    };
  });

  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHECKED);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return {};
  });

  const [copied, setCopied] = useState(false);
  const [editingSlot, setEditingSlot] = useState<{ day: string; slot: 'lunch' | 'dinner' } | null>(null);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(weekPlan));
    } catch (e) {
      console.warn('Failed saving meal plan');
    }
  }, [weekPlan]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify(checkedIngredients));
    } catch (e) {
      console.warn('Failed saving checked items');
    }
  }, [checkedIngredients]);

  const handleAssignRecipe = (slug: string) => {
    if (!editingSlot) return;
    const { day, slot } = editingSlot;
    setWeekPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot === 'lunch' ? 'lunchSlug' : 'dinnerSlug']: slug,
      },
    }));
    setEditingSlot(null);
  };

  const handleRemoveRecipe = (day: string, slot: 'lunch' | 'dinner') => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot === 'lunch' ? 'lunchSlug' : 'dinnerSlug']: undefined,
      },
    }));
  };

  const toggleChecked = (name: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Generate Consolidated Shopping List
  const consolidatedList = useMemo(() => {
    const ingredientMap: Record<string, { totalAmount: number; unit: string; recipes: string[] }> = {};

    DAYS_OF_WEEK.forEach(day => {
      const dayData = weekPlan[day];
      if (!dayData) return;

      [dayData.lunchSlug, dayData.dinnerSlug].forEach(slug => {
        if (!slug) return;
        const recipe = getRecipeBySlug(slug);
        if (!recipe) return;

        recipe.ingredients.forEach(ing => {
          const key = ing.name.toLowerCase().trim();
          if (!ingredientMap[key]) {
            ingredientMap[key] = {
              totalAmount: ing.amount,
              unit: ing.unit,
              recipes: [recipe.title],
            };
          } else {
            ingredientMap[key].totalAmount += ing.amount;
            if (!ingredientMap[key].recipes.includes(recipe.title)) {
              ingredientMap[key].recipes.push(recipe.title);
            }
          }
        });
      });
    });

    return Object.entries(ingredientMap).map(([name, data]) => ({
      name,
      ...data,
    }));
  }, [weekPlan]);

  const handleCopyList = () => {
    const text = consolidatedList
      .map(item => `• ${item.name} (${item.totalAmount} ${item.unit}) - for ${item.recipes.join(', ')}`)
      .join('\n');
    navigator.clipboard.writeText(`Meal Yield Weekly Grocery List:\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 text-white animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Weekly Meal Planner & Grocery List
              </h2>
              <p className="text-xs text-stone-400">
                Plan your family dinners, avoid food waste & generate a combined grocery checklist.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-800 px-6 bg-stone-900">
          <button
            onClick={() => setActiveTab('planner')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'planner'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Weekly Schedule
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'shopping'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Consolidated Grocery List ({consolidatedList.length} items)
          </button>
        </div>

        {/* Tab 1: Planner Schedule */}
        {activeTab === 'planner' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            {DAYS_OF_WEEK.map(day => {
              const lunchRecipe = weekPlan[day]?.lunchSlug ? getRecipeBySlug(weekPlan[day].lunchSlug!) : null;
              const dinnerRecipe = weekPlan[day]?.dinnerSlug ? getRecipeBySlug(weekPlan[day].dinnerSlug!) : null;

              return (
                <div
                  key={day}
                  className="bg-stone-800/60 rounded-2xl p-3.5 sm:p-4 border border-stone-700/60 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="w-28 font-serif font-bold text-emerald-300 text-sm">
                    {day}
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Lunch Slot */}
                    <div className="flex items-center justify-between bg-stone-900/80 rounded-xl p-2.5 border border-stone-700/50">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[10px] uppercase font-bold text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">
                          Lunch
                        </span>
                        {lunchRecipe ? (
                          <span
                            onClick={() => {
                              onSelectRecipe(lunchRecipe.slug);
                              onClose();
                            }}
                            className="text-xs font-medium text-white hover:text-emerald-300 cursor-pointer truncate"
                          >
                            {lunchRecipe.title}
                          </span>
                        ) : (
                          <span className="text-xs text-stone-500 italic">No meal set</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {lunchRecipe ? (
                          <button
                            onClick={() => handleRemoveRecipe(day, 'lunch')}
                            className="text-stone-400 hover:text-red-400 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingSlot({ day, slot: 'lunch' })}
                            className="text-xs text-emerald-400 hover:text-emerald-300 px-2 py-1 bg-emerald-500/10 rounded-lg flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Add
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Dinner Slot */}
                    <div className="flex items-center justify-between bg-stone-900/80 rounded-xl p-2.5 border border-stone-700/50">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          Dinner
                        </span>
                        {dinnerRecipe ? (
                          <span
                            onClick={() => {
                              onSelectRecipe(dinnerRecipe.slug);
                              onClose();
                            }}
                            className="text-xs font-medium text-white hover:text-amber-300 cursor-pointer truncate"
                          >
                            {dinnerRecipe.title}
                          </span>
                        ) : (
                          <span className="text-xs text-stone-500 italic">No meal set</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {dinnerRecipe ? (
                          <button
                            onClick={() => handleRemoveRecipe(day, 'dinner')}
                            className="text-stone-400 hover:text-red-400 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingSlot({ day, slot: 'dinner' })}
                            className="text-xs text-amber-400 hover:text-amber-300 px-2 py-1 bg-amber-500/10 rounded-lg flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Shopping List */}
        {activeTab === 'shopping' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-stone-400">
                Combined quantities needed across all {DAYS_OF_WEEK.length} days:
              </span>
              <button
                onClick={handleCopyList}
                className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Grocery List'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {consolidatedList.map(item => {
                const isChecked = checkedIngredients[item.name];
                return (
                  <div
                    key={item.name}
                    onClick={() => toggleChecked(item.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-stone-900/40 border-stone-800 text-stone-500 line-through'
                        : 'bg-stone-800/80 border-stone-700 text-stone-100 hover:border-emerald-400/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-stone-500'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-medium capitalize truncate">{item.name}</span>
                    </div>

                    <span className="text-[11px] font-mono text-emerald-300 font-semibold shrink-0 ml-2">
                      {item.totalAmount > 0 ? `${item.totalAmount} ${item.unit}` : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal: Pick Recipe for Day Slot */}
        {editingSlot && (
          <div className="absolute inset-0 bg-slate-950/95 p-6 flex flex-col z-20">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
              <h3 className="font-serif font-bold text-lg text-white">
                Select Recipe for {editingSlot.day} ({editingSlot.slot})
              </h3>
              <button
                onClick={() => setEditingSlot(null)}
                className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {RECIPES_DATA.map(r => (
                <div
                  key={r.id}
                  onClick={() => handleAssignRecipe(r.slug)}
                  className="bg-stone-800 hover:bg-stone-700 p-3 rounded-xl cursor-pointer border border-stone-700 hover:border-emerald-400 transition-all flex items-center gap-3"
                >
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-emerald-400 uppercase font-semibold">
                      {r.cuisine}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">{r.title}</h4>
                    <span className="text-[10px] text-stone-400">{r.cookTimeMinutes} mins</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
