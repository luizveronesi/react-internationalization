import { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation, Trans } from 'react-i18next';
import './style.scss';

type Language = {
  value: string;
  label: string;
  iso2: string;
};

const languages: Language[] = [
  { value: 'en', label: 'English', iso2: 'us' },
  { value: 'pt-BR', label: 'Português (Brasil)', iso2: 'br' },
];

export default function Home() {
  const { t } = useTranslation(['home', 'footer']);
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>(languages[0]);

  const changeLanguageHandler = (lang: any) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.value);
    document.body.click();
  };

  const popover = (
    <Popover className="popover-language">
      <Popover.Body className="list-languages">
        <ul>
          {languages.map((lang: any, idx: number) => (
            <li key={idx.valueOf()}>
              <span
                onClick={() => changeLanguageHandler(lang)}
                onKeyDown={() => changeLanguageHandler(lang)}
                role="button"
                tabIndex={0}
                className="d-flex align-items-center"
              >
                <ReactCountryFlag
                  countryCode={lang.iso2}
                  className="flag"
                  svg
                />
                <span className="name">{lang.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="home-container">
      <div className="box">
        <div className="header">
          <OverlayTrigger
            placement="bottom"
            trigger="click"
            overlay={popover}
            rootClose
          >
            <span className="language-selected">
              <h3>{t('home:label.choose.language')}</h3>
              <div className="flag">
                <ReactCountryFlag countryCode={language.iso2} svg />
                <span className="name">{language.label}</span>
              </div>
            </span>
          </OverlayTrigger>
        </div>
        <div className="body">
          <p>{t('home:text.example')}</p>
          <p>
            <Trans
              t={t}
              i18nKey="home:trans.example"
              components={{ bold: <span className="bold" /> }}
              values={{ value: 10 }}
            />
          </p>
        </div>
        <div className="footer">{t('footer:text.example')}</div>
      </div>
    </div>
  );
}
