/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef, useEffect } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────
interface Seg { x: number; y: number; angle: number; width: number }
interface Dragon {
  segments: Seg[]
  jitterSeed: number
  lastStepTime: number
  stepInterval: number
  fire: Particle[]
  fireLastStep: number
  scale: number
}
interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; life: number; maxLife: number; frame: number; color: number
}
// ─── Constants ────────────────────────────────────────────────────────────────
const N_SEG = 20
const SEG_SPACING = 30
const D_SCALE = 0.24
const WING_IDX = 5
const BODY_W = [221,130,203,223,285,299,281,224,192,174,191,156,155,122,126,125,107,101,101,81]
const FIRE_CLR = ["#C4402A","#E08A30","#F0C030"]
const FIRE_STEP = 80
const P_W = 700
const IDLE_MS = 2000

// ─── Module-level sprite cache (loaded once per page) ─────────────────────────
interface SpriteSet {
  head: HTMLCanvasElement; headDim: { w: number; h: number }
  tongue: HTMLCanvasElement; tongueDim: { w: number; h: number }
  wingFront: HTMLCanvasElement; wingFrontDim: { w: number; h: number }
  wingBack: HTMLCanvasElement; wingBackDim: { w: number; h: number }
  bodies: HTMLCanvasElement[]; bodyDims: { w: number; h: number }[]
}
let cachedSprites: SpriteSet | null = null
let spritesPromise: Promise<SpriteSet> | null = null

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = () => rej(new Error(`Failed: ${src}`))
    img.src = src
  })
}

function scaleImg(img: HTMLImageElement, scale: number, dpr: number) {
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)
  const c = document.createElement("canvas")
  c.width = Math.round(w * dpr)
  c.height = Math.round(h * dpr)
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height)
  return { canvas: c, w, h }
}

async function loadSprites(): Promise<SpriteSet> {
  if (cachedSprites) return cachedSprites
  if (spritesPromise) return spritesPromise
  spritesPromise = (async () => {
    const dpr = window.devicePixelRatio || 1
    const imgs = await Promise.all([
      loadImg("/dragon-sprites/head.png"),
      loadImg("/dragon-sprites/tongue.png"),
      loadImg("/dragon-sprites/wing-front.png"),
      loadImg("/dragon-sprites/wing-back.png"),
      ...Array.from({ length: 19 }, (_, i) => loadImg(`/dragon-sprites/body-${i + 1}.png`)),
    ])
    const mk = (img: HTMLImageElement) => scaleImg(img, D_SCALE, dpr)
    const [h, t, wf, wb, ...bs] = imgs.map(mk)
    cachedSprites = {
      head: h.canvas, headDim: { w: h.w, h: h.h },
      tongue: t.canvas, tongueDim: { w: t.w, h: t.h },
      wingFront: wf.canvas, wingFrontDim: { w: wf.w, h: wf.h },
      wingBack: wb.canvas, wingBackDim: { w: wb.w, h: wb.h },
      bodies: bs.map(b => b.canvas), bodyDims: bs.map(b => ({ w: b.w, h: b.h })),
    }
    return cachedSprites
  })()
  return spritesPromise
}

// ─── Noise ────────────────────────────────────────────────────────────────────
function noise(e: number): number {
  const t = Math.sin(e * 12.9898 + 78.233) * 43758.5453
  return t - Math.floor(t)
}

// ─── Dragon physics ───────────────────────────────────────────────────────────
function segW(i: number, scale: number): number {
  return (i < BODY_W.length ? BODY_W[i] : 10) * D_SCALE * scale
}

function createDragon(x: number, y: number, scale: number): Dragon {
  const segments: Seg[] = []
  for (let i = 0; i < N_SEG; i++) {
    segments.push({ x, y: y + i * SEG_SPACING * scale, angle: -Math.PI / 2, width: segW(i, scale) })
  }
  return { segments, jitterSeed: Math.random() * 1000, lastStepTime: 0, stepInterval: 80, fire: [], fireLastStep: 0, scale }
}

function restPose(x: number, y: number, scale: number): Seg[] {
  const spacing = SEG_SPACING * scale
  const result: Seg[] = [{ x, y: y - 2, angle: 0, width: 0 }]
  for (let i = 1; i < N_SEG; i++) {
    const angle = -(i / (N_SEG - 1)) * (Math.PI / 2) * 1.4
    const prev = result[i - 1]
    result.push({ x: prev.x - Math.cos(angle) * spacing, y: prev.y - Math.sin(angle) * spacing, angle, width: 0 })
  }
  return result
}

