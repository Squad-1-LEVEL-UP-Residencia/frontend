"use client"

import { useEffect, useState } from "react"
import type { Role } from "@/types/roles/role"
import { Modal } from "@/components/private/ui/modal"
import { format } from "@/lib/format-date"

export default function ViewRoleModal() {
  const [role, setRole] = useState<Role | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Role>).detail
      setRole(detail ?? null)
      setTimeout(() => Modal.handleOpen("view_role_modal"), 0)
    }

    window.addEventListener("role:view-open", handler as EventListener)

    return () => {
      window.removeEventListener("role:view-open", handler as EventListener)
    }
  }, [])

  if (!role) return null

  return (
    <Modal id="view_role_modal" variant="lg" hasCloseButton>
      <div className="space-y-6">
        <div className="pb-4 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900">{role.name}</h2>
          <p className="text-sm text-gray-600 mt-1">{role.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">ID</label>
            <p className="text-gray-900 mt-1">{role.id}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Slug</label>
            <p className="text-gray-900 mt-1">{role.slug}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Nome</label>
            <p className="text-gray-900 mt-1">{role.name}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Cargo do Sistema</label>
            <p className="text-gray-900 mt-1">
              {role.is_system_role ? (
                <span className="badge badge-info badge-sm">Sim</span>
              ) : (
                <span className="badge badge-ghost badge-sm">Não</span>
              )}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Criado em</label>
            <p className="text-gray-900 mt-1">{format(new Date(role.created_at))}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Atualizado em</label>
            <p className="text-gray-900 mt-1">{format(new Date(role.updated_at))}</p>
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-gray-700">Descrição</label>
          <p className="text-gray-900 mt-1 bg-gray-50 rounded-lg p-3">{role.description}</p>
        </div>

        {role.permissions && role.permissions.length > 0 && (
          <div className="pt-4 border-t border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Permissões ({role.permissions.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {role.permissions.map((permission) => (
                <div key={permission.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{permission.label}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {permission.slug}
                      </p>
                      {permission.details && (
                        <p className="text-sm text-gray-700 mt-1">
                          {permission.details}
                        </p>
                      )}
                    </div>
                    <span className="badge badge-primary badge-sm">ID: {permission.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!role.permissions || role.permissions.length === 0) && (
          <div className="pt-4 border-t border-gray-300">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600">Nenhuma permissão atribuída a este cargo</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
