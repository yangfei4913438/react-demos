import DragResize from 'src/DragResize';
import { useState } from 'react';

const App = () => {
  const [width, setWidth] = useState(300);

  return (
    <div className={'px-8'}>
      <DragResize className="bg-gray-300" id={'x'} width={width} setWidth={setWidth}>
        <div className="h-12 w-full flex items-center">title</div>
      </DragResize>
    </div>
  );
};

export default App;
