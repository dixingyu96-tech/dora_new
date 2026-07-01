# 专家团卡片自适应规则

适用对象：专家团页面中的 agent 卡片列表。

对应实现位置：

- `src/pages/QuestionPage.css`
- `src/pages/QuestionPage.jsx`

## 1. 父容器分栏规则

卡片宽度不在卡片自身写死，而是由外层 `.experts-grid` 通过 CSS Grid 自动分栏决定。

```css
.experts-grid {
  --expert-card-min-width: clamp(320px, 28vw, 380px);

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, var(--expert-card-min-width)), 1fr)
  );
  gap: 16px;
  width: 100%;
  align-content: start;
  justify-content: stretch;
}
```

核心规则：

- 单列最小宽度：`clamp(320px, 28vw, 380px)`
- 列间距：`16px`
- 容器宽度不足时自动减少列数
- 容器宽度足够时自动增加列数
- 每一列使用 `1fr` 平分剩余空间

## 2. 列数与卡片宽度计算

研发实现时可以按下面的公式理解：

```text
单列最小宽度 = clamp(320px, 28vw, 380px)
列间距 = 16px

可容纳列数 = floor((容器宽度 + 16) / (单列最小宽度 + 16))
实际卡片宽度 = (容器宽度 - 16 * (列数 - 1)) / 列数
```

当前页面实测示例：

```text
内容区宽度：约 1191px
列数：3 列
列间距：16px
单张卡片实际宽度：约 386px
```

注意：`386px` 是当前容器宽度下的计算结果，不是固定宽度。

## 3. 卡片自身布局规则

卡片自身只负责撑满所在 grid 列，并保证内部内容稳定排布。

```css
.expert-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  min-height: 164px;
  max-width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
```

核心规则：

- 卡片宽度由 grid 列宽决定
- 卡片高度至少 `164px`
- 卡片内部上下分布，内容区在上，标签和使用次数在下
- `max-width: 100%` 防止卡片超出所在列
- 建议显式保留 `box-sizing: border-box`

## 4. 头部区域规则

头部由头像、标题信息、收藏按钮组成。

```css
.expert-card__head {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.expert-card__avatar-wrap,
.expert-card__avatar {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
}

.expert-card__meta {
  flex: 1;
  min-width: 0;
}

.expert-card__favorite {
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
}
```

核心规则：

- 头像固定 `42px * 42px`
- 收藏按钮固定 `24px * 24px`
- 标题信息区占用剩余空间
- 标题信息区必须设置 `min-width: 0`，否则长标题无法正确省略

## 5. 文本截断规则

标题为单行省略。

```css
.expert-card__meta h3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

描述最多展示 2 行。

```css
.expert-card__desc {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

必须保留的防溢出规则：

```css
.expert-card__head,
.expert-card__content,
.expert-card__meta,
.expert-card__footer,
.expert-card__tags {
  min-width: 0;
}
```

## 6. 底部区域规则

底部由标签组和使用次数组成。

```css
.expert-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.expert-card__tags {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow: hidden;
}

.expert-card__tag {
  flex: 0 0 auto;
  height: 20px;
  padding: 0 4px;
  white-space: nowrap;
}

.expert-card__usage {
  flex: 0 0 auto;
  white-space: nowrap;
}
```

核心规则：

- 标签最多渲染 3 个
- 标签不换行
- 标签区域超出时隐藏
- 使用次数不换行
- 使用次数固定在右侧

## 7. Hover / Focus 交互规则

鼠标悬浮或键盘聚焦时，卡片轻微上浮，使用次数隐藏，右下角咨询按钮出现。

```css
.expert-card:hover,
.expert-card:focus-visible {
  z-index: 1;
  transform: translateY(-2px);
}

.expert-card:hover .expert-card__usage,
.expert-card:focus-visible .expert-card__usage,
.expert-card:focus-within .expert-card__usage {
  opacity: 0;
  transform: translateY(-2px);
}

.expert-card:hover .expert-card__consult,
.expert-card:focus-visible .expert-card__consult,
.expert-card:focus-within .expert-card__consult {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
```

咨询按钮采用绝对定位，不参与卡片正常文档流。

```css
.expert-card__consult {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 88px;
  height: 32px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(4px);
}
```

## 8. 研发复用结论

这张卡片的自适应核心是：

```text
父容器使用 auto-fit + minmax + clamp 自动决定列数；
卡片自身撑满 grid 列；
内部内容通过 min-width: 0、单行省略、两行截断和 overflow hidden 防止溢出。
```

推荐保持以下关键参数：

```text
最小列宽：320px
理想列宽：28vw
最大基准列宽：380px
列间距：16px
卡片内边距：16px
卡片最小高度：164px
头像尺寸：42px
收藏按钮尺寸：24px
标签高度：20px
咨询按钮：88px * 32px
```
