import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../UserWordAssessment/Button/Button';
import { useStyles } from './WordStatusPicker.styles';

export const WordStatusChoicer = ({ onStatusChoice, wordStatuses }) => {
  const classes = useStyles();

  return (
    <div className={classes.wordStatusChoicer}>
      <div>Choice Dictionary category for this word</div>
      <div className={classes.buttons}>
        {wordStatuses.map(status => (
          <Button key={status} message={status} onClick={() => onStatusChoice(status)} />
        ))}
      </div>
    </div>
  );
};

WordStatusChoicer.propTypes = {
  onStatusChoice: PropTypes.func.isRequired,
  wordStatuses: PropTypes.array.isRequired,
};
