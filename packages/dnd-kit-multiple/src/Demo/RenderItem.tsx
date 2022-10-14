import { type Person } from './consts';
import cx from 'classnames';

interface RenderItemProps {
  item: Person;
  isDragging?: boolean;
  DragOverlay?: boolean;
}

const RenderItem = ({ item, isDragging, DragOverlay }: RenderItemProps) => {
  return (
    <div
      className={cx(
        'my-2.5 flex h-12 w-full items-center justify-center border',
        isDragging ? 'bg-green-500 opacity-50' : DragOverlay ? 'bg-pink-400' : 'bg-white'
      )}
    >
      {item.name}
    </div>
  );
};

export default RenderItem;
