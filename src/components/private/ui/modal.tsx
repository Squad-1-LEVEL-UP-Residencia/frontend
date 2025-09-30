import { ComponentProps } from "react"
import { Button } from "./button"

interface ModalProps extends ComponentProps<"dialog"> {
	variant?: string
	hasCancelButton: boolean
}

// TODO criar modulos para envelopar o botao de abrir o modal e funcao de abrir o modal

export function Modal({
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
				{hasCancelButton ? (
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn">Close</button>
							<Button onClick={() => console.log("receba")}>Salvar</Button>
						</form>
					</div>
				) : null}
			</div>
		</dialog>
	)
}
