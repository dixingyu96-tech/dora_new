# 首页推荐问题 Tag 宽度与自适应规则

适用对象：Dora 首页输入框下方的推荐问题 tag 列表，即“数据探索 / 深度分析 / 归因诊断 / 趋势预测 / 分析报告 ...”这一组快捷技能标签。

对应实现位置：

- `src/pages/QuestionPage.css`
- `src/pages/QuestionPage.jsx`

## 1. 组件结构

推荐 tag 区域由 4 层组成：

```jsx
<div className="hero-skill-slot dora-stage__skill-tags hero-skill-slot--tags">
  <div className="hero-skill-slot__panel hero-skill-slot__panel--tags">
    <div className="hero-skill-tags">
      <div className="hero-skill-tags__scroller">
        <button className="hero-skill-tag">
          <span className="hero-skill-tag__icon" />
          <span className="hero-skill-tag__label">数据探索</span>
        </button>
      </div>
      <button className="hero-skill-tags__nav hero-skill-tags__nav--prev" />
      <button className="hero-skill-tags__nav hero-skill-tags__nav--next" />
    </div>
  </div>
</div>
```

说明：

- `.hero-skill-slot` 是整个推荐区的占位层。
- `.hero-skill-slot__panel--tags` 是 tag 视图层。
- `.hero-skill-tags` 是可视窗口层。
- `.hero-skill-tags__scroller` 是横向滚动层。
- `.hero-skill-tag` 是单个推荐 tag。
- `.hero-skill-tags__nav` 是左右翻页按钮，仅在溢出时显示。

## 2. 外层宽度约束规则

推荐 tag 区域不是自由铺满页面，而是先受发送区宽度约束，再受自身最大宽度约束。

```css
.hero-skill-slot {
  width: 100%;
  max-width: var(--sender-max-width);
  min-width: 0;
}

.hero-skill-tags {
  width: min(680px, 100%);
  max-width: 680px;
  min-width: 0;
}
```

核心规则：

- 整个推荐区宽度最多不超过 `--sender-max-width`。
- tag 可视区宽度最多不超过 `680px`。
- 当父容器小于 `680px` 时，tag 区域跟随父容器收缩。
- 当父容器大于 `680px` 时，tag 区域固定按 `680px` 展示。

研发实现时可以按下面公式理解：

```text
tag 视口宽度 = min(发送区可用宽度, 680px)
```

## 3. 单个 Tag 宽度规则

单个 tag 采用“内容决定宽度”的设计，不做等宽处理，也不做固定列数布局。

```css
.hero-skill-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--fd-gap-sm);
  flex: 0 0 auto;
  padding: var(--fd-padding-layout-2xs) var(--fd-padding-layout-sm);
  border: 1px solid var(--fd-color-border);
  border-radius: var(--fd-border-radius);
  white-space: nowrap;
}
```

核心规则：

- tag 宽度由“图标 + 文案 + 左右 padding”自然撑开。
- `flex: 0 0 auto` 保证 tag 不参与拉伸，也不被压缩。
- `white-space: nowrap` 保证单个 tag 永远单行显示。
- 不允许对 tag 设置统一固定宽度。
- 不允许因容器不足而把文案压成两行。

单个 tag 的宽度可理解为：

```text
tag 宽度 = 左 padding + 图标宽度 + 图标与文案间距 + 文案自然宽度 + 右 padding + 边框
```

## 4. Tag 列表排布规则

tag 列表使用横向 flex 布局，标签之间保持固定间距。

```css
.hero-skill-tags__scroller {
  display: flex;
  align-items: flex-start;
  gap: var(--fd-gap-2xl);
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
```

核心规则：

- tag 在一条水平线上从左到右排列。
- 标签之间固定间距为 `var(--fd-gap-2xl)`。
- 不换行。
- 容器宽度不足时，进入横向滚动模式，而不是压缩标签宽度。

列表总宽度可按下面公式理解：

```text
总内容宽度 = 所有 tag 宽度之和 + gap * (tag 数量 - 1)
```

当前实现中默认 tag 数量为 10 个：

```text
数据探索 / 深度分析 / 归因诊断 / 趋势预测 / 分析报告 / 幻灯片 / 数据可视化 / 监控预警 / 指标管理 / 业务洞察
```

## 5. 溢出判定规则

是否溢出不是写死判断，而是根据滚动容器的真实尺寸实时计算。

```jsx
const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth)
const hasOverflow = maxScrollLeft > 1
const canScrollPrev = scroller.scrollLeft > 1
const canScrollNext = scroller.scrollLeft < maxScrollLeft - 1
```

核心规则：

- `scrollWidth <= clientWidth`：认为没有溢出。
- `scrollWidth > clientWidth`：认为有溢出。
- 已经滚到最左侧时，不显示“向前”翻页按钮。
- 已经滚到最右侧时，不显示“向后”翻页按钮。
- 判定阈值使用 `1px` 容差，避免浮点误差引起按钮闪烁。

