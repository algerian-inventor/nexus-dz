import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, UserPlus, Check, Edit3, UserCheck } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { CommuneFilterBar } from '@/components/shared/CommuneFilterBar';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDemoStore } from '@/data/demoStoreContext';
import { CONSTANTINE_COMMUNES, SECTOR_CATEGORIES } from '@/modules/organizations/service';
import type {
  CommuneKey,
  SectorCategory,
  InitiativeStatus,
  DemoInitiative,
} from '@/data/demoTypes';

export function InitiativesPage() {
  const { t, i18n } = useTranslation();
  const {
    dataset,
    currentAccount,
    upsertInitiative,
    applyToInitiative,
    approveVolunteerApplication,
  } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const [selectedCommune, setSelectedCommune] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [organizationId, setOrganizationId] = useState('org-1');
  const [titleAr, setTitleAr] = useState('');
  const [titleFr, setTitleFr] = useState('');
  const [summaryAr, setSummaryAr] = useState('');
  const [category, setCategory] = useState<SectorCategory>('environment');
  const [commune, setCommune] = useState<CommuneKey>('constantine');
  const [locationDetails, setLocationDetails] = useState('وسط مدينة قسنطينة');
  const [status, setStatus] = useState<InitiativeStatus>('open');
  const [targetVolunteers, setTargetVolunteers] = useState(25);
  const [targetBeneficiaries, setTargetBeneficiaries] = useState(500);

  const currentVolId = currentAccount.volunteerId || 'vol-1';

  const openCreateModal = () => {
    setEditingId(undefined);
    setTitleAr('');
    setTitleFr('');
    setSummaryAr('');
    setCategory('environment');
    setCommune('constantine');
    setLocationDetails('وسط مدينة قسنطينة');
    setStatus('open');
    setTargetVolunteers(25);
    setTargetBeneficiaries(500);
    setDialogOpen(true);
  };

  const openEditModal = (init: DemoInitiative) => {
    setEditingId(init.id);
    setOrganizationId(init.organizationId);
    setTitleAr(init.titleAr);
    setTitleFr(init.titleFr);
    setSummaryAr(init.summaryAr);
    setCategory(init.category);
    setCommune(init.commune);
    setLocationDetails(init.locationDetails);
    setStatus(init.status);
    setTargetVolunteers(init.targetVolunteers);
    setTargetBeneficiaries(init.targetBeneficiaries);
    setDialogOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim() && !titleFr.trim()) return;
    upsertInitiative({
      id: editingId,
      organizationId,
      titleAr: titleAr || titleFr,
      titleFr: titleFr || titleAr,
      summaryAr: summaryAr || 'مبادرة مجتمعية ميدانية بولاية قسنطينة.',
      summaryFr: summaryAr || 'Initiative citoyenne à Constantine.',
      category,
      commune,
      locationDetails,
      status,
      targetVolunteers: Number(targetVolunteers) || 20,
      targetBeneficiaries: Number(targetBeneficiaries) || 300,
      startDate: '2026-11-05',
      endDate: '2026-12-15',
    });
    setDialogOpen(false);
  };

  const filtered = dataset.initiatives.filter((init) => {
    const matchesCommune = selectedCommune === 'all' || init.commune === selectedCommune;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      init.titleAr.toLowerCase().includes(q) ||
      init.titleFr.toLowerCase().includes(q) ||
      init.locationDetails.toLowerCase().includes(q);
    return matchesCommune && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${t('pages.initiatives.title')} (${filtered.length})`}
        subtitle={t('pages.initiatives.subtitle')}
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={openCreateModal}>
                <Plus className="h-4 w-4" />
                {t('pages.initiatives.createBtn')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingId ? t('pages.initiatives.editBtn') : t('pages.initiatives.createBtn')}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-3.5 pt-2">
                <div className="space-y-1.5">
                  <Label>{t('pages.initiatives.colOrg')}</Label>
                  <select
                    value={organizationId}
                    onChange={(e) => setOrganizationId(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs text-nexus-navy"
                  >
                    {dataset.organizations.map((o) => (
                      <option key={o.id} value={o.id}>
                        {isAr ? o.nameAr : o.nameFr}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>عنوان المبادرة (عربي)</Label>
                  <Input
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    placeholder="مثال: حملة تشجير وتنظيف حي زواغي سليمان"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Titre de l'initiative (Français)</Label>
                  <Input
                    value={titleFr}
                    onChange={(e) => setTitleFr(e.target.value)}
                    placeholder="Ex: Campagne de reboisement Cité Zouaghi Slimane"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>{t('pages.organizations.colCategory')}</Label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as SectorCategory)}
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs text-nexus-navy"
                    >
                      {SECTOR_CATEGORIES.map((s) => (
                        <option key={s} value={s}>
                          {t(`sectors.${s}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t('pages.organizations.colCommune')}</Label>
                    <select
                      value={commune}
                      onChange={(e) => setCommune(e.target.value as CommuneKey)}
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs text-nexus-navy"
                    >
                      {CONSTANTINE_COMMUNES.map((c) => (
                        <option key={c} value={c}>
                          {t(`common.communes.${c}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label>Target Volunteers</Label>
                    <Input
                      type="number"
                      value={targetVolunteers}
                      onChange={(e) => setTargetVolunteers(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Target Beneficiaries</Label>
                    <Input
                      type="number"
                      value={targetBeneficiaries}
                      onChange={(e) => setTargetBeneficiaries(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t('pages.initiatives.colStatus')}</Label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as InitiativeStatus)}
                      className="flex h-10 w-full rounded-md border border-input bg-white px-2 text-xs text-nexus-navy"
                    >
                      <option value="open">{t('statuses.open')}</option>
                      <option value="in_progress">{t('statuses.in_progress')}</option>
                      <option value="completed">{t('statuses.completed')}</option>
                      <option value="verified">{t('statuses.verified')}</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Location Details</Label>
                  <Input
                    value={locationDetails}
                    onChange={(e) => setLocationDetails(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t('common.save')}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <CommuneFilterBar
        selectedCommune={selectedCommune}
        onSelectCommune={setSelectedCommune}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('pages.initiatives.colTitle')}</TableHead>
            <TableHead>{t('pages.initiatives.colOrg')}</TableHead>
            <TableHead>{t('pages.initiatives.colCommune')}</TableHead>
            <TableHead>{t('pages.initiatives.colVolunteers')}</TableHead>
            <TableHead>{t('pages.initiatives.colBeneficiaries')}</TableHead>
            <TableHead>{t('pages.initiatives.colStatus')}</TableHead>
            <TableHead>{t('common.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <EmptyDatabaseTableState colSpan={7} sqlTableName="initiatives" />
          ) : (
            filtered.map((init) => {
              const org = dataset.organizations.find((o) => o.id === init.organizationId);
              const isEnrolled = init.enrolledVolunteerIds.includes(currentVolId);
              const isApplied = init.applicantVolunteerIds.includes(currentVolId);

              return (
                <TableRow key={init.id}>
                  <TableCell className="max-w-xs">
                    <p className="font-semibold text-nexus-navy">
                      {isAr ? init.titleAr : init.titleFr}
                    </p>
                    <p className="mt-0.5 text-xs text-nexus-gray">
                      {t(`sectors.${init.category}`)}
                    </p>
                  </TableCell>
                  <TableCell className="max-w-[220px] text-xs font-medium">
                    {org ? (isAr ? org.nameAr : org.nameFr) : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{t(`common.communes.${init.commune}`)}</Badge>
                    <p className="mt-1 text-[11px] text-nexus-gray">{init.locationDetails}</p>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs font-semibold">
                      {init.enrolledVolunteerIds.length} / {init.targetVolunteers}
                    </span>
                    {init.applicantVolunteerIds.length > 0 && (
                      <div className="mt-1.5 space-y-1">
                        {init.applicantVolunteerIds.map((appVolId) => {
                          const v = dataset.volunteers.find((vol) => vol.id === appVolId);
                          return (
                            <div key={appVolId} className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="default"
                                className="h-7 px-2.5 text-[11px]"
                                onClick={() => approveVolunteerApplication(init.id, appVolId)}
                              >
                                <UserCheck className="h-3 w-3" />
                                {t('pages.initiatives.approveApplicantBtn')}:{' '}
                                {v ? (isAr ? v.fullNameAr : v.fullNameFr) : appVolId}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    <strong className="text-nexus-emerald">{init.verifiedBeneficiaries}</strong> /{' '}
                    {init.targetBeneficiaries}
                  </TableCell>
                  <TableCell>
                    <Badge variant={init.status === 'verified' ? 'emerald' : 'outline'}>
                      {t(`statuses.${init.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {isEnrolled ? (
                        <Badge variant="emerald">
                          <Check className="h-3 w-3" />
                          {t('pages.initiatives.enrolledBadge')}
                        </Badge>
                      ) : isApplied ? (
                        <Badge variant="secondary">{t('pages.initiatives.appliedBadge')}</Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-2.5 text-xs"
                          onClick={() => applyToInitiative(init.id, currentVolId)}
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          {t('pages.initiatives.applyBtn')}
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2.5 text-xs"
                        onClick={() => openEditModal(init)}
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        {t('pages.initiatives.editBtn')}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
