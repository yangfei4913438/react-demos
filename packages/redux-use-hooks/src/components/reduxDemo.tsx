import { useDispatch, useSelector } from 'react-redux';
import { Record } from 'immutable';
import React from 'react';
import actions from 'store/actions';

const ReduxDemo = () => {
  const dispatch = useDispatch();
  // 取出数据
  const welcomeData = useSelector<Record<GlobalKeypath>, WelcomeStore>(state => state.get('welcome'));
  const counterData = useSelector<Record<GlobalKeypath>, CounterStore>(state => state.get('counter'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    dispatch(actions.welcome.changeWelcome(val));
  };

  return (
    <div className="space-y-8">
      <input
        type="text"
        className="input input-bordered input-primary w-full max-w-xs"
        value={welcomeData.welcome}
        onChange={handleChange}
      />
      <div className="space-y-4">
        <h4 className="font-mono text-3xl">点击量: {counterData.counter}</h4>
        <div className="space-x-4">
          <button className="btn btn-outline btn-primary" onClick={() => dispatch(actions.counter.incrementCount(1))}>
            +1
          </button>
          <button className="btn btn-outline btn-secondary" onClick={() => dispatch(actions.counter.decrementCount(1))}>
            -1
          </button>
          <button className="btn btn-outline" onClick={() => dispatch(actions.counter.resetCount())}>
            重置
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReduxDemo;
