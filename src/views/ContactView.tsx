import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Recipe Question',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32] block">
          Reader Community & Inquiries
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#143D2B] tracking-tight">
          Contact Meal Yield
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
          We welcome thoughtful questions about our recipes, cultural culinary tradition inquiries, reader feedback, and editorial suggestions.
        </p>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3xl border border-[#EBE6DF] p-6 sm:p-10 shadow-sm">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#1C1E21] mb-2 uppercase tracking-wide">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Campbell"
                  className="w-full px-4 py-3 rounded-xl border border-[#EBE6DF] bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#143D2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1E21] mb-2 uppercase tracking-wide">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#EBE6DF] bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#143D2B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#1C1E21] mb-2 uppercase tracking-wide">
                  Inquiry Topic
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#EBE6DF] bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#143D2B]"
                >
                  <option value="Recipe Question">Recipe Question / Technical Advice</option>
                  <option value="Recipe Request">Request a Regional Recipe</option>
                  <option value="Nutrition Question">Nutrition & Health Article Feedback</option>
                  <option value="Editorial Collaboration">Editorial & Media Inquiries</option>
                  <option value="General Feedback">General Reader Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1E21] mb-2 uppercase tracking-wide">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Question on Chicken Karahi high-heat bhunai"
                  className="w-full px-4 py-3 rounded-xl border border-[#EBE6DF] bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#143D2B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C1E21] mb-2 uppercase tracking-wide">
                Your Message *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your kitchen experience, question, or suggestions with our team..."
                className="w-full px-4 py-3 rounded-xl border border-[#EBE6DF] bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#143D2B]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#8A8F95]">
                We respect your privacy. No spam, ever.
              </span>
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#143D2B] hover:bg-[#1E5E43] text-white rounded-xl font-semibold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 shadow"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#143D2B]">
              Message Received by Meal Yield
            </h3>
            <p className="text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#1C1E21]">{formData.name}</strong>. Our culinary editors review reader inquiries daily and will respond directly to <strong className="text-[#1C1E21]">{formData.email}</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', category: 'Recipe Question', subject: '', message: '' });
              }}
              className="mt-4 px-5 py-2 text-xs font-semibold text-[#143D2B] bg-[#F4EFE6] hover:bg-[#EBE6DF] rounded-xl transition-colors"
            >
              Send Another Note
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
