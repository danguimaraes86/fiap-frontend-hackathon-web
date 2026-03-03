# FIAP Hackathon - Gerenciamento de Tarefas Web

<div align="center">

_Aplicação Web desenvolvida com Angular para gerenciamento de tarefas pessoais_

</div>

### 🎓 FIAP Grupo 39

| Nome                 | GitHub                                               |
| -------------------- | ---------------------------------------------------- |
| **Daniel Guimarães** | [@danguimaraes86](https://github.com/danguimaraes86) |

## 📖 Descrição

Aplicação Web multiplataforma desenvolvida com **Angular** para gerenciamento de tarefas pessoais. O sistema oferece uma experiência responsiva para Web e smartphones, com integração completa ao Firebase para autenticação e banco de dados em tempo real.

### 🏗️ Arquitetura

- **Angular 21.1.1** utilizando arquitetura de **Single Page Application (SPA)** e **Standalone Components**, reduzindo acoplamento e simplificando a manutenção
- Organização baseada em **componentes reutilizáveis** e **camada de services**, promovendo separação clara de responsabilidades
- Gerenciamento de estado realizado por meio de **Services + Signals**, com comunicação reativa entre componentes
- **Firebase** como Backend-as-a-Service:
  - **Authentication** com login e senha, utilizando **token** para controle de sessão
  - **Firestore** como banco de dados NoSQL com escuta em tempo real
- Implementação de **Guards de rota** para proteção de áreas autenticadas
- Interface construída com **Angular Material** seguindo as guidelines do Google, em conjunto com **Bootstrap**, garantindo responsividade e consistência visual

## ✨ Funcionalidades

### ✅ Gerenciamento de Tarefas

- Criação, edição e exclusão de tarefas
- Controle de status: **Pendente**, **Em andamento** e **Concluída**
- Definição de prazo (data de vencimento) por tarefa
- Atualização em tempo real via Firestore

### 📊 Dashboard

- Visão geral das tarefas com cards de resumo
- Modo foco para visualização simplificada
- Detalhes completos de tarefas diretamente no dashboard

### 🔍 Filtros e Visualização

- Painel de filtros para exibir tarefas por status
- Opção de exibir ou ocultar tarefas concluídas e pendentes
- Paginação e listagem completa na view de tarefas

### 🎨 Preferências do Usuário

- Tema **claro** e **escuro**
- Ativação/desativação do **modo foco**
- Controle de visibilidade por status de tarefa
- Preferências persistidas no Firestore por usuário

### 🔐 Segurança e Autenticação

- Firebase Authentication com email e senha
- Cadastro de novos usuários
- Sessões persistentes e seguras
- Logout protegido
- Redirecionamento automático com Guards de rota

## 🛠️ Tecnologias Utilizadas

### 📱 Framework e Linguagem

| Tecnologia | Versão | Descrição                                      |
| ---------- | ------ | ---------------------------------------------- |
| Angular    | 21.1.1 | Framework front-end para SPA                   |
| TypeScript | ~5.9.2 | Linguagem principal da aplicação               |
| RxJS       | ~7.8.0 | Programação reativa e gerenciamento de streams |

---

### 🎨 UI / UX

| Tecnologia       | Versão | Descrição                                    |
| ---------------- | ------ | -------------------------------------------- |
| Angular Material | 21.1.1 | Biblioteca de componentes UI                 |
| Angular CDK      | 21.1.1 | Utilitários e padrões de acessibilidade      |
| Bootstrap        | 5.3.8  | Layout responsivo e estilização complementar |
| Luxon            | 3.7.2  | Manipulação e formatação de datas            |

---

### 🔥 Backend / Integrações

| Tecnologia | Versão | Descrição                         |
| ---------- | ------ | --------------------------------- |
| Firebase   | 12.8.0 | Authentication e Firestore (BaaS) |

---

### 🧪 Desenvolvimento e Qualidade

| Tecnologia  | Versão  | Descrição                             |
| ----------- | ------- | ------------------------------------- |
| Angular CLI | 21.1.1  | Ferramenta de build e desenvolvimento |
| Vitest      | ^4.0.8  | Testes unitários                      |
| Prettier    | —       | Padronização e formatação de código   |
| ESLint      | ^9.39.1 | Análise estática de código            |

## 📥 Como Clonar o Repositório

```bash
# Clone o repositório
git clone https://github.com/danguimaraes86/fiap-frontend-hackathon-web.git

# Entre no diretório do projeto
cd fiap-frontend-hackathon-web
```

## 🚀 Como Rodar o Projeto

### 📋 Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter instalado:

- **Node.js** (versão LTS recomendada)
- **NPM** ou **PNPM** (recomendado)
- **Angular CLI 21.1.1** ou superior
- **Editor de código**: VS Code (recomendado)

---

### 🔥 Configuração do Firebase

1. **Crie um projeto no Firebase**

   Acesse o [Firebase Console](https://console.firebase.google.com) e crie um novo projeto.

2. **Configure os serviços necessários**
   - **Authentication**: habilite o provedor **Email/Password**
   - **Firestore Database**: crie um banco de dados

3. **Crie um app Web no Firebase**
   - No painel do Firebase, adicione um **Web App**
   - Copie as credenciais de configuração (`apiKey`, `authDomain`, etc.)

4. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto com as variáveis do Firebase:

   ```env
   FIREBASE_API_KEY=xxxx
   FIREBASE_AUTH_DOMAIN=xxxx
   FIREBASE_PROJECT_ID=xxxx
   FIREBASE_STORAGE_BUCKET=xxxx
   FIREBASE_MESSAGING_SENDER_ID=xxxx
   FIREBASE_APP_ID=xxxx
   STAGING=xxx
   ```

### 🔧 Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

```bash
# 1. Instale as dependências
npm install

# 2. Gere os arquivos de ambiente (caso utilize .env)
npm run generate-env

# 3. Execute a aplicação
npm start
```

A aplicação estará disponível em `http://localhost:3000/`.

## 📦 Scripts Disponíveis

| Comando                | Descrição                                              |
| ---------------------- | ------------------------------------------------------ |
| `npm start`            | Gera o ambiente e inicia o servidor de desenvolvimento |
| `npm run build`        | Gera o build de produção                               |
| `npm run watch`        | Build em modo watch                                    |
| `npm test`             | Executa os testes unitários com Vitest                 |
| `npm run lint`         | Executa a análise estática com ESLint                  |
| `npm run generate-env` | Gera os arquivos de ambiente a partir do `.env`        |

## 📁 Estrutura do Projeto

```text
src/
├── app/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── dashboard-card-full-details/
│   │   ├── dashboard-focus-mode/
│   │   ├── filter-panel/
│   │   ├── floating-button/
│   │   ├── forms/
│   │   │   ├── login-form/
│   │   │   ├── signup-form/
│   │   │   ├── task-form/
│   │   │   └── user-preferences-form/
│   │   ├── nav-bar/
│   │   ├── snack-bar/
│   │   ├── task-detail/
│   │   └── task-full-details/
│   ├── configs/               # Configurações da aplicação (Firebase)
│   ├── guards/                # Route guards de autenticação
│   ├── models/                # Interfaces e modelos de dados
│   ├── pages/                 # Páginas (views)
│   │   ├── dashboard-view/
│   │   ├── home-view/
│   │   ├── not-found/
│   │   └── tasks-view/
│   ├── services/              # Camada de serviços e integrações
│   │   └── repositories/      # Repositórios de acesso ao Firestore
│   └── utils/                 # Funções utilitárias
├── assets/
│   ├── images/                # Imagens estáticas
│   └── logos/                 # Logotipos
├── environments/              # Configurações de ambiente
└── themes/                    # Temas e estilos globais
```

## 🔗 Links Úteis

- [Angular](https://angular.dev/) - Framework front-end
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
- [Angular Material](https://material.angular.io/) - Biblioteca de componentes UI
- [Bootstrap](https://getbootstrap.com/) - Framework de layout responsivo
- [Firebase](https://firebase.google.com/docs) - Backend-as-a-Service
- [Luxon](https://moment.github.io/luxon/) - Biblioteca de manipulação de datas
- [Vitest](https://vitest.dev/) - Framework de testes unitários
- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript

---

## 📄 Licença

Este projeto está licenciado sob a **[Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**

### Você Pode

- **Compartilhar** — copiar e redistribuir o material
- **Adaptar** — remixar, transformar e criar a partir do material

### Condições

- **Uso não comercial** — o material não pode ser utilizado para fins comerciais
- **Atribuição** — você deve fornecer crédito apropriado e indicar se mudanças foram feitas

---

<div align="center">

### 🎓 Desenvolvido com ❤️ pelo FIAP Grupo 39

**Se este projeto foi útil, considere dar uma ⭐ no repositório!**

</div>
