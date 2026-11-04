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
import { loginSchema, authService } from '@/modules/auth/service';

export function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setStatusMessage(t('auth.validation.emailInvalid'));
      return;
    }

    const result = await authService.signInWithPassword(parsed.data);
    if (result.error) {
      setStatusMessage(t('auth.supabaseNotice'));
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-12rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-nexus-emerald text-white">
            <Shield className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl">{t('auth.loginTitle')}</CardTitle>
          <CardDescription>{t('auth.loginSubtitle')}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
              {t('auth.submitLogin')}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-2 border-t border-border pt-4 text-xs text-nexus-gray">
          <p>{t('auth.supabaseNotice')}</p>
          <p>
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="font-semibold text-nexus-emerald hover:underline">
              {t('nav.register')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
