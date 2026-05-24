export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/5511924796028?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-lg hover:border-[#25d366]/40 hover:shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:bg-[#25d366]/5 transition-all duration-500 hover:scale-105 group"
      aria-label="Falar no WhatsApp"
    >
      {/* WhatsApp SVG Icon - subtle white/50 to green transition */}
      <svg
        className="w-5 h-5 text-white/50 group-hover:text-[#25d366] transition-all duration-500 group-hover:rotate-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.632 1.978 14.157.954 11.53.953c-5.438 0-9.861 4.372-9.864 9.802-.001 1.73.457 3.418 1.33 4.908l-.98 3.577 3.69-.958zm12.385-6.526c-.33-.165-1.951-.951-2.251-1.059-.3-.109-.518-.165-.735.165-.218.33-.842 1.059-1.033 1.277-.19.218-.38.245-.71.08-1.042-.52-1.834-.959-2.584-2.242-.19-.327-.19-.526-.025-.691.149-.148.33-.38.495-.57.165-.19.22-.33.33-.55.11-.22.055-.41-.027-.575-.083-.165-.735-1.74-.997-2.4-.26-.625-.523-.54-.735-.55-.19-.009-.408-.01-.625-.01s-.57.081-.869.408c-.3.33-1.14 1.107-1.14 2.697 0 1.59 1.171 3.125 1.334 3.344.163.218 2.3 3.475 5.567 4.877.777.333 1.383.532 1.854.68.78.247 1.49.213 2.052.13.626-.093 1.952-.787 2.227-1.548.275-.762.275-1.415.19-1.549-.083-.134-.3-.217-.63-.38z" />
      </svg>
    </a>
  )
}
