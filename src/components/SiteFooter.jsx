function SiteFooter({ note }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>Precio Inbox</span>
        <span>{note || 'Hecho para negocios pequeños'}</span>
      </div>
    </footer>
  )
}


export default SiteFooter
