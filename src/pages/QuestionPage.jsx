import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { marked } from 'marked'
import activeDoraImage from '../assets/images/dora_选中.png'
import activeExpertsImage from '../assets/images/专家团_选中.png'
import activeLibraryImage from '../assets/images/资料库_选中.png'
import agentDefaultAvatarImage from '../assets/images/Agent默认头像.png'
import doraTitleImage from '../assets/images/dora标题.png'
import doraImage from '../assets/images/Dora.png'
import avatarImage from '../assets/images/avatar.png'
import robotImage from '../assets/images/robot.png'
import btnBiImage from '../assets/images/btn_bi.png'
import btnFrImage from '../assets/images/btn_fr.png'
import menuFineBiImage from '../assets/images/menu_finebi.png'
import menuFineReportImage from '../assets/images/menu_finereport.png'
import libraryHtmlImage from '../assets/images/lib_html.png'
import libraryMdImage from '../assets/images/lib_md.png'
import libraryPptImage from '../assets/images/lib_ppt.png'
import uploadPdfImage from '../assets/images/upload_pdf.png'
import uploadMdImage from '../assets/images/upload_md.png'
import uploadJsonImage from '../assets/images/upload_json.png'
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
import tabCurveLeftImage from '../assets/images/tab-curve-left.svg'
import tabCurveRightImage from '../assets/images/tab-curve-right.svg'
import financialBiMdContent from '../assets/content/国内金融行业商业智能软件市场调研报告.md?raw'
import Orb from '../components/Orb'
import IconButton from '../components/IconButton'
import SessionFilesToolbarRow from '../components/SessionFilesToolbarRow'
import LibraryDetailMainMeta from '../components/LibraryDetailMainMeta'
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
  openWindow: '\ue7d9',
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

const HEATMAP_BASE_COLS = 13
const HEATMAP_BASE_ROWS = 9
const HEATMAP_CELL_WIDTH = 100
const HEATMAP_CELL_HEIGHT = 78
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
  { id: 'fallback-upload-1', label: '市场调研报告_01.doc', icon: uploadPdfImage, sessionFileId: null },
  { id: 'fallback-upload-2', label: '金融行业BI软件市场调研报告_01.md', icon: uploadMdImage, sessionFileId: 'md-1' },
]

const SENDER_MENTION_FALLBACK_OUTPUTS = [
  { id: 'fallback-output-1', label: 'chat_main_01.pdf', icon: uploadPdfImage, sessionFileId: 'html-1' },
  { id: 'fallback-output-2', label: '金融行业BI软件市场调研报告_01.md', icon: uploadMdImage, sessionFileId: 'md-1' },
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
  { id: 'bi-01', label: '连接「***_01」', icon: menuFineBiImage },
  { id: 'bi-02', label: '连接「******_02」', icon: menuFineBiImage },
  { id: 'bi-03', label: '连接「******_03」', icon: menuFineReportImage },
]

const ATTACH_CONNECT_FOLDER_OPTIONS = [
  { value: 'catalog', label: '目录' },
  { value: 'my-analysis', label: '我的分析' },
  { value: 'user-catalog', label: '用户的目录' },
  { value: 'data-catalog', label: '数据目录' },
]

const ATTACH_CONNECT_TREE_NODES = [
  { id: 'root', label: '全部数据', level: 0, type: 'group', expanded: true },
  { id: 'topic-1', label: '销售分析主题包', level: 1, type: 'leaf', checked: true },
  { id: 'topic-2', label: '经营指标主题包', level: 1, type: 'leaf', checked: true },
  { id: 'topic-3', label: '客户运营主题包', level: 1, type: 'leaf', checked: true },
  { id: 'topic-4', label: '区域复盘主题包', level: 1, type: 'leaf', checked: true },
  { id: 'topic-5', label: '品类策略主题包', level: 1, type: 'leaf', checked: false },
  { id: 'topic-6', label: '活动复盘主题包', level: 1, type: 'leaf', checked: false },
]

const ATTACH_CONNECT_DIMENSIONS = [
  { id: 'dim-1', label: '权限测试_销售运营分析情况汇总表' },
  { id: 'dim-2', label: '权限测试_经营指标汇总表' },
]

const ATTACH_CONNECT_TABLE_COLUMNS = ['字段名称', '字段类型', '业务描述', '示例值', '备注']

const ATTACH_CONNECT_TABLE_ROWS = Array.from({ length: 13 }, (_, index) => ({
  id: `attach-connect-row-${index}`,
  cells: ['销售额', '数值', '订单销售金额', '128,900', index % 3 === 0 ? '—' : ''],
}))

function AttachConnectDetailViewIcon() {
  return (
    <svg className="attach-connect-view-tabs__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9.5" y="2" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="9.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9.5" y="9.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function AttachConnectStructureViewIcon() {
  return (
    <svg className="attach-connect-view-tabs__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="3.5" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="7.25" width="5" height="6.75" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="7.25" width="5" height="6.75" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
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
    case 'pdf':
      return uploadPdfImage
    case 'md':
      return uploadMdImage
    case 'json':
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
      return uploadJsonImage
    case 'ppt':
    case 'pptx':
      return libraryPptImage
    case 'html':
    case 'htm':
      return libraryHtmlImage
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return uploadMdImage
    default:
      return uploadPdfImage
  }
}

const getAttachmentFileType = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'md') return 'md'
  if (ext === 'html' || ext === 'htm') return 'html'
  if (ext === 'ppt' || ext === 'pptx') return 'ppt'
  return 'md'
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

const getHeatmapLayout = (width, height) => {
  const cols = width ? Math.max(1, Math.ceil(width / HEATMAP_CELL_WIDTH)) : HEATMAP_BASE_COLS
  const rows = height ? Math.max(1, Math.ceil(height / HEATMAP_CELL_HEIGHT)) : HEATMAP_BASE_ROWS

  return {
    rows,
    cols,
    cellWidth: HEATMAP_CELL_WIDTH,
    cellHeight: HEATMAP_CELL_HEIGHT,
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
  { value: 'html', label: 'HTML' },
  { value: 'md', label: 'Markdown' },
  { value: 'ppt', label: 'PPT' },
]

const SESSION_FILES_FILTER_OPTIONS = [
  { value: 'all', label: '全部' },
  { value: 'skill', label: '技能' },
  { value: 'ppt', label: 'PPT' },
  { value: 'html', label: 'HTML' },
  { value: 'md', label: 'MD' },
]

const SESSION_FILES_SOURCE_SCOPE_OPTIONS = [
  { value: 'session', label: '本次会话' },
  { value: 'existing', label: '已有数据' },
]

const SESSION_FILES_SOURCE_FILE_SIZE = '161.17 KB'

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
        icon: uploadPdfImage,
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-local-2',
        title: '金融行业BI软件市场调研报告.md',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: uploadMdImage,
        sessionFileId: 'md-1',
        scopes: ['session'],
      },
      {
        id: 'src-local-3',
        title: '金融行业BI软件市场调研报告.md',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: libraryPptImage,
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-local-4',
        title: '市场调研报告.doc',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: menuFineReportImage,
        scopes: ['session'],
      },
      {
        id: 'src-local-5',
        title: '金融行业BI软件市场调研报告.md',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: uploadMdImage,
        sessionFileId: 'md-1',
        scopes: ['existing'],
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
        title: '金融行业BI软件市场调研报告.md',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: uploadMdImage,
        sessionFileId: 'md-1',
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-c1-2',
        title: '金融行业BI软件市场调研报告.md',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: libraryPptImage,
        scopes: ['session'],
      },
      {
        id: 'src-c1-3',
        title: '市场调研报告.doc',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: menuFineReportImage,
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
        title: '金融行业BI软件市场调研报告.md',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: uploadMdImage,
        sessionFileId: 'md-1',
        scopes: ['session', 'existing'],
      },
      {
        id: 'src-c2-2',
        title: '金融行业BI软件市场调研报告.md',
        size: SESSION_FILES_SOURCE_FILE_SIZE,
        icon: libraryPptImage,
        scopes: ['existing'],
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
    icon: agentDefaultAvatarImage,
  },
  {
    id: 'html-1',
    type: 'html',
    title: '这是一篇报告的名称.html',
    desc: '这里是描述描述描述描述描述描述',
    icon: libraryHtmlImage,
  },
  {
    id: 'ppt-1',
    type: 'ppt',
    title: '这是ppt文档.ppt',
    desc: '12.45 KB',
    icon: libraryPptImage,
  },
  {
    id: 'md-1',
    type: 'md',
    title: '国内金融行业商业智能软件市场调研报告.md',
    desc: '12.45 KB',
    icon: libraryMdImage,
  },
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

