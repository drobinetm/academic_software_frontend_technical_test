import React from 'react';
import { CircleAlert, CircleCheckBig, Info, X } from 'lucide-react';
import { useFeedback } from '../../hooks/useFeedback';
import { cn } from '../../utils/cn';

const appearance = {
  success: {
    icon: CircleCheckBig,
    className: 'border-success/30 bg-success/12 text-text-primary',
    iconClassName: 'text-success',
  },
  error: {
    icon: CircleAlert,
    className: 'border-danger/30 bg-danger/12 text-text-primary',
    iconClassName: 'text-danger',
  },
  info: {
    icon: Info,
    className: 'border-accent/30 bg-accent/12 text-text-primary',
    iconClassName: 'text-accent',
  },
};

export function FeedbackSnackbar() {
  const { feedback, closeFeedback } = useFeedback();

  React.useEffect(() => {
    if (!feedback.open) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      closeFeedback();
    }, 4500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [closeFeedback, feedback.open]);

  if (!feedback.open) {
    return null;
  }

  const resolvedAppearance = appearance[feedback.severity] || appearance.info;
  const Icon = resolvedAppearance.icon;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm sm:bottom-6 sm:right-6">
      <div className={cn('flex items-start gap-3 rounded-surface border px-4 py-3 shadow-floating backdrop-blur', resolvedAppearance.className)}>
        <Icon className={cn('mt-0.5 h-5 w-5 flex-shrink-0', resolvedAppearance.iconClassName)} />
        <p className="min-w-0 flex-1 text-sm leading-6">{feedback.message}</p>
        <button type="button" onClick={closeFeedback} className="rounded-full p-1 text-text-secondary transition hover:bg-surface-muted hover:text-text-primary" aria-label="Cerrar mensaje">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
