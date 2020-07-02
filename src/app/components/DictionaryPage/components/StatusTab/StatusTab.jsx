import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './StatusTab.styles';

export const StatusTab = ({ status, onViewStatusChangeClick, isSelected }) => {
  const classes = useStyles({ status, isSelected });

  const onViewStatusChange = useCallback(() => onViewStatusChangeClick(status), [status, onViewStatusChangeClick]);

  return (
    <div onClick={onViewStatusChange} className={classes.statusTab}>
      {status}
    </div>
  );
};

StatusTab.propTypes = {
  status: PropTypes.string.isRequired,
  onViewStatusChangeClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
