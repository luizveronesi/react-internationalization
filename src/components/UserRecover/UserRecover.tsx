import AppStorage from '@/configs/AppStorage';
import UsabilityUtils from '@/functions/UsabilityUtils';
import { EMPTY_USER, UserData } from '@/types/UserData';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.scss';

type ContainerProps = {
  setUser: (u: UserData) => void;
};

export default function UserRecover({ setUser }: ContainerProps) {
  const { t } = useTranslation('home');
  const [open, setOpen] = useState(false);
  const [localUser, setLocalUser] = useState<UserData | null>(null);

  const handleContinue = () => {
    localUser && setUser({ ...localUser, date: new Date(`${localUser.date}`) });
    setOpen(false);
  };

  const handleDiscard = () => {
    AppStorage.removeUserData();
    setUser(EMPTY_USER);
    setOpen(false);
  };

  useEffect(() => {
    UsabilityUtils.attachCloseToEscape();
    const data = AppStorage.getUserData();
    setLocalUser(data);
    if (data) setOpen(true);
  }, []);

  return (
    <Modal show={open} centered dialogClassName="modal-user">
      <Modal.Header>
        <Modal.Title className="text-center">
          {t('modal.recover.title')}
        </Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={() => setOpen(false)}
        />
      </Modal.Header>
      <Modal.Body>{t('modal.recover.text')}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDiscard}>
          <FontAwesomeIcon icon={faTrash} />
          <span className="ms-2">{t('modal.recover.button.discard')}</span>
        </Button>
        <Button variant="success" onClick={handleContinue}>
          <FontAwesomeIcon icon={faCheck} />
          <span className="ms-2">{t('modal.recover.button.restore')}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
