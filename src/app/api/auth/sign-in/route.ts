import { SignInProps, signInResponseSchema } from "@/data/auth/authSchemas"
import { env } from "@/lib/env"
import { NextRequest, NextResponse } from "next/server"

// export async function POST(request: NextRequest) {
// 	const baseURL = env.NEXT_PUBLIC_API_URL
// 	const url = request.nextUrl
// 	url.pathname = "/"

// 	const body: SignInProps = await request.json()

// 	const result = await fetch(`${baseURL}/auth/login`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json"
// 		},
// 		body: JSON.stringify({
// 			email: body.email,
// 			password: body.password
// 		})
// 	})
// 	console.log(result)
// 	if (!result.ok) throw new Error("Auth error")
// 	const resultJson = await result.json()
// 	const parsedResponse = signInResponseSchema.safeParse(resultJson)

// 	if (!parsedResponse.data?.accessToken) {
// 		return NextResponse.json({ ok: false, status: 500, message: "Error undefined accessToken" })
// 	}

// 	const user = {
// 		id: parsedResponse.data.userId,
// 		name: parsedResponse.data.name,
// 		email: parsedResponse.data.email,
// 		roles: parsedResponse.data.roles
// 	}

// 	const response = NextResponse.json({ ok: true, user: user })

// 	response.cookies.set("accessToken", parsedResponse.data.accessToken, {
// 		httpOnly: false,
// 		path: "/"
// 		//TODO configurar max age com base no rememberMe ou no refreshToken
// 		//* Acho q so devo implementar o refreshToken se tiver com o rememberMe
// 	})

// 	return response
// }

export async function POST(request: NextRequest) {
	// const baseURL = env.NEXT_PUBLIC_API_URL
	const url = request.nextUrl
	url.pathname = "/dashboard"

	// const body: SignInProps = await request.json()

	// const result = await fetch(`${baseURL}/auth/login`, {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	},
	// 	body: JSON.stringify({
	// 		email: body.email,
	// 		password: body.password
	// 	})
	// })
	// console.log(result)
	// if (!result.ok) throw new Error("Auth error")
	// const resultJson = await result.json()
	// const parsedResponse = signInResponseSchema.safeParse(resultJson)

	// if (!parsedResponse.data?.accessToken) {
	// 	return NextResponse.json({ ok: false, status: 500, message: "Error undefined accessToken" })
	// }

	// const user = {
	// 	id: parsedResponse.data.userId,
	// 	name: parsedResponse.data.name,
	// 	email: parsedResponse.data.email,
	// 	roles: parsedResponse.data.roles
	// }

	const response = NextResponse.json({ ok: true })

	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJkOGYzYTFhMi02YjRlLTRjMjktOTNhNy01ZjYyZjBhMGEyYjEiLCJ1bmlxdWVfbmFtZSI6ImRhbmlsbG8uZmVycmVpcmEiLCJlbWFpbCI6ImRhbmlsbG8uZmVycmVpcmFAZXhhbXBsZS5jb20iLCJhY3RpdmUiOiJ0cnVlIiwicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJuYmYiOjE3Mjg1NDAwMDAsImV4cCI6MTcyODU0MzYwMCwiaWF0IjoxNzI4NTQwMDAwLCJpc3MiOiJodHRwczovL2FwaS5ib25zYWUuY29tLmJyIiwiYXVkIjoiaHR0cHM6Ly9hcHAuYm9uc2FlLmNvbS5iciIsImF2YXRhclVybCI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xMjM0NTY3OD92PTQifQ.CoDIDWU1J-kVZhHoqKRzb9xM0oAqLN4UvwSE0XSwG9s"

	response.cookies.set("accessToken", token, {
		httpOnly: false,
		path: "/"
		//TODO configurar max age com base no rememberMe ou no refreshToken
		//* Acho q so devo implementar o refreshToken se tiver com o rememberMe
	})

	return response
}
