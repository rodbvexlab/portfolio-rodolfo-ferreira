import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useLanguage } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import ContactCTA from './components/ContactCTA'
import WhatsAppFloating from './components/WhatsAppFloating'
import ScrollManager from './components/ScrollManager'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'

function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-white/15 bg-black px-6 md:px-20 py-8">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 text-[13px] text-white/65">
        <p>© {new Date().getFullYear()} Rodolfo Ferreira <span className="block md:inline md:ml-4 mt-1 md:mt-0">{t.footer.tagline}</span></p>
        <div className="flex gap-6">
          <a href={t.footer.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white py-2">Instagram ↗</a>
          <a href={t.footer.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white py-2">WhatsApp ↗</a>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <ContactCTA />
      </main>
      <SiteFooter />
      <WhatsAppFloating />
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <a href="#main-content" className="skip-link">Pular para o conteúdo / Skip to content</a>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* key → entrance animations replay when jumping between cases */}
      <main id="main-content"><CaseStudy key={slug} /></main>
      <WhatsAppFloating />
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main id="main-content"><NotFound /></main>
    </div>
  )
}
