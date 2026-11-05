import { Link } from 'react-router-dom';
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
import {
  Building2,
  Compass,
  Users,
  ShieldCheck,
  CheckSquare,
  Clock,
  Award,
  ArrowUpRight,
  PlusCircle,
  FileCheck2,
  BarChart2,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDemoStore } from '@/data/demoStoreContext';
import { analyticsService } from '@/modules/analytics/service';

export function DashboardPage() {
  const { t } = useTranslation();
  const { dataset, activeRole } = useDemoStore();

  const metrics = analyticsService.computeDashboardMetrics(dataset);
  const communeSeries = analyticsService.computeCommuneSeries(dataset, (key) =>
    t(`common.communes.${key}`)
  );
  const sectorSeries = analyticsService.computeSectorSeries(dataset, (key) => t(`sectors.${key}`));

  const hasImpactData = metrics.totalBeneficiaries > 0 || metrics.totalVolunteerHours > 0;

  const kpis = [
    {
      label: t('pages.dashboard.kpiOrganizations'),
      value: `${metrics.verifiedOrganizations} / ${metrics.totalOrganizations}`,
      sub: 'Agréées / Total',
      icon: Building2,
      to: '/app/organizations',
    },
    {
      label: t('pages.dashboard.kpiVolunteers'),
      value: metrics.activeVolunteers,
      sub: 'Inscrits Wilaya 25',
      icon: Users,
      to: '/app/volunteers',
    },
    {
      label: t('pages.dashboard.kpiInitiatives'),
      value: metrics.totalInitiatives,
      sub: 'En cours ou publiées',
      icon: Compass,
      to: '/app/initiatives',
    },
    {
      label: t('pages.dashboard.kpiCompletedTasks'),
      value: `${metrics.completedActivities} / ${dataset.tasks.length}`,
      sub: 'Missions réalisées',
      icon: CheckSquare,
      to: '/app/tasks',
    },
    {
      label: t('pages.dashboard.kpiHours'),
      value: `${metrics.totalVolunteerHours}h`,
      sub: 'Heures certifiées',
      icon: Clock,
      to: '/app/volunteers',
    },
    {
      label: t('pages.dashboard.kpiBeneficiaries'),
      value: metrics.totalBeneficiaries.toLocaleString(),
      sub: 'Bénéficiaires audités',
      icon: Award,
      to: '/app/analytics',
    },
    {
      label: t('pages.dashboard.kpiPendingVerification'),
      value: metrics.pendingVerification,
      sub: 'Preuves à auditer',
      icon: ShieldCheck,
      to: '/app/verification',
    },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title={t('pages.dashboard.title')}
        subtitle={t('pages.dashboard.subtitle')}
        badgeText={t(`roles.${activeRole}`)}
        actions={
          <Button
            size="sm"
            asChild
            className="bg-nexus-emerald hover:bg-nexus-emerald-deep text-white shadow-xs"
          >
            <Link to="/app/initiatives">
              <PlusCircle className="h-4 w-4" />
              {t('pages.dashboard.startInitiative')}
            </Link>
          </Button>
        }
      />

      {/* 7 KPI Cards — Authentic Values from Active Dataset */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isAlert = kpi.to === '/app/verification' && Number(metrics.pendingVerification) > 0;
          return (
            <Link key={kpi.label} to={kpi.to} className="group block">
              <Card
                className={`h-full border-white/75 bg-white/70 backdrop-blur-md transition-all duration-200 group-hover:bg-white/85 group-hover:shadow-[0_8px_25px_-5px_rgba(7,91,53,0.12)] ${
                  isAlert
                    ? 'border-nexus-red/30 group-hover:border-nexus-red/60'
                    : 'group-hover:border-nexus-emerald/40'
                }`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                  <CardTitle className="text-xs font-medium leading-snug text-nexus-gray">
                    {kpi.label}
                  </CardTitle>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isAlert
                        ? 'bg-nexus-red/10 text-nexus-red group-hover:bg-nexus-red group-hover:text-white'
                        : 'bg-nexus-mint text-nexus-emerald-deep group-hover:bg-nexus-emerald group-hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-semibold tracking-tight text-nexus-navy">
                      {kpi.value}
                    </span>
                    {isAlert && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-nexus-red/25 bg-nexus-red-light/80 px-1.5 py-0.5 text-[10px] font-medium text-nexus-red">
                        <span className="h-1.5 w-1.5 rounded-full bg-nexus-red animate-pulse" />
                        Audit
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] font-normal text-nexus-gray/90">{kpi.sub}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Honest Coordination Welcome State (When dataset is in baseline pilot phase) */}
      {dataset.initiatives.length === 0 && (
        <Card className="border-nexus-emerald/20 bg-white/80 backdrop-blur-md p-6 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="emerald" className="bg-nexus-mint text-nexus-emerald-deep">
                  Dispositif Pilote Actif
                </Badge>
                <h3 className="text-base font-semibold text-nexus-navy">
                  {t('pages.dashboard.emptyStateTitle')}
                </h3>
              </div>
              <p className="text-xs font-normal leading-relaxed text-nexus-gray max-w-3xl">
                {t('pages.dashboard.emptyStateDesc')}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button
                size="sm"
                asChild
                className="bg-nexus-emerald hover:bg-nexus-emerald-deep text-white text-xs"
              >
                <Link to="/app/initiatives">
                  <Compass className="h-3.5 w-3.5" />
                  Créer une initiative
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild className="text-xs">
                <Link to="/app/organizations">
                  <Building2 className="h-3.5 w-3.5" />
                  Associations
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Live Visualizations or Honest Baseline Status */}
      {hasImpactData ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/80 bg-white/70 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                {t('pages.analytics.chartCommuneTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80 pt-2" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={communeSeries} margin={{ top: 12, right: 16, left: 4, bottom: 24 }}>
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
                <BarChart data={sectorSeries} margin={{ top: 12, right: 16, left: 4, bottom: 24 }}>
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
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-white/80 bg-white/70 backdrop-blur-md p-8 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-nexus-mint text-nexus-emerald-deep">
            <BarChart2 className="h-6 w-6" />
          </div>
          <h4 className="text-base font-semibold text-nexus-navy">
            {t('pages.analytics.emptyTitle')}
          </h4>
          <p className="text-xs text-nexus-gray max-w-lg mx-auto leading-relaxed font-normal">
            {t('pages.analytics.emptyDesc')}
          </p>
        </Card>
      )}

      {/* Pending Evidence Section */}
      <Card className="border-white/80 bg-white/70 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">
            {t('pages.dashboard.pendingEvidenceTitle')}
          </CardTitle>
          <Button variant="ghost" size="sm" asChild className="text-xs text-nexus-emerald-deep">
            <Link to="/app/verification">
              {t('nav.verification')}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {dataset.evidence.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
              <FileCheck2 className="h-8 w-8 text-slate-300" />
              <p className="text-xs text-nexus-gray">{t('pages.dashboard.noPendingEvidence')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {dataset.evidence.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white/60 p-3 text-xs"
                >
                  <div>
                    <p className="font-semibold text-nexus-navy">{ev.titleFr || ev.titleAr}</p>
                    <p className="text-[11px] text-nexus-gray">{ev.submittedByName}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {t(`statuses.${ev.verificationStatus}`)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
