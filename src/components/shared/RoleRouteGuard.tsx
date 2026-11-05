import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDemoStore } from '@/data/demoStoreContext';
import { canAccessPortal } from '@/modules/auth/service';
import type { UserRole } from '@/data/demoTypes';

interface RoleRouteGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export function RoleRouteGuard({ allowedRoles, children }: RoleRouteGuardProps) {
  const { t, i18n } = useTranslation();
  const { activeRole, switchRole } = useDemoStore();
  const isAr = i18n.language === 'ar';

  if (canAccessPortal(activeRole, allowedRoles)) {
    return <>{children}</>;
  }

  const primaryRequiredRole = allowedRoles[0];

  return (
    <div className="container max-w-2xl py-12">
      <Card className="border-amber-500/40 bg-white/90 backdrop-blur-xl shadow-lg">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-700 border border-amber-500/30">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <Badge variant="outline" className="border-amber-600/40 text-amber-800 text-xs">
              {t('prototype.roleGuardBadge')}
            </Badge>
          </div>
          <CardTitle className="text-lg font-bold text-nexus-navy">
            {t('prototype.roleGuardTitle')}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-xs leading-relaxed text-nexus-gray">
          <p>{t('prototype.roleGuardDesc')}</p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2 text-nexus-navy">
            <div className="flex items-center justify-between">
              <span className="font-medium">{t('prototype.currentSimulatedRole')}:</span>
              <Badge variant="secondary">{t(`roles.${activeRole}`)}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">{t('prototype.requiredRoleForRoute')}:</span>
              <Badge variant="emerald">{t(`roles.${primaryRequiredRole}`)}</Badge>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-50/80 p-3 text-[11px] text-amber-900">
            <strong>{t('prototype.securityDisclaimerTitle')}:</strong>{' '}
            {t('prototype.securityDisclaimerBody')}
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-4">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link to="/app/dashboard">
              {isAr ? (
                <ArrowRight className="h-3.5 w-3.5 me-1.5" />
              ) : (
                <ArrowLeft className="h-3.5 w-3.5 me-1.5" />
              )}
              {t('nav.dashboard')}
            </Link>
          </Button>

          <Button
            size="sm"
            className="bg-nexus-emerald hover:bg-nexus-emerald-deep text-white text-xs gap-1.5"
            onClick={() => switchRole(primaryRequiredRole)}
          >
            <Eye className="h-3.5 w-3.5" />
            {t('prototype.switchRolePreviewBtn')}: {t(`roles.${primaryRequiredRole}`)}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
