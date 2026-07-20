import { useEffect, useState } from 'react'
import IconButton from './IconButton'

const clampZoom = (value) => Math.min(200, Math.max(25, value))

export default function SessionPdfPreview({
  pages,
  coverPage,
  contentPage,
  totalPages,
  activeIndex,
  onActiveIndexChange,
  icons,
}) {
  const safeIndex = Math.min(Math.max(activeIndex, 0), totalPages - 1)
  const [zoom, setZoom] = useState(55)
  const [pageInput, setPageInput] = useState(String(safeIndex + 1))

  useEffect(() => {
    setPageInput(String(safeIndex + 1))
  }, [safeIndex])

  const currentPageImage = safeIndex === 0 ? coverPage : contentPage

  const commitPageInput = () => {
    const parsed = Number.parseInt(pageInput, 10)
    if (Number.isNaN(parsed)) {
      setPageInput(String(safeIndex + 1))
      return
    }
    const nextIndex = Math.min(Math.max(parsed, 1), totalPages) - 1
    onActiveIndexChange(nextIndex)
    setPageInput(String(nextIndex + 1))
  }

  return (
    <div className="session-pdf-preview">
      <aside className="session-doc-preview__sidebar" aria-label="PDF 页缩略图">
        {pages.map((page, index) => {
          const isActive = index === safeIndex && safeIndex < pages.length

          return (
            <button
              key={`pdf-thumb-${index + 1}`}
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

      <div className="session-pdf-preview__main">
        <div className="session-pdf-preview__stage">
          <div
            className="session-pdf-preview__page"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <img src={currentPageImage} alt={`第 ${safeIndex + 1} 页`} />
          </div>
        </div>

        <div className="session-pdf-preview__toolbar" role="toolbar" aria-label="PDF 预览工具栏">
          <div className="session-pdf-preview__pager">
            <input
              className="session-pdf-preview__page-input"
              value={pageInput}
              onChange={(event) => setPageInput(event.target.value)}
              onBlur={commitPageInput}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  commitPageInput()
                }
              }}
              inputMode="numeric"
              aria-label="当前页码"
            />
            <span className="session-pdf-preview__pager-divider">/</span>
            <span className="session-pdf-preview__page-total">{totalPages}</span>
          </div>

          <span className="session-pdf-preview__toolbar-split" aria-hidden="true" />

          <div className="session-pdf-preview__zoom">
            <IconButton
              tip="缩小"
              className="session-pdf-preview__toolbar-btn"
              aria-label="缩小"
              onClick={() => setZoom((prev) => clampZoom(prev - 10))}
            >
              <span className="dora-icon icon-16" aria-hidden="true">
                {icons.zoomOut}
              </span>
            </IconButton>
            <span className="session-pdf-preview__zoom-value">{zoom}%</span>
            <IconButton
              tip="放大"
              className="session-pdf-preview__toolbar-btn"
              aria-label="放大"
              onClick={() => setZoom((prev) => clampZoom(prev + 10))}
            >
              <span className="dora-icon icon-16" aria-hidden="true">
                {icons.zoomIn}
              </span>
            </IconButton>
          </div>

          <span className="session-pdf-preview__toolbar-split" aria-hidden="true" />

          <IconButton
            tip="适应页面"
            className="session-pdf-preview__toolbar-btn"
            aria-label="适应页面"
            onClick={() => setZoom(55)}
          >
            <span className="dora-icon icon-16" aria-hidden="true">
              {icons.fitPage}
            </span>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
