import React, { useState } from 'react';
import { Youtube, Play, Clock, User, Sparkles } from 'lucide-react';
import { COOKING_VIDEOS_DATA } from '../data/videos';
import { CookingVideo } from '../types/content';

interface VideosViewProps {
  onSelectVideo: (video: CookingVideo) => void;
}

export const VideosView: React.FC<VideosViewProps> = ({ onSelectVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Pakistani Cooking',
    'Indian Cooking',
    'Italian Cooking',
    'American Cooking',
    'British Cooking',
  ];

  const filteredVideos = COOKING_VIDEOS_DATA.filter((v) => {
    if (selectedCategory === 'All') return true;
    return v.cuisine.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#EBE6DF] pb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-red-600 mb-2">
          <Youtube className="w-4 h-4" />
          <span>Verified Masterclass Tutorials</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#143D2B] tracking-tight">
          Featured Cooking Videos
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
          Watch culinary masters demonstrate precise wok control, pasta dough stretching, and burger searing techniques. Uses on-demand click-to-load players for maximum speed.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white text-[#52575C] hover:bg-[#F2ECE1] border border-[#EBE6DF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo(video)}
            className="group cursor-pointer bg-white rounded-3xl border border-[#EBE6DF] overflow-hidden card-hover-subtle flex flex-col shadow-sm"
          >
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/85 rounded text-[11px] font-mono text-white">
                {video.duration}
              </span>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider block mb-2">
                  {video.cuisine}
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#143D2B] group-hover:text-[#C85A32] transition-colors leading-snug">
                  {video.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[#4B5563] leading-relaxed line-clamp-2">
                  {video.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                <span className="text-[#6B7280] flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-[#C85A32]" />
                  {video.creator}
                </span>
                <span className="font-semibold text-red-600 group-hover:underline">
                  Watch Video →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
