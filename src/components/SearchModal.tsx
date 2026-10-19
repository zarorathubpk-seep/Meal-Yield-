import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Utensils, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { RECIPES_DATA } from '../data/recipes';
import { ARTICLES_DATA } from '../data/articles';
import { filterContent } from '../utils/recipeCalculator';
import { ActivePage } from '../types/content';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'all' | 'recipes' | 'articles'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global keyboard shortcut Cmd+K or Ctrl+K to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedRecipes = filterContent(RECIPES_DATA, query);
  const matchedArticles = filterContent(ARTICLES_DATA, query);

  const handleSelectRecipe = (slug: string) => {
    onClose();
    onNavigate({ name: 'recipe', slug });
  };

  const handleSelectArticle = (slug: string) => {
    onClose();
    onNavigate({ name: 'article', slug });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#EBE6DF] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EBE6DF] flex items-center gap-3">
          <Search className="w-6 h-6 text-[#143D2B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes, ingredients, cuisines, techniques or nutrition guides..."
            className="w-full text-base sm:text-lg text-[#1C1E21] placeholder-[#8A8F95] focus:outline-none bg-transparent font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8A8F95] hover:text-[#1C1E21] rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-xs font-semibold text-[#8A8F95] hover:text-[#1C1E21] bg-[#F4EFE6] rounded-lg ml-2 shrink-0"
          >
            Esc
          </button>
        </div>

        {/* Tab Filters */}
        <div className="px-6 py-2.5 bg-[#FDFBF7] border-b border-[#EBE6DF] flex items-center gap-2 text-xs font-medium">
          <button
            onClick={() => setTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              tab === 'all'
                ? 'bg-[#143D2B] text-white'
                : 'text-[#6B7280] hover:text-[#1C1E21] hover:bg-[#EBE6DF]'
            }`}
          >
            All Results ({matchedRecipes.length + matchedArticles.length})
          </button>
          <button
            onClick={() => setTab('recipes')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              tab === 'recipes'
                ? 'bg-[#143D2B] text-white'
                : 'text-[#6B7280] hover:text-[#1C1E21] hover:bg-[#EBE6DF]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Recipes ({matchedRecipes.length})</span>
          </button>
          <button
            onClick={() => setTab('articles')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              tab === 'articles'
                ? 'bg-[#143D2B] text-white'
                : 'text-[#6B7280] hover:text-[#1C1E21] hover:bg-[#EBE6DF]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles ({matchedArticles.length})</span>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#F0EBE1]">
          {/* Recipes Section */}
          {(tab === 'all' || tab === 'recipes') && matchedRecipes.length > 0 && (
            <div className="pb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A8F95] block mb-3">
                Matching Recipes
              </span>
              <div className="space-y-2">
                {matchedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleSelectRecipe(recipe.slug)}
                    className="p-3 rounded-xl hover:bg-[#F8F5EE] cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={recipe.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                      />
                      <div>
                        <h4 className="font-editorial text-base font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors">
                          {recipe.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] mt-0.5">
                          <span className="text-[#C85A32] font-semibold">{recipe.cuisine}</span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {recipe.cookTimeMinutes} mins
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A8F95] group-hover:text-[#143D2B] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {(tab === 'all' || tab === 'articles') && matchedArticles.length > 0 && (
            <div className="pt-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A8F95] block mb-3">
                Matching Articles & Guides
              </span>
              <div className="space-y-2">
                {matchedArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleSelectArticle(article.slug)}
                    className="p-3 rounded-xl hover:bg-[#F8F5EE] cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={article.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                      />
                      <div>
                        <h4 className="font-editorial text-base font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] mt-0.5">
                          <span className="text-[#C85A32] font-semibold">{article.subcategory}</span>
                          <span aria-hidden="true">·</span>
                          <span>{article.readTimeMinutes} min read</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A8F95] group-hover:text-[#143D2B] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {matchedRecipes.length === 0 && matchedArticles.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-[#4B5563]">
                No matching recipes or articles found for &ldquo;<span className="font-medium text-[#1C1E21]">{query}</span>&rdquo;
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
                <span className="text-[#8A8F95]">Try searching:</span>
                <button
                  onClick={() => setQuery('Karahi')}
                  className="px-2.5 py-1 bg-[#F4EFE6] text-[#143D2B] rounded-md hover:bg-[#EBE6DF]"
                >
                  Karahi
                </button>
                <button
                  onClick={() => setQuery('Biryani')}
                  className="px-2.5 py-1 bg-[#F4EFE6] text-[#143D2B] rounded-md hover:bg-[#EBE6DF]"
                >
                  Biryani
                </button>
                <button
                  onClick={() => setQuery('Pizza')}
                  className="px-2.5 py-1 bg-[#F4EFE6] text-[#143D2B] rounded-md hover:bg-[#EBE6DF]"
                >
                  Pizza
                </button>
                <button
                  onClick={() => setQuery('Blood Sugar')}
                  className="px-2.5 py-1 bg-[#F4EFE6] text-[#143D2B] rounded-md hover:bg-[#EBE6DF]"
                >
                  Blood Sugar
                </button>
                <button
                  onClick={() => setQuery('Sodium')}
                  className="px-2.5 py-1 bg-[#F4EFE6] text-[#143D2B] rounded-md hover:bg-[#EBE6DF]"
                >
                  Sodium
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
