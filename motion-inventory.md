# 动效清单

基于当前工程代码的完整扫描整理，范围包含：

- CSS `animation` / `transition` / `@keyframes`
- JS 中显式驱动视觉节奏的 `setTimeout` / `setInterval` / `requestAnimationFrame`
- 仅统计“会引发视觉变化或交互节奏变化”的实现
- 不把纯静态渐变、纯布局、纯数据逻辑计入动效

当前工程里，动效主要集中在：

- `/Users/yuki/Desktop/dora_新架构/src/pages/QuestionPage.css`
- `/Users/yuki/Desktop/dora_新架构/src/pages/QuestionPage.jsx`
- `/Users/yuki/Desktop/dora_新架构/src/components/Orb.jsx`
- `/Users/yuki/Desktop/dora_新架构/src/components/SessionFilesToolbarRow.jsx`

## 1. 动效总览

### 1.1 关键帧动画

| 动效名 | 参数 | 用途 | 位置 |
| --- | --- | --- | --- |
| `nav-card-enter` | `0.3s cubic-bezier(0.22, 1.18, 0.3, 1)` | 左侧主导航激活时的卡片轻微弹入 | `src/pages/QuestionPage.css:273` |
| `nav-image-enter` | `0.3s cubic-bezier(0.22, 1.18, 0.3, 1)` | 左侧主导航激活图标/图片切换进入 | `src/pages/QuestionPage.css:287` |
| `nav-icon-exit` | `0.18s ease-out` | 左侧主导航旧图标退出 | `src/pages/QuestionPage.css:304` |
| `field-select-dropdown-in` | `0.16s cubic-bezier(0.16, 1, 0.3, 1)` | 各类下拉菜单 / popover 浮层弹出 | `src/pages/QuestionPage.css:1459` |
| `inner-sidebar-enter` | `0.32s cubic-bezier(0.23, 0.98, 0.35, 1)` | 二级侧边栏整体进入 | `src/pages/QuestionPage.css:687` |
| `inner-sidebar-content-enter` | `0.28s ease-out` | 二级侧边栏内部内容依次滑入 | `src/pages/QuestionPage.css:699` |
| `expert-card-enter` | `0.42s ease-out` | 专家团页 / 资料库页头部与主体整体淡入上移 | `src/pages/QuestionPage.css:1640` |
| `library-detail-content-enter` | `0.24s` 到 `0.28s ease-out`，按元素分段延迟 | 资料库详情页、专家详情页内部模块逐段淡入上移 | `src/pages/QuestionPage.css:2716` |
| `dora-stage-enter` | `0.38s cubic-bezier(0.23, 0.98, 0.35, 1)` | Dora 主舞台整体进入 | `src/pages/QuestionPage.css:3060` |
| `dora-inner-enter` | `0.24s` 到 `0.28s ease-out`，分段延迟 | Dora header / hero / sender / practices 逐段进入 | `src/pages/QuestionPage.css:3071` |
| `library-chat-entry-in` | `0.24s ease-out` | 资料库收起态右下角“进入会话”按钮弹入 | `src/pages/QuestionPage.css:3112` |
| `scheme3-grid-drift` | `24s linear infinite` | 方案三背景网格平移漂移 | `src/pages/QuestionPage.css:3271` |
| `scheme3-banner-float` | `14s ease-in-out infinite alternate` | 方案三 glow 光斑缓慢漂浮 | `src/pages/QuestionPage.css:3281` |
| `blink` | `1s step-end infinite` | 首页能力文案末尾光标闪烁 | `src/pages/QuestionPage.css:4866` |
| `sender-ring-spin` | `10s linear infinite` | sender 流光环绕旋转 | `src/pages/QuestionPage.css:4872` |
| `attach-menu-in` | `0.16s cubic-bezier(0.16, 1, 0.3, 1)` | 上传菜单 / attach 菜单 /若干 portal 菜单弹出 | `src/pages/QuestionPage.css:5745` |
| `spin` | `0.8s linear infinite` | 会话过程中的 loading 圆环 | `src/pages/QuestionPage.css:6177` |

### 1.2 主要 easing / 节奏模式

