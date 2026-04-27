import React from 'react';
import { cn } from '../../../utils/cn';

const variants = {
  primary: 'bg-accent text-text-inverse hover:bg-accent-strong disabled:bg-accent/60',
  secondary: 'border border-border bg-surface-alt text-text-primary hover:bg-surface-muted disabled:text-text-muted',
  danger: 'bg-danger text-white hover:opacity-90 disabled:opacity-70',
  ghost: 'text-text-secondary hover:bg-surface-muted hover:text-text-primary disabled:text-text-muted',
};

const sizes = {
  md: 'h-12 px-5 text-sm',
  lg: 'h-14 px-6 text-base',
  icon: 'h-12 w-12 p-0',
};

export const Button = React.forwardRef(function Button(
  { className, children, variant = 'primary', size = 'md', fullWidth = false, type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-action font-semibold tracking-[0.01em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-80 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0 [&_svg]:stroke-[2.2] [&_svg]:text-current',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
