"use client"

import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { Avatar } from "@/components/private/ui/avatar"
import { Label } from "@/components/private/ui/label"
import { Button } from "@/components/private/ui/button"
import { useEffect, useState } from "react"
import type { Client } from "@/types/clients/client"
import { Mail, Phone, MapPin, User, Calendar, FileText, ExternalLink } from "lucide-react"

export function ViewClientModal() {
  const [client, setClient] = useState<Client | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Client>).detail
      setClient(detail ?? null)
    }
    window.addEventListener("client:view-open", handler as EventListener)
    return () => window.removeEventListener("client:view-open", handler as EventListener)
  }, [])

  if (!client) return null

  return (
    <Modal id="view_client_modal" variant="lg" hasCloseButton>
      <div className="flex flex-col gap-6">
        <Title variant="sm">Detalhes do Cliente</Title>

        <div className="flex flex-col gap-6">
          {/* Cabeçalho com Avatar e Nome da Empresa */}
          <div className="flex items-center gap-4 pb-6 border-b border-light-grey">
            <Avatar name={client.companyName} className="w-20 h-20 text-2xl" />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-text-primary">{client.companyName}</h2>
              <div className="flex items-center gap-2 text-text-secondary">
                <FileText width={16} height={16} />
                <span className="text-sm font-mono">{client.cnpj}</span>
              </div>
            </div>
          </div>

          {/* Grid de Informações de Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2">
                <Mail width={16} height={16} className="text-indigo-primary" />
                Email
              </Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <a
                  href={`mailto:${client.email}`}
                  className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  {client.email}
                </a>
              </div>
            </div>

            {/* Telefone */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2">
                <Phone width={16} height={16} className="text-indigo-primary" />
                Telefone
              </Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <a
                  href={`tel:${client.phone}`}
                  className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  {client.phone}
                </a>
              </div>
            </div>

            {/* Contato Principal */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2">
                <User width={16} height={16} className="text-indigo-primary" />
                Contato Principal
              </Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <p className="text-sm text-text-primary">{client.primaryContact}</p>
              </div>
            </div>

            {/* ID do Cliente */}
            <div className="flex flex-col gap-2">
              <Label>ID do Cliente</Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <p className="text-sm font-mono text-text-secondary">{client.id}</p>
              </div>
            </div>
          </div>

          {/* Endereço (Largura completa) */}
          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2">
              <MapPin width={16} height={16} className="text-indigo-primary" />
              Endereço
            </Label>
            <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
              <p className="text-sm text-text-primary">{client.address}</p>
            </div>
          </div>

          {/* Links e URLs */}
          {client.agentUrl && (
            <div className="flex flex-col gap-2">
              <Label>URL do Agente</Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <a
                  href={client.agentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-2"
                >
                  {client.agentUrl}
                  <ExternalLink width={14} height={14} />
                </a>
              </div>
            </div>
          )}

          {/* Informações de Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-light-grey">
            {/* Data de Criação */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2">
                <Calendar width={16} height={16} className="text-indigo-primary" />
                Cadastrado em
              </Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <p className="text-sm text-text-primary">
                  {new Date(client.created_at).toLocaleDateString('pt-BR', {
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
                  {new Date(client.updated_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2">
              <Label>Status do Cliente</Label>
              <div className="px-4 py-3 bg-background rounded-lg border border-light-grey">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${client.deleted_at ? 'bg-red-500' : 'bg-green-500'}`} />
                  <p className="text-sm text-text-primary">
                    {client.deleted_at ? 'Inativo' : 'Ativo'}
                  </p>
                </div>
              </div>
            </div>
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
