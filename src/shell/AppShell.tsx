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
    <div className="flex min-h-screen flex-col text-nexus-navy lg:flex-row">
      {/* Sidebar (Desktop) - Frosted Dark Glass */}
      <aside className="hidden w-64 xl:w-72 shrink-0 flex-col border-e border-white/10 bg-[#0F172A]/90 backdrop-blur-xl text-white shadow-xl lg:flex z-20">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-nexus-emerald/90 text-white shadow-xs backdrop-blur-xs transition-transform group-hover:scale-105">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-white">
                {t('brand.name')}
              </span>
              <span className="block text-[10px] font-normal text-emerald-300/80">
                Constantine (25) — Demo
              </span>
            </div>
          </Link>
        </div>

        <div className="border-b border-white/5 bg-white/[0.03] px-5 py-3.5 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-wider font-medium text-slate-400">
            {t('common.demoTag')}
          </p>
          <p className="mt-0.5 truncate text-xs font-medium text-white/95">
            {isAr ? currentAccount.fullNameAr : currentAccount.fullNameFr}
          </p>
          <p className="mt-0.5 truncate text-[11px] font-normal text-emerald-400">
            {isAr ? currentAccount.titleAr : currentAccount.titleFr}
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Workspace navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-normal tracking-wide transition-all duration-150',
                    isActive
                      ? 'bg-nexus-emerald/90 text-white shadow-[0_2px_12px_rgba(11,138,68,0.3)] backdrop-blur-xs font-medium'
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  )
                }
              >
                <span className="flex items-center gap-3 min-w-0">
                  <Icon className="h-4 w-4 shrink-0 opacity-80" />
                  <span className="truncate">{item.label}</span>
                </span>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium leading-none backdrop-blur-xs',
                      item.highlightBadge
                        ? 'bg-amber-400 text-nexus-navy font-semibold'
                        : 'bg-white/10 text-slate-200'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4 text-xs text-slate-400 bg-white/[0.02]">
          <p className="font-medium text-white/90">{t('brand.name')}</p>
          <p className="mt-0.5 text-[11px] font-normal leading-relaxed text-slate-400">
            {t('brand.tagline')}
          </p>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Workspace Header - Translucent Frosted Glass */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-white/60 bg-white/70 px-4 backdrop-blur-lg shadow-[0_2px_15px_-3px_rgba(15,23,42,0.03)] sm:px-6">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200/70 bg-white/80 text-nexus-navy backdrop-blur-xs transition-colors hover:bg-white lg:hidden"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <UserCheck className="h-4 w-4 shrink-0 text-nexus-emerald" />
              <span className="hidden text-xs font-normal text-nexus-gray md:inline">
                {t('nav.roleSwitch')}:
              </span>
              <select
                value={activeRole}
                onChange={(e) => switchRole(e.target.value as UserRole)}
                aria-label={t('nav.roleSwitch')}
                className="h-8 max-w-[200px] truncate rounded-lg border border-nexus-emerald/30 bg-emerald-50/50 px-2.5 text-xs font-medium text-nexus-navy backdrop-blur-xs transition-all hover:border-nexus-emerald/60 sm:max-w-none sm:px-3 shadow-2xs"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {t(`roles.${r}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <Badge
              variant="emerald"
              className="hidden md:inline-flex bg-nexus-emerald/10 text-nexus-emerald border-nexus-emerald/20 font-medium"
            >
              {t(`roles.${activeRole}`)}
            </Badge>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-white/10 bg-[#0F172A]/95 p-4 text-white backdrop-blur-xl lg:hidden">
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
              <span className="font-medium text-white">
                {isAr ? currentAccount.fullNameAr : currentAccount.fullNameFr}
              </span>
              <Badge variant="emerald" className="text-[10px]">
                {t(`roles.${activeRole}`)}
              </Badge>
            </div>
            <nav className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-normal transition-colors',
                        isActive
                          ? 'bg-nexus-emerald/90 text-white font-medium'
                          : 'text-slate-300 hover:bg-white/[0.08]'
                      )
                    }
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 opacity-80" />
                      <span>{item.label}</span>
                    </span>
                    {item.badge !== undefined && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-200">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        )}

        {/* Workspace Page Content */}
        <main className="mx-auto w-full max-w-[1600px] flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
          <SupabaseStatusBanner />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
