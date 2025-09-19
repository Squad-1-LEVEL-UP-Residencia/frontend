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
			<body>
				<div className="space-y-4 p-8">
					{/* Cores principais */}
					<div className="bg-blue-primary text-white p-4 rounded shadow">
						Cor azul primária customizada (bg-blue-primary)
					</div>
					<div className="bg-blue-primary/10 text-blue-primary p-4 rounded shadow">
						Azul primária 10% de opacidade (bg-blue-primary/10)
					</div>
					<div className="bg-blue-dark text-white p-4 rounded shadow">
						Cor azul escuro customizada (bg-blue-dark)
					</div>
					<div className="bg-blue-dark/10 text-blue-dark p-4 rounded shadow">
						Azul escuro 10% de opacidade (bg-blue-dark/10)
					</div>
					<div className="bg-purple-primary text-white p-4 rounded shadow">
						Cor roxa customizada (bg-purple-primary)
					</div>
					<div className="bg-purple-primary/10 text-purple-primary p-4 rounded shadow">
						Roxa 10% de opacidade (bg-purple-primary/10)
					</div>
					<div className="bg-red-primary text-white p-4 rounded shadow">
						Cor vermelha customizada (bg-red-primary)
					</div>
					<div className="bg-red-primary/10 text-red-primary p-4 rounded shadow">
						Vermelha 10% de opacidade (bg-red-primary/10)
					</div>
					<div className="bg-green-primary text-white p-4 rounded shadow">
						Cor verde customizada (bg-green-primary)
					</div>
					<div className="bg-green-primary/10 text-green-primary p-4 rounded shadow">
						Verde 10% de opacidade (bg-green-primary/10)
					</div>
					<div className="bg-warning-primary text-white p-4 rounded shadow">
						Cor de alerta customizada (bg-warning-primary)
					</div>
					<div className="bg-warning-primary/10 text-warning-primary p-4 rounded shadow">
						Alerta 10% de opacidade (bg-warning-primary/10)
					</div>
					<div className="bg-background text-text-primary p-4 rounded shadow">
						Fundo customizado (bg-background) e texto primário
					</div>
					<div className="bg-light-grey text-text-primary p-4 rounded shadow">
						Fundo customizado (bg-light-grey) e texto primário
					</div>
					<div className="bg-mid-grey text-text-primary p-4 rounded shadow">
						Fundo customizado (bg-mid-grey) e texto primário
					</div>
					<div className="bg-light-grey/10 text-text-primary p-4 rounded shadow">
						Fundo customizado (bg-light-grey/10) e texto primário
					</div>
					<div className="bg-mid-grey/10 text-text-primary p-4 rounded shadow">
						Fundo customizado (bg-mid-grey/10) e texto primário
					</div>
					{/* Cores de calendário */}
					<div className="bg-calendar-orange text-text-primary p-4 rounded shadow">
						Cor de calendário laranja (bg-calendar-orange)
					</div>
					<div className="bg-calendar-red text-text-primary p-4 rounded shadow">
						Cor de calendário vermelha (bg-calendar-red)
					</div>
					<div className="bg-calendar-blue text-text-primary p-4 rounded shadow">
						Cor de calendário azul (bg-calendar-blue)
					</div>
					{/* Cores de texto */}
					<div className="bg-white-primary text-text-primary p-4 rounded shadow">
						Texto primário (text-text-primary)
					</div>
					<div className="bg-white-primary text-text-secondary p-4 rounded shadow">
						Texto secundário (text-text-secondary)
					</div>
					<div className="bg-white-primary text-text-tertiary p-4 rounded shadow">
						Texto terciário (text-text-tertiary)
					</div>
					<div className="bg-blue-primary text-text-white p-4 rounded shadow">
						Texto branco (text-text-white)
					</div>
					{/* Gradientes */}
					<div
						className="text-white p-4 rounded shadow"
						style={{ background: "var(--gradient-blue-primary)" }}
					>
						Gradiente azul primário (var(--gradient-blue-primary))
					</div>
					<div
						className="text-white p-4 rounded shadow"
						style={{ background: "var(--gradient-blue-secondary)" }}
					>
						Gradiente azul secundário (var(--gradient-blue-secondary))
					</div>
				</div>
				{children}
			</body>
		</html>
	)
}
