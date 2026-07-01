import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import uploadExcelImage from '../assets/images/upload_excel.png'
import uploadMdImage from '../assets/images/upload_md_new.png'
import uploadHtmlImage from '../assets/images/upload_html.png'
import uploadPptImage from '../assets/images/upload_ppt.png'
import uploadJsonImage from '../assets/images/upload_json.png'
import outputFileHtmlImage from '../assets/images/output_file_html.png'
import outputFileMdImage from '../assets/images/output_file_md.png'
import outputFilePptImage from '../assets/images/output_file_ppt.png'
import FourPointStarLoader from './FourPointStarLoader'

const ICONS = {
  expand: '\ue7aa',
  shrink: '\ue7ad',
}

const STEP_PAUSE_MS = 220
const RECEIVE_FILE_MS = 1800
const EXTRAS_DELAY_MS = 180
const AUTO_COLLAPSE_DELAY_MS = 960
const MANUAL_COLLAPSE_TRANSITION_MS = 260
const TRANSITION_MESSAGE_SWITCH_MS = 520
const THINKING_WAIT_ROTATE_MS = 5000
const PUNCTUATION_CHARS = new Set('。，、；：？！…,.;:!?')
const ASCII_WORD_RE = /^[A-Za-z0-9_./%:()#-]+/
const THINKING_WAIT_MESSAGES = [
  'Agent正在持续工作中...',
  '还在继续处理，请稍等...',
  '正在整理已有信息...',
  '正在生成下一步结果...',
  '工作量较大，请您耐心等待...',
  '当前任务较复杂，请稍候...',
]
const DEFAULT_REPORT_CODE = (outputFile) =>
  `from pptx import Presentation\nprs = Presentation('templates/dora.pptx')\nfor slide_data in slides:\n  add_slide(prs, slide_data)\nprs.save('${outputFile}')`

const buildCalibrateCode = ({ scenario, signals }) => {
  if (scenario === 'feedback') {
    return `feedback_df = feedback_df.copy()\nfeedback_df = feedback_df[feedback_df["反馈时间"].between(start_date, end_date)]\nfeedback_df["满意度标签"] = feedback_df["满意度标签"].fillna("未标注")\nfeedback_df["复购风险"] = feedback_df["近90天复购次数"].fillna(0).eq(0)\nfeedback_df = feedback_df.drop_duplicates(subset=["客户ID", "反馈ID"])`
  }

  if (scenario === 'comparison') {
    return `compare_df = source_df.copy()\ncompare_df = compare_df[compare_df["时间"].between(start_date, end_date)]\ncompare_df["销售额"] = compare_df["销售额"].fillna(0)\ncompare_df["客单价"] = compare_df["销售额"] / compare_df["客户数"].replace({0: None})\ncompare_df["转化率"] = compare_df["成交人数"] / compare_df["线索人数"].replace({0: None})`
  }

  if (scenario === 'weekly-report' || scenario === 'monthly-review') {
    return `metrics_df = metrics_df.copy()\nmetrics_df = metrics_df[metrics_df["日期"].between(start_date, end_date)]\nmetrics_df["销售额"] = metrics_df["销售额"].fillna(0)\nmetrics_df["达成率"] = metrics_df["销售额"] / metrics_df["目标值"].replace({0: None})\nmetrics_df["环比"] = metrics_df["销售额"].pct_change().fillna(0)`
  }

  if (scenario === 'operations' || signals.sales || signals.kpi) {
    return `analysis_df = source_df.copy()\nanalysis_df = analysis_df[analysis_df["日期"].between(start_date, end_date)]\nanalysis_df["销售额"] = analysis_df["销售额"].fillna(0)\nanalysis_df["客单价"] = analysis_df["销售额"] / analysis_df["客户数"].replace({0: None})\nanalysis_df["转化率"] = analysis_df["成交人数"] / analysis_df["线索人数"].replace({0: None})`
  }

  return `analysis_df = source_df.copy()\nanalysis_df = analysis_df[analysis_df["日期"].between(start_date, end_date)]\nanalysis_df = analysis_df.fillna({"指标值": 0})\nanalysis_df["变化率"] = analysis_df["当前值"] / analysis_df["对比值"].replace({0: None}) - 1`
}

const buildEvidenceCode = ({ scenario, outputBaseName }) => {
  if (scenario === 'feedback') {
    return `issue_summary = feedback_df.groupby("问题主题", as_index=False).agg({\n  "反馈ID": "count",\n  "复购风险": "sum"\n}).rename(columns={"反馈ID": "样本量"})\nissue_summary = issue_summary.sort_values(["样本量", "复购风险"], ascending=[False, False])\nissue_summary.head(5).to_html("${outputBaseName}.html", index=False)`
  }

  if (scenario === 'comparison') {
    return `gap_summary = compare_df.groupby("区域", as_index=False).agg({\n  "销售额": "sum",\n  "客单价": "mean",\n  "转化率": "mean"\n})\ngap_summary["优先追赶项"] = gap_summary[["客单价", "转化率"]].idxmin(axis=1)\ngap_summary = gap_summary.sort_values("销售额", ascending=False)\ngap_summary.head(6).to_markdown(index=False)`
  }

  return `summary = analysis_df.groupby("区域", as_index=False).agg({\n  "销售额": "sum",\n  "客单价": "mean",\n  "转化率": "mean"\n})\nsummary = summary.sort_values("销售额", ascending=False)\nkey_findings = summary.head(5)\nkey_findings.to_markdown(index=False)`
}

const getStreamChunkSize = (text, index, isCode = false) => {
  const char = text[index]
  if (!char) return 1
  if (char === '\n' || PUNCTUATION_CHARS.has(char)) return 1

  const rest = text.slice(index)
  const asciiWord = rest.match(ASCII_WORD_RE)?.[0]
  if (asciiWord) {
    return Math.min(isCode ? 5 : 3, asciiWord.length, text.length - index)
  }

  const maxChunk = isCode ? 3 : 3
  let size = 0

  while (index + size < text.length && size < maxChunk) {
    const nextChar = text[index + size]
    if (!nextChar || nextChar === '\n' || PUNCTUATION_CHARS.has(nextChar) || nextChar === ' ') break
    size += 1
  }

  return Math.max(1, size)
}

const getStreamDelay = (char, progress = 0, isCode = false) => {
  if (!char) return isCode ? 52 : 116
  if (char === '\n') return isCode ? 92 : 182
  if (PUNCTUATION_CHARS.has(char)) return isCode ? 68 : 138
  if (char === ' ') return isCode ? 26 : 54
  if (isCode) {
    if (progress < 0.15) return 64
    if (progress > 0.82) return 44
    return 38
  }
  if (progress < 0.12) return 156
  if (progress > 0.84) return 112
  return 96
}

const streamTextByLength = async (text, onProgress, { isCode = false, cancelled = () => false } = {}) => {
  let index = 0
  while (index < text.length) {
    if (cancelled()) return
    const chunkSize = getStreamChunkSize(text, index, isCode)
    index = Math.min(index + chunkSize, text.length)
    onProgress(index)
    if (index < text.length) {
      await sleep(getStreamDelay(text[index - 1], index / text.length, isCode))
    }
  }
}

const buildFileRef = (name) => {
  if (/\.(xlsx|xls|csv)$/i.test(name)) return { name, icon: uploadExcelImage }
  if (/\.(md|txt)$/i.test(name)) return { name, icon: uploadMdImage }
  if (/\.(json)$/i.test(name)) return { name, icon: uploadJsonImage }
  if (/\.(html|htm)$/i.test(name)) return { name, icon: uploadHtmlImage }
  if (/\.(ppt|pptx)$/i.test(name)) return { name, icon: uploadPptImage }
  return { name, icon: uploadMdImage }
}

const deriveOutputBaseName = (prompt = '') => {
  const normalized = prompt.replace(/[。！？!?]/g, '').trim()
  if (!normalized) return '分析结果'
  if (normalized.length <= 18) return normalized
  return `${normalized.slice(0, 18)}摘要`
}

const buildOutputRefs = (baseName, { includePpt = true } = {}) => {
  const outputs = [
    { name: `${baseName}.md`, icon: outputFileMdImage },
    { name: `${baseName}.html`, icon: outputFileHtmlImage },
  ]
  if (includePpt) {
    outputs.push({ name: `${baseName}.ppt`, icon: outputFilePptImage })
  }
  return outputs
}

const inferPromptContext = (userPrompt = '', userFiles = []) => {
  const prompt = userPrompt.trim()
  const signals = {
    weekly: /本周|周报|近7天|近一周|KPI/i.test(prompt),
    monthly: /月度|月报|本月/i.test(prompt),
    review: /复盘|回顾|总结|大纲/i.test(prompt),
    comparison: /对比|差异|Top3|同行|竞品/i.test(prompt),
    feedback: /反馈|满意度|复购|投诉|归因/i.test(prompt),
    sales: /销售|客户|门店|渠道|订单|客单价|漏斗/i.test(prompt),
    report: /报告|周报|月报|汇报|摘要|大纲|PPT/i.test(prompt),
    kpi: /KPI|指标|异常|波动|增长|经营/i.test(prompt),
  }

  let scenario = 'generic'
  if (signals.feedback) scenario = 'feedback'
  else if (signals.weekly && signals.report) scenario = 'weekly-report'
  else if (signals.monthly && signals.review) scenario = 'monthly-review'
  else if (signals.comparison) scenario = 'comparison'
  else if (signals.sales || signals.kpi) scenario = 'operations'

  const baseName = deriveOutputBaseName(prompt)
  const outputFileName = `${baseName}${signals.report ? '' : '分析'}.pptx`
  const defaultReadsByScenario = {
    feedback: ['客户反馈明细.xlsx', '满意度标签说明.md', '复购风险规则.json'],
    'weekly-report': ['经营指标汇总.xlsx', '异常波动记录.md', '门店经营情况.ppt'],
    'monthly-review': ['销售明细.xlsx', '门店经营情况.ppt', '月度经营备注.md'],
    comparison: ['行业对标数据.xlsx', '数字化投入清单.json', '客户分层说明.md'],
    operations: ['销售明细.xlsx', '经营指标汇总.xlsx', '门店经营情况.ppt'],
    generic: ['分析资料.xlsx', '业务口径说明.md', '历史输出参考.ppt'],
  }

  const fallbackReads = (defaultReadsByScenario[scenario] ?? defaultReadsByScenario.generic).map(buildFileRef)
  const actualReads = userFiles.length
    ? userFiles.slice(0, 3).map((file) => ({ name: file.name, icon: file.icon }))
    : fallbackReads

  return {
    prompt,
    scenario,
    signals,
    outputBaseName: baseName,
    outputFileName,
    reads: actualReads,
    outputs: buildOutputRefs(baseName, { includePpt: true }),
  }
}

const buildStepFrame = ({ scenario, prompt = '', signals }) => {
  const focusText = prompt || '当前问题'

  if (scenario === 'feedback') {
    return {
      id: 'frame',
      title: '明确归因口径与优先级',
      description: `我会先确认「${focusText}」到底更偏向解释满意度、投诉集中点还是复购风险，再决定后面是按问题主题、客户阶段还是服务触点来拆因果链，避免看上去分析很完整，但没有回答最关键的归因问题。`,
    }
  }

  if (scenario === 'comparison') {
    return {
      id: 'frame',
      title: '明确比较基线与判断标准',
      description: `这一步会先锁定谁是主比较对象、谁是参照组、最后要得出的是“差多少”还是“为什么差”，并把时间窗、样本规模和判断标准先讲清楚，这样后面每个差异结论才不会失焦。`,
    }
  }

  if (scenario === 'weekly-report' || scenario === 'monthly-review') {
    return {
      id: 'frame',
      title: '明确汇报视角与管理关注点',
      description: `我会先按管理层阅读习惯判断这次更该突出结果波动、异常原因还是后续动作，把“需要被解释的部分”和“只需要快速带过的部分”区分开，后面思路会更像真实汇报而不是流水账。`,
    }
  }

  if (scenario === 'operations') {
    return {
      id: 'frame',
      title: signals.sales ? '明确增长目标与判断标准' : '明确经营目标与判断标准',
      description: `在正式拆指标前，我会先把「${focusText}」里真正想回答的管理问题锁定下来，比如更关注规模增长、效率变化还是结构改善，并同步确定哪些指标只是辅助信号，哪些指标会直接影响最终判断。`,
    }
  }

  return {
    id: 'frame',
    title: '明确问题边界与输出预期',
    description: `我会先判断「${focusText}」到底是在追求解释、总结、对比还是直接产出结果，同时把回答需要覆盖到的边界、证据深度和交付形式先对齐，这样后面每个动作都围绕同一个目标推进。`,
  }
}

const buildCrossCheckStep = ({ scenario, prompt = '' }) => {
  const focusText = prompt || '当前问题'

  return {
    id: 'cross-check',
    title: scenario === 'comparison' ? '交叉验证差异与反例' : '交叉验证结论与反例',
    description: `在进入最终输出前，我会专门回看一遍「${focusText}」对应的关键结论，确认有没有被异常样本、短期波动、维度缺失或口径偏差带偏；如果发现有反例会先解释清楚，再决定它是需要纳入结论，还是只作为风险提示保留。`,
  }
}

const buildStepDescriptionTail = (step, { scenario }) => {
  if (step.id === 'scene') {
    return '我会优先把问题里的业务对象、时间范围、关键结果和隐含目标拆开看，确保后续每一步都真的在回答用户此刻最关心的判断。'
  }

  if (['read-feedback', 'kpi', 'scope', 'targets', 'read-table', 'read'].includes(step.id)) {
    return '同时会顺手记录数据粒度、字段缺失、样本覆盖范围和可继续下钻的维度，这样后面引用结论时能分清哪些是确定事实，哪些只是需要继续验证的线索。'
  }

  if (step.id === 'calibrate') {
    return '如果发现同一个指标在不同资料里的定义不一致，我会优先回到最基础的业务口径重新确认，而不是直接沿用表层字段，避免后面所有判断都建立在错误口径上。'
  }

  if (['pattern', 'anomaly', 'review', 'gap', 'framework', 'reason'].includes(step.id)) {
    return '这一步不会只看表面的结果变化，我会同时留意结构变化、反常样本和潜在反例，尽量把“看起来像趋势”和“真正能解释趋势”的部分区分开。'
  }

  if (['evidence', 'outline'].includes(step.id)) {
    return '整理时我会尽量把结论、证据、影响范围和可以被追问的细节放在一起，这样输出出来的不只是观点，也能保留继续深挖的抓手。'
  }

  if (step.id === 'report') {
    return '最后会把这些判断重新组织成更接近真实分析汇报的节奏，让结论、原因和动作之间有顺承关系，而不是简单把模板段落拼接在一起。'
  }

  return ''
}

const enrichThinkingSteps = (steps, context) => {
  const expanded = steps.map((step) => ({
    ...step,
    code:
      step.code ??
      (step.id === 'calibrate'
        ? buildCalibrateCode(context)
        : ['evidence', 'outline'].includes(step.id)
        ? buildEvidenceCode(context)
        : undefined),
    description: `${step.description ?? ''}${buildStepDescriptionTail(step, context) ? ` ${buildStepDescriptionTail(step, context)}` : ''}`,
  }))

  const readIndex = expanded.findIndex((step) =>
    ['read-feedback', 'kpi', 'scope', 'targets', 'read-table', 'read'].includes(step.id),
  )

  if (readIndex >= 0) {
    expanded.splice(readIndex + 1, 0, buildStepFrame(context))
  }

  const evidenceIndex = expanded.findIndex((step) => ['evidence', 'outline', 'report'].includes(step.id))
  if (evidenceIndex >= 0) {
    expanded.splice(evidenceIndex, 0, buildCrossCheckStep(context))
  }

  return expanded
}

const createThinkingSteps = ({ userPrompt = '', userFiles = [] }) => {
  const context = inferPromptContext(userPrompt, userFiles)
  const { prompt, scenario, signals, reads, outputs, outputFileName } = context
  const focusText = prompt || '当前提问'
  const primaryRead = reads[0] ? [reads[0]] : []
  const secondaryReads = reads.slice(1)

  const scenarioBuilders = {
    feedback: () => [
      {
        id: 'scene',
        title: '识别任务场景',
        skill: { label: '技能：场景识别', tone: 'purple' },
        description: `已识别为客户反馈归因类任务，我会围绕“问题表现、影响范围、原因归属、改进行动”来拆解「${focusText}」。`,
      },
      {
        id: 'read-feedback',
        title: '读取反馈与标签信息',
        description: '先把评价文本、标签字段、时间窗口和客户分层对齐，避免后续把噪声当成趋势。',
        reads: primaryRead,
      },
      {
        id: 'calibrate',
        title: '校准分析口径',
        skill: { label: '技能：Code', tone: 'teal' },
        description: '我会确认满意度、复购、投诉、触点等字段之间的口径关系，保证归因链条能前后一致。',
        reads: secondaryReads,
      },
      {
        id: 'pattern',
        title: '拆解关键反馈模式',
        description: '把高频问题按主题、情绪倾向和客户阶段重新归组，先定位“最值得解释”的反馈簇。',
      },
      {
        id: 'evidence',
        title: '补齐证据与异常样本',
        skill: { label: '技能：分析主题数据查询', tone: 'blue' },
        description: '对每个结论补上样本证据、波动区间和关联指标，避免只停留在印象层面的判断。',
        outputs,
      },
      {
        id: 'report',
        title: '组织结论与行动建议',
        description: '我会把结果整理成“问题现象 → 根因解释 → 影响范围 → 优先动作”的表达顺序，便于直接进入汇报。',
        code: DEFAULT_REPORT_CODE(outputFileName),
      },
    ],
    'weekly-report': () => [
      {
        id: 'scene',
        title: '识别周报目标',
        skill: { label: '技能：场景识别', tone: 'purple' },
        description: `这是一类经营周报生成任务，我会围绕「${focusText}」先确认核心 KPI、异常波动和管理层最关心的变化。`,
      },
      {
        id: 'kpi',
        title: '梳理本周核心指标',
        description: '先把销售、转化、利润、库存或流量等核心指标拆出来，形成周报主骨架。',
        reads: primaryRead,
      },
      {
        id: 'calibrate',
        title: '统一时间窗与统计口径',
        skill: { label: '技能：Code', tone: 'teal' },
        description: '我会先对齐本周、上周、同期以及目标值的比较口径，避免异常判断出现“看起来波动、其实口径不一致”。',
        reads: secondaryReads,
      },
      {
        id: 'anomaly',
        title: '识别异常与驱动因素',
        description: '把波动大的 KPI 单独拿出来看驱动项，区分结构性变化、单点事件和短期噪声。',
      },
      {
        id: 'evidence',
        title: '形成周报证据板块',
        skill: { label: '技能：分析主题数据查询', tone: 'blue' },
        description: '我会把关键指标、异常说明和可能原因拼成可以直接落在周报里的证据片段。',
        outputs,
      },
      {
        id: 'report',
        title: '组织周报输出结构',
        description: '输出会按“核心 KPI 速览 → 异常说明 → 原因拆解 → 下周关注项”的结构组织，便于管理层快速阅读。',
        code: DEFAULT_REPORT_CODE(outputFileName),
      },
    ],
    'monthly-review': () => [
      {
        id: 'scene',
        title: '识别复盘任务',
        skill: { label: '技能：场景识别', tone: 'purple' },
        description: `这是一类月度复盘 / 大纲整理任务，我会围绕「${focusText}」优先梳理结果、原因和后续动作三层结构。`,
      },
      {
        id: 'scope',
        title: '读取月度结果与背景',
        description: '先确认本月时间范围、目标值、核心业务对象和关键事件，复盘才有上下文。',
        reads: primaryRead,
      },
      {
        id: 'calibrate',
        title: '校准复盘口径',
        skill: { label: '技能：Code', tone: 'teal' },
        description: '把同比、环比、目标达成、渠道贡献和异常因素统一到一个分析口径里，避免复盘内容散乱。',
        reads: secondaryReads,
      },
      {
        id: 'review',
        title: '拆解亮点、问题与原因',
        description: '我会把结果分成“做得好的、偏离预期的、需要继续跟踪的”三类，形成更像管理复盘的表达方式。',
      },
      {
        id: 'outline',
        title: '组织复盘大纲结构',
        skill: { label: '技能：分析主题数据查询', tone: 'blue' },
        description: '这一轮会把核心结论整理成章节骨架，让后续无论输出 Markdown、HTML 还是 PPT 都能直接复用。',
        outputs,
      },
      {
        id: 'report',
        title: '生成汇报版本',
        description: '最终输出会按“结果回顾 → 指标拆解 → 原因分析 → 改进动作 → 下月关注”的顺序展开。',
        code: DEFAULT_REPORT_CODE(outputFileName),
      },
    ],
    comparison: () => [
      {
        id: 'scene',
        title: '识别对比任务',
        skill: { label: '技能：场景识别', tone: 'purple' },
        description: `这是一个差异对比类问题，我会先拆清楚「${focusText}」里的比较对象、比较维度和要得出的管理判断。`,
      },
      {
        id: 'targets',
        title: '锁定对比对象与维度',
        description: '先把主对象、Top 参照组和对比维度拉平，避免后续在不同口径之间来回跳转。',
        reads: primaryRead,
      },
      {
        id: 'calibrate',
        title: '统一对比口径',
        skill: { label: '技能：Code', tone: 'teal' },
        description: '我会校准样本规模、时间范围、金额口径和分层方式，确保“差异”是真差异，不是统计偏差。',
        reads: secondaryReads,
      },
      {
        id: 'gap',
        title: '拆解关键差异来源',
        description: '差异会被拆成结构差、效率差和策略差几个层面，方便直接定位落后的原因。',
      },
      {
        id: 'evidence',
        title: '提炼对比结论与证据',
        skill: { label: '技能：分析主题数据查询', tone: 'blue' },
        description: '我会把关键差值、领先项、短板项和优先补齐的动作整理成可展示的证据。',
        outputs,
      },
      {
        id: 'report',
        title: '组织对比汇报逻辑',
        description: '输出会按“结论先行 → 差异分层 → 原因解释 → 追赶建议”的方式展开，更接近真实管理汇报。',
        code: DEFAULT_REPORT_CODE(outputFileName),
      },
    ],
    operations: () => [
      {
        id: 'scene',
        title: '识别经营分析任务',
        skill: { label: '技能：场景识别', tone: 'purple' },
        description: `已识别为经营 / 销售分析问题，我会围绕「${focusText}」先拆目标，再拆指标和异常。`,
      },
      {
        id: 'read-table',
        title: '读取业务数据与范围',
        description: '先确认分析对象、时间窗口、维度层级和可用字段，让后续判断不会偏题。',
        reads: primaryRead,
      },
      {
        id: 'calibrate',
        title: '校准指标口径',
        skill: { label: '技能：Code', tone: 'teal' },
        description: '我会先对齐销售额、客户数、转化率、门店或渠道维度的定义，再开始做异常判断。',
        reads: secondaryReads,
      },
      {
        id: 'framework',
        title: signals.sales ? '拆解销售结构与驱动' : '建立经营分析框架',
        description: signals.sales
          ? '这一步会把规模、结构、趋势和贡献度串起来，看清楚增长点和拖累项分别来自哪里。'
          : '我会按“目标 → 信号 → 维度 → 归因 → 行动”的路径推进，让每个判断都能追溯依据。',
      },
      {
        id: 'evidence',
        title: signals.sales ? '形成业务判断与证据' : '补齐异常说明与证据',
        skill: { label: '技能：分析主题数据查询', tone: 'blue' },
        description: '关键结论会配上对应样本、指标表现和影响范围，避免只给结论不给依据。',
        outputs,
      },
      {
        id: 'report',
        title: signals.report ? '组织汇报结构' : '生成分析输出',
        description: signals.report
          ? '我会把结果整理成更适合汇报的结构，让管理层先看到核心结论，再看到拆解和建议。'
          : '最终会把分析结果收束成“结论、原因、建议”三段式表达，便于直接复用。',
        code: DEFAULT_REPORT_CODE(outputFileName),
      },
    ],
    generic: () => [
      {
        id: 'scene',
        title: '识别任务目标',
        skill: { label: '技能：场景识别', tone: 'purple' },
        description: `我先把「${focusText}」拆成任务目标、证据来源和交付形式，避免思路只停留在固定模板上。`,
      },
      {
        id: 'read',
        title: '读取上下文与输入资料',
        description: '先梳理现有输入、相关背景和可复用材料，让后续输出更贴近这次提问本身。',
        reads: primaryRead,
      },
      {
        id: 'calibrate',
        title: '统一分析与表达口径',
        skill: { label: '技能：Code', tone: 'teal' },
        description: '我会先对齐时间、对象、指标和输出形式，确保后续每个动作都围绕同一个目标推进。',
        reads: secondaryReads,
      },
      {
        id: 'reason',
        title: '建立回答框架',
        description: '根据这次问题本身去组织内容层次，而不是机械复用同一套思维链模版。',
      },
      {
        id: 'evidence',
        title: '补齐关键证据',
        skill: { label: '技能：分析主题数据查询', tone: 'blue' },
        description: '我会把需要支撑结论的数字、样本和上下文证据补完整，再组织最终表达。',
        outputs,
      },
      {
        id: 'report',
        title: '生成最终输出',
        description: '最后一步会把前面的判断收束成更适合当前问题的结果结构，而不是套模板式结束。',
        code: DEFAULT_REPORT_CODE(outputFileName),
      },
    ],
  }

  return enrichThinkingSteps((scenarioBuilders[scenario] ?? scenarioBuilders.generic)(), context)
}

const INITIAL_STREAM = {
  phase: 'idle',
  headerStatus: '',
  completedCount: 0,
  activeIndex: -1,
  descriptionLength: 0,
  codeLength: 0,
  showExtras: false,
  showCode: false,
  showFootnote: false,
  showWait: false,
  startedAt: 0,
  finishedAt: 0,
  lastActivityAt: 0,
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const formatThinkingSummary = (completedCount, durationMs) => {
  const safeCount = Math.max(0, completedCount)
  const totalSeconds = Math.max(1, Math.round(durationMs / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `已完成 ${safeCount} 个动作，耗时 ${minutes}m ${seconds}s`
}

const formatUserSentAt = (value) => {
  if (!value) return ''
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  const hours = `${date.getHours()}`.padStart(2, '0')
  const minutes = `${date.getMinutes()}`.padStart(2, '0')
  return `${year}年${month}月${day}日 ${hours}:${minutes}`
}

const fallbackCopyText = (text) => {
  if (typeof document === 'undefined') return false

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.opacity = '0'
  textarea.style.pointerEvents = 'none'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  let copied = false

  try {
    copied = document.execCommand('copy')
  } catch {
    copied = false
  }

  document.body.removeChild(textarea)
  return copied
}

const copyTextToClipboard = async (text) => {
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return fallbackCopyText(text)
    }
  }

  return fallbackCopyText(text)
}

function CopyMessageIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="session-thread__user-copy-icon">
      <path
        d="M13.648 0.001H5.429A2.572 2.572 0 0 0 2.857 2.572v0.857H2.57A2.572 2.572 0 0 0 0 6v8c0 1.419 1.151 2.571 2.571 2.571h8A2.572 2.572 0 0 0 13.143 14v-0.857h0.505A2.572 2.572 0 0 0 16.22 10.57v-8A2.572 2.572 0 0 0 13.648 0Zm-3.077 14.857H2.57A0.857 0.857 0 0 1 1.714 14V6c0-0.473 0.384-0.857 0.857-0.857h8c0.473 0 0.857 0.384 0.857 0.857v8a0.857 0.857 0 0 1-0.857 0.857Zm3.934-4.286a0.857 0.857 0 0 1-0.857 0.857h-0.505V6A2.572 2.572 0 0 0 10.57 3.429H4.571v-0.857c0-0.473 0.384-0.857 0.857-0.857h8.22c0.473 0 0.857 0.384 0.857 0.857v8Z"
        fill="currentColor"
        fillOpacity="0.78"
      />
    </svg>
  )
}

