"use client"

import { ComponentProps } from "react"
import { Button } from "./button"

interface ModalProps extends ComponentProps<"dialog"> {
	id: string
	variant?: string
	hasCancelButton: boolean
}

function ModalTrigger({ id, children }: { id: string; children: React.ReactNode }) {
	return <div onClick={() => Modal.handleOpen(id)}>{children}</div>
}

const handleOpenModal = (id: string) => {
	const dialog = document?.getElementById(id) as HTMLDialogElement | null
	dialog?.showModal()
}

function Modal({ id, variant, children, className, hasCancelButton, ...props }: ModalProps) {
	let widthVariant: string = ""
	switch (variant) {
		case "lg":
			widthVariant = "min-w-5xl"
			break
		case "sm":
			widthVariant = "min-w-lg"
			break
		default:
			widthVariant = ""
			break
	}

	return (
		<dialog id="my_modal_user" className={`modal modal-bottom sm:modal-middle`} {...props}>
			<div className={`modal-box bg-white w-full ${widthVariant}`}>
				<div className="modal-action">
					{/* TODO acho q posso tirar isso */}
					{!hasCancelButton ? (
						<form method="dialog">
							{/* TODO customizar as cores hover e font do botao de close */}
							{/* if there is a button in form, it will close the modal */}
							<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
						</form>
					) : null}
				</div>
				{/* content */}
				<div className={`${className}`}>{children}</div>
				{/* end content */}
				{hasCancelButton ? (
					<div className="modal-action">
						<form method="dialog" className="flex items-center gap-2">
							{/* if there is a button in form, it will close the modal */}
							<Button outline={true} className="w-20">
								Close
							</Button>
							<Button color="indigo" outline={false} className="w-20" onClick={() => console.log("receba")}>
								Salvar
							</Button>
						</form>
					</div>
				) : null}
			</div>
		</dialog>
	)
}

Modal.handleOpen = handleOpenModal

export { Modal, ModalTrigger }
