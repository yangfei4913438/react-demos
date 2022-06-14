import { Record } from 'immutable';
import types from './types';

// 初始化对象，设置为不可变的immutable对象
const initialState = Record<CounterStore>({
  counter: 0,
})();

// 定义reducer
const reducer = (state: Record<CounterStore> = initialState, action: IReducer): Record<CounterStore> => {
  switch (action.type) {
    case types.INCREMENT_COUNT:
      return state.set('counter', state.get('counter') + action.value);
    case types.DECREMENT_COUNT:
      return state.set('counter', state.get('counter') - action.value);
    case types.RESET_COUNT:
      return state.set('counter', initialState.counter);
    default:
      return state;
  }
};

export default reducer;
