import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe, Video, CreditCard, Sparkles } from 'lucide-react'

const services = [
  { icon: Globe,       title: 'Website Invitations', desc: 'Custom wedding, birthday, and celebration websites guests can visit from any device.', to: '/websites',  color: '#C8956C' },
  { icon: Video,       title: 'Video Invitations',   desc: 'Cinematic video invitations perfect for WhatsApp, Instagram, and email sharing.',    to: '/videos',    color: '#D4AF6A' },
  { icon: CreditCard,  title: 'Digital Card Designs', desc: 'Exquisite digital cards combining traditional artistry with modern design.',         to: '/cards',     color: '#C8956C' },
  { icon: Sparkles,    title: 'Surprise Experiences', desc: 'Curated surprise celebration packages — from secret event reveals to personalised digital surprises.', to: '/#order', color: '#D4AF6A' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 38 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22,1,0.36,1] } }),
}

export default function Services() {
  return (
    <section id="services" style={{ padding: '96px 0', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.p className="section-label" style={{ marginBottom: 10 }}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            What We Create
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 12 }}>
            Our Services
          </motion.h2>
          <div className="gold-divider" />
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div key={s.title}
                custom={i} variants={fadeUp}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -8, boxShadow: '0 20px 56px rgba(200,149,108,0.22)' }}
                className="glass-card card-shadow"
                style={{ borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 18, transition: 'box-shadow 0.35s' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} style={{ color: s.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, color: 'var(--deep-rose)', marginBottom: 10 }}>
                    {s.title}
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>
                    {s.desc}
                  </p>
                </div>
                <Link to={s.to} style={{
                  textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem',
                  fontWeight: 500, color: 'var(--rose-gold)', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  Learn More <span style={{ fontSize: '1.1rem' }}>→</span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}