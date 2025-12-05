import Link from "next/link"

export default function Page() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">401</h1>
				<p className="mt-6 text-lg leading-8 text-gray-600">Você não tem permissão para acessar esta página.</p>
				<Link href="/" className="mt-6 text-lg leading-8 text-indigo-600 hover:text-indigo-500">
					Voltar para a página inicial
				</Link>
			</div>
		</div>
	)
}
