import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ErrorNotification } from './components';
import { errorsSelector } from './store/Errors.selectors';
import { useStyles } from './Errors.styles';
import { removeError } from './store/Errors.actions';

export const Errors = () => {
  const classes = useStyles();
  const errors = useSelector(errorsSelector);
  const dispatch = useDispatch();

  const onClose = useCallback(index => dispatch(removeError(index)), [dispatch]);

  return (
    <div className={classes.errors}>
      {errors.map((errorMessage, index) => (
        <ErrorNotification errorMessage={errorMessage} index={index} onClose={onClose} key={errorMessage + index} />
      ))}
    </div>
  );
};
