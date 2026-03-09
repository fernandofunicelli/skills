/**
 * Script de Setup Completo do Strapi
 * Cria admin, configura permissões, popula com dados de teste
 */

const STRAPI_URL = 'http://localhost:1338';

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

// 1. Criar admin user
async function createAdmin() {
  log('\n1️⃣  Criando usuário administrador...', 'blue');

  const adminData = {
    firstname: 'Admin',
    lastname: 'User',
    email: 'admin@test.com',
    password: 'Admin123!',
  };

  try {
    const response = await fetch(`${STRAPI_URL}/admin/register-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) {
      const text = await response.text();
      if (text.includes('already been taken') || text.includes('Admin already exists')) {
        log('   ℹ️  Admin já existe, fazendo login...', 'yellow');
        return await loginAdmin(adminData.email, adminData.password);
      }
      throw new Error(`Failed to create admin: ${response.status} ${text}`);
    }

    const data = await response.json();
    log('   ✅ Admin criado com sucesso!', 'green');
    log(`   📧 Email: ${adminData.email}`, 'green');
    log(`   🔑 Password: ${adminData.password}`, 'green');

    return data.data.token;
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
    throw error;
  }
}

// 2. Login admin
async function loginAdmin(email, password) {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    const data = await response.json();
    log('   ✅ Login realizado com sucesso!', 'green');
    return data.data.token;
  } catch (error) {
    log(`   ❌ Erro no login: ${error.message}`, 'red');
    throw error;
  }
}

// 3. Criar API Token
async function createApiToken(adminToken) {
  log('\n2️⃣  Criando API Token...', 'blue');

  try {
    const response = await fetch(`${STRAPI_URL}/admin/api-tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        name: 'Frontend Token',
        description: 'Token for Next.js frontend',
        type: 'read-only',
        lifespan: null,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to create token: ${response.status} ${text}`);
    }

    const data = await response.json();
    const apiToken = data.data.accessKey;

    log('   ✅ API Token criado!', 'green');
    log(`   🔑 Token: ${apiToken.substring(0, 20)}...`, 'green');

    return apiToken;
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
    throw error;
  }
}

// 4. Configurar permissões públicas
async function configurePublicPermissions(adminToken) {
  log('\n3️⃣  Configurando permissões públicas da API...', 'blue');

  try {
    // Buscar role "Public"
    const rolesResponse = await fetch(`${STRAPI_URL}/admin/users-permissions/roles`, {
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });

    if (!rolesResponse.ok) {
      throw new Error(`Failed to fetch roles: ${rolesResponse.status}`);
    }

    const rolesData = await rolesResponse.json();
    const publicRole = rolesData.data.roles.find(r => r.type === 'public');

    if (!publicRole) {
      throw new Error('Public role not found');
    }

    // Configurar permissões
    const permissions = {
      ...publicRole.permissions,
      'api::product.product': {
        controllers: {
          product: {
            find: { enabled: true },
            findOne: { enabled: true },
          },
        },
      },
      'api::landing-page.landing-page': {
        controllers: {
          'landing-page': {
            find: { enabled: true },
            findOne: { enabled: true },
          },
        },
      },
      'api::seo-page.seo-page': {
        controllers: {
          'seo-page': {
            find: { enabled: true },
            findOne: { enabled: true },
          },
        },
      },
      'api::global-seo.global-seo': {
        controllers: {
          'global-seo': {
            find: { enabled: true },
            findOne: { enabled: true },
          },
        },
      },
    };

    const updateResponse = await fetch(`${STRAPI_URL}/admin/users-permissions/roles/${publicRole.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        name: publicRole.name,
        description: publicRole.description,
        permissions,
      }),
    });

    if (!updateResponse.ok) {
      const text = await updateResponse.text();
      throw new Error(`Failed to update permissions: ${updateResponse.status} ${text}`);
    }

    log('   ✅ Permissões configuradas com sucesso!', 'green');
  } catch (error) {
    log(`   ⚠️  Aviso: ${error.message}`, 'yellow');
    log('   ℹ️  Configure manualmente no admin panel se necessário', 'yellow');
  }
}

