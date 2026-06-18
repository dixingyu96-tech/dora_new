import { motion } from 'framer-motion'
import { cn } from '../lib/utils'
import './FallingPattern.css'

const DEFAULT_GRADIENT_COLORS = [
  'var(--dora-light-品牌色-6)',
  'var(--dora-light-紫色-6)',
  'var(--dora-light-青色-6)',
]

const ROW_SPECS = [
  { tile: '300px 235px', leftStart: '0px 220px', leftEnd: '0px 6800px', rightStart: '3px 220px', rightEnd: '3px 6800px', centerStart: '151.5px 337.5px', centerEnd: '151.5px 6917.5px', height: 235 },
  { tile: '300px 252px', leftStart: '25px 24px', leftEnd: '25px 13632px', rightStart: '28px 24px', rightEnd: '28px 13632px', centerStart: '176.5px 150px', centerEnd: '176.5px 13758px', height: 252 },
  { tile: '300px 150px', leftStart: '50px 16px', leftEnd: '50px 5416px', rightStart: '53px 16px', rightEnd: '53px 5416px', centerStart: '201.5px 91px', centerEnd: '201.5px 5491px', height: 150 },
  { tile: '300px 253px', leftStart: '75px 224px', leftEnd: '75px 17175px', rightStart: '78px 224px', rightEnd: '78px 17175px', centerStart: '226.5px 230.5px', centerEnd: '226.5px 17301.5px', height: 253 },
  { tile: '300px 204px', leftStart: '100px 19px', leftEnd: '100px 5119px', rightStart: '103px 19px', rightEnd: '103px 5119px', centerStart: '251.5px 121px', centerEnd: '251.5px 5221px', height: 204 },
  { tile: '300px 134px', leftStart: '125px 120px', leftEnd: '125px 8428px', rightStart: '128px 120px', rightEnd: '128px 8428px', centerStart: '276.5px 187px', centerEnd: '276.5px 8495px', height: 134 },
  { tile: '300px 179px', leftStart: '150px 31px', leftEnd: '150px 9876px', rightStart: '153px 31px', rightEnd: '153px 9876px', centerStart: '301.5px 120.5px', centerEnd: '301.5px 9965.5px', height: 179 },
  { tile: '300px 299px', leftStart: '175px 235px', leftEnd: '175px 13391px', rightStart: '178px 235px', rightEnd: '178px 13391px', centerStart: '326.5px 384.5px', centerEnd: '326.5px 13540.5px', height: 299 },
  { tile: '300px 215px', leftStart: '200px 121px', leftEnd: '200px 14741px', rightStart: '203px 121px', rightEnd: '203px 14741px', centerStart: '351.5px 228.5px', centerEnd: '351.5px 14848.5px', height: 215 },
  { tile: '300px 281px', leftStart: '225px 224px', leftEnd: '225px 18770px', rightStart: '228px 224px', rightEnd: '228px 18770px', centerStart: '376.5px 364.5px', centerEnd: '376.5px 18910.5px', height: 281 },
  { tile: '300px 158px', leftStart: '250px 26px', leftEnd: '250px 5082px', rightStart: '253px 26px', rightEnd: '253px 5082px', centerStart: '401.5px 105px', centerEnd: '401.5px 5161px', height: 158 },
  { tile: '300px 210px', leftStart: '275px 75px', leftEnd: '275px 6375px', rightStart: '278px 75px', rightEnd: '278px 6375px', centerStart: '426.5px 180px', centerEnd: '426.5px 6480px', height: 210 },
]

function hexToRgb(hex) {
  const normalized = hex.replace('#', '')
  const safeHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized

  return {
    r: parseInt(safeHex.slice(0, 2), 16),
    g: parseInt(safeHex.slice(2, 4), 16),
    b: parseInt(safeHex.slice(4, 6), 16),
  }
}

