# 专家快捷入口悬浮效果实现规范

> 适用范围：专家团页面右侧「专家快捷入口」中的头像快捷按钮
> 文档用途：可直接交付研发开发
> 当前实现参考：`src/pages/QuestionPage.jsx`、`src/pages/QuestionPage.css`、`src/components/IconButton.jsx`
> 版本：v1.0
> 更新时间：2026-07-15

---

## 1. 目标

本区域悬浮效果需要同时满足两件事：

1. 头像按钮自身在 hover / focus 时出现投影、边框和轻微抬升，且投影不被侧栏裁切。
2. hover 后显示的名称提示浮层不被侧栏、页面内容区或滚动容器裁切。

---

## 2. 结构组成

右侧快捷入口结构如下：

```text
experts-side-panel
├── experts-side-section
│   ├── experts-side-section__title
│   └── experts-side-grid
│       ├── IconButton.experts-side-avatar
│       ├── IconButton.experts-side-avatar
│       └── ...
└── experts-side-section
```

按钮由 `IconButton` 组件渲染，支持：

1. 头像本体交互
2. tooltip 定位
3. tooltip portal 挂载

---

## 3. 布局与容器规则

### 3.1 侧栏容器

类名：`experts-side-panel`

| 属性 | 值 |
| --- | --- |
| 宽度 | `200px` |
| 高度 | `100%` |
| `overflow-x` | `visible` |
| `overflow-y` | `auto` |
| 内边距 | `var(--fd-padding-layout)` |
| 左分割线 | `1px solid var(--fd-color-split)` |

### 3.2 关键结论

投影不被横向裁切，核心原因是：

1. 侧栏容器显式设置了 `overflow-x: visible`
2. hover 投影直接挂在按钮本体上，而不是挂在被裁切的内部子层上

说明：

1. 这套方案允许按钮阴影向左右溢出。
2. 纵向仍由 `overflow-y: auto` 承担滚动能力。
3. 如果把 `overflow-x` 改成 `hidden`，按钮 hover 阴影会被侧栏边界裁掉。

---

## 4. 网格规则

类名：`experts-side-grid`

| 属性 | 值 |
| --- | --- |
| 布局 | `inline-grid` |
| 列数 | `repeat(3, 50px)` |
| 卡片间距 | `8px` |

说明：

1. 每行固定 3 个快捷头像位。
2. 每个按钮外框占 `50px × 50px`。

---

## 5. 头像按钮本体规则

类名：`experts-side-avatar`

### 5.1 默认态

| 属性 | 值 |
| --- | --- |
| `position` | `relative` |
| 布局 | `inline-flex`，水平垂直居中 |
| 宽高 | `50px × 50px` |
| 内边距 | `4px` |
| 边框 | `0.5px solid transparent` |
| 圆角 | `var(--fd-border-radius-lg)` |
| 背景 | `transparent` |
| 过渡 | `border-color` / `box-shadow` / `transform`，时长 `0.18s` |

### 5.2 内层头像图

| 属性 | 值 |
| --- | --- |
| 宽高 | `42px × 42px` |
| 圆角 | `var(--fd-border-radius)` |
| 裁切方式 | `object-fit: cover` |

### 5.3 Hover / Focus 态

| 属性 | 值 |
| --- | --- |
| 边框色 | `var(--fd-color-border)` |
| 投影 | `0 0 2px 0 rgba(9,30,64,.02), 0 4px 8px 0 rgba(9,30,64,.06), 0 4px 24px 6px rgba(9,30,64,.04)` |
| 位移 | `translateY(-1px)` |
| 缩放 | `scale(1.02)` |
| outline | `none` |

### 5.4 交互结论

这套 hover 视觉不是通过新增浮层实现的，而是直接作用在按钮本身：

1. `border-color` 让按钮边界更可见
2. `box-shadow` 提供悬浮层次
3. `translateY(-1px) scale(1.02)` 提供轻微抬升感

因此按钮阴影是否被截断，取决于外层容器的 `overflow` 设置。

---

## 6. Tooltip 规则

### 6.1 触发方式

每个快捷头像按钮都通过 `IconButton` 传入：

1. `tip={card.title}`
2. `tipPlacement="top"`

表示 hover / focus 时展示顶部 tooltip。

### 6.2 定位规则

`IconButton` 会在触发时读取按钮的 `getBoundingClientRect()`，再根据 `tipPlacement` 计算 tooltip 坐标：

| 放置方向 | 定位方式 |
| --- | --- |
| `top` | `top = rect.top - 6`，`left = rect.left + rect.width / 2` |
| `right` | `top = rect.top + rect.height / 2`，`left = rect.right + 6` |
| `bottom` | `top = rect.bottom + 6`，`left = rect.left + rect.width / 2` |

