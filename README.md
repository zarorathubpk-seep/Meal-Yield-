# Meal Yield – International Food & Lifestyle Publication

> **Tagline:** Explore Flavors. Cook Better. Eat Smarter.

Meal Yield is a luxury international food and lifestyle web publication dedicated to authentic culinary traditions from Pakistan, India, Bangladesh, Italy, the United States, the United Kingdom, and worldwide.

---

## Key Features

- **Editorial Homepage:** 3D rotating hero showcase, curated recipe cards, global cuisine exploration, cooking tips, and video masterclasses.
- **Dedicated Blog:** Four core editorial categories with deep subcategory filtering:
  1. *Desi Food & Traditional Recipes* (Pakistani, Indian, Bangladeshi)
  2. *Western & International Food* (American, British, Italian)
  3. *Cooking Tips & Kitchen Guides*
  4. *Healthy Eating & Nutrition* (Blood Sugar, Blood Pressure, DASH diet, citing ADA, AHA, CDC, and WHO)
- **Interactive Recipe System:**
  - Interactive serving size scaler (2, 4, 6, 8 servings) that automatically calculates ingredient proportions
  - Unit toggle (Metric vs US Customary)
  - Interactive ingredient and step-by-step checkboxes
  - Clean print stylesheet (`window.print()`)
  - Schema.org `Recipe` JSON-LD structured data
- **Pinterest Traffic Optimization:**
  - Dedicated 2:3 vertical aspect ratio preview cards (1000 × 1500)
  - Real Pinterest board save action with pre-populated metadata
- **On-Demand Video Player:** Click-to-load YouTube tutorials to maximize page speed.
- **Search System:** Real-time recipe and article filtering with `Ctrl + K` / `Cmd + K` keyboard shortcut.

---

## GitHub Pages Deployment Instructions

### Method 1: GitHub Actions (Recommended)

1. Push this repository to GitHub.
2. In your repository on GitHub, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Create a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy Meal Yield to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Custom Domain Configuration (e.g. `mealyield.com`)

1. If using a custom apex domain or subdomain, add a file named `CNAME` in the `public/` directory containing your domain name (e.g., `mealyield.com`).
2. In your domain DNS registrar, add:
   - `A` records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or a `CNAME` record for subdomains (e.g. `www`) pointing to `<username>.github.io`.
3. In GitHub Settings > Pages, enter your custom domain and enable **Enforce HTTPS**.
