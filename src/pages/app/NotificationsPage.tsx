import { useTranslation } from 'react-i18next';
import { CheckCheck } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';

export function NotificationsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.notifications.title')}
        subtitle={t('pages.notifications.subtitle')}
        actions={
          <Button size="sm" variant="outline" disabled>
            <CheckCheck className="h-4 w-4" />
            {t('pages.notifications.markAllRead')}
          </Button>
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('pages.notifications.title')}</TableHead>
            <TableHead>{t('pages.verification.colTimestamp')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EmptyDatabaseTableState colSpan={2} sqlTableName="public.notifications" />
        </TableBody>
      </Table>
    </div>
  );
}
