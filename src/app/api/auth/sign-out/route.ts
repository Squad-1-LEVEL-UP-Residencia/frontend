import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const url = request.nextUrl.clone()
	url.pathname = "/sign-in"

	const response = NextResponse.redirect(url)
	response.cookies.delete("accessToken")

	return response
}