| easing / 节奏 | 出现场景 |
| --- | --- |
| `0.15s ease` | 大多数 hover/focus 背景色、透明度、颜色切换 |
| `0.2s ease` | 通用 icon button、sender、边框/阴影的轻量反馈 |
| `0.24s ~ 0.28s ease-out` | 分段内容进入 |
| `0.3s ease` | layout gap 等轻微结构变化 |
| `0.32s ease` | 资料库 chat 面板收起/展开 |
| `0.34 / 0.45 / 0.46s` + spring 型 `cubic-bezier(0.23, 0.98, 0.35, 1)` 或 `cubic-bezier(0.34, 1.56, 0.64, 1)` | 会话文件面板展开、按钮组弹开、stack spring 效果 |
| `linear infinite` | 背景漂移、环形旋转、loader |

## 2. 页面与组件动效明细

### 2.1 左侧主导航与用户菜单

| 区域 | 触发 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- | --- |
| `.sidebar` | 折叠/展开 | `width 0.25s ease`, `opacity 0.2s ease` | 左侧主栏宽度与透明度收起 | `src/pages/QuestionPage.css:15` |
| `.nav-item` | hover / active | `background 0.15s ease`, `transform 0.2s ease` | 主导航项基础反馈 | `src/pages/QuestionPage.css:43` |
| `.nav-item.active .nav-icon` | 激活切换 | `nav-icon-exit 0.18s ease-out` | 旧字体图标缩小淡出 | `src/pages/QuestionPage.css:256` |
| `.nav-item.active .nav-active-image` | 激活切换 | `nav-image-enter 0.3s cubic-bezier(0.22, 1.18, 0.3, 1)` | 激活态图片进入 | `src/pages/QuestionPage.css:262` |
| `.nav-item.active .nav-icon-wrap` | 激活切换 | `nav-card-enter 0.3s cubic-bezier(0.22, 1.18, 0.3, 1)` | 容器轻微弹入 | `src/pages/QuestionPage.css:268` |
| `.icon-btn` | hover / active | `background-color 0.2s ease`, `color 0.2s ease`, `transform 0.2s ease`; active `scale(0.96)` | 全局图标按钮反馈 | `src/pages/QuestionPage.css:339` |
| `.experts-nav-popover` | 打开 | `field-select-dropdown-in 0.16s cubic-bezier(0.16, 1, 0.3, 1)` | 专家团新消息浮层 | `src/pages/QuestionPage.css:121` |
| `.experts-nav-popover__hide` | hover | `color 0.15s ease` | “隐藏”按钮颜色过渡 | `src/pages/QuestionPage.css:156` |
| `.experts-nav-popover__item` | hover | `background-color 0.15s ease` | 浮层列表项 hover | `src/pages/QuestionPage.css:180` |
| `.user-menu-panel` | 打开 | `attach-menu-in 0.16s cubic-bezier(0.16, 1, 0.3, 1)` | 个人中心菜单 | `src/pages/QuestionPage.css:385` |
| `.user-menu-panel__item` | hover | `background-color 0.15s ease` | 个人中心菜单项 | `src/pages/QuestionPage.css:431` |

### 2.2 主区域结构切换与分栏

| 区域 | 触发 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- | --- |
| `.main-body` | 背景模式切换 | `background-color 0.42s cubic-bezier(0.33, 1, 0.68, 1)` | 主容器背景色缓动 | `src/pages/QuestionPage.css:526` |
| `.session-split-divider` | 会话文件面板展开前后 | `flex-basis 0.46s`, `width 0.46s`, `opacity 0.22s`; entered 后 opacity 为 `0.3s ... 0.05s delay` | 分隔条出现与占位变化 | `src/pages/QuestionPage.css:541` |
| `.session-split-divider::before` | hover / resizing | `opacity 0.15s ease` | 中央高亮线显隐 | `src/pages/QuestionPage.css:566` |
| `.main-body--session-split .session-workspace` | 分栏切换 | `flex 0.46s cubic-bezier(0.33, 1, 0.68, 1)` | 会话内容区宽度过渡 | `src/pages/QuestionPage.css:598` |
| `.session-files-panel` | 进入 | `width 0.46s`, `transform 0.4s`, `opacity 0.24s`, `box-shadow 0.4s` | 会话文件面板初始进入态 | `src/pages/QuestionPage.css:3424` |
| `.session-files-panel--entered` | 进入完成 | `width 0.46s`, `transform 0.48s`, `opacity 0.34s delay 0.05s`, `box-shadow 0.46s delay 0.05s` | 面板进入完成后的弹性缓动 | `src/pages/QuestionPage.css:3446` |
| `.session-files-panel.is-resizing` | 手动拖拽宽度 | `transition: none` | 拖拽时禁用动画 | `src/pages/QuestionPage.css:3457` |
| `.session-files-panel--modal` | modal 版本 | `transition: none` | 弹窗版直接显示，不做动画 | `src/pages/QuestionPage.css:4002` |

