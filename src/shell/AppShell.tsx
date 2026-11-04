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
import { useAuthContext } from '@/modules/auth/context';
import type { UserRole } from '@/integrations/supabase/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function AppShell() {
  const { t } = useTranslation();
  const { activeRole, setActiveRole } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      to: '/app/dashboard',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
      roles: ['volunteer', 'organization_admin', 'verifier', 'super_admin'] as UserRole[],
    },
    {
      to: '/app/organizations',
      label: t('nav.organizations'),
      icon: Building2,
      roles: ['volunteer', 'organization_admin', 'verifier', 'super_admin'] as UserRole[],
    },
    {
      to: '/app/volunteers',
      label: t('nav.volunteers'),
      icon: Users,
      roles: ['volunteer', 'organization_admin', 'verifier', 'super_admin'] as UserRole[],
    },
    {
      to: '/app/initiatives',
      label: t('nav.initiatives'),
      icon: Compass,
      roles: ['volunteer', 'organization_admin', 'verifier', 'super_admin'] as UserRole[],
    },
    {
      to: '/app/tasks',
      label: t('nav.tasks'),
      icon: CheckSquare,
      roles: ['volunteer', 'organization_admin', 'super_admin'] as UserRole[],
    },
    {
      to: '/app/documentation',
      label: t('nav.documentation'),
      icon: FileCheck2,
      roles: ['volunteer', 'organization_admin', 'verifier', 'super_admin'] as UserRole[],
    },
    {
      to: '/app/verification',
      label: t('nav.verification'),
      icon: ShieldCheck,
      roles: ['verifier', 'organization_admin', 'super_admin'] as UserRole[],
    },
    {
      to: '/app/analytics',
      label: t('nav.analytics'),
      icon: BarChart3,
      roles: ['volunteer', 'organization_admin', 'verifier', 'super_admin'] as UserRole[],
    },
    {
      to: '/app/notifications',
      label: t('nav.notifications'),
      icon: Bell,
      roles: ['volunteer', 'organization_admin', 'verifier', 'super_admin'] as UserRole[],
    },
    {
      to: '/app/settings',
      label: t('nav.settings'),
      icon: Settings,
      roles: ['volunteer', 'organization_admin', 'verifier', 'super_admin'] as UserRole[],
    },
  ];

  const roles: UserRole[] = ['organization_admin', 'volunteer', 'verifier', 'super_admin'];

  return (
    <div className="flex min-h-screen flex-col bg-nexus-surface text-nexus-navy lg:flex-row">
      {/* Sidebar (Desktop) */}
      <aside className="hidden w-64 shrink-0 flex-col border-e border-border bg-nexus-navy text-white lg:flex">
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-nexus-emerald text-white">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white">{t('brand.name')}</span>
              <span className="block text-[10px] text-nexus-emerald">Constantine (25)</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isRoleHighlighted = item.roles.includes(activeRole);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-nexus-emerald text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white',
                    !isRoleHighlighted && 'opacity-65'
                  )
                }
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </span>
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
            <div className="hidden items-center gap-2 sm:flex">
              <UserCheck className="h-4 w-4 text-nexus-emerald" />
              <span className="text-xs font-medium text-nexus-gray">{t('nav.roleSwitch')}:</span>
              <select
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as UserRole)}
                aria-label={t('nav.roleSwitch')}
                className="h-8 rounded-md border border-border bg-nexus-surface px-2.5 text-xs font-semibold text-nexus-navy focus:border-nexus-emerald focus:outline-none"
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
            <Badge variant="outline" className="hidden md:inline-flex">
              {t(`roles.${activeRole}`)}
            </Badge>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-border bg-nexus-navy p-4 text-white lg:hidden">
            <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-300">{t('nav.roleSwitch')}</span>
              <select
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as UserRole)}
                className="rounded bg-slate-800 px-2 py-1 text-xs text-white"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {t(`roles.${r}`)}
                  </option>
                ))}
              </select>
            </div>
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
