import React, { useState, useCallback, useEffect } from 'react';

import { WORD_STATUS, WORD_STATUSES, createUserWord } from './DictionaryPage.models.js';
import { useStyles } from './DictionaryPage.styles.js';
import { WordInfo } from './components/WordInfo/WordInfo.jsx';
import { StatusTab } from './components/StatusTab/StatusTab.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { wordsService } from '../../services/WordsService/WordsService.js';
import { updateUserWord } from './store/UserDictionary.actions.js';
import { userDictionarySelector } from './store/UserDictionary.selectors.js';
import { authorizationInfoSelector } from '../AuthorizationPage/store/AuthorizationPage.selectors.js';

export const DictionaryPage = () => {
  const userDictionary = useSelector(userDictionarySelector);
  const { token, userId } = useSelector(authorizationInfoSelector);
  const dispatch = useDispatch();
  const [wordsDescription, setWordDescription] = useState(null);
  const [wordsStatusForView, setWordsStatusForView] = useState(WORD_STATUS.LEARNED);
  const [updatedWordInfo, setUpdatedWordInfo] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (wordsDescription) {
      return;
    }

    Promise.all(
      userDictionary.map(wordUserInfo =>
        wordsService.getWordInfo({ wordId: wordUserInfo.wordId }).then(wordInfo => ({ ...wordInfo, ...wordUserInfo })),
      ),
    ).then(words => setWordDescription(words));
  }, [userDictionary, wordsDescription]);

  useEffect(() => {
    if (updatedWordInfo) {
      wordsService
        .updateUserWord({
          token,
          userId,
          wordId: updatedWordInfo.wordId,
          wordPayload: createUserWord({ ...updatedWordInfo }),
        })
        .then(() => {
          setUpdatedWordInfo(null);
        });
    }
  }, [updatedWordInfo, token, userId]);

  const onViewStatusChangeClick = useCallback(
    newWordStatusForView => {
      if (wordsStatusForView !== newWordStatusForView) {
        setWordsStatusForView(newWordStatusForView);
      }
    },
    [wordsStatusForView],
  );

  const onStatusChangeClick = useCallback(
    (status, wordId) => {
      if (updatedWordInfo) {
        return;
      }

      const otherWords = wordsDescription.filter(word => word.wordId !== wordId);
      const targetWord = { ...wordsDescription.find(word => word.wordId === wordId), status };
      setWordDescription([targetWord, ...otherWords]);
      dispatch(updateUserWord(createUserWord({ ...targetWord })));
      setUpdatedWordInfo(createUserWord({ ...targetWord }));
    },
    [wordsDescription, dispatch, updatedWordInfo],
  );

  return (
    wordsDescription && (
      <div className={classes.dictionaryContainer}>
        <div className={classes.wordStatusesContainer}>
          {WORD_STATUSES.map(status => (
            <StatusTab
              key={status}
              status={status}
              onViewStatusChangeClick={onViewStatusChangeClick}
              isSelected={status === wordsStatusForView}
            />
          ))}
        </div>
        <div className={classes.wordsGroupContainer}>
          {wordsDescription.map(wordInfo => {
            if (wordInfo.status === wordsStatusForView) {
              return (
                <WordInfo
                  key={wordInfo.wordId}
                  wordInfo={wordInfo}
                  onStatusChangeClick={onStatusChangeClick}
                  newStatus={wordsStatusForView === WORD_STATUS.LEARNED ? WORD_STATUS.DIFFICULT : WORD_STATUS.LEARNED}
                  isRemovable={wordsStatusForView !== WORD_STATUS.REMOVED ? true : false}
                />
              );
            }
          })}
        </div>
      </div>
    )
  );
};
