import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Building2,
  Compass,
  FileCheck2,
  ShieldCheck,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
  Users,
  Clock,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SupabaseStatusBanner } from '@/components/shared/SupabaseStatusBanner';
import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';
import { useDemoStore } from '@/data/demoStoreContext';
import { analyticsService } from '@/modules/analytics/service';

export function LandingPage() {
  const { t, i18n } = useTranslation();
  const { dataset } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const metrics = analyticsService.computeDashboardMetrics(dataset);

  const pillars = [
    {
      icon: Building2,
      title: t('landing.pillar1Title'),
      desc: t('landing.pillar1Desc'),
    },
    {
      icon: Compass,
      title: t('landing.pillar2Title'),
      desc: t('landing.pillar2Desc'),
    },
    {
      icon: FileCheck2,
      title: t('landing.pillar3Title'),
      desc: t('landing.pillar3Desc'),
    },
    {
      icon: ShieldCheck,
      title: t('landing.pillar4Title'),
      desc: t('landing.pillar4Desc'),
    },
  ];

  const steps = [t('landing.step1'), t('landing.step2'), t('landing.step3'), t('landing.step4')];

  const featuredInitiatives = dataset.initiatives.slice(0, 3);

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="container space-y-6">
        <SupabaseStatusBanner />

        <div className="relative overflow-hidden rounded-2xl border border-nexus-emerald/25 bg-gradient-to-br from-[#06452D]/95 via-[#075B35]/90 to-[#0F172A]/95 p-8 text-white shadow-[0_20px_50px_rgba(6,69,45,0.22)] backdrop-blur-2xl sm:p-12">
          {/* Zellij Vector Geometric Pattern Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-zellij-hero opacity-80" />

          {/* Ambient Lighting Accents */}
          <div className="pointer-events-none absolute -end-24 -top-24 h-96 w-96 rounded-full bg-nexus-emerald/20 blur-3xl" />
          <div className="pointer-events-none absolute -start-24 -bottom-24 h-96 w-96 rounded-full bg-[#D62828]/10 blur-3xl" />

          <div className="relative max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-emerald-100 backdrop-blur-md shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#D62828] shadow-[0_0_8px_rgba(214,40,40,0.8)]" />
              <MapPin className="h-3.5 w-3.5 text-emerald-300" />
              <span>{t('landing.badge')}</span>
            </div>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t('landing.heroTitle')}
            </h1>

            <p className="text-base font-normal leading-relaxed text-emerald-50/90 sm:text-lg">
              {t('landing.heroSubtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                size="lg"
                className="bg-nexus-emerald hover:bg-nexus-emerald-deep text-white border border-emerald-400/30 shadow-[0_4px_20px_rgba(11,138,68,0.4)]"
                asChild
              >
                <Link to="/app/dashboard">
                  {t('landing.primaryCta')}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md shadow-xs"
                asChild
              >
                <Link to="/login">{t('landing.secondaryCta')}</Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-emerald-100 hover:text-white hover:bg-white/10"
                asChild
              >
                <Link to="/initiatives">{t('nav.initiatives')}</Link>
              </Button>
            </div>
          </div>

          {/* Live Constantine Impact Metrics Strip */}
          <div className="relative mt-10 grid gap-4 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/15 bg-white/10 p-4.5 backdrop-blur-md shadow-2xs">
              <div className="flex items-center justify-between text-xs font-normal text-emerald-100/90">
                <span>{t('pages.dashboard.kpiOrganizations')}</span>
                <Building2 className="h-4 w-4 text-emerald-300" />
              </div>
              <p className="mt-1 text-2xl font-semibold text-white">{metrics.totalOrganizations}</p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/10 p-4.5 backdrop-blur-md shadow-2xs">
              <div className="flex items-center justify-between text-xs font-normal text-emerald-100/90">
                <span>{t('pages.dashboard.kpiVolunteers')}</span>
                <Users className="h-4 w-4 text-emerald-300" />
              </div>
              <p className="mt-1 text-2xl font-semibold text-white">{metrics.activeVolunteers}</p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/10 p-4.5 backdrop-blur-md shadow-2xs">
              <div className="flex items-center justify-between text-xs font-normal text-emerald-100/90">
                <span>{t('pages.dashboard.kpiHours')}</span>
                <Clock className="h-4 w-4 text-emerald-300" />
              </div>
              <p className="mt-1 text-2xl font-semibold text-white">
                {metrics.totalVolunteerHours}h
              </p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/10 p-4.5 backdrop-blur-md shadow-2xs">
              <div className="flex items-center justify-between text-xs font-normal text-emerald-100/90">
                <span>{t('pages.dashboard.kpiBeneficiaries')}</span>
                <Award className="h-4 w-4 text-emerald-300" />
              </div>
              <p className="mt-1 text-2xl font-semibold text-emerald-300">
                {metrics.totalBeneficiaries.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Constantine Municipal Scope Strip */}
          <div className="relative mt-6 border-t border-white/15 pt-6">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-emerald-200/80">
              {t('brand.wilaya')}
            </p>
            <div className="flex flex-wrap gap-2">
              {CONSTANTINE_COMMUNES.map((commune) => (
                <span
                  key={commune}
                  className="inline-flex items-center rounded-md border border-white/15 bg-white/10 px-3 py-1 text-xs font-normal text-emerald-50 backdrop-blur-xs"
                >
                  {t(`common.communes.${commune}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Constantine Initiatives */}
      <section className="container space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-semibold text-nexus-navy">
              {t('pages.dashboard.recentInitiatives')}
            </h2>
            <p className="text-xs font-normal text-nexus-gray">{t('common.demoTag')}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-200/80 bg-white/80 hover:bg-white text-xs font-normal"
            asChild
          >
            <Link to="/initiatives">
              {t('nav.initiatives')} ({dataset.initiatives.length})
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredInitiatives.map((init) => (
            <Card
              key={init.id}
              className="flex flex-col justify-between border-white/80 bg-white/70 backdrop-blur-md"
            >
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="emerald"
                    className="bg-nexus-emerald/10 text-nexus-emerald border-nexus-emerald/20 font-medium"
                  >
                    {t(`common.communes.${init.commune}`)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-slate-200 bg-white/60 font-normal text-[11px]"
                  >
                    {t(`statuses.${init.status}`)}
                  </Badge>
                </div>
                <CardTitle className="text-base font-semibold leading-snug">
                  {isAr ? init.titleAr : init.titleFr}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs font-normal">
                  {isAr ? init.summaryAr : init.summaryFr}
                </CardDescription>
              </CardHeader>
              <CardContent className="border-t border-slate-200/60 pt-4 text-xs font-normal text-nexus-gray">
                <div className="flex items-center justify-between">
                  <span>
                    {t('pages.dashboard.kpiBeneficiaries')}:{' '}
                    <strong className="font-semibold text-nexus-navy">
                      {init.verifiedBeneficiaries}
                    </strong>{' '}
                    / {init.targetBeneficiaries}
                  </span>
                  <Link
                    to="/app/initiatives"
                    className="font-medium text-nexus-emerald hover:underline"
                  >
                    {t('nav.workspace')} &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Architectural Pillars */}
      <section className="container space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-nexus-navy">{t('landing.pillarsTitle')}</h2>
          <p className="text-sm font-normal text-nexus-gray">{t('landing.pillarsSubtitle')}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title} className="border-white/80 bg-white/70 backdrop-blur-md">
                <CardHeader className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nexus-emerald/10 text-nexus-emerald">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-semibold">{pillar.title}</CardTitle>
                  <CardDescription className="leading-relaxed font-normal">
                    {pillar.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Lifecycle Steps */}
      <section className="container">
        <div className="relative overflow-hidden rounded-2xl border border-nexus-emerald/20 bg-gradient-to-br from-[#06452D]/95 via-[#075B35]/90 to-[#0F172A]/95 p-8 text-white shadow-xl backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-zellij-subtle opacity-70" />
          <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-nexus-emerald/20 blur-3xl" />
          <div className="pointer-events-none absolute -start-24 -bottom-24 h-72 w-72 rounded-full bg-[#D62828]/10 blur-3xl" />
          <h2 className="relative text-xl font-semibold text-white">
            {t('landing.workflowTitle')}
          </h2>
          <div className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-colors hover:bg-white/15"
              >
                <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-300" />
                <span className="text-xs font-normal text-emerald-50 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
