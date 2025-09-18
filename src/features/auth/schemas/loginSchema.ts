import z from 'zod'

export const loginSchema = z.object({
  email: z.string().nonempty('Ingrese el correo electronico').email('Formato de correo no valido'),
  password: z.string().nonempty('Ingrese la contraseña')
})

export type LoginSchema = z.infer<typeof loginSchema>