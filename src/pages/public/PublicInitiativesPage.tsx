import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserPlus, Check } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { CommuneFilterBar } from '@/components/shared/CommuneFilterBar';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SupabaseStatusBanner } from '@/components/shared/SupabaseStatusBanner';
import { useDemoStore } from '@/data/demoStoreContext';

export function PublicInitiativesPage() {
  const { t, i18n } = useTranslation();
  const { dataset, applyToInitiative, currentAccount } = useDemoStore();
  const [selectedCommune, setSelectedCommune] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isAr = i18n.language === 'ar';

  const currentVolId = currentAccount.volunteerId || 'vol-1';

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
    <div className="container space-y-6 py-10">
      <SupabaseStatusBanner />

      <PageHeader
        title={`${t('pages.initiatives.title')} (${filtered.length})`}
        subtitle={t('pages.initiatives.subtitle')}
        badgeText={t('brand.wilaya')}
        actions={
          <Button size="sm" asChild>
            <Link to="/app/initiatives">{t('nav.workspace')}</Link>
          </Button>
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
            <TableHead>{t('pages.initiatives.colBeneficiaries')}</TableHead>
            <TableHead>{t('pages.initiatives.colStatus')}</TableHead>
            <TableHead>{t('common.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <EmptyDatabaseTableState colSpan={6} sqlTableName="initiatives" />
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
                  <TableCell className="text-xs font-medium">
                    {org ? (isAr ? org.nameAr : org.nameFr) : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{t(`common.communes.${init.commune}`)}</Badge>
                    <p className="mt-1 text-[11px] text-nexus-gray">{init.locationDetails}</p>
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
                        onClick={() => applyToInitiative(init.id, currentVolId)}
                      >
                        <UserPlus className="h-3.5 w-3.5" />
                        {t('pages.initiatives.applyBtn')}
                      </Button>
                    )}
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
