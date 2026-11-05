import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, ArrowUpRight, MapPin, Mail, ShieldCheck } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PublicLayout() {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/about', label: t('nav.about') },
    { to: '/initiatives', label: t('nav.initiatives') },
    { to: '/organizations', label: t('nav.organizations') },
  ];

  return (
    <div className="flex min-h-screen flex-col text-nexus-navy bg-zellij-subtle">
      {/* Top Institutional Ribbon - Algerian Forest Green */}
      <div className="border-b border-white/10 bg-[#06452D] text-white backdrop-blur-md">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
            <span className="font-medium text-emerald-50">{t('brand.wilaya')}</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-nexus-red mx-1" />
            <span className="hidden text-emerald-200/80 font-normal sm:inline">
              {t('brand.category')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/20">
              الجمهورية الجزائرية الديمقراطية الشعبية
            </span>
            <span className="font-mono text-[11px] text-emerald-200/70">
              {t('common.direction')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Public Header - Frosted Translucent Glass with Green Border */}
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(7,91,53,0.05)]">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-nexus-emerald to-nexus-emerald-deep text-white shadow-xs backdrop-blur-xs transition-transform group-hover:scale-105 border border-white/20">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold leading-tight tracking-tight text-nexus-navy">
                    {t('brand.name')}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-nexus-red" />
                </div>
                <span className="text-[11px] font-medium text-nexus-emerald-deep">
                  Constantine 25
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-3 py-1.5 text-xs font-normal transition-all duration-150',
                      isActive
                        ? 'bg-nexus-mint/80 text-nexus-emerald-deep font-semibold shadow-2xs border border-nexus-emerald/25'
                        : 'text-nexus-gray hover:bg-white/60 hover:text-nexus-navy'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher />
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                variant="outline"
                size="sm"
                className="border-nexus-emerald/20 bg-white/80 hover:bg-white text-xs font-normal"
                asChild
              >
                <Link to="/login">{t('nav.login')}</Link>
              </Button>
              <Button
                variant="navy"
                size="sm"
                className="text-xs font-normal bg-[#0F172A] hover:bg-black"
                asChild
              >
                <Link to="/register">{t('nav.register')}</Link>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="text-xs font-medium shadow-[0_4px_14px_rgba(11,138,68,0.28)]"
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
        <div className="flex items-center justify-between gap-2 overflow-x-auto border-t border-slate-200/50 bg-white/75 px-4 py-2 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-normal transition-colors',
                    isActive
                      ? 'bg-nexus-emerald text-white font-medium'
                      : 'text-nexus-navy hover:bg-white/80'
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
              className="whitespace-nowrap rounded-lg border border-slate-200/70 bg-white/80 px-2.5 py-1.5 text-xs font-normal text-nexus-navy"
            >
              {t('nav.login')}
            </Link>
            <Link
              to="/register"
              className="whitespace-nowrap rounded-lg bg-nexus-emerald px-2.5 py-1.5 text-xs font-normal text-white"
            >
              {t('nav.register')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Genuine Footer — Transparent, Professional & Authentic */}
      <footer className="border-t border-slate-200/80 bg-white/85 backdrop-blur-md pt-12 pb-8">
        <div className="container space-y-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Identity & Scope */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-nexus-emerald text-white shadow-2xs">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="font-semibold text-nexus-navy">{t('brand.name')}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-nexus-red" />
              </div>
              <p className="text-xs font-normal leading-relaxed text-nexus-gray">
                {t('brand.tagline')}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-nexus-emerald-deep font-medium">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{t('brand.wilaya')}</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-nexus-navy">
                Plateforme
              </h4>
              <ul className="space-y-1.5 text-xs text-nexus-gray">
                <li>
                  <Link to="/" className="hover:text-nexus-emerald transition-colors">
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-nexus-emerald transition-colors">
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <Link to="/initiatives" className="hover:text-nexus-emerald transition-colors">
                    {t('nav.initiatives')}
                  </Link>
                </li>
                <li>
                  <Link to="/organizations" className="hover:text-nexus-emerald transition-colors">
                    {t('nav.organizations')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coordination & Pilot Enrollment */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-nexus-navy">
                Accompagnement Pilote
              </h4>
              <ul className="space-y-1.5 text-xs text-nexus-gray">
                <li>
                  <Link to="/register" className="hover:text-nexus-emerald transition-colors">
                    {t('nav.register')}
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-nexus-emerald transition-colors">
                    {t('nav.login')}
                  </Link>
                </li>
                <li>
                  <Link to="/app/dashboard" className="hover:text-nexus-emerald transition-colors">
                    {t('nav.workspace')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Official Contact & Governance */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-nexus-navy">
                Contact & Conformité
              </h4>
              <div className="space-y-2 text-xs text-nexus-gray">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-nexus-emerald shrink-0" />
                  <a
                    href="mailto:coordination.constantine@nexus-dz.org"
                    className="font-mono text-[11px] hover:underline"
                  >
                    coordination.constantine@nexus-dz.org
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-nexus-emerald shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed">
                    Conforme à la Loi 12-06 relative aux associations en Algérie.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/70 pt-6 flex flex-col items-center justify-between gap-3 text-xs text-nexus-gray sm:flex-row">
            <p className="text-[11px] font-normal">
              © {new Date().getFullYear()} NEXUS DZ • Plateforme Civique Algérienne • Déploiement
              Pilote Constantine (25).
            </p>
            <p className="text-[11px] text-nexus-gray/80">
              Aucune donnée synthétique • Zéro réclame publicitaire
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
