export interface IngredientItem {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
  category?: string;
}

export interface InstructionStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip?: string;
}

export interface NutritionInfo {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG?: number;
  sodiumMg?: number;
}

export interface PinterestMetadata {
  pinTitle: string;
  pinDescription: string;
  pinImage: string;
  aspectRatio: '2:3';
  keywords: string[];
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  cuisine: 'Pakistani' | 'Indian' | 'Bangladeshi' | 'American' | 'British' | 'Italian' | 'International';
  category: 'Desi Food' | 'Western Food' | 'International';
  subcategory: string;
  image: string;
  featured: boolean;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  ingredients: IngredientItem[];
  instructions: InstructionStep[];
  chefTips: string[];
  storageNotes: string;
  nutrition: NutritionInfo;
  pinterest: PinterestMetadata;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    bio: string;
  };
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  callout?: {
    type: 'tip' | 'science' | 'guideline' | 'quote';
    source?: string;
    text: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'Desi Food' | 'Western Food' | 'Cooking Tips' | 'Healthy Eating & Nutrition';
  subcategory: string;
  cuisine?: 'Pakistani' | 'Indian' | 'Bangladeshi' | 'American' | 'British' | 'Italian' | 'Global';
  image: string;
  featured: boolean;
  publishedDate: string;
  readTimeMinutes: number;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  sections: ArticleSection[];
  linkedRecipeSlug?: string;
  medicalDisclaimer?: boolean;
  citations?: {
    organization: string;
    guideline: string;
  }[];
  pinterest: PinterestMetadata;
}

export interface CookingVideo {
  id: string;
  youtubeId: string;
  title: string;
  creator: string;
  cuisine: string;
  duration: string;
  thumbnail: string;
  description: string;
  featured: boolean;
}

export type ActivePage =
  | { name: 'home' }
  | { name: 'blog'; category?: string; subcategory?: string }
  | { name: 'recipe'; slug: string }
  | { name: 'article'; slug: string }
  | { name: 'recipes-directory'; cuisine?: string }
  | { name: 'videos' }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'legal'; section?: 'privacy' | 'terms' | 'medical' | 'editorial' };
