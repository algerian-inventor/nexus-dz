import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Building2,
  Plus,
  Users,
  Compass,
  UploadCloud,
  CheckCircle2,
  MapPin,
  AlertTriangle,
} from 'lucide-react';
import { useDemoStore } from '@/data/demoStoreContext';
import type { CommuneKey, SectorCategory } from '@/data/demoTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function OrganizationPortalPage() {
  const { t, i18n } = useTranslation();
  const {
    dataset,
    createOrganization,
    upsertInitiative,
    approveVolunteerApplication,
    submitEvidence,
  } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [orgRegNumber, setOrgRegNumber] = useState('');
  const [orgCommune, setOrgCommune] = useState<CommuneKey>('constantine');
  const [orgCategory, setOrgCategory] = useState<SectorCategory>('environment');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [titleAr, setTitleAr] = useState('');
  const [titleFr, setTitleFr] = useState('');
  const [commune, setCommune] = useState<CommuneKey>('constantine');
  const [sector, setSector] = useState<SectorCategory>('environment');
  const [targetVols, setTargetVols] = useState(15);
  const [plannedBens, setPlannedBens] = useState(100);

  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [evTitle, setEvTitle] = useState('');
  const [evInitId, setEvInitId] = useState('');
  const [evBens, setEvBens] = useState(25);
  const [evLocationNote, setEvLocationNote] = useState('');
  const [evFileName, setEvFileName] = useState('');

  // Never fabricate a fallback organization if none exists in the current session
  const currentOrg = dataset.organizations[0] ?? null;

  const orgInitiatives = currentOrg
    ? dataset.initiatives.filter((i) => i.organizationId === currentOrg.id)
    : [];

  const totalApplicants = orgInitiatives.reduce(
    (acc, i) => acc + i.applicantVolunteerIds.length,
    0
  );

  const handleCreateOrgDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;

    createOrganization({
      nameAr: orgName.trim(),
      nameFr: orgName.trim(),
      category: orgCategory,
      commune: orgCommune,
      registrationNumber: orgRegNumber.trim() || 'DRAFT-LOCAL',
      address: t(`common.communes.${orgCommune}`),
      presidentName: '—',
      phone: '—',
      email: 'contact@example.org',
      descriptionAr: orgName.trim(),
      descriptionFr: orgName.trim(),
    });
    setOrgName('');
    setOrgRegNumber('');
    setShowCreateOrgModal(false);
  };

  const handleCreateInitiative = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrg || (!titleAr.trim() && !titleFr.trim())) return;

    const today = new Date().toISOString().slice(0, 10);
    upsertInitiative({
      titleAr: titleAr || titleFr,
      titleFr: titleFr || titleAr,
      organizationId: currentOrg.id,
      category: sector,
      commune,
      locationDetails: t(`common.communes.${commune}`),
      startDate: today,
      endDate: today,
      status: 'open',
      targetVolunteers: Number(targetVols) || 10,
      targetBeneficiaries: Number(plannedBens) || 50,
      summaryAr: titleAr || titleFr,
      summaryFr: titleFr || titleAr,
    });
    setTitleAr('');
    setTitleFr('');
    setShowCreateModal(false);
  };

  const handleSubmitEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    const targetInitId = evInitId || orgInitiatives[0]?.id;
    if (!targetInitId || !evTitle.trim()) return;

    submitEvidence({
      initiativeId: targetInitId,
      taskId: null,
      titleAr: evTitle.trim(),
      titleFr: evTitle.trim(),
      notes: evTitle.trim(),
      fileName: evFileName.trim() || 'local-declaration-draft.txt',
      mimeType: 'text/plain',
      gpsCoordinates:
        evLocationNote.trim() || t(`common.communes.${currentOrg?.commune || 'constantine'}`),
      beneficiariesReached: Number(evBens) || 10,
      hoursClaimed: 8,
    });
    setEvTitle('');
    setEvLocationNote('');
    setEvFileName('');
    setShowEvidenceModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Unverified Local Association Disclaimer */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50/90 p-4 text-xs text-amber-950 shadow-2xs">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
        <p className="leading-relaxed">{t('v5portals.organization.unverifiedOrgNotice')}</p>
      </div>

      {/* Association Header */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#042E1E] via-[#06452D] to-[#075B35] p-6 text-white shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-zellij-Hero opacity-25" />
        <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Building2 className="h-3.5 w-3.5" />
              <span>{t('v5portals.organization.badge')}</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {currentOrg
                ? isAr
                  ? currentOrg.nameAr
                  : currentOrg.nameFr
                : t('v5portals.organization.title')}
            </h1>
            <p className="text-xs text-emerald-100/80">{t('v5portals.organization.subtitle')}</p>
            {currentOrg && (
              <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200/80 pt-1">
                <span className="font-mono">
                  {t('pages.organizations.colRegNumber')}: {currentOrg.registrationNumber}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  {t(`common.communes.${currentOrg.commune}`)}
                </span>
                <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30">
                  {t(`statuses.${currentOrg.verificationStatus}`)}
                </Badge>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {!currentOrg ? (
              <Button
                onClick={() => setShowCreateOrgModal(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs gap-1.5"
              >
                <Plus className="h-4 w-4" />
                {t('v5portals.organization.createOrgDraftBtn')}
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  {t('v5portals.organization.createInitiative')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEvidenceModal(true)}
                  disabled={orgInitiatives.length === 0}
                  className="border-emerald-400/40 bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900/60 text-xs gap-1.5"
                >
                  <UploadCloud className="h-4 w-4" />
                  {t('v5portals.organization.submitAudit')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Honest Empty State if no association exists in local session */}
      {!currentOrg ? (
        <Card className="border-dashed border-nexus-border bg-white/85">
          <CardContent className="p-10 text-center space-y-3">
            <Building2 className="mx-auto h-10 w-10 text-nexus-emerald/60" />
            <h2 className="text-base font-bold text-nexus-navy">
              {t('v5portals.organization.noOrgTitle')}
            </h2>
            <p className="text-xs text-nexus-gray max-w-md mx-auto leading-relaxed">
              {t('v5portals.organization.noOrgDesc')}
            </p>
            <Button
              onClick={() => setShowCreateOrgModal(true)}
              className="mt-2 bg-nexus-emerald text-white text-xs gap-1.5"
            >
              <Plus className="h-4 w-4" />
              {t('v5portals.organization.createOrgDraftBtn')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-nexus-gray">
                    {t('v5portals.organization.kpiInitiatives')}
                  </span>
                  <Compass className="h-4 w-4 text-nexus-emerald" />
                </div>
                <p className="mt-2 text-2xl font-bold text-nexus-navy">{orgInitiatives.length}</p>
                <p className="mt-1 text-[11px] text-nexus-gray">
                  {t('v5portals.organization.kpiInitiativesSub')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-nexus-gray">
                    {t('v5portals.organization.kpiApplicants')}
                  </span>
                  <Users className="h-4 w-4 text-nexus-emerald" />
                </div>
                <p className="mt-2 text-2xl font-bold text-nexus-navy">{totalApplicants}</p>
                <p className="mt-1 text-[11px] text-nexus-gray">
                  {t('v5portals.organization.kpiApplicantsSub')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-nexus-gray">
                    {t('v5portals.organization.kpiVerifiedImpact')}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-nexus-emerald" />
                </div>
                <p className="mt-2 text-2xl font-bold text-nexus-navy">0</p>
                <p className="mt-1 text-[11px] text-amber-700 font-medium">
                  {t('v5portals.organization.kpiVerifiedImpactSub')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Initiatives List */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold text-nexus-navy">
                  {t('v5portals.organization.initiativesListTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orgInitiatives.length === 0 ? (
                  <p className="text-xs text-nexus-gray py-6 text-center">
                    {t('v5portals.organization.emptyInitiatives')}
                  </p>
                ) : (
                  orgInitiatives.map((init) => (
                    <div
                      key={init.id}
                      className="rounded-xl border border-nexus-border p-4 bg-white/70 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/initiatives/${init.id}`}
                          className="font-semibold text-sm text-nexus-navy hover:text-nexus-emerald"
                        >
                          {isAr ? init.titleAr : init.titleFr}
                        </Link>
                        <Badge variant="emerald">{t(`statuses.${init.status}`)}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center justify-between text-xs text-nexus-gray">
                        <span>
                          {t('pages.initiatives.colVolunteers')}: {init.enrolledVolunteerIds.length}{' '}
                          / {init.targetVolunteers}
                        </span>
                        <span>
                          {t('pages.initiatives.colBeneficiaries')}: {init.verifiedBeneficiaries} /{' '}
                          {init.targetBeneficiaries}
                        </span>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <Button size="sm" variant="outline" className="text-xs h-7" asChild>
                          <Link to={`/initiatives/${init.id}`}>
                            {t('v5portals.organization.viewDetailsBtn')}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Volunteer Applications Queue */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold text-nexus-navy">
                  {t('v5portals.organization.applicantsQueueTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orgInitiatives.every((i) => i.applicantVolunteerIds.length === 0) ? (
                  <p className="text-xs text-nexus-gray py-6 text-center">
                    {t('v5portals.organization.emptyApplicants')}
                  </p>
                ) : (
                  orgInitiatives.map((init) =>
                    init.applicantVolunteerIds.map((volId: string) => (
                      <div
                        key={`${init.id}-${volId}`}
                        className="flex items-center justify-between rounded-xl border border-nexus-border p-3.5 bg-white/70"
                      >
                        <div>
                          <p className="text-xs font-semibold text-nexus-navy">ID: {volId}</p>
                          <p className="text-[11px] text-nexus-gray">
                            {isAr ? init.titleAr : init.titleFr}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => approveVolunteerApplication(init.id, volId)}
                          className="text-xs bg-nexus-emerald text-white"
                        >
                          {t('v5portals.organization.acceptApplicantBtn')}
                        </Button>
                      </div>
                    ))
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Modal: Create Trial Association Draft */}
      {showCreateOrgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-nexus-navy">
              {t('v5portals.organization.createOrgDraftBtn')}
            </h3>
            <form onSubmit={handleCreateOrgDraft} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1">{t('auth.orgNameLabel')}</label>
                <input
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full rounded-xl border border-nexus-border px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">{t('auth.regNumberLabel')}</label>
                <input
                  value={orgRegNumber}
                  onChange={(e) => setOrgRegNumber(e.target.value)}
                  placeholder="—"
                  className="w-full rounded-xl border border-nexus-border px-3 py-2 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">{t('auth.communeLabel')}</label>
                  <select
                    value={orgCommune}
                    onChange={(e) => setOrgCommune(e.target.value as CommuneKey)}
                    className="w-full rounded-xl border border-nexus-border px-3 py-2"
                  >
                    <option value="constantine">{t('common.communes.constantine')}</option>
                    <option value="el_khroub">{t('common.communes.el_khroub')}</option>
                    <option value="ali_mendjeli">{t('common.communes.ali_mendjeli')}</option>
                    <option value="ain_smara">{t('common.communes.ain_smara')}</option>
                    <option value="hamma_bouziane">{t('common.communes.hamma_bouziane')}</option>
                    <option value="didouche_mourad">{t('common.communes.didouche_mourad')}</option>
                    <option value="zighoud_youcef">{t('common.communes.zighoud_youcef')}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">{t('auth.sectorLabel')}</label>
                  <select
                    value={orgCategory}
                    onChange={(e) => setOrgCategory(e.target.value as SectorCategory)}
                    className="w-full rounded-xl border border-nexus-border px-3 py-2"
                  >
                    <option value="environment">{t('sectors.environment')}</option>
                    <option value="solidarity">{t('sectors.solidarity')}</option>
                    <option value="youth_tech">{t('sectors.youth_tech')}</option>
                    <option value="heritage">{t('sectors.heritage')}</option>
                    <option value="health">{t('sectors.health')}</option>
                    <option value="education">{t('sectors.education')}</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateOrgModal(false)}
                >
                  {t('common.cancel')}
                </Button>
                <Button type="submit" size="sm" className="bg-nexus-emerald text-white">
                  {t('common.save')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Initiative */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-nexus-navy">
              {t('v5portals.organization.createInitiative')}
            </h3>
            <form onSubmit={handleCreateInitiative} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1">
                  {t('pages.initiatives.colTitle')} (AR)
                </label>
                <input
                  required
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="w-full rounded-xl border border-nexus-border px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Titre (FR)</label>
                <input
                  value={titleFr}
                  onChange={(e) => setTitleFr(e.target.value)}
                  className="w-full rounded-xl border border-nexus-border px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">{t('auth.communeLabel')}</label>
                  <select
                    value={commune}
                    onChange={(e) => setCommune(e.target.value as CommuneKey)}
                    className="w-full rounded-xl border border-nexus-border px-3 py-2"
                  >
                    <option value="constantine">{t('common.communes.constantine')}</option>
                    <option value="el_khroub">{t('common.communes.el_khroub')}</option>
                    <option value="ali_mendjeli">{t('common.communes.ali_mendjeli')}</option>
                    <option value="ain_smara">{t('common.communes.ain_smara')}</option>
                    <option value="hamma_bouziane">{t('common.communes.hamma_bouziane')}</option>
                    <option value="didouche_mourad">{t('common.communes.didouche_mourad')}</option>
                    <option value="zighoud_youcef">{t('common.communes.zighoud_youcef')}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">{t('auth.sectorLabel')}</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as SectorCategory)}
                    className="w-full rounded-xl border border-nexus-border px-3 py-2"
                  >
                    <option value="environment">{t('sectors.environment')}</option>
                    <option value="solidarity">{t('sectors.solidarity')}</option>
                    <option value="youth_tech">{t('sectors.youth_tech')}</option>
                    <option value="heritage">{t('sectors.heritage')}</option>
                    <option value="health">{t('sectors.health')}</option>
                    <option value="education">{t('sectors.education')}</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">
                    {t('pages.initiatives.colVolunteers')}
                  </label>
                  <input
                    type="number"
                    value={targetVols}
                    onChange={(e) => setTargetVols(Number(e.target.value))}
                    className="w-full rounded-xl border border-nexus-border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">{t('impact.kpiPlannedTitle')}</label>
                  <input
                    type="number"
                    value={plannedBens}
                    onChange={(e) => setPlannedBens(Number(e.target.value))}
                    className="w-full rounded-xl border border-nexus-border px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  {t('common.cancel')}
                </Button>
                <Button type="submit" size="sm" className="bg-nexus-emerald text-white">
                  {t('common.save')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Submit Evidence */}
      {showEvidenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-nexus-navy">
              {t('v5portals.organization.submitAudit')}
            </h3>
            <form onSubmit={handleSubmitEvidence} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1">
                  {t('pages.documentation.colInitiative')}
                </label>
                <select
                  value={evInitId}
                  onChange={(e) => setEvInitId(e.target.value)}
                  className="w-full rounded-xl border border-nexus-border px-3 py-2"
                >
                  {orgInitiatives.map((i) => (
                    <option key={i.id} value={i.id}>
                      {isAr ? i.titleAr : i.titleFr}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  {t('pages.documentation.colTitle')}
                </label>
                <input
                  required
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  className="w-full rounded-xl border border-nexus-border px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">{t('impact.kpiReportedTitle')}</label>
                <input
                  type="number"
                  value={evBens}
                  onChange={(e) => setEvBens(Number(e.target.value))}
                  className="w-full rounded-xl border border-nexus-border px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  {t('v5portals.organization.locationNoteLabel')}
                </label>
                <input
                  value={evLocationNote}
                  onChange={(e) => setEvLocationNote(e.target.value)}
                  className="w-full rounded-xl border border-nexus-border px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  {t('v5portals.organization.fileRefLabel')}
                </label>
                <input
                  value={evFileName}
                  onChange={(e) => setEvFileName(e.target.value)}
                  placeholder="report_draft.pdf"
                  className="w-full rounded-xl border border-nexus-border px-3 py-2 font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEvidenceModal(false)}
                >
                  {t('common.cancel')}
                </Button>
                <Button type="submit" size="sm" className="bg-nexus-emerald text-white">
                  {t('common.save')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
