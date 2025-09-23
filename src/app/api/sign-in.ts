import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export async function POST(request: NextRequest) {
	// const { email, password } = await request.json()
	const body = await request.json()
	const signInSchema = z.object({
		email: z.email(),
		password: z.string().min(6)
	})

	const result = signInSchema.safeParse(body)

	if (!result.success) {
		return NextResponse.json({
			error: "Dádos inválidos",
			status: 400
		})
	}

	const { email } = result.data

	return NextResponse.json({
		message: "Sign-in successful",
		access_token: `fake-token-${email}`
	})
}
