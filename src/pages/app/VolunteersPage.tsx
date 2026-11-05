import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, Clock } from 'lucide-react';
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
import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';
import type { CommuneKey } from '@/data/demoTypes';

export function VolunteersPage() {
  const { t, i18n } = useTranslation();
  const { dataset, createVolunteer } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const [selectedCommune, setSelectedCommune] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const [fullNameAr, setFullNameAr] = useState('');
  const [fullNameFr, setFullNameFr] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+213 550 11 22 33');
  const [commune, setCommune] = useState<CommuneKey>('constantine');
  const [specialty, setSpecialty] = useState('');
  const [skillsInput, setSkillsInput] = useState('الإسعافات الأولية, التنسيق الميداني');

  const filtered = dataset.volunteers.filter((vol) => {
    const matchesCommune = selectedCommune === 'all' || vol.commune === selectedCommune;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      vol.fullNameAr.toLowerCase().includes(q) ||
      vol.fullNameFr.toLowerCase().includes(q) ||
      vol.specialtyAr.toLowerCase().includes(q) ||
      vol.specialtyFr.toLowerCase().includes(q);
    return matchesCommune && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullNameAr.trim() && !fullNameFr.trim()) return;
    createVolunteer({
      fullNameAr: fullNameAr || fullNameFr,
      fullNameFr: fullNameFr || fullNameAr,
      email: email || 'volunteer@constantine.dz',
      phone,
      commune,
      specialtyAr: specialty || 'متطوع ميداني',
      specialtyFr: specialty || 'Bénévole Terrain',
      skills: skillsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    });
    setFullNameAr('');
    setFullNameFr('');
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${t('pages.volunteers.title')} (${filtered.length})`}
        subtitle={t('pages.volunteers.subtitle')}
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4" />
                {t('pages.volunteers.inviteBtn')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('pages.volunteers.inviteBtn')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-3.5 pt-2">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>الاسم بالعربية</Label>
                    <Input
                      value={fullNameAr}
                      onChange={(e) => setFullNameAr(e.target.value)}
                      placeholder="خالد بن طوبال"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nom en Français</Label>
                    <Input
                      value={fullNameFr}
                      onChange={(e) => setFullNameFr(e.target.value)}
                      placeholder="Khaled Bentoubal"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>{t('pages.volunteers.colCommune')}</Label>
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
                  <div className="space-y-1.5">
                    <Label>Specialty</Label>
                    <Input
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      placeholder="مهندس / مسعف / أستاذ"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Email</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Phone</Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>{t('pages.volunteers.colSkills')}</Label>
                  <Input value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} />
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
            <TableHead>{t('pages.volunteers.colName')}</TableHead>
            <TableHead>{t('pages.volunteers.colCommune')}</TableHead>
            <TableHead>{t('pages.volunteers.colSkills')}</TableHead>
            <TableHead>{t('pages.volunteers.colTasks')}</TableHead>
            <TableHead>{t('pages.volunteers.colVerifiedHours')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <EmptyDatabaseTableState
              colSpan={5}
              title={t('pages.volunteers.emptyTitle')}
              description={t('pages.volunteers.emptyDesc')}
            />
          ) : (
            filtered.map((vol) => (
              <TableRow key={vol.id}>
                <TableCell>
                  <p className="font-semibold text-nexus-navy">
                    {isAr ? vol.fullNameAr : vol.fullNameFr}
                  </p>
                  <p className="mt-0.5 text-xs text-nexus-gray">
                    {isAr ? vol.specialtyAr : vol.specialtyFr}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-nexus-gray">{vol.email}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{t(`common.communes.${vol.commune}`)}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5">
                    {vol.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-[11px]">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{vol.completedTasksCount}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="emerald" className="font-mono">
                      <Clock className="h-3 w-3" />
                      {vol.verifiedHours}h
                    </Badge>
                    {vol.pendingHours > 0 && (
                      <Badge variant="secondary" className="font-mono text-[11px]">
                        +{vol.pendingHours}h pending
                      </Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
