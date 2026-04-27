import React from 'react';
import { cn } from '../../utils/cn';

export function LoadingFallback({ fullScreen = false, label = 'Cargando' }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 text-text-secondary',
        fullScreen ? 'min-h-screen' : 'min-h-[240px]'
      )}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
