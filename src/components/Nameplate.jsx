import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, LogIn, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Nameplate({ children }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const publicCatalog = location.pathname.startsWith('/catalogo/')
  return <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
      <Link to="/" className="flex items-center gap-2.5" onClick={()=>setOpen(false)}>
        <span className="grid size-8 place-items-center rounded-lg bg-brand font-display text-sm font-bold text-paper shadow-sm">P</span>
        <span className="font-display text-[15px] font-bold tracking-tight">Precio Inbox</span>
      </Link>
      <nav className="hidden items-center gap-2 md:flex">
        {children || (publicCatalog ? <Link to="/" className="rounded-full px-3.5 py-2 text-sm font-medium text-ink/60 hover:bg-ink/5 hover:text-ink"><ArrowLeft size={15}/> Inicio</Link> : <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper"><LogIn size={15}/> Iniciar sesión</Link>)}
      </nav>
      <button type="button" className="grid size-10 place-items-center rounded-full border border-ink/10 md:hidden" onClick={()=>setOpen(!open)} aria-label="Abrir menú">{open?<X size={19}/>:<Menu size={19}/>}</button>
    </div>
    {open && <div className="border-t border-ink/10 bg-paper px-5 py-3 md:hidden"> <div className="mx-auto flex max-w-6xl flex-col gap-1">{children || <Link to="/login" onClick={()=>setOpen(false)} className="rounded-xl px-3 py-3 font-semibold">Iniciar sesión</Link>}</div></div>}
  </header>
}
export default Nameplate
