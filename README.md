# 🚀 Ecossistema de Vendas

Sistema completo de vendas de produtos digitais com Strapi CMS headless e Next.js 15, otimizado para deploy no EasyPanel com PostgreSQL.

## Stack Tecnológico

| Camada | Tecnologia |
|---|---|
| Backend (CMS) | Strapi v5 + TypeScript |
| Frontend | Next.js 15 (App Router) |
| Database | PostgreSQL (produção) / SQLite (dev local) |
| Styling | Tailwind CSS 3.4 |
| Deploy | EasyPanel (Docker Compose) |
| Middleware | Next.js 15 Edge Runtime |

## Funcionalidades

- **Multi-produto** — múltiplos produtos com configurações independentes de LP, SEO e checkout
- **Landing Pages Modulares** — 14 componentes via Dynamic Zones do Strapi
- **Filtro de Tráfego** — 7 camadas de validação (bots, UA, código de acesso, origem, país, parâmetros, acesso direto)
- **Tracking Multi-Plataforma** — GTM, GA4, Google Ads, Meta Pixel, Taboola (configurável por LP no Strapi)
- **SEO Técnico** — JSON-LD schemas, sitemap automático, ISR/revalidação por webhook
- **Performance** — standalone output, on-demand revalidation, Edge Middleware

## Estrutura do Projeto

```
FrameworkDirectResponse/
├── backend/                    # Strapi CMS
│   ├── src/api/               # Content Types
│   │   ├── product/           # Produto (checkout, preço, garantia)
│   │   ├── landing-page/      # LP (14 componentes, filtro, tracking)
│   │   ├── seo-page/          # Páginas SEO (blog, guias, comparativos)
│   │   └── global-seo/        # Config global (GTM, GA4, OG image)
│   ├── src/components/lp/     # Schemas dos 14 componentes LP
│   ├── Dockerfile             # Build multi-stage para EasyPanel
│   └── .env.example
│
├── frontend/                   # Next.js 15
│   ├── app/
│   │   ├── (main)/            # Site principal (SSR/ISR)
│   │   │   ├── [product-slug]/      # Página de produto
│   │   │   └── [product-slug]/[page-slug]/ # SEO pages
│   │   ├── lp/[lp-slug]/      # Landing Pages (noindex)
│   │   ├── api/revalidate/    # Webhook de revalidação ISR
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── lp/                # 15 componentes LP
│   │   │   ├── LpHero.tsx     ├── LpVideo.tsx
│   │   │   ├── LpProblem.tsx  ├── LpVturb.tsx  (Vturb SmartPlayer)
│   │   │   ├── LpBenefits.tsx ├── LpSocialProof.tsx
│   │   │   ├── LpTestimonials.tsx  ├── LpMediaLogos.tsx
│   │   │   ├── LpOfferStack.tsx    ├── LpContent.tsx
│   │   │   ├── LpGuarantee.tsx     ├── LpComparison.tsx
│   │   │   ├── LpFaq.tsx           ├── LpCustomHtml.tsx
│   │   │   ├── LpUrgencyCta.tsx
│   │   │   └── DynamicZoneRenderer.tsx
│   │   ├── layout/            # Header.tsx, Footer.tsx
│   │   ├── ui/                # Button, Card, Badge, Countdown...
│   │   └── tracking/          # GtmScript, PixelScripts, DataLayer
│   ├── lib/
│   │   ├── types.ts           # 35+ interfaces TypeScript
│   │   ├── strapi.ts          # Fetch helper com cache/tags
│   │   ├── filter.ts          # Lógica de filtro de tráfego
│   │   ├── checkout.ts        # Builder de URL de checkout + UTMs
│   │   ├── schema.ts          # Gerador JSON-LD
│   │   └── utils.ts
│   ├── middleware.ts           # Filtro de tráfego Edge (Next.js 15)
│   ├── Dockerfile             # Build multi-stage standalone
│   └── .env.example
│
├── docker-compose.yml          # EasyPanel: backend + frontend
└── .env.docker                 # Template de variáveis de produção
```

## Deploy no EasyPanel (2 Apps Separados)

> Abordagem recomendada: um App para o Strapi (backend) e outro para o Next.js (frontend).
> Ambos usam o mesmo repositório GitHub, cada um com seu próprio Dockerfile.

### Arquitetura

```
Internet
    │
    ├── cms.seudominio.com → [App: backend] Strapi :1337
    │                              │
    │                              └── PostgreSQL (serviço separado EasyPanel)
    │
    └── seudominio.com    → [App: frontend] Next.js :3000
                                   │
                                   └── Strapi (via URL interna ou pública)
```

---

### Passo 1 — Criar o banco PostgreSQL

Crie um serviço PostgreSQL no EasyPanel. Anote:
- Host interno
- Nome do banco
- Usuário e senha

---

### Passo 2 — Criar App: Backend (Strapi)

