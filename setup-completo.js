/**
 * Setup Completo Automatizado - Ecossistema V3
 * Configura permissões e cria todos os dados de teste
 */

const STRAPI_URL = 'http://localhost:1338';
const ADMIN_EMAIL = 'admin@test.com';
const ADMIN_PASSWORD = 'Admin123!';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

async function loginAdmin() {
  const res = await fetch(`${STRAPI_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  return data.data.token;
}

// Configurar permissões públicas via settings
async function configurePermissions(token) {
  log('\n🔐 Configurando permissões públicas...', 'blue');

  try {
    // Buscar todas as permissions
    const res = await fetch(`${STRAPI_URL}/admin/permissions?pageSize=1000`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!res.ok) {
      log('   ⚠️  Não foi possível configurar permissões automaticamente', 'yellow');
      log('   📝 Configure manualmente no admin panel', 'yellow');
      return;
    }

    const data = await res.json();
    const publicPermissions = data.data.filter(p => p.role.type === 'public');

    // APIs que precisam de permissão find e findOne
    const apisToEnable = ['product', 'landing-page', 'seo-page', 'global-seo'];
    const actionsToEnable = ['find', 'findOne'];

    const permissionsToUpdate = [];

    for (const apiName of apisToEnable) {
      for (const action of actionsToEnable) {
        const perm = publicPermissions.find(p =>
          p.action.includes(apiName) && p.action.includes(action)
        );
        if (perm && !perm.enabled) {
          permissionsToUpdate.push({ ...perm, enabled: true });
        }
      }
    }

    // Atualizar permissões em batch
    if (permissionsToUpdate.length > 0) {
      const updateRes = await fetch(`${STRAPI_URL}/admin/permissions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ permissions: permissionsToUpdate }),
      });

      if (updateRes.ok) {
        log(`   ✅ ${permissionsToUpdate.length} permissões configuradas!`, 'green');
      } else {
        log('   ⚠️  Algumas permissões não foram atualizadas', 'yellow');
      }
    } else {
      log('   ✅ Permissões já estão configuradas!', 'green');
    }

  } catch (error) {
    log(`   ⚠️  ${error.message}`, 'yellow');
    log('   📝 Configure manualmente: Settings → Roles → Public', 'yellow');
  }
}

// Criar produto
async function createProduct(token) {
  log('\n📦 Criando produto...', 'blue');

  const data = {
    name: 'Curso Completo de Marketing Digital',
    slug: 'curso-marketing-digital',
    description: 'Aprenda as estratégias mais avançadas de marketing digital e transforme sua carreira ou negócio. Método comprovado por +5.000 alunos.',
    price: 197.00,
    currency: 'BRL',
    checkout_base_url: 'https://pay.hotmart.com/X12345678',
    safe_page_slug: 'obrigado',
    publishedAt: new Date().toISOString(),
  };

  const res = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::product.product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Produto: ${text.substring(0, 100)}`);
  }

  const result = await res.json();
  const id = result.id || result.data?.id || result.documentId;
  log(`   ✅ Produto criado! ID: ${id}`, 'green');
  return id;
}

// Criar landing page SIMPLES (sem componentes complexos)
async function createLandingPageSimple(token, productId) {
  log('\n🎨 Criando landing page...', 'blue');

  const data = {
    title: 'Transforme Sua Carreira com Marketing Digital',
    slug: 'lp-teste',
    product: productId,

    // Filtros
    filter_enabled: true,
    filter_access_code: 'ABC123',
    filter_required_sources: ['google', 'facebook'],
    filter_block_bots: true,
    filter_block_empty_ua: true,
    filter_block_direct: false,

    // Tracking
    tracking_google_ads_conversion_id: 'AW-123456789',
    tracking_google_ads_conversion_label: 'abcd1234',
    tracking_meta_pixel_id: '123456789012345',

    // Exit popup
    exit_popup_enabled: true,
    exit_popup_headline: '🎁 Espera! Oferta Especial',
    exit_popup_offer_text: 'Ganhe 20% de desconto se comprar agora!',
    exit_popup_discount_code: 'FIQUEAQUI20',

    // Floating CTA
    floating_cta_enabled: true,
    floating_cta_text: 'Quero Garantir Minha Vaga',
    floating_cta_show_price: true,

    // Body sections - VAZIO para evitar erros de validação
    body_sections: [],

    publishedAt: new Date().toISOString(),
  };

  const res = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::landing-page.landing-page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Landing Page: ${text.substring(0, 200)}`);
  }

  const result = await res.json();
  const id = result.id || result.data?.id || result.documentId;
  log(`   ✅ Landing Page criada! ID: ${id}`, 'green');
  log(`   🔒 Código de acesso: ABC123`, 'cyan');
  log(`   📋 Sources permitidos: google, facebook`, 'cyan');
  return id;
}