### 6.3 不被裁切的核心原因

tooltip 不被裁切，核心不是 `overflow-x: visible`，而是：

1. `IconButton` 使用 `createPortal(...)`
2. tooltip 被直接挂到 `document.body`
3. tooltip 样式使用 `position: fixed`
4. tooltip 具有较高层级 `z-index: 1100`

因此 tooltip 不受以下容器裁切影响：

1. 右侧侧栏
2. 页面内容区
3. 中间滚动容器
4. 祖先节点的 `overflow: hidden`

---

## 7. Tooltip 样式规范

基础类名：`icon-tip`

Portal 态类名：`icon-tip--portal`

顶部弹出类名：`icon-tip--top`

### 7.1 基础视觉

| 属性 | 值 |
| --- | --- |
| 内边距 | `4px 8px` |
| 圆角 | `var(--fd-border-radius)` |
| 背景 | `var(--fd-color-bg-spotilight)` |
| 文字色 | `var(--fd-color-text-white)` |
| 字号 | `12px` |
| 行高 | `20px` |
| 阴影 | `0 0 2px rgba(9,30,64,.05), 0 6px 8px rgba(9,30,64,.06), 0 6px 16px rgba(9,30,64,.04)` |
| 箭头 | `::before` 伪元素，`8px × 8px` 旋转形成 |

### 7.2 Portal 态

| 属性 | 值 |
| --- | --- |
| 定位 | `fixed` |
| 层级 | `z-index: 1100` |
| 显示 | `opacity: 1; visibility: visible` |
| 过渡 | `none` |

### 7.3 顶部提示位移

顶部提示最终使用：

```css
.icon-tip--portal.icon-tip--top {
  transform: translateX(-50%) translateY(-100%);
}
```

含义：

1. 先以按钮中心点对齐
2. 再整体向上偏移一个自身高度
3. 让 tooltip 正好出现在按钮上方

---

## 8. 实现拆解

### 8.1 按钮 hover 不被截断

必须同时满足：

1. 侧栏容器横向溢出可见
2. 投影写在按钮本体
3. 按钮不是被另一个 `overflow: hidden` 的包裹层二次裁切

### 8.2 Tooltip 不被截断

必须同时满足：

1. tooltip 通过 portal 渲染到 `body`
2. 使用 `fixed` 定位
3. 每次 hover / focus 时实时计算位置
4. 窗口 resize / scroll 时重新定位

---

## 9. 研发落地清单

1. 右侧快捷入口按钮必须复用支持 portal tooltip 的 `IconButton` 思路。
2. 若只想保留按钮投影不裁切，至少要保证侧栏 `overflow-x: visible`。
3. 若要保证 tooltip 绝对不裁切，不能只依赖 `absolute` + 父容器 `visible`，必须走 portal。
4. hover 态建议仅使用轻量位移和轻微 scale，不要做大位移，避免网格抖动。
5. tooltip 需要监听 `resize` 和 `scroll`，否则滚动后会出现位置漂移。
6. tooltip 层级需要高于页面内容层和侧栏层，建议保留 `z-index: 1100` 级别。

---

## 10. 最小实现要点

### 10.1 侧栏容器

```css
.experts-side-panel {
  overflow-x: visible;
  overflow-y: auto;
}
```

### 10.2 按钮 hover

```css
.experts-side-avatar:hover,
.experts-side-avatar:focus-visible {
  border-color: var(--fd-color-border);
  box-shadow:
    0 0 2px 0 rgba(9, 30, 64, 0.02),
    0 4px 8px 0 rgba(9, 30, 64, 0.06),
    0 4px 24px 6px rgba(9, 30, 64, 0.04);
  transform: translateY(-1px) scale(1.02);
}
```

### 10.3 Tooltip portal

```jsx
{tipVisible
  ? createPortal(
      <span
        className="icon-tip icon-tip--top icon-tip--portal"
        style={{ top: tipPos.top, left: tipPos.left }}
      >
        {tip}
      </span>,
      document.body,
    )
  : null}
```

---

## 11. 代码映射

| 能力 | 当前实现位置 |
| --- | --- |
| 专家快捷入口结构 | `src/pages/QuestionPage.jsx` 中 `experts-side-panel` |
| 侧栏与按钮样式 | `src/pages/QuestionPage.css` 中 `experts-side-panel` / `experts-side-avatar` |
| Tooltip 交互与 portal | `src/components/IconButton.jsx` |
| Tooltip 样式 | `src/pages/QuestionPage.css` 中 `icon-tip` / `icon-tip--portal` |
