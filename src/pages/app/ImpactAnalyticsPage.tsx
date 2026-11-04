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
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

  const communeSeries = analyticsService.computeCommuneSeries(dataset, (key) =>
    t(`common.communes.${key}`)
  );
  const sectorSeries = analyticsService.computeSectorSeries(dataset, (key) => t(`sectors.${key}`));

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.analytics.title')}
        subtitle={t('pages.analytics.subtitle')}
        badgeText={t('brand.wilaya')}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('pages.analytics.chartCommuneTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={communeSeries} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="communeLabel" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="beneficiaries"
                  name={t('pages.dashboard.kpiBeneficiaries')}
                  fill="#0B8A44"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="verifiedHours"
                  name={t('pages.dashboard.kpiHours')}
                  fill="#0F172A"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('pages.analytics.chartCategoryTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorSeries} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="sectorLabel" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="beneficiaries"
                  name={t('pages.dashboard.kpiBeneficiaries')}
                  fill="#0B8A44"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="initiativesCount"
                  name={t('pages.dashboard.kpiInitiatives')}
                  fill="#0F172A"
                  radius={[4, 4, 0, 0]}
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
              <TableCell className="font-semibold">{row.communeLabel}</TableCell>
              <TableCell className="font-mono">{row.initiativesCount}</TableCell>
              <TableCell className="font-mono font-semibold text-nexus-navy">
                {row.verifiedHours}h
              </TableCell>
              <TableCell className="font-mono font-bold text-nexus-emerald">
                {row.beneficiaries.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
