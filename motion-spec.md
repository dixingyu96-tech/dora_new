# 动效规范表

基于当前工程的动效实现整理，目标不是重复罗列所有代码细节，而是把现有实现抽象成一套后续可以继续沿用和收敛的规范。

配套清单见：

- [motion-inventory.md](/Users/yuki/Desktop/dora_新架构/motion-inventory.md)

---

## 1. 规范目标

当前工程里的动效主要承担 4 类职责：

1. 基础反馈  
   用于 hover、focus、active、选中切换，让交互更明确。
2. 进入动画  
   用于页面、模块、浮层、分栏进入时的层次建立。
3. 弹性动画  
   用于按钮组、面板展开、强调性组件，让变化更有张力。
4. 循环动画  
   用于装饰性背景、加载、流光、光标闪烁等持续运动效果。

这 4 类里，建议优先收敛前 3 类；第 4 类保持少量、克制、可关闭。

---

## 2. 总体原则

### 2.1 统一优先于花样

同类交互尽量复用同一组时长和 easing，不要每个组件各用一套。

### 2.2 反馈要轻，结构要稳

- hover / focus 应该是“轻反馈”，尽量控制在 `0.15s ~ 0.2s`
- 面板 / 页面 / 模块切换属于“结构变化”，可以放宽到 `0.24s ~ 0.48s`

### 2.3 弹性动效只给重点交互

spring 风格适合：

- 按钮组展开
- 选中态图标切换
- 小范围强调性入口

不建议大面积用于普通列表、普通卡片、普通输入框。

### 2.4 循环动画必须可降级

所有持续运动的动画都应该满足：

- 不影响可读性
- 不抢主要内容
- `prefers-reduced-motion: reduce` 下可关闭

---

## 3. 动效分层

| 层级 | 类型 | 典型对象 | 推荐强度 |
| --- | --- | --- | --- |
| L1 | 基础反馈 | 按钮、列表项、输入框、tag | 轻 |
| L2 | 内容进入 | 页面区块、panel、section、popover | 中 |
| L3 | 结构切换 | 分栏、侧边栏、面板展开/收起 | 中偏强 |
| L4 | 强调性弹性 | 悬浮按钮组、激活图标切换 | 强，但范围小 |
| L5 | 装饰循环 | grid、glow、ring、cursor、loader | 很轻，持续 |

建议：单个页面同时出现的“强动效”不要超过 1 到 2 处。

---

## 4. 规范参数总表

### 4.1 基础反馈

| 规范项 | 推荐值 | 适用场景 | 当前工程对应 |
| --- | --- | --- | --- |
| `motion-feedback-fast` | `0.15s ease` | hover 背景、颜色、透明度、边框色 | 大多数列表、tag、tooltip、筛选项 |
| `motion-feedback-base` | `0.2s ease` | 输入框、icon button、发送按钮、返回按钮 | sender、icon-btn、send-btn |
| `motion-feedback-press-scale` | `scale(0.96)` ~ `scale(0.99)` | active 按压反馈 | icon button、send button、badge |

规范建议：

- 普通 hover 统一优先使用 `0.15s ease`
- 需要带一点“手感”的按钮、输入框统一优先使用 `0.2s ease`
- active 缩放保持克制，不建议低于 `scale(0.96)`

### 4.2 进入动画

| 规范项 | 推荐值 | 适用场景 | 当前工程对应 |
| --- | --- | --- | --- |
| `motion-enter-pop` | `0.16s cubic-bezier(0.16, 1, 0.3, 1)` | dropdown、menu、popover | `attach-menu-in`、`field-select-dropdown-in` |
| `motion-enter-content-sm` | `0.24s ease-out` | 小块内容、局部卡片、悬浮入口 | `library-chat-entry-in` |
| `motion-enter-content-md` | `0.26s ease-out` | 一般模块进入 | `dora-inner-enter`、详情页子模块 |
| `motion-enter-content-lg` | `0.28s ease-out` | 大块内容进入、尾段内容进入 | inner content / detail content |
| `motion-enter-stage` | `0.32s ~ 0.42s ease-out` 或 spring 型 easing | 整页、整栏、舞台级进入 | `inner-sidebar-enter`、`dora-stage-enter`、`expert-card-enter` |

