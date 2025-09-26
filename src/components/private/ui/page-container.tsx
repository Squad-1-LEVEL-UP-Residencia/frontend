export function PageContainer({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col gap-6 w-full h-full">{children}</div>
}
