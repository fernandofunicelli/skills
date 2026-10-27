@AGENTS.md

<!-- supercerebro:inicio -->
## SuperCerebro: padrões deste projeto

Este projeto faz parte do SuperCerebro (grupo **Meta**). Pasta no cérebro: `C:\Users\ferna\Downloads\Projetos\SuperCerebro\vault\10 Projetos\Meta\Skills` (memórias, sessões, decisões, `Tracking.md`, `Infra.md`, `Conexoes.md`).
**Usar o SuperCerebro e mantê-lo atualizado é padrão, sem esperar pedido.** Manual completo (o que é obrigatório, o que registrar, como atualizar): `C:\Users\ferna\Downloads\Projetos\SuperCerebro\vault\00 Painel\Manual do SuperCerebro.md`.

- **Consultar o cérebro ANTES de abrir o código** (primeiro passo de todo pedido não trivial; varrer o repositório com Grep, Glob ou Explore para entender contexto é o último recurso, não o primeiro):
  1. `node C:/Users/ferna/Downloads/Projetos/SuperCerebro/sistema/consultar.mjs '<pergunta>' --projeto skills` (pelo `ctx_execute`, em shell; barras normais e aspas simples, como está aqui, funcionam no Git Bash, no PowerShell e no cmd). Num comando só, devolve:
     - o que este projeto já decidiu e fez: memórias, decisões e ordens do Fernando, sessões, aprofundamento, infra;
     - os docs do repositório (specs e changelog costumam citar os arquivos exatos);
     - o que os outros projetos já resolveram;
     - o mapa do código, quando houver grafo (este projeto ainda não tem).
  2. Para buscas seguidas só neste projeto, use `ctx_search(queries: [...], source: "cerebro:skills")` ou `source: "docs:skills"`. O `ctx_search` só enxerga o índice deste projeto (`project: "global"` não muda isso); o resto do cérebro vem pelo passo 1, e as relações entre conceitos de vários projetos pelo MCP `graphify` (`query_graph`, `get_neighbors`).
  3. Só então o código: `Read` (com offset) e `Grep` direto nos arquivos apontados, para confirmar o estado atual antes de editar.
  - Consulte de novo no meio do trabalho sempre que surgir uma destas perguntas:
    - por que está assim, ou o que já decidimos;
    - como fizemos X, ou se já tentamos isso;
    - onde está hospedado, ou como é o deploy;
    - e antes de propor arquitetura ou mudar de rumo.
  - O cérebro diz o que foi decidido e por quê; o código diz o que existe agora. Se divergirem, não escolha em silêncio: confirme no código e registre a divergência como decisão com `categoria: contradicao`.
  - Ao delegar para um subagente (Explore e outros), ponha no prompt o que a consulta já respondeu e o comando do passo 1, para ele não varrer o repositório do zero.
- **Ferramentas padrão (todas, sempre)**:
  - **context-mode** é o motor: comandos e análises por `ctx_execute`/`ctx_batch_execute`, e a busca do cérebro (acima);
  - **graphify** é o grafo: conceitos de todos os projetos pelo MCP `graphify` (`query_graph`, `get_neighbors`);
  - **Obsidian** é o cérebro que o Fernando lê: o que você registrar no vault segue as skills `obsidian-markdown`, `obsidian-bases`, `json-canvas` e `obsidian-cli` (plugin `obsidian`): wikilinks com caminho, callouts, Bases no lugar de Dataview; confira com `"C:\Users\ferna\AppData\Local\Programs\Obsidian\Obsidian.com"` (`base:query`, `open`, `dev:screenshot`).
- **Memória**:
  - a pasta de memória do Claude deste projeto (`~/.claude/projects/<pasta>/memory`) é um **atalho** (junction) para `C:\Users\ferna\Downloads\Projetos\SuperCerebro\vault\10 Projetos\Meta\Skills\Memorias`: são os mesmos arquivos, e gravar memória já grava no cérebro;
  - nunca apague, mova ou recrie a pasta `memory` (quebra o atalho); o Fernando pode editar as memórias no Obsidian, então releia antes de reescrever;
  - a global (regras de todos os projetos) vem do `~/.claude/CLAUDE.md`;
  - infra em `infra_skills.md`;
  - segredos nunca vão para memória (única exceção: login e senha de conta de teste na memória do projeto que a usa).
- **Skills, workflows, agentes e padrões**: siga e use os existentes antes de criar algo novo. Toda entrega relevante passa pela skill global `revisao-em-par` (revisor independente).
  - Catálogo completo: `SuperCerebro/vault/20 Skills e Agentes/`.
- **Git flow**:
  - branch por pedido a partir de `origin/develop`, numa worktree da sessão;
  - PR para `develop`;
  - merge pela sessão depois das checagens;
  - nunca commit direto em `main`/`develop`.
  - Padrão completo: `SuperCerebro/vault/30 Ferramentas/Padrao Git Flow.md`.
- **Decisões do Fernando (registra e segue)**:
  - precisa de uma decisão dele e não é de risco (produção, dinheiro, dados de cliente, apagar algo, mudar escopo)? Crie `C:\Users\ferna\Downloads\Projetos\SuperCerebro\vault\10 Projetos\Meta\Skills\Decisoes\AAAA-MM-DD <assunto>.md` a partir do modelo `SuperCerebro/vault/00 Fernando/Modelos/Decisao.md` (campos e formato no Manual, seção 3), siga com a opção mais segura e avise no fim;
  - o que for de risco continua sendo perguntado na hora pelo AskUserQuestion (essas respostas entram no registro sozinhas); ordem dele em texto livre no chat, registre você com `origem: conversa` e `status: vigente`;
  - achou contradição com decisão ou memória anterior? Registre do mesmo jeito, com `categoria: contradicao`;
  - prioridades, ideias novas e respostas do Fernando chegam no início da sessão: aplique e atualize o status da nota (`vista`, `aplicada`).
- **Ao fechar CADA entrega** (não espere o fim da sessão):
  - memória do projeto atualizada; docs do repositório em dia (estado, changelog, pendências `- [ ]`, que viram o Tracking);
  - decisões em `Decisoes/` (pendentes e ordens dele em texto livre);
  - resumo da sessão escrito por você num arquivo .md e gravado com `node C:/Users/ferna/Downloads/Projetos/SuperCerebro/sistema/resumir-sessao.mjs --projeto skills --arquivo <resumo.md>` (acha a nota de hoje da sua sessão, grava fora do bloco automático, não duplica);
  - `node C:/Users/ferna/Downloads/Projetos/SuperCerebro/sistema/manutencao.mjs --projeto skills` (sessões, decisões, tracking, painel, índice e commit do vault).
- **Aprofundamento SuperCerebro**: está pendente e é feito pelo agente deste projeto, em etapas e só quando o usuário pedir (skill `cerebro-aprofundar`).
<!-- supercerebro:fim -->
