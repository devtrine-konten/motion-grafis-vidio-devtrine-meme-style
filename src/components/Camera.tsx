import React from "react"
import { AbsoluteFill } from "remotion"

/**
 * Virtual camera: scale / pan / rotate the whole stage.
 * `focusX/focusY` = canvas point that stays fixed while zooming (punch-in target).
 */
export const Camera: React.FC<{
  scale?: number
  x?: number
  y?: number
  rotate?: number
  focusX?: number
  focusY?: number
  blur?: number
  children: React.ReactNode
}> = ({
  scale = 1,
  x = 0,
  y = 0,
  rotate = 0,
  focusX = 540,
  focusY = 960,
  children,
}) => {
  const isIdentity = Math.abs(scale - 1) < 0.002 && Math.abs(x) < 0.5 && Math.abs(y) < 0.5 && rotate === 0
  return (
    <AbsoluteFill
      style={{
        transform: isIdentity
          ? undefined
          : `translate(${Math.round(x)}px, ${Math.round(y)}px) rotate(${rotate}deg) scale(${scale.toFixed(4)})`,
        transformOrigin: `${focusX}px ${focusY}px`,
      }}
    >
      {children}
    </AbsoluteFill>
  )
}
