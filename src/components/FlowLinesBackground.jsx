import { useEffect, useMemo, useRef, useState } from 'react'
import './FlowLinesBackground.css'

const VIEWBOX_WIDTH = 1280
const VIEWBOX_HEIGHT = 800
const FLOW_SEQUENCE_DURATION = '10s'

const BASE_LINES = [
  {
    id: 'line-left-mid',
    d: 'M -127 256.5 H 43 C 56.255 256.5 67 267.245 67 280.5 V 424.5 C 67 437.755 77.745 448.5 91 448.5 H 300',
  },
  {
    id: 'line-top-center',
    d: 'M 370.5 -33.5 V 474',
    emphasis: 'strong',
    axis: 'vertical',
  },
  {
    id: 'line-right-top',
    d: 'M 822.5 474 C 822.5 402.912 822.5 269.753 822.5 186.999 C 822.5 173.744 833.245 163 846.5 163 H 991.2 C 1004.455 163 1015.2 152.255 1015.2 139 V -71',
  },
  {
    id: 'line-left-bottom',
    d: 'M 491.654 888.5 V 668.5 C 491.654 655.245 480.909 644.5 467.654 644.5 H 153.81 C 140.555 644.5 129.81 633.755 129.81 620.5 V 532.5 C 129.81 519.245 140.555 508.5 153.81 508.5 H 300',
  },
  {
    id: 'line-right-bottom',
    d: 'M 1245.5 717 H 1152.844 C 1139.589 717 1128.844 706.255 1128.844 693 V 531 C 1128.844 517.745 1118.099 507 1104.844 507 H 767',
  },
  {
    id: 'line-bottom-center',
    d: 'M 722.5 456 V 859',
    emphasis: 'strong',
    axis: 'vertical',
  },
]

const getLeftMidPath = (joinY = 448.5, joinX = 300) => {
  const curveStartY = joinY - 24
  return `M -127 256.5 H 43 C 56.255 256.5 67 267.245 67 280.5 V ${curveStartY} C 67 ${joinY - 10.745} 77.745 ${joinY} 91 ${joinY} H ${joinX}`
}

const getRightBottomPath = (joinX = 1020, joinY = 531) => {
  const rightEdgeX = VIEWBOX_WIDTH + 24
  const verticalX = Math.min(VIEWBOX_WIDTH - 48, joinX + 84)
  const bottomY = Math.min(VIEWBOX_HEIGHT + 80, joinY + 186)
  return `M ${rightEdgeX} ${bottomY} H ${verticalX + 24} C ${verticalX + 10.745} ${bottomY} ${verticalX} ${bottomY - 10.745} ${verticalX} ${bottomY - 24} V ${joinY + 24} C ${verticalX} ${joinY + 10.745} ${verticalX - 10.745} ${joinY} ${verticalX - 24} ${joinY} H ${joinX}`
}

const getLeftBottomPath = (joinX = 300, joinY = 508.5) => {
  const upperRowY = joinY + 136
  const rightColumnX = 491.654
  const rightTurnX = 467.654
  return `M ${rightColumnX} 888.5 V ${upperRowY + 24} C ${rightColumnX} ${upperRowY + 10.745} ${rightTurnX + 13.255} ${upperRowY} ${rightTurnX} ${upperRowY} H 153.81 C 140.555 ${upperRowY} 129.81 ${upperRowY - 10.745} 129.81 ${upperRowY - 24} V ${joinY + 24} C 129.81 ${joinY + 10.745} 140.555 ${joinY} 153.81 ${joinY} H ${joinX}`
}

const getBottomCenterPath = (x = 722.5) => `M ${x} 456 V 859`

