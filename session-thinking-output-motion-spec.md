# Dora 思考过程输出动效参数说明

本文档对应会话区「思考过程 / 步骤流」模块，也就是页面中展示“识别经营分析任务 / 读取业务数据与范围 / 校准指标口径”这一类过程性内容的卡片区域。

适用范围：

- `.session-thinking`
- `.session-thinking__card`
- `.session-thinking__body`
- `.session-thinking-step`
- `.session-thinking__wait`

代码来源：

- `/Users/yuki/Desktop/dora_新架构/src/components/SessionThread.jsx`
- `/Users/yuki/Desktop/dora_新架构/src/pages/QuestionPage.css`

## 1. 交付目标

研发按本文档实现后，需保证这块内容的输出过程具备以下体验：

1. 步骤按顺序逐个出现，任意时刻只允许 1 个步骤处于进行中。
2. 当前步骤标题会同步反映在卡片 header 状态文案中。
3. 步骤正文不是整段瞬时出现，而是带“逐段输出”节奏。
4. 读入文件、产出文件、代码块等附加内容要晚于正文出现，形成层次。
5. 全部完成后，卡片先停留，再自动收起成摘要态。

## 2. 组件结构

```text
session-thinking
├─ session-thinking__card
│  ├─ session-thinking__header
│  │  ├─ session-thinking__status
│  │  └─ session-thinking__toggle
│  └─ session-thinking__body
│     └─ session-thinking__steps
│        └─ session-thinking-step *
│           ├─ step head: icon + title + skill tag
│           └─ step body
│              ├─ description
│              ├─ refs / outputs
│              └─ code
├─ session-thinking__footnote
└─ session-thinking__wait
```

## 3. 状态机

### 3.1 全局状态

| 状态 | 触发条件 | UI 表现 |
| --- | --- | --- |
| `idle` | 尚未开始生成 | 不渲染步骤内容 |
| `running` | 正在生成 | 展示步骤流，header 跟随当前步骤切换 |
| `done` | 全部步骤完成 | header 显示完成摘要，等待自动收起 |
| `stopped` | 用户中止或生成结束但未完成 | header 显示“已停止生成” |

### 3.2 单步骤状态

| 状态 | 视觉定义 |
| --- | --- |
| `active` | 当前执行步骤，触发入场、正文淡入、图标旋转、竖线高亮 |
| `done` | 已完成步骤，展示灰底勾选图标，无持续动画 |

说明：

- 当前实现没有把“未开始步骤”预渲染出来，所以视觉上只有 `active` 和 `done` 两种已展示状态。
- 任意时刻只会 append 已完成步骤和当前进行中的 1 个步骤。

## 4. 播放时序

### 4.1 初始化时序

| 阶段 | 参数 | 说明 |
| --- | --- | --- |
| 初始 header 状态 | `正在工作...` 或 `正在接收文件...` | 是否有上传文件决定文案 |
| 文件接收等待 | `1800ms` | 有上传文件时，先等待再出现 footnote / wait |
| wait 区出现 | `1800ms` 后触发 | 同时显示“用户上传了一份文件，正在读取”和 wait 区 |

### 4.2 单步骤时序

以下时序以每个步骤为单位循环执行。

| 顺序 | 参数 | 说明 |
| --- | --- | --- |
| 激活步骤 | `t = 0` | 设置 `activeIndex`，header 文案切到当前步骤标题 |
| 激活后预留 | `120ms` | 给步骤入场动画一个起始空间 |
| 正文逐字输出 | 动态 | 按 chunk 和 delay 规则推进 `descriptionLength` |
| refs / outputs 延迟 | `180ms` | 正文输出完后再等 `180ms` |
| refs / outputs 出现后停顿 | `120ms` | reveal 后再继续后续内容 |
| code 容器出现前预留 | `90ms` | code 区挂载后再开始流式输出 |
| 代码逐字输出 | 动态 | 按 code 专属 chunk 和 delay 规则推进 `codeLength` |
| 步骤完成后停顿 | `220ms` | 当前步骤结束到下一步骤开始之间的间隔 |

### 4.3 全部完成后的时序

| 阶段 | 参数 | 说明 |
| --- | --- | --- |
| 完成摘要生成 | 立即 | 文案格式：`已完成 N 个动作，耗时 Xm Ys` |
| 自动收起等待 | `960ms` | 完成后先停留，再开始收起 |
| 收起状态切换定时器 | `260ms` | JS 侧 `is-collapsing -> is-collapsed` 的定时 |

