import { combineReducers } from 'redux-immutable';
import { welcomeReducer } from './welcome';
import { counterReducer } from './counter'

// 汇总所有的reduce
// 从 Redux-immutable 库中导出的 combineReducers 方法，可以创建一个immutable类型的state
// Redux-immutable 方式导出的数据，取值的时候，需要加上 keyPath
const reducers = combineReducers({
  welcome: welcomeReducer, // keyPath 的值为 global
  counter: counterReducer
});

export default reducers;
