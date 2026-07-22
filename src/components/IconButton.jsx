import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function IconButton({
  tip,
  tipPlacement = 'bottom',
  size = 'md',
  className = 'icon-btn',
  children,
  type = 'button',
  ...rest
}) {
  const { title: _title, onMouseEnter, onMouseLeave, onFocus, onBlur, ...buttonProps } = rest
  const ariaLabel = buttonProps['aria-label'] ?? tip
  const buttonRef = useRef(null)
  const [tipVisible, setTipVisible] = useState(false)
  const [tipPos, setTipPos] = useState({ top: 0, left: 0 })
  const usePortalTip = Boolean(tip)

  const updateTipPosition = useCallback(() => {
    const anchor = buttonRef.current
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    if (tipPlacement === 'right') {
      setTipPos({ top: rect.top + rect.height / 2, left: rect.right + 6 })
      return
    }
    if (tipPlacement === 'top') {
      setTipPos({ top: rect.top - 6, left: rect.left + rect.width / 2 })
      return
    }
    setTipPos({ top: rect.bottom + 6, left: rect.left + rect.width / 2 })
  }, [tipPlacement])

  const showTip = (event) => {
    const isMobileViewport = window.matchMedia('(max-width: 599px)').matches
    if (isMobileViewport) {
      if (event.type === 'mouseenter') onMouseEnter?.(event)
      if (event.type === 'focus') onFocus?.(event)
      return
    }
    updateTipPosition()
    setTipVisible(true)
    if (event.type === 'mouseenter') onMouseEnter?.(event)
    if (event.type === 'focus') onFocus?.(event)
  }

  const hideTip = (event) => {
    setTipVisible(false)
    if (event.type === 'mouseleave') onMouseLeave?.(event)
    if (event.type === 'blur') onBlur?.(event)
  }

  useEffect(() => {
    if (!tipVisible || !tip) return undefined

    const handleReposition = () => updateTipPosition()
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    return () => {
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [tipVisible, tip, updateTipPosition])

  const tipClassName =
    tipPlacement === 'right'
      ? 'icon-tip icon-tip--right icon-tip--portal'
      : tipPlacement === 'top'
        ? 'icon-tip icon-tip--top icon-tip--portal'
        : 'icon-tip icon-tip--portal'
  const hasExplicitSizeClass = /\bicon-btn--(?:xs|sm|msm|md|mlg|lg)\b/.test(className)
  const resolvedClassName = `${className}${size && !hasExplicitSizeClass ? ` icon-btn--${size}` : ''}`

  return (
    <>
      <button
        ref={buttonRef}
        type={type}
        className={resolvedClassName}
        aria-label={ariaLabel}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        onFocus={showTip}
        onBlur={hideTip}
        {...buttonProps}
      >
        {children}
      </button>
      {usePortalTip && tipVisible
        ? createPortal(
            <span
              className={tipClassName}
              role="tooltip"
              style={{ top: tipPos.top, left: tipPos.left }}
            >
              {tip}
            </span>,
            document.body,
          )
        : null}
    </>
  )
}
