export function closeModal(modalId: string) {
	const modal = document.getElementById(modalId) as HTMLDialogElement
	return modal?.close()
}
