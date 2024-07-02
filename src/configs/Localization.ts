import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { HomeTexts } from './localization/HomeTexts';
import { MessageTexts } from './localization/MessageTexts';

export default function configLocalization() {
  i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init({
      resources: {
        en: {
          message: MessageTexts.en,
          home: HomeTexts.en,
        },
        it: {
          message: MessageTexts.it,
          home: HomeTexts.it,
        },
      },
      fallbackLng: 'en',
      defaultNS: 'message',
      interpolation: {
        escapeValue: false,
      },
    });
}
