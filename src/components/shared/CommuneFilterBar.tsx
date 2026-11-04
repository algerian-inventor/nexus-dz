import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { CONSTANTINE_COMMUNES } from '@/modules/organizations/service';

interface CommuneFilterBarProps {
  selectedCommune: string;
  onSelectCommune: (commune: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function CommuneFilterBar({
  selectedCommune,
  onSelectCommune,
  searchQuery,
  onSearchChange,
}: CommuneFilterBarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('common.searchPlaceholder')}
          className="h-9 w-full rounded-md border border-border bg-nexus-surface px-3 text-sm text-nexus-navy placeholder:text-nexus-gray focus:border-nexus-emerald focus:bg-white focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-nexus-emerald shrink-0" />
        <select
          value={selectedCommune}
          onChange={(e) => onSelectCommune(e.target.value)}
          aria-label={t('common.filterByCommune')}
          className="h-9 rounded-md border border-border bg-white px-3 text-xs font-medium text-nexus-navy focus:border-nexus-emerald focus:outline-none"
        >
          <option value="all">{t('common.allCommunes')}</option>
          {CONSTANTINE_COMMUNES.map((c) => (
            <option key={c} value={c}>
              {t(`common.communes.${c}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
