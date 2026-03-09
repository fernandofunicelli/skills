# 🚀 Guia de Setup Manual - Ecossistema de Vendas V3

## ✅ Status Atual

- ✅ **Strapi Backend** rodando em http://localhost:1338
- ✅ **Next.js Frontend** rodando em http://localhost:3000
- ✅ **Admin criado**: admin@test.com / Admin123!
- ✅ **Produto de teste** criado no banco

---

## 📋 Checklist de Configuração

### 1️⃣ Configurar Permissões da API (OBRIGATÓRIO)

**Por que?** O frontend precisa acessar os dados do Strapi via API pública.

**Passos:**
1. Abra http://localhost:1338/admin
2. Faça login com: **admin@test.com** / **Admin123!**
3. No menu lateral, clique em **Settings** (⚙️)
4. Clique em **Users & Permissions Plugin** → **Roles**
5. Clique no role **Public**
6. Expanda cada seção e marque as permissões:

   **Product:**
   - ✅ find
   - ✅ findOne

   **Landing-page:**
   - ✅ find
   - ✅ findOne

   **Seo-page:**
   - ✅ find
   - ✅ findOne

   **Global-seo:**
   - ✅ find
   - ✅ findOne

7. Clique em **Save** no canto superior direito

---

### 2️⃣ Criar Produto de Teste

**Nota:** Um produto já foi criado, mas você pode criar mais se quiser.

**Passos:**
1. No menu lateral, clique em **Content Manager**
2. Clique em **Product** → **Create new entry**
3. Preencha os campos:

   ```
   Name: Curso Completo de Marketing Digital
   Slug: curso-marketing-digital
   Description: Aprenda as estratégias mais avançadas de marketing digital...
   Price: 197
   Currency: BRL
   Checkout Base URL: https://pay.hotmart.com/X12345678
   Safe Page Slug: obrigado
   ```

4. Clique em **Save**
5. Clique em **Publish**

---

### 3️⃣ Criar Landing Page de Teste

**Esta é a parte mais importante!**

**Passos:**
1. No **Content Manager**, clique em **Landing-page** → **Create new entry**

2. **Campos Básicos:**
   ```
   Title: Transforme Sua Carreira com Marketing Digital
   Slug: lp-teste
   Product: Selecione "Curso Completo de Marketing Digital"
   ```

3. **Configurações de Filtro:**
   ```
   Filter Enabled: ✅ (marque o checkbox)
   Filter Access Code: ABC123
   Filter Required Sources: google, facebook (separe por vírgula)
   Filter Block Bots: ✅
   Filter Block Empty UA: ✅
   Filter Block Direct: ❌
   ```

4. **Tracking (opcional para teste):**
   ```
   Tracking Google Ads Conversion ID: AW-123456789
   Tracking Meta Pixel ID: 123456789012345
   ```

5. **Exit Popup:**
   ```
   Exit Popup Enabled: ✅
   Exit Popup Headline: 🎁 Espera! Oferta Especial
   Exit Popup Offer Text: Ganhe 20% de desconto agora!
   ```

6. **Floating CTA:**
   ```
   Floating CTA Enabled: ✅
   Floating CTA Text: Quero Garantir Minha Vaga
   Floating CTA Show Price: ✅
   ```

7. **Body Sections (Dynamic Zone):**

   Clique em **Add a component to body sections** e adicione:

   **a) Hero Section (lp.hero-section):**
   ```
   Badge Text: 🔥 Vagas Limitadas
   Headline: Domine o Marketing Digital em 8 Semanas
   Sub Headline: Método comprovado para iniciantes
   Hero Video URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
   CTA Text: Quero Me Inscrever Agora
   Trust Items: (adicione 3-4 badges simples)
   ```

   **b) Problem Agitation (lp.problem-agitation):**
   ```
   Headline: Cansado de Trabalhar Muito e Ganhar Pouco?
   Problems: (adicione 2-3 problemas)
   Agitation Text: Enquanto você hesita, seus concorrentes prosperam...
   ```

   **c) CTA Section (lp.cta-section):**
   ```
   Headline: Comece Sua Transformação Hoje
   Sub Headline: Junte-se a +5.000 alunos
   CTA Text: Sim, Eu Quero Transformar Minha Carreira
   Show Guarantee: ✅
   Guarantee Text: 🛡️ Garantia de 30 dias
   ```

8. Clique em **Save**
9. Clique em **Publish**

---

### 4️⃣ Criar SEO Page de Teste (Opcional)

**Passos:**
1. No **Content Manager**, clique em **Seo-page** → **Create new entry**

2. Preencha:
   ```
   Title: Marketing Digital: Guia Completo 2026
   Slug: guia-marketing-digital
   Product: Selecione o produto
   Meta Title: Marketing Digital: Guia Completo 2026
   Meta Description: Descubra tudo sobre marketing digital...
   Focus Keyword: marketing digital
   Content: (escreva um texto em Markdown)
   ```

3. Adicione FAQs se quiser
4. Save e Publish

---

### 5️⃣ Criar Global SEO (Opcional)

**Passos:**
1. No **Content Manager**, clique em **Global-seo** → **Create new entry**

2. Preencha os campos básicos do site
3. Save e Publish

---

## 🧪 Testar o Sistema

### URLs para Testar:

