import { useContext, useState, forwardRef, type HTMLProps } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import TableHead from './TableHead';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { type IWidths, VirtualTableContext } from './consts';
import TableRow from './TableRow';

const TableWrapper = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ children, ...rest }, ref) => {
    const {
      list,
      fixedTopCount,
      fixedLeftCount,
      fixedRightCount,
      titleHeight,
      rowHeight,
      columns,
      rowClass,
      labels,
      changeLabels,
      widths,
      changeWidths,
      headerClass,
      canDragSortColumn,
      canChecked,
      checked,
      setChecked,
      realWidth,
      getLeftWidth,
      getRightWidth,
    } = useContext(VirtualTableContext);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const [activeLabel, setActiveLabel] = useState<string | null>(null);
    const getIndex = (label: string) => labels.indexOf(label);
    const activeIndex = activeLabel ? getIndex(activeLabel) : -1;

    const handleAllChecked = () => {
      if (checked.length !== list.length) {
        // 获取全部的索引
        const arr = Array.from({ length: list.length }, (_, idx) => idx);
        setChecked(() => arr);
      } else {
        setChecked([]);
      }
    };

    return (
      <div ref={ref} {...rest}>
        <div
          className={cx(
            'flex items-center bg-[#f8f8f8] border-b border-b-[#eee] sticky top-0',
            headerClass
          )}
          style={{
            zIndex: 51,
            height: titleHeight,
            width: realWidth,
          }}
        >
          {/* 渲染表头 */}
          <DndContext
            id={'table'}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={({ active }) => {
              if (!active) return;
              setActiveLabel(String(active.id));
            }}
            onDragEnd={({ over }) => {
              if (!over) return;
              setActiveLabel(null);
              const overIndex = getIndex(String(over.id));
              if (activeIndex !== overIndex) {
                // 交换 label 元素的位置
                const arr = arrayMove(labels, activeIndex, overIndex);
                // 更新label
                changeLabels(arr);
                // 新的宽度
                const widthObj: IWidths = {};
                arr.forEach((label) => {
                  widthObj[label] = widths[label];
                });
                // 更新宽度
                changeWidths(widthObj);
              }
            }}
            onDragCancel={() => setActiveLabel(null)}
          >
            <SortableContext items={list} strategy={horizontalListSortingStrategy}>
              {canChecked && (
                <IndeterminateCheckbox
                  indeterminate={checked.length > 0 && checked.length !== list.length}
                  checked={checked.length === list.length}
                  onClick={() => handleAllChecked()}
                />
              )}
              {columns.map((item, idx) => {
                const style: { [key: string]: number | string } = {
                  width: item.width,
                };
                if (idx < fixedLeftCount!) {
                  style['left'] = getLeftWidth(idx);
                }
                if (idx > labels.length - fixedRightCount! - 1) {
                  style['right'] = getRightWidth(idx);
                }
                if (idx === fixedLeftCount! - 1) {
                  style['boxShadow'] = '2px 0 4px 0px #eee';
                }
                if (idx === labels.length - fixedRightCount!) {
                  style['boxShadow'] = '-2px 0 4px 0 #eee';
                }

                return (
                  <div
                    className={cx('overflow-hidden relative h-full flex flex-col justify-center', {
                      'sticky z-50 left-0 bg-inherit': idx < fixedLeftCount!,
                      'sticky z-50 right-0 bg-inherit': idx > labels.length - fixedRightCount - 1,
                    })}
                    style={style}
                    key={idx}
                  >
                    <TableHead id={item.dataKey} key={item.dataKey}>
                      {item.headRenders[item.dataKey]}
                    </TableHead>
                  </div>
                );
              })}
            </SortableContext>
            {
              // 拖拽对象渲染
              canDragSortColumn &&
                createPortal(
                  <DragOverlay>
                    {activeLabel && (
                      <TableHead id={labels[activeIndex]} key={labels[activeIndex]} dragOverlay>
                        {
                          columns.filter((o) => o.dataKey === labels[activeIndex])[0]?.headRenders[
                            labels[activeIndex]
                          ]
                        }
                      </TableHead>
                    )}
                  </DragOverlay>,
                  document.body
                )
            }
          </DndContext>
        </div>
        <div
          className="sticky"
          style={{ zIndex: 51, top: titleHeight, width: realWidth, boxShadow: '0 2px 4px 0 #eee' }}
        >
          {list.slice(0, fixedTopCount).map((row, index) => {
            return (
              <TableRow
                row={row}
                rowClass={rowClass}
                style={{ top: index * rowHeight, height: rowHeight }}
                index={index}
                key={index}
              />
            );
          })}
        </div>
        {children}
      </div>
    );
  }
);

TableWrapper.displayName = 'TableWrapper';

export default TableWrapper;
