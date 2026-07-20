export default function SessionPptPreview({ slides, activeIndex, onActiveIndexChange }) {
  const safeIndex = Math.min(Math.max(activeIndex, 0), slides.length - 1)
  const activeSlide = slides[safeIndex]

  return (
    <div className="session-ppt-preview">
      <aside className="session-ppt-preview__sidebar" aria-label="幻灯片缩略图">
        {slides.map((slide, index) => {
          const isActive = index === safeIndex

          return (
            <button
              key={`ppt-slide-${index + 1}`}
              type="button"
              className={`session-ppt-preview__thumb-row${isActive ? ' is-active' : ''}`}
              aria-label={`第 ${index + 1} 页`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onActiveIndexChange(index)}
            >
              <span className="session-ppt-preview__thumb-index">{index + 1}</span>
              <span className={`session-ppt-preview__thumb-frame${isActive ? ' is-active' : ''}`}>
                <span className="session-ppt-preview__thumb-card">
                  <span className="session-ppt-preview__thumb-image-wrap">
                    <img src={slide} alt="" />
                  </span>
                </span>
              </span>
            </button>
          )
        })}
      </aside>

      <div className="session-ppt-preview__stage">
        <div className="session-ppt-preview__slide">
          <img src={activeSlide} alt={`第 ${safeIndex + 1} 页`} />
        </div>
      </div>
    </div>
  )
}
