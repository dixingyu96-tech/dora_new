import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { marked } from 'marked'
import activeDoraImage from '../assets/images/dora_选中.png'
import activeExpertsImage from '../assets/images/专家团_选中.png'
import activeLibraryImage from '../assets/images/资料库_选中.png'
import agentDefaultAvatarImage from '../assets/images/Agent默认头像.png'
import doraTitleImage from '../assets/images/dora标题.png'
import doraUploadedImage from '../assets/images/Dora_uploaded.png'
import avatarImage from '../assets/images/avatar.png'
import mobileProfileAvatarImage from '../assets/images/mobile-profile-avatar.png'
import builtinAnalysisThemeImage from '../assets/images/agent-builtins/analysis_theme_bi.png'
import builtinDashboardCatalogImage from '../assets/images/agent-builtins/dashboard_bi_catalog.png'
import builtinDatasetCatalogImage from '../assets/images/agent-builtins/dataset_bi_catalog.png'
import builtinExcelFileImage from '../assets/images/agent-builtins/excel_file_builtin.png'
import builtinModelMetricsImage from '../assets/images/agent-builtins/model_metrics_dataset.png'
import connectorBiAnalysisSelfServiceImage from '../assets/images/connector-sources/bi_analysis_self_service.png'
import connectorBiAnalysisStandardImage from '../assets/images/connector-sources/bi_analysis_standard.png'
import connectorBiCatalogImage from '../assets/images/connector-sources/bi_catalog.png'
import connectorBusinessModelExtractImage from '../assets/images/connector-sources/business_model_extract.png'
import connectorExcelExtractImage from '../assets/images/connector-sources/excel_extract.png'
import btnBiImage from '../assets/images/btn_bi.png'
import attachDashboardImage from '../assets/images/attach_dashboard.png'
import attachTreeRootImage from '../assets/images/attach_tree_root.png'
import attachTreeLeafImage from '../assets/images/attach_tree_leaf.png'
import attachTreeFolderClosedImage from '../assets/images/attach_tree_folder_closed.png'
import attachTreeFolderOpenImage from '../assets/images/attach_tree_folder_open.png'
import fineBiAnalysisThemeImage from '../assets/images/finebi/analysis-theme-bi-my-analysis.png'
import fineBiDashboardImage from '../assets/images/finebi/dashboard-bi-catalog.png'
import fineBiDatasetImage from '../assets/images/finebi/dataset-bi-data-catalog.png'
import fineBiModelMetricSetImage from '../assets/images/finebi/model-metric-set-bi-dataset.png'
import sourceBiAnalysisSelfServiceThemeImage from '../assets/images/finebi/source-bi-analysis-self-service-theme.png'
import sourceBiAnalysisStandardThemeImage from '../assets/images/finebi/source-bi-analysis-standard-theme.png'
import menuFineBiImage from '../assets/images/menu_finebi.png'
import menuFineReportImage from '../assets/images/menu_finereport.png'
import outputFileDocImage from '../assets/images/output_file_doc.png'
import outputFileExcelImage from '../assets/images/output_file_excel.png'
import outputFileHtmlImage from '../assets/images/output_file_html.png'
import outputFileImageImage from '../assets/images/output_file_image.png'
import outputFileMdImage from '../assets/images/output_file_md.png'
import outputFileOtherImage from '../assets/images/output_file_other.png'
import outputFilePdfImage from '../assets/images/output_file_pdf.png'
import outputFilePptImage from '../assets/images/output_file_ppt.png'
import outputFileUnknownImage from '../assets/images/output_file_unknown.png'
import previewUnsupportedBadgeImage from '../assets/images/preview_unsupported_badge.svg'
import previewUnsupportedMaskImage from '../assets/images/preview_unsupported_mask.svg'
import outputFileZipImage from '../assets/images/output_file_zip.png'
import outputSkillImage from '../assets/images/output_skill.png'
import uploadPdfImage from '../assets/images/upload_pdf_new.png'
import uploadMdImage from '../assets/images/upload_md_new.png'
import uploadJsonImage from '../assets/images/upload_json.png'
import uploadVideoImage from '../assets/images/upload_video.png'
import uploadUnknownImage from '../assets/images/upload_unknown.png'
import uploadImageImage from '../assets/images/upload_image.png'
import uploadAudioImage from '../assets/images/upload_audio.png'
import uploadTxtImage from '../assets/images/upload_txt.png'
import uploadHtmlImage from '../assets/images/upload_html.png'
import uploadDocImage from '../assets/images/upload_doc.png'
import uploadExcelImage from '../assets/images/upload_excel.png'
import uploadZipImage from '../assets/images/upload_zip.png'
import uploadPptImage from '../assets/images/upload_ppt.png'
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
import libraryCoverHtmlImage from '../assets/images/lib_cover_html.png'
import bestPracticeSupplyChainImage from '../assets/images/best-practices/供应链收支分析师.png'
import bestPracticeSalesFunnelPptImage from '../assets/images/best-practices/季度销售漏斗诊断报告-ppt.png'
import bestPracticeSalesFunnelImage from '../assets/images/best-practices/季度销售漏斗诊断报告.png'
import bestPracticeCustomerHealthImage from '../assets/images/best-practices/客户健康度与分层运营策略报告.png'
import bestPracticeInventoryHealthImage from '../assets/images/best-practices/库存健康度诊断报告.png'
import bestPracticeStoreReportImage from '../assets/images/best-practices/门店经营报告.png'
import bestPracticeBenefitCardImage from '../assets/images/best-practices/生成权益卡片.png'
import bestPracticeFinanceBriefImage from '../assets/images/best-practices/月度财务经营分析简报.png'
import bestPracticeStoreBenchmarkImage from '../assets/images/best-practices/月度门店经营对标分析报告.png'
import wechatImage from '../assets/images/企业微信.png'
import dingImage from '../assets/images/钉钉.png'
import feishuImage from '../assets/images/飞书.png'
import tabCurveLeftImage from '../assets/images/tab-curve-left.svg'
import tabCurveRightImage from '../assets/images/tab-curve-right.svg'
import financialBiMdContent from '../assets/content/国内金融行业商业智能软件市场调研报告.md?raw'
import sessionPptSlide01Image from '../assets/images/session-ppt-preview/slide-01.png'
import sessionPptSlide02Image from '../assets/images/session-ppt-preview/slide-02.png'
import sessionPptSlide03Image from '../assets/images/session-ppt-preview/slide-03.png'
import sessionPptSlide04Image from '../assets/images/session-ppt-preview/slide-04.png'
import sessionPptSlide05Image from '../assets/images/session-ppt-preview/slide-05.png'
import sessionPptSlide06Image from '../assets/images/session-ppt-preview/slide-06.png'
import sessionDocPage01Image from '../assets/images/session-doc-preview/page-01.png'
import sessionDocPage02Image from '../assets/images/session-doc-preview/page-02.png'
import sessionDocPage03Image from '../assets/images/session-doc-preview/page-03.png'
import sessionDocPage04Image from '../assets/images/session-doc-preview/page-04.png'
import sessionPdfPage01Image from '../assets/images/session-pdf-preview/page-01.png'
import sessionPdfPage02Image from '../assets/images/session-pdf-preview/page-02.png'
import Orb from '../components/Orb'
import SparklesText from '../components/SparklesText'
import IconButton from '../components/IconButton'
import SessionFilesToolbarRow from '../components/SessionFilesToolbarRow'
import SessionDocPreview from '../components/SessionDocPreview'
import SessionPdfPreview from '../components/SessionPdfPreview'
import SessionMarkdownEditor from '../components/SessionMarkdownEditor'
import SessionMarkdownPreview from '../components/SessionMarkdownPreview'
import SessionPptPreview from '../components/SessionPptPreview'
import SessionSpreadsheetEditor, {
  createSessionSpreadsheetEditState,
  getSpreadsheetColumnWidths,
  getSpreadsheetMinWidth,
  getSpreadsheetRowHeights,
  mergeSpreadsheetSheetWithEditDraft,
} from '../components/SessionSpreadsheetEditor'
import SessionThread from '../components/SessionThread'
import { extractMarkdownHeadings, parseSessionMarkdownHtml } from '../utils/sessionMarkdown'
import LibraryDetailMainMeta from '../components/LibraryDetailMainMeta'
import FourPointStarLoader from '../components/FourPointStarLoader'
import './QuestionPage.css'

function OverflowTooltipText({ text, className, tipPlacement = 'top', anchorSelector = null }) {
  const textRef = useRef(null)
  const [tipVisible, setTipVisible] = useState(false)
  const [tipPos, setTipPos] = useState({ top: 0, left: 0 })

  const getAnchorElement = useCallback(() => {
    const textElement = textRef.current
    if (!textElement) return null
    if (!anchorSelector) return textElement
    return textElement.closest(anchorSelector) ?? textElement
  }, [anchorSelector])

  const updateTipPosition = useCallback(() => {
    const anchor = getAnchorElement()
    if (!anchor) return

    const rect = anchor.getBoundingClientRect()
    if (tipPlacement === 'top') {
      setTipPos({ top: rect.top - 6, left: rect.left + rect.width / 2 })
      return
    }

    setTipPos({ top: rect.bottom + 6, left: rect.left + rect.width / 2 })
  }, [getAnchorElement, tipPlacement])

  const shouldShowTip = useCallback(() => {
    const anchor = textRef.current
    if (!anchor) return false
    return anchor.scrollWidth > anchor.clientWidth + 1
  }, [])

  const showTip = () => {
    if (!shouldShowTip()) return
    updateTipPosition()
    setTipVisible(true)
  }

  const hideTip = () => {
    setTipVisible(false)
  }

  useEffect(() => {
    if (!tipVisible) return undefined

    const handleReposition = () => {
      if (!shouldShowTip()) {
        setTipVisible(false)
        return
      }
      updateTipPosition()
    }

    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    return () => {
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [tipVisible, shouldShowTip, updateTipPosition])

  const tipClassName =
    tipPlacement === 'top'
      ? 'icon-tip icon-tip--top icon-tip--portal'
      : 'icon-tip icon-tip--portal'

  return (
    <>
      <span ref={textRef} className={className} onMouseEnter={showTip} onMouseLeave={hideTip}>
        {text}
      </span>
      {tipVisible
        ? createPortal(
            <span className={tipClassName} role="tooltip" style={{ top: tipPos.top, left: tipPos.left }}>
              {text}
            </span>,
            document.body,
          )
        : null}
    </>
  )
}

const ICONS = {
  dora: '\ue805',
  experts: '\ue802',
  library: '\ue803',
  search: '\ue79f',
  sidebar: '\ue78e',
  settings: '\ue7c1',
  adminPanel: '\ue796',
  create: '\ue78f',
  frbiConnector: '\ue823',
  newChat: '\ue7a0',
  schedule: '\ue7ec',
  send: '\ue791',
  back: '\ue790',
  arrowLeft: '\ue7da',
  mobileBack: '\ue830',
  download: '\ue7b9',
  share: '\ue7a5',
  collapseCatalog: '\ue7cc',
  sessionFile: '\ue7f6',
  arrowDown: '\ue797',
  arrowRight: '\ue798',
  arrowUp: '\ue7cf',
  chevron: '\ue7f8',
  moreUp: '\ue7f8',
  triangleDown: '\ue794',
  triangleRight: '\ue795',
  close: '\ue7ab',
  expand: '\ue7aa',
  shrink: '\ue7ad',
  cite: '\ue804',
  uncite: '\ue807',
  saveAs: '\ue7f7',
  delete: '\ue7b2',
  more: '\ue793',
  rename: '\ue7ac',
  editLine: '\ue7af',
  styleLine: '\ue810',
  openWindow: '\ue7d9',
  undo: '\ue7bf',
  redo: '\ue7be',
  bold: '\ue7c0',
  bulletList: '\ue7bc',
  orderedList: '\ue7ba',
  outdent: '\ue7bb',
  indent: '\ue7bd',
  catalog: '\ue7d1',
  aiDecor: '\ue7d0',
  favorite: '\ue820',
  favoriteActive: '\ue816',
  goTo: '\ue7dc',
  zoomOut: '\ue80a',
  zoomIn: '\ue80b',
  fitPage: '\ue80c',
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
    activeOffsetY: '0px',
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
    activeOffsetY: '0px',
  },
]

const HERO_SKILL_TAGS = [
  { id: 'data-explore', label: '数据探索', icon: '\ue82d' },
  { id: 'deep-analysis', label: '深度分析', icon: '\ue82b' },
  { id: 'attribution', label: '归因诊断', icon: '\ue82a' },
  { id: 'trend-forecast', label: '趋势预测', icon: '\ue82c' },
  { id: 'analysis-report', label: '分析报告', icon: '\ue826' },
  { id: 'slides', label: '幻灯片', icon: '\ue827' },
  { id: 'data-viz', label: '数据可视化', icon: '\ue829' },
  { id: 'monitor-alert', label: '监控预警', icon: '\ue828' },
  { id: 'metric-mgmt', label: '指标管理', icon: '\ue82f' },
  { id: 'business-insight', label: '业务洞察', icon: '\ue82e' },
]

const HERO_SKILL_TAG_PLACEHOLDERS = {
  'data-explore': '试试添加 Excel 或数据表，让我帮你快速查数、汇总和排序',
  'deep-analysis': '请给我业务数据，我帮你多维对比、拆解波动和发现问题',
  attribution: '告诉我异常指标或上传数据，让我帮你定位原因和影响因素',
  'trend-forecast': '添加历史数据，让我帮你预测趋势、测算影响和判断目标达成',
  'analysis-report': '告诉我主题，让我帮你生成经营分析、周报或管理简报',
  slides: '请给我数据或文档，让我帮你整理成结构清晰的商务 PPT',
  'data-viz': '添加历史数据，让我帮你生成看板、图表、漏斗或地图可视化',
  'monitor-alert': '告诉我预警规则，让我帮你自动监控异常并及时提醒',
  'metric-mgmt': '告诉我指标，让我帮你解释口径、校验数据和核算公式',
  'business-insight': '请给我业务数据，让我帮你提炼机会点、改进建议和增长策略',
}

const HERO_SKILL_TAG_PROMPTS = {
  'data-explore': [
    '帮我查一下上个月华东区的总销售额，以及环比上月的增长率。',
    '列出本季度销售额排名前 10 的产品，包含销量、单价和毛利率。',
    '截至昨天，库存周转天数超过 60 天的商品有哪些？按周转天数倒序排列。',
  ],
  'deep-analysis': [
    '对比线上和线下两个渠道，从客单价、复购率、转化率三个维度分析各自的优劣势。',
    '分析过去 6 个月毛利率的波动，拆解出价格、成本、产品结构各自的影响。',
    '哪些门店属于"高流量低转化"？帮我定位出来并分析可能的原因。',
  ],
  attribution: [
    '本月销售额比上月下降了 15%，帮我找出主要原因，定位到具体区域和产品。',
    '对比预算和实际，找出本季度费用超支最严重的几个科目，并解释偏差来源。',
    '这个月活跃用户数没达标，帮我做漏斗诊断，看是拉新、留存还是召回环节的问题。',
  ],
  'trend-forecast': [
    '基于过去 24 个月的销售数据，预测下个季度各区域的销售额，并给出置信区间。',
    '如果把 A 产品的价格上调 5%，对销量和总利润的预计影响是多少？',
    '照当前趋势，预计这个月底能不能完成销售目标？还差多少？',
  ],
  'analysis-report': [
    '帮我生成一份本月销售经营分析报告，包含整体概览、区域表现、品类表现、问题与建议四部分。',
    '写一份本周运营周报，重点突出关键指标的变化、异常波动和需要关注的事项。',
    '帮我做一份面向管理层的经营简报，控制在一页，只放最关键的 5 个结论。',
  ],
  slides: [
    '把本月销售分析做成一份 PPT，大概 8 页，包含封面、核心结论、分区域明细和下月计划。',
    '帮我做一份季度经营汇报的幻灯片，风格简洁商务，每页一个核心观点配一张图。',
    '做一份给销售团队的复盘演示，前面讲整体表现，后面分门店点评。',
  ],
  'data-viz': [
    '帮我建一个实时监控看板，盯住今天的订单量、GMV 和退款率三个指标。',
    '用合适的图表展示用户从访问到下单的转化漏斗，标出每一步的流失率。',
    '做一张地图可视化，展示各省份的销售密度。',
  ],
  'monitor-alert': [
    '当任意门店的日销售额低于 1 万元时，自动提醒我，并附上该门店的近期趋势。',
    '每周一早上 9 点，把上周经营周报自动推送到运营群。',
    '监控退货率，一旦单日超过 5% 就立即通知质量团队。',
  ],
  'metric-mgmt': [
    '我们公司的"活跃用户"是怎么定义的？口径是什么？帮我说清楚。',
    '检查销售明细表里有没有重复订单、空值或异常金额。',
    '"毛利率"和"净利率"在我们的报表里分别怎么算？举个例子说明。',
  ],
  'business-insight': [
    '基于本季度的销售表现，给我 3 条最值得优先投入资源的建议，并说明依据。',
    '看看哪些门店有提升空间，分别给出针对性的改进方向。',
    '综合用户、产品、渠道三方面，给我一份下季度增长策略的核心建议。',
  ],
}

const PRACTICE_CARDS = [
  { id: 'supply-chain-income-expense', title: '供应链收支分析师', desc: '供应链收支分析师', cover: bestPracticeSupplyChainImage },
  { id: 'sales-funnel-diagnosis-ppt', title: '季度销售漏斗诊断报告', desc: '季度销售漏斗诊断报告', cover: bestPracticeSalesFunnelPptImage },
  { id: 'sales-funnel-diagnosis', title: '季度销售漏斗诊断报告', desc: '季度销售漏斗诊断报告', cover: bestPracticeSalesFunnelImage },
  { id: 'customer-health-tiered-operation', title: '客户健康度与分层运营策略报告', desc: '客户健康度与分层运营策略报告', cover: bestPracticeCustomerHealthImage },
  { id: 'inventory-health-diagnosis', title: '库存健康度诊断报告', desc: '库存健康度诊断报告', cover: bestPracticeInventoryHealthImage },
  { id: 'store-operation-report', title: '门店经营报告', desc: '门店经营报告', cover: bestPracticeStoreReportImage },
  { id: 'benefit-card-generation', title: '生成权益卡片', desc: '生成权益卡片', cover: bestPracticeBenefitCardImage },
  { id: 'monthly-finance-brief', title: '月度财务经营分析简报', desc: '月度财务经营分析简报', cover: bestPracticeFinanceBriefImage },
  { id: 'monthly-store-benchmark', title: '月度门店经营对标分析报告', desc: '月度门店经营对标分析报告', cover: bestPracticeStoreBenchmarkImage },
]

const PRACTICE_DECK_OFFSETS = [-3, -2, -1, 0, 1, 2, 3]
const PRACTICE_DECK_SWIPE_DISTANCE = 78
const MOBILE_RECOMMENDATION_SWIPE_DISTANCE = 68
const MOBILE_RECOMMENDATION_MAX_SWIPE_CARDS = 3
const MOBILE_RECOMMENDATION_LIMIT = 10

const PRACTICE_DECK_POSES = {
  recommendation: [
    { x: -190, y: 24, scale: 1, rotate: -10, opacity: 0, brightness: 1 },
    { x: -130, y: 20, scale: 1, rotate: -8, opacity: 1, brightness: 1 },
    { x: -69, y: 10, scale: 1, rotate: -4, opacity: 1, brightness: 1 },
    { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, brightness: 1 },
    { x: 68, y: 10, scale: 1, rotate: 4, opacity: 1, brightness: 1 },
    { x: 128, y: 20, scale: 1, rotate: 8, opacity: 1, brightness: 1 },
    { x: 190, y: 24, scale: 1, rotate: 10, opacity: 0, brightness: 1 },
  ],
  mobile: [
    { x: -184, y: 13, scale: 0.54, rotate: -9, opacity: 0, brightness: 0.86 },
    { x: -132, y: 10, scale: 0.73, rotate: -6, opacity: 0.72, brightness: 0.9 },
    { x: -78, y: 5, scale: 0.87, rotate: -3, opacity: 0.94, brightness: 0.95 },
    { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, brightness: 1 },
    { x: 78, y: 5, scale: 0.87, rotate: 3, opacity: 0.94, brightness: 0.95 },
    { x: 132, y: 10, scale: 0.73, rotate: 6, opacity: 0.72, brightness: 0.9 },
    { x: 184, y: 13, scale: 0.54, rotate: 9, opacity: 0, brightness: 0.86 },
  ],
  desktop: [
    { x: -225, y: 30, scale: 0.42, rotate: -12, opacity: 0, brightness: 0.84 },
    { x: -164, y: 22, scale: 0.52, rotate: -9, opacity: 0.62, brightness: 0.88 },
    { x: -82, y: 9, scale: 0.9, rotate: -3, opacity: 0.9, brightness: 0.95 },
    { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, brightness: 1 },
    { x: 82, y: 9, scale: 0.9, rotate: 3, opacity: 0.9, brightness: 0.95 },
    { x: 164, y: 22, scale: 0.52, rotate: 9, opacity: 0.62, brightness: 0.88 },
    { x: 225, y: 30, scale: 0.42, rotate: 12, opacity: 0, brightness: 0.84 },
  ],
}

function interpolatePracticeDeckPose(relativePosition, variant) {
  const poses = PRACTICE_DECK_POSES[variant]
  const boundedPosition = Math.max(-3, Math.min(3, relativePosition))
  const lowerPosition = Math.floor(boundedPosition)
  const upperPosition = Math.ceil(boundedPosition)
  const progress = boundedPosition - lowerPosition
  const lowerPose = poses[lowerPosition + 3]
  const upperPose = poses[upperPosition + 3]
  const mix = (key) => lowerPose[key] + (upperPose[key] - lowerPose[key]) * progress

  return {
    x: mix('x'),
    y: mix('y'),
    scale: mix('scale'),
    rotate: mix('rotate'),
    opacity: mix('opacity'),
    brightness: mix('brightness'),
    zIndex: Math.round(10 - Math.abs(boundedPosition) * 2),
  }
}

function getPracticeDeckCardStyle(relative, variant, dragX = 0) {
  const swipeDistance = variant === 'recommendation' ? MOBILE_RECOMMENDATION_SWIPE_DISTANCE : PRACTICE_DECK_SWIPE_DISTANCE
  const dragProgress = dragX / swipeDistance
  const pose = interpolatePracticeDeckPose(relative + dragProgress, variant)

  return {
    '--practice-deck-x':
      variant === 'recommendation'
        ? `calc(var(--mobile-recommendation-step) * ${pose.x / MOBILE_RECOMMENDATION_SWIPE_DISTANCE})`
        : `${pose.x}px`,
    '--practice-deck-y': `${pose.y}px`,
    '--practice-deck-scale': pose.scale,
    '--practice-deck-rotation': `${pose.rotate}deg`,
    '--practice-deck-opacity': pose.opacity,
    '--practice-deck-z': pose.zIndex,
  }
}

function applyPracticeDeckDragStyles(container, dragX, variant) {
  if (!container) return

  container.querySelectorAll('[data-practice-relative]').forEach((element) => {
    const relative = Number(element.dataset.practiceRelative)
    const style = getPracticeDeckCardStyle(relative, variant, dragX)
    Object.entries(style).forEach(([property, value]) => element.style.setProperty(property, value))
  })
}

const HEATMAP_BASE_COLS = 13
const HEATMAP_BASE_ROWS = 9
const HEATMAP_CELL_WIDTH = 100
const HEATMAP_CELL_HEIGHT = 78
const HEATMAP_SCHEME_TARGETS = {
  scheme4: { cellWidth: HEATMAP_CELL_WIDTH, cellHeight: HEATMAP_CELL_HEIGHT },
  scheme5: { cellWidth: 84, cellHeight: 64 },
}
const SENDER_TEXTAREA_MIN_HEIGHT = 60
const SENDER_TEXTAREA_MAX_HEIGHT = 144
const SENDER_MENTION_PANEL_MAX_HEIGHT = 450

const SENDER_MENTION_CONNECTOR_GROUPS = [
  {
    label: '***_01',
    items: [
      {
        id: 'connector-01-file-1',
        label: '这是文件名称_01.pdf',
        icon: menuFineBiImage,
      },
    ],
  },
  {
    label: '***_02',
    items: [
      {
        id: 'connector-02-file-1',
        label: '这是文件名称_01.pdf',
        icon: menuFineReportImage,
      },
    ],
  },
]

const SENDER_MENTION_FALLBACK_UPLOADS = [
  { id: 'fallback-upload-1', label: '市场调研报告_01.doc', icon: uploadDocImage, sessionFileId: null },
  { id: 'fallback-upload-2', label: '金融行业BI软件市场调研报告_01.md', icon: uploadMdImage, sessionFileId: 'md-1' },
]

const SENDER_MENTION_FALLBACK_OUTPUTS = [
  { id: 'fallback-output-1', label: 'chat_main_01.pdf', icon: outputFilePdfImage, sessionFileId: 'html-1' },
  { id: 'fallback-output-2', label: '经营分析结果_01.pptx', icon: outputFilePptImage, sessionFileId: 'md-1' },
]

const DEFAULT_COMPOSER_SEGMENTS = [{ type: 'text', value: '' }]
const COMPOSER_CURSOR_ZWSP = '\u200B'

const stripComposerCursorPlaceholder = (value) => (value ?? '').replace(/\u200B/g, '')

const plainOffsetToDomOffset = (raw, plainOffset) => {
  let plain = 0
  for (let dom = 0; dom < raw.length; dom += 1) {
    if (raw[dom] === COMPOSER_CURSOR_ZWSP) continue
    if (plain === plainOffset) return dom
    plain += 1
  }
  return raw.length
}

const ensureComposerEditAnchors = (segments) => {
  if (!segments.length) return DEFAULT_COMPOSER_SEGMENTS

  const result = []
  segments.forEach((segment, index) => {
    if (index > 0 && segment.type === 'ref' && result[result.length - 1]?.type === 'ref') {
      result.push({ type: 'text', value: COMPOSER_CURSOR_ZWSP })
    }
    result.push(segment)
  })

  if (result[0]?.type === 'ref') {
    result.unshift({ type: 'text', value: COMPOSER_CURSOR_ZWSP })
  }
  if (result[result.length - 1]?.type === 'ref') {
    result.push({ type: 'text', value: COMPOSER_CURSOR_ZWSP })
  }

  return result
}

const normalizeComposerSegments = (state) => {
  if (state?.composerSegments?.length) return state.composerSegments
  if (state?.inputText) return [{ type: 'text', value: state.inputText }]
  return DEFAULT_COMPOSER_SEGMENTS
}

const mergeAdjacentComposerTextSegments = (segments) => {
  const merged = []
  segments.forEach((segment) => {
    if (segment.type === 'text') {
      const last = merged[merged.length - 1]
      if (last?.type === 'text') {
        last.value += segment.value
        return
      }
      if (!segment.value) return
    }
    merged.push(segment)
  })

  const base = merged.length ? merged : DEFAULT_COMPOSER_SEGMENTS
  const sanitized = []

  base.forEach((segment, index) => {
    if (segment.type === 'ref') {
      sanitized.push(segment)
      return
    }

    let value = stripComposerCursorPlaceholder(segment.value)
    const prev = sanitized[sanitized.length - 1]
    const next = base[index + 1]

    if (index === 0) {
      value = value.replace(/^\s+/, '')
    } else if (prev?.type === 'ref') {
      value = value.replace(/^\s+/, '')
    }

    if (next?.type === 'ref') {
      value = value.replace(/\s+$/, '')
    }

    if (!value) {
      if (prev?.type === 'ref' && next?.type === 'ref') return
      return
    }

    const last = sanitized[sanitized.length - 1]
    if (last?.type === 'text') {
      last.value += value
      return
    }
    sanitized.push({ type: 'text', value })
  })

  const mergedSegments = sanitized.length ? sanitized : DEFAULT_COMPOSER_SEGMENTS
  return ensureComposerEditAnchors(mergedSegments)
}

const getComposerPlainText = (segments) =>
  normalizeComposerSegments({ composerSegments: segments })
    .map((segment) =>
      segment.type === 'ref' ? segment.label : stripComposerCursorPlaceholder(segment.value),
    )
    .join('')

const getComposerHasContent = (segments) => {
  const normalized = normalizeComposerSegments({ composerSegments: segments })
  return normalized.some((segment) =>
    segment.type === 'ref' ? true : stripComposerCursorPlaceholder(segment.value).trim().length > 0,
  )
}

const createComposerRefSegment = (item) => ({
  type: 'ref',
  id: `ref-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  fileId: item.sessionFileId ?? null,
  label: item.label,
  icon: item.icon,
})

const insertRefIntoComposerSegments = (segments, mentionStart, mentionEnd, refSegment) => {
  const normalized = normalizeComposerSegments({ composerSegments: segments })
  const result = []
  let pos = 0
  let inserted = false

  normalized.forEach((segment) => {
    if (segment.type === 'ref') {
      result.push(segment)
      pos += segment.label.length
      return
    }

    const text = segment.value
    const segStart = pos
    const segEnd = pos + text.length

    if (!inserted && mentionStart >= segStart && mentionEnd <= segEnd) {
      const before = text.slice(0, mentionStart - segStart)
      const after = text.slice(mentionEnd - segStart)
      if (before) result.push({ type: 'text', value: before })
      result.push(refSegment)
      if (after) result.push({ type: 'text', value: after })
      inserted = true
    } else {
      result.push(segment)
    }

    pos = segEnd
  })

  if (!inserted) {
    result.push(refSegment)
  }

  return mergeAdjacentComposerTextSegments(result)
}

const removeComposerRefSegment = (segments, refId) =>
  mergeAdjacentComposerTextSegments(normalizeComposerSegments({ composerSegments: segments }).filter((segment) => segment.id !== refId))

const findSourceFileComposerRef = (segments, file) => {
  const normalized = normalizeComposerSegments({ composerSegments: segments })
  return (
    normalized.find(
      (segment) =>
        segment.type === 'ref' &&
        ((file.sessionFileId && segment.fileId === file.sessionFileId) ||
          segment.fileId === file.id ||
          segment.label === file.title),
    ) ?? null
  )
}

const appendComposerRefSegment = (segments, refSegment) => {
  const normalized = normalizeComposerSegments({ composerSegments: segments })
  const result = [...normalized]
  const last = result[result.length - 1]

  if (!result.length) {
    result.push(refSegment)
  } else if (last?.type === 'text') {
    const trimmed = last.value.replace(/\s+$/, '')
    if (trimmed) {
      result[result.length - 1] = { type: 'text', value: trimmed }
    } else {
      result.pop()
    }
    result.push(refSegment)
  } else if (last?.type === 'ref') {
    result.push(refSegment)
  } else {
    result.push(refSegment)
  }

  return mergeAdjacentComposerTextSegments(result)
}

const escapeComposerHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const buildComposerRefTagHtml = (segment) =>
  `<span class="sender-ref-tag" contenteditable="false" data-ref-id="${segment.id}" data-file-id="${segment.fileId ?? ''}" data-label="${escapeComposerHtml(segment.label)}" data-icon="${escapeComposerHtml(segment.icon)}"><img src="${escapeComposerHtml(segment.icon)}" alt="" class="sender-ref-tag__icon" /><button type="button" class="sender-ref-tag__remove" aria-label="删除引用"><span class="dora-icon sender-ref-tag__remove-icon" aria-hidden="true">${ICONS.close}</span></button><span class="sender-ref-tag__label" role="button" tabindex="-1">${escapeComposerHtml(segment.label)}</span></span>`

const buildComposerEditorHtml = (segments) => {
  const normalized = normalizeComposerSegments({ composerSegments: segments })
  let html = ''

  normalized.forEach((segment) => {
    if (segment.type === 'ref') {
      html += buildComposerRefTagHtml(segment)
      return
    }

    const raw = segment.value ?? ''
    const visible = stripComposerCursorPlaceholder(raw)
    if (!visible && !raw.includes(COMPOSER_CURSOR_ZWSP)) return

    const text = escapeComposerHtml(raw)
    html += `<span class="sender-composer-run">${text.replace(/\n/g, '<br>')}</span>`
  })

  if (!html) return ''

  return `<div class="sender-composer-inner">${html}</div>`
}

const parseComposerEditorToSegments = (root) => {
  const segments = []

  const appendText = (value) => {
    const cleaned = stripComposerCursorPlaceholder(value ?? '')
    if (!cleaned) return
    const last = segments[segments.length - 1]
    if (last?.type === 'text') {
      last.value += cleaned
      return
    }
    segments.push({ type: 'text', value: cleaned })
  }

  const walk = (node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        appendText(child.textContent ?? '')
        return
      }

      if (child.nodeType !== Node.ELEMENT_NODE) return

      if (child.classList.contains('sender-composer-gap')) {
        return
      }

      if (child.classList.contains('sender-composer-inner')) {
        walk(child)
        return
      }

      if (child.classList.contains('sender-composer-run')) {
        const runText = child.textContent ?? ''
        if (runText.includes('\n')) {
          runText.split('\n').forEach((line, index) => {
            if (index > 0) appendText('\n')
            appendText(line)
          })
        } else {
          appendText(runText)
        }
        return
      }

      if (child.classList.contains('sender-ref-tag')) {
        const labelNode = child.querySelector('.sender-ref-tag__label')
        segments.push({
          type: 'ref',
          id: child.dataset.refId ?? `ref-${Date.now()}`,
          fileId: child.dataset.fileId || null,
          label: child.dataset.label ?? labelNode?.textContent ?? '',
          icon: child.dataset.icon ?? '',
        })
        return
      }

      if (child.tagName === 'BR') {
        appendText('\n')
        return
      }

      if (child.tagName === 'DIV' || child.tagName === 'P') {
        walk(child)
        appendText('\n')
        return
      }

      walk(child)
    })
  }

  walk(root)
  return mergeAdjacentComposerTextSegments(segments.length ? segments : DEFAULT_COMPOSER_SEGMENTS)
}

const measureComposerFragmentLength = (node) => {
  if (!node) return 0

  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return Array.from(node.childNodes).reduce((sum, child) => sum + measureComposerFragmentLength(child), 0)
  }

  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentElement?.closest('.sender-ref-tag')) return 0
    return stripComposerCursorPlaceholder(node.textContent ?? '').length
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return 0

  if (node.classList?.contains('sender-composer-gap')) {
    return 0
  }

  if (node.classList?.contains('sender-composer-inner')) {
    return Array.from(node.childNodes).reduce((sum, child) => sum + measureComposerFragmentLength(child), 0)
  }

  if (node.classList?.contains('sender-composer-run')) {
    return stripComposerCursorPlaceholder(node.textContent ?? '').length
  }

  if (node.classList?.contains('sender-ref-tag')) {
    return node.dataset.label?.length ?? node.querySelector('.sender-ref-tag__label')?.textContent?.length ?? 0
  }

  return Array.from(node.childNodes).reduce((sum, child) => sum + measureComposerFragmentLength(child), 0)
}

const getComposerSelectionOffset = (root) => {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return 0

  const range = selection.getRangeAt(0)
  if (!root.contains(range.startContainer)) return 0

  const measureRange = document.createRange()
  measureRange.selectNodeContents(root)
  measureRange.setEnd(range.startContainer, range.startOffset)
  return measureComposerFragmentLength(measureRange.cloneContents())
}

const setComposerSelectionToEnd = (root) => {
  const selection = window.getSelection()
  if (!selection) return

  const inner = root.querySelector?.('.sender-composer-inner') ?? root
  const range = document.createRange()
  range.selectNodeContents(inner)
  range.collapse(false)
  selection.removeAllRanges()
  selection.addRange(range)
}

const setComposerSelectionOffset = (root, offset) => {
  const selection = window.getSelection()
  if (!selection) return

  const plainLength = getComposerPlainText(parseComposerEditorToSegments(root)).length
  if (offset >= plainLength) {
    setComposerSelectionToEnd(root)
    return
  }

  let remaining = offset
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      if (node.parentElement?.closest('.sender-ref-tag')) {
        return NodeFilter.FILTER_REJECT
      }
      return NodeFilter.FILTER_ACCEPT
    },
  })
  let node = walker.nextNode()

  while (node) {
    const raw = node.textContent ?? ''
    const visibleLength = stripComposerCursorPlaceholder(raw).length
    const length = visibleLength || (raw.includes(COMPOSER_CURSOR_ZWSP) ? 1 : 0)
    if (remaining <= length) {
      const range = document.createRange()
      const localOffset = visibleLength ? plainOffsetToDomOffset(raw, remaining) : raw.length
      range.setStart(node, localOffset)
      range.collapse(true)
      selection.removeAllRanges()
      selection.addRange(range)
      return
    }
    remaining -= length
    node = walker.nextNode()
  }

  setComposerSelectionToEnd(root)
}

const getActiveSenderMention = (text, cursor) => {
  const before = text.slice(0, cursor)
  const atIndex = before.lastIndexOf('@')
  if (atIndex === -1) return null

  const query = before.slice(atIndex + 1)
  if (/[\s\n]/.test(query)) return null

  return { start: atIndex, query }
}

const filterSenderMentionItems = (items, query) => {
  const keyword = query.trim().toLowerCase()
  if (!keyword) return items
  return items.filter((item) => item.label.toLowerCase().includes(keyword))
}

const buildSenderMentionGroups = ({ composerFiles, sessionOutputFiles, query }) => {
  const uploadFromComposer = (composerFiles ?? [])
    .filter((file) => file.status === 'done')
    .map((file) => ({
      id: `composer-${file.id}`,
      label: file.name,
      icon: file.icon,
      sessionFileId: `upload-${file.id}`,
    }))
  const uploadItems = filterSenderMentionItems(
    uploadFromComposer.length ? uploadFromComposer : SENDER_MENTION_FALLBACK_UPLOADS,
    query,
  )

  const outputFromSession = (sessionOutputFiles ?? []).map((file) => ({
    id: `output-${file.id}`,
    label: file.title,
    icon: file.icon,
    sessionFileId: file.id,
  }))
  const outputItems = filterSenderMentionItems(
    outputFromSession.length ? outputFromSession : SENDER_MENTION_FALLBACK_OUTPUTS,
    query,
  )

  const groups = []
  if (uploadItems.length) {
    groups.push({ label: '上传文件', items: uploadItems })
  }

  SENDER_MENTION_CONNECTOR_GROUPS.forEach((connectorGroup) => {
    const items = filterSenderMentionItems(connectorGroup.items, query)
    if (items.length) {
      groups.push({ label: connectorGroup.label, items })
    }
  })

  if (outputItems.length) {
    groups.push({ label: '产物', items: outputItems })
  }

  return groups
}

const flattenSenderMentionGroups = (groups) => groups.flatMap((group) => group.items.map((item) => ({ ...item, groupLabel: group.label })))

const getBiAttachMenuItemById = (assetType) => BI_ATTACH_MENU_ITEMS.find((item) => item.id === assetType) ?? null

const getAttachConnectModalTitle = (assetType, fallbackTitle = '添加 FineBI 资产') => {
  const assetItem = getBiAttachMenuItemById(assetType)
  return assetItem ? `添加${assetItem.label}` : fallbackTitle
}

const renderSenderMentionLabel = (label, query) => {
  if (!query) return label

  const lowerLabel = label.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const matchIndex = lowerLabel.indexOf(lowerQuery)
  if (matchIndex === -1) return label

  return (
    <>
      {label.slice(0, matchIndex)}
      <span className="sender-mention-panel__highlight">{label.slice(matchIndex, matchIndex + query.length)}</span>
      {label.slice(matchIndex + query.length)}
    </>
  )
}
const UPLOAD_PROGRESS_INTERVAL_MS = 80

const BI_ATTACH_MENU_ITEMS = [
  { id: 'analysis-theme', label: '分析主题', image: fineBiAnalysisThemeImage, accent: 'analysis' },
  { id: 'dashboard', label: '仪表板', image: fineBiDashboardImage, accent: 'dashboard' },
  { id: 'model-metric-set', label: '模型指标集', image: fineBiModelMetricSetImage, accent: 'metrics' },
  { id: 'dataset', label: '数据集', image: fineBiDatasetImage, accent: 'dataset' },
]

const ATTACH_CONNECT_OWNER_SEGMENTS = [
  { id: 'mine', label: '我的' },
  { id: 'user', label: '用户的' },
]

const ATTACH_CONNECT_ANALYSIS_THEME_TREE_NODES = [
  {
    id: 'root',
    label: '全部数据',
    kind: 'root',
    children: [
      { id: 'topic-a', label: '分析主题A', kind: 'leaf' },
      { id: 'topic-b', label: '分析主题B的名称很长', kind: 'leaf' },
      {
        id: 'folder-1',
        label: '文件夹1',
        kind: 'folder',
        children: [
          { id: 'folder-1-topic-1', label: '分析主题1', kind: 'leaf' },
          { id: 'folder-1-topic-2', label: '节点名称2', kind: 'leaf' },
        ],
      },
      {
        id: 'folder-2',
        label: '文件夹2',
        kind: 'folder',
        children: [
          { id: 'folder-2-topic-1', label: '分析主题3', kind: 'leaf' },
          { id: 'folder-2-topic-2', label: '分析主题分析主题', kind: 'leaf' },
        ],
      },
      { id: 'folder-3', label: '文件夹3的名称很长很长', kind: 'folder' },
    ],
  },
]

const ATTACH_CONNECT_ANALYSIS_THEME_USER_TREE_NODES = [
  {
    id: 'root',
    label: '全部数据',
    kind: 'root',
    children: [
      { id: 'topic-a', label: '用户的分析主题A', kind: 'leaf' },
      { id: 'topic-b', label: '用户的分析主题B的名称很长', kind: 'leaf' },
      {
        id: 'folder-1',
        label: '用户文件夹1',
        kind: 'folder',
        children: [
          { id: 'folder-1-topic-1', label: '用户分析主题1', kind: 'leaf' },
          { id: 'folder-1-topic-2', label: '用户节点名称2', kind: 'leaf' },
        ],
      },
      {
        id: 'folder-2',
        label: '用户文件夹2',
        kind: 'folder',
        children: [
          { id: 'folder-2-topic-1', label: '用户分析主题3', kind: 'leaf' },
          { id: 'folder-2-topic-2', label: '用户分析主题分析主题', kind: 'leaf' },
        ],
      },
      { id: 'folder-3', label: '用户文件夹3的名称很长很长', kind: 'folder' },
    ],
  },
]

const ATTACH_CONNECT_DASHBOARD_TREE_NODES = [
  {
    id: 'root',
    label: '全部数据',
    kind: 'root',
    children: [
      { id: 'topic-a', label: '经营总览仪表板', kind: 'leaf' },
      { id: 'topic-b', label: '销售运营分析仪表板名称很长', kind: 'leaf' },
      {
        id: 'folder-1',
        label: '文件夹1',
        kind: 'folder',
        children: [
          { id: 'folder-1-topic-1', label: '区域经营仪表板', kind: 'leaf' },
          { id: 'folder-1-topic-2', label: '门店营收驾驶舱', kind: 'leaf' },
        ],
      },
      {
        id: 'folder-2',
        label: '文件夹2',
        kind: 'folder',
        children: [
          { id: 'folder-2-topic-1', label: '供应链监控仪表板', kind: 'leaf' },
          { id: 'folder-2-topic-2', label: '用户增长分析仪表板', kind: 'leaf' },
        ],
      },
      { id: 'folder-3', label: '文件夹3的名称很长很长', kind: 'folder' },
    ],
  },
]

const ATTACH_CONNECT_MODEL_METRIC_SET_TREE_NODES = [
  {
    id: 'root',
    label: '全部数据',
    kind: 'root',
    children: [
      { id: 'topic-a', label: '经营分析模型指标集', kind: 'leaf' },
      { id: 'topic-b', label: '销售预测模型指标集名称很长', kind: 'leaf' },
      {
        id: 'folder-1',
        label: '文件夹1',
        kind: 'folder',
        children: [
          { id: 'folder-1-topic-1', label: '门店运营指标集', kind: 'leaf' },
          { id: 'folder-1-topic-2', label: '利润分析指标集', kind: 'leaf' },
        ],
      },
      {
        id: 'folder-2',
        label: '文件夹2',
        kind: 'folder',
        children: [
          { id: 'folder-2-topic-1', label: '库存周转指标集', kind: 'leaf' },
          { id: 'folder-2-topic-2', label: '会员增长指标集', kind: 'leaf' },
        ],
      },
      { id: 'folder-3', label: '文件夹3的名称很长很长', kind: 'folder' },
    ],
  },
]

const ATTACH_CONNECT_DATASET_TREE_NODES = [
  {
    id: 'root',
    label: '全部数据',
    kind: 'root',
    children: [
      { id: 'topic-a', label: '销售明细数据集', kind: 'leaf' },
      { id: 'topic-b', label: '经营指标汇总数据集名称很长', kind: 'leaf' },
      {
        id: 'folder-1',
        label: '文件夹1',
        kind: 'folder',
        children: [
          { id: 'folder-1-topic-1', label: '区域营收数据集', kind: 'leaf' },
          { id: 'folder-1-topic-2', label: '会员行为数据集', kind: 'leaf' },
        ],
      },
      {
        id: 'folder-2',
        label: '文件夹2',
        kind: 'folder',
        children: [
          { id: 'folder-2-topic-1', label: '商品库存数据集', kind: 'leaf' },
          { id: 'folder-2-topic-2', label: '门店经营数据集', kind: 'leaf' },
        ],
      },
      { id: 'folder-3', label: '文件夹3的名称很长很长', kind: 'folder' },
    ],
  },
]

const ATTACH_CONNECT_TREE_SCOPE_DEFAULTS = {
  mine: {
    checkedIds: ['topic-a', 'topic-b', 'folder-1-topic-1', 'folder-3'],
    expandedIds: ['root', 'folder-1', 'folder-2'],
    activeId: 'topic-b',
  },
  user: {
    checkedIds: ['topic-a', 'folder-1-topic-1', 'folder-2-topic-2'],
    expandedIds: ['root', 'folder-1', 'folder-2'],
    activeId: 'folder-2-topic-2',
  },
}

const ATTACH_CONNECT_SIDEBAR_WIDTH_DEFAULT = 220
const ATTACH_CONNECT_SIDEBAR_WIDTH_MIN = 180
const ATTACH_CONNECT_SIDEBAR_WIDTH_MAX = 360

const getAttachConnectTreeNodes = (assetType, ownerScope = 'mine') =>
  assetType === 'analysis-theme'
    ? ownerScope === 'user'
      ? ATTACH_CONNECT_ANALYSIS_THEME_USER_TREE_NODES
      : ATTACH_CONNECT_ANALYSIS_THEME_TREE_NODES
    : assetType === 'dashboard'
      ? ATTACH_CONNECT_DASHBOARD_TREE_NODES
      : assetType === 'model-metric-set'
        ? ATTACH_CONNECT_MODEL_METRIC_SET_TREE_NODES
        : assetType === 'dataset'
          ? ATTACH_CONNECT_DATASET_TREE_NODES
          : ATTACH_CONNECT_ANALYSIS_THEME_TREE_NODES

const getAttachConnectScopeDefaults = (ownerScope = 'mine') =>
  ATTACH_CONNECT_TREE_SCOPE_DEFAULTS[ownerScope] ?? ATTACH_CONNECT_TREE_SCOPE_DEFAULTS.mine

const getAttachConnectLeafNodeIds = (nodes) =>
  nodes.flatMap((node) => {
    if (node.children?.length) return getAttachConnectLeafNodeIds(node.children)
    return node.kind === 'root' ? [] : [node.id]
  })

const findAttachConnectTreeNode = (nodes, nodeId) => {
  for (const node of nodes) {
    if (node.id === nodeId) return node
    if (node.children?.length) {
      const childMatch = findAttachConnectTreeNode(node.children, nodeId)
      if (childMatch) return childMatch
    }
  }

  return null
}

const getAttachConnectCheckTargetIds = (node) => {
  if (!node) return []
  if (!node.children?.length) return node.kind === 'root' ? [] : [node.id]

  return node.children.flatMap((child) => getAttachConnectCheckTargetIds(child))
}

const getAttachConnectCheckState = (node, checkedIds) => {
  const targetIds = getAttachConnectCheckTargetIds(node)
  if (!targetIds.length) return 'unchecked'

  const checkedCount = targetIds.filter((id) => checkedIds.has(id)).length
  if (checkedCount === 0) return 'unchecked'
  if (checkedCount === targetIds.length) return 'checked'
  return 'indeterminate'
}

const updateAttachConnectCheckedIds = (checkedIds, node, shouldSelect) => {
  const targetIds = getAttachConnectCheckTargetIds(node)
  if (!targetIds.length) return checkedIds

  const next = new Set(checkedIds)
  targetIds.forEach((id) => {
    if (shouldSelect) {
      next.add(id)
    } else {
      next.delete(id)
    }
  })

  return next
}

const filterAttachConnectTreeNodes = (nodes, query) => {
  if (!query) return nodes

  return nodes.reduce((acc, node) => {
    const nextChildren = node.children?.length ? filterAttachConnectTreeNodes(node.children, query) : []
    const matchesSelf = node.label.toLowerCase().includes(query)
    const shouldKeep = node.kind === 'root' ? nextChildren.length > 0 : matchesSelf || nextChildren.length > 0

    if (shouldKeep) {
      acc.push(nextChildren.length ? { ...node, children: nextChildren } : node)
    }

    return acc
  }, [])
}

const ATTACH_CONNECT_DIMENSIONS = [
  { id: 'dim-1', label: '权限测试_销售运营分析情况汇总表' },
  { id: 'dim-2', label: '权限测试_经营指标汇总表' },
]

const ATTACH_CONNECT_ANALYSIS_THEME_DIMENSION_IMAGES = [
  sourceBiAnalysisStandardThemeImage,
  sourceBiAnalysisSelfServiceThemeImage,
]

const ATTACH_CONNECT_TABLE_COLUMNS = ['字段名称', '字段类型', '业务描述', '示例值', '备注']

const ATTACH_CONNECT_TABLE_ROWS = Array.from({ length: 13 }, (_, index) => ({
  id: `attach-connect-row-${index}`,
  cells: ['销售额', '数值', '订单销售金额', '128,900', index % 3 === 0 ? '—' : ''],
}))

function AttachConnectDetailViewIcon() {
  return <span className="dora-icon attach-connect-view-tabs__icon" aria-hidden="true">{'\ue7a9'}</span>
}

function AttachConnectStructureViewIcon() {
  return <span className="dora-icon attach-connect-view-tabs__icon" aria-hidden="true">{'\ue7b1'}</span>
}

const formatAttachmentFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const getUploadDuration = (sizeBytes) => {
  const kb = sizeBytes / 1024
  return Math.min(7500, Math.max(2000, 900 + kb * 55))
}

const getAttachmentFileIcon = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''

  switch (ext) {
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'mkv':
    case 'webm':
      return uploadVideoImage
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
    case 'bmp':
      return uploadImageImage
    case 'mp3':
    case 'wav':
    case 'flac':
    case 'aac':
    case 'm4a':
    case 'ogg':
      return uploadAudioImage
    case 'txt':
    case 'log':
      return uploadTxtImage
    case 'html':
    case 'htm':
      return uploadHtmlImage
    case 'doc':
    case 'docx':
      return uploadDocImage
    case 'xls':
    case 'xlsx':
    case 'csv':
      return uploadExcelImage
    case 'zip':
    case 'rar':
    case '7z':
      return uploadZipImage
    case 'pdf':
      return uploadPdfImage
    case 'md':
      return uploadMdImage
    case 'ppt':
    case 'pptx':
      return uploadPptImage
    case 'json':
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
      return uploadJsonImage
    default:
      return uploadUnknownImage
  }
}

const getAttachmentFileType = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'md') return 'md'
  if (ext === 'html' || ext === 'htm') return 'html'
  if (ext === 'ppt' || ext === 'pptx') return 'ppt'
  return 'md'
}

const mapComposerFilesToSessionUserFiles = (files = []) =>
  files.map((file) => ({
    id: file.id,
    name: file.name,
    size: formatAttachmentFileSize(file.size),
    icon: file.icon,
  }))

const createSessionTurn = ({
  id = `turn-${Date.now()}`,
  prompt = '',
  userFiles = [],
  sentAt = createSessionSentAt(),
  completedSessionMeta = null,
} = {}) => ({
  id,
  prompt,
  userFiles,
  sentAt,
  completedSessionMeta,
})

const buildLegacySessionTurns = ({
  id = `turn-${Date.now()}`,
  prompt = '',
  userFiles = [],
  sentAt = createSessionSentAt(),
  completedSessionMeta = null,
} = {}) => {
  if (!prompt && !userFiles.length) return []
  return [
    createSessionTurn({
      id,
      prompt,
      userFiles,
      sentAt,
      completedSessionMeta,
    }),
  ]
}

const getSessionTurnsFromHistoryItem = (item, userFiles = []) => {
  if (item?.sessionTurns?.length) return item.sessionTurns
  return buildLegacySessionTurns({
    id: `${item?.id ?? 'history'}-turn-1`,
    prompt: item?.label ?? '',
    userFiles,
    sentAt: item?.sentAt,
    completedSessionMeta: item?.completedSessionMeta ?? null,
  })
}

const getSessionTurnsFromState = (state) => {
  if (state?.activeSessionTurns?.length) return state.activeSessionTurns
  return buildLegacySessionTurns({
    id: `${state?.activeHistoryItemId ?? 'session'}-turn-1`,
    prompt: state?.activeSessionPrompt ?? '',
    userFiles: state?.activeSessionUserFiles ?? [],
    completedSessionMeta: state?.activeSessionCompletedMeta ?? null,
  })
}

const updateLastSessionTurn = (turns, updater) => {
  if (!turns.length) return turns
  return turns.map((turn, index) => (index === turns.length - 1 ? updater(turn) : turn))
}
const HEATMAP_RING_ALPHA = [0.32, 0.24, 0.16, 0.08, 0.04, 0.02, 0.01]
const HEATMAP_FADE_RADIUS = 7.5
const HEATMAP_CORNER_RADIUS = 9
const HEATMAP_TOKEN_REFS = {
  blue: { fill: '--dora-light-蓝色-6', dot: '--dora-light-蓝色-4', fallbackFill: '#2562FF', fallbackDot: '#99B5FF' },
  purple: { fill: '--dora-light-紫色-6', dot: '--dora-light-紫色-4', fallbackFill: '#8C5DF7', fallbackDot: '#BA9EFF' },
  cyan: { fill: '--dora-light-青色-6', dot: '--dora-light-青色-4', fallbackFill: '#00B0D4', fallbackDot: '#50DAF9' },
}
const HEATMAP_AUTO_MOTION = {
  edgePadding: 0.65,
  wR: (2 * Math.PI) / 12000,
  wC: (2 * Math.PI) / 16000,
  phaseOffset: Math.PI / 3,
}

const hexToRgb = (hex) => {
  const normalized = hex.trim().replace('#', '')
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized
  const numeric = Number.parseInt(value, 16)
  return [(numeric >> 16) & 255, (numeric >> 8) & 255, numeric & 255]
}

const getCssTokenRgb = (styles, tokenName, fallback) => hexToRgb(styles.getPropertyValue(tokenName) || fallback)

const getDefaultHeatmapTokenColors = () => ({
  blue: {
    fill: hexToRgb(HEATMAP_TOKEN_REFS.blue.fallbackFill),
    dot: hexToRgb(HEATMAP_TOKEN_REFS.blue.fallbackDot),
  },
  purple: {
    fill: hexToRgb(HEATMAP_TOKEN_REFS.purple.fallbackFill),
    dot: hexToRgb(HEATMAP_TOKEN_REFS.purple.fallbackDot),
  },
  cyan: {
    fill: hexToRgb(HEATMAP_TOKEN_REFS.cyan.fallbackFill),
    dot: hexToRgb(HEATMAP_TOKEN_REFS.cyan.fallbackDot),
  },
})

const getHeatmapTokenColors = () => {
  if (typeof window === 'undefined') return getDefaultHeatmapTokenColors()

  const styles = window.getComputedStyle(document.documentElement)
  return {
    blue: {
      fill: getCssTokenRgb(styles, HEATMAP_TOKEN_REFS.blue.fill, HEATMAP_TOKEN_REFS.blue.fallbackFill),
      dot: getCssTokenRgb(styles, HEATMAP_TOKEN_REFS.blue.dot, HEATMAP_TOKEN_REFS.blue.fallbackDot),
    },
    purple: {
      fill: getCssTokenRgb(styles, HEATMAP_TOKEN_REFS.purple.fill, HEATMAP_TOKEN_REFS.purple.fallbackFill),
      dot: getCssTokenRgb(styles, HEATMAP_TOKEN_REFS.purple.dot, HEATMAP_TOKEN_REFS.purple.fallbackDot),
    },
    cyan: {
      fill: getCssTokenRgb(styles, HEATMAP_TOKEN_REFS.cyan.fill, HEATMAP_TOKEN_REFS.cyan.fallbackFill),
      dot: getCssTokenRgb(styles, HEATMAP_TOKEN_REFS.cyan.dot, HEATMAP_TOKEN_REFS.cyan.fallbackDot),
    },
  }
}

const getHeatmapAnchors = (rows, cols, colors) => [
  { r: 0, c: 0, fill: colors.purple.fill, dot: colors.purple.dot },
  { r: rows - 1, c: 0, fill: colors.cyan.fill, dot: colors.cyan.dot },
  { r: 0, c: cols - 1, fill: colors.blue.fill, dot: colors.blue.dot },
  { r: rows - 1, c: cols - 1, fill: colors.blue.fill, dot: colors.blue.dot },
]

const smoothHeatmapValue = (value) => {
  const x = Math.max(0, Math.min(1, value))
  return x * x * (3 - 2 * x)
}

const getHeatmapRingAlpha = (distance) => {
  if (distance <= 0) return HEATMAP_RING_ALPHA[0]
  const index = Math.floor(distance)
  const fraction = distance - index
  const current = index < HEATMAP_RING_ALPHA.length ? HEATMAP_RING_ALPHA[index] : 0
  const next = index + 1 < HEATMAP_RING_ALPHA.length ? HEATMAP_RING_ALPHA[index + 1] : 0
  return current + (next - current) * fraction
}

const getHeatmapField = (r, c, rows, cols, colors) => {
  let weightSum = 0
  let strength = 0
  let fillR = 0
  let fillG = 0
  let fillB = 0
  let dotR = 0
  let dotG = 0
  let dotB = 0

  getHeatmapAnchors(rows, cols, colors).forEach((anchor) => {
    const weight = smoothHeatmapValue(1 - Math.hypot(r - anchor.r, c - anchor.c) / HEATMAP_CORNER_RADIUS)
    if (weight <= 0) return
    weightSum += weight
    strength = Math.max(strength, weight)
    fillR += weight * anchor.fill[0]
    fillG += weight * anchor.fill[1]
    fillB += weight * anchor.fill[2]
    dotR += weight * anchor.dot[0]
    dotG += weight * anchor.dot[1]
    dotB += weight * anchor.dot[2]
  })

  if (weightSum === 0) {
    return { fill: colors.blue.fill, dot: colors.blue.dot, strength: 0 }
  }

  return {
    fill: [fillR / weightSum, fillG / weightSum, fillB / weightSum],
    dot: [dotR / weightSum, dotG / weightSum, dotB / weightSum],
    strength,
  }
}

const formatHeatmapRgba = (color, alpha) => `rgba(${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(color[2])}, ${alpha})`

const createHeatmapCells = (rows, cols, colors) =>
  Array.from({ length: rows * cols }, (_, index) => {
    const r = Math.floor(index / cols)
    const c = index % cols
    return {
      id: `${r}-${c}`,
      r,
      c,
      field: getHeatmapField(r, c, rows, cols, colors),
    }
  })

const getHeatmapLayout = (width, height, scheme = 'scheme4') => {
  const target = HEATMAP_SCHEME_TARGETS[scheme] ?? HEATMAP_SCHEME_TARGETS.scheme4
  const cols = width ? Math.max(1, Math.ceil(width / target.cellWidth)) : HEATMAP_BASE_COLS
  const rows = height ? Math.max(1, Math.ceil(height / target.cellHeight)) : HEATMAP_BASE_ROWS
  const cellWidth = width ? width / cols : target.cellWidth
  const cellHeight = height ? height / rows : target.cellHeight

  return {
    rows,
    cols,
    cellWidth,
    cellHeight,
  }
}

const getHeatmapDefaultFocus = (rows, cols, scheme) =>
  scheme === 'scheme5'
    ? { r: (rows - 1) * 0.5, c: (cols - 1) * 0.5 }
    : { r: rows - 1, c: cols - 1 }

const getHeatmapAutoPhaseForPoint = (point, rows, cols) => {
  const rowCenter = (rows - 1) * 0.5
  const colCenter = (cols - 1) * 0.5
  const rowAmp = Math.max(0, rowCenter - HEATMAP_AUTO_MOTION.edgePadding)
  const colAmp = Math.max(0, colCenter - HEATMAP_AUTO_MOTION.edgePadding)
  const normalize = (value) => Math.max(-1, Math.min(1, value))

  return {
    r: rowAmp ? Math.asin(normalize((point.r - rowCenter) / rowAmp)) : 0,
    c: colAmp ? Math.asin(normalize((point.c - colCenter) / colAmp)) : 0,
  }
}

const highlightSearchText = (text, keyword) => {
  const query = keyword.trim()
  if (!query) return text

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const parts = []
  let start = 0
  let matchIndex = lowerText.indexOf(lowerQuery, start)

  while (matchIndex !== -1) {
    if (matchIndex > start) {
      parts.push(text.slice(start, matchIndex))
    }
    parts.push(
      <mark key={`${matchIndex}-${start}`} className="search-highlight">
        {text.slice(matchIndex, matchIndex + query.length)}
      </mark>,
    )
    start = matchIndex + query.length
    matchIndex = lowerText.indexOf(lowerQuery, start)
  }

  if (start < text.length) {
    parts.push(text.slice(start))
  }

  return parts.length ? parts : text
}

const LIBRARY_FILTER_OPTIONS = [
  { value: 'all', label: '全部类型' },
  { value: 'xls', label: 'Excel' },
  { value: 'html', label: 'HTML' },
  { value: 'md', label: 'Markdown' },
  { value: 'ppt', label: 'PPT' },
  { value: 'pdf', label: 'PDF' },
  { value: 'doc', label: 'Word' },
  { value: 'txt', label: 'TXT' },
  { value: 'image', label: '图片' },
]

const MOBILE_LIBRARY_FILTER_OPTIONS = [
  { value: 'all', label: '全部' },
  { value: 'spreadsheet', label: '表格' },
  { value: 'document', label: '文稿' },
  { value: 'webpage', label: '网页' },
  { value: 'image', label: '图像' },
  { value: 'other', label: '其他' },
]

const SESSION_FILES_OUTPUT_FILTER_OPTIONS = [
  { value: 'all', label: '全部' },
  { value: 'spreadsheet', label: '表格', types: ['xls', 'xlsx', 'csv'] },
  { value: 'document', label: '文稿', types: ['md', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt'] },
  { value: 'webpage', label: '网页', types: ['html', 'htm'] },
  { value: 'image', label: '图像', types: ['image'] },
  { value: 'skill', label: '技能包', types: ['skill'] },
  { value: 'other', label: '其他', types: ['other', 'zip', 'unknown'] },
]

const getSessionOutputFileFilterCategory = (fileType) => {
  for (const option of SESSION_FILES_OUTPUT_FILTER_OPTIONS) {
    if (option.value === 'all' || !option.types) continue
    if (option.types.includes(fileType)) return option.value
  }

  return 'other'
}

const matchesSessionOutputFileFilter = (fileType, filterValue) => {
  if (filterValue === 'all') return true
  return getSessionOutputFileFilterCategory(fileType) === filterValue
}

const SESSION_FILES_SOURCE_SCOPE_OPTIONS = [
  { value: 'session', label: '本次会话' },
  { value: 'existing', label: '已有数据' },
]

const SESSION_FILES_SOURCE_FILE_SIZE = '161.17 KB'

const isSessionSourceSpreadsheetFile = (file) => {
  const ext = file.title.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') return true
  return file.icon === connectorExcelExtractImage || file.icon === builtinExcelFileImage
}

const SESSION_FILES_SOURCE_SECTIONS = [
  {
    id: 'local',
    title: '本地文件',
    addable: true,
    files: [
      {
        id: 'src-local-1',
        title: '市场调研报告.pdf',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('市场调研报告.pdf'),
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-local-2',
        title: '金融行业BI软件市场调研报告.md',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('金融行业BI软件市场调研报告.md'),
        sessionFileId: 'md-1',
        scopes: ['session'],
      },
      {
        id: 'src-local-3',
        title: '演示方案总结.pptx',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('演示方案总结.pptx'),
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-local-4',
        title: '客户名单.docx',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('客户名单.docx'),
        scopes: ['session'],
      },
      {
        id: 'src-local-5',
        title: 'ROI分析表.xlsx',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('ROI分析表.xlsx'),
        scopes: ['existing'],
      },
      {
        id: 'src-local-6',
        title: '页面模板.html',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('页面模板.html'),
        sessionFileId: 'html-1',
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-local-7',
        title: '访谈录音.mp3',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('访谈录音.mp3'),
        scopes: ['session'],
      },
      {
        id: 'src-local-8',
        title: '宣传片.mp4',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('宣传片.mp4'),
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-local-9',
        title: '产品截图.png',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('产品截图.png'),
        scopes: ['session'],
      },
      {
        id: 'src-local-10',
        title: '会议纪要.txt',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('会议纪要.txt'),
        scopes: ['existing'],
      },
      {
        id: 'src-local-11',
        title: '历史归档.zip',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('历史归档.zip'),
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-local-12',
        title: '临时附件.unknown',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('临时附件.unknown'),
        scopes: ['existing'],
      },
      {
        id: 'src-local-13',
        title: '销售明细.xlsx',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: getAttachmentFileIcon('销售明细.xlsx'),
        scopes: ['session'],
      },
    ],
  },
  {
    id: 'connector-01',
    title: '连接器「***_01」',
    addable: true,
    files: [
      {
        id: 'src-c1-1',
        title: '连接器输出报告',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: connectorBiAnalysisStandardImage,
        sessionFileId: 'md-1',
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-c1-3',
        title: '连接器归档',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: connectorBiCatalogImage,
        scopes: ['session', 'existing'],
      },
    ],
  },
  {
    id: 'connector-02',
    title: '连接器「***_02」',
    addable: true,
    files: [
      {
        id: 'src-c2-1',
        title: '连接器快照',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: connectorBiAnalysisSelfServiceImage,
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-c2-2',
        title: '素材包',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: connectorBusinessModelExtractImage,
        scopes: ['existing'],
      },
    ],
  },
  {
    id: 'agent-builtin',
    title: 'Agent 内置数据',
    variant: 'builtin',
    files: [
      {
        id: 'builtin-1',
        title: '分析主题-来源BI我的分析',
        icon: builtinAnalysisThemeImage,
        scopes: ['session'],
      },
      {
        id: 'builtin-2',
        title: '分析主题-来源BI我的分析111',
        icon: builtinAnalysisThemeImage,
        scopes: ['session'],
      },
      {
        id: 'builtin-3',
        title: '仪表板-来源BI目录',
        icon: builtinDashboardCatalogImage,
        scopes: ['session'],
      },
      {
        id: 'builtin-4',
        title: '数据集_来源BI数据目录',
        icon: builtinDatasetCatalogImage,
        scopes: ['session'],
      },
      {
        id: 'builtin-5',
        title: '模型指标集_来源BI数据集',
        icon: builtinModelMetricsImage,
        scopes: ['session'],
      },
    ],
  },
]

const SESSION_FILES_EXISTING_DATA = [
  {
    id: 'existing-public',
    title: '公共',
    groups: [
      {
        id: 'existing-public-all',
        path: '全部数据',
        items: [
          { id: 'existing-public-1', title: '标准分析主题', icon: menuFineBiImage },
          { id: 'existing-public-2', title: '自助分析主题', icon: btnBiImage },
          { id: 'existing-public-3', title: '仪表板', icon: menuFineReportImage },
        ],
      },
      {
        id: 'existing-public-folder3',
        path: '全部数据/文件夹3的名称也很长很长很长很长很长很长很长很长...',
        items: [
          { id: 'existing-public-4', title: '自助分析主题', icon: btnBiImage },
          { id: 'existing-public-5', title: '标准分析主题', icon: menuFineBiImage },
          { id: 'existing-public-6', title: '仪表板', icon: menuFineReportImage },
        ],
      },
    ],
  },
  {
    id: 'existing-mine',
    title: '我的',
    groups: [
      {
        id: 'existing-mine-folder1',
        path: '全部数据/文件夹1',
        items: [
          { id: 'existing-mine-1', title: '自助分析主题', icon: btnBiImage },
          { id: 'existing-mine-2', title: '仪表板', icon: menuFineReportImage },
        ],
      },
      {
        id: 'existing-mine-folder212123',
        path: '全部数据/文件夹212123',
        items: [{ id: 'existing-mine-3', title: '标准分析主题', icon: menuFineBiImage }],
      },
    ],
  },
]

const SESSION_FILES_OUTPUT_ITEMS = [
  {
    id: 'skill-1',
    type: 'skill',
    title: '这是生成的*****技能名称',
    desc: '这里是描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
    icon: outputSkillImage,
  },
  {
    id: 'html-1',
    type: 'html',
    title: '这是一篇报告的名称.html',
    desc: '这里是描述描述描述描述描述描述',
    icon: outputFileHtmlImage,
  },
  {
    id: 'ppt-1',
    type: 'ppt',
    title: '这是ppt文档.ppt',
    desc: '12.45 KB',
    icon: outputFilePptImage,
  },
  {
    id: 'md-1',
    type: 'md',
    title: '国内金融行业商业智能软件市场调研报告.md',
    desc: '12.45 KB',
    icon: outputFileMdImage,
  },
  {
    id: 'excel-1',
    type: 'xls',
    title: '经营分析数据表.xlsx',
    desc: '12.45 KB',
    icon: outputFileExcelImage,
  },
  {
    id: 'pdf-1',
    type: 'pdf',
    title: '市场调研报告.pdf',
    desc: '12.45 KB',
    icon: outputFilePdfImage,
  },
  {
    id: 'doc-1',
    type: 'doc',
    title: '客户分析报告.docx',
    desc: '12.45 KB',
    icon: outputFileDocImage,
  },
  {
    id: 'other-1',
    type: 'other',
    title: '配置说明.txt',
    desc: '12.45 KB',
    icon: outputFileOtherImage,
  },
  {
    id: 'image-1',
    type: 'image',
    title: '分析图表.png',
    desc: '12.45 KB',
    icon: outputFileImageImage,
  },
  {
    id: 'zip-1',
    type: 'zip',
    title: '附件资料包.zip',
    desc: '12.45 KB',
    icon: outputFileZipImage,
  },
  {
    id: 'unknown-1',
    type: 'unknown',
    title: '未知格式文件.xyz',
    desc: '12.45 KB',
    icon: outputFileUnknownImage,
  },
]

const resolveSessionSourceFileType = (file) => {
  if (file.sessionFileId) {
    const linkedOutput = SESSION_FILES_OUTPUT_ITEMS.find((item) => item.id === file.sessionFileId)
    if (linkedOutput) return linkedOutput.type
  }

  const ext = file.title.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') return 'xls'
  if (ext === 'pdf') return 'pdf'
  if (ext === 'doc' || ext === 'docx') return 'doc'
  if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif' || ext === 'webp') return 'image'
  if (file.icon === connectorExcelExtractImage) return 'xls'

  return getAttachmentFileType(file.title)
}

const getSessionFilePreviewMode = (file) => {
  if (file.type === 'xls' || file.type === 'xlsx' || file.type === 'csv') return 'spreadsheet'
  if (file.type === 'md') return 'markdown'
  if (file.type === 'html') return 'html-cover'
  if (file.type === 'image') return 'image-cover'
  if (file.type === 'unknown') return 'unsupported'
  return 'generic'
}

const createSessionSpreadsheetPreviewRows = (rowCount = 200) => {
  const rows = []
  let year = 2015
  let valueB = 0.15
  let valueC = 1.1

  for (let index = 0; index < rowCount; index += 1) {
    rows.push([String(year), valueB.toFixed(2), `${valueC.toFixed(1)}%`])
    year += 1

    if (index < 3) {
      valueB += 0.03
      valueC += 0.2
    } else if (index === 3) {
      valueB += 0.04
      valueC += 0.2
    } else {
      valueB += 0.05
      valueC += 0.3
    }
  }

  return rows
}

const SESSION_SOURCE_DOC_PREVIEW_PAGES = [
  sessionDocPage01Image,
  sessionDocPage02Image,
  sessionDocPage03Image,
  sessionDocPage04Image,
]

const SESSION_SOURCE_PDF_PREVIEW_PAGES = [
  sessionPdfPage01Image,
  sessionPdfPage02Image,
  sessionPdfPage02Image,
  sessionPdfPage02Image,
  sessionPdfPage02Image,
  sessionPdfPage02Image,
]

const SESSION_SOURCE_PDF_PAGE_COUNT = 20

const SESSION_SOURCE_PPT_PREVIEW_SLIDES = [
  sessionPptSlide01Image,
  sessionPptSlide02Image,
  sessionPptSlide03Image,
  sessionPptSlide04Image,
  sessionPptSlide05Image,
  sessionPptSlide06Image,
]

const SESSION_SOURCE_SPREADSHEET_PREVIEW = {
  previewLimit: 1000,
  sheets: [
    {
      id: 'sheet1',
      name: 'sheet1',
      columns: ['A', 'B', 'C'],
      rows: createSessionSpreadsheetPreviewRows(10),
      totalRows: 10,
    },
    {
      id: 'sheet22',
      name: 'sheet22',
      columns: ['A', 'B', 'C'],
      rows: createSessionSpreadsheetPreviewRows(10),
      totalRows: 10,
    },
    {
      id: 'sheet333',
      name: 'sheet333',
      columns: ['A', 'B', 'C'],
      rows: createSessionSpreadsheetPreviewRows(10),
      totalRows: 10,
    },
  ],
}

const formatSpreadsheetRowCount = (count) => count.toLocaleString('en-US')

const getSpreadsheetSheetById = (workbook, sheetId) =>
  workbook.sheets.find((sheet) => sheet.id === sheetId) ?? workbook.sheets[0]

const SESSION_MARKDOWN_DOWNLOAD_OPTIONS = [
  { id: 'markdown', label: 'Markdown', icon: outputFileMdImage, extension: 'md', mimeType: 'text/markdown;charset=utf-8' },
  { id: 'pdf', label: 'PDF', icon: outputFilePdfImage, extension: 'pdf', mimeType: 'application/pdf' },
  { id: 'word', label: 'WORD', icon: outputFileDocImage, extension: 'docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
]

const toSessionSourcePreviewFile = (file) => ({
  id: file.id,
  type: resolveSessionSourceFileType(file),
  title: file.title,
  desc: file.size ?? '来源文件',
  icon: file.icon,
})

const LIBRARY_ASSETS = {
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
  coverHtml: libraryCoverHtmlImage,
}

const OUTPUT_FILE_ASSETS = {
  skill: outputSkillImage,
  doc: outputFileDocImage,
  docx: outputFileDocImage,
  xls: outputFileExcelImage,
  xlsx: outputFileExcelImage,
  csv: outputFileExcelImage,
  html: outputFileHtmlImage,
  htm: outputFileHtmlImage,
  image: outputFileImageImage,
  png: outputFileImageImage,
  jpg: outputFileImageImage,
  jpeg: outputFileImageImage,
  gif: outputFileImageImage,
  webp: outputFileImageImage,
  svg: outputFileImageImage,
  bmp: outputFileImageImage,
  md: outputFileMdImage,
  markdown: outputFileMdImage,
  pdf: outputFilePdfImage,
  ppt: outputFilePptImage,
  pptx: outputFilePptImage,
  zip: outputFileZipImage,
  rar: outputFileZipImage,
  '7z': outputFileZipImage,
  tar: outputFileZipImage,
  gz: outputFileZipImage,
  txt: outputFileOtherImage,
  json: outputFileOtherImage,
  js: outputFileOtherImage,
  ts: outputFileOtherImage,
  jsx: outputFileOtherImage,
  tsx: outputFileOtherImage,
  xml: outputFileOtherImage,
  yaml: outputFileOtherImage,
  yml: outputFileOtherImage,
  other: outputFileOtherImage,
}

const getLibraryFileIcon = (type) => OUTPUT_FILE_ASSETS[type] ?? outputFileUnknownImage

const buildLibrarySourceOwner = (agentTitle, conversationTitle) => `${agentTitle}：${conversationTitle}`

const createLibraryItem = ({
  title,
  type,
  ownerIcon,
  cover,
  sourceHistoryId,
  sourceScope,
  sourceAgentTitle,
  sourceConversationTitle,
}) => ({
  title,
  owner: buildLibrarySourceOwner(sourceAgentTitle, sourceConversationTitle),
  subtitle: buildLibrarySourceOwner(sourceAgentTitle, sourceConversationTitle),
  type,
  ownerIcon,
  cover,
  sourceHistoryId,
  sourceScope,
  sourceAgentTitle,
  sourceConversationTitle,
})

const LIBRARY_ITEMS = [
  createLibraryItem({
    title: '销售预测系统.xls',
    type: 'xls',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover86,
    sourceHistoryId: 'library-source-history-1',
    sourceScope: 'experts',
    sourceAgentTitle: '财务小助手',
    sourceConversationTitle: '销售预测系统解读',
  }),
  createLibraryItem({
    title: '华润集团销售拓客速读.md',
    type: 'md',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover90,
    sourceHistoryId: 'library-source-history-2',
    sourceScope: 'experts',
    sourceAgentTitle: '产品小助手',
    sourceConversationTitle: '华润集团销售情况解读',
  }),
  createLibraryItem({
    title: '华润集团销售拓客速读.pptx',
    type: 'ppt',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover91,
    sourceHistoryId: 'library-source-history-3',
    sourceScope: 'dora',
    sourceAgentTitle: 'Dora',
    sourceConversationTitle: '风险营销系统复盘',
  }),
  createLibraryItem({
    title: '华润集团销售拓客速读.pdf',
    type: 'pdf',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover92,
    sourceHistoryId: 'library-source-history-4',
    sourceScope: 'experts',
    sourceAgentTitle: '财务小助手',
    sourceConversationTitle: '销售预测系统经营预测',
  }),
  createLibraryItem({
    title: '华润集团销售拓客速读.doc',
    type: 'doc',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover93,
    sourceHistoryId: 'library-source-history-5',
    sourceScope: 'experts',
    sourceAgentTitle: '产品小助手',
    sourceConversationTitle: '华润集团销售拓客速读',
  }),
  createLibraryItem({
    title: '华润集团销售拓客速读.txt',
    type: 'txt',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover94,
    sourceHistoryId: 'library-source-history-6',
    sourceScope: 'experts',
    sourceAgentTitle: '产品小助手',
    sourceConversationTitle: '产品架构说明',
  }),
  createLibraryItem({
    title: '华润集团销售拓客速读.html',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.coverHtml,
    sourceHistoryId: 'library-source-history-7',
    sourceScope: 'experts',
    sourceAgentTitle: '产品小助手',
    sourceConversationTitle: '产品架构说明',
  }),
  createLibraryItem({
    title: '华润集团销售拓客速读.png',
    type: 'image',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover95,
    sourceHistoryId: 'library-source-history-8',
    sourceScope: 'dora',
    sourceAgentTitle: 'Dora',
    sourceConversationTitle: '风险营销系统分析',
  }),
  createLibraryItem({
    title: '销售预测系统.html',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.coverHtml,
    sourceHistoryId: 'library-source-history-9',
    sourceScope: 'experts',
    sourceAgentTitle: '产品小助手',
    sourceConversationTitle: '产品架构说明',
  }),
  createLibraryItem({
    title: '产品架构说明.pptx',
    type: 'ppt',
    ownerIcon: LIBRARY_ASSETS.ownerSecondary,
    cover: LIBRARY_ASSETS.cover93,
    sourceHistoryId: 'library-source-history-10',
    sourceScope: 'experts',
    sourceAgentTitle: '财务小助手',
    sourceConversationTitle: '产品架构说明',
  }),
  createLibraryItem({
    title: '风险营销系统.html',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.coverHtml,
    sourceHistoryId: 'library-source-history-11',
    sourceScope: 'dora',
    sourceAgentTitle: 'Dora',
    sourceConversationTitle: '风险营销系统洞察',
  }),
  createLibraryItem({
    title: '国内金融行业商业智能软件市场调研报告.md',
    type: 'md',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover94,
    sourceHistoryId: 'library-source-history-12',
    sourceScope: 'experts',
    sourceAgentTitle: '产品小助手',
    sourceConversationTitle: '产品架构说明',
  }),
]

const SESSION_HEADER_SOURCE_LIBRARY_RULES = [
  {
    scope: 'dora',
    agentTitle: 'Dora',
    sessions: [
      {
        historyId: 'history-2',
        sessionTitle: '江苏省销售额',
        librarySourceHistoryId: 'library-source-history-11',
        libraryTitle: '风险营销系统.html',
      },
      {
        historyId: 'history-8',
        sessionTitle: '对比各区域业绩并给出提升建议',
        librarySourceHistoryId: 'library-source-history-8',
        libraryTitle: '风险营销系统.html',
      },
      {
        historyId: 'history-12',
        sessionTitle: '浙江省渠道退货率分析',
        librarySourceHistoryId: 'library-source-history-3',
        libraryTitle: '风险营销系统.html',
      },
    ],
  },
  {
    scope: 'experts',
    agentTitle: '财务小助手',
    sessions: [
      {
        historyId: 'history-1',
        sessionTitle: '广东省潜量最高的10个客户',
        librarySourceHistoryId: 'library-source-history-1',
        libraryTitle: '销售预测系统.html',
      },
      {
        historyId: 'history-4',
        sessionTitle: '江苏省销售额',
        librarySourceHistoryId: 'library-source-history-4',
        libraryTitle: '销售预测系统.html',
      },
      {
        historyId: 'history-9',
        sessionTitle: '江苏省销售额',
        librarySourceHistoryId: 'library-source-history-10',
        libraryTitle: '产品架构说明.html',
      },
    ],
  },
  {
    scope: 'experts',
    agentTitle: '产品小助手',
    sessions: [
      {
        historyId: 'history-2',
        sessionTitle: '江苏省销售额',
        librarySourceHistoryId: 'library-source-history-2',
        libraryTitle: '国内金融行业商业智能软件市场调研报告.md',
      },
      {
        historyId: 'history-5',
        sessionTitle: '去年门店销售额最高的商品是哪个如果问题很长展示不下那么久是省略',
        librarySourceHistoryId: 'library-source-history-5',
        libraryTitle: '华润集团销售拓客速读.md',
      },
      {
        historyId: 'history-11',
        sessionTitle: '广东省潜量最高的10个客户',
        librarySourceHistoryId: 'library-source-history-12',
        libraryTitle: '产品架构说明.html',
      },
    ],
  },
]

const SESSION_HEADER_SOURCE_LIBRARY_LINKS = SESSION_HEADER_SOURCE_LIBRARY_RULES.flatMap((group) =>
  group.sessions.map((session) => ({
    scope: group.scope,
    agentTitle: group.agentTitle,
    historyId: session.historyId,
    sessionTitle: session.sessionTitle,
    librarySourceHistoryId: session.librarySourceHistoryId,
    libraryTitle: session.libraryTitle,
  })),
)

const EXPERT_FILTER_OPTIONS = [
  { value: 'all-creators', label: '全部创建者' },
  { value: 'mine', label: '我创建的' },
]

const EXPERT_BUSINESS_TABS = [
  { value: 'all', label: '全部' },
  { value: '财务', label: '财务' },
  { value: '销售', label: '销售' },
  { value: '运营', label: '运营' },
  { value: '市场', label: '市场' },
  { value: '人力', label: '人力' },
  { value: '供应链', label: '供应链' },
  { value: '客户', label: '客户' },
  { value: '产品', label: '产品' },
  { value: '风控', label: '风控' },
]

const MOBILE_EXPERT_BUSINESS_TABS = [
  { value: 'all', label: '全部' },
  { value: '运营', label: '运营' },
  { value: '市场', label: '市场' },
  { value: '行政', label: '行政' },
  { value: '法务', label: '法务' },
  { value: '财务', label: '财务' },
  { value: '销售', label: '销售' },
  { value: '人力', label: '人力' },
  { value: '供应链', label: '供应链' },
  { value: '客户', label: '客户' },
  { value: '产品', label: '产品' },
  { value: '风控', label: '风控' },
]

const EXPERT_AGENT_AVATAR_MODULES = import.meta.glob('../assets/images/expert-agents/*.png', {
  eager: true,
  import: 'default',
})

const EXPERT_AGENT_AVATAR_IMAGES = Object.keys(EXPERT_AGENT_AVATAR_MODULES)
  .sort()
  .map((path) => EXPERT_AGENT_AVATAR_MODULES[path])

const shuffleArray = (items) => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const EXPERT_AGENT_AVATAR_POOL = shuffleArray(EXPERT_AGENT_AVATAR_IMAGES)

const getExpertIconByIndex = (index = 0) => {
  if (EXPERT_AGENT_AVATAR_POOL.length === 0) return agentDefaultAvatarImage
  return EXPERT_AGENT_AVATAR_POOL[index % EXPERT_AGENT_AVATAR_POOL.length]
}

const getExpertIconForCard = (card, index = 0) => {
  const cardIndex = EXPERT_CARDS.findIndex((item) => item.title === card.title)
  if (cardIndex >= 0) return getExpertIconByIndex(cardIndex)
  return getExpertIconByIndex(index)
}

const EXPERT_CARDS = [
  {
    title: '智能报告',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    filterTags: ['财务', '运营', '产品'],
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    filterTags: ['销售', '客户', '产品'],
    editedAt: '2026/02/12',
    alertCount: 2,
  },
  {
    title: '智能agent 121 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    filterTags: ['运营', '产品', '财务'],
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent 121 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    filterTags: ['市场', '销售', '客户'],
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能问数',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    filterTags: ['产品', '运营', '财务'],
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能报告',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    filterTags: ['供应链', '运营', '财务'],
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent 213123',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    filterTags: ['客户', '销售', '市场'],
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: 'Agent的名称很长很长很长很长很长很长很长...',
    desc: '这里是agent相关描述信息',
    category: 'strategy',
    filterTags: ['人力', '运营', '产品'],
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent 213123',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    filterTags: ['风控', '财务', '客户'],
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent 121 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    filterTags: ['销售', '客户', '产品'],
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent12121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    filterTags: ['产品', '市场', '运营'],
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '销售洞察助手',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    filterTags: ['销售', '客户', '运营'],
    editedAt: '2026/02/11',
    alertCount: 0,
  },
  {
    title: '财务分析 Agent',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    filterTags: ['财务', '风控', '运营'],
    editedAt: '2026/02/10',
    alertCount: 5,
  },
  {
    title: '市场策略顾问',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    filterTags: ['市场', '销售', '产品'],
    editedAt: '2026/02/09',
    alertCount: 0,
  },
  {
    title: '智能周报生成',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    filterTags: ['运营', '财务', '销售'],
    editedAt: '2026/02/08',
    alertCount: 0,
  },
  {
    title: '客户画像分析',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    filterTags: ['客户', '市场', '销售'],
    editedAt: '2026/02/07',
    alertCount: 0,
  },
  {
    title: '竞品监测 Agent',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    filterTags: ['市场', '风控', '产品'],
    editedAt: '2026/02/06',
    alertCount: 1,
  },
  {
    title: '经营月报助手',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    filterTags: ['运营', '财务', '供应链'],
    editedAt: '2026/02/05',
    alertCount: 0,
  },
  {
    title: '数据异常检测',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    filterTags: ['风控', '财务', '运营'],
    editedAt: '2026/02/04',
    alertCount: 0,
  },
  {
    title: '增长策略推演',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    filterTags: ['产品', '市场', '销售'],
    editedAt: '2026/02/03',
    alertCount: 0,
  },
]

const LIBRARY_SOURCE_EXPERT_CARDS = {
  财务小助手: {
    title: '财务小助手',
    desc: '聚焦财报、经营指标与利润结构分析。',
    category: 'analysis',
    businessCategory: 'finance',
    editedAt: '2026/06/03',
    alertCount: 0,
  },
  产品小助手: {
    title: '产品小助手',
    desc: '聚焦产品资料、方案解读与业务价值提炼。',
    category: 'report',
    businessCategory: 'product',
    editedAt: '2026/06/03',
    alertCount: 0,
  },
}

const getExpertCardKey = (card) => card.id ?? `${card.title}-${card.editedAt}`

const EXPERT_CATEGORY_TAGS = {
  report: ['报告', '自动化', '经营'],
  analysis: ['分析', '问数', '洞察'],
  strategy: ['策略', '增长', '建议'],
}

const normalizeExpertCard = (card, index = 0) => ({
  ...card,
  id: card.id ?? `expert-${index + 1}`,
  icon: card.icon ?? getExpertIconForCard(card, index),
  creator: card.creator ?? 'Admin',
  filterTags: card.filterTags ?? [],
  tags: card.tags ?? card.filterTags?.slice(0, 3) ?? EXPERT_CATEGORY_TAGS[card.category] ?? ['标签1', '标签22', '标签33'],
  usage: card.usage ?? `${(7.9 + (index % 5) * 0.18).toFixed(2)}k 次使用`,
})

const buildExpertAlertSnapshot = () => {
  const snapshot = {}
  EXPERT_CARDS.forEach((card) => {
    if (card.alertCount > 0) {
      snapshot[getExpertCardKey(card)] = card.alertCount
    }
  })
  return snapshot
}

const hasNewExpertAlertsSinceDismiss = (dismissedSnapshot) => {
  if (dismissedSnapshot === null) return true
  return EXPERT_CARDS.some((card) => {
    const previousCount = dismissedSnapshot[getExpertCardKey(card)] ?? 0
    return card.alertCount > previousCount
  })
}

const parseMessageBadgeCount = (badge) => {
  if (!badge) return 0
  if (badge === '99+') return 99
  const value = Number.parseInt(badge, 10)
  return Number.isNaN(value) ? 0 : value
}

const sumMessageBadgeCounts = (items) =>
  items.reduce((sum, item) => sum + parseMessageBadgeCount(item.badge), 0)

const formatNavBadgeCount = (count) => (count > 99 ? '99+' : count)
const formatHistoryBadgeCount = (count) => (count > 99 ? '99+' : count > 0 ? `${count}` : '')

const updateHistoryItemById = (items, itemId, updater) => {
  let changed = false
  const nextItems = items.map((item) => {
    if (item.id !== itemId) return item
    const nextItem = updater(item)
    if (nextItem !== item) changed = true
    return nextItem
  })

  return changed ? nextItems : items
}

const markHistoryItemViewed = (items, itemId) =>
  updateHistoryItemById(items, itemId, (item) => {
    if (!item.badge) return item
    return { ...item, badge: '' }
  })

const markHistoryItemGenerating = (items, itemId, isGenerating) =>
  updateHistoryItemById(items, itemId, (item) => {
    if (Boolean(item.isGenerating) === isGenerating) return item
    return { ...item, isGenerating }
  })

const completeHistoryItemGeneration = (items, itemId, { incrementUnread } = {}) =>
  updateHistoryItemById(items, itemId, (item) => {
    const nextBadge = incrementUnread
      ? formatHistoryBadgeCount(parseMessageBadgeCount(item.badge) + 1)
      : ''

    if (!item.isGenerating && item.badge === nextBadge) return item
    return {
      ...item,
      isGenerating: false,
      badge: nextBadge,
    }
  })

const buildCompletedSessionMeta = ({ completedCount, durationMs, summaryStatus } = {}) => ({
  completedCount: completedCount ?? 0,
  durationMs: durationMs ?? 0,
  summaryStatus: summaryStatus ?? '',
})

const createSessionSentAt = (date = new Date()) => date.toISOString()

const createMockHistorySentAt = (group, index) => {
  const baseByGroup = {
    today: new Date(2026, 5, 11, 12, 44),
    week: new Date(2026, 5, 8, 15, 18),
    month: new Date(2026, 5, 1, 10, 26),
    earlier: new Date(2026, 4, 12, 9, 12),
  }

  const base = new Date((baseByGroup[group] ?? baseByGroup.today).getTime())
  base.setMinutes(base.getMinutes() - index * 17)
  return base.toISOString()
}

const HISTORY_LONG_LABEL = '去年门店销售额最高的商品是哪个如果问题很长展示不下那么久是省略'
const HISTORY_BACKGROUND_COMPLETE_DELAY_MS = 2600

const getLibraryItemKey = (item) => `${item.type}-${item.title}-${item.cover}`

const createExpertRecommendationItem = (card) => ({
  id: `expert-${getExpertCardKey(card)}`,
  kind: 'expert',
  title: card.title,
  image: card.mobileIcon ?? card.icon,
  payload: card,
})

const createLibraryRecommendationItem = (item) => ({
  id: `library-${getLibraryItemKey(item)}`,
  kind: 'library',
  title: item.title,
  image: item.cover ?? getLibraryFileIcon(item.type),
  payload: item,
})

const LIBRARY_SOURCE_AGENT_ICONS = {
  财务小助手: agentDefaultAvatarImage,
  产品小助手: agentDefaultAvatarImage,
  Dora: activeDoraImage,
}

const parseLibrarySourceAgentName = (owner) => {
  if (!owner) return ''
  const colonIndex = owner.indexOf('：')
  if (colonIndex !== -1) return owner.slice(0, colonIndex).trim()
  const asciiColonIndex = owner.indexOf(':')
  if (asciiColonIndex !== -1) return owner.slice(0, asciiColonIndex).trim()
  return owner.trim()
}

const getLibrarySourceExpertCard = (agentTitle) =>
  EXPERT_CARDS.find((card) => card.title === agentTitle) ??
  LIBRARY_SOURCE_EXPERT_CARDS[agentTitle] ?? {
    title: agentTitle,
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/06/03',
    alertCount: 0,
  }

const createSessionOutputItemFromLibraryItem = (item) => {
  if (!item) return null

  return {
    id: `session-output-${item.sourceHistoryId ?? getLibraryItemKey(item)}`,
    type: item.type,
    title: item.title,
    desc: '当前会话产出文件',
    icon: getLibraryFileIcon(item.type),
    sourceLibraryKey: getLibraryItemKey(item),
  }
}

const mergeDerivedSessionOutputFiles = (baseFiles, libraryItem) => {
  const currentSourceOutput = createSessionOutputItemFromLibraryItem(libraryItem)
  if (!currentSourceOutput) return baseFiles

  const sourceLibraryKey = currentSourceOutput.sourceLibraryKey
  const hasSameLibraryFile = baseFiles.some((item) => item.sourceLibraryKey === sourceLibraryKey)
  const hasSameFileIdentity = baseFiles.some(
    (item) => item.title === currentSourceOutput.title && item.type === currentSourceOutput.type,
  )

  if (hasSameLibraryFile || hasSameFileIdentity) {
    return baseFiles.map((item) =>
      item.title === currentSourceOutput.title && item.type === currentSourceOutput.type
        ? { ...item, sourceLibraryKey }
        : item,
    )
  }

  return [currentSourceOutput, ...baseFiles]
}

const HISTORY_GROUPS = [
  { id: 'today', label: '今天' },
  { id: 'week', label: '7天内' },
  { id: 'month', label: '30天内' },
  { id: 'earlier', label: '更早' },
]

const INITIAL_HISTORY_ITEMS = [
  { id: 'history-1', group: 'today', label: '广东省潜量最高的10个客户', badge: '' },
  { id: 'history-2', group: 'today', label: '江苏省销售额', badge: '1' },
  { id: 'history-3', group: 'today', label: HISTORY_LONG_LABEL, badge: '20' },
  { id: 'history-4', group: 'week', label: '江苏省销售额', badge: '' },
  { id: 'history-5', group: 'week', label: HISTORY_LONG_LABEL, badge: '' },
  { id: 'history-6', group: 'week', label: '广东省潜量最高的10个客户广东省潜量最高的10个客户', badge: '99+' },
  { id: 'history-7', group: 'month', label: HISTORY_LONG_LABEL, badge: '' },
  { id: 'history-8', group: 'month', label: '对比各区域业绩并给出提升建议', badge: '', isGenerating: true },
  { id: 'history-9', group: 'earlier', label: '江苏省销售额', badge: '' },
  { id: 'history-10', group: 'earlier', label: HISTORY_LONG_LABEL, badge: '' },
  { id: 'history-11', group: 'earlier', label: '广东省潜量最高的10个客户', badge: '' },
  { id: 'history-12', group: 'earlier', label: '浙江省渠道退货率分析', badge: '3' },
].map((item, index) => ({
  ...item,
  sentAt: createMockHistorySentAt(item.group, index),
  ...(item.id === 'history-1'
    ? {
        sessionTurns: [
          createSessionTurn({
            id: 'history-1-turn-1',
            prompt: '请帮我分析这份商品销售明细 Excel，找出广东省潜量最高的10个客户',
            userFiles: [
              { id: 'history-1-file-1', name: '商品销售明细表.xls', size: '161.17 KB', icon: uploadExcelImage },
              { id: 'history-1-file-2', name: '商品销售明细表.xls', size: '161.17 KB', icon: uploadExcelImage },
            ],
            sentAt: createMockHistorySentAt(item.group, index),
            completedSessionMeta: buildCompletedSessionMeta({ completedCount: 6, durationMs: 92000 }),
          }),
        ],
      }
    : {}),
}))

const upsertHistoryItem = (items, nextItem) => {
  const filtered = items.filter((item) => item.id !== nextItem.id)
  return [nextItem, ...filtered]
}

const prepareHistoryItemsForSession = (items, sessionItem) => {
  if (!sessionItem?.id) return items

  const preparedItem = {
    ...sessionItem,
    badge: '',
    isGenerating: true,
  }

  const hasExisting = items.some((item) => item.id === sessionItem.id)
  if (!hasExisting) {
    return upsertHistoryItem(items, preparedItem)
  }

  return markHistoryItemGenerating(markHistoryItemViewed(items, sessionItem.id), sessionItem.id, true)
}

const HISTORY_SESSION_MENU_ITEMS = [
  { id: 'rename', label: '重命名', icon: ICONS.rename },
  { id: 'open-window', label: '新窗口打开', icon: ICONS.openWindow },
  { id: 'delete', label: '删除', icon: ICONS.delete },
]

const USER_MENU_LANGUAGES = [
  { id: 'system', label: '跟随系统（简体中文）', shortLabel: '跟随系统' },
  { id: 'zh-cn', label: '简体中文' },
  { id: 'zh-tw', label: '繁体中文' },
  { id: 'en', label: 'English' },
]

const USER_DISPLAY_NAME = 'Admin这是用户的名称（Admin）'
const CURRENT_USER_EXPERT_CREATOR = 'Admin'

const INTERNAL_ACTIONS = [
  { id: 'new-chat', label: '新聊天', icon: ICONS.newChat },
  { id: 'schedule', label: '定时任务', icon: ICONS.schedule },
]

const INTERNAL_AVATARS = [
  { id: 'wechat', label: '企业微信-未命名Agent_01', icon: wechatImage, badge: '99+' },
  { id: 'ding', label: '钉钉-未命名Agent_01', icon: dingImage, badge: '1' },
  { id: 'feishu', label: '飞书-未命名Agent_01', icon: feishuImage, badge: '' },
]

const SCHEDULE_SOURCE_OPTIONS = [
  { value: 'all', label: '全部任务来源' },
  { value: 'agent', label: 'Agent 内配置' },
  { value: 'mine', label: '我添加的' },
]

const SCHEDULE_CHANNEL_OPTIONS = [
  { value: 'all', label: '全部推送渠道' },
  { value: 'agent', label: 'Agent 内消息' },
  { value: 'feishu', label: '飞书' },
  { value: 'ding', label: '钉钉' },
  { value: 'wechat', label: '企业微信' },
]

const createScheduleTask = ({
  id,
  title,
  source = 'mine',
  summary,
  scheduleText,
  channels = ['agent'],
  enabled = true,
}) => ({
  id,
  title,
  source,
  summary,
  scheduleText,
  channels,
  enabled,
})

const DORA_SCHEDULE_TASKS = [
  createScheduleTask({
    id: 'dora-store-sales-daily',
    title: '门店销售分析日报',
    source: 'agent',
    summary: '当销售额低于100时，发送门店销售分析报告',
    scheduleText: '每天 08:00',
    channels: ['agent', 'feishu', 'ding', 'wechat'],
    enabled: true,
  }),
  createScheduleTask({
    id: 'dora-store-sales-weekly',
    title: '门店销售分析周报',
    source: 'mine',
    summary: '生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告',
    scheduleText: '每周周一 08:00',
    channels: ['agent'],
    enabled: false,
  }),
  createScheduleTask({
    id: 'dora-schedule-c',
    title: '定时任务C',
    source: 'mine',
    summary: '生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告',
    scheduleText: '2024-04-20 11:30',
    channels: ['agent', 'feishu'],
    enabled: true,
  }),
  createScheduleTask({
    id: 'dora-nation-monthly',
    title: '全国潜量分析月报',
    source: 'agent',
    summary: '生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告',
    scheduleText: '每月1日、15日 08:00',
    channels: ['agent', 'ding'],
    enabled: false,
  }),
  createScheduleTask({
    id: 'dora-schedule-d',
    title: '定时任务D',
    source: 'mine',
    summary: '生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告',
    scheduleText: '每天 08:00',
    channels: ['agent'],
    enabled: true,
  }),
]

const EXPERT_SCHEDULE_TASKS = [
  createScheduleTask({
    id: 'expert-store-sales-daily',
    title: '门店销售分析日报',
    source: 'agent',
    summary: '当销售额低于100时，发送门店销售分析报告',
    scheduleText: '每天 08:00',
    channels: ['agent', 'feishu', 'ding', 'wechat'],
    enabled: true,
  }),
  createScheduleTask({
    id: 'expert-store-sales-weekly',
    title: '门店销售分析周报',
    source: 'mine',
    summary: '生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告',
    scheduleText: '每周周一 08:00',
    channels: ['agent'],
    enabled: false,
  }),
  createScheduleTask({
    id: 'expert-schedule-c',
    title: '定时任务C',
    source: 'mine',
    summary: '生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告',
    scheduleText: '2024-04-20 11:30',
    channels: ['agent', 'feishu'],
    enabled: true,
  }),
  createScheduleTask({
    id: 'expert-nation-monthly',
    title: '全国潜量分析月报',
    source: 'agent',
    summary: '生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告',
    scheduleText: '每月1日、15日 08:00',
    channels: ['agent', 'ding'],
    enabled: false,
  }),
  createScheduleTask({
    id: 'expert-schedule-d',
    title: '定时任务D',
    source: 'mine',
    summary: '生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告生成销售额分析报告',
    scheduleText: '每天 08:00',
    channels: ['agent'],
    enabled: true,
  }),
]

const DEFAULT_EXPERT_DETAIL_TABS = [
  {
    label: '客户背景画像',
    prompts: [
      '帮我梳理一下目标客户的行业属性、组织规模和典型采购流程。',
      '这家客户近三年的营收结构和核心产品线分别是什么？',
      '从公开资料看，该客户的主要决策链条涉及哪些关键角色？',
      '对比一下该客户与同行业 Top3 客户在数字化投入上的差异。',
      '该客户在社媒与新闻中的品牌标签有哪些？请归纳正面与负面关键词。',
      '请输出一份该客户的目标人群画像，包括地域、职位与常见痛点。',
    ],
    minPrompts: 2,
    maxPrompts: 5,
  },
  {
    label: '公司信息查询',
    prompts: [
      '汇总下华为近三个月的大动作：有没有新的战略合作、融资或者重大的生产线调整？',
      '听说阿里巴巴最近又有高管调动了？帮我看看具体是谁变了，对业务线有啥影响？',
      '帮我查一下该公司工商信息、股权结构及主要子公司清单。',
      '最近一年该公司有哪些司法诉讼或行政处罚记录？',
      '该公司现任核心管理层背景是什么？是否有重要人事变动？',
      '请整理该公司官网与年报中披露的主要业务板块。',
    ],
    minPrompts: 1,
    maxPrompts: 4,
  },
  {
    label: '上市公司财务',
    prompts: [
      '分析下该公司最近四个季度的毛利率、净利率变化及主要原因。',
      '对比该公司与同行业可比公司的营收增速和 ROE 水平。',
      '该公司资产负债率是否处于合理区间？请结合现金流说明。',
      '最近一期财报里，哪些科目出现了异常波动？',
      '请提炼该公司过去三年研发投入占比及资本开支趋势。',
      '从财报附注看，该公司海外收入占比及汇率影响如何？',
    ],
    minPrompts: 2,
    maxPrompts: 5,
  },
  {
    label: '公司发展动态',
    prompts: [
      '希尔顿酒店最近在社交媒体上有没有什么负面舆情？帮我复述一下事件摘要。',
      '整理下雷军最近在公开场合的讲话要点，帮我提炼出小米明年的三个战略关键词。',
      '梳理该公司近半年新品发布、渠道扩张或战略合作的关键节点。',
      '该公司最近一次融资或并购的动态是什么？对市场有什么影响？',
      '请汇总近期关于该公司供应链调整或产能变动的媒体报道。',
      '最近有哪些高管公开发言或内部信值得关注的信号？',
    ],
    minPrompts: 1,
    maxPrompts: 3,
  },
  {
    label: '市场综合洞察',
    prompts: [
      '当前细分行业的市场规模、增速及主要驱动因素是什么？',
      '梳理主要竞品近季度产品策略与价格变动，对比我方机会点。',
      '该赛道的用户痛点 Top5 是什么？对应有哪些未满足需求？',
      '最近政策或监管变化会对该行业产生哪些影响？',
      '请输出该行业未来 12 个月值得关注的三大趋势。',
      '从搜索指数与社媒热度看，哪些细分需求正在快速上升？',
    ],
    minPrompts: 2,
    maxPrompts: 4,
  },
]

const EXPERT_DETAIL_CONFIG_BY_KEY = {
  '智能agent 121-2026/02/12': {
    tabs: [
      {
        label: '快速分析',
        prompts: [
          '帮我快速看一下本周销售漏斗各阶段转化率变化。',
          '哪些区域门店的客单价下滑最明显？',
          '输出一份近7天核心经营指标速览。',
        ],
        minPrompts: 2,
        maxPrompts: 3,
      },
      {
        label: '异常诊断',
        prompts: [
          '最近有哪些SKU出现销量断崖式下跌？',
          '帮我定位复购率异常下滑的可能原因。',
          '对比上周，哪些渠道 ROI 突然变差？',
          '有没有库存周转异常的品类需要预警？',
        ],
        minPrompts: 1,
        maxPrompts: 4,
      },
      {
        label: '任务配置',
        prompts: [],
      },
    ],
  },
  '财务分析 Agent-2026/02/10': {
    tabs: [
      {
        label: '财报解读',
        prompts: [
          '解读该公司最新季报里的三项核心财务变化。',
          '毛利率下降主要来自哪些成本项？',
          '经营现金流与净利润是否匹配？',
        ],
        minPrompts: 1,
        maxPrompts: 3,
      },
      {
        label: '同业对比',
        prompts: [
          '和同行业龙头比，这家公司的 ROE 处于什么水平？',
          '对比三家竞品，谁的研发费用率最高？',
          '从偿债能力看，该公司是否优于行业平均？',
        ],
        minPrompts: 2,
        maxPrompts: 2,
      },
      {
        label: '风险预警',
        prompts: [
          '有哪些科目可能隐藏财务风险？',
          '应收账款账龄结构是否健康？',
        ],
        minPrompts: 1,
        maxPrompts: 2,
      },
      {
        label: '估值参考',
        prompts: [
          '基于最近四个季度数据，给出简易估值区间参考。',
          '当前 PE 相对历史分位处于什么位置？',
          '哪些业务线对估值弹性贡献最大？',
          '如果营收增速下滑5%，估值会受到多大影响？',
          '列出影响估值判断的三个关键假设。',
        ],
        minPrompts: 3,
        maxPrompts: 5,
      },
    ],
  },
  '竞品监测 Agent-2026/02/06': {
    tabs: [
      {
        label: '竞品动态',
        prompts: [
          '最近一周主要竞品有哪些新品或调价动作？',
          '竞品在社媒投放上有哪些新主题？',
          '有没有竞品发布了值得关注的 AI 功能？',
        ],
        minPrompts: 1,
        maxPrompts: 3,
      },
      {
        label: '策略对比',
        prompts: [
          '对比我们和 Top3 竞品在定价策略上的差异。',
          '竞品渠道布局最近有什么变化？',
        ],
        minPrompts: 1,
        maxPrompts: 2,
      },
    ],
  },
  '智能报告-2026/02/12': {
    tabs: [
      {
        label: '报告生成',
        prompts: [
          '生成一份本周经营周报，包含核心 KPI 与异常说明。',
          '帮我输出月度销售复盘报告大纲。',
          '整理一份面向管理层的季度经营摘要。',
        ],
        minPrompts: 1,
        maxPrompts: 2,
      },
    ],
  },
  '增长策略推演-2026/02/03': {
    tabs: [
      { label: '策略推演', prompts: [] },
      { label: '情景模拟', prompts: [] },
    ],
  },
}

const getExpertDetailConfig = (card) => {
  if (!card) {
    return { tabs: DEFAULT_EXPERT_DETAIL_TABS }
  }
  return EXPERT_DETAIL_CONFIG_BY_KEY[getExpertCardKey(card)] ?? { tabs: DEFAULT_EXPERT_DETAIL_TABS }
}

const getVisibleExpertTabs = (tabs) => tabs.filter((tab) => tab.prompts?.length)

function pickRandomExpertPrompts(tabConfig) {
  const prompts = tabConfig?.prompts
  if (!prompts?.length) return []

  const maxPrompts = tabConfig.maxPrompts ?? 5
  const minPrompts = tabConfig.minPrompts ?? 1
  if (maxPrompts <= 0) return []

  const pool = [...prompts]
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  const upper = Math.min(maxPrompts, pool.length)
  const lower = Math.min(Math.max(0, minPrompts), upper)
  if (upper === 0) return []

  const count = lower + Math.floor(Math.random() * (upper - lower + 1))
  return pool.slice(0, count)
}

function FieldSelect({ classPrefix, value, options, onChange, ariaLabel, minWidth, dropdownClassName = '' }) {
  const [open, setOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 })
  const wrapRef = useRef(null)
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const selectedOption = options.find((option) => option.value === value) ?? options[0]

  const updateMenuPosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMenuPos({ top: rect.bottom, left: rect.left, width: rect.width })
  }

  const toggleMenu = () => {
    if (!open) updateMenuPosition()
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event) => {
      if (wrapRef.current?.contains(event.target)) return
      if (panelRef.current?.contains(event.target)) return
      setOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const handleReposition = () => updateMenuPosition()

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [open])

  return (
    <div className={`${classPrefix}-select-wrap field-select`} ref={wrapRef} style={minWidth ? { minWidth } : undefined}>
      <button
        ref={triggerRef}
        type="button"
        className={`${classPrefix}-select field-select__trigger ${open ? 'is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={toggleMenu}
      >
        <span className="field-select__label">{selectedOption?.label ?? ''}</span>
        <span className="dora-icon field-select__arrow" aria-hidden="true">
          {open ? ICONS.arrowUp : ICONS.arrowDown}
        </span>
      </button>
      {open
        ? createPortal(
            <div
              ref={panelRef}
              className={`field-select-dropdown${dropdownClassName ? ` ${dropdownClassName}` : ''}`}
              role="listbox"
              aria-label={ariaLabel}
              style={{ top: menuPos.top, left: menuPos.left, minWidth: menuPos.width }}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={value === option.value}
                  className={`field-select-dropdown__item ${value === option.value ? 'active' : ''}`}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  <span className="field-select-dropdown__label">{option.label}</span>
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

export default function QuestionPage() {
  const [sessionStates, setSessionStates] = useState({
    dora: {
      historyItems: INITIAL_HISTORY_ITEMS,
      inputText: '',
      inputFocused: false,
      isTransitioningSession: false,
      isGeneratingSession: false,
      activeSessionTurns: [],
      activeSessionPrompt: '',
      activeSessionUserFiles: [],
      activeSessionCompletedMeta: null,
      activeHistoryItemId: null,
      composerFiles: [],
      composerSegments: DEFAULT_COMPOSER_SEGMENTS,
    },
    experts: {
      historyItems: INITIAL_HISTORY_ITEMS,
      inputText: '',
      inputFocused: false,
      isTransitioningSession: false,
      isGeneratingSession: false,
      activeSessionTurns: [],
      activeSessionPrompt: '',
      activeSessionUserFiles: [],
      activeSessionCompletedMeta: null,
      activeHistoryItemId: null,
      composerFiles: [],
      composerSegments: DEFAULT_COMPOSER_SEGMENTS,
    },
  })
  const [activeNav, setActiveNav] = useState('dora')
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)
  const [mobileCatalogSearchOpen, setMobileCatalogSearchOpen] = useState(false)
  const [mobileCatalogSearch, setMobileCatalogSearch] = useState('')
  const [mobileNewChatPageOpen, setMobileNewChatPageOpen] = useState(false)
  const [activeInnerAction, setActiveInnerAction] = useState('new-chat')
  const [practicesPageOpen, setPracticesPageOpen] = useState(false)
  const [innerAgentMenuOpen, setInnerAgentMenuOpen] = useState(false)
  const [agentMenuPos, setAgentMenuPos] = useState({ top: 0, left: 0 })
  const [activeExpertCard, setActiveExpertCard] = useState(null)
  const [activeExpertTab, setActiveExpertTab] = useState(0)
  const [expertRecentCards, setExpertRecentCards] = useState([])
  const [expertFavoriteKeys, setExpertFavoriteKeys] = useState([])
  const [activeLibraryItem, setActiveLibraryItem] = useState(null)
  const [libraryRecentItems, setLibraryRecentItems] = useState([])
  const [libraryRecentHasOverflow, setLibraryRecentHasOverflow] = useState(false)
  const [libraryRecentCanScrollPrev, setLibraryRecentCanScrollPrev] = useState(false)
  const [libraryRecentCanScrollNext, setLibraryRecentCanScrollNext] = useState(false)
  const [libraryChatCollapsed, setLibraryChatCollapsed] = useState(false)
  const [libraryChatSessionMenuOpen, setLibraryChatSessionMenuOpen] = useState(false)
  const [libraryChatSessionMenuPos, setLibraryChatSessionMenuPos] = useState({ top: 0, left: 0 })
  const [libraryChatSessionsByKey, setLibraryChatSessionsByKey] = useState({})
  const [libraryChatSessionSearch, setLibraryChatSessionSearch] = useState('')
  const [scheduleTasksByScope, setScheduleTasksByScope] = useState({
    dora: DORA_SCHEDULE_TASKS,
    experts: EXPERT_SCHEDULE_TASKS,
  })
  const [scheduleSearch, setScheduleSearch] = useState('')
  const [scheduleSourceFilter, setScheduleSourceFilter] = useState('all')
  const [scheduleChannelFilter, setScheduleChannelFilter] = useState('all')
  const [expertFilter, setExpertFilter] = useState('all-creators')
  const [expertBusinessFilter, setExpertBusinessFilter] = useState('all')
  const [expertSearch, setExpertSearch] = useState('')
  const [expertMobileSearchOpen, setExpertMobileSearchOpen] = useState(false)
  const [expertMobileSearchFocused, setExpertMobileSearchFocused] = useState(false)
  const [expertMobileSearchSubmitted, setExpertMobileSearchSubmitted] = useState(false)
  const [libraryFilter, setLibraryFilter] = useState('all')
  const [librarySearch, setLibrarySearch] = useState('')
  const [libraryMobileSearchOpen, setLibraryMobileSearchOpen] = useState(false)
  const [libraryMobileSearchFocused, setLibraryMobileSearchFocused] = useState(false)
  const [libraryMobileSearchSubmitted, setLibraryMobileSearchSubmitted] = useState(false)
  const [expertsNavPopoverOpen, setExpertsNavPopoverOpen] = useState(false)
  const [expertsNavPopoverPos, setExpertsNavPopoverPos] = useState({ top: 0, left: 0 })
  const [expertsAlertsDismissedSnapshot, setExpertsAlertsDismissedSnapshot] = useState(null)
  const [expertsPageScrolled, setExpertsPageScrolled] = useState(false)
  const [practiceDeckIndex, setPracticeDeckIndex] = useState(0)
  const [mobileRecommendationIndex, setMobileRecommendationIndex] = useState(0)
  const [mobileRecommendationRecents, setMobileRecommendationRecents] = useState([])
  const [doraIntroPhase, setDoraIntroPhase] = useState('idle')
  const doraVisualScheme = 'scheme7'
  const [heroSparkleReplayKey, setHeroSparkleReplayKey] = useState(0)
  const [activeHeroSkillTagId, setActiveHeroSkillTagId] = useState(null)
  const [slotPromptTagId, setSlotPromptTagId] = useState(null)
  const [skillSlotAnimate, setSkillSlotAnimate] = useState(false)
  const [tagsAnimKey, setTagsAnimKey] = useState(0)
  const [heroSkillTagsHasOverflow, setHeroSkillTagsHasOverflow] = useState(false)
  const [heroSkillTagsCanScrollPrev, setHeroSkillTagsCanScrollPrev] = useState(false)
  const [heroSkillTagsCanScrollNext, setHeroSkillTagsCanScrollNext] = useState(false)
  const heroSkillTagWasSelectedRef = useRef(false)
  const [heatmapGrid, setHeatmapGrid] = useState({
    rows: HEATMAP_BASE_ROWS,
    cols: HEATMAP_BASE_COLS,
    cellWidth: HEATMAP_CELL_WIDTH,
    cellHeight: HEATMAP_CELL_HEIGHT,
  })
  const [heatmapFocus, setHeatmapFocus] = useState({ r: HEATMAP_BASE_ROWS - 1, c: HEATMAP_BASE_COLS - 1, mark: false })
  const [heatmapTokenColors, setHeatmapTokenColors] = useState(() => getDefaultHeatmapTokenColors())
  const [sessionOutputFiles, setSessionOutputFiles] = useState(SESSION_FILES_OUTPUT_ITEMS)
  const [sessionFilesPanelOpen, setSessionFilesPanelOpen] = useState(false)
  const [sessionFilesPanelFullscreen, setSessionFilesPanelFullscreen] = useState(false)
  const [sessionFileRefPreviewOpen, setSessionFileRefPreviewOpen] = useState(false)
  const [librarySessionFilesModalOpen, setLibrarySessionFilesModalOpen] = useState(false)
  const [attachConnectModal, setAttachConnectModal] = useState(null)
  const [attachConnectSearch, setAttachConnectSearch] = useState('')
  const [attachConnectOwnerScope, setAttachConnectOwnerScope] = useState('mine')
  const [attachConnectCheckedIds, setAttachConnectCheckedIds] = useState(
    () => new Set(getAttachConnectScopeDefaults().checkedIds),
  )
  const [attachConnectExpandedIds, setAttachConnectExpandedIds] = useState(
    () => new Set(getAttachConnectScopeDefaults().expandedIds),
  )
  const [attachConnectActiveTreeNodeId, setAttachConnectActiveTreeNodeId] = useState(
    getAttachConnectScopeDefaults().activeId,
  )
  const [attachConnectTreeContentIcons, setAttachConnectTreeContentIcons] = useState({})
  const [attachConnectActiveDimensionId, setAttachConnectActiveDimensionId] = useState('dim-1')
  const [attachConnectTableView, setAttachConnectTableView] = useState('detail')
  const [attachConnectSidebarWidth, setAttachConnectSidebarWidth] = useState(ATTACH_CONNECT_SIDEBAR_WIDTH_DEFAULT)
  const [attachConnectSidebarDividerVisible, setAttachConnectSidebarDividerVisible] = useState(false)
  const [attachConnectSidebarDragging, setAttachConnectSidebarDragging] = useState(false)
  const [sessionFilesTab, setSessionFilesTab] = useState('materials')
  const [sessionFilesFilter, setSessionFilesFilter] = useState('all')
  const [sessionFilesSearch, setSessionFilesSearch] = useState('')
  const [sessionFilesSourceScope, setSessionFilesSourceScope] = useState('session')
  const [sessionFilesSourceSearch, setSessionFilesSourceSearch] = useState('')
  const [sessionFilesSourceCollapsed, setSessionFilesSourceCollapsed] = useState({})
  const [sessionFilesSourceSections, setSessionFilesSourceSections] = useState(() => SESSION_FILES_SOURCE_SECTIONS)
  const [sessionFilesPanelWidth, setSessionFilesPanelWidth] = useState(598)
  const [sessionSplitMounted, setSessionSplitMounted] = useState(false)
  const [sessionSplitEntered, setSessionSplitEntered] = useState(false)
  const [activeSessionFileId, setActiveSessionFileId] = useState(null)
  const [activeSessionSourceFileId, setActiveSessionSourceFileId] = useState(null)
  const [hoveredComposerFileId, setHoveredComposerFileId] = useState(null)
  const [doraAvatars, setDoraAvatars] = useState(() => INTERNAL_AVATARS)
  const [innerAvatarGroupCollapsed, setInnerAvatarGroupCollapsed] = useState({ dora: false, experts: false })
  const [doraNavPopoverOpen, setDoraNavPopoverOpen] = useState(false)
  const [doraNavPopoverPos, setDoraNavPopoverPos] = useState({ top: 0, left: 0 })
  const [historyGroupsCollapsed, setHistoryGroupsCollapsed] = useState({})
  const [historyMenuOpenId, setHistoryMenuOpenId] = useState(null)
  const [historyMenuPos, setHistoryMenuPos] = useState({ top: 0, left: 0 })
  const [sessionMarkdownDownloadMenuOpen, setSessionMarkdownDownloadMenuOpen] = useState(false)
  const [sessionMarkdownContent, setSessionMarkdownContent] = useState(financialBiMdContent)
  const [sessionMarkdownEditing, setSessionMarkdownEditing] = useState(false)
  const [sessionMarkdownEditDraft, setSessionMarkdownEditDraft] = useState('')
  const [sessionMarkdownTocOpen, setSessionMarkdownTocOpen] = useState(false)
  const [activeSessionPptSlideIndex, setActiveSessionPptSlideIndex] = useState(0)
  const [activeSessionDocPageIndex, setActiveSessionDocPageIndex] = useState(0)
  const [activeSessionPdfPageIndex, setActiveSessionPdfPageIndex] = useState(0)
  const [sessionSpreadsheetEditing, setSessionSpreadsheetEditing] = useState(false)
  const [sessionSpreadsheetWorkbook, setSessionSpreadsheetWorkbook] = useState(SESSION_SOURCE_SPREADSHEET_PREVIEW)
  const [activeSessionSpreadsheetSheetId, setActiveSessionSpreadsheetSheetId] = useState(
    SESSION_SOURCE_SPREADSHEET_PREVIEW.sheets[0].id,
  )
  const [sessionSpreadsheetEditDraft, setSessionSpreadsheetEditDraft] = useState(null)
  const [historyRenamingId, setHistoryRenamingId] = useState(null)
  const [historyRenameDraft, setHistoryRenameDraft] = useState('')
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const [mobileAvatarMenuOpen, setMobileAvatarMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('system')
  const [avatarMenuPos, setAvatarMenuPos] = useState({ top: 0, left: 0 })
  const [languageMenuPos, setLanguageMenuPos] = useState({ top: 0, left: 0 })
  const heatmapStageRef = useRef(null)
  const heatmapAnchorRef = useRef({ r: HEATMAP_BASE_ROWS - 1, c: HEATMAP_BASE_COLS - 1 })
  const heatmapAutoModeRef = useRef(true)
  const heatmapAutoPhaseRef = useRef(0)
  const heatmapAutoOffsetRef = useRef({ r: 0, c: HEATMAP_AUTO_MOTION.phaseOffset })
  const contentColumnRef = useRef(null)
  const mainBodyRef = useRef(null)
  const sessionSplitDividerRef = useRef(null)
  const sessionFilesPanelRef = useRef(null)
  const sessionFilesFullscreenRestoreRef = useRef({ innerSidebarOpen: false })
  const expertsPageMainRef = useRef(null)
  const expertTabListRef = useRef(null)
  const doraNavRef = useRef(null)
  const doraNavPopoverRef = useRef(null)
  const doraNavPopoverHoverRef = useRef(false)
  const doraNavLeaveTimerRef = useRef(null)
  const expertsNavRef = useRef(null)
  const expertsNavPopoverRef = useRef(null)
  const expertsNavPopoverHoverRef = useRef(false)
  const expertsNavLeaveTimerRef = useRef(null)
  const innerAgentMenuRef = useRef(null)
  const agentTitleRef = useRef(null)
  const agentMenuPanelRef = useRef(null)
  const attachMenuRef = useRef(null)
  const attachConnectBodyRef = useRef(null)
  const attachConnectSidebarResizeRef = useRef({
    startX: 0,
    startWidth: ATTACH_CONNECT_SIDEBAR_WIDTH_DEFAULT,
  })

  const currentAttachConnectTreeNodes = useMemo(
    () => getAttachConnectTreeNodes(attachConnectModal?.assetType, attachConnectOwnerScope),
    [attachConnectModal?.assetType, attachConnectOwnerScope],
  )
  const heroSkillTagsScrollerRef = useRef(null)
  const historyMenuAnchorRef = useRef(null)
  const historyMenuPanelRef = useRef(null)
  const sessionMarkdownDownloadBtnRef = useRef(null)
  const sessionMarkdownDownloadMenuRef = useRef(null)
  const libraryChatSessionTriggerRef = useRef(null)
  const libraryChatSessionPanelRef = useRef(null)
  const libraryRecentScrollerRef = useRef(null)
  const historyRenameInputRef = useRef(null)
  const historyRenameSkipBlurRef = useRef(false)
  const avatarBtnRef = useRef(null)
  const avatarMenuPanelRef = useRef(null)
  const languageMenuAnchorRef = useRef(null)
  const languageMenuPanelRef = useRef(null)
  const fileInputRef = useRef(null)
  const uploadTimersRef = useRef(new Map())
  const sessionTransitionTimersRef = useRef(new Map())
  const historyGenerationTimersRef = useRef(new Map())
  const senderEditorRef = useRef(null)
  const composerSyncRef = useRef(false)
  const composerComposingRef = useRef(false)
  const composerUpdateSourceRef = useRef('external')
  const practiceDeckPointerRef = useRef(null)
  const practiceDeckSuppressClickRef = useRef(false)
  const [mentionPanel, setMentionPanel] = useState({
    open: false,
    scope: 'dora',
    query: '',
    start: 0,
    activeIndex: 0,
  })

  const defaultMobileRecommendationItems = useMemo(() => {
    const fallbackExperts = EXPERT_CARDS.slice(0, 5).map((card, index) =>
      createExpertRecommendationItem(normalizeExpertCard(card, index)),
    )
    const fallbackLibraryItems = LIBRARY_ITEMS.slice(0, 5).map(createLibraryRecommendationItem)

    return [
      fallbackLibraryItems[0],
      fallbackExperts[0],
      fallbackExperts[1],
      fallbackLibraryItems[1],
      fallbackExperts[2],
      fallbackLibraryItems[2],
      fallbackExperts[3],
      fallbackLibraryItems[3],
      fallbackExperts[4],
      fallbackLibraryItems[4],
    ].filter(Boolean)
  }, [])

  const mobileRecommendationItems = useMemo(() => {
    const seen = new Set()
    return [...mobileRecommendationRecents, ...defaultMobileRecommendationItems]
      .filter((item) => {
        if (!item || seen.has(item.id)) return false
        seen.add(item.id)
        return true
      })
      .slice(0, MOBILE_RECOMMENDATION_LIMIT)
  }, [defaultMobileRecommendationItems, mobileRecommendationRecents])

  const practiceDeckCards = useMemo(() => {
    const total = PRACTICE_CARDS.length
    return PRACTICE_DECK_OFFSETS.map((relative) => ({
      relative,
      card: PRACTICE_CARDS[(practiceDeckIndex + relative + total) % total],
    }))
  }, [practiceDeckIndex])

  const mobileRecommendationDeckCards = useMemo(() => {
    const total = mobileRecommendationItems.length
    if (!total) return []
    return PRACTICE_DECK_OFFSETS.map((relative) => ({
      relative,
      item: mobileRecommendationItems[(mobileRecommendationIndex + relative + total) % total],
    }))
  }, [mobileRecommendationIndex, mobileRecommendationItems])

  const movePracticeDeck = useCallback((direction) => {
    setPracticeDeckIndex((current) => {
      const total = PRACTICE_CARDS.length
      return (current + direction + total) % total
    })
  }, [])

  const moveMobileRecommendationDeck = useCallback(
    (direction) => {
      setMobileRecommendationIndex((current) => {
        const total = mobileRecommendationItems.length
        if (!total) return 0
        return (current + direction + total) % total
      })
    },
    [mobileRecommendationItems.length],
  )

  const handlePracticeDeckPointerDown = (event) => {
    if (event.button !== 0) return

    practiceDeckPointerRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startedAt: performance.now(),
      target: event.currentTarget,
      variant: event.currentTarget.dataset.practiceDeckVariant,
      scope: event.currentTarget.dataset.practiceDeckScope ?? 'practice',
      latestDragX: 0,
      animationFrame: null,
    }
    practiceDeckSuppressClickRef.current = false
    event.currentTarget.classList.add('is-dragging')
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePracticeDeckPointerMove = (event) => {
    const pointer = practiceDeckPointerRef.current
    if (!pointer || pointer.pointerId !== event.pointerId) return

    const rawDragX = event.clientX - pointer.startX
    const maxDragDistance =
      pointer.scope === 'recommendation'
        ? MOBILE_RECOMMENDATION_SWIPE_DISTANCE * MOBILE_RECOMMENDATION_MAX_SWIPE_CARDS
        : PRACTICE_DECK_SWIPE_DISTANCE
    const dragX = Math.max(-maxDragDistance, Math.min(maxDragDistance, rawDragX))
    if (Math.abs(rawDragX) > 6) practiceDeckSuppressClickRef.current = true
    pointer.latestDragX = dragX

    if (pointer.animationFrame !== null) return
    pointer.animationFrame = requestAnimationFrame(() => {
      applyPracticeDeckDragStyles(pointer.target, pointer.latestDragX, pointer.variant)
      pointer.animationFrame = null
    })
  }

  const finishPracticeDeckGesture = (event, cancelled = false) => {
    const pointer = practiceDeckPointerRef.current
    if (!pointer || pointer.pointerId !== event.pointerId) return

    const rawDragX = event.clientX - pointer.startX
    const elapsed = Math.max(1, performance.now() - pointer.startedAt)
    const velocity = rawDragX / elapsed
    const shouldAdvance = !cancelled && (Math.abs(rawDragX) >= 32 || Math.abs(velocity) >= 0.35)

    if (pointer.animationFrame !== null) cancelAnimationFrame(pointer.animationFrame)
    applyPracticeDeckDragStyles(pointer.target, pointer.latestDragX, pointer.variant)
    pointer.target.classList.remove('is-dragging')
    if (shouldAdvance) {
      const direction = rawDragX < 0 ? 1 : -1
      if (pointer.scope === 'recommendation') {
        const projectedDistance = Math.abs(rawDragX) + Math.abs(velocity) * 120
        const cardsToMove = Math.max(
          1,
          Math.min(MOBILE_RECOMMENDATION_MAX_SWIPE_CARDS, Math.round(projectedDistance / MOBILE_RECOMMENDATION_SWIPE_DISTANCE)),
        )
        moveMobileRecommendationDeck(direction * cardsToMove)
      } else movePracticeDeck(direction)
    }
    practiceDeckPointerRef.current = null

    requestAnimationFrame(() => {
      applyPracticeDeckDragStyles(pointer.target, 0, pointer.variant)
    })
  }

  const practiceDeckGestureProps = {
    onPointerDown: handlePracticeDeckPointerDown,
    onPointerMove: handlePracticeDeckPointerMove,
    onPointerUp: (event) => finishPracticeDeckGesture(event),
    onPointerCancel: (event) => finishPracticeDeckGesture(event, true),
  }

  const heatmapCells = useMemo(
    () =>
      createHeatmapCells(heatmapGrid.rows, heatmapGrid.cols, heatmapTokenColors).map((cell) => {
        const distance = Math.abs(cell.r - heatmapFocus.r) + Math.abs(cell.c - heatmapFocus.c)
        const ringAlpha = getHeatmapRingAlpha(distance)
        const fade = smoothHeatmapValue(1 - Math.hypot(cell.r - heatmapFocus.r, cell.c - heatmapFocus.c) / HEATMAP_FADE_RADIUS)
        const isFocus = heatmapFocus.mark && cell.r === Math.round(heatmapFocus.r) && cell.c === Math.round(heatmapFocus.c)

        return {
          ...cell,
          isFocus,
          style: {
            '--cell-bg': formatHeatmapRgba(cell.field.fill, ringAlpha),
            '--cell-border': formatHeatmapRgba(cell.field.fill, 0.16 * fade),
            '--dot': formatHeatmapRgba(cell.field.dot, 0.16 * fade),
          },
        }
      }),
    [heatmapFocus, heatmapGrid, heatmapTokenColors],
  )

  const expertCards = useMemo(
    () => EXPERT_CARDS.map((card, index) => normalizeExpertCard(card, index)),
    [],
  )

  const expertCardsMatchingBaseFilters = useMemo(() => {
    const keyword = expertSearch.trim().toLowerCase()

    return expertCards.filter((card) => {
      const matchesFilter = expertFilter === 'all-creators' || card.creator === CURRENT_USER_EXPERT_CREATOR
      const matchesKeyword = !keyword || `${card.title} ${card.desc} ${card.creator}`.toLowerCase().includes(keyword)
      return matchesFilter && matchesKeyword
    })
  }, [expertCards, expertFilter, expertSearch])

  const availableMobileExpertBusinessTabs = useMemo(
    () =>
      MOBILE_EXPERT_BUSINESS_TABS.filter(
        (tab) =>
          tab.value === 'all' ||
          expertCardsMatchingBaseFilters.some((card) => card.filterTags.includes(tab.value)),
      ),
    [expertCardsMatchingBaseFilters],
  )

  useEffect(() => {
    if (!availableMobileExpertBusinessTabs.some((tab) => tab.value === expertBusinessFilter)) {
      setExpertBusinessFilter('all')
    }
  }, [availableMobileExpertBusinessTabs, expertBusinessFilter])

  const filteredExpertCards = useMemo(
    () =>
      expertCardsMatchingBaseFilters.filter(
        (card) => expertBusinessFilter === 'all' || card.filterTags.includes(expertBusinessFilter),
      ),
    [expertBusinessFilter, expertCardsMatchingBaseFilters],
  )

  useEffect(() => {
    if (!expertSearch.trim()) {
      setExpertMobileSearchSubmitted(false)
    }
  }, [expertSearch])

  const libraryItemsMatchingSearch = useMemo(() => {
    const keyword = librarySearch.trim().toLowerCase()

    return LIBRARY_ITEMS.filter(
      (item) => !keyword || `${item.title} ${item.owner}`.toLowerCase().includes(keyword),
    )
  }, [librarySearch])

  useEffect(() => {
    if (!librarySearch.trim()) {
      setLibraryMobileSearchSubmitted(false)
    }
  }, [librarySearch])

  const availableMobileLibraryFilterOptions = useMemo(
    () =>
      MOBILE_LIBRARY_FILTER_OPTIONS.filter(
        (option) =>
          option.value === 'all' ||
          libraryItemsMatchingSearch.some((item) => matchesSessionOutputFileFilter(item.type, option.value)),
      ),
    [libraryItemsMatchingSearch],
  )

  useEffect(() => {
    const usesMobileCategory = MOBILE_LIBRARY_FILTER_OPTIONS.some((option) => option.value === libraryFilter)
    if (
      usesMobileCategory &&
      !availableMobileLibraryFilterOptions.some((option) => option.value === libraryFilter)
    ) {
      setLibraryFilter('all')
    }
  }, [availableMobileLibraryFilterOptions, libraryFilter])

  const filteredLibraryItems = useMemo(
    () =>
      libraryItemsMatchingSearch.filter(
        (item) =>
          libraryFilter === 'all' ||
          item.type === libraryFilter ||
          matchesSessionOutputFileFilter(item.type, libraryFilter),
      ),
    [libraryFilter, libraryItemsMatchingSearch],
  )

  const filteredSessionExistingData = useMemo(() => {
    const keyword = sessionFilesSourceSearch.trim().toLowerCase()

    return SESSION_FILES_EXISTING_DATA.map((block) => ({
      ...block,
      groups: block.groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => {
            const matchesItem = !keyword || item.title.toLowerCase().includes(keyword)
            const matchesPath = !keyword || group.path.toLowerCase().includes(keyword)
            return matchesItem || matchesPath
          }),
        }))
        .filter((group) => group.items.length > 0),
    })).filter((block) => block.groups.length > 0)
  }, [sessionFilesSourceSearch])

  const isExpertDetailView = activeNav === 'experts' && Boolean(activeExpertCard)
  const expertAlertCards = useMemo(() => expertCards.filter((card) => card.alertCount > 0), [expertCards])
  const expertAlertCount = useMemo(
    () => expertCards.reduce((sum, card) => sum + card.alertCount, 0),
    [expertCards],
  )
  const showExpertsAlerts = useMemo(
    () => expertAlertCount > 0 && hasNewExpertAlertsSinceDismiss(expertsAlertsDismissedSnapshot),
    [expertAlertCount, expertsAlertsDismissedSnapshot],
  )
  const doraAlertCount = useMemo(() => {
    const historyCount = sumMessageBadgeCounts(sessionStates.dora.historyItems)
    const avatarCount = sumMessageBadgeCounts(doraAvatars)
    return historyCount + avatarCount
  }, [doraAvatars, sessionStates.dora.historyItems])
  const showDoraAlerts = doraAlertCount > 0
  const activeExpertDetailConfig = useMemo(
    () => getExpertDetailConfig(activeExpertCard),
    [activeExpertCard],
  )
  const expertAgentOptions = useMemo(() => {
    if (!activeExpertCard) return expertCards
    return expertCards.some((card) => card.title === activeExpertCard.title)
      ? expertCards
      : [activeExpertCard, ...expertCards]
  }, [activeExpertCard, expertCards])
  const expertFavoriteCards = useMemo(
    () => expertCards.filter((card) => expertFavoriteKeys.includes(getExpertCardKey(card))),
    [expertCards, expertFavoriteKeys],
  )
  const mobileRecentExpertCards = expertRecentCards.slice(0, 9)
  const mobileFavoriteExpertCards = expertFavoriteCards
  const mobileExpertQuickSections = [
    ...(mobileRecentExpertCards.length
      ? [{ id: 'recent', title: '最近使用', cards: mobileRecentExpertCards }]
      : []),
    ...(mobileFavoriteExpertCards.length
      ? [{ id: 'favorite', title: '我收藏的', cards: mobileFavoriteExpertCards }]
      : []),
  ]
  const showExpertSidePanel = expertRecentCards.length > 0 || expertFavoriteCards.length > 0
  const activeExpertTabs = useMemo(
    () => getVisibleExpertTabs(activeExpertDetailConfig.tabs),
    [activeExpertDetailConfig],
  )
  const activeExpertTabPrompts = useMemo(
    () => pickRandomExpertPrompts(activeExpertTabs[activeExpertTab]),
    [activeExpertCard, activeExpertTab, activeExpertTabs],
  )
  const updateLibraryRecentScrollState = useCallback(() => {
    const scroller = libraryRecentScrollerRef.current
    if (!scroller) {
      setLibraryRecentHasOverflow(false)
      setLibraryRecentCanScrollPrev(false)
      setLibraryRecentCanScrollNext(false)
      return
    }

    const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth)
    setLibraryRecentHasOverflow(maxScrollLeft > 1)
    setLibraryRecentCanScrollPrev(scroller.scrollLeft > 1)
    setLibraryRecentCanScrollNext(scroller.scrollLeft < maxScrollLeft - 1)
  }, [])

  const scrollLibraryRecentBackward = useCallback(() => {
    const scroller = libraryRecentScrollerRef.current
    if (!scroller) return

    const firstCard = scroller.querySelector('.library-recent-card')
    const gap = Number.parseFloat(window.getComputedStyle(scroller).gap || '16') || 16
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 170
    scroller.scrollBy({
      left: -(cardWidth + gap) * 3,
      behavior: 'smooth',
    })
  }, [])

  const scrollLibraryRecentForward = useCallback(() => {
    const scroller = libraryRecentScrollerRef.current
    if (!scroller) return

    const firstCard = scroller.querySelector('.library-recent-card')
    const gap = Number.parseFloat(window.getComputedStyle(scroller).gap || '16') || 16
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 170
    scroller.scrollBy({
      left: (cardWidth + gap) * 3,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    updateLibraryRecentScrollState()
  }, [activeLibraryItem, activeNav, libraryRecentItems, updateLibraryRecentScrollState])

  useEffect(() => {
    const handleResize = () => updateLibraryRecentScrollState()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateLibraryRecentScrollState])

  const openExpertCard = (card) => {
    setMobileRecommendationIndex(0)
    setExpertRecentCards((prev) => {
      const key = getExpertCardKey(card)
      return [card, ...prev.filter((entry) => getExpertCardKey(entry) !== key)].slice(0, 9)
    })
    setMobileRecommendationRecents((prev) => {
      const recommendation = createExpertRecommendationItem(card)
      return [recommendation, ...prev.filter((item) => item.id !== recommendation.id)].slice(
        0,
        MOBILE_RECOMMENDATION_LIMIT,
      )
    })
    setActiveInnerAction('new-chat')
    setActiveExpertCard(card)
    setInternalSidebarOpen(true)
  }
  const toggleExpertFavorite = (card) => {
    const key = getExpertCardKey(card)
    setExpertFavoriteKeys((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [key, ...prev]))
  }
  const activeSessionScope = isExpertDetailView ? 'experts' : 'dora'
  const activeSessionState = sessionStates[activeSessionScope]
  const historyItems = activeSessionState.historyItems
  const groupedHistoryItems = useMemo(() => {
    const buckets = Object.fromEntries(HISTORY_GROUPS.map((group) => [group.id, []]))
    historyItems.forEach((item) => {
      const groupId = item.group ?? 'earlier'
      if (buckets[groupId]) buckets[groupId].push(item)
    })
    return HISTORY_GROUPS.filter((group) => buckets[group.id].length > 0).map((group) => ({
      ...group,
      items: buckets[group.id],
    }))
  }, [historyItems])
  const selectedLanguageOption = useMemo(
    () => USER_MENU_LANGUAGES.find((lang) => lang.id === selectedLanguage) ?? USER_MENU_LANGUAGES[0],
    [selectedLanguage],
  )
  const inputText = activeSessionState.inputText
  const composerSegments = normalizeComposerSegments(activeSessionState)
  const composerPlainText = useMemo(() => getComposerPlainText(composerSegments), [composerSegments])
  const inputFocused = activeSessionState.inputFocused
  const isTransitioningSession = activeSessionState.isTransitioningSession
  const isGeneratingSession = activeSessionState.isGeneratingSession
  const isSessionBusy = isTransitioningSession || isGeneratingSession
  const activeSessionTurns = useMemo(() => getSessionTurnsFromState(activeSessionState), [activeSessionState])
  const activeSessionPrompt = activeSessionState.activeSessionPrompt
  const activeSessionUserFiles = activeSessionState.activeSessionUserFiles ?? []
  const activeSessionCompletedMeta = activeSessionState.activeSessionCompletedMeta
  const activeHistoryItemId = activeSessionState.activeHistoryItemId
  const activeSessionHistoryItem = useMemo(
    () => activeSessionState.historyItems.find((item) => item.id === activeHistoryItemId) ?? null,
    [activeHistoryItemId, activeSessionState.historyItems],
  )
  const activeSessionSentAt = activeSessionHistoryItem?.sentAt ?? null
  const isQuestionMode = activeSessionTurns.length > 0 || Boolean(activeSessionPrompt)
  const isLibraryDetailView = activeNav === 'library' && Boolean(activeLibraryItem)
  const currentScheduleScope = isExpertDetailView ? 'experts' : 'dora'
  const currentScheduleAgentTitle = isExpertDetailView ? activeExpertCard?.title ?? '当前 Agent' : 'Dora'
  const currentScheduleAgentAvatar = isExpertDetailView ? activeExpertCard?.icon ?? agentDefaultAvatarImage : activeDoraImage
  const isScheduleView = activeInnerAction === 'schedule' && (activeNav === 'dora' || isExpertDetailView)
  const isDoraAskPage = activeNav === 'dora' && !isLibraryDetailView && !isScheduleView
  const isInnerAvatarGroupCollapsed = Boolean(innerAvatarGroupCollapsed[activeSessionScope])
  const activeLibraryKey = activeLibraryItem ? getLibraryItemKey(activeLibraryItem) : ''
  const libraryChatSessions = useMemo(
    () => (activeLibraryKey ? libraryChatSessionsByKey[activeLibraryKey] ?? [] : []),
    [activeLibraryKey, libraryChatSessionsByKey],
  )
  const filteredLibraryChatSessions = useMemo(() => {
    const keyword = libraryChatSessionSearch.trim().toLowerCase()
    if (!keyword) return libraryChatSessions
    return libraryChatSessions.filter((item) => item.label.toLowerCase().includes(keyword))
  }, [libraryChatSessions, libraryChatSessionSearch])
  const currentScheduleTasks = scheduleTasksByScope[currentScheduleScope] ?? []
  const filteredScheduleTasks = useMemo(() => {
    const keyword = scheduleSearch.trim().toLowerCase()

    return currentScheduleTasks.filter((task) => {
      const matchesKeyword =
        !keyword || `${task.title} ${task.summary} ${task.scheduleText}`.toLowerCase().includes(keyword)
      const matchesSource = scheduleSourceFilter === 'all' || task.source === scheduleSourceFilter
      const matchesChannel = scheduleChannelFilter === 'all' || task.channels.includes(scheduleChannelFilter)
      return matchesKeyword && matchesSource && matchesChannel
    })
  }, [currentScheduleTasks, scheduleChannelFilter, scheduleSearch, scheduleSourceFilter])
  const filteredSessionSourceSections = useMemo(() => {
    const keyword = sessionFilesSourceSearch.trim().toLowerCase()

    return sessionFilesSourceSections.map((section) => ({
      ...section,
      files: section.files.filter((file) => {
        if (section.id !== 'local' && isSessionSourceSpreadsheetFile(file)) return false
        const inScope = file.scopes?.includes(sessionFilesSourceScope) ?? true
        if (sessionFilesSourceScope === 'session' && !isQuestionMode) {
          return false
        }
        const matchesKeyword = !keyword || file.title.toLowerCase().includes(keyword)
        return inScope && matchesKeyword
      }),
    })).filter((section) => (keyword ? section.files.length > 0 : true))
  }, [isQuestionMode, sessionFilesSourceScope, sessionFilesSourceSearch, sessionFilesSourceSections])
  const toggleInnerAvatarGroupCollapsed = useCallback(() => {
    setInnerAvatarGroupCollapsed((prev) => ({
      ...prev,
      [activeSessionScope]: !prev[activeSessionScope],
    }))
  }, [activeSessionScope])
  const toggleHistoryGroupCollapsed = useCallback(
    (groupId) => {
      const collapseKey = `${activeSessionScope}:${groupId}`
      setHistoryGroupsCollapsed((prev) => ({
        ...prev,
        [collapseKey]: !prev[collapseKey],
      }))
    },
    [activeSessionScope],
  )
  const showSessionSplit =
    sessionFilesPanelOpen && (activeNav === 'dora' || isExpertDetailView)
  const activeSessionSourceLibraryItem = useMemo(() => {
    if (!isQuestionMode || activeNav === 'library') return null

    if (activeHistoryItemId) {
      const directMatch = LIBRARY_ITEMS.find((item) => item.sourceHistoryId === activeHistoryItemId)
      if (directMatch) return directMatch
    }

    const agentTitle = isExpertDetailView ? activeExpertCard?.title ?? '' : ''
    const linkedConfig = SESSION_HEADER_SOURCE_LIBRARY_LINKS.find((item) => {
      if (item.scope !== activeSessionScope) return false
      if (item.historyId !== activeHistoryItemId) return false
      if (item.scope === 'experts' && item.agentTitle !== agentTitle) return false
      return true
    })

    if (!linkedConfig) return null
    return LIBRARY_ITEMS.find((item) => item.sourceHistoryId === linkedConfig.librarySourceHistoryId) ?? null
  }, [activeHistoryItemId, activeNav, activeSessionScope, activeExpertCard, isExpertDetailView, isQuestionMode])
  const derivedSessionOutputFiles = useMemo(
    () => mergeDerivedSessionOutputFiles(sessionOutputFiles, activeSessionSourceLibraryItem),
    [activeSessionSourceLibraryItem, sessionOutputFiles],
  )
  const isNewChatActive = (activeNav === 'dora' || isExpertDetailView) && !activeSessionPrompt && !isSessionBusy
  const visibleSessionOutputFiles = useMemo(
    () => (isNewChatActive ? [] : derivedSessionOutputFiles),
    [derivedSessionOutputFiles, isNewChatActive],
  )
  const availableSessionFilesFilterOptions = useMemo(() => {
    const categoriesWithFiles = new Set(
      visibleSessionOutputFiles.map((item) => getSessionOutputFileFilterCategory(item.type)),
    )

    return SESSION_FILES_OUTPUT_FILTER_OPTIONS.filter(
      (option) => option.value === 'all' || categoriesWithFiles.has(option.value),
    )
  }, [visibleSessionOutputFiles])
  const filteredSessionFiles = useMemo(() => {
    const keyword = sessionFilesSearch.trim().toLowerCase()

    return visibleSessionOutputFiles.filter((item) => {
      const matchesFilter = matchesSessionOutputFileFilter(item.type, sessionFilesFilter)
      const matchesKeyword = !keyword || `${item.title} ${item.desc}`.toLowerCase().includes(keyword)
      return matchesFilter && matchesKeyword
    })
  }, [sessionFilesFilter, sessionFilesSearch, visibleSessionOutputFiles])
  useEffect(() => {
    if (sessionFilesFilter === 'all') return

    const isFilterAvailable = availableSessionFilesFilterOptions.some(
      (option) => option.value === sessionFilesFilter,
    )

    if (!isFilterAvailable) {
      setSessionFilesFilter('all')
    }
  }, [availableSessionFilesFilterOptions, sessionFilesFilter])
  const activeSessionFile = useMemo(
    () => visibleSessionOutputFiles.find((item) => item.id === activeSessionFileId) ?? null,
    [activeSessionFileId, visibleSessionOutputFiles],
  )
  const activeSessionSourceFile = useMemo(() => {
    if (!activeSessionSourceFileId) return null

    for (const section of sessionFilesSourceSections) {
      const match = section.files.find((file) => file.id === activeSessionSourceFileId)
      if (match) return toSessionSourcePreviewFile(match)
    }

    return null
  }, [activeSessionSourceFileId, sessionFilesSourceSections])
  const activeSessionSourceFileRaw = useMemo(() => {
    if (!activeSessionSourceFileId) return null

    for (const section of sessionFilesSourceSections) {
      const match = section.files.find((file) => file.id === activeSessionSourceFileId)
      if (match) return match
    }

    return null
  }, [activeSessionSourceFileId, sessionFilesSourceSections])
  const activeSessionSourceSection = useMemo(() => {
    if (!activeSessionSourceFileId) return null

    for (const section of sessionFilesSourceSections) {
      if (section.files.some((file) => file.id === activeSessionSourceFileId)) {
        return section
      }
    }

    return null
  }, [activeSessionSourceFileId, sessionFilesSourceSections])
  const isSessionReadonlySourceFilePreview =
    activeSessionSourceSection?.id?.startsWith('connector-') ||
    activeSessionSourceSection?.variant === 'builtin' ||
    false
  const sessionMarkdownHeadings = useMemo(
    () => extractMarkdownHeadings(sessionMarkdownContent),
    [sessionMarkdownContent],
  )
  const activeSessionSourceFileHtml = useMemo(() => {
    if (activeSessionSourceFile?.type !== 'md') return ''
    return parseSessionMarkdownHtml(sessionMarkdownContent)
  }, [activeSessionSourceFile, sessionMarkdownContent])
  const activeSessionPreviewFile = useMemo(() => {
    if (activeSessionSourceFile) return activeSessionSourceFile
    if (activeSessionFile) return activeSessionFile
    return null
  }, [activeSessionFile, activeSessionSourceFile])
  const activeSessionPreviewHtml = useMemo(() => {
    if (activeSessionSourceFile) return activeSessionSourceFileHtml
    if (activeSessionFile?.type === 'md') return parseSessionMarkdownHtml(sessionMarkdownContent)
    return ''
  }, [activeSessionFile, activeSessionSourceFile, activeSessionSourceFileHtml, sessionMarkdownContent])
  const activeSessionPreviewCiteFile = useMemo(() => {
    if (activeSessionSourceFileRaw) return activeSessionSourceFileRaw
    if (activeSessionFile) return activeSessionFile
    return null
  }, [activeSessionFile, activeSessionSourceFileRaw])
  const activeSessionSpreadsheetSheet = useMemo(
    () => getSpreadsheetSheetById(sessionSpreadsheetWorkbook, activeSessionSpreadsheetSheetId),
    [activeSessionSpreadsheetSheetId, sessionSpreadsheetWorkbook],
  )
  useEffect(() => {
    if (activeSessionSourceFileId && !activeSessionSourceFile) {
      setActiveSessionSourceFileId(null)
    }
  }, [activeSessionSourceFile, activeSessionSourceFileId])
  useEffect(() => {
    if (activeSessionFileId && !activeSessionFile) {
      setActiveSessionFileId(null)
    }
  }, [activeSessionFile, activeSessionFileId])
  const composerFiles = activeSessionState.composerFiles ?? []
  const canSend = useMemo(() => {
    const hasText = composerPlainText.trim().length > 0 || getComposerHasContent(composerSegments)
    const hasReadyFiles = composerFiles.some((file) => file.status === 'done')
    const isUploading = composerFiles.some((file) => file.status === 'uploading')
    return (hasText || hasReadyFiles) && !isUploading
  }, [composerPlainText, composerSegments, composerFiles])
  const mentionScopeComposerFiles = sessionStates[mentionPanel.scope]?.composerFiles ?? []
  const senderMentionGroups = useMemo(() => {
    if (!mentionPanel.open) return []
    return buildSenderMentionGroups({
      composerFiles: mentionScopeComposerFiles,
      sessionOutputFiles: derivedSessionOutputFiles,
      query: mentionPanel.query,
    })
  }, [derivedSessionOutputFiles, mentionPanel.open, mentionPanel.scope, mentionPanel.query, mentionScopeComposerFiles])
  const senderMentionFlatItems = useMemo(() => flattenSenderMentionGroups(senderMentionGroups), [senderMentionGroups])
  const activeHeroSkillTag = useMemo(
    () => HERO_SKILL_TAGS.find((tag) => tag.id === activeHeroSkillTagId) ?? null,
    [activeHeroSkillTagId],
  )
  const showHeroSkillSenderUi = !isQuestionMode && Boolean(activeHeroSkillTag)
  const senderPlaceholder = activeHeroSkillTag
    ? (HERO_SKILL_TAG_PLACEHOLDERS[activeHeroSkillTag.id] ?? '输入任何您想查询或分析的问题')
    : '输入任何您想查询或分析的问题'
  const [displayedSenderPlaceholder, setDisplayedSenderPlaceholder] = useState('')
  const displayedSenderPlaceholderRef = useRef('')

  useEffect(() => {
    displayedSenderPlaceholderRef.current = displayedSenderPlaceholder
  }, [displayedSenderPlaceholder])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setDisplayedSenderPlaceholder(senderPlaceholder)
      displayedSenderPlaceholderRef.current = senderPlaceholder
      return undefined
    }

    let cancelled = false
    let timer = null
    const TYPE_MS = 38
    const START_MS = 90

    displayedSenderPlaceholderRef.current = ''
    setDisplayedSenderPlaceholder('')

    const step = () => {
      if (cancelled) return

      const current = displayedSenderPlaceholderRef.current
      const goal = senderPlaceholder

      if (current.length >= goal.length) return

      const next = goal.slice(0, current.length + 1)
      displayedSenderPlaceholderRef.current = next
      setDisplayedSenderPlaceholder(next)
      timer = window.setTimeout(step, TYPE_MS)
    }

    timer = window.setTimeout(step, START_MS)

    return () => {
      cancelled = true
      if (timer) window.clearTimeout(timer)
    }
  }, [senderPlaceholder])

  useEffect(() => {
    if (activeHeroSkillTagId) {
      setSlotPromptTagId(activeHeroSkillTagId)
      heroSkillTagWasSelectedRef.current = true
      setSkillSlotAnimate(true)
      return undefined
    }

    const slotTimer = window.setTimeout(() => setSlotPromptTagId(null), 500)

    if (heroSkillTagWasSelectedRef.current) {
      setTagsAnimKey((key) => key + 1)
    }

    return () => {
      window.clearTimeout(slotTimer)
    }
  }, [activeHeroSkillTagId])
  const activeLibraryTitle = activeLibraryItem ? activeLibraryItem.title : ''
  const activeLibraryMarkdown = activeLibraryItem?.type === 'md' ? financialBiMdContent : ''
  const activeLibraryHtml = useMemo(() => {
    if (!activeLibraryMarkdown) return ''
    return marked.parse(activeLibraryMarkdown)
  }, [activeLibraryMarkdown])
  const activeInnerSidebarOpen = internalSidebarOpen
  const panelToggleTitle = activeInnerSidebarOpen ? '收起侧栏' : '展开侧栏'

  const updateSessionScopeState = (scope, updater) => {
    setSessionStates((prev) => {
      const current = prev[scope]
      const next = typeof updater === 'function' ? updater(current) : { ...current, ...updater }
      if (next === current) return prev
      return { ...prev, [scope]: next }
    })
  }

  const updateActiveSessionState = (updater) => {
    updateSessionScopeState(activeSessionScope, updater)
  }

  const clearHistoryGenerationTimer = useCallback((scope, itemId) => {
    const timerKey = `${scope}:${itemId}`
    const timer = historyGenerationTimersRef.current.get(timerKey)
    if (!timer) return
    window.clearTimeout(timer)
    historyGenerationTimersRef.current.delete(timerKey)
  }, [])

  useEffect(() => {
    const trackedKeys = new Set()

    Object.entries(sessionStates).forEach(([scope, state]) => {
      state.historyItems.forEach((item) => {
        const timerKey = `${scope}:${item.id}`
        const isForegroundGenerating =
          state.activeHistoryItemId === item.id && (state.isTransitioningSession || state.isGeneratingSession)

        if (!item.isGenerating || isForegroundGenerating) {
          clearHistoryGenerationTimer(scope, item.id)
          return
        }

        trackedKeys.add(timerKey)
        if (historyGenerationTimersRef.current.has(timerKey)) return

        const timer = window.setTimeout(() => {
          historyGenerationTimersRef.current.delete(timerKey)
          updateSessionScopeState(scope, (prev) => {
            const target = prev.historyItems.find((entry) => entry.id === item.id)
            if (!target?.isGenerating) return prev

            return {
              ...prev,
              historyItems: completeHistoryItemGeneration(prev.historyItems, item.id, {
                incrementUnread: prev.activeHistoryItemId !== item.id,
              }),
            }
          })
        }, HISTORY_BACKGROUND_COMPLETE_DELAY_MS)

        historyGenerationTimersRef.current.set(timerKey, timer)
      })
    })

    Array.from(historyGenerationTimersRef.current.keys()).forEach((timerKey) => {
      if (trackedKeys.has(timerKey)) return
      const timer = historyGenerationTimersRef.current.get(timerKey)
      window.clearTimeout(timer)
      historyGenerationTimersRef.current.delete(timerKey)
    })
  }, [clearHistoryGenerationTimer, sessionStates])

  useEffect(
    () => () => {
      historyGenerationTimersRef.current.forEach((timer) => window.clearTimeout(timer))
      historyGenerationTimersRef.current.clear()
    },
    [],
  )

  const updateAgentMenuPosition = () => {
    const rect = agentTitleRef.current?.getBoundingClientRect()
    if (!rect) return
    setAgentMenuPos({ top: rect.bottom + 8, left: rect.left })
  }

  const toggleAgentMenu = () => {
    if (!innerAgentMenuOpen) updateAgentMenuPosition()
    setInnerAgentMenuOpen((prev) => !prev)
  }

  const openAttachmentPicker = () => {
    fileInputRef.current?.click()
  }

  const clearComposerUploadTimer = (fileId) => {
    const timer = uploadTimersRef.current.get(fileId)
    if (timer) {
      clearInterval(timer)
      uploadTimersRef.current.delete(fileId)
    }
  }

  const clearSessionTransitionTimer = (scope) => {
    const timer = sessionTransitionTimersRef.current.get(scope)
    if (timer) {
      window.clearTimeout(timer)
      sessionTransitionTimersRef.current.delete(scope)
    }
  }

  const beginSessionTransition = (scope, userFiles = []) => {
    clearSessionTransitionTimer(scope)
    void userFiles
    updateSessionScopeState(scope, (prev) => {
      if (!prev.isTransitioningSession) return prev
      return {
        ...prev,
        isTransitioningSession: false,
        isGeneratingSession: true,
      }
    })
  }

  const clearScopeComposerUploadTimers = (files) => {
    ;(files ?? []).forEach((file) => clearComposerUploadTimer(file.id))
  }

  const startComposerUpload = (scope, fileId, size) => {
    const duration = getUploadDuration(size)
    const totalTicks = Math.max(1, Math.ceil(duration / UPLOAD_PROGRESS_INTERVAL_MS))
    const increment = 100 / totalTicks

    const tick = () => {
      setSessionStates((prev) => {
        const current = prev[scope]
        const target = (current.composerFiles ?? []).find((file) => file.id === fileId)
        if (!target || target.status !== 'uploading') return prev

        const nextProgress = Math.min(100, (target.progress ?? 0) + increment)
        const isDone = nextProgress >= 100

        if (isDone) {
          clearComposerUploadTimer(fileId)
        }

        return {
          ...prev,
          [scope]: {
            ...current,
            composerFiles: (current.composerFiles ?? []).map((file) =>
              file.id === fileId
                ? { ...file, progress: nextProgress, status: isDone ? 'done' : 'uploading' }
                : file,
            ),
          },
        }
      })
    }

    tick()
    const timer = window.setInterval(tick, UPLOAD_PROGRESS_INTERVAL_MS)
    uploadTimersRef.current.set(fileId, timer)
  }

  const removeComposerFile = (scope, fileId) => {
    clearComposerUploadTimer(fileId)
    updateSessionScopeState(scope, (prev) => ({
      ...prev,
      composerFiles: (prev.composerFiles ?? []).filter((file) => file.id !== fileId),
    }))
  }

  const handleLocalFilesSelected = (event) => {
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return

    const scope = activeSessionScope
    const newEntries = []

    setSessionStates((prev) => {
      const current = prev[scope]
      const existing = current.composerFiles ?? []
      const deduped = files.filter(
        (file) => !existing.some((item) => item.name === file.name && item.source === 'local'),
      )

      if (!deduped.length) return prev

      const nextAttachments = deduped.map((file) => {
        const entry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: file.name,
          size: file.size,
          icon: getAttachmentFileIcon(file.name),
          source: 'local',
          status: 'uploading',
          progress: 0,
        }
        newEntries.push(entry)
        return entry
      })

      return {
        ...prev,
        [scope]: {
          ...current,
          composerFiles: [...existing, ...nextAttachments],
        },
      }
    })

    window.setTimeout(() => {
      newEntries.forEach((entry) => startComposerUpload(scope, entry.id, entry.size))
    }, 0)
    event.target.value = ''
  }

  const retryComposerUpload = (scope, fileId) => {
    const file = sessionStates[scope]?.composerFiles?.find((item) => item.id === fileId)
    if (!file) return

    updateSessionScopeState(scope, (prev) => ({
      ...prev,
      composerFiles: (prev.composerFiles ?? []).map((item) =>
        item.id === fileId ? { ...item, status: 'uploading', progress: 0 } : item,
      ),
    }))
    window.setTimeout(() => startComposerUpload(scope, fileId, file.size), 0)
  }

  const renderComposerFileMeta = (scope, file) => {
    if (file.status === 'failed') {
      return (
        <div className="sender-attachment-card__meta sender-attachment-card__meta--failed">
          <span className="sender-attachment-card__status">失败</span>
          <button
            type="button"
            className="sender-attachment-card__retry"
            onClick={() => retryComposerUpload(scope, file.id)}
          >
            重试
          </button>
        </div>
      )
    }

    return <p className="sender-attachment-card__size">{formatAttachmentFileSize(file.size)}</p>
  }

  const renderSenderAttachments = (scope) => {
    const attachments = sessionStates[scope]?.composerFiles ?? []
    if (!attachments.length) return null

    return (
      <div className="sender-attachments" aria-label="已上传文件">
        {attachments.map((file) => {
          const isHovered = hoveredComposerFileId === file.id
          const isUploading = file.status === 'uploading'
          const isFailed = file.status === 'failed'
          const isDone = file.status === 'done'

          return (
            <article
              key={file.id}
              className={[
                'sender-attachment-card',
                isUploading ? 'uploading' : '',
                isFailed ? 'is-failed' : '',
                isHovered ? 'is-hovered' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() => setHoveredComposerFileId(file.id)}
              onMouseLeave={() => setHoveredComposerFileId((prev) => (prev === file.id ? null : prev))}
            >
              <div className="sender-attachment-card__inner">
                {isUploading ? (
                  <span
                    className="sender-attachment-card__progress"
                    style={{ width: `${file.progress ?? 0}%` }}
                    aria-hidden="true"
                  />
                ) : null}
                <div className="sender-attachment-card__body">
                  <img src={file.icon} alt="" className="sender-attachment-card__icon" />
                  <div className="sender-attachment-card__text">
                    <p className="sender-attachment-card__name" title={file.name}>
                      {file.name}
                    </p>
                    {renderComposerFileMeta(scope, file)}
                  </div>
                </div>
              </div>
              {isDone || isUploading ? (
                <button
                  type="button"
                  className="sender-attachment-card__remove"
                  aria-label={`移除 ${file.name}`}
                  onClick={() => removeComposerFile(scope, file.id)}
                >
                  <span className="dora-icon" aria-hidden="true">
                    {ICONS.close}
                  </span>
                </button>
              ) : null}
            </article>
          )
        })}
      </div>
    )
  }

  const resizeSenderEditor = (editor) => {
    if (!editor) return
    editor.style.height = 'auto'
    const nextHeight = Math.min(SENDER_TEXTAREA_MAX_HEIGHT, Math.max(SENDER_TEXTAREA_MIN_HEIGHT, editor.scrollHeight))
    editor.style.height = `${nextHeight}px`
    editor.style.overflowY = editor.scrollHeight > SENDER_TEXTAREA_MAX_HEIGHT ? 'auto' : 'hidden'
  }

  const trimTrailingComposerBreak = (editor) => {
    while (editor.lastChild?.nodeName === 'BR') {
      editor.lastChild.remove()
    }
  }

  const applyComposerSegmentsToEditor = (editor, segments, { preserveSelection = false } = {}) => {
    if (!editor) return

    const normalized = mergeAdjacentComposerTextSegments(
      normalizeComposerSegments({ composerSegments: segments }),
    )
    const html = buildComposerEditorHtml(normalized)
    const selectionOffset = preserveSelection ? getComposerSelectionOffset(editor) : null

    if (editor.innerHTML !== html) {
      composerSyncRef.current = true
      editor.innerHTML = html
      trimTrailingComposerBreak(editor)
      if (preserveSelection && selectionOffset !== null) {
        setComposerSelectionOffset(editor, selectionOffset)
      }
      composerSyncRef.current = false
    }

    resizeSenderEditor(editor)
  }

  const syncComposerEditorFromSegments = (segments) => {
    applyComposerSegmentsToEditor(senderEditorRef.current, segments)
  }

  const updateComposerSegments = (scope, segments) => {
    const normalized = mergeAdjacentComposerTextSegments(segments)
    updateSessionScopeState(scope, (prev) => ({
      ...prev,
      composerSegments: normalized,
      inputText: getComposerPlainText(normalized),
    }))
  }

  const resolveReferencedSessionFileId = (fileId, label) => {
    if (fileId && derivedSessionOutputFiles.some((file) => file.id === fileId)) {
      return fileId
    }

    if (label) {
      const matched = derivedSessionOutputFiles.find((file) => file.title === label)
      if (matched) return matched.id
    }

    const scopeFiles = sessionStates[activeSessionScope]?.composerFiles ?? []
    const composerFile = scopeFiles.find(
      (file) => `upload-${file.id}` === fileId || file.id === fileId || (label && file.name === label),
    )
    if (!composerFile) return fileId || null

    const resolvedId = `upload-${composerFile.id}`
    if (!derivedSessionOutputFiles.some((file) => file.id === resolvedId)) {
      setSessionOutputFiles((prev) => [
        {
          id: resolvedId,
          type: getAttachmentFileType(composerFile.name),
          title: composerFile.name,
          desc: formatAttachmentFileSize(composerFile.size),
          icon: composerFile.icon,
        },
        ...prev.filter((file) => file.id !== resolvedId),
      ])
    }

    return resolvedId
  }

  const openReferencedSessionFile = (fileId, label = '') => {
    const resolvedId = resolveReferencedSessionFileId(fileId, label)
    if (!resolvedId) return

    openSessionOutputFilePreview(resolvedId)

    if (activeNav === 'dora' || isExpertDetailView) {
      setInternalSidebarOpen(false)
      setSessionFileRefPreviewOpen(true)
      setSessionFilesPanelOpen(true)
      setLibrarySessionFilesModalOpen(false)
      return
    }

    setLibrarySessionFilesModalOpen(true)
  }

  const closeSenderMentionPanel = () => {
    setMentionPanel((prev) => ({ ...prev, open: false, activeIndex: 0 }))
  }

  const syncSenderMentionPanel = (scope, editor) => {
    const plainText = getComposerPlainText(parseComposerEditorToSegments(editor))
    const cursor = getComposerSelectionOffset(editor)
    const mention = getActiveSenderMention(plainText, cursor)

    if (!mention) {
      closeSenderMentionPanel()
      return
    }

    setMentionPanel((prev) => ({
      open: true,
      scope,
      query: mention.query,
      start: mention.start,
      activeIndex:
        prev.open && prev.scope === scope && prev.start === mention.start && prev.query === mention.query
          ? prev.activeIndex
          : 0,
    }))
  }

  const handleComposerInput = (scope) => {
    const editor = senderEditorRef.current
    if (!editor || composerSyncRef.current) return

    composerUpdateSourceRef.current = 'editor'
    const segments = mergeAdjacentComposerTextSegments(parseComposerEditorToSegments(editor))
    updateComposerSegments(scope, segments)

    resizeSenderEditor(editor)
    syncSenderMentionPanel(scope, editor)
  }

  const handleComposerCompositionEnd = (scope) => {
    composerComposingRef.current = false
    handleComposerInput(scope)
  }

  const toggleSourceFileCitation = (scope, file) => {
    const currentSegments = normalizeComposerSegments(sessionStates[scope])
    const existingRef = findSourceFileComposerRef(currentSegments, file)

    if (existingRef) {
      const nextSegments = removeComposerRefSegment(currentSegments, existingRef.id)
      updateComposerSegments(scope, nextSegments)
      requestAnimationFrame(() => {
        syncComposerEditorFromSegments(nextSegments)
        senderEditorRef.current?.focus()
      })
      return
    }

    const refSegment = createComposerRefSegment({
      label: file.title,
      icon: file.icon,
      sessionFileId: file.sessionFileId ?? file.id,
    })
    const nextSegments = appendComposerRefSegment(currentSegments, refSegment)
    updateComposerSegments(scope, nextSegments)

    requestAnimationFrame(() => {
      syncComposerEditorFromSegments(nextSegments)
      const editor = senderEditorRef.current
      if (!editor) return
      editor.focus()
      setComposerSelectionToEnd(editor)
      resizeSenderEditor(editor)
    })
  }

  const insertSenderMention = (scope, item) => {
    const editor = senderEditorRef.current
    if (!editor || !mentionPanel.open || mentionPanel.scope !== scope) return

    const currentSegments = normalizeComposerSegments(sessionStates[scope])
    const cursor = getComposerSelectionOffset(editor)
    const mentionStart = mentionPanel.start
    const mentionEnd = cursor
    const refSegment = createComposerRefSegment(item)
    const nextSegments = insertRefIntoComposerSegments(currentSegments, mentionStart, mentionEnd, refSegment)

    updateComposerSegments(scope, nextSegments)
    closeSenderMentionPanel()

    requestAnimationFrame(() => {
      syncComposerEditorFromSegments(nextSegments)
      editor.focus()
      setComposerSelectionToEnd(editor)
      resizeSenderEditor(editor)
    })
  }

  const handleComposerEditorClick = (scope, event) => {
    const removeBtn = event.target.closest('.sender-ref-tag__remove')
    if (removeBtn) {
      event.preventDefault()
      const tag = removeBtn.closest('.sender-ref-tag')
      if (!tag?.dataset.refId) return
      const nextSegments = removeComposerRefSegment(normalizeComposerSegments(sessionStates[scope]), tag.dataset.refId)
      updateComposerSegments(scope, nextSegments)
      requestAnimationFrame(() => syncComposerEditorFromSegments(nextSegments))
      return
    }

    const tag = event.target.closest('.sender-ref-tag')
    if (!tag) return

    event.preventDefault()
    openReferencedSessionFile(tag.dataset.fileId, tag.dataset.label)
  }

  const renderSenderMentionPanel = (scope) => {
    if (!mentionPanel.open || mentionPanel.scope !== scope) return null

    const activeItem = senderMentionFlatItems[mentionPanel.activeIndex] ?? null

    return (
      <div className="sender-mention-panel" role="listbox" aria-label="引用会话文件">
        {senderMentionGroups.length ? (
          senderMentionGroups.map((group) => (
            <div key={group.label} className="sender-mention-panel__group">
              <p className="sender-mention-panel__group-label">{group.label}</p>
              {group.items.map((item) => {
                const flatIndex = senderMentionFlatItems.findIndex((entry) => entry.id === item.id)
                const isActive = activeItem?.id === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`sender-mention-panel__item${isActive ? ' is-active' : ''}`}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => {
                      if (flatIndex >= 0) {
                        setMentionPanel((prev) => ({ ...prev, activeIndex: flatIndex }))
                      }
                    }}
                    onClick={() => insertSenderMention(scope, item)}
                  >
                    <img src={item.icon} alt="" className="sender-mention-panel__icon" />
                    <span className="sender-mention-panel__label">{renderSenderMentionLabel(item.label, mentionPanel.query)}</span>
                  </button>
                )
              })}
            </div>
          ))
        ) : (
          <p className="sender-mention-panel__empty">无匹配文件</p>
        )}
      </div>
    )
  }

  const renderSenderInnerContent = (scope) => (
    <>
      {renderSenderMentionPanel(scope)}
      {renderSenderAttachments(scope)}
      {renderSenderTextarea(scope)}
    </>
  )

  const renderSenderTextarea = (scope) => (
    <div className="sender-input-wrap">
      <div
        ref={(node) => {
          senderEditorRef.current = node
        }}
        className={`sender-editor${getComposerHasContent(composerSegments) ? '' : ' is-empty'}`}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        data-placeholder={displayedSenderPlaceholder}
        onCompositionStart={() => {
          composerComposingRef.current = true
        }}
        onCompositionEnd={(event) => handleComposerCompositionEnd(scope, event)}
        onInput={() => handleComposerInput(scope)}
        onFocus={(event) => {
          senderEditorRef.current = event.currentTarget
          updateActiveSessionState((prev) => ({ ...prev, inputFocused: true }))
        }}
        onBlur={() => {
          updateActiveSessionState((prev) => ({ ...prev, inputFocused: false }))
          window.setTimeout(() => {
            if (!document.activeElement?.closest('.sender-mention-panel')) {
              closeSenderMentionPanel()
            }
          }, 0)
        }}
        onClick={(event) => {
          handleComposerEditorClick(scope, event)
          syncSenderMentionPanel(scope, event.currentTarget)
        }}
        onKeyUp={(event) => syncSenderMentionPanel(scope, event.currentTarget)}
        onKeyDown={(event) => onSenderKeydown(scope, event)}
      />
    </div>
  )

  const toggleInnerSidebar = () => {
    setInternalSidebarOpen((prev) => !prev)
  }

  const toggleSessionFilesPanel = () => {
    setSessionFilesPanelOpen((prev) => {
      if (!prev) {
        setInternalSidebarOpen(false)
      } else {
        setSessionFilesPanelFullscreen(false)
      }
      return !prev
    })
  }

  const toggleSessionFilesPanelFullscreen = () => {
    setSessionFilesPanelFullscreen((prev) => {
      const next = !prev
      if (next) {
        sessionFilesFullscreenRestoreRef.current = { innerSidebarOpen: internalSidebarOpen }
        setInternalSidebarOpen(false)
      } else {
        setInternalSidebarOpen(sessionFilesFullscreenRestoreRef.current.innerSidebarOpen)
      }
      return next
    })
  }

  const updateHistoryMenuPosition = useCallback(() => {
    const anchor = historyMenuAnchorRef.current
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    setHistoryMenuPos({ top: rect.top, left: rect.right + 4 })
  }, [])

  const toggleHistorySessionMenu = (itemId, anchorEl) => {
    if (historyMenuOpenId === itemId) {
      setHistoryMenuOpenId(null)
      return
    }
    historyMenuAnchorRef.current = anchorEl
    const rect = anchorEl.getBoundingClientRect()
    setHistoryMenuPos({ top: rect.top, left: rect.right + 4 })
    setHistoryMenuOpenId(itemId)
  }

  const deleteHistorySession = (itemId) => {
    setHistoryMenuOpenId(null)
    if (historyRenamingId === itemId) {
      setHistoryRenamingId(null)
      setHistoryRenameDraft('')
    }
    if (activeHistoryItemId === itemId) {
      clearSessionTransitionTimer(activeSessionScope)
    }
    updateSessionScopeState(activeSessionScope, (prev) => {
      const nextItems = prev.historyItems.filter((item) => item.id !== itemId)
      if (prev.activeHistoryItemId !== itemId) {
        return { ...prev, historyItems: nextItems }
      }

      clearScopeComposerUploadTimers(prev.composerFiles)
      return {
        ...prev,
        historyItems: nextItems,
        activeHistoryItemId: null,
        activeSessionTurns: [],
        activeSessionPrompt: '',
        activeSessionUserFiles: [],
        activeSessionCompletedMeta: null,
        isTransitioningSession: false,
        isGeneratingSession: false,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
  }

  const cancelHistorySessionRename = () => {
    setHistoryRenamingId(null)
    setHistoryRenameDraft('')
  }

  const commitHistorySessionRename = (itemId) => {
    if (historyRenamingId !== itemId) return

    const trimmed = historyRenameDraft.trim()
    const currentItem = historyItems.find((entry) => entry.id === itemId)

    setHistoryRenamingId(null)
    setHistoryRenameDraft('')

    if (!trimmed || !currentItem || trimmed === currentItem.label) {
      return
    }

    updateSessionScopeState(activeSessionScope, (prev) => {
      const nextItems = prev.historyItems.map((entry) =>
        entry.id === itemId ? { ...entry, label: trimmed } : entry,
      )
      if (prev.activeHistoryItemId !== itemId) {
        return { ...prev, historyItems: nextItems }
      }
      return {
        ...prev,
        historyItems: nextItems,
        activeSessionPrompt: trimmed,
      }
    })
  }

  const startHistorySessionRename = (itemId) => {
    const item = historyItems.find((entry) => entry.id === itemId)
    if (!item) return

    if (historyRenamingId && historyRenamingId !== itemId) {
      commitHistorySessionRename(historyRenamingId)
    }

    setHistoryMenuOpenId(null)
    setHistoryRenamingId(itemId)
    setHistoryRenameDraft(item.label)
  }

  const handleHistorySessionMenuAction = (menuItemId) => {
    if (menuItemId === 'rename' && historyMenuOpenId) {
      startHistorySessionRename(historyMenuOpenId)
      return
    }
    if (menuItemId === 'delete' && historyMenuOpenId) {
      deleteHistorySession(historyMenuOpenId)
      return
    }
    setHistoryMenuOpenId(null)
  }

  const renderLibraryChatSessionMenuPortal = () => {
    if (!isQuestionMode || !libraryChatSessionMenuOpen) return null

    return createPortal(
      <div
        ref={libraryChatSessionPanelRef}
        className="library-detail-chat__session-menu"
        role="listbox"
        aria-label="切换会话"
        style={{
          top: libraryChatSessionMenuPos.top,
          left: libraryChatSessionMenuPos.left,
        }}
      >
        <label className="library-detail-chat__session-search">
          <span className="dora-icon library-detail-chat__session-search-icon" aria-hidden="true">
            {ICONS.search}
          </span>
          <input
            type="search"
            className="library-detail-chat__session-search-input"
            value={libraryChatSessionSearch}
            placeholder="搜索会话"
            onChange={(event) => setLibraryChatSessionSearch(event.target.value)}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          />
        </label>
        <div className="library-detail-chat__session-menu-divider" role="separator" />
        <div className="library-detail-chat__session-menu-list">
          {filteredLibraryChatSessions.length ? (
            filteredLibraryChatSessions.map((item) => (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={activeHistoryItemId === item.id}
                className={`library-detail-chat__session-item ${activeHistoryItemId === item.id ? 'is-active' : ''}`}
                onClick={() => handleLibraryChatSessionSelect(item)}
              >
                <span className="library-detail-chat__session-item-label">{item.label}</span>
              </button>
            ))
          ) : (
            <p className="library-detail-chat__session-empty">暂无会话</p>
          )}
        </div>
      </div>,
      document.body,
    )
  }

  const renderHistorySessionMenuPortal = () => {
    if (!historyMenuOpenId) return null

    return createPortal(
      <div
        ref={historyMenuPanelRef}
        className="inner-history-menu attach-menu inner-history-menu--portal"
        role="menu"
        aria-label="会话操作"
        style={{ top: historyMenuPos.top, left: historyMenuPos.left }}
      >
        {HISTORY_SESSION_MENU_ITEMS.map((menuItem) => (
          <button
            key={menuItem.id}
            type="button"
            className={`attach-menu__item${menuItem.id === 'delete' ? ' attach-menu__item--danger' : ''}`}
            role="menuitem"
            onClick={(event) => {
              event.stopPropagation()
              handleHistorySessionMenuAction(menuItem.id)
            }}
          >
            <span className="attach-menu__icon">
              <span className="dora-icon icon-16" aria-hidden="true">
                {menuItem.icon}
              </span>
            </span>
            <span className="attach-menu__label">{menuItem.label}</span>
          </button>
        ))}
      </div>,
      document.body,
    )
  }

  const updateAvatarMenuPosition = useCallback(() => {
    const anchor = avatarBtnRef.current
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    setAvatarMenuPos({ left: rect.left, top: rect.top - 8 })
  }, [])

  const updateLanguageMenuPosition = useCallback(() => {
    const row = languageMenuAnchorRef.current
    const panel = avatarMenuPanelRef.current
    if (!row || !panel) return
    const rowRect = row.getBoundingClientRect()
    const panelRect = panel.getBoundingClientRect()
    setLanguageMenuPos({ top: rowRect.top, left: panelRect.right + 4 })
  }, [])

  const toggleAvatarMenu = () => {
    if (avatarMenuOpen) {
      setAvatarMenuOpen(false)
      setLanguageMenuOpen(false)
      return
    }
    updateAvatarMenuPosition()
    setLanguageMenuOpen(false)
    setAvatarMenuOpen(true)
  }

  const toggleLanguageMenu = () => {
    if (languageMenuOpen) {
      setLanguageMenuOpen(false)
      return
    }
    updateLanguageMenuPosition()
    setLanguageMenuOpen(true)
  }

  const renderLanguageMenuPortal = () => {
    if (!languageMenuOpen) return null

    return createPortal(
      <div
        ref={languageMenuPanelRef}
        className="user-menu-panel user-menu-panel--language attach-menu"
        role="menu"
        aria-label="选择语言"
        style={{ top: languageMenuPos.top, left: languageMenuPos.left }}
      >
        {USER_MENU_LANGUAGES.map((lang, index) => (
          <Fragment key={lang.id}>
            {index === 1 ? <div className="user-menu-panel__divider" role="separator" /> : null}
            <button
              type="button"
              className={`user-menu-panel__item${selectedLanguage === lang.id ? ' is-active' : ''}`}
              role="menuitemradio"
              aria-checked={selectedLanguage === lang.id}
              onClick={() => {
                setSelectedLanguage(lang.id)
                setLanguageMenuOpen(false)
              }}
            >
              <span className="user-menu-panel__label">{lang.label}</span>
            </button>
          </Fragment>
        ))}
      </div>,
      document.body,
    )
  }

  const renderAvatarMenuPortal = () => {
    if (!avatarMenuOpen) return null

    return createPortal(
      <>
        <div
          ref={avatarMenuPanelRef}
          className="user-menu-panel attach-menu"
          role="menu"
          aria-label="用户菜单"
          style={{
            left: avatarMenuPos.left,
            top: avatarMenuPos.top,
            transform: 'translateY(-100%)',
          }}
        >
          <div className="user-menu-panel__profile">
            <img src={avatarImage} alt="" className="user-menu-panel__avatar" />
            <span className="user-menu-panel__name">{USER_DISPLAY_NAME}</span>
          </div>
          <div className="user-menu-panel__divider" role="separator" />
          <button
            ref={languageMenuAnchorRef}
            type="button"
            className={`user-menu-panel__item user-menu-panel__item--language${languageMenuOpen ? ' is-submenu-open' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              toggleLanguageMenu()
            }}
          >
            <span className="user-menu-panel__label">语言</span>
            <span className="user-menu-panel__meta">
              <span className="user-menu-panel__meta-text">
                {selectedLanguageOption.shortLabel ?? selectedLanguageOption.label}
              </span>
              <span className="dora-icon icon-16 user-menu-panel__chevron" aria-hidden="true">
                {ICONS.arrowRight}
              </span>
            </span>
          </button>
          <div className="user-menu-panel__divider" role="separator" />
          <button
            type="button"
            className="user-menu-panel__item"
            role="menuitem"
            onClick={() => {
              setAvatarMenuOpen(false)
              setLanguageMenuOpen(false)
            }}
          >
            <span className="user-menu-panel__label">退出</span>
          </button>
        </div>
        {renderLanguageMenuPortal()}
      </>,
      document.body,
    )
  }

  const openAttachConnectModal = (config) => {
    const nextConfig =
      typeof config === 'string'
        ? {
            title: config,
            assetType: config === '连接「***_02」' ? 'dashboard' : null,
          }
        : {
            ...config,
            title: getAttachConnectModalTitle(config.assetType, config.title),
          }

    const nextOwnerScope = 'mine'
    const nextScopeDefaults = getAttachConnectScopeDefaults(nextOwnerScope)
    const nextTreeContentIcons =
      nextConfig.assetType === 'analysis-theme'
        ? Object.fromEntries(
            getAttachConnectLeafNodeIds(ATTACH_CONNECT_ANALYSIS_THEME_TREE_NODES).map((nodeId) => [
              nodeId,
              ATTACH_CONNECT_ANALYSIS_THEME_DIMENSION_IMAGES[
                Math.floor(Math.random() * ATTACH_CONNECT_ANALYSIS_THEME_DIMENSION_IMAGES.length)
              ],
            ]),
          )
        : {}

    setAttachConnectModal(nextConfig)
    setAttachConnectOwnerScope(nextOwnerScope)
    setAttachConnectTreeContentIcons(nextTreeContentIcons)
    setAttachConnectSearch('')
    setAttachConnectCheckedIds(new Set(nextScopeDefaults.checkedIds))
    setAttachConnectExpandedIds(new Set(nextScopeDefaults.expandedIds))
    setAttachConnectActiveTreeNodeId(nextScopeDefaults.activeId)
    setAttachConnectActiveDimensionId('dim-1')
    setAttachConnectTableView('detail')
    setAttachConnectSidebarWidth(ATTACH_CONNECT_SIDEBAR_WIDTH_DEFAULT)
    setAttachConnectSidebarDividerVisible(false)
    setAttachConnectSidebarDragging(false)
  }

  const closeAttachConnectModal = () => {
    setAttachConnectModal(null)
  }

  const handleAttachConnectOwnerScopeChange = (ownerScope) => {
    if (ownerScope === attachConnectOwnerScope) return

    const scopeDefaults = getAttachConnectScopeDefaults(ownerScope)
    setAttachConnectOwnerScope(ownerScope)
    setAttachConnectSearch('')
    setAttachConnectCheckedIds(new Set(scopeDefaults.checkedIds))
    setAttachConnectExpandedIds(new Set(scopeDefaults.expandedIds))
    setAttachConnectActiveTreeNodeId(scopeDefaults.activeId)
  }

  const handleAttachConnectSidebarResizeStart = (event) => {
    event.preventDefault()
    event.stopPropagation()
    attachConnectSidebarResizeRef.current = {
      startX: event.clientX,
      startWidth: attachConnectSidebarWidth,
    }
    setAttachConnectSidebarDragging(true)
    setAttachConnectSidebarDividerVisible(true)
  }

  const toggleAttachConnectTreeNode = (nodeId, shouldSelect = null) => {
    const node = findAttachConnectTreeNode(currentAttachConnectTreeNodes, nodeId)
    if (!node) return

    setAttachConnectCheckedIds((prev) => {
      const nextShouldSelect =
        shouldSelect === null ? getAttachConnectCheckState(node, prev) !== 'checked' : shouldSelect
      return updateAttachConnectCheckedIds(prev, node, nextShouldSelect)
    })
  }

  const toggleAttachConnectExpand = (nodeId) => {
    setAttachConnectExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(nodeId)) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }

  const handleAttachConnectTreeContentClick = (node) => {
    if (node.children?.length) {
      toggleAttachConnectExpand(node.id)
      return
    }

    setAttachConnectActiveTreeNodeId(node.id)

    const checkState = getAttachConnectCheckState(node, attachConnectCheckedIds)
    if (checkState === 'unchecked') {
      toggleAttachConnectTreeNode(node.id, true)
      return
    }

    if (checkState === 'checked') {
      if (attachConnectActiveTreeNodeId === node.id) {
        toggleAttachConnectTreeNode(node.id, false)
      }
      return
    }

    toggleAttachConnectTreeNode(node.id, true)
  }

  const renderAttachConnectModal = () => {
    if (!attachConnectModal) return null

    const showAttachConnectOwnerSegments = attachConnectModal.assetType === 'analysis-theme'
    const showLeafDashboardIcon =
      attachConnectModal.assetType === 'dashboard' || attachConnectModal.title === '连接「***_02」'
    const currentAttachAssetLabel = getBiAttachMenuItemById(attachConnectModal.assetType)?.label ?? '分析主题'
    const activeAttachConnectTreeNode = findAttachConnectTreeNode(currentAttachConnectTreeNodes, attachConnectActiveTreeNodeId)
    const previewHeaderTitle = activeAttachConnectTreeNode?.label ?? currentAttachAssetLabel
    const previewHeaderIcon =
      attachConnectModal.assetType === 'analysis-theme'
        ? attachConnectTreeContentIcons[attachConnectActiveTreeNodeId] ??
          ATTACH_CONNECT_ANALYSIS_THEME_DIMENSION_IMAGES[0]
        : getBiAttachMenuItemById(attachConnectModal.assetType)?.image ?? null
    const query = attachConnectSearch.trim().toLowerCase()
    const forceExpandTree = Boolean(query)
    const filteredTreeNodes = filterAttachConnectTreeNodes(currentAttachConnectTreeNodes, query)
    const visibleTreeNodes = filteredTreeNodes.flatMap((node) => (node.kind === 'root' ? node.children ?? [] : [node]))

    const renderAttachConnectTreeNodes = (nodes, level = 0) =>
      nodes.flatMap((node) => {
        const hasChildren = Boolean(node.children?.length)
        const isRoot = node.kind === 'root'
        const isExpanded = forceExpandTree || attachConnectExpandedIds.has(node.id)
        const isActive = !hasChildren && attachConnectActiveTreeNodeId === node.id
        const checkState = isRoot ? 'unchecked' : getAttachConnectCheckState(node, attachConnectCheckedIds)
        const treeNodeIconSrc =
          hasChildren
            ? isExpanded
              ? attachTreeFolderOpenImage
              : attachTreeFolderClosedImage
            : attachConnectModal.assetType === 'analysis-theme'
              ? attachConnectTreeContentIcons[node.id] ?? ATTACH_CONNECT_ANALYSIS_THEME_DIMENSION_IMAGES[0]
              : showLeafDashboardIcon
                ? attachDashboardImage
                : attachTreeLeafImage
        const nodeClassName = [
          'attach-connect-tree__node',
          isRoot ? 'attach-connect-tree__node--group attach-connect-tree__node--root' : 'attach-connect-tree__node--leaf',
          hasChildren && !isRoot ? 'attach-connect-tree__node--branch' : '',
          isActive ? 'is-active' : '',
        ]
          .filter(Boolean)
          .join(' ')
        const row = isRoot ? null : (
          <div
            key={node.id}
            className={nodeClassName}
            style={{ '--attach-connect-tree-indent': `${level * 20}px` }}
          >
            {hasChildren ? (
              <button
                type="button"
                className="attach-connect-tree__expander"
                aria-label={isExpanded ? '收起' : '展开'}
                onClick={() => toggleAttachConnectExpand(node.id)}
              >
                <span className="dora-icon attach-connect-tree__caret" aria-hidden="true">
                  {isExpanded ? ICONS.triangleDown : ICONS.triangleRight}
                </span>
              </button>
            ) : (
              <span className="attach-connect-tree__expander-spacer" aria-hidden="true" />
            )}
            <label className={`attach-connect-tree__checkbox attach-connect-tree__checkbox--${checkState}`}>
              <input
                ref={(element) => {
                  if (element) {
                    element.indeterminate = checkState === 'indeterminate'
                  }
                }}
                type="checkbox"
                className="attach-connect-tree__checkbox-input"
                checked={checkState === 'checked'}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => toggleAttachConnectTreeNode(node.id, event.target.checked)}
              />
              <span className="attach-connect-tree__checkbox-box" aria-hidden="true" />
            </label>
            <span className="attach-connect-tree__icon" aria-hidden="true">
              <img src={treeNodeIconSrc} alt="" />
            </span>
            <button
              type="button"
              className="attach-connect-tree__content"
              onClick={() => handleAttachConnectTreeContentClick(node)}
            >
              <OverflowTooltipText
                text={node.label}
                className="attach-connect-tree__label"
                anchorSelector=".attach-connect-tree__node"
              />
            </button>
          </div>
        )

        const nextLevel = isRoot ? level : level + 1
        return [row, ...(hasChildren && isExpanded ? renderAttachConnectTreeNodes(node.children, nextLevel) : [])].filter(Boolean)
      })

    return createPortal(
      <div
        className="attach-connect-modal-overlay"
        role="presentation"
      >
        <div
          className="attach-connect-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="attach-connect-dialog-title"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="attach-connect-dialog__header">
            <h2 id="attach-connect-dialog-title" className="attach-connect-dialog__title">
              {attachConnectModal.title}
            </h2>
            <button
              type="button"
              className="icon-btn attach-connect-dialog__close"
              aria-label="关闭"
              onClick={closeAttachConnectModal}
            >
              <span className="dora-icon icon-16" aria-hidden="true">
                {ICONS.close}
              </span>
            </button>
          </header>

          <div
            ref={attachConnectBodyRef}
            className={`attach-connect-dialog__body${attachConnectSidebarDragging ? ' is-resizing-sidebar' : ''}`}
          >
            <aside
              className="attach-connect-dialog__sidebar"
              style={{ width: `${attachConnectSidebarWidth}px`, flexBasis: `${attachConnectSidebarWidth}px` }}
            >
              {showAttachConnectOwnerSegments ? (
                <div className="attach-connect-owner-tabs" role="tablist" aria-label="分析主题范围">
                  {ATTACH_CONNECT_OWNER_SEGMENTS.map((segment) => (
                    <button
                      key={segment.id}
                      type="button"
                      role="tab"
                      className={`attach-connect-owner-tabs__item ${
                        attachConnectOwnerScope === segment.id ? 'is-active' : ''
                      }`}
                      aria-selected={attachConnectOwnerScope === segment.id}
                      onClick={() => handleAttachConnectOwnerScopeChange(segment.id)}
                    >
                      {segment.label}
                    </button>
                  ))}
                </div>
              ) : null}
              <label className="attach-connect-search">
                <span className="dora-icon attach-connect-search__icon" aria-hidden="true">
                  {ICONS.search}
                </span>
                <input
                  type="text"
                  className="attach-connect-search__input"
                  placeholder={`搜索${currentAttachAssetLabel}`}
                  value={attachConnectSearch}
                  onChange={(event) => setAttachConnectSearch(event.target.value)}
                />
              </label>
              <div className="attach-connect-tree" role="tree" aria-label={currentAttachAssetLabel}>
                {renderAttachConnectTreeNodes(visibleTreeNodes)}
              </div>
              <div className="attach-connect-dialog__sidebar-foot">
                <span className="attach-connect-dialog__sidebar-foot-label">{`已选择${currentAttachAssetLabel}：`}</span>
                <span className="attach-connect-dialog__sidebar-foot-count">{attachConnectCheckedIds.size}个</span>
              </div>
            </aside>

            <div
              className={`attach-connect-dialog__sidebar-resize-zone${
                attachConnectSidebarDividerVisible || attachConnectSidebarDragging ? ' is-visible' : ''
              }${attachConnectSidebarDragging ? ' is-dragging' : ''}`}
              role="separator"
              aria-orientation="vertical"
              aria-label="调整树列表宽度"
              onMouseEnter={() => setAttachConnectSidebarDividerVisible(true)}
              onMouseLeave={() => {
                if (!attachConnectSidebarDragging) {
                  setAttachConnectSidebarDividerVisible(false)
                }
              }}
              onPointerDown={handleAttachConnectSidebarResizeStart}
            >
              <span className="attach-connect-dialog__sidebar-resize-line" aria-hidden="true" />
            </div>

            <div className="attach-connect-dialog__main">
              <div className="attach-connect-dialog__main-layout">
                <div className="attach-connect-preview-header">
                  {previewHeaderIcon ? (
                    <span className="attach-connect-preview-header__icon" aria-hidden="true">
                      <img className="attach-connect-preview-header__icon-img" src={previewHeaderIcon} alt="" />
                    </span>
                  ) : null}
                  <OverflowTooltipText
                    text={previewHeaderTitle}
                    className="attach-connect-preview-header__title"
                    anchorSelector=".attach-connect-preview-header"
                  />
                </div>
                <div className="attach-connect-preview-content">
                  <ul className="attach-connect-dimensions" aria-label="数据表">
                    {ATTACH_CONNECT_DIMENSIONS.map((dimension) => (
                      <li key={dimension.id}>
                        <button
                          type="button"
                          className={`attach-connect-dimensions__item ${
                            attachConnectActiveDimensionId === dimension.id ? 'is-active' : ''
                          }`}
                          onClick={() => setAttachConnectActiveDimensionId(dimension.id)}
                        >
                          <span className="dora-icon attach-connect-dimensions__icon" aria-hidden="true">
                            {'\ue7c2'}
                          </span>
                          <OverflowTooltipText
                            text={dimension.label}
                            className="attach-connect-dimensions__label"
                            anchorSelector=".attach-connect-dimensions__item"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="attach-connect-dialog__divider" role="separator" />
                  <div className="attach-connect-table-wrap">
                    <div className="attach-connect-table__toolbar">
                      <div className="attach-connect-view-tabs" role="tablist" aria-label="字段视图">
                        <button
                          type="button"
                          role="tab"
                          className={`attach-connect-view-tabs__btn ${attachConnectTableView === 'detail' ? 'is-active' : ''}`}
                          aria-selected={attachConnectTableView === 'detail'}
                          aria-label="明细展示"
                          onClick={() => setAttachConnectTableView('detail')}
                        >
                          <AttachConnectDetailViewIcon />
                        </button>
                        <button
                          type="button"
                          role="tab"
                          className={`attach-connect-view-tabs__btn ${attachConnectTableView === 'structure' ? 'is-active' : ''}`}
                          aria-selected={attachConnectTableView === 'structure'}
                          aria-label="表结构展示"
                          onClick={() => setAttachConnectTableView('structure')}
                        >
                          <AttachConnectStructureViewIcon />
                        </button>
                      </div>
                    </div>
                    <div className="attach-connect-table-panel">
                      <div className="attach-connect-table" role="table">
                        <div className="attach-connect-table__row attach-connect-table__row--head" role="row">
                          {ATTACH_CONNECT_TABLE_COLUMNS.map((column) => (
                            <div key={column} className="attach-connect-table__cell" role="columnheader">
                              {column}
                            </div>
                          ))}
                        </div>
                        {ATTACH_CONNECT_TABLE_ROWS.map((row, rowIndex) => (
                          <div
                            key={row.id}
                            className={`attach-connect-table__row ${rowIndex % 2 === 1 ? 'attach-connect-table__row--zebra' : ''}`}
                            role="row"
                          >
                            {row.cells.map((cell, cellIndex) => (
                              <div key={`${row.id}-${cellIndex}`} className="attach-connect-table__cell" role="cell">
                                {cell}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="attach-connect-dialog__footer">
            <button type="button" className="attach-connect-dialog__btn attach-connect-dialog__btn--ghost" onClick={closeAttachConnectModal}>
              取消
            </button>
            <button type="button" className="attach-connect-dialog__btn attach-connect-dialog__btn--primary" onClick={closeAttachConnectModal}>
              确定
            </button>
          </footer>
        </div>
      </div>,
      document.body,
    )
  }

  const renderAttachActions = () => (
    <div
      className={`attach-actions${doraVisualScheme === 'scheme5' ? ' attach-actions--scheme5' : ''}`}
      aria-label="输入辅助"
      ref={attachMenuRef}
    >
      <IconButton
        className="attach-btn attach-btn--plus"
        tip="上传本地文件"
        onClick={openAttachmentPicker}
      >
        <span className="attach-btn__visual">
          <span className="dora-icon icon-16 attach-btn__plus-icon" aria-hidden="true">
            {ICONS.create}
          </span>
        </span>
      </IconButton>
      {doraVisualScheme === 'scheme5' ? (
        <div className="attach-btn-wrap attach-btn-wrap--bi attach-btn-wrap--menu attach-btn-wrap--bi-entry">
          <button
            type="button"
            className="attach-btn attach-btn--plus attach-btn--bi attach-btn--bi-entry"
            aria-label="添加 FineBI 资产"
            onClick={() =>
              openAttachConnectModal({
                title: getAttachConnectModalTitle(BI_ATTACH_MENU_ITEMS[0].id),
                assetType: BI_ATTACH_MENU_ITEMS[0].id,
              })
            }
          >
            <span className="attach-btn__visual attach-btn__visual--bi-entry">
              <span
                className={`attach-asset-badge attach-asset-badge--${BI_ATTACH_MENU_ITEMS[0].accent} attach-asset-badge--compact attach-asset-badge--image`}
                aria-hidden="true"
              >
                <img className="attach-asset-badge__img" src={BI_ATTACH_MENU_ITEMS[0].image} alt="" />
              </span>
              <span className="attach-btn__entry-label">添加 FineBI 资产</span>
            </span>
          </button>
          <div className="attach-menu attach-menu--bi-assets" role="menu" aria-label="FineBI 资产类型">
            {BI_ATTACH_MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="attach-menu__item attach-menu__item--asset"
                role="menuitem"
                onClick={() => openAttachConnectModal({ title: getAttachConnectModalTitle(item.id), assetType: item.id })}
              >
                <span
                  className={`attach-asset-badge attach-asset-badge--${item.accent} attach-asset-badge--image`}
                  aria-hidden="true"
                >
                  <img className="attach-asset-badge__img" src={item.image} alt="" />
                </span>
                <span className="attach-menu__label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`attach-btn-wrap attach-btn-wrap--bi attach-btn-wrap--menu attach-btn-wrap--connector ${
            isQuestionMode ? 'attach-btn-wrap--menu-up' : 'attach-btn-wrap--menu-down'
          }`}
        >
          <button
            type="button"
            className="attach-btn attach-btn--plus attach-btn--bi attach-btn--connector"
            aria-label="Fine BI连接器"
          >
            <span className="attach-btn__visual attach-btn__visual--connector">
              <span className="dora-icon icon-16 attach-btn__plus-icon" aria-hidden="true">
                {ICONS.frbiConnector}
              </span>
              <span className="attach-btn__connector-label">Fine BI连接器</span>
            </span>
          </button>
          <span className={`attach-tip${isQuestionMode ? '' : ' attach-tip--above'}`} role="tooltip">
            Fine BI连接器
          </span>
          <div
            className={`attach-menu attach-menu--connector-assets ${
              isQuestionMode ? 'attach-menu--above' : 'attach-menu--below'
            }`}
            role="menu"
            aria-label="FineBI 资产类型"
          >
            {BI_ATTACH_MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="attach-menu__item attach-menu__item--connector-asset"
                role="menuitem"
                onClick={() => openAttachConnectModal({ title: getAttachConnectModalTitle(item.id), assetType: item.id })}
              >
                <span
                  className={`attach-asset-badge attach-asset-badge--${item.accent} attach-asset-badge--compact attach-asset-badge--menu-compact attach-asset-badge--image`}
                  aria-hidden="true"
                >
                  <img className="attach-asset-badge__img" src={item.image} alt="" />
                </span>
                <span className="attach-menu__label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderHistorySessionItem = (item) => {
    const isActive = activeHistoryItemId === item.id
    const isGenerating = Boolean(item.isGenerating)
    const isMenuOpen = historyMenuOpenId === item.id
    const isRenaming = historyRenamingId === item.id

    return (
      <div
        key={item.id}
        className={[
          'inner-history-item',
          isActive ? 'active' : '',
          isGenerating ? 'is-generating' : '',
          isMenuOpen ? 'is-menu-open' : '',
          isRenaming ? 'is-renaming' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {isRenaming ? (
          <div className="inner-history-item__rename">
            <input
              ref={historyRenameInputRef}
              type="text"
              className="inner-history-item__rename-input"
              value={historyRenameDraft}
              aria-label="会话名称"
              onChange={(event) => setHistoryRenameDraft(event.target.value)}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  historyRenameSkipBlurRef.current = true
                  commitHistorySessionRename(item.id)
                }
                if (event.key === 'Escape') {
                  event.preventDefault()
                  historyRenameSkipBlurRef.current = true
                  cancelHistorySessionRename()
                }
              }}
              onBlur={() => {
                if (historyRenameSkipBlurRef.current) {
                  historyRenameSkipBlurRef.current = false
                  return
                }
                commitHistorySessionRename(item.id)
              }}
            />
          </div>
        ) : (
          <button type="button" className="inner-history-item__body" onClick={() => openHistorySession(item)}>
            <span className="inner-item__label">{item.label}</span>
          </button>
        )}
        {!isRenaming && isGenerating ? (
          <span className="inner-history-item__trailing">
            <FourPointStarLoader className="inner-history-item__loader" label="正在生成" />
          </span>
        ) : !isRenaming ? (
          <span className="inner-history-item__trailing">
            {item.badge ? <span className="inner-badge">{item.badge}</span> : null}
            <span className="inner-history-item__menu-wrap">
              <button
                type="button"
                className="inner-history-item__more"
                aria-label="更多操作"
                aria-expanded={isMenuOpen}
                onClick={(event) => {
                  event.stopPropagation()
                  toggleHistorySessionMenu(item.id, event.currentTarget)
                }}
              >
                <span className="dora-icon icon-16" aria-hidden="true">
                  {ICONS.more}
                </span>
              </button>
            </span>
          </span>
        ) : null}
      </div>
    )
  }

  const renderHistorySessionGroups = () =>
    groupedHistoryItems.map((group) => {
      const isCollapsed = Boolean(historyGroupsCollapsed[`${activeSessionScope}:${group.id}`])

      return (
        <section key={group.id} className="inner-history-section" aria-label={group.label}>
          <button
            type="button"
            className="inner-sidebar__section-head"
            aria-expanded={!isCollapsed}
            aria-label={`${isCollapsed ? '展开' : '收起'}${group.label}分组`}
            onClick={() => toggleHistoryGroupCollapsed(group.id)}
          >
            <span className="inner-history-section__title">{group.label}</span>
            <span className="dora-icon inner-sidebar__section-head-icon" aria-hidden="true">
              {isCollapsed ? ICONS.triangleRight : ICONS.triangleDown}
            </span>
          </button>
          {!isCollapsed ? group.items.map((item) => renderHistorySessionItem(item)) : null}
        </section>
      )
    })

  useEffect(() => {
    if (!mobileCatalogOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMobileCatalogOpen(false)
    }
    const shouldLockPage = window.matchMedia('(max-width: 599px)').matches
    const previousOverflow = document.body.style.overflow
    if (shouldLockPage) document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (shouldLockPage) document.body.style.overflow = previousOverflow
    }
  }, [mobileCatalogOpen])

  const closeMobileCatalog = () => {
    setMobileCatalogOpen(false)
    setMobileCatalogSearchOpen(false)
    setMobileCatalogSearch('')
  }

  const renderMobileCatalogDrawer = () => {
    if (!mobileCatalogOpen) return null
    const keyword = mobileCatalogSearch.trim().toLowerCase()
    const mobileCatalogSearchResults = keyword
      ? groupedHistoryItems
          .flatMap((group) => group.items)
          .filter((item) => item.label.toLowerCase().includes(keyword))
      : []

    return createPortal(
      <div className="mobile-catalog-layer" role="presentation">
        <button type="button" className="mobile-catalog-backdrop" aria-label="关闭目录" onClick={closeMobileCatalog} />
        <aside className={`mobile-catalog-drawer${mobileCatalogSearchOpen ? ' is-searching' : ''}`} role="dialog" aria-modal="true" aria-label={mobileCatalogSearchOpen ? '搜索会话' : '目录'}>
          {mobileCatalogSearchOpen ? (
            <header className="mobile-catalog-search-page__header">
              <label className="mobile-catalog-search-page__field">
                <span className="dora-icon" aria-hidden="true">{ICONS.search}</span>
                <input
                  value={mobileCatalogSearch}
                  onChange={(event) => setMobileCatalogSearch(event.target.value)}
                  placeholder="请输入"
                  aria-label="搜索会话"
                  autoFocus
                />
                {mobileCatalogSearch ? (
                  <button type="button" aria-label="清空搜索" onClick={() => setMobileCatalogSearch('')}>
                    <span className="dora-icon" aria-hidden="true">{ICONS.close}</span>
                  </button>
                ) : null}
              </label>
              <button
                type="button"
                className="mobile-catalog-search-page__cancel"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setMobileCatalogSearchOpen(false)
                  setMobileCatalogSearch('')
                }}
              >
                取消
              </button>
            </header>
          ) : (
            <>
              <header className="mobile-catalog-drawer__header">
                <div className="mobile-catalog-drawer__brand" aria-label="Dora 超级智能体">
                  <span className="mobile-catalog-drawer__logo">Dora</span>
                  <strong>超级智能体</strong>
                </div>
              </header>

              <nav className="mobile-catalog-actions" aria-label="快捷操作">
                <button type="button" className={`mobile-catalog-action${isScheduleView ? '' : ' is-active'}`} onClick={() => { startNewAgentChat(); setMobileNewChatPageOpen(true); closeMobileCatalog() }}>
                  <span className="dora-icon" aria-hidden="true">{ICONS.newChat}</span>
                  <span>新聊天</span>
                </button>
                <button type="button" className={`mobile-catalog-action${isScheduleView ? ' is-active' : ''}`} onClick={() => { handleInnerActionClick('schedule'); closeMobileCatalog() }}>
                  <span className="dora-icon" aria-hidden="true">{ICONS.schedule}</span>
                  <span>定时任务</span>
                </button>
              </nav>

              <div className="mobile-catalog-divider" />
            </>
          )}

          <section className={`mobile-catalog-history${mobileCatalogSearchOpen ? ' mobile-catalog-history--search-page' : ''}`} aria-label={mobileCatalogSearchOpen ? '搜索结果' : '会话记录'}>
            {!mobileCatalogSearchOpen ? (
              <div className="mobile-catalog-history__header">
                <span>会话记录</span>
                <button type="button" className="mobile-catalog-history__search" aria-label="搜索会话" onClick={() => setMobileCatalogSearchOpen(true)}>
                  <span className="dora-icon" aria-hidden="true">{ICONS.search}</span>
                </button>
              </div>
            ) : null}

            {!mobileCatalogSearchOpen ? (
              <div className="mobile-catalog-history__scroll">
                {groupedHistoryItems.map((group) => (
                  <section key={`mobile-catalog-${group.id}`} className="mobile-catalog-history__group" aria-label={group.label}>
                    <h3>{group.label}</h3>
                    {group.items.map((item) => (
                      <button
                        key={`mobile-catalog-item-${item.id}`}
                        type="button"
                        className="mobile-catalog-history__item"
                        onClick={() => { openHistorySession(item); closeMobileCatalog() }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </section>
                ))}
              </div>
            ) : keyword ? (
              <div className="mobile-catalog-history__scroll mobile-catalog-search-results">
                {mobileCatalogSearchResults.map((item) => (
                  <button
                    key={`mobile-catalog-search-item-${item.id}`}
                    type="button"
                    className="mobile-catalog-history__item mobile-catalog-search-results__item"
                    onClick={() => { openHistorySession(item); closeMobileCatalog() }}
                  >
                    {highlightSearchText(item.label, mobileCatalogSearch)}
                  </button>
                ))}
                {!mobileCatalogSearchResults.length ? <p className="mobile-catalog-search-page__empty">暂无匹配的会话</p> : null}
              </div>
            ) : null}
          </section>
        </aside>
      </div>,
      document.body,
    )
  }

  const renderMobileAvatarMenu = () => {
    if (!mobileAvatarMenuOpen) return null

    return createPortal(
      <div className="mobile-avatar-menu-layer" role="presentation">
        <button type="button" className="mobile-avatar-menu__backdrop" aria-label="关闭用户菜单" onClick={() => setMobileAvatarMenuOpen(false)} />
        <section className="mobile-avatar-menu" role="dialog" aria-modal="true" aria-label="用户菜单">
          <div className="mobile-avatar-menu__profile">
            <span className="mobile-avatar-menu__avatar-wrap">
              <img src={mobileProfileAvatarImage} alt="" />
            </span>
            <div className="mobile-avatar-menu__identity">
              <strong>这是用户的名称很长很长很长</strong>
              <span>Admin user 111</span>
            </div>
          </div>
          <div className="mobile-avatar-menu__divider" />
          <button type="button" className="mobile-avatar-menu__item">
            <span>语言</span>
            <span className="mobile-avatar-menu__meta">
              <span>{selectedLanguageOption.shortLabel ?? selectedLanguageOption.label}</span>
              <span className="dora-icon" aria-hidden="true">{ICONS.arrowRight}</span>
            </span>
          </button>
          <div className="mobile-avatar-menu__divider" />
          <button type="button" className="mobile-avatar-menu__item" onClick={() => setMobileAvatarMenuOpen(false)}>
            <span>退出</span>
          </button>
        </section>
      </div>,
      document.body,
    )
  }

  const renderHomeHeaderNav = () => (
    <div className="mobile-home-nav" aria-label="首页快捷导航">
      {mobileNewChatPageOpen ? (
        <button type="button" className="mobile-home-nav__action" aria-label="返回首页" onClick={() => setMobileNewChatPageOpen(false)}>
          <span className="dora-icon" aria-hidden="true">{ICONS.mobileBack}</span>
        </button>
      ) : (
        <button
          type="button"
          className={`mobile-home-nav__profile${mobileAvatarMenuOpen ? ' is-open' : ''}`}
          aria-label="个人中心"
          aria-expanded={mobileAvatarMenuOpen}
          onClick={() => setMobileAvatarMenuOpen((current) => !current)}
        >
          <img src={mobileProfileAvatarImage} alt="" className="mobile-home-nav__profile-bg" />
        </button>
      )}
      <div className="mobile-home-nav__actions">
        {!mobileNewChatPageOpen ? (
          <button type="button" className="mobile-home-nav__action" aria-label="新聊天" onClick={() => { setMobileAvatarMenuOpen(false); startNewAgentChat(); setMobileNewChatPageOpen(true) }}>
            <span className="dora-icon" aria-hidden="true">{ICONS.newChat}</span>
          </button>
        ) : null}
        <button
          type="button"
          className="mobile-home-nav__action"
          aria-label="目录"
          aria-expanded={mobileCatalogOpen}
          onClick={() => {
            setMobileAvatarMenuOpen(false)
            setMobileCatalogOpen(true)
          }}
        >
          <span className="dora-icon" aria-hidden="true">
            {ICONS.catalog}
          </span>
        </button>
      </div>
    </div>
  )

  const renderOrbBackgroundBanner = () => (
    <div className="scheme-orb-banner" aria-hidden="true">
    </div>
  )

  const openSessionSourceLibraryItem = (item) => {
    if (!item) return
    setActiveNav('library')
    setActiveExpertCard(null)
    setPracticesPageOpen(false)
    openLibraryItem(item, { trackRecent: true })
  }

  const renderSessionSourceTag = () => {
    if (!activeSessionSourceLibraryItem) return null

    return (
      <button
        type="button"
        className="main-header__session-source"
        onClick={() => openSessionSourceLibraryItem(activeSessionSourceLibraryItem)}
        aria-label={`打开资料来源：${activeSessionSourceLibraryItem.title}`}
      >
        <img
          src={getLibraryFileIcon(activeSessionSourceLibraryItem.type)}
          alt=""
          className="main-header__session-source-icon"
        />
        <span className="main-header__session-source-label">{activeSessionSourceLibraryItem.title}</span>
      </button>
    )
  }

  const renderSessionHeaderActions = () => (
    <div className="main-header__session-tools">
      {!isNewChatActive ? (
        <IconButton tip="分享" className="icon-btn main-header__session-action">
          <span className="dora-icon icon-16" aria-hidden="true">
            {ICONS.share}
          </span>
        </IconButton>
      ) : null}
      <IconButton
        tip="会话文件"
        className={`icon-btn panel-toggle main-header__session-action${sessionFilesPanelOpen ? ' is-active' : ''}`}
        aria-pressed={sessionFilesPanelOpen}
        onClick={toggleSessionFilesPanel}
      >
        <span className="dora-icon icon-16" aria-hidden="true">
          {ICONS.sessionFile}
        </span>
      </IconButton>
    </div>
  )

  const toggleSessionFilesSourceSection = (sectionId) => {
    setSessionFilesSourceCollapsed((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const removeSessionSourceFile = (fileId) => {
    setSessionFilesSourceSections((prev) =>
      prev.map((section) => ({
        ...section,
        files: section.files.filter((file) => file.id !== fileId),
      })),
    )
  }

  const blurSessionFileCardFocus = (event) => {
    const active = document.activeElement
    if (active instanceof HTMLElement && event.currentTarget.contains(active)) {
      active.blur()
    }
  }

  const renderSessionCiteActionIcon = (isCited) => (
    <span
      className={`dora-icon icon-16 ${isCited ? 'icon-quxiaoyinyong' : 'icon-a-yinyong'}`}
      aria-hidden="true"
    />
  )

  const toComposerCitationFile = (file) => ({
    id: file.id,
    title: file.title,
    icon: file.icon,
    sessionFileId: file.sessionFileId ?? file.id,
  })

  const renderSessionCiteAction = (
    file,
    { className = 'session-files-panel__action-btn session-files-panel__action-btn--cite' } = {},
  ) => {
    const citationFile = toComposerCitationFile(file)
    const citedRef = findSourceFileComposerRef(composerSegments, citationFile)
    const isCited = Boolean(citedRef)

    return (
      <IconButton
        tip={isCited ? '取消引用' : '引用'}
        size="sm"
        className={className}
        aria-label={isCited ? '取消引用' : '引用'}
        aria-pressed={isCited}
        onClick={() => toggleSourceFileCitation(activeSessionScope, citationFile)}
      >
        {renderSessionCiteActionIcon(isCited)}
      </IconButton>
    )
  }

  const renderSessionDownloadAction = (className = 'session-files-panel__action-btn') => (
    <IconButton tip="下载" size="sm" className={className} aria-label="下载">
      <span className="dora-icon icon-16" aria-hidden="true">
        {ICONS.download}
      </span>
    </IconButton>
  )

  const closeSessionMarkdownDownloadMenu = useCallback(() => {
    setSessionMarkdownDownloadMenuOpen(false)
  }, [])

  const toggleSessionMarkdownDownloadMenu = () => {
    setSessionMarkdownDownloadMenuOpen((prev) => !prev)
  }

  const handleSessionMarkdownDownload = (format) => {
    if (!activeSessionPreviewFile) return

    const option = SESSION_MARKDOWN_DOWNLOAD_OPTIONS.find((item) => item.id === format)
    if (!option) return

    const baseName = activeSessionPreviewFile.title.replace(/\.[^.]+$/, '') || 'document'
    const blob = new Blob([sessionMarkdownContent], { type: option.mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${baseName}.${option.extension}`
    link.click()
    URL.revokeObjectURL(url)
    closeSessionMarkdownDownloadMenu()
  }

  const renderSessionMarkdownDownloadAction = (className = 'icon-btn session-files-panel__detail-action') => (
    <div
      ref={sessionMarkdownDownloadBtnRef}
      className={`session-files-download-trigger${sessionMarkdownDownloadMenuOpen ? ' is-open' : ''}`}
    >
      <IconButton
        tip={sessionMarkdownDownloadMenuOpen ? undefined : '下载'}
        className={`${className}${sessionMarkdownDownloadMenuOpen ? ' is-active' : ''}`}
        aria-label="下载"
        aria-haspopup="menu"
        aria-expanded={sessionMarkdownDownloadMenuOpen}
        onClick={(event) => {
          event.stopPropagation()
          toggleSessionMarkdownDownloadMenu()
        }}
      >
        <span className="dora-icon icon-16" aria-hidden="true">
          {ICONS.download}
        </span>
      </IconButton>
      {sessionMarkdownDownloadMenuOpen ? (
        <div
          ref={sessionMarkdownDownloadMenuRef}
          className="session-files-download-menu attach-menu"
          role="menu"
          aria-label="选择下载格式"
        >
          {SESSION_MARKDOWN_DOWNLOAD_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className="attach-menu__item"
              role="menuitem"
              onClick={(event) => {
                event.stopPropagation()
                handleSessionMarkdownDownload(option.id)
              }}
            >
              <span className="attach-menu__icon">
                <img src={option.icon} alt="" className="attach-menu__icon-img" />
              </span>
              <span className="attach-menu__label">{option.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )

  const renderSessionPreviewDownloadAction = (className, previewMode, isSourcePreview) =>
    !isSourcePreview && previewMode === 'markdown'
      ? renderSessionMarkdownDownloadAction(className)
      : renderSessionDownloadAction(className)

  const renderSessionExistingItemActions = (item) => (
    <>
      {renderSessionCiteAction(item)}
      {renderSessionDownloadAction()}
    </>
  )

  const renderSessionExistingDataTab = () => {
    const hasVisibleBlocks = filteredSessionExistingData.some((block) => block.groups.length > 0)

    if (!hasVisibleBlocks) {
      return (
        <div className="session-files-panel__empty session-files-panel__empty--tab">
          {sessionFilesSourceSearch.trim() ? '暂无匹配数据' : '暂无内容'}
        </div>
      )
    }

    return (
      <div className="session-files-panel__existing">
        {filteredSessionExistingData.map((block) => (
          <section key={block.id} className="session-files-panel__existing-block">
            <div className="session-files-panel__existing-block-title">
              <span className="session-files-panel__existing-block-title-mark" aria-hidden="true"></span>
              <span className="session-files-panel__existing-block-title-text">{block.title}</span>
            </div>

            {block.groups.map((group) => (
              <article key={group.id} className="session-files-panel__existing-folder">
                <div className="session-files-panel__existing-folder-panel">
                  <div className="session-files-panel__existing-folder-tab-wrap">
                    <div className="session-files-panel__existing-folder-tab" title={group.path}>
                      <span className="session-files-panel__existing-folder-tab-shape" aria-hidden="true">
                        <span className="session-files-panel__existing-folder-tab-shape-center" />
                        <span className="session-files-panel__existing-folder-tab-shape-wing session-files-panel__existing-folder-tab-shape-wing--right">
                          <img src={tabCurveRightImage} alt="" draggable={false} />
                        </span>
                      </span>
                      <span className="session-files-panel__existing-folder-path-text">
                        {highlightSearchText(group.path, sessionFilesSourceSearch)}
                      </span>
                    </div>
                  </div>
                  <div className="session-files-panel__existing-folder-body">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="session-files-panel__existing-item"
                      onMouseLeave={blurSessionFileCardFocus}
                    >
                      <img src={item.icon} alt="" className="session-files-panel__existing-item-icon" />
                      <p className="session-files-panel__existing-item-label" title={item.title}>
                        {highlightSearchText(item.title, sessionFilesSourceSearch)}
                      </p>
                      <div
                        className="session-files-panel__actions session-files-panel__existing-item-actions"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        {renderSessionExistingItemActions(item)}
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    )
  }

  const renderSessionSourceFileActions = (file) => {
    return (
      <>
        {renderSessionCiteAction(file)}
        {renderSessionDownloadAction()}
      </>
    )
  }

  const openSessionSourceFilePreview = (fileId) => {
    setSessionFilesTab('materials')
    setActiveSessionFileId(null)
    setActiveSessionSourceFileId(fileId)
  }

  const openSessionOutputFilePreview = (fileId) => {
    setSessionFilesTab('output')
    setActiveSessionSourceFileId(null)
    setActiveSessionFileId(fileId)
  }

  const closeSessionFilePreview = () => {
    setSessionSpreadsheetEditing(false)
    setSessionSpreadsheetEditDraft(null)
    setSessionMarkdownEditing(false)
    setSessionMarkdownEditDraft('')
    setSessionMarkdownTocOpen(false)
    setActiveSessionPptSlideIndex(0)
    setActiveSessionDocPageIndex(0)
    setActiveSessionPdfPageIndex(0)
    setActiveSessionSpreadsheetSheetId(sessionSpreadsheetWorkbook.sheets[0]?.id ?? null)
    setActiveSessionSourceFileId(null)
    setActiveSessionFileId(null)
  }

  const handleSessionSpreadsheetSheetChange = (sheetId) => {
    if (sheetId === activeSessionSpreadsheetSheetId) return

    if (sessionSpreadsheetEditing && sessionSpreadsheetEditDraft) {
      const nextWorkbook = {
        ...sessionSpreadsheetWorkbook,
        sheets: sessionSpreadsheetWorkbook.sheets.map((sheet) =>
          sheet.id === activeSessionSpreadsheetSheetId
            ? mergeSpreadsheetSheetWithEditDraft(sheet, sessionSpreadsheetEditDraft)
            : sheet,
        ),
      }
      const nextSheet = getSpreadsheetSheetById(nextWorkbook, sheetId)
      setSessionSpreadsheetWorkbook(nextWorkbook)
      setSessionSpreadsheetEditDraft(createSessionSpreadsheetEditState(nextSheet))
    }

    setActiveSessionSpreadsheetSheetId(sheetId)
  }

  const openSessionSpreadsheetEdit = () => {
    setSessionMarkdownEditing(false)
    setSessionMarkdownEditDraft('')
    setSessionSpreadsheetEditDraft(createSessionSpreadsheetEditState(activeSessionSpreadsheetSheet))
    setSessionSpreadsheetEditing(true)
  }

  const openSessionMarkdownEdit = () => {
    setSessionSpreadsheetEditing(false)
    setSessionSpreadsheetEditDraft(null)
    setSessionMarkdownTocOpen(false)
    setSessionMarkdownEditDraft(sessionMarkdownContent)
    setSessionMarkdownEditing(true)
  }

  const cancelSessionSpreadsheetEdit = () => {
    setSessionSpreadsheetEditing(false)
    setSessionSpreadsheetEditDraft(null)
  }

  const cancelSessionMarkdownEdit = () => {
    setSessionMarkdownEditing(false)
    setSessionMarkdownEditDraft('')
  }

  const saveSessionSpreadsheetEdit = () => {
    if (!sessionSpreadsheetEditDraft) return

    setSessionSpreadsheetWorkbook((prev) => ({
      ...prev,
      sheets: prev.sheets.map((sheet) =>
        sheet.id === activeSessionSpreadsheetSheetId
          ? mergeSpreadsheetSheetWithEditDraft(sheet, sessionSpreadsheetEditDraft)
          : sheet,
      ),
    }))
    setSessionSpreadsheetEditing(false)
    setSessionSpreadsheetEditDraft(null)
  }

  const saveSessionMarkdownEdit = () => {
    setSessionMarkdownContent(sessionMarkdownEditDraft)
    setSessionMarkdownEditing(false)
    setSessionMarkdownEditDraft('')
  }

  const cancelSessionPreviewEdit = () => {
    if (sessionSpreadsheetEditing) {
      cancelSessionSpreadsheetEdit()
      return
    }
    cancelSessionMarkdownEdit()
  }

  const saveSessionPreviewEdit = () => {
    if (sessionSpreadsheetEditing) {
      saveSessionSpreadsheetEdit()
      return
    }
    saveSessionMarkdownEdit()
  }

  const renderSessionSpreadsheetSheetTabs = () => {
    if (sessionSpreadsheetWorkbook.sheets.length <= 1) return null

    return (
      <div className="session-files-panel__sheet-tabs" role="tablist" aria-label="工作表">
        {sessionSpreadsheetWorkbook.sheets.map((sheet) => (
          <button
            key={sheet.id}
            type="button"
            role="tab"
            aria-selected={activeSessionSpreadsheetSheetId === sheet.id}
            className={`session-files-panel__sheet-tab${
              activeSessionSpreadsheetSheetId === sheet.id ? ' is-active' : ''
            }`}
            onClick={() => handleSessionSpreadsheetSheetChange(sheet.id)}
          >
            {sheet.name}
          </button>
        ))}
      </div>
    )
  }

  const renderSessionSpreadsheetFooter = (sheet) => {
    const previewLimit = sessionSpreadsheetWorkbook.previewLimit ?? 1000
    const totalRows = sheet.totalRows ?? sheet.rows.length

    return (
      <div className="session-files-panel__spreadsheet-footer">
        <p className="session-files-panel__spreadsheet-footer-text">
          显示前{' '}
          <span className="session-files-panel__spreadsheet-footer-count">{formatSpreadsheetRowCount(previewLimit)}</span>{' '}
          条数据，共{' '}
          <span className="session-files-panel__spreadsheet-footer-count">{formatSpreadsheetRowCount(totalRows)}</span>{' '}
          条数据
        </p>
      </div>
    )
  }

  const renderSessionSourceSpreadsheetPreview = () => {
    const sheet = activeSessionSpreadsheetSheet
    const previewLimit = sessionSpreadsheetWorkbook.previewLimit ?? 1000
    const { columns, rows } = sheet
    const visibleRows = rows.slice(0, previewLimit)
    const columnWidths = getSpreadsheetColumnWidths(sheet)
    const rowHeights = getSpreadsheetRowHeights(sheet, visibleRows.length)
    const spreadsheetMinWidth = getSpreadsheetMinWidth(sheet)

    return (
      <div className="session-files-panel__spreadsheet-shell">
        {renderSessionSpreadsheetSheetTabs()}
        <div className="session-files-panel__spreadsheet-scroll">
          <div
            className="session-files-panel__spreadsheet"
            style={{ minWidth: `${spreadsheetMinWidth}px` }}
          >
            <div className="session-files-panel__spreadsheet-row session-files-panel__spreadsheet-row--head">
              <div className="session-files-panel__spreadsheet-cell session-files-panel__spreadsheet-cell--corner" aria-hidden="true" />
              {columns.map((column, columnIndex) => (
                <div
                  key={column}
                  className="session-files-panel__spreadsheet-cell session-files-panel__spreadsheet-cell--column-head"
                  style={{
                    width: columnWidths[columnIndex],
                    flex: `0 0 ${columnWidths[columnIndex]}px`,
                  }}
                >
                  {column}
                </div>
              ))}
              <div className="session-files-panel__spreadsheet-cell session-files-panel__spreadsheet-cell--fill session-files-panel__spreadsheet-cell--head-fill" aria-hidden="true" />
            </div>
            {visibleRows.map((cells, rowIndex) => (
              <div
                key={`spreadsheet-row-${rowIndex + 1}`}
                className="session-files-panel__spreadsheet-row"
                style={{
                  height: rowHeights[rowIndex],
                  minHeight: rowHeights[rowIndex],
                }}
              >
                <div
                  className="session-files-panel__spreadsheet-cell session-files-panel__spreadsheet-cell--index"
                  style={{
                    height: rowHeights[rowIndex],
                    minHeight: rowHeights[rowIndex],
                  }}
                >
                  {rowIndex + 1}
                </div>
                {cells.map((cell, cellIndex) => (
                  <div
                    key={`spreadsheet-cell-${rowIndex + 1}-${cellIndex}`}
                    className="session-files-panel__spreadsheet-cell session-files-panel__spreadsheet-cell--data"
                    style={{
                      width: columnWidths[cellIndex],
                      flex: `0 0 ${columnWidths[cellIndex]}px`,
                      height: rowHeights[rowIndex],
                      minHeight: rowHeights[rowIndex],
                    }}
                  >
                    {cell}
                  </div>
                ))}
                <div className="session-files-panel__spreadsheet-cell session-files-panel__spreadsheet-cell--fill" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
        {renderSessionSpreadsheetFooter(sheet)}
      </div>
    )
  }

  const renderSessionFilePreviewBody = (file, html) => {
    const previewMode = getSessionFilePreviewMode(file)

    if (
      activeSessionSourceFileId &&
      (file.type === 'ppt' || file.type === 'pptx')
    ) {
      return (
        <SessionPptPreview
          slides={SESSION_SOURCE_PPT_PREVIEW_SLIDES}
          activeIndex={activeSessionPptSlideIndex}
          onActiveIndexChange={setActiveSessionPptSlideIndex}
        />
      )
    }

    if (
      activeSessionSourceFileId &&
      (file.type === 'doc' || file.type === 'docx')
    ) {
      return (
        <SessionDocPreview
          pages={SESSION_SOURCE_DOC_PREVIEW_PAGES}
          activeIndex={activeSessionDocPageIndex}
          onActiveIndexChange={setActiveSessionDocPageIndex}
        />
      )
    }

    if (activeSessionSourceFileId && file.type === 'pdf') {
      return (
        <SessionPdfPreview
          pages={SESSION_SOURCE_PDF_PREVIEW_PAGES}
          coverPage={sessionPdfPage01Image}
          contentPage={sessionPdfPage02Image}
          totalPages={SESSION_SOURCE_PDF_PAGE_COUNT}
          activeIndex={activeSessionPdfPageIndex}
          onActiveIndexChange={setActiveSessionPdfPageIndex}
          icons={{
            zoomOut: ICONS.zoomOut,
            zoomIn: ICONS.zoomIn,
            fitPage: ICONS.fitPage,
          }}
        />
      )
    }

    if (previewMode === 'spreadsheet' && sessionSpreadsheetEditing && sessionSpreadsheetEditDraft) {
      return (
        <div className="session-files-panel__spreadsheet-shell">
          {renderSessionSpreadsheetSheetTabs()}
          <div className="session-files-panel__spreadsheet-scroll session-files-panel__spreadsheet-scroll--edit">
            <SessionSpreadsheetEditor
              value={sessionSpreadsheetEditDraft}
              onChange={setSessionSpreadsheetEditDraft}
              createIcon={ICONS.create}
            />
          </div>
          {renderSessionSpreadsheetFooter(activeSessionSpreadsheetSheet)}
        </div>
      )
    }

    if (previewMode === 'spreadsheet') {
      return renderSessionSourceSpreadsheetPreview()
    }

    if (previewMode === 'markdown' && sessionMarkdownEditing) {
      return (
        <SessionMarkdownEditor
          key={file.id}
          value={sessionMarkdownEditDraft}
          onChange={setSessionMarkdownEditDraft}
          icons={{
            undo: ICONS.undo,
            redo: ICONS.redo,
            bold: ICONS.bold,
            bulletList: ICONS.bulletList,
            orderedList: ICONS.orderedList,
            outdent: ICONS.outdent,
            indent: ICONS.indent,
          }}
        />
      )
    }

    if (previewMode === 'markdown' && html) {
      return (
        <SessionMarkdownPreview
          html={html}
          headings={sessionMarkdownHeadings}
          tocOpen={sessionMarkdownTocOpen}
          onTocOpenChange={setSessionMarkdownTocOpen}
          icons={{
            catalog: ICONS.catalog,
            collapseCatalog: ICONS.collapseCatalog,
          }}
        />
      )
    }

    if (previewMode === 'html-cover') {
      return (
        <div className="session-files-panel__cover-preview">
          <img src={LIBRARY_ASSETS.coverHtml} alt="" className="session-files-panel__cover-preview-image" />
        </div>
      )
    }

    if (previewMode === 'image-cover') {
      return (
        <div className="session-files-panel__cover-preview">
          <img src={file.icon} alt="" className="session-files-panel__cover-preview-image session-files-panel__cover-preview-image--icon" />
        </div>
      )
    }

    if (previewMode === 'unsupported') {
      return (
        <div className="session-files-panel__unsupported-preview">
          <div className="session-files-panel__unsupported-preview-illustration" aria-hidden="true">
            <img
              src={previewUnsupportedMaskImage}
              alt=""
              className="session-files-panel__unsupported-preview-doc"
            />
            <img
              src={previewUnsupportedBadgeImage}
              alt=""
              className="session-files-panel__unsupported-preview-badge"
            />
          </div>
          <p className="session-files-panel__unsupported-preview-text">
            该类型文件暂不支持预览，可下载到本地查看
          </p>
        </div>
      )
    }

    return (
      <div className="session-files-panel__preview">
        <h2 className="session-files-panel__preview-title">
          {file.title.replace(/\.(md|html|ppt|pptx|pdf|docx?|xlsx?|txt|zip|png|jpe?g|gif|webp|mp3|mp4)$/i, '')}
        </h2>
        <p className="session-files-panel__preview-desc">{file.desc}</p>
      </div>
    )
  }

  const renderSessionFilePreviewPanel = () => {
    if (!activeSessionPreviewFile) return null

    const previewMode = getSessionFilePreviewMode(activeSessionPreviewFile)
    const sessionPreviewEditing = sessionSpreadsheetEditing || sessionMarkdownEditing
    const isSessionSourceFilePreview = Boolean(activeSessionSourceFileId)
    const showSessionSourcePagedPreview =
      isSessionSourceFilePreview &&
      (activeSessionPreviewFile.type === 'ppt' ||
        activeSessionPreviewFile.type === 'pptx' ||
        activeSessionPreviewFile.type === 'doc' ||
        activeSessionPreviewFile.type === 'docx' ||
        activeSessionPreviewFile.type === 'pdf')
    const showSessionPreviewStyleAction =
      !sessionPreviewEditing &&
      !isSessionSourceFilePreview &&
      (previewMode === 'html-cover' ||
        activeSessionPreviewFile.type === 'ppt' ||
        activeSessionPreviewFile.type === 'pptx')
    const showSessionPreviewEditAction =
      !sessionPreviewEditing &&
      !isSessionReadonlySourceFilePreview &&
      !showSessionPreviewStyleAction &&
      (previewMode === 'spreadsheet' || previewMode === 'markdown')
    const showSessionPreviewDownloadAction = !isSessionReadonlySourceFilePreview
    const previewActionClassName = 'icon-btn session-files-panel__detail-action'

    return (
      <>
        <header
          className={`session-files-panel__source-preview-header${
            sessionFilesPanelFullscreen ? ' session-files-panel__source-preview-header--fullscreen' : ''
          }`}
        >
          {!sessionFilesPanelFullscreen && !sessionPreviewEditing ? (
            <IconButton
              tip="返回"
              className="icon-btn session-files-panel__detail-back"
              aria-label="返回文件列表"
              onClick={closeSessionFilePreview}
            >
              <span className="dora-icon icon-16" aria-hidden="true">
                {ICONS.back}
              </span>
            </IconButton>
          ) : null}
          {!sessionFilesPanelFullscreen && sessionPreviewEditing ? (
            <IconButton
              tip="返回"
              className="icon-btn session-files-panel__detail-back"
              aria-label="退出编辑"
              onClick={cancelSessionPreviewEdit}
            >
              <span className="dora-icon icon-16" aria-hidden="true">
                {ICONS.back}
              </span>
            </IconButton>
          ) : null}
          <div className="session-files-panel__source-preview-file">
            <img src={activeSessionPreviewFile.icon} alt="" className="session-files-panel__detail-file-icon" />
            <span className="session-files-panel__source-preview-title">{activeSessionPreviewFile.title}</span>
          </div>
          <div className="session-files-panel__source-preview-tools">
            {sessionPreviewEditing ? (
              <>
                <button
                  type="button"
                  className="session-files-panel__edit-btn session-files-panel__edit-btn--ghost"
                  onClick={cancelSessionPreviewEdit}
                >
                  取消
                </button>
                <button
                  type="button"
                  className="session-files-panel__edit-btn session-files-panel__edit-btn--primary"
                  onClick={saveSessionPreviewEdit}
                >
                  保存
                </button>
              </>
            ) : (
              <>
            {activeSessionPreviewCiteFile
              ? renderSessionCiteAction(activeSessionPreviewCiteFile, {
                  className: 'icon-btn session-files-panel__detail-action session-files-panel__action-btn--cite',
                })
              : null}
            {!isSessionSourceFilePreview ? (
              <IconButton tip="存到资料库" className={previewActionClassName} aria-label="存到资料库">
                <span className="dora-icon icon-16" aria-hidden="true">
                  {ICONS.saveAs}
                </span>
              </IconButton>
            ) : null}
            {showSessionPreviewStyleAction ? (
              <IconButton tip="风格" className={previewActionClassName} aria-label="风格">
                <span className="dora-icon icon-16" aria-hidden="true">
                  {ICONS.styleLine}
                </span>
              </IconButton>
            ) : null}
            {showSessionPreviewEditAction ? (
              <IconButton
                tip="编辑"
                className={previewActionClassName}
                aria-label="编辑"
                onClick={
                  previewMode === 'spreadsheet'
                    ? openSessionSpreadsheetEdit
                    : previewMode === 'markdown'
                      ? openSessionMarkdownEdit
                      : undefined
                }
              >
                <span className="dora-icon icon-16" aria-hidden="true">
                  {ICONS.editLine}
                </span>
              </IconButton>
            ) : null}
            {!isSessionSourceFilePreview ? (
              <IconButton tip="分享" className={previewActionClassName} aria-label="分享">
                <span className="dora-icon icon-16" aria-hidden="true">
                  {ICONS.share}
                </span>
              </IconButton>
            ) : null}
            {showSessionPreviewDownloadAction
              ? renderSessionPreviewDownloadAction(previewActionClassName, previewMode, isSessionSourceFilePreview)
              : null}
            <IconButton
              tip={sessionFilesPanelFullscreen ? '退出放大' : '放大'}
              className={previewActionClassName}
              aria-label={sessionFilesPanelFullscreen ? '退出放大' : '放大'}
              onClick={toggleSessionFilesPanelFullscreen}
            >
              <span className="dora-icon icon-16" aria-hidden="true">
                {sessionFilesPanelFullscreen ? ICONS.shrink : ICONS.expand}
              </span>
            </IconButton>
            {!sessionFilesPanelFullscreen ? (
              <IconButton
                tip="关闭"
                className={previewActionClassName}
                aria-label="关闭预览"
                onClick={closeSessionFilePreview}
              >
                <span className="dora-icon icon-16" aria-hidden="true">
                  {ICONS.close}
                </span>
              </IconButton>
            ) : null}
              </>
            )}
          </div>
        </header>

        <div
          className={`session-files-panel__detail-body${
            previewMode === 'spreadsheet' ? ' session-files-panel__detail-body--spreadsheet' : ''
          }${
            previewMode === 'spreadsheet' && sessionSpreadsheetEditing
              ? ' session-files-panel__detail-body--spreadsheet-edit'
              : ''
          }${
            previewMode === 'markdown' && sessionMarkdownEditing
              ? ' session-files-panel__detail-body--markdown-edit'
              : ''
          }${
            previewMode === 'markdown' && !sessionMarkdownEditing
              ? ' session-files-panel__detail-body--markdown'
              : ''
          }${
            showSessionSourcePagedPreview ? ' session-files-panel__detail-body--presentation' : ''
          }${
            previewMode === 'unsupported' ? ' session-files-panel__detail-body--unsupported' : ''
          }`}
        >
          {renderSessionFilePreviewBody(activeSessionPreviewFile, activeSessionPreviewHtml)}
        </div>
      </>
    )
  }

  const renderSessionFilesMaterialsTab = () => {
    const hasVisibleSessionSections = filteredSessionSourceSections.some((section) => section.files.length > 0)

    return (
      <div className="session-files-panel__source">
        <div className="session-files-panel__source-toolbar">
          <label className="session-files-panel__search session-files-panel__search--stretch">
            <span className="dora-icon session-files-panel__search-icon" aria-hidden="true">
              {ICONS.search}
            </span>
            <input
              value={sessionFilesSourceSearch}
              onChange={(event) => setSessionFilesSourceSearch(event.target.value)}
              type="search"
              className="session-files-panel__search-input"
              placeholder="搜索名称"
              aria-label="搜索名称"
            />
          </label>
        </div>

        <div className="session-files-panel__source-scroll">
          {hasVisibleSessionSections ? (
            filteredSessionSourceSections.map((section) => {
              const isCollapsed = Boolean(sessionFilesSourceCollapsed[section.id])

              return (
                <section key={section.id} className="session-files-panel__source-group">
                  <div className="session-files-panel__source-group-head">
                    <button
                      type="button"
                      className="session-files-panel__source-group-toggle"
                      aria-expanded={!isCollapsed}
                      onClick={() => toggleSessionFilesSourceSection(section.id)}
                    >
                      <span className="dora-icon session-files-panel__source-caret" aria-hidden="true">
                        {isCollapsed ? ICONS.triangleRight : ICONS.triangleDown}
                      </span>
                      <span className="session-files-panel__source-group-title">{section.title}</span>
                    </button>
                  </div>

                  {!isCollapsed && section.files.length ? (
                    section.variant === 'builtin' ? (
                      <div className="session-files-panel__builtin-list">
                        {section.files.map((file) => (
                          <article
                            key={file.id}
                            className="session-files-panel__builtin-item"
                            role="button"
                            tabIndex={0}
                            onClick={() => openSessionSourceFilePreview(file.id)}
                            onKeyDown={(e) => onEnterKey(e, () => openSessionSourceFilePreview(file.id))}
                            onMouseLeave={blurSessionFileCardFocus}
                          >
                            <img src={file.icon} alt="" className="session-files-panel__builtin-icon" />
                            <div className="session-files-panel__builtin-text">
                              <p className="session-files-panel__builtin-name" title={file.title}>
                                {highlightSearchText(file.title, sessionFilesSourceSearch)}
                              </p>
                            </div>
                            <div
                              className="session-files-panel__actions session-files-panel__builtin-actions"
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => e.stopPropagation()}
                            >
                              {renderSessionCiteAction(file)}
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="session-files-panel__source-grid">
                        {section.files.map((file) => (
                          <article
                            key={file.id}
                            className="session-files-panel__source-card"
                            role="button"
                            tabIndex={0}
                            onClick={() => openSessionSourceFilePreview(file.id)}
                            onKeyDown={(e) => onEnterKey(e, () => openSessionSourceFilePreview(file.id))}
                            onMouseLeave={blurSessionFileCardFocus}
                          >
                            <img src={file.icon} alt="" className="session-files-panel__source-icon" />
                            <div className="session-files-panel__card-body">
                              <div className="session-files-panel__source-text">
                                <p className="session-files-panel__source-name" title={file.title}>
                                  {highlightSearchText(file.title, sessionFilesSourceSearch)}
                                </p>
                                <p className="session-files-panel__source-size">{file.size}</p>
                              </div>
                              <div
                                className="session-files-panel__actions"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                              >
                                {renderSessionSourceFileActions(file)}
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )
                  ) : null}

                  {!isCollapsed && !section.files.length ? (
                    <div className="session-files-panel__source-empty">
                      {sessionFilesSourceSearch.trim() ? '暂无匹配数据' : '暂无内容'}
                    </div>
                  ) : null}
                </section>
              )
            })
          ) : (
            <div className="session-files-panel__empty session-files-panel__empty--tab">
              {sessionFilesSourceSearch.trim() ? '暂无匹配数据' : '暂无内容'}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderSessionOutputFileActions = (file) => (
    <>
      {renderSessionCiteAction(file)}
      <IconButton tip="存入资料库" size="sm" className="session-files-panel__action-btn">
        <span className="dora-icon icon-16" aria-hidden="true">
          {ICONS.saveAs}
        </span>
      </IconButton>
      <IconButton tip="分享" size="sm" className="session-files-panel__action-btn">
        <span className="dora-icon icon-16" aria-hidden="true">
          {ICONS.share}
        </span>
      </IconButton>
      <IconButton tip="下载" size="sm" className="session-files-panel__action-btn">
        <span className="dora-icon icon-16" aria-hidden="true">
          {ICONS.download}
        </span>
      </IconButton>
    </>
  )

  const renderSessionFilesSurface = ({ variant = 'panel', onClose, surfaceRef, style, className = '' }) => {
    const isModal = variant === 'modal'
    const SurfaceTag = isModal ? 'div' : 'aside'

    return (
      <SurfaceTag
        ref={surfaceRef}
        className={`session-files-panel${isModal ? ' session-files-panel--modal' : ''}${
          !isModal && sessionSplitEntered ? ' session-files-panel--entered' : ''
        }${!isModal && sessionFilesPanelFullscreen ? ' session-files-panel--fullscreen' : ''}${
          activeSessionPreviewFile ? ' session-files-panel--source-preview' : ''
        }${className}`}
        role={isModal ? 'dialog' : undefined}
        aria-modal={isModal ? 'true' : undefined}
        aria-label="会话文件"
        style={style}
        onClick={isModal ? (event) => event.stopPropagation() : undefined}
      >
        {activeSessionPreviewFile ? (
          renderSessionFilePreviewPanel()
        ) : (
          <>
        <header className="session-files-panel__header">
          <div className="session-files-panel__tabs-shell">
            <div className="session-files-panel__tabs" role="tablist" aria-label="会话文件分类">
              <button
                type="button"
                role="tab"
                aria-selected={sessionFilesTab === 'materials'}
                className={`session-files-panel__tab${sessionFilesTab === 'materials' ? ' active' : ''}`}
                onClick={() => setSessionFilesTab('materials')}
              >
                来源
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={sessionFilesTab === 'output'}
                className={`session-files-panel__tab${sessionFilesTab === 'output' ? ' active' : ''}`}
                onClick={() => setSessionFilesTab('output')}
              >
                产出
              </button>
            </div>
          </div>
          <div className="session-files-panel__header-actions">
            <IconButton
              tip="关闭"
              className="icon-btn session-files-panel__close"
              aria-label="关闭会话文件"
              onClick={onClose}
            >
              <span className="dora-icon icon-16" aria-hidden="true">
                {ICONS.close}
              </span>
            </IconButton>
          </div>
        </header>

        {sessionFilesTab === 'output' ? (
            <>
              <div className="session-files-panel__toolbar">
                <SessionFilesToolbarRow
                  filtersAriaLabel="文件类型筛选"
                  searchValue={sessionFilesSearch}
                  onSearchChange={setSessionFilesSearch}
                  searchIcon={ICONS.search}
                  collapseSearch
                >
                  {availableSessionFilesFilterOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="tab"
                      aria-selected={sessionFilesFilter === option.value}
                      className={`session-files-panel__filter${sessionFilesFilter === option.value ? ' active' : ''}`}
                      onClick={() => setSessionFilesFilter(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </SessionFilesToolbarRow>
              </div>

              <div className="session-files-panel__list">
                {filteredSessionFiles.map((item) => (
                  <article
                    key={item.id}
                    className="session-files-panel__card"
                    role="button"
                    tabIndex={0}
                    onClick={() => openSessionOutputFilePreview(item.id)}
                    onKeyDown={(e) => onEnterKey(e, () => openSessionOutputFilePreview(item.id))}
                    onMouseLeave={blurSessionFileCardFocus}
                  >
                    <img src={item.icon} alt="" className="session-files-panel__type-icon" />
                    <div className="session-files-panel__card-body">
                      <div className="session-files-panel__text">
                        <h3 className="session-files-panel__title">{highlightSearchText(item.title, sessionFilesSearch)}</h3>
                        <p className="session-files-panel__desc">{highlightSearchText(item.desc, sessionFilesSearch)}</p>
                      </div>
                      <div
                        className="session-files-panel__actions"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        {renderSessionOutputFileActions(item)}
                      </div>
                    </div>
                  </article>
                ))}

                {!filteredSessionFiles.length ? (
                  <div className="session-files-panel__empty">
                    {sessionFilesSearch.trim() ? '暂无匹配文件' : '暂无内容'}
                  </div>
                ) : null}
              </div>
            </>
        ) : (
          renderSessionFilesMaterialsTab()
        )}
          </>
        )}
      </SurfaceTag>
    )
  }

  const isSessionFilePreviewFullscreenPortaled =
    sessionFilesPanelFullscreen && Boolean(activeSessionPreviewFile)

  const renderSessionFilesPanel = () => {
    if (isSessionFilePreviewFullscreenPortaled) {
      return (
        <aside
          className="session-files-panel session-files-panel--preview-fullscreen-placeholder"
          aria-hidden="true"
          style={{ width: 0, flex: '0 0 0' }}
        />
      )
    }

    return renderSessionFilesSurface({
      variant: 'panel',
      onClose: () => {
        setSessionFilesPanelFullscreen(false)
        setSessionFilesPanelOpen(false)
      },
      surfaceRef: sessionFilesPanelRef,
      style: {
        width: sessionFilesPanelFullscreen ? '100%' : sessionSplitEntered ? sessionFilesPanelWidth : 0,
      },
    })
  }

  const renderSessionFilePreviewFullscreenPortal = () => {
    if (!isSessionFilePreviewFullscreenPortaled) return null

    return createPortal(
      <div className="session-file-preview-fullscreen-layer">
        {renderSessionFilesSurface({
          variant: 'panel',
          className: ' session-files-panel--entered session-files-panel--source-preview session-files-panel--fullscreen',
        })}
      </div>,
      document.body,
    )
  }

  const renderSessionFilesModal = (onClose) =>
    createPortal(
      <div className="session-files-modal-overlay" role="presentation" onClick={onClose}>
        {renderSessionFilesSurface({
          variant: 'modal',
          onClose,
        })}
      </div>,
      document.body,
    )

  const renderLibrarySessionFilesModal = () => renderSessionFilesModal(() => setLibrarySessionFilesModalOpen(false))

  const sessionAssistantName = isExpertDetailView ? activeExpertCard?.title ?? 'Agent' : 'Dora'
  const sessionAssistantAvatar = isExpertDetailView ? activeExpertCard?.icon ?? agentDefaultAvatarImage : doraUploadedImage

  const renderPracticesBackButton = () => (
    <button type="button" className="practices-back practices-back--header" onClick={() => setPracticesPageOpen(false)}>
      <span className="practices-back__label">点击或滚动上滑返回</span>
      <span className="dora-icon icon-16 practices-back__more-down" aria-hidden="true">
        {ICONS.moreUp}
      </span>
    </button>
  )

  const renderPracticePreviewDeck = () => (
    <div
      className="practices-panel"
      aria-label="最佳实践轮播预览"
      data-practice-deck-variant="desktop"
      {...practiceDeckGestureProps}
    >
      <div className="cards-track">
        {practiceDeckCards.map(({ relative, card }) => (
          <article
            key={`practice-deck-${card.id}`}
            className="practice-browser-card practice-deck-card"
            style={getPracticeDeckCardStyle(relative, 'desktop')}
            aria-hidden={relative !== 0}
            data-active={relative === 0 ? 'true' : 'false'}
            data-practice-relative={relative}
          >
            <div className="practice-browser-card__cover" aria-hidden="true">
              <img src={card.cover} alt="" className="practice-browser-card__cover-image" draggable="false" />
            </div>
            <div className="practice-browser-card__body">
              <h3 data-practice-title={card.title}>{card.title}</h3>
            </div>
            <div className="practice-browser-card__hover">
              <button
                type="button"
                className="practice-browser-card__action practice-browser-card__action--negative"
                tabIndex={relative === 0 ? 0 : -1}
                onClick={(event) => event.stopPropagation()}
              >
                做同款
              </button>
              <button
                type="button"
                className="practice-browser-card__action practice-browser-card__action--primary"
                tabIndex={relative === 0 ? 0 : -1}
                onClick={(event) => event.stopPropagation()}
              >
                去查看
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )

  const renderDesktopPracticesFooter = () => (
    <footer
      className="practices practices--desktop dora-stage__practices practices--hotzone"
      role="button"
      tabIndex={0}
      aria-label="探索最佳实践"
      onClick={(event) => {
        if (practiceDeckSuppressClickRef.current) {
          event.preventDefault()
          practiceDeckSuppressClickRef.current = false
          return
        }
        setPracticesPageOpen(true)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          movePracticeDeck(event.key === 'ArrowRight' ? 1 : -1)
          return
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setPracticesPageOpen(true)
        }
      }}
    >
      <div className="practices-mobile-meta" aria-hidden="true">
        <span className="practices-mobile-meta__label">
          全部推荐
          <span className="dora-icon">{ICONS.arrowRight}</span>
        </span>
        <span className="practices-mobile-meta__count" aria-live="polite">
          {String(practiceDeckIndex + 1).padStart(2, '0')}/{String(PRACTICE_CARDS.length).padStart(2, '0')}
        </span>
      </div>

      <div className="practices-toggle" aria-hidden="true">
        <span>探索最佳实践</span>
        <span className="dora-icon icon-16 practices-toggle__more-up" aria-hidden="true">
          {ICONS.moreUp}
        </span>
      </div>

      {renderPracticePreviewDeck()}

      <div
        className="practice-mobile-deck"
        aria-hidden="true"
        data-practice-deck-variant="mobile"
        {...practiceDeckGestureProps}
      >
        {practiceDeckCards.map(({ relative, card }) => (
          <div
            key={`practice-mobile-${card.id}`}
            className="practice-mobile-deck__card"
            style={getPracticeDeckCardStyle(relative, 'mobile')}
            data-active={relative === 0 ? 'true' : 'false'}
            data-practice-relative={relative}
          >
            <img src={card.cover} alt="" draggable="false" />
          </div>
        ))}
      </div>
    </footer>
  )

  const activeMobileRecommendation = mobileRecommendationItems.length
    ? mobileRecommendationItems[mobileRecommendationIndex % mobileRecommendationItems.length]
    : null

  const activateMobileRecommendation = () => {
    if (!activeMobileRecommendation) return
    setPracticesPageOpen(false)

    if (activeMobileRecommendation.kind === 'expert') {
      setActiveNav('experts')
      openExpertCard(activeMobileRecommendation.payload)
      return
    }

    setActiveNav('library')
    openLibraryItem(activeMobileRecommendation.payload, { trackRecent: true })
  }

  const renderMobileRecommendationsFooter = () => (
    <footer
      className="mobile-recommendations dora-stage__practices"
      role="button"
      tabIndex={0}
      aria-label={activeMobileRecommendation ? `推荐：${activeMobileRecommendation.title}` : '推荐'}
      onClick={(event) => {
        if (practiceDeckSuppressClickRef.current) {
          event.preventDefault()
          practiceDeckSuppressClickRef.current = false
          return
        }
        activateMobileRecommendation()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          moveMobileRecommendationDeck(event.key === 'ArrowRight' ? 1 : -1)
          return
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          activateMobileRecommendation()
        }
      }}
    >
      <div className="mobile-recommendations__meta" aria-hidden="true">
        <span>推荐</span>
        <span className="mobile-recommendations__count" aria-live="polite">
          {String(mobileRecommendationIndex + 1).padStart(2, '0')}/
          {String(mobileRecommendationItems.length).padStart(2, '0')}
        </span>
      </div>

      <div
        className="mobile-recommendations__deck"
        data-practice-deck-variant="recommendation"
        data-practice-deck-scope="recommendation"
        {...practiceDeckGestureProps}
      >
        {mobileRecommendationDeckCards.map(({ relative, item }) => (
          <div
            key={`mobile-recommendation-${item.id}`}
            className="mobile-recommendations__card"
            style={getPracticeDeckCardStyle(relative, 'recommendation')}
            aria-hidden={relative !== 0}
            data-active={relative === 0 ? 'true' : 'false'}
            data-practice-distance={Math.min(2, Math.abs(relative))}
            data-practice-relative={relative}
          >
            <img src={item.image} alt="" draggable="false" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </footer>
  )

  const renderPracticesFooter = () => (
    <>
      {renderDesktopPracticesFooter()}
      {renderMobileRecommendationsFooter()}
    </>
  )

  const renderSessionThread = () => (
    <SessionThread
      turns={activeSessionTurns}
      resetExpandKey={`${activeNav}:${activeInnerAction}:${activeSessionScope}:${activeHistoryItemId ?? 'none'}`}
      userPrompt={activeSessionPrompt}
      userFiles={activeSessionUserFiles}
      userSentAt={activeSessionSentAt}
      assistantName={sessionAssistantName}
      assistantAvatar={sessionAssistantAvatar}
      isTransitioning={isTransitioningSession}
      isGenerating={isGeneratingSession}
      completedSessionMeta={activeSessionCompletedMeta}
      onGenerationComplete={handleSessionGenerationComplete}
    />
  )

  const openLibrarySession = ({ id = null, label = '', userFiles = [] }) => {
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      const nextHistoryItems =
        id && prev.historyItems.some((item) => item.id === id)
          ? prepareHistoryItemsForSession(prev.historyItems, {
              id,
              group: 'today',
              label,
              badge: '',
            })
          : prev.historyItems
      const activeHistoryItem = id ? nextHistoryItems.find((item) => item.id === id) ?? prev.historyItems.find((item) => item.id === id) : null
      const nextTurns = activeHistoryItem
        ? getSessionTurnsFromHistoryItem(activeHistoryItem, userFiles)
        : buildLegacySessionTurns({ prompt: label, userFiles })
      return {
        ...prev,
        historyItems: nextHistoryItems,
        activeSessionTurns: nextTurns,
        activeSessionPrompt: label,
        activeSessionUserFiles: userFiles,
        activeSessionCompletedMeta: null,
        activeHistoryItemId: id,
        isTransitioningSession: true,
        isGeneratingSession: false,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
    beginSessionTransition('dora', userFiles)
    setLibraryChatCollapsed(false)
  }

  const updateLibraryChatSessionMenuPosition = useCallback(() => {
    const anchor = libraryChatSessionTriggerRef.current
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    setLibraryChatSessionMenuPos({
      top: rect.bottom + 4,
      left: rect.left,
    })
  }, [])

  const closeLibraryChatSessionMenu = () => {
    setLibraryChatSessionMenuOpen(false)
    setLibraryChatSessionSearch('')
  }

  const toggleLibraryChatSessionMenu = () => {
    if (libraryChatSessionMenuOpen) {
      closeLibraryChatSessionMenu()
      return
    }
    updateLibraryChatSessionMenuPosition()
    setLibraryChatSessionMenuOpen(true)
  }

  const handleLibraryChatSessionSelect = (item) => {
    closeLibraryChatSessionMenu()
    openHistorySession(item)
  }

  const startNewLibraryChat = () => {
    closeLibraryChatSessionMenu()
    clearSessionTransitionTimer('dora')
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      return {
        ...prev,
        isTransitioningSession: false,
        isGeneratingSession: false,
        activeSessionPrompt: '',
        activeSessionUserFiles: [],
        activeHistoryItemId: null,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
  }

  const handleHeroSparklesReplay = () => {
    if (doraVisualScheme !== 'scheme7') return
    setHeroSparkleReplayKey((prev) => prev + 1)
  }

  const renderSharedSessionStage = (introPhase) => (
    <div
      className={`dora-stage dora-stage--${introPhase} dora-stage--${doraVisualScheme} ${
        isQuestionMode || isExpertDetailView ? 'dora-stage--plain-bg' : ''
      }${isExpertDetailView ? ' dora-stage--expert-session' : ''}`}
      onPointerMove={(event) => {
        handleScheme3PointerMove(event)
        handleHeatmapPointerMove(event)
      }}
      onPointerLeave={(event) => {
        handleScheme3PointerLeave(event)
        handleHeatmapPointerLeave()
      }}
    >
      {!isQuestionMode && !isExpertDetailView ? renderOrbBackgroundBanner() : null}
      <header
        className={`main-header dora-stage__header ${practicesPageOpen ? 'dora-stage__header--practices' : ''} ${
          isQuestionMode || (!practicesPageOpen && (activeNav === 'dora' || isExpertDetailView))
            ? 'dora-stage__header--session'
            : ''
        }`}
      >
        {practicesPageOpen ? (
          renderPracticesBackButton()
        ) : isQuestionMode ? (
          <>
            <div className="mobile-session-header">
              <div className="mobile-session-header__title-group">
                <button
                  type="button"
                  className="mobile-session-header__action"
                  aria-label="返回上一级"
                  onClick={() => {
                    startNewAgentChat()
                    setMobileNewChatPageOpen(false)
                    closeMobileCatalog()
                  }}
                >
                  <span className="dora-icon" aria-hidden="true">{ICONS.mobileBack}</span>
                </button>
                <h2 title={activeSessionHistoryItem?.label ?? activeSessionPrompt}>
                  {activeSessionHistoryItem?.label ?? activeSessionPrompt}
                </h2>
              </div>
              <div className="mobile-session-header__actions">
                <button type="button" className="mobile-session-header__action" aria-label="会话文件" aria-pressed={sessionFilesPanelOpen} onClick={toggleSessionFilesPanel}>
                  <span className="dora-icon" aria-hidden="true">{ICONS.sessionFile}</span>
                </button>
                <button type="button" className="mobile-session-header__action" aria-label="分享">
                  <span className="dora-icon" aria-hidden="true">{ICONS.share}</span>
                </button>
                <button type="button" className="mobile-session-header__action" aria-label="目录" aria-expanded={mobileCatalogOpen} onClick={() => setMobileCatalogOpen(true)}>
                  <span className="dora-icon" aria-hidden="true">{ICONS.catalog}</span>
                </button>
              </div>
            </div>
            <div className="desktop-session-header">
              <IconButton tip={panelToggleTitle} className="icon-btn panel-toggle" onClick={() => setInternalSidebarOpen((prev) => !prev)}>
                <span className="dora-icon icon-16" aria-hidden="true">{ICONS.sidebar}</span>
              </IconButton>
              <div className="main-header__session-meta">
                <h2 className="main-header__session-title" title={activeSessionPrompt}>{activeSessionPrompt}</h2>
              </div>
              {renderSessionHeaderActions()}
            </div>
          </>
        ) : (
          <>
            <IconButton
              tip={panelToggleTitle}
              className="icon-btn panel-toggle"
              onClick={() => setInternalSidebarOpen((prev) => !prev)}
            >
              <span className="dora-icon icon-16" aria-hidden="true">
                {ICONS.sidebar}
              </span>
            </IconButton>
            {renderHomeHeaderNav()}
            {renderSessionHeaderActions()}
          </>
        )}
      </header>

      {renderMobileCatalogDrawer()}
      {renderMobileAvatarMenu()}

      {practicesPageOpen ? (
        <section className="practices-browser dora-stage__practices-browser">
          <div className="practices-grid">
            {PRACTICE_CARDS.map((card) => (
              <article key={`browser-${card.id}`} className="practice-browser-card">
                <div className="practice-browser-card__cover" aria-hidden="true">
                  <img src={card.cover} alt="" className="practice-browser-card__cover-image" />
                </div>
                <div className="practice-browser-card__body">
                  <h3 data-practice-title={card.title}>{card.title}</h3>
                </div>
                <div className="practice-browser-card__hover">
                  <button type="button" className="practice-browser-card__action practice-browser-card__action--negative">
                    做同款
                  </button>
                  <button type="button" className="practice-browser-card__action practice-browser-card__action--primary">
                    去查看
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className={`hero dora-stage__hero ${isQuestionMode ? 'hero--session' : ''}`}>
            {isQuestionMode ? (
              <div className="session-generating dora-stage__session">{renderSessionThread()}</div>
            ) : (
              <div className="hero-inner dora-stage__hero-inner">
                <div
                  className={`welcome${doraVisualScheme === 'scheme7' ? ' welcome--orb-layout' : ''}`}
                  onMouseEnter={handleHeroSparklesReplay}
                >
                  {doraVisualScheme === 'scheme7' ? (
                    <div className="robot robot--orb robot--orb-hero" aria-hidden="true">
                      <Orb
                        className="robot--orb-canvas"
                        hoverIntensity={0.25}
                        rotateOnHover={true}
                        hue={0}
                        forceHoverState={false}
                        backgroundColor="#ffffff"
                        transparentBackground={false}
                      />
                    </div>
                  ) : null}
                  <h1 className={`title${doraVisualScheme === 'scheme7' ? ' title--orb-layout' : ''}`}>
                    {doraVisualScheme === 'scheme7' ? (
                      <SparklesText
                        className="title-sparkles"
                        text="Hi, 需要Dora帮你做什么？"
                        sparklesCount={12}
                        activeDuration={3000}
                        triggerKey={`hero-title-${doraVisualScheme}-${heroSparkleReplayKey}`}
                      />
                    ) : (
                      'Hi, 需要Dora帮你做什么？'
                    )}
                  </h1>
                </div>
              </div>
            )}

            <div className={`sender-wrap dora-stage__sender ${isQuestionMode ? 'sender-wrap--session' : ''}`}>
              <div className="sender-combo">
                <div
                  className={`sender ${inputFocused ? 'focused' : ''} ${canSend ? 'has-value' : ''} ${isSessionBusy ? 'is-sending' : ''} ${
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
                    {renderSenderInnerContent(activeSessionScope)}
                    {renderSenderToolbarBlock({ showStop: isSessionBusy })}
                  </div>
                </div>
              </div>
            </div>
            {renderHeroSkillSlot()}
            {isQuestionMode ? (
              <p className="sender-wrap__tip dora-stage__sender-tip">内容均由AI生成, 仅供参考</p>
            ) : null}
          </section>
          {!isQuestionMode && !isExpertDetailView ? renderPracticesFooter() : null}
        </>
      )}
    </div>
  )

  useEffect(() => {
    if (activeNav !== 'dora' || !practicesPageOpen) return

    const container = contentColumnRef.current
    if (!container) return

    container.scrollTop = 0
    requestAnimationFrame(() => {
      if (contentColumnRef.current) {
        contentColumnRef.current.scrollTop = 0
      }
    })
  }, [activeNav, practicesPageOpen])

  useEffect(() => {
    if (composerUpdateSourceRef.current === 'editor') {
      composerUpdateSourceRef.current = 'external'
      resizeSenderEditor(senderEditorRef.current)
      return
    }

    syncComposerEditorFromSegments(composerSegments)
  }, [composerSegments])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const editor = senderEditorRef.current
    if (!editor) return
    resizeSenderEditor(editor)
  }, [composerPlainText, activeNav, isExpertDetailView, activeLibraryItem, isSessionBusy])

  useEffect(
    () => () => {
      uploadTimersRef.current.forEach((timer) => clearInterval(timer))
      uploadTimersRef.current.clear()
      sessionTransitionTimersRef.current.forEach((timer) => window.clearTimeout(timer))
      sessionTransitionTimersRef.current.clear()
    },
    [],
  )

  useEffect(() => {
    if (!showSessionSplit) {
      setSessionFilesPanelOpen(false)
    }
  }, [showSessionSplit])

  useEffect(() => {
    if (!sessionFilesPanelOpen) {
      setActiveSessionFileId(null)
      setActiveSessionSourceFileId(null)
      setSessionFileRefPreviewOpen(false)
      setSessionFilesPanelFullscreen(false)
    }
  }, [sessionFilesPanelOpen])

  useEffect(() => {
    if (!librarySessionFilesModalOpen) {
      setActiveSessionFileId(null)
      setActiveSessionSourceFileId(null)
    }
  }, [librarySessionFilesModalOpen])

  useEffect(() => {
    if (!activeLibraryItem) {
      setLibrarySessionFilesModalOpen(false)
      closeLibraryChatSessionMenu()
    }
  }, [activeLibraryItem])

  useEffect(() => {
    if (!isQuestionMode) {
      closeLibraryChatSessionMenu()
    }
  }, [isQuestionMode])

  useEffect(() => {
    if (!activeLibraryKey) return
    closeLibraryChatSessionMenu()
    clearSessionTransitionTimer('dora')
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      return {
        ...prev,
        isTransitioningSession: false,
        isGeneratingSession: false,
        activeSessionPrompt: '',
        activeSessionUserFiles: [],
        activeHistoryItemId: null,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
  }, [activeLibraryKey])

  useEffect(() => {
    if (!libraryChatSessionMenuOpen) return undefined

    const handlePointerDown = (event) => {
      if (
        libraryChatSessionTriggerRef.current?.contains(event.target) ||
        libraryChatSessionPanelRef.current?.contains(event.target)
      ) {
        return
      }
      closeLibraryChatSessionMenu()
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLibraryChatSessionMenu()
      }
    }

    const handleReposition = () => updateLibraryChatSessionMenuPosition()

    window.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [libraryChatSessionMenuOpen, updateLibraryChatSessionMenuPosition])

  useEffect(() => {
    if (!attachConnectModal) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [attachConnectModal])

  useEffect(() => {
    if (!librarySessionFilesModalOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLibrarySessionFilesModalOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [librarySessionFilesModalOpen])

  useEffect(() => {
    if (!sessionFilesPanelOpen || !sessionFilesPanelFullscreen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSessionFilesPanelFullscreen(false)
        setInternalSidebarOpen(sessionFilesFullscreenRestoreRef.current.innerSidebarOpen)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [sessionFilesPanelOpen, sessionFilesPanelFullscreen])

  useEffect(() => {
    if (sessionFilesTab !== 'output') {
      setActiveSessionFileId(null)
    }
  }, [sessionFilesTab])

  useEffect(() => {
    if (sessionFilesTab !== 'materials') {
      setActiveSessionSourceFileId(null)
    }
  }, [sessionFilesTab])

  useEffect(() => {
    if (isNewChatActive) {
      setActiveSessionFileId(null)
      setActiveSessionSourceFileId(null)
    }
  }, [isNewChatActive])

  useEffect(() => {
    if (!showSessionSplit) {
      setSessionSplitEntered(false)
      const timer = window.setTimeout(() => setSessionSplitMounted(false), 480)
      return () => clearTimeout(timer)
    }

    setSessionSplitMounted(true)
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setSessionSplitEntered(true))
    })

    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [showSessionSplit])

  useEffect(() => {
    if (!showSessionSplit) return

    const container = mainBodyRef.current
    if (!container) return

    const width = container.getBoundingClientRect().width
    const equalHalf = Math.floor((width - 8) / 2)
    setSessionFilesPanelWidth(Math.min(598, Math.max(300, equalHalf)))
  }, [showSessionSplit])

  useEffect(() => {
    if (!innerAgentMenuOpen) return undefined

    const handlePointerDown = (event) => {
      if (innerAgentMenuRef.current?.contains(event.target)) return
      if (agentMenuPanelRef.current?.contains(event.target)) return
      setInnerAgentMenuOpen(false)
    }
    const handleReposition = () => updateAgentMenuPosition()

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [innerAgentMenuOpen])

  useEffect(() => {
    if (!sessionMarkdownDownloadMenuOpen) return undefined

    const handlePointerDown = (event) => {
      if (
        sessionMarkdownDownloadBtnRef.current?.contains(event.target) ||
        sessionMarkdownDownloadMenuRef.current?.contains(event.target)
      ) {
        return
      }
      closeSessionMarkdownDownloadMenu()
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeSessionMarkdownDownloadMenu()
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sessionMarkdownDownloadMenuOpen, closeSessionMarkdownDownloadMenu])

  useEffect(() => {
    closeSessionMarkdownDownloadMenu()
  }, [activeSessionPreviewFile?.id, closeSessionMarkdownDownloadMenu])

  useEffect(() => {
    setSessionMarkdownTocOpen(false)
    setActiveSessionPptSlideIndex(0)
    setActiveSessionDocPageIndex(0)
    setActiveSessionPdfPageIndex(0)
  }, [activeSessionPreviewFile?.id])

  useEffect(() => {
    if (!attachConnectSidebarDragging) return undefined

    const handlePointerMove = (event) => {
      const { startX, startWidth } = attachConnectSidebarResizeRef.current
      const nextWidth = Math.min(
        ATTACH_CONNECT_SIDEBAR_WIDTH_MAX,
        Math.max(ATTACH_CONNECT_SIDEBAR_WIDTH_MIN, startWidth + event.clientX - startX),
      )
      setAttachConnectSidebarWidth(nextWidth)
    }

    const handlePointerUp = () => {
      setAttachConnectSidebarDragging(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [attachConnectSidebarDragging])

  useEffect(() => {
    if (!historyMenuOpenId) return undefined

    const handlePointerDown = (event) => {
      if (
        event.target.closest('.inner-history-item__more') ||
        historyMenuPanelRef.current?.contains(event.target)
      ) {
        return
      }
      setHistoryMenuOpenId(null)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setHistoryMenuOpenId(null)
    }
    const handleReposition = () => updateHistoryMenuPosition()

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [historyMenuOpenId, updateHistoryMenuPosition])

  useEffect(() => {
    if (!historyRenamingId) return undefined

    const frame = requestAnimationFrame(() => {
      const input = historyRenameInputRef.current
      if (!input) return
      input.focus()
      input.select()
    })

    return () => cancelAnimationFrame(frame)
  }, [historyRenamingId])

  useEffect(() => {
    if (!avatarMenuOpen && !languageMenuOpen) return undefined

    const handlePointerDown = (event) => {
      if (
        avatarBtnRef.current?.contains(event.target) ||
        avatarMenuPanelRef.current?.contains(event.target) ||
        languageMenuPanelRef.current?.contains(event.target)
      ) {
        return
      }
      setAvatarMenuOpen(false)
      setLanguageMenuOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setAvatarMenuOpen(false)
        setLanguageMenuOpen(false)
      }
    }
    const handleReposition = () => {
      if (avatarMenuOpen) updateAvatarMenuPosition()
      if (languageMenuOpen) updateLanguageMenuPosition()
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [avatarMenuOpen, languageMenuOpen, updateAvatarMenuPosition, updateLanguageMenuPosition])

  useEffect(() => {
    if (!languageMenuOpen) return undefined
    const frame = requestAnimationFrame(() => updateLanguageMenuPosition())
    return () => cancelAnimationFrame(frame)
  }, [languageMenuOpen, updateLanguageMenuPosition])

  useEffect(() => {
    if (!expertsNavPopoverOpen) return undefined

    const handleReposition = () => updateExpertsNavPopoverPosition()

    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    return () => {
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [expertsNavPopoverOpen])

  useEffect(() => {
    if (!doraNavPopoverOpen) return undefined

    const handleReposition = () => updateDoraNavPopoverPosition()

    requestAnimationFrame(handleReposition)
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    return () => {
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [doraNavPopoverOpen])

  useEffect(() => {
    if (expertAlertCount === 0) {
      setExpertsAlertsDismissedSnapshot(null)
    }
  }, [expertAlertCount])

  useEffect(() => {
    if (!showExpertsAlerts) {
      setExpertsNavPopoverOpen(false)
    }
  }, [showExpertsAlerts])

  useEffect(() => {
    if (!showDoraAlerts) {
      setDoraNavPopoverOpen(false)
    }
  }, [showDoraAlerts])

  useEffect(() => {
    return () => {
      if (doraNavLeaveTimerRef.current) {
        clearTimeout(doraNavLeaveTimerRef.current)
      }
      if (expertsNavLeaveTimerRef.current) {
        clearTimeout(expertsNavLeaveTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const mainEl = expertsPageMainRef.current
    if (!mainEl || activeNav !== 'experts' || activeExpertCard) {
      setExpertsPageScrolled(false)
      return undefined
    }

    const handleScroll = () => {
      setExpertsPageScrolled(mainEl.scrollTop > 0)
    }

    handleScroll()
    mainEl.addEventListener('scroll', handleScroll, { passive: true })
    return () => mainEl.removeEventListener('scroll', handleScroll)
  }, [activeNav, activeExpertCard])

  useEffect(() => {
    setActiveExpertTab(0)
  }, [activeExpertCard])

  useEffect(() => {
    if (activeExpertTab >= activeExpertTabs.length) {
      setActiveExpertTab(0)
    }
  }, [activeExpertTab, activeExpertTabs.length])

  useEffect(() => {
    const listEl = expertTabListRef.current
    if (!listEl) return

    const activeBtn = listEl.querySelector('.expert-tab.active')
    if (!activeBtn) return

    const isLastTab = activeExpertTab === activeExpertTabs.length - 1
    activeBtn.scrollIntoView({
      block: 'nearest',
      inline: isLastTab ? 'end' : 'nearest',
    })
  }, [activeExpertTab, activeExpertTabs.length])

  useEffect(() => {
    if (activeNav !== 'dora') {
      setDoraIntroPhase('idle')
      return
    }

    setDoraIntroPhase('content')
  }, [activeNav])

  useEffect(() => {
    setHeatmapTokenColors(getHeatmapTokenColors())
  }, [])

  useEffect(() => {
    if (doraVisualScheme !== 'scheme4' && doraVisualScheme !== 'scheme5') return undefined
    const stage = heatmapStageRef.current
    if (!stage) return undefined

    const updateHeatmapGrid = () => {
      const rect = stage.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const layout = getHeatmapLayout(rect.width, rect.height, doraVisualScheme)
      const { rows, cols, cellWidth, cellHeight } = layout

      setHeatmapGrid((prev) => {
        if (
          prev.rows === rows &&
          prev.cols === cols &&
          Math.abs(prev.cellWidth - cellWidth) < 0.1 &&
          Math.abs(prev.cellHeight - cellHeight) < 0.1
        ) {
          return prev
        }
        return { rows, cols, cellWidth, cellHeight }
      })

      setHeatmapFocus((prev) => {
        const defaultFocus = getHeatmapDefaultFocus(rows, cols, doraVisualScheme)
        const r = prev.mark ? Math.min(prev.r, rows - 1) : defaultFocus.r
        const c = prev.mark ? Math.min(prev.c, cols - 1) : defaultFocus.c
        if (!prev.mark) {
          heatmapAnchorRef.current = { r, c }
        }
        if (prev.r === r && prev.c === c) return prev
        return { ...prev, r, c }
      })
    }

    updateHeatmapGrid()

    const resizeObserver = new ResizeObserver(updateHeatmapGrid)
    resizeObserver.observe(stage)
    window.addEventListener('resize', updateHeatmapGrid)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateHeatmapGrid)
    }
  }, [doraVisualScheme])

  useEffect(() => {
    if (doraVisualScheme !== 'scheme5') return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setHeatmapFocus((prev) => ({ ...prev, mark: false }))
      return undefined
    }

    heatmapAutoModeRef.current = true
    heatmapAutoPhaseRef.current = performance.now()

    let frameId = 0
    const loop = (now) => {
      if (heatmapAutoModeRef.current) {
        const t = now - heatmapAutoPhaseRef.current
        const rowCenter = (heatmapGrid.rows - 1) * 0.5
        const colCenter = (heatmapGrid.cols - 1) * 0.5
        const rowAmp = Math.max(0, rowCenter - HEATMAP_AUTO_MOTION.edgePadding)
        const colAmp = Math.max(0, colCenter - HEATMAP_AUTO_MOTION.edgePadding)
        const phaseOffset = heatmapAutoOffsetRef.current
        const r = Math.max(0, Math.min(heatmapGrid.rows - 1, rowCenter + rowAmp * Math.sin(t * HEATMAP_AUTO_MOTION.wR + phaseOffset.r)))
        const c = Math.max(
          0,
          Math.min(heatmapGrid.cols - 1, colCenter + colAmp * Math.sin(t * HEATMAP_AUTO_MOTION.wC + phaseOffset.c)),
        )

        setHeatmapFocus((prev) => {
          if (!prev.mark && Math.abs(prev.r - r) < 0.01 && Math.abs(prev.c - c) < 0.01) return prev
          return { r, c, mark: false }
        })
      }

      frameId = requestAnimationFrame(loop)
    }

    frameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frameId)
      heatmapAutoModeRef.current = false
    }
  }, [doraVisualScheme, heatmapGrid.rows, heatmapGrid.cols])

  const selectNav = (id) => {
    setActiveNav(id)
    if (id !== 'dora') {
      setActiveInnerAction('new-chat')
    }
    if (id !== 'dora') {
      setPracticesPageOpen(false)
    }
  }

  const updateExpertsNavPopoverPosition = () => {
    const rect = expertsNavRef.current?.getBoundingClientRect()
    if (!rect) return
    setExpertsNavPopoverPos({ top: rect.top, left: rect.right + 4 })
  }

  const updateDoraNavPopoverPosition = () => {
    const rect = doraNavRef.current?.getBoundingClientRect()
    if (!rect) return
    const popoverHeight = doraNavPopoverRef.current?.offsetHeight ?? 32
    setDoraNavPopoverPos({
      top: rect.top + (rect.height - popoverHeight) / 2,
      left: rect.right + 4,
    })
  }

  const openDoraNavPopover = () => {
    if (!showDoraAlerts) return
    updateDoraNavPopoverPosition()
    setDoraNavPopoverOpen(true)
  }

  const closeDoraNavPopover = () => {
    setDoraNavPopoverOpen(false)
  }

  const handleDoraNavEnter = () => {
    if (doraNavLeaveTimerRef.current) {
      clearTimeout(doraNavLeaveTimerRef.current)
      doraNavLeaveTimerRef.current = null
    }
    openDoraNavPopover()
  }

  const handleDoraNavLeave = () => {
    doraNavLeaveTimerRef.current = setTimeout(() => {
      if (!doraNavPopoverHoverRef.current) {
        closeDoraNavPopover()
      }
    }, 120)
  }

  const handleDoraNavPopoverEnter = () => {
    doraNavPopoverHoverRef.current = true
    if (doraNavLeaveTimerRef.current) {
      clearTimeout(doraNavLeaveTimerRef.current)
      doraNavLeaveTimerRef.current = null
    }
  }

  const handleDoraNavPopoverLeave = () => {
    doraNavPopoverHoverRef.current = false
    closeDoraNavPopover()
  }

  const dismissDoraAlerts = () => {
    setDoraAvatars((prev) => prev.map((item) => (item.badge ? { ...item, badge: '' } : item)))
    updateSessionScopeState('dora', (prev) => ({
      ...prev,
      historyItems: prev.historyItems.map((item) => (item.badge ? { ...item, badge: '' } : item)),
    }))
    closeDoraNavPopover()
  }

  const openExpertsNavPopover = () => {
    if (!showExpertsAlerts) return
    updateExpertsNavPopoverPosition()
    setExpertsNavPopoverOpen(true)
  }

  const closeExpertsNavPopover = () => {
    setExpertsNavPopoverOpen(false)
  }

  const handleExpertsNavEnter = () => {
    if (expertsNavLeaveTimerRef.current) {
      clearTimeout(expertsNavLeaveTimerRef.current)
      expertsNavLeaveTimerRef.current = null
    }
    openExpertsNavPopover()
  }

  const handleExpertsNavLeave = () => {
    expertsNavLeaveTimerRef.current = setTimeout(() => {
      if (!expertsNavPopoverHoverRef.current) {
        closeExpertsNavPopover()
      }
    }, 120)
  }

  const handleExpertsNavPopoverEnter = () => {
    expertsNavPopoverHoverRef.current = true
    if (expertsNavLeaveTimerRef.current) {
      clearTimeout(expertsNavLeaveTimerRef.current)
      expertsNavLeaveTimerRef.current = null
    }
  }

  const handleExpertsNavPopoverLeave = () => {
    expertsNavPopoverHoverRef.current = false
    closeExpertsNavPopover()
  }

  const openExpertFromNavPopover = (card) => {
    setActiveNav('experts')
    openExpertCard(card)
    setPracticesPageOpen(false)
    closeExpertsNavPopover()
  }

  const dismissExpertsAlerts = () => {
    setExpertsAlertsDismissedSnapshot(buildExpertAlertSnapshot())
    closeExpertsNavPopover()
  }

  const openLibraryItem = (item, { trackRecent = false } = {}) => {
    if (trackRecent) {
      setMobileRecommendationIndex(0)
      setLibraryRecentItems((prev) => {
        const key = getLibraryItemKey(item)
        const next = [item, ...prev.filter((entry) => getLibraryItemKey(entry) !== key)]
        return next.slice(0, 12)
      })
      setMobileRecommendationRecents((prev) => {
        const recommendation = createLibraryRecommendationItem(item)
        return [recommendation, ...prev.filter((entry) => entry.id !== recommendation.id)].slice(
          0,
          MOBILE_RECOMMENDATION_LIMIT,
        )
      })
    }
    setActiveInnerAction('new-chat')
    setActiveLibraryItem(item)
    setLibraryChatCollapsed(false)
  }

  const toggleScheduleTaskEnabled = useCallback((scope, taskId) => {
    setScheduleTasksByScope((prev) => ({
      ...prev,
      [scope]: (prev[scope] ?? []).map((task) => (task.id === taskId ? { ...task, enabled: !task.enabled } : task)),
    }))
  }, [])

  const applyHeroSkillTag = (tag) => {
    setActiveHeroSkillTagId((prev) => (prev === tag.id ? null : tag.id))
  }

  const clearHeroSkillTag = () => {
    setActiveHeroSkillTagId(null)
  }

  const applyHeroSkillPrompt = (prompt) => {
    updateSessionScopeState('dora', (prev) => ({
      ...prev,
      inputText: prompt,
      composerSegments: [{ type: 'text', value: prompt }],
    }))
    requestAnimationFrame(() => {
      senderEditorRef.current?.focus()
    })
  }

  const updateHeroSkillTagsScrollState = useCallback(() => {
    const scroller = heroSkillTagsScrollerRef.current
    if (!scroller) {
      setHeroSkillTagsHasOverflow(false)
      setHeroSkillTagsCanScrollPrev(false)
      setHeroSkillTagsCanScrollNext(false)
      return
    }

    const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth)
    setHeroSkillTagsHasOverflow(maxScrollLeft > 1)
    setHeroSkillTagsCanScrollPrev(scroller.scrollLeft > 1)
    setHeroSkillTagsCanScrollNext(scroller.scrollLeft < maxScrollLeft - 1)
  }, [])

  const scrollHeroSkillTags = (direction = 1) => {
    const scroller = heroSkillTagsScrollerRef.current
    if (!scroller) return
    scroller.scrollBy({ left: direction * Math.max(160, scroller.clientWidth * 0.55), behavior: 'smooth' })
  }

  useEffect(() => {
    updateHeroSkillTagsScrollState()
  }, [tagsAnimKey, updateHeroSkillTagsScrollState])

  useEffect(() => {
    const scroller = heroSkillTagsScrollerRef.current
    if (!scroller) return undefined

    const resizeObserver = new ResizeObserver(() => updateHeroSkillTagsScrollState())
    resizeObserver.observe(scroller)
    window.addEventListener('resize', updateHeroSkillTagsScrollState)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateHeroSkillTagsScrollState)
    }
  }, [tagsAnimKey, updateHeroSkillTagsScrollState])

  const renderSenderSkillPrompts = (tagId = activeHeroSkillTagId) => {
    const tag = HERO_SKILL_TAGS.find((item) => item.id === tagId) ?? null
    if (!tag) return null
    const prompts = HERO_SKILL_TAG_PROMPTS[tag.id] ?? []
    if (!prompts.length) return null

    return (
      <div className="sender-skill-prompts" key={tag.id} role="listbox" aria-label={`${tag.label}推荐问题`}>
        {prompts.map((prompt, index) => (
          <Fragment key={prompt}>
            {index > 0 ? (
              <div
                className="sender-skill-prompt__divider"
                style={{ '--hero-prompt-index': index }}
                aria-hidden="true"
              />
            ) : null}
            <button
              type="button"
              className="sender-skill-prompt"
              role="option"
              style={{ '--hero-prompt-index': index }}
              onClick={() => applyHeroSkillPrompt(prompt)}
            >
              {prompt}
            </button>
          </Fragment>
        ))}
      </div>
    )
  }

  const renderHeroSkillSlot = () => {
    if (isQuestionMode) return null

    return (
      <div
        className={`hero-skill-slot dora-stage__skill-tags${
          showHeroSkillSenderUi ? ' hero-skill-slot--prompts' : ' hero-skill-slot--tags'
        }${skillSlotAnimate ? ' hero-skill-slot--animate' : ''}`}
      >
        <div className="hero-skill-slot__panel hero-skill-slot__panel--tags">
          {renderHeroSkillTags()}
        </div>
        <div
          className="hero-skill-slot__panel hero-skill-slot__panel--prompts"
          aria-hidden={!showHeroSkillSenderUi && !slotPromptTagId}
        >
          {slotPromptTagId ? renderSenderSkillPrompts(slotPromptTagId) : null}
        </div>
      </div>
    )
  }

  const renderSenderToolbarBlock = ({ showStop = false } = {}) => (
    <div className="sender-toolbar">
      <div className="sender-toolbar__left">
        {renderAttachActions()}
        {showHeroSkillSenderUi ? (
          <button
            type="button"
            className="sender-skill-tag"
            aria-label={`取消已选技能：${activeHeroSkillTag.label}`}
            onClick={clearHeroSkillTag}
          >
            <span className="dora-icon icon-16 sender-skill-tag__icon" aria-hidden="true">
              {activeHeroSkillTag.icon}
            </span>
            <span className="sender-skill-tag__remove" aria-hidden="true">
              <span className="dora-icon icon-16 sender-skill-tag__remove-icon" aria-hidden="true">
                {ICONS.close}
              </span>
            </span>
            <span className="sender-skill-tag__label">{activeHeroSkillTag.label}</span>
          </button>
        ) : null}
      </div>
      <button
        type="button"
        className="send-btn"
        aria-label={showStop ? '停止生成' : '发送'}
        disabled={!showStop && !canSend}
        onClick={showStop ? handleStopGeneration : handleSend}
      >
        {showStop ? (
          <span className="send-stop-icon" aria-hidden="true"></span>
        ) : (
          <span className="dora-icon send-icon" aria-hidden="true">
            {ICONS.send}
          </span>
        )}
      </button>
    </div>
  )

  const renderHeroSkillTags = () => (
    <div
      className={[
        'hero-skill-tags',
        heroSkillTagsHasOverflow ? 'has-overflow' : '',
        heroSkillTagsCanScrollPrev ? 'can-scroll-prev' : '',
        heroSkillTagsCanScrollNext ? 'can-scroll-next' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="快捷技能"
    >
      <div
        className="hero-skill-tags__scroller"
        ref={heroSkillTagsScrollerRef}
        key={`tags-${tagsAnimKey}`}
        onScroll={updateHeroSkillTagsScrollState}
      >
        {HERO_SKILL_TAGS.map((tag, index) => (
          <button
            key={tag.id}
            type="button"
            className={`hero-skill-tag${activeHeroSkillTagId === tag.id ? ' is-active' : ''}`}
            aria-pressed={activeHeroSkillTagId === tag.id}
            style={{ '--hero-tag-index': index }}
            onClick={() => applyHeroSkillTag(tag)}
          >
            <span className="dora-icon icon-16 hero-skill-tag__icon" aria-hidden="true">
              {tag.icon}
            </span>
            <span className="hero-skill-tag__label">{tag.label}</span>
          </button>
        ))}
      </div>
      {heroSkillTagsCanScrollPrev ? (
        <button
          type="button"
          className="hero-skill-tags__nav hero-skill-tags__nav--prev"
          aria-label="查看前面的技能"
          onClick={() => scrollHeroSkillTags(-1)}
        >
          <span className="dora-icon icon-16" aria-hidden="true">
            {ICONS.arrowRight}
          </span>
        </button>
      ) : null}
      {heroSkillTagsCanScrollNext ? (
        <button
          type="button"
          className="hero-skill-tags__nav hero-skill-tags__nav--next"
          aria-label="查看更多技能"
          onClick={() => scrollHeroSkillTags(1)}
        >
          <span className="dora-icon icon-16" aria-hidden="true">
            {ICONS.arrowRight}
          </span>
        </button>
      ) : null}
    </div>
  )

  const renderScheduleChannelIcon = (channel, index = 0) => {
    const channelIconMap = {
      agent: currentScheduleAgentAvatar,
      feishu: feishuImage,
      ding: dingImage,
      wechat: wechatImage,
    }
    const channelLabelMap = {
      agent: currentScheduleAgentTitle,
      feishu: '飞书',
      ding: '钉钉',
      wechat: '企业微信',
    }

    const icon = channelIconMap[channel]
    if (!icon) return null

    return (
      <img
        key={`${channel}-${index}`}
        src={icon}
        alt={channelLabelMap[channel]}
        className="schedule-task-card__channel-icon"
      />
    )
  }

  const renderSchedulePage = () => (
    <>
      <section className="mobile-schedule-page">
        <header className="mobile-schedule-page__header">
          <div className="mobile-schedule-page__header-left">
            <button
              type="button"
              className="mobile-schedule-page__action"
              aria-label="返回"
              onClick={() => {
                handleInnerActionClick('new-chat')
                setMobileNewChatPageOpen(false)
              }}
            >
              <span className="dora-icon" aria-hidden="true">{ICONS.mobileBack}</span>
            </button>
            <h1>定时任务</h1>
          </div>
          <button
            type="button"
            className="mobile-schedule-page__action mobile-schedule-page__catalog-action"
            aria-label="打开侧边栏"
            aria-expanded={mobileCatalogOpen}
            onClick={() => setMobileCatalogOpen(true)}
          >
            <span className="dora-icon" aria-hidden="true">{ICONS.sidebar}</span>
          </button>
        </header>
        <div className="mobile-schedule-page__body" />
        {renderMobileCatalogDrawer()}
      </section>

      <section className="schedule-page">
      <header className="schedule-page__header">
        <div className="schedule-page__header-left">
          <IconButton
            tip={panelToggleTitle}
            className="expert-detail-page__back"
            aria-label={panelToggleTitle}
            onClick={toggleInnerSidebar}
          >
            <span className="dora-icon icon-16" aria-hidden="true">
              {ICONS.sidebar}
            </span>
          </IconButton>
          <span className="schedule-page__title">定时任务</span>
        </div>

        <div className="schedule-page__header-note">
          <span>{isExpertDetailView ? '需要管理该 Agent 的所有定时任务？' : '需要管理所有定时任务？'}</span>
          <button type="button" className="schedule-page__header-link">
            <span>前往「Agent 监控」</span>
            <span className="dora-icon icon-16" aria-hidden="true">
              {ICONS.openWindow}
            </span>
          </button>
        </div>
      </header>

      <div className="schedule-page__body">
        <div className="schedule-page__content">
          <div className="schedule-toolbar">
            <div className="schedule-toolbar__filters">
              <label className="schedule-search">
                <span className="dora-icon schedule-search__icon" aria-hidden="true">
                  {ICONS.search}
                </span>
                <input
                  value={scheduleSearch}
                  onChange={(event) => setScheduleSearch(event.target.value)}
                  type="text"
                  className="schedule-search__input"
                  placeholder="搜索"
                />
              </label>

              <FieldSelect
                classPrefix="schedule"
                value={scheduleSourceFilter}
                options={SCHEDULE_SOURCE_OPTIONS}
                onChange={setScheduleSourceFilter}
                ariaLabel="筛选任务来源"
                minWidth={122}
                dropdownClassName="schedule-select-dropdown"
              />

              <FieldSelect
                classPrefix="schedule"
                value={scheduleChannelFilter}
                options={SCHEDULE_CHANNEL_OPTIONS}
                onChange={setScheduleChannelFilter}
                ariaLabel="筛选推送渠道"
                minWidth={122}
                dropdownClassName="schedule-select-dropdown"
              />
            </div>

            <button type="button" className="schedule-add-btn">
              <span className="dora-icon icon-16" aria-hidden="true">
                {ICONS.create}
              </span>
              <span>添加</span>
            </button>
          </div>

          <div className="schedule-task-list">
            {filteredScheduleTasks.map((task) => (
              <article key={task.id} className="schedule-task-card">
                <div className="schedule-task-card__header">
                  <div className="schedule-task-card__title-wrap">
                    <span className="schedule-task-card__type-icon" aria-hidden="true">
                      <span className="dora-icon icon-16">{ICONS.schedule}</span>
                    </span>
                    <h3 className="schedule-task-card__title">{task.title}</h3>
                    <span
                      className={`schedule-task-card__badge${
                        task.source === 'mine' ? ' schedule-task-card__badge--mine' : ''
                      }`}
                    >
                      {task.source === 'mine' ? '我添加的' : 'Agent 内配置'}
                    </span>
                  </div>

                  <div className="schedule-task-card__actions">
                    {task.source === 'agent' ? (
                      <>
                        <button type="button" className="schedule-task-card__icon-btn" aria-label="查看详情">
                          <span className="dora-icon icon-16" aria-hidden="true">
                            {ICONS.sessionFile}
                          </span>
                        </button>
                        <button type="button" className="schedule-task-card__icon-btn" aria-label="分享任务">
                          <span className="dora-icon icon-16" aria-hidden="true">
                            {ICONS.share}
                          </span>
                        </button>
                        <button type="button" className="schedule-task-card__icon-btn" aria-label="编辑任务">
                          <span className="dora-icon icon-16" aria-hidden="true">
                            {ICONS.editLine}
                          </span>
                        </button>
                      </>
                    ) : null}

                    <button
                      type="button"
                      role="switch"
                      aria-checked={task.enabled}
                      className={`schedule-switch${task.enabled ? ' is-on' : ''}`}
                      onClick={() => toggleScheduleTaskEnabled(currentScheduleScope, task.id)}
                    >
                      <span className="schedule-switch__thumb" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="schedule-task-card__body">
                  <p className="schedule-task-card__summary">{task.summary}</p>
                  <div className="schedule-task-card__divider" />
                  <div className="schedule-task-card__footer">
                    <span className="schedule-task-card__time">{task.scheduleText}</span>
                    <div className="schedule-task-card__channels">
                      {task.channels.map((channel, index) => renderScheduleChannelIcon(channel, index))}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {!filteredScheduleTasks.length ? (
              <div className="schedule-empty">暂无匹配任务，请尝试调整筛选条件。</div>
            ) : null}
          </div>
        </div>
      </div>
      </section>
    </>
  )

  const handleStopGeneration = () => {
    clearSessionTransitionTimer(activeSessionScope)
    updateActiveSessionState((prev) => {
      const nextTurns = updateLastSessionTurn(getSessionTurnsFromState(prev), (turn) => ({
        ...turn,
        completedSessionMeta: null,
      }))
      const activeTurn = nextTurns[nextTurns.length - 1] ?? null

      return {
        ...prev,
        historyItems: prev.activeHistoryItemId
          ? updateHistoryItemById(
              completeHistoryItemGeneration(prev.historyItems, prev.activeHistoryItemId, {
                incrementUnread: false,
              }),
              prev.activeHistoryItemId,
              (item) => ({
                ...item,
                sessionTurns: nextTurns,
                completedSessionMeta: null,
              }),
            )
          : prev.historyItems,
        activeSessionTurns: nextTurns,
        activeSessionPrompt: activeTurn?.prompt ?? prev.activeSessionPrompt,
        activeSessionUserFiles: activeTurn?.userFiles ?? prev.activeSessionUserFiles,
        activeSessionCompletedMeta: null,
        isTransitioningSession: false,
        isGeneratingSession: false,
      }
    })
  }

  const handleSessionGenerationComplete = useCallback(({ completedCount, durationMs, streamKey } = {}) => {
    updateActiveSessionState((prev) => {
      const completedMeta = buildCompletedSessionMeta({
        completedCount,
        durationMs,
        streamKey,
      })
      const nextTurns = updateLastSessionTurn(getSessionTurnsFromState(prev), (turn) => ({
        ...turn,
        completedSessionMeta: completedMeta,
      }))
      const activeTurn = nextTurns[nextTurns.length - 1] ?? null

      return {
        ...prev,
        historyItems: prev.activeHistoryItemId
          ? updateHistoryItemById(
              completeHistoryItemGeneration(prev.historyItems, prev.activeHistoryItemId, {
                incrementUnread: false,
              }),
              prev.activeHistoryItemId,
              (item) => ({
                ...item,
                sessionTurns: nextTurns,
                completedSessionMeta: buildCompletedSessionMeta({
                  completedCount,
                  durationMs,
                  summaryStatus: item.completedSessionMeta?.summaryStatus ?? '',
                  streamKey,
                }),
              }),
            )
          : prev.historyItems,
        activeSessionTurns: nextTurns,
        activeSessionPrompt: activeTurn?.prompt ?? prev.activeSessionPrompt,
        activeSessionUserFiles: activeTurn?.userFiles ?? prev.activeSessionUserFiles,
        activeSessionCompletedMeta: completedMeta,
        isGeneratingSession: false,
      }
    })
  }, [])

  const handleSend = () => {
    const text = composerPlainText.trim()
    const readyFiles = composerFiles.filter((file) => file.status === 'done')
    if (!text && !readyFiles.length) return

    const label = text || readyFiles.map((file) => file.name).join('、')

    if (readyFiles.length) {
      setSessionOutputFiles((prev) => [
        ...readyFiles.map((file) => ({
          id: `upload-${file.id}`,
          type: getAttachmentFileType(file.name),
          title: file.name,
          desc: formatAttachmentFileSize(file.size),
          icon: file.icon,
        })),
        ...prev,
      ])
    }

    readyFiles.forEach((file) => clearComposerUploadTimer(file.id))

    const sentUserFiles = mapComposerFilesToSessionUserFiles(readyFiles)
    const nextTurn = createSessionTurn({
      prompt: label,
      userFiles: sentUserFiles,
      sentAt: createSessionSentAt(),
      completedSessionMeta: null,
    })

    if (isQuestionMode && activeHistoryItemId) {
      if (isLibraryDetailView) {
        const libraryKey = getLibraryItemKey(activeLibraryItem)
        setLibraryChatSessionsByKey((prev) => ({
          ...prev,
          [libraryKey]: (prev[libraryKey] ?? []).map((item) =>
            item.id === activeHistoryItemId
              ? {
                  ...item,
                  sessionTurns: [...getSessionTurnsFromHistoryItem(item), nextTurn],
                  isGenerating: true,
                  badge: '',
                }
              : item,
          ),
        }))
      }

      updateSessionScopeState(activeSessionScope, (prev) => {
        const nextTurns = [...getSessionTurnsFromState(prev), nextTurn]
        const currentHistoryItem = prev.historyItems.find((item) => item.id === prev.activeHistoryItemId)

        return {
          ...prev,
          historyItems: currentHistoryItem
            ? upsertHistoryItem(prev.historyItems, {
                ...currentHistoryItem,
                sessionTurns: nextTurns,
                isGenerating: true,
                badge: '',
              })
            : prev.historyItems,
          activeSessionTurns: nextTurns,
          activeSessionPrompt: nextTurn.prompt,
          activeSessionUserFiles: nextTurn.userFiles,
          activeSessionCompletedMeta: null,
          isTransitioningSession: true,
          isGeneratingSession: false,
          inputText: '',
          composerFiles: [],
          composerSegments: DEFAULT_COMPOSER_SEGMENTS,
        }
      })
      beginSessionTransition(activeSessionScope, sentUserFiles)
      return
    }

    const historyId = `history-${Date.now()}`
    const nextHistoryItem = {
      id: historyId,
      group: 'today',
      label,
      badge: '',
      isGenerating: true,
      sentAt: nextTurn.sentAt,
      sessionTurns: [nextTurn],
    }

    if (isLibraryDetailView) {
      const libraryKey = getLibraryItemKey(activeLibraryItem)
      setLibraryChatSessionsByKey((prev) => ({
        ...prev,
        [libraryKey]: [nextHistoryItem, ...(prev[libraryKey] ?? [])],
      }))
      updateSessionScopeState(activeSessionScope, (prev) => ({
        ...prev,
        historyItems: upsertHistoryItem(prev.historyItems, nextHistoryItem),
        inputText: '',
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }))
      openLibrarySession({ id: historyId, label, userFiles: sentUserFiles })
      return
    }

    updateSessionScopeState(activeSessionScope, (prev) => ({
      ...prev,
      historyItems: [nextHistoryItem, ...prev.historyItems],
      inputText: '',
      composerFiles: [],
      composerSegments: DEFAULT_COMPOSER_SEGMENTS,
    }))

    openHistorySession(nextHistoryItem, sentUserFiles)
  }

  const openScopedHistorySession = ({
    scope = 'dora',
    id = null,
    label = '',
    agentTitle = '',
    userFiles = [],
  }) => {
    setActiveInnerAction('new-chat')
    const nextHistoryItem = {
      id,
      group: 'today',
      label,
      badge: '',
      sentAt: createSessionSentAt(),
    }

    setActiveLibraryItem(null)
    setLibraryChatCollapsed(false)
    setPracticesPageOpen(false)
    setInternalSidebarOpen(true)

    if (scope === 'experts') {
      setActiveNav('experts')
      setActiveExpertCard(normalizeExpertCard(getLibrarySourceExpertCard(agentTitle)))
      updateSessionScopeState('experts', (prev) => {
        clearScopeComposerUploadTimers(prev.composerFiles)
        const nextHistoryItems = prepareHistoryItemsForSession(prev.historyItems, nextHistoryItem)
        const nextTurns = getSessionTurnsFromHistoryItem(
          {
            ...nextHistoryItem,
            sessionTurns: [createSessionTurn({ id: `${id ?? 'history'}-turn-1`, prompt: label, userFiles, sentAt: nextHistoryItem.sentAt })],
          },
          userFiles,
        )
        return {
          ...prev,
          historyItems: nextHistoryItems,
          activeSessionTurns: nextTurns,
          activeSessionPrompt: label,
          activeSessionUserFiles: userFiles,
          activeSessionCompletedMeta: null,
          activeHistoryItemId: id,
          isTransitioningSession: true,
          isGeneratingSession: false,
          inputText: '',
          inputFocused: false,
          composerFiles: [],
          composerSegments: DEFAULT_COMPOSER_SEGMENTS,
        }
      })
      beginSessionTransition('experts', userFiles)
      return
    }

    setActiveNav('dora')
    setActiveExpertCard(null)
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      const nextHistoryItems = prepareHistoryItemsForSession(prev.historyItems, nextHistoryItem)
      const nextTurns = getSessionTurnsFromHistoryItem(
        {
          ...nextHistoryItem,
          sessionTurns: [createSessionTurn({ id: `${id ?? 'history'}-turn-1`, prompt: label, userFiles, sentAt: nextHistoryItem.sentAt })],
        },
        userFiles,
      )
      return {
        ...prev,
        historyItems: nextHistoryItems,
        activeSessionTurns: nextTurns,
        activeSessionPrompt: label,
        activeSessionUserFiles: userFiles,
        activeSessionCompletedMeta: null,
        activeHistoryItemId: id,
        isTransitioningSession: true,
        isGeneratingSession: false,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
    beginSessionTransition('dora', userFiles)
  }

  const openAgentSession = ({ id = null, label = '', userFiles = [] }) => {
    openScopedHistorySession({ scope: 'dora', id, label, agentTitle: 'Dora', userFiles })
  }

  const startNewAgentChat = () => {
    setActiveInnerAction('new-chat')
    if (isExpertDetailView) {
      clearSessionTransitionTimer('experts')
      updateSessionScopeState('experts', (prev) => {
        clearScopeComposerUploadTimers(prev.composerFiles)
        return {
          ...prev,
          isTransitioningSession: false,
          isGeneratingSession: false,
          activeSessionTurns: [],
          activeSessionPrompt: '',
          activeSessionUserFiles: [],
          activeSessionCompletedMeta: null,
          activeHistoryItemId: null,
          inputText: '',
          inputFocused: false,
          composerFiles: [],
          composerSegments: DEFAULT_COMPOSER_SEGMENTS,
        }
      })
      setPracticesPageOpen(false)
      return
    }

    setActiveNav('dora')
    setActiveExpertCard(null)
    setActiveLibraryItem(null)
    setLibraryChatCollapsed(false)
    clearSessionTransitionTimer('dora')
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      return {
        ...prev,
        isTransitioningSession: false,
        isGeneratingSession: false,
        activeSessionTurns: [],
        activeSessionPrompt: '',
        activeSessionUserFiles: [],
        activeSessionCompletedMeta: null,
        activeHistoryItemId: null,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
    setPracticesPageOpen(false)
  }

  const openCompletedHistorySession = (scope, item, userFiles = []) => {
    updateSessionScopeState(scope, (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      const nextTurns = getSessionTurnsFromHistoryItem(item, userFiles)
      const activeTurn = nextTurns[nextTurns.length - 1] ?? null
      return {
        ...prev,
        historyItems: markHistoryItemViewed(prev.historyItems, item.id),
        activeSessionTurns: nextTurns,
        activeSessionPrompt: activeTurn?.prompt ?? item.label,
        activeSessionUserFiles: activeTurn?.userFiles ?? userFiles,
        activeSessionCompletedMeta: activeTurn?.completedSessionMeta ?? item.completedSessionMeta ?? buildCompletedSessionMeta(),
        activeHistoryItemId: item.id,
        isTransitioningSession: false,
        isGeneratingSession: false,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
  }

  const openHistorySession = (item, userFiles = []) => {
    setHistoryMenuOpenId(null)
    setActiveInnerAction('new-chat')
    if (isLibraryDetailView) {
      openLibrarySession({ id: item.id, label: item.label, userFiles })
      return
    }
    if (!item.isGenerating) {
      if (isExpertDetailView) {
        openCompletedHistorySession('experts', item, userFiles)
        setPracticesPageOpen(false)
        return
      }

      setActiveNav('dora')
      setActiveExpertCard(null)
      setActiveLibraryItem(null)
      setLibraryChatCollapsed(false)
      clearSessionTransitionTimer('dora')
      openCompletedHistorySession('dora', item, userFiles)
      setPracticesPageOpen(false)
      return
    }
    if (isExpertDetailView) {
      updateSessionScopeState('experts', (prev) => {
        clearScopeComposerUploadTimers(prev.composerFiles)
        const nextTurns = getSessionTurnsFromHistoryItem(item, userFiles)
        const activeTurn = nextTurns[nextTurns.length - 1] ?? null
        return {
          ...prev,
          historyItems: prepareHistoryItemsForSession(prev.historyItems, item),
          activeSessionTurns: nextTurns,
          activeSessionPrompt: activeTurn?.prompt ?? item.label,
          activeSessionUserFiles: activeTurn?.userFiles ?? userFiles,
          activeSessionCompletedMeta: null,
          activeHistoryItemId: item.id,
          isTransitioningSession: true,
          isGeneratingSession: false,
          inputText: '',
          inputFocused: false,
          composerFiles: [],
          composerSegments: DEFAULT_COMPOSER_SEGMENTS,
        }
      })
      beginSessionTransition('experts', userFiles)
      setPracticesPageOpen(false)
      return
    }
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      const nextTurns = getSessionTurnsFromHistoryItem(item, userFiles)
      const activeTurn = nextTurns[nextTurns.length - 1] ?? null
      return {
        ...prev,
        historyItems: prepareHistoryItemsForSession(prev.historyItems, item),
        activeSessionTurns: nextTurns,
        activeSessionPrompt: activeTurn?.prompt ?? item.label,
        activeSessionUserFiles: activeTurn?.userFiles ?? userFiles,
        activeSessionCompletedMeta: null,
        activeHistoryItemId: item.id,
        isTransitioningSession: true,
        isGeneratingSession: false,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
    beginSessionTransition('dora', userFiles)
  }

  const handleInnerActionClick = (actionId) => {
    if (actionId === 'new-chat') {
      startNewAgentChat()
      return
    }

    if (actionId === 'schedule') {
      setActiveInnerAction('schedule')
      setPracticesPageOpen(false)
      setActiveLibraryItem(null)
    }
  }

  const onSenderKeydown = (scope, event) => {
    if (mentionPanel.open && mentionPanel.scope === scope) {
      if (senderMentionFlatItems.length) {
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          setMentionPanel((prev) => ({
            ...prev,
            activeIndex: (prev.activeIndex + 1) % senderMentionFlatItems.length,
          }))
          return
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault()
          setMentionPanel((prev) => ({
            ...prev,
            activeIndex: (prev.activeIndex - 1 + senderMentionFlatItems.length) % senderMentionFlatItems.length,
          }))
          return
        }

        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault()
          const item = senderMentionFlatItems[mentionPanel.activeIndex]
          if (item) {
            insertSenderMention(scope, item)
          }
          return
        }
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        closeSenderMentionPanel()
        return
      }
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const onEnterKey = (e, callback) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      callback()
    }
  }

  const handleScheme3PointerMove = (event) => {
    if (doraVisualScheme !== 'scheme3') return
    const rect = event.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
    const shiftX = (x - 0.5) * 34
    const shiftY = (y - 0.5) * 24

    event.currentTarget.style.setProperty('--scheme3-pointer-x', `${(x * 100).toFixed(2)}%`)
    event.currentTarget.style.setProperty('--scheme3-pointer-y', `${(y * 100).toFixed(2)}%`)
    event.currentTarget.style.setProperty('--scheme3-shift-x', `${shiftX.toFixed(2)}px`)
    event.currentTarget.style.setProperty('--scheme3-shift-y', `${shiftY.toFixed(2)}px`)
  }

  const handleScheme3PointerLeave = (event) => {
    if (doraVisualScheme !== 'scheme3') return
    event.currentTarget.style.setProperty('--scheme3-pointer-x', '70%')
    event.currentTarget.style.setProperty('--scheme3-pointer-y', '42%')
    event.currentTarget.style.setProperty('--scheme3-shift-x', '0px')
    event.currentTarget.style.setProperty('--scheme3-shift-y', '0px')
  }

  const handleHeatmapPointerMove = (event) => {
    if (doraVisualScheme !== 'scheme4' && doraVisualScheme !== 'scheme5') return
    const stage = heatmapStageRef.current
    if (!stage) return

    const rect = stage.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const gridWidth = heatmapGrid.cols * heatmapGrid.cellWidth
    const gridHeight = heatmapGrid.rows * heatmapGrid.cellHeight
    const offsetX = Math.max(0, (rect.width - gridWidth) / 2)
    const offsetY = Math.max(0, (rect.height - gridHeight) / 2)
    const localX = event.clientX - rect.left - offsetX
    const localY = event.clientY - rect.top - offsetY

    const c = Math.max(0, Math.min(heatmapGrid.cols - 1, Math.floor(localX / heatmapGrid.cellWidth)))
    const r = Math.max(0, Math.min(heatmapGrid.rows - 1, Math.floor(localY / heatmapGrid.cellHeight)))
    heatmapAnchorRef.current = { r, c }
    if (doraVisualScheme === 'scheme5') {
      heatmapAutoModeRef.current = false
    }

    setHeatmapFocus((prev) => {
      if (prev.r === r && prev.c === c && prev.mark) return prev
      return { r, c, mark: true }
    })
  }

  const handleHeatmapPointerLeave = () => {
    if (doraVisualScheme !== 'scheme5') return
    const anchor = heatmapAnchorRef.current
    heatmapAutoOffsetRef.current = getHeatmapAutoPhaseForPoint(anchor, heatmapGrid.rows, heatmapGrid.cols)
    heatmapAutoPhaseRef.current = performance.now()
    heatmapAutoModeRef.current = true
    setHeatmapFocus({ r: anchor.r, c: anchor.c, mark: false })
  }

  const handleSessionFilesResizeStart = useCallback((event) => {
    event.preventDefault()
    const container = mainBodyRef.current
    if (!container) return

    const startX = event.clientX
    const startWidth = sessionFilesPanelWidth
    const minWidth = 300
    const maxWidth = Math.max(minWidth, container.getBoundingClientRect().width - 320 - 8)

    const onPointerMove = (moveEvent) => {
      const delta = startX - moveEvent.clientX
      const nextWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + delta))
      setSessionFilesPanelWidth(nextWidth)
    }

    const onPointerUp = () => {
      sessionSplitDividerRef.current?.classList.remove('is-resizing')
      sessionFilesPanelRef.current?.classList.remove('is-resizing')
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    sessionSplitDividerRef.current?.classList.add('is-resizing')
    sessionFilesPanelRef.current?.classList.add('is-resizing')
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }, [sessionFilesPanelWidth])

  return (
    <div
      className={`page${isDoraAskPage ? ' page--dora-ask' : ''}${mobileNewChatPageOpen ? ' page--mobile-new-chat' : ''}${isScheduleView ? ' page--mobile-schedule' : ''}${isQuestionMode && !isLibraryDetailView ? ' page--mobile-session' : ''}${isExpertDetailView && !isQuestionMode && !isScheduleView ? ' page--mobile-expert-detail' : ''}${isLibraryDetailView ? ' page--mobile-library-detail' : ''}${
        sessionFilesPanelFullscreen && activeSessionPreviewFile ? ' page--session-file-preview-fullscreen' : ''
      }`}
      data-name="2-提问页"
    >
      <input
        ref={fileInputRef}
        type="file"
        className="file-picker-input"
        multiple
        onChange={handleLocalFilesSelected}
      />
      <aside className="sidebar">
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const isDoraNav = item.id === 'dora'
            const isExpertsNav = item.id === 'experts'
            const showNavBadge =
              (isExpertsNav && showExpertsAlerts) || (isDoraNav && doraAlertCount > 0)
            const navBadgeCount = isExpertsNav ? expertAlertCount : isDoraNav ? doraAlertCount : 0

            return (
              <button
                key={item.id}
                ref={isDoraNav ? doraNavRef : isExpertsNav ? expertsNavRef : undefined}
                type="button"
                data-nav-id={item.id}
                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => selectNav(item.id)}
                onMouseEnter={isDoraNav && showDoraAlerts ? handleDoraNavEnter : isExpertsNav && showExpertsAlerts ? handleExpertsNavEnter : undefined}
                onMouseLeave={isDoraNav && showDoraAlerts ? handleDoraNavLeave : isExpertsNav && showExpertsAlerts ? handleExpertsNavLeave : undefined}
                onFocus={isDoraNav && showDoraAlerts ? handleDoraNavEnter : isExpertsNav && showExpertsAlerts ? handleExpertsNavEnter : undefined}
                onBlur={isDoraNav && showDoraAlerts ? handleDoraNavLeave : isExpertsNav && showExpertsAlerts ? handleExpertsNavLeave : undefined}
                style={{
                  '--nav-active-offset-y': item.activeOffsetY,
                  '--nav-inactive-offset-y': item.inactiveOffsetY ?? '0px',
                }}
              >
                <span className="nav-icon-slot">
                  <span className="nav-icon-wrap">
                    <span className="dora-icon nav-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <img src={item.activeImage} alt="" className="nav-active-image" />
                  </span>
                  {showNavBadge ? (
                    <span className="nav-icon-badge" aria-hidden="true">
                      {formatNavBadgeCount(navBadgeCount)}
                    </span>
                  ) : null}
                </span>
                <span className="nav-label">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {doraNavPopoverOpen && showDoraAlerts
          ? createPortal(
              <div
                ref={doraNavPopoverRef}
                className="dora-nav-popover"
                style={{ top: doraNavPopoverPos.top, left: doraNavPopoverPos.left }}
                onMouseEnter={handleDoraNavPopoverEnter}
                onMouseLeave={handleDoraNavPopoverLeave}
              >
                <span className="dora-nav-popover__sparkle" aria-hidden="true">
                  ✨
                </span>
                <span className="dora-nav-popover__label">Dora有新消息</span>
                <button
                  type="button"
                  className="dora-nav-popover__read"
                  onClick={dismissDoraAlerts}
                >
                  一键已读
                </button>
              </div>,
              document.body,
            )
          : null}

        {expertsNavPopoverOpen && showExpertsAlerts
          ? createPortal(
              <div
                ref={expertsNavPopoverRef}
                className="experts-nav-popover"
                style={{ top: expertsNavPopoverPos.top, left: expertsNavPopoverPos.left }}
                onMouseEnter={handleExpertsNavPopoverEnter}
                onMouseLeave={handleExpertsNavPopoverLeave}
              >
                <div className="experts-nav-popover__header">
                  <span className="experts-nav-popover__title">专家团有新消息</span>
                  <button
                    type="button"
                    className="experts-nav-popover__hide"
                    onClick={dismissExpertsAlerts}
                  >
                    一键已读
                  </button>
                </div>
                <div className="experts-nav-popover__list">
                  {expertAlertCards.map((card) => (
                    <button
                      key={`${card.title}-${card.editedAt}`}
                      type="button"
                      className="experts-nav-popover__item"
                      onClick={() => openExpertFromNavPopover(card)}
                    >
                      <span className="experts-nav-popover__avatar-wrap">
                        <img src={card.icon} alt="" className="experts-nav-popover__avatar" />
                      </span>
                      <span className="experts-nav-popover__label">{card.title}</span>
                      <span className="inner-badge">
                        {card.alertCount > 99 ? '99+' : card.alertCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>,
              document.body,
            )
          : null}

        <div className="sidebar-footer">
          <IconButton tip="管理后台" tipPlacement="right">
            <span className="dora-icon icon-16" aria-hidden="true">
              {ICONS.adminPanel}
            </span>
          </IconButton>
          <button
            ref={avatarBtnRef}
            type="button"
            className={`icon-btn avatar-btn${avatarMenuOpen ? ' is-open' : ''}`}
            aria-label="个人中心"
            aria-haspopup="menu"
            aria-expanded={avatarMenuOpen}
            onClick={toggleAvatarMenu}
          >
            <img src={avatarImage} alt="" className="avatar" />
          </button>
        </div>
      </aside>

      <main className="main">
        <div className="main-card">
          <div
            className={`main-body${sessionSplitMounted ? ' main-body--session-split' : ''}${
              sessionFilesPanelFullscreen ? ' main-body--session-files-fullscreen' : ''
            }`}
            ref={mainBodyRef}
          >
            <div className="session-workspace">
            {activeNav === 'dora' || isExpertDetailView ? (
              <aside
                className={`inner-sidebar ${activeInnerSidebarOpen ? 'open' : ''} ${
                  activeInnerSidebarOpen ? 'inner-sidebar--enter' : ''
                }`}
              >
                <div className="inner-sidebar__head">
                  {isExpertDetailView ? (
                    <div className="inner-sidebar__detail-head">
                      <IconButton
                        tip="返回"
                        size="sm"
                        className="icon-btn inner-sidebar__back"
                        onClick={() => setActiveExpertCard(null)}
                      >
                        <span className="dora-icon icon-16" aria-hidden="true">
                          {ICONS.back}
                        </span>
                      </IconButton>
                      <div className="inner-sidebar__agent-switch" ref={innerAgentMenuRef}>
                        <button
                          ref={agentTitleRef}
                          type="button"
                          className={`inner-sidebar__agent-title ${innerAgentMenuOpen ? 'is-open' : ''}`}
                          aria-haspopup="menu"
                          aria-expanded={innerAgentMenuOpen}
                          onClick={toggleAgentMenu}
                        >
                          <img src={activeExpertCard?.icon ?? agentDefaultAvatarImage} alt="" className="inner-sidebar__agent-avatar" />
                          <span className="inner-sidebar__agent-name">{activeExpertCard?.title ?? ''}</span>
                          <span className={`dora-icon inner-sidebar__agent-caret ${innerAgentMenuOpen ? 'is-open' : ''}`} aria-hidden="true">
                            {ICONS.arrowDown}
                          </span>
                        </button>
                        {innerAgentMenuOpen
                          ? createPortal(
                              <div
                                ref={agentMenuPanelRef}
                                className="inner-sidebar__agent-menu"
                                role="menu"
                                aria-label="切换分身"
                                style={{ top: agentMenuPos.top, left: agentMenuPos.left }}
                              >
                                {expertAgentOptions.map((card, index) => (
                                  <button
                                    key={`${card.title}-${index}`}
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={activeExpertCard === card}
                                    className={`inner-sidebar__agent-option ${activeExpertCard === card ? 'active' : ''}`}
                                    onClick={() => {
                                      setActiveExpertCard(card)
                                      setInnerAgentMenuOpen(false)
                                    }}
                                  >
                                    <img src={card.icon} alt="" className="inner-sidebar__agent-option-avatar" />
                                    <span className="inner-sidebar__agent-option-name">{card.title}</span>
                                  </button>
                                ))}
                              </div>,
                              document.body,
                            )
                          : null}
                      </div>
                    </div>
                  ) : (
                    <img src={doraTitleImage} alt="Dora" className="inner-sidebar__title-image" />
                  )}
                  <IconButton tip="设置" className="icon-btn inner-sidebar__admin">
                    <span className="dora-icon icon-16" aria-hidden="true">
                      {ICONS.settings}
                    </span>
                  </IconButton>
                </div>

                <div className="inner-sidebar__content">
                  <div className="inner-sidebar__pin">
                    <div className="inner-sidebar__actions">
                      {INTERNAL_ACTIONS.map((action) => (
                        <button
                          key={action.id}
                          type="button"
                          className={`inner-item ${action.id === 'new-chat' ? 'inner-item--new-chat' : ''} ${
                            (action.id === 'new-chat' && activeInnerAction === 'new-chat' && isNewChatActive) ||
                            (action.id === 'schedule' && isScheduleView)
                              ? 'active'
                              : ''
                          }`}
                          onClick={() => handleInnerActionClick(action.id)}
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
                      <button
                        type="button"
                        className="inner-sidebar__section-head"
                        aria-expanded={!isInnerAvatarGroupCollapsed}
                        aria-label={`${isInnerAvatarGroupCollapsed ? '展开' : '收起'}分身列表`}
                        onClick={toggleInnerAvatarGroupCollapsed}
                      >
                        <span className="inner-group__title">分身</span>
                        <span className="dora-icon inner-sidebar__section-head-icon" aria-hidden="true">
                          {isInnerAvatarGroupCollapsed ? ICONS.triangleRight : ICONS.triangleDown}
                        </span>
                      </button>
                      {!isInnerAvatarGroupCollapsed
                        ? doraAvatars.map((item) => (
                            <button key={item.id} type="button" className="inner-item inner-item--list">
                              <img src={item.icon} alt="" className="inner-avatar" />
                              <span className="inner-item__label">{item.label}</span>
                              {item.badge ? <span className="inner-badge">{item.badge}</span> : null}
                            </button>
                          ))
                        : null}
                    </div>
                  </div>

                  <div className="inner-group inner-group--history">
                    <div className="inner-history-scroll">{renderHistorySessionGroups()}</div>
                  </div>
                </div>
              </aside>
            ) : null}

            <div className="content-column" ref={contentColumnRef}>
              {activeNav === 'experts' ? (
                !activeExpertCard ? (
                  <section className={`experts-page${expertMobileSearchOpen ? ' is-mobile-searching' : ''}`}>
                    <header className="experts-page__header">专家团</header>

                    {expertMobileSearchOpen ? (
                      <section className="library-mobile-search-page experts-mobile-search-page" aria-label="搜索专家">
                        <header className="library-mobile-search-page__header">
                          <label className="library-mobile-search-page__field">
                            <span className="dora-icon" aria-hidden="true">{ICONS.search}</span>
                            <input
                              value={expertSearch}
                              onChange={(e) => {
                                const nextSearch = e.target.value
                                setExpertSearch(nextSearch)
                                if (!nextSearch.trim()) setExpertMobileSearchSubmitted(false)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  setExpertMobileSearchSubmitted(Boolean(e.currentTarget.value.trim()))
                                }
                              }}
                              onFocus={() => setExpertMobileSearchFocused(true)}
                              onBlur={() => setExpertMobileSearchFocused(false)}
                              type="search"
                              placeholder="请输入"
                              autoFocus
                            />
                            {expertSearch ? (
                              <button
                                type="button"
                                aria-label="清空搜索"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setExpertSearch('')
                                  setExpertMobileSearchSubmitted(false)
                                }}
                              >
                                <span className="dora-icon" aria-hidden="true">{ICONS.close}</span>
                              </button>
                            ) : null}
                          </label>
                          {expertMobileSearchFocused ? (
                            <button
                              type="button"
                              className="library-mobile-search-page__cancel"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                setExpertMobileSearchOpen(false)
                                setExpertMobileSearchFocused(false)
                                setExpertMobileSearchSubmitted(false)
                                setExpertSearch('')
                              }}
                            >
                              取消
                            </button>
                          ) : null}
                        </header>

                        {expertMobileSearchSubmitted ? (
                          <div className="library-mobile-search-page__content experts-mobile-search-page__content">
                            {filteredExpertCards.length ? (
                              <div className="experts-grid">
                                {filteredExpertCards.map((card) => {
                                  const cardKey = getExpertCardKey(card)
                                  const isFavorite = expertFavoriteKeys.includes(cardKey)
                                  return (
                                    <article
                                      key={`mobile-search-${cardKey}-${card.desc}`}
                                      className="expert-card"
                                      role="button"
                                      tabIndex={0}
                                      onClick={() => openExpertCard(card)}
                                      onKeyDown={(e) => onEnterKey(e, () => openExpertCard(card))}
                                    >
                                      <div className="expert-card__mobile">
                                        <img src={card.mobileIcon ?? card.icon} alt="" className="expert-card__mobile-avatar" />
                                        <div className="expert-card__mobile-body">
                                          <div className="expert-card__mobile-top">
                                            <div className="expert-card__mobile-copy">
                                              <h3>{highlightSearchText(card.title, expertSearch)}</h3>
                                              <p>{highlightSearchText(card.desc, expertSearch)}</p>
                                            </div>
                                            <button
                                              type="button"
                                              className={`expert-card__favorite expert-card__favorite--mobile ${isFavorite ? 'active' : ''}`}
                                              aria-label={isFavorite ? '取消收藏' : '收藏'}
                                              onClick={(event) => {
                                                event.stopPropagation()
                                                toggleExpertFavorite(card)
                                              }}
                                            >
                                              <span className="dora-icon" aria-hidden="true">{isFavorite ? ICONS.favoriteActive : ICONS.favorite}</span>
                                            </button>
                                          </div>
                                          <div className="expert-card__mobile-meta">
                                            <span>创建人：{card.creator}</span>
                                            <span className="expert-card__mobile-meta-divider" aria-hidden="true" />
                                            <span>{card.usage}</span>
                                          </div>
                                          <div className="expert-card__mobile-tags">
                                            {card.tags.slice(0, 2).map((tag) => <span key={`mobile-search-${tag}`}>{tag}</span>)}
                                          </div>
                                        </div>
                                      </div>
                                    </article>
                                  )
                                })}
                              </div>
                            ) : <div className="experts-search-empty">暂无搜索结果</div>}
                          </div>
                        ) : null}
                      </section>
                    ) : null}

                    <div className={`experts-page__body ${expertsPageScrolled ? 'experts-page__body--scrolled' : ''}`}>
                      <div className={`experts-page__layout ${showExpertSidePanel ? 'has-side-panel' : ''}`}>
                        <div className="experts-page__main" ref={expertsPageMainRef}>
                          <div className="experts-main-sticky">
                            <div className="experts-toolbar">
                              <div className="experts-toolbar__filters">
                                <label className="experts-search experts-search--desktop">
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

                                <label
                                  className="experts-search experts-mobile-search"
                                  onClick={() => {
                                    setExpertMobileSearchFocused(true)
                                    setExpertMobileSearchOpen(true)
                                    setExpertMobileSearchSubmitted(false)
                                  }}
                                >
                                  <span className="dora-icon experts-search__icon" aria-hidden="true">{ICONS.search}</span>
                                  <input value="" readOnly type="text" className="experts-search__input" placeholder="搜索名称/描述" />
                                </label>

                                <FieldSelect
                                  classPrefix="experts"
                                  value={expertFilter}
                                  options={EXPERT_FILTER_OPTIONS}
                                  onChange={setExpertFilter}
                                  ariaLabel="筛选类型"
                                  dropdownClassName="experts-select-dropdown"
                                />
                              </div>

                              <button type="button" className="experts-create-btn">
                                <span className="dora-icon icon-16" aria-hidden="true">
                                  {ICONS.create}
                                </span>
                                <span>去创建</span>
                              </button>
                            </div>

                            <div className="session-files-panel__tabs-shell experts-tabs experts-tabs--desktop" aria-label="专家分类">
                              <div className="session-files-panel__tabs experts-tabs__list" role="tablist" aria-label="专家分类">
                                {EXPERT_BUSINESS_TABS.map((tab) => (
                                  <button
                                    key={tab.value}
                                    type="button"
                                    role="tab"
                                    aria-selected={expertBusinessFilter === tab.value}
                                    className={`session-files-panel__tab experts-tab ${expertBusinessFilter === tab.value ? 'active' : ''}`}
                                    onClick={() => setExpertBusinessFilter(tab.value)}
                                  >
                                    {tab.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {showExpertSidePanel ? (
                            <section className="experts-mobile-quick" aria-label="专家快捷入口">
                              {mobileExpertQuickSections.map((section, sectionIndex) => (
                                <Fragment key={section.id}>
                                  {sectionIndex > 0 ? <div className="experts-mobile-quick__divider" /> : null}
                                  <div className="experts-mobile-quick__section">
                                    <h2>{section.title}</h2>
                                    <div className="experts-mobile-quick__rail">
                                      {section.cards.map((card) => (
                                        <button
                                          key={`${section.id}-${getExpertCardKey(card)}`}
                                          type="button"
                                          className="experts-mobile-quick__item"
                                          onClick={() => openExpertCard(card)}
                                        >
                                          <img
                                            src={card.mobileIcon ?? card.icon}
                                            alt=""
                                          />
                                          <span>{card.title}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </Fragment>
                              ))}
                            </section>
                          ) : null}

                          {filteredExpertCards.length ? (
                            <section className="experts-mobile-all" aria-label="全部专家">
                              <h2>全部专家</h2>
                              <div className="session-files-panel__tabs-shell experts-tabs" aria-label="移动端专家分类">
                                <div className="session-files-panel__tabs experts-tabs__list" role="tablist" aria-label="移动端专家分类">
                                  {availableMobileExpertBusinessTabs.map((tab) => (
                                    <button
                                      key={`mobile-${tab.value}`}
                                      type="button"
                                      role="tab"
                                      aria-selected={expertBusinessFilter === tab.value}
                                      className={`session-files-panel__tab experts-tab ${expertBusinessFilter === tab.value ? 'active' : ''}`}
                                      onClick={() => setExpertBusinessFilter(tab.value)}
                                    >
                                      {tab.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </section>
                          ) : null}

                          {filteredExpertCards.length ? (
                            <div className="experts-grid">
                              {filteredExpertCards.map((card, cardIndex) => {
                                const cardKey = getExpertCardKey(card)
                                const isFavorite = expertFavoriteKeys.includes(cardKey)

                                return (
                                  <article
                                    key={`${cardKey}-${card.desc}`}
                                    className="expert-card"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => openExpertCard(card)}
                                    onKeyDown={(e) => onEnterKey(e, () => openExpertCard(card))}
                                  >
                                    <div className="expert-card__mobile">
                                      <img
                                        src={card.mobileIcon ?? card.icon}
                                        alt=""
                                        className="expert-card__mobile-avatar"
                                      />
                                      <div className="expert-card__mobile-body">
                                        <div className="expert-card__mobile-top">
                                          <div className="expert-card__mobile-copy">
                                            <h3>{highlightSearchText(card.title, expertSearch)}</h3>
                                            <p>{highlightSearchText(card.desc, expertSearch)}</p>
                                          </div>
                                          <button
                                            type="button"
                                            className={`expert-card__favorite expert-card__favorite--mobile ${isFavorite ? 'active' : ''}`}
                                            aria-label={isFavorite ? '取消收藏' : '收藏'}
                                            onClick={(event) => {
                                              event.stopPropagation()
                                              toggleExpertFavorite(card)
                                            }}
                                          >
                                            <span className="dora-icon" aria-hidden="true">
                                              {isFavorite ? ICONS.favoriteActive : ICONS.favorite}
                                            </span>
                                          </button>
                                        </div>
                                        <div className="expert-card__mobile-meta">
                                          <span>创建人：{card.creator}</span>
                                          <span className="expert-card__mobile-meta-divider" aria-hidden="true" />
                                          <span>{card.usage}</span>
                                        </div>
                                        {cardIndex === 1 ? null : (
                                          <div className="expert-card__mobile-tags">
                                            {card.tags.slice(0, 2).map((tag) => (
                                              <span key={`mobile-${tag}`}>{tag}</span>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="expert-card__content expert-card__desktop">
                                      <div className="expert-card__head">
                                        <div className="expert-card__avatar-wrap">
                                          <img src={card.icon} alt="" className="expert-card__avatar" />
                                          {card.alertCount > 0 ? <span className="expert-card__alert"></span> : null}
                                        </div>

                                        <div className="expert-card__meta">
                                          <h3>{highlightSearchText(card.title, expertSearch)}</h3>
                                          <p>创建人：{card.creator}</p>
                                        </div>

                                        <button
                                          type="button"
                                          className={`expert-card__favorite ${isFavorite ? 'active' : ''}`}
                                          aria-label={isFavorite ? '取消收藏' : '收藏'}
                                          onClick={(event) => {
                                            event.stopPropagation()
                                            toggleExpertFavorite(card)
                                          }}
                                        >
                                          <span className="dora-icon" aria-hidden="true">
                                            {isFavorite ? ICONS.favoriteActive : ICONS.favorite}
                                          </span>
                                        </button>
                                      </div>

                                      <p className="expert-card__desc">{highlightSearchText(card.desc, expertSearch)}</p>
                                    </div>

                                    <div className="expert-card__footer expert-card__desktop">
                                      <div className="expert-card__tags">
                                        {card.tags.slice(0, 3).map((tag) => (
                                          <span key={tag} className="expert-card__tag">
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                      <span className="expert-card__usage">{card.usage}</span>
                                      <button
                                        type="button"
                                        className="expert-card__consult"
                                        onClick={(event) => {
                                          event.stopPropagation()
                                          openExpertCard(card)
                                        }}
                                      >
                                        <span>去咨询</span>
                                        <span className="dora-icon" aria-hidden="true">
                                          {ICONS.goTo}
                                        </span>
                                      </button>
                                    </div>
                                  </article>
                                )
                              })}
                            </div>
                          ) : (
                            <div className="experts-search-empty">暂无搜索结果</div>
                          )}
                        </div>

                        {showExpertSidePanel ? (
                          <aside className="experts-side-panel" aria-label="专家快捷入口">
                            {expertRecentCards.length ? (
                              <section className="experts-side-section">
                                <div className="experts-side-section__title">
                                  <span className="experts-side-section__accent"></span>
                                  <span>最近使用</span>
                                </div>
                                <div className="experts-side-grid">
                                  {expertRecentCards.slice(0, 9).map((card) => (
                                    <IconButton
                                      key={`recent-${getExpertCardKey(card)}`}
                                      className="experts-side-avatar"
                                      tip={card.title}
                                      tipPlacement="top"
                                      onClick={() => openExpertCard(card)}
                                    >
                                      <img src={card.icon} alt="" />
                                    </IconButton>
                                  ))}
                                </div>
                              </section>
                            ) : null}

                            {expertFavoriteCards.length ? (
                              <section className="experts-side-section">
                                <div className="experts-side-section__title">
                                  <span className="experts-side-section__accent"></span>
                                  <span>我收藏的</span>
                                </div>
                                <div className="experts-side-grid">
                                  {expertFavoriteCards.map((card) => (
                                    <IconButton
                                      key={`favorite-${getExpertCardKey(card)}`}
                                      className="experts-side-avatar"
                                      tip={card.title}
                                      tipPlacement="top"
                                      onClick={() => openExpertCard(card)}
                                    >
                                      <img src={card.icon} alt="" />
                                    </IconButton>
                                  ))}
                                </div>
                              </section>
                            ) : null}
                          </aside>
                        ) : null}
                      </div>
                    </div>
                  </section>
                ) : isScheduleView ? (
                  renderSchedulePage()
                ) : isQuestionMode ? (
                  renderSharedSessionStage('content')
                ) : (
                  <section className="expert-detail-page expert-detail-page--enter">
                    <header className="expert-detail-page__header">
                      <div className="expert-detail-page__desktop-header">
                        <IconButton tip={panelToggleTitle} className="expert-detail-page__back" aria-label={panelToggleTitle} onClick={toggleInnerSidebar}>
                          <span className="dora-icon icon-16" aria-hidden="true">{ICONS.sidebar}</span>
                        </IconButton>
                        {renderSessionHeaderActions()}
                      </div>
                      <div className="expert-detail-page__mobile-header">
                        <div className="expert-detail-page__mobile-title">
                          <button type="button" className="expert-detail-page__mobile-action" aria-label="返回专家团" onClick={() => setActiveExpertCard(null)}>
                            <span className="dora-icon" aria-hidden="true">{ICONS.mobileBack}</span>
                          </button>
                          <h1>新聊天</h1>
                        </div>
                        <button type="button" className="expert-detail-page__mobile-action" aria-label="目录" aria-expanded={mobileCatalogOpen} onClick={() => setMobileCatalogOpen(true)}>
                          <span className="dora-icon" aria-hidden="true">{ICONS.catalog}</span>
                        </button>
                      </div>
                    </header>

                    {renderMobileCatalogDrawer()}

                    <div className="expert-detail-page__body">
                      <div className="expert-detail-page__panel-wrap">
                        <div className="expert-detail-page__title-wrap expert-detail-page__panel-title">
                          <img src={activeExpertCard?.icon ?? agentDefaultAvatarImage} alt="" className="expert-detail-page__avatar" />
                          <span className="expert-detail-page__title">{activeExpertCard?.title ?? ''}</span>
                        </div>

                        <div className="expert-detail-page__panel">
                          <div className="expert-intro-card">
                            <p>您好！我是数据分析专家。您可以向我提问关于数据收集、分析或可视化的问题。</p>
                          </div>

                          {activeExpertTabs.length ? (
                            <div className="expert-tab-cube">
                              <div className="expert-tab-wrap">
                                <div className="expert-tab-list" ref={expertTabListRef}>
                                  {activeExpertTabs.map((tab, idx) => (
                                    <button
                                      key={`${tab.label}-${idx}`}
                                      type="button"
                                      className={`expert-tab ${idx === activeExpertTab ? 'active' : ''}`}
                                      onClick={() => setActiveExpertTab(idx)}
                                    >
                                      <span className="expert-tab__shape" aria-hidden="true">
                                        {idx !== 0 ? (
                                          <span className="expert-tab__shape-wing expert-tab__shape-wing--left">
                                            <img src={tabCurveLeftImage} alt="" draggable={false} />
                                          </span>
                                        ) : null}
                                        <span
                                          className={`expert-tab__shape-center${
                                            idx === 0 ? ' expert-tab__shape-center--first' : ''
                                          }`}
                                        />
                                        <span className="expert-tab__shape-wing expert-tab__shape-wing--right">
                                          <img src={tabCurveRightImage} alt="" draggable={false} />
                                        </span>
                                      </span>
                                      <span className="expert-tab__label">{tab.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div
                                className={`expert-prompts${
                                  activeExpertTab !== 0 ? ' expert-prompts--tab-not-first' : ''
                                }`}
                              >
                                {activeExpertTabPrompts.map((prompt, promptIdx) => (
                                  <button
                                    key={`${activeExpertTab}-${promptIdx}-${prompt}`}
                                    type="button"
                                    className="expert-prompt-item"
                                    onClick={() =>
                                      updateSessionScopeState('experts', (prev) => ({
                                        ...prev,
                                        inputText: prompt,
                                        composerSegments: [{ type: 'text', value: prompt }],
                                      }))
                                    }
                                  >
                                    <span className="dora-icon expert-prompt-item__icon" aria-hidden="true">
                                      {ICONS.aiDecor}
                                    </span>
                                    <span>{prompt}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="expert-detail-page__sender">
                        <div className={`sender ${inputFocused ? 'focused' : ''} ${canSend ? 'has-value' : ''}`}>
                          <div className="sender-inner">
                            {renderSenderInnerContent(activeSessionScope)}
                            <div className="sender-toolbar">
                              {renderAttachActions()}
                              <button type="button" className="send-btn" aria-label="发送" disabled={!canSend} onClick={handleSend}>
                                <span className="dora-icon send-icon" aria-hidden="true">
                                  {ICONS.send}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="expert-detail-page__tip">内容均由AI生成, 仅供参考</p>
                    </div>
                  </section>
                )
              ) : activeNav === 'library' ? (
                !activeLibraryItem ? (
                  <section className={`library-page${libraryMobileSearchOpen ? ' is-mobile-searching' : ''}`}>
                    <header className="library-page__header">资料库</header>

                    {libraryMobileSearchOpen ? (
                      <section className="library-mobile-search-page" aria-label="搜索资料">
                        <header className="library-mobile-search-page__header">
                          <label className="library-mobile-search-page__field">
                            <span className="dora-icon" aria-hidden="true">{ICONS.search}</span>
                            <input
                              value={librarySearch}
                              onChange={(e) => {
                                const nextSearch = e.target.value
                                setLibrarySearch(nextSearch)
                                if (!nextSearch.trim()) {
                                  setLibraryMobileSearchSubmitted(false)
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  setLibraryMobileSearchSubmitted(Boolean(e.currentTarget.value.trim()))
                                }
                              }}
                              onFocus={() => setLibraryMobileSearchFocused(true)}
                              onBlur={() => setLibraryMobileSearchFocused(false)}
                              type="search"
                              placeholder="请输入"
                              autoFocus
                            />
                            {librarySearch ? (
                              <button
                                type="button"
                                aria-label="清空搜索"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setLibrarySearch('')
                                  setLibraryMobileSearchSubmitted(false)
                                }}
                              >
                                <span className="dora-icon" aria-hidden="true">{ICONS.close}</span>
                              </button>
                            ) : null}
                          </label>
                          {libraryMobileSearchFocused ? (
                            <button
                              type="button"
                              className="library-mobile-search-page__cancel"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => { setLibraryMobileSearchOpen(false); setLibraryMobileSearchFocused(false); setLibraryMobileSearchSubmitted(false); setLibrarySearch('') }}
                            >
                              取消
                            </button>
                          ) : null}
                        </header>

                        {libraryMobileSearchSubmitted ? <div className="library-mobile-search-page__content">
                          <div className="library-grid">
                            {filteredLibraryItems.map((item) => (
                              <article key={`mobile-search-${item.type}-${item.title}-${item.cover}`} className="library-card" data-library-type={item.type} role="button" tabIndex={0} onClick={() => openLibraryItem(item, { trackRecent: true })} onKeyDown={(e) => onEnterKey(e, () => openLibraryItem(item, { trackRecent: true }))}>
                                <div className="library-card__meta">
                                  <img src={getLibraryFileIcon(item.type)} alt="" className="library-card__type-icon" />
                                  <div className="library-card__text">
                                    <h3>{highlightSearchText(item.title, librarySearch)}</h3>
                                    <p>{highlightSearchText(item.subtitle, librarySearch)}</p>
                                  </div>
                                </div>
                                <div className="library-card__cover-wrap"><img src={item.cover} alt="" className="library-card__cover" /></div>
                              </article>
                            ))}
                            {!filteredLibraryItems.length ? <div className="library-empty">暂无匹配资源</div> : null}
                          </div>
                        </div> : null}
                      </section>
                    ) : null}

                    <div className="library-page__body">
                      <div className="library-mobile-controls">
                        <label className="library-search library-mobile-search" onClick={() => { setLibraryMobileSearchFocused(true); setLibraryMobileSearchOpen(true); setLibraryMobileSearchSubmitted(false) }}>
                          <span className="dora-icon library-search__icon" aria-hidden="true">
                            {ICONS.search}
                          </span>
                          <input
                            value=""
                            readOnly
                            type="text"
                            className="library-search__input"
                            placeholder="搜索名称/描述"
                          />
                        </label>

                      </div>

                      {libraryRecentItems.length ? (
                        <section className="library-section library-section--recent">
                          <div className="library-section__title">
                            <span className="library-section__accent library-section__accent--purple"></span>
                            <span>最近使用</span>
                          </div>

                          <div
                            className={[
                              'library-recent-strip',
                              libraryRecentHasOverflow ? 'has-overflow' : '',
                              libraryRecentCanScrollPrev ? 'can-scroll-prev' : '',
                              libraryRecentCanScrollNext ? 'can-scroll-next' : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                          >
                            <div
                              ref={libraryRecentScrollerRef}
                              className="library-recent-scroller"
                              onScroll={updateLibraryRecentScrollState}
                            >
                              {libraryRecentItems.map((item) => (
                                <article
                                  key={`recent-${getLibraryItemKey(item)}`}
                                  className="library-recent-card"
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => openLibraryItem(item, { trackRecent: true })}
                                  onKeyDown={(e) => onEnterKey(e, () => openLibraryItem(item, { trackRecent: true }))}
                                >
                                  <div className="library-recent-card__cover-wrap">
                                    <img src={item.cover} alt="" className="library-recent-card__cover" />
                                  </div>

                                  <div className="library-recent-card__title">{item.title}</div>
                                </article>
                              ))}
                            </div>

                            {libraryRecentCanScrollPrev ? (
                              <button
                                type="button"
                                className="library-recent-nav-btn library-recent-nav-btn--prev"
                                aria-label="查看前面的最近使用"
                                onClick={scrollLibraryRecentBackward}
                              >
                                <span className="dora-icon" aria-hidden="true">
                                  {ICONS.arrowRight}
                                </span>
                              </button>
                            ) : null}

                            {libraryRecentCanScrollNext ? (
                              <button
                                type="button"
                                className="library-recent-nav-btn library-recent-nav-btn--next"
                                aria-label="查看更多最近使用"
                                onClick={scrollLibraryRecentForward}
                              >
                                <span className="dora-icon" aria-hidden="true">
                                  {ICONS.arrowRight}
                                </span>
                              </button>
                            ) : null}
                          </div>
                        </section>
                      ) : null}

                      <section className="library-section library-section--fill">
                        <h2 className="library-mobile-section-title">全部资料</h2>
                        <div className="library-mobile-tabs" role="tablist" aria-label="全部资料类型">
                          {availableMobileLibraryFilterOptions.map((option) => (
                            <button
                              key={`mobile-library-${option.value}`}
                              type="button"
                              role="tab"
                              aria-selected={libraryFilter === option.value}
                              className={`library-mobile-tab ${libraryFilter === option.value ? 'active' : ''}`}
                              onClick={() => setLibraryFilter(option.value)}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                        <div className="library-section__row">
                          <div className="library-section__title">
                            <span className="library-section__accent library-section__accent--blue"></span>
                            <span>全部资源</span>
                          </div>

                          <div className="library-toolbar">
                            <FieldSelect
                              classPrefix="library"
                              value={libraryFilter}
                              options={LIBRARY_FILTER_OPTIONS}
                              onChange={setLibraryFilter}
                              ariaLabel="筛选类型"
                              dropdownClassName="library-select-dropdown"
                            />

                            <label className="library-search">
                              <span className="dora-icon library-search__icon" aria-hidden="true">
                                {ICONS.search}
                              </span>
                              <input
                                value={librarySearch}
                                onChange={(e) => setLibrarySearch(e.target.value)}
                                type="text"
                                className="library-search__input"
                                placeholder="搜索名称/来源对话/来源Agent"
                              />
                            </label>
                          </div>
                        </div>

                        <div className="library-grid">
                          {filteredLibraryItems.map((item) => (
                            <article
                              key={`${item.type}-${item.title}-${item.cover}`}
                              className="library-card"
                              data-library-type={item.type}
                              role="button"
                              tabIndex={0}
                              onClick={() => openLibraryItem(item, { trackRecent: true })}
                              onKeyDown={(e) => onEnterKey(e, () => openLibraryItem(item, { trackRecent: true }))}
                            >
                              <div className="library-card__meta">
                                <img src={getLibraryFileIcon(item.type)} alt="" className="library-card__type-icon" />

                                <div className="library-card__text">
                                  <h3>{highlightSearchText(item.title, librarySearch)}</h3>
                                  <p>{highlightSearchText(item.subtitle, librarySearch)}</p>
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
                    <section className="mobile-library-detail" aria-label={`${activeLibraryTitle}文件预览`}>
                      <header className="mobile-library-detail__header">
                        <button type="button" className="mobile-library-detail__action" aria-label="返回资料库" onClick={() => setActiveLibraryItem(null)}>
                          <span className="dora-icon" aria-hidden="true">{ICONS.mobileBack}</span>
                        </button>
                        <h1 title={activeLibraryTitle}>{activeLibraryTitle}</h1>
                        <div className="mobile-library-detail__actions">
                          <button type="button" className="mobile-library-detail__action" aria-label="分享">
                            <span className="dora-icon" aria-hidden="true">{ICONS.share}</span>
                          </button>
                          <button type="button" className="mobile-library-detail__action" aria-label="下载">
                            <span className="dora-icon" aria-hidden="true">{ICONS.download}</span>
                          </button>
                        </div>
                      </header>

                      <div className={`mobile-library-detail__content mobile-library-detail__content--${activeLibraryItem?.type ?? 'other'}`}>
                        {activeLibraryItem?.type === 'ppt' ? (
                          SESSION_SOURCE_PPT_PREVIEW_SLIDES.map((slide, index) => (
                            <img key={`mobile-library-ppt-${index}`} src={slide} alt={`第 ${index + 1} 页`} className="mobile-library-detail__page mobile-library-detail__page--slide" />
                          ))
                        ) : activeLibraryItem?.type === 'pdf' ? (
                          SESSION_SOURCE_PDF_PREVIEW_PAGES.map((page, index) => (
                            <img key={`mobile-library-pdf-${index}`} src={page} alt={`第 ${index + 1} 页`} className="mobile-library-detail__page" />
                          ))
                        ) : activeLibraryItem?.type === 'doc' ? (
                          SESSION_SOURCE_DOC_PREVIEW_PAGES.map((page, index) => (
                            <img key={`mobile-library-doc-${index}`} src={page} alt={`第 ${index + 1} 页`} className="mobile-library-detail__page" />
                          ))
                        ) : activeLibraryItem?.type === 'md' ? (
                          <article className="library-detail-markdown mobile-library-detail__document" dangerouslySetInnerHTML={{ __html: activeLibraryHtml }} />
                        ) : activeLibraryItem?.type === 'txt' ? (
                          <pre className="mobile-library-detail__text">华润集团销售拓客速读{`\n\n`}本文档整理了集团业务概况、销售机会与重点客户洞察。{`\n\n`}建议结合区域销售数据和客户分层结果，制定差异化的跟进策略。</pre>
                        ) : activeLibraryItem?.type === 'xls' ? (
                          <div className="mobile-library-detail__spreadsheet">{renderSessionSourceSpreadsheetPreview()}</div>
                        ) : (
                          <img src={activeLibraryItem?.cover} alt={activeLibraryTitle} className="mobile-library-detail__asset" />
                        )}
                      </div>
                    </section>

                    <div className="library-detail-main">
                      <header className="library-detail-main__header">
                        <IconButton tip="返回" className="expert-detail-page__back" onClick={() => setActiveLibraryItem(null)}>
                          <span className="dora-icon icon-16" aria-hidden="true">
                            {ICONS.back}
                          </span>
                        </IconButton>
                        <LibraryDetailMainMeta
                          fileIconSrc={activeLibraryItem ? getLibraryFileIcon(activeLibraryItem.type) : null}
                          fileTitle={activeLibraryTitle}
                        />
                        <div className="library-detail-main__tools">
                          <IconButton tip="分享">
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.share}
                            </span>
                          </IconButton>
                          <IconButton tip="下载">
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.download}
                            </span>
                          </IconButton>
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
                        <div className="library-detail-chat__title-wrap">
                          {isQuestionMode ? (
                            <button
                              ref={libraryChatSessionTriggerRef}
                              type="button"
                              className={`library-detail-chat__title-trigger${libraryChatSessionMenuOpen ? ' is-open' : ''}`}
                              aria-haspopup="listbox"
                              aria-expanded={libraryChatSessionMenuOpen}
                              aria-label="切换会话"
                              title={activeSessionPrompt}
                              onClick={toggleLibraryChatSessionMenu}
                            >
                              <span className="library-detail-chat__title-text">{activeSessionPrompt}</span>
                              <span className="dora-icon icon-16 library-detail-chat__title-arrow" aria-hidden="true">
                                {libraryChatSessionMenuOpen ? ICONS.arrowUp : ICONS.arrowDown}
                              </span>
                            </button>
                          ) : (
                            <span className="library-detail-chat__title-static">新会话</span>
                          )}
                        </div>
                        <div className="library-detail-chat__tools">
                          {isQuestionMode ? (
                            <IconButton tip="新会话" onClick={startNewLibraryChat}>
                              <span className="dora-icon icon-16" aria-hidden="true">
                                {ICONS.newChat}
                              </span>
                            </IconButton>
                          ) : null}
                          <IconButton tip="分享">
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.share}
                            </span>
                          </IconButton>
                          <IconButton tip="会话文件" onClick={() => setLibrarySessionFilesModalOpen(true)}>
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.sessionFile}
                            </span>
                          </IconButton>
                          <IconButton tip="收起" onClick={() => setLibraryChatCollapsed(true)}>
                            <span className="dora-icon icon-16" aria-hidden="true">
                              {ICONS.collapseCatalog}
                            </span>
                          </IconButton>
                        </div>
                      </header>

                      {isQuestionMode ? (
                        <div className="library-detail-chat__thread">{renderSessionThread()}</div>
                      ) : (
                        <div className="library-detail-chat__empty">
                          <div
                            className={`welcome${doraVisualScheme === 'scheme7' ? ' welcome--orb-layout' : ''}`}
                            onMouseEnter={handleHeroSparklesReplay}
                          >
                            {doraVisualScheme === 'scheme7' ? (
                              <div className="robot robot--orb robot--orb-hero" aria-hidden="true">
                                <Orb
                                  className="robot--orb-canvas"
                                  hoverIntensity={0.25}
                                  rotateOnHover={true}
                                  hue={0}
                                  forceHoverState={false}
                                  backgroundColor="#ffffff"
                                  transparentBackground={false}
                                />
                              </div>
                            ) : null}
                            <h1 className={`title${doraVisualScheme === 'scheme7' ? ' title--orb-layout' : ''}`}>
                              {doraVisualScheme === 'scheme7' ? (
                                <SparklesText
                                  className="title-sparkles"
                                  text="Hi, 需要Dora帮你做什么？"
                                  sparklesCount={12}
                                  activeDuration={3000}
                                  triggerKey={`library-chat-title-${heroSparkleReplayKey}`}
                                />
                              ) : (
                                'Hi, 需要Dora帮你做什么？'
                              )}
                            </h1>
                          </div>
                        </div>
                      )}

                      <div className="library-detail-chat__sender">
                        <div
                          className={`sender ${inputFocused ? 'focused' : ''} ${canSend ? 'has-value' : ''} ${isSessionBusy ? 'is-sending' : ''}`}
                        >
                          <div className="sender-inner">
                            {renderSenderInnerContent(activeSessionScope)}
                            <div className="sender-toolbar">
                              {renderAttachActions()}
                              <button
                                type="button"
                                className="send-btn"
                                aria-label={isSessionBusy ? '停止生成' : '发送'}
                                disabled={!canSend && !isSessionBusy}
                                onClick={isSessionBusy ? handleStopGeneration : handleSend}
                              >
                                {isSessionBusy ? (
                                  <span className="send-stop-icon" aria-hidden="true"></span>
                                ) : (
                                  <span className="dora-icon send-icon" aria-hidden="true">
                                    {ICONS.send}
                                  </span>
                                )}
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
                        aria-label="展开新会话"
                        onClick={() => setLibraryChatCollapsed(false)}
                      >
                        <img src={activeDoraImage} alt="" className="library-chat-entry-btn__icon" />
                      </button>
                    ) : null}
                  </section>
                )
              ) : isScheduleView ? (
                renderSchedulePage()
              ) : isQuestionMode && !isLibraryDetailView ? (
                renderSharedSessionStage(doraIntroPhase)
              ) : (
                <div
                  className={`dora-stage dora-stage--${doraIntroPhase} dora-stage--${doraVisualScheme}${mobileNewChatPageOpen ? ' mobile-new-chat-page' : ''}`}
                  onPointerMove={(event) => {
                    handleScheme3PointerMove(event)
                    handleHeatmapPointerMove(event)
                  }}
                  onPointerLeave={(event) => {
                    handleScheme3PointerLeave(event)
                    handleHeatmapPointerLeave()
                  }}
                >
                  {renderOrbBackgroundBanner()}
                  <header
                    className={`main-header dora-stage__header ${practicesPageOpen ? 'dora-stage__header--practices' : 'dora-stage__header--session'}`}
                  >
                    {practicesPageOpen ? (
                      renderPracticesBackButton()
                    ) : (
                      <>
                        <IconButton
                          tip={panelToggleTitle}
                          className="icon-btn panel-toggle"
                          onClick={() => setInternalSidebarOpen((prev) => !prev)}
                        >
                          <span className="dora-icon icon-16" aria-hidden="true">
                            {ICONS.sidebar}
                          </span>
                        </IconButton>
                        {renderHomeHeaderNav()}
                        {renderSessionHeaderActions()}
                      </>
                    )}
                  </header>

                  {renderMobileCatalogDrawer()}
                  {renderMobileAvatarMenu()}

                  {practicesPageOpen ? (
                    <section className="practices-browser dora-stage__practices-browser">
                      <div className="practices-grid">
                        {PRACTICE_CARDS.map((card) => (
                          <article key={`browser-${card.id}`} className="practice-browser-card">
                            <div className="practice-browser-card__cover" aria-hidden="true">
                              <img src={card.cover} alt="" className="practice-browser-card__cover-image" />
                            </div>
                            <div className="practice-browser-card__body">
                              <h3 data-practice-title={card.title}>{card.title}</h3>
                            </div>
                            <div className="practice-browser-card__hover">
                              <button type="button" className="practice-browser-card__action practice-browser-card__action--negative">
                                做同款
                              </button>
                              <button type="button" className="practice-browser-card__action practice-browser-card__action--primary">
                                去查看
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  ) : (
                    <>
                      <section className="hero dora-stage__hero">
                        <div className="hero-inner dora-stage__hero-inner">
                          <div
                            className={`welcome${doraVisualScheme === 'scheme7' ? ' welcome--orb-layout' : ''}`}
                            onMouseEnter={handleHeroSparklesReplay}
                          >
                            {doraVisualScheme === 'scheme7' ? (
                              <div className="robot robot--orb robot--orb-hero" aria-hidden="true">
                                <Orb
                                  className="robot--orb-canvas"
                                  hoverIntensity={0.25}
                                  rotateOnHover={true}
                                  hue={0}
                                  forceHoverState={false}
                                  backgroundColor="#ffffff"
                                  transparentBackground={false}
                                />
                              </div>
                            ) : null}
                            <h1 className={`title${doraVisualScheme === 'scheme7' ? ' title--orb-layout' : ''}`}>
                              {doraVisualScheme === 'scheme7' ? (
                                <SparklesText
                                  className="title-sparkles"
                                  text="Hi, 需要Dora帮你做什么？"
                                  sparklesCount={12}
                                  activeDuration={3000}
                                  triggerKey={`hero-title-${doraVisualScheme}-${heroSparkleReplayKey}`}
                                />
                              ) : (
                                'Hi, 需要Dora帮你做什么？'
                              )}
                            </h1>
                          </div>
                        </div>

                        <div className="sender-wrap dora-stage__sender">
                          <div className="sender-combo">
                            <div
                              className={`sender ${inputFocused ? 'focused' : ''} ${canSend ? 'has-value' : ''} ${
                                doraVisualScheme === 'scheme4' ||
                                doraVisualScheme === 'scheme5' ||
                                doraVisualScheme === 'scheme7' ||
                                doraVisualScheme === 'scheme9'
                                  ? 'dora-sender--ring'
                                  : ''
                              }`}
                            >
                              <div className="sender-inner">
                                {renderSenderInnerContent(activeSessionScope)}
                                {renderSenderToolbarBlock()}
                              </div>
                            </div>
                          </div>
                        </div>
                        {renderHeroSkillSlot()}
                        {mobileNewChatPageOpen ? <p className="mobile-new-chat-tip">内容均由AI生成, 仅供参考</p> : null}
                      </section>
                      {!mobileNewChatPageOpen ? renderPracticesFooter() : null}
                    </>
                  )}
                </div>
              )}
            </div>
            </div>

            {sessionSplitMounted ? (
              <>
                <div
                  ref={sessionSplitDividerRef}
                  className={`session-split-divider${sessionSplitEntered ? ' session-split-divider--entered' : ''}`}
                  role="separator"
                  aria-orientation="vertical"
                  aria-label="调整面板宽度"
                  onPointerDown={handleSessionFilesResizeStart}
                />
                {renderSessionFilesPanel()}
              </>
            ) : null}
          </div>
        </div>
      </main>
      {librarySessionFilesModalOpen ? renderLibrarySessionFilesModal() : null}
      {renderAttachConnectModal()}
      {renderLibraryChatSessionMenuPortal()}
      {renderHistorySessionMenuPortal()}
      {renderAvatarMenuPortal()}
      {renderSessionFilePreviewFullscreenPortal()}
    </div>
  )
}
