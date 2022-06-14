import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

// 中间件数组, 可以填入多个中间件, 例如：redux-thunk
const middlewares: any[] = [thunkMiddleware];

// 应用中间件
const middlewareEnhancer = applyMiddleware(...middlewares);

// 用redux开发工具封装中间件, 如果存在这个插件会启用
const composedEnhancers = composeWithDevTools(middlewareEnhancer);

// 创建store，加入中间件参数
const store = createStore(reducers, composedEnhancers);

export default store;
