"use server";

import { env } from "@/lib/env";
import { getToken } from "@/hooks/get-token";
import type { Role, Permission } from "./role";

type RoleDtoFromApi = {
  id: string;
  name: string;
  description: string;
  isSystemRole: boolean;
  isActive: boolean;
  createdAt: string;
  permissions?: Array<
    string | { id?: string; name?: string; description?: string }
  >;
};

export async function getRoles(): Promise<Role[] | null> {
  const accessToken = await getToken();
  if (!accessToken) return null;

  const base = env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${base}/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["roles"] },
    cache: "force-cache",
  });

  if (!res.ok) return null;

  const raw = await res.json();
  const list: RoleDtoFromApi[] = Array.isArray(raw) ? raw : raw?.roles ?? [];

  const normalize = (r: RoleDtoFromApi): Role => {
    const perms: Permission[] = (r.permissions ?? []).map((p: any) => {
      if (typeof p === "string") {
        return { id: p, name: p };
      }
      return {
        id: p?.id ?? p?.name ?? "",
        name: p?.name ?? "",
        description: p?.description,
      };
    });

    return {
      id: r.id,
      name: r.name,
      description: r.description,
      isSystemRole: r.isSystemRole,
      isActive: r.isActive,
      createdAt: r.createdAt,
      permissions: perms,
    };
  };

  return list.map(normalize);
}
