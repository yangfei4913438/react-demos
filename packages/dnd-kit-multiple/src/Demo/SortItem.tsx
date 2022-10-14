import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import RenderItem from './RenderItem';
import { Person } from './consts';

interface SortItemProps {
  item: Person;
}

const SortItem = ({ item }: SortItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <RenderItem item={item} isDragging={isDragging} />
    </div>
  );
};

export default SortItem;
