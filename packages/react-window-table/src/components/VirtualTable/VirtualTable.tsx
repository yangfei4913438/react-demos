import React, { type FC, type Dispatch, type SetStateAction, useState } from 'react';
import {
  FixedSizeList,
  type ListChildComponentProps,
  type ListOnItemsRenderedProps,
} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import TableWrapper from './TableWrapper';
import TableRow from './TableRow';
import { type IWidths, VirtualTableContext } from './consts';

export interface VirtualTableProps<T> {
  // 展示的数据
  list: T[];
  // 列的显示比例,完整为1，如: { name: 0.3, description: 0.7 }
  widths: IWidths;
  // 列头拖动时的响应方法，用于更新宽度
  changeWidths: Dispatch<SetStateAction<IWidths>>;
  // 能否改变列宽度
  canChangeWidths?: boolean;
  // 能否拖拽列顺序
  canDragSortColumn?: boolean;
  // 文字布局
  textLayout?: 'left' | 'center';

  // 列名的国际化变量, 如: { name: strings.NAME, description: strings.DESCRIPTION }
  labels: string[];
  // 改变列的顺序，也可以修改多语言（当前组件内，只用于改变列的显示顺序）
  changeLabels: Dispatch<SetStateAction<string[]>>;

  // 列的排序渲染
  sortRenders?: { [key: string]: React.ReactNode };
  // 列的筛选渲染
  filterRenders?: { [key: string]: React.ReactNode };
  // 列元素的渲染方法, 如: { name: this.cellRender, description: this.cellRender };
  cellRenders: { [key: string]: (row: T) => React.ReactNode };
  // 表头的渲染方法
  headRenders: { [key: string]: React.ReactNode };
  // 渲染滚动行
  scrollingRender?: (index: number) => React.ReactNode;

  // 请求下页数据
  nextPage: () => void;
  // 触发下页请求的滚动百分比, 取值范围 0.1 - 0.95 即 10% - 95%
  nextTrigger?: number;

  // 标题行高度
  titleHeight?: number;
  // 每行的高度
  rowHeight?: number;

  // 表头的行类名
  headerClass?: string;
  // 表格的行类名
  rowClass?: string;

  // 顶部固定行数量
  fixedTopCount?: number;
  // 左侧固定列数量
  fixedLeftCount?: number;
  // 右侧固定列数量
  fixedRightCount?: number;

  // 是否启用选中
  canChecked?: boolean;
  // 选中的对象
  checked?: number[];
  // 更新选中的对象
  setChecked?: Dispatch<React.SetStateAction<number[]>>;
}

const VirtualTable: FC<VirtualTableProps<any>> = <T,>({
  list,
  widths,
  labels,
  changeLabels,
  textLayout = 'left',

  sortRenders,
  filterRenders,
  cellRenders,
  headRenders,
  scrollingRender,

  changeWidths,
  canChangeWidths = true,
  canDragSortColumn = true,
  nextPage,
  nextTrigger = 0.55, // 默认值 55%

  titleHeight = 50,
  rowHeight = 45,
  headerClass,
  rowClass,

  fixedTopCount = 0, // 默认不锁定行
  fixedLeftCount = 0, // 默认不锁定列
  fixedRightCount = 0, // 默认不锁定列

  canChecked = true,
  checked = [],
  setChecked = () => undefined,
}: VirtualTableProps<T>) => {
  // 表格宽度
  const [tableWidth, setTableWidth] = useState<number>(0);

  // 宽度变更
  const onChangeWidth = (key: string, x: number) => {
    // 空值是重置宽度
    if (key === '' || x === 0) {
      return;
    }

    // 当前的宽度
    const currentWidth = widths[key] * tableWidth + x;
    // 下一个宽度
    const index = labels.indexOf(key);
    const nextDataKey = labels[index + 1];
    const nextWidth = widths[nextDataKey] * tableWidth - x;

    // 宽度最小不能低于100px
    if (currentWidth > 100 && nextWidth > 100) {
      // 计算出百分比
      const currentPercent = currentWidth / tableWidth;
      const nextPercent = nextWidth / tableWidth;
      // 更新宽度比例
      changeWidths((prev) => ({
        ...prev,
        [key]: currentPercent,
        [nextDataKey]: nextPercent,
      }));
    }
  };

  const realWidth = () => {
    const res = labels.map((key) => widths[key] * tableWidth).reduce((a, b) => a + b);
    return canChecked ? res + 44 : res;
  };

  // 监听渲染的行索引
  const onItemsRendered = (info: ListOnItemsRenderedProps) => {
    // 触发比例范围检查: 10% - 95%
    const nt = nextTrigger > 0.95 ? 0.95 : nextTrigger < 0.1 ? 0.1 : nextTrigger;

    // 渲染超过55%，请求后面的数据
    if (info.overscanStopIndex / list.length >= nt) {
      // 更新下页数据
      nextPage();
    }
  };

  // 渲染列
  const renderColumn = (dataKey: string) => {
    return {
      dataKey,
      width: widths[dataKey] * tableWidth,
      headRenders,
      cellRenders: (rowData: T) => cellRenders[dataKey](rowData),
    };
  };

  // 生成列数组
  const columns = labels.map((key) => renderColumn(key));

  // 获取左侧绝对定位的距离
  const getLeftWidth = (idx: number) => {
    if (idx === 0) {
      return canChecked ? 44 : 0;
    }
    const cols = labels
      .map((key) => widths[key] * tableWidth)
      .slice(0, idx)
      .reduce((a, b) => a + b);

    return canChecked ? cols + 44 : cols;
  };

  // 获取右侧绝对定位的距离
  const getRightWidth = (idx: number) => {
    if (idx === labels.length - 1) {
      return 0;
    }
    return labels
      .map((key) => widths[key] * tableWidth)
      .slice(idx + 1)
      .reduce((a, b) => a + b);
  };

  return (
    <AutoSizer onResize={({ width }) => setTableWidth(width)}>
      {({ width, height }: { width: number; height: number }) => {
        return (
          <VirtualTableContext.Provider
            value={{
              fixedTopCount,
              fixedLeftCount,
              fixedRightCount,
              list,
              titleHeight,
              rowHeight,
              columns,
              textLayout,
              labels,
              changeLabels,
              widths,
              changeWidths,
              canChangeWidths,
              headerClass,
              rowClass,
              canDragSortColumn,
              canChecked,
              checked,
              setChecked,
              filterRenders,
              sortRenders,
              onChangeWidth,
              realWidth: realWidth(),
              getLeftWidth,
              getRightWidth,
              scrollingRender,
            }}
          >
            <FixedSizeList
              innerElementType={TableWrapper}
              itemData={{ list: list.slice(fixedTopCount, list.length) }}
              itemCount={list.length - fixedTopCount} // 一共有多少行
              height={height}
              width={width}
              itemSize={rowHeight}
              overscanCount={3} // 比实际多渲染n行元素
              onItemsRendered={onItemsRendered} // 渲染进度监听
              useIsScrolling={!!scrollingRender}
            >
              {(props: ListChildComponentProps<{ list: T[] }>) => {
                const {
                  data: { list },
                  index,
                  style,
                  isScrolling,
                } = props;

                const row = list[index];

                return (
                  <TableRow
                    row={row}
                    rowClass={rowClass}
                    style={style}
                    index={index + fixedTopCount}
                    isScrolling={isScrolling}
                    key={index + fixedTopCount}
                  />
                );
              }}
            </FixedSizeList>
          </VirtualTableContext.Provider>
        );
      }}
    </AutoSizer>
  );
};

VirtualTable.displayName = 'VirtualTable';

export default VirtualTable;
