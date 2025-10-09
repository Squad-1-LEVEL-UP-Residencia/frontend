import { SignInProps, signInResponseSchema } from "@/data/auth/authSchemas"
import { apiFetch } from "@/lib/api"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	const url = request.nextUrl
	url.pathname = "/"

	const body: SignInProps = await request.json()

	const result = await apiFetch("/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: body.email,
			password: body.password
		})
	})

	if (!result.ok) throw new Error("Auth error")
	const resultJson = await result.json()
	const parsedResponse = signInResponseSchema.safeParse(resultJson)

	if (!parsedResponse.data?.accessToken) {
		return NextResponse.json({ ok: false, status: 500, message: "Error undefined accessToken" })
	}

	const user = {
		id: parsedResponse.data.userId,
		name: parsedResponse.data.name,
		email: parsedResponse.data.email,
		roles: parsedResponse.data.roles
	}

	//TODO Lidar com o refreshToken com o httpOnlyCookies
	const response = NextResponse.json({ ok: true, user: user })

	response.cookies.set("accessToken", parsedResponse.data.accessToken, {
		httpOnly: true,
		path: "/"
		//TODO configurar max age com base no rememberMe ou no refreshToken
		//* Acho q so devo implementar o refreshToken se tiver com o rememberMe
	})

	return response
}
