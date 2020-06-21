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
} from './Settings.actions';

const DEFAULT_SETTINGS = {
  maxCardsNumberPerDay: 100,
  maxNewWordsPerDay: 20,
  isTranscriptionVisible: true,
  isAssociationPictureVisible: true,
  isUserOpinionCheckingVisible: true,
  isStatusCheckingVisible: true,
  isTranslationVisible: true,
  isWordDescriptionVisible: false,
  isExampleSentenceVisible: true,
};
export const settingsReducer = (state = DEFAULT_SETTINGS, action) => {
  switch (action.type) {
    case setMaxCardsPerDay.type:
      return { ...state, maxCardsNumberPerDay: action.payload };
    case setMaxNewWordsPerDay.type:
      return { ...state, maxNewWordsPerDay: action.payload };
    case setIsTranslationVisible.type:
      return { ...state, isTranslationVisible: action.payload };
    case setIsWordDescriptionVisible.type:
      return {
        ...state,
        isWordDescriptionVisible: action.payload,
      };
    case setIsExampleSentenceVisible.type:
      return {
        ...state,
        isExampleSentenceVisible: action.payload,
      };
    case setIsTranscriptionVisible.type:
      return { ...state, isTranscriptionVisible: action.payload };
    case setIsAssociationPictureVisible.type:
      return { ...state, isAssociationPictureVisible: action.payload };
    case setIsUserOpinionCheckingVisible.type:
      return { ...state, isUserOpinionCheckingVisible: action.payload };
    case setIsStatusCheckingVisible.type:
      return { ...state, isStatusCheckingVisible: action.payload };
    default:
      return state;
  }
};
