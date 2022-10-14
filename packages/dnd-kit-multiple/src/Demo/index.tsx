import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core/dist/types';

import Container from './Container';
import RenderItem from './RenderItem';
import { Person } from './consts';

const Demo = () => {
  const [items, setItems] = useState<{ [key: string]: Person[] }>({
    first: [
      { id: '1', name: '刘备' },
      { id: '2', name: '曹操' },
      { id: '3', name: '孙权' },
    ],
    second: [
      { id: '4', name: '蜀国' },
      { id: '5', name: '魏国' },
      { id: '6', name: '吴国' },
    ],
    third: [],
  });
  const [active, setActive] = useState<Person>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getItem = (id: UniqueIdentifier) => {
    const keys = Object.keys(items);
    const key = keys.find((key) => items[key].find((o) => o.id === String(id)))!;
    const list = items[key];
    return {
      key,
      list,
      item: list.find((o) => o.id === String(id))!,
      itemIndex: list.map((o) => o.id).indexOf(String(id)),
    };
  };

  const moveAction = ({ active, over }: DragOverEvent | DragEndEvent) => {
    if (!over || over.disabled || active.id === over.id) return;

    const activeItem = getItem(active.id);

    if (over.id in items) {
      setItems((prevState) => {
        const ids = items[over.id].map((o) => o.id);
        return {
          ...prevState,
          [activeItem.key]: activeItem.list.filter((o) => o.id !== activeItem.item.id),
          [over.id]: !ids.includes(String(active.id))
            ? items[over.id].concat([activeItem.item])
            : items[over.id],
        };
      });
      return;
    }

    const overItem = getItem(over.id);

    setItems((prevState) => {
      if (activeItem.key === overItem.key) {
        return {
          ...prevState,
          [activeItem.key]: arrayMove(activeItem.list, activeItem.itemIndex, overItem.itemIndex),
        };
      }

      overItem.list.splice(overItem.itemIndex - 1, 0, activeItem.item);
      return {
        ...prevState,
        [activeItem.key]: activeItem.list.filter((o) => o.id !== activeItem.item.id),
        [overItem.key]: overItem.list,
      };
    });
  };

  return (
    <div className="flex flex-row">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={({ active }) => {
          if (!active) return;
          const activeItem = getItem(active.id);
          setActive(activeItem.item);
        }}
        onDragOver={moveAction}
        onDragEnd={(event: DragEndEvent) => {
          moveAction(event);
          setActive(undefined);
        }}
      >
        <Container id="first" items={items.first} />
        <Container id="second" items={items.second} />
        <Container id="third" items={items.third} />
        <DragOverlay>{active && <RenderItem item={active} DragOverlay />}</DragOverlay>
      </DndContext>
    </div>
  );
};

export default Demo;
