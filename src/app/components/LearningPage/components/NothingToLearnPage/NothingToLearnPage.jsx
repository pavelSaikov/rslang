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
          <h3>Ооой... Для данной категории нет слов.</h3>
          <h3>Выберите другую категорию на стартовой странице и продолжите игру.</h3>
        </div>
        <div>
          <Button message={'Стартовая страница'} onClick={onOpenStartPageClick} styleClasses={classes.button} />
        </div>
      </div>
    </div>
  );
};

NothingToLearnPage.propTypes = {
  onOpenStartPageClick: PropTypes.func.isRequired,
};
