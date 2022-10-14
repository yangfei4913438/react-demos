import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import SortItem from './SortItem';
import { Person } from './consts';

interface ContainerProps {
  id: string;
  items: Person[];
}

const Container = ({ id, items }: ContainerProps) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className="m-3 flex-1 bg-gray-200 p-3">
        {items.map((item) => (
          <SortItem item={item} key={item.id} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Container;
