import { useTranslation } from 'react-i18next';
import { RotateCcw, ShieldCheck, Globe, Database } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDemoStore } from '@/data/demoStoreContext';

export function SettingsPage() {
  const { t } = useTranslation();
  const { dataset, activeRole, resetDemoData } = useDemoStore();

  return (
    <div className="space-y-6">
      <PageHeader title={t('pages.settings.title')} subtitle={t('pages.settings.subtitle')} />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Language Selection Card */}
        <Card className="border-white/80 bg-white/75 backdrop-blur-md shadow-xs">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-nexus-emerald" />
              <CardTitle className="text-base font-semibold text-nexus-navy">
                {t('pages.settings.languageSection')}
              </CardTitle>
            </div>
            <CardDescription className="text-xs">{t('common.direction')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LanguageSwitcher />
          </CardContent>
        </Card>

        {/* Prototype Session Status (No false secure session claims) */}
        <Card className="border-white/80 bg-white/75 backdrop-blur-md shadow-xs">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-nexus-emerald" />
              <CardTitle className="text-base font-semibold text-nexus-navy">
                {t('pages.settings.pilotStatus')}
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              {t('pages.settings.pilotStatusDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                variant="emerald"
                className="bg-nexus-mint text-nexus-emerald-deep font-semibold"
              >
                {t(`roles.${activeRole}`)}
              </Badge>
              <span className="text-xs text-nexus-gray font-mono">{t('prototype.modeBadge')}</span>
            </div>
            <p className="text-xs leading-relaxed text-nexus-gray font-normal">
              {t('prototype.localStorageNotice')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Integrity & Local Storage Management */}
      <Card className="border-white/80 bg-white/75 backdrop-blur-md shadow-xs">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-nexus-emerald" />
            <CardTitle className="text-base font-semibold text-nexus-navy">
              {t('pages.settings.dataPolicyTitle')}
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            {t('pages.settings.dataPolicyDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-nexus-gray bg-white/60 p-3 rounded-xl border border-slate-200/60">
            <span>
              {t('nav.organizations')} : {dataset.organizations.length}
            </span>
            <span>•</span>
            <span>
              {t('nav.volunteers')} : {dataset.volunteers.length}
            </span>
            <span>•</span>
            <span>
              {t('nav.initiatives')} : {dataset.initiatives.length}
            </span>
            <span>•</span>
            <span>
              {t('nav.tasks')} : {dataset.tasks.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200/60 pt-4">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-nexus-navy">
                {t('pages.settings.resetTitle')}
              </p>
              <p className="text-[11px] text-nexus-gray">{t('pages.settings.resetDesc')}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetDemoData}
              className="border-slate-300 text-xs text-nexus-navy hover:bg-slate-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t('pages.settings.resetBtn')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
