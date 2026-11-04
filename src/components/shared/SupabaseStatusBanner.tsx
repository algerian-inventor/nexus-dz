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
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-nexus-emerald/30 bg-white px-4 py-3 text-sm shadow-xs">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-nexus-emerald text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-nexus-navy">{t('demoBanner.title')}</p>
              <Badge variant="emerald">{t('demoBanner.badge')}</Badge>
              <Badge variant="outline" className="text-xs">
                {isAr ? currentAccount.fullNameAr : currentAccount.fullNameFr}
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-nexus-gray">{t('demoBanner.desc')}</p>
          </div>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={resetDemoData}
          className="h-8 text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t('demoBanner.resetBtn')}
        </Button>
      </div>

      {feedbackBanner && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-nexus-emerald bg-nexus-emerald-light px-4 py-2.5 text-xs font-medium text-nexus-emerald-dark">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-nexus-emerald" />
            <span>{feedbackBanner.message}</span>
          </div>
          <button
            type="button"
            onClick={clearFeedback}
            className="rounded p-0.5 hover:bg-nexus-emerald/15"
            aria-label="Close notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
