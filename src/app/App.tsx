
export default function App() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-bg-light text-text-default">
      {/* Header */}
      <header className="w-full py-6 px-8 flex justify-between items-center border-b border-border-light">
        <h1 className="text-2xl font-bold text-primary">TutiFruti</h1>
        <div className="space-x-4">
          <a
            href="/login"
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
          >
            Iniciar sesión
          </a>
          <a
            href="/register"
            className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary-light hover:text-white transition"
          >
            Registrarse
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          ¡Bienvenido a TutiFruti!
        </h2>
        <p className="max-w-2xl text-lg text-text-muted mb-8">
          El clásico juego de palabras donde deberás pensar rápido y competir con
          tus amigos. Elige una letra, completa las categorías y gana puntos
          demostrando tu agilidad mental.
        </p>

        <div className="space-x-4">
          <a
            href="/register"
            className="px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-primary transition"
          >
            Jugar ahora
          </a>
          <a
            href="/login"
            className="px-6 py-3 rounded-lg border border-border-light text-text-default font-semibold hover:bg-border-light hover:text-primary transition"
          >
            Ya tengo cuenta
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-sm text-text-muted border-t border-border-light">
        © {new Date().getFullYear()} TutiFruti. Todos los derechos reservados.
      </footer>
    </div>
    </>
  );
}
