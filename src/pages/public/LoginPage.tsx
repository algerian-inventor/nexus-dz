import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, Mail, ArrowUpRight, AlertTriangle } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honest prototype navigation: no server authentication is performed
    navigate('/app/dashboard');
  };

  return (
    <div className="container space-y-8 py-12 max-w-2xl">
      <div className="space-y-3 text-center">
        <Badge
          variant="emerald"
          className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30 font-medium px-3 py-1"
        >
          {t('pilotBanner.badge')}
        </Badge>
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">{t('auth.loginTitle')}</h1>
        <p className="text-sm text-emerald-100/80 max-w-md mx-auto leading-relaxed">
          {t('auth.loginSubtitle')}
        </p>
      </div>

      {/* Honest Prototype Transparency Notice Card */}
      <div className="rounded-2xl border border-amber-400/40 bg-amber-950/60 p-5 backdrop-blur-md shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
          <AlertTriangle className="h-4 w-4" />
          <span>{t('prototype.securityDisclaimerTitle')}</span>
        </div>
        <p className="text-xs font-normal leading-relaxed text-amber-100/90">
          {t('auth.loginNotice')}
        </p>
      </div>

      {/* Local Prototype Preview Entry Form */}
      <Card className="border-white/80 bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(7,91,53,0.06)]">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-nexus-emerald" />
            <CardTitle className="text-base font-semibold text-nexus-navy">
              {t('auth.submitLogin')}
            </CardTitle>
          </div>
          <CardDescription className="text-xs">{t('prototype.localStorageNotice')}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-nexus-navy">
                {t('auth.emailLabel')}
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@example.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/90 border-slate-200 text-nexus-navy"
                />
                <Mail className="absolute end-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium text-nexus-navy">
                {t('auth.passwordLabel')}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/90 border-slate-200 text-nexus-navy"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-nexus-emerald hover:bg-nexus-emerald-deep text-white shadow-xs"
            >
              <Shield className="h-4 w-4 me-1.5" />
              {t('auth.submitLogin')}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-between gap-3 border-t border-slate-200/60 pt-4 text-xs sm:flex-row">
          <Link
            to="/register"
            className="text-nexus-emerald-deep font-medium hover:underline flex items-center gap-1"
          >
            {t('auth.needAccount')}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <Link to="/" className="text-nexus-gray hover:text-nexus-navy">
            {t('auth.backHome')}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
