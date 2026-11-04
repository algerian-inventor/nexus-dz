import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';
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
import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';
import { useDemoStore } from '@/data/demoStoreContext';
import type { CommuneKey, UserRole } from '@/data/demoTypes';

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createVolunteer, switchRole } = useDemoStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+213 550 00 00 00');
  const [role, setRole] = useState<UserRole>('volunteer');
  const [commune, setCommune] = useState<CommuneKey>('constantine');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length >= 2) {
      createVolunteer({
        fullNameAr: fullName,
        fullNameFr: fullName,
        email: email || 'volunteer@constantine.dz',
        phone,
        commune,
        specialtyAr: 'متطوع ميداني مسجل حديثاً',
        specialtyFr: 'Nouveau Bénévole Terrain',
        skills: ['التنسيق الميداني', 'العمل التطوعي'],
      });
    }
    switchRole(role);
    navigate('/app/dashboard');
  };

  return (
    <div className="container flex min-h-[calc(100vh-12rem)] items-center justify-center py-10">
      <Card className="w-full max-w-lg bg-white">
        <CardHeader className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-nexus-emerald text-white">
            <Shield className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl">{t('auth.registerTitle')}</CardTitle>
          <CardDescription>{t('auth.registerSubtitle')}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">{t('auth.fullNameLabel')}</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex: طارق بن زياد / Tarek Benziad"
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
                  onChange={(e) => setCommune(e.target.value as CommuneKey)}
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="email">{t('auth.emailLabel')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@constantine.dz"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <Button type="submit" className="w-full">
              {t('auth.submitRegister')}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="border-t border-border pt-4 text-xs text-nexus-gray">
          {t('auth.demoNotice')}
        </CardFooter>
      </Card>
    </div>
  );
}
