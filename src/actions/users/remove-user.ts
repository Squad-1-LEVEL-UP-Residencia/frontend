"use server";

import { env } from "@/lib/env";

export async function removeUser(id: string) {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return {
        success: false,
        status: res.status,
        error: err?.message || "Erro ao remover usuário",
      };
    }

    return { success: true, status: res.status };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Erro desconhecido",
    };
  }
}
