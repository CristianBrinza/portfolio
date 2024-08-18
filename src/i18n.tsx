//i18n.tsx
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEnglish from './lang/en.json';
import translationRomanian from './lang/ro.json';
import translationRussian from './lang/ru.json';

const resources = {
  en: {
    translation: translationEnglish, // "translation" is the default namespace
  },
    ro: {
        translation: translationRomanian,
    },
    ru: {
        translation: translationRussian,
    },
};

i18next
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    // Removed the language detector to rely on URL parameter
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });
export default i18next;
