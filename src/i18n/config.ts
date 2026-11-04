import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import fr from './locales/fr.json';
import en from './locales/en.json';

export type SupportedLocale = 'ar' | 'fr' | 'en';

export const LOCALE_METADATA: Record<
  SupportedLocale,
  { label: string; nativeLabel: string; dir: 'rtl' | 'ltr' }
> = {
  ar: { label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
  fr: { label: 'French', nativeLabel: 'Français', dir: 'ltr' },
  en: { label: 'English', nativeLabel: 'English', dir: 'ltr' },
};

const STORAGE_KEY = 'nexus_dz_locale';

function getInitialLocale(): SupportedLocale {
  if (typeof window === 'undefined') return 'ar';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'ar' || saved === 'fr' || saved === 'en') {
    return saved;
  }
  return 'ar'; // Arabic is the mandatory default
}

export function applyDocumentDirection(locale: SupportedLocale) {
  if (typeof document === 'undefined') return;
  const meta = LOCALE_METADATA[locale] ?? LOCALE_METADATA.ar;
  document.documentElement.lang = locale;
  document.documentElement.dir = meta.dir;
}

const initialLocale = getInitialLocale();
applyDocumentDirection(initialLocale);

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: initialLocale,
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  const validLocale: SupportedLocale = lng === 'fr' || lng === 'en' || lng === 'ar' ? lng : 'ar';
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, validLocale);
  }
  applyDocumentDirection(validLocale);
});

export default i18n;
