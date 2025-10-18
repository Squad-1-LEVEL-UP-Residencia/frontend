export function validationErrorHelper(error: any) {
	const validationErrors = Object.entries(error.errors)
		.map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
		.join(" | ")

	return {
		error: error.title || "Erro de validação",
		// status: response.status,
		validationErrors,
		raw: error
	}
}
