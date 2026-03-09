# 🧪 VAMOS TESTAR AGORA - Guia Rápido

## ✅ SISTEMA 95% COMPLETO - PRONTO PARA TESTES!

---

## 📋 CHECKLIST PRÉ-TESTE

### Arquivos criados: **65** ✅
- Backend: 21 arquivos
- Frontend: 44 arquivos

### Funcionalidades implementadas:
- ✅ Filtro de tráfego Edge
- ✅ Tracking multi-plataforma
- ✅ Dynamic Zone (14 componentes LP)
- ✅ FloatingCta + ExitIntentPopup
- ✅ ISR para SEO / SSR para LPs
- ✅ Sitemap + Robots
- ✅ middleware.ts completo

---

## 🚀 TESTE RÁPIDO - 10 PASSOS

### PASSO 1: Iniciar Backend
```bash
cd backend
npm run develop
```

**Aguardar**: "Strapi started successfully"
**URL**: http://localhost:1337/admin

---

### PASSO 2: Criar Admin (primeira vez)
- Name: Admin
- Email: admin@test.com
- Password: Admin123!

---

### PASSO 3: Configurar Permissões
1. **Settings** > **Roles** > **Public**
2. Marcar para cada Content Type:
   - Product: ✅ find, findOne
   - SEO Page: ✅ find, findOne
   - Landing Page: ✅ find, findOne
   - Global SEO: ✅ find
3. **Save**

---

### PASSO 4: Gerar API Token
1. **Settings** > **API Tokens**
2. **Create new API Token**
3. Name: Frontend
4. Type: Read-only
5. **Save**
6. **COPIAR TOKEN**

---

### PASSO 5: Configurar Frontend
Editar `frontend/.env.local`:
```env
STRAPI_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=COLAR_TOKEN_AQUI
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=secret123
```

---

### PASSO 6: Criar Produto
**Content Manager** > **Product** > **Create**

```
Name: Curso Marketing Digital
Short Description: Aprenda marketing do zero
Checkout Base URL: https://pay.hotmart.com/ABC123
Price: 197
Currency: BRL
Is Active: ✅
```

**Save** > **Publish**

---

### PASSO 7: Criar Landing Page
**Content Manager** > **Landing Page** > **Create**

**Dados Básicos**:
```
Title: Curso Marketing - Taboola
Slug: curso-marketing-taboola
Product: Curso Marketing Digital
```

**Filtro**:
```
Filter Enabled: ✅
Filter Access Code: tb2026
Filter Access Param: xyz
Filter Required Sources: ["taboola"]
Filter Required Params: ["tblci"]
```

**Body Sections** - Adicionar:

**1. Hero Section**:
```
Headline: Domine Marketing Digital
Sub Headline: Método completo para iniciantes
CTA Text: QUERO COMEÇAR AGORA
```

**2. Benefits Grid**:
```
Headline: O que você vai aprender
Items (3):
  - Label: SEO | Description: Ranqueamento Google
  - Label: Tráfego Pago | Description: Campanhas lucrativas
  - Label: Copywriting | Description: Textos que vendem
```

**3. Offer Stack**:
```
Headline: O Que Você Recebe
Actual Price: R$ 197
CTA Text: GARANTIR VAGA
```

**Save** > **Publish**

---

### PASSO 8: Iniciar Frontend
```bash
cd frontend
npm run dev
```

**Aguardar**: "Ready in..."

---

### PASSO 9: Testar LP VÁLIDA ✅

Abrir em **modo anônimo** (Ctrl+Shift+N):

```
http://localhost:3000/lp/curso-marketing-taboola?xyz=tb2026&utm_source=taboola&tblci=test123
```

**Deve aparecer**:
- ✅ Hero com headline
- ✅ Benefits grid (3 cards)
- ✅ Offer stack com preço
- ✅ Botões "QUERO COMEÇAR AGORA"

**Abrir DevTools (F12) > Console**:
```javascript
// Verificar DataLayer
window.dataLayer
// Deve ter: [{ event: 'page_view', page_type: 'lp', ... }]
```

---

### PASSO 10: Testar CTA → Checkout

