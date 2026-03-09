import { CollectionConfig, Block } from 'payload'

const HeroBlock: Block = {
    slug: 'hero',
    labels: {
        singular: 'Seção Hero',
        plural: 'Seções Hero',
    },
    fields: [
        { name: 'badge_text', type: 'text' },
        { name: 'headline', type: 'text', required: true },
        { name: 'sub_headline', type: 'text' },
        { name: 'cta_text', type: 'text', defaultValue: 'QUERO COMEÇAR AGORA' },
        { name: 'trust_items', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    ],
}

const ProblemBlock: Block = {
    slug: 'problemAgitation',
    labels: {
        singular: 'Problema / Agitação',
        plural: 'Problemas / Agitação',
    },
    fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'transition_text', type: 'text' },
        { name: 'pain_points', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    ],
}

const OfferBlock: Block = {
    slug: 'offerStack',
    labels: {
        singular: 'Seção Oferta/Checkout',
        plural: 'Seções Oferta/Checkout',
    },
    fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'total_value', type: 'text' },
        { name: 'actual_price', type: 'text', required: true },
        { name: 'installment_text', type: 'text' },
        { name: 'cta_text', type: 'text' },
        { name: 'items', type: 'array', fields: [{ name: 'name', type: 'text' }, { name: 'value_label', type: 'text' }] },
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
                            blocks: [HeroBlock, ProblemBlock, OfferBlock],
                        },
                    ],
                },
                {
                    label: 'Filtro de Tráfego',
                    fields: [
                        { name: 'filter_enabled', type: 'checkbox', defaultValue: false },
                        { name: 'filter_access_code', type: 'text', admin: { description: 'Senha ou utm específica de liberação.' } },
                        { name: 'filter_required_sources', type: 'text', hasMany: true, admin: { description: 'Ex: taboola, facebook (separado com Enter)' } },
                    ],
                },
                {
                    label: 'Tracking Condicional',
                    fields: [
                        { name: 'tracking_google_ads_conversion_id', type: 'text' },
                        { name: 'tracking_meta_pixel_id', type: 'text' },
                        { name: 'tracking_taboola_pixel_id', type: 'text' },
                    ],
                },
            ],
        },
    ],
}
