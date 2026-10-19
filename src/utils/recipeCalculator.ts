/**
 * Recipe math, unit conversions, reading time estimation, and content filtering logic
 */

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
  category?: string;
}

/**
 * Scales an ingredient quantity proportionally based on target servings vs base servings.
 * Rounds cleanly to 2 decimal places or nearest clean fraction.
 */
export function scaleIngredient(amount: number, baseServings: number, targetServings: number): number {
  if (baseServings <= 0 || targetServings <= 0 || amount <= 0) return amount;
  const ratio = targetServings / baseServings;
  const raw = amount * ratio;
  // Round to nearest quarter or clean decimal
  return Math.round(raw * 100) / 100;
}

/**
 * Formats a numeric ingredient amount into readable cooking notation.
 * e.g., 0.5 -> "1/2", 0.75 -> "3/4", 1.5 -> "1 1/2", 2 -> "2"
 */
export function formatIngredientAmount(amount: number): string {
  if (amount <= 0) return '';
  const whole = Math.floor(amount);
  const remainder = Math.round((amount - whole) * 100) / 100;

  let fraction = '';
  if (remainder >= 0.2 && remainder <= 0.28) fraction = '1/4';
  else if (remainder >= 0.31 && remainder <= 0.36) fraction = '1/3';
  else if (remainder >= 0.45 && remainder <= 0.55) fraction = '1/2';
  else if (remainder >= 0.64 && remainder <= 0.69) fraction = '2/3';
  else if (remainder >= 0.72 && remainder <= 0.78) fraction = '3/4';
  else if (remainder > 0) fraction = remainder.toFixed(1).replace(/^0\./, '.');

  if (whole > 0 && fraction) return `${whole} ${fraction}`;
  if (whole > 0 && !fraction) return `${whole}`;
  return fraction || `${amount}`;
}

/**
 * Converts common cooking measurements between Metric and Imperial systems
 */
export function convertUnit(
  amount: number,
  unit: string,
  toSystem: 'metric' | 'imperial'
): { amount: number; unit: string } {
  const normUnit = unit.toLowerCase().trim();

  // If already in target system or dimensionless, return as is
  if (!amount || normUnit === '' || normUnit === 'pinch' || normUnit === 'to taste') {
    return { amount, unit };
  }

  if (toSystem === 'metric') {
    // Imperial to Metric
    if (normUnit === 'lb' || normUnit === 'lbs' || normUnit === 'pound' || normUnit === 'pounds') {
      return { amount: Math.round(amount * 453.592), unit: 'g' };
    }
    if (normUnit === 'oz' || normUnit === 'ounce' || normUnit === 'ounces') {
      return { amount: Math.round(amount * 28.3495), unit: 'g' };
    }
    if (normUnit === 'cup' || normUnit === 'cups') {
      return { amount: Math.round(amount * 240), unit: 'ml' };
    }
    if (normUnit === 'fl oz' || normUnit === 'fluid oz') {
      return { amount: Math.round(amount * 29.5735), unit: 'ml' };
    }
    if (normUnit === 'tbsp' || normUnit === 'tablespoon' || normUnit === 'tablespoons') {
      return { amount: Math.round(amount * 15), unit: 'ml' };
    }
    if (normUnit === 'tsp' || normUnit === 'teaspoon' || normUnit === 'teaspoons') {
      return { amount: Math.round(amount * 5), unit: 'ml' };
    }
  } else {
    // Metric to Imperial
    if (normUnit === 'g' || normUnit === 'gram' || normUnit === 'grams') {
      if (amount >= 450) {
        return { amount: Math.round((amount / 453.592) * 10) / 10, unit: 'lbs' };
      }
      return { amount: Math.round((amount / 28.3495) * 10) / 10, unit: 'oz' };
    }
    if (normUnit === 'kg' || normUnit === 'kilogram') {
      return { amount: Math.round(amount * 2.20462 * 10) / 10, unit: 'lbs' };
    }
    if (normUnit === 'ml' || normUnit === 'milliliter') {
      if (amount >= 240) {
        return { amount: Math.round((amount / 240) * 10) / 10, unit: 'cups' };
      }
      if (amount >= 15) {
        return { amount: Math.round((amount / 15) * 10) / 10, unit: 'tbsp' };
      }
      return { amount: Math.round((amount / 5) * 10) / 10, unit: 'tsp' };
    }
    if (normUnit === 'l' || normUnit === 'liter') {
      return { amount: Math.round(amount * 4.22675 * 10) / 10, unit: 'cups' };
    }
  }

  return { amount, unit };
}

/**
 * Estimates reading time in minutes for long-form articles (standard 200 words per minute)
 */
export function estimateReadingTime(text: string, wpm: number = 200): number {
  if (!text) return 1;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wpm);
  return Math.max(1, minutes);
}

/**
 * Filter items by query and categories
 */
export function filterContent<T extends { title: string; description?: string; category?: string; subcategory?: string; tags?: string[] }>(
  items: T[],
  query: string,
  category?: string,
  subcategory?: string
): T[] {
  const q = query.trim().toLowerCase();

  return items.filter((item) => {
    // Category match
    if (category && category !== 'All' && item.category !== category) {
      return false;
    }
    // Subcategory match
    if (subcategory && subcategory !== 'All' && item.subcategory !== subcategory) {
      return false;
    }
    // Search query match
    if (!q) return true;
    const matchTitle = item.title.toLowerCase().includes(q);
    const matchDesc = item.description?.toLowerCase().includes(q) ?? false;
    const matchTag = item.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
    return matchTitle || matchDesc || matchTag;
  });
}
