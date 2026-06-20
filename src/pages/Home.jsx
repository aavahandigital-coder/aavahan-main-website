import { motion } from 'framer-motion'
import Hero         from '../components/Hero.jsx'
import Services     from '../components/Services.jsx'
import WhyAavahan   from '../components/WhyAavahan.jsx'
import Process      from '../components/Process.jsx'
import CTA          from '../components/CTA.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FAQ          from '../components/FAQ.jsx'

const pageVariants = {
  initial: { opacity: 0 },
  in:      { opacity: 1, transition: { duration: 0.5 } },
  out:     { opacity: 0, transition: { duration: 0.25 } },
}

export default function Home() {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
      <Hero />
      <Services />
      <WhyAavahan />
      <Process />
      <CTA />
      <Testimonials />
      <FAQ />
    </motion.div>
  )
}