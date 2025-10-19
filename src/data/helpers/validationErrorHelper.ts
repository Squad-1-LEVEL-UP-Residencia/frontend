export function validationErrorHelper(error: any) {
	const hasValidationErrors = error && typeof error === "object" && error.errors

	if (hasValidationErrors) {
		const validationErrors = Object.entries(error.errors)
			.map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
			.join(" | ")

		return {
			error: error.title || "Erro de validação",
			validationErrors,
			raw: error
		}
	}

	// fallback genérico
	return {
		error: error.message || "Erro desconhecido",
		details: error.details || null,
		raw: error
	}
}
