"use client"

import { SignInInput } from "@/components/public/sign-in-input"
import { Label } from "@/components/public/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInProps, signInSchema } from "@/types/auth/authSchemas"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { EyeClosedIcon, EyeIcon } from "lucide-react"
import toast from "react-hot-toast"

export default function SignIn() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
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

			if (!res.ok) toast.error("Erro ao fazer login. Verifique suas credenciais.")
			return router.push("/dashboard")
		} catch (error) {
			console.log("Error on sign in:", {
				...(error instanceof Error ? { message: error.message } : {})
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleSign)} className="w-full max-w-md flex flex-col gap-6">
			<div>
				<h2 className="text-text-primary font-semibold text-3xl">Seja Bem vindo!</h2>
				<p className="text-text-secondary text-sm mt-2">Faça login na sua conta para acessar a plataforma</p>
			</div>

			{/* CAMPOS */}
			<div className="flex flex-col gap-4">
				<div>
					<Label>Email</Label>
					<SignInInput {...register("email")} type="email" className="border border-gray-300 rounded-lg h-10 text-sm" />
					{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
				</div>

				<div>
					<Label>Senha</Label>
					<div className="space-y-2">
						<SignInInput
							{...register("password")}
							type={showPassword ? "text" : "password"}
							// className="border border-gray-300 rounded-lg h-10 text-sm"
						/>

						<label className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer">
							<input
								type="checkbox"
								checked={showPassword}
								onChange={(e) => setShowPassword(e.target.checked)}
								className="checkbox checkbox-primary"
							/>
							{showPassword ? "Esconder senha" : "Mostrar senha"}
						</label>
					</div>
					{errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
				</div>
			</div>

			{/* LEMBRAR SENHA */}
			<div className="flex justify-between items-center text-sm mt-10">
				<label className="flex items-center gap-2 cursor-pointer text-gray-800">
					<input type="checkbox" {...register("rememberMe")} className="checkbox checkbox-primary" />
					Lembrar senha
				</label>

				<Link href="/forgot-password" className="text-blue-primary hover:underline">
					Esqueci minha senha
				</Link>
			</div>

			{/* BOTÃO */}
			<button
				type="submit"
				disabled={isLoading}
				className="w-full bg-blue-primary text-white py-3 rounded-xl transition-all hover:bg-blue-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? "Entrando..." : "Entrar"}
			</button>
		</form>
	)
}
