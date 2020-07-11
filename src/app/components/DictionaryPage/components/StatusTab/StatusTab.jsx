import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './StatusTab.styles';

export const StatusTab = ({ status, onViewStatusChangeClick, isSelected, translation }) => {
  const classes = useStyles({ status, isSelected });

  const onViewStatusChange = useCallback(() => onViewStatusChangeClick(status), [status, onViewStatusChangeClick]);

  return (
    <div onClick={onViewStatusChange} className={classes.statusTab}>
      {translation}
    </div>
  );
};

StatusTab.propTypes = {
  status: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  onViewStatusChangeClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
