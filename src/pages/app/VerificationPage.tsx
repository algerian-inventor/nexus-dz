import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { useDemoStore } from '@/data/demoStoreContext';

export function VerificationPage() {
  const { t, i18n } = useTranslation();
  const { dataset, reviewEvidence } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const [notesByEvidence, setNotesByEvidence] = useState<Record<string, string>>({});

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('pages.verification.title')}
        subtitle={t('pages.verification.subtitle')}
        badgeText={`${dataset.evidence.filter((e) => e.verificationStatus !== 'verified').length} Pending`}
      />

      {/* Evidence Queue Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('pages.documentation.colTitle')}</TableHead>
            <TableHead>{t('pages.documentation.colInitiative')}</TableHead>
            <TableHead>{t('pages.documentation.colImpact')}</TableHead>
            <TableHead>{t('pages.documentation.colVerification')}</TableHead>
            <TableHead>{t('common.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataset.evidence.length === 0 ? (
            <EmptyDatabaseTableState
              colSpan={5}
              title={t('pages.verification.emptyTitle')}
              description={t('pages.verification.emptyDesc')}
            />
          ) : (
            dataset.evidence.map((ev) => {
              const init = dataset.initiatives.find((i) => i.id === ev.initiativeId);
              const noteVal = notesByEvidence[ev.id] || '';

              return (
                <TableRow key={ev.id}>
                  <TableCell className="max-w-xs">
                    <p className="font-semibold text-nexus-navy">
                      {isAr ? ev.titleAr : ev.titleFr}
                    </p>
                    <p className="mt-0.5 text-xs text-nexus-gray">{ev.notes}</p>
                    <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-nexus-gray">
                      <MapPin className="h-3 w-3 text-nexus-emerald" />
                      {ev.gpsCoordinates}
                    </p>
                  </TableCell>
                  <TableCell className="max-w-xs text-xs font-medium">
                    {init ? (isAr ? init.titleAr : init.titleFr) : '-'}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    <p className="font-bold text-nexus-emerald">
                      +{ev.beneficiariesReached} Beneficiaries
                    </p>
                    <p className="text-nexus-navy">+{ev.hoursClaimed}h Hours</p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ev.verificationStatus === 'verified'
                          ? 'emerald'
                          : ev.verificationStatus === 'rejected'
                            ? 'navy'
                            : 'secondary'
                      }
                    >
                      {t(`statuses.${ev.verificationStatus}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="min-w-64 space-y-2">
                    <Input
                      value={noteVal}
                      onChange={(e) =>
                        setNotesByEvidence((prev) => ({ ...prev, [ev.id]: e.target.value }))
                      }
                      placeholder={t('pages.verification.colNotes')}
                      className="h-8 text-xs"
                    />
                    <div className="flex flex-wrap items-center gap-1.5">
                      {ev.verificationStatus !== 'under_review' && (
                        <Button
                          size="sm"
                          variant="default"
                          className="h-7 px-2.5 text-xs"
                          onClick={() => reviewEvidence(ev.id, 'under_review', noteVal)}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {t('pages.verification.approveEvidenceBtn')}
                        </Button>
                      )}
                      {ev.verificationStatus !== 'rejected' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2.5 text-xs"
                          onClick={() => reviewEvidence(ev.id, 'rejected', noteVal)}
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          {t('pages.verification.rejectEvidenceBtn')}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Historical Verification Audit Log */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-nexus-navy">
          {t('pages.verification.auditLogTitle')} ({dataset.verifications.length})
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('pages.verification.colEvidence')}</TableHead>
              <TableHead>{t('pages.verification.colVerifier')}</TableHead>
              <TableHead>{t('pages.verification.colDecision')}</TableHead>
              <TableHead>{t('pages.verification.colNotes')}</TableHead>
              <TableHead>{t('pages.verification.colTimestamp')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataset.verifications.length === 0 ? (
              <EmptyDatabaseTableState
                colSpan={5}
                title={t('v5portals.verifier.emptyHistory')}
                description={t('pages.verification.emptyDesc')}
              />
            ) : (
              dataset.verifications.map((ver) => {
                const ev = dataset.evidence.find((e) => e.id === ver.evidenceId);
                return (
                  <TableRow key={ver.id}>
                    <TableCell className="font-semibold text-xs">
                      {ev ? (isAr ? ev.titleAr : ev.titleFr) : ver.evidenceId}
                    </TableCell>
                    <TableCell className="text-xs">{ver.verifierName}</TableCell>
                    <TableCell>
                      <Badge variant={ver.decision === 'verified' ? 'emerald' : 'navy'}>
                        {t(`statuses.${ver.decision}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-sm text-xs text-nexus-gray">
                      {ver.reviewNotes}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-nexus-gray">
                      {ver.reviewedAt.slice(0, 10)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
