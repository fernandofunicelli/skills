---
name: agentic-orchestration-memory-elite
description: Módulo Elite de Orquestração e Memória. Detalhamento técnico de padrões ReAct, Multi-Agente (Supervisor/Swarm) e Gestão de Memória via MCP.
category: architecture
risk: safe
---

# 🛠️ Agentic Orchestration & Memory (Elite Module)

Este módulo fornece o detalhamento necessário para a construção de sistemas multi-agente complexos e resilientes.

## 1. Padrões de Orquestração
- **ReAct Framework:** Ciclo Reason + Act. O agente deve verbalizar seu raciocínio antes de cada ação técnica.
- **Supervisor Pattern:** Um agente central gerencia o estado e delega tarefas específicas para agentes especialistas.
- **Swarm (Peer-to-Peer):** Agentes interagem diretamente, passando o controle conforme a necessidade do contexto.

## 2. Gestão de Memória e Contexto (MCP)
- **Model Context Protocol (MCP):** Uso de servidores MCP para estender as capacidades do agente com ferramentas e dados externos.
- **Short-term Memory:** Gestão eficiente da janela de contexto para evitar "esquecimento" de instruções durante execuções longas.
- **Long-term Memory:** Persistência de aprendizados e estados de projeto em arquivos como `AGENTS.md` e KIs.

## 3. Arquitetura de Fluxo
- **State Machines:** Uso de grafos de estado (LangGraph) para garantir caminhos previsíveis em automações complexas.
- **Human-in-the-loop:** Pontos de interceptação obrigatórios para aprovação de ações críticas ou destrutivas.
