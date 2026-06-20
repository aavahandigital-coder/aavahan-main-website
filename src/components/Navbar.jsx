import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { CONFIG } from '../config.js'

const links = [
  { to: '/',          label: 'Home' },
  { to: '/websites',  label: 'Websites' },
  { to: '/videos',    label: 'Videos' },
  { to: '/cards',     label: 'Cards' },
  { to: '/portfolio', label: 'Portfolio' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location                = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const navBg = scrolled
    ? 'rgba(255,253,248,0.96)'
    : 'transparent'
  const navShadow = scrolled
    ? '0 2px 24px rgba(200,149,108,0.12)'
    : 'none'
  const navBorder = scrolled
    ? '1px solid rgba(237,224,212,0.7)'
    : '1px solid transparent'

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: navBg, boxShadow: navShadow, border: navBorder,
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          transition: 'background 0.4s, box-shadow 0.4s, border 0.4s',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }}
  >
    <img
      src="public/logo-mark(2).png"
      alt="Aavahan"
      style={{
        width: 42,
        height: 42,
        objectFit: 'contain'
      }}
    />

    <div style={{ lineHeight: 1 }}>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--deep-rose)',
          letterSpacing: '0.03em'
        }}
      >
        {CONFIG.brandName}
      </div>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.62rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--soft-gold)',
          marginTop: 1
        }}
      >
        Celebrations
      </div>
    </div>
  </div>
</Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                color: location.pathname === l.to ? 'var(--rose-gold)' : 'var(--text-mid)',
                borderBottom: location.pathname === l.to ? '1.5px solid var(--rose-gold)' : '1.5px solid transparent',
                paddingBottom: 2,
                transition: 'color 0.25s, border-color 0.25s',
              }}>
                {l.label}
              </Link>
            ))}
            <a href={CONFIG.googleFormUrl} target="_blank" rel="noreferrer"
              className="btn-primary"
              style={{ padding: '10px 22px', borderRadius: 999, fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block' }}>
              Start Your Invitation
            </a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--deep-rose)', display: 'none' }} className="hamburger">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(255,253,248,0.98)',
              backdropFilter: 'blur(16px)',
              display: 'flex', flexDirection: 'column',
              paddingTop: 90, paddingLeft: 32,
            }}
          >
            <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--deep-rose)' }}>
              <X size={24} />
            </button>
            {links.map((l, i) => (
              <motion.div key={l.to} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to={l.to} style={{
                  display: 'block', textDecoration: 'none', padding: '14px 0',
                  fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500,
                  color: location.pathname === l.to ? 'var(--rose-gold)' : 'var(--deep-rose)',
                  borderBottom: '1px solid rgba(237,224,212,0.4)',
                }}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} style={{ marginTop: 28 }}>
              <a href={CONFIG.googleFormUrl} target="_blank" rel="noreferrer"
                className="btn-primary"
                style={{ padding: '14px 32px', borderRadius: 999, fontSize: '1rem', textDecoration: 'none', display: 'inline-block' }}>
                Start Your Invitation
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: block !important; }
        }
      `}</style>
    </>
  )
}