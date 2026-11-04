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
    <div className="space-y-14 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="container space-y-6">
        <SupabaseStatusBanner />

        <div className="rounded-xl border border-border bg-white p-8 shadow-xs sm:p-12">
          <div className="max-w-3xl space-y-6">
            <Badge variant="emerald" className="px-3 py-1 text-xs">
              <MapPin className="h-3.5 w-3.5" />
              {t('landing.badge')}
            </Badge>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-nexus-navy sm:text-4xl lg:text-5xl">
              {t('landing.heroTitle')}
            </h1>

            <p className="text-base leading-relaxed text-nexus-gray sm:text-lg">
              {t('landing.heroSubtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" asChild>
                <Link to="/app/dashboard">
                  {t('landing.primaryCta')}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="navy" asChild>
                <Link to="/login">{t('landing.secondaryCta')}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/initiatives">{t('nav.initiatives')}</Link>
              </Button>
            </div>
          </div>

          {/* Live Constantine Impact Metrics Strip */}
          <div className="mt-10 grid gap-4 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-nexus-surface p-4">
              <div className="flex items-center justify-between text-xs text-nexus-gray">
                <span>{t('pages.dashboard.kpiOrganizations')}</span>
                <Building2 className="h-4 w-4 text-nexus-emerald" />
              </div>
              <p className="mt-1 text-2xl font-bold text-nexus-navy">
                {metrics.totalOrganizations}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-nexus-surface p-4">
              <div className="flex items-center justify-between text-xs text-nexus-gray">
                <span>{t('pages.dashboard.kpiVolunteers')}</span>
                <Users className="h-4 w-4 text-nexus-emerald" />
              </div>
              <p className="mt-1 text-2xl font-bold text-nexus-navy">{metrics.activeVolunteers}</p>
            </div>

            <div className="rounded-lg border border-border bg-nexus-surface p-4">
              <div className="flex items-center justify-between text-xs text-nexus-gray">
                <span>{t('pages.dashboard.kpiHours')}</span>
                <Clock className="h-4 w-4 text-nexus-emerald" />
              </div>
              <p className="mt-1 text-2xl font-bold text-nexus-navy">
                {metrics.totalVolunteerHours}h
              </p>
            </div>

            <div className="rounded-lg border border-border bg-nexus-surface p-4">
              <div className="flex items-center justify-between text-xs text-nexus-gray">
                <span>{t('pages.dashboard.kpiBeneficiaries')}</span>
                <Award className="h-4 w-4 text-nexus-emerald" />
              </div>
              <p className="mt-1 text-2xl font-bold text-nexus-emerald">
                {metrics.totalBeneficiaries.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Constantine Municipal Scope Strip */}
          <div className="mt-6 border-t border-border pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-nexus-gray">
              {t('brand.wilaya')}
            </p>
            <div className="flex flex-wrap gap-2">
              {CONSTANTINE_COMMUNES.map((commune) => (
                <Badge key={commune} variant="secondary" className="px-3 py-1 font-medium">
                  {t(`common.communes.${commune}`)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Constantine Initiatives */}
      <section className="container space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-nexus-navy">
              {t('pages.dashboard.recentInitiatives')}
            </h2>
            <p className="text-sm text-nexus-gray">{t('common.demoTag')}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/initiatives">
              {t('nav.initiatives')} ({dataset.initiatives.length})
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredInitiatives.map((init) => (
            <Card key={init.id} className="flex flex-col justify-between bg-white">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="emerald">{t(`common.communes.${init.commune}`)}</Badge>
                  <Badge variant="outline">{t(`statuses.${init.status}`)}</Badge>
                </div>
                <CardTitle className="text-base leading-snug">
                  {isAr ? init.titleAr : init.titleFr}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                  {isAr ? init.summaryAr : init.summaryFr}
                </CardDescription>
              </CardHeader>
              <CardContent className="border-t border-border pt-4 text-xs text-nexus-gray">
                <div className="flex items-center justify-between">
                  <span>
                    {t('pages.dashboard.kpiBeneficiaries')}:{' '}
                    <strong className="text-nexus-navy">{init.verifiedBeneficiaries}</strong> /{' '}
                    {init.targetBeneficiaries}
                  </span>
                  <Link
                    to="/app/initiatives"
                    className="font-semibold text-nexus-emerald hover:underline"
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
          <h2 className="text-2xl font-bold text-nexus-navy">{t('landing.pillarsTitle')}</h2>
          <p className="text-sm text-nexus-gray">{t('landing.pillarsSubtitle')}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title} className="border-border bg-white">
                <CardHeader className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-nexus-emerald-light text-nexus-emerald">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{pillar.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{pillar.desc}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Lifecycle Steps */}
      <section className="container">
        <div className="rounded-xl bg-nexus-navy p-8 text-white sm:p-10">
          <h2 className="text-xl font-bold text-white">{t('landing.workflowTitle')}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-nexus-emerald" />
                <span className="text-sm font-medium text-slate-100">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
