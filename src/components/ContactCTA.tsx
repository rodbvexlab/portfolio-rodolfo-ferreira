import { type FormEvent, useState } from 'react'
import { ease } from '../lib/motion'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import MagneticButton from './MagneticButton'
import ScrambleText from './ScrambleText'

// Web3Forms key — set VITE_WEB3FORMS_KEY in .env.local
// Get your free key at https://web3forms.com (use rodolfo.bnunessp@gmail.com)
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

const WA_BASE = 'https://wa.me/5511924796028?text='

/** Fallback: build a pre-filled WhatsApp message from form data */
function buildWhatsAppURL(name: string, contact: string, type: string, message: string) {
  const text = [
    'Olá! Vim pelo seu portfólio.',
    `*Nome:* ${name}`,
    `*Contato:* ${contact}`,
    type ? `*Projeto:* ${type}` : '',
    message ? `*Mensagem:* ${message}` : '',
  ]
    .filter(Boolean)
    .join('\n')
  return WA_BASE + encodeURIComponent(text)
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactCTA() {
  const { t } = useLanguage()
  const { contact } = t
  const [status, setStatus] = useState<Status>('idle')

  const inputClass = `w-full bg-white/[0.03] border border-white/[0.08] rounded-full px-6 py-4
    text-white/85 placeholder:text-white/25 font-sans text-[15px]
    hover:border-white/[0.15] focus:border-cyan-400/30 focus:ring-1 focus:ring-cyan-400/10
    outline-none transition-all duration-300`

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name    = data.get('name')    as string
    const contact = data.get('contact') as string
    const type    = data.get('type')    as string
    const message = data.get('message') as string

    // If no Web3Forms key configured → redirect to WhatsApp with pre-filled message
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'your_access_key_here') {
      window.open(buildWhatsAppURL(name, contact, type, message), '_blank')
      setStatus('success')
      return
    }

    setStatus('loading')
    try {
      data.append('access_key', WEB3FORMS_KEY)
      data.append('subject', `Novo projeto pelo portfólio${type ? `: ${type}` : ''} — ${name}`)
      data.append('from_name', 'Portfolio Rodolfo Ferreira')
      data.append('replyto', contact.includes('@') ? contact : '')

      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json() as { success: boolean }

      setStatus(json.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contato"
      className="relative z-10 px-6 md:px-20 py-28 md:py-40 border-t border-white/[0.05]"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(76,215,246,0.04) 0%, transparent 65%), #000',
      }}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-400/[0.04] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-white/[0.02] blur-[80px] rounded-full pointer-events-none" />

      <div className="relative max-w-[780px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: ease }}
          className="text-center space-y-5 mb-14"
        >
          <ScrambleText
            text={contact.label}
            className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/80 block"
            delay={100}
          />
          <h2 className="font-serif text-[40px] md:text-[58px] text-white leading-tight">
            {contact.headline}
          </h2>
          <p className="font-sans text-[16px] text-white/55 max-w-xl mx-auto leading-relaxed">
            {contact.body}
          </p>

          {/* Primary WhatsApp CTA */}
          <div className="pt-4">
            <MagneticButton>
              <a
                href="https://wa.me/5511924796028?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full
                  bg-white text-black font-sans text-[12px] uppercase tracking-widest
                  hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {contact.whatsapp}
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ease, delay: 0.15 }}
          className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 md:p-12"
        >
          {status === 'success' ? (
            <div className="py-12 text-center space-y-4">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="material-symbols-outlined text-cyan-400 text-5xl block"
              >
                check_circle
              </motion.span>
              <p className="font-sans text-[16px] text-white/65">{contact.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Hidden honeypot — spam prevention */}
              <input type="checkbox" name="botcheck" className="hidden" />

              <input
                required
                type="text"
                name="name"
                placeholder={contact.name}
                className={inputClass}
              />
              <input
                required
                type="text"
                name="contact"
                placeholder={contact.contact_field}
                className={inputClass}
              />
              <input
                type="text"
                name="type"
                placeholder={contact.project_type}
                className={`${inputClass} md:col-span-2`}
              />
              <textarea
                rows={3}
                name="message"
                placeholder={contact.message}
                className={`${inputClass} rounded-2xl resize-none md:col-span-2`}
              />

              {status === 'error' && (
                <p className="md:col-span-2 text-center font-sans text-[13px] text-red-400/80">
                  Algo deu errado. Tente pelo WhatsApp acima.
                </p>
              )}

              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="min-w-[180px] px-10 py-4 rounded-full
                    border border-white/10 bg-white/[0.04]
                    text-white/75 font-sans text-[12px] uppercase tracking-widest
                    hover:bg-white hover:text-black hover:border-white
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-300 shadow-lg"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2 justify-center">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        className="material-symbols-outlined text-[16px]"
                      >
                        progress_activity
                      </motion.span>
                      Enviando...
                    </span>
                  ) : contact.submit}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
