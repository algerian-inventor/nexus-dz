import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { useAuthContext } from '@/modules/auth/context';

export function TasksPage() {
  const { t } = useTranslation();
  const { permissions } = useAuthContext();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.tasks.title')}
        subtitle={t('pages.tasks.subtitle')}
        actions={
          permissions.canAssignTasks ? (
            <Button size="sm" disabled>
              <Plus className="h-4 w-4" />
              {t('pages.tasks.createBtn')}
            </Button>
          ) : undefined
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('pages.tasks.colTask')}</TableHead>
            <TableHead>{t('pages.tasks.colInitiative')}</TableHead>
            <TableHead>{t('pages.tasks.colAssignee')}</TableHead>
            <TableHead>{t('pages.tasks.colHours')}</TableHead>
            <TableHead>{t('pages.tasks.colStatus')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EmptyDatabaseTableState colSpan={5} sqlTableName="public.tasks" />
        </TableBody>
      </Table>
    </div>
  );
}
