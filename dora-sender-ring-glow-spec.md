# Dora 首页输入框流光描边效果 — 研发实现规范

> **文档用途**：描述 Dora 首页 Hero 区 Sender 输入框外圈的「流光 / 渐变旋转描边」效果，供前端研发直接对照实现。
> **代码来源**：`src/pages/QuestionPage.jsx`、`src/pages/QuestionPage.css`
> **当前默认视觉方案**：`scheme7`（`doraVisualScheme = 'scheme7'`）
> **Figma 对应**：首页 Sender 输入框外圈渐变流光（与 scheme4 / scheme5 / scheme7 / scheme9 共用同一套 ring 组件）

---

## 1. 效果概述

首页输入框在未聚焦时，外圈有一圈 **缓慢旋转的彩色渐变描边**，视觉上类似「流光环绕」：

- **内层（细环）**：清晰的 2px 渐变边框，带轻微 drop-shadow
- **外层（光晕）**：更宽、更模糊的扩散光，增强氛围感
- **旋转方式**：10 秒匀速转一圈（`linear infinite`）
- **聚焦时**：两层流光 **立即隐藏**（`opacity: 0`），仅保留常规边框与阴影，避免与 focus 态冲突

> 注意：此效果 **不是** 输入框内部的 placeholder 打字机，也 **不是** 背景 Banner 的 glow 漂浮；本文仅覆盖 Sender 外圈流光。

---

## 2. 启用条件

### 2.1 页面与模式

| 条件 | 是否启用 |
|------|----------|
| Dora 首页（非会话模式 `!isQuestionMode`） | ✅ |
| 会话模式输入框 | ❌（不加 `dora-sender--ring`） |
| 资料库 / 专家团等非首页 | ❌ |

### 2.2 视觉方案（Visual Scheme）

仅在以下 scheme 下为 `.sender` 追加类名 `dora-sender--ring`：

- `scheme4`
- `scheme5`
- `scheme7`（**当前默认**）
- `scheme9`（启用增强版脉冲动画，见 §8）

### 2.3 JSX 挂载方式

```jsx
<div
  className={`sender ${inputFocused ? 'focused' : ''} ${
    !isQuestionMode &&
    (doraVisualScheme === 'scheme4' ||
      doraVisualScheme === 'scheme5' ||
      doraVisualScheme === 'scheme7' ||
      doraVisualScheme === 'scheme9')
      ? 'dora-sender--ring'
      : ''
  }`}
>
  <div className="sender-inner">
    {/* editor + toolbar */}
  </div>
</div>
```

---

## 3. DOM 结构

```
.sender.dora-sender--ring          ← 外层容器，overflow: visible
└── .sender-inner                  ← 白底输入框本体
    ├── ::before                   ← 流光层 1：细渐变描边环
    ├── ::after                    ← 流光层 2：外扩模糊光晕
    ├── .sender-editor             ← 可编辑区
    └── .sender-toolbar            ← 底部工具栏
```

**要点**

- 流光层挂在 **`.sender-inner` 的伪元素**上，而非 `.sender` 本身
- 伪元素 `pointer-events: none`，不影响点击
- `.dora-sender--ring` 设置 `isolation: isolate`，避免 blur 污染页面其它层

---

## 4. 实现原理

### 4.1 核心技术栈

| 技术 | 作用 |
|------|------|
| `conic-gradient` + `@property --sender-ring-angle` | 圆锥渐变随角度变量旋转，形成「流光」 |
| `mask` / `-webkit-mask` + `mask-composite: exclude` | 只保留 padding 区域的环形描边，中间镂空 |
| `filter: blur()` | 外层光晕扩散 |
| `@keyframes sender-ring-spin` | 驱动 `--sender-ring-angle` 从 0° → 360° |

### 4.2 旋转角度变量（必须注册）

Safari / Chrome 需通过 `@property` 声明自定义属性，动画才能平滑插值角度：

```css
@property --sender-ring-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
```

### 4.3 环形描边 Mask 模板

