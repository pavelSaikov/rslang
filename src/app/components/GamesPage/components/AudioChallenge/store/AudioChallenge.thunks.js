import { wordsService } from './../../../../../../app/services/WordsService/WordsService';
import { wordsParse } from './../wordsParse';
import { addError } from '../../../../errors/store/Errors.actions';
import { store } from '../../../../../store';
import { GAME_STATUS } from '../AudioChallenge.models';
import { setAudioChallengeStatistics } from './AudioChallenge.action';
import { updateCommonStatistics } from '../../../../LearningPage/store/LearningPage.thunks';

export const loadWords = ({
  isUserWordsUse,
  correctAnswersArr,
  setRoundsWords,
  setCorrectAnswersArr,
  setGameStatus,
}) => dispatch => {
  if (!isUserWordsUse) {
    wordsService
      .getRandomWordsFromGroup({ groupNumber: 5, wordsNumber: 50, wordPerExampleSentenceLTE: 20 })
      .then(words => {
        const { wordsForAllRound, correctAnswers } = wordsParse(words);
        setRoundsWords(wordsForAllRound);
        setCorrectAnswersArr(correctAnswers);
        setGameStatus(GAME_STATUS.CHOICE);
      })
      .catch(e => {
        dispatch(addError(e.message));
      });
    return;
  }
  wordsService
    .getRandomWordsFromGroup({ groupNumber: 5, wordsNumber: 40, wordPerExampleSentenceLTE: 20 })
    .then(words => {
      const { wordsForAllRound } = wordsParse(words, correctAnswersArr);
      setRoundsWords(wordsForAllRound);
      setGameStatus(GAME_STATUS.CHOICE);
    });
};

export const loadWordsInfo = ({ filteredDictionary, setCorrectAnswersArr }) => dispatch => {
  filteredDictionary.sort(() => 0.5 - Math.random());
  Promise.all(
    filteredDictionary.reduce((words, { wordId }) => {
      words.push(wordsService.getWordInfo({ wordId }));
      return words;
    }, []),
  )
    .then(words => {
      words.sort(() => 0.5 - Math.random());
      setCorrectAnswersArr(words);
    })
    .catch(e => {
      dispatch(addError(e.message));
    });
  return;
};

export const updateAudioChallengeStatistics = ({ answerCount, setIsRedirectToLoginPage }) => dispatch => {
  const { statistics } = store.getState();
  const percentCorrectAnswer =
    (answerCount.countCorrect * 100) /
    (answerCount.countCorrect + answerCount.countIncorrect ? answerCount.countCorrect + answerCount.countIncorrect : 1);
  const newAudioChallengeStatistics = statistics ? { ...statistics.audioChallengeStatistics } : {};
  const dateString = new Date().toLocaleDateString('en-GB');

  const percentCorrectAnswerInDay = newAudioChallengeStatistics[dateString]
    ? newAudioChallengeStatistics[dateString]['percentCorrectAnswerInDay']
    : 0;
  const gamesCountInDay = newAudioChallengeStatistics[dateString]
    ? newAudioChallengeStatistics[dateString]['gamesCountInDay']
    : 0;

  if (!newAudioChallengeStatistics[dateString]) {
    newAudioChallengeStatistics[dateString] = {
      percentCorrectAnswerInDay: 0,
      gamesCountInDay: 0,
    };
  }
  newAudioChallengeStatistics[dateString]['percentCorrectAnswerInDay'] = Math.floor(
    (percentCorrectAnswerInDay * gamesCountInDay + percentCorrectAnswer) / (gamesCountInDay + 1),
  );
  newAudioChallengeStatistics[dateString]['gamesCountInDay'] += 1;

  dispatch(setAudioChallengeStatistics(newAudioChallengeStatistics));
  dispatch(updateCommonStatistics({ setIsRedirectToLoginPage, controller: new AbortController() }));
};