1. EasyPanel → **Create Service → App**
2. **Source:** GitHub → `fernandofunicelli/FrameworkDirectResponse`, branch `main`
3. **Dockerfile:** `backend/Dockerfile`
4. **Build Context:** `/` (raiz do repositório)
5. **Port:** `1337`
6. **Domain:** configure `cms.seudominio.com` (ou use o subdomínio gerado pelo EasyPanel)

**Variáveis de ambiente do backend:**

```env
# Banco
DATABASE_CLIENT=postgres
DATABASE_HOST=<host-interno-postgres>
DATABASE_PORT=5432
DATABASE_NAME=<nome-banco>
DATABASE_USERNAME=<usuario>
DATABASE_PASSWORD=<senha>
DATABASE_SSL=false

# Strapi secrets (gerar com: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
APP_KEYS=chave1,chave2,chave3,chave4
API_TOKEN_SALT=<gerar>
ADMIN_JWT_SECRET=<gerar>
TRANSFER_TOKEN_SALT=<gerar>
ENCRYPTION_KEY=<gerar>
JWT_SECRET=<gerar>

# URL pública do próprio Strapi (para o admin panel funcionar atrás do proxy)
PUBLIC_URL=https://cms.seudominio.com
```

7. Deploy → Acesse `https://cms.seudominio.com/admin` → Crie o primeiro admin
8. Settings → API Tokens → Crie token **Full Access** → Copie

---

### Passo 3 — Criar App: Frontend (Next.js)

1. EasyPanel → **Create Service → App**
2. **Source:** mesmo repositório, branch `main`
3. **Dockerfile:** `frontend/Dockerfile`
4. **Build Context:** `/`
5. **Port:** `3000`
6. **Domain:** configure `seudominio.com`

**Variáveis de ambiente do frontend:**

```env
STRAPI_API_URL=https://cms.seudominio.com/api
STRAPI_API_TOKEN=<token gerado no passo 2>
NEXT_PUBLIC_STRAPI_URL=https://cms.seudominio.com
NEXT_PUBLIC_SITE_URL=https://seudominio.com
REVALIDATE_SECRET=<gerar-uuid>
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

7. Deploy

---

### Passo 4 — Permissões da API no Strapi

No Strapi Admin → **Settings → Users & Permissions → Roles → Public**:

Habilite os endpoints:
- `product`: `find`, `findOne`
- `landing-page`: `find`, `findOne`
- `seo-page`: `find`, `findOne`
- `global-seo`: `find`

---

### Passo 5 — Webhook de revalidação (ISR)

Strapi Admin → **Settings → Webhooks → Create**:
- URL: `https://seudominio.com/api/revalidate`
- Header: `x-revalidate-secret: <REVALIDATE_SECRET>`
- Events: `Entry.create`, `Entry.update`, `Entry.delete`

## Desenvolvimento Local

```bash
# Backend
cd backend
cp .env.example .env
# Editar .env (SQLite para dev local, não precisa de Postgres)
npm install
npm run develop

# Frontend (outro terminal)
cd frontend
cp .env.example .env.local
# Editar NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# Editar STRAPI_API_TOKEN=<token gerado no admin do Strapi>
npm install
npm run dev
```

## Variáveis de Ambiente

### `backend/.env.example`

```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=development
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
# Para produção, usar PostgreSQL:
# DATABASE_CLIENT=postgres
# DATABASE_HOST=
# DATABASE_PORT=5432
# DATABASE_NAME=
# DATABASE_USERNAME=
# DATABASE_PASSWORD=
```

### `frontend/.env.example`

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=
NEXT_PUBLIC_GTM_ID=
```

## Filtro de Tráfego

Configurado por LP no painel Strapi. Campos disponíveis:

| Campo | Descrição |
|---|---|
| `filter_enabled` | Ativa/desativa o filtro |
| `filter_block_bots` | Bloqueia user-agents de bots |
| `filter_block_empty_ua` | Bloqueia requisições sem UA |
| `filter_access_code` + `filter_access_param` | Código de acesso por query param |
| `filter_required_sources` | Lista de utm_source permitidos |
| `filter_required_params` | Parâmetros obrigatórios na URL |
| `filter_allowed_countries` | Países permitidos (via Cloudflare) |
| `filter_blocked_countries` | Países bloqueados |
| `filter_block_direct` | Bloqueia acesso direto (sem referer) |
| `filter_redirect_url` | URL de destino para bloqueados |
| `filter_safe_page_slug` | Slug da página segura do produto |

## Tracking

Configurado em dois níveis:

**Global** (`GlobalSeo` no Strapi): `gtm_id`, `ga4_measurement_id`, `google_ads_id`, `meta_pixel_id`, `taboola_account_id`

**Por LP** (`LandingPage` no Strapi): `tracking_google_ads_conversion_id/label/value`, `tracking_meta_pixel_id`, `tracking_taboola_pixel_id`, `tracking_custom_scripts`
