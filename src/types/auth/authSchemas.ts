import { boolean, z } from "zod"

export const signInResponseSchema = z.object({
	userId: z.uuid(),
	name: z.string(),
	email: z.email(),
	roles: z.string(),
	accessToken: z.string(),
	refreshToken: z.string(),
	expiresAt: z.string()
})

export type SignInResponse = z.infer<typeof signInResponseSchema> | Response

export const signInSchema = z.object({
	email: z.email("O e-mail é obrigatório"),
	password: z
		.string("A senha é obrigatório")
		.min(6, "A senha deve conter no mínimo 6 caracteres")
		.regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial")
		.regex(/\d/, "A senha deve conter pelo menos um número"),
	rememberMe: z.boolean().optional().nullable()
})

export type SignInProps = z.infer<typeof signInSchema>
