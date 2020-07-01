import { authorizationService } from '../../../services/AuthorizationService/AuthorizationService';
import { setAuthorizationInfo } from './AuthorizationPage.actions';
import { addError, resetErrors } from '../../errors/store/Errors.actions';
import { INCORRECT_EMAIL_OR_PASSWORD_MESSAGE } from '../../../services/AuthorizationService/AuthorizationService.models';

export const getUserData = (email, password, history, path, controller) => dispatch => {
  dispatch(resetErrors());
  authorizationService
    .signIn({
      email,
      password,
      controller,
    })
    .then(res => {
      dispatch(
        setAuthorizationInfo({
          token: res.token,
          userId: res.userId,
          creationDate: Date.now(),
        }),
      );
      history.replace({ pathname: path });
    })
    .catch(e => {
      if (e.message === INCORRECT_EMAIL_OR_PASSWORD_MESSAGE) {
        dispatch(addError(INCORRECT_EMAIL_OR_PASSWORD_MESSAGE));
      }
    });
};
