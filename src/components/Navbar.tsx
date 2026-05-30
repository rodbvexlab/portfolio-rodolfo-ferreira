import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { ease } from '../lib/motion'

export default function Navbar() {
  const { lang, t, toggle } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.contact, href: '#contato' },
  ]

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease, delay: 0.05 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-5"
    >
      <nav
        className={`
          w-full max-w-[860px] rounded-2xl transition-all duration-500
          ${scrolled
            ? [
                'bg-[rgba(8,8,8,0.75)]',
                'backdrop-blur-2xl',
                'border border-white/[0.09]',
                /* layered shadow: outer depth + inner top highlight */
                'shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(255,255,255,0.03)]',
              ].join(' ')
            : [
                'bg-gradient-to-b from-white/[0.07] to-white/[0.03]',
                'backdrop-blur-xl',
                'border border-white/[0.09]',
                'shadow-[0_2px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.10)]',
              ].join(' ')
          }
        `}
      >
        {/* ── Desktop layout: 3-column grid so nav is screen-centered ── */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 gap-4">

          {/* Col 1 — Logo (left-aligned) */}
          <div className="flex items-center">
            <a href="/" className="group flex items-center gap-2">
              <span className="font-serif text-[18px] tracking-tight text-white/80
                group-hover:text-white transition-colors duration-300">
                Rodolfo Ferreira
              </span>
            </a>
          </div>

          {/* Col 2 — Navigation (truly centered) */}
          <div className="flex items-center gap-1">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onMouseEnter={() => setActiveLink(href)}
                onMouseLeave={() => setActiveLink('')}
                className="relative px-3.5 py-1.5 rounded-lg font-sans text-[13px] text-white/45
                  hover:text-white/90 transition-colors duration-300 tracking-wide group"
              >
                {/* Hover pill */}
                <AnimatePresence>
                  {activeLink === href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.08]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{label}</span>
              </a>
            ))}
          </div>

          {/* Col 3 — Controls (right-aligned) */}
          <div className="flex items-center justify-end gap-2">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                font-sans text-[11px] tracking-widest uppercase
                text-white/35 hover:text-white/70 transition-colors duration-300
                border border-transparent hover:border-white/[0.08] hover:bg-white/[0.04]"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.18 }}
                  className="text-white/70"
                >
                  {lang === 'pt' ? 'PT' : 'EN'}
                </motion.span>
              </AnimatePresence>
              <span className="text-white/15">/</span>
              <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>

            {/* CTA */}
            <a
              href="https://wa.me/5511924796028?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-lg font-sans text-[11px] uppercase tracking-widest
                text-white/70 hover:text-white
                bg-white/[0.05] border border-white/[0.09]
                hover:bg-white/[0.10] hover:border-white/[0.15]
                transition-all duration-300
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>

        {/* ── Mobile layout ── */}
        <div className="flex md:hidden items-center justify-between px-5 py-3.5">
          <a href="/" className="font-serif text-[18px] tracking-tight text-white/80">
            Rodolfo Ferreira
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="font-sans text-[11px] uppercase tracking-widest text-white/35 hover:text-white/60 transition-colors"
            >
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
              aria-label="Menu"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                transition={{ duration: 0.25, ease }}
                className="block w-5 h-px bg-white/60 origin-center"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-px bg-white/60"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                transition={{ duration: 0.25, ease }}
                className="block w-5 h-px bg-white/60 origin-center"
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden md:hidden border-t border-white/[0.07]"
            >
              <div className="px-5 py-5 flex flex-col gap-1">
                {links.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-3 rounded-lg font-sans text-[14px] text-white/60
                      hover:text-white hover:bg-white/[0.04] transition-all duration-200 tracking-wide"
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-4 pt-4 border-t border-white/[0.07]">
                  <a
                    href="https://wa.me/5511924796028"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-3 rounded-xl
                      bg-white/[0.05] border border-white/[0.09]
                      font-sans text-[12px] uppercase tracking-widest text-white/70
                      hover:bg-white/[0.09] transition-all duration-300"
                  >
                    {t.nav.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
