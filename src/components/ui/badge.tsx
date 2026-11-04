import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium leading-tight transition-colors [&_svg]:size-3 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-nexus-emerald text-white shadow-2xs',
        emerald:
          'border-nexus-emerald/25 bg-nexus-mint/70 text-nexus-emerald-deep font-semibold backdrop-blur-xs',
        navy: 'border-transparent bg-nexus-navy text-white shadow-2xs',
        red: 'border-nexus-red/30 bg-nexus-red-light/80 text-nexus-red font-semibold backdrop-blur-xs',
        secondary: 'border-border/60 bg-white/70 text-nexus-navy/80 backdrop-blur-xs',
        outline: 'border-border/80 text-nexus-navy bg-white/80 backdrop-blur-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
