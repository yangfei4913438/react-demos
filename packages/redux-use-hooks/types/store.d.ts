// 返回对象
interface IReducer {
  type: string;
  value: any;
}

// 计数器状态
interface CounterStore {
  counter: number;
}

// 全局状态
interface WelcomeStore {
  welcome: string;
}

// 所有的keyPath
interface GlobalKeypath {
  // 全局配置
  welcome: WelcomeStore;
  // 计数器
  counter: CounterStore;
}
