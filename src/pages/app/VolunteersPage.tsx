import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { CommuneFilterBar } from '@/components/shared/CommuneFilterBar';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';

export function VolunteersPage() {
  const { t } = useTranslation();
  const [selectedCommune, setSelectedCommune] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.volunteers.title')}
        subtitle={t('pages.volunteers.subtitle')}
        actions={
          <Button size="sm" variant="outline" disabled>
            <UserPlus className="h-4 w-4" />
            {t('pages.volunteers.inviteBtn')}
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
            <TableHead>{t('pages.volunteers.colName')}</TableHead>
            <TableHead>{t('pages.volunteers.colCommune')}</TableHead>
            <TableHead>{t('pages.volunteers.colRole')}</TableHead>
            <TableHead>{t('pages.volunteers.colVerifiedHours')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EmptyDatabaseTableState colSpan={4} sqlTableName="public.profiles" />
        </TableBody>
      </Table>
    </div>
  );
}
