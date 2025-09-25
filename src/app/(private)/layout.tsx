import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/private/sidebar/sidebar"

import "../globals.css"
import { Navbar } from "@/components/private/navbar/navbar"
import { BaseLayout } from "@/components/private/base-layout"

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
					background: "var(--color-background)",
					minHeight: "100dvh",
					width: "100vw"
				}}
			>
				<BaseLayout>{children}</BaseLayout>
			</body>
		</html>
	)
}