const FLOW_SEGMENTS = [
  {
    id: 'flow-blue-top-center',
    pathId: 'line-top-center',
    duration: FLOW_SEQUENCE_DURATION,
    delay: '0s',
    reverse: true,
    colors: {
      core: '#00e8ed',
      middle: '#2562ff',
    },
  },
  {
    id: 'flow-orange-left-top',
    pathId: 'line-left-mid',
    duration: FLOW_SEQUENCE_DURATION,
    delay: '0s',
    reverse: true,
    colors: {
      core: '#ffd28a',
      middle: '#ff7a1a',
    },
  },
  {
    id: 'flow-pink-left-bottom',
    pathId: 'line-left-bottom',
    duration: FLOW_SEQUENCE_DURATION,
    delay: '0s',
    reverse: true,
    colors: {
      core: '#ff8bc2',
      middle: '#f14a8f',
    },
  },
  {
    id: 'flow-blue-right-top',
    pathId: 'line-right-top',
    duration: FLOW_SEQUENCE_DURATION,
    delay: '0s',
    colors: {
      core: '#00e8ed',
      middle: '#2562ff',
    },
  },
  {
    id: 'flow-violet-bottom-center',
    pathId: 'line-bottom-center',
    duration: FLOW_SEQUENCE_DURATION,
    delay: '0s',
    colors: {
      core: '#d8c4ff',
      middle: '#8c5df7',
    },
  },
  {
    id: 'flow-duck-green-right-bottom',
    pathId: 'line-right-bottom',
    duration: FLOW_SEQUENCE_DURATION,
    delay: '0s',
    reverse: true,
    colors: {
      core: '#98fff0',
      middle: '#00b0d4',
    },
  },
]

const FLOW_OPACITY_TIMELINE = {
  'line-top-center': {
    values: '0;0;0.95;1;0.22;0;0',
    keyTimes: '0;0.02;0.08;0.18;0.28;0.34;1',
    motionKeyTimes: '0;0.02;0.34;1',
  },
  'line-left-mid': {
    values: '0;0;0.9;1;0.24;0;0',
    keyTimes: '0;0.1;0.16;0.28;0.38;0.44;1',
    motionKeyTimes: '0;0.1;0.44;1',
  },
  'line-left-bottom': {
    values: '0;0;0.88;1;0.24;0;0',
    keyTimes: '0;0.2;0.26;0.38;0.48;0.54;1',
    motionKeyTimes: '0;0.2;0.54;1',
  },
  'line-right-top': {
    values: '0;0;0.95;1;0.22;0;0',
    keyTimes: '0;0.04;0.1;0.22;0.32;0.38;1',
    motionKeyTimes: '0;0.04;0.38;1',
  },
  'line-bottom-center': {
    values: '0;0;0.86;1;0.24;0;0',
    keyTimes: '0;0.22;0.28;0.4;0.5;0.56;1',
    motionKeyTimes: '0;0.22;0.56;1',
  },
  'line-right-bottom': {
    values: '0;0;0.9;1;0.24;0;0',
    keyTimes: '0;0.12;0.18;0.32;0.42;0.48;1',
    motionKeyTimes: '0;0.12;0.48;1',
  },
}

const DEFAULT_FLOW_OPACITY_TIMELINE = {
  values: '0;0.9;1;0.25;0;0',
  keyTimes: '0;0.12;0.34;0.52;0.64;1',
  motionKeyTimes: '0;0.12;0.64;1',
}

const getFlowKeyPoints = (segment) => {
  const start = segment.reverse ? '0' : '1'
  const end = segment.reverse ? '1' : '0'
  return `${start};${start};${end};${end}`
}

