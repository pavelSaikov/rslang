import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '../UserWordAssessment/Button/Button';
import { GameModeSelector } from './WordsCategorySelector/GameModeSelector';
import { Menu } from '../../../Menu/Menu';
import { useStyles } from './StartPage.styles';
import { learningPageConfigSelector } from '../../store/LearningPage.selectors';
import { setLearningPageConfig } from '../../store/LearningPage.actions';
import { createLearningPageConfig } from '../../store/create-learning-page-config';
import openedBook from '../../../../../assets/images/opened-book.svg';

export const StartPage = ({ onStartClick }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { repeatableWordStatus } = useSelector(learningPageConfigSelector);

  const onChangeCategory = useCallback(
    status => dispatch(setLearningPageConfig(createLearningPageConfig({ repeatableWordStatus: status }))),
    [dispatch],
  );

  return (
    <div className={classes.pageWrapper}>
      <Menu />
      <div className={classes.contentContainer}>
        <div className={classes.imageContainer}>
          <img src={openedBook} width={'100%'} />
        </div>
        <div className={classes.headerContainer}>
          <h3>Выберите категорию слов для изучения и нажмите &apos;Старт&apos;</h3>
        </div>
        <div className={classes.buttonsContainer}>
          <Button message={'Старт'} onClick={onStartClick} styleClasses={classes.startButton} />
          <div className={classes.pickerContainer}>
            <GameModeSelector selectedCategory={repeatableWordStatus} onSelectClick={onChangeCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

StartPage.propTypes = {
  onStartClick: PropTypes.func.isRequired,
};
