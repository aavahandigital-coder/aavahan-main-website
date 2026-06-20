import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Submit Enquiry',        desc: 'Fill out our quick Google Form with your event details.' },
  { num: '02', title: 'Discuss Requirements',  desc: 'We connect on WhatsApp to understand your vision.' },
  { num: '03', title: 'Receive Quotation',     desc: 'A transparent, itemised quote with timeline.' },
  { num: '04', title: 'Advance Payment',       desc: 'A small advance confirms your booking and we begin.' },
  { num: '05', title: 'Design & Development',  desc: 'We craft your invitation and share previews for approval.' },
  { num: '06', title: 'Final Delivery',        desc: 'Your creation is delivered, ready to share with the world.' },
]

export default function Process() {
  return (
    <section style={{ padding: '96px 0', background: 'rgba(248,231,231,0.25)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <motion.p className="section-label" style={{ marginBottom: 10 }}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Simple &amp; Transparent
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 12 }}>
            How It Works
          </motion.h2>
          <div className="gold-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24, position: 'relative' }}>
          {steps.map((step, i) => (
            <motion.div key={step.num}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}
            >
              {/* Circle */}
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'var(--cream)',
                border: '2px solid rgba(212,175,106,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(200,149,108,0.1)',
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: 'var(--soft-gold)' }}>
                  {step.num}
                </span>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.88rem', fontWeight: 600, color: 'var(--deep-rose)', lineHeight: 1.3 }}>
                {step.title}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'var(--text-mid)', lineHeight: 1.65 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}