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
  setIsWordDescriptionTranslationVisible,
  setIsExampleSentenceTranslationVisible,
  setIsShowAnswerButtonAvailable,
} from './Settings.actions';
import { createSettings } from './create-settings';

export const settingsReducer = (state = createSettings({}), action) => {
  switch (action.type) {
    case setMaxCardsPerDay.type:
      return createSettings({ ...state, maxCardsNumberPerDay: action.payload });
    case setMaxNewWordsPerDay.type:
      return createSettings({ ...state, maxNewWordsPerDay: action.payload });
    case setIsTranslationVisible.type:
      return createSettings({ ...state, isTranslationVisible: action.payload });
    case setIsWordDescriptionVisible.type:
      return createSettings({
        ...state,
        isWordDescriptionVisible: action.payload,
      });
    case setIsWordDescriptionTranslationVisible.type: {
      return createSettings({ ...state, isWordDescriptionTranslationVisible: action.payload });
    }
    case setIsExampleSentenceVisible.type:
      return createSettings({
        ...state,
        isExampleSentenceVisible: action.payload,
      });
    case setIsExampleSentenceTranslationVisible.type: {
      return createSettings({ ...state, isExampleSentenceTranslationVisible: action.payload });
    }
    case setIsTranscriptionVisible.type:
      return createSettings({ ...state, isTranscriptionVisible: action.payload });
    case setIsAssociationPictureVisible.type:
      return createSettings({ ...state, isAssociationPictureVisible: action.payload });
    case setIsUserOpinionCheckingVisible.type:
      return createSettings({ ...state, isUserOpinionCheckingVisible: action.payload });
    case setIsStatusCheckingVisible.type:
      return createSettings({ ...state, isStatusCheckingVisible: action.payload });
    case setIsShowAnswerButtonAvailable.type:
      return createSettings({ ...state, isShowAnswerButtonAvailable: action.payload });
    default:
      return state;
  }
};
