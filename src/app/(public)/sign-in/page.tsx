"use client"

import { SignInInput } from "@/components/public/sign-in-input"
import { Label } from "@/components/public/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInProps, signInSchema } from "@/types/auth/authSchemas"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignIn() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(signInSchema)
	})

	async function handleSign(data: SignInProps) {
		const { email, password, rememberMe } = data
		setIsLoading(true)
		try {
			const res = await fetch("/api/auth/sign-in", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, password, rememberMe })
			})
			if (!res.ok) throw new Error("Failed to sign in")
			// console.log("Sign in successful")
			return router.push("/dashboard")
		} catch (error) {
			console.log("Error on sign in:", {
				...(error instanceof Error ? { message: error.message } : {})
				//TODO toast de error
			})
		} finally {
			setIsLoading(false)
		}
	}

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
						disabled={isLoading}
						className="btn btn-neutral bg-blue-primary text-white p-6 hover:bg-blue-primary/90 rounded-2xl mt-4 border-none disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? (
							<span className="flex items-center gap-2">
								<svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Entrando...
							</span>
						) : (
							"Entrar"
						)}
					</button>
				</fieldset>
			</form>
		</main>
	)
}
