import logo from '@/assets/logo.png';
import { Language, languages } from '@/types/Language';
import { useEffect } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import './style.scss';

type Props = {
  language: Language | undefined;
  setLanguage: (la: Language) => void;
};

export default function Header({ language, setLanguage }: Props) {
  const { t } = useTranslation('home');
  const { i18n } = useTranslation();
  const browserLanguage = navigator.language;

  const changeLanguageHandler = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.code);
    document.body.click();
  };

  useEffect(() => {
    const lang =
      languages.find((la) => la.code === browserLanguage) || languages[0];
    i18n.changeLanguage(lang.code);
    setLanguage(lang);
  }, []);

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
    <div className="header-container fixed-top">
      <img className="logo" src={logo} />

      {language && (
        <OverlayTrigger
          placement="bottom"
          trigger="click"
          overlay={popover}
          rootClose
        >
          <div className="language-selected">
            <span className="name">{language.label}</span>
            <ReactCountryFlag countryCode={language.iso2} svg />
          </div>
        </OverlayTrigger>
      )}
    </div>
  );
}
