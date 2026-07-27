# Vesta

Vesta é uma aplicação de foco inspirada na técnica Pomodoro. O projeto está
sendo desenvolvido com React e TypeScript e combina um temporizador, ciclos de
foco e descanso, uma tarefa ativa e uma identidade visual baseada em uma chama.

## Estado atual

O projeto está em desenvolvimento. Atualmente, a interface e a base de estado
do Pomodoro já estão implementadas.

### Implementado

- Interface principal do temporizador;
- layout responsivo para diferentes larguras e alturas de tela;
- temas claro e escuro;
- persistência do tema escolhido no `localStorage`;
- campo para informar o foco da sessão;
- validação do nome da tarefa antes de iniciar;
- criação da tarefa ativa no contexto da aplicação;
- configuração inicial dos períodos:
  - foco: 25 minutos;
  - pausa curta: 5 minutos;
  - pausa longa: 15 minutos;
- cálculo do próximo ciclo e do tipo de sessão;
- representação visual do progresso do ciclo;
- componentes reutilizáveis para campos, botões e controles;
- ícones fornecidos pelo Lucide React.

### Em desenvolvimento

- contagem regressiva em tempo real;
- ações de pausar, continuar e interromper uma sessão;
- atualização dinâmica dos indicadores de ciclo;
- funcionamento dos modos Stopwatch e Timer;
- histórico de sessões;
- tela de configurações;
- persistência das tarefas e sessões;
- páginas informativas adicionais.

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- CSS Modules
- Context API
- [Lucide React](https://lucide.dev/)
- ESLint
- React Compiler

## Como executar

É necessário ter o Node.js e o npm instalados.

```powershell
git clone <URL_DO_REPOSITORIO>
cd Pyre/vesta-pomodoro
npm install
npm run dev
```

Depois, abra o endereço informado pelo Vite no terminal. Por padrão, ele
costuma utilizar `http://localhost:5173`.

No PowerShell, caso a política de execução do Windows bloqueie o arquivo
`npm.ps1`, utilize:

```powershell
npm.cmd install
npm.cmd run dev
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Valida o TypeScript e gera a versão de produção |
| `npm run lint` | Executa a análise estática com ESLint |
| `npm run preview` | Abre localmente a versão gerada pelo build |

## Estrutura principal

```text
src/
├── assets/              # Imagens e recursos visuais
├── components/          # Componentes reutilizáveis da interface
├── context/             # Estado global das tarefas e do temporizador
├── Models/              # Tipos das tarefas e do estado
├── pages/               # Páginas da aplicação
├── templates/           # Estrutura compartilhada da interface
├── theme/               # Temas claro e escuro
├── utils/               # Regras dos ciclos Pomodoro
├── App.css               # Layout principal e responsividade
├── App.tsx               # Componente raiz
└── main.tsx              # Inicialização da aplicação
```

## Responsividade

A interface adapta seus elementos tanto à largura quanto à altura disponível.
Em telas menores, a chama, os espaçamentos, os menus e o conteúdo do
temporizador são reduzidos para evitar overflow e barras de rolagem
desnecessárias.

## Funcionamento planejado dos ciclos

O estado da aplicação trabalha com uma sequência de oito etapas:

1. foco;
2. pausa curta;
3. foco;
4. pausa longa;
5. foco;
6. pausa curta;
7. foco;
8. pausa longa.

Ao final da sequência, o ciclo recomeça.
