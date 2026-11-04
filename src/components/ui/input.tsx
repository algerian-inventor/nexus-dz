import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-slate-200/80 bg-white/70 backdrop-blur-xs px-3.5 py-2 text-sm text-nexus-navy ring-offset-background transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-nexus-gray/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-emerald/30 focus-visible:border-nexus-emerald/50 focus-visible:bg-white focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 shadow-2xs',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
