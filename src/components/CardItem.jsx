import { motion } from 'framer-motion'
import { Eye, Instagram } from 'lucide-react'
import { INSTA_URL } from '../config'

export default function CardItem({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7 }}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: 'rgba(255,253,248,0.9)',
        border: '1px solid rgba(212,175,106,0.18)',
        boxShadow: '0 4px 24px rgba(200,149,108,0.1)'
      }}
    >
      <div
        style={{
          position: 'relative',
          paddingBottom: '133%',
          overflow: 'hidden'
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      <div style={{ padding: '14px' }}>
        <div
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: 12
          }}
        >
          {item.name}
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <a
            href={item.pdf}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '8px 0',
              borderRadius: 8,
              border: '1px solid #ddd',
              textDecoration: 'none'
            }}
          >
            <Eye size={11} />
            Preview
          </a>

          <a
            href={INSTA_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '8px 0',
              borderRadius: 8,
              textDecoration: 'none'
            }}
          >
            <Instagram size={11} />
            Instagram
          </a>
        </div>
      </div>
    </motion.div>
  )
}