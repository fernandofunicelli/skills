// ============================================
// VIDEO EMBED - Facade Pattern
// Thumbnail até o clique, ZERO JS/iframe até play
// ============================================

'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface VideoEmbedProps {
  videoUrl: string;
  thumbnailUrl?: string;
  title?: string;
  className?: string;
}

export function VideoEmbed({ videoUrl, thumbnailUrl, title, className }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extrair ID do YouTube
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const youtubeId = getYouTubeId(videoUrl);
  const defaultThumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : thumbnailUrl;

  const handlePlay = () => {
    setIsPlaying(true);

    // Disparar evento DataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'video_play',
        video_url: videoUrl,
        timestamp: new Date().toISOString(),
      });
    }
  };

  if (isPlaying && youtubeId) {
    return (
      <div className={cn('relative aspect-video rounded-card overflow-hidden', className)}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          title={title || 'Video'}
        />
      </div>
    );
  }

  return (
    <div className={cn('relative aspect-video rounded-card overflow-hidden group cursor-pointer', className)}>
      {/* Thumbnail */}
      {defaultThumbnail ? (
        <Image
          src={defaultThumbnail}
          alt={title || 'Video thumbnail'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-surface-900" />
      )}

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

      {/* Botão Play */}
      <button
        onClick={handlePlay}
        className="absolute inset-0 flex items-center justify-center"
        aria-label="Play video"
      >
        <div className="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-floating">
          <Play className="w-10 h-10 text-white ml-1" fill="white" />
        </div>
      </button>

      {/* Título (opcional) */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white font-semibold">{title}</p>
        </div>
      )}
    </div>
  );
}
