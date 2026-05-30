import { createContext, useContext, useState, type ReactNode } from 'react'
import { pt, en } from '../i18n/translations'

export type Lang = 'pt' | 'en'
export type Translations = typeof pt

interface LanguageContextType {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt')
  const t = lang === 'pt' ? pt : en
  const toggle = () => setLang((l) => (l === 'pt' ? 'en' : 'pt'))
  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
