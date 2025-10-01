"use client"

import { ComponentProps } from "react"
import { Button } from "./button"

interface ModalProps extends ComponentProps<"dialog"> {
	variant?: string
	hasCancelButton: boolean
}

function ModalTrigger({ children }: { children: React.ReactNode }) {
	return <div onClick={() => Modal.handleOpen()}>{children}</div>
}

const handleOpenModal = () => {
	const dialog = document?.getElementById(
		"my_modal_5"
	) as HTMLDialogElement | null
	dialog?.showModal()
}

function Modal({
	variant,
	children,
	className,
	hasCancelButton,
	...props
}: ModalProps) {
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
		<dialog
			id="my_modal_5"
			className={`modal modal-bottom sm:modal-middle ${className}`}
			{...props}
		>
			<div className={`modal-box ${widthVariant} bg-white w-full`}>
				<div className="modal-action">
					{/* TODO acho q posso tirar isso */}
					{!hasCancelButton ? (
						<form method="dialog">
							{/* TODO customizar as cores hover e font do botao de close */}
							{/* if there is a button in form, it will close the modal */}
							<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
								✕
							</button>
						</form>
					) : null}
				</div>
				{/* content */}
				<div>{children}</div>
				{/* end content */}
				{hasCancelButton ? (
					<div className="modal-action">
						<form method="dialog" className="flex items-center gap-2">
							{/* if there is a button in form, it will close the modal */}
							<Button variant="primary" className="w-20">
								Close
							</Button>
							<Button
								color="indigo"
								variant="secondary"
								className="w-20"
								onClick={() => console.log("receba")}
							>
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
