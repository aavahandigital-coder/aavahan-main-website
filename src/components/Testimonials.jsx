import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

// Add real reviews here later — just add objects to this array
const testimonials = []

export default function Testimonials() {
  return (
    <section style={{ padding: '80px 0', background: 'var(--ivory)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <motion.p className="section-label" style={{ marginBottom: 10 }}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Happy Couples &amp; Families
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 12 }}>
            Love Notes
          </motion.h2>
          <div className="gold-divider" />
        </div>

        {testimonials.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginBottom: 16 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={18} style={{ color: 'var(--soft-gold)', fill: 'rgba(212,175,106,0.3)' }} />)}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--text-light)', marginBottom: 8 }}>
              Our first reviews are on their way…
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--text-light)' }}>
              Be among the first to celebrate with Aavahan.
            </p>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card card-shadow"
                style={{ borderRadius: 18, padding: '24px 22px' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={13} style={{ color: 'var(--soft-gold)', fill: 'var(--soft-gold)' }} />)}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: 14, lineHeight: 1.65 }}>
                  "{t.text}"
                </p>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: 'var(--deep-rose)' }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'var(--text-light)' }}>{t.event}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}