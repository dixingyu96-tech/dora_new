# 发送侧文件卡片自适应布局规范

> 适用范围：Dora 会话页中，用户发送消息附件区的文件卡片组
> 文档用途：可直接交付研发实现
> 当前实现参考：[src/components/SessionThread.jsx](./src/components/SessionThread.jsx)、[src/pages/QuestionPage.css](./src/pages/QuestionPage.css)
> 版本：v1.0
> 更新时间：2026-07-15

---

## 1. 目标

发送侧文件卡片需要满足以下目标：

1. 整组始终占满提问区可用宽度，但内容保持右对齐。
2. 单卡和多卡使用同一套布局算法，不分两套规则。
3. 单个卡片宽度有上限，空间不足时按规则压缩。
4. 当压缩到最小宽度仍放不下时，优先减少列数，而不是无限压窄。
5. 超过最大可视槽位时，用 `+N 个文件` 折叠卡占据最后一个槽位。

---

## 2. 设计 Token 与实现常量

### 2.1 视觉 Token

| 项 | Token | 当前值 |
| --- | --- | --- |
| 卡片横向/纵向间距 | `--fd-gap` | `8px` |
| 卡片圆角 | `--fd-border-radius-lg` | `8px` |
| 主字号 | `--fd-font-size` | `14px` |
| 主行高 | `--fd-line-height` | `22px` |

### 2.2 布局常量

| 常量 | 值 | 说明 |
| --- | --- | --- |
| `MAX_COLS` | `4` | 最大列数 |
| `MAX_CARD_WIDTH` | `320px` | 单卡最大宽度 |
| `MIN_CARD_WIDTH` | `140px` | 多列态单卡最小宽度 |
| `MAX_VISIBLE_SLOTS` | `8` | 收起态最大可视槽位数 |
| `MAX_VISIBLE_FILES_WHEN_COLLAPSED` | `7` | 收起态最多显示的真实文件数 |

说明：

1. `MIN_CARD_WIDTH` 只对多列场景生效。
2. 单列场景不强制 `140px` 下限，允许跟随容器继续变窄。
3. `+N 个文件` 也占据一个标准槽位。

---

## 3. DOM 结构规范

```text
session-thread__user-files
├── session-thread__user-file-column
│   ├── session-thread__user-file
│   └── session-thread__user-file
├── session-thread__user-file-column
│   ├── session-thread__user-file
│   └── session-thread__user-file--expand
└── ...
```

### 3.1 外层容器

类名：`session-thread__user-files`

| 属性 | 规范 |
| --- | --- |
| `display` | `flex` |
| `flex` | `1` |
| `width` | `100%` |
| `max-width` | `100%` |
| `min-width` | `0` |
| `justify-content` | `flex-end` |
| `flex-wrap` | `nowrap` |
| `gap` | `var(--fd-gap)` |

说明：

1. 外层容器必须撑满提问区域容器。
2. 文件组整体右对齐，不能左散开，也不能居中。
3. 外层禁止直接 `wrap`，必须先分列，再由列内纵向堆叠。

### 3.2 列容器

类名：`session-thread__user-file-column`

| 属性 | 规范 |
| --- | --- |
| `display` | `flex` |
| `flex-direction` | `column` |
| `flex` | `0 0 auto` |
| `min-width` | `0` |
| `gap` | `var(--fd-gap)` |
| `width` | 运行时计算出的 `cardWidth` |

说明：

1. 同一列内所有卡片宽度完全一致。
2. 多列之间不做独立伸缩，统一由 `cardWidth` 控制。

---

## 4. 卡片视觉规范

### 4.1 普通文件卡片

类名：`session-thread__user-file`

| 项 | 规范 |
| --- | --- |
| 宽度 | `100%`，实际由列宽控制 |
| 最小高度 | `46px` |
| 内边距 | `7px 12px` |
| 圆角 | `var(--fd-border-radius-lg)` |
| 背景 | `var(--fd-color-bg-container-grey)` |
| Hover 背景 | `var(--fd-color-fill-quaternary)` |
| 内容布局 | `display: flex; align-items: center; gap: var(--fd-gap)` |

### 4.2 卡片内部元素

| 元素 | 规范 |
| --- | --- |
| 文件图标 | `32px × 32px` |
| 文本容器 | 纵向排列，`min-width: 0` |
| 文件名 | 单行省略，字号 `14px` |
| 文件大小 | 次级信息，弱化色，字号小于主标题 |

### 4.3 折叠卡片

类名：`session-thread__user-file session-thread__user-file--expand`

