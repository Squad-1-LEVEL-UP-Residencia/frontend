"use server"

import { cookies } from "next/headers"

export async function getToken() {
	const ck = await cookies()
	const accessToken = ck.get("accessToken")?.value
	if (!accessToken) {
		return null
	}
	return accessToken
}
