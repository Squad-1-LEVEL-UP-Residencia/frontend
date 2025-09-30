import { ComponentProps } from "react"

interface ModalProps extends ComponentProps<"dialog"> {
	variant?: string
}

export function Modal({ variant, children, className, ...props }: ModalProps) {
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
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn">Close</button>
					</form>
				</div>
				{/* content */}
				<div>{children}</div>
			</div>
		</dialog>
	)
}
