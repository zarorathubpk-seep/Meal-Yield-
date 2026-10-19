import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { PinterestMetadata } from '../types/content';

interface PinterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: PinterestMetadata;
  title: string;
  url: string;
}

export const PinterestModal: React.FC<PinterestModalProps> = ({
  isOpen,
  onClose,
  metadata,
  title,
  url,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  const pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
    fullUrl
  )}&media=${encodeURIComponent(
    typeof window !== 'undefined' ? `${window.location.origin}${metadata.pinImage}` : metadata.pinImage
  )}&description=${encodeURIComponent(`${metadata.pinTitle} – ${metadata.pinDescription}`)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EBE6DF] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EBE6DF] flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#BD081C] text-white flex items-center justify-center font-bold text-xs">
              P
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-[#143D2B]">
                Pinterest Editorial Pin Preview
              </h3>
              <p className="text-xs text-[#6B7280]">
                Optimized 2:3 vertical aspect ratio (1000 × 1500) for Pinterest Discovery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Pinterest modal"
            className="p-1.5 text-[#6B7280] hover:text-[#1C1E21] hover:bg-[#F0EBE1] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Vertical 2:3 Pin Preview Card */}
          <div className="md:col-span-6 flex justify-center">
            <div className="w-64 aspect-[2/3] bg-white rounded-2xl shadow-xl border border-[#DDD5C7] overflow-hidden flex flex-col relative group">
              {/* Top Branding Banner */}
              <div className="p-3 bg-[#143D2B] text-white flex items-center justify-between">
                <span className="font-editorial text-sm font-bold tracking-tight">Meal Yield</span>
                <span className="text-[9px] uppercase tracking-widest text-[#E27344] font-semibold">Kitchen Journal</span>
              </div>

              {/* Photo Area */}
              <div className="relative flex-1 bg-stone-100 overflow-hidden">
                <img
                  src={metadata.pinImage}
                  alt={metadata.pinTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Pin Title Typography */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#E27344] block mb-1">
                    Authentic Recipe Guide
                  </span>
                  <h4 className="font-editorial text-base font-bold leading-tight drop-shadow-md">
                    {metadata.pinTitle}
                  </h4>
                </div>
              </div>

              {/* Pin Base Link Indicator */}
              <div className="p-2.5 bg-[#FDFBF7] border-t border-[#EBE6DF] flex items-center justify-between text-[11px] font-sans">
                <span className="font-semibold text-[#143D2B]">mealyield.com</span>
                <span className="text-[#C85A32] font-medium">Read Full Article →</span>
              </div>
            </div>
          </div>

          {/* Pin Details & Actions */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                Pin Configuration
              </span>
              <h4 className="font-editorial text-xl font-bold text-[#143D2B] mt-1">
                {title}
              </h4>

              <div className="mt-3 space-y-2 text-xs text-[#4B5563]">
                <div>
                  <strong className="text-[#1C1E21]">SEO Pin Title:</strong>
                  <p className="font-mono text-[11px] bg-[#F8F5EE] p-2 rounded-lg mt-0.5 border border-[#EBE6DF]">
                    {metadata.pinTitle}
                  </p>
                </div>
                <div>
                  <strong className="text-[#1C1E21]">Pin Description:</strong>
                  <p className="bg-[#F8F5EE] p-2 rounded-lg mt-0.5 border border-[#EBE6DF] leading-relaxed">
                    {metadata.pinDescription}
                  </p>
                </div>
                <div>
                  <strong className="text-[#1C1E21]">Destination Canonical URL:</strong>
                  <p className="font-mono text-[11px] bg-[#F8F5EE] p-2 rounded-lg mt-0.5 border border-[#EBE6DF] truncate">
                    {fullUrl}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#EBE6DF] flex flex-col gap-2.5">
              <a
                href={pinterestShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#BD081C] hover:bg-[#A30718] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:shadow"
              >
                <Share2 className="w-4 h-4" />
                <span>Save to Pinterest Board</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 bg-[#F4EFE6] hover:bg-[#EBE6DF] text-[#143D2B] border border-[#D6CEBE] rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Canonical Link Copied!' : 'Copy Direct Share Link'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