const LIBRARY_ITEMS = [
  {
    title: '销售预测系统.html',
    owner: '财务小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover86,
    sourceHistoryId: 'history-1',
  },
  {
    title: '国内金融行业商业智能软件市场调研报告.md',
    owner: '产品小助手：华润集团销售情况解读',
    type: 'md',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover90,
    sourceHistoryId: 'history-2',
  },
  {
    title: '风险营销系统.html',
    owner: 'Dora：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover91,
    sourceHistoryId: 'history-3',
  },
  {
    title: '销售预测系统.html',
    owner: '财务小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover92,
    sourceHistoryId: 'history-4',
  },
  {
    title: '华润集团销售拓客速读.md',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'md',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover93,
    sourceHistoryId: 'history-5',
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover94,
    sourceHistoryId: 'history-6',
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'ppt',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover93,
    sourceHistoryId: 'history-7',
  },
  {
    title: '风险营销系统.html',
    owner: 'Dora：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover95,
    sourceHistoryId: 'history-8',
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover94,
    sourceHistoryId: 'history-9',
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'ppt',
    ownerIcon: LIBRARY_ASSETS.ownerSecondary,
    cover: LIBRARY_ASSETS.cover93,
    sourceHistoryId: 'history-10',
  },
  {
    title: '风险营销系统.html',
    owner: 'Dora：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover88,
    sourceHistoryId: 'history-11',
  },
  {
    title: '产品架构说明.html',
    owner: '产品小助手：这是什么什么什么的好行都可以',
    type: 'html',
    ownerIcon: LIBRARY_ASSETS.ownerPrimary,
    cover: LIBRARY_ASSETS.cover94,
    sourceHistoryId: 'history-12',
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
    alertCount: 0,
  },
  {
    title: '智能agent 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    alertCount: 2,
  },
  {
    title: '智能agent 121 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent 121 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能问数',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能报告',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent 213123',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: 'Agent的名称很长很长很长很长很长很长很长...',
    desc: '这里是agent相关描述信息',
    category: 'strategy',
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent 213123',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent 121 121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '智能agent12121',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    editedAt: '2026/02/12',
    alertCount: 0,
  },
  {
    title: '销售洞察助手',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    editedAt: '2026/02/11',
    alertCount: 0,
  },
  {
    title: '财务分析 Agent',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/10',
    alertCount: 5,
  },
  {
    title: '市场策略顾问',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    editedAt: '2026/02/09',
    alertCount: 0,
  },
  {
    title: '智能周报生成',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    editedAt: '2026/02/08',
    alertCount: 0,
  },
  {
    title: '客户画像分析',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/07',
    alertCount: 0,
  },
  {
    title: '竞品监测 Agent',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    editedAt: '2026/02/06',
    alertCount: 1,
  },
  {
    title: '经营月报助手',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'report',
    editedAt: '2026/02/05',
    alertCount: 0,
  },
  {
    title: '数据异常检测',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'analysis',
    editedAt: '2026/02/04',
    alertCount: 0,
  },
  {
    title: '增长策略推演',
    desc: '这里是agent相关描述信息这里是agent相关描述信息这里是agent相关描述信息',
    category: 'strategy',
    editedAt: '2026/02/03',
    alertCount: 0,
  },
]

const getExpertCardKey = (card) => `${card.title}-${card.editedAt}`

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

const HISTORY_LONG_LABEL = '去年门店销售额最高的商品是哪个如果问题很长展示不下那么久是省略'

const getLibraryItemKey = (item) => `${item.type}-${item.title}-${item.cover}`

const LIBRARY_SOURCE_AGENT_ICONS = {
  财务小助手: agentDefaultAvatarImage,
  产品小助手: agentDefaultAvatarImage,
  Dora: robotImage,
}

const parseLibrarySourceAgentName = (owner) => {
  if (!owner) return ''
  const colonIndex = owner.indexOf('：')
  if (colonIndex !== -1) return owner.slice(0, colonIndex).trim()
  const asciiColonIndex = owner.indexOf(':')
  if (asciiColonIndex !== -1) return owner.slice(0, asciiColonIndex).trim()
  return owner.trim()
}

const getLibrarySourceAgentIcon = (owner) => {
  const agentName = parseLibrarySourceAgentName(owner)
  return LIBRARY_SOURCE_AGENT_ICONS[agentName] ?? agentDefaultAvatarImage
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
]

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

const INTERNAL_ACTIONS = [
  { id: 'new-chat', label: '新聊天', icon: ICONS.newChat },
  { id: 'schedule', label: '定时任务', icon: ICONS.schedule },
]

