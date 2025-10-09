import { z } from "zod"

const envSchema = z.object({
	NEXT_PUBLIC_API_URL: z.string()
})

const result = envSchema.safeParse({
	NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
})

if (!result.success) {
	throw new Error("Variável de ambiente inválida: " + JSON.stringify(result.error.issues))
}

export const env = result.data