// 5. Criar produto de teste
async function createProduct(adminToken) {
  log('\n4️⃣  Criando produto de teste...', 'blue');

  const productData = {
    data: {
      name: 'Curso Completo de Marketing Digital',
      slug: 'curso-marketing-digital',
      description: 'Aprenda as estratégias mais avançadas de marketing digital e transforme sua carreira ou negócio.',
      price: 197.00,
      currency: 'BRL',
      checkout_base_url: 'https://pay.hotmart.com/X12345678',
      safe_page_slug: 'obrigado',
      publishedAt: new Date().toISOString(),
    },
  };

  try {
    const response = await fetch(`${STRAPI_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to create product: ${response.status} ${text}`);
    }

    const data = await response.json();
    log('   ✅ Produto criado com sucesso!', 'green');
    log(`   📦 ID: ${data.data.id} | Slug: ${productData.data.slug}`, 'green');

    return data.data.id;
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
    throw error;
  }
}

// 6. Criar landing page de teste
async function createLandingPage(adminToken, productId) {
  log('\n5️⃣  Criando landing page de teste...', 'blue');

  const lpData = {
    data: {
      title: 'Transforme Sua Carreira com Marketing Digital',
      slug: 'lp-teste',
      product: productId,

      // Configurações de filtro
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
      tracking_taboola_pixel_id: '1234567',

      // Exit popup
      exit_popup_enabled: true,
      exit_popup_headline: '🎁 Espera! Oferta Especial',
      exit_popup_offer_text: 'Ganhe 20% de desconto se comprar agora!',
      exit_popup_discount_code: 'FIQUEAQUI20',

      // Floating CTA
      floating_cta_enabled: true,
      floating_cta_text: 'Quero Garantir Minha Vaga',
      floating_cta_show_price: true,

      // Body sections (Dynamic Zone)
      body_sections: [
        {
          __component: 'lp.hero-section',
          badge_text: '🔥 Vagas Limitadas',
          headline: 'Domine o Marketing Digital em 8 Semanas',
          sub_headline: 'O método comprovado que transformou +5.000 iniciantes em especialistas de alto valor',
          hero_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          cta_text: 'Quero Me Inscrever Agora',
          trust_items: [
            { text: '✓ Acesso Vitalício' },
            { text: '✓ Certificado Reconhecido' },
            { text: '✓ Suporte Exclusivo' },
            { text: '✓ Garantia 30 Dias' },
          ],
        },
        {
          __component: 'lp.problem-agitation',
          headline: 'Cansado de Trabalhar Muito e Ganhar Pouco?',
          problems: [
            'Você passa horas criando conteúdo mas ninguém engaja',
            'Seus anúncios queimam dinheiro sem trazer resultados',
            'Não sabe por onde começar no marketing digital',
            'Vê outros prosperando enquanto você fica para trás',
          ],
          agitation_text: 'Enquanto você hesita, seus concorrentes estão dominando o mercado online. A cada dia que passa, você perde oportunidades valiosas de crescimento.',
          image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
        },
        {
          __component: 'lp.benefits-grid',
          headline: 'O Que Você Vai Aprender',
          benefits: [
            {
              icon: '🎯',
              title: 'Estratégias Avançadas',
              description: 'Táticas comprovadas de tráfego pago e orgânico',
            },
            {
              icon: '💰',
              title: 'Monetização Eficaz',
              description: 'Como transformar audiência em clientes pagantes',
            },
            {
              icon: '📊',
              title: 'Analytics & Métricas',
              description: 'Entenda seus números e otimize resultados',
            },
            {
              icon: '🚀',
              title: 'Automação Inteligente',
              description: 'Escale seu negócio sem trabalhar mais horas',
            },
          ],
        },
        {
          __component: 'lp.testimonials-showcase',
          headline: 'Histórias de Sucesso Reais',
          testimonials: [
            {
              author_name: 'Maria Silva',
              author_role: 'Empreendedora Digital',
              author_photo: 'https://i.pravatar.cc/150?img=1',
              content: 'Em 3 meses aumentei meu faturamento em 340%. Este curso mudou completamente minha vida!',
              rating: 5,
              verified: true,
            },
            {
              author_name: 'João Santos',
              author_role: 'Gestor de Tráfego',
              author_photo: 'https://i.pravatar.cc/150?img=12',
              content: 'Finalmente encontrei um curso que vai direto ao ponto. Valeu cada centavo!',
              rating: 5,
              verified: true,
            },
          ],
        },
        {
          __component: 'lp.countdown-timer',
          headline: '⏰ Oferta Expira Em:',
          timer_type: 'evergreen',
          evergreen_duration_minutes: 30,
          urgency_text: 'Após este tempo, o preço volta para R$ 497',
        },
        {
          __component: 'lp.cta-section',
          headline: 'Comece Sua Transformação Hoje',
          sub_headline: 'Junte-se a +5.000 alunos que já estão transformando suas carreiras',
          cta_text: 'Sim, Eu Quero Transformar Minha Carreira',
          show_guarantee: true,
          guarantee_text: '🛡️ Garantia incondicional de 30 dias. Se não gostar, devolvemos 100% do seu dinheiro.',
        },
      ],

      publishedAt: new Date().toISOString(),
    },
  };

  try {
    const response = await fetch(`${STRAPI_URL}/api/landing-pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify(lpData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to create landing page: ${response.status} ${text}`);
    }

    const data = await response.json();
    log('   ✅ Landing page criada com sucesso!', 'green');
    log(`   🎨 Slug: ${lpData.data.slug}`, 'green');
    log(`   🔒 Código de acesso: ${lpData.data.filter_access_code}`, 'green');

    return data.data.id;
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
    throw error;
  }
}

