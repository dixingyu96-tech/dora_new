/**
 * 从 dora_token 下的 Design Tokens 生成 CSS 变量
 * - Data agent.tokens.json → 语义层 (--fd-*)
 * - dora_Light.tokens.json → 00 Data agent 基色 (--dora-light-*)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const tokenDir = join(root, 'dora_token')
const outDir = join(root, 'src/styles/generated')

const dataAgent = JSON.parse(
  readFileSync(join(tokenDir, 'Data agent.tokens.json'), 'utf8'),
)
const doraLight = JSON.parse(
  readFileSync(join(tokenDir, 'dora_Light.tokens.json'), 'utf8'),
)

/** @param {unknown} obj */
function isTokenNode(obj) {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    '$value' in /** @type {Record<string, unknown>} */ (obj)
  )
}

/**
 * @param {unknown} node
 * @param {string[]} path
 * @returns {Map<string, object>}
 */
function flattenTokens(node, path = []) {
  /** @type {Map<string, object>} */
  const map = new Map()
  if (!node || typeof node !== 'object') return map

  for (const [key, value] of Object.entries(node)) {
    const nextPath = [...path, key]
    if (isTokenNode(value)) {
      map.set(nextPath.join('.'), value)
    } else if (value && typeof value === 'object') {
      for (const [k, v] of flattenTokens(value, nextPath)) {
        map.set(k, v)
      }
    }
  }
  return map
}

const agentFlat = flattenTokens(dataAgent)
const lightFlat = flattenTokens(doraLight)

