import { useState } from 'react'
import { motion } from 'framer-motion'
import videosData     from '../data/videos.js'
import PageHero       from '../components/PageHero.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import VideoCard      from '../components/VideoCard.jsx'
import CTA            from '../components/CTA.jsx'

const cats = [...new Set(videosData.map(d => d.category))]
const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1, transition: { duration: 0.5 } }, out: { opacity: 0 } }

export default function Videos() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? videosData : videosData.filter(d => d.category === active)

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
      <PageHero label="Cinematic Invitations" title="Video Invitations" description="Beautifully crafted video invitations that capture the emotion of your celebration." />
      <section style={{ padding: '56px 0', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <CategoryFilter categories={cats} active={active} onChange={setActive} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
            {filtered.map(item => <VideoCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>
      <CTA />
    </motion.div>
  )
}