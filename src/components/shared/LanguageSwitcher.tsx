import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { LOCALE_METADATA, type SupportedLocale } from '@/i18n/config';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { i18n } = useTranslation();
  const currentLocale = (i18n.language as SupportedLocale) || 'ar';

  const locales: SupportedLocale[] = ['ar', 'fr', 'en'];
  const isDark = variant === 'dark';

  return (
    <div
      className={
        isDark
          ? 'inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/60 backdrop-blur-md p-1 shadow-inner text-emerald-100'
          : 'inline-flex items-center gap-1 rounded-lg border border-slate-200/70 bg-white/70 backdrop-blur-md p-1 shadow-2xs'
      }
      role="group"
      aria-label="Language switcher"
    >
      <Globe
        className={
          isDark ? 'mx-1.5 h-3.5 w-3.5 text-emerald-300' : 'mx-1.5 h-3.5 w-3.5 text-nexus-gray/80'
        }
      />
      {locales.map((locale) => {
        const active = currentLocale === locale;
        return (
          <Button
            key={locale}
            type="button"
            size="sm"
            variant={active ? 'default' : 'ghost'}
            className={
              active
                ? isDark
                  ? 'h-6 px-2.5 text-[11px] font-semibold bg-emerald-500 text-emerald-950 rounded-full shadow-xs'
                  : 'h-6 px-2 text-[11px] font-medium bg-nexus-emerald/90 text-white shadow-2xs'
                : isDark
                  ? 'h-6 px-2 text-[11px] font-normal text-emerald-200/80 hover:text-white hover:bg-emerald-800/40 rounded-full'
                  : 'h-6 px-2 text-[11px] font-normal text-nexus-navy/70 hover:bg-slate-100/60'
            }
            onClick={() => i18n.changeLanguage(locale)}
          >
            {LOCALE_METADATA[locale].nativeLabel}
          </Button>
        );
      })}
    </div>
  );
}
