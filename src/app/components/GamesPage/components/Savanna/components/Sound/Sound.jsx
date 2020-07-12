import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './Sound.styles';

export const Sound = ({ changeSongState }) => {
  const { sound } = useStyles();

  return (
    <div className={sound}>
      <i className={'icon-volume-medium'} onClick={changeSongState}></i>
    </div>
  );
};

Sound.propTypes = {
  changeSongState: PropTypes.func.isRequired,
};
