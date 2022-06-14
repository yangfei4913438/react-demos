import {
  DndContext,
  useDraggable,
  useSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { FC, MouseEventHandler, ReactNode, useMemo, useRef, useState } from 'react';
import cx from 'classnames';

interface IDragResizeProps {
  // 容器宽度
  width: number;
  // 更新宽度
  setWidth: (x: number) => void;
  // 唯一识别标记
  id: string;
  // 自定义类名
  className?: string;
  // 是否启用resize
  disabled?: boolean;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}
const DragResize: FC<IDragResizeProps> = ({
  children,
  id,
  width,
  setWidth,
  disabled,
  className,
  onMouseDown,
  onClick,
}) => {
  const child = useRef<any>();
  const [changeWidth, setChangeWidth] = useState(0);

  // 计算子组件的宽度
  const childWidth = useMemo(() => {
    if (child.current) {
      const dom = child.current;
      return dom.getBoundingClientRect().width;
    }
    return 0;
  }, [child.current]);

  // 最终响应
  const onDragEnd = () => {
    if (width + changeWidth < childWidth + 16) {
      return;
    } else {
      setWidth(width + changeWidth);
      setChangeWidth(0);
    }
  };

  // 拖拽响应
  const handleChangeWidth = (x: number) => {
    if (width + x < childWidth + 16) {
      return;
    } else {
      setChangeWidth(x);
    }
  };

  // 如果禁用组件，就直接返回内部元素
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div
      className={cx('relative flex items-center', className)}
      style={{ width: width + changeWidth }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <span ref={child}>{children}</span>
      <div className="absolute right-0 h-full">
        <Draggable id={id} handleChangeWidth={handleChangeWidth} onDragEnd={onDragEnd} />
      </div>
    </div>
  );
};

export default DragResize;

interface IDraggableProps {
  id: string;
  handleChangeWidth: (x: number) => void;
  onDragEnd: () => void;
}
const Draggable: FC<IDraggableProps> = ({ id, handleChangeWidth, onDragEnd }) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={onDragEnd}
      onDragMove={({ delta: { x } }) => handleChangeWidth(x)}
      modifiers={[restrictToHorizontalAxis]}
    >
      <DraggableItem id={id} />
    </DndContext>
  );
};

interface DraggableItemProps {
  id: string;
}
function DraggableItem({ id }: DraggableItemProps) {
  const { listeners, setNodeRef } = useDraggable({ id });
  return (
    <div className="z-50 cursor-col-resize" ref={setNodeRef}>
      <div
        className="mx-2 absolute right-0 h-[50%] top-[25%] w-0 border-r-2 border-dotted border-gray-500"
        {...listeners}
      />
    </div>
  );
}
