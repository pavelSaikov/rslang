import React, { useState, useCallback } from 'react';

import { WORD_STATUS, WORD_STATUSES } from './DictionaryPage.models.js';
import { useStyles } from './DictionaryPage.styles.js';
import { WordInfo } from './components/WordInfo/WordInfo.jsx';
import { WORDS } from '../LearningPage/words.js';
import { StatusTab } from './components/StatusTab/StatusTab.jsx';

export const DictionaryPage = () => {
  const [wordsDescription, setWordDescription] = useState(WORDS);
  const [wordsStatusForView, setWordsStatusForView] = useState(WORD_STATUS.LEARNED);
  const classes = useStyles();

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
      const otherWords = wordsDescription.filter(word => word.wordId !== wordId);
      const targetWord = { ...wordsDescription.find(word => word.wordId === wordId), status };
      setWordDescription([targetWord, ...otherWords]);
    },
    [wordsDescription],
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
