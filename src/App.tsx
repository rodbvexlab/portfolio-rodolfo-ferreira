import { useRef } from 'react'
import VideoBackground from './components/VideoBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import PortfolioSkeleton from './components/PortfolioSkeleton'
import Process from './components/Process'
import ContactCTA from './components/ContactCTA'
import WhatsAppFloating from './components/WhatsAppFloating'

export default function App() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <div className="flex flex-col min-h-screen text-on-surface">
      {/* Fixed background video + overlays */}
      <VideoBackground heroRef={heroRef} />

      {/* Fixed top navigation */}
      <Navbar />

      {/* Scrollable page content */}
      <Hero ref={heroRef} />
      <Services />
      <PortfolioSkeleton />
      <Process />
      <ContactCTA />

      {/* Floating WhatsApp CTA */}
      <WhatsAppFloating />
    </div>
  )
}

