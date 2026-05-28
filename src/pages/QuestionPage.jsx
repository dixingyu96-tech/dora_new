import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import activeDoraImage from '../assets/images/dora_选中.png'
import activeExpertsImage from '../assets/images/专家团_选中.png'
import activeLibraryImage from '../assets/images/资料库_选中.png'
import agentDefaultAvatarImage from '../assets/images/Agent默认头像.png'
import doraTitleImage from '../assets/images/dora标题.png'
import doraImage from '../assets/images/Dora.png'
import avatarImage from '../assets/images/avatar.png'
import robotImage from '../assets/images/robot.png'
import libraryHtmlImage from '../assets/images/lib_html.png'
import libraryMdImage from '../assets/images/lib_md.png'
import libraryPptImage from '../assets/images/lib_ppt.png'
import libraryOwnerPrimaryImage from '../assets/images/lib_owner_primary.png'
import libraryOwnerSecondaryImage from '../assets/images/lib_owner_secondary.png'
import libraryCover86Image from '../assets/images/lib_cover86.png'
import libraryCover87Image from '../assets/images/lib_cover87.png'
import libraryCover88Image from '../assets/images/lib_cover88.png'
import libraryCover89Image from '../assets/images/lib_cover89.png'
import libraryCover90Image from '../assets/images/lib_cover90.png'
import libraryCover91Image from '../assets/images/lib_cover91.png'
import libraryCover92Image from '../assets/images/lib_cover92.png'
import libraryCover93Image from '../assets/images/lib_cover93.png'
import libraryCover94Image from '../assets/images/lib_cover94.png'
import libraryCover95Image from '../assets/images/lib_cover95.png'
import wechatImage from '../assets/images/企业微信.png'
import dingImage from '../assets/images/钉钉.png'
import feishuImage from '../assets/images/飞书.png'
import financialBiMdContent from '../assets/content/国内金融行业商业智能软件市场调研报告.md?raw'
import Orb from '../components/Orb'
import './QuestionPage.css'

const ICONS = {
  dora: '\ue805',
  experts: '\ue802',
  library: '\ue803',
  search: '\ue79f',
  sidebar: '\ue78e',
  admin: '\ue796',
  create: '\ue78f',
  newChat: '\ue7a0',
  schedule: '\ue7ec',
  send: '\ue791',
  back: '\ue790',
  download: '\ue7b9',
  share: '\ue7a5',
  collapseCatalog: '\ue7cc',
  sessionFile: '\ue7f6',
  arrowDown: '\ue797',
  chevron: '\ue7f8',
}

const ACTIVE_NAV_IMAGES = {
  dora: activeDoraImage,
  experts: activeExpertsImage,
  library: activeLibraryImage,
}

const NAV_ITEMS = [
  {
    id: 'dora',
    label: 'Dora',
    icon: ICONS.dora,
    activeImage: ACTIVE_NAV_IMAGES.dora,
    activeOffsetY: '1px',
  },
  {
    id: 'experts',
    label: '专家团',
    icon: ICONS.experts,
    activeImage: ACTIVE_NAV_IMAGES.experts,
    activeOffsetY: '0px',
  },
  {
    id: 'library',
    label: '资料库',
    icon: ICONS.library,
    activeImage: ACTIVE_NAV_IMAGES.library,
    activeOffsetY: '-0.5px',
  },
]

const CAPABILITY_HINTS = [
  '计算ROI与同比环比，拆解增长驱动因素',
  '生成销售漏斗可视化与异常预警报告',
  '对比各区域业绩并给出可执行优化建议',
  '从多源数据自动汇总经营分析看板',
]

const PRACTICE_CARDS = [
  { title: '经营分析', desc: '一键生成月度经营复盘与关键指标解读' },
  { title: '销售洞察', desc: '漏斗转化、客单价与复购趋势对比' },
  { title: '增长拆解', desc: '同比环比与驱动因素结构化分析' },
  { title: '异常预警', desc: '自动识别波动异常并给出根因假设' },
  { title: 'ROI 复盘', desc: '评估投放回报率与渠道贡献结构' },
  { title: '客户洞察', desc: '分析区域、层级与客户价值分层' },
  { title: '门店分析', desc: '定位高潜门店与关键异常门店' },
  { title: '品类策略', desc: '对比品类增长与毛利表现趋势' },
  { title: '活动复盘', desc: '拆解营销活动带来的增量影响' },
  { title: '库存预警', desc: '识别库存积压与缺货风险变化' },
  { title: '渠道对比', desc: '横向比较各渠道效率与投入产出' },
  { title: '经营看板', desc: '快速汇总核心经营指标与变化趋势' },
]

const PRACTICE_PREVIEW_CARDS = PRACTICE_CARDS.slice(0, 4)

