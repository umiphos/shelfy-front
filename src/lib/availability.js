// Reglas de disponibilidad (ver documento de producto):
// Público: 5+ / Disponible / Agotado. El propietario ve la cantidad exacta.

export function publicAvailability(product) {
  if (product.status === 'sold_out' || product.quantity === 0) {
    return { label: 'Agotado', variant: 'soldout' }
  }

  if (product.quantity >= 5) {
    return { label: '5+', variant: 'available' }
  }

  return {
    label: 'Disponible',
    variant: product.quantity <= 1 ? 'low' : 'available',
  }
}

export function ownerAvailability(product) {
  if (product.status === 'hidden') {
    return { label: 'Oculto', variant: 'hidden' }
  }

  if (product.status === 'sold_out' || product.quantity === 0) {
    return { label: 'Agotado', variant: 'soldout' }
  }

  return {
    label: `${product.quantity} disponibles`,
    variant: product.quantity <= 4 ? 'low' : 'available',
  }
}

export function statusLabel(status) {
  if (status === 'available') return 'Disponible'
  if (status === 'sold_out') return 'Agotado'
  if (status === 'hidden') return 'Oculto'
  return status
}
