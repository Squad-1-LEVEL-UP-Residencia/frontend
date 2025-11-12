import { Permission } from "@/types/roles/permission"

export function hasPermission(permissions: Permission[], slug: string) {
	return permissions.some((permission) => permission.slug === slug)
}
