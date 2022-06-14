## 说明：

a fantastic react swiper component

## API

| 参数               | 说明                       | 类型                                  | 默认值     | 备选值                                          |
| ------------------ | -------------------------- | ------------------------------------- | ---------- | ----------------------------------------------- |
| `duration`  | 切换动画持续时间(ms)       | `number`   | `300`      |   |
| `autoPlay`   | 自动切换间隔时间(ms)       | `number`  | `3000`     |     |
| `selectedIndex` | 默认选中index | `number` |  `0` | |
| `direction`   | 滚动方向          | `string`  | `'horizontal' | 'vertical'`     |     |
| `loop`   | 是否允许循环轮播       | `bool`           | `true`     |  |
| `touchable`   | 是否允许滑动       | `bool`           | `true`     |  |
| `showIndicators`   | 是否显示两侧翻页按钮  | `bool` | `true` |  |
| `showDots`    | 是否显示底部dots           | `bool`     | `true` | |
| `dots`   | 底部dots  | `React.ReactNode`    | `null`    |   |
| `indicator`   | 两侧翻页按钮   | `React.ReactNode`    | `null`    |   |
| `style`     | 自定义额外样式   |  `React.CSSProperties` | `{}`    |        |
| `className`   | 自定义额外类名  | `string`   | `''`       |    |
| `onChange`  | 切换时回调函数 | `(current: number, prev: number): void` | `noop`   |   |

## 实例方法

| 方法名  | 说明               | 参数名 | 参数描述                       |
| ------- | ------------------ | ------ | ------------------------------ |
| `swipeTo` | 手动切换轮播图     | `index`  | 需要切换的轮播图索引,从 0 开始 |
| `prev`    | 切换至上一张轮播图 |        |                                |
| `next`    | 切换至下一张轮播图 |        |                                |

## License

MIT © [xigua1994](https://github.com/xigua1994)
