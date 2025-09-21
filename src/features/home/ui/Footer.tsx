export const Footer = () => {
  return (
    <div>
      <footer className="w-full py-4 border-t border-neutral-dark justify-around flex flex-col md:flex-row ">
        <div className="text-center text-md text-text-muted">© {new Date().getFullYear()} TuttiFrutti. Todos los derechos reservados.</div>
        <div className="text-center text-md text-text-muted">Desarrollado por gian.marco24</div>
      </footer>
    </div>
  )
}
