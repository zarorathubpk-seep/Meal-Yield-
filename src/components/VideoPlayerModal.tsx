import React from 'react';
import { X, Youtube, User, Clock } from 'lucide-react';
import { CookingVideo } from '../types/content';

interface VideoPlayerModalProps {
  video: CookingVideo | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#1C1E21] text-white rounded-3xl shadow-2xl border border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" />
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">
              {video.cuisine} Tutorial
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video player"
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Embed Frame */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Description & Channel Details */}
        <div className="p-6">
          <h3 className="font-editorial text-2xl font-bold text-white">
            {video.title}
          </h3>
          <div className="mt-2 flex items-center gap-4 text-xs text-stone-400">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <User className="w-3.5 h-3.5" />
              {video.creator}
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {video.duration}
            </span>
          </div>
          <p className="mt-3 text-sm text-stone-300 leading-relaxed font-sans">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};
