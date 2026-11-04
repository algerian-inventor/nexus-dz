import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { CommuneFilterBar } from '@/components/shared/CommuneFilterBar';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useAuthContext } from '@/modules/auth/context';

export function OrganizationsPage() {
  const { t } = useTranslation();
  const { permissions } = useAuthContext();
  const [selectedCommune, setSelectedCommune] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.organizations.title')}
        subtitle={t('pages.organizations.subtitle')}
        actions={
          permissions.canManageOrganizations ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  {t('pages.organizations.registerOrgBtn')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('pages.organizations.registerOrgBtn')}</DialogTitle>
                  <DialogDescription>{t('auth.supabaseNotice')}</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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
