import { motion } from 'framer-motion'
import { Smartphone, Palette, LayoutTemplate, Zap, IndianRupee, Heart } from 'lucide-react'

const items = [
  { icon: Smartphone,    title: 'Mobile Friendly',       desc: 'Optimised for every screen — perfect for WhatsApp and Instagram sharing.' },
  { icon: Palette,       title: 'Custom Designs',         desc: 'Fully personalised to your style, colours, and celebration theme.' },
  { icon: LayoutTemplate,title: 'Ready Templates',        desc: 'Choose from our curated library and go live in hours, not days.' },
  { icon: Zap,           title: 'Fast Delivery',          desc: '3-5 days turn around once details are confirmed.' },
  { icon: IndianRupee,   title: 'Affordable Pricing',     desc: 'Premium quality at accessible prices — because every celebration deserves beauty.' },
  { icon: Heart,         title: 'Personalised Care',      desc: 'We treat every order like our own celebration. Your joy is our craft.' },
]

export default function WhyAavahan() {
  return (
    <section style={{ padding: '96px 0', background: 'var(--ivory)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 360, height: 360, background: 'rgba(248,231,231,0.3)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.p className="section-label" style={{ marginBottom: 10 }}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            The Aavahan Difference
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 12 }}>
            Why Choose Us
          </motion.h2>
          <div className="gold-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
                whileHover={{ y: -5 }}
                style={{
                  background: 'var(--cream)', borderRadius: 16, padding: '22px 20px',
                  border: '1px solid rgba(237,224,212,0.7)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,149,108,0.35)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(200,149,108,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(237,224,212,0.7)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(248,231,231,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon size={19} style={{ color: 'var(--rose-gold)' }} />
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 600, color: 'var(--deep-rose)', marginBottom: 8 }}>
                  {item.title}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}