两层伪元素共用同一 mask 思路：**外层 box 减去 content-box = 环形区域**

```css
mask:
  linear-gradient(#fff 0 0) content-box,
  linear-gradient(#fff 0 0);
mask-composite: exclude;

-webkit-mask:
  linear-gradient(#fff 0 0) content-box,
  linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
```

---

## 5. 视觉参数（scheme7 默认）

### 5.1 输入框本体（`.dora-sender--ring .sender-inner`）

| 属性 | 值 |
|------|-----|
| `border` | `1px solid var(--fd-color-border-secondary)` |
| `border-radius` | `16px` |
| `background` | `linear-gradient(180deg, rgba(255,255,255,0.998) 0%, rgba(255,255,255,0.985) 100%)` |
| `box-shadow` | `0 1px 0 rgba(255,255,255,0.98) inset` |
| `min-height` | `116px` |
| `padding` | `8px` |

### 5.2 流光层 1 — 细环（`.sender-inner::before`）

| 属性 | 值 |
|------|-----|
| `inset` | `-2px` |
| `padding` | `2px` → **描边宽度 2px** |
| `border-radius` | `18px`（比本体大 2px，保持同心圆角） |
| `opacity` | `0.92` |
| `z-index` | `1` |
| `filter` | `blur(0.25px) drop-shadow(0 0 4px rgba(140, 93, 247, 0.12))` |
| `animation` | `sender-ring-spin 10s linear infinite` |

**渐变色标（conic-gradient，from var(--sender-ring-angle)）**

| 角度 | 颜色 | 说明 |
|------|------|------|
| 0° – 300° | `rgba(0, 176, 212, 0)` | 透明段（流光「空窗」） |
| 314° | `rgba(0, 176, 212, 0.08)` | 青色渐入 |
| 328° | `rgba(0, 176, 212, 0.68)` | 青色高光 |
| 344° | `rgba(140, 93, 247, 0.9)` | 紫色主高光 |
| 356° | `rgba(37, 98, 255, 0.82)` | 蓝色收尾 |
| 360° | `rgba(0, 176, 212, 0)` | 回到透明 |

> 渐变有效弧长约 **60°**（300°→360°），其余 300° 为透明，旋转时形成单一「光斑」绕圈效果。

### 5.3 流光层 2 — 光晕（`.sender-inner::after`）

| 属性 | 值 |
|------|-----|
| `inset` | `-4px` |
| `padding` | `4px` → **光晕环宽 4px** |
| `border-radius` | `20px` |
| `opacity` | `0.3` |
| `filter` | `blur(8px)` |
| `animation` | `sender-ring-spin 10s linear infinite`（与 ::before 同步） |

**渐变色标**

| 角度 | 颜色 |
|------|------|
| 0° – 300° | `rgba(0, 176, 212, 0)` |
| 318° | `rgba(0, 176, 212, 0.18)` |
| 338° | `rgba(140, 93, 247, 0.24)` |
| 356° | `rgba(37, 98, 255, 0.20)` |
| 360° | `rgba(0, 176, 212, 0)` |

### 5.4 品牌色汇总

| 色名 | RGBA | Hex 参考 |
|------|------|----------|
| 青色（Cyan） | `rgba(0, 176, 212, …)` | `#00B0D4` |
| 紫色（Violet） | `rgba(140, 93, 247, …)` | `#8C5DF7` |
| 蓝色（Blue） | `rgba(37, 98, 255, …)` | `#2562FF` |

---

## 6. 动画规范

### 6.1 主旋转动画（scheme4 / 5 / 7）

```css
@keyframes sender-ring-spin {
  0% {
    --sender-ring-angle: 0deg;
  }
  100% {
    --sender-ring-angle: 360deg;
  }
}
```

| 参数 | 值 |
|------|-----|
| 名称 | `sender-ring-spin` |
| 时长 | `10s` |
| 缓动 | `linear` |
| 循环 | `infinite` |
| 驱动属性 | `--sender-ring-angle` |

### 6.2 交互态

