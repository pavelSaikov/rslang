import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { USER_OPINIONS_ABOUT_WORD } from './UserWordAssessment.models';
import { Button } from './Button/Button';
import { useStyles } from './UserWordAssessment.styles';

export const UserWordAssessment = ({ onChangeStatusClick }) => {
  const classes = useStyles();

  const onChangeStatus = useCallback(status => onChangeStatusClick(status), [onChangeStatusClick]);

  return (
    <div className={classes.userWordAssessment}>
      <div>Describe your filling about this word</div>
      <div className={classes.buttonsContainer}>
        {USER_OPINIONS_ABOUT_WORD.map(difficulty => (
          <Button key={difficulty} message={difficulty} onClick={() => onChangeStatus(difficulty)} />
        ))}
      </div>
    </div>
  );
};

UserWordAssessment.propTypes = {
  onChangeStatusClick: PropTypes.func.isRequired,
};
