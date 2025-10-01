# Documentação de Padrões e Utilização do Projeto Flap Frontend

## Layouts Padrões

- Os layouts principais estão localizados em `src/components/private/base-layout.tsx` e `src/app/(private)/layout.tsx`.
- Para acessar um layout padrão, basta importar o componente desejado e envolver o conteúdo da página com ele:
  ```tsx
  import { BaseLayout } from "@/components/private/base-layout"
  // ...existing code...
  ;<BaseLayout>{children}</BaseLayout>
  ```
- O layout já inclui Sidebar, Header (Navbar) e área principal para renderização dos conteúdos.

## Design Patterns da Aplicação

- O projeto utiliza o padrão **Layout Composto**: Sidebar + Header + Main.
- Componentes são organizados por contexto (`private`, `public`, `ui`), facilitando reutilização e manutenção.
- A pasta `ui` dentro de `src/components/private/ui` contém componentes prontos e padronizados para uso em toda a aplicação, como:
  - `Button`
  - `Container`
  - `Input`
  - `PageContainer`
  - `Paragraph`
  - `TitleSection`
  - `Title`
  - `Table`
  - `page-search-bar/SearchBar`
  - Esses componentes garantem consistência visual e facilitam o desenvolvimento de novas telas.
- Para seções de título e descrição, utilize o componente `TitleSection`:
  ```tsx
  <TitleSection title="Título" paragraph="Descrição da seção" />
  ```
- Para navegação, utilize o padrão de rotas do Next.js (`src/app/(private)/[rota]/page.tsx`).

---

## Componentes UI

### Button

Componente de botão reutilizável, com suporte a diferentes estilos, cores e tamanhos.

**Importação:**

```tsx
import { Button } from "@/components/private/ui/button"
```

**Props principais:**

- `outline` (boolean) – Define se o botão terá borda.
- `color` ("white" | "indigo" | "transparent") – Cor de fundo e texto.
- `size` ("slim" | "fat") – Tamanho do padding.
- Aceita todas as props padrão de `<button>`.

**Exemplos:**

```tsx
<Button outline={true} color="indigo" size="fat">Primário</Button>
<Button outline={false} color="white">Secundário</Button>
<Button outline={true} color="transparent" size="slim">Terciário</Button>
```

---

### Input

Campo de input padronizado.

**Importação:**

```tsx
import { Input } from "@/components/private/ui/input"
```

**Props principais:**

- `variant` ("placeholder" | "no-placeholder") – Define o estilo de fundo do input.
- Aceita todas as props padrão de `<input>`.

**Exemplo:**

```tsx
<Input variant="placeholder" placeholder="Digite seu nome" />
<Input variant="no-placeholder" />
```

---

### Modal

Componente de modal customizável.

**Importação:**

```tsx
import { Modal, ModalTrigger } from "@/components/private/ui/modal"
```

**Props principais do Modal:**

- `id` (string) – Identificador único do modal.
- `variant` ("lg" | "sm") – Define a largura do modal.
- `hasCancelButton` (boolean) – Exibe botões de ação (Cancelar/Cadastrar) ou apenas o botão de fechar.
- Aceita todas as props padrão de `<dialog>`.

**Como abrir o modal:**
Use o `ModalTrigger` para envolver qualquer elemento que deve abrir o modal ao ser clicado:

```tsx
<ModalTrigger id="meu-modal">
  <Button outline={true}>Abrir Modal</Button>
</ModalTrigger>
<Modal id="meu-modal" variant="lg" hasCancelButton={true}>
  Conteúdo do modal aqui
</Modal>
```

**Observações:**

- O botão "Cancelar" fecha o modal.
- O botão "Cadastrar" executa uma ação customizável via `onClick`.
- Para abrir o modal, o id do ModalTrigger e do Modal devem ser os mesmos.

---

### Table

Componente de tabela padronizada para exibição de dados.

**Importação:**

```tsx
import { Table } from "@/components/private/ui/table"
```

**Props principais do Table:**

- `head` (string[]) – Array com os títulos das colunas.
- `body` (React.ReactNode) – Linhas da tabela (normalmente um map de `Table.Row`).
- `isLoading` (boolean, opcional) – Exibe estilo de loading na tabela.

**Componentes auxiliares:**

- `Table.Row` – Linha da tabela. Prop obrigatória: `variant` ("head" | "row").
- `Table.Data` – Célula de dados.

**Exemplo de uso:**

```tsx
<Table
	head={["Nome", "Setor", "Cargo", "Ações"]}
	body={
		<>
			<Table.Row variant="row">
				<Table.Data>Danillo</Table.Data>
				<Table.Data>TI</Table.Data>
				<Table.Data>Dev</Table.Data>
				<Table.Data>
					<Button outline={true} size="slim">
						Editar
					</Button>
				</Table.Data>
			</Table.Row>
			{/* Outras linhas */}
		</>
	}
/>
```

**Observações:**

- O componente Table já aplica estilos de borda, espaçamento e cores.
- Use `isLoading={true}` para indicar carregamento de dados.

---

## Colors

- As cores principais estão definidas como variáveis CSS em `globals.css` e podem ser usadas via `var(--color-nome)`.
- Exemplos de cores:
  - `--color-background`
  - `--gradient-blue-primary`
  - `--gradient-blue-secondary`
  - `--text-primary`
- Para visualizar todas as cores disponíveis, acesse a rota `/colors` na aplicação:
  ```
  http://localhost:3000/colors
  ```
  Essa página exibe uma paleta com todas as cores e seus nomes para referência.

## Como Logar (Sem Integração com API)

- Enquanto a integração com a API não está pronta, utilize a rota `/sign-in` para acessar a tela de login.
- O login é apenas visual, não realiza autenticação real.
- Para simular acesso privado, basta acessar qualquer rota dentro de `/private` após o login visual.
- Exemplo:
  ```
  http://localhost:3000/private/dashboard
  ```
- Quando a integração estiver pronta, o fluxo será atualizado para autenticação real.
