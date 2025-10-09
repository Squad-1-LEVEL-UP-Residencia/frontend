import { env } from "./env"

const baseURL = env.NEXT_PUBLIC_API_URL

export async function apiFetch(path: string, options: RequestInit, cache?: RequestCache) {
	const response = await fetch(`${baseURL}/api${path}`, {
		...options,
		cache: cache
	})

	return response
}
