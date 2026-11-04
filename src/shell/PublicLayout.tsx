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
    <div className="flex min-h-screen flex-col bg-nexus-surface text-nexus-navy">
      {/* Top Institutional Bar */}
      <div className="border-b border-border bg-nexus-navy text-white">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-nexus-emerald" />
            <span className="font-medium">{t('brand.wilaya')}</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">{t('brand.category')}</span>
          </div>
          <span className="text-slate-300 font-mono">{t('common.direction')}</span>
        </div>
      </div>

      {/* Main Public Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-xs">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-nexus-emerald text-white shadow-xs">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-nexus-navy">
                  {t('brand.name')}
                </span>
                <span className="text-[11px] font-medium text-nexus-emerald">Constantine 25</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-nexus-emerald-light text-nexus-emerald-dark'
                        : 'text-nexus-gray hover:bg-nexus-surface hover:text-nexus-navy'
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
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">{t('nav.login')}</Link>
              </Button>
              <Button variant="navy" size="sm" asChild>
                <Link to="/register">{t('nav.register')}</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link to="/app/dashboard">
                  {t('nav.workspace')}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Secondary Nav */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto border-t border-border bg-nexus-surface px-4 py-2 md:hidden">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded px-2.5 py-1 text-xs font-medium',
                    isActive ? 'bg-nexus-emerald text-white' : 'text-nexus-navy hover:bg-white'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <Link
            to="/app/dashboard"
            className="whitespace-nowrap rounded bg-nexus-navy px-2.5 py-1 text-xs font-medium text-white"
          >
            {t('nav.workspace')}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-8">
        <div className="container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-nexus-navy">{t('brand.name')}</span>
              <span className="text-xs text-nexus-gray">— {t('brand.tagline')}</span>
            </div>
            <p className="text-xs text-nexus-gray">{t('brand.wilaya')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-nexus-gray">
            <Link to="/about" className="hover:text-nexus-emerald">
              {t('nav.about')}
            </Link>
            <Link to="/initiatives" className="hover:text-nexus-emerald">
              {t('nav.initiatives')}
            </Link>
            <Link to="/organizations" className="hover:text-nexus-emerald">
              {t('nav.organizations')}
            </Link>
            <Link to="/app/dashboard" className="font-semibold text-nexus-emerald">
              {t('nav.workspace')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
