import { motion } from 'framer-motion'
import {
  Instagram,
  Play,
  Clock
} from "lucide-react";
import { INSTA_URL } from '../config'


export default function VideoCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
      whileHover={{ y: -7, boxShadow: '0 18px 50px rgba(200,149,108,0.24)' }}
      style={{ borderRadius: 20, overflow: 'hidden', background: 'rgba(255,253,248,0.9)', border: '1px solid rgba(212,175,106,0.18)', boxShadow: '0 4px 24px rgba(200,149,108,0.1)', transition: 'box-shadow 0.35s' }}
    >
      {/* Thumbnail */}
      <a
  href={item.video}
  target="_blank"
  rel="noreferrer"
  style={{
    position: 'relative',
    height: 200,
    overflow: 'hidden',
    background: 'rgba(248,231,231,0.4)',
    cursor: 'pointer',
    display: 'block'
  }}
        onMouseEnter={e => { e.currentTarget.querySelector('.play-btn').style.opacity = '1'; e.currentTarget.querySelector('img').style.transform = 'scale(1.06)' }}
        onMouseLeave={e => { e.currentTarget.querySelector('.play-btn').style.opacity = '0'; e.currentTarget.querySelector('img').style.transform = 'scale(1)' }}>
        <img
  src={item.thumbnail}
  alt={item.name}
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
    display: 'block'
  }}
/>
        <div className="play-btn" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(139,58,42,0.08)', opacity: 0, transition: 'opacity 0.3s' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,253,248,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(200,149,108,0.3)' }}>
            <Play size={18} style={{ color: 'var(--rose-gold)', fill: 'var(--rose-gold)', marginLeft: 3 }} />
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', padding: '3px 8px', borderRadius: 999 }}>
          <Clock size={10} /> {item.duration}
        </div>
      </a>

      <div style={{ padding: '18px 18px 20px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose-gold)', marginBottom: 4 }}>{item.category}</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, color: 'var(--deep-rose)', marginBottom: 14 }}>{item.name}</div>
        <div
  style={{
    display: 'flex',
    gap: '10px'
  }}
>
  <a
    href={item.video}
    target="_blank"
    rel="noreferrer"
    className="btn-primary"
    style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '0.82rem',
      padding: '10px 0',
      borderRadius: 10,
      textDecoration: 'none'
    }}
  >
    <Play size={13} />
    Watch Video
  </a>

  <a
    href={INSTA_URL}
    target="_blank"
    rel="noreferrer"
    className="btn-secondary"
    style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '0.82rem',
      padding: '10px 0',
      borderRadius: 10,
      textDecoration: 'none'
    }}
  >
    <Instagram size={13} />
    Instagram
  </a>
</div>
      </div>
    </motion.div>
  )
}