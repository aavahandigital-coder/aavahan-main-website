import { useState } from 'react'
import { motion } from 'framer-motion'
import cardsData      from '../data/cards.js'
import PageHero       from '../components/PageHero.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import CardItem       from '../components/CardItem.jsx'
import CTA            from '../components/CTA.jsx'

const cats = [...new Set(cardsData.map(d => d.category))]
const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1, transition: { duration: 0.5 } }, out: { opacity: 0 } }

export default function Cards() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? cardsData : cardsData.filter(d => d.category === active)

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
      <PageHero label="Digital Card Designs" title="Invitation Cards" description="Exquisite digital card designs — from traditional florals to modern minimalist. Every style, every occasion." />
      <section style={{ padding: '56px 0', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <CategoryFilter categories={cats} active={active} onChange={setActive} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
            {filtered.map(item => <CardItem key={item.id} item={item} />)}
          </div>
        </div>
      </section>
      <CTA />
    </motion.div>
  )
}