/**
 * Script para Popular o Strapi com Dados de Teste
 * Usa a API do Admin diretamente
 */

const STRAPI_URL = 'http://localhost:1338';
const ADMIN_EMAIL = 'admin@test.com';
const ADMIN_PASSWORD = 'Admin123!';

// Cores para output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Login admin
async function loginAdmin() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data.token;
  } catch (error) {
    throw new Error(`Login error: ${error.message}`);
  }
}

// Criar produto
async function createProduct(adminToken) {
  log('\n📦 Criando produto de teste...', 'blue');

  const productData = {
    name: 'Curso Completo de Marketing Digital',
    slug: 'curso-marketing-digital',
    description: 'Aprenda as estratégias mais avançadas de marketing digital e transforme sua carreira ou negócio.',
    price: 197.00,
    currency: 'BRL',
    checkout_base_url: 'https://pay.hotmart.com/X12345678',
    safe_page_slug: 'obrigado',
    publishedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::product.product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status}: ${text.substring(0, 200)}`);
    }

    const data = await response.json();
    log(`   ✅ Produto criado! ID: ${data.id}`, 'green');
    return data.id;
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
    throw error;
  }
}

// Criar landing page
async function createLandingPage(adminToken, productId) {
  log('\n🎨 Criando landing page...', 'blue');

  const lpData = {
    title: 'Transforme Sua Carreira com Marketing Digital',
    slug: 'lp-teste',
    product: productId,

    filter_enabled: true,
    filter_access_code: 'ABC123',
    filter_required_sources: ['google', 'facebook'],
    filter_block_bots: true,
    filter_block_empty_ua: true,
    filter_block_direct: false,

    tracking_google_ads_conversion_id: 'AW-123456789',
    tracking_google_ads_conversion_label: 'abcd1234',
    tracking_meta_pixel_id: '123456789012345',
    tracking_taboola_pixel_id: '1234567',

    exit_popup_enabled: true,
    exit_popup_headline: '🎁 Espera! Oferta Especial',
    exit_popup_offer_text: 'Ganhe 20% de desconto se comprar agora!',
    exit_popup_discount_code: 'FIQUEAQUI20',

    floating_cta_enabled: true,
    floating_cta_text: 'Quero Garantir Minha Vaga',
    floating_cta_show_price: true,

    body_sections: [
      {
        __component: 'lp.hero-section',
        badge_text: '🔥 Vagas Limitadas',
        headline: 'Domine o Marketing Digital em 8 Semanas',
        sub_headline: 'O método comprovado que transformou +5.000 iniciantes em especialistas',
        hero_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        cta_text: 'Quero Me Inscrever Agora',
        trust_items: [
          { __component: 'shared.trust-badge', text: 'Acesso Vitalício' },
          { __component: 'shared.trust-badge', text: 'Certificado Reconhecido' },
          { __component: 'shared.trust-badge', text: 'Suporte Exclusivo' },
          { __component: 'shared.trust-badge', text: 'Garantia 30 Dias' },
        ],
      },
      {
        __component: 'lp.problem-agitation',
        headline: 'Cansado de Trabalhar Muito e Ganhar Pouco?',
        problems: ['Você passa horas criando conteúdo mas ninguém engaja', 'Seus anúncios queimam dinheiro sem trazer resultados'],
        agitation_text: 'Enquanto você hesita, seus concorrentes estão dominando o mercado.',
        image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
      },
      {
        __component: 'lp.cta-section',
        headline: 'Comece Sua Transformação Hoje',
        sub_headline: 'Junte-se a +5.000 alunos transformando suas carreiras',
        cta_text: 'Sim, Eu Quero Transformar Minha Carreira',
        show_guarantee: true,
        guarantee_text: '🛡️ Garantia de 30 dias',
      },
    ],

    publishedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::landing-page.landing-page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify(lpData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status}: ${text.substring(0, 200)}`);
    }

    const data = await response.json();
    log(`   ✅ Landing Page criada! ID: ${data.id}`, 'green');
    log(`   🔒 Código de acesso: ABC123`, 'green');
    return data.id;
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
    throw error;
  }
}

