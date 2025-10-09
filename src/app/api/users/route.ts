import { apiFetch } from "@/lib/api"
import { NextResponse } from "next/server"

export async function GET() {
	const users = apiFetch("/users", { method: "GET" }, "default")
}
