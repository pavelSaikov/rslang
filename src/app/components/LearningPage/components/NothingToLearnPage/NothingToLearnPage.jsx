import React from 'react';
import PropTypes from 'prop-types';

import magnifier from '../../../../../assets/images/magnifier.svg';
import { useStyles } from './NothingToLearnPage.styles';
import { Button } from '../UserWordAssessment/Button/Button';
import { Menu } from '../../../Menu/Menu';

export const NothingToLearnPage = ({ onOpenStartPageClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageWrapper}>
      <Menu />
      <div className={classes.contentContainer}>
        <div className={classes.imageContainer}>
          <img src={magnifier} width={'100%'} />
        </div>
        <div className={classes.headerContainer}>
          <h3>Oops... There are no words in this category.</h3>
          <h3>Choose other category on start page.</h3>
        </div>
        <div>
          <Button message={'Start Page'} onClick={onOpenStartPageClick} styleClasses={classes.button} />
        </div>
      </div>
    </div>
  );
};

NothingToLearnPage.propTypes = {
  onOpenStartPageClick: PropTypes.func.isRequired,
};