function rgbToCss({ r, g, b }) {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

function mixColor(start, end, ratio) {
  if (typeof start === 'string' && typeof end === 'string' && start.startsWith('#') && end.startsWith('#')) {
    const startRgb = hexToRgb(start)
    const endRgb = hexToRgb(end)

    return rgbToCss({
      r: startRgb.r + (endRgb.r - startRgb.r) * ratio,
      g: startRgb.g + (endRgb.g - startRgb.g) * ratio,
      b: startRgb.b + (endRgb.b - startRgb.b) * ratio,
    })
  }

  return `color-mix(in srgb, ${start} ${Math.round((1 - ratio) * 100)}%, ${end})`
}

function getGradientRowColors(gradientColors, rowCount, fallback) {
  if (!Array.isArray(gradientColors) || gradientColors.length < 3) {
    return Array.from({ length: rowCount }, () => fallback)
  }

  const [topColor, middleColor, bottomColor] = gradientColors
  const lastIndex = Math.max(rowCount - 1, 1)

  return Array.from({ length: rowCount }, (_, index) => {
    const progress = index / lastIndex

    if (progress <= 0.5) {
      return mixColor(topColor, middleColor, progress / 0.5)
    }

    return mixColor(middleColor, bottomColor, (progress - 0.5) / 0.5)
  })
}

function buildDotStack(x, height, color, variant = 'side') {
  const count = variant === 'center' ? 3 : Math.max(4, Math.round(height / 34))
  const start = variant === 'center' ? height * 0.3 : 14
  const end = variant === 'center' ? height * 0.7 : height - 14
  const gap = count === 1 ? 0 : (end - start) / (count - 1)
  const size = variant === 'center' ? 1.45 : 1.2

  return Array.from({ length: count }, (_, index) => {
    const y = start + gap * index
    return `radial-gradient(${size}px ${size}px at ${x}px ${y}px, ${color} 100%, transparent 155%)`
  })
}

function buildBackgroundLayers(color, gradientColors) {
  const rowColors = getGradientRowColors(gradientColors, ROW_SPECS.length, color)
  const backgroundImages = []
  const backgroundSizes = []
  const startPositions = []
  const endPositions = []

  ROW_SPECS.forEach((row, index) => {
    const rowColor = rowColors[index] || color
    const leftDots = buildDotStack(0, row.height, rowColor, 'side')
    const rightDots = buildDotStack(300, row.height, rowColor, 'side')
    const centerDots = buildDotStack(150, row.height, rowColor, 'center')

    leftDots.forEach((pattern) => {
      backgroundImages.push(pattern)
      backgroundSizes.push(row.tile)
      startPositions.push(row.leftStart)
      endPositions.push(row.leftEnd)
    })

    rightDots.forEach((pattern) => {
      backgroundImages.push(pattern)
      backgroundSizes.push(row.tile)
      startPositions.push(row.rightStart)
      endPositions.push(row.rightEnd)
    })

    centerDots.forEach((pattern) => {
      backgroundImages.push(pattern)
      backgroundSizes.push(row.tile)
      startPositions.push(row.centerStart)
      endPositions.push(row.centerEnd)
    })
  })

  return {
    backgroundImage: backgroundImages.join(', '),
    backgroundSize: backgroundSizes.join(', '),
    startPositions: startPositions.join(', '),
    endPositions: endPositions.join(', '),
  }
}

export default function FallingPattern({
  color = 'var(--fd-color-primary)',
  backgroundColor = '#ffffff',
  duration = 150,
  blurIntensity = '1em',
  density = 1,
  gradientColors = DEFAULT_GRADIENT_COLORS,
  className,
  ...props
}) {
  const { backgroundImage, backgroundSize, startPositions, endPositions } = buildBackgroundLayers(color, gradientColors)

  return (
    <div className={cn('falling-pattern', className)} {...props}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="falling-pattern__viewport">
        <motion.div
          className="falling-pattern__motion"
          style={{
            backgroundColor,
            backgroundImage,
            backgroundSize,
          }}
          variants={{
            initial: {
              backgroundPosition: startPositions,
            },
            animate: {
              backgroundPosition: [startPositions, endPositions],
              transition: {
                duration,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
              },
            },
          }}
          initial="initial"
          animate="animate"
        />
      </motion.div>
      <div
        className="falling-pattern__overlay"
        style={{
          backdropFilter: `blur(${blurIntensity})`,
          WebkitBackdropFilter: `blur(${blurIntensity})`,
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, ${backgroundColor} 2px)`,
          backgroundSize: `${8 * density}px ${8 * density}px`,
        }}
      />
    </div>
  )
}
