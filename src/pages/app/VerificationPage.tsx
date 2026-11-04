import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { useAuthContext } from '@/modules/auth/context';

export function VerificationPage() {
  const { t } = useTranslation();
  const { permissions } = useAuthContext();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.verification.title')}
        subtitle={t('pages.verification.subtitle')}
        badgeText={t('status.verifiedFramework')}
        actions={
          permissions.canVerifyEvidence ? (
            <Button size="sm" disabled>
              <ShieldCheck className="h-4 w-4" />
              {t('pages.verification.auditBtn')}
            </Button>
          ) : undefined
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('pages.verification.colEvidence')}</TableHead>
            <TableHead>{t('pages.verification.colVerifier')}</TableHead>
            <TableHead>{t('pages.verification.colDecision')}</TableHead>
            <TableHead>{t('pages.verification.colTimestamp')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EmptyDatabaseTableState colSpan={4} sqlTableName="public.verification_audits" />
        </TableBody>
      </Table>
    </div>
  );
}
