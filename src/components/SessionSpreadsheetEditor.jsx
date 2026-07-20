import { useCallback, useState } from 'react'

const DEFAULT_COLUMN_WIDTH = 140
const DEFAULT_ROW_HEIGHT = 36
const MIN_COLUMN_WIDTH = 80
const MIN_ROW_HEIGHT = 28
const INDEX_COLUMN_WIDTH = 40
const HEADER_ROW_HEIGHT = 36

export const createSessionSpreadsheetEditState = (sheet) => {
  const { columns, rows } = sheet

  return {
    columns: [...columns],
    rows: rows.map((row) => [...row]),
    columnWidths:
      sheet.columnWidths?.length === columns.length
        ? [...sheet.columnWidths]
        : columns.map(() => DEFAULT_COLUMN_WIDTH),
    rowHeights:
      sheet.rowHeights?.length === rows.length
        ? [...sheet.rowHeights]
        : rows.map(() => DEFAULT_ROW_HEIGHT),
  }
}

export const mergeSpreadsheetSheetWithEditDraft = (sheet, draft) => ({
  ...sheet,
  columns: [...draft.columns],
  rows: draft.rows.map((row) => [...row]),
  columnWidths: [...draft.columnWidths],
  rowHeights: [...draft.rowHeights],
  totalRows: draft.rows.length,
})

export const getSpreadsheetColumnWidths = (sheet) =>
  sheet.columnWidths?.length === sheet.columns.length
    ? sheet.columnWidths
    : sheet.columns.map(() => DEFAULT_COLUMN_WIDTH)

export const getSpreadsheetRowHeights = (sheet, rowCount = sheet.rows.length) => {
  if (sheet.rowHeights?.length >= rowCount) {
    return sheet.rowHeights.slice(0, rowCount)
  }

  return Array.from({ length: rowCount }, () => DEFAULT_ROW_HEIGHT)
}

export const getSpreadsheetMinWidth = (sheet) => {
  const columnWidths = getSpreadsheetColumnWidths(sheet)
  return INDEX_COLUMN_WIDTH + columnWidths.reduce((sum, width) => sum + width, 0)
}

const columnIndexToLabel = (index) => {
  let label = ''
  let value = index

  while (value >= 0) {
    label = String.fromCharCode(65 + (value % 26)) + label
    value = Math.floor(value / 26) - 1
  }

  return label
}

const getColumnGuideOffset = (columnIndex, columnWidths) =>
  INDEX_COLUMN_WIDTH + columnWidths.slice(0, columnIndex + 1).reduce((sum, width) => sum + width, 0) - 1

const getRowGuideOffset = (rowIndex, rowHeights) =>
  HEADER_ROW_HEIGHT + rowHeights.slice(0, rowIndex + 1).reduce((sum, height) => sum + height, 0) - 1

