import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Building2,
  Users,
  Compass,
  CheckSquare,
  FileCheck2,
  ShieldCheck,
  BarChart3,
  Bell,
  Settings,
  Shield,
  Menu,
  X,
  UserCheck,
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { SupabaseStatusBanner } from '@/components/shared/SupabaseStatusBanner';
import { useDemoStore } from '@/data/demoStoreContext';
import type { UserRole } from '@/data/demoTypes';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function AppShell() {
  const { t, i18n } = useTranslation();
  const { dataset, currentAccount, activeRole, switchRole } = useDemoStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = i18n.language === 'ar';

  const unreadCount = dataset.notifications.filter((n) => !n.read).length;
  const pendingVerificationCount = dataset.evidence.filter(
    (e) => e.verificationStatus === 'pending' || e.verificationStatus === 'under_review'
  ).length;

  const navItems = [
    {
      to: '/app/dashboard',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
    },
    {
      to: '/app/organizations',
      label: t('nav.organizations'),
      icon: Building2,
      badge: dataset.organizations.length,
    },
    {
      to: '/app/volunteers',
      label: t('nav.volunteers'),
      icon: Users,
    },
    {
      to: '/app/initiatives',
      label: t('nav.initiatives'),
      icon: Compass,
      badge: dataset.initiatives.length,
    },
    {
      to: '/app/tasks',
      label: t('nav.tasks'),
      icon: CheckSquare,
      badge: dataset.tasks.length,
    },
    {
      to: '/app/documentation',
      label: t('nav.documentation'),
      icon: FileCheck2,
      badge: dataset.evidence.length,
    },
    {
      to: '/app/verification',
      label: t('nav.verification'),
      icon: ShieldCheck,
      badge: pendingVerificationCount > 0 ? pendingVerificationCount : undefined,
      highlightBadge: pendingVerificationCount > 0,
    },
    {
      to: '/app/analytics',
      label: t('nav.analytics'),
      icon: BarChart3,
    },
    {
      to: '/app/notifications',
      label: t('nav.notifications'),
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
      highlightBadge: unreadCount > 0,
    },
    {
      to: '/app/settings',
      label: t('nav.settings'),
      icon: Settings,
    },
  ];

  const roles: UserRole[] = ['super_admin', 'organization_admin', 'volunteer', 'verifier'];

  return (
    <div className="flex min-h-screen flex-col bg-nexus-surface text-nexus-navy lg:flex-row">
      {/* Sidebar (Desktop) */}
      <aside className="hidden w-68 shrink-0 flex-col border-e border-border bg-nexus-navy text-white lg:flex">
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-nexus-emerald text-white">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white">{t('brand.name')}</span>
              <span className="block text-[10px] text-nexus-emerald">Constantine (25) — Demo</span>
            </div>
          </Link>
        </div>

        <div className="border-b border-slate-800 bg-slate-900/70 px-4 py-3">
          <p className="text-[11px] font-medium text-slate-400">{t('common.demoTag')}</p>
          <p className="mt-0.5 text-xs font-semibold text-white">
            {isAr ? currentAccount.fullNameAr : currentAccount.fullNameFr}
          </p>
          <p className="text-[11px] text-nexus-emerald">
            {isAr ? currentAccount.titleAr : currentAccount.titleFr}
          </p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-nexus-emerald text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  )
                }
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </span>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                      item.highlightBadge
                        ? 'bg-amber-400 text-nexus-navy'
                        : 'bg-slate-800 text-slate-200'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4 text-xs text-slate-400">
          <p className="font-semibold text-white">{t('brand.name')}</p>
          <p className="mt-0.5 text-[11px]">{t('brand.tagline')}</p>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Workspace Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md border border-border p-2 text-nexus-navy lg:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-nexus-emerald shrink-0" />
              <span className="hidden text-xs font-medium text-nexus-gray md:inline">
                {t('nav.roleSwitch')}:
              </span>
              <select
                value={activeRole}
                onChange={(e) => switchRole(e.target.value as UserRole)}
                aria-label={t('nav.roleSwitch')}
                className="h-9 rounded-md border border-nexus-emerald/40 bg-nexus-emerald-light/50 px-3 text-xs font-semibold text-nexus-navy focus:border-nexus-emerald focus:outline-none"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {t(`roles.${r}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="emerald" className="hidden sm:inline-flex">
              {t(`roles.${activeRole}`)}
            </Badge>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-border bg-nexus-navy p-4 text-white lg:hidden">
            <nav className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2 rounded px-3 py-2 text-xs font-medium',
                        isActive
                          ? 'bg-nexus-emerald text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      )
                    }
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        )}

        {/* Workspace Page Content */}
        <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
          <SupabaseStatusBanner />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