延迟规范建议：

- 同一批分段进入元素，延迟步进建议控制在 `0.04s ~ 0.08s`
- 一组分段动画总时长建议不要超过 `0.2s`

当前工程常见分段：

- `0.02s`
- `0.06s`
- `0.08s`
- `0.1s`
- `0.12s`
- `0.14s`
- `0.18s`
- `0.2s`

建议后续优先收敛到：

- `0.04s`
- `0.08s`
- `0.12s`
- `0.16s`

### 4.3 结构切换

| 规范项 | 推荐值 | 适用场景 | 当前工程对应 |
| --- | --- | --- | --- |
| `motion-layout-gap` | `0.3s ease` | gap、局部间距变化 | library detail gap |
| `motion-panel-base` | `0.32s ease` | chat panel、普通抽屉、次级面板 | `library-detail-chat` |
| `motion-panel-strong` | `0.46s cubic-bezier(0.33, 1, 0.68, 1)` | 分栏、宽度变化明显的 panel | session split / files panel |
| `motion-panel-entered` | `0.46s ~ 0.48s cubic-bezier(0.23, 0.98, 0.35, 1)` | 进入完成后的“落稳”阶段 | `session-files-panel--entered` |

规范建议：

- 结构变化如果涉及宽度或分栏，不建议低于 `0.32s`
- 如果组件在拖拽中持续更新，拖拽态应临时关闭 transition
- 面板 mount/unmount 应与 CSS 时长保持一致，避免提前卸载或滞后

### 4.4 弹性动画

| 规范项 | 推荐值 | 适用场景 | 当前工程对应 |
| --- | --- | --- | --- |
| `motion-spring-soft` | `0.3s cubic-bezier(0.22, 1.18, 0.3, 1)` | 导航激活、卡片感切换 | `nav-card-enter`、`nav-image-enter` |
| `motion-spring-medium` | `0.34s cubic-bezier(0.34, 1.56, 0.64, 1)` | 单按钮 hover 放大 | `attach-btn__visual` |
| `motion-spring-strong` | `0.45s cubic-bezier(0.34, 1.56, 0.64, 1)` | 按钮组整体弹开 | `attach-btn-wrap`、`attach-btn` |
| `motion-ease-out-compact` | `0.18s ease-out` | 小图标退出 | `nav-icon-exit` |

规范建议：

- spring 动效只给小范围重点元素
- 同一个 spring 组里，位置移动和缩放最好用同一家 easing，避免“散”
- 放大锚点如果是底边或左下角，transform origin 必须统一，不要每个按钮各自漂

### 4.5 循环动画

| 规范项 | 推荐值 | 适用场景 | 当前工程对应 |
| --- | --- | --- | --- |
| `motion-loop-loader` | `0.8s linear infinite` | loading spinner | `spin` |
| `motion-loop-cursor` | `1s step-end infinite` | 输入光标 / 打字机光标 | `blink` |
| `motion-loop-ring` | `10s linear infinite` | sender ring、弱存在感旋转 | `sender-ring-spin` |
| `motion-loop-float` | `14s ease-in-out infinite alternate` | glow、轻漂浮背景 | `scheme3-banner-float` |
| `motion-loop-drift` | `24s linear infinite` | 背景网格平移 | `scheme3-grid-drift` |

规范建议：

- 循环动画优先用长周期，避免烦躁
- 装饰性动效默认不承担状态表达职责
- 如果装饰动效已经比较强，页面其它位置就不要再叠加第二套强循环

---

## 5. 分类规范

## 5.1 基础反馈规范

### 推荐标准

- 背景色 / 文字色 / 边框色：`0.15s ease`
- 输入框 / 重要按钮 / 发送按钮：`0.2s ease`
- hover 位移：尽量不超过 `-1px ~ -3px`
- active scale：`0.96 ~ 0.99`

### 适用组件

