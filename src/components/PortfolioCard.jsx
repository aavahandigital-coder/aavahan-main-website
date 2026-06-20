import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const PLACEHOLDER = 'https://via.placeholder.com/400x260/F8E7E7/C8956C?text=Portfolio'

export default function PortfolioCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, boxShadow: '0 18px 50px rgba(200,149,108,0.24)' }}
      style={{ borderRadius: 20, overflow: 'hidden', background: 'rgba(255,253,248,0.9)', border: '1px solid rgba(212,175,106,0.18)', boxShadow: '0 4px 24px rgba(200,149,108,0.1)', transition: 'box-shadow 0.35s' }}
    >
      <div style={{ position: 'relative', height: 210, overflow: 'hidden', background: 'rgba(248,231,231,0.4)', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.querySelector('.overlay').style.opacity = '1'; e.currentTarget.querySelector('img').style.transform = 'scale(1.06)' }}
        onMouseLeave={e => { e.currentTarget.querySelector('.overlay').style.opacity = '0'; e.currentTarget.querySelector('img').style.transform = 'scale(1)' }}>
        <img src={item.thumbnail || PLACEHOLDER} alt={item.title} onError={e => { e.target.src = PLACEHOLDER }}
          style={{ width: '100%', height: '100%', objectFit: 'card', transition: 'transform 0.5s ease', display: 'block' }} />
        <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(139,58,42,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s' }}>
          {item.projectUrl && item.projectUrl !== '#' && (
            <a href={item.projectUrl} target="_blank" rel="noreferrer"
              style={{ background: 'rgba(255,253,248,0.92)', color: 'var(--deep-rose)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 500, padding: '10px 20px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}>
              <ExternalLink size={13} /> View Project
            </a>
          )}
        </div>
      </div>
      <div style={{ padding: '16px 18px 20px' }}>
        {item.year && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: 'var(--soft-gold)', fontWeight: 500, letterSpacing: '0.15em' }}>{item.year}</div>}
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose-gold)', marginBottom: 4, marginTop: 3 }}>{item.category}</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, color: 'var(--deep-rose)', marginBottom: item.description ? 6 : 0 }}>{item.title}</div>
        {item.description && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'var(--text-mid)', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>}
      </div>
    </motion.div>
  )
}