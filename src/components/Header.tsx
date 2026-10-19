import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Menu, X, Compass } from 'lucide-react';
import { ActivePage } from '../types/content';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate, onOpenSearch }) => {
  const [cuisinesOpen, setCuisinesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCuisinesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cuisinesList = [
    { label: 'Pakistani', cuisine: 'Pakistani' },
    { label: 'Indian', cuisine: 'Indian' },
    { label: 'Bangladeshi', cuisine: 'Bangladeshi' },
    { label: 'American', cuisine: 'American' },
    { label: 'British', cuisine: 'British' },
    { label: 'Italian', cuisine: 'Italian' },
    { label: 'Other International', cuisine: 'International' },
  ];

  const handleCuisineClick = (cuisine: string) => {
    setCuisinesOpen(false);
    setMobileMenuOpen(false);
    onNavigate({ name: 'recipes-directory', cuisine });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EBE6DF]">
      {/* Editorial Top Utility Strip */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-xs text-[#52575C] border-b border-[#F0EBE1] font-sans">
        <div className="flex items-center gap-4">
          <span className="tracking-wide">Global Flavors · Authentic Cooking · Nutritional Insight</span>
          <span aria-hidden="true" className="text-[#D6CEBE]">|</span>
          <span>Publication Edition: Autumn 2026</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate({ name: 'about' })}
            className="hover:text-[#143D2B] transition-colors"
          >
            About Meal Yield
          </button>
          <button 
            onClick={() => onNavigate({ name: 'contact' })}
            className="hover:text-[#143D2B] transition-colors"
          >
            Contact & Community
          </button>
        </div>
      </div>

      {/* Primary Top Bar (Three-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            onNavigate({ name: 'home' });
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 group text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
          aria-label="Meal Yield - Home"
        >
          <div className="w-10 h-10 rounded-full bg-[#143D2B] flex items-center justify-center text-[#FDFBF7] shadow-sm transition-transform group-hover:scale-105">
            <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
              <path d="M8 21 C8 13 24 13 24 21 Z" />
              <rect x="7" y="21" width="18" height="2" rx="1" />
              <circle cx="16" cy="12" r="2" fill="#E27344" />
              <path d="M16 12 C16 7 20 4 21 3 C20 7 18 9 16 12 Z" fill="#E27344" />
            </svg>
          </div>
          <div>
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#143D2B] leading-none block">
              Meal Yield
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#C85A32] font-semibold block mt-0.5">
              Food & Lifestyle
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-[#23272A]" aria-label="Main Navigation">
          <button
            onClick={() => onNavigate({ name: 'home' })}
            className={`whitespace-nowrap transition-colors py-1 ${
              activePage.name === 'home'
                ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                : 'hover:text-[#143D2B]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate({ name: 'recipes-directory' })}
            className={`whitespace-nowrap transition-colors py-1 ${
              activePage.name === 'recipes-directory'
                ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                : 'hover:text-[#143D2B]'
            }`}
          >
            Recipes
          </button>

          <button
            onClick={() => onNavigate({ name: 'blog' })}
            className={`whitespace-nowrap transition-colors py-1 ${
              activePage.name === 'blog'
                ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                : 'hover:text-[#143D2B]'
            }`}
          >
            Blog
          </button>

          {/* Global Cuisines Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCuisinesOpen(!cuisinesOpen)}
              aria-expanded={cuisinesOpen}
              className="flex items-center gap-1.5 whitespace-nowrap py-1 hover:text-[#143D2B] transition-colors focus-visible:outline-none"
            >
              <span>Global Cuisines</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${cuisinesOpen ? 'rotate-180' : ''}`} />
            </button>

            {cuisinesOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#EBE6DF] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8A8F95] border-b border-[#F4EFE6] mb-1">
                  Explore by Tradition
                </div>
                {cuisinesList.map((item) => (
                  <button
                    key={item.cuisine}
                    onClick={() => handleCuisineClick(item.cuisine)}
                    className="w-full text-left px-4 py-2 text-sm text-[#23272A] hover:bg-[#F8F5EE] hover:text-[#143D2B] transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#8A8F95] font-serif">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate({ name: 'blog', category: 'Cooking Tips' })}
            className="whitespace-nowrap hover:text-[#143D2B] transition-colors py-1"
          >
            Cooking Tips
          </button>

          <button
            onClick={() => onNavigate({ name: 'blog', category: 'Healthy Eating & Nutrition' })}
            className="whitespace-nowrap hover:text-[#143D2B] transition-colors py-1"
          >
            Healthy Eating
          </button>

          <button
            onClick={() => onNavigate({ name: 'videos' })}
            className={`whitespace-nowrap transition-colors py-1 ${
              activePage.name === 'videos'
                ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                : 'hover:text-[#143D2B]'
            }`}
          >
            Cooking Videos
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            aria-label="Search recipes and articles"
            className="p-2.5 text-[#23272A] hover:text-[#143D2B] hover:bg-[#F2ECE1] rounded-full transition-colors flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span className="hidden md:inline text-xs font-medium text-[#6B7280]">Search (Ctrl+K)</span>
          </button>

          <button
            onClick={() => onNavigate({ name: 'recipes-directory' })}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#143D2B] hover:bg-[#1E5E43] rounded-lg shadow-sm transition-all hover:shadow hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore Recipes</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="xl:hidden p-2 text-[#23272A] hover:text-[#143D2B] rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FDFBF7] border-b border-[#EBE6DF] px-6 py-6 animate-in slide-in-from-top-4 duration-200 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-4 text-base font-medium text-[#23272A]">
            <button
              onClick={() => {
                onNavigate({ name: 'home' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#143D2B]"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate({ name: 'recipes-directory' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#143D2B]"
            >
              Recipes Directory
            </button>
            <button
              onClick={() => {
                onNavigate({ name: 'blog' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#143D2B]"
            >
              Blog
            </button>

            {/* Cuisines list in mobile */}
            <div className="border-t border-b border-[#EBE6DF] py-3 my-1">
              <span className="text-xs uppercase tracking-wider text-[#8A8F95] font-semibold block mb-2">
                Global Cuisines
              </span>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {cuisinesList.map((item) => (
                  <button
                    key={item.cuisine}
                    onClick={() => handleCuisineClick(item.cuisine)}
                    className="text-left py-1 text-[#23272A] hover:text-[#143D2B]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onNavigate({ name: 'blog', category: 'Cooking Tips' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#143D2B]"
            >
              Cooking Tips
            </button>
            <button
              onClick={() => {
                onNavigate({ name: 'blog', category: 'Healthy Eating & Nutrition' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#143D2B]"
            >
              Healthy Eating & Nutrition
            </button>
            <button
              onClick={() => {
                onNavigate({ name: 'videos' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#143D2B]"
            >
              Cooking Videos
            </button>
            <button
              onClick={() => {
                onNavigate({ name: 'about' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm text-[#52575C] hover:text-[#143D2B]"
            >
              About Us
            </button>
            <button
              onClick={() => {
                onNavigate({ name: 'contact' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm text-[#52575C] hover:text-[#143D2B]"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
