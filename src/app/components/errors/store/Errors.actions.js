import { createAction } from '../../../store/create-action';

export const addError = createAction('[Errors] Add Error');
export const removeError = createAction('[Errors] Remove Error');
export const resetErrors = createAction('[Errors] Reset Errors');
