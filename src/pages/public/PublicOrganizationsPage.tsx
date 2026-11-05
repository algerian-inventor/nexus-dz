import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

export function PublicOrganizationsPage() {
  const { t, i18n } = useTranslation();
  const { dataset } = useDemoStore();
  const [selectedCommune, setSelectedCommune] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isAr = i18n.language === 'ar';

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

  return (
    <div className="container space-y-6 py-10">
      <SupabaseStatusBanner />

      <PageHeader
        title={`${t('pages.organizations.title')} (${filtered.length})`}
        subtitle={t('pages.organizations.subtitle')}
        badgeText={t('brand.wilaya')}
        actions={
          <Button size="sm" asChild>
            <Link to="/app/organizations">{t('nav.workspace')}</Link>
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
            <TableHead>{t('pages.organizations.colName')}</TableHead>
            <TableHead>{t('pages.organizations.colCategory')}</TableHead>
            <TableHead>{t('pages.organizations.colCommune')}</TableHead>
            <TableHead>{t('pages.organizations.colRegNumber')}</TableHead>
            <TableHead>{t('pages.organizations.colMembers')}</TableHead>
            <TableHead>{t('pages.organizations.colStatus')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <EmptyDatabaseTableState
              colSpan={6}
              title={t('pages.organizations.emptyTitle')}
              description={t('pages.organizations.emptyDesc')}
            />
          ) : (
            filtered.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <p className="font-semibold text-nexus-navy">{isAr ? org.nameAr : org.nameFr}</p>
                  <p className="mt-0.5 text-xs text-nexus-gray">{org.presidentName}</p>
                </TableCell>
                <TableCell className="text-xs font-medium">
                  {t(`sectors.${org.category}`)}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{t(`common.communes.${org.commune}`)}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{org.registrationNumber}</TableCell>
                <TableCell className="font-semibold">{org.membersCount}</TableCell>
                <TableCell>
                  <Badge variant={org.verificationStatus === 'verified' ? 'emerald' : 'secondary'}>
                    {t(`statuses.${org.verificationStatus}`)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
