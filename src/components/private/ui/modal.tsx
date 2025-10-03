"use client"

import { ComponentProps } from "react"

interface ModalProps extends ComponentProps<"dialog"> {
	id: string
	variant?: string
	hasCloseButton?: boolean
}

function ModalTrigger({ id, children }: { id: string; children: React.ReactNode }) {
	return <div onClick={() => Modal.handleOpen(id)}>{children}</div>
}

const handleOpenModal = (id: string) => {
	const dialog = document?.getElementById(id) as HTMLDialogElement | null
	console.log("dialog", id, dialog)
	dialog?.showModal()
}

function ModalFooter({ children, className, ...props }: ComponentProps<"div">) {
	return (
		<div className={`modal-action ${className}`} {...props}>
			<form method="dialog" className="flex items-center gap-2">
				{children}
			</form>
		</div>
	)
}

function Modal({ id, variant, children, className, hasCloseButton, ...props }: ModalProps) {
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
		<dialog id={id} className={`modal modal-bottom sm:modal-middle`} {...props}>
			<div className={`modal-box bg-white w-full ${widthVariant}`}>
				<div className="modal-action">
					{/* TODO acho q posso tirar isso */}
					{hasCloseButton ? (
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
				{/* {hasCloseButton ? (
						modalBody
					) : (
						<div className="modal-action">
							<form method="dialog" className="flex items-center gap-2">
								<Button outline={true} className="min-w-20 px-4">
									Cancelar
								</Button>
								<Button color="indigo" outline={false} className="min-w-20 px-4" onClick={() => console.log("receba")}>
									Cadastrar
								</Button>
							</form>
						</div>
					)} */}
			</div>
		</dialog>
	)
}

Modal.handleOpen = handleOpenModal

export { Modal, ModalTrigger, ModalFooter }
