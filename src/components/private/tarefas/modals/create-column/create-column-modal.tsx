"use client"

import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { CreateColumnForm } from "./create-column-form"

export function CreateColumnModal() {
  return (
    <Modal id="create_column_modal" variant="sm" hasCloseButton>
      <Title variant="sm">Criar nova lista</Title>
      <CreateColumnForm />
    </Modal>
  )
}
