import { useProgress } from '@react-three/drei'

/** Covers the canvas while GLBs are downloading. */
export function Loader() {
  const { active, progress } = useProgress()
  if (!active) return null
  return (
    <div className="cfg-loader">
      <span>{Math.round(progress)}%</span>
    </div>
  )
}