- 左侧导航项
- 二级侧边栏列表项
- 历史会话行
- tag / filter pill
- 普通 icon button
- dropdown item
- sender 附件卡
- 推荐问题列表

### 当前工程里建议视为规范基线的值

- `0.15s ease`
- `0.2s ease`

这两组已经覆盖了当前工程大部分基础反馈，可以直接作为默认规范。

---

## 5.2 进入动画规范

### 推荐标准

- menu / dropdown / tooltip：`0.16s cubic-bezier(0.16, 1, 0.3, 1)`
- 小内容块：`0.24s ease-out`
- 中等内容块：`0.26s ease-out`
- 大内容块或尾段：`0.28s ease-out`
- 整页 / 整栏：`0.32s ~ 0.42s`

### 推荐动效语言

- opacity + translateY / translateX 的轻组合
- 少量 scale 可以用于 popover，不建议用于整页主内容

### 延迟规则

- 同批内容分段进入时，延迟步长尽量固定
- 建议一个页面最多 3 到 5 段，不要把每个小元素都做独立延迟

### 当前工程建议收敛结果

把进入动画优先统一成三档：

1. `0.16s`  
   浮层、菜单、工具型弹出
2. `0.24s ~ 0.28s`  
   主内容、分段模块进入
3. `0.32s ~ 0.42s`  
   整页、整栏、舞台级进入

---

## 5.3 弹性动画规范

### 推荐标准

- 小范围弹入：`0.3s cubic-bezier(0.22, 1.18, 0.3, 1)`
- hover 放大：`0.34s cubic-bezier(0.34, 1.56, 0.64, 1)`
- 组级展开：`0.45s cubic-bezier(0.34, 1.56, 0.64, 1)`

### 适用范围

- attach 按钮组
- 激活态导航 icon / image 切换
- 少量强调性快捷入口

### 不建议使用的地方

- 普通输入框
- 普通列表 hover
- 大面积页面容器
- 高频出现的小文本按钮

### 当前工程里的推荐保留项

- attach 按钮组的 spring 手感是比较明确的一套语言，可以保留
- 导航激活态 `0.3s` 的轻弹感也可以保留

---

## 5.4 循环动画规范

### 推荐标准

- loader：短周期、高辨识
- cursor：中周期、离散闪烁
- ring / glow / drift：长周期、弱存在感

### 使用边界

- 背景装饰循环动画同屏不建议超过 2 套
- 装饰动画不能压过正文
- sender、hero、背景如果同时都有循环动画，至少应弱化其中一项

### 当前工程建议保留的循环

- `spin 0.8s linear infinite`
- `blink 1s step-end infinite`
- `sender-ring-spin 10s linear infinite`
- `scheme3-banner-float 14s ease-in-out infinite alternate`
- `scheme3-grid-drift 24s linear infinite`

---

## 6. JS 驱动动效规范

CSS 之外，当前工程还有几类由 JS 驱动节奏的动画，建议也纳入规范。

### 6.1 上传进度

| 规范项 | 当前值 | 规范建议 |
| --- | --- | --- |
| 上传刷新周期 | `80ms` | 可以作为统一进度刷新节奏 |
| 上传总时长 | `2000ms ~ 7500ms` | 保持“感知上稳定”，避免过短或过长 |
| 进度条视觉平滑 | `width 0.08s linear` | 与 `80ms` tick 保持一致，是合理的 |

建议：

- JS tick 和 CSS transition 时长保持一致或接近
- 这类“伪进度”要稳定，不要一会儿跳、一会儿停

### 6.2 打字机提示文案

| 规范项 | 当前值 | 规范建议 |
| --- | --- | --- |
| 打字速度 | `55ms/字` | 保留 |
| 停留时间 | `2200ms` | 稍长，但作为首页演示可以接受 |
| 删除速度 | `28ms/字` | 比输入快，合理 |
| 轮换间隙 | `400ms` | 保留 |

建议：

- 首页展示型文案适合偏慢一点
- 如果未来用于业务页面，建议再缩短停留时间

### 6.3 手势与分栏节奏