function stepDragon(
  dragon: Dragon, ts: number,
  mx: number, my: number,
  isIdle: boolean, rx: number, ry: number,
): boolean {
  if (ts - dragon.lastStepTime < dragon.stepInterval) return false
  dragon.lastStepTime = ts
  dragon.jitterSeed = Math.random() * 1000

  if (isIdle) {
    const rest = restPose(rx, ry, dragon.scale)
    const lerp = 0.12
    let drift = 0
    for (let i = 0; i < dragon.segments.length; i++) {
      const s = dragon.segments[i]; const r = rest[i]
      drift += Math.abs(r.x - s.x) + Math.abs(r.y - s.y)
      s.x += (r.x - s.x) * lerp; s.y += (r.y - s.y) * lerp
      let da = r.angle - s.angle
      while (da > Math.PI) da -= Math.PI * 2
      while (da < -Math.PI) da += Math.PI * 2
      s.angle += da * lerp
    }
    // Once the rest pose is reached nothing moves any more: no point relaying
    // out the text on every frame.
    return drift > 0.5
  }

  const head = dragon.segments[0]
  const dx = mx - head.x; const dy = my - head.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist > 4) {
    const speed = Math.min(dist, Math.max(12, dist * 0.15))
    head.x += (dx / dist) * speed; head.y += (dy / dist) * speed
    head.angle = Math.atan2(dy, dx)
  }

  const maxD = 0.25; const spacing = SEG_SPACING * dragon.scale
  for (let i = 1; i < dragon.segments.length; i++) {
    const prev = dragon.segments[i - 1]; const curr = dragon.segments[i]
    let angle = Math.atan2(prev.y - curr.y, prev.x - curr.x)
    let da = angle - prev.angle
    while (da > Math.PI) da -= Math.PI * 2
    while (da < -Math.PI) da += Math.PI * 2
    if (da > maxD) angle = prev.angle + maxD
    else if (da < -maxD) angle = prev.angle - maxD
    curr.angle = angle
    curr.x = prev.x - Math.cos(curr.angle) * spacing
    curr.y = prev.y - Math.sin(curr.angle) * spacing
  }
  return true
}

// ─── Fire ─────────────────────────────────────────────────────────────────────
function spawnFire(dragon: Dragon, sp: SpriteSet) {
  const head = dragon.segments[0]; const scale = dragon.scale
  const r = sp.headDim.w * 0.55 * scale
  const mx = head.x + Math.cos(head.angle) * r
  const my = head.y + Math.sin(head.angle) * r
  const count = 3 + Math.floor(Math.random() * 3)
  for (let i = 0; i < count; i++) {
    const spread = (Math.random() - 0.5) * 0.25
    const speed = (35 + Math.random() * 20) * scale
    const angle = head.angle + spread
    dragon.fire.push({
      x: mx + (Math.random() - 0.5) * 4, y: my + (Math.random() - 0.5) * 4,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      size: (8 + Math.random() * 12) * scale, life: 1,
      maxLife: 12 + Math.floor(Math.random() * 6), frame: 0, color: Math.floor(Math.random() * 3),
    })
  }
}

function stepFire(dragon: Dragon, ts: number) {
  if (ts - dragon.fireLastStep < FIRE_STEP) return
  dragon.fireLastStep = ts
  for (let i = dragon.fire.length - 1; i >= 0; i--) {
    const p = dragon.fire[i]
    p.frame++; p.life = 1 - p.frame / p.maxLife
    p.x += p.vx; p.y += p.vy
    p.vx *= 0.95; p.vy *= 0.95
    const g = Math.max(0, (p.frame - 4) / p.maxLife)
    p.vy -= g * 1.5
    if (p.life < 0.25) p.size *= 0.75
    else if (p.frame < 3) p.size *= 1.15
    if (p.life <= 0 || p.size < 1.5) dragon.fire.splice(i, 1)
  }
}

