# Flap — Frontend

## Descrição breve

Este repositório contém o frontend do sistema Flap: uma aplicação web em Next.js/React para gerenciamento de tarefas no formato Kanban. O sistema oferece funcionalidades para administração (usuários, cargos, clientes), criação e organização de listas e cards (jobs/tarefas), colaboração (comentários, membros, anexos) e visualização de dados (dashboard).

## Funcionalidades

- Autenticação de usuários (login/controle de sessão)
- Gestão de usuários (criar, editar, remover)
- Gestão de cargos e permissões
- Gestão de clientes
- Criação, edição e remoção de listas Kanban
- Criação, edição, remoção e movimentação de cards/tarefas entre listas
- Comentários em tarefas
- Anexos em tarefas
- Checklists dentro das tarefas (itens, marcar/desmarcar)
- Atribuição/remoção de membros nas tarefas
- Links e metadados em tarefas
- Dashboard com gráficos
- Paginação e busca de usuários/entidades

## Tecnologias

- Next.js (App Router)
- React (v19)
- TypeScript
- Tailwind CSS + DaisyUI (estilização)
- PostCSS
- @tanstack/react-query (fetching/caching)
- react-hook-form + @hookform/resolvers (forms)
- Zod (validação de dados)
- Recharts (gráficos)
- react-hot-toast (notificações)
- js-cookie, jwt-decode (sessão/auth)
- lucide-react (ícones)
- ESLint / TypeScript tooling
- Node.js / npm

As dependências específicas constam em `package.json`.

## Como rodar (desenvolvimento)

1. Instale as dependências:

```
npm install
```

2. Rode em modo desenvolvimento:

```
npm run dev
```

3. Build para produção:

```
npm run build
npm start
```

Observação: verifique as variáveis de ambiente necessárias (por exemplo, endpoint da API, chaves) e configure um arquivo `.env` conforme o ambiente.
