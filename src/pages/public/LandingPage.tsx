import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Building2,
  Users,
  Compass,
  BarChart3,
  ShieldCheck,
  Sparkles,
  UserPlus,
  CheckCircle2,
  MapPin,
  FileCheck2,
  FolderLock,
  ArrowUpRight,
  HeartHandshake,
  Sprout,
} from 'lucide-react';
import { useDemoStore } from '@/data/demoStoreContext';
import { Button } from '@/components/ui/button';

export function LandingPage() {
  const { t } = useTranslation();
  const { dataset } = useDemoStore();

  const verifiedOrganizations = dataset.organizations.filter(
    (o) => o.verificationStatus === 'verified'
  ).length;
  const totalVolunteers = dataset.volunteers.filter((v) => v.verifiedHours > 0).length;
  const activeInitiatives = dataset.initiatives.filter((i) => i.status === 'verified').length;
  const verifiedBeneficiaries = dataset.initiatives.reduce(
    (acc, i) => acc + i.verifiedBeneficiaries,
    0
  );

  const communes = [
    'constantine',
    'el_khroub',
    'ali_mendjeli',
    'ain_smara',
    'hamma_bouziane',
    'didouche_mourad',
    'zighoud_youcef',
  ];

  const portalCards = [
    {
      to: '/app/volunteer',
      badge: t('v5portals.volunteer.badge'),
      title: t('v5portals.volunteer.title'),
      desc: t('v5portals.volunteer.subtitle'),
      icon: Users,
    },
    {
      to: '/app/organization',
      badge: t('v5portals.organization.badge'),
      title: t('v5portals.organization.title'),
      desc: t('v5portals.organization.subtitle'),
      icon: Building2,
    },
    {
      to: '/app/verifier',
      badge: t('v5portals.verifier.badge'),
      title: t('v5portals.verifier.title'),
      desc: t('v5portals.verifier.subtitle'),
      icon: ShieldCheck,
    },
    {
      to: '/app/admin',
      badge: t('v5portals.admin.badge'),
      title: t('v5portals.admin.title'),
      desc: t('v5portals.admin.subtitle'),
      icon: FolderLock,
    },
  ];

  return (
    <div className="space-y-0">
      {/* =====================================================================
          HERO SECTION — ALGERIAN 3D FLOATING ISLAND & EMERALD GLASSMORPHISM
      ===================================================================== */}
      <section className="relative overflow-hidden border-b border-emerald-500/20 bg-gradient-to-b from-[#042E1E] via-[#06452D] to-[#042E1E] pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-zellij-Hero opacity-35" />
        <div className="pointer-events-none absolute -top-28 right-1/4 h-[480px] w-[480px] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-[380px] w-[380px] rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="container relative z-10 space-y-12">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Hero Copy & CTAs */}
            <div className="space-y-6 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-950/80 px-4 py-1.5 text-xs font-bold text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>{t('v5hero.badge')}</span>
              </div>

              <h1 className="text-3xl font-extrabold leading-[1.22] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t('v5hero.titlePart1')}{' '}
                <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.35)]">
                  {t('v5hero.titlePart2')}
                </span>
              </h1>

              <p className="max-w-xl text-sm font-normal leading-relaxed text-emerald-100/85 sm:text-base">
                {t('v5hero.subtitle')}
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Button
                  size="lg"
                  className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold shadow-[0_0_25px_rgba(52,211,153,0.45)] rounded-xl px-6 gap-2 transition-all hover:scale-[1.02]"
                  asChild
                >
                  <Link to="/app/volunteer">
                    <UserPlus className="h-4 w-4" />
                    {t('v5hero.ctaVolunteer')}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-400/40 bg-emerald-950/60 hover:bg-emerald-900/70 text-white font-semibold rounded-xl px-6 gap-2 backdrop-blur-md"
                  asChild
                >
                  <Link to="/register">
                    <Building2 className="h-4 w-4 text-emerald-400" />
                    {t('v5hero.ctaAssociation')}
                  </Link>
                </Button>
              </div>

              {/* 4 Honest Zero-Baseline Stat Cards (No +0) */}
              <div className="grid grid-cols-2 gap-3 pt-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-emerald-400/25 bg-[#042E1E]/75 p-3.5 text-center backdrop-blur-xl shadow-lg">
                  <Building2 className="mx-auto h-4 w-4 text-emerald-400 mb-1.5" />
                  <p className="text-xl font-extrabold text-white">{verifiedOrganizations}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-emerald-200/80">
                    {t('v5hero.statOrgs')}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-400/25 bg-[#042E1E]/75 p-3.5 text-center backdrop-blur-xl shadow-lg">
                  <Users className="mx-auto h-4 w-4 text-emerald-400 mb-1.5" />
                  <p className="text-xl font-extrabold text-white">{totalVolunteers}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-emerald-200/80">
                    {t('v5hero.statVolunteers')}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-400/25 bg-[#042E1E]/75 p-3.5 text-center backdrop-blur-xl shadow-lg">
                  <Compass className="mx-auto h-4 w-4 text-emerald-400 mb-1.5" />
                  <p className="text-xl font-extrabold text-white">{activeInitiatives}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-emerald-200/80">
                    {t('v5hero.statInitiatives')}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-400/35 bg-emerald-900/50 p-3.5 text-center backdrop-blur-xl shadow-lg">
                  <BarChart3 className="mx-auto h-4 w-4 text-emerald-300 mb-1.5" />
                  <p className="text-xl font-extrabold text-emerald-300">{verifiedBeneficiaries}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-emerald-200/90">
                    {t('v5hero.statImpact')}
                  </p>
                </div>
              </div>
            </div>

            {/* 3D Floating Volunteering Island Visual */}
            <div className="relative lg:col-span-6">
              <div className="relative mx-auto max-w-[600px] lg:max-w-none">
                <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-tr from-emerald-500/25 via-emerald-400/15 to-transparent blur-2xl" />

                <div className="relative overflow-hidden rounded-3xl border border-emerald-400/35 bg-[#042E1E]/80 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                  <img
                    src="/assets/nexus-dz-youth-hero.png"
                    alt="NEXUS DZ — 3D Floating Volunteering Island in Constantine"
                    className="h-auto w-full rounded-2xl object-cover shadow-inner"
                    loading="eager"
                    width={565}
                    height={420}
                  />

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-500/20 bg-[#042E1E]/90 px-3.5 py-2 text-[11px] text-emerald-200/90">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                      {t('v5hero.bottomNoticeLeft')}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {t('v5hero.bottomNoticeRight')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Bottom Glass Feature Cards */}
          <div className="grid gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-2xl border border-emerald-400/25 bg-white/[0.06] p-5 text-center backdrop-blur-xl transition-all hover:border-emerald-400/50 hover:bg-white/[0.1]">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t('v5hero.feature1Title')}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-emerald-100/75">
                {t('v5hero.feature1Desc')}
              </p>
            </div>

            <div className="group rounded-2xl border border-emerald-400/25 bg-white/[0.06] p-5 text-center backdrop-blur-xl transition-all hover:border-emerald-400/50 hover:bg-white/[0.1]">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t('v5hero.feature2Title')}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-emerald-100/75">
                {t('v5hero.feature2Desc')}
              </p>
            </div>

            <div className="group rounded-2xl border border-emerald-400/25 bg-white/[0.06] p-5 text-center backdrop-blur-xl transition-all hover:border-emerald-400/50 hover:bg-white/[0.1]">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Sprout className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t('v5hero.feature3Title')}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-emerald-100/75">
                {t('v5hero.feature3Desc')}
              </p>
            </div>

            <div className="group rounded-2xl border border-emerald-400/25 bg-white/[0.06] p-5 text-center backdrop-blur-xl transition-all hover:border-emerald-400/50 hover:bg-white/[0.1]">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t('v5hero.feature4Title')}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-emerald-100/75">
                {t('v5hero.feature4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4 GENUINE USER ROLE PORTALS SECTION
      ===================================================================== */}
      <section className="border-b border-emerald-500/20 bg-[#053824] py-16">
        <div className="container space-y-10">
          <div className="mx-auto max-w-3xl text-center space-y-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              <HeartHandshake className="h-3.5 w-3.5" />
              {t('v5hero.portalsSectionBadge')}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t('v5hero.portalsSectionTitle')}
            </h2>
            <p className="text-sm text-emerald-100/80">{t('v5hero.portalsSectionSubtitle')}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {portalCards.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.to}
                  to={p.to}
                  className="group flex flex-col justify-between rounded-2xl border border-emerald-400/25 bg-[#042E1E]/80 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_12px_30px_rgba(4,46,30,0.7)]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-950 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                        {p.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-emerald-100/75">{p.desc}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <span>{t('nav.workspace')}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          THREE-TIER IMPACT INTEGRITY & CONSTANTINE SCOPE
      ===================================================================== */}
      <section className="border-b border-emerald-500/20 bg-[#042E1E] py-16">
        <div className="container space-y-10">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="space-y-4 lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                <FileCheck2 className="h-3.5 w-3.5" />
                {t('v5hero.integrityBadge')}
              </span>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {t('v5hero.integrityTitle')}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-emerald-100/80">
                {t('v5hero.integrityDesc')}
              </p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  className="border-emerald-400/40 bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/60 text-xs"
                  asChild
                >
                  <Link to="/impact">{t('v5hero.integrityBtn')}</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
              <div className="rounded-2xl border border-emerald-400/20 bg-white/[0.05] p-5 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold">01 • PLANNED</span>
                <h3 className="text-sm font-bold text-white">{t('impact.step1Title')}</h3>
                <p className="text-xs text-emerald-100/75 leading-relaxed">
                  {t('impact.step1Desc')}
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-400/20 bg-white/[0.05] p-5 space-y-2">
                <span className="text-xs font-mono text-amber-300 font-bold">02 • REPORTED</span>
                <h3 className="text-sm font-bold text-white">{t('impact.step2Title')}</h3>
                <p className="text-xs text-emerald-100/75 leading-relaxed">
                  {t('impact.step2Desc')}
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/15 p-5 space-y-2">
                <span className="text-xs font-mono text-emerald-300 font-bold">03 • VERIFIED</span>
                <h3 className="text-sm font-bold text-white">{t('impact.step3Title')}</h3>
                <p className="text-xs text-emerald-100/85 leading-relaxed">
                  {t('impact.step3Desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Constantine Communes Bar */}
          <div className="rounded-2xl border border-emerald-400/25 bg-[#06452D]/70 p-6 backdrop-blur-xl">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <MapPin className="h-4 w-4" />
                  <span>{t('v5hero.scopeBoxTitle')}</span>
                </div>
                <p className="text-xs text-emerald-100/75">{t('v5hero.scopeBoxSubtitle')}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {communes.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-950/70 px-3 py-1 text-xs text-emerald-100"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    {t(`common.communes.${c}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CALL TO ACTION
      ===================================================================== */}
      <section className="bg-[#06452D] py-14">
        <div className="container">
          <div className="rounded-3xl border border-emerald-400/35 bg-gradient-to-r from-[#042E1E] via-[#075B35] to-[#042E1E] p-8 sm:p-10 text-center space-y-5 shadow-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{t('landing.ctaTitle')}</h2>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm text-emerald-100/85 leading-relaxed">
              {t('landing.ctaSubtitle')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                size="lg"
                className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl px-6"
                asChild
              >
                <Link to="/register">{t('landing.ctaOrgBtn')}</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-400/40 bg-emerald-950/60 text-white hover:bg-emerald-900/60 rounded-xl px-6"
                asChild
              >
                <Link to="/resources">{t('v5hero.resourcesBtn')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
