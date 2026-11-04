import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, CheckCircle2, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { CommuneFilterBar } from '@/components/shared/CommuneFilterBar';
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
import type { CommuneKey, SectorCategory } from '@/data/demoTypes';

export function OrganizationsPage() {
  const { t, i18n } = useTranslation();
  const { dataset, createOrganization, updateOrganizationStatus } = useDemoStore();
  const isAr = i18n.language === 'ar';

  const [selectedCommune, setSelectedCommune] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const [nameAr, setNameAr] = useState('');
  const [nameFr, setNameFr] = useState('');
  const [regNumber, setRegNumber] = useState('AGR-25-2026-0612');
  const [category, setCategory] = useState<SectorCategory>('environment');
  const [commune, setCommune] = useState<CommuneKey>('constantine');
  const [presidentName, setPresidentName] = useState('');
  const [phone, setPhone] = useState('+213 31 90 00 00');
  const [email, setEmail] = useState('contact@asso-constantine.dz');

  const filtered = dataset.organizations.filter((org) => {
    const matchesCommune = selectedCommune === 'all' || org.commune === selectedCommune;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      org.nameAr.toLowerCase().includes(q) ||
      org.nameFr.toLowerCase().includes(q) ||
      org.registrationNumber.toLowerCase().includes(q);
    return matchesCommune && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim() && !nameFr.trim()) return;
    createOrganization({
      nameAr: nameAr || nameFr,
      nameFr: nameFr || nameAr,
      registrationNumber: regNumber,
      category,
      commune,
      address: `${t(`common.communes.${commune}`)} — Constantine`,
      presidentName: presidentName || 'مسؤول الجمعية',
      phone,
      email,
      descriptionAr: 'جمعية محلية مسجلة ضمن العرض التفاعلي لولاية قسنطينة.',
      descriptionFr: 'Association locale enregistrée à Constantine.',
    });
    setNameAr('');
    setNameFr('');
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${t('pages.organizations.title')} (${filtered.length})`}
        subtitle={t('pages.organizations.subtitle')}
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4" />
                {t('pages.organizations.registerOrgBtn')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('pages.organizations.registerOrgBtn')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-3 pt-2">
                <div className="space-y-1">
                  <Label>الاسم بالعربية / Nom en Arabe</Label>
                  <Input
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    placeholder="جمعية قسنطينة للمبادرة الشبابية"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>الاسم بالفرنسية / Nom en Français</Label>
                  <Input
                    value={nameFr}
                    onChange={(e) => setNameFr(e.target.value)}
                    placeholder="Association Constantine Initiative Jeunesse"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>{t('pages.organizations.colCategory')}</Label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as SectorCategory)}
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs"
                    >
                      {SECTOR_CATEGORIES.map((s) => (
                        <option key={s} value={s}>
                          {t(`sectors.${s}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label>{t('pages.organizations.colCommune')}</Label>
                    <select
                      value={commune}
                      onChange={(e) => setCommune(e.target.value as CommuneKey)}
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-xs"
                    >
                      {CONSTANTINE_COMMUNES.map((c) => (
                        <option key={c} value={c}>
                          {t(`common.communes.${c}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>{t('pages.organizations.colRegNumber')}</Label>
                    <Input value={regNumber} onChange={(e) => setRegNumber(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label>President</Label>
                    <Input
                      value={presidentName}
                      onChange={(e) => setPresidentName(e.target.value)}
                      placeholder="Nom du Président"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label>Phone</Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
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
            <TableHead>{t('pages.organizations.colName')}</TableHead>
            <TableHead>{t('pages.organizations.colCategory')}</TableHead>
            <TableHead>{t('pages.organizations.colCommune')}</TableHead>
            <TableHead>{t('pages.organizations.colRegNumber')}</TableHead>
            <TableHead>{t('pages.organizations.colMembers')}</TableHead>
            <TableHead>{t('pages.organizations.colStatus')}</TableHead>
            <TableHead>{t('common.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((org) => (
            <TableRow key={org.id}>
              <TableCell className="max-w-xs">
                <p className="font-semibold text-nexus-navy">{isAr ? org.nameAr : org.nameFr}</p>
                <p className="text-xs text-nexus-gray">{org.presidentName}</p>
                <p className="mt-0.5 text-[11px] text-nexus-gray">{org.address}</p>
              </TableCell>
              <TableCell className="text-xs">{t(`sectors.${org.category}`)}</TableCell>
              <TableCell>
                <Badge variant="secondary">{t(`common.communes.${org.commune}`)}</Badge>
              </TableCell>
              <TableCell className="font-mono text-xs">{org.registrationNumber}</TableCell>
              <TableCell className="font-semibold">{org.membersCount}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    org.verificationStatus === 'verified'
                      ? 'emerald'
                      : org.verificationStatus === 'rejected'
                        ? 'navy'
                        : 'secondary'
                  }
                >
                  {t(`statuses.${org.verificationStatus}`)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap items-center gap-1.5">
                  {org.verificationStatus !== 'verified' && (
                    <Button
                      size="sm"
                      variant="default"
                      className="h-7 px-2.5 text-xs"
                      onClick={() => updateOrganizationStatus(org.id, 'verified')}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {t('pages.organizations.approveBtn')}
                    </Button>
                  )}
                  {org.verificationStatus === 'verified' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2.5 text-xs"
                      onClick={() => updateOrganizationStatus(org.id, 'under_review')}
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      {t('statuses.under_review')}
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
