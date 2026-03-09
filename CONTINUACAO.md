# Guia de Continuação do Projeto

## ✅ O Que Já Foi Implementado

### Backend (100% estrutura)
- ✅ Strapi v5 com TypeScript
- ✅ 4 componentes compartilhados (Testimonial, FaqItem, TrustBadge, SocialProof)
- ✅ 14 componentes Dynamic Zone para LPs
- ✅ Collection Types: Product, SeoPage, LandingPage (com filtros + tracking)
- ✅ Single Type: GlobalSeo (tracking global)
- ✅ Documentação completa em `backend/SETUP.md`

### Frontend (60% estrutura base)
- ✅ Next.js 14+ com App Router e TypeScript
- ✅ Todas as dependências instaladas
- ✅ Tailwind CSS 3.4 com design system completo
- ✅ Fontes configuradas (Inter + Plus Jakarta Sans)
- ✅ globals.css completo (prose-strapi, animações, utilities)
- ✅ lib/types.ts com todas as interfaces
- ✅ lib/utils.ts com funções utilitárias

## 🎯 Próximos Passos (em ordem)

### PASSO 1: Completar arquivos lib/

#### 1.1 - lib/strapi.ts
```typescript
// Funções para buscar dados do Strapi com cache tags
// Ver briefing seção 7 e 4

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchStrapi(endpoint: string, options = {}) {
  // fetch com cache tags
  // populate=deep para relacionamentos
  // headers com bearer token
}

export async function getGlobalSeo() { ... }
export async function getProducts() { ... }
export async function getProductBySlug(slug: string) { ... }
export async function getSeoPage(slug: string, productSlug?: string) { ... }
export async function getLandingPage(slug: string) { ... }
```

#### 1.2 - lib/checkout.ts
```typescript
// buildCheckoutUrl com UTMs + click IDs passthrough
// Ver briefing seção 5.6

const PASSTHROUGH_PARAMS = [
  'gclid', 'fbclid', 'tblci', 'msclkid', 'ttclid',
  'wbraid', 'gbraid', 'dclid', 'li_fat_id',
];

export function buildCheckoutUrl(
  baseUrl: string,
  lpSlug: string,
  productSlug: string,
  utmParams: Record<string, string>
): string {
  // 1. Começar com checkout_base_url do produto
  // 2. Adicionar UTMs (source, medium, campaign, content, term)
  // 3. Adicionar click IDs (PASSTHROUGH_PARAMS)
  // 4. Adicionar src=lp_{lpSlug}
  // 5. Adicionar ref={productSlug}
  // Retornar URL completa
}
```

#### 1.3 - lib/schema.ts
```typescript
// JSON-LD automático
// Ver briefing seção 8.4

export function generateProductSchema(product: Product) { ... }
export function generateArticleSchema(seoPage: SeoPage) { ... }
export function generateFAQSchema(faqItems: FaqItem[]) { ... }
export function generateBreadcrumbSchema(breadcrumbs: any[]) { ... }
```

#### 1.4 - lib/filter.ts
```typescript
// getFilterConfig para middleware
// Ver briefing seção 4.2

export async function getFilterConfig(lpSlug: string): Promise<FilterConfig | null> {
  // Buscar config de filtro da LP do Strapi
  // Retornar apenas campos filter_*
}
```