**✅ Landing Page VÁLIDA (deve carregar):**
```
http://localhost:3000/lp/lp-teste?code=ABC123&utm_source=google
```

**❌ Landing Page BLOQUEADA (deve redirecionar para /blocked):**
```
http://localhost:3000/lp/lp-teste
```
(Sem o código correto)

**📄 SEO Page:**
```
http://localhost:3000/guia-marketing-digital
```

**🏠 Home Page:**
```
http://localhost:3000
```

---

## 🔍 Como Verificar se Está Funcionando

### 1. Teste o Filtro de Tráfego

Abra o navegador em **modo anônimo** e teste:

**Cenário 1: Acesso Válido**
- URL: `http://localhost:3000/lp/lp-teste?code=ABC123&utm_source=google`
- ✅ Deve carregar a landing page normalmente

**Cenário 2: Sem Código de Acesso**
- URL: `http://localhost:3000/lp/lp-teste`
- ❌ Deve redirecionar para `/blocked`

**Cenário 3: Código Errado**
- URL: `http://localhost:3000/lp/lp-teste?code=ERRADO&utm_source=google`
- ❌ Deve redirecionar para `/blocked`

**Cenário 4: Source Não Permitido**
- URL: `http://localhost:3000/lp/lp-teste?code=ABC123&utm_source=bing`
- ❌ Deve redirecionar para `/blocked` (só google e facebook são permitidos)

### 2. Teste o Tracking

Abra o **DevTools** do navegador (F12) e vá na aba **Console**.

Ao acessar a LP válida, você deve ver:
```
DataLayer initialized: {...}
```

Ao clicar no botão CTA, deve ver:
```
DataLayer push: click_checkout
Google Ads conversion fired
Meta Pixel fired
```

### 3. Teste o Exit Intent Popup

- Mova o mouse para fora da página (para cima)
- Deve aparecer um popup com a oferta especial

### 4. Teste o Floating CTA

- Role a página para baixo
- Um botão flutuante deve aparecer na parte inferior (mobile view)

---

## 🐛 Troubleshooting

### Problema: "404 Page Not Found" ao acessar a LP

**Causa:** O frontend não conseguiu buscar os dados do Strapi

**Solução:**
1. Verifique se as permissões públicas estão configuradas (Passo 1️⃣)
2. Verifique se a LP foi publicada (não só salva)
3. Abra a API diretamente para testar:
   ```
   http://localhost:1338/api/landing-pages?populate=deep&filters[slug][$eq]=lp-teste
   ```
   Deve retornar JSON com os dados

### Problema: "Blocked" mesmo com código correto

**Causa:** Filtro mal configurado ou fonte não permitida

**Solução:**
1. Verifique se `filter_enabled` está marcado
2. Verifique se o `utm_source` está na lista `filter_required_sources`
3. Teste temporariamente com `filter_enabled = false` para desabilitar filtros

### Problema: Botões CTA não fazem nada

**Causa:** Produto não vinculado ou checkout URL inválida

**Solução:**
1. Verifique se a LP tem um produto vinculado
2. Verifique se o produto tem `checkout_base_url` preenchida
3. Abra o console do navegador para ver erros

### Problema: Componentes não aparecem

**Causa:** Body sections vazio ou mal configurado

**Solução:**
1. Edite a LP no Strapi
2. Adicione pelo menos 1 componente em **body_sections**
3. Salve e republique

---

## 📊 Estrutura de URLs

```
Frontend Routes:
├── / (home)
├── /[product-slug] (produto SEO)
├── /[product-slug]/[seo-page-slug] (sub-página SEO)
├── /lp/[lp-slug] (landing page com filtros)
├── /blocked (página de acesso negado)
└── /404 (página não encontrada)

Strapi Admin:
└── http://localhost:1338/admin

Strapi API:
└── http://localhost:1338/api/*
```

---

## 🎯 Próximos Passos

Depois de configurar e testar manualmente:

1. ✅ Configure as permissões públicas
2. ✅ Crie pelo menos 1 produto
3. ✅ Crie pelo menos 1 landing page com filtros
4. ✅ Teste todos os cenários de filtro
5. ✅ Teste o tracking no console
6. ✅ Teste o exit intent e floating CTA

Depois que tudo estiver funcionando localmente:

7. 📝 Documente suas configurações personalizadas
8. 🗄️ Prepare para migrar para PostgreSQL de produção
9. 🚀 Configure deploy (Vercel/Netlify para frontend)
10. 🔐 Configure variáveis de ambiente de produção

---

## 💡 Dicas

- **Sempre publique** após salvar conteúdo no Strapi
- Use **modo anônimo** do navegador para testar filtros
- Verifique o **console do navegador** para ver erros e tracking
- Use **DevTools Network** para ver requisições à API
- Para produção, lembre-se de mudar de SQLite para PostgreSQL

---

## 📞 Suporte

Se algo não funcionar:
1. Verifique se o Strapi está rodando (http://localhost:1338/admin)
2. Verifique se o Next.js está rodando (http://localhost:3000)
3. Verifique os logs no terminal de ambos os servidores
4. Verifique o console do navegador (F12)

**Credentials:**
- Email: admin@test.com
- Password: Admin123!

**Portas:**
- Strapi: 1338
- Frontend: 3000

---

✅ **Sistema 100% implementado e pronto para uso!**
