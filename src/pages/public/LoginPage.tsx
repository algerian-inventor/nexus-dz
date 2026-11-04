import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, UserCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';
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
import { useDemoStore } from '@/data/demoStoreContext';

export function LoginPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { dataset, currentAccount, loginWithDemoAccount } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const [email, setEmail] = useState(currentAccount.email);
  const [password, setPassword] = useState('constantine2026');

  const handleSelectAccount = (accountId: string) => {
    loginWithDemoAccount(accountId);
    navigate('/app/dashboard');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched =
      dataset.accounts.find((a) => a.email.toLowerCase() === email.toLowerCase()) || currentAccount;
    loginWithDemoAccount(matched.id);
    navigate('/app/dashboard');
  };

  return (
    <div className="container space-y-8 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <Badge variant="emerald">{t('demoBanner.badge')}</Badge>
          <h1 className="text-2xl font-bold text-nexus-navy sm:text-3xl">{t('auth.loginTitle')}</h1>
          <p className="text-sm text-nexus-gray">{t('auth.loginSubtitle')}</p>
        </div>

        {/* Predefined Demo Account Selector Grid */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-nexus-gray">
            {t('auth.demoAccountsHeading')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {dataset.accounts.map((acc) => {
              const isSelected = acc.id === currentAccount.id;
              return (
                <Card
                  key={acc.id}
                  className={`backdrop-blur-md transition-all duration-200 ${
                    isSelected
                      ? 'border-2 border-nexus-emerald bg-white/90 shadow-[0_6px_25px_-5px_rgba(11,138,68,0.2)] ring-2 ring-nexus-emerald/20'
                      : 'border-white/80 bg-white/70 hover:border-nexus-emerald/30 hover:bg-white/85 shadow-2xs'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={isSelected ? 'emerald' : 'outline'}>
                        {t(`roles.${acc.role}`)}
                      </Badge>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-nexus-emerald" />}
                    </div>
                    <CardTitle className="pt-1 text-base font-semibold text-nexus-navy">
                      {isAr ? acc.fullNameAr : acc.fullNameFr}
                    </CardTitle>
                    <CardDescription className="text-xs font-normal">
                      {isAr ? acc.titleAr : acc.titleFr}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3 text-xs font-mono text-nexus-gray">
                    {acc.email}
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="button"
                      size="sm"
                      variant={isSelected ? 'default' : 'outline'}
                      className={`w-full ${
                        isSelected
                          ? 'bg-nexus-emerald hover:bg-nexus-emerald-deep shadow-xs'
                          : 'border-slate-200/80 bg-white/80 hover:bg-white'
                      }`}
                      onClick={() => handleSelectAccount(acc.id)}
                    >
                      <UserCheck className="h-4 w-4" />
                      {t('auth.quickEnterBtn')}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Standard Demo Form */}
        <Card className="mx-auto max-w-md border-white/80 bg-white/75 backdrop-blur-md shadow-xs">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-nexus-emerald" />
              <CardTitle className="text-base font-semibold text-nexus-navy">
                {t('auth.submitLogin')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">{t('auth.emailLabel')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-nexus-emerald hover:bg-nexus-emerald-deep shadow-xs"
              >
                {t('auth.submitLogin')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="border-t border-slate-200/60 pt-3 text-xs text-nexus-gray">
            {t('auth.demoNotice')}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
