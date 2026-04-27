import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const baseControlClassName =
  'w-full rounded-action border border-border bg-surface px-4 text-sm text-text-primary shadow-sm outline-none transition focus:border-border-strong focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-70';

export function FormTextField({
  error,
  helperText,
  label,
  placeholder,
  select,
  type = 'text',
  keepLabel,
  rows,
  multiline,
  children,
  className,
  endAdornment,
  SelectProps,
  ...props
}) {
  const shouldShowLabel = Boolean(keepLabel || select || type === 'date' || multiline);
  const resolvedPlaceholder = placeholder || (!shouldShowLabel ? label : undefined);
  const helper = error || helperText;
  const controlClassName = cn(
    baseControlClassName,
    select ? 'appearance-none pr-11 h-14' : multiline ? 'min-h-[132px] py-3' : 'h-14',
    type === 'date' && 'pr-4',
    error && 'border-danger focus:border-danger focus:ring-danger/10',
    className
  );

  return (
    <div className="w-full">
      {shouldShowLabel ? <label className="mb-2 block text-sm font-medium text-text-secondary">{label}</label> : null}
      <div className="relative">
        {select ? (
          <>
            <select className={controlClassName} value={props.value} onChange={props.onChange} disabled={props.disabled} name={props.name}>
              {children}
            </select>
            {SelectProps?.IconComponent ? (
              <SelectProps.IconComponent className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            ) : (
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            )}
          </>
        ) : multiline ? (
          <textarea className={controlClassName} rows={rows || 4} placeholder={resolvedPlaceholder} {...props} />
        ) : (
          <input className={cn(controlClassName, endAdornment && 'pr-12')} type={type} placeholder={resolvedPlaceholder} {...props} />
        )}
        {endAdornment ? <div className="absolute right-3 top-1/2 -translate-y-1/2">{endAdornment}</div> : null}
      </div>
      {helper ? <p className={cn('mt-2 text-sm', error ? 'text-danger' : 'text-text-muted')}>{helper}</p> : null}
    </div>
  );
}
