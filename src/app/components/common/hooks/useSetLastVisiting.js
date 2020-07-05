import { useEffect } from 'react';
import { updateCommonStatistics } from '../../LearningPage/store/LearningPage.thunks';

export const useSetLastVisiting = ({ setIsRedirectToLoginPage, dispatch }) =>
  useEffect(() => {
    dispatch(updateCommonStatistics({ setIsRedirectToLoginPage, controller: new AbortController() }));

    return () => dispatch(updateCommonStatistics({ setIsRedirectToLoginPage, controller: new AbortController() }));
  }, [setIsRedirectToLoginPage, dispatch]);
