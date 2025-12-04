import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { SignInAuthProvider } from "@/components/public/sign-auth-provider"
import Illustration from "@/app/(public)/login-illustration.png"
import FlapIconSvg from "../../components/public/flap-icon"
import ToastProvider from "@/contexts/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "FlapBan",
	description: "FlapBan Login"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" style={{ fontFamily: inter.style.fontFamily }}>
			<body className="min-h-screen w-full overflow-hidden">
				<ToastProvider />
				<SignInAuthProvider>
					{/* FUNDO ROXO EM TELA INTEIRA */}
					<div className="relative w-full h-screen bg-[#6753EC] flex items-center justify-center">
						{/* BLOCO BRANCO SOBREPOSTO */}
						<div
							className="
              absolute left-0 top-0 bottom-0 
              w-full md:w-[55%] 
              bg-white 
              flex items-center justify-center 
              p-8 md:p-20 
              rounded-r-[120px] 
              shadow-xl
            "
						>
							{children}
						</div>

						{/* ÁREA DA ILUSTRAÇÃO (À DIREITA) */}
						<div className="hidden md:flex flex-col justify-center items-center w-[45%] ml-auto pr-20">
							{/* LOGO */}
							<div className="flex items-center gap-3 mb-12 select-none">
								<div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow">
									<FlapIconSvg className="w-8 h-8 text-[#6753EC]" />
								</div>
								<h1 className="text-white text-4xl font-semibold">FlapBan</h1>
							</div>

							{/* ILUSTRAÇÃO */}
							<img
								src={Illustration.src}
								alt="Pessoa com notebook"
								className="w-[360px] opacity-95 pointer-events-none"
							/>
						</div>
					</div>
				</SignInAuthProvider>
			</body>
		</html>
	)
}
