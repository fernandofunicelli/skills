# Ecossistema V3: Landing Pages + Payload CMS

Este repositório contém o frontend (Next.js 14+) integrado ao Payload CMS v3 para o gerenciamento de Landing Pages de alta conversão.

## Estrutura do Projeto
Todo o código da aplicação e do CMS reside na pasta `/frontend/`.

## Deploy (Easypanel / VPS)
O deploy deve ser feito em um único contêiner (single-box) apontando para o diretório raiz `/frontend`. A aplicação exigirá uma conexão com um banco de dados PostgreSQL.

## Executando Localmente
1. Acesse o diretório `frontend`: `cd frontend`
2. Configure seu `.env.local`
3. Instale dependências: `npm install`
4. Rode as migrações/inicie o dev: `npm run dev`

Painel Admin estará disponível em: `http://localhost:3000/admin`
Landing Pages na rota: `http://localhost:3000/lp/seu-slug`
