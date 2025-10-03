import { TitleSection } from "@/components/private/ui/title-section"
import Link from "next/link"

export default function Home() {
	return (
		<div className="flex flex-col gap-6 w-full h-full">
			<TitleSection title="Home" paragraph="Ir para dashbaord?" />
			<Link href="/dashboard" className="text-blue-500 hover:underline">
				Ir para dashboard
			</Link>
		</div>
	)
}
