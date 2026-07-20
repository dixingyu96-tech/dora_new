# 首页 Hero 区动效参数规范

> 适用范围：`QuestionPage` 首页（非会话模式）的 **Sender 输入框**、**Tag 组**、**推荐问题列表** 及其联动动效。
> 代码来源：`src/pages/QuestionPage.jsx`、`src/pages/QuestionPage.css`
> 视觉方案：当前默认 `scheme7`（`doraVisualScheme = 'scheme7'`）

---

## 1. 结构关系

```
hero（欢迎语 + orb）
  └── sender-wrap（dora-stage__sender）
        └── sender-combo
              ├── sender（dora-sender--ring）
              │     ├── sender-inner
              │     │     ├── sender-editor（placeholder 打字机）
              │     │     └── sender-toolbar
              │     │           └── sender-skill-tag（选中 tag 后显示）
              │     └── 渐变描边环（::before / ::after）
              └── hero-skill-slot（dora-stage__skill-tags，固定高度）
                    ├── panel--tags  → hero-skill-tags
                    └── panel--prompts → sender-skill-prompts
```

**固定高度槽位（防布局跳动）**

| 变量 | 公式 | 当前计算值 |
|------|------|-----------|
| `--hero-skill-prompt-row-height` | `padding-y × 2 + line-height` | `8px × 2 + 22px = 38px` |
| `--hero-skill-slot-height` | `3 行 × row-height + 2px` | `116px` |
| 槽位上边距 | `margin-top` | `20px` |

---

## 2. 全局动效 Token（CSS 变量）

定义位置：`.hero-skill-slot`

```css
--hero-skill-slot-ease: cubic-bezier(0.22, 1, 0.36, 1);
--hero-skill-item-duration: 0.46s;
--hero-skill-item-stagger: 0.055s;   /* 55ms */
--hero-skill-item-delay: 0.12s;      /* 120ms */
--hero-skill-tag-count: 10;
```

**缓动曲线说明**：轻弹、偏 Manus 风格，`cubic-bezier(0.22, 1, 0.36, 1)` 在 tag 组、推荐列表、sender pill 中统一复用。

---

## 3. 页面首次进入（Hero 整体入场）

触发：容器带 `.dora-stage--content`

| 区块 | 类名 | 动画 | 时长 | 延迟 | 缓动 |
|------|------|------|------|------|------|
| 欢迎语 | `.dora-stage__hero-inner` | `dora-inner-enter` | 0.26s | 0.08s | `ease-out` |
| Sender | `.dora-stage__sender` | `dora-inner-enter` | 0.26s | 0.14s | `ease-out` |
| Tag 槽位 | `.dora-stage__skill-tags` | `dora-inner-enter` | 0.26s | 0.18s | `ease-out` |

**`dora-inner-enter` 关键帧**

```css
from { opacity: 0; transform: translateY(10px); }
to   { opacity: 1; transform: translateY(0); }
```

> 首次进入与 tag 组/推荐列表的 stagger 入场是两层动画：先整体区块淡入，再在交互时触发条目 stagger（见下文）。

---

## 4. Tag 组动效

### 4.1 触发条件（JS 状态）

| 状态 | 说明 |
|------|------|
| `skillSlotAnimate` | 首次选中 tag 后置 `true`，之后保持；容器追加 `.hero-skill-slot--animate` |
| `hero-skill-slot--tags` | 未选中 tag，展示 tag 组 |
| `hero-skill-slot--prompts` | 已选中 tag，展示推荐问题 |
| `tagsAnimKey` | 取消选中时自增，强制 remount scroller 以重播 tag 入场 |

**取消选中时序**

```
用户取消 tag
  → 立即切回 hero-skill-slot--tags（推荐 panel 仍保留 500ms）
  → tagsAnimKey++（重播 tag stagger）
  → 500ms 后 slotPromptTagId = null（卸载推荐列表 DOM）
```

### 4.2 Tag 条目入场（stagger）

触发：`.hero-skill-slot--animate.hero-skill-slot--tags`

| 属性 | 值 |
|------|-----|
| 动画名 | `hero-skill-item-enter` |
| 时长 | `0.46s` |
| 缓动 | `cubic-bezier(0.22, 1, 0.36, 1)` |
| 填充 | `forwards` |
| 初始态 | `opacity: 0; transform: translate3d(0, 6px, 0)` |
| 结束态 | `opacity: 1; transform: translate3d(0, 0, 0)` |
| 延迟 | `0.12s + tagIndex × 0.055s` |

**各 tag 延迟速查（index 0–9）**

| index | delay | 结束约 |
|-------|-------|--------|
| 0 | 120ms | 580ms |
| 5 | 395ms | 855ms |
| 9 | 615ms | 1075ms |

### 4.3 左右滚动箭头入场

与 tag 共用 `hero-skill-item-enter`，延迟在**全部 tag 之后**：

```
delay = 0.12s + 10 × 0.055s = 0.67s（670ms）
```

