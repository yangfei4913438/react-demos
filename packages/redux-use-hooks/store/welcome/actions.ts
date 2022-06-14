import types from './types';

// 定义actions对象
const actions = {
  // 改变欢迎语
  changeWelcome: (value: string) => {
    return {
      type: types.CHANGE_WELCOME,
      value,
    };
  }
};

// 导出
export default actions;
