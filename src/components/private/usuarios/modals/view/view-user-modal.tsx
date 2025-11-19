"use client"

import { useEffect, useState } from "react"
import type { User } from "@/types/users/user"
import { Modal } from "@/components/private/ui/modal"
import { Avatar } from "@/components/private/ui/avatar"
import { format } from "@/lib/format-date"

export default function ViewUserModal() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<User>).detail
      setUser(detail ?? null)
      setTimeout(() => Modal.handleOpen("view_user_modal"), 0)
    }

    window.addEventListener("user:view-open", handler as EventListener)

    return () => {
      window.removeEventListener("user:view-open", handler as EventListener)
    }
  }, [])

  if (!user) return null

  return (
    <Modal id="view_user_modal" variant="lg" hasCloseButton>
      <div className="space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-gray-300">
          <Avatar name={user.name} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">ID</label>
            <p className="text-gray-900 mt-1">{user.id}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">E-mail</label>
            <p className="text-gray-900 mt-1">{user.email}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Cargo</label>
            <p className="text-gray-900 mt-1">{user.role?.name || "Sem cargo"}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Email Verificado</label>
            <p className="text-gray-900 mt-1">
              {user.email_verified_at ? (
                <span className="badge badge-success badge-sm">
                  Verificado em {format(new Date(user.email_verified_at))}
                </span>
              ) : (
                <span className="badge badge-warning badge-sm">Não verificado</span>
              )}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Criado em</label>
            <p className="text-gray-900 mt-1">{format(new Date(user.created_at))}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Atualizado em</label>
            <p className="text-gray-900 mt-1">{format(new Date(user.updated_at))}</p>
          </div>
        </div>

        {user.role && (
          <div className="pt-4 border-t border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Detalhes do Cargo</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div>
                <label className="text-sm font-semibold text-gray-700">Nome do Cargo</label>
                <p className="text-gray-900 mt-1">{user.role.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Descrição</label>
                <p className="text-gray-900 mt-1">{user.role.description}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Cargo do Sistema</label>
                <p className="text-gray-900 mt-1">
                  {user.role.is_system_role ? (
                    <span className="badge badge-info badge-sm">Sim</span>
                  ) : (
                    <span className="badge badge-ghost badge-sm">Não</span>
                  )}
                </p>
              </div>
              {user.role.permissions && user.role.permissions.length > 0 && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Permissões ({user.role.permissions.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {user.role.permissions.map((permission) => (
                      <span key={permission.id} className="badge badge-primary badge-sm">
                        {permission.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
