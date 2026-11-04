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
    <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-nexus-navy">{title}</h1>
          {badgeText && <Badge variant="emerald">{badgeText}</Badge>}
        </div>
        <p className="text-sm text-nexus-gray">{subtitle}</p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
