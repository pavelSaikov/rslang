import { store } from '../../../../../store';
import { setSavannaStatistics } from './Savanna.actions';
import { updateCommonStatistics } from '../../../../LearningPage/store/LearningPage.thunks';

export const updateSavannaStatistics = (answerCount, setIsRedirectToLoginPage) => dispatch => {
  const { statistics } = store.getState();
  const percentCorrectAnswer =
    (answerCount.countCorrect * 100) /
    (answerCount.countCorrect + answerCount.countIncorrect ? answerCount.countCorrect + answerCount.countIncorrect : 1);
  const newSavannaStatistics = statistics ? { ...statistics.savannaStatistics } : {};
  const dateString = new Date().toLocaleDateString('en-GB');

  const percentCorrectAnswerInDay = newSavannaStatistics[dateString]
    ? newSavannaStatistics[dateString]['percentCorrectAnswerInDay']
    : 0;
  const gamesCountInDay = newSavannaStatistics[dateString] ? newSavannaStatistics[dateString]['gamesCountInDay'] : 0;

  if (!newSavannaStatistics[dateString]) {
    newSavannaStatistics[dateString] = {
      percentCorrectAnswerInDay: 0,
      gamesCountInDay: 0,
    };
  }
  newSavannaStatistics[dateString]['percentCorrectAnswerInDay'] = Math.floor(
    (percentCorrectAnswerInDay * gamesCountInDay + percentCorrectAnswer) / (gamesCountInDay + 1),
  );
  newSavannaStatistics[dateString]['gamesCountInDay'] += 1;

  dispatch(setSavannaStatistics(newSavannaStatistics));
  dispatch(updateCommonStatistics({ setIsRedirectToLoginPage, controller: new AbortController() }));
};