const INTERNAL_AVATARS = [
  { id: 'wechat', label: '企业微信-未命名Agent_01', icon: wechatImage, badge: '99+' },
  { id: 'ding', label: '钉钉-未命名Agent_01', icon: dingImage, badge: '1' },
  { id: 'feishu', label: '飞书-未命名Agent_01', icon: feishuImage, badge: '' },
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

function FieldSelect({ classPrefix, value, options, onChange, ariaLabel, minWidth }) {
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
              className="field-select-dropdown"
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
      isGeneratingSession: false,
      activeSessionPrompt: '',
      activeHistoryItemId: null,
      composerFiles: [],
      composerSegments: DEFAULT_COMPOSER_SEGMENTS,
    },
    experts: {
      historyItems: INITIAL_HISTORY_ITEMS,
      inputText: '',
      inputFocused: false,
      isGeneratingSession: false,
      activeSessionPrompt: '',
      activeHistoryItemId: null,
      composerFiles: [],
      composerSegments: DEFAULT_COMPOSER_SEGMENTS,
    },
  })
  const [activeNav, setActiveNav] = useState('dora')
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(false)
  const [practicesPageOpen, setPracticesPageOpen] = useState(false)
  const [innerAgentMenuOpen, setInnerAgentMenuOpen] = useState(false)
  const [agentMenuPos, setAgentMenuPos] = useState({ top: 0, left: 0 })
  const [activeExpertCard, setActiveExpertCard] = useState(null)
  const [activeExpertTab, setActiveExpertTab] = useState(0)
  const [activeLibraryItem, setActiveLibraryItem] = useState(null)
  const [libraryRecentItems, setLibraryRecentItems] = useState([])
  const [libraryChatCollapsed, setLibraryChatCollapsed] = useState(false)
  const [libraryChatSessionMenuOpen, setLibraryChatSessionMenuOpen] = useState(false)
  const [libraryChatSessionMenuPos, setLibraryChatSessionMenuPos] = useState({ top: 0, left: 0 })
  const [libraryChatSessionsByKey, setLibraryChatSessionsByKey] = useState({})
  const [libraryChatSessionSearch, setLibraryChatSessionSearch] = useState('')
  const [expertFilter, setExpertFilter] = useState('all')
  const [expertSearch, setExpertSearch] = useState('')
  const [libraryFilter, setLibraryFilter] = useState('all')
  const [librarySearch, setLibrarySearch] = useState('')
  const [expertsNavPopoverOpen, setExpertsNavPopoverOpen] = useState(false)
  const [expertsNavPopoverPos, setExpertsNavPopoverPos] = useState({ top: 0, left: 0 })
  const [expertsAlertsDismissedSnapshot, setExpertsAlertsDismissedSnapshot] = useState(null)
  const [expertsPageScrolled, setExpertsPageScrolled] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [displayedHint, setDisplayedHint] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [doraIntroPhase, setDoraIntroPhase] = useState('idle')
  const [doraVisualScheme, setDoraVisualScheme] = useState('scheme4')
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
  const [attachConnectFolder, setAttachConnectFolder] = useState('catalog')
  const [attachConnectSearch, setAttachConnectSearch] = useState('')
  const [attachConnectCheckedIds, setAttachConnectCheckedIds] = useState(
    () => new Set(ATTACH_CONNECT_TREE_NODES.filter((node) => node.checked).map((node) => node.id)),
  )
  const [attachConnectTreeExpanded, setAttachConnectTreeExpanded] = useState(true)
  const [attachConnectActiveDimensionId, setAttachConnectActiveDimensionId] = useState('dim-1')
  const [attachConnectTableView, setAttachConnectTableView] = useState('detail')
  const [sessionFilesTab, setSessionFilesTab] = useState('materials')
  const [sessionFilesFilter, setSessionFilesFilter] = useState('all')
  const [sessionFilesSearch, setSessionFilesSearch] = useState('')
  const [sessionFilesSourceScope, setSessionFilesSourceScope] = useState('session')
  const [sessionFilesSourceSearch, setSessionFilesSourceSearch] = useState('')
  const [sessionFilesSourceCollapsed, setSessionFilesSourceCollapsed] = useState({})
  const [sessionFilesPanelWidth, setSessionFilesPanelWidth] = useState(598)
  const [sessionSplitMounted, setSessionSplitMounted] = useState(false)
  const [sessionSplitEntered, setSessionSplitEntered] = useState(false)
  const [activeSessionFileId, setActiveSessionFileId] = useState(null)
  const [hoveredComposerFileId, setHoveredComposerFileId] = useState(null)
  const [historyMenuOpenId, setHistoryMenuOpenId] = useState(null)
  const [historyMenuPos, setHistoryMenuPos] = useState({ top: 0, left: 0 })
  const [historyRenamingId, setHistoryRenamingId] = useState(null)
  const [historyRenameDraft, setHistoryRenameDraft] = useState('')
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
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
  const practicesScrollUpRef = useRef(0)
  const practicesScrollResetRef = useRef(null)
  const mainBodyRef = useRef(null)
  const sessionSplitDividerRef = useRef(null)
  const sessionFilesPanelRef = useRef(null)
  const sessionFilesFullscreenRestoreRef = useRef({ innerSidebarOpen: false })
  const expertsPageBodyRef = useRef(null)
  const expertTabListRef = useRef(null)
  const expertsNavRef = useRef(null)
  const expertsNavPopoverRef = useRef(null)
  const expertsNavPopoverHoverRef = useRef(false)
  const expertsNavLeaveTimerRef = useRef(null)
  const innerAgentMenuRef = useRef(null)
  const agentTitleRef = useRef(null)
  const agentMenuPanelRef = useRef(null)
  const attachMenuRef = useRef(null)
  const historyMenuAnchorRef = useRef(null)
  const historyMenuPanelRef = useRef(null)
  const libraryChatSessionTriggerRef = useRef(null)
  const libraryChatSessionPanelRef = useRef(null)
  const historyRenameInputRef = useRef(null)
  const historyRenameSkipBlurRef = useRef(false)
  const avatarBtnRef = useRef(null)
  const avatarMenuPanelRef = useRef(null)
  const languageMenuAnchorRef = useRef(null)
  const languageMenuPanelRef = useRef(null)
  const fileInputRef = useRef(null)
  const uploadTimersRef = useRef(new Map())
  const senderEditorRef = useRef(null)
  const composerSyncRef = useRef(false)
  const composerComposingRef = useRef(false)
  const composerUpdateSourceRef = useRef('external')
  const [mentionPanel, setMentionPanel] = useState({
    open: false,
    scope: 'dora',
    query: '',
    start: 0,
    activeIndex: 0,
  })

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

  const filteredSessionFiles = useMemo(() => {
    const keyword = sessionFilesSearch.trim().toLowerCase()

    return sessionOutputFiles.filter((item) => {
      const matchesFilter = sessionFilesFilter === 'all' || item.type === sessionFilesFilter
      const matchesKeyword = !keyword || `${item.title} ${item.desc}`.toLowerCase().includes(keyword)
      return matchesFilter && matchesKeyword
    })
  }, [sessionFilesFilter, sessionFilesSearch, sessionOutputFiles])

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

  const activeSessionFile = useMemo(
    () => sessionOutputFiles.find((item) => item.id === activeSessionFileId) ?? null,
    [activeSessionFileId, sessionOutputFiles],
  )

  const activeSessionFileHtml = useMemo(() => {
    if (activeSessionFile?.type !== 'md') return ''
    return marked.parse(financialBiMdContent)
  }, [activeSessionFile])

  const isExpertDetailView = activeNav === 'experts' && Boolean(activeExpertCard)
  const expertAlertCards = useMemo(() => EXPERT_CARDS.filter((card) => card.alertCount > 0), [])
  const expertAlertCount = useMemo(
    () => EXPERT_CARDS.reduce((sum, card) => sum + card.alertCount, 0),
    [],
  )
  const showExpertsAlerts = useMemo(
    () => expertAlertCount > 0 && hasNewExpertAlertsSinceDismiss(expertsAlertsDismissedSnapshot),
    [expertAlertCount, expertsAlertsDismissedSnapshot],
  )
  const doraAlertCount = useMemo(() => {
    const historyCount = sumMessageBadgeCounts(sessionStates.dora.historyItems)
    const avatarCount = sumMessageBadgeCounts(INTERNAL_AVATARS)
    return historyCount + avatarCount
  }, [sessionStates.dora.historyItems])
  const activeExpertDetailConfig = useMemo(
    () => getExpertDetailConfig(activeExpertCard),
    [activeExpertCard],
  )
  const activeExpertTabs = useMemo(
    () => getVisibleExpertTabs(activeExpertDetailConfig.tabs),
    [activeExpertDetailConfig],
  )
  const activeExpertTabPrompts = useMemo(
    () => pickRandomExpertPrompts(activeExpertTabs[activeExpertTab]),
    [activeExpertCard, activeExpertTab, activeExpertTabs],
  )
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
  const isGeneratingSession = activeSessionState.isGeneratingSession
  const activeSessionPrompt = activeSessionState.activeSessionPrompt
  const isQuestionMode = Boolean(activeSessionPrompt)
  const isLibraryDetailView = activeNav === 'library' && Boolean(activeLibraryItem)
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
  const filteredSessionSourceSections = useMemo(() => {
    const keyword = sessionFilesSourceSearch.trim().toLowerCase()

    return SESSION_FILES_SOURCE_SECTIONS.map((section) => ({
      ...section,
      files: section.files.filter((file) => {
        const inScope = file.scopes?.includes(sessionFilesSourceScope) ?? true
        if (sessionFilesSourceScope === 'session' && !isQuestionMode) {
          return false
        }
        const matchesKeyword = !keyword || file.title.toLowerCase().includes(keyword)
        return inScope && matchesKeyword
      }),
    })).filter((section) => (keyword ? section.files.length > 0 : true))
  }, [isQuestionMode, sessionFilesSourceScope, sessionFilesSourceSearch])
  const showSessionSplit =
    sessionFilesPanelOpen && (activeNav === 'dora' || isExpertDetailView)
  const activeHistoryItemId = activeSessionState.activeHistoryItemId
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
      sessionOutputFiles,
      query: mentionPanel.query,
    })
  }, [mentionPanel.open, mentionPanel.scope, mentionPanel.query, mentionScopeComposerFiles, sessionOutputFiles])
  const senderMentionFlatItems = useMemo(() => flattenSenderMentionGroups(senderMentionGroups), [senderMentionGroups])
  const senderPlaceholder = '在此输入任何您想查询或分析的问题，输入 @ 引用会话文件'
  const isNewChatActive = (activeNav === 'dora' || isExpertDetailView) && !activeSessionPrompt && !isGeneratingSession
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
    if (fileId && sessionOutputFiles.some((file) => file.id === fileId)) {
      return fileId
    }

    if (label) {
      const matched = sessionOutputFiles.find((file) => file.title === label)
      if (matched) return matched.id
    }

    const scopeFiles = sessionStates[activeSessionScope]?.composerFiles ?? []
    const composerFile = scopeFiles.find(
      (file) => `upload-${file.id}` === fileId || file.id === fileId || (label && file.name === label),
    )
    if (!composerFile) return fileId || null

    const resolvedId = `upload-${composerFile.id}`
    if (!sessionOutputFiles.some((file) => file.id === resolvedId)) {
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

    setSessionFilesTab('output')
    setActiveSessionFileId(resolvedId)

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
        data-placeholder={senderPlaceholder}
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
        activeSessionPrompt: '',
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

  const openAttachConnectModal = (title) => {
    setAttachConnectModal({ title })
    setAttachConnectFolder('catalog')
    setAttachConnectSearch('')
    setAttachConnectCheckedIds(
      new Set(ATTACH_CONNECT_TREE_NODES.filter((node) => node.checked).map((node) => node.id)),
    )
    setAttachConnectTreeExpanded(true)
    setAttachConnectActiveDimensionId('dim-1')
    setAttachConnectTableView('detail')
  }

  const closeAttachConnectModal = () => {
    setAttachConnectModal(null)
  }

  const toggleAttachConnectTreeNode = (nodeId) => {
    setAttachConnectCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(nodeId)) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }

  const renderAttachConnectModal = () => {
    if (!attachConnectModal) return null

    const query = attachConnectSearch.trim().toLowerCase()
    const filteredTreeNodes = ATTACH_CONNECT_TREE_NODES.filter((node) => {
      if (node.type === 'group') return true
      if (!query) return attachConnectTreeExpanded
      return node.label.toLowerCase().includes(query)
    })

    return createPortal(
      <div
        className="attach-connect-modal-overlay"
        role="presentation"
        onClick={closeAttachConnectModal}
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

          <div className="attach-connect-dialog__body">
            <aside className="attach-connect-dialog__sidebar">
              <FieldSelect
                classPrefix="attach-connect"
                value={attachConnectFolder}
                options={ATTACH_CONNECT_FOLDER_OPTIONS}
                onChange={setAttachConnectFolder}
                ariaLabel="文件夹"
              />
              <label className="attach-connect-search">
                <span className="dora-icon attach-connect-search__icon" aria-hidden="true">
                  {ICONS.search}
                </span>
                <input
                  type="text"
                  className="attach-connect-search__input"
                  placeholder="搜索主题"
                  value={attachConnectSearch}
                  onChange={(event) => setAttachConnectSearch(event.target.value)}
                />
              </label>
              <div className="attach-connect-tree" role="tree" aria-label="分析主题">
                {filteredTreeNodes.map((node) =>
                  node.type === 'group' ? (
                    <button
                      key={node.id}
                      type="button"
                      className="attach-connect-tree__node attach-connect-tree__node--group"
                      onClick={() => setAttachConnectTreeExpanded((prev) => !prev)}
                    >
                      <span
                        className={`dora-icon attach-connect-tree__caret ${attachConnectTreeExpanded ? 'is-expanded' : ''}`}
                        aria-hidden="true"
                      >
                        {ICONS.arrowDown}
                      </span>
                      <span className="attach-connect-tree__icon" aria-hidden="true">
                        <img src={menuFineBiImage} alt="" />
                      </span>
                      <span className="attach-connect-tree__label">{node.label}</span>
                    </button>
                  ) : (
                    <label key={node.id} className="attach-connect-tree__node attach-connect-tree__node--leaf">
                      <input
                        type="checkbox"
                        className="attach-connect-tree__checkbox"
                        checked={attachConnectCheckedIds.has(node.id)}
                        onChange={() => toggleAttachConnectTreeNode(node.id)}
                      />
                      <span className="attach-connect-tree__label">{node.label}</span>
                    </label>
                  ),
                )}
              </div>
              <div className="attach-connect-dialog__sidebar-foot">
                <span className="attach-connect-dialog__sidebar-foot-label">已选择分析主题：</span>
                <span className="attach-connect-dialog__sidebar-foot-count">{attachConnectCheckedIds.size}个</span>
              </div>
            </aside>

            <div className="attach-connect-dialog__main">
              <div className="attach-connect-dialog__main-layout">
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
                        <span className="attach-connect-dimensions__icon" aria-hidden="true">
                          <img src={menuFineReportImage} alt="" />
                        </span>
                        <span className="attach-connect-dimensions__label">{dimension.label}</span>
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
        <div className="attach-btn-wrap attach-btn-wrap--bi attach-btn-wrap--menu">
          <IconButton
            type="button"
            className="attach-btn attach-btn--mode attach-btn--bi"
            aria-label="FineBI 连接"
            onClick={() => openAttachConnectModal(BI_ATTACH_MENU_ITEMS[0].label)}
          >
            <span className="attach-btn__visual">
              <img className="attach-btn__img" src={btnBiImage} alt="BI" />
            </span>
          </IconButton>
          <div className="attach-menu" role="menu" aria-label="FineBI 连接列表">
            {BI_ATTACH_MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="attach-menu__item"
                role="menuitem"
                onClick={() => openAttachConnectModal(item.label)}
              >
                <span className="attach-menu__icon">
                  <img className="attach-menu__icon-img" src={item.icon} alt="" />
                </span>
                <span className="attach-menu__label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <IconButton
          type="button"
          className="attach-btn attach-btn--mode attach-btn--bi"
          aria-label={doraVisualScheme === 'scheme4' ? '连接「***_01」' : '添加 FineBI 资产'}
          onClick={() =>
            openAttachConnectModal(doraVisualScheme === 'scheme4' ? '连接「***_01」' : '添加 FineBI 资产')
          }
        >
          <span className="attach-btn__visual">
            <img className="attach-btn__img" src={btnBiImage} alt="BI" />
          </span>
        </IconButton>
      )}
      {doraVisualScheme !== 'scheme5' ? (
        <IconButton
          type="button"
          className="attach-btn attach-btn--mode attach-btn--fr"
          aria-label={doraVisualScheme === 'scheme4' ? '连接「***_02」' : '添加 FineReport 资产'}
          onClick={() =>
            openAttachConnectModal(doraVisualScheme === 'scheme4' ? '连接「***_02」' : '添加 FineReport 资产')
          }
        >
          <span className="attach-btn__visual">
            <img className="attach-btn__img" src={btnFrImage} alt="FR" />
          </span>
        </IconButton>
      ) : null}
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
            <span className="inner-history-item__loader session-progress__loader" aria-label="正在生成" />
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
    groupedHistoryItems.map((group) => (
      <section key={group.id} className="inner-history-section" aria-label={group.label}>
        <div className="inner-history-section__title">{group.label}</div>
        {group.items.map((item) => renderHistorySessionItem(item))}
      </section>
    ))

  const renderHomeHeaderNav = () => (
    <div className="dora-visual-switch" role="tablist" aria-label="首页动效方案切换">
      <button
        type="button"
        className={`dora-visual-switch__btn ${doraVisualScheme === 'scheme4' ? 'active' : ''}`}
        onClick={() => setDoraVisualScheme('scheme4')}
      >
        方案一
      </button>
      <button
        type="button"
        className={`dora-visual-switch__btn ${doraVisualScheme === 'scheme5' ? 'active' : ''}`}
        onClick={() => setDoraVisualScheme('scheme5')}
      >
        方案二
      </button>
    </div>
  )

  const renderSessionHeaderActions = () => (
    <div className="main-header__session-tools">
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

  const renderSessionFileDetailActions = () => {
    if (!activeSessionFile) return null

    return (
      <>
        {renderSessionCiteAction(activeSessionFile, {
          className: 'icon-btn session-files-panel__detail-action session-files-panel__action-btn--cite',
        })}
        <IconButton tip="分享" className="icon-btn session-files-panel__detail-action">
          <span className="dora-icon icon-16" aria-hidden="true">
            {ICONS.share}
          </span>
        </IconButton>
        <IconButton tip="下载" className="icon-btn session-files-panel__detail-action">
          <span className="dora-icon icon-16" aria-hidden="true">
            {ICONS.download}
          </span>
        </IconButton>
      </>
    )
  }

  const toggleSessionFilesSourceSection = (sectionId) => {
    setSessionFilesSourceCollapsed((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
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
        className={className}
        aria-label={isCited ? '取消引用' : '引用'}
        aria-pressed={isCited}
        onClick={() => toggleSourceFileCitation(activeSessionScope, citationFile)}
      >
        {renderSessionCiteActionIcon(isCited)}
      </IconButton>
    )
  }

  const renderSessionExistingItemActions = (item) => renderSessionCiteAction(item)

  const renderSessionExistingDataTab = () => {
    const hasVisibleBlocks = filteredSessionExistingData.some((block) => block.groups.length > 0)

    if (!hasVisibleBlocks) {
      return <div className="session-files-panel__empty session-files-panel__empty--tab">暂无匹配数据</div>
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
        <IconButton tip="删除" className="session-files-panel__action-btn session-files-panel__action-btn--danger">
          <span className="dora-icon icon-16" aria-hidden="true">
            {ICONS.delete}
          </span>
        </IconButton>
      </>
    )
  }

  const renderSessionFilesMaterialsTab = () => {
    const isExistingScope = sessionFilesSourceScope === 'existing'
    const hasVisibleSessionSections = filteredSessionSourceSections.some((section) => section.files.length > 0)
    const hasVisibleContent = isExistingScope
      ? filteredSessionExistingData.some((block) => block.groups.length > 0)
      : hasVisibleSessionSections

    return (
      <div className="session-files-panel__source">
        <div className="session-files-panel__source-toolbar">
          <SessionFilesToolbarRow
            rowClassName="session-files-panel__source-toolbar-row"
            filtersAriaLabel="来源范围"
            searchValue={sessionFilesSourceSearch}
            onSearchChange={setSessionFilesSourceSearch}
            searchIcon={ICONS.search}
            collapseSearch
          >
            {SESSION_FILES_SOURCE_SCOPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={sessionFilesSourceScope === option.value}
                className={`session-files-panel__filter${sessionFilesSourceScope === option.value ? ' active' : ''}`}
                onClick={() => setSessionFilesSourceScope(option.value)}
              >
                {option.label}
              </button>
            ))}
          </SessionFilesToolbarRow>
        </div>

        <div className="session-files-panel__source-scroll">
          {isExistingScope ? (
            renderSessionExistingDataTab()
          ) : hasVisibleSessionSections ? (
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
                    {section.addable ? (
                      <IconButton tip="添加" className="icon-btn session-files-panel__source-add" aria-label="添加文件">
                        <span className="dora-icon icon-16" aria-hidden="true">
                          {ICONS.create}
                        </span>
                      </IconButton>
                    ) : null}
                  </div>

                  {!isCollapsed && section.files.length ? (
                    <div className="session-files-panel__source-grid">
                      {section.files.map((file) => (
                        <article
                          key={file.id}
                          className="session-files-panel__source-card"
                          onMouseLeave={blurSessionFileCardFocus}
                        >
                          <img src={file.icon} alt="" className="session-files-panel__source-icon" />
                          <div className="session-files-panel__source-text">
                            <p className="session-files-panel__source-name" title={file.title}>
                              {highlightSearchText(file.title, sessionFilesSourceSearch)}
                            </p>
                            <p className="session-files-panel__source-size">{file.size}</p>
                          </div>
                          <div
                            className="session-files-panel__actions session-files-panel__source-actions"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                          >
                            {renderSessionSourceFileActions(file)}
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : null}

                  {!isCollapsed && !section.files.length ? (
                    <div className="session-files-panel__source-empty">暂无文件</div>
                  ) : null}
                </section>
              )
            })
          ) : !hasVisibleContent ? (
            <div className="session-files-panel__empty session-files-panel__empty--tab">暂无文件</div>
          ) : null}
        </div>
      </div>
    )
  }

  const renderSessionOutputFileActions = (file) => (
    <>
      {renderSessionCiteAction(file)}
      <span className="session-files-panel__divider" aria-hidden="true"></span>
      <IconButton tip="存入资料库" className="session-files-panel__action-btn">
        <span className="dora-icon icon-16" aria-hidden="true">
          {ICONS.saveAs}
        </span>
      </IconButton>
      <IconButton tip="分享" className="session-files-panel__action-btn">
        <span className="dora-icon icon-16" aria-hidden="true">
          {ICONS.share}
        </span>
      </IconButton>
      <IconButton tip="下载" className="session-files-panel__action-btn">
        <span className="dora-icon icon-16" aria-hidden="true">
          {ICONS.download}
        </span>
      </IconButton>
      <IconButton tip="删除" className="session-files-panel__action-btn session-files-panel__action-btn--danger">
        <span className="dora-icon icon-16" aria-hidden="true">
          {ICONS.delete}
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
        }${!isModal && sessionFilesPanelFullscreen ? ' session-files-panel--fullscreen' : ''}${className}`}
        role={isModal ? 'dialog' : undefined}
        aria-modal={isModal ? 'true' : undefined}
        aria-label="会话文件"
        style={style}
        onClick={isModal ? (event) => event.stopPropagation() : undefined}
      >
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
            {!isModal ? (
              <IconButton
                tip={sessionFilesPanelFullscreen ? '缩小' : '放大'}
                className="icon-btn session-files-panel__expand"
                aria-label={sessionFilesPanelFullscreen ? '缩小会话文件' : '放大会话文件'}
                aria-pressed={sessionFilesPanelFullscreen}
                onClick={toggleSessionFilesPanelFullscreen}
              >
                <span className="dora-icon icon-16" aria-hidden="true">
                  {sessionFilesPanelFullscreen ? ICONS.shrink : ICONS.expand}
                </span>
              </IconButton>
            ) : null}
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
          activeSessionFile ? (
            <>
              <header className="session-files-panel__detail-header">
                <IconButton
                  tip="返回"
                  className="icon-btn session-files-panel__detail-back"
                  aria-label="返回文件列表"
                  onClick={() => setActiveSessionFileId(null)}
                >
                  <span className="dora-icon icon-16" aria-hidden="true">
                    {ICONS.back}
                  </span>
                </IconButton>
                <span className="session-files-panel__divider" aria-hidden="true"></span>
                <div className="session-files-panel__detail-file">
                  <img src={activeSessionFile.icon} alt="" className="session-files-panel__detail-file-icon" />
                  <span className="session-files-panel__detail-file-title">{activeSessionFile.title}</span>
                </div>
                <div className="session-files-panel__detail-tools">{renderSessionFileDetailActions()}</div>
              </header>

              <div className="session-files-panel__detail-body">
                {activeSessionFile.type === 'md' ? (
                  <article
                    className="library-detail-markdown session-files-panel__markdown"
                    dangerouslySetInnerHTML={{ __html: activeSessionFileHtml }}
                  />
                ) : (
                  <div className="session-files-panel__preview">
                    <h2 className="session-files-panel__preview-title">
                      {activeSessionFile.title.replace(/\.(md|html|ppt|pptx)$/i, '')}
                    </h2>
                    <p className="session-files-panel__preview-desc">{activeSessionFile.desc}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="session-files-panel__toolbar">
                <SessionFilesToolbarRow
                  filtersAriaLabel="文件类型筛选"
                  searchValue={sessionFilesSearch}
                  onSearchChange={setSessionFilesSearch}
                  searchIcon={ICONS.search}
                  collapseSearch
                >
                  {SESSION_FILES_FILTER_OPTIONS.map((option) => (
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
                    onClick={() => setActiveSessionFileId(item.id)}
                    onKeyDown={(e) => onEnterKey(e, () => setActiveSessionFileId(item.id))}
                    onMouseLeave={blurSessionFileCardFocus}
                  >
                    <img src={item.icon} alt="" className="session-files-panel__type-icon" />
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
                  </article>
                ))}

                {!filteredSessionFiles.length ? (
                  <div className="session-files-panel__empty">暂无匹配文件</div>
                ) : null}
              </div>
            </>
          )
        ) : (
          renderSessionFilesMaterialsTab()
        )}
      </SurfaceTag>
    )
  }

  const renderSessionFilesPanel = () =>
    renderSessionFilesSurface({
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
  const sessionAssistantAvatar = isExpertDetailView ? agentDefaultAvatarImage : robotImage

  const renderPracticesBackButton = () => (
    <button type="button" className="practices-back practices-back--header" onClick={() => setPracticesPageOpen(false)}>
      <span className="practices-back__label">点击或滚动上滑返回</span>
      <span className="dora-icon icon-16 practices-back__more-down" aria-hidden="true">
        {ICONS.moreUp}
      </span>
    </button>
  )

  const renderSessionThread = () => (
    <div className="session-thread">
      <div className="session-thread__user">{activeSessionPrompt}</div>

      <div className="session-thread__assistant">
        <div className="session-thread__assistant-head">
          <img src={sessionAssistantAvatar} alt="" className="session-thread__assistant-avatar" />
          <span>{sessionAssistantName}</span>
        </div>

        <div className="session-progress">
          {isGeneratingSession ? (
            <>
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
            </>
          ) : (
            <div className="session-progress__card session-progress__card--stopped">
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

              <p className="session-progress__stopped">已停止生成</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const openLibrarySession = ({ id = null, label = '' }) => {
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      return {
        ...prev,
        activeSessionPrompt: label,
        activeHistoryItemId: id,
        isGeneratingSession: true,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
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
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      return {
        ...prev,
        isGeneratingSession: false,
        activeSessionPrompt: '',
        activeHistoryItemId: null,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
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
      {!isQuestionMode && !isExpertDetailView && doraVisualScheme === 'scheme3' ? (
        <div className="scheme3-banner" aria-hidden="true">
          <div className="scheme3-banner__glow"></div>
        </div>
      ) : null}
      {!isQuestionMode && !isExpertDetailView && (doraVisualScheme === 'scheme4' || doraVisualScheme === 'scheme5') ? (
        <div className="scheme-heatmap-banner" aria-hidden="true">
          <div className="scheme-heatmap-stage" ref={heatmapStageRef}>
            <div
              className="scheme-heatmap-grid"
              style={{
                '--cols': heatmapGrid.cols,
                '--rows': heatmapGrid.rows,
                '--cell-w': `${heatmapGrid.cellWidth}px`,
                '--cell-h': `${heatmapGrid.cellHeight}px`,
              }}
            >
              {heatmapCells.map((cell) => (
                <div className={`scheme-heatmap-cell ${cell.isFocus ? 'is-focus' : ''}`} key={cell.id} style={cell.style}>
                  <span className="scheme-heatmap-dot scheme-heatmap-dot--tl"></span>
                  <span className="scheme-heatmap-dot scheme-heatmap-dot--tr"></span>
                  <span className="scheme-heatmap-dot scheme-heatmap-dot--br"></span>
                  <span className="scheme-heatmap-dot scheme-heatmap-dot--bl"></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <header
        className={`main-header dora-stage__header ${practicesPageOpen ? 'dora-stage__header--practices' : ''} ${
          isQuestionMode || (!practicesPageOpen && (activeNav === 'dora' || isExpertDetailView))
            ? 'dora-stage__header--session'
            : ''
        }`}
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
            {isQuestionMode ? (
              <>
                <h2 className="main-header__session-title" title={activeSessionPrompt}>
                  {activeSessionPrompt}
                </h2>
                {renderSessionHeaderActions()}
              </>
            ) : (
              <>
                {renderHomeHeaderNav()}
                {renderSessionHeaderActions()}
              </>
            )}
          </>
        )}
      </header>

      {practicesPageOpen ? (
        <section className="practices-browser dora-stage__practices-browser">
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
        <section className="hero dora-stage__hero">
            {isQuestionMode ? (
              <div className="session-generating dora-stage__session">{renderSessionThread()}</div>
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

            <div className={`sender-wrap dora-stage__sender ${isQuestionMode ? 'sender-wrap--session' : ''}`}>
              <div
                className={`sender ${inputFocused ? 'focused' : ''} ${canSend ? 'has-value' : ''} ${isGeneratingSession ? 'is-sending' : ''} ${
                  !isQuestionMode && (doraVisualScheme === 'scheme4' || doraVisualScheme === 'scheme5')
                    ? 'dora-sender--ring'
                    : ''
                }`}
              >
                <div className="sender-inner">
                  {renderSenderInnerContent(activeSessionScope)}
                  <div className="sender-toolbar">
                    {renderAttachActions()}
                    <button
                      type="button"
                      className="send-btn"
                      aria-label={isGeneratingSession ? '停止生成' : '发送'}
                      disabled={!canSend && !isGeneratingSession}
                      onClick={isGeneratingSession ? handleStopGeneration : handleSend}
                    >
                      {isGeneratingSession ? (
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
            </div>
            {isQuestionMode ? (
              <p className="sender-wrap__tip dora-stage__sender-tip">内容均由AI生成, 仅供参考</p>
            ) : null}
          </section>
      )}
    </div>
  )

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
    const canHandlePracticesScroll =
      activeNav === 'dora' &&
      !isGeneratingSession &&
      !activeSessionPrompt &&
      (doraVisualScheme === 'scheme4' || doraVisualScheme === 'scheme5')

    if (!canHandlePracticesScroll) return undefined

    const container = contentColumnRef.current
    if (!container) return undefined

    const openThreshold = 80
    const touchSwipeThreshold = 48
    let practicesTouchStartY = null

    const resetAccumulator = () => {
      practicesScrollUpRef.current = 0
      if (practicesScrollResetRef.current) {
        clearTimeout(practicesScrollResetRef.current)
        practicesScrollResetRef.current = null
      }
    }

    const isPracticesFooterTarget = (target) =>
      target instanceof Element && Boolean(target.closest('.dora-stage__practices'))

    const accumulateOpenGesture = (deltaY) => {
      practicesScrollUpRef.current += Math.abs(deltaY)
      if (practicesScrollResetRef.current) {
        clearTimeout(practicesScrollResetRef.current)
      }
      practicesScrollResetRef.current = window.setTimeout(resetAccumulator, 300)

      if (practicesScrollUpRef.current >= openThreshold) {
        resetAccumulator()
        setPracticesPageOpen(true)
      }
    }

    const onWheel = (event) => {
      if (practicesPageOpen) {
        const practicesBrowser = container.querySelector('.practices-browser')
        if (practicesBrowser instanceof HTMLElement && practicesBrowser.scrollTop > 0) {
          return
        }

        if (event.deltaY >= 0) {
          practicesScrollUpRef.current = Math.max(0, practicesScrollUpRef.current - event.deltaY)
          return
        }

        event.preventDefault()
        practicesScrollUpRef.current += Math.abs(event.deltaY)
        if (practicesScrollResetRef.current) {
          clearTimeout(practicesScrollResetRef.current)
        }
        practicesScrollResetRef.current = window.setTimeout(resetAccumulator, 300)

        if (practicesScrollUpRef.current >= openThreshold) {
          resetAccumulator()
          setPracticesPageOpen(false)
        }
        return
      }

      // 首页仅在底部「最佳实践」模块内响应上滑；其它区域（含下滑）不拦截滚轮，避免页面抖动
      if (!isPracticesFooterTarget(event.target) || event.deltaY >= 0) {
        return
      }

      event.preventDefault()
      accumulateOpenGesture(event.deltaY)
    }

    const onTouchStart = (event) => {
      if (practicesPageOpen || event.touches.length !== 1) return
      if (!isPracticesFooterTarget(event.target)) return
      practicesTouchStartY = event.touches[0].clientY
    }

    const onTouchEnd = (event) => {
      if (practicesPageOpen || practicesTouchStartY === null || event.changedTouches.length !== 1) return
      if (!isPracticesFooterTarget(event.target)) {
        practicesTouchStartY = null
        return
      }

      const deltaY = event.changedTouches[0].clientY - practicesTouchStartY
      practicesTouchStartY = null

      if (deltaY >= -touchSwipeThreshold) return

      resetAccumulator()
      setPracticesPageOpen(true)
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchend', onTouchEnd)
      practicesTouchStartY = null
      resetAccumulator()
    }
  }, [activeNav, practicesPageOpen, isGeneratingSession, activeSessionPrompt, doraVisualScheme])

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
  }, [composerPlainText, activeNav, isExpertDetailView, activeLibraryItem, isGeneratingSession])

  useEffect(
    () => () => {
      uploadTimersRef.current.forEach((timer) => clearInterval(timer))
      uploadTimersRef.current.clear()
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
      setSessionFileRefPreviewOpen(false)
      setSessionFilesPanelFullscreen(false)
    }
  }, [sessionFilesPanelOpen])

  useEffect(() => {
    if (!librarySessionFilesModalOpen) {
      setActiveSessionFileId(null)
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
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      return {
        ...prev,
        isGeneratingSession: false,
        activeSessionPrompt: '',
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

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeAttachConnectModal()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
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
    setActiveSessionFileId(null)
  }, [sessionFilesTab])

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
    if (expertAlertCount === 0) {
      setExpertsAlertsDismissedSnapshot(null)
    }
  }, [expertAlertCount])

  useEffect(() => {
    if (!showExpertsAlerts || activeNav === 'experts') {
      setExpertsNavPopoverOpen(false)
    }
  }, [showExpertsAlerts, activeNav])

  useEffect(() => {
    return () => {
      if (expertsNavLeaveTimerRef.current) {
        clearTimeout(expertsNavLeaveTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const bodyEl = expertsPageBodyRef.current
    if (!bodyEl || activeNav !== 'experts' || activeExpertCard) {
      setExpertsPageScrolled(false)
      return undefined
    }

    const handleScroll = () => {
      setExpertsPageScrolled(bodyEl.scrollTop > 0)
    }

    handleScroll()
    bodyEl.addEventListener('scroll', handleScroll, { passive: true })
    return () => bodyEl.removeEventListener('scroll', handleScroll)
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

      const layout = getHeatmapLayout(rect.width, rect.height)
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
      setPracticesPageOpen(false)
    }
  }

  const updateExpertsNavPopoverPosition = () => {
    const rect = expertsNavRef.current?.getBoundingClientRect()
    if (!rect) return
    setExpertsNavPopoverPos({ top: rect.top, left: rect.right + 4 })
  }

  const openExpertsNavPopover = () => {
    if (!showExpertsAlerts || activeNav === 'experts') return
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
    setActiveExpertCard(card)
    setPracticesPageOpen(false)
    setInternalSidebarOpen(true)
    closeExpertsNavPopover()
  }

  const dismissExpertsAlerts = () => {
    setExpertsAlertsDismissedSnapshot(buildExpertAlertSnapshot())
    closeExpertsNavPopover()
  }

  const openLibraryItem = (item, { trackRecent = false } = {}) => {
    if (trackRecent) {
      setLibraryRecentItems((prev) => {
        const key = getLibraryItemKey(item)
        const next = [item, ...prev.filter((entry) => getLibraryItemKey(entry) !== key)]
        return next.slice(0, 3)
      })
    }
    setActiveLibraryItem(item)
    setLibraryChatCollapsed(false)
  }

  const applyHintToInput = () => {
    const hint = CAPABILITY_HINTS[hintIndex]
    updateSessionScopeState('dora', (prev) => ({
      ...prev,
      inputText: hint,
      composerSegments: [{ type: 'text', value: hint }],
    }))
  }

  const handleStopGeneration = () => {
    updateActiveSessionState((prev) => ({ ...prev, isGeneratingSession: false }))
  }

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

    const historyId = `history-${Date.now()}`
    const nextHistoryItem = {
      id: historyId,
      group: 'today',
      label,
      badge: '',
    }

    if (isLibraryDetailView) {
      const libraryKey = getLibraryItemKey(activeLibraryItem)
      setLibraryChatSessionsByKey((prev) => ({
        ...prev,
        [libraryKey]: [nextHistoryItem, ...(prev[libraryKey] ?? [])],
      }))
      updateSessionScopeState(activeSessionScope, (prev) => ({
        ...prev,
        inputText: '',
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }))
      openLibrarySession({ id: historyId, label })
      return
    }

    updateSessionScopeState(activeSessionScope, (prev) => ({
      ...prev,
      historyItems: [nextHistoryItem, ...prev.historyItems],
      inputText: '',
      composerFiles: [],
      composerSegments: DEFAULT_COMPOSER_SEGMENTS,
    }))

    openHistorySession(nextHistoryItem)
  }

  const openAgentSession = ({ id = null, label = '' }) => {
    setActiveNav('dora')
    setActiveExpertCard(null)
    setActiveLibraryItem(null)
    setLibraryChatCollapsed(false)
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      return {
        ...prev,
        activeSessionPrompt: label,
        activeHistoryItemId: id,
        isGeneratingSession: true,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
    setPracticesPageOpen(false)
  }

  const startNewAgentChat = () => {
    if (isExpertDetailView) {
      updateSessionScopeState('experts', (prev) => {
        clearScopeComposerUploadTimers(prev.composerFiles)
        return {
          ...prev,
          isGeneratingSession: false,
          activeSessionPrompt: '',
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
    updateSessionScopeState('dora', (prev) => {
      clearScopeComposerUploadTimers(prev.composerFiles)
      return {
        ...prev,
        isGeneratingSession: false,
        activeSessionPrompt: '',
        activeHistoryItemId: null,
        inputText: '',
        inputFocused: false,
        composerFiles: [],
        composerSegments: DEFAULT_COMPOSER_SEGMENTS,
      }
    })
    setPracticesPageOpen(false)
  }

  const openLibrarySourceHistory = () => {
    const sourceHistoryId = activeLibraryItem?.sourceHistoryId
    if (!sourceHistoryId) return

    const historyItem = sessionStates.dora.historyItems.find((entry) => entry.id === sourceHistoryId)
    if (!historyItem) return

    openAgentSession({ id: historyItem.id, label: historyItem.label })
  }

  const openHistorySession = (item) => {
    setHistoryMenuOpenId(null)
    if (isLibraryDetailView) {
      openLibrarySession({ id: item.id, label: item.label })
      return
    }
    if (isExpertDetailView) {
      updateSessionScopeState('experts', (prev) => {
        clearScopeComposerUploadTimers(prev.composerFiles)
        return {
          ...prev,
          activeSessionPrompt: item.label,
          activeHistoryItemId: item.id,
          isGeneratingSession: true,
          inputText: '',
          inputFocused: false,
          composerFiles: [],
          composerSegments: DEFAULT_COMPOSER_SEGMENTS,
        }
      })
      setPracticesPageOpen(false)
      return
    }

    openAgentSession({ id: item.id, label: item.label })
  }

  const handleInnerActionClick = (actionId) => {
    if (actionId === 'new-chat') {
      startNewAgentChat()
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
    <div className="page" data-name="2-提问页">
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
                ref={isExpertsNav ? expertsNavRef : undefined}
                type="button"
                data-nav-id={item.id}
                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => selectNav(item.id)}
                onMouseEnter={isExpertsNav && activeNav !== 'experts' ? handleExpertsNavEnter : undefined}
                onMouseLeave={isExpertsNav && activeNav !== 'experts' ? handleExpertsNavLeave : undefined}
                onFocus={isExpertsNav && activeNav !== 'experts' ? handleExpertsNavEnter : undefined}
                onBlur={isExpertsNav && activeNav !== 'experts' ? handleExpertsNavLeave : undefined}
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
                    隐藏
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
                        <img src={agentDefaultAvatarImage} alt="" className="experts-nav-popover__avatar" />
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
              {ICONS.admin}
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
                          <img src={agentDefaultAvatarImage} alt="" className="inner-sidebar__agent-avatar" />
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
                                {EXPERT_CARDS.map((card, index) => (
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
                                    <img src={agentDefaultAvatarImage} alt="" className="inner-sidebar__agent-option-avatar" />
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
                  <IconButton tip="管理后台" className="icon-btn inner-sidebar__admin">
                    <span className="dora-icon icon-16" aria-hidden="true">
                      {ICONS.admin}
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
                            action.id === 'new-chat' && isNewChatActive ? 'active' : ''
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
                      <div className="inner-group__title">分身</div>
                      {INTERNAL_AVATARS.map((item) => (
                        <button key={item.id} type="button" className="inner-item inner-item--list">
                          <img src={item.icon} alt="" className="inner-avatar" />
                          <span className="inner-item__label">{item.label}</span>
                          {item.badge ? <span className="inner-badge">{item.badge}</span> : null}
                        </button>
                      ))}
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
                  <section className="experts-page">
                    <header className="experts-page__header">专家团</header>
                    <div
                      ref={expertsPageBodyRef}
                      className={`experts-page__body ${expertsPageScrolled ? 'experts-page__body--scrolled' : ''}`}
                    >
                      <div className="experts-toolbar">
                        <div className="experts-toolbar__filters">
                          <FieldSelect
                            classPrefix="experts"
                            value={expertFilter}
                            options={EXPERT_FILTER_OPTIONS}
                            onChange={setExpertFilter}
                            ariaLabel="筛选类型"
                            minWidth={150}
                          />

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

                      {filteredExpertCards.length ? (
                        <div className="experts-grid">
                          {filteredExpertCards.map((card) => (
                            <article
                              key={`${card.title}-${card.editedAt}-${card.desc}`}
                              className="expert-card"
                              role="button"
                              tabIndex={0}
                              onClick={() => {
                                setActiveExpertCard(card)
                                setInternalSidebarOpen(true)
                              }}
                              onKeyDown={(e) =>
                                onEnterKey(e, () => {
                                  setActiveExpertCard(card)
                                  setInternalSidebarOpen(true)
                                })
                              }
                            >
                              <div className="expert-card__head">
                                <div className="expert-card__avatar-wrap">
                                  <img src={agentDefaultAvatarImage} alt="" className="expert-card__avatar" />
                                  {card.alertCount > 0 ? <span className="expert-card__alert"></span> : null}
                                </div>

                                <div className="expert-card__meta">
                                  <h3>{highlightSearchText(card.title, expertSearch)}</h3>
                                  <p>最近编辑：{card.editedAt}</p>
                                </div>
                              </div>

                              <p className="expert-card__desc">{highlightSearchText(card.desc, expertSearch)}</p>
                            </article>
                          ))}
                        </div>
                      ) : (
                        <div className="experts-search-empty">暂无搜索结果</div>
                      )}
                    </div>
                  </section>
                ) : isQuestionMode ? (
                  renderSharedSessionStage('content')
                ) : (
                  <section className="expert-detail-page expert-detail-page--enter">
                    <header className="expert-detail-page__header">
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
                      {renderSessionHeaderActions()}
                    </header>

                    <div className="expert-detail-page__body">
                      <div className="expert-detail-page__panel-wrap">
                        <div className="expert-detail-page__title-wrap expert-detail-page__panel-title">
                          <img src={agentDefaultAvatarImage} alt="" className="expert-detail-page__avatar" />
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
                                    <span className="expert-prompt-item__icon">✦</span>
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
                    </div>
                  </section>
                )
              ) : activeNav === 'library' ? (
                !activeLibraryItem ? (
                  <section className="library-page">
                    <header className="library-page__header">资料库</header>

                    <div className="library-page__body">
                      {libraryRecentItems.length ? (
                        <section className="library-section">
                          <div className="library-section__title">
                            <span className="library-section__accent library-section__accent--purple"></span>
                            <span>最近常用</span>
                          </div>

                          <div className="library-recent-grid">
                            {libraryRecentItems.map((item) => (
                              <article
                                key={`recent-${getLibraryItemKey(item)}`}
                                className="library-card library-card--recent"
                                role="button"
                                tabIndex={0}
                                onClick={() => openLibraryItem(item)}
                                onKeyDown={(e) => onEnterKey(e, () => openLibraryItem(item))}
                              >
                                <div className="library-card__meta">
                                  <img src={LIBRARY_ASSETS[item.type]} alt="" className="library-card__type-icon" />

                                  <div className="library-card__text">
                                    <h3>{highlightSearchText(item.title, librarySearch)}</h3>
                                    <div className="library-card__owner">
                                      <img src={item.ownerIcon} alt="" className="library-card__owner-icon" />
                                      <span>{highlightSearchText(item.owner, librarySearch)}</span>
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
                      ) : null}

                      <section className="library-section library-section--fill">
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
                              minWidth={150}
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
                              role="button"
                              tabIndex={0}
                              onClick={() => openLibraryItem(item, { trackRecent: true })}
                              onKeyDown={(e) => onEnterKey(e, () => openLibraryItem(item, { trackRecent: true }))}
                            >
                              <div className="library-card__meta">
                                <img src={LIBRARY_ASSETS[item.type]} alt="" className="library-card__type-icon" />

                                <div className="library-card__text">
                                  <h3>{highlightSearchText(item.title, librarySearch)}</h3>
                                  <div className="library-card__owner">
                                    <img src={item.ownerIcon} alt="" className="library-card__owner-icon" />
                                    <span>{highlightSearchText(item.owner, librarySearch)}</span>
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
                        <IconButton tip="返回" className="expert-detail-page__back" onClick={() => setActiveLibraryItem(null)}>
                          <span className="dora-icon icon-16" aria-hidden="true">
                            {ICONS.back}
                          </span>
                        </IconButton>
                        <LibraryDetailMainMeta
                          fileIconSrc={activeLibraryItem ? LIBRARY_ASSETS[activeLibraryItem.type] : null}
                          fileTitle={activeLibraryTitle}
                          sourceOwner={activeLibraryItem?.owner}
                          sourceOwnerIcon={getLibrarySourceAgentIcon(activeLibraryItem?.owner)}
                          sourceHistoryId={activeLibraryItem?.sourceHistoryId}
                          onOpenSourceHistory={openLibrarySourceHistory}
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
                          <h3>嗨，我是 Dora，全能助手随时待命</h3>
                          <div className="subtitle-row">
                            <span className="subtitle-prefix">我可以帮你</span>
                            <button type="button" className="capability-badge" onClick={applyHintToInput}>
                              {displayedHint}
                              <span className="cursor">_</span>
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="library-detail-chat__sender">
                        <div
                          className={`sender ${inputFocused ? 'focused' : ''} ${canSend ? 'has-value' : ''} ${isGeneratingSession ? 'is-sending' : ''}`}
                        >
                          <div className="sender-inner">
                            {renderSenderInnerContent(activeSessionScope)}
                            <div className="sender-toolbar">
                              {renderAttachActions()}
                              <button
                                type="button"
                                className="send-btn"
                                aria-label={isGeneratingSession ? '停止生成' : '发送'}
                                disabled={!canSend && !isGeneratingSession}
                                onClick={isGeneratingSession ? handleStopGeneration : handleSend}
                              >
                                {isGeneratingSession ? (
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
              ) : isQuestionMode && !isLibraryDetailView ? (
                renderSharedSessionStage(doraIntroPhase)
              ) : (
                <div
                  className={`dora-stage dora-stage--${doraIntroPhase} dora-stage--${doraVisualScheme}`}
                  onPointerMove={(event) => {
                    handleScheme3PointerMove(event)
                    handleHeatmapPointerMove(event)
                  }}
                  onPointerLeave={(event) => {
                    handleScheme3PointerLeave(event)
                    handleHeatmapPointerLeave()
                  }}
                >
                  {doraVisualScheme === 'scheme3' ? (
                    <div className="scheme3-banner" aria-hidden="true">
                      <div className="scheme3-banner__glow"></div>
                    </div>
                  ) : null}
                  {doraVisualScheme === 'scheme4' || doraVisualScheme === 'scheme5' ? (
                    <div className="scheme-heatmap-banner" aria-hidden="true">
                      <div className="scheme-heatmap-stage" ref={heatmapStageRef}>
                        <div
                          className="scheme-heatmap-grid"
                          style={{
                            '--cols': heatmapGrid.cols,
                            '--rows': heatmapGrid.rows,
                            '--cell-w': `${heatmapGrid.cellWidth}px`,
                            '--cell-h': `${heatmapGrid.cellHeight}px`,
                          }}
                        >
                          {heatmapCells.map((cell) => (
                            <div
                              className={`scheme-heatmap-cell ${cell.isFocus ? 'is-focus' : ''}`}
                              key={cell.id}
                              style={cell.style}
                            >
                              <span className="scheme-heatmap-dot scheme-heatmap-dot--tl"></span>
                              <span className="scheme-heatmap-dot scheme-heatmap-dot--tr"></span>
                              <span className="scheme-heatmap-dot scheme-heatmap-dot--br"></span>
                              <span className="scheme-heatmap-dot scheme-heatmap-dot--bl"></span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <header
                    className={`main-header dora-stage__header ${practicesPageOpen ? 'dora-stage__header--practices' : ''} ${
                      !practicesPageOpen ? 'dora-stage__header--session' : ''
                    }`}
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

                  {practicesPageOpen ? (
                    <section className="practices-browser dora-stage__practices-browser">
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

                        <div className="sender-wrap dora-stage__sender">
                          <div
                            className={`sender ${inputFocused ? 'focused' : ''} ${canSend ? 'has-value' : ''} ${
                              doraVisualScheme === 'scheme4' || doraVisualScheme === 'scheme5' ? 'dora-sender--ring' : ''
                            }`}
                          >
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
                      </section>

                      <footer className="practices dora-stage__practices">
                        <button type="button" className="practices-toggle" onClick={() => setPracticesPageOpen(true)}>
                          <span>探索最佳实践</span>
                          <span className="dora-icon icon-16 practices-toggle__more-up" aria-hidden="true">
                            {ICONS.moreUp}
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
    </div>
  )
}
