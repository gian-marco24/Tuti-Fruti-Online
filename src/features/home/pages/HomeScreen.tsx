import { Link } from "react-router-dom"
import { Footer } from "../ui/Footer"

const HomeScreen = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-ultraDark text-text-default">
      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          ¡Bienvenido a TuttiFrutti!
        </h2>
        <p className="max-w-2xl text-lg text-text-muted mb-8">
          El clásico juego de palabras donde deberás pensar rápido y competir con
          tus amigos. Elige una letra, completa las categorías y gana puntos
          demostrando tu agilidad mental.
        </p>

        <div className="space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-primary transition"
          >
            Jugar ahora
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg border border-border-light text-text-light font-semibold hover:bg-border-light hover:text-primary transition"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HomeScreen