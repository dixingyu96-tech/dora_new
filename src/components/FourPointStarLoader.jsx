import { useId } from 'react'

export default function FourPointStarLoader({ className = '', label = '加载中' }) {
  const gradientId = `four-point-star-gradient-${useId().replace(/:/g, '')}`
  const classes = ['four-point-star-loader', className].filter(Boolean).join(' ')

  return (
    <span className={classes} aria-label={label}>
      <span className="four-point-star-loader__star">
        <svg className="four-point-star-loader__svg" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="18%" y1="12%" x2="84%" y2="86%">
              <stop className="four-point-star-loader__stop four-point-star-loader__stop--start" offset="0%" />
              <stop className="four-point-star-loader__stop four-point-star-loader__stop--middle" offset="52%" />
              <stop className="four-point-star-loader__stop four-point-star-loader__stop--end" offset="100%" />
            </linearGradient>
          </defs>
          <path
            className="four-point-star-loader__path"
            d="M50 0 C52 35 65 48 100 50 C65 52 52 65 50 100 C48 65 35 52 0 50 C35 48 48 35 50 0 Z"
            fill={`url(#${gradientId})`}
          />
        </svg>
      </span>
    </span>
  )
}
