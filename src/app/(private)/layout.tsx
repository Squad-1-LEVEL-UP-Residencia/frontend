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
			<body className="text-blue-primary font-black">{children}</body>
		</html>
	)
}
