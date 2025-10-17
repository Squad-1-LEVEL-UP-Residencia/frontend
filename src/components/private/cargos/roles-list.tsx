"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "@/components/private/ui/table";
import { Button } from "@/components/private/ui/button";
import { ModalTrigger } from "@/components/private/ui/modal";
import { Trash2Icon } from "lucide-react";
import { getRoles } from "@/data/roles/get-roles";
import type { Role } from "@/data/roles/role";

export function RolesList() {
  const [q, setQ] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: 5_000,
  });

  const roles: Role[] = data ?? [];

  const view = useMemo(() => {
    if (!q) return roles;
    return roles.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));
  }, [roles, q]);

  if (isLoading) {
    return (
      <div className="px-6 py-10 text-sm text-text-secondary">
        Carregando...
      </div>
    );
  }

  return (
    <>
      <input
        placeholder="Pesquisar cargos..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mb-4 w-full rounded-xl border border-mid-grey/40 bg-white-primary px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:ring-2 focus:ring-blue-primary/30"
      />

      <Table
        head={["Cargo", "Ações"]}
        body={view.map((r) => (
          <Table.Row key={r.id} variant="row">
            <Table.Data className="w-full">{r.name}</Table.Data>
            <Table.Data className="text-right pr-2 sm:pr-6">
              <span className="inline-flex items-center gap-2">
                <ModalTrigger id="edit_role_modal">
                  <Button outline>Editar</Button>
                </ModalTrigger>

                <ModalTrigger id="delete_role_modal">
                  <Button
                    outline
                    color="transparent"
                    className="hover:text-red-500"
                    aria-label={`Excluir ${r.name}`}
                  >
                    <Trash2Icon width={16} height={16} />
                  </Button>
                </ModalTrigger>
              </span>
            </Table.Data>
          </Table.Row>
        ))}
      />
    </>
  );
}
