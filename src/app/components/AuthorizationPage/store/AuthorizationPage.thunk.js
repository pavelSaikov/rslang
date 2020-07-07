import { authorizationService } from '../../../services/AuthorizationService/AuthorizationService';
import { setAuthorizationInfo } from './AuthorizationPage.actions';
import { addError, resetErrors } from '../../errors/store/Errors.actions';
import { ERROR_MESSAGES } from '../../../services/AuthorizationService/AuthorizationService.models';

export const getUserData = ({
  email,
  password,
  history,
  path,
  setIsUserLogin,
  controller,
  setIsShowLoadingPage,
}) => dispatch => {
  dispatch(resetErrors());

  authorizationService
    .signIn({
      email,
      password,
      controller,
    })

    .then(({ token, userId }) => {
      dispatch(
        setAuthorizationInfo({
          token,
          userId,
          creationDate: Date.now(),
        }),
      );
      setIsUserLogin(true);
      history.replace({ pathname: path });
    })
    .catch(e => {
      if (ERROR_MESSAGES.includes(e.message)) {
        dispatch(addError(e.message));
        setIsShowLoadingPage(false);
      }
    });
};