### 2.3 二级侧边栏、历史会话、agent 切换

| 区域 | 触发 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- | --- |
| `.inner-sidebar` | 开合 | `width 0.24s ease`, `opacity 0.18s ease`, `border-color 0.18s ease` | 二级侧边栏基础展开/收起 | `src/pages/QuestionPage.css:641` |
| `.inner-sidebar.open.inner-sidebar--enter` | 首次进入 | `inner-sidebar-enter 0.32s cubic-bezier(0.23, 0.98, 0.35, 1)` | 整栏轻微 blur/背景过渡 | `src/pages/QuestionPage.css:663` |
| `.inner-sidebar__head / __pin / .inner-group--history` | 内容进入 | `inner-sidebar-content-enter 0.28s ease-out`, 延迟 `0.05 / 0.1 / 0.16s` | 内部内容分段滑入 | `src/pages/QuestionPage.css:667` |
| `.inner-sidebar__agent-title` | hover / open | `background-color 0.16s ease` | agent 标题按钮背景反馈 | `src/pages/QuestionPage.css:749` |
| `.inner-sidebar__agent-caret` | open/close | `transform 0.18s ease` | 箭头旋转 180 度 | `src/pages/QuestionPage.css:790` |
| `.inner-history-item__rename-input` | focus | `border-color 0.2s ease`, `box-shadow 0.2s ease` | 会话重命名输入框 | `src/pages/QuestionPage.css:1133` |
| `.inner-history-item__menu-wrap` | hover / menu open | `opacity 0.15s ease` | 右侧更多操作按钮显隐 | `src/pages/QuestionPage.css:1188` |
| `.inner-history-item__more` | hover | `background-color 0.15s ease` | 更多按钮 hover | `src/pages/QuestionPage.css:1208` |
| `.inner-item` | hover / active | `background-color 0.15s ease` | 侧边栏普通列表项 | `src/pages/QuestionPage.css:942` |
| `.inner-history-item` | hover / active | `background-color 0.15s ease` | 历史会话行背景 | `src/pages/QuestionPage.css:1048` |

### 2.4 通用表单与 dropdown

| 区域 | 触发 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- | --- |
| `.experts-search / .library-search / .session-files-panel__search / .field-select__trigger` | hover / focus | `border-color 0.2s ease`, `box-shadow 0.2s ease` | 搜索框和 select trigger 的统一输入反馈 | `src/pages/QuestionPage.css:1338` |
| `.field-select-dropdown` | 打开 | `field-select-dropdown-in 0.16s cubic-bezier(0.16, 1, 0.3, 1)` | select 下拉面板 | `src/pages/QuestionPage.css:1439` |
| `.field-select-dropdown__item` | hover | `background-color 0.15s ease` | dropdown 项目 hover | `src/pages/QuestionPage.css:1470` |

### 2.5 专家团列表页与详情页

