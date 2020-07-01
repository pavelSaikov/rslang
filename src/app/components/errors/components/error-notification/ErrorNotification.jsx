import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './ErrorNotification.styles';

export const ErrorNotification = React.memo(({ errorMessage, index, onClose }) => {
  const classes = useStyles();
  return (
    <div className={classes.error}>
      <div>{errorMessage}</div>
      <span className={classes.crossButton} onClick={() => onClose(index)}>
        <i className="icon-x-circle"></i>
      </span>
    </div>
  );
});

ErrorNotification.displayName = 'ErrorNotification';

ErrorNotification.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
