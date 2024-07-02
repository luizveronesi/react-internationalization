import DateUtils from '@/functions/DateUtils';
import MathUtils from '@/functions/MathUtils';
import { Results } from '@/types/Results';
import { levels, Theme } from '@/types/Theme';
import { EMPTY_USER, UserChoice, UserData } from '@/types/UserData';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.scss';
import UsabilityUtils from '@/functions/UsabilityUtils';

type ContainerProps = {
  close: () => void;
  user: UserData;
  setUser: (u: UserData) => void;
  themes: Theme[];
};

export default function UserModal({
  close,
  user,
  setUser,
  themes,
}: ContainerProps) {
  const { t } = useTranslation('home');
  const [results, setResults] = useState<Results>();

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(user)], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, `${user.name}-${DateUtils.formatDate(user.date)}.json`);
    setUser(EMPTY_USER);
    close();
  };

  const convertResults = () => {
    const themeResults: Record<number, UserChoice[]> = [];
    user.choices.forEach((choice) => {
      const { theme } = choice;
      if (!themeResults[theme]) {
        themeResults[theme] = [];
      }
      themeResults[theme].push(choice);
    });

    const results: Results = {};
    Object.keys(themeResults).forEach((key) => {
      const choices = themeResults[Number(key)];
      levels.forEach((level) => {
        const theme = themes.find((t) => t.id === Number(key))?.name || '';

        if (!results[theme]) {
          results[theme] = {};
        }

        const correct = choices.filter(
          (c) => c.level === level && c.correct
        ).length;
        const total = choices.filter((c) => c.level === level).length;

        if (total != 0) {
          results[theme][level] = { correct, total };
        }
      });
    });

    setResults(results);
  };

  useEffect(() => {
    UsabilityUtils.attachCloseToEscape();
    convertResults();
  }, []);

  return (
    <Modal show centered dialogClassName="modal-user">
      <Modal.Header>
        <Modal.Title className="text-center">{user.name}</Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={close}
        />
      </Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            <tr>
              <td>{t('modal.user.table.theme')}</td>
              {levels.map((level, idx) => (
                <td key={idx.valueOf()}>{level}</td>
              ))}
              <td>{t('modal.user.table.total')}</td>
            </tr>
          </thead>
          <tbody>
            {results &&
              (() => {
                let total = 0;
                let correct = 0;
                const totalLevels: number[] = [0, 0, 0];
                const correctLevels: number[] = [0, 0, 0];

                const rows = Object.keys(results).map((key, idx) => {
                  let totalTheme = 0;
                  let correctTheme = 0;

                  const row = (
                    <tr key={idx.valueOf()}>
                      <td>{key}</td>
                      {levels.map((level, idx) => {
                        const thisTotal = results[key][level]?.total || 0;
                        const thisCorrect = results[key][level]?.correct || 0;
                        totalTheme += thisTotal;
                        correctTheme += thisCorrect;

                        totalLevels[idx] += thisTotal;
                        correctLevels[idx] += thisCorrect;

                        return (
                          <td
                            key={idx.valueOf()}
                          >{`${thisCorrect} / ${thisTotal}`}</td>
                        );
                      })}
                      <td>{`${correctTheme} / ${totalTheme}`}</td>
                    </tr>
                  );

                  total += totalTheme;
                  correct += correctTheme;

                  return row;
                });

                return (
                  <>
                    {rows}
                    <tr>
                      <td>{t('modal.user.table.total_c')}</td>
                      {levels.map((level, idx) => (
                        <td
                          key={idx.valueOf()}
                        >{`${correctLevels[idx]} / ${totalLevels[idx]}`}</td>
                      ))}
                      <td>{`${correct} / ${total}`}</td>
                    </tr>
                    <tr>
                      <td>{t('modal.user.table.percent')}</td>
                      {levels.map((level, idx) => (
                        <td key={idx.valueOf()}>
                          {MathUtils.calculatePercent(
                            correctLevels[idx],
                            totalLevels[idx]
                          )}
                        </td>
                      ))}
                      <td>{MathUtils.calculatePercent(correct, total)}</td>
                    </tr>
                  </>
                );
              })()}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleExport}>
          <FontAwesomeIcon icon={faFileDownload} />
          <span className="ms-2">{t('modal.user.button.export')}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
