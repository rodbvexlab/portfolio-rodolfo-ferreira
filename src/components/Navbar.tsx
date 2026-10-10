import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const { lang, t, toggle } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const links = [
    { label: t.nav.projects, hash: '#projects' },
    { label: t.nav.services, hash: '#services' },
    { label: t.nav.about, hash: '#about' },
    { label: t.nav.contact, hash: '#contato' },
  ]

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/95 border-b border-white/10">
      <nav aria-label={lang === 'pt' ? 'Navegação principal' : 'Main navigation'} className="max-w-container-max mx-auto px-6 md:px-20">
        <div className="flex items-center justify-between gap-5 min-h-[76px]">
          <Link to="/" onClick={() => setMenuOpen(false)} className="font-serif text-[23px] text-white whitespace-nowrap">Rodolfo Ferreira<span className="text-cyan-300">.</span></Link>
          <div className="hidden lg:flex items-center gap-8">
            {links.map(({ label, hash }) => (
              <Link key={hash} to={{ pathname: '/', hash }} aria-current={location.pathname === '/' && location.hash === hash ? 'location' : undefined} className="text-[14px] text-white/70 hover:text-white aria-[current=location]:text-cyan-300 transition-colors py-3">{label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={toggle} aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para português'} className="text-[12px] text-white/70 hover:text-white min-h-11 px-2">{lang === 'pt' ? 'EN' : 'PT'}</button>
            <a href={t.footer.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex border-b border-white/50 hover:border-cyan-300 text-[14px] py-2 transition-colors">{t.nav.cta}<span aria-hidden="true" className="ml-3">↗</span></a>
            <button ref={menuButton} type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={lang === 'pt' ? (menuOpen ? 'Fechar menu' : 'Abrir menu') : (menuOpen ? 'Close menu' : 'Open menu')} className="lg:hidden min-h-11 min-w-11 flex items-center justify-center text-[24px]">
              <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
            </button>
          </div>
        </div>
        <div id="mobile-menu" hidden={!menuOpen} className="lg:hidden border-t border-white/15 py-5">
          {links.map(({ label, hash }) => (
            <Link key={hash} to={{ pathname: '/', hash }} onClick={() => setMenuOpen(false)} className="block py-3 text-[17px] text-white/80 hover:text-cyan-300">{label}</Link>
          ))}
          <a href={t.footer.social.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="inline-flex py-3 mt-2 text-cyan-300">{t.nav.cta}<span aria-hidden="true" className="ml-3">↗</span></a>
        </div>
      </nav>
    </header>
  )
}
