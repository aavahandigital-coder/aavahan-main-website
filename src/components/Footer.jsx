import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, Mail, Heart } from 'lucide-react'
import { INSTA_URL } from '../config'
import { CONFIG } from '../config'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--cream)', borderTop: '1px solid rgba(237,224,212,0.8)', paddingTop: 56, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 600, color: 'var(--deep-rose)', marginBottom: 4 }}>
              {CONFIG.brandName}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--soft-gold)', marginBottom: 14 }}>
              Digital Invitations & Celebrations
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>
              Crafting premium digital experiences for life's most beautiful moments.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div className="section-label" style={{ marginBottom: 18 }}>Explore</div>
            {[
              { to: '/websites',  label: 'Website Invitations' },
              { to: '/videos',    label: 'Video Invitations' },
              { to: '/cards',     label: 'Card Designs' },
              { to: '/portfolio', label: 'Our Portfolio' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem',
                color: 'var(--text-mid)', marginBottom: 10,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--rose-gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-mid)'}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div>
            <div className="section-label" style={{ marginBottom: 18 }}>Connect</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { href: INSTA_URL, icon: <Instagram size={15} />, label: 'Instagram' },
                { href: `mailto:${CONFIG.email}`, icon: <Mail size={15} />, label: CONFIG.email },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'var(--text-mid)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--rose-gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-mid)'}>
                  {item.icon} {item.label}
                </a>
              ))}
              <a href={CONFIG.googleFormUrl} target="_blank" rel="noreferrer"
                className="btn-primary"
                style={{ marginTop: 6, padding: '10px 22px', borderRadius: 999, fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', width: 'fit-content' }}>
                Place an Order
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(237,224,212,0.6)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'var(--text-light)' }}>
            © {new Date().getFullYear()} {CONFIG.brandName}. All rights reserved.
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 4 }}>
            Made with <Heart size={11} style={{ color: 'var(--rose-gold)', fill: 'var(--rose-gold)' }} /> for beautiful celebrations
          </span>
        </div>
      </div>
    </footer>
  )
}