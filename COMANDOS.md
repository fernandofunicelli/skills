# Comandos Rápidos e Snippets Úteis

## 🚀 Desenvolvimento

### Backend (Strapi)
```bash
cd backend

# Desenvolvimento
npm run develop          # Inicia em http://localhost:1337

# Build para produção
npm run build
npm run start

# Criar admin user via CLI
npm run strapi admin:create-user

# Reset admin password
npm run strapi admin:reset-user-password
```

### Frontend (Next.js)
```bash
cd frontend

# Desenvolvimento
npm run dev              # Inicia em http://localhost:3000

# Build para produção
npm run build
npm run start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

---

## 📦 Instalação de Dependências Adicionais

### Se precisar instalar posteriormente:
```bash
cd frontend

# Análise de bundle
npm install -D @next/bundle-analyzer

# Ícones adicionais
npm install lucide-react

# Date utils (se necessário)
npm install date-fns

# Animation utils (se necessário)
npm install react-intersection-observer
```

---

## 🎨 Snippets de Componentes

### Button Component (Template)
```typescript
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'urgency' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  pulse?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', pulse, fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            // Variants
            'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500 shadow-cta hover:shadow-cta-hover':
              variant === 'primary',
            'bg-surface-200 text-surface-900 hover:bg-surface-300 focus-visible:ring-surface-400':
              variant === 'secondary',
            'bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-500 shadow-cta hover:shadow-cta-hover':
              variant === 'urgency',
            'border-2 border-brand-600 text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-500':
              variant === 'outline',
            'text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-500':
              variant === 'ghost',
            // Sizes
            'px-4 py-2 text-body-sm rounded-button': size === 'sm',
            'px-6 py-3 text-body rounded-button': size === 'md',
            'px-8 py-4 text-body-lg rounded-button': size === 'lg',
            'px-10 py-5 text-h3 rounded-button': size === 'xl',
            // Pulse
            'animate-pulse-cta': pulse,
            // Full width
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

