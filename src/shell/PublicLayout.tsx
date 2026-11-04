import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, ArrowUpRight, MapPin } from 'lucide-react';
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
    <div className="flex min-h-screen flex-col text-nexus-navy">
      {/* Top Institutional Bar */}
      <div className="border-b border-white/10 bg-[#0F172A]/90 text-white backdrop-blur-md">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span className="font-normal text-slate-200">{t('brand.wilaya')}</span>
            <span className="hidden text-slate-500 sm:inline">|</span>
            <span className="hidden text-slate-300 font-normal sm:inline">
              {t('brand.category')}
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">{t('common.direction')}</span>
        </div>
      </div>

      {/* Main Public Header */}
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(15,23,42,0.03)]">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-nexus-emerald/90 text-white shadow-xs backdrop-blur-xs transition-transform group-hover:scale-105">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold leading-tight tracking-tight text-nexus-navy">
                  {t('brand.name')}
                </span>
                <span className="text-[11px] font-normal text-nexus-emerald">Constantine 25</span>
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
                      'rounded-lg px-3 py-1.5 text-xs font-normal transition-all duration-150',
                      isActive
                        ? 'bg-nexus-emerald/10 text-nexus-emerald-dark font-medium shadow-2xs'
                        : 'text-nexus-gray hover:bg-slate-100/60 hover:text-nexus-navy'
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
                className="border-slate-200/80 bg-white/80 hover:bg-white text-xs font-normal"
                asChild
              >
                <Link to="/login">{t('nav.login')}</Link>
              </Button>
              <Button
                variant="navy"
                size="sm"
                className="text-xs font-normal bg-[#0F172A]/90 hover:bg-[#0F172A]"
                asChild
              >
                <Link to="/register">{t('nav.register')}</Link>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="text-xs font-normal shadow-[0_2px_12px_rgba(11,138,68,0.25)]"
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
        <div className="flex items-center justify-between gap-2 overflow-x-auto border-t border-slate-200/50 bg-white/60 px-4 py-2 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-normal transition-colors',
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
              className="whitespace-nowrap rounded-md border border-slate-200/70 bg-white/80 px-2.5 py-1.5 text-xs font-normal text-nexus-navy"
            >
              {t('nav.login')}
            </Link>
            <Link
              to="/app/dashboard"
              className="whitespace-nowrap rounded-md bg-[#0F172A]/90 px-2.5 py-1.5 text-xs font-normal text-white"
            >
              {t('nav.workspace')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/60 backdrop-blur-md py-8">
        <div className="container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-nexus-navy">{t('brand.name')}</span>
              <span className="text-xs font-normal text-nexus-gray">— {t('brand.tagline')}</span>
            </div>
            <p className="text-xs font-normal text-nexus-gray">{t('brand.wilaya')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-normal text-nexus-gray">
            <Link to="/about" className="transition-colors hover:text-nexus-emerald">
              {t('nav.about')}
            </Link>
            <Link to="/initiatives" className="transition-colors hover:text-nexus-emerald">
              {t('nav.initiatives')}
            </Link>
            <Link to="/organizations" className="transition-colors hover:text-nexus-emerald">
              {t('nav.organizations')}
            </Link>
            <Link to="/app/dashboard" className="font-medium text-nexus-emerald hover:underline">
              {t('nav.workspace')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