/** @param {string} figmaPath e.g. "00 Data agent/品牌色/6" */
function figmaPathToDot(figmaPath) {
  return figmaPath.replace(/\//g, '.').trim()
}

/** @param {string} path */
function toKebab(path) {
  return path
    .replace(/[()（）]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/🔵/g, '')
    .replace(/[^\w\u4e00-\u9fff-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

/** @param {string} web */
function parseCssVarName(web) {
  const match = web.match(/var\(\s*(--[a-zA-Z0-9-]+)/)
  return match ? match[1] : null
}

/**
 * @param {unknown} value
 * @param {Set<string>} stack
 * @param {Map<string, object>} source
 */
function resolveValue(value, stack, source) {
  if (typeof value === 'number') {
    return { kind: 'dimension', css: `${value}px` }
  }
  if (typeof value === 'string') {
    const ref = value.match(/^\{(.+)\}$/)
    if (ref) {
      const refPath = ref[1]
      if (stack.has(refPath)) {
        throw new Error(`Circular reference: ${refPath}`)
      }
      const target = source.get(refPath)
      if (!target) {
        return { kind: 'missing', css: null, ref: refPath }
      }
      stack.add(refPath)
      const resolved = resolveValue(
        /** @type {{ $value: unknown }} */ (target).$value,
        stack,
        source,
      )
      stack.delete(refPath)
      return resolved
    }
    return { kind: 'raw', css: value }
  }
  if (value && typeof value === 'object') {
    const color = /** @type {{ components?: number[]; alpha?: number; hex?: string }} */ (
      value
    )
    if (Array.isArray(color.components) && color.components.length >= 3) {
      const [r, g, b] = color.components
      const alpha = color.alpha ?? 1
      const rr = Math.round(r * 255)
      const gg = Math.round(g * 255)
      const bb = Math.round(b * 255)
      if (alpha >= 1) {
        return { kind: 'color', css: color.hex ?? `rgb(${rr} ${gg} ${bb})` }
      }
      return {
        kind: 'color',
        css: `rgba(${rr}, ${gg}, ${bb}, ${Number(alpha.toFixed(4))})`,
      }
    }
  }
  return { kind: 'unknown', css: null }
}

/**
 * @param {object} token
 * @param {Map<string, object>} source
 */
function resolveToken(token, source) {
  return resolveValue(
    /** @type {{ $value: unknown }} */ (token).$value,
    new Set(),
    source,
  )
}

/** @type {Map<string, { css: string, tokenPath: string, score: number }>} */
const semanticVars = new Map()

/** @param {object} token @param {string} path */
function tokenPriority(token, path) {
  let score = 0
  if (token.$extensions?.['com.figma.hiddenFromPublishing']) score -= 100
  if (path.includes('品牌色.colorPrimary')) score += 50
  if (path.includes('品牌色.')) score += 20
  if (path.includes('colorControlOutline')) score -= 30
  return score
}

for (const [path, token] of agentFlat) {
  const web =
    token.$extensions?.['com.figma.codeSyntax']?.WEB ??
    token.$extensions?.['com.figma.codeSyntax']?.web
  if (!web) continue

  const varName = parseCssVarName(web)
  if (!varName) continue

  const resolved = resolveToken(token, agentFlat)
  if (!resolved.css) {
    console.warn(`[tokens] 无法解析 ${varName} (${path})`)
    continue
  }

  const entry = {
    css: resolved.css,
    tokenPath: path,
    score: tokenPriority(token, path),
  }
  const existing = semanticVars.get(varName)
  if (!existing || entry.score > existing.score) {
    semanticVars.set(varName, entry)
  }
}

/** @type {Map<string, string>} */
const lightPrimitives = new Map()

const lightRoot = doraLight['00 Data agent']
if (lightRoot) {
  const lightAgentFlat = flattenTokens(lightRoot, ['00 Data agent'])
  for (const [path, token] of lightAgentFlat) {
    if (/** @type {{ $type?: string }} */ (token).$type !== 'color') continue
    const resolved = resolveToken(token, lightAgentFlat)
    if (!resolved.css) continue
    const suffix = path.replace(/^00 Data agent\./, '')
    const varName = `--dora-light-${toKebab(suffix)}`
    lightPrimitives.set(varName, resolved.css)
  }
}

// 项目用到的 AI 描边（无 WEB codeSyntax，按路径补充语义别名）
const aiOutlinePath = '🔵颜色.AI业务色板.AiOutline.Defualt.GradientStop1'
const aiOutlineToken = agentFlat.get(aiOutlinePath)
if (aiOutlineToken) {
  const resolved = resolveToken(aiOutlineToken, agentFlat)
  if (resolved.css) {
    semanticVars.set('--fd-color-ai-outline-default', {
      css: resolved.css,
      tokenPath: aiOutlinePath,
    })
  }
}

// 盒子阴影（由投影色组合）
const shadow1 = agentFlat.get('🔵基础.盒子阴影.boxShadowSubtle.Color 1')
const shadow2 = agentFlat.get('🔵基础.盒子阴影.boxShadowSubtle.Color 2')
if (shadow1 && shadow2) {
  const c1 = resolveToken(shadow1, agentFlat).css
  const c2 = resolveToken(shadow2, agentFlat).css
  if (c1 && c2) {
    semanticVars.set('--fd-shadow-subtle', {
      css: `0 0 2px ${c1}, 0 1px 4px ${c2}`,
      tokenPath: 'boxShadowSubtle',
    })
  }
}

mkdirSync(outDir, { recursive: true })

const semanticLines = [
  '/* 自动生成：dora_token/Data agent.tokens.json */',
  ':root {',
]
const sortedSemantic = [...semanticVars.entries()].sort(([a], [b]) =>
  a.localeCompare(b),
)
for (const [name, { css }] of sortedSemantic) {
  semanticLines.push(`  ${name}: ${css};`)
}
semanticLines.push('}', '')

const primitiveLines = [
  '/* 自动生成：dora_token/dora_Light.tokens.json → 00 Data agent 色板 */',
  ':root {',
]
const sortedPrimitives = [...lightPrimitives.entries()].sort(([a], [b]) =>
  a.localeCompare(b),
)
for (const [name, css] of sortedPrimitives) {
  primitiveLines.push(`  ${name}: ${css};`)
}
primitiveLines.push('}', '')

writeFileSync(join(outDir, 'semantic.data-agent.css'), semanticLines.join('\n'))
writeFileSync(join(outDir, 'primitives.dora-light.css'), primitiveLines.join('\n'))

console.log(
  `✓ 语义 token ${semanticVars.size} 个 → src/styles/generated/semantic.data-agent.css`,
)
console.log(
  `✓ 基色 token ${lightPrimitives.size} 个 → src/styles/generated/primitives.dora-light.css`,
)
