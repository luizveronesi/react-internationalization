import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { HomeTexts } from './localization/HomeTexts';
import { MessageTexts } from './localization/MessageTexts';
import { FooterTexts } from './localization/FooterTexts';

export default function configLocalization() {
  i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init({
      resources: {
        en: {
          message: MessageTexts.en,
          home: HomeTexts.en,
          footer: FooterTexts.en,
        },
        'pt-BR': {
          message: MessageTexts['pt-BR'],
          home: HomeTexts['pt-BR'],
          footer: FooterTexts['pt-BR'],
        },
      },
      fallbackLng: 'en',
      defaultNS: 'message',
      interpolation: {
        escapeValue: false,
      },
    });
}
