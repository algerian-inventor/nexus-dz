import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, ArrowUpRight, MapPin, Mail, ShieldCheck, UserPlus, LogIn } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PublicLayout() {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/about', label: t('nav.about') },
    { to: '/organizations', label: t('nav.organizations') },
    { to: '/initiatives', label: t('nav.initiatives') },
    { to: '/app/volunteer', label: t('nav.volunteering') },
    { to: '/impact', label: t('nav.impact') },
    { to: '/resources', label: t('nav.resources') },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#06452D] text-white selection:bg-emerald-500 selection:text-emerald-950">
      {/* Top Institutional Ribbon - Algerian Forest Green */}
      <div className="border-b border-white/10 bg-[#042E1E] text-white backdrop-blur-md">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-1.5 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span className="font-medium text-emerald-100">{t('brand.wilaya')}</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-nexus-red mx-1" />
            <span className="hidden text-emerald-300/80 font-normal sm:inline">
              {t('brand.category')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              الجمهورية الجزائرية الديمقراطية الشعبية
            </span>
            <span className="font-mono text-[11px] text-emerald-300/70">
              {t('common.direction')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Public Header - Frosted Translucent Deep Emerald Glass */}
      <header className="sticky top-0 z-40 border-b border-emerald-500/20 bg-[#06452D]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(4,41,27,0.4)]">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nexus-emerald to-nexus-emerald-deep text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-xs transition-transform group-hover:scale-105 border border-emerald-400/30">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold leading-tight tracking-tight text-white">
                    {t('brand.name')}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-400/20 px-1.5 py-0.2 text-[10px] font-bold text-emerald-300 border border-emerald-400/40">
                    V5
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-nexus-red" />
                </div>
                <span className="text-[10px] font-normal text-emerald-200/80">
                  {t('brand.subtag') || 'منصة التطوع والعمل الجمعوي في الجزائر'}
                </span>
              </div>
            </Link>

            <nav
              className="hidden items-center gap-1 xl:gap-1.5 lg:flex"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-3 py-1.5 text-xs transition-all duration-150',
                      isActive
                        ? 'bg-emerald-500/25 text-emerald-300 font-semibold shadow-inner border border-emerald-400/40'
                        : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher variant="dark" />
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-normal text-emerald-100 hover:text-white hover:bg-emerald-800/40 gap-1.5"
                asChild
              >
                <Link to="/login">
                  <LogIn className="h-3.5 w-3.5" />
                  {t('nav.login')}
                </Link>
              </Button>
              <Button
                size="sm"
                className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-[0_0_20px_rgba(16,185,129,0.35)] rounded-full px-4 gap-1.5"
                asChild
              >
                <Link to="/register">
                  <UserPlus className="h-3.5 w-3.5" />
                  {t('nav.joinNow')}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-500/30 bg-emerald-950/60 hover:bg-emerald-900/60 text-xs font-medium text-emerald-200 rounded-full"
                asChild
              >
                <Link to="/app/dashboard">
                  {t('nav.workspace')}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Secondary Nav */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto border-t border-emerald-500/20 bg-[#06452D]/95 px-4 py-2 backdrop-blur-md lg:hidden">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-full px-2.5 py-1 text-xs transition-colors',
                    isActive
                      ? 'bg-emerald-500/30 text-emerald-300 font-medium border border-emerald-400/40'
                      : 'text-emerald-100/80 hover:bg-white/10'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Link
              to="/login"
              className="whitespace-nowrap rounded-lg border border-emerald-500/30 bg-emerald-950/60 px-2.5 py-1 text-xs font-normal text-emerald-200"
            >
              {t('nav.login')}
            </Link>
            <Link
              to="/register"
              className="whitespace-nowrap rounded-lg bg-emerald-500 px-2.5 py-1 text-xs font-bold text-emerald-950"
            >
              {t('nav.joinNow')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Genuine Footer — Deep Forest Emerald Glassmorphism */}
      <footer className="border-t border-emerald-500/20 bg-[#042E1E] text-emerald-100/90 pt-12 pb-8">
        <div className="container space-y-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Identity & Scope */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-emerald-950 shadow-2xs font-bold">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="font-bold text-white">{t('brand.name')}</span>
                <span className="inline-flex items-center rounded-full bg-emerald-400/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-300 border border-emerald-400/40">
                  V5
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-nexus-red" />
              </div>
              <p className="text-xs font-normal leading-relaxed text-emerald-200/80">
                {t('brand.tagline')}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{t('brand.wilaya')}</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                المنصة
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-200/80">
                <li>
                  <Link to="/" className="hover:text-emerald-300 transition-colors">
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-emerald-300 transition-colors">
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <Link to="/organizations" className="hover:text-emerald-300 transition-colors">
                    {t('nav.organizations')}
                  </Link>
                </li>
                <li>
                  <Link to="/initiatives" className="hover:text-emerald-300 transition-colors">
                    {t('nav.initiatives')}
                  </Link>
                </li>
                <li>
                  <Link to="/impact" className="hover:text-emerald-300 transition-colors">
                    {t('nav.impact')}
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-emerald-300 transition-colors">
                    {t('nav.resources')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coordination Portals */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                فضاءات العمل المتخصصة
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-200/80">
                <li>
                  <Link to="/app/volunteer" className="hover:text-emerald-300 transition-colors">
                    {t('v5portals.volunteer.title')}
                  </Link>
                </li>
                <li>
                  <Link to="/app/organization" className="hover:text-emerald-300 transition-colors">
                    {t('v5portals.organization.title')}
                  </Link>
                </li>
                <li>
                  <Link to="/app/verifier" className="hover:text-emerald-300 transition-colors">
                    {t('v5portals.verifier.title')}
                  </Link>
                </li>
                <li>
                  <Link to="/app/admin" className="hover:text-emerald-300 transition-colors">
                    {t('v5portals.admin.title')}
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-emerald-300 transition-colors">
                    {t('nav.joinNow')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Official Contact & Governance */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                الاتصال والامتثال القانوني
              </h4>
              <div className="space-y-2 text-xs text-emerald-200/80">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <a
                    href="mailto:coordination.constantine@nexus-dz.org"
                    className="font-mono text-[11px] hover:underline text-emerald-300"
                  >
                    coordination.constantine@nexus-dz.org
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed">
                    منصة مدنية مطابقة لأحكام القانون 12-06 المنظم للجمعيات في الجزائر.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-emerald-500/20 pt-6 flex flex-col items-center justify-between gap-3 text-xs text-emerald-300/70 sm:flex-row">
            <p className="text-[11px] font-normal">
              © {new Date().getFullYear()} NEXUS DZ V5 • منصة التطوع والعمل الجمعوي في الجزائر •
              قسنطينة (25).
            </p>
            <p className="text-[11px] text-emerald-400/90 font-medium">
              نزاهة ثلاثية للأثر • تدقيق ميداني مستقل • صفر أرقام وهمية
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
