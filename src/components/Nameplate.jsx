import { Link } from 'react-router-dom'


function Nameplate({ brand = 'Precio Inbox', to = '/', children }) {
  return (
    <header className="nameplate">
      <div className="nameplate__inner">
        <Link to={to} className="nameplate__brand">
          {brand}
        </Link>

        {children && (
          <nav className="nameplate__nav">{children}</nav>
        )}
      </div>
    </header>
  )
}


export default Nameplate
