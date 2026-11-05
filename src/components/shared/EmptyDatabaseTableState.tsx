import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface EmptyDatabaseTableStateProps {
  colSpan: number;
  sqlTableName?: string;
  title?: string;
  description?: string;
}

export function EmptyDatabaseTableState({
  colSpan,
  sqlTableName,
  title,
  description,
}: EmptyDatabaseTableStateProps) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const defaultTitle = isAr
    ? 'لا توجد سجلات مطابقة لمعايير البحث الحالية'
    : i18n.language === 'fr'
      ? 'Aucun enregistrement ne correspond à vos critères'
      : 'No records match your current criteria';

  const defaultDesc = isAr
    ? 'لم يتم العثور على سجلات في بلديات ولاية قسنطينة. يمكنك توسيع نطاق البحث أو تقديم طلب جديد.'
    : i18n.language === 'fr'
      ? 'Aucun enregistrement répertorié pour cette sélection dans la wilaya de Constantine.'
      : 'No records found for this selection in Constantine Province.';

  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-44 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-2 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nexus-mint text-nexus-emerald-deep">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold text-nexus-navy">{title || defaultTitle}</p>
          <p className="text-xs leading-relaxed text-nexus-gray">{description || defaultDesc}</p>
          {sqlTableName && (
            <div className="pt-1">
              <Badge variant="outline" className="font-mono text-[11px] border-slate-200">
                {t('common.verifiedNotice')} • {sqlTableName}
              </Badge>
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