1. Clicar botão "QUERO COMEÇAR AGORA"
2. **Console deve mostrar**:
   ```
   { event: 'click_checkout', product_name: 'Curso Marketing Digital', ... }
   ```
3. **Deve redirecionar para**:
   ```
   https://pay.hotmart.com/ABC123?utm_source=taboola&...&tblci=test123&src=lp_curso-marketing-taboola&ref=curso-marketing-digital
   ```

**Verificar URL tem**:
- ✅ utm_source=taboola
- ✅ tblci=test123 (preservado!)
- ✅ src=lp_curso-marketing-taboola
- ✅ ref=curso-marketing-digital

---

## 🧪 TESTES ADICIONAIS

### Teste LP BLOQUEADA ❌

**Sem código**:
```
http://localhost:3000/lp/curso-marketing-taboola
```
**Esperado**: Redireciona para `/blocked` ✅

**Código errado**:
```
http://localhost:3000/lp/curso-marketing-taboola?xyz=errado&utm_source=taboola&tblci=test
```
**Esperado**: Redireciona para `/blocked` ✅

**Origem errada**:
```
http://localhost:3000/lp/curso-marketing-taboola?xyz=tb2026&utm_source=google&tblci=test
```
**Esperado**: Redireciona para `/blocked` ✅

---

### Teste FloatingCta 📱

1. Abrir LP válida
2. Scroll para baixo
3. **Deve aparecer** botão fixo no bottom (apenas mobile/tablet)

---

### Teste ExitIntent Popup 🎁

**Desktop**:
1. Abrir LP válida
2. Mover mouse para fora da janela (topo)
3. **Deve aparecer** popup com oferta

**Mobile**:
1. Abrir LP válida
2. Aguardar 30 segundos sem clicar
3. **Deve aparecer** popup

---

### Teste Página SEO 📄

```
http://localhost:3000/curso-marketing-digital
```

**Deve aparecer**:
- ✅ Título do produto
- ✅ Descrição
- ✅ Botão "Ver Detalhes"

---

### Teste Sitemap 🗺️

```
http://localhost:3000/sitemap.xml
```

**Deve conter**:
- ✅ /curso-marketing-digital
- ❌ NÃO deve ter /lp/curso-marketing-taboola

---

### Teste Robots.txt 🤖

```
http://localhost:3000/robots.txt
```

**Deve ter**:
```
Disallow: /lp/
Disallow: /api/
Sitemap: http://localhost:3000/sitemap.xml
```

---

## ✅ CHECKLIST DE SUCESSO

Se todos estes funcionaram, **SISTEMA 100% OPERACIONAL**:

- [  ] LP válida carrega
- [  ] LP bloqueada redireciona
- [  ] DataLayer push page_view
- [  ] CTA dispara click_checkout
- [  ] Redirect preserva UTMs + click IDs
- [  ] Floating CTA aparece no scroll
- [  ] Exit popup funciona
- [  ] Página produto carrega
- [  ] Sitemap correto
- [  ] Robots correto

---

## 🐛 PROBLEMAS COMUNS

### "Failed to fetch"
- ✅ Strapi rodando?
- ✅ Token correto no .env.local?

### LP sempre bloqueia
- ✅ URL tem TODOS os parâmetros?
- ✅ Código correto (tb2026)?
- ✅ utm_source=taboola?
- ✅ tblci presente?

### CTA não redireciona
- ✅ Checkout URL configurada no produto?
- ✅ Erros no console?

### DataLayer vazio
- ✅ Abrir console e digitar: `window.dataLayer`

---

## 📊 LOGS ÚTEIS

### Terminal Frontend (`npm run dev`):
```
[FILTER] Bot blocked: slug
[FILTER] Access code mismatch: slug
```

### Terminal Backend (`npm run develop`):
```
[info] GET /api/landing-pages?filters[slug]...
```

---

## 🎉 PRONTO PARA TESTAR!

**Agora é só seguir os 10 passos acima!**

Qualquer problema, verificar:
1. Ambos servidores rodando
2. Token configurado
3. Conteúdo publicado (não só saved)
4. URL completa com todos parâmetros

---

**Vamos testar juntos! 🚀**
