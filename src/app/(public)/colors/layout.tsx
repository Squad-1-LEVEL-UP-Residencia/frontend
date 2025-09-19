import type { Metadata } from "next"
import "@/app/globals.css"

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
			<body className="bg-white">{children}</body>
		</html>
	)
}
