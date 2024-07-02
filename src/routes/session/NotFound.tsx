import logo from '@/assets/logo.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';
import './style.scss';

export default function NotFound() {
  const { t } = useTranslation('message');
  const error = useRouteError();
  const [show, setShow] = useState(false);

  return (
    <div className="box-container">
      <div className="box">
        <img src={logo} />
        <h1 className="title">{t('notfound.label.disclaimer')}</h1>
        <div
          className="error-details"
          onClick={() => setShow((prevState) => !prevState)}
          role="presentation"
        >
          {t('notfound.label.errors')}
        </div>
      </div>
      {show && (
        <pre className="error-stack">{JSON.stringify(error, null, 2)}</pre>
      )}
    </div>
  );
}
