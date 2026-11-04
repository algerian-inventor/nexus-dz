import { useTranslation } from 'react-i18next';
import { Upload, HardDrive } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyDatabaseTableState } from '@/components/shared/EmptyDatabaseTableState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { evidenceService } from '@/modules/evidence/service';
import { useAuthContext } from '@/modules/auth/context';

export function DocumentationPage() {
  const { t } = useTranslation();
  const { permissions } = useAuthContext();
  const targetBucket = evidenceService.getTargetBucket();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.documentation.title')}
        subtitle={t('pages.documentation.subtitle')}
        actions={
          permissions.canSubmitEvidence ? (
            <Button size="sm" disabled>
              <Upload className="h-4 w-4" />
              {t('pages.documentation.uploadBtn')}
            </Button>
          ) : undefined
        }
      />

      <div className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 text-xs">
        <div className="flex items-center gap-2 text-nexus-navy">
          <HardDrive className="h-4 w-4 text-nexus-emerald" />
          <span className="font-medium">{t('pages.documentation.bucketNotice')}</span>
        </div>
        <Badge variant="outline" className="font-mono">
          {targetBucket}
        </Badge>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('pages.documentation.colTitle')}</TableHead>
            <TableHead>{t('pages.documentation.colInitiative')}</TableHead>
            <TableHead>{t('pages.documentation.colSubmittedBy')}</TableHead>
            <TableHead>{t('pages.documentation.colMime')}</TableHead>
            <TableHead>{t('pages.documentation.colVerification')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EmptyDatabaseTableState colSpan={5} sqlTableName="public.evidence_records" />
        </TableBody>
      </Table>
    </div>
  );
}
