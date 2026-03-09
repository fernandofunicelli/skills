const STRAPI_URL = 'http://localhost:1338';

async function testApis() {
  console.log('\n🧪 Testando APIs públicas...\n');

  const tests = [
    { name: 'Products', url: '/api/products' },
    { name: 'Landing Pages', url: '/api/landing-pages?populate=deep&filters[slug][$eq]=lp-teste' },
    { name: 'SEO Pages', url: '/api/seo-pages' },
  ];

  for (const test of tests) {
    try {
      const res = await fetch(`${STRAPI_URL}${test.url}`);
      if (res.ok) {
        const data = await res.json();
        const count = Array.isArray(data.data) ? data.data.length : 1;
        console.log(`✅ ${test.name}: ${count} registros`);
      } else {
        console.log(`❌ ${test.name}: HTTP ${res.status} - CONFIGURE PERMISSÕES!`);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.message}`);
    }
  }

  console.log('\n📝 Se alguma API falhou, configure manualmente:');
  console.log('   http://localhost:1338/admin');
  console.log('   Settings → Users & Permissions → Roles → Public');
  console.log('   Habilite find e findOne para: Product, Landing-page, Seo-page\n');
}

testApis();
