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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SupabaseStatusBanner } from '@/components/shared/SupabaseStatusBanner';
import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';

export function LandingPage() {
  const { t } = useTranslation();

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

  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* Hero Section */}
      <section className="container space-y-8">
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
              <Button size="lg" variant="outline" asChild>
                <Link to="/initiatives">{t('landing.secondaryCta')}</Link>
              </Button>
            </div>
          </div>

          {/* Constantine Municipal Scope Strip */}
          <div className="mt-10 border-t border-border pt-6">
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
