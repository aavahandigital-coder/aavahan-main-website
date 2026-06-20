import { motion } from 'framer-motion'
import { Instagram, MessageCircle } from 'lucide-react'
import { INSTA_URL } from '../config'
import { CONFIG } from '../config'

export default function CTA() {
  return (
    <section id="order" style={{ padding: '96px 0', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: 260, height: 260, background: 'rgba(248,231,231,0.5)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: 220, height: 220, background: 'rgba(237,224,212,0.5)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card"
          style={{ borderRadius: 28, padding: '56px 40px', textAlign: 'center', boxShadow: '0 8px 48px rgba(200,149,108,0.14)' }}
        >
          <p className="section-label" style={{ marginBottom: 14 }}>Ready to Begin?</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 12 }}>
            Start Your Invitation
          </h2>
          <div className="gold-divider" style={{ marginBottom: 20 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Every celebration deserves a beautiful invitation. Share your vision with us and we'll craft something truly unforgettable.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={CONFIG.googleFormUrl} target="_blank" rel="noreferrer"
              className="btn-primary"
              style={{ padding: '14px 30px', borderRadius: 999, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-block' }}>
              Fill Enquiry Form
            </a>
            <a href={INSTA_URL} target="_blank" rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '14px 30px', borderRadius: 999, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Instagram size={17} /> Follow on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}