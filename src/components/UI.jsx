import { forwardRef } from 'react'
import { cn } from '../lib/cn'

export function Button({ className, variant='primary', size='md', ...props }) {
  const variants = {
    primary: 'bg-brand text-paper hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/20',
    dark: 'bg-ink text-paper hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/20',
    outline: 'border border-ink/20 bg-paper-soft text-ink hover:border-ink/40 hover:bg-white',
    ghost: 'bg-transparent text-ink/70 hover:bg-ink/5 hover:text-ink',
    whatsapp: 'bg-whatsapp text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/15',
    danger: 'border border-red-200 bg-red-50 text-red-700 hover:bg-red-100',
  }
  const sizes = { sm:'px-3.5 py-2 text-xs', md:'px-5 py-2.5 text-sm', lg:'px-6 py-3 text-sm' }
  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50', variants[variant], sizes[size], className)} {...props} />
}

export function LinkButton({ className, variant='primary', size='md', ...props }) {
  const variants = {
    primary: 'bg-brand text-paper hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/20',
    dark: 'bg-ink text-paper hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/20',
    outline: 'border border-ink/20 bg-paper-soft text-ink hover:border-ink/40 hover:bg-white',
    ghost: 'text-ink/70 hover:bg-ink/5 hover:text-ink',
  }
  const sizes = { sm:'px-3.5 py-2 text-xs', md:'px-5 py-2.5 text-sm', lg:'px-6 py-3 text-sm' }
  return <a className={cn('inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200', variants[variant], sizes[size], className)} {...props} />
}

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn('w-full rounded-xl border border-ink/15 bg-paper-soft px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-4 focus:ring-brand/10', className)} {...props} />
})

export const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn('min-h-28 w-full resize-y rounded-xl border border-ink/15 bg-paper-soft px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-4 focus:ring-brand/10', className)} {...props} />
})

export const Select = forwardRef(function Select({ className, children, ...props }, ref) {
  return <select ref={ref} className={cn('w-full appearance-none rounded-xl border border-ink/15 bg-paper-soft px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10', className)} {...props}>{children}</select>
})

export function Card({ className, ...props }) {
  return <div className={cn('rounded-2xl border border-ink/10 bg-paper-soft shadow-sm', className)} {...props} />
}

export function Badge({ variant='available', className, children }) {
  const styles = {
    available:'bg-sage/25 text-ink',
    low:'bg-brand-soft text-brand',
    soldout:'bg-ink/8 text-ink/55',
    hidden:'bg-ink/8 text-ink/55',
    brand:'bg-brand text-paper',
  }
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide', styles[variant] || styles.available, className)}>{children}</span>
}

export function Field({ label, hint, children }) {
  return <div className="space-y-2"><label className="block text-sm font-semibold text-ink">{label}</label>{children}{hint && <p className="text-xs leading-relaxed text-ink/50">{hint}</p>}</div>
}
