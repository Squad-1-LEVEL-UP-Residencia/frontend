import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
	title: "Flap Bam",
	description: "Flap"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body
				style={{
					background: "var(--gradient-blue-secondary)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					minHeight: "100dvh",
					width: "100vw"
				}}
			>
				{children}
			</body>
		</html>
	)
}