| 区域 | 触发 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- | --- |
| `.experts-page__header` | 首屏进入 | `expert-card-enter 0.42s ease-out 0.02s delay` | 专家团页头 | `src/pages/QuestionPage.css:1310` |
| `.experts-page__body` | 首屏进入 | `expert-card-enter 0.42s ease-out 0.06s delay` | 专家团主体 | `src/pages/QuestionPage.css:1325` |
| `.experts-create-btn` | hover / active | `filter 0.15s ease`, `transform 0.15s ease` | “去创建”按钮轻微按压 | `src/pages/QuestionPage.css:1582` |
| `.expert-card` | hover | `box-shadow 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)`, `transform 0.28s ...`; hover `translateY(-5px)` | 专家卡片浮起 | `src/pages/QuestionPage.css:1617` |
| `.expert-detail-page--enter .expert-detail-page__header` | 进入 | `library-detail-content-enter 0.26s ease-out 0.02s` | 专家详情页头 | `src/pages/QuestionPage.css:1751` |
| `.expert-detail-page--enter .expert-detail-page__panel` | 进入 | `0.28s ease-out 0.1s` | 专家详情主内容 | `src/pages/QuestionPage.css:1755` |
| `.expert-detail-page--enter .expert-detail-page__sender` | 进入 | `0.28s ease-out 0.18s` | 底部 sender 区 | `src/pages/QuestionPage.css:1759` |
| `.expert-detail-page__back` | hover / active | `background-color 0.2s`, `color 0.2s`, `transform 0.2s`; active `scale(0.96)` | 详情页左上返回/收侧边栏按钮 | `src/pages/QuestionPage.css:1772` |
| `.expert-tab` | hover / active | `color 0.2s ease` | 专家详情 tabs 文字状态切换 | `src/pages/QuestionPage.css:1914` |
| `.expert-prompt-item` | hover | `background-color 0.15s ease`, `border-radius 0.15s ease` | 推荐问题列表项 | `src/pages/QuestionPage.css:2036` |
| `.expert-prompt-item + .expert-prompt-item` | hover 邻接变化 | `border-top-color 0.15s ease` | 相邻分隔线消失 | `src/pages/QuestionPage.css:2054` |

### 2.6 资料库列表页与详情页

| 区域 | 触发 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- | --- |
| `.library-page__header` | 首屏进入 | `expert-card-enter 0.42s ease-out 0.02s` | 资料库页头 | `src/pages/QuestionPage.css:2101` |
| `.library-page__body` | 首屏进入 | `expert-card-enter 0.42s ease-out 0.06s` | 资料库主体 | `src/pages/QuestionPage.css:2116` |
| `.library-card` | hover | `box-shadow 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)`, `transform 0.28s ...`; hover `translateY(-5px)` | 资料库卡片浮起 | `src/pages/QuestionPage.css:2191` |
| `.library-detail-page` | chat 折叠/展开 | `gap 0.3s ease` | 主体与右侧 chat 间距变化 | `src/pages/QuestionPage.css:2299` |
| `.library-detail-page--enter` 各节点 | 进入 | `0.24s ~ 0.28s ease-out` + `0.02s ~ 0.2s delay` | 资料库详情页主内容、标题、markdown、chat header、sender 分段进入 | `src/pages/QuestionPage.css:2315` |
| `.library-detail-chat` | 折叠/展开 | `flex-basis 0.32s ease`, `width 0.32s ease`, `transform 0.32s ease`, `opacity 0.24s ease` | 右侧 chat 面板滑出/收起 | `src/pages/QuestionPage.css:2690` |
| `.library-detail-main__header .expert-detail-page__back` | hover / active | `background-color 0.2s`, `color 0.2s`, `box-shadow 0.2s`, `transform 0.2s` | 资料库详情左上返回按钮 | `src/pages/QuestionPage.css:2393` |
| `button.library-detail-main__source` | hover | `background-color 0.15s ease` | “查看来源对话” tag | `src/pages/QuestionPage.css:2490` |
| `.library-detail-chat__title-trigger` | hover/open | `background-color 0.15s ease` | chat 标题切换按钮 | `src/pages/QuestionPage.css:2748` |
| `.library-detail-chat__session-menu` | 打开 | `field-select-dropdown-in 0.16s cubic-bezier(0.16, 1, 0.3, 1)` | chat 会话切换菜单 | `src/pages/QuestionPage.css:2798` |
| `.library-detail-chat__session-item` | hover | `background-color 0.15s ease` | 会话列表项 | `src/pages/QuestionPage.css:2861` |
| `.library-chat-entry-btn` | 出现 | `library-chat-entry-in 0.24s ease-out` | 收起侧栏后的悬浮入口按钮 | `src/pages/QuestionPage.css:3082` |
| `.library-chat-entry-btn:hover` | hover | `translateY(-1px)` + shadow 增强 | 悬浮按钮抬起 | `src/pages/QuestionPage.css:3107` |

