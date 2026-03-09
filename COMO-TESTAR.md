# 🧪 Como Testar o Sistema - Guia Passo a Passo

## 📋 Pré-requisitos
- Node.js instalado
- PostgreSQL configurado (ou usar SQLite local)
- Portas 1337 e 3000 livres

---

## PASSO 1: Iniciar Backend Strapi

```bash
cd backend
npm run develop
```

**Aguardar**: "Strapi started successfully"

**Acessar**: http://localhost:1337/admin

---

## PASSO 2: Criar Conta Admin

1. Preencher formulário:
   - **Name**: Seu nome
   - **Email**: seu@email.com
   - **Password**: senha123 (mínimo 8 caracteres)

2. Clicar "Let's start"

---

## PASSO 3: Configurar Permissões da API

1. Menu lateral > **Settings**
2. **Users & Permissions plugin** > **Roles**
3. Clicar em **Public**
4. Expandir cada Content Type e marcar:

**Product**:
- ✅ find
- ✅ findOne

**Seo Page**:
- ✅ find
- ✅ findOne

**Landing Page**:
- ✅ find
- ✅ findOne

**Global SEO**:
- ✅ find

5. Clicar **Save** (canto superior direito)

---

## PASSO 4: Gerar API Token

1. Menu lateral > **Settings**
2. **API Tokens**
3. **Create new API Token**
4. Preencher:
   - **Name**: Next.js Frontend
   - **Token duration**: Unlimited
   - **Token type**: Read-only
5. Clicar **Save**
6. **COPIAR O TOKEN** (aparece apenas uma vez!)

Exemplo:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

---

## PASSO 5: Configurar Frontend

Editar `frontend/.env.local`:

```env
STRAPI_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=COLAR_SEU_TOKEN_AQUI
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=secret123
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## PASSO 6: Criar Produto de Teste

1. No Strapi, menu lateral > **Content Manager**
2. Clicar **Product** > **Create new entry**
3. Preencher:

```
Name: Curso Marketing Digital
Slug: curso-marketing-digital (auto-gerado)
Short Description: Aprenda marketing digital do zero ao avançado
Checkout Base URL: https://pay.hotmart.com/ABC123
Price: 197
Price Original: 397
Currency: BRL
Is Active: ✅ (marcado)
```

4. Clicar **Save** > **Publish**

---

## PASSO 7: Criar Landing Page de Teste

1. Content Manager > **Landing Page** > **Create new entry**
2. Preencher:

### Dados Básicos:
```
Title: Curso Marketing Digital - Taboola
Slug: curso-marketing-taboola
Product: Selecionar "Curso Marketing Digital"
Meta Title: Curso Marketing Digital | Aprenda Agora
Meta Description: Aprenda marketing digital com o melhor curso do Brasil
```

### Filtro (scroll down):
```
Filter Enabled: ✅
Filter Access Code: tb2026
Filter Access Param: xyz
Filter Required Sources:
  - Adicionar item: taboola
Filter Required Params:
  - Adicionar item: tblci
Filter Block Bots: ✅
Filter Block Empty UA: ✅
```

### Tracking (scroll down):
```
Tracking Taboola Pixel ID: 123456
Tracking Taboola Event Name: make_purchase
```

### Body Sections (Dynamic Zone):

**Adicionar componente: Hero Section**
```
Badge Text: 🔥 Oferta Limitada
Headline: Domine Marketing Digital e Fature de Casa
Sub Headline: O método completo que já transformou a carreira de 10.000+ alunos
CTA Text: QUERO COMEÇAR AGORA
```

**Adicionar componente: Benefits Grid**
```
Headline: O que você vai aprender
Sub Headline: Tudo que você precisa para ser um profissional completo

Items (adicionar 3):
1. Label: SEO Avançado
   Description: Domine técnicas de ranqueamento no Google

2. Label: Tráfego Pago
   Description: Crie campanhas lucrativas no Google Ads e Facebook

3. Label: Copywriting
   Description: Escreva textos que vendem
```

**Adicionar componente: Offer Stack**
```
Headline: O Que Você Vai Receber
Total Value: R$ 2.385
Actual Price: R$ 197
Installment Text: ou 12x de R$ 19,70
CTA Text: GARANTIR MINHA VAGA AGORA

Items (adicionar 3):
1. Label: Módulo 1: Fundamentos
   Description: R$ 297

2. Label: Módulo 2: Tráfego Pago
   Description: R$ 497

3. Label: Bônus: Templates
   Description: R$ 197
