// ============================================
// COUNTDOWN - Timer de urgência
// Suporta: fixed (data específica) e evergreen (por sessão)
// ============================================

'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountdownProps {
  endDate?: string | Date;
  type?: 'fixed' | 'evergreen';
  evergreenMinutes?: number;
  className?: string;
  onExpire?: () => void;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({
  endDate,
  type = 'evergreen',
  evergreenMinutes = 30,
  className,
  onExpire,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    let targetTime: number;

    if (type === 'fixed' && endDate) {
      // Countdown fixo para data específica
      targetTime = new Date(endDate).getTime();
    } else {
      // Countdown evergreen (por sessão)
      const storageKey = 'countdown_evergreen_end';
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        targetTime = parseInt(stored, 10);
      } else {
        targetTime = Date.now() + evergreenMinutes * 60 * 1000;
        localStorage.setItem(storageKey, targetTime.toString());
      }
    }

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });

        // Disparar evento e callback
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'countdown_expired',
            countdown_type: type,
            timestamp: new Date().toISOString(),
          });
        }
        if (onExpire) onExpire();

        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [endDate, type, evergreenMinutes, onExpire]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  if (isExpired) {
    return (
      <div className={cn('text-danger-600 font-bold text-h3', className)}>
        Oferta Expirada
      </div>
    );
  }

  return (
    <div className={cn('flex gap-2 items-center justify-center', className)}>
      {/* Horas */}
      <div className="flex flex-col items-center bg-surface-900 text-white rounded-button p-4 min-w-[80px]">
        <span className="text-display font-bold leading-none">{formatNumber(timeLeft.hours)}</span>
        <span className="text-body-sm mt-1 opacity-80">horas</span>
      </div>

      <span className="text-display font-bold text-surface-900">:</span>

      {/* Minutos */}
      <div className="flex flex-col items-center bg-surface-900 text-white rounded-button p-4 min-w-[80px]">
        <span className="text-display font-bold leading-none">
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="text-body-sm mt-1 opacity-80">min</span>
      </div>

      <span className="text-display font-bold text-surface-900">:</span>

      {/* Segundos */}
      <div className="flex flex-col items-center bg-surface-900 text-white rounded-button p-4 min-w-[80px]">
        <span className="text-display font-bold leading-none">
          {formatNumber(timeLeft.seconds)}
        </span>
        <span className="text-body-sm mt-1 opacity-80">seg</span>
      </div>
    </div>
  );
}
