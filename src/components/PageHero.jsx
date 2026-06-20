import { motion } from 'framer-motion'


export default function PageHero({ label, title, description }) {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 64, background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: '30%', width: 280, height: 280, background: 'rgba(248,231,231,0.4)', borderRadius: '50%', filter: 'blur(72px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.p className="section-label" style={{ marginBottom: 10 }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
          {label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 14 }}>
          {title}
        </motion.h1>
        <div className="gold-divider" style={{ marginBottom: 16 }} />
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--text-mid)', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>
          {description}
        </motion.p>
      </div>
    </section>
  )
}