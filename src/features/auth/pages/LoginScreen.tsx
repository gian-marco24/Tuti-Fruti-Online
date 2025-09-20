import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { InputField } from "../../shared/ui/inputField";
import { loginSchema, type LoginSchema } from "../schemas/loginSchema";
import { useAuth } from "../hooks/useAuth";
import { ButtonAnim } from "../../shared/ui/ButtonAnim";

export default function LoginScreen() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const { error, success, loading, submitLogin } = useAuth();

  return (
    <div className="min-h-screen flex items-start pt-12 justify-center bg-bg-light px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-border-light">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Inicia sesión
        </h2>
        <p className="text-center text-text-muted mb-8">
          Ingresa con tu cuenta para continuar
        </p>

        {/* Formulario */}
        <form className="space-y-5" onSubmit={handleSubmit((data) => submitLogin(data, setError))}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-default mb-1"
            >
              Correo electrónico
            </label>
            <InputField
              type="text"
              id="email"
              placeholder="tucorreo@email.com"
              registration={register("email")}
              error={errors.email}
              className={`w-full rounded-lg border-2 ${errors.email ? "border-error" : "border-border-light focus:ring-primary focus:ring-2"} px-4 py-2 focus:outline-none`}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-default mb-1"
            >
              Contraseña
            </label>
            <InputField
              type="password"
              id="password"
              placeholder="********"
              registration={register("password")}
              error={errors.password}
              className={`w-full rounded-lg border-2 ${errors.password ? "border-error" : "border-border-light focus:ring-primary focus:ring-2"} px-4 py-2 focus:outline-none`}
            />
          </div>

          {error && <p className="text-sm text-error text-center">{error}</p>}
          {success && <p className="text-sm text-success text-center">Inicio de sesión exitoso</p>}

          <ButtonAnim 
            loading={loading}
            type="submit"
            text="Iniciar Sesión"
          />
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-border-light"></div>
          <span className="px-3 text-sm text-text-muted">o</span>
          <div className="flex-grow border-t border-border-light"></div>
        </div>

        {/* Login con Google */}
        <button
          type="button"
          className="cursor-pointer w-full px-4 py-2 rounded-lg border border-border-light text-text-default font-semibold hover:bg-border-light transition flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Iniciar sesión con Google
        </button>

        {/* Link a registro */}
        <p className="mt-6 text-center text-sm text-text-muted">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
