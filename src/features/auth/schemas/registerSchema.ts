import z from 'zod'

export const registerSchema = z.object({
  username: z.string().min(3, 'Minimo de 3 caracteres').max(20, 'Maximo de 20 caracteres'),
  email: z.string().nonempty('El correo es obligatorio').email('Formato de correo no valido'),
  password: z.string().min(6, 'Minimo de 6 caracteres').max(30, 'Maximo de 30 caracteres'),
  confirmPassword: z.string().max(30, 'Maximo de 30 caracteres')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

export type RegisterSchema = z.infer<typeof registerSchema>