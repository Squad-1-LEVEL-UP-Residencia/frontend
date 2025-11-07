import { signInResponseSchema, SignInProps } from "@/types/auth/authSchemas"
import { env } from "@/lib/env"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	const baseURL = env.NEXT_PUBLIC_API_URL
	const url = request.nextUrl
	url.pathname = "/dashboard"

	const body: SignInProps = await request.json()

	const result = await fetch(`${baseURL}/auth/sign-in`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: body.email,
			password: body.password
		})
	})

	const resultJson = await result.json()
	// console.log("resultJson", resultJson)

	if (!result.ok) throw new Error("Auth error", { cause: resultJson })
	const parsedResponse = signInResponseSchema.safeParse(resultJson)
	// console.log(parsedResponse)
	if (!parsedResponse.data?.access_token) {
		return NextResponse.json({ ok: false, status: 500, message: "Error undefined access_token" })
	}

	const response = NextResponse.json({ ok: true })

	response.cookies.set("access_token", parsedResponse.data.access_token, {
		httpOnly: true,
		path: "/",
		maxAge: parsedResponse.data.expires_in
	})

	return response
}