function CopiedMessageIcon() {
  return (
    <span aria-hidden="true" className="dora-icon session-thread__user-copy-icon session-thread__user-copy-icon--glyph">
      {'\ue806'}
    </span>
  )
}

function ThinkingFileRefs({ label, files }) {
  if (!files?.length) return null

  return (
    <div className="session-thinking-step__refs" role="list">
      {files.map((file) => (
        <span key={`${label}-${file.name}`} className="session-thinking-step__ref-tag" role="listitem">
          <span className="session-thinking-step__ref-prefix">{label}</span>
          <img src={file.icon} alt="" className="session-thinking-step__ref-icon" />
          <span className="session-thinking-step__ref-name">{file.name}</span>
        </span>
      ))}
    </div>
  )
}

function ThinkingStatus({ text, shimmering = false }) {
  return (
    <span
      className={`session-thinking__status ${shimmering ? 'is-shining' : ''}`}
    >
      <span className="session-thinking__status-label">{text}</span>
      <span className="session-thinking__status-shine session-thinking__status-shine--primary" aria-hidden="true">
        {text}
      </span>
      <span className="session-thinking__status-shine session-thinking__status-shine--secondary" aria-hidden="true">
        {text}
      </span>
    </span>
  )
}

function SessionTransition({ userFiles }) {
  const messages = useMemo(
    () =>
      userFiles.length
        ? ['正在理解问题', '正在整理附件与上下文']
        : ['正在理解问题', '正在整理上下文'],
    [userFiles.length],
  )
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    setMessageIndex(0)
    if (messages.length < 2) return undefined

    const timer = window.setTimeout(() => {
      setMessageIndex(1)
    }, TRANSITION_MESSAGE_SWITCH_MS)

    return () => window.clearTimeout(timer)
  }, [messages])

  return (
    <div className="session-transition">
      <div className="session-transition__card">
        <FourPointStarLoader className="session-transition__icon" label={messages[messageIndex]} />
        <div className="session-transition__copy">
          <ThinkingStatus text={messages[messageIndex]} shimmering />
          <p className="session-transition__hint">
            {userFiles.length ? '先对齐问题与资料，再进入分析' : '先整理意图和上下文，再进入分析'}
          </p>
        </div>
      </div>
    </div>
  )
}

