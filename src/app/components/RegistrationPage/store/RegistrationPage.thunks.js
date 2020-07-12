import { authorizationService } from '../../../services/AuthorizationService/AuthorizationService';
import { statisticsService } from '../../../services/StatisticsService/StatisticsService';
import { createDailyStatistics } from '../../StatisticsPage/store/daily-statistics/create-daily-statistics';
import { createCommonStatistics } from '../../StatisticsPage/store/common-statistics/create-common-statistics';
import { settingsService } from '../../../services/SettingsService/SettingsService';
import { createSettings } from '../../SettingsPage/store/create-settings';
import { setAuthorizationInfo } from '../../AuthorizationPage/store/AuthorizationPage.actions';
import { ERROR_MESSAGES } from '../../../services/AuthorizationService/AuthorizationService.models';
import { addError } from '../../errors/store/Errors.actions';
import { MAX_LEARNED_WORDS_PER_GAME } from '../../LearningPage/LearningPage.models';
import { DEFAULT_WORDS_PER_PAGE } from '../../../services/WordsService/WordsService.models';
import { wordsService } from '../../../services/WordsService/WordsService';
import { createUserWord } from '../../DictionaryPage/DictionaryPage.models';
import { createLongTermStatistics } from '../../StatisticsPage/store/long-term-statistics/LongTermStatistics.models';
import { wordsPerPage, wordPerExampleSentenceLTE } from './RegistrationPage.models';

export const registerUser = ({
  email,
  password,
  controller,
  setIsUserRegistered,
  setIsShowLoadingPage,
}) => dispatch => {
  authorizationService
    .register({ email, password, controller })
    .then(() => authorizationService.signIn({ email, password, controller }))
    .then(({ token, userId }) => {
      const requiredPagesNumber =
        MAX_LEARNED_WORDS_PER_GAME % DEFAULT_WORDS_PER_PAGE
          ? Math.floor(MAX_LEARNED_WORDS_PER_GAME / DEFAULT_WORDS_PER_PAGE) + 1
          : MAX_LEARNED_WORDS_PER_GAME / DEFAULT_WORDS_PER_PAGE;
      const group = 0;

      return Promise.all([
        Promise.resolve({ token, userId }),
        ...Array.from({ length: requiredPagesNumber }, (_, index) => index).map((_, index) =>
          wordsService.getWordsFromGroupAndPage({
            groupNumber: group,
            pageNumber: index,
            wordsPerPage,
            wordPerExampleSentenceLTE,
          }),
        ),
      ]);
    })
    .then(([{ token, userId }, wordsArrays]) => {
      const words = wordsArrays.flat().slice(0, MAX_LEARNED_WORDS_PER_GAME);

      return Promise.all([
        Promise.resolve({ token, userId }),
        ...words.map(word =>
          wordsService.addUserWord({
            token,
            userId,
            wordId: word.id,
            wordPayload: createUserWord({ wordId: word.id }),
            controller,
          }),
        ),
      ]);
    })
    .then(([{ token, userId }]) => {
      const firstWordPosition = { group: 0, page: 0, index: 0 };
      const lastRegisteredWord = Array.from({ length: MAX_LEARNED_WORDS_PER_GAME - 1 }, (_, index) => index).reduce(
        res => wordsService.calculateNextWordPosition(res),
        firstWordPosition,
      );

      return Promise.all([
        Promise.resolve({ token, userId }),
        statisticsService.updateStatistics({
          token,
          userId,
          statistics: {
            dailyStatistics: createDailyStatistics({}),
            commonStatistics: createCommonStatistics({ lastLearnedWord: lastRegisteredWord }),
            longTermStatistics: createLongTermStatistics({}),
            speakItStatistics: {},
            sprintStatistics: {},
            savannaStatistics: {},
            audioChallengeStatistics: {},
          },
          controller,
        }),
        settingsService.setUserSettings({ token, userId, controller, settings: createSettings({}) }),
      ]);
    })

    .then(([{ token, userId }]) => {
      dispatch(setAuthorizationInfo({ token, userId }));
      setIsUserRegistered(true);
    })
    .catch(e => {
      if (ERROR_MESSAGES.includes(e.message)) {
        dispatch(addError(e.message));
        setIsShowLoadingPage(false);
        return;
      }

      authorizationService
        .signIn({ email, password, controller: new AbortController() })
        .then(({ token, userId }) => {
          authorizationService.removeUser({ token, userId, controller: new AbortController() });
        })
        .then(() => setIsShowLoadingPage(false));
    });
};
