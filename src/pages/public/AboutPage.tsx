import { useTranslation } from 'react-i18next';
import { Shield, MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';

export function AboutPage() {
  const { t } = useTranslation();

  const governanceRules = [t('about.gov1'), t('about.gov2'), t('about.gov3')];

  return (
    <div className="container space-y-8 py-10">
      <PageHeader
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        badgeText={t('brand.wilaya')}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-nexus-emerald-light text-nexus-emerald">
              <Shield className="h-5 w-5" />
            </div>
            <CardTitle>{t('about.missionTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-nexus-gray">{t('about.missionBody')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-nexus-emerald-light text-nexus-emerald">
              <MapPin className="h-5 w-5" />
            </div>
            <CardTitle>{t('about.scopeTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-nexus-gray">{t('about.scopeBody')}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('about.governanceTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {governanceRules.map((rule) => (
            <div key={rule} className="flex items-center gap-3 text-sm text-nexus-navy">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-nexus-emerald" />
              <span>{rule}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
