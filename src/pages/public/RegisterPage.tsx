import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, AlertCircle } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { registerSchema, authService } from '@/modules/auth/service';
import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';
import type { UserRole } from '@/integrations/supabase/types';

export function RegisterPage() {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('volunteer');
  const [commune, setCommune] = useState<string>('constantine');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const parsed = registerSchema.safeParse({
      fullName,
      email,
      password,
      role,
      commune,
    });

    if (!parsed.success) {
      setStatusMessage(t('auth.validation.nameMin'));
      return;
    }

    const result = await authService.signUp(parsed.data);
    if (result.error) {
      setStatusMessage(t('auth.supabaseNotice'));
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-12rem)] items-center justify-center py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-nexus-emerald text-white">
            <Shield className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl">{t('auth.registerTitle')}</CardTitle>
          <CardDescription>{t('auth.registerSubtitle')}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="fullName">{t('auth.fullNameLabel')}</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t('auth.fullNamePlaceholder')}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="role">{t('auth.roleLabel')}</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-nexus-navy focus:border-nexus-emerald focus:outline-none"
                >
                  <option value="volunteer">{t('roles.volunteer')}</option>
                  <option value="organization_admin">{t('roles.organization_admin')}</option>
                  <option value="verifier">{t('roles.verifier')}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="commune">{t('auth.communeLabel')}</Label>
                <select
                  id="commune"
                  value={commune}
                  onChange={(e) => setCommune(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-nexus-navy focus:border-nexus-emerald focus:outline-none"
                >
                  {CONSTANTINE_COMMUNES.map((c) => (
                    <option key={c} value={c}>
                      {t(`common.communes.${c}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">{t('auth.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder')}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder')}
                required
              />
            </div>

            {statusMessage && (
              <div className="flex items-start gap-2 rounded-md border border-border bg-nexus-surface p-3 text-xs text-nexus-navy">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-nexus-emerald" />
                <span>{statusMessage}</span>
              </div>
            )}

            <Button type="submit" className="w-full">
              {t('auth.submitRegister')}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-2 border-t border-border pt-4 text-xs text-nexus-gray">
          <p>{t('auth.supabaseNotice')}</p>
          <p>
            {t('auth.haveAccount')}{' '}
            <Link to="/login" className="font-semibold text-nexus-emerald hover:underline">
              {t('nav.login')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