// 7. Criar SEO page de teste
async function createSeoPage(adminToken, productId) {
  log('\n6️⃣  Criando SEO page de teste...', 'blue');

  const seoPageData = {
    data: {
      title: 'Marketing Digital: Guia Completo 2026',
      slug: 'guia-marketing-digital-2026',
      product: productId,

      // SEO
      meta_title: 'Marketing Digital: Guia Completo 2026 | Aprenda do Zero',
      meta_description: 'Descubra tudo sobre marketing digital em 2026. Guia completo com estratégias, ferramentas e cases de sucesso.',
      focus_keyword: 'marketing digital 2026',

      // Content
      content: `
# Marketing Digital: O Guia Definitivo para 2026

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

O marketing digital é essencial para qualquer negócio que deseja crescer no ambiente online. Comece hoje mesmo sua jornada!
      `,

      // FAQ
      faq_items: [
        {
          question: 'Quanto custa investir em marketing digital?',
          answer: 'O investimento varia conforme seus objetivos. É possível começar com orçamentos pequenos e escalar conforme os resultados aparecem.',
        },
        {
          question: 'Quanto tempo leva para ver resultados?',
          answer: 'Estratégias pagas podem trazer resultados imediatos, enquanto SEO e marketing de conteúdo levam de 3 a 6 meses para mostrar resultados consistentes.',
        },
        {
          question: 'Preciso contratar uma agência?',
          answer: 'Depende do seu tempo e conhecimento. Muitas empresas começam sozinhas e depois contratam profissionais conforme crescem.',
        },
      ],

      publishedAt: new Date().toISOString(),
    },
  };

  try {
    const response = await fetch(`${STRAPI_URL}/api/seo-pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify(seoPageData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to create SEO page: ${response.status} ${text}`);
    }

    const data = await response.json();
    log('   ✅ SEO page criada com sucesso!', 'green');
    log(`   📄 Slug: ${seoPageData.data.slug}`, 'green');

    return data.data.id;
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
    throw error;
  }
}

