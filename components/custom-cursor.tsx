"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const visible = useRef(false)
  const hovering = useRef(false)
  const clicking = useRef(false)
  const raf = useRef<number>(0)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    document.documentElement.style.cursor = "none"

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible.current) {
        visible.current = true
        if (dotRef.current) dotRef.current.style.opacity = "1"
        if (ringRef.current) ringRef.current.style.opacity = "1"
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const onEnter = () => {
      visible.current = true
      if (dotRef.current) dotRef.current.style.opacity = "1"
      if (ringRef.current) ringRef.current.style.opacity = "1"
    }

    const onLeave = () => {
      visible.current = false
      if (dotRef.current) dotRef.current.style.opacity = "0"
      if (ringRef.current) ringRef.current.style.opacity = "0"
    }

    const onDown = () => {
      clicking.current = true
      if (ringRef.current) {
        ringRef.current.style.width = "24px"
        ringRef.current.style.height = "24px"
        ringRef.current.style.borderWidth = "2px"
      }
      if (dotRef.current) {
        dotRef.current.style.width = "6px"
        dotRef.current.style.height = "6px"
      }
    }

    const onUp = () => {
      clicking.current = false
      if (ringRef.current) {
        ringRef.current.style.width = hovering.current ? "48px" : "36px"
        ringRef.current.style.height = hovering.current ? "48px" : "36px"
        ringRef.current.style.borderWidth = "1.5px"
      }
      if (dotRef.current) {
        dotRef.current.style.width = hovering.current ? "0px" : "4px"
        dotRef.current.style.height = hovering.current ? "0px" : "4px"
      }
    }

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='pointer']")
      if (isLink && !hovering.current) {
        hovering.current = true
        if (ringRef.current) {
          ringRef.current.style.width = "48px"
          ringRef.current.style.height = "48px"
          ringRef.current.style.borderColor = "var(--section-accent, #d4a843)"
        }
        if (dotRef.current) {
          dotRef.current.style.width = "0px"
          dotRef.current.style.height = "0px"
        }
      } else if (!isLink && hovering.current) {
        hovering.current = false
        if (ringRef.current) {
          ringRef.current.style.width = "36px"
          ringRef.current.style.height = "36px"
          ringRef.current.style.borderColor = "var(--section-fg, #fff)"
        }
        if (dotRef.current) {
          dotRef.current.style.width = "4px"
          dotRef.current.style.height = "4px"
        }
      }
    }

    // Ring follows with lerp
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mousemove", checkHover)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup", onUp)
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.documentElement.style.cursor = ""
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mousemove", checkHover)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      {/* Dot — center point, moves instantly */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          borderRadius: "50%",
          backgroundColor: "var(--section-fg, #fff)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transition: "width .25s ease, height .25s ease, opacity .3s ease, background-color .3s ease",
        }}
      />
      {/* Ring — outer circle, follows with delay */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: "50%",
          border: "1.5px solid var(--section-fg, #fff)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          transition: "width .3s ease, height .3s ease, opacity .3s ease, border-color .3s ease, border-width .2s ease",
        }}
      />
    </>
  )
}
