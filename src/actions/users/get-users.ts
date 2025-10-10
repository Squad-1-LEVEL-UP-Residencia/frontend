"use server"

import { env } from "@/lib/env"
import { getToken } from "@/hooks/get-token"
import { NextResponse } from "next/server"

export async function getUsers() {
	// const ck = await cookies()
	// const accessToken = ck.get("accessToken")?.value
	// if (!accessToken) {
	// 	return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
	// }

	const accessToken = await getToken()
	if (!accessToken) {
		return null
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/users`, {
		next: {
			tags: ["users"]
		},
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		},
		cache: "force-cache"
	})

	if (!result.ok) {
		return null
	}

	const users = await result.json()

	return users
}
