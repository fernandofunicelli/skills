import { CollectionConfig, Block } from 'payload'

const HeroBlock: Block = {
    slug: 'hero',
    labels: { singular: 'Seção Hero', plural: 'Seções Hero' },
    fields: [
        { name: 'badge_text', type: 'text' },
        { name: 'headline', type: 'text', required: true },
        { name: 'sub_headline', type: 'text' },
        { name: 'cta_text', type: 'text', defaultValue: 'QUERO COMEÇAR AGORA' },
        { name: 'hero_image', type: 'upload', relationTo: 'media' },
        { name: 'hero_video_url', type: 'text' },
        { name: 'trust_items', type: 'array', fields: [{ name: 'text', type: 'text' }, { name: 'icon', type: 'text' }] },
    ],
}

const ProblemBlock: Block = {
    slug: 'problemAgitation',
    labels: { singular: 'Problema / Agitação', plural: 'Problemas / Agitação' },
    fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'transition_text', type: 'text' },
        { name: 'pain_points', type: 'array', fields: [{ name: 'text', type: 'text' }, { name: 'icon', type: 'text' }] },
    ],
}

const BenefitsBlock: Block = {
    slug: 'benefitsGrid',
    labels: { singular: 'Grid de Benefícios', plural: 'Grids de Benefícios' },
    fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'sub_headline', type: 'text' },
        { name: 'cta_text', type: 'text' },
        { name: 'items', type: 'array', fields: [{ name: 'title', type: 'text' }, { name: 'description', type: 'text' }, { name: 'icon', type: 'text' }] },
    ],
}

const VideoBlock: Block = {
    slug: 'videoSection',
    labels: { singular: 'Seção de Vídeo (VSL)', plural: 'Seções de Vídeo' },
    fields: [
        { name: 'headline', type: 'text' },
        { name: 'video_url', type: 'text', required: true },
        { name: 'thumbnail', type: 'upload', relationTo: 'media' },
        { name: 'description', type: 'text' },
        { name: 'cta_text', type: 'text' },
    ],
}

const TestimonialsBlock: Block = {
    slug: 'testimonials',
    labels: { singular: 'Depoimentos', plural: 'Depoimentos' },
    fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'style', type: 'select', options: ['carousel', 'grid', 'stack'], defaultValue: 'carousel' },
        { name: 'items', type: 'array', fields: [{ name: 'author_name', type: 'text' }, { name: 'author_photo', type: 'upload', relationTo: 'media' }, { name: 'content', type: 'text' }, { name: 'rating', type: 'number' }, { name: 'badge_text', type: 'text' }] },
    ],
}

const SocialProofBlock: Block = {
    slug: 'socialProof',
    labels: { singular: 'Prova Social (Números)', plural: 'Provas Sociais (Números)' },
    fields: [
        { name: 'headline', type: 'text' },
        { name: 'bg_style', type: 'select', options: ['dark', 'brand', 'light'], defaultValue: 'dark' },
        { name: 'metrics', type: 'array', fields: [{ name: 'value', type: 'text' }, { name: 'label', type: 'text' }, { name: 'icon', type: 'text' }] },
    ],
}

const OfferBlock: Block = {
    slug: 'offerStack',
    labels: { singular: 'Seção Oferta/Checkout', plural: 'Seções Oferta/Checkout' },
    fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'total_value', type: 'text' },
        { name: 'actual_price', type: 'text', required: true },
        { name: 'installment_text', type: 'text' },
        { name: 'cta_text', type: 'text' },
        { name: 'items', type: 'array', fields: [{ name: 'name', type: 'text' }, { name: 'value_label', type: 'text' }] },
    ],
}

const GuaranteeBlock: Block = {
    slug: 'guarantee',
    labels: { singular: 'Garantia', plural: 'Garantias' },
    fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'body', type: 'text' },
        { name: 'days', type: 'number' },
        { name: 'icon_style', type: 'select', options: ['shield', 'badge', 'stamp'], defaultValue: 'shield' },
    ],
}

const UrgencyCtaBlock: Block = {
    slug: 'urgencyCta',
    labels: { singular: 'CTA Final de Urgência', plural: 'CTAs Finais de Urgência' },
    fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'countdown_end', type: 'date' },
        { name: 'countdown_type', type: 'select', options: ['fixed', 'evergreen'] },
        { name: 'scarcity_text', type: 'text' },
        { name: 'scarcity_pct', type: 'number' },
        { name: 'cta_text', type: 'text', required: true },
        { name: 'cta_variant', type: 'select', options: ['primary', 'urgency'], defaultValue: 'urgency' },
    ],
}

const FaqBlock: Block = {
    slug: 'faqAccordion',
    labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
    fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'items', type: 'array', fields: [{ name: 'question', type: 'text' }, { name: 'answer', type: 'text' }] },
    ],
}

const MediaLogosBlock: Block = {
    slug: 'mediaLogos',
    labels: { singular: 'Logos (Visto em)', plural: 'Logos (Visto em)' },
    fields: [
        { name: 'headline', type: 'text' },
        { name: 'logos', type: 'upload', hasMany: true, relationTo: 'media' },
    ],
}

const ContentBlock: Block = {
    slug: 'contentBlock',
    labels: { singular: 'Bloco de Conteúdo Rico', plural: 'Blocos de Conteúdo Rico' },
    fields: [
        { name: 'headline', type: 'text' },
        { name: 'body', type: 'richText' },
        { name: 'alignment', type: 'select', options: ['left', 'center'], defaultValue: 'left' },
    ],
}

const ComparisonBlock: Block = {
    slug: 'comparisonTable',
    labels: { singular: 'Tabela de Comparação', plural: 'Tabelas de Comparação' },
    fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'columns', type: 'json' },
        { name: 'rows', type: 'json' },
    ],
}

