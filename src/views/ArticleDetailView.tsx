import React, { useState } from 'react';
import {
  Clock,
  Bookmark,
  Share2,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  BookOpen,
  Quote,
} from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { RecipeCard } from '../components/RecipeCard';
import { PinterestModal } from '../components/PinterestModal';
import { Tilt3D } from '../components/Tilt3D';
import { ARTICLES_DATA } from '../data/articles';
import { RECIPES_DATA } from '../data/recipes';
import { ActivePage, Article } from '../types/content';

interface ArticleDetailViewProps {
  article: Article;
  onNavigate: (page: ActivePage) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ article, onNavigate }) => {
  const [pinterestOpen, setPinterestOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== article.id).slice(0, 3);
  const linkedRecipe = article.linkedRecipeSlug
    ? RECIPES_DATA.find((r) => r.slug === article.linkedRecipeSlug)
    : null;

  return (
    <div className="pb-24">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]" aria-label="Breadcrumb">
          <button onClick={() => onNavigate({ name: 'home' })} className="hover:text-[#143D2B]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D6CEBE]" />
          <button onClick={() => onNavigate({ name: 'blog' })} className="hover:text-[#143D2B]">
            Blog
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D6CEBE]" />
          <button
            onClick={() => onNavigate({ name: 'blog', category: article.category })}
            className="hover:text-[#143D2B] text-[#C85A32] font-medium"
          >
            {article.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D6CEBE]" />
          <span className="text-[#1C1E21] font-medium truncate max-w-xs">{article.title}</span>
        </nav>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-medium text-[#6B7280]">
            <span className="text-[#C85A32] font-semibold uppercase tracking-wider">{article.subcategory}</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span>{article.publishedDate}</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
              {article.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143D2B] leading-[1.12]">
            {article.title}
          </h1>

          <p className="font-editorial italic text-lg sm:text-xl text-[#52575C] leading-relaxed">
            {article.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#EBE6DF]">
            <div className="text-xs text-[#52575C]">
              Written by <strong className="text-[#1C1E21] font-medium">{article.author.name}</strong> · {article.author.role}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPinterestOpen(true)}
                className="px-3 py-1.5 bg-[#BD081C] hover:bg-[#A30718] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save to Pinterest</span>
              </button>

              <button
                onClick={handleShareLink}
                className="px-3 py-1.5 bg-white border border-[#EBE6DF] hover:bg-[#F4EFE6] text-[#143D2B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Photographic Banner with 3D Depth */}
        <Tilt3D maxTilt={5} scale={1.01} glare={true} className="rounded-3xl overflow-hidden shadow-xl">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-stone-100" style={{ transformStyle: 'preserve-3d' }}>
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Floating article category pill */}
            <div
              className="absolute bottom-4 left-4 z-10 px-4 py-2 bg-black/60 backdrop-blur-md rounded-2xl text-white text-xs font-medium border border-white/20"
              style={{ transform: 'translateZ(25px)' }}
            >
              <span>{article.category} · {article.subcategory}</span>
            </div>
          </div>
        </Tilt3D>

        {/* Medical Disclaimer Banner if relevant */}
        {article.medicalDisclaimer && (
          <div className="p-5 bg-[#F8F5EE] rounded-2xl border border-[#DDD5C7] text-xs text-[#52575C] flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#143D2B] block mb-1">Medical & Nutritional Disclaimer:</strong>
              <p className="leading-relaxed">
                This article is published strictly for dietary education and culinary science literacy. It does not replace individualized clinical counseling or medical therapy. Nutritional recommendations reflect peer-reviewed health guidelines, but dietary decisions should always be coordinated with your healthcare physician.
              </p>
            </div>
          </div>
        )}

        {/* Lead Excerpt */}
        <div className="p-6 bg-white rounded-2xl border border-[#EBE6DF] shadow-sm">
          <p className="font-prose text-base sm:text-lg text-[#1C1E21] leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Main Body Sections */}
        <div className="space-y-10 font-prose text-base text-[#2E3338] leading-relaxed max-w-none">
          {article.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#143D2B] pt-4 border-t border-[#F0EBE1]">
                {sec.heading}
              </h2>

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}

              {sec.callout && (
                <div className="my-6 p-6 bg-[#FDFBF7] rounded-2xl border border-[#EBE6DF] relative">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-2 font-sans">
                    <Quote className="w-4 h-4" />
                    <span>{sec.callout.source || 'Editorial Insight'}</span>
                  </div>
                  <p className="font-editorial italic text-lg text-[#143D2B] leading-relaxed">
                    &ldquo;{sec.callout.text}&rdquo;
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Credible Health Citations (ADA, AHA, CDC, WHO) */}
        {article.citations && article.citations.length > 0 && (
          <div className="mt-12 p-6 bg-white rounded-3xl border border-[#EBE6DF] shadow-sm">
            <h4 className="font-editorial text-lg font-bold text-[#143D2B] mb-3">
              Credible References & Scientific Guidelines
            </h4>
            <ul className="space-y-2 text-xs text-[#52575C] font-sans">
              {article.citations.map((cite, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2">
                  <span className="text-[#C85A32] font-bold">[{cIdx + 1}]</span>
                  <span>
                    <strong className="text-[#1C1E21]">{cite.organization}:</strong> {cite.guideline}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Linked Recipe Feature (if applicable) */}
        {linkedRecipe && (
          <div className="mt-12 p-6 sm:p-8 bg-[#F8F5EE] rounded-3xl border border-[#EBE6DF]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C85A32] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Dedicated Tested Recipe</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#143D2B]">
              Ready to Cook {linkedRecipe.title}?
            </h3>
            <p className="mt-2 text-sm text-[#4B5563] max-w-2xl leading-relaxed">
              Step into the kitchen with our complete tested measurements, interactive ingredient checklist, cooking tips, and printable recipe card.
            </p>
            <div className="mt-6">
              <RecipeCard
                recipe={linkedRecipe}
                onClick={() => onNavigate({ name: 'recipe', slug: linkedRecipe.slug })}
                variant="featured"
              />
            </div>
          </div>
        )}

        {/* Related Stories */}
        <div className="pt-12 border-t border-[#EBE6DF]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-editorial text-2xl font-bold text-[#143D2B]">
              Related Stories & Guides
            </h3>
            <button
              onClick={() => onNavigate({ name: 'blog' })}
              className="text-xs font-semibold text-[#143D2B] hover:text-[#C85A32]"
            >
              Browse All Journal Articles →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <ArticleCard
                key={rel.id}
                article={rel}
                onClick={() => onNavigate({ name: 'article', slug: rel.slug })}
              />
            ))}
          </div>
        </div>

      </article>

      {/* Pinterest Share Preview Modal */}
      <PinterestModal
        isOpen={pinterestOpen}
        onClose={() => setPinterestOpen(false)}
        metadata={article.pinterest}
        title={article.title}
        url={`/blog/${article.category.toLowerCase().replace(/\s+/g, '-')}/${article.slug}`}
      />

    </div>
  );
};
