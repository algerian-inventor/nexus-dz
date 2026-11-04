import { useTranslation } from 'react-i18next';
import { Sparkles, RotateCcw, CheckCircle2, X } from 'lucide-react';
import { useDemoStore } from '@/data/demoStoreContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function SupabaseStatusBanner() {
  const { t, i18n } = useTranslation();
  const { currentAccount, feedbackBanner, clearFeedback, resetDemoData } = useDemoStore();
  const isAr = i18n.language === 'ar';

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-sm shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-nexus-emerald/90 text-white shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-nexus-navy">{t('demoBanner.title')}</p>
              <Badge
                variant="emerald"
                className="bg-nexus-emerald/10 text-nexus-emerald border-nexus-emerald/20 text-[11px] font-medium"
              >
                {t('demoBanner.badge')}
              </Badge>
              <Badge
                variant="outline"
                className="border-slate-200/80 bg-white/60 text-xs font-normal"
              >
                {isAr ? currentAccount.fullNameAr : currentAccount.fullNameFr}
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-nexus-gray font-normal">{t('demoBanner.desc')}</p>
          </div>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={resetDemoData}
          className="h-8 text-xs font-normal border-slate-200/80 bg-white/80 hover:bg-white"
        >
          <RotateCcw className="h-3.5 w-3.5 opacity-70" />
          {t('demoBanner.resetBtn')}
        </Button>
      </div>

      {feedbackBanner && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-nexus-emerald/20 bg-nexus-emerald-light/60 px-4 py-2.5 text-xs font-medium text-nexus-emerald-dark backdrop-blur-sm shadow-xs">
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