// Criar SEO page
async function createSeoPage(token, productId) {
  log('\n📄 Criando SEO page...', 'blue');

  const data = {
    title: 'Marketing Digital: Guia Completo 2026',
    slug: 'guia-marketing-digital',
    product: productId,

    meta_title: 'Marketing Digital: Guia Completo 2026 | Aprenda do Zero',
    meta_description: 'Descubra tudo sobre marketing digital em 2026. Guia completo com estratégias, ferramentas e cases de sucesso para você dominar o mercado online.',
    focus_keyword: 'marketing digital',

    content: `# Marketing Digital: O Guia Definitivo para 2026

O marketing digital revolucionou a forma como as empresas se conectam com seus clientes. Neste guia completo, você vai aprender tudo sobre as estratégias mais eficazes.

## O Que é Marketing Digital?

Marketing digital é o conjunto de estratégias e ações de marketing executadas nos meios digitais. Diferente do marketing tradicional, ele permite mensuração precisa de resultados e segmentação avançada do público.

## Por Que Investir em Marketing Digital?

- **ROI Mensurável**: Acompanhe cada centavo investido
- **Alcance Global**: Atinja clientes em qualquer lugar do mundo
- **Segmentação Precisa**: Fale exatamente com quem importa
- **Custo-Benefício**: Muito mais acessível que mídia tradicional

## Principais Estratégias de Marketing Digital

### 1. SEO (Search Engine Optimization)

Otimização para mecanismos de busca é fundamental para ser encontrado organicamente no Google.

### 2. Marketing de Conteúdo

Criar conteúdo relevante que atrai e engaja sua audiência.

### 3. Tráfego Pago

Anúncios no Google, Facebook, Instagram e outras plataformas.

### 4. Email Marketing

Uma das estratégias com melhor ROI do marketing digital.

## Conclusão

O marketing digital é essencial para qualquer negócio que deseja crescer no ambiente online. Comece hoje mesmo sua jornada!`,

    // FAQ items vazio para evitar problemas
    faq_items: [],

    publishedAt: new Date().toISOString(),
  };

  const res = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::seo-page.seo-page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SEO Page: ${text.substring(0, 200)}`);
  }

  const result = await res.json();
  const id = result.id || result.data?.id || result.documentId;
  log(`   ✅ SEO Page criada! ID: ${id}`, 'green');
  return id;
}

// Criar Global SEO
async function createGlobalSeo(token) {
  log('\n🌐 Criando Global SEO...', 'blue');

  const data = {
    site_name: 'Ecossistema de Vendas V3',
    site_description: 'Plataforma completa de cursos e produtos digitais para transformar seu conhecimento em renda',
    default_meta_title: 'Ecossistema de Vendas - Transforme Seu Conhecimento em Renda',
    default_meta_description: 'Descubra os melhores cursos e produtos digitais para alavancar sua carreira e negócio. Conteúdo de qualidade, resultados comprovados.',

    og_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
    twitter_handle: '@ecossistema',

    organization_name: 'Ecossistema Digital Ltda',
    organization_logo: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400',

    gtm_container_id: 'GTM-XXXXXXX',
    google_analytics_id: 'G-XXXXXXXXXX',
    google_site_verification: 'abc123xyz456',

    publishedAt: new Date().toISOString(),
  };

  const res = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::global-seo.global-seo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Global SEO: ${text.substring(0, 200)}`);
  }

  const result = await res.json();
  const id = result.id || result.data?.id || result.documentId;
  log(`   ✅ Global SEO criado! ID: ${id}`, 'green');
  return id;
}

