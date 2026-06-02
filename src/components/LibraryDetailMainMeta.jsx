import { useEffect, useRef, useState } from 'react'
import IconButton from './IconButton'

const META_GAP = 8
const FILE_ICON_WIDTH = 24
const FILE_ROW_GAP = 4
const SOURCE_ICON_ONLY_SIZE = 24

export default function LibraryDetailMainMeta({
  fileIconSrc,
  fileTitle,
  sourceOwner,
  sourceOwnerIcon,
  sourceHistoryId,
  onOpenSourceHistory,
}) {
  const metaRef = useRef(null)
  const fileTitleMeasureRef = useRef(null)
  const sourceTagMeasureRef = useRef(null)
  const [sourceIconOnly, setSourceIconOnly] = useState(false)
  const [fileTruncate, setFileTruncate] = useState(false)

  useEffect(() => {
    const meta = metaRef.current
    if (!meta) return undefined

    const updateLayout = () => {
      const available = meta.clientWidth
      const titleWidth = fileTitleMeasureRef.current?.offsetWidth ?? 0
      const fileRowWidth = FILE_ICON_WIDTH + FILE_ROW_GAP + titleWidth
      const sourceFullWidth = sourceOwner ? sourceTagMeasureRef.current?.offsetWidth ?? SOURCE_ICON_ONLY_SIZE : 0
      const gap = sourceOwner ? META_GAP : 0

      if (!sourceOwner || fileRowWidth + gap + sourceFullWidth <= available) {
        setSourceIconOnly(false)
        setFileTruncate(false)
        return
      }

      if (fileRowWidth + gap + SOURCE_ICON_ONLY_SIZE <= available) {
        setSourceIconOnly(true)
        setFileTruncate(false)
        return
      }

      setSourceIconOnly(true)
      setFileTruncate(true)
    }

    const observer = new ResizeObserver(updateLayout)
    observer.observe(meta)
    updateLayout()

    return () => observer.disconnect()
  }, [fileTitle, sourceOwner, sourceOwnerIcon])

  return (
    <div className="library-detail-main__meta" ref={metaRef}>
      <div
        className={`library-detail-main__file-row${fileTruncate ? ' library-detail-main__file-row--truncate' : ''}`}
      >
        {fileIconSrc ? <img src={fileIconSrc} alt="" className="library-detail-main__file-icon" /> : null}
        <span className={`library-detail-main__file${fileTruncate ? ' is-truncated' : ''}`}>{fileTitle}</span>
      </div>

      {sourceOwner ? (
        <IconButton
          tip="查看来源对话"
          className={`library-detail-main__source${sourceIconOnly ? ' library-detail-main__source--icon-only' : ''}`}
          aria-label={`查看来源对话：${sourceOwner}`}
          disabled={!sourceHistoryId}
          onClick={onOpenSourceHistory}
        >
          <img src={sourceOwnerIcon} alt="" className="library-detail-main__source-icon" />
          <span className="library-detail-main__source-label">{sourceOwner}</span>
        </IconButton>
      ) : null}

      <div className="library-detail-main__measure" aria-hidden="true">
        <span ref={fileTitleMeasureRef} className="library-detail-main__file library-detail-main__file--measure">
          {fileTitle}
        </span>
        {sourceOwner ? (
          <span ref={sourceTagMeasureRef} className="library-detail-main__source library-detail-main__source--measure">
            <img src={sourceOwnerIcon} alt="" className="library-detail-main__source-icon" />
            <span className="library-detail-main__source-label">{sourceOwner}</span>
          </span>
        ) : null}
      </div>
    </div>
  )
}
