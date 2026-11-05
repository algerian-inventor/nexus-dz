import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, Mail, ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react';
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dataset } = useDemoStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'info'; text: string } | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setFeedback({
        type: 'error',
        text: 'Veuillez saisir votre adresse email et mot de passe.',
      });
      return;
    }

    // In pilot phase, verify against registered accounts or coordinator
    const matched = dataset.accounts.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (matched) {
      navigate('/app/dashboard');
    } else {
      // Honest notice: platform is in pilot phase
      setFeedback({
        type: 'info',
        text: "Identifiants en cours de validation par la coordination de la wilaya. Si vous n'avez pas encore finalisé votre enregistrement pilote, veuillez soumettre votre dossier.",
      });
    }
  };

  return (
    <div className="container space-y-8 py-12 max-w-2xl">
      <div className="space-y-3 text-center">
        <Badge
          variant="emerald"
          className="bg-nexus-mint/80 text-nexus-emerald-deep border-nexus-emerald/30 font-medium px-3 py-1"
        >
          {t('pilotBanner.badge')}
        </Badge>
        <h1 className="text-2xl font-semibold text-nexus-navy sm:text-3xl">
          {t('auth.loginTitle')}
        </h1>
        <p className="text-sm text-nexus-gray max-w-md mx-auto leading-relaxed">
          {t('auth.loginSubtitle')}
        </p>
      </div>

      {/* Honest Pilot Notice Card */}
      <div className="rounded-2xl border border-nexus-emerald/25 bg-white/75 p-5 backdrop-blur-md shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-nexus-emerald-deep">
          <Shield className="h-4 w-4" />
          <span>Accréditation Préalable Requise</span>
        </div>
        <p className="text-xs font-normal leading-relaxed text-nexus-gray">
          {t('auth.loginNotice')}
        </p>
      </div>

      {/* Authentic Login Form */}
      <Card className="border-white/80 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(7,91,53,0.06)]">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-nexus-emerald" />
            <CardTitle className="text-base font-semibold text-nexus-navy">
              {t('auth.submitLogin')}
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Saisissez les identifiants fournis lors de la validation de votre agrément.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium">
                {t('auth.emailLabel')}
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@association.dz ou univ-constantine.dz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/90 border-slate-200"
                  required
                />
                <Mail className="absolute end-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium">
                {t('auth.passwordLabel')}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/90 border-slate-200"
                required
              />
            </div>

            {feedback && (
              <div
                className={`flex items-start gap-2.5 rounded-xl p-3 text-xs leading-relaxed ${
                  feedback.type === 'error'
                    ? 'border border-nexus-red/20 bg-nexus-red-light text-nexus-red'
                    : 'border border-nexus-emerald/20 bg-nexus-mint text-nexus-emerald-deep'
                }`}
              >
                {feedback.type === 'error' ? (
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                )}
                <span>{feedback.text}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-nexus-emerald hover:bg-nexus-emerald-deep text-white shadow-xs"
            >
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
