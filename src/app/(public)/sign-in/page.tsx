"use client"

import { SignInInput } from "@/components/public/sign-in-input"
import { Label } from "@/components/public/label"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInProps, signInSchema } from "@/data/auth/authSchemas"
import { useRouter } from "next/navigation"

export default function SignIn() {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(signInSchema)
	})

	async function handleSign(data: SignInProps) {
		const { email, password, rememberMe } = data
		try {
			const res = await fetch("/api/auth/sign-in", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, password })
			})
			if (!res.ok) throw new Error("Failed to sign in")
			return router.push("/dashboard")
		} catch (error) {
			console.log("Error on sign in:", {
				...(error instanceof Error
					? { message: error.message }
					: {
							// Handle non-Error cases
					  })
			})
		}
	}

	// async function submit(formData: FormData) {
	// 	"use server"
	// 	const email = formData.get("email")
	// 	const password = formData.get("password")
	// 	const rememberMeChecked = formData.get("rememberMe") === "on"
	// 	const cookiesStore = await cookies()
	// 	// const response = await fetch("/api/sign-in", {
	// 	// 	method: "POST",
	// 	// 	headers: {
	// 	// 		"Content-Type": "application/json"
	// 	// 	},
	// 	// 	body: JSON.stringify({ email, password })
	// 	// })

	// 	// const result = await response.json()

	// 	cookiesStore.set("access_token", "fake-token-123456", {
	// 		httpOnly: true,
	// 		path: "/",
	// 		maxAge: rememberMeChecked ? 60 * 60 * 24 * 7 : undefined
	// 	})

	// 	redirect("/")
	// 	console.log(`email: ${email}, password: ${password}`)
	// }
	// TODO refatorar em componentes menores

	return (
		<main className="w-full mx-auto my-8 min-h-screen flex items-center justify-center">
			<form
				onSubmit={handleSubmit(handleSign)}
				className="w-full sm:w-md md:w-xl flex flex-col items-center justify-center gap-4 bg-white px-7 py-10 shadow-2xl rounded-[10px]"
			>
				<h2 className="text-text-primary font-semibold text-[32px]">Seja Bem vindo!</h2>
				<p className="text-text-secondary text-base">Faça login na sua conta para acessar a plataforma</p>
				<fieldset className="fieldset w-full bg-white p-4">
					<Label>Email</Label>
					<SignInInput {...register("email")} type="email" />
					{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
					<Label>Senha</Label>
					<SignInInput {...register("password")} type="password" />
					{errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
					<div className="w-full flex justify-between mt-2">
						<div>
							<input type="checkbox" defaultChecked {...register("rememberMe")} className="checkbox checkbox-primary" />{" "}
							Lembrar-me
						</div>
						<div>
							<Link href="/forgot-password" className="link text-blue-primary no-underline">
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
