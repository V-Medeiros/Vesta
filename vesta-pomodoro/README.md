# Vesta

Vesta é uma aplicação de foco gamificada construída com React e TypeScript.
Cada sessão concluída alimenta uma chama, mantém o streak diário e adiciona uma
brasa ao histórico visual dos últimos 14 dias.

O MVP funciona inteiramente no navegador, sem conta e sem backend.

## Funcionalidades

### Sessões de foco

- Presets de 15, 25, 45 e 60 minutos;
- duração personalizada entre 5 e 120 minutos;
- controles para iniciar, pausar, continuar e abandonar;
- confirmação antes do abandono;
- contagem baseada em timestamp, resistente à troca de abas;
- restauração da sessão ativa ao recarregar a página;
- mensagem temática e som opcional ao concluir.

### Tarefas

- Criação e seleção de tarefas;
- sessões livres, sem tarefa vinculada;
- contagem de sessões concluídas por tarefa;
- sugestão de conclusão após uma sessão vinculada;
- tarefas concluídas mantidas com menor destaque;
- exclusão com confirmação e preservação do histórico.

### Progresso

- Streak calculado por dias com pelo menos uma sessão concluída;
- recorde pessoal de streak;
- cinco níveis visuais: Faísca, Broto, Chama, Tocha e Fogueira;
- chama SVG animada conforme o estado da sessão e o nível;
- fogueira visual dos últimos 14 dias;
- brasas acesas para conclusões, cinzas para abandonos e dias apagados;
- detalhes de duração, tarefa, status e horário de cada sessão.

### Preferências e persistência

- Tema claro e escuro;
- duração padrão configurável;
- som de conclusão configurável;
- recuperação segura quando dados locais estão indisponíveis ou inválidos.

## Tecnologias

- React 19;
- TypeScript;
- Vite;
- CSS Modules;
- Context API;
- Lucide React;
- Web Audio API;
- `localStorage`;
- ESLint.

## Como executar

É necessário ter o Node.js e o npm instalados.

```powershell
cd vesta-pomodoro
npm.cmd install
npm.cmd run dev
```

O Vite informará o endereço local da aplicação, normalmente
`http://localhost:5173`.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Valida o TypeScript e gera a versão de produção |
| `npm run lint` | Executa a análise estática com ESLint |
| `npm run preview` | Abre localmente a versão gerada |

## Estrutura principal

```text
src/
├── components/          # Timer, chama, tarefas, histórico e configurações
├── context/             # Estado global e regras das sessões
├── Models/              # Tipos de tarefas, sessões e estado
├── pages/               # Composição das telas
├── templates/           # Estrutura compartilhada da interface
├── theme/               # Temas claro e escuro
└── utils/               # Datas, níveis, storage, som e formatação
```

O estado do MVP permanece centralizado no `TaskContextProvider`. Componentes
consomem ações do contexto para evitar regras de negócio duplicadas na
interface.

## Dados locais

| Chave | Conteúdo |
| --- | --- |
| `vesta_tasks` | Tarefas e contagem de sessões |
| `vesta_sessions` | Sessões concluídas e abandonadas |
| `vesta_streak` | Streak atual, última data e recorde |
| `vesta_settings` | Duração padrão e preferência de som |
| `vesta_active_session` | Sessão em andamento ou pausada |
| `theme` | Tema visual escolhido |

Excluir os dados do site no navegador reinicia o progresso local.

## Validação

Antes de uma entrega, execute:

```powershell
npm.cmd run lint
npm.cmd run build
```

O escopo completo e as regras do produto estão documentados no
[`README.md`](../README.md) da raiz do repositório.