### 2.7 Dora 主舞台、首页文案与背景方案

| 区域 | 触发 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- | --- |
| `.dora-stage--container, .dora-stage--content` | 进入 | `dora-stage-enter 0.38s cubic-bezier(0.23, 0.98, 0.35, 1)` | Dora 整体容器进入 | `src/pages/QuestionPage.css:3002` |
| `.dora-stage__header` | 分段进入 | `dora-inner-enter 0.24s ease-out 0.03s` | header | `src/pages/QuestionPage.css:3038` |
| `.dora-stage__hero-inner, .dora-stage__session` | 分段进入 | `0.26s ease-out 0.08s` | hero 或会话主体 | `src/pages/QuestionPage.css:3042` |
| `.dora-stage__sender` | 分段进入 | `0.26s ease-out 0.14s` | sender | `src/pages/QuestionPage.css:3047` |
| `.dora-stage__sender-tip` | 分段进入 | `0.26s ease-out 0.18s` | sender 下方说明文案 | `src/pages/QuestionPage.css:3051` |
| `.dora-stage__practices, .dora-stage__practices-browser` | 分段进入 | `0.28s ease-out 0.2s` | 最佳实践模块 | `src/pages/QuestionPage.css:3055` |
| `.scheme3-banner::before` | 自动循环 | `scheme3-grid-drift 24s linear infinite` | 背景网格缓慢漂移 | `src/pages/QuestionPage.css:3146` |
| `.scheme3-banner__glow` | 自动循环 | `scheme3-banner-float 14s ease-in-out infinite alternate` | 背景 glow 浮动 | `src/pages/QuestionPage.css:3158` |
| `.scheme-heatmap-cell` | focus 变化 | `background-color 0.28s linear`, `border-color 0.28s linear` | 热力格焦点过渡 | `src/pages/QuestionPage.css:3221` |
| `.dora-visual-switch__btn` | 状态切换 | `background-color 0.15s ease`, `color 0.15s ease` | 方案切换胶囊按钮 | `src/pages/QuestionPage.css:3336` |
| `.main-header__session-source` | hover | `background 0.15s ease`, `color 0.15s ease` | 标题后的“资料来源” tag | `src/pages/QuestionPage.css:3374` |
| `.capability-badge` | hover / active | `background-color 0.15s ease`, `transform 0.15s ease`; active `scale(0.99)` | 首页滚动打字文案里的能力 badge | `src/pages/QuestionPage.css:4835` |
| `.cursor` | 自动循环 | `blink 1s step-end infinite` | 打字机光标闪烁 | `src/pages/QuestionPage.css:4861` |

### 2.8 会话文件面板与资料引用

| 区域 | 触发 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- | --- |
| `.session-files-panel__filter` | hover / active | `border-color 0.15s`, `background-color 0.15s`, `color 0.15s` | 面板筛选 pill | `src/pages/QuestionPage.css:4132` |
| `.session-files-panel__card` | hover | `border-color 0.15s ease` | 产出列表卡片边框显现 | `src/pages/QuestionPage.css:4176` |
| `.session-files-panel__actions` | hover | `opacity 0.15s ease` | 卡片操作区淡入 | `src/pages/QuestionPage.css:4232` |
| `.session-files-panel__source-card` | hover | `border-color 0.15s ease` | 来源卡片 hover | `src/pages/QuestionPage.css:4378` |
| `.session-files-panel__source-text` | hover | `padding-right 0.15s ease` | 为右侧 action 留空间 | `src/pages/QuestionPage.css:4405` |
| `.session-files-panel__existing-item` | hover | `border-color 0.15s ease`, `background-color 0.15s ease` | 已有数据条目 hover | `src/pages/QuestionPage.css:4605` |
| `.session-files-panel__existing-item-actions` | hover | `opacity 0.15s ease` | 已有数据 action 淡入 | `src/pages/QuestionPage.css:4642` |

### 2.9 Sender、附件卡片、引用标签、按钮组