// Testar API pública
async function testPublicApi() {
  log('\n🧪 Testando API pública...', 'blue');

  const tests = [
    { name: 'Products', url: '/api/products' },
    { name: 'Landing Pages', url: '/api/landing-pages?populate=deep&filters[slug][$eq]=lp-teste' },
    { name: 'SEO Pages', url: '/api/seo-pages' },
    { name: 'Global SEO', url: '/api/global-seo' },
  ];

  for (const test of tests) {
    try {
      const res = await fetch(`${STRAPI_URL}${test.url}`);
      if (res.ok) {
        const data = await res.json();
        const count = data.data?.length || (data.data ? 1 : 0);
        log(`   ✅ ${test.name}: ${count} registros`, 'green');
      } else {
        log(`   ❌ ${test.name}: ${res.status}`, 'red');
        log(`   💡 Configure permissões em Settings → Roles → Public`, 'yellow');
      }
    } catch (error) {
      log(`   ❌ ${test.name}: ${error.message}`, 'red');
    }
  }
}

// Atualizar .env.local
function updateEnv() {
  log('\n⚙️  Atualizando .env.local...', 'blue');

  const fs = require('fs');
  const path = require('path');

  const content = `# Strapi API
NEXT_PUBLIC_STRAPI_URL=http://localhost:1338
STRAPI_API_TOKEN=not-required-for-public-api

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
`;

  try {
    fs.writeFileSync(path.join(__dirname, 'frontend', '.env.local'), content);
    log('   ✅ Arquivo atualizado!', 'green');
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
  }
}

// Main
async function main() {
  log('\n' + '='.repeat(60), 'cyan');
  log('  🚀 SETUP COMPLETO AUTOMATIZADO - ECOSSISTEMA V3', 'cyan');
  log('='.repeat(60) + '\n', 'cyan');

  try {
    log('🔐 Fazendo login como admin...', 'blue');
    const token = await loginAdmin();
    log('   ✅ Login realizado!', 'green');

    await configurePermissions(token);

    const productId = await createProduct(token);
    const lpId = await createLandingPageSimple(token, productId);
    const seoPageId = await createSeoPage(token, productId);
    const globalSeoId = await createGlobalSeo(token);

    updateEnv();
    await testPublicApi();

    log('\n' + '='.repeat(60), 'green');
    log('  ✅ SETUP COMPLETO FINALIZADO COM SUCESSO!', 'green');
    log('='.repeat(60) + '\n', 'green');

    log('📋 RESUMO:', 'cyan');
    log(`   • Produto ID: ${productId}`);
    log(`   • Landing Page ID: ${lpId}`);
    log(`   • SEO Page ID: ${seoPageId}`);
    log(`   • Global SEO ID: ${globalSeoId}`);

    log('\n🔗 URLs PARA TESTAR:', 'cyan');
    log('\n   ✅ LP VÁLIDA (deve carregar):', 'green');
    log('   http://localhost:3000/lp/lp-teste?code=ABC123&utm_source=google\n');

    log('   ❌ LP BLOQUEADA (deve redirecionar para /blocked):', 'red');
    log('   http://localhost:3000/lp/lp-teste');
    log('   http://localhost:3000/lp/lp-teste?code=ERRADO&utm_source=google');
    log('   http://localhost:3000/lp/lp-teste?code=ABC123&utm_source=bing\n');

    log('   📄 Outras páginas:', 'blue');
    log('   http://localhost:3000/guia-marketing-digital');
    log('   http://localhost:3000');

    log('\n📝 OBSERVAÇÃO IMPORTANTE:', 'yellow');
    log('   A Landing Page foi criada SEM componentes (body_sections vazio)', 'yellow');
    log('   Para adicionar componentes visuais:', 'yellow');
    log('   1. Acesse: http://localhost:1338/admin', 'yellow');
    log('   2. Vá em Content Manager → Landing-page → lp-teste', 'yellow');
    log('   3. Adicione componentes em "Body Sections"', 'yellow');
    log('   4. Save e Publish', 'yellow');

    log('\n🎯 PRÓXIMO PASSO:', 'cyan');
    log('   Reinicie o frontend para aplicar o novo .env.local:', 'cyan');
    log('   Ctrl+C no terminal do frontend, depois: npm run dev\n');

    log('='.repeat(60) + '\n', 'cyan');

  } catch (error) {
    log('\n' + '='.repeat(60), 'red');
    log(`  ❌ ERRO: ${error.message}`, 'red');
    log('='.repeat(60) + '\n', 'red');
    log('💡 Verifique se o Strapi está rodando em http://localhost:1338\n', 'yellow');
    process.exit(1);
  }
}

main();
