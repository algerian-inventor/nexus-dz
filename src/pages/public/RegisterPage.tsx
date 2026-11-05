import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, CheckCircle2, ArrowLeft, ArrowRight, Building2, Users } from 'lucide-react';
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
import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';
import { useDemoStore } from '@/data/demoStoreContext';
import type { CommuneKey, SectorCategory } from '@/data/demoTypes';

export function RegisterPage() {
  const { t, i18n } = useTranslation();
  const { createOrganization, createVolunteer } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const [profileType, setProfileType] = useState<'organization' | 'volunteer'>('organization');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [commune, setCommune] = useState<CommuneKey>('constantine');
  const [orgName, setOrgName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [sector, setSector] = useState<SectorCategory>('environment');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (profileType === 'organization') {
      createOrganization({
        nameAr: orgName || fullName,
        nameFr: orgName || fullName,
        registrationNumber: regNumber.trim() || 'DRAFT-LOCAL',
        category: sector,
        commune,
        address: t(`common.communes.${commune}`),
        presidentName: fullName,
        phone,
        email,
        descriptionAr: notes.trim() || orgName || fullName,
        descriptionFr: notes.trim() || orgName || fullName,
      });
    } else {
      createVolunteer({
        fullNameAr: fullName,
        fullNameFr: fullName,
        email,
        phone,
        commune,
        specialtyAr: notes.trim() || t('roles.volunteer'),
        specialtyFr: notes.trim() || t('roles.volunteer'),
        skills: [t(`sectors.${sector}`)],
      });
    }

    setSubmitted(true);
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
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">{t('auth.registerTitle')}</h1>
        <p className="text-sm text-emerald-100/80 max-w-lg mx-auto leading-relaxed">
          {t('auth.registerSubtitle')}
        </p>
      </div>

      {submitted ? (
        <Card className="border-nexus-emerald/30 bg-white/95 backdrop-blur-xl shadow-lg p-6 sm:p-8 text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-nexus-mint text-nexus-emerald-deep">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-nexus-navy">
              {t('auth.registerSuccessTitle')}
            </h2>
            <p className="text-xs text-nexus-gray leading-relaxed max-w-md mx-auto">
              {t('auth.registerSuccessDesc')}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 text-xs text-start space-y-2 text-nexus-navy">
            <p className="font-semibold text-nexus-emerald-deep">{t('auth.nextStepsTitle')}</p>
            <ul className="space-y-1.5 list-disc list-inside text-nexus-gray">
              <li>{t('auth.nextStep1')}</li>
              <li>{t('auth.nextStep2')}</li>
              <li>{t('auth.nextStep3')}</li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild className="bg-nexus-emerald hover:bg-nexus-emerald-deep text-white">
              <Link to="/app/dashboard">
                {isAr ? (
                  <ArrowRight className="h-4 w-4 me-1.5" />
                ) : (
                  <ArrowLeft className="h-4 w-4 me-1.5" />
                )}
                {t('nav.workspace')}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">{t('auth.backHome')}</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="border-white/80 bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(7,91,53,0.06)]">
          <CardHeader className="space-y-2 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-nexus-emerald" />
              <CardTitle className="text-base font-semibold text-nexus-navy">
                {t('auth.registerTitle')}
              </CardTitle>
            </div>
            <CardDescription className="text-xs leading-relaxed">
              {t('prototype.localStorageNotice')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Profile Selector */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-nexus-navy">{t('auth.roleLabel')}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProfileType('organization')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all ${
                      profileType === 'organization'
                        ? 'border-nexus-emerald bg-nexus-mint text-nexus-emerald-deep shadow-2xs'
                        : 'border-slate-200 bg-white/80 text-nexus-gray hover:bg-white'
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    {t('auth.orgProfileOption')}
                  </button>

                  <button
                    type="button"
                    onClick={() => setProfileType('volunteer')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all ${
                      profileType === 'volunteer'
                        ? 'border-nexus-emerald bg-nexus-mint text-nexus-emerald-deep shadow-2xs'
                        : 'border-slate-200 bg-white/80 text-nexus-gray hover:bg-white'
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    {t('auth.volProfileOption')}
                  </button>
                </div>
              </div>

              {/* Common Fields */}
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-xs font-medium text-nexus-navy">
                  {t('auth.fullNameLabel')}
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white/90 border-slate-200 text-nexus-navy"
                  required
                />
              </div>

              {profileType === 'organization' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="orgName" className="text-xs font-medium text-nexus-navy">
                      {t('auth.orgNameLabel')}
                    </Label>
                    <Input
                      id="orgName"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="bg-white/90 border-slate-200 text-nexus-navy"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="regNumber" className="text-xs font-medium text-nexus-navy">
                      {t('auth.regNumberLabel')}
                    </Label>
                    <Input
                      id="regNumber"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      placeholder="—"
                      className="bg-white/90 border-slate-200 text-nexus-navy font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium text-nexus-navy">
                    {t('auth.emailLabel')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@example.org"
                    className="bg-white/90 border-slate-200 text-nexus-navy"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-medium text-nexus-navy">
                    {t('auth.phoneLabel')}
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+213"
                    className="bg-white/90 border-slate-200 text-nexus-navy"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="commune" className="text-xs font-medium text-nexus-navy">
                    {t('auth.communeLabel')}
                  </Label>
                  <select
                    id="commune"
                    value={commune}
                    onChange={(e) => setCommune(e.target.value as CommuneKey)}
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white/90 px-3 py-2 text-xs text-nexus-navy focus:border-nexus-emerald focus:outline-none"
                  >
                    {CONSTANTINE_COMMUNES.map((c) => (
                      <option key={c} value={c}>
                        {t(`common.communes.${c}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sector" className="text-xs font-medium text-nexus-navy">
                    {t('auth.sectorLabel')}
                  </Label>
                  <select
                    id="sector"
                    value={sector}
                    onChange={(e) => setSector(e.target.value as SectorCategory)}
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white/90 px-3 py-2 text-xs text-nexus-navy focus:border-nexus-emerald focus:outline-none"
                  >
                    <option value="environment">{t('sectors.environment')}</option>
                    <option value="youth_tech">{t('sectors.youth_tech')}</option>
                    <option value="health">{t('sectors.health')}</option>
                    <option value="heritage">{t('sectors.heritage')}</option>
                    <option value="solidarity">{t('sectors.solidarity')}</option>
                    <option value="education">{t('sectors.education')}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-xs font-medium text-nexus-navy">
                  {t('auth.motivationLabel')}
                </Label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="flex w-full rounded-md border border-slate-200 bg-white/90 px-3 py-2 text-xs text-nexus-navy focus:border-nexus-emerald focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-nexus-emerald hover:bg-nexus-emerald-deep text-white shadow-xs"
              >
                {t('auth.submitRegister')}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center justify-between gap-3 border-t border-slate-200/60 pt-4 text-xs sm:flex-row">
            <Link to="/login" className="text-nexus-emerald-deep font-medium hover:underline">
              {t('auth.haveAccount')}
            </Link>
            <Link to="/" className="text-nexus-gray hover:text-nexus-navy">
              {t('auth.backHome')}
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
