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
  - `Title`, `Paragraph`, `TitleSection`, `Input`, `Label`, entre outros.
  - Esses componentes garantem consistência visual e facilitam o desenvolvimento de novas telas.
- Para seções de título e descrição, utilize o componente `TitleSection`:
  ```tsx
  <TitleSection title="Título" paragraph="Descrição da seção" />
  ```
- Para navegação, utilize o padrão de rotas do Next.js (`src/app/(private)/[rota]/page.tsx`).

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
