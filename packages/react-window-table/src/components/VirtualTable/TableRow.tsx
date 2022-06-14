import { type FC, type CSSProperties, useContext } from 'react';
import { VirtualTableContext } from './consts';
import cx from 'classnames';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { handleCheckBox } from './checkboxHelper';

interface TableRowProps<T> {
  style?: CSSProperties;
  rowClass?: string;
  index: number;
  isScrolling?: boolean;
  row: T;
}

const TableRow: FC<TableRowProps<any>> = <T,>({
  style,
  rowClass,
  index,
  isScrolling,
  row,
}: TableRowProps<T>) => {
  const {
    textLayout,
    labels,
    realWidth,
    titleHeight,
    canChecked,
    checked,
    setChecked,
    scrollingRender,
    columns,
    fixedLeftCount,
    fixedRightCount,
    getLeftWidth,
    getRightWidth,
  } = useContext(VirtualTableContext);

  return (
    <div
      className={cx(
        'inline-flex items-center bg-white border-b border-b-[#eee] hover:bg-[#f6f6f6]',
        rowClass
      )}
      style={{
        ...style,
        top: (style?.top as number) + titleHeight,
        width: realWidth,
      }}
    >
      {!isScrolling && canChecked && (
        <IndeterminateCheckbox
          checked={checked.includes(index)}
          onClick={() => handleCheckBox(index, checked, setChecked)}
        />
      )}
      {isScrolling
        ? scrollingRender?.(index + 1)
        : columns.map((item, idx) => {
            const style: { [key: string]: number | string } = {
              width: item?.width,
            };
            if (idx < fixedLeftCount) {
              style['left'] = getLeftWidth(idx);
            }
            if (idx > labels.length - fixedRightCount - 1) {
              style['right'] = getRightWidth(idx);
            }
            if (idx === fixedLeftCount - 1) {
              style['boxShadow'] = '2px 0 4px 0 #eee';
            }
            if (idx === labels.length - fixedRightCount) {
              style['boxShadow'] = '-2px 0 4px 0 #eee';
            }

            return (
              <div
                className={cx('overflow-hidden relative h-full flex flex-col justify-center', {
                  'px-3': textLayout === 'left',
                  'text-center': textLayout === 'center',
                  'sticky z-50 bg-inherit left-0': idx < fixedLeftCount,
                  'sticky z-50 bg-inherit right-0': idx > labels.length - fixedRightCount - 1,
                })}
                style={style}
                key={idx}
              >
                {item?.cellRenders(row)}
              </div>
            );
          })}
    </div>
  );
};

export default TableRow;
