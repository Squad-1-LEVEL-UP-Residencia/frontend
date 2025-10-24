"use client";

import { Modal } from "@/components/private/ui/modal";
import { Title } from "@/components/private/ui/title";
import { EditUserForm } from "./edit-user-form";
import { useEffect, useState } from "react";
import { User } from "@/types/users/user";

export function EditUserModal() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<User>).detail;
      setUser(detail ?? null);
    };
    window.addEventListener("user:edit-open", handler as EventListener);
    return () =>
      window.removeEventListener("user:edit-open", handler as EventListener);
  }, []);

  return (
    <Modal id="edit_user_modal" className="flex flex-col gap-16" hasCloseButton>
      <Title variant="sm">Editar usuário</Title>
      <EditUserForm user={user} />
    </Modal>
  );
}
