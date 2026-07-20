import { useRef } from 'react'
import IconButton from './IconButton'

export default function SessionMarkdownPreview({ html, headings, tocOpen, onTocOpenChange, icons }) {
  const scrollRef = useRef(null)

  const tocHeadings = headings.filter((heading) => heading.level >= 2)

  const handleHeadingClick = (id) => {
    const root = scrollRef.current?.closest('.session-files-panel__detail-body') ?? scrollRef.current
    const target = root?.querySelector(`#${CSS.escape(id)}`)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      ref={scrollRef}
      className={`session-markdown-preview${tocOpen ? ' session-markdown-preview--toc-open' : ''}`}
    >
      <div className="session-markdown-preview__main">
        {!tocOpen ? (
          <IconButton
            tip="展开目录"
            className="session-markdown-preview__toc-toggle"
            aria-label="展开目录"
            aria-expanded={false}
            onClick={() => onTocOpenChange(true)}
          >
            <span className="dora-icon icon-16" aria-hidden="true">
              {icons.catalog}
            </span>
          </IconButton>
        ) : null}
        <article
          className="library-detail-markdown session-files-panel__markdown"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {tocOpen ? (
        <aside className="session-markdown-preview__toc" aria-label="文档目录">
          <div className="session-markdown-preview__toc-head">
            <span className="session-markdown-preview__toc-title">目录</span>
            <IconButton
              tip="收起目录"
              className="session-markdown-preview__toc-collapse"
              aria-label="收起目录"
              aria-expanded
              onClick={() => onTocOpenChange(false)}
            >
              <span className="dora-icon icon-16" aria-hidden="true">
                {icons.collapseCatalog}
              </span>
            </IconButton>
          </div>
          <nav className="session-markdown-preview__toc-list">
            {tocHeadings.map((heading) => (
              <button
                key={heading.id}
                type="button"
                className={`session-markdown-preview__toc-item session-markdown-preview__toc-item--level-${heading.level}`}
                onClick={() => handleHeadingClick(heading.id)}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </aside>
      ) : null}
    </div>
  )
}
