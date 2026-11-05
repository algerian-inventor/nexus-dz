import { useTranslation } from 'react-i18next';
import {
  FolderLock,
  Building2,
  CheckCircle2,
  XCircle,
  History,
  Users,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { useDemoStore } from '@/data/demoStoreContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function AdminPortalPage() {
  const { t, i18n } = useTranslation();
  const { dataset, updateOrganizationStatus } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const sessionLogs = dataset.sessionLogs ?? [];

  return (
    <div className="space-y-6">
      {/* Prototype Non-Affiliation & LocalStorage Notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50/90 p-4 text-xs text-amber-950 shadow-2xs">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
        <p className="leading-relaxed">
          {t('prototype.noAffiliationNotice')} — {t('prototype.localStorageNotice')}
        </p>
      </div>

      {/* Super Admin Header */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#042E1E] via-[#06452D] to-[#075B35] p-6 text-white shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-Hero opacity-25" />
        <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              <FolderLock className="h-3.5 w-3.5" />
              <span>{t('v5portals.admin.badge')}</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {t('v5portals.admin.title')}
            </h1>
            <p className="text-xs text-emerald-100/80">{t('v5portals.admin.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Governance Metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-nexus-gray">{t('v5portals.admin.kpiDraftOrgs')}</span>
              <Building2 className="h-4 w-4 text-nexus-emerald" />
            </div>
            <p className="mt-2 text-2xl font-bold text-nexus-navy">
              {dataset.organizations.length}
            </p>
            <p className="mt-1 text-[11px] text-nexus-gray">
              {t('v5portals.admin.kpiDraftOrgsSub')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-nexus-gray">{t('v5portals.admin.kpiDraftVols')}</span>
              <Users className="h-4 w-4 text-nexus-emerald" />
            </div>
            <p className="mt-2 text-2xl font-bold text-nexus-navy">{dataset.volunteers.length}</p>
            <p className="mt-1 text-[11px] text-nexus-gray">
              {t('v5portals.admin.kpiDraftVolsSub')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-nexus-gray">{t('v5portals.admin.kpiEnvMode')}</span>
              <FolderLock className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-2 text-lg font-bold text-amber-800">
              {t('v5portals.admin.kpiEnvModeValue')}
            </p>
            <p className="mt-1 text-[11px] text-nexus-gray">{t('v5portals.admin.kpiEnvModeSub')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Association Drafts Review */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-nexus-navy">
              {t('v5portals.admin.orgVerification')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dataset.organizations.length === 0 ? (
              <p className="text-xs text-nexus-gray py-8 text-center">
                {t('v5portals.admin.emptyOrgs')}
              </p>
            ) : (
              dataset.organizations.map((org) => (
                <div
                  key={org.id}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-nexus-border bg-white/80 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-sm text-nexus-navy">
                        {isAr ? org.nameAr : org.nameFr}
                      </p>
                      <p className="text-xs text-nexus-gray font-mono mt-0.5">
                        {org.registrationNumber} • {t(`common.communes.${org.commune}`)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        org.verificationStatus === 'under_review'
                          ? 'secondary'
                          : org.verificationStatus === 'rejected'
                            ? 'red'
                            : 'outline'
                      }
                    >
                      {t(`statuses.${org.verificationStatus}`)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {org.verificationStatus !== 'under_review' && (
                      <Button
                        size="sm"
                        onClick={() => updateOrganizationStatus(org.id, 'under_review')}
                        className="bg-nexus-emerald text-white text-xs gap-1"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {t('v5portals.admin.markUnderReviewBtn')}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      disabled
                      className="bg-slate-200 text-slate-500 text-xs gap-1 cursor-not-allowed"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      {t('v5portals.admin.officialAccreditationDisabled')}
                    </Button>
                    {org.verificationStatus !== 'rejected' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrganizationStatus(org.id, 'rejected')}
                        className="border-nexus-red/40 text-nexus-red text-xs gap-1"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        {t('v5portals.admin.rejectBtn')}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Local Session Event Logs (Explicitly Non-Immutable localStorage) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-nexus-emerald" />
              <CardTitle className="text-base font-bold text-nexus-navy">
                {t('v5portals.admin.auditLogs')}
              </CardTitle>
            </div>
            <Badge variant="secondary">localStorage</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-amber-300/80 bg-amber-50/70 p-3 text-[11px] text-amber-950 leading-relaxed">
              {t('v5portals.admin.auditLogsDisclaimer')}
            </div>

            {sessionLogs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-nexus-border p-8 text-center">
                <p className="text-xs text-nexus-gray">{t('v5portals.admin.emptyLogs')}</p>
              </div>
            ) : (
              sessionLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-nexus-border bg-white/70 p-3.5 text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-nexus-navy font-mono">{log.action}</p>
                    <p className="text-[11px] text-nexus-gray">{log.details}</p>
                    <p className="text-[10px] text-nexus-emerald-deep font-medium">
                      {t(`roles.${log.actorRole}`)}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-nexus-gray shrink-0">
                    {log.timestamp.slice(0, 19).replace('T', ' ')}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
