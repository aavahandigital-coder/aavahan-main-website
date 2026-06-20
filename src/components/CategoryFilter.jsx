import { motion } from 'framer-motion'

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
      {['All', ...categories].map(cat => (
        <motion.button key={cat} onClick={() => onChange(cat)} whileTap={{ scale: 0.94 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.82rem', fontWeight: 500,
            padding: '8px 18px', borderRadius: 999,
            border: active === cat ? '1.5px solid var(--rose-gold)' : '1.5px solid rgba(237,224,212,0.9)',
            background: active === cat ? 'var(--rose-gold)' : 'var(--cream)',
            color: active === cat ? '#fff' : 'var(--text-mid)',
            cursor: 'pointer',
            boxShadow: active === cat ? '0 4px 18px rgba(200,149,108,0.28)' : 'none',
            transition: 'all 0.25s ease',
          }}>
          {cat}
        </motion.button>
      ))}
    </div>
  )
}