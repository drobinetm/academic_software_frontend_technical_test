import React from 'react';
import { cn } from '../../../utils/cn';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn('rounded-surface border border-border bg-surface shadow-surface', className)}
      {...props}
    >
      {children}
    </div>
  );
}
