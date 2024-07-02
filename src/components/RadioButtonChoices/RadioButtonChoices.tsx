import { Theme } from '@/types/Theme';
import { UserData } from '@/types/UserData';
import { useEffect, useState } from 'react';
import './style.scss';
import { Question } from '@/types/Question';
import { Language, languages } from '@/types/Language';
import AppStorage from '@/configs/AppStorage';

type Props = {
  theme: Theme;
  level: string;
  question: Question;
  idx: number;
  user: UserData;
  language: Language;
};

export default function RadioButtonChoices({
  theme,
  level,
  question,
  idx,
  user,
  language,
}: Props) {
  const [selected, setSelected] = useState('');

  const getTranslatedAnswer = (idy: number): string | null => {
    if (language === languages[0]) return null;
    return question.translations[language.code][idy + 1];
  };

  const getChoice = () => {
    return user.choices.find(
      (c) => c.theme === theme.id && c.level === level && c.question === idx
    );
  };

  const handleChoose = (value: number) => {
    if (!theme) return;

    const choice = getChoice();
    if (choice) {
      choice.value = value;
      choice.correct = question.correct === value;
    } else {
      user.choices.push({
        theme: theme.id,
        level,
        question: idx,
        value,
        correct: question.correct === value,
      });
    }

    setSelected(`${theme.id}_${level}_${idx}_${value}`);
    AppStorage.setUserData(user);
  };

  useEffect(() => {
    const choice = getChoice();
    choice
      ? setSelected(
          `${choice.theme}_${choice.level}_${choice.question}_${choice.value}`
        )
      : '';
  }, [theme, level]);

  return (
    <div className="answers-container">
      {question.answers.map((answer, idy) => (
        <div className="answer" key={`${idx.valueOf()}_${idy.valueOf()}}`}>
          <input
            type="radio"
            id={`question-${idx}-answer-${idy}`}
            name={`question-${idx}`}
            value={`${theme.id}_${level}_${idx}_${idy}`}
            checked={selected === `${theme.id}_${level}_${idx}_${idy}`}
            onChange={() => handleChoose(idy)}
          />
          <label htmlFor={`question-${idx}-answer-${idy}`}>
            {getTranslatedAnswer(idy) || answer}
          </label>
        </div>
      ))}
    </div>
  );
}
