"use client"

import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { Label } from "@/components/private/ui/label"
import { Button } from "@/components/private/ui/button"
import { useEffect, useState } from "react"
import type { Role } from "@/types/roles/role"
import { Shield, Calendar, Lock, CheckCircle2 } from "lucide-react"

export function ViewRoleModal() {
  const [role, setRole] = useState<Role | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Role>).detail
      setRole(detail ?? null)
    }
    window.addEventListener("role:view-open", handler as EventListener)
    return () => window.removeEventListener("role:view-open", handler as EventListener)
  }, [])

  if (!role) return null

  return (
    <Modal id="view_role_modal" variant="lg" hasCloseButton>
      <div className="flex flex-col gap-6">
        <Title variant="sm">Detalhes do Cargo</Title>

        <div className="flex flex-col gap-6">
          {/* Cabeçalho do Cargo */}
          <div className="flex items-start gap-4 pb-6 border-b border-light-grey">
            <div className="p-4 bg-indigo-100 rounded-xl">
              <Shield className="text-indigo-600" width={32} height={32} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-text-primary">{role.name}</h2>
                {role.is_system_role && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 border border-red-200 rounded-md flex items-center gap-1">
                    <Lock width={12} height={12} />
                    Sistema
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary">{role.description}</p>
            </div>
          </div>

          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slug */}
            <div className="flex flex-col gap-2">
              <Label>Identificador (Slug)</Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <p className="text-sm font-mono text-text-secondary">{role.slug}</p>
              </div>
            </div>

            {/* ID */}
            <div className="flex flex-col gap-2">
              <Label>ID do Cargo</Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <p className="text-sm font-mono text-text-secondary">{role.id}</p>
              </div>
            </div>

            {/* Data de Criação */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2">
                <Calendar width={16} height={16} className="text-indigo-primary" />
                Criado em
              </Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <p className="text-sm text-text-primary">
                  {new Date(role.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Data de Atualização */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2">
                <Calendar width={16} height={16} className="text-indigo-primary" />
                Atualizado em
              </Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <p className="text-sm text-text-primary">
                  {new Date(role.updated_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Seção de Permissões */}
          <div className="flex flex-col gap-4 pt-4 border-t border-light-grey">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle2 width={20} height={20} className="text-indigo-primary" />
                Permissões do Cargo
              </Label>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                {role.permissions?.length || 0} {role.permissions?.length === 1 ? 'permissão' : 'permissões'}
              </span>
            </div>

            {role.permissions && role.permissions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                {role.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="group px-4 py-3 bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-xl hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2 className="text-indigo-600" width={18} height={18} />
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <p className="text-sm font-semibold text-indigo-900">{permission.label}</p>
                        {permission.details && (
                          <p className="text-xs text-indigo-600 leading-relaxed">{permission.details}</p>
                        )}
                        <p className="text-xs font-mono text-indigo-400 mt-1">{permission.slug}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 bg-background rounded-lg border border-dashed border-light-grey text-center">
                <p className="text-sm text-text-secondary">Nenhuma permissão atribuída a este cargo</p>
              </div>
            )}
          </div>

          {/* Footer com botão de fechar */}
          <div className="flex justify-end pt-4 border-t border-light-grey">
            <form method="dialog">
              <Button type="submit" outline={false} color="indigo">
                Fechar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}