const CustomHtmlBlock: Block = {
    slug: 'customHtml',
    labels: { singular: 'HTML Customizado', plural: 'HTML Customizado' },
    fields: [
        { name: 'html_content', type: 'textarea' },
    ],
}

const PricingBlock: Block = {
    slug: 'pricing_section',
    labels: { singular: 'Seção de Preços (Premium)', plural: 'Seções de Preços' },
    fields: [
        { name: 'title', type: 'text', defaultValue: 'Pré-pago. Como deveria ser.' },
        { name: 'subtitle', type: 'text', defaultValue: 'Assine, use e renove se quiser. Simples assim.' },
        {
            name: 'plans',
            type: 'array',
            required: true,
            minRows: 1,
            fields: [
                { name: 'name', type: 'text', required: true, admin: { description: 'Ex: Mensal' } },
                { name: 'price', type: 'number', required: true, admin: { description: 'Ex: 29.90' } },
                { name: 'currency', type: 'text', defaultValue: 'R$' },
                { name: 'period', type: 'text', required: true, admin: { description: 'Ex: mês' } },
                { name: 'highlight', type: 'text' },
                { name: 'savings', type: 'text', admin: { description: 'Ex: Mais Popular ou Economize' } },
                { name: 'features', type: 'array', fields: [{ name: 'text', type: 'text' }] },
                { name: 'buttonText', type: 'text', required: true },
                { name: 'buttonLink', type: 'text', required: true },
                { name: 'isPopular', type: 'checkbox', defaultValue: false },
            ],
        },
        { name: 'trial_title', type: 'text', defaultValue: 'Ainda em dúvida? Faça um teste real.' },
        { name: 'trial_subtitle', type: 'text', defaultValue: 'Liberação completa por 3 horas por apenas R$ 4,90.' },
        { name: 'trial_button_text', type: 'text', defaultValue: 'Liberar Teste Agora' },
        { name: 'trial_button_link', type: 'text' },
    ],
}

const HybridTechBlock: Block = {
    slug: 'hybrid_tech',
    labels: { singular: 'Tecnologia Hybrid Stream', plural: 'Tecnologias Hybrid Stream' },
    fields: [
        { name: 'headline', type: 'text', admin: { description: 'Exemplo: Enquanto outros dependem...' } },
        { name: 'sub_headline', type: 'textarea' },
    ],
}


export const LandingPages: CollectionConfig = {
    slug: 'landing-pages',
    admin: {
        useAsTitle: 'slug',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: { description: 'Ex: marketing-digital-2026' },
        },
        {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
            required: true,
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Construtor de Conteúdo (UI Blocks)',
                    fields: [
                        {
                            name: 'body_sections',
                            type: 'blocks',
                            blocks: [HeroBlock, ProblemBlock, BenefitsBlock, VideoBlock, TestimonialsBlock, SocialProofBlock, OfferBlock, GuaranteeBlock, UrgencyCtaBlock, FaqBlock, MediaLogosBlock, ContentBlock, ComparisonBlock, CustomHtmlBlock, PricingBlock, HybridTechBlock],
                        },
                    ],
                },
                {
                    label: 'Filtro de Tráfego',
                    fields: [
                        { name: 'filter_enabled', type: 'checkbox', defaultValue: false },
                        { name: 'filter_access_code', type: 'text', admin: { description: 'Código único de acesso. Ex: abc123' } },
                        { name: 'filter_access_param', type: 'text', defaultValue: 'xyz', admin: { description: 'Parâmetro URL. Ex: ?xyz=abc123' } },
                        { name: 'filter_required_sources', type: 'json', admin: { description: 'Array de origens obrigatórias em JSON. Ex: ["taboola", "google"]' } },
                        { name: 'filter_required_params', type: 'json', admin: { description: 'Parâmetros obrigatórios na URL em JSON. Ex: ["tblci", "gclid"]' } },
                        { name: 'filter_allowed_countries', type: 'json', admin: { description: 'Array de países permitidos em JSON. Ex: ["BR", "PT"]. Vazio = todos' } },
                        { name: 'filter_blocked_countries', type: 'json', admin: { description: 'Array de países bloqueados em JSON. Ex: ["CN", "RU"].' } },
                        { name: 'filter_block_bots', type: 'checkbox', defaultValue: true },
                        { name: 'filter_block_empty_ua', type: 'checkbox', defaultValue: true },
                        { name: 'filter_block_direct', type: 'checkbox', defaultValue: false },
                        { name: 'filter_redirect_url', type: 'text', admin: { description: 'URL de fallback se acesso for negado' } },
                        { name: 'filter_safe_page_slug', type: 'text', admin: { description: 'Página segura para traffic redirect (ex: produto genérico)' } },
                    ],
                },
                {
                    label: 'Tracking Condicional',
                    fields: [
                        { name: 'tracking_google_ads_conversion_id', type: 'text', admin: { description: 'AW-XXXXX/conversion_label' } },
                        { name: 'tracking_google_ads_conversion_label', type: 'text' },
                        { name: 'tracking_google_ads_conversion_value', type: 'number' },
                        { name: 'tracking_meta_pixel_id', type: 'text' },
                        { name: 'tracking_meta_custom_event', type: 'text', admin: { description: 'Evento FBQ ex: LeadCursoMkt' } },
                        { name: 'tracking_taboola_pixel_id', type: 'text' },
                        { name: 'tracking_taboola_event_name', type: 'text', admin: { description: 'make_purchase' } },
                        { name: 'tracking_custom_scripts', type: 'textarea' },
                    ],
                },
            ],
        },
    ],
}
