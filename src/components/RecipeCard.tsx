import React, { useState } from 'react';
import { Clock, Users, ArrowRight, Utensils } from 'lucide-react';
import { Tilt3D } from './Tilt3D';
import { Recipe } from '../types/content';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  variant?: 'featured' | 'standard' | 'compact';
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, variant = 'standard' }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Tilt3D
      maxTilt={variant === 'featured' ? 5 : 8}
      scale={1.02}
      glare={true}
      className={`h-full ${variant === 'featured' ? 'md:col-span-2' : ''}`}
    >
      <article
        onClick={onClick}
        className={`group cursor-pointer bg-white rounded-3xl border border-[#EBE6DF] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col focus-within:ring-2 focus-within:ring-[#143D2B] h-full ${
          variant === 'featured' ? 'md:grid md:grid-cols-2 md:items-stretch' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Photograph Container with 3D Depth */}
        <div
          className={`relative overflow-hidden bg-[#F4EFE6] ${
            variant === 'compact' ? 'aspect-[16/10]' : 'aspect-[4/3]'
          } ${variant === 'featured' ? 'md:aspect-auto md:h-full' : ''}`}
          style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
        >
          {!imageError ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F4EFE6]">
              <Utensils className="w-8 h-8 text-[#143D2B]/40 mb-2" />
              <span className="font-editorial text-sm font-semibold text-[#143D2B]">{recipe.title}</span>
            </div>
          )}

          {/* Floating Cuisine Badge with 3D Pop */}
          <div
            className="absolute top-3 left-3 z-10 transition-transform duration-300 group-hover:scale-105"
            style={{ transform: 'translateZ(24px)' }}
          >
            <span className="px-3 py-1 bg-[#143D2B]/90 backdrop-blur-md rounded-full text-[11px] font-semibold text-white shadow-md tracking-wide">
              {recipe.cuisine}
            </span>
          </div>

          {/* Subtle 3D vignette & sheen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Content Body with 3D Lift */}
        <div
          className="p-5 sm:p-6 flex flex-col justify-between flex-1"
          style={{ transform: 'translateZ(18px)', transformStyle: 'preserve-3d' }}
        >
          <div>
            {/* Unboxed Metadata (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280] mb-2.5">
              <span className="text-[#C85A32] font-semibold">{recipe.category}</span>
              <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
              <span className="font-mono tabular-nums">{recipe.difficulty}</span>
            </div>

            {/* Title */}
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors leading-snug">
              {recipe.title}
            </h3>

            {/* Short description */}
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
    </Tilt3D>
  );
};
