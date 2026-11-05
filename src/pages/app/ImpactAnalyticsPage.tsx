import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { BarChart2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { useDemoStore } from '@/data/demoStoreContext';
import { analyticsService } from '@/modules/analytics/service';

export function ImpactAnalyticsPage() {
  const { t } = useTranslation();
  const { dataset } = useDemoStore();

  const metrics = analyticsService.computeDashboardMetrics(dataset);
  const communeSeries = analyticsService.computeCommuneSeries(dataset, (key) =>
    t(`common.communes.${key}`)
  );
  const sectorSeries = analyticsService.computeSectorSeries(dataset, (key) => t(`sectors.${key}`));

  const hasAuditedData = metrics.totalBeneficiaries > 0 || metrics.totalVolunteerHours > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.analytics.title')}
        subtitle={t('pages.analytics.subtitle')}
        badgeText={t('brand.wilaya')}
      />

      {!hasAuditedData ? (
        <Card className="border-white/80 bg-white/75 backdrop-blur-md p-10 text-center space-y-4 shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-nexus-mint text-nexus-emerald-deep">
            <BarChart2 className="h-7 w-7" />
          </div>
          <div className="space-y-1.5 max-w-lg mx-auto">
            <Badge variant="emerald" className="bg-nexus-mint text-nexus-emerald-deep font-medium">
              Transparence & Données Réelles
            </Badge>
            <h3 className="text-lg font-semibold text-nexus-navy">
              {t('pages.analytics.emptyTitle')}
            </h3>
            <p className="text-xs text-nexus-gray leading-relaxed font-normal">
              {t('pages.analytics.emptyDesc')}
            </p>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-white/80 bg-white/70 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  {t('pages.analytics.chartCommuneTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 pt-2" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={communeSeries}
                    margin={{ top: 12, right: 16, left: 4, bottom: 24 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#E2E8F0"
                      vertical={false}
                      opacity={0.7}
                    />
                    <XAxis
                      dataKey="communeLabel"
                      tick={{ fontSize: 11, fill: '#475569' }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={48}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: '#64748B' }}
                      width={42}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        borderColor: 'rgba(226, 232, 240, 0.8)',
                        borderRadius: '0.75rem',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                        fontSize: '12px',
                        color: '#0F172A',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                    <Bar
                      dataKey="beneficiaries"
                      name={t('pages.dashboard.kpiBeneficiaries')}
                      fill="#0B8A44"
                      radius={[5, 5, 0, 0]}
                      opacity={0.92}
                    />
                    <Bar
                      dataKey="verifiedHours"
                      name={t('pages.dashboard.kpiHours')}
                      fill="#0F172A"
                      radius={[5, 5, 0, 0]}
                      opacity={0.88}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-white/80 bg-white/70 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  {t('pages.analytics.chartCategoryTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 pt-2" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sectorSeries}
                    margin={{ top: 12, right: 16, left: 4, bottom: 24 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#E2E8F0"
                      vertical={false}
                      opacity={0.7}
                    />
                    <XAxis
                      dataKey="sectorLabel"
                      tick={{ fontSize: 11, fill: '#475569' }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={48}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: '#64748B' }}
                      width={42}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        borderColor: 'rgba(226, 232, 240, 0.8)',
                        borderRadius: '0.75rem',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                        fontSize: '12px',
                        color: '#0F172A',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                    <Bar
                      dataKey="beneficiaries"
                      name={t('pages.dashboard.kpiBeneficiaries')}
                      fill="#0B8A44"
                      radius={[5, 5, 0, 0]}
                      opacity={0.92}
                    />
                    <Bar
                      dataKey="initiativesCount"
                      name={t('pages.dashboard.kpiInitiatives')}
                      fill="#0F172A"
                      radius={[5, 5, 0, 0]}
                      opacity={0.88}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Municipal Breakdown Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('pages.organizations.colCommune')}</TableHead>
                <TableHead>{t('pages.dashboard.kpiInitiatives')}</TableHead>
                <TableHead>{t('pages.dashboard.kpiHours')}</TableHead>
                <TableHead>{t('pages.dashboard.kpiBeneficiaries')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {communeSeries.map((row) => (
                <TableRow key={row.communeKey}>
                  <TableCell className="font-medium">{row.communeLabel}</TableCell>
                  <TableCell className="font-mono text-xs">{row.initiativesCount}</TableCell>
                  <TableCell className="font-mono text-xs font-medium text-nexus-navy">
                    {row.verifiedHours}h
                  </TableCell>
                  <TableCell className="font-mono text-xs font-semibold text-nexus-emerald">
                    {row.beneficiaries.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
