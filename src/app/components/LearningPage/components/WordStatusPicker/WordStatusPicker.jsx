import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../UserWordAssessment/Button/Button';
import { useStyles } from './WordStatusPicker.styles';
import { WORD_STATUS_TRANSLATION_MAP } from '../../../DictionaryPage/DictionaryPage.models';

export const WordStatusPicker = ({ onStatusChoice, wordStatuses }) => {
  const classes = useStyles();

  return (
    <div className={classes.wordStatusChoicer}>
      <div>Выберите категорию в словаре для данного слова</div>
      <div className={classes.buttons}>
        {wordStatuses.map(status => (
          <Button
            key={status}
            message={WORD_STATUS_TRANSLATION_MAP.get(status)}
            onClick={() => onStatusChoice(status)}
            styleClasses={classes.button}
          />
        ))}
      </div>
    </div>
  );
};

WordStatusPicker.propTypes = {
  onStatusChoice: PropTypes.func.isRequired,
  wordStatuses: PropTypes.array.isRequired,
};