注意：

- 当前 CSS 中 `max-height` 的收起过渡是 `340ms`，但 JS 定时器是 `260ms`。
- 如果研发要重写或复刻，建议统一成一个值，避免 DOM 状态切换早于视觉过渡结束。

## 5. 流式输出规则

### 5.1 正文 description 的 chunk 规则

| 文本类型 | chunk 大小 |
| --- | --- |
| 换行 / 标点 | `1` 字符 |
| 英文 / 数字 / 路径连续串 | 最多 `3` 字符 |
| 中文普通文本 | 最多 `3` 字符 |

### 5.2 正文 description 的 delay 规则

| 条件 | delay |
| --- | --- |
| 默认中段 | `96ms` |
| 开头前 12% | `156ms` |
| 结尾后 16% | `112ms` |
| 空格 | `54ms` |
| 标点 | `138ms` |
| 换行 | `182ms` |

### 5.3 code 的 chunk 规则

| 文本类型 | chunk 大小 |
| --- | --- |
| 换行 / 标点 | `1` 字符 |
| 英文 / 数字 / 路径连续串 | 最多 `5` 字符 |
| 中文普通文本 | 最多 `3` 字符 |

### 5.4 code 的 delay 规则

| 条件 | delay |
| --- | --- |
| 默认中段 | `38ms` |
| 开头前 15% | `64ms` |
| 结尾后 18% | `44ms` |
| 空格 | `26ms` |
| 标点 | `68ms` |
| 换行 | `92ms` |

实现约束：

- 每次 chunk 推进后立即更新可见长度。
- 在文本未结束前，下一次推进前等待对应 delay。
- code 区在流式输出时需要自动滚动到底部。

## 6. 动效参数表

### 6.1 卡片与 header

| 对象 | 属性 | 参数 |
| --- | --- | --- |
| `.session-thinking` | gap transition | `0.22s ease` |
| `.session-thinking__card` | border-color transition | `0.28s ease` |
| `.session-thinking__card` | transform transition | `0.24s cubic-bezier(0.22, 1, 0.36, 1)` |
| `.session-thinking__toggle` | hover/focus 反馈 | `0.15s ease` |
| `.session-thinking__status-shine` | 流光循环 | `4.6s linear infinite` |
| `.session-thinking__status-shine--secondary` | 第二层流光错峰 | `animation-delay: -2.3s` |

### 6.2 body 展开 / 收起

| 对象 | 属性 | 参数 |
| --- | --- | --- |
| `.session-thinking__body` | `max-height` | `0.34s cubic-bezier(0.22, 1, 0.36, 1)` |
| `.session-thinking__body` | `padding` | `0.24s ease` |
| `.session-thinking__body` | `opacity` | `0.2s ease` |
| 默认折叠态高度上限 | `max-height: 210px` | 超出后内部滚动 |
| 展开态高度上限 | `max-height: 1200px` | 展开后不裁切 |
| 收起隐藏偏移 | `translateY(-6px)` | 仅 collapsed 隐藏态保留 |

### 6.3 步骤入场

| 对象 | 属性 | 参数 |
| --- | --- | --- |
| `.session-thinking-step--active` | 入场动画 | `0.46s cubic-bezier(0.22, 1, 0.36, 1) both` |
| `session-thinking-step-in` 起点 | from | `opacity: 0; translateY(10px); scale(0.985)` |
| `session-thinking-step-in` 终点 | to | `opacity: 1; translateY(0)` |
| `.session-thinking-step--active .session-thinking-step__content` | 内容入场 | `0.24s cubic-bezier(0.22, 1, 0.36, 1) both` |
| `session-thinking-content-in` 起点 | from | `opacity: 0; translateY(6px); blur(5px)` |
| `session-thinking-content-in` 终点 | to | `opacity: 1; translateY(0); blur(0)` |

### 6.4 附加信息 reveal

| 对象 | 属性 | 参数 |
| --- | --- | --- |
| `.session-thinking-step__reveal` | reveal 动画 | `0.18s ease-out both` |
| `session-thinking-reveal` 起点 | from | `opacity: 0; translateY(8px)` |
| `session-thinking-reveal` 终点 | to | `opacity: 1; translateY(0)` |

适用内容：

- 读取文件 refs
- 产出文件 refs
- code 容器