export default function SessionSpreadsheetEditor({ value, onChange, createIcon }) {
  const { columns, rows, columnWidths, rowHeights } = value
  const [selectedCell, setSelectedCell] = useState(null)
  const [resizeGuide, setResizeGuide] = useState(null)

  const updateValue = useCallback(
    (patch) => {
      onChange({ ...value, ...patch })
    },
    [onChange, value],
  )

  const handleCellInput = (rowIndex, colIndex, text) => {
    const nextRows = rows.map((row, rowIdx) =>
      rowIdx === rowIndex ? row.map((cell, cellIdx) => (cellIdx === colIndex ? text : cell)) : row,
    )
    updateValue({ rows: nextRows })
  }

  const handleAddColumn = () => {
    updateValue({
      columns: [...columns, columnIndexToLabel(columns.length)],
      rows: rows.map((row) => [...row, '']),
      columnWidths: [...columnWidths, DEFAULT_COLUMN_WIDTH],
    })
  }

  const handleAddRow = () => {
    updateValue({
      rows: [...rows, columns.map(() => '')],
      rowHeights: [...rowHeights, DEFAULT_ROW_HEIGHT],
    })
  }

  const startColumnResize = (columnIndex, event) => {
    event.preventDefault()
    event.stopPropagation()

    const startX = event.clientX
    const startWidth = columnWidths[columnIndex]
    setResizeGuide({ type: 'column', index: columnIndex })

    const handleMove = (moveEvent) => {
      const nextWidth = Math.max(MIN_COLUMN_WIDTH, startWidth + moveEvent.clientX - startX)
      updateValue({
        columnWidths: columnWidths.map((width, index) => (index === columnIndex ? nextWidth : width)),
      })
    }

    const handleUp = () => {
      setResizeGuide(null)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }

  const startRowResize = (rowIndex, event) => {
    event.preventDefault()
    event.stopPropagation()

    const startY = event.clientY
    const startHeight = rowHeights[rowIndex]
    setResizeGuide({ type: 'row', index: rowIndex })

    const handleMove = (moveEvent) => {
      const nextHeight = Math.max(MIN_ROW_HEIGHT, startHeight + moveEvent.clientY - startY)
      updateValue({
        rowHeights: rowHeights.map((height, index) => (index === rowIndex ? nextHeight : height)),
      })
    }

    const handleUp = () => {
      setResizeGuide(null)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }

  const editorClassName = [
    'session-spreadsheet-editor',
    resizeGuide?.type === 'column' ? 'session-spreadsheet-editor--resizing-column' : '',
    resizeGuide?.type === 'row' ? 'session-spreadsheet-editor--resizing-row' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={editorClassName}>
      <div className="session-spreadsheet-editor__row session-spreadsheet-editor__row--head">
        <div className="session-spreadsheet-editor__cell session-spreadsheet-editor__cell--corner" aria-hidden="true" />
        {columns.map((column, columnIndex) => (
          <div
            key={`column-${column}-${columnIndex}`}
            className="session-spreadsheet-editor__cell session-spreadsheet-editor__cell--column-head"
            style={{ width: columnWidths[columnIndex], flex: `0 0 ${columnWidths[columnIndex]}px` }}
          >
            <span>{column}</span>
            <span
              className="session-spreadsheet-editor__resize-handle session-spreadsheet-editor__resize-handle--column"
              role="separator"
              aria-orientation="vertical"
              aria-label={`调整${column}列宽度`}
              onMouseDown={(event) => startColumnResize(columnIndex, event)}
            />
          </div>
        ))}
        <div className="session-spreadsheet-editor__cell session-spreadsheet-editor__cell--add-column">
          <button type="button" className="session-spreadsheet-editor__add-btn" aria-label="新增列" onClick={handleAddColumn}>
            <span className="dora-icon icon-16" aria-hidden="true">
              {createIcon}
            </span>
          </button>
        </div>
      </div>

      {rows.map((cells, rowIndex) => (
        <div
          key={`editor-row-${rowIndex}`}
          className="session-spreadsheet-editor__row"
          style={{ height: rowHeights[rowIndex], minHeight: rowHeights[rowIndex] }}
        >
          <div
            className="session-spreadsheet-editor__cell session-spreadsheet-editor__cell--index"
            style={{ height: rowHeights[rowIndex], minHeight: rowHeights[rowIndex] }}
          >
            <span>{rowIndex + 1}</span>
            <span
              className="session-spreadsheet-editor__resize-handle session-spreadsheet-editor__resize-handle--row"
              role="separator"
              aria-orientation="horizontal"
              aria-label={`调整第${rowIndex + 1}行高度`}
              onMouseDown={(event) => startRowResize(rowIndex, event)}
            />
          </div>
          {cells.map((cell, columnIndex) => {
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === columnIndex

            return (
              <div
                key={`editor-cell-${rowIndex}-${columnIndex}`}
                className={`session-spreadsheet-editor__cell session-spreadsheet-editor__cell--data${
                  isSelected ? ' session-spreadsheet-editor__cell--selected' : ''
                }`}
                style={{
                  width: columnWidths[columnIndex],
                  flex: `0 0 ${columnWidths[columnIndex]}px`,
                  height: rowHeights[rowIndex],
                  minHeight: rowHeights[rowIndex],
                }}
                onClick={() => setSelectedCell({ row: rowIndex, col: columnIndex })}
              >
                <input
                  type="text"
                  className="session-spreadsheet-editor__cell-input"
                  value={cell}
                  aria-label={`${columns[columnIndex]}${rowIndex + 1}`}
                  onChange={(event) => handleCellInput(rowIndex, columnIndex, event.target.value)}
                  onFocus={() => setSelectedCell({ row: rowIndex, col: columnIndex })}
                />
              </div>
            )
          })}
          <div className="session-spreadsheet-editor__cell session-spreadsheet-editor__cell--fill" aria-hidden="true" />
        </div>
      ))}

      <div className="session-spreadsheet-editor__row session-spreadsheet-editor__row--add">
        <div
          className="session-spreadsheet-editor__cell session-spreadsheet-editor__cell--index"
          style={{ height: DEFAULT_ROW_HEIGHT, minHeight: DEFAULT_ROW_HEIGHT }}
        >
          <button type="button" className="session-spreadsheet-editor__add-btn" aria-label="新增行" onClick={handleAddRow}>
            <span className="dora-icon icon-16" aria-hidden="true">
              {createIcon}
            </span>
          </button>
        </div>
        <div className="session-spreadsheet-editor__cell session-spreadsheet-editor__cell--fill" aria-hidden="true" />
      </div>

      {resizeGuide?.type === 'column' ? (
        <div
          className="session-spreadsheet-editor__resize-guide session-spreadsheet-editor__resize-guide--column"
          style={{ left: `${getColumnGuideOffset(resizeGuide.index, columnWidths)}px` }}
          aria-hidden="true"
        />
      ) : null}
      {resizeGuide?.type === 'row' ? (
        <div
          className="session-spreadsheet-editor__resize-guide session-spreadsheet-editor__resize-guide--row"
          style={{ top: `${getRowGuideOffset(resizeGuide.index, rowHeights)}px` }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  )
}
