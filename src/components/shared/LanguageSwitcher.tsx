import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { LOCALE_METADATA, type SupportedLocale } from '@/i18n/config';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLocale = (i18n.language as SupportedLocale) || 'ar';

  const locales: SupportedLocale[] = ['ar', 'fr', 'en'];

  return (
    <div
      className="inline-flex items-center gap-1 rounded-md border border-border bg-white p-1"
      role="group"
      aria-label="Language switcher"
    >
      <Globe className="mx-1.5 h-4 w-4 text-nexus-gray" />
      {locales.map((locale) => {
        const active = currentLocale === locale;
        return (
          <Button
            key={locale}
            type="button"
            size="sm"
            variant={active ? 'default' : 'ghost'}
            className="h-7 px-2.5 text-xs font-medium"
            onClick={() => i18n.changeLanguage(locale)}
          >
            {LOCALE_METADATA[locale].nativeLabel}
          </Button>
        );
      })}
    </div>
  );
}
