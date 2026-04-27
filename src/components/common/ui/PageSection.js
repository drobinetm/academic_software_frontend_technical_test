import React from 'react';
import { cn } from '../../../utils/cn';
import { Card } from './Card';

export function PageSection({ className, children, ...props }) {
  return (
    <Card className={cn('p-4 sm:p-6', className)} {...props}>
      {children}
    </Card>
  );
}