#### 1.5 - Criar .env.local
```env
STRAPI_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=seu_token_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=secret_unico
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

### PASSO 2: Componentes UI Primitivos (components/ui/)

Criar 12 componentes essenciais:

#### 2.1 - Button.tsx
```typescript
// Props: variant (primary, secondary, urgency, outline, ghost)
//        size (sm, md, lg, xl)
//        pulse (boolean)
//        fullWidth (boolean)
// Ver briefing seção 3 para estilos de CTA
```

#### 2.2 - Card.tsx
```typescript
// Card com hover effect, shadow-card, shadow-card-hover
```

#### 2.3 - Badge.tsx
```typescript
// Badge com variants (success, danger, accent, brand)
// rounded-badge
```

#### 2.4 - Accordion.tsx
```typescript
// Usar Headless UI <Disclosure>
// Para FAQ sections
```

#### 2.5 - VideoEmbed.tsx
```typescript
// Facade pattern: thumbnail até click
// ZERO iframe/JS até o play
// Ver briefing seção 3.2 bloco 4 (VSL)
```

#### 2.6 - Countdown.tsx
```typescript
// Timer com evergreen ou fixed
// Ver briefing seção 3.2 bloco 8 (Urgency CTA)
```

#### 2.7 - RatingStars.tsx
```typescript
// Estrelas baseado em rating (0-5)
// Lucide icons Star e StarHalf
```

#### 2.8 - ProgressBar.tsx
```typescript
// Barra de progresso para escassez
// Ver briefing seção 3.2 bloco 8
```

#### 2.9 - Skeleton.tsx
```typescript
// Loading skeleton com animate-pulse
// Ver globals.css .skeleton
```

#### 2.10 - Container.tsx
```typescript
// Wrapper com max-width
// Variants: content (72rem), narrow (48rem), wide (84rem)
```

#### 2.11 - SectionWrapper.tsx
```typescript
// Wrapper para seções
// Alterna bg entre white/surface-50
```

#### 2.12 - Divider.tsx
```typescript
// Divisor horizontal/vertical
```

---

### PASSO 3: Componentes de Tracking (components/tracking/)

#### 3.1 - GtmScript.tsx
```typescript
// Componente que injeta GTM no <head>
// Usar next/script strategy='afterInteractive'
// Ver briefing seção 5.3
```

#### 3.2 - DataLayerInit.tsx
```typescript
// Inicializa window.dataLayer
// Injeta evento page_view inicial
// Ver briefing seção 5.4
```

#### 3.3 - PixelScripts.tsx
```typescript
// APENAS para LPs
// Carrega condicionalmente:
// - Google Ads (gtag) se tracking_google_ads_conversion_id
// - Meta Pixel (fbq) se tracking_meta_pixel_id
// - Taboola (_tfa) se tracking_taboola_pixel_id
// - Scripts customizados se tracking_custom_scripts
// Ver briefing seção 5.3
```

---

### PASSO 4: Componentes de Layout (components/layout/)

#### 4.1 - Header.tsx
```typescript
// Header COMPLETO para páginas SEO (main)
// Logo linkado, navegação, mobile menu
// Ver briefing seção 7 e 8.1 (semantic HTML)
```

#### 4.2 - HeaderLp.tsx
```typescript
// Header MINIMALISTA para LPs
// Apenas logo SEM link ou barra de urgência
// Ver briefing seção 3.3
```

#### 4.3 - Footer.tsx
```typescript
// Footer COMPLETO para páginas SEO
// Links, social, copyright
```

#### 4.4 - FooterLp.tsx
```typescript
// Footer MINIMAL para LPs
// Apenas: Empresa | CNPJ | Termos | Privacidade
// ZERO links externos
// Ver briefing seção 3.4
```

#### 4.5 - FloatingCta.tsx
```typescript
// 'use client'
// Botão fixo bottom em mobile (lg:hidden)
// Aparece após scroll 30vh
// Ver briefing seção 3.5
```

#### 4.6 - ExitIntentPopup.tsx
```typescript
// 'use client'
// Popup com exit intent (mouse leave)
// Ou após 30s sem CTA click no mobile
// Ver briefing seção 3.6
```

---

### PASSO 5: Componentes de Conteúdo SEO (components/content/)

#### 5.1 - ProductHero.tsx
```typescript
// Hero para página principal do produto
// Imagem, título H1, descrição, CTAs
```

#### 5.2 - ContentBody.tsx
```typescript
// Renderiza rich text do Strapi
// className="prose-strapi"
```

#### 5.3 - FaqSection.tsx
```typescript
// Lista de FAQ com Accordion
// Gera FAQPage schema se show_faq
```

#### 5.4 - TestimonialGrid.tsx
```typescript
// Grid de depoimentos (3 colunas)
// Foto circular, nome, rating, content
```

#### 5.5 - RelatedPages.tsx
```typescript
// Grid de páginas relacionadas
// Cards com link, imagem, título, excerpt
```

#### 5.6 - BreadcrumbNav.tsx
```typescript
// Breadcrumb com schema automático
// Ver briefing seção 8.4
```

#### 5.7 - SchemaScript.tsx
```typescript
// Injeta JSON-LD no <head>
// Usa lib/schema.ts
```

#### 5.8 - TableOfContents.tsx
```typescript
// TOC gerado automaticamente dos H2/H3
// Sticky sidebar
```

---

### PASSO 6: Componentes LP (components/lp/)

Criar 14 componentes + DynamicZoneRenderer:

#### 6.1 - LpHero.tsx
Ver briefing seção 3.2 bloco 1

#### 6.2 - LpProblem.tsx
Ver briefing seção 3.2 bloco 2

#### 6.3 - LpBenefits.tsx
Ver briefing seção 3.2 bloco 3

#### 6.4 - LpVideo.tsx
Ver briefing seção 3.2 bloco 4

#### 6.5 - LpTestimonials.tsx
Ver briefing seção 3.2 bloco 5

#### 6.6 - LpSocialProof.tsx
Ver briefing seção 3.2 bloco 5

#### 6.7 - LpOfferStack.tsx
Ver briefing seção 3.2 bloco 6

#### 6.8 - LpGuarantee.tsx
Ver briefing seção 3.2 bloco 7

#### 6.9 - LpUrgencyCta.tsx
Ver briefing seção 3.2 bloco 8

#### 6.10 - LpFaq.tsx
Ver briefing seção 3.2 bloco 9

#### 6.11 - LpMediaLogos.tsx
Ver briefing seção 3.2 bloco 5

#### 6.12 - LpContent.tsx
Ver briefing seção 3.7

#### 6.13 - LpComparison.tsx
Ver briefing seção 3.7

#### 6.14 - LpCustomHtml.tsx
Ver briefing seção 3.7

#### 6.15 - DynamicZoneRenderer.tsx
```typescript
// Mapeia __component para React component
// Alterna bg a cada seção
// Renderiza CTA se cta_text preenchido
// Ver briefing seção 3.8
```

#### 6.16 - CtaButton.tsx
```typescript
// 'use client'
// Botão que dispara tracking no click
// Chama buildCheckoutUrl()
// Dispara eventos DataLayer, gtag, fbq, _tfa
// Aguarda 300ms e redireciona
// Ver briefing seção 5.5
```

#### 6.17 - TrafficValidator.tsx
```typescript
// 'use client'
// Validação client-side adicional
// navigator.webdriver, performance.now(), interação
// Ver briefing seção 4.4
```

---

### PASSO 7: Rotas e Páginas

#### 7.1 - Estrutura de pastas
```
app/
├── (main)/
│   ├── layout.tsx           # Header full + Footer full
│   ├── page.tsx             # Home
│   ├── [product-slug]/
│   │   ├── page.tsx         # Página principal produto
│   │   └── [page-slug]/
│   │       └── page.tsx     # Sub-páginas SEO
│   └── blog/
│       └── [blog-slug]/
│           └── page.tsx     # Blog
├── lp/
│   ├── layout.tsx           # Footer minimal + FloatingCta + PixelScripts
│   └── [lp-slug]/
│       └── page.tsx         # LP (SSR)
├── blocked/
│   └── page.tsx
├── api/
│   ├── revalidate/route.ts
│   └── track/route.ts
├── sitemap.ts
├── robots.ts
└── not-found.tsx
```

#### 7.2 - app/(main)/[product-slug]/page.tsx
```typescript
// SSG + ISR
// generateStaticParams() com todos os produtos
// revalidate = 3600
// Busca product do Strapi via getProductBySlug()
// Renderiza ProductHero + content + testimonials + FAQ + related
```

#### 7.3 - app/(main)/[product-slug]/[page-slug]/page.tsx
```typescript
// SSG + ISR
// generateStaticParams() com todas as SEO pages
// Busca seoPage do Strapi
// Renderiza ContentBody + components condicionais
```

#### 7.4 - app/lp/[lp-slug]/page.tsx
```typescript
// SSR, force-dynamic
// Busca landingPage do Strapi
// Renderiza DynamicZoneRenderer
// Usa TrafficValidator
// NO CACHE (cada visita é única por filtro)
```

#### 7.5 - middleware.ts
```typescript
// Edge runtime
// Implementação completa do filtro
// Ver briefing seção 4.2
```

#### 7.6 - app/sitemap.ts
```typescript
// Gera sitemap.xml
// APENAS páginas (main)/
// NUNCA /lp/, /api/
```

#### 7.7 - app/robots.ts
```typescript
// robots.txt
// Disallow: /lp/, /api/, /blocked
```

#### 7.8 - app/api/revalidate/route.ts
```typescript
// Webhook do Strapi
// Valida x-revalidate-secret
// Revalida cache tags
```

---

### PASSO 8: QA e Validação (FASE 5)

#### 8.1 - Testar fluxos
- [ ] Página SEO → Checkout com UTMs preservados
- [ ] LP com filtro válido → passa
- [ ] LP com filtro inválido → bloqueia e redireciona
- [ ] LP Taboola com ?xyz=codigo&utm_source=taboola&tblci=xxx
- [ ] LP Google Ads com gclid
- [ ] LP Meta com fbclid

#### 8.2 - Validar SEO
- [ ] Sitemap correto (só main)
- [ ] robots.txt bloqueia /lp/
- [ ] noindex HTTP header em /lp/*
- [ ] Schema JSON-LD válido (Rich Results Test)
- [ ] HTML semântico (Wave, axe DevTools)
- [ ] Heading hierarchy (H1 único, H2→H3)

#### 8.3 - Performance
- [ ] Lighthouse: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Imagens com next/image, priority na hero
- [ ] Fonts preloaded, zero CLS
- [ ] Video facade pattern (zero iframe até click)

#### 8.4 - Tracking
- [ ] GTM carrega
- [ ] DataLayer recebe page_view
- [ ] Click CTA → dispara click_checkout
- [ ] gtag('event', 'conversion') dispara
- [ ] fbq('track', 'InitiateCheckout') dispara
- [ ] _tfa dispara
- [ ] Click IDs (gclid, fbclid, tblci) passam para checkout URL

#### 8.5 - Multi-produto
- [ ] 2 produtos com checkout URLs diferentes
- [ ] Cada LP aponta para checkout correto
- [ ] UTMs distintos por LP

---

## 📚 Referências Rápidas

- **Briefing completo**: `briefing-ecossistema-vendas-v3-definitivo.txt`
- **Backend setup**: `backend/SETUP.md`
- **Design system**: `frontend/tailwind.config.ts`
- **Types**: `frontend/lib/types.ts`
- **Utils**: `frontend/lib/utils.ts`

---

## 🎯 Ordem de Implementação Recomendada

1. ✅ Backend Strapi (COMPLETO)
2. ✅ Frontend setup (COMPLETO)
3. ⏳ lib/ files (strapi, checkout, schema, filter)
4. ⏳ UI components (Button, Card, Badge, etc.)
5. ⏳ Tracking components
6. ⏳ Layout components
7. ⏳ Content/SEO components
8. ⏳ LP components + DynamicZoneRenderer
9. ⏳ Rotas e páginas
10. ⏳ Middleware
11. ⏳ APIs (revalidate, track)
12. ⏳ QA completo

**Tempo estimado restante**: 6-8 horas de implementação focada

---

**IMPORTANTE**: Sempre consulte o briefing original para detalhes específicos de cada componente!