// ─── Drawing ──────────────────────────────────────────────────────────────────
function drawFire(ctx: CanvasRenderingContext2D, dragon: Dragon) {
  for (const p of dragon.fire) {
    const angle = Math.atan2(p.vy, p.vx)
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(angle)
    ctx.globalAlpha = Math.min(1, p.life * 1.5)
    const r = 1 - p.life
    ctx.fillStyle = FIRE_CLR[r < 0.33 ? 0 : r < 0.66 ? 1 : 2]
    const s = p.size / 2
    const a = p.color * 31 + p.frame * 0.3
    const jit = (n: number) => (noise(a + n * 17) - 0.5) * s * 0.4
    const pts: [number, number][] = [
      [s * 1.2 + jit(0), jit(1)], [jit(2), -s * 0.7 + jit(3)],
      [-s + jit(4), jit(5)], [jit(6), s * 0.7 + jit(7)],
    ]
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1])
    for (let i = 0; i < 4; i++) {
      const next = pts[(i + 1) % 4]; const cur = pts[i]
      for (let j = 1; j <= 4; j++) {
        const t = j / 4
        ctx.lineTo(cur[0] + (next[0] - cur[0]) * t + (noise(a + (i * 4 + j) * 13) - 0.5) * s * 0.35,
          cur[1] + (next[1] - cur[1]) * t + (noise(a + (i * 4 + j) * 29) - 0.5) * s * 0.35)
      }
    }
    ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; ctx.restore()
  }
}

function drawDragon(ctx: CanvasRenderingContext2D, dragon: Dragon, sp: SpriteSet) {
  const { segments: segs, jitterSeed: seed } = dragon
  const t = performance.now() / 1000
  const scale = dragon.scale

  // Wing back
  const wingSegB = segs[WING_IDX]
  const jxb = (noise(seed + WING_IDX * 37) - 0.5) * 1.5
  const jyb = (noise(seed + WING_IDX * 37 + 100) - 0.5) * 1.5
  const jab = (noise(seed + WING_IDX * 37 + 200) - 0.5) * 0.04
  ctx.save()
  ctx.translate(wingSegB.x + jxb, wingSegB.y + jyb)
  ctx.rotate(wingSegB.angle + jab + Math.sin(t * 3) * 0.4)
  ctx.scale(scale, scale)
  const { w: wbW, h: wbH } = sp.wingBackDim
  ctx.drawImage(sp.wingBack, -wbW, -wbH, wbW, wbH)
  ctx.restore()

  // Body segments back-to-front
  for (let i = segs.length - 1; i >= 0; i--) {
    const seg = segs[i]
    const jx = (noise(seed + i * 37) - 0.5) * 1.5
    const jy = (noise(seed + i * 37 + 100) - 0.5) * 1.5
    const ja = (noise(seed + i * 37 + 200) - 0.5) * 0.04
    ctx.save()
    ctx.translate(seg.x + jx, seg.y + jy)
    ctx.rotate(seg.angle + ja)
    ctx.scale(scale, scale)

    if (i === 0) {
      // Head
      const { w: tW, h: tH } = sp.tongueDim
      ctx.drawImage(sp.tongue, sp.headDim.w * 0.3, -tH / 2, tW, tH)
      const { w: hW, h: hH } = sp.headDim
      ctx.drawImage(sp.head, -hW * 0.45, -hH / 2, hW, hH)
    } else {
      const body = sp.bodies[i - 1]; const dim = sp.bodyDims[i - 1]
      if (body && dim) ctx.drawImage(body, -dim.w / 2, -dim.h / 2, dim.w, dim.h)

      if (i === WING_IDX) {
        const wa = Math.sin(t * 3 + 0.5) * 0.4
        ctx.save()
        ctx.rotate(-wa)
        const { w: wfW, h: wfH } = sp.wingFrontDim
        ctx.drawImage(sp.wingFront, -wfW, -wfH, wfW, wfH)
        ctx.restore()
      }
    }
    ctx.restore()
  }
}

// ─── React component ──────────────────────────────────────────────────────────
interface Props {
  className?: string
  style?: React.CSSProperties
}

