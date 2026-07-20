import { useCallback, useEffect, useRef, useState } from 'react'

const MAX_HISTORY = 100

const wrapSelection = (value, selectionStart, selectionEnd, before, after = before) => {
  const selected = value.slice(selectionStart, selectionEnd)
  const nextValue = `${value.slice(0, selectionStart)}${before}${selected}${after}${value.slice(selectionEnd)}`
  const nextStart = selectionStart + before.length
  const nextEnd = nextStart + selected.length
  return { nextValue, nextStart, nextEnd }
}

const prefixLines = (value, selectionStart, selectionEnd, prefix) => {
  const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
  const lineEndRaw = value.indexOf('\n', selectionEnd)
  const lineEnd = lineEndRaw === -1 ? value.length : lineEndRaw
  const block = value.slice(lineStart, lineEnd)
  const nextBlock = block
    .split('\n')
    .map((line) => `${prefix}${line}`)
    .join('\n')
  const nextValue = `${value.slice(0, lineStart)}${nextBlock}${value.slice(lineEnd)}`
  return {
    nextValue,
    nextStart: lineStart,
    nextEnd: lineStart + nextBlock.length,
  }
}

const adjustIndent = (value, selectionStart, selectionEnd, delta) => {
  const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
  const lineEndRaw = value.indexOf('\n', selectionEnd)
  const lineEnd = lineEndRaw === -1 ? value.length : lineEndRaw
  const block = value.slice(lineStart, lineEnd)
  const nextBlock = block
    .split('\n')
    .map((line) => {
      if (delta < 0) {
        if (line.startsWith('  ')) return line.slice(2)
        if (line.startsWith('\t')) return line.slice(1)
        return line
      }
      return `  ${line}`
    })
    .join('\n')
  const nextValue = `${value.slice(0, lineStart)}${nextBlock}${value.slice(lineEnd)}`
  return {
    nextValue,
    nextStart: lineStart,
    nextEnd: lineStart + nextBlock.length,
  }
}

export default function SessionMarkdownEditor({ value, onChange, icons }) {
  const textareaRef = useRef(null)
  const historyRef = useRef({ stack: [value], index: 0 })
  const skipHistoryRef = useRef(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  const syncHistoryFlags = useCallback(() => {
    const { stack, index } = historyRef.current
    setCanUndo(index > 0)
    setCanRedo(index < stack.length - 1)
  }, [])

  const commitValue = useCallback(
    (nextValue, selectionStart, selectionEnd) => {
      onChange(nextValue)
      if (!skipHistoryRef.current) {
        const { stack, index } = historyRef.current
        const nextStack = [...stack.slice(0, index + 1), nextValue].slice(-MAX_HISTORY)
        historyRef.current = { stack: nextStack, index: nextStack.length - 1 }
        syncHistoryFlags()
      }
      skipHistoryRef.current = false

      requestAnimationFrame(() => {
        const textarea = textareaRef.current
        if (!textarea) return
        textarea.focus()
        textarea.setSelectionRange(selectionStart, selectionEnd)
      })
    },
    [onChange, syncHistoryFlags],
  )

  const syncTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [])

  useEffect(() => {
    syncTextareaHeight()
  }, [value, syncTextareaHeight])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const applyEdit = useCallback(
    (editFn) => {
      const textarea = textareaRef.current
      if (!textarea) return
      const { selectionStart, selectionEnd } = textarea
      const result = editFn(value, selectionStart, selectionEnd)
      if (!result) return
      commitValue(result.nextValue, result.nextStart, result.nextEnd)
    },
    [commitValue, value],
  )

  const handleChange = (event) => {
    const nextValue = event.target.value
    onChange(nextValue)
    if (!skipHistoryRef.current) {
      const { stack, index } = historyRef.current
      const nextStack = [...stack.slice(0, index + 1), nextValue].slice(-MAX_HISTORY)
      historyRef.current = { stack: nextStack, index: nextStack.length - 1 }
      syncHistoryFlags()
    }
    skipHistoryRef.current = false
  }

  const handleUndo = () => {
    const { stack, index } = historyRef.current
    if (index <= 0) return
    const nextIndex = index - 1
    historyRef.current = { stack, index: nextIndex }
    skipHistoryRef.current = true
    onChange(stack[nextIndex])
    syncHistoryFlags()
  }

  const handleRedo = () => {
    const { stack, index } = historyRef.current
    if (index >= stack.length - 1) return
    const nextIndex = index + 1
    historyRef.current = { stack, index: nextIndex }
    skipHistoryRef.current = true
    onChange(stack[nextIndex])
    syncHistoryFlags()
  }

  const toolbarButtonClassName = 'session-markdown-editor__tool-btn'

  return (
    <div className="session-markdown-editor">
      <div className="session-markdown-editor__toolbar" role="toolbar" aria-label="Markdown 编辑工具栏">
        <div className="session-markdown-editor__toolbar-group">
          <button
            type="button"
            className={toolbarButtonClassName}
            aria-label="撤销"
            disabled={!canUndo}
            onClick={handleUndo}
          >
            <span className="dora-icon icon-16" aria-hidden="true">
              {icons.undo}
            </span>
          </button>
          <button
            type="button"
            className={toolbarButtonClassName}
            aria-label="还原"
            disabled={!canRedo}
            onClick={handleRedo}
          >
            <span className="dora-icon icon-16" aria-hidden="true">
              {icons.redo}
            </span>
          </button>
          <span className="session-markdown-editor__toolbar-divider" aria-hidden="true" />
          <button type="button" className={`${toolbarButtonClassName} session-markdown-editor__tool-btn--text`}>
            正文
          </button>
          <button
            type="button"
            className={toolbarButtonClassName}
            aria-label="加粗"
            onClick={() => applyEdit((source, start, end) => wrapSelection(source, start, end, '**'))}
          >
            <span className="dora-icon icon-16" aria-hidden="true">
              {icons.bold}
            </span>
          </button>
          <button
            type="button"
            className={toolbarButtonClassName}
            aria-label="无序列表"
            onClick={() => applyEdit((source, start, end) => prefixLines(source, start, end, '- '))}
          >
            <span className="dora-icon icon-16" aria-hidden="true">
              {icons.bulletList}
            </span>
          </button>
          <button
            type="button"
            className={toolbarButtonClassName}
            aria-label="有序列表"
            onClick={() => applyEdit((source, start, end) => prefixLines(source, start, end, '1. '))}
          >
            <span className="dora-icon icon-16" aria-hidden="true">
              {icons.orderedList}
            </span>
          </button>
          <button
            type="button"
            className={toolbarButtonClassName}
            aria-label="减少缩进"
            onClick={() => applyEdit((source, start, end) => adjustIndent(source, start, end, -1))}
          >
            <span className="dora-icon icon-16" aria-hidden="true">
              {icons.outdent}
            </span>
          </button>
          <button
            type="button"
            className={toolbarButtonClassName}
            aria-label="增加缩进"
            onClick={() => applyEdit((source, start, end) => adjustIndent(source, start, end, 1))}
          >
            <span className="dora-icon icon-16" aria-hidden="true">
              {icons.indent}
            </span>
          </button>
        </div>
      </div>

      <div className="session-markdown-editor__scroll">
        <div className="session-markdown-editor__surface">
          <textarea
            ref={textareaRef}
            className="session-markdown-editor__textarea"
            value={value}
            onChange={handleChange}
            spellCheck={false}
            aria-label="Markdown 内容"
          />
        </div>
      </div>
    </div>
  )
}
