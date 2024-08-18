// i18n.tsx
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEnglish from './lang/en.json';
import translationRomanian from './lang/ro.json';
import translationRussian from './lang/ru.json';

const resources = {
    en: {
        translation: translationEnglish,
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
        lng: localStorage.getItem('i18nextLng') || 'en', // Load from localStorage or default to 'en'
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

i18next.on('languageChanged', (lng) => {
    localStorage.setItem('i18nextLng', lng);
});

export default i18next;