| 区域 | 触发 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- | --- |
| `.sender` | focus / hover | `box-shadow 0.2s ease`, `transform 0.2s ease`, `background-color 0.2s ease` | 输入容器基础反馈 | `src/pages/QuestionPage.css:4920` |
| `.sender-inner` | hover / focus | `border-color 0.2s ease` | 输入内框边框反馈 | `src/pages/QuestionPage.css:4955` |
| `.sender-attachment-card` | hover | `background-color 0.15s ease` | 附件卡外层 | `src/pages/QuestionPage.css:4985` |
| `.sender-attachment-card__inner` | hover / uploading | `background-color 0.15s ease` | 附件卡内层 | `src/pages/QuestionPage.css:5003` |
| `.sender-attachment-card__progress` | 上传中 | `width 0.08s linear` | 上传进度条平滑推进 | `src/pages/QuestionPage.css:5029` |
| `.sender-attachment-card__remove` | hover 显示 | `opacity 0.15s ease`, `background-color 0.15s ease` | 删除附件按钮显隐 | `src/pages/QuestionPage.css:5133` |
| `.dora-sender--ring .sender-inner::before` | 自动循环 | `sender-ring-spin 10s linear infinite` | 外层高亮细环 | `src/pages/QuestionPage.css:5191` |
| `.dora-sender--ring .sender-inner::after` | 自动循环 | `sender-ring-spin 10s linear infinite` | 外层大 blur 光环 | `src/pages/QuestionPage.css:5221` |
| `.sender-ref-tag:hover .sender-ref-tag__label` | hover | 无 transition，仅即时 underline | 引用文件 hover 下划线 | `src/pages/QuestionPage.css:5499` |
| `.attach-btn-wrap` | 整组展开 | `left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)` | 按钮组外层 spring 弹开 | `src/pages/QuestionPage.css:5555` |
| `.attach-btn` | 整组展开 | `left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)` | 按钮 hit-box 位置移动 | `src/pages/QuestionPage.css:5616` |
| `.attach-btn__visual` | 单按钮 hover 放大 | `transform 0.34s cubic-bezier(0.34, 1.56, 0.64, 1)`, `opacity 0.2s ease`, `background-color 0.2s ease`, `border-color 0.2s ease`, `color 0.2s ease` | 视觉圆按钮从 `32px` 等效放大到 `36px`（`scale 1.125`），上抬 `-3px` | `src/pages/QuestionPage.css:5633` |
| `.attach-btn--mode:is(:hover, :focus-visible)` | hover | `filter: brightness(1.05)`，无 transition 单独定义 | 连接器图片按钮略提亮 | `src/pages/QuestionPage.css:5702` |
| `.attach-menu` | 打开 | `attach-menu-in 0.16s cubic-bezier(0.16, 1, 0.3, 1)` | “+” 上传菜单 | `src/pages/QuestionPage.css:5726` |
| `.attach-menu__item` | hover | `background-color 0.15s ease` | 菜单项反馈 | `src/pages/QuestionPage.css:5756` |
| `.icon-tip / .attach-tip` | hover 出现 | `opacity 0.15s ease`, `transform 0.15s ease`, `visibility 0s linear 0.15s` | 纯 icon tooltip 淡入位移 | `src/pages/QuestionPage.css:5831` |
| `:hover/:focus-visible` 下 tooltip | 出现 | `opacity 0.15s ease`, `transform 0.15s ease` | tooltip 从 `translateY(2px)` 回到原位 | `src/pages/QuestionPage.css:5901` |
| `.send-btn` | hover / active | `background-color 0.2s ease`, `color 0.2s ease`, `transform 0.2s ease`; active `scale(0.98)` | 发送按钮 | `src/pages/QuestionPage.css:5942` |

### 2.10 最佳实践区

| 区域 | 触发 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- | --- |
| `.practice-browser-card` | hover | `box-shadow 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)`, `transform 0.28s ...`; hover `translateY(-5px)` | 实践浏览页卡片浮起 | `src/pages/QuestionPage.css:6252` |
| `.practices-toggle` | hover | `color 0.15s ease` | “探索最佳实践”入口颜色反馈 | `src/pages/QuestionPage.css:6298` |
| `.chevron` | 切换开合 | `transform 0.25s ease` | 展开箭头旋转 | `src/pages/QuestionPage.css:6317` |
| `.practice-card` | hover | `border-color 0.15s ease`, `box-shadow 0.15s ease`, `transform 0.25s ease` | 底部叠卡 hover 浮起 | `src/pages/QuestionPage.css:6356` |

