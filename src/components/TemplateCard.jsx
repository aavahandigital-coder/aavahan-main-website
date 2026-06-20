import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, MessageCircle } from 'lucide-react'
import { INSTA_URL } from '../config'

const PLACEHOLDER = 'https://via.placeholder.com/400x260/F8E7E7/C8956C?text=Preview+Coming+Soon'

export default function TemplateCard({ item }) {
  const ref   = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = e => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    setTilt({ x: y * 9, y: x * -9 })
  }

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.12s ease',
        borderRadius: 20, overflow: 'hidden',
        background: 'rgba(255,253,248,0.9)',
        border: '1px solid rgba(212,175,106,0.18)',
        boxShadow: '0 4px 24px rgba(200,149,108,0.1)',
      }}
      whileHover={{ boxShadow: '0 18px 50px rgba(200,149,108,0.24)' }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: 'rgba(248,231,231,0.4)' }}>
        <img
          src={item.image || PLACEHOLDER}
          alt={item.name}
          onError={e => { e.target.src = PLACEHOLDER }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        {item.featured && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(212,175,106,0.9)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 600, padding: '3px 10px', borderRadius: 999, backdropFilter: 'blur(6px)' }}>
            Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '18px 18px 20px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose-gold)', marginBottom: 4 }}>
          {item.category}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, color: 'var(--deep-rose)', marginBottom: 8 }}>
          {item.name}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'var(--text-mid)', lineHeight: 1.65, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.description}
        </p>

        {item.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
            {item.tags.map(tag => <span key={tag} className="tag-chip">{tag}</span>)}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          {item.demoUrl && item.demoUrl !== '#' && (
            <a href={item.demoUrl} target="_blank" rel="noreferrer"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', fontWeight: 500, padding: '9px 0', borderRadius: 10, border: '1.5px solid rgba(237,224,212,0.9)', color: 'var(--text-mid)', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,149,108,0.5)'; e.currentTarget.style.color = 'var(--rose-gold)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(237,224,212,0.9)'; e.currentTarget.style.color = 'var(--text-mid)' }}>
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          <a href={INSTA_URL} target="_blank" rel="noreferrer"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', fontWeight: 500, padding: '9px 0', borderRadius: 10, border: '1.5px solid rgba(237,224,212,0.9)', color: 'var(--text-mid)', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,149,108,0.5)'; e.currentTarget.style.color = 'var(--rose-gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(237,224,212,0.9)'; e.currentTarget.style.color = 'var(--text-mid)' }}>
            <ExternalLink size={12} /> Instagram
          </a>
        </div>
      </div>
    </motion.div>
  )
}