import React, { FC, useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cx from 'classnames';
import DragResize from './DragResize';
import { VirtualTableContext } from './consts';

interface ITableHead {
  id: string;
  // 是否禁用
  disabled?: boolean;
  // 是否拖拽渲染
  dragOverlay?: boolean;
  // 子节点
  children: React.ReactNode;
}

const TableHead: FC<ITableHead> = ({ id, dragOverlay = false, children }) => {
  const {
    textLayout,
    labels,
    canChangeWidths,
    canDragSortColumn,
    filterRenders,
    sortRenders,
    titleHeight,
    onChangeWidth,
  } = useContext(VirtualTableContext);

  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    disabled: !canDragSortColumn,
  });

  // 渲染拖拽对象的时候，key 不能是最后一个
  const canRender = id !== labels[labels.length - 1];

  return (
    <div
      ref={setNodeRef}
      className="box-border touch-manipulation"
      {...attributes}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div
        className={cx(
          'select-none flex items-center',
          canDragSortColumn && isDragging && 'z-0 opacity-50',
          canDragSortColumn && dragOverlay && 'cursor-grabbing shadow-lg bg-white',
          canDragSortColumn && !dragOverlay && 'cursor-grab touch-manipulation',
          {
            'px-3 justify-start': textLayout === 'left',
            'justify-center': textLayout === 'center',
          }
        )}
        style={{ height: titleHeight }}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {!!sortRenders && !dragOverlay && sortRenders[id] && (
          <div
            className={cx(
              'mx-3 absolute top-0 bottom-0 right-0 flex items-center cursor-pointer',
              filterRenders?.[id] && 'right-5'
            )}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {sortRenders[id]}
          </div>
        )}
        {!!filterRenders && !dragOverlay && filterRenders[id] && (
          <div
            className={'mx-3 absolute top-0 bottom-0 right-0 flex items-center cursor-pointer'}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {filterRenders[id]}
          </div>
        )}
        {canChangeWidths && canRender && !dragOverlay && (
          <span onMouseDown={(e) => e.stopPropagation()}>
            <DragResize id={id} handleChangeWidth={(x) => onChangeWidth(id, x)} />
          </span>
        )}
      </div>
    </div>
  );
};

export default TableHead;
