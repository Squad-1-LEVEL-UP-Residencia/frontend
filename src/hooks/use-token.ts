"use server"

import { cookies } from "next/headers"

export async function useToken() {
	const ck = await cookies()
	const accessToken = ck.get("access_token")?.value
	if (!accessToken) {
		return null
	}
	return accessToken
}
