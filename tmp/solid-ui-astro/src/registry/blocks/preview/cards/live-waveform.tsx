import { createEffect, createSignal, onCleanup } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"

type WaveformMode = "static" | "scrolling"

function LiveWaveform(props: {
  active: boolean
  processing: boolean
  mode: WaveformMode
  class?: string
  height?: number
  barWidth?: number
  barGap?: number
  barRadius?: number
  barColor?: string
  fadeEdges?: boolean
  fadeWidth?: number
  sensitivity?: number
  smoothingTimeConstant?: number
  fftSize?: number
  historySize?: number
  updateRate?: number
}) {
  let canvasRef: HTMLCanvasElement | undefined
  let containerRef: HTMLDivElement | undefined
  const history: number[] = []
  let staticBars: number[] = []
  let lastActiveData: number[] = []
  let analyser: AnalyserNode | null = null
  let audioContext: AudioContext | null = null
  let stream: MediaStream | null = null
  let animationFrame = 0
  let processingAnimationFrame = 0
  let lastUpdate = 0
  let transitionProgress = 0
  let needsRedraw = true
  let gradientCache: CanvasGradient | null = null
  let lastWidth = 0

  const barWidth = () => props.barWidth ?? 3
  const barGap = () => props.barGap ?? 1
  const barRadius = () => props.barRadius ?? 1.5
  const baseBarHeight = () => 4
  const height = () => props.height ?? 64
  const sensitivity = () => props.sensitivity ?? 1
  const smoothing = () => props.smoothingTimeConstant ?? 0.8
  const fftSize = () => props.fftSize ?? 256
  const historySize = () => props.historySize ?? 60
  const updateRate = () => props.updateRate ?? 30
  const fadeEdges = () => props.fadeEdges ?? true
  const fadeWidth = () => props.fadeWidth ?? 24

  const stopStream = () => {
    stream?.getTracks().forEach((track) => track.stop())
    stream = null
    if (audioContext && audioContext.state !== "closed") {
      void audioContext.close()
    }
    audioContext = null
    analyser = null
  }

  createEffect(() => {
    if (!canvasRef || !containerRef) return

    const resizeObserver = new ResizeObserver(() => {
      if (!canvasRef || !containerRef) return
      const rect = containerRef.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvasRef.width = rect.width * dpr
      canvasRef.height = rect.height * dpr
      canvasRef.style.width = `${rect.width}px`
      canvasRef.style.height = `${rect.height}px`

      const ctx = canvasRef.getContext("2d")
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      gradientCache = null
      lastWidth = rect.width
      needsRedraw = true
    })

    resizeObserver.observe(containerRef)
    onCleanup(() => resizeObserver.disconnect())
  })

  createEffect(() => {
    cancelAnimationFrame(processingAnimationFrame)

    if (props.processing && !props.active) {
      let time = 0
      transitionProgress = 0

      const animateProcessing = () => {
        time += 0.03
        transitionProgress = Math.min(1, transitionProgress + 0.02)
        const width = containerRef?.getBoundingClientRect().width || 200
        const count = Math.floor(width / (barWidth() + barGap()))
        const nextBars: number[] = []

        for (let i = 0; i < count; i++) {
          const normalized =
            props.mode === "static" ? (i - count / 2) / (count / 2 || 1) : i / count
          const centerWeight = 1 - Math.abs(normalized) * 0.4
          const wave1 = Math.sin(time * 1.5 + i * 0.15) * 0.25
          const wave2 = Math.sin(time * 0.8 - i * 0.1) * 0.2
          const wave3 = Math.cos(time * 2 + i * 0.05) * 0.15
          const processingValue = (0.2 + wave1 + wave2 + wave3) * centerWeight
          const lastValue = lastActiveData[Math.min(i, lastActiveData.length - 1)] || 0
          const value =
            lastActiveData.length > 0 && transitionProgress < 1
              ? lastValue * (1 - transitionProgress) + processingValue * transitionProgress
              : processingValue

          nextBars.push(Math.max(0.05, Math.min(1, value)))
        }

        if (props.mode === "static") {
          staticBars = nextBars
        } else {
          history.splice(0, history.length, ...nextBars)
        }

        needsRedraw = true
        processingAnimationFrame = requestAnimationFrame(animateProcessing)
      }

      processingAnimationFrame = requestAnimationFrame(animateProcessing)
    } else if (!props.active && !props.processing) {
      let fadeProgress = 0
      const fadeToIdle = () => {
        fadeProgress += 0.03
        if (fadeProgress < 1) {
          if (props.mode === "static") {
            staticBars = staticBars.map((value) => value * (1 - fadeProgress))
          } else {
            for (let i = 0; i < history.length; i += 1)
              history[i] = history[i]! * (1 - fadeProgress)
          }
          needsRedraw = true
          requestAnimationFrame(fadeToIdle)
        } else if (props.mode === "static") {
          staticBars = []
        } else {
          history.splice(0, history.length)
        }
      }

      if (staticBars.length > 0 || history.length > 0) requestAnimationFrame(fadeToIdle)
    }
  })

  createEffect(() => {
    if (!props.active) {
      stopStream()
      cancelAnimationFrame(animationFrame)
      animationFrame = 0
      return
    }

    let cancelled = false
    const nextFftSize = fftSize()
    const nextSmoothing = smoothing()

    void navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })
      .then((mediaStream) => {
        if (cancelled) {
          mediaStream.getTracks().forEach((track) => track.stop())
          return
        }

        stream = mediaStream
        const AudioContextConstructor =
          window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

        if (!AudioContextConstructor) return

        audioContext = new AudioContextConstructor()
        analyser = audioContext.createAnalyser()
        analyser.fftSize = nextFftSize
        analyser.smoothingTimeConstant = nextSmoothing
        audioContext.createMediaStreamSource(mediaStream).connect(analyser)
        history.splice(0, history.length)
      })
      .catch(() => {
        // Leave the component in a safe visual-only state if mic access fails.
      })

    onCleanup(() => {
      cancelled = true
      stopStream()
      cancelAnimationFrame(animationFrame)
    })
  })

  createEffect(() => {
    const canvas = canvasRef
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = (currentTime: number) => {
      const rect = canvas.getBoundingClientRect()

      if (props.active && analyser && currentTime - lastUpdate > updateRate()) {
        lastUpdate = currentTime
        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(dataArray)

        if (props.mode === "static") {
          const relevantData = dataArray.slice(
            Math.floor(dataArray.length * 0.05),
            Math.floor(dataArray.length * 0.4)
          )
          const count = Math.floor(rect.width / (barWidth() + barGap()))
          const half = Math.floor(count / 2)
          const nextBars: number[] = []

          for (let i = half - 1; i >= 0; i -= 1) {
            const dataIndex = Math.floor((i / (half || 1)) * relevantData.length)
            nextBars.push(
              Math.max(0.05, Math.min(1, (relevantData[dataIndex]! / 255) * sensitivity()))
            )
          }
          for (let i = 0; i < half; i += 1) {
            const dataIndex = Math.floor((i / (half || 1)) * relevantData.length)
            nextBars.push(
              Math.max(0.05, Math.min(1, (relevantData[dataIndex]! / 255) * sensitivity()))
            )
          }

          staticBars = nextBars
          lastActiveData = nextBars
        } else {
          const relevantData = dataArray.slice(
            Math.floor(dataArray.length * 0.05),
            Math.floor(dataArray.length * 0.4)
          )
          const average =
            relevantData.reduce((sum, value) => sum + value, 0) / (relevantData.length || 1)
          history.push(Math.min(1, Math.max(0.05, (average / 255) * sensitivity())))
          lastActiveData = [...history]
          if (history.length > historySize()) history.shift()
        }

        needsRedraw = true
      }

      if (!needsRedraw && !props.active) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      needsRedraw = props.active
      ctx.clearRect(0, 0, rect.width, rect.height)
      const computedBarColor = props.barColor || getComputedStyle(canvas).color || "#000"
      const step = barWidth() + barGap()
      const count = Math.floor(rect.width / step)
      const centerY = rect.height / 2
      const dataToRender = props.mode === "static" ? staticBars : history

      for (let i = 0; i < count && i < dataToRender.length; i += 1) {
        const value =
          props.mode === "static" ? dataToRender[i]! : dataToRender[dataToRender.length - 1 - i]!
        const x = props.mode === "static" ? i * step : rect.width - (i + 1) * step
        const barHeight = Math.max(baseBarHeight(), value * rect.height * 0.8)
        const y = centerY - barHeight / 2
        ctx.fillStyle = computedBarColor
        ctx.globalAlpha = 0.4 + value * 0.6
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth(), barHeight, barRadius())
        ctx.fill()
      }

      if (fadeEdges() && fadeWidth() > 0 && rect.width > 0) {
        if (!gradientCache || lastWidth !== rect.width) {
          const gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
          const fadePercent = Math.min(0.3, fadeWidth() / rect.width)
          gradient.addColorStop(0, "rgba(255,255,255,1)")
          gradient.addColorStop(fadePercent, "rgba(255,255,255,0)")
          gradient.addColorStop(1 - fadePercent, "rgba(255,255,255,0)")
          gradient.addColorStop(1, "rgba(255,255,255,1)")
          gradientCache = gradient
          lastWidth = rect.width
        }

        ctx.globalCompositeOperation = "destination-out"
        ctx.fillStyle = gradientCache
        ctx.fillRect(0, 0, rect.width, rect.height)
        ctx.globalCompositeOperation = "source-over"
      }

      ctx.globalAlpha = 1
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    onCleanup(() => cancelAnimationFrame(animationFrame))
  })

  return (
    <div
      ref={containerRef}
      class={cn("relative h-full w-full", props.class)}
      style={{ height: `${height()}px` }}
      aria-label={
        props.active
          ? "Live audio waveform"
          : props.processing
            ? "Processing audio"
            : "Audio waveform idle"
      }
      role="img"
    >
      {!props.active && !props.processing ? (
        <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dotted border-muted-foreground/20" />
      ) : null}
      <canvas ref={canvasRef} class="block h-full w-full" aria-hidden="true" />
    </div>
  )
}

