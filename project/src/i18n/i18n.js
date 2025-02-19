import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// Import our translation files
import enTranslations from './translations/en.json';
import hiTranslations from './translations/hi.json';

// Initialize i18next with our configuration
i18n
  // Use browser language detector
  .use(LanguageDetector)
  // Initialize react-i18next
  .use(initReactI18next)
  .init({
    // Define our resources (translations)
    resources: {
      en: {
        translation: enTranslations
      },
      hi: {
        translation: hiTranslations
      }
    },
    // Default language if detection fails
    fallbackLng: 'en',
    // Don't escape special characters
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;