| 项 | 规范 |
| --- | --- |
| 最小高度 | `56px` |
| 圆角 | 与普通卡片一致 |
| 文字颜色 | `var(--fd-color-text-description)` |
| 主文案字号 | `var(--fd-font-size)`，即 `14px` |
| 主文案行高 | `var(--fd-line-height)`，即 `22px` |
| 图标字号 | `12px` |
| 内容对齐 | 水平、垂直居中 |

说明：

1. `+N 个文件` 卡片需要和普通卡片占据同一列宽。
2. 高度允许高于普通卡片，但宽度规则不能单独处理。

---

## 5. 自适应布局算法

当前实现不依赖传统页面断点，而是完全根据消息区实时宽度计算。

### 5.1 输入

| 输入 | 说明 |
| --- | --- |
| `files` | 当前消息携带的文件数组 |
| `containerWidth` | 当前消息线程容器宽度 |
| `expanded` | 是否已展开全部文件 |

### 5.2 收起态可视槽位规则

```ts
hiddenCount =
  !expanded && files.length > MAX_VISIBLE_SLOTS
    ? files.length - MAX_VISIBLE_FILES_WHEN_COLLAPSED
    : 0

visibleFiles =
  hiddenCount > 0
    ? files.slice(0, MAX_VISIBLE_FILES_WHEN_COLLAPSED)
    : files

visibleItems =
  hiddenCount > 0
    ? [...visibleFiles, { type: 'expand', count: hiddenCount }]
    : visibleFiles
```

结论：

1. `1` 到 `8` 个文件时，全部直接展示。
2. `9` 个及以上文件时，展示前 `7` 个文件，最后一个槽位渲染 `+N 个文件`。
3. `N = 总文件数 - 7`。

### 5.3 列数计算

```ts
slotCount = Math.max(1, visibleItems.length)
cols = Math.min(MAX_COLS, slotCount)
```

结论：

| 可视槽位数 | 列数 |
| --- | --- |
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |
| 4 及以上 | 4 |

### 5.4 最小宽度保护与减列规则

先按当前列数试算列宽：

```ts
getWidthForCols(count) =
  Math.floor((containerWidth - GAP * (count - 1)) / count)
```

如果当前列宽小于 `140px`，则不断减列，直到满足最小宽度或只剩 1 列：

```ts
while (cols > 1 && getWidthForCols(cols) < MIN_CARD_WIDTH) {
  cols -= 1
}
```

结论：

1. 多列状态下，卡片宽度不能小于 `140px`。
2. 不满足时优先减列，不允许 4 列一直硬压到过窄。
3. 单列状态不强制 `140px`，允许继续跟随容器缩小。

### 5.5 最终卡片宽度公式

```ts
rawCardWidth =
  Math.floor((containerWidth - GAP * (cols - 1)) / cols)

if (cols === 1) {
  cardWidth = Math.min(MAX_CARD_WIDTH, Math.max(0, rawCardWidth))
} else {
  cardWidth = Math.min(
    MAX_CARD_WIDTH,
    Math.max(MIN_CARD_WIDTH, rawCardWidth)
  )
}
```

结论：

1. 单卡最大不会超过 `320px`。
2. 多卡场景下，宽度范围为 `140px` 到 `320px`。
3. 空间宽裕时，每列固定封顶 `320px`，整组依然贴右显示。

---

## 6. 宽度阈值规则

### 6.1 满宽态阈值

当列数固定时，维持每列 `320px` 所需的最小容器宽度为：

| 列数 | 最小容器宽度 |
| --- | --- |
| 1 | `320px` |
| 2 | `648px` |
| 3 | `976px` |
| 4 | `1304px` |

计算公式：

```text
containerWidth = cols * 320 + (cols - 1) * 8
```

### 6.2 减列阈值

为了保证多列卡片不小于 `140px`，实际减列阈值为：

| 当前列数 | 允许维持该列数的最小容器宽度 |
| --- | --- |
| 4 列 | `584px` |
| 3 列 | `436px` |
| 2 列 | `288px` |

计算公式：

```text
containerWidth = cols * 140 + (cols - 1) * 8
```

结论：

1. `containerWidth >= 584px` 时，可以继续维持 4 列，只是卡片宽度可能低于 `320px`。
2. `containerWidth < 584px` 时，4 列会自动降为 3 列。
3. `containerWidth < 436px` 时，3 列会自动降为 2 列。
4. `containerWidth < 288px` 时，2 列会自动降为 1 列。

---

## 7. 多卡分布规则

### 7.1 规则目标