```

3. Clicar **Save** > **Publish**

---

## PASSO 8: Iniciar Frontend

```bash
cd frontend
npm run dev
```

**Aguardar**: "Ready in XXms"

---

## PASSO 9: Testar LP VÁLIDA

Abrir navegador em modo anônimo (Ctrl+Shift+N):

```
http://localhost:3000/lp/curso-marketing-taboola?xyz=tb2026&utm_source=taboola&tblci=test123
```

### ✅ Deve funcionar:
- Página carrega
- Hero aparece
- Benefits Grid aparece
- Offer Stack aparece
- CTAs aparecem

### 🔍 Verificar Console (F12):
```javascript
// DataLayer deve ter:
window.dataLayer
// [{ event: 'page_view', page_type: 'lp', ... }]

// Taboola deve existir:
window._tfa
// [{ notify: 'event', name: 'page_view', ... }]
```

---

## PASSO 10: Testar LP BLOQUEADA

### Teste 1: Sem código de acesso
```
http://localhost:3000/lp/curso-marketing-taboola
```
**Esperado**: Redireciona para `/blocked`

### Teste 2: Código errado
```
http://localhost:3000/lp/curso-marketing-taboola?xyz=errado&utm_source=taboola&tblci=test
```
**Esperado**: Redireciona para `/blocked`

### Teste 3: Origem errada
```
http://localhost:3000/lp/curso-marketing-taboola?xyz=tb2026&utm_source=google&tblci=test
```
**Esperado**: Redireciona para `/blocked`

### Teste 4: Parâmetro faltando
```
http://localhost:3000/lp/curso-marketing-taboola?xyz=tb2026&utm_source=taboola
```
**Esperado**: Redireciona para `/blocked` (falta tblci)

---

## PASSO 11: Testar CTA e Tracking

1. Acessar LP válida
2. Abrir DevTools (F12) > **Console**
3. Clicar no botão **"QUERO COMEÇAR AGORA"**

### ✅ No Console deve aparecer:
```javascript
// Evento DataLayer
{ event: 'click_checkout', product_name: 'Curso Marketing Digital', ... }

// Taboola event
{ notify: 'event', name: 'make_purchase', revenue: 197, ... }
```

### ✅ Deve redirecionar para:
```
https://pay.hotmart.com/ABC123?utm_source=taboola&utm_medium=...&tblci=test123&src=lp_curso-marketing-taboola&ref=curso-marketing-digital
```

### 🔍 Verificar URL tem:
- ✅ UTMs originais preservados
- ✅ tblci preservado
- ✅ src=lp_curso-marketing-taboola
- ✅ ref=curso-marketing-digital

---

## PASSO 12: Testar Página SEO

```
http://localhost:3000/curso-marketing-digital
```

### ✅ Deve funcionar:
- Página carrega
- Título do produto aparece
- Descrição aparece
- Botão "Ver Detalhes" funciona

---

## PASSO 13: Testar Sitemap

```
http://localhost:3000/sitemap.xml
```

### ✅ Deve conter:
```xml
<url>
  <loc>http://localhost:3000/curso-marketing-digital</loc>
  ...
</url>
```

### ❌ NÃO deve conter:
- /lp/curso-marketing-taboola (LPs nunca no sitemap)

---

## PASSO 14: Testar Robots.txt

```
http://localhost:3000/robots.txt
```

### ✅ Deve conter:
```
User-agent: *
Allow: /
Disallow: /lp/
Disallow: /api/
Disallow: /blocked

Sitemap: http://localhost:3000/sitemap.xml
```

---

## 🎉 TESTES COMPLETOS

Se todos os passos funcionaram:

✅ **Backend Strapi**: Funcionando
✅ **Filtro de tráfego**: Funcionando
✅ **Tracking**: Funcionando
✅ **Landing Page**: Funcionando
✅ **CTA + Redirect**: Funcionando
✅ **SEO Pages**: Funcionando
✅ **Sitemap**: Funcionando
✅ **Robots**: Funcionando

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch"
- Verificar se Strapi está rodando (http://localhost:1337)
- Verificar STRAPI_API_TOKEN em .env.local

### Erro: "Not found"
- Verificar se conteúdo foi publicado (não apenas saved)
- Verificar slug está correto

### LP sempre redireciona para /blocked
- Verificar filtro no Strapi
- Verificar URL tem todos os parâmetros necessários
- Ver console do middleware no terminal do frontend

### CTA não redireciona
- Abrir console (F12)
- Ver erros JavaScript
- Verificar checkout_base_url do produto

### DataLayer vazio
- Verificar GTM_ID no .env.local
- Abrir console e digitar: `window.dataLayer`

---

## 📊 Logs Úteis

### Ver logs do Middleware:
Terminal do `npm run dev` mostra:
```
[FILTER] Bot blocked: slug
[FILTER] Access code mismatch: slug
[FILTER] Country blocked: slug
```

### Ver logs do Strapi:
Terminal do `npm run develop` mostra:
```
[info] GET /api/landing-pages?filters[slug][$eq]=...
```

---

**Pronto! Sistema 100% testado e funcional! 🚀**
