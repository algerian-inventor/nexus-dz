import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  MapPin,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { useDemoStore } from '@/data/demoStoreContext';
import { validateEvidenceReview } from '@/modules/auth/service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function VerificationPortalPage() {
  const { t, i18n } = useTranslation();
  const { dataset, activeRole, currentAccount, reviewEvidence } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const [notesMap, setNotesMap] = useState<Record<string, string>>({});

  const pendingEvidence = dataset.evidence.filter((e) => e.verificationStatus === 'pending');
  const reviewedEvidence = dataset.evidence.filter((e) => e.verificationStatus !== 'pending');

  const handleDecision = (evId: string, decision: 'under_review' | 'rejected') => {
    const note = notesMap[evId] || t(`statuses.${decision}`);
    reviewEvidence(evId, decision, note);
    setNotesMap((prev) => ({ ...prev, [evId]: '' }));
  };

  return (
    <div className="space-y-6">
      {/* Mandatory Disabled Certification Banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-400/70 bg-amber-50 p-4 text-xs text-amber-950 shadow-2xs">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-950">{t('prototype.certificationDisabledTitle')}</p>
          <p className="leading-relaxed text-amber-900/90">
            {t('prototype.certificationDisabledDesc')}
          </p>
        </div>
      </div>

      {/* Verifier Header */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#042E1E] via-[#06452D] to-[#075B35] p-6 text-white shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-Hero opacity-25" />
        <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{t('v5portals.verifier.badge')}</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {t('v5portals.verifier.title')}
            </h1>
            <p className="text-xs text-emerald-100/80">{t('v5portals.verifier.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-950/60 px-4 py-2 text-center">
              <span className="block text-[10px] text-emerald-300">
                {t('v5portals.verifier.pendingQueue')}
              </span>
              <span className="text-lg font-bold text-white">{pendingEvidence.length}</span>
            </div>
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-950/60 px-4 py-2 text-center">
              <span className="block text-[10px] text-emerald-300">
                {t('v5portals.verifier.approvedHistory')}
              </span>
              <span className="text-lg font-bold text-emerald-400">{reviewedEvidence.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Evidence Queue */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-nexus-navy">
              {t('v5portals.verifier.pendingQueue')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingEvidence.length === 0 ? (
              <div className="rounded-xl border border-dashed border-nexus-border p-8 text-center">
                <ShieldCheck className="mx-auto h-8 w-8 text-nexus-emerald/50 mb-2" />
                <p className="text-xs text-nexus-gray">{t('v5portals.verifier.emptyQueue')}</p>
              </div>
            ) : (
              pendingEvidence.map((ev) => {
                const init = dataset.initiatives.find((i) => i.id === ev.initiativeId);
                const reviewCheck = validateEvidenceReview({
                  activeRole,
                  reviewerAccountId: currentAccount.id,
                  reviewerOrgId: currentAccount.organizationId,
                  evidenceSubmittedByAccountId: ev.submittedByAccountId,
                  evidenceSubmittedByOrgId: ev.submittedByOrgId ?? init?.organizationId,
                  decision: 'under_review',
                  hasBackendVerifierIsolation: false,
                });

                return (
                  <div
                    key={ev.id}
                    className="rounded-xl border border-nexus-border bg-white/80 p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm text-nexus-navy">
                          {isAr ? ev.titleAr : ev.titleFr}
                        </h3>
                        <p className="text-xs text-nexus-gray mt-0.5">
                          {init ? (isAr ? init.titleAr : init.titleFr) : ev.initiativeId}
                        </p>
                      </div>
                      <Badge variant="secondary">{t(`statuses.${ev.verificationStatus}`)}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 rounded-lg bg-nexus-bg/60 p-2.5 text-xs">
                      <div className="flex items-center gap-1.5 text-nexus-gray">
                        <FileText className="h-3.5 w-3.5 text-nexus-emerald" />
                        <span className="truncate font-mono">{ev.fileName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-nexus-gray">
                        <MapPin className="h-3.5 w-3.5 text-nexus-emerald" />
                        <span className="truncate">{ev.gpsCoordinates}</span>
                      </div>
                      <div className="col-span-2 font-semibold text-nexus-emerald-deep">
                        {t('impact.kpiReportedTitle')}: {ev.beneficiariesReached} •{' '}
                        {ev.hoursClaimed}h
                      </div>
                    </div>

                    {!reviewCheck.allowed &&
                    reviewCheck.reason === 'conflict_of_interest_same_party' ? (
                      <div className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 p-3 text-xs text-red-900">
                        <Lock className="h-4 w-4 shrink-0 text-red-600" />
                        <span>{t('v5portals.verifier.conflictWarning')}</span>
                      </div>
                    ) : (
                      <>
                        <textarea
                          rows={2}
                          placeholder={t('v5portals.verifier.reasonPlaceholder')}
                          value={notesMap[ev.id] || ''}
                          onChange={(e) =>
                            setNotesMap((prev) => ({ ...prev, [ev.id]: e.target.value }))
                          }
                          className="w-full rounded-xl border border-nexus-border bg-white p-2.5 text-xs"
                        />

                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleDecision(ev.id, 'under_review')}
                            className="bg-nexus-emerald hover:bg-nexus-emerald-deep text-white text-xs gap-1.5"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {t('v5portals.verifier.preliminaryReviewBtn')}
                          </Button>
                          <Button
                            size="sm"
                            disabled
                            title={t('prototype.certificationDisabledDesc')}
                            className="bg-slate-200 text-slate-500 text-xs gap-1.5 cursor-not-allowed"
                          >
                            <Lock className="h-3.5 w-3.5" />
                            {t('v5portals.verifier.certifiedDisabledBtn')}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDecision(ev.id, 'rejected')}
                            className="border-nexus-red/40 text-nexus-red hover:bg-nexus-red/10 text-xs gap-1.5"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            {t('v5portals.verifier.rejectDecision')}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Preliminary Review Log */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-nexus-navy">
              {t('v5portals.verifier.approvedHistory')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reviewedEvidence.length === 0 ? (
              <p className="text-xs text-nexus-gray py-8 text-center">
                {t('v5portals.verifier.emptyHistory')}
              </p>
            ) : (
              reviewedEvidence.map((ev) => {
                const verRecord = dataset.verifications.find((v) => v.evidenceId === ev.id);
                return (
                  <div
                    key={ev.id}
                    className="rounded-xl border border-nexus-border bg-white/70 p-3.5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-nexus-navy">
                        {isAr ? ev.titleAr : ev.titleFr}
                      </span>
                      <Badge
                        variant={ev.verificationStatus === 'under_review' ? 'secondary' : 'red'}
                      >
                        {t(`statuses.${ev.verificationStatus}`)}
                      </Badge>
                    </div>
                    {verRecord && (
                      <p className="text-[11px] text-nexus-gray">{verRecord.reviewNotes}</p>
                    )}
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
