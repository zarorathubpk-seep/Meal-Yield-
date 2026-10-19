/**
 * URL resolution helper for static images across dev, preview, and GitHub Pages production deployments.
 */

export function resolveImageUrl(path: string | undefined): string {
  if (!path) return '';

  // External URLs or inline data URIs pass through directly
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  // Normalize any legacy development paths
  let clean = path;
  if (clean.includes('/src/assets/images/')) {
    // Map known asset filenames to standardized public/images paths
    if (clean.includes('chicken_karahi')) clean = '/images/pakistani-chicken-karahi.jpg';
    else if (clean.includes('margherita_pizza')) clean = '/images/italian-margherita-pizza.jpg';
    else if (clean.includes('chicken_biryani')) clean = '/images/royal-chicken-biryani.jpg';
    else if (clean.includes('american_cheeseburger')) clean = '/images/american-cheeseburger.jpg';
    else if (clean.includes('fish_and_chips')) clean = '/images/british-fish-and-chips.jpg';
    else if (clean.includes('italian_pasta')) clean = '/images/italian-pasta-carbonara.jpg';
    else clean = clean.replace('/src/assets/images/', '/images/');
  }

  // Ensure root-relative or base-aware path for Vite deployments
  const base = import.meta.env?.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  const relativePath = clean.startsWith('/') ? clean.slice(1) : clean;

  return `${prefix}${relativePath}`;
}
