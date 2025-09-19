import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

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
		<html lang="pt-BR" style={{ fontFamily: inter.style.fontFamily }}>
			<body
				style={{
					background: "var(--gradient-blue-secondary)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					minHeight: "100dvh",
					width: "100vw",
					overflowX: "hidden"
				}}
				className="text-text-primary"
			>
				{children}
			</body>
		</html>
	)
}
