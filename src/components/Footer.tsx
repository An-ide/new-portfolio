"use client"

import { useState, FormEvent } from "react"
import { ArrowRight, X } from 'lucide-react'
import { GoesOutComesInUnderline } from './UnderlineAnimations'
import GridDistortion from './GridDistortion'

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgvzgwaz"

export default function ContactFooter() {
  const [formOpen, setFormOpen] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    setShowError(true)
    setTimeout(() => setShowError(false), 4000)
  }

  return (
    <footer id="contact" style={{ width: '100%', background: '#0a0a0a' }}>
      <style>{`
        @media (max-width: 767px) {
          .footer-main { flex-direction: column !important; }
          .footer-left { padding: 40px 24px !important; }
          .footer-social { margin-left: 0 !important; margin-top: 40px !important; }
          .footer-right { width: 100% !important; flex: none !important; }
          .footer-right-top { padding: 24px !important; }
          .footer-form-area { padding: 24px 24px 0 !important; flex: none !important; }
          .footer-form-grid { grid-template-columns: 1fr !important; }
          .footer-distortion { height: 160px !important; }
        }
        .footer-form-area input::placeholder,
        .footer-form-area textarea::placeholder {
          color: #fff;
        }
      `}</style>

      {/* Mobile popup overlay */}
      {formOpen && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setFormOpen(false) }}
        >
          <div style={{
            background: '#1a1a1a',
            borderRadius: 16,
            padding: '32px 24px',
            width: '100%',
            maxWidth: 400,
            position: 'relative',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}>
            <button
              onClick={() => setFormOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
              }}
            >
              <X size={16} />
            </button>

            <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Let&apos;s Build Something
            </h3>
            <p style={{ color: '#666', fontSize: 13, marginBottom: 24, lineHeight: 1.5 }}>
              Fill in the details and I&apos;ll get back to you.
            </p>

            <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={() => setFormOpen(false)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                {['Name', 'Email', 'Phone', 'Subject'].map(label => (
                  <input
                    key={label}
                    name={label.toLowerCase()}
                    placeholder={label}
                    required={label === 'Email'}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #444',
                      padding: '10px 0',
                      color: '#fff',
                      fontSize: 16,
                      outline: 'none',
                    }}
                  />
                ))}
              </div>
              <textarea
                name="message"
                placeholder="Tell me about what you're interested in"
                rows={3}
                required
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #444',
                  padding: '10px 0',
                  color: '#fff',
                  fontSize: 16,
                  outline: 'none',
                  resize: 'none',
                  marginBottom: 24,
                  fontFamily: 'inherit',
                }}
              />
              <button type="submit" style={{ width: '100%', background: '#FFC100', color: '#000', border: 'none', padding: '14px', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main two-column section */}
      <div className="footer-main" style={{ display: 'flex', flexDirection: 'row' }}>
        {/* Left Column */}
        <div className="footer-left" style={{ flex: 1, padding: '64px 48px 64px 96px', display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-black" style={{ margin: '0 0 16px' }}>
              <div style={{ width: "fit-content" }} className="bg-white px-1 whitespace-nowrap mb-5 shadow-sm">
                Let&apos;s get
              </div>
              <div style={{ width: "fit-content" }} className="bg-white px-1 whitespace-nowrap shadow-sm">
                in touch
              </div>
            </h2>
            <p style={{ fontSize: 22, color: '#888', margin: '0 0 64px', fontWeight: 500 }}>
              Don&apos;t be afraid to say hello to me!
            </p>

            <div className="footer-social" style={{ display: 'flex', flexDirection: 'column', gap: 20, marginLeft: 80, marginTop: 240 }}>
              <a href="https://www.linkedin.com/in/anidecc/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#fff', fontSize: 28, fontWeight: 400, letterSpacing: '0.1em', display: 'inline-block', width: 'fit-content' }}>
                <GoesOutComesInUnderline label="LINKEDIN" direction="right" />
              </a>
              <a href="https://www.instagram.com/aniderw" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#fff', fontSize: 28, fontWeight: 400, letterSpacing: '0.1em', display: 'inline-block', width: 'fit-content' }}>
                <GoesOutComesInUnderline label="INSTAGRAM" direction="left" />
              </a>
              <a href="https://github.com/An-ide" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#fff', fontSize: 28, fontWeight: 400, letterSpacing: '0.1em', display: 'inline-block', width: 'fit-content' }}>
                <GoesOutComesInUnderline label="GITHUB" direction="right" />
              </a>
              <div style={{ marginTop: 8 }}>
                <a href="mailto:anidecc@aol.com" style={{ textDecoration: 'none', color: '#fff', fontSize: 28, fontWeight: 400, display: 'inline-block', width: 'fit-content' }}>
                  <GoesOutComesInUnderline label="ANIDECC@AOL.COM" direction="left" />
                </a>
              </div>
            </div>
            <div className="flex justify-center md:hidden" style={{ marginTop: 80, padding: '0 24px' }}>
              <img src="/soundgarden.jpg" alt="Soundgarden" style={{ width: '100%', maxWidth: 360, borderRadius: 8, objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="footer-right" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Top half — dark */}
          <div className="footer-right-top hidden md:flex" style={{ flex: 0.6, padding: '32px 48px', background: '#0a0a0a', flexDirection: 'column' }}>
            <div style={{ marginTop: 320, marginBottom: 48, display: 'flex', alignItems: 'center', gap: 32 }}>
              <svg width="200" height="16" viewBox="0 0 200 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <line x1="0" y1="8" x2="184" y2="8" stroke="#333" strokeWidth="3"/>
                <polygon points="184,2 198,8 184,14" fill="#333"/>
              </svg>
              <p style={{ fontSize: 22, color: '#888', lineHeight: 1.7, margin: 0 }}>
                Great! We&apos;re excited to hear from you and<br/>
                let&apos;s start something special together.<br/>
                call us for any inquiry.
              </p>
            </div>
          </div>

          {/* Bottom half — form (desktop only) */}
          <div className="hidden md:block footer-form-area" style={{ background: '#1a1a1a', padding: '48px 48px 48px 48px', marginRight: '15%' }}>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div className="footer-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 32px', marginBottom: 24 }}>
                {['Name', 'Email', 'Phone', 'Subject'].map(label => (
                  <input
                    key={label}
                    name={label.toLowerCase()}
                    placeholder={label}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #555',
                      padding: '10px 0',
                      color: '#fff',
                      fontSize: 18,
                      outline: 'none',
                    }}
                  />
                ))}
              </div>
              <textarea
                name="message"
                placeholder="Tell me about what you're interested in"
                rows={4}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #555',
                  padding: '10px 0',
                  color: '#fff',
                  fontSize: 18,
                  outline: 'none',
                  resize: 'none',
                  marginBottom: 32,
                  fontFamily: 'inherit',
                }}
              />
              <div style={{ position: 'relative' }}>
                <button type="submit" style={{ width: '100%', background: '#FFC100', color: '#000', border: 'none', padding: '16px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
                  Send
                </button>
                {showError && (
                  <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 12, padding: '14px 18px', background: '#2a2a2a', borderRadius: 8, border: '1px solid #FFC100', whiteSpace: 'nowrap', zIndex: 10 }}>
                    <p style={{ fontSize: 14, color: '#FFC100', fontWeight: 700, margin: 0 }}>
                      My little jar of ashes, just use the socials on the left.
                    </p>
                    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #FFC100' }} />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-distortion { margin-top: 40px !important; }
        }
      `}</style>
      {/* Grid Distortion footer background */}
      <div className="footer-distortion" style={{ width: '100%', height: 280, background: '#111', position: 'relative', overflow: 'hidden' }}>
        <GridDistortion 
          imageSrc="/grid-bg.png"
          grid={10} 
          mouse={0.1} 
          strength={0.15} 
          relaxation={0.9} 
        />
        <div 
          className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <span style={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '14px', 
            letterSpacing: '0.1em', 
            textTransform: 'uppercase',
            background: 'rgba(0,0,0,0.4)',
            padding: '8px 16px',
            borderRadius: '20px',
            backdropFilter: 'blur(4px)',
            fontWeight: 500
          }}>
            [Touch to disrupt]
          </span>
        </div>
      </div>
    </footer>
  )
}
