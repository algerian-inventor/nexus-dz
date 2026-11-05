import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Calendar,
  Users,
  Building2,
  CheckCircle2,
  ArrowLeft,
  UserPlus,
  ShieldCheck,
} from 'lucide-react';
import { useDemoStore } from '@/data/demoStoreContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function InitiativeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const { dataset, currentAccount, applyToInitiative } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const initiative = dataset.initiatives.find((i) => i.id === id);

  if (!initiative) {
    return (
      <div className="py-20">
        <div className="container max-w-2xl text-center space-y-4">
          <div className="rounded-2xl border border-emerald-400/25 bg-[#042E1E]/85 p-10 backdrop-blur-xl space-y-4">
            <h1 className="text-xl font-bold text-white">{t('pages.initiatives.emptyTitle')}</h1>
            <p className="text-xs text-emerald-200/75">{t('pages.initiatives.emptyDesc')}</p>
            <Button
              variant="outline"
              className="border-emerald-400/40 bg-emerald-950 text-emerald-200 text-xs"
              asChild
            >
              <Link to="/initiatives">{t('nav.initiatives')}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const org = dataset.organizations.find((o) => o.id === initiative.organizationId);
  const volId = currentAccount.volunteerId || currentAccount.id;
  const isEnrolled = initiative.enrolledVolunteerIds.includes(volId);
  const hasApplied = initiative.applicantVolunteerIds.includes(volId);

  const reportedEvidenceBens = dataset.evidence
    .filter((e) => e.initiativeId === initiative.id)
    .reduce((acc, e) => acc + e.beneficiariesReached, 0);

  return (
    <div className="py-12 sm:py-16">
      <div className="container max-w-4xl space-y-6">
        <div>
          <Link
            to="/initiatives"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{t('nav.initiatives')}</span>
          </Link>
        </div>

        <div className="rounded-3xl border border-emerald-400/30 bg-[#042E1E]/85 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                {t(`sectors.${initiative.category}`)}
              </Badge>
              <Badge variant="outline" className="border-emerald-400/30 text-emerald-200">
                {t(`statuses.${initiative.status}`)}
              </Badge>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300 font-mono">
              <Calendar className="h-3.5 w-3.5" />
              {initiative.startDate}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
              {isAr ? initiative.titleAr : initiative.titleFr}
            </h1>
            <p className="text-sm leading-relaxed text-emerald-100/85">
              {isAr ? initiative.summaryAr : initiative.summaryFr}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            <div className="rounded-xl border border-emerald-400/20 bg-white/[0.04] p-4 space-y-1">
              <span className="text-[11px] text-emerald-300/80 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                {t('pages.initiatives.colOrg')}
              </span>
              <p className="text-xs font-bold text-white">
                {org ? (isAr ? org.nameAr : org.nameFr) : '—'}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-400/20 bg-white/[0.04] p-4 space-y-1">
              <span className="text-[11px] text-emerald-300/80 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {t('pages.initiatives.colCommune')}
              </span>
              <p className="text-xs font-bold text-white">
                {t(`common.communes.${initiative.commune}`)}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-400/20 bg-white/[0.04] p-4 space-y-1">
              <span className="text-[11px] text-emerald-300/80 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {t('pages.initiatives.colVolunteers')}
              </span>
              <p className="text-xs font-bold text-white">
                {initiative.enrolledVolunteerIds.length} / {initiative.targetVolunteers}
              </p>
            </div>
          </div>

          {/* 3-Tier Impact Integrity Bar */}
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-950/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              <span>{t('impact.methodologyTitle')}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-3">
              <div>
                <span className="block text-emerald-200/70">{t('impact.kpiPlannedTitle')}</span>
                <span className="text-lg font-extrabold text-white">
                  {initiative.targetBeneficiaries}
                </span>
              </div>
              <div>
                <span className="block text-emerald-200/70">{t('impact.kpiReportedTitle')}</span>
                <span className="text-lg font-extrabold text-amber-300">
                  {reportedEvidenceBens}
                </span>
              </div>
              <div>
                <span className="block text-emerald-200/70">{t('impact.kpiVerifiedTitle')}</span>
                <span className="text-lg font-extrabold text-emerald-400">
                  {initiative.verifiedBeneficiaries}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-emerald-500/20">
            <span className="text-xs text-emerald-200/80">{initiative.locationDetails}</span>

            <div>
              {isEnrolled ? (
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/25 px-4 py-2 text-xs font-bold text-emerald-300 border border-emerald-400/40">
                  <CheckCircle2 className="h-4 w-4" />
                  {t('pages.initiatives.enrolledBadge')}
                </span>
              ) : hasApplied ? (
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/20 px-4 py-2 text-xs font-bold text-amber-300 border border-amber-400/40">
                  {t('pages.initiatives.appliedBadge')}
                </span>
              ) : (
                <Button
                  onClick={() => applyToInitiative(initiative.id, volId)}
                  className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs gap-1.5 rounded-xl px-5"
                >
                  <UserPlus className="h-4 w-4" />
                  {t('pages.initiatives.applyBtn')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
