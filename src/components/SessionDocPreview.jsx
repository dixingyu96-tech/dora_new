import { useEffect, useRef } from 'react'

export default function SessionDocPreview({ pages, activeIndex, onActiveIndexChange }) {
  const safeIndex = Math.min(Math.max(activeIndex, 0), pages.length - 1)
  const pageRefs = useRef([])

  useEffect(() => {
    const target = pageRefs.current[safeIndex]
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [safeIndex])

  return (
    <div className="session-doc-preview">
      <aside className="session-doc-preview__sidebar" aria-label="文档页缩略图">
        {pages.map((page, index) => {
          const isActive = index === safeIndex

          return (
            <button
              key={`doc-page-${index + 1}`}
              type="button"
              className={`session-doc-preview__thumb-row${isActive ? ' is-active' : ''}`}
              aria-label={`第 ${index + 1} 页`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onActiveIndexChange(index)}
            >
              <span className="session-doc-preview__thumb-index">{index + 1}</span>
              <span className={`session-doc-preview__thumb-frame${isActive ? ' is-active' : ''}`}>
                <span className="session-doc-preview__thumb-card">
                  <span className="session-doc-preview__thumb-image-wrap">
                    <img src={page} alt="" />
                  </span>
                </span>
              </span>
            </button>
          )
        })}
      </aside>

      <div className="session-doc-preview__stage">
        {pages.map((page, index) => (
          <div
            key={`doc-stage-page-${index + 1}`}
            ref={(node) => {
              pageRefs.current[index] = node
            }}
            className={`session-doc-preview__page${index === 0 ? ' session-doc-preview__page--first' : ''}`}
          >
            <img src={page} alt={`第 ${index + 1} 页`} />
          </div>
        ))}
      </div>
    </div>
  )
}
