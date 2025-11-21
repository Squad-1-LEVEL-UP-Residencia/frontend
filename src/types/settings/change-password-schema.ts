import { z } from "zod"

const passwordValidation = z
  .string()
  .min(8, "Mínimo de 8 caracteres")
  .regex(/[A-Z]/, "Pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "Pelo menos um número")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Pelo menos um caractere especial")

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Senha atual é obrigatória"),
  newPassword: passwordValidation,
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
})

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
