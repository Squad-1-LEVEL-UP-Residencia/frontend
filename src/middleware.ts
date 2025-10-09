import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = [
	{ path: "/sign-in", whenAuthenticated: "redirect" },
	{ path: "/forgot-password", whenAuthenticated: "next" },
	{ path: "/colors", whenAuthenticated: "next" }
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/sign-in"

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const publicRoute = publicRoutes.find((route) => route.path === pathname)
	const authToken = request.cookies.get("accessToken")
	const authTokenValue = authToken?.value
	const isAuthenticated = authTokenValue != null && authTokenValue !== ""
	if (!isAuthenticated && !publicRoute) {
		const redirectUrl = request.nextUrl.clone()
		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

		return NextResponse.redirect(redirectUrl)
	}

	if (isAuthenticated && publicRoute?.whenAuthenticated == "redirect") {
		const redirectUrl = request.nextUrl.clone()
		redirectUrl.pathname = "/dashboard"

		return NextResponse.redirect(redirectUrl)
	}

	// Redireciona usuário autenticado da '/' para '/dashboard'
	if (isAuthenticated && pathname === "/") {
		const redirectUrl = request.nextUrl.clone()
		redirectUrl.pathname = "/dashboard"
		return NextResponse.redirect(redirectUrl)
	}
}

// Configuração para aplicar o middleware nas rotas desejadas
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
}