## 6. 溢出后的展示规则

当内容溢出时，组件进入“横向滚动 + 渐隐提示 + 翻页按钮”的展示模式。

```css
.hero-skill-tags::before,
.hero-skill-tags.has-overflow::after {
  width: 72px;
  opacity: 0;
}

.hero-skill-tags.can-scroll-prev::before,
.hero-skill-tags.can-scroll-next::after {
  opacity: 1;
}

.hero-skill-tags.can-scroll-prev .hero-skill-tags__scroller {
  padding-left: 32px;
}

.hero-skill-tags.can-scroll-next .hero-skill-tags__scroller {
  padding-right: 32px;
}
```

核心规则：

- 左右两侧使用渐隐遮罩提示“还有更多内容”。
- 遮罩宽度固定为 `72px`。
- 只有在可继续向该方向滚动时，遮罩才显示。
- 当某一侧需要显示翻页按钮时，滚动容器对应一侧补 `32px` 内边距，给按钮和遮罩留出安全区。
- 标签本身仍保持自然宽度，不因溢出进入压缩模式。

## 7. 翻页按钮规则

左右翻页按钮只在对应方向可滚动时出现。

```css
.hero-skill-tags__nav {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 32px;
  height: 32px;
  margin: auto 0;
}
```

```jsx
scroller.scrollBy({
  left: direction * Math.max(160, scroller.clientWidth * 0.55),
  behavior: 'smooth',
})
```

核心规则：

- 左右按钮尺寸固定为 `32px * 32px`。
- 左按钮固定贴左，右按钮固定贴右。
- 每次点击的滚动步长不是一个 tag，而是“`160px` 与当前可视宽度 `55%` 中的较大值”。
- 这样可以避免小屏幕滚动太短，也能避免大屏幕滚动太碎。

翻页步长公式：

```text
每次滚动距离 = max(160px, 当前 tag 视口宽度 * 0.55)
```

## 8. 响应式规则

这组 tag 没有单独的断点尺寸表，主要通过“父容器收缩 + 自然溢出 + 横向滚动”完成适配。

核心规则：

- 大屏：tag 可视区通常稳定在 `680px`。
- 中屏：tag 可视区跟随发送区收缩。
- 小屏：单个 tag 宽度保持不变，整体进入横向滚动。
- 不因为屏幕变窄而减少文字、缩小字重或让标签换行。
- 不建议在窄屏改成两行瀑布流，否则会破坏当前“技能导航条”的交互心智。

## 9. 状态与视觉反馈规则

推荐 tag 存在默认、hover、active 三类主要状态。

```css
.hero-skill-tag:hover {
  background: var(--fd-color-bg-container-grey);
  color: var(--fd-color-text);
}

.hero-skill-tag.is-active {
  border-color: #b9d3fe;
  border-radius: 999px;
  background: #f5faff;
  color: #2c60db;
}
```

核心规则：

- 默认态为浅边框、白底。
- hover 态只提升背景和文字可见性，不改变宽度。
- active 态保留内容宽度，但圆角提升为胶囊态 `999px`。
- 任意状态切换都不允许触发 tag 宽度跳变。

## 10. 动效与无障碍规则

tag 进入时有逐个上浮淡入的动效，但动效不影响宽度和布局计算。

```css
.hero-skill-slot--animate.hero-skill-slot--tags .hero-skill-tag {
  opacity: 0;
  transform: translate3d(0, 6px, 0);
}
```

同时需要支持 reduced motion：

- 用户开启 `prefers-reduced-motion: reduce` 时，进入动效、翻页按钮动效和相关过渡应关闭。
- 关闭动效后，tag 区域仍需保持相同的宽度和溢出逻辑。

## 11. 研发实现 Checklist

- 单个 tag 使用内容自适应宽度，不设置固定宽度。
- 单个 tag 强制单行，不换行，不压缩。
- tag 区域最大宽度固定为 `680px`，同时不超过发送区可用宽度。
- 内容未溢出时，不显示左右翻页按钮和渐隐提示。
- 内容溢出时，进入横向滚动，不改为多行布局。
- 左右按钮显示状态必须由真实滚动位置动态决定。
- 点击翻页按钮时，滚动距离使用 `max(160px, clientWidth * 0.55)`。
- 容器尺寸变化时，必须重新计算溢出状态。
- `prefers-reduced-motion` 下保留布局和滚动逻辑，只关闭动画。

## 12. 一句话交付给研发

推荐问题 tag 采用“单个标签内容自适应宽度 + 整组最大 680px + 超出后横向滚动”的方案；任何屏宽下都不压缩文案、不换行，通过渐隐遮罩和左右翻页按钮处理溢出。
