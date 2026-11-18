---
name: agent-superpowers-systematic-debugging
description: Módulo Elite de Investigação de Causa Raiz. Disciplina operacional máxima para resolução de falhas complexas.
category: engineering
risk: safe
---

# 🛠️ Systematic Debugging (Elite Module)

A "Regra de Ouro" da investigação técnica para evitar correções "em cima do problema".

## 1. Identificação de Sintomas
- Capturar logs, stack traces e screenshots exatos do erro.
- Isolar o ambiente (reprodução local vs produção).

## 2. Isolamento de Causa Raiz (The 5 Whys)
- Não aceitar a primeira explicação. Investigar camadas inferiores (DB, Rede, Permissões).
- Documentar a causa identificada explicitamente antes de propor qualquer código.

## 3. Correção Cirúrgica
- Aplicar o fix mínimo necessário seguindo os padrões do Pillar `03-04` (Systems Design).
- Verificar efeitos colaterais em módulos adjacentes.

## 4. Prevenção de Regressão
- Criar um teste unitário ou de integração que falha sem a correção.
- Documentar o aprendizado em um Knowledge Item (KI) se o erro for sistêmico.
