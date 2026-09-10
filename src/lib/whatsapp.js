export function whatsappOrderLink(phone, productName) {
  const message = `Hola, me interesa comprar ${productName}, que vi en CATÁLOGO. ¿Está disponible?`
  const digits = (phone || '').replace(/\D/g, '')
  const base = digits ? `https://wa.me/${digits}` : 'https://wa.me/'
  return `${base}?text=${encodeURIComponent(message)}`
}
