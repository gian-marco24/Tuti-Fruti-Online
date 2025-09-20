import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRoomSchema, type CreateRoomForm } from "../schemas/CreateRoomSchema";
import { InputField } from "../../shared/ui/inputField";
import { ButtonAnim } from "../../shared/ui/ButtonAnim";

export default function CreateRoomPage() {
  const [loading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomForm>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      name: "",
      maxPlayers: 4,
      rounds: 3,
      privacy: "public",
    },
  });

  const onSubmit = (data: CreateRoomForm) => {
    console.log("Crear sala:", data);
  };

  return (
    <div className="min-h-screen bg-bg-light flex items-start justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-primary/10 p-8">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          Crear nueva sala
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nombre de la sala */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Nombre de la sala
            </label>
            <InputField
              registration={register("name")}
              id="name"
              error={errors.name}
              placeholder="Ej: Amigos locos"
              type="text"
              className="w-full rounded-xl border border-textOffFocus px-4 py-2 focus:border-details focus:outline-none"
            />
          </div>

          {/* Máx jugadores */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Máximo de jugadores
            </label>
            <InputField
              registration={register("maxPlayers", { valueAsNumber: true })}
              id="maxPlayers"
              error={errors.maxPlayers}
              type="number"
              min={2}
              max={10}
              className="w-full rounded-xl border border-textOffFocus px-4 py-2 focus:border-details focus:outline-none"
            />
          </div>

          {/* Máx Rondas */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Máximo de Rondas
            </label>
            <InputField
              registration={register("rounds", { valueAsNumber: true })}
              id="rounds"
              error={errors.rounds}
              type="number"
              className="w-full rounded-xl border border-textOffFocus px-4 py-2 focus:border-details focus:outline-none"
            />
          </div>

          {/* Privacidad */}
          <div>
            <span className="block text-sm font-medium text-primary mb-2">
              Privacidad
            </span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <InputField
                  registration={register("privacy")}
                  id="privacy-public"
                  type="radio"
                  className="w-full rounded-xl border border-text-muted px-4 py-2 focus:border-accent focus:outline-none"
                />
                Pública
              </label>
              <label className="flex items-center gap-2">
                <InputField
                  registration={register("privacy")}
                  id="privacy-private"
                  type="radio"
                  className="w-full rounded-xl border border-text-muted px-4 py-2 focus:border-accent focus:outline-none"
                />
                Privada
              </label>
            </div>
            {errors.privacy && (
              <p className="mt-1 text-sm text-error">
                {errors.privacy.message}
              </p>
            )}
          </div>

          {/* Botón */}
          <ButtonAnim 
            text="Crear Sala"
            type="submit"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}