| 状态 | 行为 |
|------|------|
| 默认（未聚焦） | 两层伪元素可见，持续旋转 |
| `:focus-within` | `::before`、`::after` 均 `opacity: 0`（无 transition，即时隐藏） |
| `.sender:focus-within` | 外层 `.sender` 增加 `box-shadow: var(--fd-shadow-subtle)` |
| hover | 仅 `.sender-inner` 边框色变为 `var(--fd-color-border)`，流光不受影响 |

---

## 7. 完整 CSS 参考（scheme7 可直接复用）

```css
@property --sender-ring-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes sender-ring-spin {
  0% {
    --sender-ring-angle: 0deg;
  }
  100% {
    --sender-ring-angle: 360deg;
  }
}

.dora-sender--ring {
  isolation: isolate;
  overflow: visible;
}

.dora-sender--ring .sender-inner {
  position: relative;
  z-index: 1;
  border: 1px solid var(--fd-color-border-secondary);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.998) 0%, rgba(255, 255, 255, 0.985) 100%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.98) inset;
}

.dora-sender--ring .sender-inner::before {
  content: '';
  position: absolute;
  inset: -2px;
  padding: 2px;
  border-radius: 18px;
  pointer-events: none;
  z-index: 1;
  background: conic-gradient(
    from var(--sender-ring-angle),
    rgba(0, 176, 212, 0) 0deg 300deg,
    rgba(0, 176, 212, 0.08) 314deg,
    rgba(0, 176, 212, 0.68) 328deg,
    rgba(140, 93, 247, 0.9) 344deg,
    rgba(37, 98, 255, 0.82) 356deg,
    rgba(0, 176, 212, 0) 360deg
  );
  filter: blur(0.25px) drop-shadow(0 0 4px rgba(140, 93, 247, 0.12));
  opacity: 0.92;
  animation: sender-ring-spin 10s linear infinite;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}

.dora-sender--ring .sender-inner::after {
  content: '';
  position: absolute;
  inset: -4px;
  padding: 4px;
  border-radius: 20px;
  pointer-events: none;
  z-index: 1;
  background: conic-gradient(
    from var(--sender-ring-angle),
    rgba(0, 176, 212, 0) 0deg 300deg,
    rgba(0, 176, 212, 0.18) 318deg,
    rgba(140, 93, 247, 0.24) 338deg,
    rgba(37, 98, 255, 0.2) 356deg,
    rgba(0, 176, 212, 0) 360deg
  );
  filter: blur(8px);
  opacity: 0.3;
  animation: sender-ring-spin 10s linear infinite;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}

.dora-sender--ring:focus-within .sender-inner::before,
.dora-sender--ring:focus-within .sender-inner::after {
  opacity: 0;
}
```

---

## 8. scheme9 增强版（可选）

`scheme9` 在 scheme7 基础上叠加 **间歇旋转 + 脉冲显隐**，周期仍为 10s：

### 8.1 序列旋转

前 54% 时间停在 0°，后 42% 快速转到 360°：

```css
@keyframes sender-ring-sequence-spin {
  0%,
  54% {
    --sender-ring-angle: 0deg;
  }
  96%,
  100% {
    --sender-ring-angle: 360deg;
  }
}
```

### 8.2 脉冲显隐

```css
@keyframes sender-ring-pulse-cycle {
  0%,
  52% {
    opacity: 0;
  }
  62% {
    opacity: calc(var(--sender-ring-active-opacity, 1) * 0.72);
  }
  68% {
    opacity: var(--sender-ring-active-opacity, 1);
  }
  90% {
    opacity: var(--sender-ring-active-opacity, 1);
  }
  96% {
    opacity: calc(var(--sender-ring-active-opacity, 1) * 0.42);
  }
  100% {
    opacity: 0;
  }
}
```

### 8.3 scheme9 层参数

| 层 | `--sender-ring-active-opacity` | animation |
|----|----------------------------------|-----------|
| `::before` | `0.96` | `sender-ring-sequence-spin 10s linear infinite, sender-ring-pulse-cycle 10s cubic-bezier(0.4, 0, 0.2, 1) infinite` |
| `::after` | `0.34` | 同上 |

