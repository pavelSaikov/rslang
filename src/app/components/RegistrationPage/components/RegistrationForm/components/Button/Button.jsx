import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Button.styles';

export const Button = ({ submit, text }) => {
  const classes = useStyles();

  return (
    <div>
      <button className={classes.btn} onClick={submit}>
        {text}
      </button>
      <div className={classes.mark}>
        <i className="iс-forward"></i>
      </div>
    </div>
  );
};

Button.propTypes = { submit: PropTypes.func.isRequired, text: PropTypes.string.isRequired };
