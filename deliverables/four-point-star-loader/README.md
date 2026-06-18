# Four Point Star Loader

## Files
- `FourPointStarLoader.jsx`: React component
- `four-point-star-loader.css`: Styles and keyframes

## Usage
```jsx
import FourPointStarLoader from './FourPointStarLoader'
import './four-point-star-loader.css'

export default function Example() {
  return <FourPointStarLoader label="正在生成" />
}
```

## Optional props
- `className`: extra class name
- `label`: accessibility label, default `加载中`

## Default size
- Outer wrapper: `16px x 16px`
- SVG visual size: `14px x 14px`

## Color tokens used
- `--fd-color-primary` fallback `#2562ff`
- `--dora-light-紫色-6` fallback `#8c5df7`
- `--dora-light-青色-6` fallback `#00b0d4`

If the target project has no design tokens, the fallback colors will still work.
