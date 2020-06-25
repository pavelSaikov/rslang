import { setIsMenuOpen } from './Menu.actions';

const DEFAULT_MENU_STATE = false;

export const menuReducer = (state = DEFAULT_MENU_STATE, action) => {
  switch (action.type) {
    case setIsMenuOpen.type:
      return action.payload;
    default:
      return state;
  }
};
