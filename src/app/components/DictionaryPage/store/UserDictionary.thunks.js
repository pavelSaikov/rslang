import { updateCommonStatistics, modifyUserWord } from '../../LearningPage/store/LearningPage.thunks';

export const updateUserWordAndStatistics = ({
  updatedWordInfo,
  setUpdatedWordInfo,
  setIsRedirectToLoginPage,
  controller,
}) => dispatch => {
  modifyUserWord({ setIsRedirectToLoginPage, controller, updatedWordInfo })(dispatch)
    .then(() => updateCommonStatistics({ setIsRedirectToLoginPage, controller })(dispatch))
    .then(() => {
      setUpdatedWordInfo(null);
    });
};