// Criar SEO page
async function createSeoPage(adminToken, productId) {
  log('\n📄 Criando SEO page...', 'blue');

  const seoPageData = {
    title: 'Marketing Digital: Guia Completo 2026',
    slug: 'guia-marketing-digital-2026',
    product: productId,

    meta_title: 'Marketing Digital: Guia Completo 2026',
    meta_description: 'Descubra tudo sobre marketing digital em 2026. Guia completo com estratégias.',
    focus_keyword: 'marketing digital',

    content: `# Marketing Digital: Guia 2026\n\nO marketing digital revolucionou como empresas se conectam com clientes.\n\n## O Que é Marketing Digital?\n\nMarketing digital é o conjunto de estratégias executadas nos meios digitais.`,

    faq_items: [
      {
        __component: 'shared.faq-item',
        question: 'Quanto custa marketing digital?',
        answer: 'Varia conforme objetivos. Possível começar com orçamentos pequenos.',
      },
      {
        __component: 'shared.faq-item',
        question: 'Quanto tempo para resultados?',
        answer: 'Tráfego pago: imediato. SEO: 3-6 meses.',
      },
    ],

    publishedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::seo-page.seo-page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify(seoPageData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status}: ${text.substring(0, 200)}`);
    }

    const data = await response.json();
    log(`   ✅ SEO Page criada! ID: ${data.id}`, 'green');
    return data.id;
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
    throw error;
  }
}

// Criar Global SEO
async function createGlobalSeo(adminToken) {
  log('\n🌐 Criando Global SEO...', 'blue');

  const globalSeoData = {
    site_name: 'Ecossistema de Vendas V3',
    site_description: 'Plataforma completa de produtos digitais',
    default_meta_title: 'Ecossistema de Vendas',
    default_meta_description: 'Os melhores cursos e produtos digitais',

    og_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    twitter_handle: '@ecossistema',

    organization_name: 'Ecossistema Digital',
    organization_logo: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400',

    gtm_container_id: 'GTM-XXXXXXX',
    google_analytics_id: 'G-XXXXXXXXXX',

    publishedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::global-seo.global-seo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify(globalSeoData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status}: ${text.substring(0, 200)}`);
    }

    const data = await response.json();
    log(`   ✅ Global SEO criado! ID: ${data.id}`, 'green');
    return data.id;
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
    throw error;
  }
}

// Atualizar .env.local
function updateFrontendEnv() {
  log('\n⚙️  Atualizando .env.local...', 'blue');

  const fs = require('fs');
  const path = require('path');

  const envContent = `# Strapi API
NEXT_PUBLIC_STRAPI_URL=http://localhost:1338
STRAPI_API_TOKEN=placeholder-configure-manually

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
`;

  const envPath = path.join(__dirname, 'frontend', '.env.local');

  try {
    fs.writeFileSync(envPath, envContent);
    log('   ✅ .env.local atualizado!', 'green');
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
  }
}

// Main
async function main() {
  log('\n🚀 POPULANDO STRAPI COM DADOS DE TESTE\n', 'blue');
  log('═══════════════════════════════════════════', 'blue');

  try {
    log('\n🔐 Fazendo login como admin...', 'blue');
    const adminToken = await loginAdmin();
    log('   ✅ Login realizado!', 'green');

    const productId = await createProduct(adminToken);
    const lpId = await createLandingPage(adminToken, productId);
    const seoPageId = await createSeoPage(adminToken, productId);
    const globalSeoId = await createGlobalSeo(adminToken);

    updateFrontendEnv();

    log('\n═══════════════════════════════════════════', 'green');
    log('✅ DADOS CRIADOS COM SUCESSO!\n', 'green');

    log('📋 IDs Criados:', 'blue');
    log(`   • Produto: ${productId}`);
    log(`   • Landing Page: ${lpId}`);
    log(`   • SEO Page: ${seoPageId}`);
    log(`   • Global SEO: ${globalSeoId}`);

    log('\n🔗 URLs para Testar:', 'blue');
    log(`   • LP Válida: http://localhost:3000/lp/lp-teste?code=ABC123&utm_source=google`);
    log(`   • LP Bloqueada: http://localhost:3000/lp/lp-teste`);
    log(`   • SEO Page: http://localhost:3000/guia-marketing-digital-2026`);
    log(`   • Home: http://localhost:3000`);

    log('\n🎯 Configure as Permissões:', 'yellow');
    log('   1. Acesse: http://localhost:1338/admin', 'yellow');
    log('   2. Settings → Users & Permissions → Roles → Public', 'yellow');
    log('   3. Habilite find/findOne para: Product, Landing-page, Seo-page, Global-seo', 'yellow');

    log('\n═══════════════════════════════════════════\n', 'green');

  } catch (error) {
    log('\n═══════════════════════════════════════════', 'red');
    log(`❌ ERRO: ${error.message}\n`, 'red');
    process.exit(1);
  }
}

main();
