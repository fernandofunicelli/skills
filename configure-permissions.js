/**
 * Configurar Permissões Públicas do Strapi
 */

const STRAPI_URL = 'http://localhost:1338';
const ADMIN_EMAIL = 'admin@test.com';
const ADMIN_PASSWORD = 'Admin123!';

async function loginAdmin() {
  const res = await fetch(`${STRAPI_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const data = await res.json();
  return data.data.token;
}

async function enablePublicPermissions(token) {
  console.log('\n🔐 Configurando permissões públicas...\n');

  // APIs e actions que precisam ser habilitados
  const config = [
    { api: 'api::product.product', actions: ['find', 'findOne'] },
    { api: 'api::landing-page.landing-page', actions: ['find', 'findOne'] },
    { api: 'api::seo-page.seo-page', actions: ['find', 'findOne'] },
    { api: 'api::global-seo.global-seo', actions: ['find', 'findOne'] },
  ];

  for (const { api, actions } for of config) {
    for (const action of actions) {
      try {
        // Tentar habilitar permissão via API interna
        const res = await fetch(`${STRAPI_URL}/admin/permissions`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            permissions: [{
              action: `${api}.${action}`,
              enabled: true,
              policy: '',
              role: 2, // Public role ID is usually 2
            }],
          }),
        });

        if (res.ok) {
          console.log(`✅ ${api}.${action} habilitado`);
        }
      } catch (error) {
        // Silenciar erros
      }
    }
  }

  console.log('\n✅ Permissões configuradas (ou já estavam configuradas)\n');
  console.log('💡 Se a API não funcionar, configure manualmente:');
  console.log('   Settings → Users & Permissions → Roles → Public\n');
}

async function testApis() {
  console.log('🧪 Testando APIs públicas...\n');

  const tests = [
    {
      name: 'Products',
      url: '/api/products',
    },
    {
      name: 'Landing Pages',
      url: '/api/landing-pages?populate=deep&filters[slug][$eq]=lp-teste',
    },
    {
      name: 'SEO Pages',
      url: '/api/seo-pages',
    },
  ];

  const results = [];

  for (const test of tests) {
    try {
      const res = await fetch(`${STRAPI_URL}${test.url}`);
      const working = res.ok;
      const status = res.status;

      if (working) {
        const data = await res.json();
        const count = Array.isArray(data.data) ? data.data.length : (data.data ? 1 : 0);
        console.log(`✅ ${test.name}: ${count} registros (${status})`);
        results.push({ name: test.name, ok: true });
      } else {
        console.log(`❌ ${test.name}: HTTP ${status}`);
        results.push({ name: test.name, ok: false });
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.message}`);
      results.push({ name: test.name, ok: false });
    }
  }

  const allOk = results.every(r => r.ok);

  if (!allOk) {
    console.log('\n⚠️  Algumas APIs não estão acessíveis publicamente!');
    console.log('\n📝 Configure manualmente:');
    console.log('   1. Acesse: http://localhost:1338/admin');
    console.log('   2. Settings → Users & Permissions Plugin → Roles');
    console.log('   3. Clique em "Public"');
    console.log('   4. Habilite find e findOne para: Product, Landing-page, Seo-page');
    console.log('   5. Save\n');
  } else {
    console.log('\n✅ Todas as APIs estão funcionando!\n');
  }

  return allOk;
}

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('  ⚙️  CONFIGURANDO PERMISSÕES PÚBLICAS');
  console.log('='.repeat(60) + '\n');

  try {
    const token = await loginAdmin();
    await enablePublicPermissions(token);
    const apisOk = await testApis();

    if (apisOk) {
      console.log('='.repeat(60));
      console.log('  ✅ CONFIGURAÇÃO COMPLETA!');
      console.log('='.repeat(60) + '\n');

      console.log('🎯 TESTE AGORA:\n');
      console.log('   ✅ LP VÁLIDA:');
      console.log('   http://localhost:3000/lp/lp-teste?code=ABC123&utm_source=google\n');
      console.log('   ❌ LP BLOQUEADA:');
      console.log('   http://localhost:3000/lp/lp-teste\n');
      console.log('   📄 SEO PAGE:');
      console.log('   http://localhost:3000/guia-marketing-digital\n');
    } else {
      console.log('='.repeat(60));
      console.log('  ⚠️  CONFIGURE AS PERMISSÕES MANUALMENTE');
      console.log('='.repeat(60) + '\n');
    }

  } catch (error) {
    console.log(`\n❌ Erro: ${error.message}\n`);
    process.exit(1);
  }
}

main();
