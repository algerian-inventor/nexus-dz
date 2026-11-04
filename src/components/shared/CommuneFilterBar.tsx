import { useTranslation } from 'react-i18next';
import { MapPin, Search, X } from 'lucide-react';
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
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-white p-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-4">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nexus-gray" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('common.searchPlaceholder')}
          aria-label={t('common.searchPlaceholder')}
          className="h-9 w-full rounded-md border border-border bg-nexus-surface ps-9 pe-8 text-sm text-nexus-navy placeholder:text-nexus-gray/80 transition-colors focus:border-nexus-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-nexus-emerald/20"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-nexus-gray hover:bg-muted hover:text-nexus-navy"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 shrink-0 text-nexus-emerald" />
        <select
          value={selectedCommune}
          onChange={(e) => onSelectCommune(e.target.value)}
          aria-label={t('common.filterByCommune')}
          className="h-9 w-full rounded-md border border-border bg-white px-3 text-xs font-medium text-nexus-navy transition-colors hover:border-nexus-emerald/40 focus:border-nexus-emerald focus:outline-none sm:w-auto"
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