const LIBRARY_FILTER_OPTIONS = [
  { value: 'all', label: '全部类型' },
  { value: 'html', label: 'HTML' },
  { value: 'md', label: 'Markdown' },
  { value: 'ppt', label: 'PPT' },
]

const LIBRARY_ASSETS = {
  html: libraryHtmlImage,
  md: libraryMdImage,
  ppt: libraryPptImage,
  ownerPrimary: libraryOwnerPrimaryImage,
  ownerSecondary: libraryOwnerSecondaryImage,
  cover87: libraryCover87Image,
  cover88: libraryCover88Image,
  cover89: libraryCover89Image,
  cover86: libraryCover86Image,
  cover90: libraryCover90Image,
  cover91: libraryCover91Image,
  cover92: libraryCover92Image,
  cover93: libraryCover93Image,
  cover94: libraryCover94Image,
  cover95: libraryCover95Image,
}

const LIBRARY_RECENT_ITEMS = [
  {
    title: '销售预测系统.html',
    owner: '财务小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover87,
  },
  {
    title: '风险营销系统.html',
    owner: 'Dora：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover88,
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover89,
  },
]

const LIBRARY_ITEMS = [
  {
    title: '销售预测系统.html',
    owner: '财务小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover86,
  },
  {
    title: '国内金融行业商业智能软件市场调研报告.md',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'md',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover90,
  },
  {
    title: '风险营销系统.html',
    owner: 'Dora：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover91,
  },
  {
    title: '销售预测系统.html',
    owner: '财务小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover92,
  },
  {
    title: '华润集团销售拓客速读.md',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'md',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover93,
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover94,
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'ppt',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover93,
  },
  {
    title: '风险营销系统.html',
    owner: 'Dora：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover95,
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover94,
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'ppt',
    ownerIcon: LIBRARY_ASSETS.ownerSecondary,
    cover: LIBRARY_ASSETS.cover93,
  },
  {
    title: '风险营销系统.html',
    owner: 'Dora：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover88,
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover94,
  },
]

const EXPERT_FILTER_OPTIONS = [
  { value: 'all', label: '全部' },
  { value: 'report', label: '报告' },
  { value: 'analysis', label: '分析' },
  { value: 'strategy', label: '策略' },
]

const EXPERT_CARDS = [
  {
    title: '智能报告',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    editedAt: '2026/02/12',
    hasAlert: false,
  },
  {
    title: '智能agent 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    hasAlert: true,
  },
  {
    title: '智能agent 121 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    hasAlert: false,
  },
  {
    title: '智能agent 121 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    hasAlert: false,
  },
  {
    title: '智能问数',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    editedAt: '2026/02/12',
    hasAlert: false,
  },
  {
    title: '智能报告',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    editedAt: '2026/02/12',
    hasAlert: false,
  },
  {
    title: '智能agent 213123',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    hasAlert: false,
  },
  {
    title: 'Agent的名称很长很长很长很长很长很长很长...',
    desc: '这里是agent相关描述信息',
    category: 'strategy',
    editedAt: '2026/02/12',
    hasAlert: false,
  },
  {
    title: '智能agent 213123',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    hasAlert: false,
  },
  {
    title: '智能agent 121 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    hasAlert: false,
  },
  {
    title: '智能agent12121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    editedAt: '2026/02/12',
    hasAlert: false,
  },
]

const INTERNAL_ACTIONS = [
  { id: 'new-chat', label: '新聊天', icon: ICONS.newChat, active: true },
  { id: 'schedule', label: '定时任务', icon: ICONS.schedule, active: false },
]

const INTERNAL_AVATARS = [
  { id: 'wechat', label: '企业微信-未命名Agent_01', icon: wechatImage, badge: '99+' },
  { id: 'ding', label: '钉钉-未命名Agent_01', icon: dingImage, badge: '1' },
  { id: 'feishu', label: '飞书-未命名Agent_01', icon: feishuImage, badge: '' },
]

const EXPERT_DETAIL_TABS = [
  '客户背景画像',
  '公司信息查询',
  '上市公司财务',
  '公司发展动态',
  '市场综合洞察',
]

const EXPERT_DETAIL_PROMPTS = [
  '汇总下华为近三个月的大动作：有没有新的战略合作、融资或者重大的生产线调整？',
  '听说阿里巴巴最近又有高管调动了？帮我看看具体是谁变了，对业务线有啥影响？',
  '希尔顿酒店最近在社交媒体上有没有什么负面舆情？帮我复述一下事件摘要。',
  '整理下雷军最近在公开场合的讲话要点，帮我提炼出小米明年的三个战略关键词。',
]

const EXPERT_DETAIL_PREVIEW_PROMPTS = EXPERT_DETAIL_PROMPTS.slice(2)

