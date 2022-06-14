import { observer } from 'mobx-react-lite';
import { ChangeEvent, useContext } from 'react';

import { StoreContext } from 'src/store';

const Welcome = observer(() => {
  // 取出数据
  const { welcome } = useContext(StoreContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    welcome.setWelcome(val);
  };

  return (
    <div className="space-x-4">
      <input
        type="text"
        placeholder="请输入任意内容"
        className="input input-bordered input-primary w-full max-w-xs"
        value={welcome.getWelcome}
        onChange={handleChange}
      />
      <button className="btn btn-outline" onClick={() => welcome.reset()}>
        重置输入
      </button>
    </div>
  );
});

export default Welcome;