function pickNextWaitMessageIndex(remaining, previousIndex) {
  const safeRemaining = remaining.filter((index) => index !== previousIndex)
  if (!safeRemaining.length) {
    const fallback = THINKING_WAIT_MESSAGES
      .map((_, index) => index)
      .filter((index) => index !== previousIndex)
    return fallback[Math.floor(Math.random() * fallback.length)] ?? 0
  }

  return safeRemaining[Math.floor(Math.random() * safeRemaining.length)]
}

function ThinkingWait({ active = false, lastActivityAt = 0 }) {
  const [tick, setTick] = useState(() => Date.now())
  const [messageIndex, setMessageIndex] = useState(0)
  const waitCycleRef = useRef({
    previousStep: 0,
    previousIndex: 0,
    remaining: THINKING_WAIT_MESSAGES.map((_, index) => index).filter((index) => index !== 0),
  })

  useEffect(() => {
    if (!active) return undefined

    const timer = window.setInterval(() => {
      setTick(Date.now())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [active])

  useEffect(() => {
    waitCycleRef.current = {
      previousStep: 0,
      previousIndex: 0,
      remaining: THINKING_WAIT_MESSAGES.map((_, index) => index).filter((index) => index !== 0),
    }
    setMessageIndex(0)
    setTick(Date.now())
  }, [lastActivityAt])

  const idleMs = active && lastActivityAt ? Math.max(0, tick - lastActivityAt) : 0
  const idleSeconds = Math.max(1, Math.floor(idleMs / 1000))
  const rotationStep = Math.floor(idleMs / THINKING_WAIT_ROTATE_MS)

  useEffect(() => {
    if (!active) return

    const cycle = waitCycleRef.current
    if (rotationStep <= cycle.previousStep) return

    for (let step = cycle.previousStep + 1; step <= rotationStep; step += 1) {
      let remaining = cycle.remaining

      if (!remaining.length) {
        remaining = THINKING_WAIT_MESSAGES
          .map((_, index) => index)
          .filter((index) => index !== cycle.previousIndex)
      }

      const nextIndex = pickNextWaitMessageIndex(remaining, cycle.previousIndex)
      cycle.previousIndex = nextIndex
      cycle.remaining = remaining.filter((index) => index !== nextIndex)
      setMessageIndex(nextIndex)
    }

    cycle.previousStep = rotationStep
  }, [active, rotationStep])

  return (
    <div className="session-thinking__wait">
      <FourPointStarLoader className="session-thinking__wait-icon" label="正在思考" />
      <span className="session-thinking__wait-text">
        <span className="session-thinking__wait-time">{idleSeconds}s</span>
        <span className="session-thinking__wait-copy">{THINKING_WAIT_MESSAGES[messageIndex]}</span>
      </span>
    </div>
  )
}

function ThinkingStepIcon({ status }) {
  if (status === 'done') {
    return (
      <svg className="session-thinking-step__icon-svg" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="#c4cbd6" />
        <path
          d="M5.05 8.2 7 10.15l3.95-4.1"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    )
  }

  if (status === 'active') {
    return (
      <svg className="session-thinking-step__icon-svg" viewBox="0 0 16 16" aria-hidden="true">
        <defs>
          <linearGradient id="session-thinking-active-gradient" x1="2" y1="2" x2="14" y2="14">
            <stop offset="0%" stopColor="#7aa7ff" />
            <stop offset="55%" stopColor="#64c8ff" />
            <stop offset="100%" stopColor="#6f7cff" />
          </linearGradient>
        </defs>
        <circle
          className="session-thinking-step__spinner-track"
          cx="8"
          cy="8"
          r="5.5"
          fill="none"
          stroke="rgba(96, 132, 255, 0.18)"
          strokeWidth="2"
        />
        <circle
          className="session-thinking-step__spinner-ring"
          cx="8"
          cy="8"
          r="5.5"
          fill="none"
          stroke="url(#session-thinking-active-gradient)"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    )
  }

  return <span className="session-thinking-step__icon-dot" aria-hidden="true" />
}

function ThinkingStep({
  step,
  order = 0,
  status,
  descriptionLength = 0,
  codeLength = 0,
  showExtras = false,
  showCode = false,
  isStreamingText = false,
  isStreamingCode = false,
}) {
  const codeRef = useRef(null)
  const description = step.description ?? ''
  const code = step.code ?? ''
  const visibleDescription = description.slice(0, descriptionLength)
  const visibleCode = code.slice(0, codeLength)
  const hasBody = description || step.reads?.length || step.outputs?.length || code

  useEffect(() => {
    if (!showCode || !code) return undefined

    const node = codeRef.current
    if (!node) return undefined

    const frame = window.requestAnimationFrame(() => {
      node.scrollTop = node.scrollHeight
    })

    return () => window.cancelAnimationFrame(frame)
  }, [code, showCode, status, visibleCode])

  return (
    <section
      className={`session-thinking-step session-thinking-step--${status}`}
      style={{ '--thinking-step-order': order }}
    >
      <div className="session-thinking-step__head">
        <span className={`session-thinking-step__icon session-thinking-step__icon--${status}`} aria-hidden="true">
          <ThinkingStepIcon status={status} />
        </span>
        <div className="session-thinking-step__title-row">
          <span className="session-thinking-step__title">{step.title}</span>
          {step.skill ? (
            <span className={`session-thinking-step__skill session-thinking-step__skill--${step.skill.tone}`}>
              {step.skill.label}
            </span>
          ) : null}
        </div>
      </div>

      {hasBody ? (
        <div className="session-thinking-step__body">
          <span className="session-thinking-step__rail" aria-hidden="true" />
          <div className="session-thinking-step__content">
            {description ? (
              <p className="session-thinking-step__desc">
                {visibleDescription}
              </p>
            ) : null}
            {showExtras ? (
              <div className="session-thinking-step__extras session-thinking-step__reveal">
                <ThinkingFileRefs label="读取：" files={step.reads} />
                <ThinkingFileRefs label="产物：" files={step.outputs} />
              </div>
            ) : null}
            {showCode && code ? (
              <pre className="session-thinking-step__code session-thinking-step__reveal" ref={codeRef}>
                <code>
                  {visibleCode}
                </code>
              </pre>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}

function useThinkingStream({ isGenerating, userFiles, streamKey, steps }) {
  const [stream, setStream] = useState(INITIAL_STREAM)
  const streamRef = useRef(stream)
  streamRef.current = stream

  useEffect(() => {
    if (!isGenerating) {
      setStream((prev) => {
        if (prev.phase === 'idle') return prev
        return {
          ...prev,
          phase: 'stopped',
          headerStatus: '已停止生成',
        }
      })
      return undefined
    }

    let cancelled = false

    const patch = (next) => {
      if (cancelled) return
      setStream((prev) => {
        const value = typeof next === 'function' ? next(prev) : next
        const timestamp = Date.now()
        const nextValue =
          value && typeof value === 'object'
            ? {
                ...value,
                lastActivityAt: timestamp,
              }
            : value
        streamRef.current = nextValue
        return nextValue
      })
    }

    const run = async () => {
      patch({
        ...INITIAL_STREAM,
        phase: 'running',
        headerStatus: userFiles.length ? '正在接收文件...' : '正在工作...',
        startedAt: Date.now(),
        lastActivityAt: Date.now(),
      })

      if (userFiles.length) {
        await sleep(RECEIVE_FILE_MS)
        if (cancelled) return
        patch((prev) => ({
          ...prev,
          showFootnote: true,
          showWait: true,
        }))
      }

      for (let index = 0; index < steps.length; index += 1) {
        const step = steps[index]
        const hasExtras = Boolean(step.reads?.length || step.outputs?.length)
        const hasCode = Boolean(step.code)

        patch((prev) => ({
          ...prev,
          activeIndex: index,
          completedCount: index,
          headerStatus: step.title,
          descriptionLength: 0,
          codeLength: 0,
          showExtras: false,
          showCode: false,
          showWait: true,
        }))

        await sleep(120)

        const description = step.description ?? ''
        await streamTextByLength(
          description,
          (descriptionLength) => patch((prev) => ({ ...prev, descriptionLength })),
          { cancelled: () => cancelled },
        )

        if (hasExtras) {
          await sleep(EXTRAS_DELAY_MS)
          if (cancelled) return
          patch((prev) => ({ ...prev, showExtras: true }))
          await sleep(120)
        }

        if (hasCode) {
          if (cancelled) return
          patch((prev) => ({ ...prev, showCode: true, codeLength: 0 }))
          await sleep(90)
          await streamTextByLength(
            step.code,
            (codeLength) => patch((prev) => ({ ...prev, codeLength })),
            { isCode: true, cancelled: () => cancelled },
          )
        }

        patch((prev) => ({
          ...prev,
          completedCount: index + 1,
          activeIndex: -1,
        }))

        await sleep(STEP_PAUSE_MS)
      }

      if (cancelled) return
      patch((prev) => ({
        ...prev,
        phase: 'done',
        headerStatus: '思考完成',
        finishedAt: Date.now(),
      }))
    }

    run()

    return () => {
      cancelled = true
    }
  }, [isGenerating, steps, streamKey, userFiles.length])

  return stream
}

export default function SessionThread({
  userPrompt,
  userFiles = [],
  userSentAt,
  assistantName,
  assistantAvatar,
  isTransitioning = false,
  isGenerating,
  completedSessionMeta,
  onGenerationComplete,
}) {
  const [thinkingExpanded, setThinkingExpanded] = useState(false)
  const [thinkingCollapsed, setThinkingCollapsed] = useState(false)
  const [thinkingCollapsing, setThinkingCollapsing] = useState(false)
  const [showTopFade, setShowTopFade] = useState(false)
  const [frozenSummaryStatus, setFrozenSummaryStatus] = useState('')
  const [copyLabel, setCopyLabel] = useState('复制')
  const [isCopySuccess, setIsCopySuccess] = useState(false)
  const bodyRef = useRef(null)
  const autoCollapsedKeyRef = useRef('')
  const completionNotifiedKeyRef = useRef('')
  const collapseTimerRef = useRef(null)
  const copyResetTimerRef = useRef(null)
  const streamKey = `${userPrompt}:${userFiles.map((file) => file.id ?? file.name).join('|')}`
  const userMessageCopyText = useMemo(() => {
    const fileNames = userFiles.map((file) => file.name).filter(Boolean)
    if (userPrompt && fileNames.length) return `${userPrompt}\n${fileNames.join('\n')}`
    if (userPrompt) return userPrompt
    return fileNames.join('\n')
  }, [userFiles, userPrompt])
  const formattedUserSentAt = useMemo(() => formatUserSentAt(userSentAt), [userSentAt])
  const thinkingSteps = useMemo(
    () => createThinkingSteps({ userPrompt, userFiles }),
    [userFiles, userPrompt],
  )

  const stream = useThinkingStream({
    isGenerating,
    userFiles,
    streamKey,
    steps: thinkingSteps,
  })
  const completionRunKey = `${streamKey}:${stream.startedAt}`
  const isStaticCompletedView = Boolean(completedSessionMeta) && !isGenerating && !isTransitioning
  const staticCompletedSummary =
    completedSessionMeta?.summaryStatus ||
    formatThinkingSummary(thinkingSteps.length, Math.max(8000, (thinkingSteps.length + userFiles.length) * 1600))

  const visibleSteps = useMemo(() => {
    if (isStaticCompletedView) {
      return thinkingSteps.map((step) => ({
        step,
        status: 'done',
        descriptionLength: step.description?.length ?? 0,
        codeLength: step.code?.length ?? 0,
        showExtras: Boolean(step.reads?.length || step.outputs?.length),
        showCode: Boolean(step.code),
      }))
    }

    if (stream.phase === 'idle') return []

    const items = []
    const doneCount = Math.min(stream.completedCount, thinkingSteps.length)

    for (let index = 0; index < doneCount; index += 1) {
      items.push({
        step: thinkingSteps[index],
        status: 'done',
        descriptionLength: thinkingSteps[index].description?.length ?? 0,
        codeLength: thinkingSteps[index].code?.length ?? 0,
        showExtras: Boolean(
          thinkingSteps[index].reads?.length || thinkingSteps[index].outputs?.length,
        ),
        showCode: Boolean(thinkingSteps[index].code),
      })
    }

    if (stream.activeIndex >= 0 && stream.activeIndex < thinkingSteps.length) {
      items.push({
        step: thinkingSteps[stream.activeIndex],
        status: 'active',
        descriptionLength: stream.descriptionLength,
        codeLength: stream.codeLength,
        showExtras: stream.showExtras,
        showCode: stream.showCode,
        isStreamingText:
          isGenerating &&
          stream.descriptionLength < (thinkingSteps[stream.activeIndex].description?.length ?? 0),
        isStreamingCode:
          isGenerating &&
          stream.showCode &&
          stream.codeLength < (thinkingSteps[stream.activeIndex].code?.length ?? 0),
      })
    }

    return items
  }, [isGenerating, isStaticCompletedView, stream, thinkingSteps])

  const headerStatus =
    isStaticCompletedView
      ? staticCompletedSummary
      : stream.phase === 'stopped'
      ? '已停止生成'
      : stream.headerStatus || (userFiles.length ? '正在接收文件...' : '正在工作...')

  const showStatusShimmer = isGenerating && stream.phase !== 'done' && stream.phase !== 'stopped'
  const displayStatus = thinkingCollapsed && stream.phase === 'done' ? frozenSummaryStatus : headerStatus

  const clearCollapseTimer = useCallback(() => {
    if (!collapseTimerRef.current) return
    window.clearTimeout(collapseTimerRef.current)
    collapseTimerRef.current = null
  }, [])

  const startCollapseTransition = useCallback(
    ({ onComplete } = {}) => {
      clearCollapseTimer()
      setThinkingExpanded(false)
      setThinkingCollapsing(true)

      collapseTimerRef.current = window.setTimeout(() => {
        collapseTimerRef.current = null
        setThinkingCollapsing(false)
        setThinkingCollapsed(true)
        onComplete?.()
      }, MANUAL_COLLAPSE_TRANSITION_MS)
    },
    [clearCollapseTimer],
  )

  const handleCopyUserMessage = useCallback(async () => {
    if (!userMessageCopyText) return

    try {
      const copied = await copyTextToClipboard(userMessageCopyText)
      if (!copied) throw new Error('copy-failed')
      setCopyLabel('已添加')
      setIsCopySuccess(true)
      if (copyResetTimerRef.current) {
        window.clearTimeout(copyResetTimerRef.current)
      }
      copyResetTimerRef.current = window.setTimeout(() => {
        copyResetTimerRef.current = null
        setCopyLabel('复制')
        setIsCopySuccess(false)
      }, 3000)
    } catch {
      setCopyLabel('复制失败')
      setIsCopySuccess(false)
      if (copyResetTimerRef.current) {
        window.clearTimeout(copyResetTimerRef.current)
      }
      copyResetTimerRef.current = window.setTimeout(() => {
        copyResetTimerRef.current = null
        setCopyLabel('复制')
      }, 3000)
    }
  }, [userMessageCopyText])

  useEffect(() => {
    clearCollapseTimer()
    setThinkingExpanded(false)
    setThinkingCollapsed(isStaticCompletedView)
    setThinkingCollapsing(false)
    setFrozenSummaryStatus(isStaticCompletedView ? staticCompletedSummary : '')
    autoCollapsedKeyRef.current = ''
  }, [clearCollapseTimer, isStaticCompletedView, staticCompletedSummary, streamKey])

  useEffect(() => {
    if (isStaticCompletedView) return
    if (stream.phase !== 'running') return
    clearCollapseTimer()
    setThinkingCollapsed(false)
    setThinkingCollapsing(false)
    setFrozenSummaryStatus('')
    autoCollapsedKeyRef.current = ''
  }, [clearCollapseTimer, isStaticCompletedView, stream.phase])

  useEffect(() => {
    if (isStaticCompletedView) return
    if (stream.phase !== 'done' || !stream.finishedAt || !stream.startedAt) return

    setFrozenSummaryStatus(
      formatThinkingSummary(stream.completedCount, Math.max(0, stream.finishedAt - stream.startedAt)),
    )
  }, [isStaticCompletedView, stream.completedCount, stream.finishedAt, stream.phase, stream.startedAt])

  useEffect(() => {
    if (isStaticCompletedView) return
    if (stream.phase !== 'done' || completionNotifiedKeyRef.current === completionRunKey) return

    completionNotifiedKeyRef.current = completionRunKey
    onGenerationComplete?.({
      completedCount: stream.completedCount,
      durationMs: Math.max(0, stream.finishedAt - stream.startedAt),
      streamKey: completionRunKey,
    })
  }, [completionRunKey, isStaticCompletedView, onGenerationComplete, stream.completedCount, stream.finishedAt, stream.phase, stream.startedAt])

  useEffect(() => {
    if (isStaticCompletedView) return undefined
    if (
      stream.phase !== 'done' ||
      autoCollapsedKeyRef.current === streamKey ||
      thinkingCollapsed ||
      thinkingCollapsing
    ) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      startCollapseTransition({
        onComplete: () => {
          autoCollapsedKeyRef.current = streamKey
        },
      })
    }, AUTO_COLLAPSE_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [isStaticCompletedView, startCollapseTransition, stream.phase, streamKey, thinkingCollapsed, thinkingCollapsing])

  useEffect(
    () => () => {
      clearCollapseTimer()
      if (!copyResetTimerRef.current) return
      window.clearTimeout(copyResetTimerRef.current)
      copyResetTimerRef.current = null
    },
    [clearCollapseTimer],
  )

  useEffect(() => {
    const body = bodyRef.current
    if (!body || thinkingExpanded || thinkingCollapsed || !isGenerating) return
    body.scrollTop = body.scrollHeight
    setShowTopFade(body.scrollTop > 0)
  }, [
    isGenerating,
    visibleSteps,
    stream.descriptionLength,
    stream.codeLength,
    stream.showExtras,
    thinkingCollapsed,
    thinkingExpanded,
  ])

  useEffect(() => {
    const body = bodyRef.current
    if (!body || thinkingExpanded || thinkingCollapsed) {
      setShowTopFade(false)
      return undefined
    }

    const updateTopFade = () => {
      setShowTopFade(body.scrollTop > 0)
    }

    updateTopFade()
    body.addEventListener('scroll', updateTopFade, { passive: true })
    return () => body.removeEventListener('scroll', updateTopFade)
  }, [thinkingCollapsed, thinkingExpanded, visibleSteps, stream.descriptionLength, stream.codeLength, stream.showExtras])

  const showAssistantThinking = visibleSteps.length > 0 || isGenerating || isStaticCompletedView
  const handleToggleThinking = () => {
    if (thinkingCollapsed) {
      clearCollapseTimer()
      setThinkingCollapsed(false)
      setThinkingCollapsing(false)
      setThinkingExpanded(true)
      return
    }

    if (thinkingExpanded) {
      if (stream.phase === 'done' || isStaticCompletedView) {
        startCollapseTransition()
      } else {
        setThinkingExpanded(false)
      }
      return
    }

    setThinkingExpanded(true)
  }

  return (
    <div className="session-thread">
      <div className="session-thread__user-col">
        {userFiles.map((file) => (
          <div key={file.id ?? file.name} className="session-thread__user-file">
            <img src={file.icon} alt="" className="session-thread__user-file-icon" />
            <div className="session-thread__user-file-text">
              <span className="session-thread__user-file-name">{file.name}</span>
              {file.size ? <span className="session-thread__user-file-size">{file.size}</span> : null}
            </div>
          </div>
        ))}
        {userPrompt || formattedUserSentAt || userMessageCopyText ? (
          <div className="session-thread__user-entry">
            {userPrompt ? <div className="session-thread__user">{userPrompt}</div> : null}
            {formattedUserSentAt || userMessageCopyText ? (
              <div className="session-thread__user-meta">
                {formattedUserSentAt ? <span className="session-thread__user-time">{formattedUserSentAt}</span> : null}
                {userMessageCopyText ? (
                  <button
                    type="button"
                    className="session-thread__user-copy"
                    aria-label={copyLabel}
                    title={copyLabel}
                    onClick={handleCopyUserMessage}
                  >
                    {isCopySuccess ? <CopiedMessageIcon /> : <CopyMessageIcon />}
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {showAssistantThinking ? (
        <div className="session-thread__assistant">
          <div className="session-thread__assistant-head">
            <img src={assistantAvatar} alt="" className="session-thread__assistant-avatar" />
            <span>{assistantName}</span>
          </div>

          <div
            className={`session-thinking ${thinkingExpanded ? 'is-expanded' : ''} ${
              thinkingCollapsing ? 'is-collapsing' : ''
            } ${
              thinkingCollapsed ? 'is-collapsed' : ''
            } ${
              !isGenerating ? 'is-stopped' : ''
            }`}
          >
            <div className="session-thinking__card">
              <div className="session-thinking__header">
                <ThinkingStatus
                  text={displayStatus}
                  shimmering={showStatusShimmer && !thinkingCollapsed}
                />
                <button
                  type="button"
                  className="session-thinking__toggle"
                  aria-label={thinkingExpanded ? '收起思考过程' : '展开思考过程'}
                  aria-expanded={thinkingCollapsed ? false : thinkingExpanded}
                  onClick={handleToggleThinking}
                >
                  <span className="dora-icon icon-16" aria-hidden="true">
                    {thinkingExpanded ? ICONS.shrink : ICONS.expand}
                  </span>
                </button>
              </div>

              <div className="session-thinking__body" ref={bodyRef}>
                {showTopFade ? <div className="session-thinking__fade-top" aria-hidden="true" /> : null}
                <div className="session-thinking__steps">
                  {visibleSteps.map(({ step, ...renderState }, index) => (
                    <ThinkingStep key={step.id} step={step} order={index} {...renderState} />
                  ))}
                </div>
              </div>
            </div>

            {stream.showFootnote && stream.phase !== 'done' ? (
              <p className="session-thinking__footnote">用户上传了一份文件，正在读取</p>
            ) : null}

            {stream.showWait && isGenerating && stream.phase !== 'done' ? (
              <ThinkingWait active={stream.showWait && isGenerating} lastActivityAt={stream.lastActivityAt} />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
