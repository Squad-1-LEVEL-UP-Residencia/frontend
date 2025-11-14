"use client"

import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { Avatar } from "@/components/private/ui/avatar"
import { Label } from "@/components/private/ui/label"
import { Button } from "@/components/private/ui/button"
import { useEffect, useState } from "react"
import type { User } from "@/types/users/user"
import { Mail, Calendar, Shield } from "lucide-react"

export function ViewUserModal() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<User>).detail
      setUser(detail ?? null)
    }
    window.addEventListener("user:view-open", handler as EventListener)
    return () => window.removeEventListener("user:view-open", handler as EventListener)
  }, [])

  if (!user) return null

  return (
    <Modal id="view_user_modal" variant="lg" hasCloseButton>
      <div className="flex flex-col gap-6">
        <Title variant="sm">Detalhes do Usuário</Title>

        <div className="flex flex-col gap-6">
          {/* Cabeçalho com Avatar e Nome */}
          <div className="flex items-center gap-4 pb-6 border-b border-light-grey">
            <Avatar name={user.name} className="w-20 h-20 text-2xl" />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold text-text-primary">{user.name}</h2>
              <div className="flex items-center gap-2 text-text-secondary">
                <Mail width={16} height={16} />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Grid de Informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cargo */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2">
                <Shield width={16} height={16} className="text-indigo-primary" />
                Cargo
              </Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <p className="text-sm font-medium text-text-primary">
                  {user.role ? user.role.name : "Sem cargo atribuído"}
                </p>
                {user.role?.description && (
                  <p className="text-xs text-text-secondary mt-1">{user.role.description}</p>
                )}
              </div>
            </div>

            {/* ID do Usuário */}
            <div className="flex flex-col gap-2">
              <Label>ID do Usuário</Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <p className="text-sm font-mono text-text-secondary">{user.id}</p>
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
                  {new Date(user.created_at).toLocaleDateString('pt-BR', {
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
                  {new Date(user.updated_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Email Verificado */}
            <div className="flex flex-col gap-2">
              <Label>Status de Verificação</Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${user.email_verified_at ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <p className="text-sm text-text-primary">
                    {user.email_verified_at ? 'Email verificado' : 'Email não verificado'}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2">
              <Label>Status da Conta</Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${user.deleted_at ? 'bg-red-500' : 'bg-green-500'}`} />
                  <p className="text-sm text-text-primary">
                    {user.deleted_at ? 'Inativa' : 'Ativa'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Permissões do Cargo (se existir) */}
          {user.role && user.role.permissions && user.role.permissions.length > 0 && (
            <div className="flex flex-col gap-3 pt-4 border-t border-light-grey">
              <Label>Permissões do Cargo</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {user.role.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg"
                  >
                    <p className="text-sm font-medium text-indigo-700">{permission.label}</p>
                    {permission.details && (
                      <p className="text-xs text-indigo-600 mt-0.5">{permission.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

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
