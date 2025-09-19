import { Input } from "@/components/ui/public/input"
import { Label } from "@/components/ui/public/label"
import Link from "next/link"

export default function SignIn() {
	async function submit(formData: FormData) {
		"use server"
		const email = formData.get("email")
		const password = formData.get("password")

		const response = fetch("")

		console.log(`email: ${email}, password: ${password}`)
	}

	return (
		<main className="w-full mx-auto my-8 min-h-screen flex items-center justify-center">
			<form
				action={submit}
				className="w-full sm:w-md md:w-xl flex flex-col items-center justify-center gap-4 bg-white px-7 py-10 shadow-2xl rounded-[10px]"
			>
				<h2 className="text-text-primary font-semibold text-[32px]">
					Seja Bem vindo!
				</h2>
				<p className="text-text-secondary text-base">
					Faça login na sua conta para acessar a plataforma
				</p>
				<fieldset className="fieldset w-full bg-white p-4">
					<Label>Email</Label>
					<Input name="email" type="email" />

					<Label>Senha</Label>
					<Input name="password" type="password" />

					<div className="w-full flex justify-between mt-2">
						<div>
							<input
								type="checkbox"
								// defaultChecked
								className="checkbox checkbox-primary"
							/>{" "}
							Lembrar-me
						</div>
						<div>
							<Link
								href="/forgot-password"
								className="link text-blue-primary no-underline"
							>
								Esqueceu a senha?
							</Link>
						</div>
					</div>

					<button
						type="submit"
						className="btn btn-neutral bg-blue-primary text-white p-6 hover:bg-blue-primary/90 rounded-2xl mt-4 border-none"
					>
						Entrar
					</button>
				</fieldset>
			</form>
		</main>
	)
}
