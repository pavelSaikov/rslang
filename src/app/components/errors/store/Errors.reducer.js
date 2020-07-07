import { addError, resetErrors, removeError } from './Errors.actions';

const DEFAULT_STATE = [];

export const errorsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case addError.type:
      return [action.payload];
    case removeError.type:
      // eslint-disable-next-line no-case-declarations
      const updatedState = [...state];
      updatedState.splice(action.payload, 1);
      return updatedState;
    case resetErrors.type:
      return DEFAULT_STATE;
    default:
      return state;
  }
};
