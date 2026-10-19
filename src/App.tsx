import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { HomeView } from './views/HomeView';
import { BlogView } from './views/BlogView';
import { RecipeDetailView } from './views/RecipeDetailView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { RecipesDirectoryView } from './views/RecipesDirectoryView';
import { VideosView } from './views/VideosView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { LegalView } from './views/LegalView';
import { RECIPES_DATA } from './data/recipes';
import { ARTICLES_DATA } from './data/articles';
import { ActivePage, CookingVideo } from './types/content';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>({ name: 'home' });
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<CookingVideo | null>(null);

  // Parse Hash URL to page state
  const parseHash = (hash: string): ActivePage => {
    const clean = hash.replace(/^#\/?/, '');
    if (!clean || clean === '') return { name: 'home' };

    const parts = clean.split('/');
    const main = parts[0];

    if (main === 'recipe' && parts[1]) {
      return { name: 'recipe', slug: parts[1] };
    }
    if (main === 'article' && parts[1]) {
      return { name: 'article', slug: parts[1] };
    }
    if (main === 'blog') {
      const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
      const category = urlParams.get('category') || undefined;
      const subcategory = urlParams.get('subcategory') || undefined;
      return { name: 'blog', category, subcategory };
    }
    if (main === 'recipes') {
      const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
      const cuisine = urlParams.get('cuisine') || undefined;
      return { name: 'recipes-directory', cuisine };
    }
    if (main === 'videos') return { name: 'videos' };
    if (main === 'about') return { name: 'about' };
    if (main === 'contact') return { name: 'contact' };
    if (main === 'legal') {
      const section = (parts[1] as 'privacy' | 'terms' | 'medical' | 'editorial') || 'medical';
      return { name: 'legal', section };
    }

    return { name: 'home' };
  };

  // Sync state to hash URL
  const navigateTo = (page: ActivePage, updateHash = true) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!updateHash) return;

    let hash = '#/';
    if (page.name === 'home') hash = '#/';
    else if (page.name === 'recipe') hash = `#/recipe/${page.slug}`;
    else if (page.name === 'article') hash = `#/article/${page.slug}`;
    else if (page.name === 'blog') {
      const params = new URLSearchParams();
      if (page.category) params.set('category', page.category);
      if (page.subcategory) params.set('subcategory', page.subcategory);
      const query = params.toString();
      hash = query ? `#/blog?${query}` : `#/blog`;
    } else if (page.name === 'recipes-directory') {
      const params = new URLSearchParams();
      if (page.cuisine) params.set('cuisine', page.cuisine);
      const query = params.toString();
      hash = query ? `#/recipes?${query}` : `#/recipes`;
    } else if (page.name === 'videos') hash = '#/videos';
    else if (page.name === 'about') hash = '#/about';
    else if (page.name === 'contact') hash = '#/contact';
    else if (page.name === 'legal') hash = `#/legal/${page.section || 'medical'}`;

    window.location.hash = hash;
  };

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash(window.location.hash);
      setActivePage(parsed);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load parse
    if (window.location.hash) {
      setActivePage(parseHash(window.location.hash));
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic document title and Schema.org structured data on route change
  useEffect(() => {
    let title = 'Meal Yield – Explore Flavors. Cook Better. Eat Smarter.';
    let schemaData: any = null;

    if (activePage.name === 'recipe') {
      const r = RECIPES_DATA.find((item) => item.slug === activePage.slug);
      if (r) {
        title = `${r.title} Recipe – Meal Yield`;
        schemaData = {
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          name: r.title,
          image: [r.image],
          author: { '@type': 'Person', name: r.author.name },
          datePublished: r.publishedDate,
          description: r.description,
          prepTime: `PT${r.prepTimeMinutes}M`,
          cookTime: `PT${r.cookTimeMinutes}M`,
          totalTime: `PT${r.prepTimeMinutes + r.cookTimeMinutes}M`,
          recipeYield: `${r.servings} servings`,
          recipeCategory: r.category,
          recipeCuisine: r.cuisine,
          recipeIngredient: r.ingredients.map(
            (i) => `${i.amount} ${i.unit} ${i.name} ${i.notes ? `(${i.notes})` : ''}`
          ),
          recipeInstructions: r.instructions.map((step) => ({
            '@type': 'HowToStep',
            name: step.title,
            text: step.instruction,
          })),
        };
      }
    } else if (activePage.name === 'article') {
      const a = ARTICLES_DATA.find((item) => item.slug === activePage.slug);
      if (a) {
        title = `${a.title} – Meal Yield Journal`;
        schemaData = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: a.title,
          description: a.excerpt,
          image: [a.image],
          datePublished: a.publishedDate,
          author: { '@type': 'Person', name: a.author.name },
          publisher: { '@type': 'Organization', name: 'Meal Yield' },
        };
      }
    } else if (activePage.name === 'blog') {
      title = 'The Journal & Culinary Guides – Meal Yield';
    } else if (activePage.name === 'recipes-directory') {
      title = 'International Recipe Library – Meal Yield';
    } else if (activePage.name === 'videos') {
      title = 'Cooking Videos & Masterclasses – Meal Yield';
    } else if (activePage.name === 'about') {
      title = 'About Us & Editorial Mission – Meal Yield';
    } else if (activePage.name === 'contact') {
      title = 'Contact & Reader Community – Meal Yield';
    } else if (activePage.name === 'legal') {
      title = 'Legal, Disclaimers & Policies – Meal Yield';
    }

    document.title = title;

    // Inject or update Schema.org JSON-LD
    let scriptTag = document.getElementById('dynamic-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-jsonld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    if (schemaData) {
      scriptTag.textContent = JSON.stringify(schemaData);
    } else {
      scriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Meal Yield',
        url: window.location.origin,
      });
    }
  }, [activePage]);

  // Render view router
  const renderCurrentView = () => {
    switch (activePage.name) {
      case 'home':
        return <HomeView onNavigate={navigateTo} onSelectVideo={(v) => setActiveVideo(v)} />;

      case 'blog':
        return (
          <BlogView
            initialCategory={activePage.category}
            initialSubcategory={activePage.subcategory}
            onNavigate={navigateTo}
          />
        );

      case 'recipe': {
        const recipe = RECIPES_DATA.find((r) => r.slug === activePage.slug) || RECIPES_DATA[0];
        return <RecipeDetailView recipe={recipe} onNavigate={navigateTo} />;
      }

      case 'article': {
        const article = ARTICLES_DATA.find((a) => a.slug === activePage.slug) || ARTICLES_DATA[0];
        return <ArticleDetailView article={article} onNavigate={navigateTo} />;
      }

      case 'recipes-directory':
        return (
          <RecipesDirectoryView
            initialCuisine={activePage.cuisine}
            onNavigate={navigateTo}
          />
        );

      case 'videos':
        return <VideosView onSelectVideo={(v) => setActiveVideo(v)} />;

      case 'about':
        return <AboutView onNavigate={navigateTo} />;

      case 'contact':
        return <ContactView />;

      case 'legal':
        return <LegalView initialSection={activePage.section} />;

      default:
        return <HomeView onNavigate={navigateTo} onSelectVideo={(v) => setActiveVideo(v)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1E21] selection:bg-[#C85A32]/20 selection:text-[#143D2B]">
      
      {/* Premium Top Navigation Bar */}
      <Header
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Comprehensive Editorial Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Global Interactive Search Modal (Ctrl/Cmd + K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigateTo}
      />

      {/* Click-to-load YouTube Video Player Modal */}
      <VideoPlayerModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

    </div>
  );
}
