import { Badge } from './UI'
function StatusBadge({ label, variant='available', className='' }) { return <Badge variant={variant} className={className}>{label}</Badge> }
export default StatusBadge
