@AGENTS.md

<!-- supercerebro:inicio -->
## SuperCerebro: padrões deste projeto

Este projeto faz parte do SuperCerebro (grupo **Meta**). A pasta dele no cérebro é `C:\Users\ferna\Downloads\Projetos\SuperCerebro\vault\10 Projetos\Meta\Skills`.

- **context-mode primeiro**:
  - rode comandos e análises por `ctx_execute`/`ctx_batch_execute`;
  - antes de tarefas não triviais, consulte o cérebro com `ctx_search(project: "global", source: "cerebro", queries: [...])`.
- **Memória**:
  - a memória deste projeto mora no vault (`Memorias/`);
  - a infraestrutura (MCPs, hospedagem, deploy, git, domínios) está em `infra_skills.md`;
  - o tracking (pendências, changelog, docs) está em `Tracking.md`.
  - Segredos nunca vão para memória; registre só onde eles moram.
- **Skills, workflows, agentes e padrões**: siga e use os existentes antes de criar algo novo.
  - O catálogo completo (globais e de todos os projetos) está em `SuperCerebro/vault/20 Skills e Agentes/`.
- **Git flow**:
  - cada pedido ganha a própria branch, criada a partir de `origin/develop` numa worktree da sessão;
  - PR para `develop`;
  - a sessão faz o merge depois das checagens;
  - nunca commit direto em `main`/`develop`.
  - Padrão completo: `SuperCerebro/vault/30 Ferramentas/Padrao Git Flow.md`.
- **Aprofundamento SuperCerebro**: está pendente e só deve ser executado quando o usuário pedir.
<!-- supercerebro:fim -->
