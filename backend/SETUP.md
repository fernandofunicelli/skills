# Strapi Backend Setup - Ecossistema de Vendas V3

## 1. Primeiro Acesso

1. Inicie o Strapi em modo desenvolvimento:
```bash
cd backend
npm run develop
```

2. Acesse: http://localhost:1337/admin

3. Crie sua conta de administrador

## 2. Estrutura Criada

### Componentes Compartilhados (shared)
- ✅ **Testimonial**: Depoimentos com foto, nome, avaliação
- ✅ **FAQ Item**: Perguntas e respostas
- ✅ **Trust Badge**: Badges de confiança com ícone
- ✅ **Social Proof**: Métricas de prova social

### Componentes de Landing Page (lp)
- ✅ **Hero Section**: Hero com badge, headline, imagem/vídeo e CTA
- ✅ **Problem Agitation**: Seção de problema e dores
- ✅ **Benefits Grid**: Grid de benefícios
- ✅ **Video Section**: Vídeo VSL com facade pattern
- ✅ **Testimonials**: Carrossel/grid de depoimentos
- ✅ **Social Proof Numbers**: Números de impacto
- ✅ **Offer Stack**: Stack de valor com preço
- ✅ **Guarantee**: Seção de garantia
- ✅ **Urgency CTA**: CTA final com countdown e escassez
- ✅ **FAQ Accordion**: FAQ para matar objeções
- ✅ **Media Logos**: Logos "Visto em"
- ✅ **Content Block**: Bloco de conteúdo genérico
- ✅ **Comparison Table**: Tabela de comparação
- ✅ **Custom HTML**: HTML customizado

### Collection Types
- ✅ **Product**: Produtos com checkout, preço, garantia
- ✅ **SEO Page**: Páginas de conteúdo SEO
- ✅ **Landing Page**: LPs com filtro, tracking e Dynamic Zone

### Single Types
- ✅ **Global SEO**: Configurações globais de SEO e tracking

## 3. Configurar Permissões da API

Vá em **Settings > Users & Permissions plugin > Roles > Public**:

### Permissões Necessárias (Public Role):
- ✅ Product: `find`, `findOne`
- ✅ SEO Page: `find`, `findOne`
- ✅ Landing Page: `find`, `findOne`
- ✅ Global SEO: `find`

**IMPORTANTE**: Apenas leitura! NUNCA ativar `create`, `update` ou `delete` em Public.

## 4. Configurar Webhook de Revalidação

Em **Settings > Webhooks**, crie um novo webhook:

- **Name**: Next.js Revalidation
- **URL**: `https://seu-dominio-next.vercel.app/api/revalidate`
- **Headers**:
  - `x-revalidate-secret`: `seu-secret-aqui` (mesmo do .env.local do Next.js)
- **Events**:
  - ✅ Entry Create
  - ✅ Entry Update
  - ✅ Entry Delete
  - ✅ Entry Publish
  - ✅ Entry Unpublish

Para cada um desses Content Types:
- `api::product.product`
- `api::seo-page.seo-page`
- `api::landing-page.landing-page`
- `api::global-seo.global-seo`

## 5. Configurar para PostgreSQL (Produção)

### Instalar driver PostgreSQL:
```bash
npm install pg
```

### Editar `config/database.ts`:
```typescript
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
  },
});
```

### Adicionar no `.env`:
```
DATABASE_CLIENT=postgres
DATABASE_HOST=seu-host-postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi_db
DATABASE_USERNAME=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_SSL=false
```

## 6. Deploy (Railway/Render)

### Railway:
1. Conecte seu repositório
2. Adicione PostgreSQL do Railway
3. Configure as variáveis de ambiente
4. Deploy automático

### Render:
1. New Web Service
2. Conecte o repositório
3. Adicione PostgreSQL do Render (na mesma conta)
4. Configure variáveis de ambiente
5. Build Command: `npm install && npm run build`
6. Start Command: `npm run start`

## 7. Variáveis de Ambiente de Produção

```env
# Host
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=seu-postgres-host
DATABASE_PORT=5432
DATABASE_NAME=strapi_prod
DATABASE_USERNAME=usuario
DATABASE_PASSWORD=senha
DATABASE_SSL=true

# Secrets (gerar novos!)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=salt_unico_aqui
ADMIN_JWT_SECRET=jwt_secret_aqui
TRANSFER_TOKEN_SALT=transfer_salt_aqui
JWT_SECRET=jwt_secret_aqui

# Admin
ADMIN_PATH=/admin

# URLs
STRAPI_ADMIN_CLIENT_URL=https://seu-strapi.railway.app
STRAPI_ADMIN_CLIENT_PREVIEW_SECRET=preview_secret

# Produção
NODE_ENV=production
```

## 8. Conteúdo de Teste

Após o Strapi iniciar com sucesso, será necessário criar conteúdo de teste via interface admin:

1. **Global SEO**:
   - Site Name, URL, descrição
   - GTM ID, GA4 ID, Google Ads ID, Meta Pixel ID, Taboola Account ID

2. **2 Produtos**:
   - Produto A: "Curso Marketing Digital"
   - Produto B: "Template de Landing Pages"
   - Para cada um: nome, slug, descrição, preço, checkout URL, safe_page_slug

3. **SEO Pages** (2 para cada produto):
   - Páginas de conteúdo com rich text
   - Meta tags, imagens, relacionamentos

4. **Landing Pages** (2 para cada produto):
   - Com filtros diferentes (Taboola, Google Ads)
   - Com tracking configurado
   - Com Dynamic Zone preenchida (Hero, Benefits, Testimonials, etc.)

## 9. API Endpoints

Após configurar permissões, os endpoints estarão disponíveis:

```
GET /api/products?populate=deep
GET /api/products/:id?populate=deep
GET /api/seo-pages?populate=deep
GET /api/seo-pages/:id?populate=deep
GET /api/landing-pages?populate=deep&filters[slug][$eq]=slug-da-lp
GET /api/global-seo?populate=deep
```

## 10. Troubleshooting

### Erro: "Component not found"
- Reinicie o Strapi: `npm run develop`
- Limpe cache: `npm run strapi build --clean`

### Erro de permissões na API
- Verifique Settings > Roles > Public
- Certifique-se que `find` e `findOne` estão ativados

### Erro de relação entre Content Types
- Verifique se os slugs nos schemas estão corretos
- Formato: `api::content-type-name.content-type-name`

## Next Steps

✅ Strapi configurado
➡️ **Próximo**: Criar projeto Next.js (FASE 2)
