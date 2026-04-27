import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Button } from './Button';
import { Card } from './Card';

export function Dialog({ open, title, description, icon, onClose, actions, children, maxWidth = 'max-w-md' }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <Card className={cn('w-full border-border bg-surface', maxWidth)} role="dialog" aria-modal="true">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-start gap-3">
            {icon ? <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-text-primary">{icon}</div> : null}
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
              {description ? <p className="mt-1 text-sm leading-6 text-text-secondary">{description}</p> : null}
            </div>
          </div>
          {onClose ? (
            <Button variant="ghost" size="icon" aria-label="Cerrar" onClick={onClose} className="h-9 w-9 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
        {children ? <div className="px-5 py-4 sm:px-6">{children}</div> : null}
        {actions ? <div className="flex flex-wrap justify-end gap-3 border-t border-border px-5 py-4 sm:px-6">{actions}</div> : null}
      </Card>
    </div>
  );
}
