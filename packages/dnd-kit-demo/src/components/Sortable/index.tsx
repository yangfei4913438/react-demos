import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import {
  closestCenter,
  DragOverlay,
  DndContext,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  useSortable,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { createRange } from './createRange';

import classNames from 'classnames';

export interface Props {
  items?: UniqueIdentifier[];
  style?: React.CSSProperties;
  // 是否使用拖拽影子
  useDragOverlay?: boolean;
}

export default function Sortable({ items: initialItems, style, useDragOverlay = true }: Props) {
  const [items, setItems] = useState<UniqueIdentifier[]>(
    () => initialItems ?? createRange<UniqueIdentifier>(8, (index) => index + 1)
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const getIndex = (id: UniqueIdentifier) => items.indexOf(id);
  const activeIndex = activeId ? getIndex(activeId) : -1;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }
        setActiveId(active.id);
      }}
      onDragEnd={({ over }) => {
        setActiveId(null);
        if (over) {
          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            setItems((items) => arrayMove(items, activeIndex, overIndex));
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div className="py-8 flex gap-3" style={style}>
          {items.map((value) => (
            <SortableItem key={value} id={value} />
          ))}
        </div>
      </SortableContext>
      {useDragOverlay &&
        createPortal(
          <DragOverlay>
            {activeId && (
              <SortableItem id={items[activeIndex]} key={items[activeIndex]} dragOverlay />
            )}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}

interface SortableItemProps {
  id: UniqueIdentifier;
  // 是否为拖拽对象
  dragOverlay?: boolean;
}

export function SortableItem({ id, dragOverlay }: SortableItemProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="box-border touch-manipulation"
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
    >
      <div
        className={classNames(
          'w-16 h-16 relative flex items-center justify-center bg-white text-gray-700 shadow rounded border',
          isDragging && 'z-0 opacity-50',
          dragOverlay && 'cursor-grabbing shadow-lg',
          !dragOverlay && 'cursor-grab touch-manipulation'
        )}
        {...listeners}
      >
        {id}
      </div>
    </div>
  );
}