export default function FlowLinesBackground({
  className = '',
  anchorSelector,
  rightAnchorSelector,
  addAnchorSelector,
  bottomAnchorSelector,
}) {
  const rootRef = useRef(null)
  const [leftMidPath, setLeftMidPath] = useState(() => getLeftMidPath())
  const [rightBottomPath, setRightBottomPath] = useState(() => getRightBottomPath())
  const [leftBottomPath, setLeftBottomPath] = useState(() => getLeftBottomPath())
  const [bottomCenterPath, setBottomCenterPath] = useState(() => getBottomCenterPath())

  useEffect(() => {
    if (!anchorSelector && !rightAnchorSelector && !addAnchorSelector && !bottomAnchorSelector) return undefined

    let frameId = 0

    const updatePath = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        const root = rootRef.current
        if (!root) return

        const rootRect = root.getBoundingClientRect()
        const toSvgX = (clientX) => ((clientX - rootRect.left) / rootRect.width) * VIEWBOX_WIDTH
        const toSvgY = (clientY) => ((clientY - rootRect.top) / rootRect.height) * VIEWBOX_HEIGHT

        if (anchorSelector) {
          const anchor = document.querySelector(anchorSelector)
          if (anchor) {
            const anchorRect = anchor.getBoundingClientRect()
            const joinY = Math.max(392, Math.min(492, toSvgY(anchorRect.top + 12)))
            const joinX = Math.max(300, toSvgX(anchorRect.left + 48))
            setLeftMidPath(getLeftMidPath(Number(joinY.toFixed(2)), Number(joinX.toFixed(2))))
          }
        }

        if (rightAnchorSelector) {
          const rightAnchor = document.querySelector(rightAnchorSelector)
          if (rightAnchor) {
            const rightAnchorRect = rightAnchor.getBoundingClientRect()
            const joinX = Math.min(VIEWBOX_WIDTH - 120, Math.max(760, toSvgX(rightAnchorRect.left + rightAnchorRect.width / 2)))
            const joinY = Math.max(468, Math.min(604, toSvgY(rightAnchorRect.top + rightAnchorRect.height / 2)))
            setRightBottomPath(getRightBottomPath(Number(joinX.toFixed(2)), Number(joinY.toFixed(2))))
          }
        }

        if (addAnchorSelector) {
          const addAnchor = document.querySelector(addAnchorSelector)
          if (addAnchor) {
            const addAnchorRect = addAnchor.getBoundingClientRect()
            const joinX = Math.max(300, toSvgX(addAnchorRect.left + addAnchorRect.width / 2))
            const joinY = Math.max(484, Math.min(592, toSvgY(addAnchorRect.top + addAnchorRect.height / 2)))
            setLeftBottomPath(getLeftBottomPath(Number(joinX.toFixed(2)), Number(joinY.toFixed(2))))
          }
        }

        if (bottomAnchorSelector) {
          const bottomAnchor = document.querySelector(bottomAnchorSelector)
          if (bottomAnchor) {
            const bottomAnchorRect = bottomAnchor.getBoundingClientRect()
            const x = Math.max(520, Math.min(900, toSvgX(bottomAnchorRect.left + bottomAnchorRect.width / 2)))
            setBottomCenterPath(getBottomCenterPath(Number(x.toFixed(2))))
          }
        }
      })
    }

    updatePath()
    window.addEventListener('resize', updatePath)

    const observer = new ResizeObserver(updatePath)
    observer.observe(rootRef.current)
    const anchor = anchorSelector ? document.querySelector(anchorSelector) : null
    if (anchor) observer.observe(anchor)
    const rightAnchor = rightAnchorSelector ? document.querySelector(rightAnchorSelector) : null
    if (rightAnchor) observer.observe(rightAnchor)
    const addAnchor = addAnchorSelector ? document.querySelector(addAnchorSelector) : null
    if (addAnchor) observer.observe(addAnchor)
    const bottomAnchor = bottomAnchorSelector ? document.querySelector(bottomAnchorSelector) : null
    if (bottomAnchor) observer.observe(bottomAnchor)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', updatePath)
      observer.disconnect()
    }
  }, [anchorSelector, rightAnchorSelector, addAnchorSelector, bottomAnchorSelector])

  const lines = useMemo(
    () =>
      BASE_LINES.map((line) => {
        if (line.id === 'line-left-mid') return { ...line, d: leftMidPath }
        if (line.id === 'line-right-bottom') return { ...line, d: rightBottomPath }
        if (line.id === 'line-left-bottom') return { ...line, d: leftBottomPath }
        if (line.id === 'line-bottom-center') return { ...line, d: bottomCenterPath }
        return line
      }),
    [leftMidPath, rightBottomPath, leftBottomPath, bottomCenterPath],
  )

  const linePathById = useMemo(() => new Map(lines.map((line) => [line.id, line.d])), [lines])

  return (
    <div ref={rootRef} className={`flow-lines-bg ${className}`.trim()} aria-hidden="true">
      <svg
        className="flow-lines-bg__svg"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        role="presentation"
      >
        <defs>
          <linearGradient id="flow-line-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(9, 30, 64, 0.03)" />
            <stop offset="100%" stopColor="rgba(9, 30, 64, 0.072)" />
          </linearGradient>
          <linearGradient id="flow-line-soft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.34)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          {FLOW_SEGMENTS.map((segment) => (
            <radialGradient key={`${segment.id}-gradient`} id={`${segment.id}-gradient`} fx="1">
              <stop offset="0%" stopColor={segment.colors.core} stopOpacity="0.98" />
              <stop offset="46%" stopColor={segment.colors.middle} stopOpacity="0.9" />
              <stop offset="100%" stopColor={segment.colors.middle} stopOpacity="0" />
            </radialGradient>
          ))}
          {FLOW_SEGMENTS.map((segment) => {
            const path = linePathById.get(segment.pathId)
            if (!path) return null

            return (
              <mask key={`${segment.id}-mask`} id={`${segment.id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT}>
                <path d={path} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </mask>
            )
          })}
        </defs>

        <g className="flow-lines-bg__base">
          {lines.map((line) => (
            <g key={line.id}>
              <path
                id={line.id}
                d={line.d}
                pathLength="100"
                className={`flow-lines-bg__line ${line.emphasis === 'strong' ? 'flow-lines-bg__line--strong' : ''}`.trim()}
                stroke={line.axis === 'vertical' ? 'rgba(9, 30, 64, 0.09)' : 'url(#flow-line-base)'}
                strokeWidth={line.emphasis === 'strong' ? '1.35' : '1.15'}
              />
              <path
                d={line.d}
                pathLength="100"
                className={`flow-lines-bg__line flow-lines-bg__line--soft ${line.emphasis === 'strong' ? 'flow-lines-bg__line--soft-strong' : ''}`.trim()}
                stroke={line.axis === 'vertical' ? 'rgba(255, 255, 255, 0.52)' : 'url(#flow-line-soft)'}
                strokeWidth={line.emphasis === 'strong' ? '1.9' : '1.65'}
              />
            </g>
          ))}
        </g>

        <g className="flow-lines-bg__markers">
          {FLOW_SEGMENTS.map((segment) => {
            const path = linePathById.get(segment.pathId)
            if (!path) return null
            const opacityTimeline = FLOW_OPACITY_TIMELINE[segment.pathId] ?? DEFAULT_FLOW_OPACITY_TIMELINE

            return (
              <g key={segment.id} className="flow-lines-bg__marker" mask={`url(#${segment.id}-mask)`}>
                <circle className="flow-lines-bg__light" cx="0" cy="0" r="28" fill={`url(#${segment.id}-gradient)`}>
                  <animate
                    attributeName="opacity"
                    values={opacityTimeline.values}
                    keyTimes={opacityTimeline.keyTimes}
                    dur={segment.duration}
                    begin={segment.delay}
                    repeatCount="indefinite"
                    calcMode="linear"
                  />
                  <animateMotion
                    dur={segment.duration}
                    begin={segment.delay}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyPoints={getFlowKeyPoints(segment)}
                    keyTimes={opacityTimeline.motionKeyTimes}
                    keySplines="0 0 1 1; 0.25 0.1 0.5 1; 0 0 1 1"
                    path={path}
                  />
                </circle>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
