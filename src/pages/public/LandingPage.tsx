import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Building2,
  Users,
  CheckCircle2,
  ArrowUpRight,
  MapPin,
  FileCheck2,
  ShieldCheck,
  Scale,
  Layers,
  ChevronRight,
  Clock,
  Sparkles,
  ClipboardList,
  AlertTriangle,
  FolderLock,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SupabaseStatusBanner } from '@/components/shared/SupabaseStatusBanner';
import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';

export function LandingPage() {
  const { t } = useTranslation();

  const challengeItems = [
    {
      icon: AlertTriangle,
      title: t('landing.challenge1Title'),
      desc: t('landing.challenge1Desc'),
    },
    {
      icon: Clock,
      title: t('landing.challenge2Title'),
      desc: t('landing.challenge2Desc'),
    },
    {
      icon: Scale,
      title: t('landing.challenge3Title'),
      desc: t('landing.challenge3Desc'),
    },
  ];

  const approachPillars = [
    {
      icon: ShieldCheck,
      title: t('landing.pillar1Title'),
      desc: t('landing.pillar1Desc'),
    },
    {
      icon: Layers,
      title: t('landing.pillar2Title'),
      desc: t('landing.pillar2Desc'),
    },
    {
      icon: FileCheck2,
      title: t('landing.pillar3Title'),
      desc: t('landing.pillar3Desc'),
    },
    {
      icon: Scale,
      title: t('landing.pillar4Title'),
      desc: t('landing.pillar4Desc'),
    },
  ];

  const orgSteps = [
    t('landing.orgStep1'),
    t('landing.orgStep2'),
    t('landing.orgStep3'),
    t('landing.orgStep4'),
  ];

  const volSteps = [
    t('landing.volStep1'),
    t('landing.volStep2'),
    t('landing.volStep3'),
    t('landing.volStep4'),
  ];

  const capabilities = [
    {
      icon: Compass,
      title: t('landing.cap1Title'),
      desc: t('landing.cap1Desc'),
      status: 'Phase Pilote active',
    },
    {
      icon: ClipboardList,
      title: t('landing.cap2Title'),
      desc: t('landing.cap2Desc'),
      status: 'Conforme loi 12-06',
    },
    {
      icon: FolderLock,
      title: t('landing.cap3Title'),
      desc: t('landing.cap3Desc'),
      status: 'Horodatage & Géoloc',
    },
    {
      icon: Sparkles,
      title: t('landing.cap4Title'),
      desc: t('landing.cap4Desc'),
      status: 'Traçabilité intégrale',
    },
  ];

  const principles = [
    {
      title: t('landing.principle1Title'),
      desc: t('landing.principle1Desc'),
    },
    {
      title: t('landing.principle2Title'),
      desc: t('landing.principle2Desc'),
    },
    {
      title: t('landing.principle3Title'),
      desc: t('landing.principle3Desc'),
    },
    {
      title: t('landing.principle4Title'),
      desc: t('landing.principle4Desc'),
    },
  ];

  return (
    <div className="space-y-20 py-8 sm:py-12">
      {/* 1. HERO SECTION — CENTERPIECE */}
      <section className="container space-y-6">
        <SupabaseStatusBanner />

        <div className="relative overflow-hidden rounded-3xl border border-nexus-emerald/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#0F172A] p-8 text-white shadow-[0_24px_60px_rgba(6,69,45,0.28)] backdrop-blur-2xl sm:p-12 lg:p-16">
          {/* Zellij Vector Geometric Pattern Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-zellij-hero opacity-85" />

          {/* Ambient Lighting Accents */}
          <div className="pointer-events-none absolute -end-24 -top-24 h-[450px] w-[450px] rounded-full bg-nexus-emerald/25 blur-3xl" />
          <div className="pointer-events-none absolute -start-24 -bottom-24 h-[450px] w-[450px] rounded-full bg-[#D62828]/15 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            {/* Left Column: Headline, Description & CTAs */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-emerald-100 backdrop-blur-md shadow-xs">
                <span className="h-2 w-2 rounded-full bg-[#D62828] shadow-[0_0_8px_rgba(214,40,40,0.85)]" />
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
                  <Link to="/register">
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
                  <a href="#challenge">{t('landing.secondaryCta')}</a>
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  className="text-emerald-100 hover:text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/initiatives">{t('landing.tertiaryCta')}</Link>
                </Button>
              </div>

              {/* Constantine Pilot Communes Scope Indicator */}
              <div className="pt-4 border-t border-white/15">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-emerald-200/80">
                  {t('brand.wilaya')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {CONSTANTINE_COMMUNES.map((commune) => (
                    <span
                      key={commune}
                      className="inline-flex items-center rounded-md border border-white/15 bg-white/10 px-2.5 py-0.5 text-[11px] font-normal text-emerald-50 backdrop-blur-xs"
                    >
                      {t(`common.communes.${commune}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Abstract CSS/SVG Architecture Preview Card (Zero Fake Data) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/20 bg-white/[0.08] p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] space-y-4">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                    <span className="text-xs font-semibold text-white tracking-wide uppercase">
                      {t('landing.architectureTitle')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-nexus-red/80 text-white border border-white/20">
                    Audit Strict
                  </span>
                </div>

                {/* 4-Step Verifiable Lifecycle Flow */}
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-xs">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-xs font-semibold">
                      1
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{t('landing.archStep1')}</p>
                      <p className="text-[11px] text-emerald-200/70 font-normal">
                        Loi 12-06 relative aux associations
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-xs">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-xs font-semibold">
                      2
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{t('landing.archStep2')}</p>
                      <p className="text-[11px] text-emerald-200/70 font-normal">
                        Missions horodatées & compétences
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-xs">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-xs font-semibold">
                      3
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{t('landing.archStep3')}</p>
                      <p className="text-[11px] text-emerald-200/70 font-normal">
                        Feuilles de présence & preuves terrain
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-xs">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-xs font-semibold">
                      4
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{t('landing.archStep4')}</p>
                      <p className="text-[11px] text-emerald-200/70 font-normal">
                        Validation tierce sans auto-déclaration
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                  <p className="text-[11px] font-normal text-emerald-200/90 leading-relaxed">
                    {t('landing.archNotice')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CHALLENGE SECTION */}
      <section id="challenge" className="container space-y-6">
        <div className="max-w-3xl space-y-2">
          <Badge
            variant="outline"
            className="border-nexus-emerald/30 bg-nexus-mint/60 text-nexus-emerald-deep"
          >
            {t('brand.name')} • Diagnostic de Terrain
          </Badge>
          <h2 className="text-2xl font-semibold text-nexus-navy sm:text-3xl">
            {t('landing.challengeTitle')}
          </h2>
          <p className="text-sm font-normal leading-relaxed text-nexus-gray sm:text-base">
            {t('landing.challengeSubtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {challengeItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="border-white/80 bg-white/75 backdrop-blur-md shadow-[0_6px_24px_-4px_rgba(7,91,53,0.06)] hover:border-nexus-emerald/40 transition-all"
              >
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nexus-red/10 text-nexus-red">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-semibold text-nexus-navy">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-normal leading-relaxed text-nexus-gray">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. THE NEXUS DZ APPROACH */}
      <section className="container space-y-6">
        <div className="max-w-3xl space-y-2">
          <Badge
            variant="outline"
            className="border-nexus-emerald/30 bg-nexus-mint/60 text-nexus-emerald-deep"
          >
            Méthodologie & Cadre d'Action
          </Badge>
          <h2 className="text-2xl font-semibold text-nexus-navy sm:text-3xl">
            {t('landing.approachTitle')}
          </h2>
          <p className="text-sm font-normal leading-relaxed text-nexus-gray sm:text-base">
            {t('landing.approachSubtitle')}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {approachPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.title}
                className="border-white/80 bg-white/75 backdrop-blur-md shadow-[0_6px_24px_-4px_rgba(7,91,53,0.06)] hover:border-nexus-emerald/40 transition-all"
              >
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nexus-emerald/10 text-nexus-emerald">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-semibold text-nexus-navy">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-normal leading-relaxed text-nexus-gray">
                    {pillar.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4 & 5. HOW IT WORKS — ASSOCIATIONS & VOLUNTEERS */}
      <section className="container space-y-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* For Associations */}
          <div className="rounded-2xl border border-nexus-emerald/20 bg-white/80 p-6 backdrop-blur-xl shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nexus-emerald text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-nexus-navy">
                  {t('landing.forOrgsTitle')}
                </h3>
                <p className="text-xs font-normal text-nexus-gray">
                  {t('landing.forOrgsSubtitle')}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {orgSteps.map((step, idx) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-xl border border-slate-200/60 bg-white/60 p-3.5 backdrop-blur-xs"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nexus-emerald/15 text-xs font-semibold text-nexus-emerald">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-normal leading-relaxed text-nexus-navy">{step}</p>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-nexus-emerald hover:bg-nexus-emerald-deep text-white shadow-xs"
              asChild
            >
              <Link to="/register">
                {t('landing.ctaOrgBtn')}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* For Volunteers */}
          <div className="rounded-2xl border border-nexus-navy/20 bg-white/80 p-6 backdrop-blur-xl shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] text-white">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-nexus-navy">
                  {t('landing.forVolsTitle')}
                </h3>
                <p className="text-xs font-normal text-nexus-gray">
                  {t('landing.forVolsSubtitle')}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {volSteps.map((step, idx) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-xl border border-slate-200/60 bg-white/60 p-3.5 backdrop-blur-xs"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F172A]/10 text-xs font-semibold text-nexus-navy">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-normal leading-relaxed text-nexus-navy">{step}</p>
                </div>
              ))}
            </div>

            <Button
              variant="navy"
              className="w-full bg-[#0F172A] hover:bg-black text-white shadow-xs"
              asChild
            >
              <Link to="/register">
                {t('landing.ctaVolBtn')}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. PLATFORM CAPABILITIES */}
      <section className="container space-y-6">
        <div className="max-w-3xl space-y-2">
          <Badge
            variant="outline"
            className="border-nexus-emerald/30 bg-nexus-mint/60 text-nexus-emerald-deep"
          >
            Outils Numériques
          </Badge>
          <h2 className="text-2xl font-semibold text-nexus-navy sm:text-3xl">
            {t('landing.capabilitiesTitle')}
          </h2>
          <p className="text-sm font-normal leading-relaxed text-nexus-gray sm:text-base">
            {t('landing.capabilitiesSubtitle')}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <Card
                key={cap.title}
                className="border-white/80 bg-white/75 backdrop-blur-md shadow-[0_6px_24px_-4px_rgba(7,91,53,0.06)] hover:border-nexus-emerald/40 transition-all"
              >
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nexus-emerald/10 text-nexus-emerald">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-normal border-slate-200">
                      {cap.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold text-nexus-navy">
                    {cap.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-normal leading-relaxed text-nexus-gray">{cap.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 7. TRANSPARENCY & VERIFICATION PRINCIPLES */}
      <section className="container space-y-6">
        <div className="rounded-3xl border border-nexus-emerald/20 bg-gradient-to-br from-[#06452D]/95 via-[#075B35]/90 to-[#0F172A]/95 p-8 text-white shadow-xl backdrop-blur-2xl sm:p-12 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-zellij-subtle opacity-70" />
          <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-nexus-emerald/20 blur-3xl" />

          <div className="relative max-w-2xl space-y-2 pb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Charte Éthique & Déontologie
            </span>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              {t('landing.principlesTitle')}
            </h2>
            <p className="text-sm font-normal text-emerald-100/80">
              {t('landing.principlesSubtitle')}
            </p>
          </div>

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, idx) => (
              <div
                key={p.title}
                className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-colors hover:bg-white/15"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                    <span className="font-mono text-xs text-emerald-200">0{idx + 1}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                  <p className="text-xs font-normal leading-relaxed text-emerald-100/90">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION — PILOTE ONBOARDING */}
      <section className="container">
        <div className="rounded-3xl border border-white/80 bg-white/85 p-8 backdrop-blur-xl shadow-[0_12px_40px_rgba(7,91,53,0.08)] sm:p-12 text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-nexus-emerald/25 bg-nexus-mint/70 px-4 py-1 text-xs font-medium text-nexus-emerald-deep">
            <span className="h-2 w-2 rounded-full bg-nexus-emerald animate-pulse" />
            Phase Pilote Constantine • Déploiement Concerté
          </div>

          <h2 className="text-2xl font-semibold text-nexus-navy sm:text-4xl">
            {t('landing.ctaTitle')}
          </h2>

          <p className="text-sm font-normal leading-relaxed text-nexus-gray max-w-2xl mx-auto sm:text-base">
            {t('landing.ctaSubtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              className="bg-nexus-emerald hover:bg-nexus-emerald-deep text-white shadow-md"
              asChild
            >
              <Link to="/register">
                {t('landing.ctaOrgBtn')}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 bg-white hover:bg-slate-50 text-nexus-navy"
              asChild
            >
              <Link to="/register">{t('landing.ctaVolBtn')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