多卡不是简单按行平铺，而是通过“按列切片”的方式，让不满两行时，第二行优先贴近右侧，保持发送侧视觉平衡。

### 7.2 列高分配规则

```ts
rows = Math.ceil(visibleItems.length / cols)
tallerColumnCount = visibleItems.length % cols
baseColumnHeight = Math.max(1, Math.floor(visibleItems.length / cols))

columnHeights = Array.from({ length: cols }, (_, index) =>
  rows <= 1
    ? 1
    : baseColumnHeight + (
        tallerColumnCount > 0 && index >= cols - tallerColumnCount ? 1 : 0
      )
)
```

说明：

1. 当不能均分时，右侧列优先比左侧列更高。
2. 这样第二行内容会优先落在右侧，而不是从左侧开始补。

### 7.3 切片规则

```ts
columns = []
cursor = 0

columnHeights.forEach((height) => {
  columns.push(visibleItems.slice(cursor, cursor + height))
  cursor += height
})
```

说明：

1. 文件顺序保持不变。
2. 先算每列要放几个，再顺序切片装进列中。
3. 最终展示是“列内上下排列，列与列从左到右排开”。

---

## 8. 排布示意

以下示意均以发送侧右对齐为前提。

### 8.1 单卡

```text
[ file1 ]
```

### 8.2 2 卡

```text
[ file1 ] [ file2 ]
```

### 8.3 5 卡

```text
列1      列2      列3      列4
file1    file2    file3    file4
                           file5
```

对应列结构：

```text
[[1], [2], [3], [4, 5]]
```

### 8.4 6 卡

```text
列1      列2      列3      列4
file1    file2    file3    file5
                  file4    file6
```

对应列结构：

```text
[[1], [2], [3, 4], [5, 6]]
```

### 8.5 7 卡

```text
列1      列2      列3      列4
file1    file2    file4    file6
         file3    file5    file7
```

对应列结构：

```text
[[1], [2, 3], [4, 5], [6, 7]]
```

### 8.6 8 槽位

```text
列1      列2      列3      列4
file1    file3    file5    file7
file2    file4    file6    file8
```

对应列结构：

```text
[[1, 2], [3, 4], [5, 6], [7, 8]]
```

### 8.7 11 个文件，收起态

```text
列1      列2      列3      列4
file1    file3    file5    file7
file2    file4    file6    +4个文件
```

对应列结构：

```text
[[1, 2], [3, 4], [5, 6], [7, +4]]
```

---

## 9. 展开交互规则

1. 收起态下，`+N 个文件` 占用标准文件卡槽位。
2. 点击后显示全部文件，不再保留折叠卡。
3. 展开状态只在当前会话渲染周期内生效。
4. 当页面切换、会话切换、导航切换后，展开状态需要重置为收起。

---

## 10. 容器宽度监听规范

当前实现使用 `ResizeObserver` 监听消息线程根容器宽度变化，并在变化时重算布局。

建议研发实现方式：

1. 监听文件组所在消息线程容器宽度变化。
2. 在以下场景重新计算：
   - 窗口缩放
   - 侧栏展开/收起
   - 页面容器宽度变化
   - 会话消息条目增减
3. 首次尚未拿到宽度时，可先用 `320px` 作为回退宽度。

---

## 11. 研发落地清单

1. 不要使用 `flex-wrap: wrap` 直接平铺所有文件卡片。
2. 必须先算列数，再算列宽，再生成列结构。
3. 列宽需要由运行时计算结果注入，不能只靠纯 CSS 猜测。
4. 卡片间距和圆角全部使用 token，不写死视觉值。
5. `+N 个文件` 卡片的字号必须显式设置为 `14px` 对应 token。
6. 文本区域必须 `min-width: 0`，否则长文件名会撑破列宽。
7. 多卡不满两行时，第二行应优先落在右侧列，不能从左往右补齐。

---

## 12. 代码映射

| 能力 | 当前实现位置 |
| --- | --- |
| 布局主算法 | `src/components/SessionThread.jsx` 中 `computeSenderFileLayout` |
| 宽度监听 | `src/components/SessionThread.jsx` 中 `ResizeObserver` 相关逻辑 |
| 文件组容器样式 | `src/pages/QuestionPage.css` 中 `.session-thread__user-files` |
| 列容器样式 | `src/pages/QuestionPage.css` 中 `.session-thread__user-file-column` |
| 普通文件卡样式 | `src/pages/QuestionPage.css` 中 `.session-thread__user-file` |
| 折叠卡样式 | `src/pages/QuestionPage.css` 中 `.session-thread__user-file--expand` |
