import React from 'react';

interface RevBidSquareAdProps {
  className?: string;
}

export const RevBidSquareAd: React.FC<RevBidSquareAdProps> = ({ className = '' }) => {
  return (
    <div className={`w-full my-8 flex flex-col items-center justify-center no-print ${className}`}>
      <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8A8F95] mb-2 select-none">
        Advertisement
      </span>
      <div
        data-placement-id="revbid-square"
        id="revbid-square-16249"
        style={{ minWidth: '300px', minHeight: '250px', textAlign: 'center' }}
        className="flex items-center justify-center max-w-full overflow-hidden"
      />
    </div>
  );
};