export default function QuestionPage() {
  const [historyItems, setHistoryItems] = useState([
    { id: 'history-1', label: '广东省潜量最高的10个客户', badge: '' },
    { id: 'history-2', label: '江苏省销售额', badge: '1' },
    { id: 'history-3', label: '去年门店销售额最高的商品是哪个', badge: '20' },
  ])
  const [activeNav, setActiveNav] = useState('dora')
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(false)
  const [expertSidebarOpen, setExpertSidebarOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const [practicesPageOpen, setPracticesPageOpen] = useState(false)
  const [isGeneratingSession, setIsGeneratingSession] = useState(false)
  const [activeSessionPrompt, setActiveSessionPrompt] = useState('')
  const [activeExpertCard, setActiveExpertCard] = useState(null)
  const [activeExpertTab, setActiveExpertTab] = useState(0)
  const [activeLibraryItem, setActiveLibraryItem] = useState(null)
  const [libraryChatCollapsed, setLibraryChatCollapsed] = useState(false)
  const [expertFilter, setExpertFilter] = useState('all')
  const [expertSearch, setExpertSearch] = useState('')
  const [libraryFilter, setLibraryFilter] = useState('all')
  const [librarySearch, setLibrarySearch] = useState('')
  const [hintIndex, setHintIndex] = useState(0)
  const [displayedHint, setDisplayedHint] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [doraIntroPhase, setDoraIntroPhase] = useState('idle')
  const [doraVisualScheme, setDoraVisualScheme] = useState('scheme1')
  const [innerSidebarEntering, setInnerSidebarEntering] = useState(false)

  const canSend = useMemo(() => inputText.trim().length > 0, [inputText])

  const filteredExpertCards = useMemo(() => {
    const keyword = expertSearch.trim().toLowerCase()

    return EXPERT_CARDS.filter((card) => {
      const matchesFilter = expertFilter === 'all' || card.category === expertFilter
      const matchesKeyword = !keyword || `${card.title} ${card.desc}`.toLowerCase().includes(keyword)
      return matchesFilter && matchesKeyword
    })
  }, [expertFilter, expertSearch])

  const filteredLibraryItems = useMemo(() => {
    const keyword = librarySearch.trim().toLowerCase()

    return LIBRARY_ITEMS.filter((item) => {
      const matchesFilter = libraryFilter === 'all' || item.type === libraryFilter
      const matchesKeyword = !keyword || `${item.title} ${item.owner}`.toLowerCase().includes(keyword)
      return matchesFilter && matchesKeyword
    })
  }, [libraryFilter, librarySearch])

  const senderPlaceholder = isGeneratingSession
    ? '在此输入任何您想查询或分析的问题，输入 @ 引用会话文件'
    : '在此输入任何您想查询或分析的问题'
  const activeSessionTitle = activeSessionPrompt ? '生成数据分析技能' : ''
  const activeLibraryTitle = activeLibraryItem ? activeLibraryItem.title : ''
  const activeLibraryMarkdown = activeLibraryItem?.type === 'md' ? financialBiMdContent : ''
  const activeLibraryHtml = useMemo(() => {
    if (!activeLibraryMarkdown) return ''
    return marked.parse(activeLibraryMarkdown)
  }, [activeLibraryMarkdown])
  const isExpertDetailView = activeNav === 'experts' && Boolean(activeExpertCard)
  const hasInnerSidebar = activeNav === 'dora' || isExpertDetailView
  const activeInnerSidebarOpen = isExpertDetailView ? expertSidebarOpen : internalSidebarOpen
  const panelToggleTitle = activeInnerSidebarOpen ? '收起侧栏' : '展开侧栏'

  const toggleInnerSidebar = () => {
    if (isExpertDetailView) {
      setExpertSidebarOpen((prev) => !prev)
      return
    }

    setInternalSidebarOpen((prev) => !prev)
  }

  useEffect(() => {
    const full = CAPABILITY_HINTS[hintIndex]
    let timer = null

    if (!isDeleting) {
      if (displayedHint.length < full.length) {
        timer = setTimeout(() => {
          setDisplayedHint(full.slice(0, displayedHint.length + 1))
        }, 55)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 2200)
      }
    } else if (displayedHint.length > 0) {
      timer = setTimeout(() => {
        setDisplayedHint((prev) => prev.slice(0, -1))
      }, 28)
    } else {
      timer = setTimeout(() => {
        setIsDeleting(false)
        setHintIndex((prev) => (prev + 1) % CAPABILITY_HINTS.length)
      }, 400)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [displayedHint, hintIndex, isDeleting])

  useEffect(() => {
    if (activeNav !== 'dora') {
      setDoraIntroPhase('idle')
      return
    }

    setDoraIntroPhase('content')
  }, [activeNav])

  useEffect(() => {
    if (!hasInnerSidebar || !activeInnerSidebarOpen) {
      setInnerSidebarEntering(false)
      return undefined
    }

    setInnerSidebarEntering(false)
    const frame = requestAnimationFrame(() => {
      setInnerSidebarEntering(true)
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [hasInnerSidebar, activeInnerSidebarOpen])

  const selectNav = (id) => {
    setActiveNav(id)
    if (id !== 'dora') {
      setPracticesPageOpen(false)
    }
  }

  const applyHintToInput = () => {
    setInputText(CAPABILITY_HINTS[hintIndex])
  }

  const handleSend = () => {
    const text = inputText.trim()
    if (!text) return

    setActiveSessionPrompt(text)
    setIsGeneratingSession(true)
    setPracticesPageOpen(false)
    setHistoryItems((prev) => [
      {
        id: `history-${Date.now()}`,
        label: text,
        badge: '',
      },
      ...prev,
    ])
    setInputText('')
  }

  const onKeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const onEnterKey = (e, callback) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      callback()
    }
  }

  return (
    <div className="page" data-name="2-提问页">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => selectNav(item.id)}
              style={{ '--nav-active-offset-y': item.activeOffsetY }}
            >
              <span className="nav-icon-wrap">
                <span className="dora-icon nav-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <img src={item.activeImage} alt="" className="nav-active-image" />
              </span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="icon-btn" title="搜索">
            <span className="dora-icon icon-16" aria-hidden="true">
              {ICONS.search}
            </span>
          </button>
          <button type="button" className="icon-btn avatar-btn" title="个人">
            <img src={avatarImage} alt="头像" className="avatar" />
          </button>
        </div>
      </aside>

      <main className="main">
        <div className="main-card">
          <div className="main-body">
            {activeNav === 'dora' || isExpertDetailView ? (
              <aside
                className={`inner-sidebar ${activeInnerSidebarOpen ? 'open' : ''} ${
                  activeInnerSidebarOpen && innerSidebarEntering ? 'inner-sidebar--enter' : ''
                }`}
              >
                <div className="inner-sidebar__head">
                  {isExpertDetailView ? (
                    <div className="inner-sidebar__detail-head">
                      <button
                        type="button"
                        className="icon-btn inner-sidebar__back"
                        title="返回"
                        onClick={() => setActiveExpertCard(null)}
                      >
                        <span className="dora-icon icon-16" aria-hidden="true">
                          {ICONS.back}
                        </span>
                      </button>
                      <div className="inner-sidebar__agent-title">
                        <img src={agentDefaultAvatarImage} alt="" className="inner-sidebar__agent-avatar" />
                        <span className="inner-sidebar__agent-name">未命名Agent_01</span>
                        <span className="dora-icon inner-sidebar__agent-caret" aria-hidden="true">
                          {ICONS.arrowDown}
                        </span>
                      </div>
                      <span className="inner-sidebar__detail-spacer" aria-hidden="true">
                        {ICONS.back}
                      </span>
                    </div>
                  ) : (
                    <img src={doraTitleImage} alt="Dora" className="inner-sidebar__title-image" />
                  )}
                  <button type="button" className="icon-btn inner-sidebar__admin" title="管理后台">
                    <span className="dora-icon icon-16" aria-hidden="true">
                      {ICONS.admin}
                    </span>
                  </button>
                </div>

                <div className="inner-sidebar__content">
                  <div className="inner-sidebar__actions">
                    {INTERNAL_ACTIONS.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        className={`inner-item ${action.active ? 'active' : ''}`}
                      >
                        <span className="dora-icon inner-item__icon" aria-hidden="true">
                          {action.icon}
                        </span>
                        <span className="inner-item__label">{action.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="inner-divider"></div>

                  <div className="inner-group">
                    <div className="inner-group__title">分身</div>
                    {INTERNAL_AVATARS.map((item) => (
                      <button key={item.id} type="button" className="inner-item inner-item--list">
                        <img src={item.icon} alt="" className="inner-avatar" />
                        <span className="inner-item__label">{item.label}</span>
                        {item.badge ? <span className="inner-badge">{item.badge}</span> : null}
                      </button>
                    ))}
                  </div>

                  <div className="inner-group inner-group--stretch">
                    <div className="inner-group__title">历史会话</div>
                    {historyItems.map((item) => (
                      <button key={item.id} type="button" className="inner-item inner-item--history">
                        <span className="inner-item__label">{item.label}</span>
                        {item.badge ? <span className="inner-badge">{item.badge}</span> : null}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            ) : null}

            <div className="content-column">
              {activeNav === 'experts' ? (
                !activeExpertCard ? (
                  <section className="experts-page">
                    <header className="experts-page__header">专家团</header>
                    <div className="experts-page__body">
                      <div className="experts-toolbar">
                        <div className="experts-toolbar__filters">
                          <label className="experts-select-wrap">
                            <select
                              value={expertFilter}
                              onChange={(e) => setExpertFilter(e.target.value)}
                              className="experts-select"
                            >
                              {EXPERT_FILTER_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <span className="dora-icon experts-select__arrow" aria-hidden="true">
                              {ICONS.arrowDown}
                            </span>
                          </label>

                          <label className="experts-search">
                            <span className="dora-icon experts-search__icon" aria-hidden="true">
                              {ICONS.search}
                            </span>
                            <input
                              value={expertSearch}
                              onChange={(e) => setExpertSearch(e.target.value)}
                              type="text"
                              className="experts-search__input"
                              placeholder="搜索名称/描述"
                            />
                          </label>
                        </div>

                        <button type="button" className="experts-create-btn">
                          <span className="dora-icon icon-16" aria-hidden="true">
                            {ICONS.create}
                          </span>
                          <span>去创建</span>
                        </button>
                      </div>

                      <div className="experts-grid">
                        {filteredExpertCards.map((card) => (
                          <article
                            key={`${card.title}-${card.editedAt}-${card.desc}`}
                            className="expert-card"
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              setActiveExpertCard(card)
                              setExpertSidebarOpen(true)
                            }}
                            onKeyDown={(e) =>
                              onEnterKey(e, () => {
                                setActiveExpertCard(card)
                                setExpertSidebarOpen(true)
                              })
                            }
                          >
                            <div className="expert-card__head">
                              <div className="expert-card__avatar-wrap">
                                <img src={agentDefaultAvatarImage} alt="" className="expert-card__avatar" />
                                {card.hasAlert ? <span className="expert-card__alert"></span> : null}
                              </div>

                              <div className="expert-card__meta">
                                <h3>{card.title}</h3>
                                <p>最近编辑：{card.editedAt}</p>
                              </div>
                            </div>

                            <p className="expert-card__desc">{card.desc}</p>
                          </article>
                        ))}

                        {!filteredExpertCards.length ? (
                          <div className="experts-empty">暂无匹配的专家，请尝试调整筛选条件。</div>
                        ) : null}
                      </div>
                    </div>
                  </section>
                ) : (
                  <section className="expert-detail-page expert-detail-page--enter">
                    <header className="expert-detail-page__header">
                      <button
                        type="button"
                        className="expert-detail-page__back"
                        title={panelToggleTitle}
                        aria-label={panelToggleTitle}
                        onClick={toggleInnerSidebar}
                      >
                        <span className="dora-icon icon-16" aria-hidden="true">
                          {ICONS.sidebar}
                        </span>
                      </button>
                      <div className="expert-detail-page__title-wrap">
                        <img src={agentDefaultAvatarImage} alt="" className="expert-detail-page__avatar" />
                        <span className="expert-detail-page__title">未命名Agent</span>
                      </div>
                      <button type="button" className="icon-btn">
                        <span className="dora-icon icon-16" aria-hidden="true">
                          {ICONS.admin}
                        </span>
                      </button>
                    </header>

                    <div className="expert-detail-page__body">
                      <div className="expert-detail-page__panel">
                        <div className="expert-intro-card">
                          <p>您好！我是数据分析专家。您可以向我提问关于数据收集、分析或可视化的问题。</p>
                        </div>

                        <div className="expert-tab-wrap">
                          {EXPERT_DETAIL_TABS.map((tab, idx) => (
                            <button
                              key={tab}
                              type="button"
                              className={`expert-tab ${idx === activeExpertTab ? 'active' : ''}`}
                              onClick={() => setActiveExpertTab(idx)}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        <div className="expert-prompts">
                          {EXPERT_DETAIL_PREVIEW_PROMPTS.map((prompt, idx) => (
                            <button
                              key={prompt}
                              type="button"
                              className={`expert-prompt-item ${idx === 0 ? 'active' : ''}`}
                              onClick={() => setInputText(prompt)}
                            >
                              <span className="expert-prompt-item__icon">✦</span>
                              <span>{prompt}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="expert-detail-page__sender">
                        <div className={`sender ${inputFocused ? 'focused' : ''} ${canSend ? 'has-value' : ''}`}>
                          <div className="sender-inner">
                            <textarea
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                              className="sender-input"
                              rows="3"
                              placeholder="在此输入任何您想查询或分析的问题，输入 @ 引用会话文件"
                              onFocus={() => setInputFocused(true)}
                              onBlur={() => setInputFocused(false)}
                              onKeyDown={onKeydown}
                            />
                            <div className="sender-toolbar">
                              <button type="button" className="icon-btn attach-btn" title="添加附件">
                                <span className="dora-icon icon-16" aria-hidden="true">
                                  {ICONS.create}
                                </span>
                              </button>
                              <button
                                type="button"
                                className="send-btn"
                                title="发送"
                                disabled={!canSend}
                                onClick={handleSend}
                              >
                                <span className="dora-icon send-icon" aria-hidden="true">
                                  {ICONS.send}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="expert-detail-page__tip">内容均由AI生成, 仅供参考</p>
                      </div>
                    </div>
                  </section>
                )
              ) : activeNav === 'library' ? (
                !activeLibraryItem ? (
                  <section className="library-page">
                    <header className="library-page__header">资料库</header>

                    <div className="library-page__body">
                      <section className="library-section">
                        <div className="library-section__title">
                          <span className="library-section__accent library-section__accent--purple"></span>
                          <span>最近常用</span>
                        </div>

                        <div className="library-recent-grid">
                          {LIBRARY_RECENT_ITEMS.map((item) => (
                            <article
                              key={`recent-${item.title}-${item.cover}`}
                              className="library-card library-card--recent"
                              role="button"
                              tabIndex={0}
                              onClick={() => {
                                setActiveLibraryItem(item)
                                setLibraryChatCollapsed(false)
                              }}
                              onKeyDown={(e) =>
                                onEnterKey(e, () => {
                                  setActiveLibraryItem(item)
                                  setLibraryChatCollapsed(false)
                                })
                              }
                            >
                              <div className="library-card__meta">
                                <img src={LIBRARY_ASSETS[item.type]} alt="" className="library-card__type-icon" />

                                <div className="library-card__text">
                                  <h3>{item.title}</h3>
                                  <div className="library-card__owner">
                                    <img src={item.ownerIcon} alt="" className="library-card__owner-icon" />
                                    <span>{item.owner}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="library-card__cover-wrap">
                                <img src={item.cover} alt="" className="library-card__cover" />
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>

                      <section className="library-section library-section--fill">
                        <div className="library-section__row">
                          <div className="library-section__title">
                            <span className="library-section__accent library-section__accent--blue"></span>
                            <span>全部资源</span>
                          </div>

                          <div className="library-toolbar">
                            <label className="library-select-wrap">
                              <select
                                value={libraryFilter}
                                onChange={(e) => setLibraryFilter(e.target.value)}
                                className="library-select"
                              >
                                {LIBRARY_FILTER_OPTIONS.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              <span className="dora-icon library-select__arrow" aria-hidden="true">
                                {ICONS.arrowDown}
                              </span>
                            </label>

                            <label className="library-search">
                              <span className="dora-icon library-search__icon" aria-hidden="true">
                                {ICONS.search}
                              </span>
                              <input
                                value={librarySearch}
                                onChange={(e) => setLibrarySearch(e.target.value)}
                                type="text"
                                className="library-search__input"
                                placeholder="搜索名称/描述"
                              />
                            </label>
                          </div>
                        </div>

                        <div className="library-grid">
                          {filteredLibraryItems.map((item) => (
                            <article
                              key={`${item.type}-${item.title}-${item.cover}`}
                              className="library-card"
                              role="button"
                              tabIndex={0}
                              onClick={() => {
                                setActiveLibraryItem(item)
                                setLibraryChatCollapsed(false)
                              }}
                              onKeyDown={(e) =>
                                onEnterKey(e, () => {
                                  setActiveLibraryItem(item)
                                  setLibraryChatCollapsed(false)
                                })
                              }
                            >
                              <div className="library-card__meta">
                                <img src={LIBRARY_ASSETS[item.type]} alt="" className="library-card__type-icon" />

                                <div className="library-card__text">
                                  <h3>{item.title}</h3>
                                  <div className="library-card__owner">
                                    <img src={item.ownerIcon} alt="" className="library-card__owner-icon" />
                                    <span>{item.owner}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="library-card__cover-wrap">
                                <img src={item.cover} alt="" className="library-card__cover" />
                              </div>
                            </article>
                          ))}

                          {!filteredLibraryItems.length ? (
                            <div className="library-empty">暂无匹配资源，请尝试调整筛选条件。</div>
                          ) : null}
                        </div>
                      </section>
                    </div>
                  </section>
                ) : (
                  <section className={`library-detail-page library-detail-page--enter ${libraryChatCollapsed ? 'chat-collapsed' : ''}`}>
                    <div className="library-detail-main">
                      <header className="library-detail-main__header">
                        <button type="button" className="expert-detail-page__back" onClick={() => setActiveLibraryItem(null)}>
                          <span className="dora-icon icon-16" aria-hidden="true">
                            {ICONS.back}
                          </span>
                        </button>
                        <span className="library-detail-main__divider" aria-hidden="true"></span>
                        <div className="library-detail-main__meta">
                          <div className="library-detail-main__file-row">
                            {activeLibraryItem ? (
                              <img
                                src={LIBRARY_ASSETS[activeLibraryItem.type]}
                                alt=""
                                className="library-detail-main__file-icon"
                              />
                            ) : null}
                            <span className="library-detail-main__file">{activeLibraryTitle}</span>
                          </div>
                          <span className="library-detail-main__source">{activeLibraryItem?.owner}</span>
                        </div>
                        <div className="library-detail-main__tools">
                          <button type="button" className="icon-btn">
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.share}
                            </span>
                          </button>
                          <button type="button" className="icon-btn">
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.download}
                            </span>
                          </button>
                        </div>
                      </header>

                      <div className="library-detail-main__content">
                        {activeLibraryItem?.type === 'md' ? (
                          <article className="library-detail-markdown" dangerouslySetInnerHTML={{ __html: activeLibraryHtml }} />
                        ) : (
                          <>
                            <h2>华润集团销售拓客速读</h2>
                            <p>
                              一句话判断：华润集团是多元化央企巨头，数字化转型已进入深水区，“智慧华润”战略下各板块数据能力参差不齐，帆软可从板块级渗透切入，重点瞄准华润啤酒这类已具备数据基础但自主分析能力待提升的板块。
                            </p>
                            <h3>一、客户画像关键信息</h3>
                            <div className="library-detail-table">
                              <div className="library-detail-table__row library-detail-table__head">
                                <span>维度</span>
                                <span>关键事实</span>
                              </div>
                              <div className="library-detail-table__row">
                                <span>规模体量</span>
                                <span>香港央企，业务涵盖能源、城市建设运营、大健康、金融与消费等多个板块。</span>
                              </div>
                              <div className="library-detail-table__row">
                                <span>数字化组织</span>
                                <span>2021 年启动“智慧华润”，自建华润云平台，形成数据中台能力。</span>
                              </div>
                              <div className="library-detail-table__row">
                                <span>典型板块</span>
                                <span>华润啤酒、华润置地、华润电力、华润微电子等，具备复杂数据场景。</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <aside className={`library-detail-chat ${libraryChatCollapsed ? 'is-collapsed' : ''}`}>
                      <header className="library-detail-chat__header">
                        <span>新会话</span>
                        <div className="library-detail-chat__tools">
                          <button type="button" className="icon-btn">
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.newChat}
                            </span>
                          </button>
                          <button type="button" className="icon-btn">
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.share}
                            </span>
                          </button>
                          <button type="button" className="icon-btn">
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.sessionFile}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="icon-btn"
                            title="收起目录"
                            aria-label="收起目录"
                            onClick={() => setLibraryChatCollapsed(true)}
                          >
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.collapseCatalog}
                            </span>
                          </button>
                        </div>
                      </header>

                      <div className="library-detail-chat__empty">
                        <h3>嗨，我是 Dora，全能助手随时待命</h3>
                        <div className="subtitle-row">
                          <span className="subtitle-prefix">我可以帮你</span>
                          <span className="capability-badge">
                            {displayedHint}
                            <span className="cursor">_</span>
                          </span>
                        </div>
                      </div>

                      <div className="library-detail-chat__sender">
                        <div className={`sender ${inputFocused ? 'focused' : ''} ${canSend ? 'has-value' : ''}`}>
                          <div className="sender-inner">
                            <textarea
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                              className="sender-input"
                              rows="3"
                              placeholder={senderPlaceholder}
                              onFocus={() => setInputFocused(true)}
                              onBlur={() => setInputFocused(false)}
                              onKeyDown={onKeydown}
                            />
                            <div className="sender-toolbar">
                              <button type="button" className="icon-btn attach-btn" title="添加附件">
                                <span className="dora-icon icon-16" aria-hidden="true">
                                  {ICONS.create}
                                </span>
                              </button>
                              <button type="button" className="send-btn" title="发送" disabled={!canSend} onClick={handleSend}>
                                <span className="dora-icon send-icon" aria-hidden="true">
                                  {ICONS.send}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="library-detail-chat__tip">内容均由AI生成, 仅供参考</p>
                      </div>
                    </aside>
                    {libraryChatCollapsed ? (
                      <button
                        type="button"
                        className="library-chat-entry-btn"
                        title="展开新会话"
                        aria-label="展开新会话"
                        onClick={() => setLibraryChatCollapsed(false)}
                      >
                        <Orb hue={315} hoverIntensity={0.5} rotateOnHover={false} backgroundColor="#000000" className="library-chat-entry-btn__orb" />
                      </button>
                    ) : null}
                  </section>
                )
              ) : (
                <div className={`dora-stage dora-stage--${doraIntroPhase} dora-stage--${doraVisualScheme}`}>
                  {doraVisualScheme === 'scheme1' ? <div className="aurora-bg" aria-hidden="true"></div> : null}

                  <header className="main-header dora-stage__header">
                    <button
                      type="button"
                      className="icon-btn panel-toggle"
                      title={panelToggleTitle}
                      onClick={() => setInternalSidebarOpen((prev) => !prev)}
                    >
                      <span className="dora-icon icon-16" aria-hidden="true">
                        {ICONS.sidebar}
                      </span>
                    </button>
                    <div className="dora-visual-switch" role="tablist" aria-label="首页动效方案切换">
                      <button
                        type="button"
                        className={`dora-visual-switch__btn ${doraVisualScheme === 'scheme1' ? 'active' : ''}`}
                        onClick={() => setDoraVisualScheme('scheme1')}
                      >
                        方案一
                      </button>
                      <button
                        type="button"
                        className={`dora-visual-switch__btn ${doraVisualScheme === 'scheme2' ? 'active' : ''}`}
                        onClick={() => setDoraVisualScheme('scheme2')}
                      >
                        方案二
                      </button>
                    </div>
                  </header>

                  {practicesPageOpen ? (
                    <section className="practices-browser dora-stage__practices-browser">
                      <button type="button" className="practices-back" onClick={() => setPracticesPageOpen(false)}>
                        <span>返回</span>
                        <span className="dora-icon chevron chevron--back" aria-hidden="true">
                          {ICONS.chevron}
                        </span>
                      </button>

                      <div className="practices-grid">
                        {PRACTICE_CARDS.map((card) => (
                          <article key={`browser-${card.title}`} className="practice-browser-card">
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                          </article>
                        ))}
                      </div>
                    </section>
                  ) : (
                    <>
                      <section className="hero dora-stage__hero">
                        {isGeneratingSession ? (
                          <div className="session-generating dora-stage__session">
                            <header className="session-generating__header">
                              <span className="dora-icon icon-16" aria-hidden="true">
                                {ICONS.sidebar}
                              </span>
                              <span className="session-generating__title">{activeSessionTitle}</span>
                            </header>

                            <div className="session-thread">
                              <div className="session-thread__user">{activeSessionPrompt}</div>

                              <div className="session-thread__assistant">
                                <div className="session-thread__assistant-head">
                                  <img src={robotImage} alt="" className="session-thread__assistant-avatar" />
                                  <span>Dora</span>
                                </div>

                                <div className="session-progress">
                                  <div className="session-progress__working">
                                    <span className="session-progress__working-dot"></span>
                                    <span>正在工作...</span>
                                  </div>

                                  <div className="session-progress__card">
                                    <div className="session-progress__skill-row">
                                      <span className="session-progress__caret">▾</span>
                                      <span>使用</span>
                                      <span className="session-progress__skill-tag">技能1：分析主题数据查询</span>
                                    </div>

                                    <div className="session-progress__step">
                                      <span className="session-progress__caret">▾</span>
                                      <span>第一步：主题选择</span>
                                    </div>
                                    <p className="session-progress__desc">
                                      这里技能下第1步的思考产出内容。采用纯文字“流式输出”的方式呈现思考内容，如果有图片生成或引用，则另起一行展示。
                                    </p>

                                    <div className="session-progress__querying">
                                      <span className="session-progress__loader" aria-hidden="true"></span>
                                      <span>正在查询中...</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="hero-inner dora-stage__hero-inner">
                            <div className="welcome">
                              <h1 className="title">嗨，我是 Dora，全能助手随时待命</h1>
                            </div>
                            <div className="subtitle-row">
                              <span className="subtitle-prefix">我可以帮你</span>
                              <button type="button" className="capability-badge" onClick={applyHintToInput}>
                                {displayedHint}
                                <span className="cursor">_</span>
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="sender-wrap dora-stage__sender">
                          <div
                            className={`sender ${inputFocused ? 'focused' : ''} ${canSend ? 'has-value' : ''} ${
                              doraVisualScheme === 'scheme2'
                                  ? 'dora-sender--ring'
                                  : ''
                            }`}
                          >
                            <div className="sender-inner">
                              <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="sender-input"
                                rows="3"
                                placeholder={senderPlaceholder}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                onKeyDown={onKeydown}
                              />
                              <div className="sender-toolbar">
                                <button type="button" className="icon-btn attach-btn" title="添加附件">
                                  <span className="dora-icon icon-16" aria-hidden="true">
                                    {ICONS.create}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="send-btn"
                                  disabled={!canSend}
                                  title="发送"
                                  onClick={handleSend}
                                >
                                  <span className="dora-icon send-icon" aria-hidden="true">
                                    {ICONS.send}
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {!isGeneratingSession ? (
                        <footer className="practices dora-stage__practices">
                          <button type="button" className="practices-toggle" onClick={() => setPracticesPageOpen(true)}>
                            <span>探索最佳实践</span>
                            <span className="dora-icon chevron" aria-hidden="true">
                              {ICONS.chevron}
                            </span>
                          </button>

                          <div className="practices-panel">
                            <div className="cards-track">
                              {PRACTICE_PREVIEW_CARDS.map((card) => (
                                <article key={card.title} className="practice-card">
                                  <h3>{card.title}</h3>
                                  <p>{card.desc}</p>
                                </article>
                              ))}
                            </div>
                          </div>
                        </footer>
                      ) : null}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
