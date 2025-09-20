import { z } from "zod";

export const CreateRoomSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  maxPlayers: z
    .number()
    .min(2, "Mínimo 2 jugadores")
    .max(10, "Máximo 10 jugadores"),
  rounds: z
    .number()
    .min(3, "Al menos 3 rondas")
    .max(15, "Hasta 15 rondas"),
  privacy: z.enum(["public", "private"]),
});

export type CreateRoomForm = z.infer<typeof CreateRoomSchema>;