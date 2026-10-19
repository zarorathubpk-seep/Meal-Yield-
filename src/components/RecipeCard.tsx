import React, { useState } from 'react';
import { Clock, Users, ArrowRight, Utensils } from 'lucide-react';
import { Recipe } from '../types/content';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  variant?: 'featured' | 'standard' | 'compact';
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, variant = 'standard' }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      onClick={onClick}
      className={`group cursor-pointer bg-white rounded-2xl border border-[#EBE6DF] overflow-hidden card-hover-subtle flex flex-col focus-within:ring-2 focus-within:ring-[#143D2B] ${
        variant === 'featured' ? 'md:col-span-2 md:grid md:grid-cols-2 md:items-stretch' : ''
      }`}
    >
      {/* Photograph Container with Fallback */}
      <div className={`relative overflow-hidden bg-[#F4EFE6] ${variant === 'compact' ? 'aspect-[16/10]' : 'aspect-[4/3]'} ${variant === 'featured' ? 'md:aspect-auto md:h-full' : ''}`}>
        {!imageError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F4EFE6]">
            <Utensils className="w-8 h-8 text-[#143D2B]/40 mb-2" />
            <span className="font-editorial text-sm font-semibold text-[#143D2B]">{recipe.title}</span>
          </div>
        )}

        {/* Subtle contrast gradient for photo depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280] mb-2.5">
            <span className="text-[#C85A32] font-semibold">{recipe.cuisine}</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span>{recipe.category}</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span className="font-mono tabular-nums">{recipe.difficulty}</span>
          </div>

          {/* Title */}
          <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors leading-snug">
            {recipe.title}
          </h3>

          {/* Short description (approx 20-30 words) */}
          <p className="mt-2.5 text-sm text-[#4B5563] line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Footer Meta & Action */}
        <div className="mt-5 pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-medium text-[#6B7280]">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
              <span className="tabular-nums">{recipe.cookTimeMinutes}m</span>
            </div>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#C85A32]" />
              <span className="tabular-nums">{recipe.servings} serv</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#143D2B] group-hover:text-[#C85A32] transition-colors">
            <span>View Recipe</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </article>
  );
};
