import React from 'react';
import { CheckCircle2, Globe, Heart, ShieldCheck, Sparkles, Utensils } from 'lucide-react';
import { ActivePage } from '../types/content';

interface AboutViewProps {
  onNavigate: (page: ActivePage) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32] block">
          Editorial Philosophy & Integrity
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#143D2B] tracking-tight leading-[1.1]">
          About Meal Yield
        </h1>
        <p className="font-editorial italic text-xl text-[#52575C]">
          &ldquo;Explore Flavors. Cook Better. Eat Smarter.&rdquo;
        </p>
      </div>

      {/* Main Narrative Card */}
      <div className="bg-white rounded-3xl border border-[#EBE6DF] p-8 sm:p-12 shadow-sm space-y-6 font-prose text-base text-[#2E3338] leading-relaxed">
        <p className="text-lg text-[#143D2B] font-medium leading-relaxed">
          Meal Yield is an independent, international food and lifestyle publication created for home cooks, culinary enthusiasts, and health-conscious eaters across Pakistan, India, Bangladesh, the United States, the United Kingdom, Canada, Australia, Italy, and beyond.
        </p>

        <p>
          We believe that culinary excellence is not born from complicated kitchen gadgets or obscure jargon, but from understanding foundational food physics: how heat caramelizes onions, why dough hydration creates airy blistered crusts, and how the alchemy of whole toasted spices elevates everyday staples into memorable feasts.
        </p>

        <p>
          Unlike modern algorithmic web platforms flooded with automated, untested recipe summaries, every single guide on Meal Yield is crafted with professional rigor, explicit measurements, culinary context, and high-fidelity food photography.
        </p>
      </div>

      {/* 3 Core Editorial Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#F8F5EE] rounded-3xl border border-[#EBE6DF] p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#143D2B] text-white flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#E27344]" />
          </div>
          <h3 className="font-editorial text-xl font-bold text-[#143D2B]">
            Global Heritage in English
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Honoring authentic Pakistani karahis, Italian Neapolitan pizzas, Royal Mughal biryanis, and British tavern classics with complete respect for their cultural roots.
          </p>
        </div>

        <div className="bg-[#F8F5EE] rounded-3xl border border-[#EBE6DF] p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#143D2B] text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#E27344]" />
          </div>
          <h3 className="font-editorial text-xl font-bold text-[#143D2B]">
            Evidence-Based Health
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Nutritional education grounded in verified health organizations including the American Diabetes Association (ADA), American Heart Association (AHA), CDC, and WHO.
          </p>
        </div>

        <div className="bg-[#F8F5EE] rounded-3xl border border-[#EBE6DF] p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#143D2B] text-white flex items-center justify-center">
            <Utensils className="w-5 h-5 text-[#E27344]" />
          </div>
          <h3 className="font-editorial text-xl font-bold text-[#143D2B]">
            Kitchen Precision
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Interactive serving size recalculations, metric/customary toggles, step-by-step checklists, and print-optimized recipe cards that work reliably in your kitchen.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#143D2B] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="font-editorial text-3xl font-bold">
          Start Exploring World Kitchens Today
        </h2>
        <p className="text-stone-300 text-sm max-w-xl mx-auto">
          From weeknight dinner inspiration to weekend culinary projects, explore our tested recipe directory and in-depth kitchen journals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate({ name: 'recipes-directory' })}
            className="px-6 py-3 bg-[#C85A32] hover:bg-[#E27344] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow"
          >
            Browse Recipes
          </button>
          <button
            onClick={() => onNavigate({ name: 'blog' })}
            className="px-6 py-3 bg-white text-[#143D2B] hover:bg-stone-100 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow"
          >
            Read Publication Blog
          </button>
        </div>
      </div>

    </div>
  );
};
