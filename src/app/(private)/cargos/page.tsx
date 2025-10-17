"use client";

import { Suspense } from "react";
import { Button } from "@/components/private/ui/button";
import { ModalTrigger } from "@/components/private/ui/modal";
import { PageContainer } from "@/components/private/ui/page-container";
import { PageHeader } from "@/components/private/ui/page-header";
import { TitleSection } from "@/components/private/ui/title-section";
import { Plus } from "lucide-react";

import { RolesList } from "@/components/private/cargos/roles-list";
import { CreateRoleModal } from "@/components/private/cargos/create/create-role-modal";
import { EditRoleModal } from "@/components/private/cargos/edit/edit-role-modal";
import { DeleteRoleModal } from "@/components/private/cargos/delete/delete-role-modal";

export default function CargosPage() {
  return (
    <PageContainer>
      <PageHeader>
        <TitleSection title="Cargos" paragraph="Gerencie os Cargos" />

        <ModalTrigger id="add_role_modal">
          <Button outline={false} color="indigo" className="gap-2 px-4">
            <Plus /> Adicionar Cargo
          </Button>
        </ModalTrigger>
      </PageHeader>

      <Suspense fallback={<div>Carregando...</div>}>
        <RolesList />
      </Suspense>

      <CreateRoleModal />
      <EditRoleModal />
      <DeleteRoleModal />
    </PageContainer>
  );
}
