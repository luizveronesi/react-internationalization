import FileUtils from '@/functions/FileUtils';
import { Modal } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import './style.scss';

type Props = {
  onClose: () => void;
  onSuccess: (content: string) => void;
};

const DEFAULT_ACCEPT = {
  'application/json': [],
};

export default function AppDropzone({ onClose, onSuccess }: Props) {
  const { t } = useTranslation('home');

  const upload = (files: File[]) => {
    FileUtils.readContent(files[0], (content: string) => {
      onSuccess(content);
    });
  };

  return (
    <Modal show centered dialogClassName="modal-dropzone">
      <Modal.Header>
        <Modal.Title className="text-center">Import file</Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={onClose}
        />
      </Modal.Header>
      <Modal.Body>
        <div className="dropzone-container">
          <Dropzone
            onDrop={(acceptedFiles) => upload(acceptedFiles)}
            accept={DEFAULT_ACCEPT}
            maxFiles={1}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <span>{t('dropzone.text.default')}</span>
              </div>
            )}
          </Dropzone>
        </div>
      </Modal.Body>
    </Modal>
  );
}
