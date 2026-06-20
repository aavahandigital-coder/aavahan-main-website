import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ChevronDown } from 'lucide-react'
import { CONFIG } from '../config.js'

/* ── Falling petal canvas ── */
function PetalCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const COLORS = [
      'rgba(200,149,108,0.55)',
      'rgba(212,175,106,0.45)',
      'rgba(248,231,231,0.8)',
      'rgba(237,224,212,0.65)',
      'rgba(200,149,108,0.3)',
    ]

    const petals = Array.from({ length: 32 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H - H,
      size:  Math.random() * 11 + 4,
      speed: Math.random() * 0.9 + 0.25,
      angle: Math.random() * Math.PI * 2,
      spin:  (Math.random() - 0.5) * 0.025,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.3,
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      petals.forEach(p => {
        p.y     += p.speed
        p.x     += Math.sin(p.angle) * 0.55
        p.angle += p.spin
        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.globalAlpha = p.alpha
        ctx.fillStyle   = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size * 0.42, p.size, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

/* ── Rotating ornament SVG ── */
function Ornament({ style }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      style={{ ...style, position: 'absolute', pointerEvents: 'none' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx="100" cy="100" r="72" stroke="#D4AF6A" strokeWidth="0.5" strokeDasharray="5 10" opacity="0.35" fill="none" />
      <circle cx="100" cy="100" r="52" stroke="#C8956C" strokeWidth="0.4" opacity="0.25" fill="none" />
      {[0,60,120,180,240,300].map((deg, i) => (
        <g key={i} transform={`rotate(${deg} 100 100)`}>
          <ellipse cx="100" cy="38" rx="7" ry="17" fill="#D4AF6A" opacity="0.18" />
        </g>
      ))}
      <circle cx="100" cy="100" r="7" fill="#D4AF6A" opacity="0.22" />
    </motion.svg>
  )
}

export default function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', background: 'var(--ivory)',
    }}>
      <PetalCanvas />

      {/* Soft glow blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '15%', width: 380, height: 380, background: 'rgba(248,231,231,0.45)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 300, height: 300, background: 'rgba(237,224,212,0.5)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div
  style={{
    position: 'absolute',
    top: '15%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 500,
    height: 500,
    background: 'rgba(200,149,108,0.08)',
    borderRadius: '50%',
    filter: 'blur(120px)',
    pointerEvents: 'none'
  }}
/>

      {/* Ornaments */}
      <Ornament style={{ width: 140, top: 60, left: 20, opacity: 0.6 }} />
      <Ornament style={{ width: 100, bottom: 60, right: 20, opacity: 0.45, animationDirection: 'reverse' }} />

      {/* Gold vertical line */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: 100, background: 'linear-gradient(to bottom, transparent, rgba(212,175,106,0.4))', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 860, margin: '0 auto' }}>
        <motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  style={{ marginBottom: 20 }}
>
  <img
    src="public/logo.png"
    alt="Aavahan"
    className="hero-logo"
  />
</motion.div>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 22 }}
        >
          <div style={{ width: 36, height: 1, background: 'rgba(212,175,106,0.6)' }} />
          <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Sparkles size={10} style={{ color: 'var(--soft-gold)' }} />
            CRAFTING ELEGANT CELEBRATION EXPERIENCES
          </span>
          <div style={{ width: 36, height: 1, background: 'rgba(212,175,106,0.6)' }} />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            fontWeight: 600,
            color: 'var(--deep-rose)',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            marginBottom: 14,
            textShadow: '0 4px 48px rgba(200,149,108,0.14)',
          }}
        >
          {CONFIG.brandName}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.1rem, 3vw, 1.75rem)',
            fontWeight: 300,
            color: 'var(--rose-gold)',
            letterSpacing: '0.04em',
            marginBottom: 20,
          }}
        >
          Crafting Elegant Digital Invitations
For Life's Most Meaningful Celebrations
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="gold-divider"
          style={{ marginBottom: 20 }}
        />

        {/* Description */}
        <motion.p
  style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(0.95rem, 1.7vw, 1rem)',
    color: 'var(--text-mid)',
    maxWidth: '1600px',
    margin: '0 auto 36px',
    lineHeight: 1.9,
    textAlign: 'left',

  }}
>
  <>
  Beautiful invitation websites, digital cards, and celebration experiences created for life's special moments
  <br />  
  <span style={{ paddingLeft: '220px' }}>
    Thoughtfully crafted with elegance and care
  </span>
  <br />
  <span style={{ paddingLeft: '280px' }}>
    To bring hearts together
  </span>
</>
</motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.9 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="/portfolio"
            className="btn-primary"
            style={{ padding: '14px 32px', borderRadius: 999, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-block' }}>
            View Portfolio
          </Link>
          <a href="#services"
            className="btn-secondary"
            style={{ padding: '14px 32px', borderRadius: 999, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-block' }}>
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={20} style={{ color: 'rgba(200,149,108,0.55)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}