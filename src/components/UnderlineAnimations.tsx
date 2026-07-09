"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls, type ValueAnimationTransition } from "framer-motion"
import { cn } from "@/lib/utils"

interface UnderlineBaseProps {
  label: string
  className?: string
  underlineHeightRatio?: number
  underlinePaddingRatio?: number
  transition?: ValueAnimationTransition
}

interface DirectionalUnderlineProps extends UnderlineBaseProps {
  direction?: "left" | "right"
}

function useUnderlineStyles(
  ref: React.RefObject<HTMLElement | null>,
  underlineHeightRatio: number,
  underlinePaddingRatio: number
) {
  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const fontSize = parseFloat(getComputedStyle(ref.current).fontSize)
        ref.current.style.setProperty("--underline-height", `${fontSize * underlineHeightRatio}px`)
        ref.current.style.setProperty("--underline-padding", `${fontSize * underlinePaddingRatio}px`)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [ref, underlineHeightRatio, underlinePaddingRatio])
}

export function CenterUnderline({
  label,
  className,
  transition = { duration: 0.25, ease: "easeInOut" },
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
}: UnderlineBaseProps) {
  const ref = useRef<HTMLSpanElement>(null)
  useUnderlineStyles(ref, underlineHeightRatio, underlinePaddingRatio)

  return (
    <motion.span
      className={cn("relative inline-block cursor-pointer", className)}
      whileHover="visible"
      ref={ref}
    >
      <span>{label}</span>
      <motion.div
        className="absolute left-1/2 bg-current -translate-x-1/2"
        style={{
          height: "var(--underline-height)",
          bottom: "calc(-1 * var(--underline-padding))",
        }}
        variants={{
          hidden: { width: 0, originX: 0.5 },
          visible: { width: "100%", transition },
        }}
      />
    </motion.span>
  )
}

export function ComesInGoesOutUnderline({
  label,
  direction = "left",
  className,
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  transition = { duration: 0.4, ease: "easeInOut" },
}: DirectionalUnderlineProps) {
  const controls = useAnimationControls()
  const [blocked, setBlocked] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  useUnderlineStyles(ref, underlineHeightRatio, underlinePaddingRatio)

  const animate = async () => {
    if (blocked) return
    setBlocked(true)
    await controls.start({ width: "100%", transition, transitionEnd: { left: direction === "left" ? "auto" : 0, right: direction === "left" ? 0 : "auto" } })
    await controls.start({ width: 0, transition, transitionEnd: { left: direction === "left" ? 0 : "", right: direction === "left" ? "" : 0 } })
    setBlocked(false)
  }

  return (
    <motion.span
      className={cn("relative inline-block cursor-pointer", className)}
      onHoverStart={animate}
      ref={ref}
    >
      <span>{label}</span>
      <motion.span
        className={cn("absolute bg-current w-0", { "left-0": direction === "left", "right-0": direction === "right" })}
        style={{ height: "var(--underline-height)", bottom: "calc(-1 * var(--underline-padding))" }}
        animate={controls}
      />
    </motion.span>
  )
}

export function GoesOutComesInUnderline({
  label,
  direction = "left",
  className,
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  transition = { duration: 0.5, ease: "easeOut" },
}: DirectionalUnderlineProps) {
  const controls = useAnimationControls()
  const [blocked, setBlocked] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  useUnderlineStyles(ref, underlineHeightRatio, underlinePaddingRatio)

  const animate = async () => {
    if (blocked) return
    setBlocked(true)
    await controls.start({ width: 0, transition, transitionEnd: { left: direction === "left" ? "auto" : 0, right: direction === "left" ? 0 : "auto" } })
    await controls.start({ width: "100%", transition, transitionEnd: { left: direction === "left" ? 0 : "", right: direction === "left" ? "" : 0 } })
    setBlocked(false)
  }

  return (
    <motion.span
      className={cn("relative inline-block cursor-pointer", className)}
      onHoverStart={animate}
      ref={ref}
    >
      <span>{label}</span>
      <motion.span
        className={cn("absolute bg-current w-full", { "left-0": direction === "left", "right-0": direction === "right" })}
        style={{ height: "var(--underline-height)", bottom: "calc(-1 * var(--underline-padding))" }}
        animate={controls}
      />
    </motion.span>
  )
}
