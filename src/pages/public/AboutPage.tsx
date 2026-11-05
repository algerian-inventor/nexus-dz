import { useTranslation } from 'react-i18next';
import { Shield, MapPin, CheckCircle2, Scale } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { SupabaseStatusBanner } from '@/components/shared/SupabaseStatusBanner';

export function AboutPage() {
  const { t } = useTranslation();

  const governanceRules = [t('about.gov1'), t('about.gov2'), t('about.gov3'), t('about.gov4')];

  return (
    <div className="container space-y-8 py-10">
      <SupabaseStatusBanner />

      <PageHeader
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        badgeText={t('brand.wilaya')}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-white/80 bg-white/75 backdrop-blur-md shadow-xs">
          <CardHeader>
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-nexus-mint text-nexus-emerald-deep">
              <Shield className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-semibold text-nexus-navy">
              {t('about.missionTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-nexus-gray font-normal">
              {t('about.missionBody')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/80 bg-white/75 backdrop-blur-md shadow-xs">
          <CardHeader>
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-nexus-mint text-nexus-emerald-deep">
              <MapPin className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-semibold text-nexus-navy">
              {t('about.scopeTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-nexus-gray font-normal">
              {t('about.scopeBody')}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/80 bg-white/75 backdrop-blur-md shadow-xs">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-nexus-emerald" />
            <CardTitle className="text-base font-semibold text-nexus-navy">
              {t('about.governanceTitle')}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {governanceRules.map((rule) => (
            <div
              key={rule}
              className="flex items-start gap-3 text-xs leading-relaxed text-nexus-navy"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-nexus-emerald" />
              <span className="font-normal">{rule}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