export function ManuscriptCanvas({ className, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const mainCanvas = canvasRef.current as HTMLCanvasElement

    let rafId = 0
    let stopped = false
    let dragon: Dragon | null = null
    let sprites: SpriteSet | null = null
    let mouseX = 0, mouseY = 0
    let lastMouseTime = -Infinity
    let mouseDown = false
    let loopRunning = false

    // Offscreen 2D canvas
    const offscreen = document.createElement("canvas")
    const ctx = offscreen.getContext("2d")!

    // WebGL2 output
    const gl = mainCanvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    }) as WebGL2RenderingContext | null
    let glTex: WebGLTexture | null = null

    /**
     * Where the dragon coils when it is left alone: upper-left of the centre
     * column, so it frames the title instead of covering it.
     */
    function restAnchor() {
      const pageWidth = Math.min(P_W, window.innerWidth - 40)
      const scale = Math.min(1, pageWidth / P_W)
      return {
        x: (window.innerWidth - pageWidth) / 2 + 100 * scale,
        y: window.innerHeight * 0.2,
        scale,
      }
    }

    function resize() {
      const dpr = Math.ceil(window.devicePixelRatio || 1)
      const w = window.innerWidth * dpr
      const h = window.innerHeight * dpr
      mainCanvas.width = w; mainCanvas.height = h
      mainCanvas.style.width = `${window.innerWidth}px`
      mainCanvas.style.height = `${window.innerHeight}px`
      if (gl) gl.viewport(0, 0, w, h)
      offscreen.width = w; offscreen.height = h
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (dragon) dragon.scale = restAnchor().scale
    }
    resize()

    // WebGL setup
    if (gl) {
      const vs = `#version 300 es\nin vec2 a_pos;out vec2 v_uv;\nvoid main(){gl_Position=vec4(a_pos,0,1);v_uv=(a_pos+1.0)*0.5;v_uv.y=1.0-v_uv.y;}`
      const fs = `#version 300 es\nprecision mediump float;\nin vec2 v_uv;uniform sampler2D u_tex;out vec4 fc;\nvoid main(){fc=texture(u_tex,v_uv);}`
      const mkS = (type: number, src: string) => {
        const s = gl.createShader(type)!
        gl.shaderSource(s, src); gl.compileShader(s); return s
      }
      const prog = gl.createProgram()!
      gl.attachShader(prog, mkS(gl.VERTEX_SHADER, vs))
      gl.attachShader(prog, mkS(gl.FRAGMENT_SHADER, fs))
      gl.linkProgram(prog); gl.useProgram(prog)
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, "a_pos")
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.clearColor(0, 0, 0, 0)
      glTex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, glTex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }

    // Events — listen on document so mouse works even when UI overlays are on top
    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; lastMouseTime = performance.now() }
    const onDown = () => { mouseDown = true }
    const onUp = () => { mouseDown = false }
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]; mouseX = t.clientX; mouseY = t.clientY
      mouseDown = true; lastMouseTime = performance.now()
    }
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]; mouseX = t.clientX; mouseY = t.clientY
      lastMouseTime = performance.now()
    }
    const onTouchEnd = () => { mouseDown = false }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup", onUp)
    mainCanvas.addEventListener("touchstart", onTouchStart, { passive: true })
    mainCanvas.addEventListener("touchmove", onTouchMove, { passive: true })
    mainCanvas.addEventListener("touchend", onTouchEnd)

    const onResize = () => { resize() }
    window.addEventListener("resize", onResize)

    function tick(ts: number) {
      loopRunning = false
      if (stopped || !dragon || !sprites) { schedTick(); return }

      const rest = restAnchor()
      const isIdle = ts - lastMouseTime > IDLE_MS

      stepDragon(dragon, ts, mouseX, mouseY, isIdle, rest.x, rest.y)

      if (mouseDown) spawnFire(dragon, sprites)
      if (dragon.fire.length > 0) stepFire(dragon, ts)

      const dpr = Math.ceil(window.devicePixelRatio || 1)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Transparent: the section's own background and paper texture show through
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      drawFire(ctx, dragon)
      drawDragon(ctx, dragon, sprites)

      // WebGL output
      if (gl && glTex) {
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.bindTexture(gl.TEXTURE_2D, glTex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }

      schedTick()
    }

    function schedTick() {
      if (!stopped && !loopRunning) {
        loopRunning = true
        rafId = requestAnimationFrame(tick)
      }
    }

    // Init
    ;(async () => {
      if (stopped) return
      sprites = await loadSprites()
      if (stopped) return

      if (stopped) return
      const anchor = restAnchor()
      dragon = createDragon(anchor.x, anchor.y, anchor.scale)
      const rest = restPose(anchor.x, anchor.y, anchor.scale)
      for (let i = 0; i < dragon.segments.length; i++) {
        dragon.segments[i].x = rest[i].x
        dragon.segments[i].y = rest[i].y
        dragon.segments[i].angle = rest[i].angle
      }
      schedTick()
    })()

    return () => {
      stopped = true
      cancelAnimationFrame(rafId)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
      mainCanvas.removeEventListener("touchstart", onTouchStart)
      mainCanvas.removeEventListener("touchmove", onTouchMove)
      mainCanvas.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", touchAction: "none", cursor: "crosshair", ...style }}
    />
  )
}
