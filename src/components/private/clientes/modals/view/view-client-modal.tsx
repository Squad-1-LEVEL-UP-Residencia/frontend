"use client"

import { useEffect, useState } from "react"
import type { Client } from "@/types/clients/client"
import { Modal } from "@/components/private/ui/modal"
import { format } from "@/lib/format-date"

export default function ViewClientModal() {
  const [client, setClient] = useState<Client | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Client>).detail
      setClient(detail ?? null)
      setTimeout(() => Modal.handleOpen("view_client_modal"), 0)
    }

    window.addEventListener("client:view-open", handler as EventListener)

    return () => {
      window.removeEventListener("client:view-open", handler as EventListener)
    }
  }, [])

  if (!client) return null

  return (
    <Modal id="view_client_modal" variant="lg" hasCloseButton>
      <div className="space-y-6">
        <div className="pb-4 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900">{client.companyName}</h2>
          <p className="text-sm text-gray-600 mt-1">{client.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">ID</label>
            <p className="text-gray-900 mt-1">{client.id}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Nome da Empresa</label>
            <p className="text-gray-900 mt-1">{client.companyName}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">CNPJ</label>
            <p className="text-gray-900 mt-1">{client.cnpj}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">E-mail</label>
            <p className="text-gray-900 mt-1">{client.email}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Contato Principal</label>
            <p className="text-gray-900 mt-1">{client.primaryContact}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Telefone</label>
            <p className="text-gray-900 mt-1">{client.phone}</p>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Endereço</label>
            <p className="text-gray-900 mt-1">{client.address}</p>
          </div>

          {client.agentUrl && (
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">URL do Agente</label>
              <p className="text-gray-900 mt-1">
                <a
                  href={client.agentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  {client.agentUrl}
                </a>
              </p>
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-gray-700">Criado em</label>
            <p className="text-gray-900 mt-1">{format(new Date(client.created_at))}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Atualizado em</label>
            <p className="text-gray-900 mt-1">{format(new Date(client.updated_at))}</p>
          </div>
        </div>

        {client.avatarUrl && (
          <div className="pt-4 border-t border-gray-300">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Logo da Empresa</label>
            <div className="bg-gray-50 rounded-lg p-4 flex justify-center">
              <img
                src={client.avatarUrl}
                alt={`Logo de ${client.companyName}`}
                className="max-h-32 object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
