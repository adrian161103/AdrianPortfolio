import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';


i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: 'es',
    debug: false, 

    ns: ['test'],
    defaultNS: 'test',

    backend: {
      loadPath: '/global/{{lng}}/{{ns}}.json'
    },

    interpolation: {
      escapeValue: false
    },


  });

export default i18n;