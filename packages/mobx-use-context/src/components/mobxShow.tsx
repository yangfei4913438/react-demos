import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { StoreContext } from 'src/store';

const MobxShow = observer(() => {
  // 取出数据
  const { counter } = useContext(StoreContext);

  return <h4 className="font-mono text-3xl">点击量: {counter.getCounter}</h4>;
});

export default MobxShow;
