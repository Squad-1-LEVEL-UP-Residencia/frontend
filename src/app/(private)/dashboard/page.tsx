"use client";

import { Container } from "@/components/private/ui/container";
import { PageContainer } from "@/components/private/ui/page-container";
import { TitleSection } from "@/components/private/ui/title-section";
import { Label } from "@/components/private/ui/label";
import { Select } from "@/components/private/ui/select";
import { TasksByUserChart } from "@/components/private/dashboard/tasks-by-user-chart";
import { TasksByListChart } from "@/components/private/dashboard/tasks-by-list-chart";
import { getTasksByUser } from "@/actions/dashboard/get-tasks-by-user";
import { getTasksByList } from "@/actions/dashboard/get-tasks-by-list";
import { getUsers } from "@/actions/users/get-users";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const USE_MOCK_DATA = false;

export default function Dashboard() {
  const [tasksByUser, setTasksByUser] = useState<any[]>([]);
  const [tasksByList, setTasksByList] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      loadTasksByList(parseInt(selectedUserId));
    } else {
      loadTasksByList();
    }
  }, [selectedUserId]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      if (USE_MOCK_DATA) {
        // Dados mockados para teste
        const mockTasksByUser = [
          { userId: 1, userName: "João Silva", taskCount: 15 },
          { userId: 2, userName: "Maria Santos", taskCount: 12 },
          { userId: 3, userName: "Pedro Costa", taskCount: 10 },
          { userId: 4, userName: "Ana Oliveira", taskCount: 8 },
          { userId: 5, userName: "Carlos Souza", taskCount: 7 },
          { userId: 6, userName: "Julia Lima", taskCount: 6 },
          { userId: 7, userName: "Paulo Mendes", taskCount: 5 },
          { userId: 8, userName: "Fernanda Reis", taskCount: 4 },
          { userId: 9, userName: "Ricardo Alves", taskCount: 3 },
          { userId: 10, userName: "Camila Rocha", taskCount: 2 },
        ];

        const mockTasksByList = [
          { listId: 1, listName: "A Fazer", taskCount: 8 },
          { listId: 2, listName: "Em Progresso", taskCount: 5 },
          { listId: 3, listName: "Concluído", taskCount: 12 },
        ];

        const mockUsers = [
          { id: 1, name: "João Silva", email: "joao@example.com" },
          { id: 2, name: "Maria Santos", email: "maria@example.com" },
          { id: 3, name: "Pedro Costa", email: "pedro@example.com" },
          { id: 4, name: "Ana Oliveira", email: "ana@example.com" },
          { id: 5, name: "Carlos Souza", email: "carlos@example.com" },
        ];

        setTasksByUser(mockTasksByUser);
        setTasksByList(mockTasksByList);
        setUsers(mockUsers);
      } else {
        const [tasksByUserData, tasksByListData, usersData] = await Promise.all(
          [getTasksByUser(), getTasksByList(), getUsers(1)]
        );

        setTasksByUser(tasksByUserData);
        setTasksByList(tasksByListData);
        setUsers(usersData.data || []);
      }
    } catch (error) {
      console.error("Erro ao carregar dados da dashboard:", error);
      toast.error("Erro ao carregar dados da dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTasksByList = async (userId?: number) => {
    try {
      if (USE_MOCK_DATA) {
        // Dados mockados para um usuário específico
        const mockDataByUser: { [key: number]: any[] } = {
          1: [
            { listId: 1, listName: "A Fazer", taskCount: 5 },
            { listId: 2, listName: "Em Progresso", taskCount: 7 },
            { listId: 3, listName: "Concluído", taskCount: 3 },
          ],
          2: [
            { listId: 1, listName: "A Fazer", taskCount: 4 },
            { listId: 2, listName: "Em Progresso", taskCount: 3 },
            { listId: 3, listName: "Concluído", taskCount: 5 },
          ],
        };
        setTasksByList(userId ? mockDataByUser[userId] || [] : []);
      } else {
        const data = await getTasksByList(userId);
        setTasksByList(data);
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas por lista:", error);
      toast.error("Erro ao carregar tarefas por lista");
    }
  };

  return (
    <PageContainer>
      <TitleSection
        title="Dashboard"
        paragraph="Visão geral das suas tarefas e atividades"
      />

      {isLoading ? (
        <Container>
          <div className="flex items-center justify-center py-12">
            <span className="text-text-secondary">Carregando dados...</span>
          </div>
        </Container>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Filtro de Usuário - No Topo */}
          <Container>
            <div className="flex flex-col gap-2">
              <Label htmlFor="user-filter">Filtrar por Usuário</Label>
              <Select
                id="user-filter"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="max-w-md"
              >
                <option value="">Selecione um usuário</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
              {selectedUserId && (
                <p className="text-sm text-indigo-600 font-medium">
                  Visualizando tarefas de:{" "}
                  {users.find((u) => u.id === parseInt(selectedUserId))?.name}
                </p>
              )}
            </div>
          </Container>

          {/* Gráfico Geral - Tarefas por Usuário */}
          <Container>
            <div className="flex flex-col gap-4">
              <div className="border-b border-light-grey pb-3">
                <h2 className="text-xl font-bold text-text-primary">
                  📊 Tarefas por Usuário
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  Top 10 usuários com mais tarefas
                </p>
              </div>
              {tasksByUser.length > 0 ? (
                <TasksByUserChart data={tasksByUser} />
              ) : (
                <div className="flex items-center justify-center py-12 text-text-secondary">
                  Nenhum dado disponível
                </div>
              )}
            </div>
          </Container>

          {/* Gráfico Individual - Tarefas do Usuário por Lista (Só aparece quando seleciona) */}
          {selectedUserId && (
            <Container>
              <div className="flex flex-col gap-4">
                <div className="border-l-4 border-indigo-600 pl-4 py-2">
                  <h2 className="text-xl font-bold text-text-primary">
                    📈 Tarefas de{" "}
                    {users.find((u) => u.id === parseInt(selectedUserId))?.name}{" "}
                    por Lista
                  </h2>
                  <p className="text-sm text-text-secondary mt-1">
                    Distribuição das tarefas deste usuário em cada lista
                  </p>
                </div>
                {tasksByList.length > 0 ? (
                  <TasksByListChart data={tasksByList} />
                ) : (
                  <div className="flex items-center justify-center py-12 text-text-secondary">
                    Este usuário não possui tarefas
                  </div>
                )}
              </div>
            </Container>
          )}

          {/* Mensagem quando nenhum usuário está selecionado */}
          {!selectedUserId && (
            <Container>
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="text-5xl">📊</div>
                <p className="text-text-secondary text-center">
                  Selecione um usuário acima para ver a distribuição de tarefas
                  por lista
                </p>
              </div>
            </Container>
          )}
        </div>
      )}
    </PageContainer>
  );
}
