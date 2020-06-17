import { createAction } from '../../../store/create-action';

export const setMaxCardsPerDay = createAction('[Settings] Set Max Cards Number Per Day');
export const setMaxNewWordsPerDay = createAction('[Settings] Set Max New Words Number Per Day');
export const setIsTranslationVisible = createAction('[Settings] Set Is Translation Visible');
export const setIsWordDescriptionVisible = createAction('[Settings] Set Is Word Description Visible');
export const setIsExampleSentenceVisible = createAction('[Settings] Set Is Example Sentence Visible');
export const setIsTranscriptionVisible = createAction('[Settings] Set Is Transcription Visible');
export const setIsAssociationPictureVisible = createAction('[Settings] Set Is Association Picture Visible');
export const setIsUserOpinionCheckingVisible = createAction('[Settings] Set Is User Opinion Checking Visible');
export const setIsStatusCheckingVisible = createAction('[Settings] Set Is Status Checking Visible');