### 4.4 横向滚动

| 参数 | 值 |
|------|-----|
| 滚动方式 | `scroll-behavior: smooth` |
| 单次步进 | `max(160px, scroller.clientWidth × 0.55)` |
| 左右箭头 | 根据 `scrollLeft` 动态显示/隐藏 |
| 蒙版宽度 | `72px` |
| 蒙版渐变 | 白底 `var(--fd-color-bg-container)`，64% 处实色 |
| 蒙版显隐 | `opacity 0.2s ease`（仅蒙版，非分割线） |
| 可滚动内边距 | 左/右各 `32px`（有箭头时） |

### 4.5 Tag Hover（非动效入场，交互过渡）

| 属性 | 默认 | Hover |
|------|------|-------|
| 背景 | `--fd-color-bg-container` | `--fd-color-bg-container-grey` |
| 文本 | T2 `--fd-color-text-secondary` | T1 `--fd-color-text` |
| 过渡 | `background / border / color 0.15s ease` | — |

选中态 `.is-active` 不受 hover 覆盖（蓝色 pill 主题）。

---

## 5. 推荐问题列表动效

### 5.1 切换方式

- Tag 组 ↔ 推荐列表：**即时 visibility 切换**（无 crossfade / blur）
- 靠固定高度槽位 `.hero-skill-slot` 避免 sender / 欢迎语跳动
- 推荐内容在取消选中后 **保留 500ms** 再卸载（配合切回 tag 组）

### 5.2 推荐条目入场（stagger）

触发：`.hero-skill-slot--animate.hero-skill-slot--prompts`

与 tag 共用 `hero-skill-item-enter`（参数同 §4.2），延迟：

```
delay = 0.12s + promptIndex × 0.055s
```

3 条推荐时：

| promptIndex | delay | 结束约 |
|-------------|-------|--------|
| 0 | 120ms | 580ms |
| 1 | 175ms | 635ms |
| 2 | 230ms | 690ms |

### 5.3 分割线入场

| 属性 | 值 |
|------|-----|
| 动画名 | `hero-skill-item-divider-enter` |
| 时长 | `0.36s` |
| 缓动 | `cubic-bezier(0.22, 1, 0.36, 1)` |
| 初始/结束 | `opacity: 0 → 1`（无位移） |
| 延迟 | `0.16s + promptIndex × 0.055s` |

> 分割线 DOM 在每条推荐之前（首条无分割线）。`promptIndex` 与对应推荐按钮一致。

### 5.4 推荐条目 Hover

| 属性 | 默认 | Hover |
|------|------|-------|
| 背景 | `transparent` | `--fd-color-bg-container-grey-secondary` |
| 文本 | T2 | T1 |
| 过渡 | `background / color 0.15s ease` | — |
| 内边距 | `8px 8px`（`--fd-padding-layout-xs`） | — |

### 5.5 相邻分割线隐藏（Hover）

悬浮某条推荐时，**紧贴其上下**的分割线立即隐藏（**无过渡**）：

```css
.sender-skill-prompts .sender-skill-prompt:hover + .sender-skill-prompt__divider,
.sender-skill-prompts .sender-skill-prompt__divider:has(+ .sender-skill-prompt:hover) {
  animation: none;   /* 解除入场 animation forwards 对 opacity 的锁定 */
  opacity: 0;
  background: transparent;
}
```

---

## 6. Sender 输入框动效

### 6.1 渐变描边环（scheme7：`dora-sender--ring`）

| 层 | 动画 | 时长 | 缓动 | 循环 |
|----|------|------|------|------|
| `::before` 细环 | `sender-ring-spin` | 10s | `linear` | `infinite` |
| `::after` 光晕 | `sender-ring-spin` | 10s | `linear` | `infinite` |

**`sender-ring-spin`**

```css
0%   { --sender-ring-angle: 0deg; }
100% { --sender-ring-angle: 360deg; }
```

| 状态 | 行为 |
|------|------|
| `:focus-within` | `::before` / `::after` 的 `opacity: 0`（环隐藏） |
| 默认 | `::before opacity: 0.92`，`::after opacity: 0.3` |

> scheme9 另有 `sender-ring-sequence-spin` + `sender-ring-pulse-cycle`（10s 周期脉冲），scheme7 仅用匀速旋转。

### 6.2 选中 Tag 后的 Sender Pill

触发：选中 tag 后在 `.sender-toolbar` 内渲染 `.sender-skill-tag`

| 属性 | 值 |
|------|-----|
| 动画名 | `sender-skill-tag-enter` |
| 时长 | `0.44s` |
| 缓动 | `cubic-bezier(0.22, 1, 0.36, 1)` |
| 填充 | `both` |
| 初始态 | `opacity: 0; transform: translate3d(0, 4px, 0) scale(0.98)` |
| 结束态 | `opacity: 1; transform: translate3d(0, 0, 0) scale(1)` |

**Pill Hover（非动画，即时切换）**

