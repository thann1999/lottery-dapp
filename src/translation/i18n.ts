import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { CookieKey, Language } from '@root/constants';
import { storageService } from '@services';

i18n
  // load translation using http -> see /public/locales/<language_code>/translation.json)
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    lng: storageService.getCookie(CookieKey.LANGUAGE) || Language.VI,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
