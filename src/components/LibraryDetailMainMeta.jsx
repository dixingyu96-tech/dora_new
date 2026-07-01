export default function LibraryDetailMainMeta({ fileIconSrc, fileTitle }) {
  return (
    <div className="library-detail-main__meta">
      <div className="library-detail-main__file-row">
        {fileIconSrc ? <img src={fileIconSrc} alt="" className="library-detail-main__file-icon" /> : null}
        <span className="library-detail-main__file">{fileTitle}</span>
      </div>
    </div>
  )
}
