import React, { useState } from 'react';
import { Mail, Check, Compass, Heart } from 'lucide-react';
import { ActivePage } from '../types/content';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#143D2B] text-[#FDFBF7] pt-16 pb-12 border-t border-[#0D281C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Editorial Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-emerald-900/60">
          
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FDFBF7] text-[#143D2B] flex items-center justify-center font-bold text-lg shadow-sm">
                <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
                  <path d="M8 21 C8 13 24 13 24 21 Z" />
                  <rect x="7" y="21" width="18" height="2" rx="1" />
                  <circle cx="16" cy="12" r="2" fill="#C85A32" />
                  <path d="M16 12 C16 7 20 4 21 3 C20 7 18 9 16 12 Z" fill="#C85A32" />
                </svg>
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#FDFBF7]">
                Meal Yield
              </span>
            </div>

            <p className="font-editorial italic text-stone-300 text-sm mt-3">
              &ldquo;Explore Flavors. Cook Better. Eat Smarter.&rdquo;
            </p>

            <p className="mt-4 text-xs text-stone-300 leading-relaxed max-w-sm font-sans">
              A premium international food and lifestyle publication dedicated to authentic recipes, culinary technique, culinary history, and evidence-based nutrition education.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#E27344] block mb-2">
                The Weekend Yield Newsletter
              </span>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs bg-emerald-950/80 border border-emerald-800 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:border-[#E27344]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-[#C85A32] hover:bg-[#E27344] text-white rounded-lg transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/90 p-2.5 rounded-lg border border-emerald-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Thank you for subscribing to Meal Yield! Check your inbox soon.</span>
                </div>
              )}
            </div>
          </div>

          {/* Cuisines Column (Col 5-7) */}
          <div className="lg:col-span-3">
            <h4 className="font-editorial text-base font-bold text-white mb-4">
              Explore Global Cuisines
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Pakistani' })}
                  className="hover:text-white transition-colors"
                >
                  Pakistani Recipes & Karahis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Italian' })}
                  className="hover:text-white transition-colors"
                >
                  Italian Pizza & Handmade Pasta
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Indian' })}
                  className="hover:text-white transition-colors"
                >
                  Indian Curries, Biryanis & Daals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'American' })}
                  className="hover:text-white transition-colors"
                >
                  American Burgers & Regional Comfort
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'British' })}
                  className="hover:text-white transition-colors"
                >
                  Traditional British Fish & Chips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'recipes-directory', cuisine: 'Bangladeshi' })}
                  className="hover:text-white transition-colors"
                >
                  Bangladeshi Kacchi & Bhuna
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial Sections (Col 8-10) */}
          <div className="lg:col-span-3">
            <h4 className="font-editorial text-base font-bold text-white mb-4">
              Publication Sections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'blog', category: 'Desi Food' })}
                  className="hover:text-white transition-colors"
                >
                  Desi Food & Traditional Recipes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'blog', category: 'Western Food' })}
                  className="hover:text-white transition-colors"
                >
                  Western & International Classics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'blog', category: 'Cooking Tips' })}
                  className="hover:text-white transition-colors"
                >
                  Cooking Tips & Kitchen Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'blog', category: 'Healthy Eating & Nutrition' })}
                  className="hover:text-white transition-colors"
                >
                  Healthy Eating & Nutrition
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'videos' })}
                  className="hover:text-white transition-colors"
                >
                  Cooking Videos & Masterclasses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'recipes-directory' })}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#E27344]" />
                  <span>Full Recipe Directory</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & About (Col 11-12) */}
          <div className="lg:col-span-2">
            <h4 className="font-editorial text-base font-bold text-white mb-4">
              About & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigate({ name: 'about' })} className="hover:text-white transition-colors">
                  About Meal Yield
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ name: 'contact' })} className="hover:text-white transition-colors">
                  Contact Us & Feedback
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ name: 'legal', section: 'editorial' })} className="hover:text-white transition-colors">
                  Editorial Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ name: 'legal', section: 'medical' })} className="hover:text-white transition-colors">
                  Medical Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ name: 'legal', section: 'privacy' })} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ name: 'legal', section: 'terms' })} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip: Pinterest & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Meal Yield International Food Magazine.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#E27344] fill-current" />
            <span>for culinary lovers worldwide.</span>
            <span aria-hidden="true" className="text-emerald-800">|</span>
            <span className="text-stone-300">Pinterest Traffic Optimized</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