## 3. JS 驱动的节奏与动画辅助

### 3.1 上传进度与附件节奏

| 逻辑 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- |
| `UPLOAD_PROGRESS_INTERVAL_MS` | `80ms` | 上传进度刷新频率 | `src/pages/QuestionPage.jsx:672` |
| `getUploadDuration(sizeBytes)` | `min 2000ms`, `max 7500ms`, 基准公式 `900 + kb * 55` | 根据文件大小计算总上传时长 | `src/pages/QuestionPage.jsx:793` |
| `startComposerUpload` | `setInterval(tick, 80)` | 分段推进上传进度，进度条 CSS 再做 `0.08s linear` 平滑 | `src/pages/QuestionPage.jsx:2581` |
| `handleLocalFilesSelected` / `retryComposerUpload` | `setTimeout(..., 0)` | 下一帧启动上传，避免与状态写入抢时序 | `src/pages/QuestionPage.jsx:2665`, `src/pages/QuestionPage.jsx:2681` |

### 3.2 输入框与引用文件交互

| 逻辑 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- |
| 引用文件增删后同步编辑器 | `requestAnimationFrame` | 确保 DOM 已更新再 focus / 设置选区 / resize | `src/pages/QuestionPage.jsx:2916`, `2931`, `2955`, `2971` |
| 输入框 blur 后关闭 mention panel | `setTimeout(..., 0)` | 给点击 mention panel 留一个事件窗口 | `src/pages/QuestionPage.jsx:3056` |
| 搜索折叠后自动 focus 输入框 | `requestAnimationFrame` | toolbar 搜索展开后聚焦输入框 | `src/components/SessionFilesToolbarRow.jsx:59` |

### 3.3 首页动态文案 / 打字机效果

| 逻辑 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- |
| 正向打字 | `55ms/字` | 逐字显示能力文案 | `src/pages/QuestionPage.jsx:4729` |
| 停留 | `2200ms` | 一条能力文案打完后的停留时间 | `src/pages/QuestionPage.jsx:4735` |
| 反向删除 | `28ms/字` | 删除节奏比打字更快 | `src/pages/QuestionPage.jsx:4739` |
| 切换下一条前空档 | `400ms` | 删除完成后停顿再切下一条 | `src/pages/QuestionPage.jsx:4744` |
| 光标 | `1s step-end infinite` | 视觉闪烁由 CSS 承担 | `src/pages/QuestionPage.css:4861` |

### 3.4 最佳实践模块开合节奏

| 逻辑 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- |
| 打开阈值 | `80px` | 上滑累计超过阈值打开 practices page | `src/pages/QuestionPage.jsx:4783` |
| 触屏阈值 | `48px` | touch 版上滑阈值 | `src/pages/QuestionPage.jsx:4784` |
| 手势累计重置 | `300ms` | 滚轮/触屏累计在 300ms 内连续计算 | `src/pages/QuestionPage.jsx:4803`, `4828` |
| 打开后滚动定位 | `requestAnimationFrame` | 切换页面后再回写 scrollTop 0 | `src/pages/QuestionPage.jsx:4763` |

### 3.5 会话文件分栏进入与菜单定位

| 逻辑 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- |
| 分栏退出卸载 | `setTimeout(..., 480)` | 等待 CSS 过渡结束后再卸载 split panel | `src/pages/QuestionPage.jsx:5048` |
| 分栏进入 | 双 `requestAnimationFrame` | 先挂载再置 `entered`，确保 CSS transition 生效 | `src/pages/QuestionPage.jsx:5054` |
| 重命名输入框聚焦 | `requestAnimationFrame` | 确保输入框渲染后 `focus/select` | `src/pages/QuestionPage.jsx:5126` |
| 语言菜单初次定位 | `requestAnimationFrame` | 菜单打开后下一帧纠正 portal 定位 | `src/pages/QuestionPage.jsx:5176` |

### 3.6 专家团新消息 popover

| 逻辑 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- |
| nav leave 延迟关闭 | `120ms` | 鼠标从 nav 移向 popover 时防抖，避免闪烁 | `src/pages/QuestionPage.jsx:5391` |

