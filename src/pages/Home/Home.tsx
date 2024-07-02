import Header from '@/components/Header';
import RadioButtonChoices from '@/components/RadioButtonChoices';
import Sidebar from '@/components/Sidebar';
import StringUtils from '@/functions/StringUtils';
import { Language, languages } from '@/types/Language';
import { Question } from '@/types/Question';
import { levels, Theme } from '@/types/Theme';
import { EMPTY_USER, UserData } from '@/types/UserData';
import cx from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './style.scss';

export default function Home() {
  const { t } = useTranslation('home');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [level, setLevel] = useState('junior');
  const [theme, setTheme] = useState<Theme>();
  const [language, setLanguage] = useState<Language>();
  const [user, setUser] = useState<UserData>(EMPTY_USER);

  const loadQuestions = useCallback(() => {
    if (!theme || !level) return;

    const filename = theme.name
      .replace(/-/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    fetch(`files/${filename}-${level}.json`)
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => {
        console.error(error);
        alert(`t('alert.loading.file') ${filename}-${level}.json`);
      });
  }, [theme, level]);

  const getLevelState = (thisLevel: string) => {
    return cx({
      primary: thisLevel === level,
      secondary: thisLevel !== level,
    });
  };

  const getTranslatedQuestion = (q: Question): string => {
    if (!language || language === languages[0]) return q.question;
    return q.translations[language.code][0];
  };

  const getIndexStyle = (q: Question, idx: number) => {
    return cx('index', {
      answered: user.choices.some(
        (c) =>
          theme &&
          c.theme === theme.id &&
          c.level === level &&
          c.question === idx
      ),
      active: idx === index,
    });
  };

  const getQuestionStyle = (idx: number) => {
    return cx('question', {
      'd-none': idx !== index,
    });
  };

  useEffect(() => {
    if (theme && !user.name) {
      setTheme(undefined);
      alert(t('message:alert.candidate.name'));
      return;
    }

    setIndex(0);
    setLevel(levels[0]);
    loadQuestions();
  }, [theme]);

  useEffect(() => {
    setIndex(0);
    loadQuestions();
  }, [level]);

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <Container fluid className="home-container">
        <Row>
          <Col xs={2} className="sidebar">
            <Sidebar
              user={user}
              setUser={setUser}
              theme={theme}
              setTheme={setTheme}
            />
          </Col>
          <Col xs={10} className="questions">
            <div className="levels">
              {levels.map((level, idx) => (
                <Button
                  variant={getLevelState(level)}
                  onClick={() => {
                    setLevel(level);
                    setIndex(0);
                  }}
                  key={idx.valueOf()}
                >
                  {StringUtils.capitalize(level)}
                </Button>
              ))}
            </div>
            <Row>
              <Col xs={1} className="indexes">
                {questions.map((q, idx) => (
                  <div
                    className={getIndexStyle(q, idx)}
                    key={idx.valueOf()}
                    onClick={() => setIndex(idx)}
                  >
                    {idx + 1}
                  </div>
                ))}
              </Col>

              <Col xs={11} className="d-flex">
                {questions.map((q, idx) => (
                  <div className={getQuestionStyle(idx)} key={idx.valueOf()}>
                    <div className="mb-2">
                      <b className="me-2">{idx + 1})</b>
                      <span>{getTranslatedQuestion(q)}</span>
                    </div>
                    {theme && q.code && (
                      <SyntaxHighlighter language={theme.code} style={docco}>
                        {q.code}
                      </SyntaxHighlighter>
                    )}

                    {theme && language && (
                      <RadioButtonChoices
                        theme={theme}
                        level={level}
                        question={q}
                        idx={idx}
                        user={user}
                        language={language}
                      />
                    )}
                    <div className="actions">
                      <Button
                        onClick={() => setIndex((prevState) => prevState - 1)}
                        disabled={index === 0}
                      >
                        {t('home.button.prev')}
                      </Button>
                      <Button
                        onClick={() => setIndex((prevState) => prevState + 1)}
                        disabled={index === questions.length - 1}
                      >
                        {t('home.button.next')}
                      </Button>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
