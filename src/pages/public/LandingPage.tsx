import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Building2,
  Users,
  ShieldCheck,
  BarChart3,
  Cog,
  Sprout,
  ArrowUpRight,
  MapPin,
  Clock,
  Scale,
  Layers,
  ChevronRight,
  FileCheck2,
  AlertTriangle,
  FolderLock,
  UserCheck,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

  const portals = [
    {
      title: t('v5portals.volunteer.title'),
      desc: t('v5portals.volunteer.subtitle'),
      to: '/app/volunteer',
      icon: UserCheck,
      badge: 'متطوع ميداني',
      color: 'from-emerald-500/20 to-emerald-950/40',
      action: t('v5portals.volunteer.checkIn'),
    },
    {
      title: t('v5portals.organization.title'),
      desc: t('v5portals.organization.subtitle'),
      to: '/app/organization',
      icon: Building2,
      badge: 'مسؤول جمعية',
      color: 'from-blue-500/20 to-emerald-950/40',
      action: t('v5portals.organization.createInitiative'),
    },
    {
      title: t('v5portals.verifier.title'),
      desc: t('v5portals.verifier.subtitle'),
      to: '/app/verifier',
      icon: ShieldCheck,
      badge: 'مدقق أثر مستقل',
      color: 'from-amber-500/20 to-emerald-950/40',
      action: t('v5portals.verifier.approveDecision'),
    },
    {
      title: t('v5portals.admin.title'),
      desc: t('v5portals.admin.subtitle'),
      to: '/app/admin',
      icon: FolderLock,
      badge: 'إشراف ولائي',
      color: 'from-purple-500/20 to-emerald-950/40',
      action: t('v5portals.admin.auditLogs'),
    },
  ];

  const statItems = [
    {
      icon: Building2,
      value: '0',
      label: t('v5hero.statOrgs'),
    },
    {
      icon: Users,
      value: '0',
      label: t('v5hero.statVolunteers'),
    },
    {
      icon: Cog,
      value: '0',
      label: t('v5hero.statInitiatives'),
    },
    {
      icon: BarChart3,
      value: '+0',
      label: t('v5hero.statImpact'),
    },
  ];

  const heroFeatures = [
    {
      icon: Building2,
      title: t('v5hero.feature1Title'),
      desc: t('v5hero.feature1Desc'),
    },
    {
      icon: Users,
      title: t('v5hero.feature2Title'),
      desc: t('v5hero.feature2Desc'),
    },
    {
      icon: Sprout,
      title: t('v5hero.feature3Title'),
      desc: t('v5hero.feature3Desc'),
    },
    {
      icon: ShieldCheck,
      title: t('v5hero.feature4Title'),
      desc: t('v5hero.feature4Desc'),
    },
  ];

  return (
    <div className="space-y-16 py-4 sm:py-8">
      {/* 1. V5 HERO CENTERPIECE — 3D FLOATING ISLAND & ALGERIAN IDENTITY */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-500/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#042E1E] p-6 text-white shadow-[0_24px_70px_rgba(4,46,30,0.5)] backdrop-blur-2xl sm:p-10 lg:p-14">
          {/* Subtle Zellij Geometric Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-zellij-hero opacity-60" />

          {/* Ambient Lighting Gradients */}
          <div className="pointer-events-none absolute -end-24 -top-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl animate-v5-glow" />
          <div className="pointer-events-none absolute -start-24 -bottom-24 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" />
          <div className="pointer-events-none absolute left-1/3 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#0B8A44]/15 blur-3xl" />

          {/* Constantine Suspension Bridge Subtle Silhouette Background Overlay */}
          <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-96 opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-100 via-transparent to-transparent" />

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            {/* Column 1: 3D Floating Volunteering Island (Mockup Centerpiece) */}
            <div className="relative order-2 flex items-center justify-center lg:order-1 lg:col-span-6">
              {/* Floating Island Container with smooth CSS animation */}
              <div className="relative max-w-lg animate-v5-float">
                {/* Glow ring behind 3D composition */}
                <div className="absolute inset-0 -m-6 rounded-full bg-emerald-400/15 blur-2xl" />

                {/* 3D Rendered Island Centerpiece Image */}
                <div className="relative overflow-hidden rounded-3xl border border-emerald-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                  <img
                    src="/assets/nexus-dz-v5-island.jpg"
                    alt="NEXUS DZ V5 — 3D Floating Volunteering Island Constantine"
                    className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle inner glass vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06452D]/60 via-transparent to-transparent" />
                </div>

                {/* Orbital Floating Frosted Icon Badges */}
                {/* Badge 1: Sprout (Planting) */}
                <div className="absolute -top-3 -start-3 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/50 bg-[#06452D]/90 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] backdrop-blur-md">
                  <Sprout className="h-6 w-6" />
                </div>

                {/* Badge 2: Recycling */}
                <div className="absolute top-1/3 -end-4 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/50 bg-[#06452D]/90 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] backdrop-blur-md">
                  <Cog className="h-6 w-6" />
                </div>

                {/* Badge 3: Community Heart / Care */}
                <div className="absolute -bottom-3 start-1/4 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/50 bg-[#06452D]/90 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] backdrop-blur-md">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                {/* Badge 4: Impact Growth */}
                <div className="absolute -bottom-3 end-10 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/50 bg-[#06452D]/90 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] backdrop-blur-md">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Column 2: Typography, CTAs, and 4-Stat Metric Bar */}
            <div className="order-1 space-y-6 lg:order-2 lg:col-span-6">
              {/* V5 Badge Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md shadow-inner">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t('v5hero.badge') || 'NEXUS DZ V5 +'}</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-5xl leading-tight">
                  <span className="block">{t('v5hero.titlePart1')}</span>
                  <span className="block text-emerald-400 drop-shadow-[0_2px_15px_rgba(16,185,129,0.35)]">
                    {t('v5hero.titlePart2')}
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-base font-normal leading-relaxed text-emerald-100/90 sm:text-lg">
                {t('v5hero.subtitle')}
              </p>

              {/* Dual Action Buttons matching mockup */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-7 py-3 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all hover:scale-105 border-0 gap-2"
                  asChild
                >
                  <Link to="/app/volunteer">
                    <UserCheck className="h-5 w-5" />
                    {t('v5hero.ctaVolunteer')}
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-950/60 hover:bg-emerald-900/60 text-white font-medium px-6 py-3 rounded-2xl backdrop-blur-md shadow-xs transition-all gap-2"
                  asChild
                >
                  <Link to="/register">
                    <Building2 className="h-5 w-5 text-emerald-300" />
                    {t('v5hero.ctaAssociation')}
                  </Link>
                </Button>
              </div>

              {/* 4-Stat Metric Bar (Exact Copy of Reference Mockup) */}
              <div className="pt-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {statItems.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-950/50 p-3.5 backdrop-blur-xl shadow-inner transition-transform hover:-translate-y-0.5"
                      >
                        <Icon className="h-5 w-5 text-emerald-400 mb-1" />
                        <span className="text-xl font-extrabold text-white tracking-tight">
                          {stat.value}
                        </span>
                        <span className="text-[11px] font-normal text-emerald-200/80 text-center leading-tight mt-0.5">
                          {stat.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 4 Frosted Feature Cards (Exact Mockup Layout) */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {heroFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-white/10 to-emerald-950/50 p-5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all hover:border-emerald-400/60 hover:bg-white/15"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 group-hover:bg-emerald-500 group-hover:text-emerald-950 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-wide">{feat.title}</h3>
                  </div>
                  <p className="text-xs font-normal leading-relaxed text-emerald-100/80">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Subtle Bottom Algerian Flag Ribbon Accent */}
          <div className="mt-8 flex items-center justify-between border-t border-emerald-500/20 pt-4 text-xs text-emerald-200/70">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-6 rounded-sm bg-gradient-to-r from-[#006233] via-white to-[#D62828] border border-white/20" />
              <span>الجمهورية الجزائرية الديمقراطية الشعبية • ولاية قسنطينة (25)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>منصة مدنية مطابقة للنزاهة الثلاثية للأثر</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED PERSONA PORTALS — REAL PLATFORM WORKFLOWS */}
      <section className="container space-y-6">
        <div className="max-w-3xl space-y-2">
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-950/60 text-emerald-300"
          >
            فضاءات الاستخدام المتخصصة
          </Badge>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            أربعة فضاءات عمل متكاملة للمنظومة المدنية
          </h2>
          <p className="text-sm font-normal text-emerald-200/80 sm:text-base">
            تمنح NEXUS DZ كل طرف في معادلة العمل الجمعوي الأدوات الرقمية المناسبة لمسؤولياته
            وصلاحياته.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portals.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.to}
                className="group flex flex-col justify-between rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-[#075B35]/50 to-[#042E1E]/80 p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all hover:border-emerald-400/50 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-emerald-950/80 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
                      {p.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-xs font-normal leading-relaxed text-emerald-200/80">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-emerald-500/30 bg-emerald-950/60 text-emerald-200 hover:bg-emerald-500 hover:text-emerald-950 font-semibold text-xs rounded-xl transition-all"
                    asChild
                  >
                    <Link to={p.to}>
                      {p.action}
                      <ChevronRight className="h-4 w-4 ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. STRICT 3-TIER IMPACT INTEGRITY PROTOCOL */}
      <section className="container space-y-6">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#0F172A] p-8 text-white shadow-xl backdrop-blur-2xl sm:p-12 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-zellij-subtle opacity-60" />

          <div className="relative grid items-center gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                بروتوكول الشفافية والنزاهة
              </span>
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                المعادلة الصارمة: المستهدف ≥ المصرح به ≥ المصادق عليه
              </h2>
              <p className="text-sm font-normal leading-relaxed text-emerald-100/90">
                في NEXUS DZ، لا يتم نشر أي إحصائية أثر أو ساعات تطوع إلا بعد اجتياز ثلاث مستويات
                تدقيق متتالية: مطابقة خطة المبادرة، التحقق من التواجد الميداني الفعلي عبر الإحداثيات
                الجغرافية وقوائم الإمضاء، والمصادقة المستقلة من طرف مدقق معتمد.
              </p>
              <div className="pt-2">
                <Button
                  size="default"
                  className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl shadow-md gap-2"
                  asChild
                >
                  <Link to="/impact">
                    <BarChart3 className="h-4 w-4" />
                    استعراض سجل الأثر والمصادقات
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-950/70 p-6 backdrop-blur-xl space-y-3.5 shadow-inner">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                  <span className="text-xs font-bold text-white">دورة تدقيق الأثر الميداني</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-nexus-red/80 text-white">
                    تدقيق صارم
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5">
                    <span className="text-emerald-200">1. إدراج المبادرة (خطة معتمدة)</span>
                    <span className="font-mono text-white">قانون 12-06</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5">
                    <span className="text-emerald-200">2. التنفيذ وحضور المتطوعين</span>
                    <span className="font-mono text-white">إحداثيات GPS</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5">
                    <span className="text-emerald-200">3. رفع التوثيق والأدلة المادية</span>
                    <span className="font-mono text-white">صور مدمجة بالوقت</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-emerald-500/20 p-2.5 border border-emerald-400/30">
                    <span className="text-emerald-300 font-bold">4. المصادقة المستقلة والنشر</span>
                    <span className="font-mono text-emerald-300 font-bold">سجل علني</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE CHALLENGE & THE NEXUS APPROACH */}
      <section className="container space-y-8">
        <div className="max-w-3xl space-y-2">
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-950/60 text-emerald-300"
          >
            تشخيص الواقع الميداني
          </Badge>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t('landing.challengeTitle')}
          </h2>
          <p className="text-sm font-normal leading-relaxed text-emerald-200/80 sm:text-base">
            {t('landing.challengeSubtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {challengeItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="border-emerald-500/25 bg-emerald-950/40 backdrop-blur-xl shadow-[0_6px_24px_-4px_rgba(4,46,30,0.3)] hover:border-emerald-400/40 transition-all text-white"
              >
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D62828]/20 text-[#D62828] border border-[#D62828]/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-bold text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-normal leading-relaxed text-emerald-100/80">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 5. METHODOLOGY & PILLARS */}
      <section className="container space-y-6">
        <div className="max-w-3xl space-y-2">
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-950/60 text-emerald-300"
          >
            منهجية العمل المعتمدة
          </Badge>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t('landing.approachTitle')}
          </h2>
          <p className="text-sm font-normal leading-relaxed text-emerald-200/80 sm:text-base">
            {t('landing.approachSubtitle')}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {approachPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.title}
                className="border-emerald-500/25 bg-emerald-950/40 backdrop-blur-xl shadow-md hover:border-emerald-400/40 transition-all text-white"
              >
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-bold text-white">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-normal leading-relaxed text-emerald-100/80">
                    {pillar.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 6. CONSTANTINE PROVINCE PILOT SCOPE */}
      <section className="container">
        <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/50 p-6 backdrop-blur-xl sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white">
                  نطاق الانتشار الميداني — ولاية قسنطينة (25)
                </h3>
                <p className="text-xs text-emerald-200/70">
                  تغطية بلدية تدريجية للمبادرات والجمعيات المعتمدة
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-500/30 bg-emerald-900/40 text-emerald-200 hover:text-white text-xs rounded-xl"
              asChild
            >
              <Link to="/resources">
                <BookOpen className="h-3.5 w-3.5 me-1.5" />
                دليل الموارد واللوائح
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {CONSTANTINE_COMMUNES.map((commune) => (
              <span
                key={commune}
                className="inline-flex items-center rounded-xl border border-emerald-500/30 bg-emerald-900/40 px-3 py-1 text-xs font-medium text-emerald-100 backdrop-blur-xs"
              >
                {t(`common.communes.${commune}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION — JOIN THE PLATFORM */}
      <section className="container">
        <div className="rounded-[2.5rem] border border-emerald-500/30 bg-gradient-to-br from-[#06452D] via-[#075B35] to-[#042E1E] p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(4,46,30,0.4)] sm:p-12 text-center space-y-6 max-w-4xl mx-auto text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-4 py-1 text-xs font-semibold text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            انضم الآن إلى شبكة العمل الجمعوي المنظم في الجزائر
          </div>

          <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
            {t('landing.ctaTitle')}
          </h2>

          <p className="text-sm font-normal leading-relaxed text-emerald-100/90 max-w-2xl mx-auto sm:text-base">
            {t('landing.ctaSubtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-8 py-3 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              asChild
            >
              <Link to="/register">
                {t('landing.ctaOrgBtn')}
                <ArrowUpRight className="h-4 w-4 ms-2" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-emerald-500/40 bg-emerald-950/60 hover:bg-emerald-900/70 text-white font-medium px-8 py-3 rounded-2xl backdrop-blur-md"
              asChild
            >
              <Link to="/app/volunteer">{t('landing.ctaVolBtn')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