// 8. Criar Global SEO
async function createGlobalSeo(adminToken) {
  log('\n7️⃣  Configurando Global SEO...', 'blue');

  const globalSeoData = {
    data: {
      site_name: 'Ecossistema de Vendas V3',
      site_description: 'Plataforma completa de cursos e produtos digitais',
      default_meta_title: 'Ecossistema de Vendas - Transforme Seu Conhecimento em Renda',
      default_meta_description: 'Descubra os melhores cursos e produtos digitais para alavancar sua carreira e negócio.',

      // Social
      og_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
      twitter_handle: '@ecossistema',

      // Schema
      organization_name: 'Ecossistema Digital Ltda',
      organization_logo: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400',

      // Tracking
      gtm_container_id: 'GTM-XXXXXXX',
      google_analytics_id: 'G-XXXXXXXXXX',
      google_site_verification: 'abc123xyz',

      publishedAt: new Date().toISOString(),
    },
  };

  try {
    const response = await fetch(`${STRAPI_URL}/api/global-seo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify(globalSeoData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to create global SEO: ${response.status} ${text}`);
    }

    const data = await response.json();
    log('   ✅ Global SEO configurado com sucesso!', 'green');

    return data.data.id;
  } catch (error) {
    log(`   ❌ Erro: ${error.message}`, 'red');
    throw error;
  }
}

// 9. Atualizar .env.local do frontend
async function updateFrontendEnv(apiToken) {
  log('\n8️⃣  Atualizando variáveis de ambiente do frontend...', 'blue');

  const fs = require('fs');
  const path = require('path');

  const envContent = `# Strapi API
NEXT_PUBLIC_STRAPI_URL=http://localhost:1338
STRAPI_API_TOKEN=${apiToken}

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
`;

  const envPath = path.join(__dirname, 'frontend', '.env.local');

  try {
    fs.writeFileSync(envPath, envContent);
    log('   ✅ Arquivo .env.local atualizado!', 'green');
  } catch (error) {
    log(`   ❌ Erro ao atualizar .env.local: ${error.message}`, 'red');
    throw error;
  }
}

// Main
async function main() {
  log('\n🚀 INICIANDO SETUP COMPLETO DO STRAPI\n', 'blue');
  log('═══════════════════════════════════════════════════════════\n', 'blue');

  try {
    // 1. Criar/Login Admin
    const adminToken = await createAdmin();

    // 2. Criar API Token
    const apiToken = await createApiToken(adminToken);

    // 3. Configurar permissões
    await configurePublicPermissions(adminToken);

    // 4. Criar produto
    const productId = await createProduct(adminToken);

    // 5. Criar landing page
    const lpId = await createLandingPage(adminToken, productId);

    // 6. Criar SEO page
    const seoPageId = await createSeoPage(adminToken, productId);

    // 7. Criar Global SEO
    const globalSeoId = await createGlobalSeo(adminToken);

    // 8. Atualizar frontend .env
    await updateFrontendEnv(apiToken);

    log('\n═══════════════════════════════════════════════════════════\n', 'green');
    log('✅ SETUP COMPLETO FINALIZADO COM SUCESSO!\n', 'green');

    log('📋 RESUMO:', 'blue');
    log(`   • Admin: admin@test.com / Admin123!`);
    log(`   • Product ID: ${productId}`);
    log(`   • Landing Page ID: ${lpId} (slug: lp-teste)`);
    log(`   • SEO Page ID: ${seoPageId} (slug: guia-marketing-digital-2026)`);
    log(`   • Global SEO ID: ${globalSeoId}`);

    log('\n🔗 URLS PARA TESTAR:', 'blue');
    log(`   • Strapi Admin: http://localhost:1338/admin`);
    log(`   • LP (com filtro): http://localhost:3000/lp/lp-teste?code=ABC123&utm_source=google`);
    log(`   • LP (bloqueada): http://localhost:3000/lp/lp-teste`);
    log(`   • SEO Page: http://localhost:3000/guia-marketing-digital-2026`);
    log(`   • Home: http://localhost:3000`);

    log('\n🎯 PRÓXIMOS PASSOS:', 'blue');
    log('   1. Reinicie o frontend: Ctrl+C e npm run dev');
    log('   2. Acesse as URLs acima para testar');
    log('   3. Verifique o tracking no console do navegador');
    log('   4. Teste os filtros e redirecionamentos');

    log('\n═══════════════════════════════════════════════════════════\n', 'green');

  } catch (error) {
    log('\n═══════════════════════════════════════════════════════════\n', 'red');
    log(`❌ ERRO NO SETUP: ${error.message}\n`, 'red');
    log('Verifique se o Strapi está rodando em http://localhost:1338\n', 'yellow');
    process.exit(1);
  }
}

// Executar
main();
