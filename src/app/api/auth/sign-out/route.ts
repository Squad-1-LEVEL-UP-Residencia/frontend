import { useToken } from "@/hooks/use-token"
import { env } from "@/lib/env"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const url = request.nextUrl.clone()
	url.pathname = "/sign-in" // request pro servidor

	const accessToken = await useToken()
	if (!accessToken) {
		return NextResponse.redirect(url)
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/auth/sign-out`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})
	const response = NextResponse.redirect(url)

	if (!result.ok) {
		if (result.status === 401) {
			response.cookies.delete("access_token")
			return response
		}
		const errorText = await result.text()
		console.log("Erro ao deslogar o usuário da api", errorText)
		console.log(result)
		return NextResponse.json({ error: "Erro ao deslogar o usuário", details: errorText }, { status: 500 })
	}
	response.cookies.delete("access_token")
	return response
}