### Card Component (Template)
```typescript
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-card p-6 shadow-card',
        hover && 'transition-shadow duration-200 hover:shadow-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

### Fetch do Strapi (Template)
```typescript
// lib/strapi.ts

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchStrapi(endpoint: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      ...options.headers,
    },
    next: {
      tags: options.next?.tags || [endpoint],
      revalidate: options.next?.revalidate ?? 3600,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getGlobalSeo() {
  return fetchStrapi('/global-seo?populate=deep');
}

export async function getProducts() {
  return fetchStrapi('/products?populate=deep&filters[is_active][$eq]=true');
}

export async function getProductBySlug(slug: string) {
  return fetchStrapi(
    `/products?populate=deep&filters[slug][$eq]=${slug}&filters[is_active][$eq]=true`
  );
}

export async function getSeoPage(slug: string, productSlug?: string) {
  let query = `/seo-pages?populate=deep&filters[slug][$eq]=${slug}`;
  if (productSlug) {
    query += `&filters[product][slug][$eq]=${productSlug}`;
  }
  return fetchStrapi(query);
}

export async function getLandingPage(slug: string) {
  return fetchStrapi(
    `/landing-pages?populate=deep&filters[slug][$eq]=${slug}`,
    { next: { revalidate: 0 } } // No cache for LPs
  );
}
```

---

## 🔄 Git Workflow

```bash
# Inicializar Git (se ainda não estiver)
git init
git add .
git commit -m "feat: implementação base do ecossistema de vendas v3"

# Criar branches para cada fase
git checkout -b feature/lib-files
git checkout -b feature/ui-components
git checkout -b feature/lp-components
git checkout -b feature/pages-routes
git checkout -b feature/middleware-filter

# Merge após completar cada fase
git checkout main
git merge feature/lib-files
```

---

## 🔍 Debug e Troubleshooting

### Ver logs do Strapi
```bash
cd backend
npm run develop

# Logs aparecem no terminal
# Erros de componente: reinicie o Strapi
# Erro 403 API: verifique permissões em Settings > Roles > Public
```

### Ver logs do Next.js
```bash
cd frontend
npm run dev

# Build para ver erros de produção
npm run build
```

### Limpar cache
```bash
# Next.js
cd frontend
rm -rf .next
npm run build

# Strapi
cd backend
rm -rf .cache build dist .strapi
npm run build
```

---

## 🧪 Testing

### Testar filtro de LP
```bash
# URL válida (passar filtro)
http://localhost:3000/lp/curso-mkt-taboola?xyz=tb2026jan&utm_source=taboola&tblci=123456

# URL inválida (bloqueada)
http://localhost:3000/lp/curso-mkt-taboola
http://localhost:3000/lp/curso-mkt-taboola?xyz=codigo-errado
http://localhost:3000/lp/curso-mkt-taboola?utm_source=google
```

### Testar tracking (DevTools Console)
```javascript
// Verificar DataLayer
console.log(window.dataLayer);

// Verificar GTM
console.log(google_tag_manager);

// Verificar Meta Pixel
console.log(fbq);

// Verificar Taboola
console.log(_tfa);
```

### Lighthouse (Performance)
```bash
# Chrome DevTools > Lighthouse
# Ou via CLI
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

---

## 🚢 Deploy

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Configurar variáveis de ambiente no dashboard
# STRAPI_API_URL, STRAPI_API_TOKEN, etc.
```

### Railway (Backend Strapi)
```bash
# Via dashboard Railway:
# 1. New Project > Deploy from GitHub
# 2. Adicionar PostgreSQL
# 3. Configurar variáveis de ambiente
# 4. Deploy automático

# Variáveis necessárias:
# DATABASE_CLIENT=postgres
# DATABASE_HOST=
# DATABASE_PORT=5432
# DATABASE_NAME=
# DATABASE_USERNAME=
# DATABASE_PASSWORD=
# APP_KEYS=
# API_TOKEN_SALT=
# ADMIN_JWT_SECRET=
# JWT_SECRET=
```

### Render (Backend Strapi alternativo)
```bash
# Via dashboard Render:
# 1. New Web Service
# 2. Connect GitHub repo
# 3. Build Command: npm install && npm run build
# 4. Start Command: npm run start
# 5. Adicionar PostgreSQL (New PostgreSQL)
# 6. Configurar env vars
```

---

## 📊 Monitoramento

### Vercel Analytics
```bash
cd frontend
npm install @vercel/analytics

# Em app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Bundle Analyzer
```bash
cd frontend
npm install -D @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({ ... });

# Run
ANALYZE=true npm run build
```

---

## 🎯 Checklist Final

### Backend
- [ ] Strapi rodando sem erros
- [ ] Permissões API configuradas (Public: find, findOne)
- [ ] Webhook configurado
- [ ] Conteúdo de teste inserido (2 produtos, 2 SEO pages, 2 LPs)
- [ ] PostgreSQL configurado (produção)

### Frontend
- [ ] Todas as dependências instaladas
- [ ] .env.local configurado
- [ ] Componentes implementados
- [ ] Páginas criadas
- [ ] Middleware funcionando
- [ ] Sitemap e robots corretos
- [ ] Build sem erros (`npm run build`)

### Tracking
- [ ] GTM ID configurado
- [ ] Google Ads conversion tracking
- [ ] Meta Pixel configurado
- [ ] Taboola Pixel configurado
- [ ] DataLayer recebendo eventos

### SEO
- [ ] Meta tags corretas
- [ ] Schema JSON-LD válido
- [ ] HTML semântico
- [ ] Heading hierarchy OK
- [ ] Core Web Vitals no verde

### Deploy
- [ ] Frontend no Vercel
- [ ] Backend no Railway/Render
- [ ] Variáveis de ambiente configuradas
- [ ] Webhook conectado
- [ ] SSL/HTTPS ativo

---

**Última atualização**: Fevereiro 2026
