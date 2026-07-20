import { marked } from 'marked'

const stripMarkdownInline = (text) =>
  text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .trim()

export const slugifyMarkdownHeading = (text) => {
  const slug = stripMarkdownInline(text)
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'section'
}

export const extractMarkdownHeadings = (markdown) => {
  const headings = []
  const idCounts = new Map()

  markdown.split('\n').forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (!match) return

    const level = match[1].length
    const text = stripMarkdownInline(match[2])
    const baseId = slugifyMarkdownHeading(text)
    const count = idCounts.get(baseId) ?? 0
    idCounts.set(baseId, count + 1)
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`

    headings.push({ level, text, id })
  })

  return headings
}

export const parseSessionMarkdownHtml = (markdown) => {
  const headings = extractMarkdownHeadings(markdown)
  const html = marked.parse(markdown)

  if (!headings.length) return html

  let index = 0
  return html.replace(/<h([1-6])([^>]*)>/g, (match, level, attrs) => {
    if (index >= headings.length) return match
    if (Number(level) !== headings[index].level) return match
    if (/\sid=/.test(attrs)) {
      index += 1
      return match
    }

    const { id } = headings[index]
    index += 1
    return `<h${level} id="${id}"${attrs}>`
  })
}
