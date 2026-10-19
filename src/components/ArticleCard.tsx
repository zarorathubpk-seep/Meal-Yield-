import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Article } from '../types/content';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  variant?: 'featured' | 'standard' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, variant = 'standard' }) => {
  const [imageError, setImageError] = useState(false);

  if (variant === 'horizontal') {
    return (
      <article
        onClick={onClick}
        className="group cursor-pointer bg-white rounded-2xl border border-[#EBE6DF] overflow-hidden card-hover-subtle grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 focus-within:ring-2 focus-within:ring-[#143D2B]"
      >
        <div className="sm:col-span-4 relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F4EFE6]">
          {!imageError ? (
            <img
              src={article.image}
              alt={article.title}
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F4EFE6] text-[#143D2B]/40">
              <BookOpen className="w-6 h-6" />
            </div>
          )}
        </div>

        <div className="sm:col-span-8 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280] mb-1.5">
              <span className="text-[#C85A32] font-semibold">{article.subcategory}</span>
              <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
              <span>{article.publishedDate}</span>
            </div>

            <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>

            <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-[#6B7280] flex items-center gap-1 font-mono tabular-nums">
              <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
              {article.readTimeMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#143D2B] group-hover:text-[#C85A32] transition-colors">
              <span>Read Story</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={onClick}
      className={`group cursor-pointer bg-white rounded-2xl border border-[#EBE6DF] overflow-hidden card-hover-subtle flex flex-col focus-within:ring-2 focus-within:ring-[#143D2B] ${
        variant === 'featured' ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`relative overflow-hidden bg-[#F4EFE6] ${variant === 'featured' ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        {!imageError ? (
          <img
            src={article.image}
            alt={article.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F4EFE6]">
            <BookOpen className="w-8 h-8 text-[#143D2B]/40 mb-2" />
            <span className="font-editorial text-sm font-semibold text-[#143D2B]">{article.title}</span>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280] mb-2.5">
            <span className="text-[#C85A32] font-semibold">{article.subcategory}</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span>{article.publishedDate}</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span className="font-mono tabular-nums">{article.readTimeMinutes} min read</span>
          </div>

          <h3 className={`font-editorial font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors leading-snug ${
            variant === 'featured' ? 'text-2xl sm:text-3xl' : 'text-xl'
          }`}>
            {article.title}
          </h3>

          <p className="mt-2.5 text-sm text-[#4B5563] line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
          <span className="text-xs text-[#6B7280] font-sans">
            By <strong className="font-medium text-[#23272A]">{article.author.name}</strong>
          </span>

          <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#143D2B] group-hover:text-[#C85A32] transition-colors">
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </article>
  );
};
