import { Toggle } from './components/Toggle';
import { InputNumber } from './components/InputNumber';

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
} from './store/Settings.actions';

export const singleToggleSettingsConfig = {
  isTranscriptionVisible: {
    action: setIsTranscriptionVisible,
    settingString: 'Is Transcription Visible',
    Component: Toggle,
  },
  isAssociationPictureVisible: {
    action: setIsAssociationPictureVisible,
    settingString: 'Is Association Picture Visible',
    Component: Toggle,
  },
  isUserOpinionCheckingVisible: {
    action: setIsUserOpinionCheckingVisible,
    settingString: 'Is User Opinion Checking Visible',
    Component: Toggle,
  },
  isStatusCheckingVisible: {
    action: setIsStatusCheckingVisible,
    settingString: 'Is Status Checking Visible',
    Component: Toggle,
  },
};

export const groupToggleForCardSettingsConfig = {
  isTranslationVisible: {
    action: setIsTranslationVisible,
    settingString: 'Is Translation Visible',
    Component: Toggle,
  },
  isWordDescriptionVisible: {
    action: setIsWordDescriptionVisible,
    settingString: 'Is Word Description Visible',
    Component: Toggle,
  },
  isExampleSentenceVisible: {
    action: setIsExampleSentenceVisible,
    settingString: 'Is Example Sentence Visible',
    Component: Toggle,
  },
};

export const numberInputSettingsConfig = {
  maxCardsNumberPerDay: {
    action: setMaxCardsPerDay,
    settingString: 'Max Cards Number Per Day',
    Component: InputNumber,
  },
  maxNewWordsPerDay: {
    action: setMaxNewWordsPerDay,
    settingString: 'Max New Words Number Per Day',
    Component: InputNumber,
  },
};
