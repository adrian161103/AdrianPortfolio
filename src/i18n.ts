// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Opcional (detección automática de idioma)
import LanguageDetector from 'i18next-browser-languagedetector';


// Opcional (para cargar .json vía fetch)
import HttpApi from 'i18next-http-backend';

// Si quieres tipar los recursos, puedes crear una interfaz para tus keys (opcional):
// interface Resources {
//   common: {
//     welcome: string;
//     home: string;
//     about: string;
//     contact: string;
//   };
// }

i18n
  // 1) Backend para cargar los archivos JSON desde /locales/{{lng}}/{{ns}}.json
  .use(HttpApi)
  // 2) Detector de idioma del navegador/QueryString/localStorage
  .use(LanguageDetector)
  // 3) Pasa la instancia de i18next a react-i18next
  .use(initReactI18next)
  .init({
    // Estos lenguajes coinciden con los nombres de las carpetas en public/locales/
    supportedLngs: ['en', 'es'],
    fallbackLng: 'es',
    debug: false, // Ponlo en true si quieres ver logs de i18next en consola

    // Espacios de nombre (namespaces). En este ejemplo, solo "common".
    ns: ['test'],
    defaultNS: 'test',

    // Configuración del backend: dónde va a buscar los JSON
    backend: {
      // La carpeta public/ se sirve directamente, así que '/locales/...'
      loadPath: '/global/{{lng}}/{{ns}}.json'
    },

    // Interpolación (no escapamos porque React ya lo hace)
    interpolation: {
      escapeValue: false
    },

    // Si no quieres detección automática, puedes omitir el plugin
    // i18next-browser-languagedetector y activar directamente:
    // lng: 'es',
    // resources: { ... } // ver ejemplo alternativo al final
  });

export default i18n;