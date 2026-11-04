import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badgeText?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, badgeText, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200/70 pb-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1.5 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-xl font-semibold tracking-tight text-nexus-navy sm:text-2xl">
            {title}
          </h1>
          {badgeText && <Badge variant="emerald">{badgeText}</Badge>}
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-nexus-gray">{subtitle}</p>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