- 默认显示 tag 图标
- Hover 时图标 `visibility: hidden`，显示关闭按钮（取消 tag）

### 6.3 Placeholder 打字机（Watermark）

触发：`senderPlaceholder` 变化（选中/取消 tag 切换对应文案）

| 参数 | 值 | 说明 |
|------|-----|------|
| `TYPE_MS` | `38` | 每字符间隔（ms） |
| `START_MS` | `90` | 开始前等待（ms） |
| 删除 | 无 | 切换文案时直接清空再重新打字 |
| 标点停顿 | 无 | — |
| 透明度渐变 | 无 | 通过 `data-placeholder` 逐字追加 |
| 渲染 | `.sender-editor.is-empty::before { content: attr(data-placeholder) }` | — |

**Reduced Motion**

```js
if (prefers-reduced-motion: reduce) {
  displayedSenderPlaceholder = senderPlaceholder // 直接全文
}
```

---

## 7. 无障碍：Reduced Motion 汇总

`@media (prefers-reduced-motion: reduce)` 下：

| 模块 | 行为 |
|------|------|
| Hero 整体入场 | 关闭 animation，直接 `opacity: 1` |
| Tag / 推荐 stagger | 关闭 animation，直接 `opacity: 1` |
| Sender pill | 关闭 animation |
| 分割线 | 关闭 animation |
| Placeholder 打字机 | JS 直接显示完整文案 |
| Sender 描边环 | 关闭 animation |

---

## 8. 研发复用清单

### 8.1 新增/修改 tag 数量

```css
.hero-skill-slot {
  --hero-skill-tag-count: 10; /* 与 HERO_SKILL_TAGS.length 保持一致 */
}
```

箭头入场延迟 = `item-delay + tag-count × stagger`

### 8.2 新增/修改推荐条数

同步调整：

```css
--hero-skill-prompt-rows: 3;
--hero-skill-prompt-row-height: calc(var(--fd-padding-layout-xs) * 2 + var(--fd-line-height, 22px));
```

### 8.3 统一 stagger 条目动画模板

```css
.item {
  opacity: 0;
  transform: translate3d(0, 6px, 0);
  animation: hero-skill-item-enter var(--hero-skill-item-duration) var(--hero-skill-slot-ease) forwards;
  animation-delay: calc(var(--hero-skill-item-delay) + var(--item-index, 0) * var(--hero-skill-item-stagger));
}

@keyframes hero-skill-item-enter {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
```

### 8.4 分割线入场模板

```css
.divider {
  opacity: 0;
  animation: hero-skill-item-divider-enter 0.36s var(--hero-skill-slot-ease) forwards;
  animation-delay: calc(0.16s + var(--item-index, 0) * var(--hero-skill-item-stagger));
}

@keyframes hero-skill-item-divider-enter {
  to { opacity: 1; }
}
```

### 8.5 打字机模板

```js
const TYPE_MS = 38
const START_MS = 90

// reduced motion → 直接 setFullText(text)
// 否则：清空 → delay START_MS → 每 TYPE_MS 追加 1 字符
```

---

## 9. 关键类名对照

| 类名 | 作用 |
|------|------|
| `.hero-skill-slot` | 固定高度双 panel 容器 |
| `.hero-skill-slot--tags` | 显示 tag 组 panel |
| `.hero-skill-slot--prompts` | 显示推荐列表 panel |
| `.hero-skill-slot--animate` | 启用 stagger 入场 |
| `.hero-skill-tags.has-overflow` | 内容超出，启用蒙版层 |
| `.hero-skill-tags.can-scroll-prev/next` | 显示左/右蒙版与箭头 |
| `.sender-skill-prompt` | 单条推荐问题 |
| `.sender-skill-tag` | Sender 内已选 tag pill |
| `.dora-sender--ring` | Sender 渐变描边环 |

---

## 10. 相关 Design Token

| Token | 值 | 用途 |
|-------|-----|------|
| `--fd-padding-layout-xs` | 8px | 推荐问题 padding、槽位行高 |
| `--fd-padding-layout-2xs` | 4px | Tag padding（纵向） |
| `--fd-padding-layout-sm` | 12px | Tag padding（横向） |
| `--fd-line-height` | 22px | 文本行高 |
| `--fd-gap-2xl` | 16px | Tag 间距、sender-wrap 上边距 |
| `--fd-color-text-secondary` | T2 | 默认文本 |
| `--fd-color-text` | T1 | Hover / 强调文本 |
| `--fd-color-icon-normal` | icon normal | Tag 图标 |
| `--fd-color-bg-container` | #FFF | 白底 / 蒙版实色 |
| `--fd-color-bg-container-grey` | — | Tag hover 背景 |
| `--fd-color-bg-container-grey-secondary` | — | 推荐 hover 背景 |

---

*文档版本与代码 commit 同步维护。若调整 `--hero-skill-item-*` 或打字机参数，请同步更新本文档。*
