import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { USER_OPINIONS_ABOUT_WORD, USER_OPINION_ABOUT_WORD_TRANSLATION_MAP } from './UserWordAssessment.models';
import { Button } from './Button/Button';
import { useStyles } from './UserWordAssessment.styles';

export const UserWordAssessment = ({ onChangeStatusClick }) => {
  const classes = useStyles();

  const onChangeStatus = useCallback(status => onChangeStatusClick(status), [onChangeStatusClick]);

  return (
    <div className={classes.userWordAssessment}>
      <div>Оценить ваш уровень изученности данного слова</div>
      <div className={classes.buttonsContainer}>
        {USER_OPINIONS_ABOUT_WORD.map(difficulty => (
          <Button
            key={difficulty}
            message={USER_OPINION_ABOUT_WORD_TRANSLATION_MAP.get(difficulty)}
            onClick={() => onChangeStatus(difficulty)}
            styleClasses={classes.button}
          />
        ))}
      </div>
    </div>
  );
};

UserWordAssessment.propTypes = {
  onChangeStatusClick: PropTypes.func.isRequired,
};
