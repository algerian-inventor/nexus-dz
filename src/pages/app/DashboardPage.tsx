import { Link, useNavigate } from 'react-router-dom';
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
  Play,
  ArrowUpRight,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDemoStore } from '@/data/demoStoreContext';
import { analyticsService } from '@/modules/analytics/service';
import type { UserRole } from '@/data/demoTypes';

export function DashboardPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { dataset, activeRole, switchRole } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const metrics = analyticsService.computeDashboardMetrics(dataset);
  const communeSeries = analyticsService.computeCommuneSeries(dataset, (key) =>
    t(`common.communes.${key}`)
  );
  const sectorSeries = analyticsService.computeSectorSeries(dataset, (key) => t(`sectors.${key}`));

  const kpis = [
    {
      label: t('pages.dashboard.kpiOrganizations'),
      value: `${metrics.verifiedOrganizations} / ${metrics.totalOrganizations}`,
      sub: 'Verified / Total',
      icon: Building2,
      to: '/app/organizations',
    },
    {
      label: t('pages.dashboard.kpiVolunteers'),
      value: metrics.activeVolunteers,
      sub: 'Constantine 25',
      icon: Users,
      to: '/app/volunteers',
    },
    {
      label: t('pages.dashboard.kpiInitiatives'),
      value: metrics.totalInitiatives,
      sub: '7 Communes',
      icon: Compass,
      to: '/app/initiatives',
    },
    {
      label: t('pages.dashboard.kpiCompletedTasks'),
      value: `${metrics.completedActivities} / ${dataset.tasks.length}`,
      sub: 'Completed / Total',
      icon: CheckSquare,
      to: '/app/tasks',
    },
    {
      label: t('pages.dashboard.kpiHours'),
      value: `${metrics.totalVolunteerHours}h`,
      sub: 'Certified Hours',
      icon: Clock,
      to: '/app/volunteers',
    },
    {
      label: t('pages.dashboard.kpiBeneficiaries'),
      value: metrics.totalBeneficiaries.toLocaleString(),
      sub: 'Verified Impact',
      icon: Award,
      to: '/app/analytics',
    },
    {
      label: t('pages.dashboard.kpiPendingVerification'),
      value: metrics.pendingVerification,
      sub: 'Awaiting Audit',
      icon: ShieldCheck,
      to: '/app/verification',
    },
  ];

  const scenarioSteps: {
    step: number;
    labelAr: string;
    labelFr: string;
    role: UserRole;
    path: string;
  }[] = [
    {
      step: 1,
      labelAr: '1-2. مدير النظام: مراجعة واعتماد الجمعيات المسجلة',
      labelFr: '1-2. Super Admin : Examiner et valider les associations',
      role: 'super_admin',
      path: '/app/organizations',
    },
    {
      step: 2,
      labelAr: '3-4. مسؤول جمعية: إنشاء مبادرة مجتمعية جديدة',
      labelFr: '3-4. Admin Association : Créer une initiative citoyenne',
      role: 'organization_admin',
      path: '/app/initiatives',
    },
    {
      step: 3,
      labelAr: '5-6. متطوع ميداني: الترشح للانضمام للمبادرة',
      labelFr: '5-6. Bénévole : Postuler à l’initiative',
      role: 'volunteer',
      path: '/app/initiatives',
    },
    {
      step: 4,
      labelAr: '7-8. مسؤول جمعية: تكليف مهمة وتسجيل حضور المتطوع',
      labelFr: '7-8. Admin Association : Assigner tâche & présence',
      role: 'organization_admin',
      path: '/app/tasks',
    },
    {
      step: 5,
      labelAr: '9. رفع الدليل الميداني والصور (التوثيق)',
      labelFr: '9. Téléverser une preuve terrain (Documentation)',
      role: 'organization_admin',
      path: '/app/documentation',
    },
    {
      step: 6,
      labelAr: '10-12. مدقق الأثر: المصادقة على الدليل وتحديث لوحة القيادة',
      labelFr: '10-12. Vérificateur : Approuver la preuve & voir l’impact',
      role: 'verifier',
      path: '/app/verification',
    },
  ];

  const handleJumpStep = (role: UserRole, path: string) => {
    switchRole(role);
    navigate(path);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.dashboard.title')}
        subtitle={t('pages.dashboard.subtitle')}
        badgeText={t(`roles.${activeRole}`)}
      />

      {/* 7 KPI Cards — Balanced Responsive Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link key={kpi.label} to={kpi.to} className="group block">
              <Card className="h-full transition-all duration-150 group-hover:border-nexus-emerald group-hover:shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                  <CardTitle className="text-xs font-medium leading-snug text-nexus-gray">
                    {kpi.label}
                  </CardTitle>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-nexus-emerald-light text-nexus-emerald transition-colors group-hover:bg-nexus-emerald group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-1">
                  <div className="text-xl font-bold tracking-tight text-nexus-navy">
                    {kpi.value}
                  </div>
                  <p className="mt-1 text-[11px] font-medium text-nexus-gray">{kpi.sub}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Interactive 12-Step Hackathon Presentation Launcher */}
      <Card className="border-nexus-emerald/30 bg-white">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base">{t('pages.dashboard.scenarioTitle')}</CardTitle>
            <Badge variant="emerald">12-Step Live Demo Flow</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {scenarioSteps.map((s) => (
              <div
                key={s.step}
                className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-nexus-surface p-4 transition-colors hover:border-nexus-emerald/40"
              >
                <div className="space-y-1.5">
                  <Badge variant="outline" className="text-[11px]">
                    {t(`roles.${s.role}`)}
                  </Badge>
                  <p className="text-xs font-semibold leading-relaxed text-nexus-navy">
                    {isAr ? s.labelAr : s.labelFr}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-full justify-between text-xs"
                  onClick={() => handleJumpStep(s.role, s.path)}
                >
                  <span className="flex items-center gap-1.5">
                    <Play className="h-3.5 w-3.5 text-nexus-emerald" />
                    {t('auth.quickEnterBtn')}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Recharts Visualizations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t('pages.analytics.chartCommuneTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-2" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={communeSeries} margin={{ top: 12, right: 16, left: 4, bottom: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="communeLabel"
                  tick={{ fontSize: 11, fill: '#334155' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={48}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} width={42} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#0F172A',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
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
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t('pages.analytics.chartCategoryTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-2" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorSeries} margin={{ top: 12, right: 16, left: 4, bottom: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="sectorLabel"
                  tick={{ fontSize: 11, fill: '#334155' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={48}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} width={42} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#0F172A',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar
                  dataKey="beneficiaries"
                  name={t('pages.dashboard.kpiBeneficiaries')}
                  fill="#0B8A44"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
