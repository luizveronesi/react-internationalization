import { Theme } from '@/types/Theme';
import { UserData } from '@/types/UserData';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AppDropzone from '../AppDropzone';
import UserModal from '../UserModal';
import './style.scss';
import UserRecover from '../UserRecover';

type Props = {
  user: UserData;
  setUser: (u: UserData) => void;
  theme: Theme | undefined;
  setTheme: (s: Theme) => void;
};

export default function Sidebar({ user, setUser, theme, setTheme }: Props) {
  const { t } = useTranslation('home');
  const [themes, setThemes] = useState<Theme[]>([]);
  const [openUser, setOpenUser] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  const loadSubjects = () => {
    fetch('files/index.json')
      .then((response) => response.json())
      .then((data) => setThemes(data))
      .catch((error) => console.error('Error fetching the data:', error));
  };

  const handleImport = (content: string) => {
    setUser(JSON.parse(content));
    setOpenImport(false);
  };

  const handleOpenResults = () => {
    if (!user.name) {
      alert(t('message:alert.candidate.name'));
      return;
    }

    setOpenUser(true);
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  return (
    <div className="sidebar-container">
      <div className="person">
        <h5>{t('sidebar.label.candidate')}</h5>
        <input
          type="text"
          value={user.name}
          onChange={(ev) => setUser({ ...user, name: ev.target.value })}
          placeholder={t('sidebar.placeholder.name')}
        />
        <div className="actions mt-2">
          <Button
            variant="warning"
            size="sm"
            onClick={() => setOpenImport(true)}
          >
            {t('sidebar.button.import')}
          </Button>
          <Button
            variant="success"
            size="sm"
            className="float-end"
            onClick={handleOpenResults}
          >
            {t('sidebar.button.results')}
          </Button>
        </div>
      </div>
      <hr />
      <div className="themes">
        <h5>{t('sidebar.label.themes')}</h5>
        <ul>
          {themes &&
            themes.map((s, idx) => (
              <li
                className={s.id === theme?.id ? 'active' : ''}
                key={idx.valueOf()}
                onClick={() => setTheme(s)}
              >
                {s.name}
              </li>
            ))}
        </ul>
      </div>
      {openUser && (
        <UserModal
          close={() => setOpenUser(false)}
          user={user}
          setUser={setUser}
          themes={themes}
        />
      )}
      {openImport && (
        <AppDropzone
          onClose={() => setOpenImport(false)}
          onSuccess={handleImport}
        />
      )}
      <UserRecover setUser={setUser} />
    </div>
  );
}