export function LiveWaveformCard() {
  const [active, setActive] = createSignal(false)
  const [processing, setProcessing] = createSignal(true)
  const [mode, setMode] = createSignal<WaveformMode>("static")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Audio Waveform</CardTitle>
        <CardDescription>
          Real-time microphone input visualization with audio reactivity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LiveWaveform
          active={active()}
          processing={processing()}
          height={80}
          barWidth={3}
          barGap={2}
          mode={mode()}
          fadeEdges
          barColor="gray"
          historySize={120}
        />
      </CardContent>
      <CardFooter class="gap-2">
        <Button
          size="sm"
          variant={active() ? "default" : "outline"}
          onClick={() => {
            const next = !active()
            setActive(next)
            if (next) setProcessing(false)
          }}
        >
          {active() ? "Stop" : "Start"} Listening
        </Button>
        <Button
          size="sm"
          variant={processing() ? "default" : "outline"}
          onClick={() => {
            const next = !processing()
            setProcessing(next)
            if (next) setActive(false)
          }}
        >
          {processing() ? "Stop" : "Start"} Processing
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setMode(mode() === "static" ? "scrolling" : "static")}
        >
          {mode() === "static" ? "Static" : "Scrolling"}
        </Button>
      </CardFooter>
    </Card>
  )
}