> scheme9 还会禁用 `.dora-sender--ring::before/::after`（空规则），实际效果仍由 `.sender-inner` 伪元素承担。

---

## 9. 布局与尺寸 Token

| Token | 值 | 用途 |
|-------|-----|------|
| `--sender-max-width` | `880px` | 输入框最大宽度（`src/styles/tokens.css`） |
| `.sender` `border-radius` | `16px` | 外层圆角 |
| `.sender-inner` `border-radius` | `16px` | 内层圆角 |
| 细环 `border-radius` | `18px` | 本体 + inset 2px |
| 光晕 `border-radius` | `20px` | 本体 + inset 4px |

**圆角同心规则**：伪元素 `border-radius = 本体 16px + abs(inset)`，保证四角对齐。

---

## 10. 无障碍（Reduced Motion）

当用户开启「减少动态效果」时，应关闭旋转动画：

```css
@media (prefers-reduced-motion: reduce) {
  .dora-sender--ring .sender-inner::before,
  .dora-sender--ring .sender-inner::after {
    animation: none;
  }
}
```

> 建议同时保留静态边框（不旋转），或直接隐藏伪元素，按产品偏好二选一。当前代码在 reduce 模式下仅停止 animation，伪元素仍以 0° 静止显示。

---

## 11. 浏览器兼容与注意事项

| 项目 | 说明 |
|------|------|
| `@property` | Chrome 85+、Safari 15.4+、Firefox 128+；不支持时渐变无法动画旋转，需降级为静态描边或 JS 驱动 |
| `-webkit-mask-composite: xor` | Safari 必需；标准写法用 `mask-composite: exclude` |
| `conic-gradient` | 现代浏览器均支持；IE 不支持 |
| 性能 | 仅 2 个伪元素 + CSS 动画，GPU 友好；避免在输入框上叠加 canvas / 大范围 box-shadow 动画 |
| 层级 | 附件卡片、toolbar 等需 `position: relative; z-index: 1`，避免被伪元素遮挡交互 |

---

## 12. 验收清单

- [ ] 首页非会话模式下，输入框外圈可见青→紫→蓝渐变光斑
- [ ] 光斑 10s 匀速绕输入框一圈，循环无顿挫
- [ ] 外圈有轻微模糊光晕，内圈描边更清晰
- [ ] 点击输入框聚焦后，流光立即消失，仅保留常规边框
- [ ] 失焦后流光恢复旋转
- [ ] 输入框 `max-width: 880px`，圆角 16px，与 Hero 布局对齐
- [ ] `prefers-reduced-motion: reduce` 下无旋转动画
- [ ] Safari / Chrome / Firefox 三端 mask 环形正确，无实心色块

---

## 13. 与相关动效的边界

| 效果 | 是否本文范围 |
|------|-------------|
| Sender 外圈流光描边 | ✅ 本文 |
| Placeholder 打字机（`.sender-editor.is-empty::before`） | ❌ 见 `hero-sender-motion-spec.md` §6.3 |
| 选中 Tag 后 pill 入场 | ❌ 见 `hero-sender-motion-spec.md` §6.2 |
| scheme3 背景 Banner glow 漂浮 | ❌ 见 `motion-inventory.md` |
| 会话模式输入框 | ❌ 不使用 `dora-sender--ring` |

---

## 14. 文件索引

| 文件 | 内容 |
|------|------|
| `src/pages/QuestionPage.css` | `@property`、`@keyframes`、`.dora-sender--ring` 全部样式（约 L6834–7534） |
| `src/pages/QuestionPage.jsx` | `dora-sender--ring` 类名挂载逻辑（约 L6292–6301） |
| `src/styles/tokens.css` | `--sender-max-width: 880px` |
| `hero-sender-motion-spec.md` | Hero 区其它动效（Tag、推荐问题、打字机等） |

---

*文档版本：与当前代码库同步。调整渐变色标、旋转周期或 focus 行为时，请同步更新本文档。*
