import React, { useState } from 'react';
import { ShieldCheck, HeartPulse, FileText, Award } from 'lucide-react';

interface LegalViewProps {
  initialSection?: 'privacy' | 'terms' | 'medical' | 'editorial';
}

export const LegalView: React.FC<LegalViewProps> = ({ initialSection = 'medical' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'medical' | 'editorial'>(
    initialSection
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#EBE6DF] pb-6">
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#143D2B]">
          Legal Information & Editorial Policies
        </h1>
        <p className="mt-2 text-sm text-[#4B5563]">
          Transparency, trust, health disclaimers, and user privacy standards for Meal Yield.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EBE6DF]">
        <button
          onClick={() => setActiveTab('medical')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'medical'
              ? 'bg-[#143D2B] text-white shadow-sm'
              : 'text-[#6B7280] hover:text-[#1C1E21] hover:bg-[#F4EFE6]'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5 text-[#E27344]" />
          <span>Medical & Health Disclaimer</span>
        </button>

        <button
          onClick={() => setActiveTab('editorial')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'editorial'
              ? 'bg-[#143D2B] text-white shadow-sm'
              : 'text-[#6B7280] hover:text-[#1C1E21] hover:bg-[#F4EFE6]'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Editorial Standards</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'privacy'
              ? 'bg-[#143D2B] text-white shadow-sm'
              : 'text-[#6B7280] hover:text-[#1C1E21] hover:bg-[#F4EFE6]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'terms'
              ? 'bg-[#143D2B] text-white shadow-sm'
              : 'text-[#6B7280] hover:text-[#1C1E21] hover:bg-[#F4EFE6]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Terms & Conditions</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-3xl border border-[#EBE6DF] p-6 sm:p-10 shadow-sm font-prose text-sm text-[#2E3338] leading-relaxed space-y-6">
        
        {activeTab === 'medical' && (
          <div className="space-y-6">
            <h2 className="font-editorial text-2xl font-bold text-[#143D2B]">
              Medical Disclaimer & Nutritional Transparency
            </h2>

            <div className="p-4 bg-[#F8F5EE] rounded-xl border border-[#DDD5C7] text-xs text-[#52575C] font-sans">
              <strong>Important Notice:</strong> Content published on Meal Yield is solely for general dietary education, culinary literacy, and informational pleasure. No content is intended to be a substitute for professional medical diagnosis, advice, or therapy.
            </div>

            <p>
              <strong>1. No Curative or Medical Claims:</strong> Meal Yield does not claim that any ingredient, recipe, superfood, or dietary pattern cures, prevents, or reverses diabetes, hypertension, cardiovascular disease, or any medical condition. Food choices form a vital component of wellness, but they do not supplant prescribed pharmaceutical medications or medical treatment plans.
            </p>

            <p>
              <strong>2. Reference to Credible Health Authorities:</strong> All educational nutritional commentary published on Meal Yield cites peer-reviewed clinical guidelines established by reputable international authorities, including:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs text-[#52575C] font-sans">
              <li><strong>American Diabetes Association (ADA):</strong> Dietary guidelines for carbohydrate management, glycemic control, and portion distribution.</li>
              <li><strong>American Heart Association (AHA):</strong> Dietary Approaches to Stop Hypertension (DASH) and dietary sodium benchmarks.</li>
              <li><strong>Centers for Disease Control and Prevention (CDC):</strong> Metabolic risk factors, chronic disease prevention, and physical activity guidelines.</li>
              <li><strong>World Health Organization (WHO):</strong> Global nutritional standards for sodium reduction, free sugars, and essential micronutrients.</li>
            </ul>

            <p>
              <strong>3. Individual Responsibility:</strong> Nutritional needs differ widely according to individual age, renal health, pregnancy, allergies, and metabolic variations. Always seek the advice of your physician, registered dietitian, or other qualified healthcare provider with any questions you may have regarding a medical condition or therapeutic diet.
            </p>
          </div>
        )}

        {activeTab === 'editorial' && (
          <div className="space-y-6">
            <h2 className="font-editorial text-2xl font-bold text-[#143D2B]">
              Editorial Standards & Testing Methodology
            </h2>

            <p>
              At Meal Yield, our mission is to provide accurate, delicious, and culturally respectful recipes. We adhere to the following strict editorial guidelines:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Kitchen Verification:</strong> Every featured recipe is tested multiple times to verify exact cooking temperatures, timing, texture transitions, and ingredient measurements across both Metric and US Customary systems.
              </li>
              <li>
                <strong>Zero Hallucinated Ratings or Metrics:</strong> We never fabricate artificial 5-star rating averages, fake recipe review counts, or imaginary nutritional statistics. Where nutritional values are provided, they represent standard calculated culinary estimates.
              </li>
              <li>
                <strong>Culinary Heritage Respect:</strong> When presenting traditional dishes from Pakistan, India, Bangladesh, Italy, Britain, or the United States, we honor their historical cooking techniques and cultural origins.
              </li>
              <li>
                <strong>Independent Editorial Voice:</strong> Recipes and articles are produced independently. Any future sponsored collaborations will be labeled with full transparency.
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h2 className="font-editorial text-2xl font-bold text-[#143D2B]">
              Privacy Policy
            </h2>
            <p className="text-xs text-[#8A8F95] font-sans">Last Updated: Autumn 2026</p>

            <p>
              Meal Yield is committed to respecting and protecting the privacy of our visitors. This Privacy Policy outlines what information we collect and how it is used.
            </p>

            <h3 className="font-editorial text-lg font-bold text-[#143D2B]">1. Information We Collect</h3>
            <p>
              • <strong>Reader Communications:</strong> When you submit a recipe inquiry or feedback through our contact form, we collect the name, email address, and message details you provide to respond to your inquiry.
            </p>
            <p>
              • <strong>Newsletter Subscriptions:</strong> If you elect to subscribe to our newsletter, your email address is used solely to deliver culinary updates and articles. You can unsubscribe at any time.
            </p>

            <h3 className="font-editorial text-lg font-bold text-[#143D2B]">2. Cookies & Analytics</h3>
            <p>
              We may utilize standard privacy-conscious web analytics to evaluate readership patterns and improve site navigation. We do not sell personal data to third parties.
            </p>

            <h3 className="font-editorial text-lg font-bold text-[#143D2B]">3. External Embeds & Social Sharing</h3>
            <p>
              Our website provides Pinterest save integration and official YouTube video embeds. These third-party services operate under their respective privacy policies.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-6">
            <h2 className="font-editorial text-2xl font-bold text-[#143D2B]">
              Terms & Conditions
            </h2>
            <p className="text-xs text-[#8A8F95] font-sans">Last Updated: Autumn 2026</p>

            <p>
              By accessing and using Meal Yield, you accept and agree to be bound by these terms. All content, recipes, photography, and design elements are protected by copyright.
            </p>

            <h3 className="font-editorial text-lg font-bold text-[#143D2B]">1. Personal & Non-Commercial Use</h3>
            <p>
              You are welcome to print, bookmark, and cook from our recipes for your personal, home kitchen use. Systematic automated scraping, republication, or unauthorized commercial distribution of Meal Yield editorial photography and text is prohibited.
            </p>

            <h3 className="font-editorial text-lg font-bold text-[#143D2B]">2. Culinary Disclaimer</h3>
            <p>
              Cooking involves open flame, heated oil, knives, and potential food allergens. Readers are responsible for observing safe kitchen hygiene, verifying safe internal meat temperatures, and avoiding personal allergens.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