### 6.5 进行中状态强调

| 对象 | 属性 | 参数 |
| --- | --- | --- |
| `.session-thinking-step__icon--active .session-thinking-step__icon-svg` | 旋转 | `1s linear infinite` |
| `.session-thinking-step__rail::after` | opacity 过渡 | `0.18s ease` |
| `.session-thinking-step__rail::after` | transform 过渡 | `0.24s cubic-bezier(0.22, 1, 0.36, 1)` |
| rail 高亮起点 | from | `opacity: 0; scaleY(0.75)` |
| rail 高亮终点 | to | `opacity: 1; scaleY(1)` |

### 6.6 等待区动效

| 对象 | 属性 | 参数 |
| --- | --- | --- |
| `.session-thinking__wait` | 入场 | `0.42s cubic-bezier(0.22, 1, 0.36, 1) both` |
| `session-thinking-wait-in` 起点 | from | `opacity: 0; translateY(4px)` |
| `session-thinking-wait-in` 终点 | to | `opacity: 1; translateY(0)` |
| `.four-point-star-loader__svg` | 旋转 | `2.1s linear infinite` |
| gradient stop 颜色轮换 | 循环 | `3.6s ease-in-out infinite` |
| wait 文案切换周期 | 文案轮换 | `5000ms` |

## 7. 尺寸与样式基线

| 对象 | 参数 |
| --- | --- |
| header 最小高度 | `40px` |
| toggle hit area | `24px x 24px` |
| step icon | `16px x 16px` |
| refs 文件图标 | `12px x 12px` |
| code 区最大高度 | `72px` |
| code 区内边距 | `4px 8px` |
| code 字号 | `12px` |
| code 行高 | `20px` |

## 8. 滚动与可视区规则

1. 非展开态生成过程中，步骤 body 需要自动滚动到底部。
2. 只有在非展开态且发生滚动时，顶部渐隐遮罩才显示。
3. 展开态下 `overflow: visible`，不再强制自动滚动。
4. 默认非展开态最大可视高度为 `210px`，超出部分内部滚动。

## 9. 降级规则

当系统命中 `prefers-reduced-motion: reduce` 时，至少需要关闭以下动画：

- header 状态流光
- step 入场动画
- step content 入场动画
- refs / code reveal 动画
- wait 区入场动画
- active icon 旋转
- wait star 旋转
- wait star 渐变 stop 颜色轮换
- rail 高亮 transition

保留策略：

- 文本仍然按内容顺序出现，但可以降级为“整段直接出现”。
- 光标类循环动画当前 CSS 已预留，但该模块现状未挂载 cursor DOM，可忽略不实现。

## 10. 研发实现验收

### 10.1 必须满足

1. 当前步骤切换时，header 文案与步骤标题同步。
2. 步骤正文、附加 refs、code 必须分层出现，不能整块同时闪现。
3. 单步骤完成后要保留 `220ms` 间隔再进入下一步。
4. 全部步骤完成后要保留 `960ms`，再触发自动收起。
5. 收起后卡片变成摘要态，仅保留 header 区域。

### 10.2 建议对齐

1. 收起流程的 JS 定时和 CSS transition 统一为同一时长。
2. 如果后续需要“打字光标”，再启用 `.session-thinking-step__cursor`，当前版本无需强制实现。
3. 如果重构为新的动效方案，优先保留当前节奏，不建议把逐字速度做得更快。

## 11. 源码定位

| 内容 | 位置 |
| --- | --- |
| 全局时序常量 | `/Users/yuki/Desktop/dora_新架构/src/components/SessionThread.jsx:17` |
| 文本流式输出规则 | `/Users/yuki/Desktop/dora_新架构/src/components/SessionThread.jsx:69` |
| step 渲染结构 | `/Users/yuki/Desktop/dora_新架构/src/components/SessionThread.jsx:854` |
| 流式状态推进 | `/Users/yuki/Desktop/dora_新架构/src/components/SessionThread.jsx:933` |
| 完成后自动收起 | `/Users/yuki/Desktop/dora_新架构/src/components/SessionThread.jsx:1176` |
| 主体容器与步骤样式 | `/Users/yuki/Desktop/dora_新架构/src/pages/QuestionPage.css:9193` |
| step 入场 / reveal / wait / reduce motion | `/Users/yuki/Desktop/dora_新架构/src/pages/QuestionPage.css:9454` |
