import { useTranslation } from 'react-i18next';
import { Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/env';
import { Badge } from '@/components/ui/badge';

export function SupabaseStatusBanner() {
  const { t } = useTranslation();

  if (isSupabaseConfigured) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-nexus-emerald/30 bg-nexus-emerald-light/60 px-4 py-3 text-sm text-nexus-navy">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-nexus-emerald" />
          <div>
            <p className="font-semibold text-nexus-navy">{t('status.supabaseConfiguredTitle')}</p>
            <p className="text-xs text-nexus-gray">{t('status.supabaseConfiguredDesc')}</p>
          </div>
        </div>
        <Badge variant="emerald">PostgreSQL + RLS Active</Badge>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm shadow-xs">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-nexus-navy text-white">
          <Database className="h-4 w-4" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-nexus-navy">
              {t('status.supabaseNotConfiguredTitle')}
            </p>
            <Badge variant="secondary" className="gap-1">
              <AlertCircle className="h-3 w-3 text-nexus-emerald" />
              {t('status.pendingConfiguration')}
            </Badge>
          </div>
          <p className="mt-0.5 text-xs text-nexus-gray">{t('status.supabaseNotConfiguredDesc')}</p>
        </div>
      </div>
      <code className="rounded bg-nexus-surface px-2.5 py-1 text-xs font-mono text-nexus-navy border border-border">
        .env.example &rarr; .env.local
      </code>
    </div>
  );
}
