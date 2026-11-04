import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { CommuneFilterBar } from '@/components/shared/CommuneFilterBar';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { useAuthContext } from '@/modules/auth/context';

export function InitiativesPage() {
  const { t } = useTranslation();
  const { permissions } = useAuthContext();
  const [selectedCommune, setSelectedCommune] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.initiatives.title')}
        subtitle={t('pages.initiatives.subtitle')}
        actions={
          permissions.canCreateInitiatives ? (
            <Button size="sm" disabled>
              <Plus className="h-4 w-4" />
              {t('pages.initiatives.createBtn')}
            </Button>
          ) : undefined
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
            <TableHead>{t('pages.initiatives.colTarget')}</TableHead>
            <TableHead>{t('pages.initiatives.colStatus')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EmptyDatabaseTableState colSpan={5} sqlTableName="public.initiatives" />
        </TableBody>
      </Table>
    </div>
  );
}
