import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/PageHeader';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { administrationService } from '@/modules/administration/service';

export function SettingsPage() {
  const { t } = useTranslation();
  const diagnostics = administrationService.getDiagnosticSummary();

  return (
    <div className="space-y-6">
      <PageHeader title={t('pages.settings.title')} subtitle={t('pages.settings.subtitle')} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('pages.settings.localeSection')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <LanguageSwitcher />
            <p className="text-xs text-nexus-gray">{t('common.direction')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('pages.settings.envSection')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="font-mono text-nexus-gray">VITE_SUPABASE_URL</span>
              <Badge variant={diagnostics.urlProvided ? 'emerald' : 'secondary'}>
                {diagnostics.urlProvided ? 'Configured' : 'Not Set'}
              </Badge>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="font-mono text-nexus-gray">VITE_SUPABASE_ANON_KEY</span>
              <Badge variant={diagnostics.anonKeyProvided ? 'emerald' : 'secondary'}>
                {diagnostics.anonKeyProvided ? 'Configured' : 'Not Set'}
              </Badge>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-nexus-gray">Storage Buckets</span>
              <span className="font-mono text-nexus-navy">
                {diagnostics.buckets.evidence}, {diagnostics.buckets.organizationDocs},{' '}
                {diagnostics.buckets.avatars}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
