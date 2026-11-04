import { useTranslation } from 'react-i18next';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Info } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { analyticsService } from '@/modules/analytics/service';

export function ImpactAnalyticsPage() {
  const { t } = useTranslation();

  const communeSeries = analyticsService.getEmptyConstantineCommuneSeries((key) =>
    t(`common.communes.${key}`)
  );
  const sectorSeries = analyticsService.getEmptySectorSeries();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.analytics.title')}
        subtitle={t('pages.analytics.subtitle')}
        badgeText={t('brand.wilaya')}
      />

      <div className="flex items-start gap-2.5 rounded-lg border border-border bg-white p-4 text-xs text-nexus-gray">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-nexus-emerald" />
        <span>{t('pages.analytics.zeroDataNotice')}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('pages.analytics.chartCommuneTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={communeSeries} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="communeLabel" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip />
                <Bar dataKey="verifiedHours" fill="#0B8A44" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('pages.analytics.chartCategoryTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorSeries} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="sector" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0F172A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
