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
                  className={
                    isSelected
                      ? 'border-2 border-nexus-emerald bg-nexus-emerald-light/20'
                      : 'border-border bg-white'
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={isSelected ? 'emerald' : 'navy'}>
                        {t(`roles.${acc.role}`)}
                      </Badge>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-nexus-emerald" />}
                    </div>
                    <CardTitle className="pt-1 text-base">
                      {isAr ? acc.fullNameAr : acc.fullNameFr}
                    </CardTitle>
                    <CardDescription className="text-xs">
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
                      className="w-full"
                      onClick={() => handleSelectAccount(acc.id)}
                    >
                      <UserCheck className="h-4 w-4" />
                      {t('auth.quickEnterBtn')}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Standard Demo Form */}
        <Card className="mx-auto max-w-md bg-white">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-nexus-emerald" />
              <CardTitle className="text-base">{t('auth.submitLogin')}</CardTitle>
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
              <Button type="submit" className="w-full">
                {t('auth.submitLogin')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="border-t border-border pt-3 text-xs text-nexus-gray">
            {t('auth.demoNotice')}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
