import React, { useCallback } from 'react';
import { useStyles } from './Button.styles';
import PropTypes from 'prop-types';

const Button = ({ submit, text }) => {
  const classes = useStyles();

  const handleClick = useCallback(() => {
    submit();
  }, [submit]);

  return (
    <div>
      <button className={classes.btn} onClick={handleClick}>
        {text}
      </button>
      <div className={classes.mark}>
        <i className="iс-forward"></i>
      </div>
    </div>
  );
};

export default Button;

Button.propTypes = { submit: PropTypes.func.isRequired, text: PropTypes.string.isRequired };
