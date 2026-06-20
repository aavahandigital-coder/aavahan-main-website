import { useState } from 'react'
import { motion } from 'framer-motion'
import websitesData   from '../data/websites.js'
import PageHero       from '../components/PageHero.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import TemplateCard   from '../components/TemplateCard.jsx'
import CTA            from '../components/CTA.jsx'

const cats = [...new Set(websitesData.map(d => d.category))]
const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1, transition: { duration: 0.5 } }, out: { opacity: 0 } }

export default function Websites() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? websitesData : websitesData.filter(d => d.category === active)

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
      <PageHero label="Browse & Choose" title="Website Invitations" description="Stunning invitation websites for every celebration — choose a template, personalise it, and go live." />
      <section style={{ padding: '56px 0', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <CategoryFilter categories={cats} active={active} onChange={setActive} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 22 }}>
            {filtered.map(item => <TemplateCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>
      <CTA />
    </motion.div>
  )
}