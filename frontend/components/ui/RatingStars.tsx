import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showNumber?: boolean;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  className,
  showNumber = false,
}: RatingStarsProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Estrelas cheias
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className={cn(sizeClasses[size], 'text-accent-500')}
        fill="currentColor"
      />
    );
  }

  // Meia estrela
  if (hasHalfStar && fullStars < maxRating) {
    stars.push(
      <StarHalf
        key="half"
        className={cn(sizeClasses[size], 'text-accent-500')}
        fill="currentColor"
      />
    );
  }

  // Estrelas vazias
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        className={cn(sizeClasses[size], 'text-surface-300')}
      />
    );
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {stars}
      {showNumber && (
        <span className="ml-1 text-body-sm text-surface-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
