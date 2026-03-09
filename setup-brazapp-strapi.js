/**
 * Script para Popular o Strapi com Dados da Landing Page BrazApp
 * Baseado no layout Stitch V3
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
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

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

async function createProduct(adminToken) {
    log('\n📦 Criando produto BrazApp...', 'blue');

    const productData = {
        name: 'BrazApp Premium',
        slug: 'brazapp-premium',
        description: 'Acesso total a filmes, séries, esportes e canais ao vivo sem travamentos.',
        price: 34.90,
        currency: 'BRL',
        checkout_base_url: 'https://pay.kiwify.com.br/X12345678', // Trocar no futuro
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
            throw new Error(`Create product Error ${response.status}`);
        }

        const data = await response.json();
        log(`   ✅ Produto criado! ID: ${data.id}`, 'green');
        return data.id;
    } catch (error) {
        log(`   ❌ Erro: ${error.message}`, 'red');
        throw error;
    }
}

async function createLandingPage(adminToken, productId) {
    log('\n🎨 Criando landing page BrazApp...', 'blue');

    const lpData = {
        title: 'BrazApp - Tecnologia Hybrid Stream 3.0',
        slug: 'brazapp',
        product: productId,

        filter_enabled: false,
        filter_access_code: 'BRAZ123',
        tracking_google_ads_conversion_id: 'AW-0000000',
        tracking_google_ads_conversion_label: 'abcd1234',

        floating_cta_enabled: true,
        floating_cta_text: 'Assinar BrazApp',

        body_sections: [
            {
                __component: 'lp.hero-section',
                badge_text: 'O Fim das Mensalidades Caras',
                headline: 'Chega de pagar R$500 em faturas de TV. Tenha tudo na palma da sua mão.',
                sub_headline: 'Acesso imediato a filmes, séries, novelas, canais adultos e infantis no seu celular, tablet, TV Box ou Smart TV, sem travar.',
                video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Altere para video real
                cta_text: 'Quero Minha Liberdade',
            },
            {
                __component: 'lp.problem-agitation',
                headline: 'A conta cresceu. O conteúdo não.',
                pain_points: [
                    { label: 'Pagar R$150/mês para assistir apenas 3 canais.' },
                    { label: 'Assinar 4 serviços de streaming diferentes e gastar muito.' },
                    { label: 'TV que trava no meio do jogo do seu time.' },
                    { label: 'Contratos que te prendem por 12 meses.' }
                ],
                transition_text: 'Com o BrazApp, você não passa por isso.',
                cta_text: 'Desbloquear Todo o Conteúdo'
            },
            {
                __component: 'lp.benefits-grid',
                headline: 'Seu pacote completo de entretenimento',
                items: [
                    { label: 'Esportes ao Vivo', description: 'Brasileirão, Champions, UFC sem delay.' },
                    { label: 'Filmes de Cinema', description: 'Lançamentos liberados toda semana.' },
                    { label: 'Séries e Novelas', description: 'Episódios completos no seu tempo.' },
                    { label: 'Infantil Seguro', description: 'Desenhos e canais Kids 24h.' },
                    { label: 'Conteúdo Adulto', description: 'Protegido com senha parental.' },
                    { label: 'Guia de Programação', description: 'Saiba o que está passando (EPG).' }
                ],
                cta_text: 'Escolher Meu Plano'
            },
            {
                __component: 'lp.offer-stack',
                headline: 'Pré-pago. Como deveria ser.',
                items: [
                    { label: 'Premium 1 Mês (Básico)' },
                    { label: 'Mais de 10.000 Canais, Filmes e Séries' },
                    { label: 'Qualidade 4K/FHD' }
                ],
                actual_price: 'R$ 34,90',
                installment_text: 'Ou pague por Pix',
                cta_text: 'Assinar Plano Mensal'
            },
            {
                __component: 'lp.testimonials',
                headline: 'O que dizem os BrazAppers',
                items: [
                    { author_name: 'Carlos Oliveira', content: 'Fácil de instalar na TV Box. Não perco mais nenhum jogo do Flamengo!', rating: 5, badge_text: 'Cliente Verificado' },
                    { author_name: 'Fernanda Lima', content: 'Cancelei minha TV a cabo. Metade do preço e tem muito mais opções para as crianças.', rating: 5, badge_text: 'Cliente Verificado' },
                    { author_name: 'José Ribeiro', content: 'O suporte via WhatsApp me ajudou na mesma hora a colocar na Smart TV LG. Nota 10.', rating: 5, badge_text: 'Cliente Verificado' }
                ]
            },
            {
                __component: 'lp.cta-section',
                headline: 'Você já perdeu dinheiro suficiente.',
                sub_headline: 'Junte-se a milhares de brasileiros que estão economizando.',
                cta_text: 'Assinar Agora e Economizar',
                show_guarantee: true,
                guarantee_text: '7 dias de garantia ou seu dinheiro de volta.'
            }
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
            throw new Error(`Create LP Error ${response.status}`);
        }

        const data = await response.json();
        log(`   ✅ Landing Page criada! ID: ${data.id}`, 'green');
        return data.id;
    } catch (error) {
        log(`   ❌ Erro: ${error.message}`, 'red');
    }
}

async function main() {
    log('\n🚀 POPULANDO STRAPI COM DADOS DA BRAZAPP\n', 'blue');
    try {
        const adminToken = await loginAdmin();
        const productId = await createProduct(adminToken);
        await createLandingPage(adminToken, productId);
        log('\n✅ Script Finalizado!\n', 'green');
    } catch (error) {
        log(`❌ ERRO: ${error.message}\n`, 'red');
    }
}

main();
