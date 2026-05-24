import { type FormEvent, useState } from 'react'

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Placeholder — connect to a form service (Formspree, Web3Forms, etc.) when ready
    setSubmitted(true)
  }

  return (
    <section
      id="contato"
      className="relative z-10 px-[24px] md:px-[80px] py-32 md:py-48 bg-black"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-6">
          <h2 className="font-serif text-4xl md:text-6xl text-white">
            Vamos transformar sua ideia em algo real?
          </h2>
          <p className="font-sans text-lg md:text-xl text-on-surface-variant/70">
            Conte um pouco sobre o que você precisa: site, landing page, sistema, automação ou IA
            aplicada ao seu negócio.
          </p>
        </div>

        {/* Glass form card */}
        <div className="liquid-glass bg-white/[0.03] backdrop-blur-2xl rounded-[40px] border border-white/10 p-6 md:p-16 mt-16">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
              <p className="font-sans text-body-lg text-on-surface/80">
                Mensagem enviada! Em breve entrarei em contato.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-left">
              {/* Name */}
              <div className="space-y-2">
                <input
                  required
                  type="text"
                  placeholder="Seu nome"
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/40 font-sans text-body-md focus:border-white/30 focus:ring-1 focus:ring-white/10 outline-none transition-all"
                />
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <input
                  required
                  type="text"
                  placeholder="WhatsApp ou e-mail"
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/40 font-sans text-body-md focus:border-white/30 focus:ring-1 focus:ring-white/10 outline-none transition-all"
                />
              </div>

              {/* Project type */}
              <div className="md:col-span-2 space-y-2">
                <input
                  type="text"
                  placeholder="Tipo de projeto"
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/40 font-sans text-body-md focus:border-white/30 focus:ring-1 focus:ring-white/10 outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2 space-y-2">
                <textarea
                  rows={3}
                  placeholder="Mensagem curta"
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 text-white placeholder:text-white/40 resize-none font-sans text-body-md focus:border-white/30 focus:ring-1 focus:ring-white/10 outline-none transition-all"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex justify-center mt-8">
                <button
                  type="submit"
                  className="px-12 py-4 rounded-full bg-white text-black font-sans text-label-sm uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300 shadow-xl"
                >
                  Enviar ideia
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
