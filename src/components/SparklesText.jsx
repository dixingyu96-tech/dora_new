import { useEffect, useMemo, useRef, useState } from 'react'
import './SparklesText.css'

const DEFAULT_COLORS = [
  'var(--dora-light-品牌色-6, #2562FF)',
  'var(--dora-light-紫色-6, #8C5DF7)',
  'var(--dora-light-青色-6, #00B0D4)',
]

const SPARKLE_FADE_OUT_MS = 980

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function generateSparkles(count, colors) {
  const weightedColors = [
    colors[0],
    colors[0],
    colors[1],
    colors[1],
    colors[1],
    colors[2],
  ].filter(Boolean)

  return Array.from({ length: count }, (_, index) => {
    const color = weightedColors[Math.floor(Math.random() * weightedColors.length)] ?? colors[0]
    const progress = count <= 1 ? 0.5 : index / (count - 1)
    const spanStart = 10
    const spanEnd = 90
    const xBase = spanStart + progress * (spanEnd - spanStart)
    const x = xBase + randomBetween(-2.5, 2.5)
    const isUpperBand = index % 3 !== 1
    const y = isUpperBand ? randomBetween(16, 34) : randomBetween(60, 82)
    const centerWeight = 1 - Math.min(1, Math.abs(progress - 0.5) / 0.5)
    const sizeBoost = 1 + centerWeight * 0.42
    return {
      id: `sparkle-${index}-${Math.round(Math.random() * 1e6)}`,
      x: `${Math.max(8, Math.min(92, x))}%`,
      y: `${y}%`,
      color,
      delay: randomBetween(0, 2.8),
      scale: randomBetween(0.42, 0.94) * sizeBoost,
      size: randomBetween(9, 15) * sizeBoost,
    }
  })
}

function SparkleGlyph({ color }) {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" aria-hidden="true">
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </svg>
  )
}

export default function SparklesText({
  as: Component = 'span',
  className = '',
  text,
  sparklesCount = 10,
  colors = DEFAULT_COLORS,
  activeDuration = 3000,
  triggerKey = 'default',
  ...props
}) {
  const [isVisible, setIsVisible] = useState(true)
  const fadeTimerRef = useRef(null)
  const hideTimerRef = useRef(null)

  const sparkles = useMemo(
    () => generateSparkles(sparklesCount, colors),
    [colors, sparklesCount, triggerKey],
  )

  useEffect(() => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current)
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
    }

    setIsVisible(true)

    const fadeOutDelay = Math.max(0, activeDuration - SPARKLE_FADE_OUT_MS)
    fadeTimerRef.current = window.setTimeout(() => {
      setIsVisible(false)
    }, fadeOutDelay)

    hideTimerRef.current = window.setTimeout(() => {
      setIsVisible(false)
    }, activeDuration)

    return () => {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current)
        fadeTimerRef.current = null
      }
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
        hideTimerRef.current = null
      }
    }
  }, [activeDuration, triggerKey])

  const restartSparkles = () => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current)
      fadeTimerRef.current = null
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }

    setIsVisible(false)
    requestAnimationFrame(() => {
      setIsVisible(true)
      const fadeOutDelay = Math.max(0, activeDuration - SPARKLE_FADE_OUT_MS)
      fadeTimerRef.current = window.setTimeout(() => {
        setIsVisible(false)
      }, fadeOutDelay)
      hideTimerRef.current = window.setTimeout(() => {
        setIsVisible(false)
      }, activeDuration)
    })
  }

  return (
    <Component
      className={`sparkles-text ${isVisible ? 'is-visible' : 'is-fading'} ${className}`.trim()}
      onMouseEnter={restartSparkles}
      {...props}
    >
      <span className="sparkles-text__content">{text}</span>
      <span className="sparkles-text__layer" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="sparkles-text__sparkle"
            style={{
              '--sparkle-x': sparkle.x,
              '--sparkle-y': sparkle.y,
              '--sparkle-delay': `${sparkle.delay}s`,
              '--sparkle-scale': sparkle.scale,
              '--sparkle-color': sparkle.color,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
            }}
          >
            <SparkleGlyph color={sparkle.color} />
          </span>
        ))}
      </span>
    </Component>
  )
}
