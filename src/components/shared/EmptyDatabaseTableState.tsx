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
      ? 'Aucun enregistrement ne correspond à votre filtre'
      : 'No records match your current filter';

  const defaultDesc = isAr
    ? 'جرب تغيير البلدية المختارة أو مسح نص البحث لعرض كافة السجلات المتاحة في ولاية قسنطينة.'
    : i18n.language === 'fr'
      ? 'Modifiez le filtre de commune ou effacez la recherche pour afficher tous les enregistrements.'
      : 'Try selecting a different Constantine commune or clearing the search query.';

  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-44 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-2 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nexus-emerald-light text-nexus-emerald">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold text-nexus-navy">{title || defaultTitle}</p>
          <p className="text-xs leading-relaxed text-nexus-gray">{description || defaultDesc}</p>
          {sqlTableName && (
            <div className="pt-1">
              <Badge variant="outline" className="font-mono text-[11px]">
                {t('common.demoTag')} • {sqlTableName}
              </Badge>
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