| 规范项 | 当前值 | 规范建议 |
| --- | --- | --- |
| practices 上滑打开阈值 | `80px` | 可以作为桌面默认 |
| touch 阈值 | `48px` | 可以作为移动端默认 |
| 手势累计重置 | `300ms` | 合理 |
| 分栏退出卸载 | `480ms` | 应继续与 CSS 同步维护 |

建议：

- 所有 JS 控制的 mount/unmount 等待时间，都应写成可对齐 CSS 的常量
- 不建议在多个地方手写不同的 magic number

### 6.4 连续帧动画

| 规范项 | 当前值 | 规范建议 |
| --- | --- | --- |
| Orb hover 缓动 | `current += (target - current) * 0.1` | 保留，手感自然 |
| Orb rotate speed | `0.3` | 保留 |
| 热力背景周期 | `12000ms / 16000ms` | 保持慢速、低打扰 |

建议：

- 连续帧动画尽量只用于少数“视觉主角”
- 一旦进入 `reduce motion`，应优先停掉这类持续帧更新

---

## 7. 建议收敛成的标准动效 Token

如果后面要继续规范化，建议先抽成下面这组语义 token。

```css
--motion-feedback-fast: 0.15s ease;
--motion-feedback-base: 0.2s ease;
--motion-enter-pop: 0.16s cubic-bezier(0.16, 1, 0.3, 1);
--motion-enter-content-sm: 0.24s ease-out;
--motion-enter-content-md: 0.26s ease-out;
--motion-enter-content-lg: 0.28s ease-out;
--motion-enter-stage: 0.32s cubic-bezier(0.23, 0.98, 0.35, 1);
--motion-panel-strong: 0.46s cubic-bezier(0.33, 1, 0.68, 1);
--motion-panel-settle: 0.48s cubic-bezier(0.23, 0.98, 0.35, 1);
--motion-spring-soft: 0.3s cubic-bezier(0.22, 1.18, 0.3, 1);
--motion-spring-medium: 0.34s cubic-bezier(0.34, 1.56, 0.64, 1);
--motion-spring-strong: 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
--motion-loop-loader: 0.8s linear infinite;
--motion-loop-cursor: 1s step-end infinite;
--motion-loop-ring: 10s linear infinite;
--motion-loop-float: 14s ease-in-out infinite alternate;
--motion-loop-drift: 24s linear infinite;
```

---

## 8. 工程映射建议

### 第一优先级：直接保留为规范基线

- `0.15s ease`
- `0.2s ease`
- `0.16s cubic-bezier(0.16, 1, 0.3, 1)`
- `0.24s ~ 0.28s ease-out`
- `0.45s cubic-bezier(0.34, 1.56, 0.64, 1)`

### 第二优先级：后续可逐步统一

- 进入动画延迟步长
- 面板切换的 `0.32s / 0.46s / 0.48s`
- 卡片 hover 抬升值（例如 `-5px` 是否统一）

### 第三优先级：保留例外

- WebGL Orb
- 热力背景自动游走
- 打字机文案
- loader / cursor / ring 这类循环动画

这些属于展示型或连续型效果，不适合硬套成所有组件的通用规范，但应保留单独规则。

---

## 9. 不建议继续扩散的做法

- 给普通列表项增加 spring 效果
- 给大量模块都做独立分段延迟
- 在已经有背景循环动画的页面，再叠加强 sender 流光
- 用 JS 定时器去模拟本可由 CSS 完成的简单 hover / enter
- 不统一时长与 easing，持续新增新的 magic number

---

## 10. 最终建议

如果把当前工程的动效体系压缩成一句话，可以定义为：

> 以 `0.15s / 0.2s` 作为基础反馈，以 `0.24s ~ 0.28s ease-out` 作为内容进入，以 `0.45s spring` 作为少量强调性交互，以长周期循环动画作为弱装饰。

后续如果继续规范化，最值得先做的三件事是：

1. 抽出动效 token
2. 统一进入动画的延迟步长
3. 把分栏 / 面板 / attach 按钮组的时长常量集中管理

