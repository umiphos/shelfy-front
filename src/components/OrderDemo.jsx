import { useEffect, useRef, useState } from 'react'
import { MessageCircle, MousePointer2 } from 'lucide-react'

function OrderDemo() {
  const [step,setStep]=useState(0); const timer=useRef([])
  function play(){timer.current.forEach(clearTimeout);setStep(0);timer.current=[setTimeout(()=>setStep(1),700),setTimeout(()=>setStep(2),1450)]}
  useEffect(()=>{const t=setTimeout(play,500);return()=>{clearTimeout(t);timer.current.forEach(clearTimeout)}},[])
  return <div className="relative mx-auto w-full max-w-md">
    <div className="rounded-[28px] border border-ink/10 bg-paper-soft p-3 shadow-2xl shadow-ink/10">
      <div className="overflow-hidden rounded-[22px] border border-ink/10 bg-paper">
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3"><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-sage"/><span className="text-sm font-semibold">Ferretería El Tornillo</span></div><span className="rounded-full bg-sage/25 px-2.5 py-1 text-[10px] font-bold uppercase">En línea</span></div>
        <div className="relative p-4"><div className="aspect-[4/3] overflow-hidden rounded-2xl bg-ink/5"><div className="grid h-full place-items-center text-sm font-semibold text-ink/30">Foto del producto</div>{step>=1&&<span className="absolute right-8 top-8 grid size-9 place-items-center rounded-full bg-brand text-paper shadow-lg"><MousePointer2 size={17}/></span>}</div><p className="mt-3 font-semibold">Producto de ejemplo</p><div className="mt-1 flex items-center justify-between"><span className="font-display font-bold">$249</span><span className="text-xs text-ink/50">Categoría</span></div></div>
      </div>
      <div className={`mt-3 flex items-center gap-2 rounded-2xl bg-whatsapp px-4 py-3 text-sm font-semibold text-white transition-all duration-300 ${step>=2?'translate-y-0 opacity-100':'translate-y-2 opacity-0'}`}><MessageCircle size={18}/><span>Hola 👋 quiero pedir: <strong>Producto de ejemplo — $249</strong></span></div>
    </div>
    <button type="button" onClick={play} className="mt-3 w-full text-center text-xs font-semibold text-ink/50 hover:text-ink">Ver de nuevo</button>
  </div>
}
export default OrderDemo
