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
    <div className="space-y-7">
      <PageHeader
        title={t('pages.dashboard.title')}
        subtitle={t('pages.dashboard.subtitle')}
        badgeText={t(`roles.${activeRole}`)}
      />

      {/* 7 KPI Cards — Refined Frosted Glass Appearance */}
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
                        : 'bg-emerald-500/10 text-nexus-emerald group-hover:bg-nexus-emerald group-hover:text-white'
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

      {/* Interactive 12-Step Hackathon Presentation Launcher */}
      <Card className="relative overflow-hidden border-white/80 bg-white/70 backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 bg-zellij-subtle opacity-35" />
        <CardHeader className="relative pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base font-semibold">
              {t('pages.dashboard.scenarioTitle')}
            </CardTitle>
            <Badge
              variant="emerald"
              className="bg-nexus-emerald/10 text-nexus-emerald border-nexus-emerald/20 font-medium"
            >
              12-Step Live Demo Flow
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {scenarioSteps.map((s) => (
              <div
                key={s.step}
                className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200/60 bg-white/60 p-4 backdrop-blur-xs transition-all duration-150 hover:bg-white/85 hover:border-nexus-emerald/40 hover:shadow-xs"
              >
                <div className="space-y-1.5">
                  <Badge
                    variant="outline"
                    className="border-slate-200 bg-white/70 text-[11px] font-normal"
                  >
                    {t(`roles.${s.role}`)}
                  </Badge>
                  <p className="text-xs font-medium leading-relaxed text-nexus-navy">
                    {isAr ? s.labelAr : s.labelFr}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-full justify-between text-xs font-normal border-slate-200/80 bg-white/80 hover:bg-white"
                  onClick={() => handleJumpStep(s.role, s.path)}
                >
                  <span className="flex items-center gap-1.5">
                    <Play className="h-3.5 w-3.5 text-nexus-emerald" />
                    {t('auth.quickEnterBtn')}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Recharts Visualizations */}
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
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} width={42} />
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
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} width={42} />
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
    </div>
  );
}
