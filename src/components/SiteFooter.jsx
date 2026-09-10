function SiteFooter({ note }) {
  return <footer className="mt-16 border-t border-ink/10"><div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-ink/55 sm:px-6 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-2"><span className="grid size-6 place-items-center rounded-md bg-brand text-xs font-bold text-paper">P</span><span className="font-display font-bold text-ink">Precio Inbox</span></div><p>{note || 'Hecho para negocios pequeños de México.'}</p></div></footer>
}
export default SiteFooter
