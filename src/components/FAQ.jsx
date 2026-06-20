import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  { q: 'What services does Aavahan offer?', a: 'We create premium digital invitations including website invitations, video invitations, digital card designs, and surprise celebration experiences — all custom-crafted for weddings, birthdays, engagements, anniversaries, and more.' },
  { q: 'Do you provide fully custom designs?', a: 'Absolutely. Every project is personalised to your style, colour preferences, and celebration theme. We start from our premium templates and customise every element to feel uniquely yours.' },
  { q: 'How long does delivery take?', a: 'Most digital card designs are delivered within 12–24 hours. Website and video invitations typically take 2–5 working days, depending on complexity. Rush orders can be arranged.' },
  { q: 'Do you create invitations for all types of events?', a: 'Yes! We design for weddings, engagements, birthdays, anniversaries, housewarmings, namakaran, baby showers, corporate events, and any other celebration you can imagine.' },
  { q: 'Can I request revisions?', a: 'Yes. Every order includes revision rounds to ensure you are completely happy with the final result. We work with you until the design feels perfect.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <motion.p className="section-label" style={{ marginBottom: 10 }}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Got Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 12 }}>
            Frequently Asked
          </motion.h2>
          <div className="gold-divider" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="glass-card"
              style={{ borderRadius: 14, border: '1px solid rgba(237,224,212,0.7)', overflow: 'hidden' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 500, color: open === i ? 'var(--rose-gold)' : 'var(--deep-rose)' }}>
                  {f.q}
                </span>
                <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: 'rgba(248,231,231,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {open === i ? <Minus size={13} style={{ color: 'var(--rose-gold)' }} /> : <Plus size={13} style={{ color: 'var(--rose-gold)' }} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                  >
                    <div style={{ padding: '0 20px 18px' }}>
                      <div style={{ height: 1, background: 'rgba(237,224,212,0.6)', marginBottom: 14 }} />
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--text-mid)', lineHeight: 1.75 }}>
                        {f.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}