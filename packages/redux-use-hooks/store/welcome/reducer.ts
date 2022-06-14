import { Record } from 'immutable';
import types from './types';

// 初始化对象，设置为不可变的immutable对象
const initialState = Record<WelcomeStore>({
  welcome: 'Hello World!',
})();

// 定义reducer
const reducer = (
  state: Record<WelcomeStore> = initialState,
  action: IReducer
): Record<WelcomeStore> => {
  switch (action.type) {
    case types.CHANGE_WELCOME:
      return state.set('welcome', action.value);
    default:
      return state;
  }
};

export default reducer;
