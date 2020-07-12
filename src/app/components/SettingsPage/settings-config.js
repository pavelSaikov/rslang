import {
  setMaxCardsPerDay,
  setMaxNewWordsPerDay,
  setIsTranslationVisible,
  setIsWordDescriptionVisible,
  setIsExampleSentenceVisible,
  setIsTranscriptionVisible,
  setIsAssociationPictureVisible,
  setIsUserOpinionCheckingVisible,
  setIsStatusCheckingVisible,
  setIsShowAnswerButtonAvailable,
} from './store/Settings.actions';

export const singleToggleSettingsConfig = [
  {
    settingName: 'isTranscriptionVisible',
    action: setIsTranscriptionVisible,
    settingString: 'Видна ли транскрипция слова',
  },
  {
    settingName: 'isAssociationPictureVisible',
    action: setIsAssociationPictureVisible,
    settingString: 'Видна ли картинка-ассоциация',
  },
  {
    settingName: 'isUserOpinionCheckingVisible',
    action: setIsUserOpinionCheckingVisible,
    settingString: 'Проверка пользовательского мнения о слове',
  },
  {
    settingName: 'isStatusCheckingVisible',
    action: setIsStatusCheckingVisible,
    settingString: 'Возможность измениния статуса слова во время игры',
  },
  {
    settingName: 'isShowAnswerButtonAvailable',
    action: setIsShowAnswerButtonAvailable,
    settingString: 'Доступна ли кнопка для демонстрации ответа',
  },
];

export const groupToggleForCardSettingsConfig = [
  {
    settingName: 'isTranslationVisible',
    action: setIsTranslationVisible,
    settingString: 'Виден ли перевод',
  },
  {
    settingName: 'isWordDescriptionVisible',
    action: setIsWordDescriptionVisible,
    settingString: 'Видно ли определение для слова',
  },
  {
    settingName: 'isExampleSentenceVisible',
    action: setIsExampleSentenceVisible,
    settingString: 'Видно ли предложение-пример',
  },
];

export const numberInputSettingsConfig = [
  {
    settingName: 'maxCardsNumberPerDay',
    action: setMaxCardsPerDay,
    settingString: 'Максимальное количество повторяемых карточек в день',
    maxValue: 250,
    minValue: 10,
  },
  {
    settingName: 'maxNewWordsPerDay',
    action: setMaxNewWordsPerDay,
    settingString: 'Максимальное количество новых слов в день',
    maxValue: 25,
    minValue: 5,
  },
];
