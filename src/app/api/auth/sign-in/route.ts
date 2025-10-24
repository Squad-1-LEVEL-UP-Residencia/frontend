import { SignInProps, signInResponseSchema } from "@/types/auth/authSchemas"
import { env } from "@/lib/env"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	const baseURL = env.NEXT_PUBLIC_API_URL
	const url = request.nextUrl
	url.pathname = "/dashboard"

	const body: SignInProps = await request.json()

	const result = await fetch(`${baseURL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: body.email,
			password: body.password
		})
	})
	// console.log(result)
	if (!result.ok) throw new Error("Auth error")
	const resultJson = await result.json()
	const parsedResponse = signInResponseSchema.safeParse(resultJson)
	// console.log(parsedResponse)
	if (!parsedResponse.data?.accessToken) {
		return NextResponse.json({ ok: false, status: 500, message: "Error undefined accessToken" })
	}

	// const user = {
	// 	id: parsedResponse.data.userId,
	// 	name: parsedResponse.data.name,
	// 	email: parsedResponse.data.email,
	// 	roles: parsedResponse.data.roles
	// }

	const response = NextResponse.json({ ok: true })

	response.cookies.set("accessToken", parsedResponse.data.accessToken, {
		httpOnly: false,
		path: "/",
		maxAge: 60 * 15
		//TODO configurar max age com base no rememberMe ou no refreshToken
		//* Acho q so devo implementar o refreshToken se tiver com o rememberMe
	})

	return response
}
