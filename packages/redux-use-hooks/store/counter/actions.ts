import types from './types';

// 定义actions对象
const actions = {
  // 增加计数
  incrementCount: (value: number) => {
    return {
      type: types.INCREMENT_COUNT,
      value,
    };
  },
  // 减少计数
  decrementCount: (value: number) => {
    return {
      type: types.DECREMENT_COUNT,
      value,
    };
  },
  // 重置计数器
  resetCount: () => {
    return { type: types.RESET_COUNT };
  },
};

// 导出
export default actions;
