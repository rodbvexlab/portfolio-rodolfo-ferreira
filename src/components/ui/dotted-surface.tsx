/**
 * DottedSurface — adapted for Vite + React (no Next.js, no next-themes)
 *
 * Renders an animated 3-D particle wave using Three.js.
 * Always renders in "dark" mode (white dots) since this portfolio
 * is a dark-only experience.
 *
 * The component appends a WebGL canvas to its container div and
 * cleans up on unmount. Position it however you like via className;
 * the default is `pointer-events-none absolute inset-0` so it sits
 * behind content inside a `relative` parent.
 */
import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const SEPARATION = 150
    const AMOUNTX = 40
    const AMOUNTY = 60

    // ── Scene ──────────────────────────────────────────────
    const scene = new THREE.Scene()

    const w = window.innerWidth
    const h = window.innerHeight

    const camera = new THREE.PerspectiveCamera(60, w / h, 1, 10000)
    camera.position.set(0, 355, 1220)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // cap at 2× for perf
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 0) // transparent background
    container.appendChild(renderer.domElement)

    // ── Particles ──────────────────────────────────────────
    const geometry = new THREE.BufferGeometry()
    const positions: number[] = []
    const colors: number[] = []

    // Subtle cyan-white tint to match the site's accent (#4cd7f6)
    const r = 0.55
    const g = 0.72
    const b = 0.82

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions.push(
          ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
          0,
          iy * SEPARATION - (AMOUNTY * SEPARATION) / 2,
        )
        colors.push(r, g, b)
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 6,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // ── Animation ──────────────────────────────────────────
    let count = 0
    let rafId: number

    const animate = () => {
      rafId = requestAnimationFrame(animate)

      const pos = geometry.attributes.position.array as Float32Array
      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Animate Y with layered sine waves — creates organic ripple
          pos[i * 3 + 1] =
            Math.sin((ix + count) * 0.3) * 55 +
            Math.sin((iy + count) * 0.5) * 55
          i++
        }
      }
      geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
      count += 0.08 // slightly slower = more cinematic
    }

    animate()

    // ── Resize ────────────────────────────────────────────
    const onResize = () => {
      const nw = window.innerWidth
      const nh = window.innerHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize, { passive: true })

    // ── Cleanup ───────────────────────────────────────────
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)

      scene.traverse((obj) => {
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, []) // dark-only site — no theme dependency

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0', className)}
      {...props}
    />
  )
}
