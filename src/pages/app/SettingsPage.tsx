import { useTranslation } from 'react-i18next';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDemoStore } from '@/data/demoStoreContext';

export function SettingsPage() {
  const { t } = useTranslation();
  const { dataset, resetDemoData } = useDemoStore();

  const presentationSteps = [
    '1. Login as Super Admin (Dr. Abderrahmane Benbadis).',
    '2. Review registered Constantine associations and approve pending accreditations.',
    '3. Switch role to Organization Admin (Salima Boussouf — Cirta Environnement).',
    '4. Create a new community initiative in Constantine.',
    '5. Switch role to Volunteer (Amine Ziani).',
    '6. Apply to the newly created community initiative.',
    '7. Switch back to Organization Admin and approve the volunteer application.',
    '8. Assign a field task and record volunteer participation hours.',
    '9. Upload field evidence (photo/report + GPS coordinates + beneficiaries).',
    '10. Switch role to Impact Verifier (Kamel Eddine Mihoubi).',
    '11. Approve the submitted evidence in the Verification Center.',
    '12. Return to the Executive Dashboard and show the updated impact statistics and charts.',
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={t('pages.settings.title')} subtitle={t('pages.settings.subtitle')} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('nav.language')}</CardTitle>
            <CardDescription>{t('common.direction')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LanguageSwitcher />
          </CardContent>
        </Card>

        <Card className="border-nexus-emerald/40">
          <CardHeader>
            <CardTitle className="text-base">{t('pages.settings.resetSectionTitle')}</CardTitle>
            <CardDescription>{t('pages.settings.resetSectionDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2 text-xs text-nexus-gray font-mono">
              <span>Orgs: {dataset.organizations.length}</span>
              <span>•</span>
              <span>Volunteers: {dataset.volunteers.length}</span>
              <span>•</span>
              <span>Initiatives: {dataset.initiatives.length}</span>
              <span>•</span>
              <span>Tasks: {dataset.tasks.length}</span>
            </div>
            <Button variant="navy" onClick={resetDemoData} className="w-full sm:w-auto">
              <RotateCcw className="h-4 w-4" />
              {t('pages.settings.resetConfirmBtn')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 12-Step Presentation Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('pages.dashboard.scenarioTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2.5 sm:grid-cols-2">
          {presentationSteps.map((step) => (
            <div
              key={step}
              className="flex items-start gap-2.5 rounded-md border border-border bg-nexus-surface p-3 text-xs text-nexus-navy"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-nexus-emerald" />
              <span>{step}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
