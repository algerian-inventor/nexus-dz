import { useTranslation } from 'react-i18next';
import { Building2, Compass, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
import { administrationService } from '@/modules/administration/service';
import { useAuthContext } from '@/modules/auth/context';

export function DashboardPage() {
  const { t } = useTranslation();
  const { activeRole } = useAuthContext();
  const readinessManifest = administrationService.getModuleReadinessManifest();

  const kpis = [
    {
      label: t('pages.dashboard.kpiOrganizations'),
      icon: Building2,
      table: 'public.organizations',
    },
    {
      label: t('pages.dashboard.kpiInitiatives'),
      icon: Compass,
      table: 'public.initiatives',
    },
    {
      label: t('pages.dashboard.kpiVolunteers'),
      icon: Users,
      table: 'public.profiles',
    },
    {
      label: t('pages.dashboard.kpiVerification'),
      icon: ShieldCheck,
      table: 'public.verification_audits',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.dashboard.title')}
        subtitle={t('pages.dashboard.subtitle')}
        badgeText={t(`roles.${activeRole}`)}
      />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.table}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-nexus-gray">{kpi.label}</CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-nexus-emerald-light text-nexus-emerald">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="text-2xl font-bold text-nexus-navy">0</div>
                <p className="text-[11px] font-mono text-nexus-gray">
                  {t('pages.dashboard.awaitingDb')} ({kpi.table})
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Architectural Readiness Manifest */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-nexus-navy">
          {t('pages.dashboard.systemReadiness')}
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('pages.dashboard.moduleCol')}</TableHead>
              <TableHead>{t('pages.dashboard.tableCol')}</TableHead>
              <TableHead>{t('pages.dashboard.rlsCol')}</TableHead>
              <TableHead>{t('pages.dashboard.statusCol')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readinessManifest.map((item) => (
              <TableRow key={item.moduleKey}>
                <TableCell className="font-medium">{item.moduleName}</TableCell>
                <TableCell>
                  <code className="rounded bg-nexus-surface px-2 py-0.5 font-mono text-xs text-nexus-navy">
                    {item.tableName}
                  </code>
                </TableCell>
                <TableCell className="text-xs text-nexus-gray">{item.rlsPolicyName}</TableCell>
                <TableCell>
                  <Badge variant="emerald">
                    <CheckCircle2 className="h-3 w-3" />
                    {t('status.architectureReady')}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
