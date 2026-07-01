# 最佳实践卡片自适应规则

适用对象：Dora 首页「探索最佳实践」展开页中的实践卡片网格。

对应实现位置：

- `src/pages/QuestionPage.css`
- `src/pages/QuestionPage.jsx`

## 1. 组件结构

展开页卡片由三层组成：

```jsx
<section className="practices-browser dora-stage__practices-browser">
  <div className="practices-grid">
    <article className="practice-browser-card">
      <div className="practice-browser-card__cover">
        <img className="practice-browser-card__cover-image" />
      </div>
      <div className="practice-browser-card__body">
        <h3>经营分析</h3>
      </div>
    </article>
  </div>
</section>
```

说明：

- `.practices-browser` 是滚动容器。
- `.practices-grid` 负责自适应列数。
- `.practice-browser-card` 是固定尺寸卡片。
- `.practice-browser-card__cover` 是封面区。
- `.practice-browser-card__body` 是标题区。

## 2. 父级滚动容器规则

```css
.practices-browser {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: var(--fd-gap);
  width: 100%;
  min-height: 0;
  padding: var(--fd-padding-layout) var(--fd-padding-layout-2xl) var(--fd-padding-layout-xs);
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;
}
```

核心规则：

- 外层容器占满可用高度。
- 横向不滚动，纵向滚动。
- 内容水平居中。
- 两侧页面内边距由 `--fd-padding-layout-2xl` 控制。

## 3. 网格自适应规则

```css
.practices-grid {
  --practice-browser-card-width: 240px;
  --practice-browser-grid-max-width: 1008px;

  display: grid;
  flex: 1;
  grid-template-columns: repeat(auto-fit, var(--practice-browser-card-width));
  gap: var(--fd-gap-2xl);
  width: 100%;
  max-width: min(100%, var(--practice-browser-grid-max-width));
  min-height: 0;
  align-content: start;
  justify-content: center;
}
```

核心规则：

- 单张卡片宽度固定为 `240px`。
- 卡片本身不随容器宽度拉伸。
- 网格使用 `auto-fit` 根据可用宽度自动决定一行展示几张。
- 网格内容居中展示。
- 最大网格宽度为 `1008px`，用于限制最多一行 4 张。

## 4. 最多 4 列的计算方式

当前参数：

```text
卡片宽度 = 240px
列间距 = 16px
最大列数 = 4
最大网格宽度 = 240 * 4 + 16 * 3 = 1008px
```

因此：

```css
--practice-browser-grid-max-width: 1008px;
max-width: min(100%, var(--practice-browser-grid-max-width));
```

这条规则保证：

- 容器足够宽时，最多展示 4 列。
- 容器变窄时，自动变成 3 列、2 列、1 列。
- 卡片宽度始终保持 `240px`，不会被 `1fr` 拉伸。

## 5. 列数判断公式

研发可按下面公式理解：

```text
可用网格宽度 = min(容器宽度, 1008px)
卡片宽度 = 240px
列间距 = 16px

一行可展示数量 = floor((可用网格宽度 + 16) / (240 + 16))
最终列数 = min(一行可展示数量, 4)
```

典型结果：

```text
可用宽度 >= 1008px：4 列
可用宽度 752px ~ 1007px：3 列
可用宽度 496px ~ 751px：2 列
可用宽度 < 496px：1 列
```

说明：

- `752px = 240 * 3 + 16 * 2`
- `496px = 240 * 2 + 16`
- 阈值需要结合外层页面 padding 后的实际内容宽度判断。

## 6. 卡片尺寸规则

```css
.practice-browser-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 194px;
  padding: 0;
  background: var(--fd-color-bg-container);
  border: 1px solid var(--fd-color-border-secondary);
  border-radius: var(--fd-border-radius-xl);
  overflow: hidden;
}
```

核心规则：

- 卡片宽度由 `.practices-grid` 的列宽决定，固定为 `240px`。
- 卡片高度固定为 `194px`。
- 卡片不设置 `width: 100%` 或 `minmax(..., 1fr)`，避免自适应拉伸。
- 卡片内部纵向排列：上方封面，下方标题。

## 7. 封面区规则

```css
.practice-browser-card__cover {
  position: relative;
  flex: 0 0 150px;
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.practice-browser-card__cover-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
```

核心规则：

- 封面区高度固定为 `150px`。
- 图片填满封面区。
- 图片使用 `object-fit: cover` 裁切。
- 图片优先展示顶部内容：`object-position: center top`。

## 8. 标题区规则

```css
.practice-browser-card__body {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 44px;
  width: 100%;
  min-width: 0;
  padding: 0 var(--fd-padding-layout-sm);
  background: var(--fd-color-bg-container);
}

.practice-browser-card h3 {
  overflow: hidden;
  max-width: 100%;
  color: var(--fd-color-text-secondary);
  font-size: var(--fd-font-size);
  font-weight: 600;
  line-height: var(--fd-line-height);
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

核心规则：

- 标题区高度固定为 `44px`。
- 标题垂直居中。
- 标题单行展示，超出省略。
- `min-width: 0` 必须保留，避免长标题撑破容器。

## 9. Hover / Focus 规则

```css
.practice-browser-card:hover,
.practice-browser-card:focus-visible {
  z-index: 1;
  border-color: var(--fd-color-border);
  box-shadow:
    0 0 2px 0 rgba(9, 30, 64, 0.02),
    0 4px 8px 0 rgba(9, 30, 64, 0.06),
    0 4px 24px 6px rgba(9, 30, 64, 0.04);
  transform: translateY(-2px);
  outline: none;
}
```

核心规则：

- 悬浮时卡片上浮 `2px`。
- 提升 `z-index`，避免阴影被相邻卡片遮挡。
- 只改变视觉层级，不改变布局占位。

## 10. 不要调整的布局约束

为了保持当前自适应规则稳定，开发时不要做以下改动：

```css
/* 不要把列宽改成 1fr */
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

/* 不要让卡片 width: 100% 后再用 1fr 拉伸 */
.practice-browser-card {
  width: 100%;
}

/* 不要移除最大网格宽度，否则会超过 4 列 */
max-width: min(100%, 1008px);
```

正确原则：

```text
父级 grid 负责决定展示个数；
卡片尺寸固定；
超过当前行容量后自动换行；
一行最多 4 张。
```

## 11. 当前实测结果

当前页面实测：

```text
视口宽度：1255px
网格列：240px 240px 240px 240px
列间距：16px
首行数量：4 张
卡片尺寸：240px * 194px
封面高度：150px
标题区高度：44px
```

## 12. 交付结论

这块卡片的自适应规则可以总结为：

```text
使用固定列宽 240px 的 CSS Grid；
通过 repeat(auto-fit, 240px) 自动计算每行展示数量；
通过 max-width: 1008px 限制最多 4 列；
卡片自身固定尺寸，不参与宽度自适应；
窄屏时由 grid 自动换行到 3 / 2 / 1 列。
```
