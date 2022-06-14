import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { StoreContext } from 'src/store';

const MobxCtrl = observer(() => {
  // 取出数据
  const { counter } = useContext(StoreContext);

  return (
    <div className="space-x-4">
      <button className="btn btn-outline btn-primary" onClick={() => counter.increment(1)}>
        点击 +1
      </button>
      <button className="btn btn-outline btn-secondary" onClick={() => counter.decrement(1)}>
        点击 -1
      </button>
      <button className="btn btn-outline" onClick={() => counter.reset()}>
        重置点击
      </button>
    </div>
  );
});

export default MobxCtrl;
