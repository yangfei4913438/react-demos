import React, { FC, useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
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
    onChangeWidth,
  } = useContext(VirtualTableContext);

  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    disabled: !canDragSortColumn,
  });

  // 渲染拖拽对象的时候，key 不能是最后一个
  const canRender = id !== labels[labels.length - 1];

  const styles = {
    transition,
    '--translate-x': transform?.x && `${Math.round(transform.x)}px`,
    '--scale-x': transform?.scaleX && `${transform.scaleX}`,
    transform: 'translate3d(var(--translate-x, 0), 0, 0) scaleX(var(--scale-x, 1)) scaleY(1)',
  } as React.CSSProperties;

  return (
    <div ref={setNodeRef} className="box-border touch-manipulation" {...attributes} style={styles}>
      <div
        className={cx(
          'select-none',
          canDragSortColumn && isDragging && 'z-0 opacity-50',
          canDragSortColumn && dragOverlay && 'cursor-grabbing shadow-lg bg-white opacity-90',
          canDragSortColumn && !dragOverlay && 'cursor-grab touch-manipulation',
          {
            'px-3': textLayout === 'left',
            'text-center': textLayout === 'center',
          }
        )}
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
