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
    <div className="flex py-16 md:py-8 xl:py-12 justify-center bg-bg-ultraDark px-2">
      <div className="w-full max-w-md bg-bg-dark rounded-2xl shadow-xl p-6 md:p-8 border border-neutral-dark">
        {/* Título */}
        <h2 className="text-2xl xl:text-3xl font-bold text-center text-primary mb-2 md:mb-3 xl:mb-6">
          Inicia sesión
        </h2>
        <p className="text-center text-sm xl:text-lg text-text-light mb-4 md:mb-6 xl:mb-8">
          Ingresa con tu cuenta para continuar
        </p>

        {/* Formulario */}
        <form className="xl:space-y-5 space-y-3" onSubmit={handleSubmit((data) => submitLogin(data, setError))}>
          <div>
            <label
              htmlFor="email"
              className="block text-[8px] xl:text-sm font-regular xl:font-medium text-text-light mb-1"
            >
              Correo electrónico
            </label>
            <InputField
              type="text"
              id="email"
              placeholder="tucorreo@email.com"
              registration={register("email")}
              error={errors.email}
              className={`w-full text-text-light text-xs xl:text-base rounded-lg border-2 ${errors.email ? "border-error" : "border-border-light focus:ring-primary focus:ring-2"} px-4 py-2 focus:outline-none`}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[8px] xl:text-sm font-regular xl:font-medium text-text-light mb-1"
            >
              Contraseña
            </label>
            <InputField
              type="password"
              id="password"
              placeholder="********"
              registration={register("password")}
              error={errors.password}
              className={`w-full text-text-light text-xs xl:text-base rounded-lg border-2 ${errors.password ? "border-error" : "border-border-light focus:ring-primary focus:ring-2"} px-4 py-2 focus:outline-none`}
            />
          </div>

          {error && <p className="text-xs xl:text-sm text-error text-center">{error}</p>}
          {success && <p className="text-xs xl:text-sm text-success text-center">Inicio de sesión exitoso</p>}

          <ButtonAnim 
            loading={loading}
            type="submit"
            text="Iniciar Sesión"
          />
        </form>

        {/* Divider */}
        <div className="my-2 xl:my-6 flex items-center">
          <div className="flex-grow border-t border-border-light"></div>
          <span className="px-3 text-sm text-text-muted">o</span>
          <div className="flex-grow border-t border-border-light"></div>
        </div>

        {/* Login con Google */}
        <button
          type="button"
          className="max-xl:text-sm cursor-pointer w-full px-4 py-2 rounded-lg border border-border-light text-text-light font-semibold hover:bg-border-light hover:text-primary transition flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="h-4 w-4 xl:h-6 xl:w-6"
          />
          Iniciar sesión con Google
        </button>

        {/* Link a registro */}
        <p className="mt-4 xl:mt-6 text-center text-[8px] xl:text-sm text-text-light">
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
