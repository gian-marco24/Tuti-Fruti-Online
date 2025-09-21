import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from "lucide-react"
import { useSelector } from "react-redux"
import { type RootState } from '../../../infraestructure/store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <div>
      <header className="w-full py-6 px-8 flex justify-between items-center border-b border-neutral-dark bg-bg-dark fixed">
        <h1 className="text-2xl font-bold text-primary">Tutti | Frutti</h1>

        {/* Botones en desktop */}
        <div className='space-x-8 flex-row hidden md:flex'>
          <div className='space-x-2'>
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-primary font-medium text-white hover:bg-primary-dark transition"
            >
              Inicio
            </Link>
            <Link
              to="/lobbies"
              className="px-4 py-2 rounded-lg bg-primary font-medium text-white hover:bg-primary-dark transition"
            >
              Salas
            </Link>
          </div>
          {user ? (
            <div>
              <Link
                to="/profile"
                className="px-4 py-2 rounded-lg bg-primary font-medium text-white hover:bg-primary-dark transition"
              >
                Perfil
              </Link>
            </div>
          ) : (
            <div className="space-x-2">
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-primary font-medium text-white hover:bg-primary-dark transition"
              >
                Registrarse
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-border-light font-medium text-white hover:bg-primary-light hover:border-primary-light transition"
              >
                Iniciar sesión
              </Link>
            </div>
          )}
        </div>

        {/* Botón hamburguesa en mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-border-light"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6 text-primary" />
        </button>

        {/* Sidebar */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Fondo oscuro */}
            <div
              className="flex-1 bg-black/50"
              onClick={() => setIsOpen(false)}
            ></div>

            {/* Menú lateral */}
            <div className="w-64 bg-bg-dark h-full shadow-lg p-6 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary">Menú</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="h-8 w-8 text-primary" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                <div className='space-y-2 flex flex-col'>
                  <Link
                    to="/"
                    className="px-4 py-2 rounded-lg bg-primary font-medium text-white hover:bg-primary-dark transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/lobbies"
                    className="px-4 py-2 rounded-lg bg-primary font-medium text-white hover:bg-primary-dark transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Salas
                  </Link>
                </div>
                <div className='space-y-2 flex flex-col'>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Registrarse
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
      <div className='h-[80px] bg-bg-dark'>
        <p>Hola Mundo</p>
      </div>
    </div>
  )
}

export default Navbar