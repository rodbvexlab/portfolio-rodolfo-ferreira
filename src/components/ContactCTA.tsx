import { type FormEvent, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

const WA_BASE = 'https://wa.me/5511924796028?text='

/** Fallback: build a pre-filled WhatsApp message from form data */
function buildWhatsAppURL(name: string, contact: string, type: string, message: string) {
  const text = [
    'Oi, Rodolfo! Vim pelo seu portfólio.',
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
  const [whatsappURL, setWhatsappURL] = useState('')
  const inputClass = 'w-full rounded-lg bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/55 text-[15px] focus:border-cyan-300 outline-none transition-colors'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const replyContact = String(data.get('contact') ?? '').trim()
    const type = String(data.get('type') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name || !replyContact || data.get('botcheck')) return
    setWhatsappURL('')

    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'your_access_key_here') {
      const url = buildWhatsAppURL(name, replyContact, type, message)
      setWhatsappURL(url)
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }

    setStatus('loading')
    try {
      data.set('name', name)
      data.set('contact', replyContact)
      data.set('type', type)
      data.set('message', message)
      data.append('access_key', WEB3FORMS_KEY)
      data.append('subject', `Novo projeto pelo portfólio${type ? `: ${type}` : ''} — ${name}`)
      data.append('from_name', 'Portfolio Rodolfo Ferreira')
      data.append('replyto', replyContact.includes('@') ? replyContact : '')
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await response.json() as { success: boolean }
      setStatus(response.ok && json.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contato" aria-labelledby="contact-title" className="px-6 md:px-20 py-20 md:py-28 border-t border-white/10">
      <div className="max-w-container-max mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-24">
        <div>
          <p className="section-label mb-6">{contact.label}</p>
          <h2 id="contact-title" className="section-title">{contact.headline}</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/70">{contact.body}</p>
          <a href={t.footer.social.whatsapp} target="_blank" rel="noopener noreferrer" className="primary-link mt-8">{contact.whatsapp}<span aria-hidden="true">↗</span></a>
        </div>
        <div>
          {status === 'success' ? (
            <p role="status" className="py-8 text-white/80">{contact.success}</p>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-busy={status === 'loading'}>
              <p className="md:col-span-2 text-[14px] text-white/65">{contact.alternative}</p>
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
              <label className="text-[13px] text-white/75 space-y-2">
                <span className="block">{contact.name}</span>
                <input required name="name" autoComplete="name" maxLength={120} className={inputClass} />
              </label>
              <label className="text-[13px] text-white/75 space-y-2">
                <span className="block">{contact.contact_field}</span>
                <input required name="contact" maxLength={180} className={inputClass} />
              </label>
              <label className="md:col-span-2 text-[13px] text-white/75 space-y-2">
                <span className="block">{contact.project_type}</span>
                <input name="type" maxLength={160} className={inputClass} />
              </label>
              <label className="md:col-span-2 text-[13px] text-white/75 space-y-2">
                <span className="block">{contact.message}</span>
                <textarea rows={3} name="message" maxLength={3000} className={`${inputClass} resize-y`} />
              </label>
              {status === 'error' && <p role="alert" className="md:col-span-2 text-[14px] text-red-300">{contact.error}</p>}
              {whatsappURL && (
                <div role="status" className="md:col-span-2 text-[14px] text-white/80 space-y-2">
                  <p>{contact.whatsapp_ready}</p>
                  <a href={whatsappURL} target="_blank" rel="noopener noreferrer" className="inline-block underline underline-offset-4 text-cyan-300 py-2">{contact.whatsapp_continue} ↗</a>
                </div>
              )}
              <div className="md:col-span-2">
                <button type="submit" disabled={status === 'loading'} className="px-5 py-3 border border-white/30 rounded-lg text-[14px] hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-wait">
                  {status === 'loading' ? contact.sending : contact.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
