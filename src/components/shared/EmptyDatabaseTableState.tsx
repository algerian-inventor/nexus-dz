import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface EmptyDatabaseTableStateProps {
  colSpan: number;
  sqlTableName: string;
}

export function EmptyDatabaseTableState({ colSpan, sqlTableName }: EmptyDatabaseTableStateProps) {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-48 text-center">
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center space-y-2 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nexus-emerald-light text-nexus-emerald">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-base font-semibold text-nexus-navy">{t('status.emptyTableTitle')}</p>
          <p className="text-xs leading-relaxed text-nexus-gray">{t('status.emptyTableDesc')}</p>
          <div className="pt-1">
            <Badge variant="outline" className="font-mono text-xs">
              Table: {sqlTableName}
            </Badge>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
