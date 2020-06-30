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
    settingString: 'Is Transcription Visible',
  },
  {
    settingName: 'isAssociationPictureVisible',
    action: setIsAssociationPictureVisible,
    settingString: 'Is Association Picture Visible',
  },
  {
    settingName: 'isUserOpinionCheckingVisible',
    action: setIsUserOpinionCheckingVisible,
    settingString: 'Is User Opinion Checking Visible',
  },
  {
    settingName: 'isStatusCheckingVisible',
    action: setIsStatusCheckingVisible,
    settingString: 'Is Status Checking Visible',
  },
  {
    settingName: 'isShowAnswerButtonAvailable',
    action: setIsShowAnswerButtonAvailable,
    settingString: 'Is Show Answer Button Available',
  },
];

export const groupToggleForCardSettingsConfig = [
  {
    settingName: 'isTranslationVisible',
    action: setIsTranslationVisible,
    settingString: 'Is Translation Visible',
  },
  {
    settingName: 'isWordDescriptionVisible',
    action: setIsWordDescriptionVisible,
    settingString: 'Is Word Description Visible',
  },
  {
    settingName: 'isExampleSentenceVisible',
    action: setIsExampleSentenceVisible,
    settingString: 'Is Example Sentence Visible',
  },
];

export const numberInputSettingsConfig = [
  {
    settingName: 'maxCardsNumberPerDay',
    action: setMaxCardsPerDay,
    settingString: 'Max Cards Number Per Day',
  },
  {
    settingName: 'maxNewWordsPerDay',
    action: setMaxNewWordsPerDay,
    settingString: 'Max New Words Number Per Day',
  },
];
