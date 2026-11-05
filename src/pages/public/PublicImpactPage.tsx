import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, FileCheck2, MapPin, Clock, AlertCircle, Lock } from 'lucide-react';
import { useDemoStore } from '@/data/demoStoreContext';
import { Button } from '@/components/ui/button';

export function PublicImpactPage() {
  const { t } = useTranslation();
  const { dataset } = useDemoStore();

  const communes = [
    'constantine',
    'el_khroub',
    'ali_mendjeli',
    'ain_smara',
    'hamma_bouziane',
    'didouche_mourad',
    'zighoud_youcef',
  ] as const;

  const plannedTotal = dataset.initiatives.reduce((acc, i) => acc + i.targetBeneficiaries, 0);
  const reportedTotal = dataset.evidence.reduce((acc, e) => acc + e.beneficiariesReached, 0);
  const verifiedTotal = dataset.initiatives.reduce((acc, i) => acc + i.verifiedBeneficiaries, 0);

  return (
    <div className="py-12 sm:py-16">
      <div className="container space-y-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/80 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>{t('impact.badge')}</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t('impact.title')}
          </h1>
          <p className="text-sm text-emerald-100/80 leading-relaxed">{t('impact.subtitle')}</p>
        </div>

        {/* 4 Three-Tier Integrity KPIs (Honest 0 Verified, No +0 or 100%) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-emerald-400/25 bg-[#042E1E]/85 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-emerald-200/80">
              <span>{t('impact.kpiPlannedTitle')}</span>
              <Clock className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-2 text-2xl font-extrabold text-white">{plannedTotal}</p>
            <p className="mt-1 text-[11px] text-emerald-300/75">{t('impact.kpiPlannedSub')}</p>
          </div>

          <div className="rounded-2xl border border-amber-400/30 bg-[#042E1E]/85 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-amber-200/90">
              <span>{t('impact.kpiReportedTitle')}</span>
              <FileCheck2 className="h-4 w-4 text-amber-400" />
            </div>
            <p className="mt-2 text-2xl font-extrabold text-amber-300">{reportedTotal}</p>
            <p className="mt-1 text-[11px] text-emerald-300/75">{t('impact.kpiReportedSub')}</p>
          </div>

          <div className="rounded-2xl border border-emerald-400/45 bg-emerald-900/50 p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between text-xs text-emerald-200">
              <span>{t('impact.kpiVerifiedTitle')}</span>
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
            </div>
            <p className="mt-2 text-2xl font-extrabold text-emerald-300">{verifiedTotal}</p>
            <p className="mt-1 text-[11px] text-emerald-200/90">{t('impact.kpiVerifiedSub')}</p>
          </div>

          <div className="rounded-2xl border border-emerald-400/25 bg-[#042E1E]/85 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-emerald-200/80">
              <span>{t('impact.kpiModeTitle')}</span>
              <Lock className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-2 text-xl font-extrabold text-white">{t('impact.kpiModeValue')}</p>
            <p className="mt-1 text-[11px] text-emerald-300/75">{t('impact.kpiModeSub')}</p>
          </div>
        </div>

        {/* 3-Tier Methodology Explanation */}
        <div className="rounded-2xl border border-emerald-400/25 bg-[#042E1E]/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-white">{t('impact.methodologyTitle')}</h2>
              <p className="text-xs text-emerald-200/75 mt-1">{t('impact.methodologyDesc')}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-400/40 bg-emerald-950 text-emerald-200 text-xs"
              asChild
            >
              <Link to="/resources">{t('impact.criteriaLink')}</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-400/20 bg-white/[0.04] p-4 space-y-1.5">
              <span className="text-[11px] font-mono text-emerald-400 font-bold">01 • PLANNED</span>
              <h3 className="text-sm font-bold text-white">{t('impact.step1Title')}</h3>
              <p className="text-xs text-emerald-100/75 leading-relaxed">{t('impact.step1Desc')}</p>
            </div>
            <div className="rounded-xl border border-amber-400/25 bg-white/[0.04] p-4 space-y-1.5">
              <span className="text-[11px] font-mono text-amber-300 font-bold">02 • REPORTED</span>
              <h3 className="text-sm font-bold text-white">{t('impact.step2Title')}</h3>
              <p className="text-xs text-emerald-100/75 leading-relaxed">{t('impact.step2Desc')}</p>
            </div>
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/15 p-4 space-y-1.5">
              <span className="text-[11px] font-mono text-emerald-300 font-bold">
                03 • VERIFIED
              </span>
              <h3 className="text-sm font-bold text-white">{t('impact.step3Title')}</h3>
              <p className="text-xs text-emerald-100/85 leading-relaxed">{t('impact.step3Desc')}</p>
            </div>
          </div>
        </div>

        {/* Constantine Communes Breakdown */}
        <div className="rounded-2xl border border-emerald-400/25 bg-[#042E1E]/80 p-6 sm:p-8 backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">{t('impact.constantineBreakdown')}</h2>
              <p className="text-xs text-emerald-200/75 mt-0.5">
                {t('impact.constantineBreakdownSub')}
              </p>
            </div>
            <BarChart3 className="h-5 w-5 text-emerald-400" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {communes.map((c) => {
              const communeInits = dataset.initiatives.filter((i) => i.commune === c);
              const communeVerified = communeInits.reduce(
                (acc, i) => acc + i.verifiedBeneficiaries,
                0
              );
              return (
                <div
                  key={c}
                  className="flex items-center justify-between rounded-xl border border-emerald-400/20 bg-white/[0.04] p-3.5"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{t(`common.communes.${c}`)}</span>
                    </div>
                    <p className="text-[11px] text-emerald-200/70">
                      {communeInits.length} {t('impact.plannedCountLabel')}
                    </p>
                  </div>
                  <div className="text-end">
                    <span className="block font-mono text-sm font-bold text-emerald-300">
                      {communeVerified}
                    </span>
                    <span className="text-[10px] text-emerald-200/70">
                      {t('impact.zeroVerifiedBadge')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Honest Zero-State Notice */}
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-950/60 p-5 text-xs text-emerald-100/90">
          <AlertCircle className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-white">{t('impact.recentAudits')}</p>
            <p className="leading-relaxed">{t('impact.emptyNotice')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