### 3.7 热力背景与 WebGL Orb

| 逻辑 | 参数 | 说明 | 位置 |
| --- | --- | --- | --- |
| 热力背景自动移动 | `requestAnimationFrame` | 使用 `HEATMAP_AUTO_MOTION` 连续更新焦点位置 | `src/pages/QuestionPage.jsx:5329` |
| `HEATMAP_AUTO_MOTION.wR` | `(2π) / 12000` | 行方向正弦周期约 `12000ms` | `src/pages/QuestionPage.jsx:875` |
| `HEATMAP_AUTO_MOTION.wC` | `(2π) / 16000` | 列方向正弦周期约 `16000ms` | `src/pages/QuestionPage.jsx:876` |
| `HEATMAP_AUTO_MOTION.phaseOffset` | `π / 3` | 默认相位偏移 | `src/pages/QuestionPage.jsx:877` |
| Orb 渲染循环 | `requestAnimationFrame` | 每帧更新时间、hover 值、旋转值并重绘 WebGL | `src/components/Orb.jsx:295` |
| Orb hover 缓动 | `current += (target - current) * 0.1` | hover 进入/退出采用指数逼近，不是固定时长 | `src/components/Orb.jsx:303` |
| Orb rotate speed | `0.3` | hover 状态下按 `dt * 0.3` 累加旋转 | `src/components/Orb.jsx:271`, `src/components/Orb.jsx:306` |

## 4. 可降低动效 / 关闭动效的实现

项目已经做了 `prefers-reduced-motion: reduce` 适配：

- 关闭 `.expert-card`、`.library-card` 的 `animation`
- 关闭 `library-detail-page`、`dora-stage`、`session-files-panel` 等核心区域的 `transition` / `animation`
- 关闭 `.scheme3-banner::before`、`.scheme3-banner__glow` 的背景漂移动画
- 关闭 `.dora-sender--ring` 的旋转流光

位置：

- `/Users/yuki/Desktop/dora_新架构/src/pages/QuestionPage.css:6503`

另外，JS 侧也有一处配合：

- 热力背景在 `prefers-reduced-motion: reduce` 时直接停止自动焦点动画
- 位置：`/Users/yuki/Desktop/dora_新架构/src/pages/QuestionPage.jsx:5316`

## 5. 目前没有额外动效实现的文件

以下文件没有发现独立动效定义：

- `/Users/yuki/Desktop/dora_新架构/src/components/Orb.css`
- `/Users/yuki/Desktop/dora_新架构/src/components/IconButton.jsx`  
  说明：只负责 tooltip portal 定位与显隐状态控制，真正的动画参数在 `QuestionPage.css`
- `/Users/yuki/Desktop/dora_新架构/src/styles/global.css`
- `/Users/yuki/Desktop/dora_新架构/src/styles/tokens.css`
- `/Users/yuki/Desktop/dora_新架构/src/styles/generated/*`

## 6. 结论

当前工程的动效体系大致可以分成 6 类：

1. **基础 hover/focus 反馈**
   - 以 `0.15s ease`、`0.2s ease` 为主
2. **页面/模块分段进入**
   - 以 `0.24s ~ 0.42s ease-out` 为主，常带 `0.02s ~ 0.2s` 延迟
3. **面板/分栏结构动画**
   - 以 `0.32s ~ 0.48s` 的宽度/位移/透明度过渡为主
4. **装饰性循环动画**
   - 网格漂移 `24s linear infinite`
   - glow 漂浮 `14s ease-in-out infinite alternate`
   - sender ring `10s linear infinite`
   - loader `0.8s linear infinite`
5. **弹性 spring 风格按钮组**
   - attach 区域大量使用 `cubic-bezier(0.34, 1.56, 0.64, 1)`
6. **JS 驱动的连续帧动效**
   - WebGL Orb
   - 热力背景自动游走
   - 打字机文案
   - 上传进度节奏

如果后面要继续做规范化，最值得先收敛的是这三组参数：

- `0.15s ease`：轻量 hover/focus
- `0.24s ~ 0.28s ease-out`：内容进入
- `0.45s / spring cubic-bezier(0.34, 1.56, 0.64, 1)`：按钮组弹性展开
