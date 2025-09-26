import * as React from "react"

function FlapIconSvg(props: any) {
	return (
		<svg
			width={32}
			height={32}
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect width={32} height={32} rx={4} fill="#fff" />
			<path d="M16 23.2L9.765 12.4h12.47L16 23.2z" fill="#2D68FE" />
		</svg>
	)
}

export default FlapIconSvg
