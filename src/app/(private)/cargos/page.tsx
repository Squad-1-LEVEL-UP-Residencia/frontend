"use client";

import { useMemo, useState } from "react";
import { TitleSection } from "@/components/private/ui/title-section";
import { Button } from "@/components/private/ui/button";
import { Container } from "@/components/private/ui/container";
import { Modal, ModalTrigger } from "@/components/private/ui/modal";
import { Table } from "@/components/private/ui/table";
import { Plus, Trash2Icon } from "lucide-react";

type Cargo = { id: string; nome: string };
const gid = () => String(Date.now() + Math.random());
const SEED: Cargo[] = [
  { id: gid(), nome: "Gerente de Marketing" },
  { id: gid(), nome: "Analista de Marketing" },
  { id: gid(), nome: "Social Media" },
  { id: gid(), nome: "Designer Gráfico" },
  { id: gid(), nome: "Copywriter" },
];

export default function CargosPage() {
  const [list, setList] = useState<Cargo[]>(SEED);
  const [busca, setBusca] = useState("");
  const [novo, setNovo] = useState("");

  const view = useMemo(
    () =>
      busca
        ? list.filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()))
        : list,
    [list, busca]
  );

  function addCargo(e: React.FormEvent) {
    e.preventDefault();
    const nome = novo.trim();
    if (!nome) return;
    setList((ls) => [{ id: gid(), nome }, ...ls]);
    setNovo("");
  }

  function editar(c: Cargo) {
    const nome = prompt("Editar cargo:", c.nome)?.trim();
    if (nome)
      setList((ls) => ls.map((x) => (x.id === c.id ? { ...x, nome } : x)));
  }

  function excluir(c: Cargo) {
    if (confirm(`Excluir "${c.nome}"?`))
      setList((ls) => ls.filter((x) => x.id !== c.id));
  }

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex items-center justify-between">
        <TitleSection title="Cargos" paragraph="Gerencie os Cargos" />
        <ModalTrigger>
          <Button variant="secondary" color="indigo" className="gap-2 px-4">
            <Plus /> Adicionar Cargo
          </Button>
        </ModalTrigger>
      </div>

      <input
        placeholder="Pesquisar cargos..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full rounded-xl border border-mid-grey/40 bg-white-primary px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:ring-2 focus:ring-blue-primary/30"
      />

      <Container variant="page">
        <Table
          head={["Cargo", "Ações"]}
          body={view.map((c) => (
            <Table.Row key={c.id} variant="row">
              <Table.Data>{c.nome}</Table.Data>
              <Table.Data className="flex justify-start items-center space-x-2">
                <Button variant="primary" onClick={() => editar(c)}>
                  Editar
                </Button>
                <Button
                  variant="secondary"
                  aria-label={`Excluir ${c.nome}`}
                  onClick={() => excluir(c)}
                >
                  <Trash2Icon width={16} height={16} />
                </Button>
              </Table.Data>
            </Table.Row>
          ))}
        />
      </Container>

      <Modal hasCancelButton={false}>
        <form onSubmit={addCargo} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Adicionar Cargo</h3>

            <ModalTrigger>
              <button
                type="button"
                aria-label="Fechar"
                className="rounded-full p-2 text-text-secondary hover:bg-light-grey/10"
              ></button>
            </ModalTrigger>
          </div>

          <input
            autoFocus
            value={novo}
            onChange={(e) => setNovo(e.target.value)}
            placeholder="Nome do cargo"
            required
            className="w-full rounded-lg border border-mid-grey/40 bg-white-primary px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-primary/30"
          />

          <div className="flex justify-end">
            <Button
              variant="primary"
              color="indigo"
              className="px-4"
              type="submit"
            >
              Adicionar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
