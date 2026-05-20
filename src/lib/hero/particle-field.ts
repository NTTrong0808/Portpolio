interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
}

export function createParticleField(canvas: HTMLCanvasElement, accentColor: string) {
  const ctx = canvas.getContext('2d')!
  const particles: Particle[] = []
  let mouse = { x: -9999, y: -9999 }
  let animId: number

  function resize() {
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    init()
  }

  function init() {
    particles.length = 0
    const count = Math.min(60, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }
  }

  function draw() {
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    ctx.clearRect(0, 0, w, h)

    for (const p of particles) {
      // Cursor repulsion
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 80) {
        const force = (80 - dist) / 80
        p.vx += (dx / dist) * force * 0.15
        p.vy += (dy / dist) * force * 0.15
      }

      p.vx *= 0.98
      p.vy *= 0.98
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = w
      if (p.x > w) p.x = 0
      if (p.y < 0) p.y = h
      if (p.y > h) p.y = 0

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = accentColor
      ctx.fill()
      ctx.globalAlpha = 1
    }

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          ctx.globalAlpha = (1 - dist / 100) * 0.15
          ctx.strokeStyle = accentColor
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      }
    }

    animId = requestAnimationFrame(draw)
  }

  function onMouseMove(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect()
    mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function start() {
    resize()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)
    animId = requestAnimationFrame(draw)
  }

  function stop() {
    cancelAnimationFrame(animId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', resize)
  }

  return { start, stop }
}
