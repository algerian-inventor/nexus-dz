import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/PageHeader';
import { CommuneFilterBar } from '@/components/shared/CommuneFilterBar';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import { SupabaseStatusBanner } from '@/components/shared/SupabaseStatusBanner';

export function PublicOrganizationsPage() {
  const { t } = useTranslation();
  const [selectedCommune, setSelectedCommune] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container space-y-6 py-10">
      <SupabaseStatusBanner />

      <PageHeader
        title={t('pages.organizations.title')}
        subtitle={t('pages.organizations.subtitle')}
        badgeText={t('brand.wilaya')}
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
            <TableHead>{t('pages.organizations.colStatus')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EmptyDatabaseTableState colSpan={5} sqlTableName="public.organizations" />
        </TableBody>
      </Table>
    </div>
  );
}
