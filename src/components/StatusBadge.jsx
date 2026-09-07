function StatusBadge({ label, variant = 'available', className = '' }) {
  return (
    <span className={`badge badge--${variant} ${className}`.trim()}>
      {label}
    </span>
  )
}


export default StatusBadge
