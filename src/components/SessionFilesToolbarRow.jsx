import { useEffect, useRef, useState } from 'react'
import IconButton from './IconButton'

const SEARCH_FIELD_WIDTH = 200

export default function SessionFilesToolbarRow({
  rowClassName = 'session-files-panel__toolbar-row',
  filtersAriaLabel,
  searchValue,
  onSearchChange,
  searchPlaceholder = '搜索名称',
  searchIcon,
  collapseSearch = false,
  children,
}) {
  const rowRef = useRef(null)
  const filtersRef = useRef(null)
  const searchInputRef = useRef(null)
  const filtersNaturalWidthRef = useRef(0)
  const searchOpenRef = useRef(false)
  const [compact, setCompact] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  searchOpenRef.current = searchOpen

  useEffect(() => {
    const row = rowRef.current
    const filtersEl = filtersRef.current
    if (!row || !filtersEl) return undefined

    const updateCompact = () => {
      const gap = Number.parseFloat(getComputedStyle(row).columnGap || getComputedStyle(row).gap) || 8
      const isSearchOpen = searchOpenRef.current

      if (!isSearchOpen) {
        filtersNaturalWidthRef.current = filtersEl.scrollWidth
      }

      const filtersWidth = isSearchOpen ? filtersNaturalWidthRef.current : filtersEl.scrollWidth
      const requiredForInlineSearch = filtersWidth + SEARCH_FIELD_WIDTH + gap
      const nextCompact = isSearchOpen || collapseSearch || row.clientWidth < requiredForInlineSearch

      setCompact((prev) => {
        if (!nextCompact && prev && !isSearchOpen) setSearchOpen(false)
        return nextCompact
      })
    }

    const observer = new ResizeObserver(updateCompact)
    observer.observe(row)
    observer.observe(filtersEl)
    updateCompact()

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!searchOpen) return undefined
    const frame = requestAnimationFrame(() => searchInputRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [searchOpen])

  useEffect(() => {
    if (!compact || !searchOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }

    const onPointerDown = (event) => {
      if (event.target instanceof Node && rowRef.current?.contains(event.target)) return
      setSearchOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [compact, searchOpen])

  const showSearchField = !compact || searchOpen
  const hasSearchValue = Boolean(searchValue.trim())

  return (
    <div
      ref={rowRef}
      className={`${rowClassName}${compact ? ' is-compact' : ''}${compact && searchOpen ? ' is-search-open' : ''}`}
    >
      <div ref={filtersRef} className="session-files-panel__filters" role="tablist" aria-label={filtersAriaLabel}>
        {children}
      </div>
      {showSearchField ? (
        <label className="session-files-panel__search">
          <span className="dora-icon session-files-panel__search-icon" aria-hidden="true">
            {searchIcon}
          </span>
          <input
            ref={searchInputRef}
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            type="search"
            className="session-files-panel__search-input"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
          />
        </label>
      ) : (
        <IconButton
          tip="搜索"
          className={`icon-btn session-files-panel__search-toggle${hasSearchValue ? ' has-value' : ''}`}
          aria-label="搜索"
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen(true)}
        >
          <span className="dora-icon icon-16" aria-hidden="true">
            {searchIcon}
          </span>
        </IconButton>
      )}
    </div>
  )
}
