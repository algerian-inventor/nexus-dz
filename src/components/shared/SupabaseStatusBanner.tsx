import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, CheckCircle2, X, ArrowUpRight } from 'lucide-react';
import { useDemoStore } from '@/data/demoStoreContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function SupabaseStatusBanner() {
  const { t } = useTranslation();
  const { feedbackBanner, clearFeedback } = useDemoStore();

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/80 bg-white/75 px-4 py-3 text-sm shadow-[0_4px_20px_-4px_rgba(7,91,53,0.06)] backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-nexus-emerald text-white shadow-xs">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-nexus-navy">{t('pilotBanner.title')}</p>
              <Badge
                variant="emerald"
                className="bg-nexus-mint/80 text-nexus-emerald-deep border-nexus-emerald/30 text-[11px] font-medium"
              >
                {t('pilotBanner.badge')}
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-nexus-gray font-normal leading-relaxed">
              {t('pilotBanner.desc')}
            </p>
          </div>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          asChild
          className="h-8 text-xs font-normal border-nexus-emerald/30 bg-white/90 hover:bg-white text-nexus-emerald-deep shadow-2xs"
        >
          <Link to="/register">
            {t('pilotBanner.action')}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {feedbackBanner && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-nexus-emerald/20 bg-nexus-mint/70 px-4 py-2.5 text-xs font-medium text-nexus-emerald-deep backdrop-blur-sm shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-nexus-emerald" />
            <span>{feedbackBanner.message}</span>
          </div>
          <button
            type="button"
            onClick={clearFeedback}
            className="rounded p-0.5 hover:bg-nexus-emerald/15 transition-colors"
            aria-label="Close notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
